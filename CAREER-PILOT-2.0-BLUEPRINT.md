# JURNARA 2.0 — Career GPS Blueprint

## Product North Star

**JURNARA is a personal Career GPS.**

It helps a person move from:

**Confused → Prepared → Qualified → Applied → Progressing**

The product should not be a generic job board, CV generator, or chatbot. AI is an intelligence layer underneath a system that turns career uncertainty into measurable next actions.

## Five Pillars

### 1. DISCOVER
Help the user understand themselves and the opportunity landscape.

- Career identity/profile
- Skills inventory
- Transferable-skills discovery
- Career direction exploration
- "What can I become?" pathways
- Labour-market-aware role exploration
- Alternative career routes
- Target-role selection

### 2. PREPARE
Turn a chosen direction into a practical development plan.

- Career readiness map
- Target-role requirements
- Skill-gap analysis
- 30/60/90-day roadmap
- Learning recommendations
- CV and cover-letter preparation
- Interview preparation
- Personal action queue

### 3. PROVE
Help the user demonstrate capability, not merely claim it.

- Proof-of-skill projects
- Portfolio/project builder
- Achievement evidence
- Skills evidence library
- Project-to-CV mapping
- Project-to-interview-story mapping
- Completion and evidence tracking

### 4. APPLY
Turn readiness into better applications.

- Opportunity discovery
- Skills-based matching
- Application tailoring
- Application tracker
- Follow-up reminders
- Interview preparation
- Application outcome analysis
- Job-scam / opportunity verification

### 5. GROW
Continue after the application.

- Application performance insights
- Career progress history
- New skills and evidence
- Career milestones
- Role progression
- Continuous learning
- Career reviews
- Next-career-direction recommendations

## Signature Experiences

### Career GPS
Every user should be able to see:

**You are here → You want to go here → What is between you and the destination → Your next best actions.**

The dashboard should answer:
1. Where am I?
2. Where am I trying to go?
3. What is blocking me?
4. What should I do next?
5. What changed since my last visit?

### What Can I Become?
Given a person's education, experience, skills and interests, generate plausible adjacent career paths and explain the transferable evidence behind each path.

### Career Readiness Map
Compare the user's demonstrated capabilities with the requirements of a target role.

Show:
- Already demonstrated
- Developing
- Missing
- Evidence needed

Avoid meaningless overall scores. Prioritize actionable gaps.

### Proof-of-Skill Studio
Instead of only telling a user to learn a skill, give them a practical mini-project that produces evidence.

Example:
**Target:** Project Assistant
**Project:** Design a small community outreach plan
**Evidence:** plan, timeline, stakeholder map, report
**Skills demonstrated:** planning, communication, research, project management

### Career Coach
The coach should be persistent and context-aware. It should use the user's profile, target role, skills, roadmap, proof projects, CV, opportunities and application history.

The coach's primary output should be **action**, not conversation.

### Career Scam Shield
Allow users to submit a job advert or recruitment message for structured verification.

Signals can include:
- suspicious payment requests
- suspicious domains
- identity inconsistencies
- unrealistic claims
- requests for sensitive information
- missing employer information
- duplicated/fake recruitment language
- mismatch with an official recruitment source

The system should communicate evidence and uncertainty rather than guarantee that an opportunity is legitimate.

## Intelligence Architecture

JURNARA 2.0 should separate the intelligence layer from the user interface.

Core entities:

- User Profile
- Career Goal
- Skill
- Target Role
- Role Requirement
- Career Pathway
- Skill Gap
- Evidence Item
- Proof Project
- Opportunity
- Application
- Interview
- Learning Action
- Career Milestone
- Verification Check
- Coach Recommendation

The intelligence engine should progressively calculate:

**Profile understanding → role fit → gaps → evidence gaps → recommended actions → opportunity fit → application strategy → outcome learning.**

## Product Principles

1. **Action over information.**
2. **Evidence over claims.**
3. **Skills over titles alone.**
4. **Personalization over generic advice.**
5. **Progress over vanity scores.**
6. **Trust and privacy by design.**
7. **Explain why a recommendation was made.**
8. **Never promise employment or guarantee opportunity legitimacy.**
9. **Keep the core product provider-independent.**
10. **Design integrations through APIs/webhooks so external automation can be added without rebuilding the core.**

## Build Strategy

### Phase A — Foundation
Preserve the current v1.0.8 foundation:
- onboarding
- profile
- skills
- career matching
- opportunities
- applications
- CV
- roadmap
- coach
- local-first persistence
- Android/PWA release pipeline

### Phase B — Career GPS
Add:
- career destination
- current-state assessment
- readiness map
- priority actions
- pathway explorer
- richer dashboard

### Phase C — Prove
Add:
- proof projects
- evidence library
- portfolio
- achievement extraction
- evidence-aware CV

### Phase D — Apply Intelligence
Add:
- richer opportunity model
- application tailoring
- outcome analytics
- interview preparation
- scam verification

### Phase E — Grow
Add:
- longitudinal progress
- career reviews
- role progression
- continuous learning
- intelligent next-direction suggestions

## Technical Direction

The product should evolve from a local-first prototype toward a secure architecture without throwing away the existing UI.

Recommended boundaries:

- UI layer
- domain/business logic
- intelligence/recommendation layer
- persistence layer
- integration/API layer
- automation/webhook layer
- authentication and authorization
- observability/audit layer

The core domain must remain usable without depending on a single AI provider.

## Success Definition

JURNARA 2.0 is successful when a user can enter with uncertainty and leave with a concrete, personalized plan:

**Understand myself → choose a realistic direction → see my gaps → build evidence → become application-ready → find and verify opportunities → apply intelligently → learn from outcomes → keep progressing.**

That is the JURNARA promise:

> **Don't just help me find a job. Help me become the person who can get—and grow in—the right career.**
