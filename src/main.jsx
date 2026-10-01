import React,{useEffect,useMemo,useState} from 'react';
import {createRoot} from 'react-dom/client';
import './styles.css';

const KEY='careerPilot9';
const skills=['Teaching','Communication','Leadership','Digital Literacy','Research','Project Management','Problem Solving','Digital Marketing','Creativity','Customer Service'];
const roles=[
 {id:'geo',name:'Geography Teacher',sector:'Education & Training',skills:['Teaching','Communication','Digital Literacy','Research']},
 {id:'training',name:'Training Coordinator',sector:'Education & Training',skills:['Communication','Leadership','Project Management','Digital Literacy']},
 {id:'hr',name:'HR / Administration Officer',sector:'Business & Management',skills:['Communication','Leadership','Digital Literacy','Customer Service']},
 {id:'project',name:'Project Assistant',sector:'Social Development',skills:['Research','Project Management','Communication','Digital Literacy']},
 {id:'support',name:'IT Support Assistant',sector:'Technology',skills:['Digital Literacy','Problem Solving','Communication']},
 {id:'marketing',name:'Marketing Officer',sector:'Marketing & Sales',skills:['Communication','Digital Marketing','Creativity','Customer Service']}
];
const opportunities=[
 {id:1,title:'Geography Teacher',org:'Education Opportunity',role:'geo',location:'Ghana / International',skills:['Teaching','Communication','Digital Literacy']},
 {id:2,title:'Training Coordinator',org:'Learning & Development',role:'training',location:'Ghana / Remote',skills:['Communication','Leadership','Project Management']},
 {id:3,title:'Project Assistant',org:'Social Development',role:'project',location:'Ghana / Remote',skills:['Research','Project Management','Communication']}
];
const blank={onboarded:false,name:'',email:'',goal:'',direction:'',skills:[],saved:[],applications:[],cv:{summary:'',experience:'',education:''},letters:[],roadmap:[],practice:[]};

function load(){try{return {...blank,...JSON.parse(localStorage.getItem(KEY)||'{}')}}catch{return blank}}
function pct(have,need){return Math.round(need.filter(x=>have.includes(x)).length/need.length*100)}
function App(){
 const [d,setD]=useState(load),[page,setPage]=useState('home'),[toast,setToast]=useState('');
 useEffect(()=>localStorage.setItem(KEY,JSON.stringify(d)),[d]);
 const notify=x=>{setToast(x);setTimeout(()=>setToast(''),1800)};
 const update=(k,v)=>setD(x=>({...x,[k]:v}));
 const topRole=useMemo(()=>roles.map(r=>({...r,match:pct(d.skills,r.skills)})).sort((a,b)=>b.match-a.match)[0],[d.skills]);
 const toggleSkill=s=>update('skills',d.skills.includes(s)?d.skills.filter(x=>x!==s):[...d.skills,s]);
 const addApp=(opp,status='Saved')=>{
   if(d.applications.some(a=>a.oppId===opp.id)) return notify('Already tracked');
   update('applications',[...d.applications,{id:Date.now(),oppId:opp.id,title:opp.title,status}]); notify('Application added');
 };
 const exportCV=()=>{const text=`CAREER PILOT CV\n\n${d.name}\n${d.email}\n\nPROFESSIONAL SUMMARY\n${d.cv.summary}\n\nEXPERIENCE\n${d.cv.experience}\n\nEDUCATION\n${d.cv.education}\n\nSKILLS\n${d.skills.join(', ')}`; const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([text],{type:'text/plain'}));a.download='career-pilot-cv.txt';a.click();notify('CV exported')};
 if(!d.onboarded) return <Onboard d={d} setD={setD}/>;
 const nav=[['home','Home'],['profile','Profile'],['jobs','Jobs'],['applications','Applications'],['cv','CV'],['roadmap','Roadmap'],['coach','Coach']];
 return <div className="app"><header><div><b>Career Pilot</b><small>Build your career. Find your opportunity.</small></div><button onClick={()=>{localStorage.removeItem(KEY);location.reload()}}>Reset</button></header>
 <main>
 {page==='home'&&<Home d={d} role={topRole} go={setPage}/>}
 {page==='profile'&&<Profile d={d} update={update} toggleSkill={toggleSkill}/>}
 {page==='jobs'&&<Jobs d={d} roles={roles} opps={opportunities} addApp={addApp} update={update}/>}
 {page==='applications'&&<Applications d={d} update={update}/>}
 {page==='cv'&&<CV d={d} update={update} exportCV={exportCV}/>}
 {page==='roadmap'&&<Roadmap d={d} update={update}/>}
 {page==='coach'&&<Coach d={d} role={topRole} roles={roles}/>}
 </main>
 <nav>{nav.map(([id,label])=><button className={page===id?'active':''} onClick={()=>setPage(id)} key={id}>{label}</button>)}</nav>
 <footer><a href="/privacy-policy.html" target="_blank" rel="noreferrer">Privacy Policy</a><span>Career Pilot v1.0.8</span></footer>
 {toast&&<div className="toast">{toast}</div>}</div>
}

function Onboard({d,setD}){const [name,setName]=useState(''),[goal,setGoal]=useState('');
 return <div className="welcome"><div className="hero"><h1>Career Pilot</h1><p>Your career journey, in one place.</p></div><section className="card"><h2>Let's get started</h2><label>Name<input value={name} onChange={e=>setName(e.target.value)} placeholder="Your name"/></label><label>Career goal<input value={goal} onChange={e=>setGoal(e.target.value)} placeholder="e.g. Get an international teaching job"/></label><button className="primary" disabled={!name.trim()} onClick={()=>setD({...d,name,goal,onboarded:true})}>Start Career Pilot</button></section></div>}

function Home({d,role,go}){const done=d.roadmap.filter(x=>x.done).length;return <><div className="hero"><p className="eyebrow">COMMAND CENTER</p><h1>Welcome, {d.name}</h1><p>{d.goal||'Move from preparation to opportunity.'}</p></div><div className="grid">
 <section className="card"><h3>Career direction</h3><strong>{role.name}</strong><p>{role.match}% current skill match</p><button onClick={()=>go('profile')}>Improve profile</button></section>
 <section className="card"><h3>Roadmap</h3><strong>{done}/{d.roadmap.length||6}</strong><p>actions completed</p><button onClick={()=>go('roadmap')}>Open roadmap</button></section>
 <section className="card"><h3>Applications</h3><strong>{d.applications.length}</strong><p>tracked opportunities</p><button onClick={()=>go('applications')}>Track applications</button></section>
 <section className="card"><h3>Next action</h3><strong>{d.skills.length<4?'Add more skills':'Tailor your CV'}</strong><p>Keep your career momentum moving.</p><button onClick={()=>go(d.skills.length<4?'profile':'cv')}>Continue</button></section>
 </div></>}

function Profile({d,update,toggleSkill}){return <><h2>Career Profile</h2><section className="card"><label>Email<input value={d.email} onChange={e=>update('email',e.target.value)} placeholder="you@example.com"/></label><label>Career goal<input value={d.goal} onChange={e=>update('goal',e.target.value)}/></label><h3>Skills</h3><div className="chips">{skills.map(s=><button className={d.skills.includes(s)?'chip on':'chip'} onClick={()=>toggleSkill(s)} key={s}>{s}</button>)}</div></section></>}

function Jobs({d,roles,opps,addApp,update}){return <><h2>Opportunities</h2><p className="muted">Starter opportunities are demo records. Connect live job feeds later.</p><div className="list">{opps.map(o=>{const r=roles.find(x=>x.id===o.role),m=pct(d.skills,r.skills),saved=d.saved.includes(o.id);return <section className="card" key={o.id}><div className="row"><div><h3>{o.title}</h3><p>{o.org} · {o.location}</p></div><b>{m}%</b></div><p>Skill match: {r.skills.join(', ')}</p><div className="actions"><button onClick={()=>update('saved',saved?d.saved.filter(x=>x!==o.id):[...d.saved,o.id])}>{saved?'Saved':'Save'}</button><button className="primary" onClick={()=>addApp(o,'Applied')}>Apply / Track</button></div></section>})}</div></>}

function Applications({d,update}){const statuses=['Saved','Applied','Interview','Offer','Rejected'];return <><h2>Applications</h2>{!d.applications.length?<section className="card"><p>No applications tracked yet. Save or apply to an opportunity first.</p></section>:<div className="list">{d.applications.map(a=><section className="card" key={a.id}><div className="row"><h3>{a.title}</h3><select value={a.status} onChange={e=>update('applications',d.applications.map(x=>x.id===a.id?{...x,status:e.target.value}:x))}>{statuses.map(s=><option key={s}>{s}</option>)}</select></div><button onClick={()=>update('applications',d.applications.filter(x=>x.id!==a.id))}>Remove</button></section>)}</div>}</>}

function CV({d,update,exportCV}){return <><h2>CV Studio</h2><section className="card"><label>Professional summary<textarea value={d.cv.summary} onChange={e=>update('cv',{...d.cv,summary:e.target.value})}/></label><label>Experience<textarea value={d.cv.experience} onChange={e=>update('cv',{...d.cv,experience:e.target.value})}/></label><label>Education<textarea value={d.cv.education} onChange={e=>update('cv',{...d.cv,education:e.target.value})}/></label><p><b>Skills:</b> {d.skills.join(', ')||'Add skills in Profile'}</p><button className="primary" onClick={exportCV}>Export CV</button></section><section className="card"><h3>Target-role tailoring</h3><p>Before applying, adjust your summary and achievements to the exact role. Highlight the skills requested in the vacancy.</p></section></>}

function Roadmap({d,update}){const base=['Complete career profile','Select priority skills','Choose a target role','Prepare and tailor CV','Apply and track opportunities','Prepare for interviews'];const items=d.roadmap.length?d.roadmap:base.map((t,i)=>({id:i,title:t,done:false}));const done=items.filter(x=>x.done).length;return <><h2>Career Roadmap</h2><section className="card"><div className="progress"><span style={{width:`${Math.round(done/items.length*100)}%`}}/></div><p>{done} of {items.length} completed</p>{items.map(x=><button className={x.done?'task done':'task'} key={x.id} onClick={()=>update('roadmap',items.map(y=>y.id===x.id?{...y,done:!y.done}:y))}>{x.done?'✓':'○'} {x.title}</button>)}</section></>}

function Coach({d,role,roles}){const gaps=role.skills.filter(s=>!d.skills.includes(s));return <><h2>Career Coach</h2><section className="card"><p className="eyebrow">CURRENT DIRECTION</p><h3>{role.name}</h3><p>Your current match is <b>{role.match}%</b>.</p><h3>Priority skill gaps</h3>{gaps.length?<ul>{gaps.map(g=><li key={g}>Develop <b>{g}</b> and show evidence of it in your CV.</li>)}</ul>:<p>Core skills are covered. Focus on applications and interview practice.</p>}<h3>Next move</h3><p>{d.applications.some(a=>a.status==='Interview')?'Prepare STAR answers for your upcoming interview.':d.applications.length?'Follow up on tracked applications and tailor each CV.':'Find a matching opportunity and start an application.'}</p></section><section className="card"><h3>Other possible directions</h3>{roles.filter(r=>r.id!==role.id).slice(0,3).map(r=><p key={r.id}><b>{r.name}</b> — {pct(d.skills,r.skills)}% match</p>)}</section></>}

createRoot(document.getElementById('root')).render(<App/>);
