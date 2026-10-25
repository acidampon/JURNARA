import fs from 'node:fs/promises';
import path from 'node:path';

const OUTPUT = path.resolve('public/opportunities.json');
const MAX_JOBS = 250;
const VISA_HINT = /visa sponsorship|sponsor(?:ship)? available|work permit sponsorship|relocation (?:support|package|assistance)|visa support/i;
const REMOTE_HINT = /remote|worldwide|anywhere|work from home|distributed/i;

function text(value) {
  return String(value || '').replace(/<[^>]*>/g, ' ').replace(/&nbsp;/gi, ' ').replace(/&amp;/gi, '&').replace(/&#39;|&apos;/gi, "'").replace(/&quot;/gi, '"').replace(/\s+/g, ' ').trim();
}
function roleFor(value) {
  const v = String(value || '').toLowerCase();
  if (/teacher|education|training|learning and development|instruction|curriculum/.test(v)) return 'training';
  if (/market|social media|content|seo|communications|brand/.test(v)) return 'marketing';
  if (/customer support|customer service|help desk|technical support|it support/.test(v)) return 'support';
  if (/human resources|\bhr\b|administrator|administration|office assistant|operations assistant/.test(v)) return 'hr';
  if (/research|project|program|programme|development|field officer|monitoring and evaluation/.test(v)) return 'project';
  return 'project';
}
function normalize(source, job) {
  const title = text(job.title || job.position);
  const company = text(job.company_name || job.company || job.organization || source);
  const location = text(job.location || job.candidate_required_location || (job.remote ? 'Remote' : 'Location not specified'));
  const url = String(job.url || job.job_url || '');
  if (!title || !/^https?:\/\//i.test(url)) return null;
  const tags = Array.isArray(job.tags) ? job.tags.map(text).filter(Boolean).slice(0, 12) : [];
  const description = text(job.description || job.summary || '');
  const combined = [title, company, location, tags.join(' '), description].join(' ');
  const visaSponsorshipMentioned = VISA_HINT.test(combined);
  const remote = Boolean(job.remote) || REMOTE_HINT.test(location + ' ' + tags.join(' ') + ' ' + title);
  const postedAt = job.publication_date || job.created_at || job.date || null;
  const id = String(job.slug || job.id || url).slice(0, 220);
  return {
    id: source.toLowerCase().replace(/[^a-z0-9]+/g, '-') + ':' + id,
    title,
    org: company,
    role: roleFor(combined),
    location,
    url,
    source,
    remote,
    visaSponsorshipMentioned,
    postedAt,
    tags,
    summary: description.slice(0, 260)
  };
}
async function fetchJson(url) {
  const response = await fetch(url, {
    signal: AbortSignal.timeout(15000),
    headers: { 'user-agent': 'JURNARA-Opportunity-Feed/2.2', accept: 'application/json' }
  });
  if (!response.ok) throw new Error(`${url} returned HTTP ${response.status}`);
  return response.json();
}
const sources = [
  {
    name: 'Arbeitnow',
    url: 'https://www.arbeitnow.com/api/job-board-api',
    read: json => Array.isArray(json.data) ? json.data : []
  },
  {
    name: 'Remotive',
    url: 'https://remotive.com/api/remote-jobs?limit=100',
    read: json => Array.isArray(json.jobs) ? json.jobs : []
  }
];

const sourceResults = await Promise.all(sources.map(async source => {
  try {
    const json = await fetchJson(source.url);
    return { source, jobs: source.read(json).map(job => normalize(source.name, job)).filter(Boolean), error: null };
  } catch (error) {
    return { source, jobs: [], error: error instanceof Error ? error.message : String(error) };
  }
}));
const usable = sourceResults.filter(result => result.jobs.length);
if (!usable.length) throw new Error('All live job sources failed; the previous feed was preserved.');

const unique = new Map();
for (const result of usable) {
  for (const job of result.jobs) {
    const key = job.url.toLowerCase().replace(/\/$/, '');
    if (!unique.has(key)) unique.set(key, job);
  }
}
const jobs = [...unique.values()]
  .sort((a, b) => Number(b.visaSponsorshipMentioned) - Number(a.visaSponsorshipMentioned)
    || Number(b.remote) - Number(a.remote)
    || Date.parse(b.postedAt || 0) - Date.parse(a.postedAt || 0))
  .slice(0, MAX_JOBS);

await fs.mkdir(path.dirname(OUTPUT), { recursive: true });
const feed = {
  schemaVersion: 1,
  updatedAt: new Date().toISOString(),
  sourceCount: usable.length,
  sources: usable.map(result => result.source.name),
  sourceErrors: sourceResults.filter(result => result.error).map(result => ({ source: result.source.name, error: result.error })),
  jobs
};
await fs.writeFile(OUTPUT, JSON.stringify(feed, null, 2) + '\n', 'utf8');
console.log(`Saved ${jobs.length} live jobs from ${usable.length} source(s) to ${OUTPUT}`);
