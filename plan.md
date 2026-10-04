# NxtWave Growth Challenge — AI LaunchPass
## Master Execution Plan for Astra

> **Purpose of this file:** This is the complete execution brief for the NxtWave Growth Intern Challenge.  
> Astra should use this file as the source of truth, build the complete project end-to-end, make reasonable implementation decisions independently, run only lightweight tests, fix issues it finds, and leave the repository in a submission-ready state.

---

# 1. Challenge Context

NxtWave plans to launch a free online workshop:

**“Build Your First AI Project in 60 Minutes”**

The challenge is to create a plan to get:

- **500 final-year engineering students**
- **₹2,000 total budget**
- **7-day campaign duration**
- AI tools can be used freely
- This is a **simulation**; the campaign does not need to be actually executed

Required submission items:

1. **Growth Plan**
   - Maximum **5 slides or 2 pages**
2. **Working Asset**
   - Live link / prototype / demo
3. **AI + Learning Notes**
   - 2–3 examples:
     - What was asked
     - What AI suggested
     - What was changed
4. **3-minute video**
   - Explain the approach, what was built, and why

The judging criteria emphasize:

- Learnability
- Ownership
- Intent to grow
- Bias to ship
- Problem solving
- Judgment

The working asset should therefore not be a generic landing page. It should directly support the acquisition strategy and visibly demonstrate how the 500-registration target could be achieved.

---

# 2. Product Concept

## Product Name

# AI LaunchPass

## One-line pitch

**A personalized workshop registration and referral growth engine that helps students discover an AI project they could build, register for the workshop, invite friends, compete with their campus, and help the growth team track whether the campaign can realistically reach 500 registrations.**

## Core Growth Thesis

A normal workshop landing page may improve conversion, but it does not solve the hardest problem:

**distribution.**

With only ₹2,000 and seven days, the campaign needs a low-cost growth loop.

AI LaunchPass creates that loop:

**Project discovery → Registration → Referral → Campus competition → More registrations → Measurement → Optimization**

---

# 3. Core Product Objectives

The product must accomplish all of the following:

1. Give students a stronger reason to register than “attend a free workshop.”
2. Personalize the experience enough to make the workshop feel relevant.
3. Make sharing/referral behavior obvious and rewarding.
4. Create a campus-level social incentive.
5. Track the entire acquisition funnel.
6. Show exactly how the 500-registration target can be reached.
7. Let an evaluator change assumptions and test whether the strategy still works.
8. Be polished enough to demo convincingly in under 3 minutes.
9. Work fully without any paid external API.
10. Use clear demo/simulation labels wherever synthetic campaign data is shown.

---

# 4. Target User

## Primary Audience

Final-year engineering students in India, especially:

- CSE / IT
- AI / ML / Data Science
- ECE
- EEE
- Mechanical
- Civil
- Other engineering branches interested in AI

## Student Mindset

Likely concerns:

- “AI is useful, but I don’t know what to build.”
- “I need something practical for placements/resume.”
- “I don’t want another long webinar.”
- “I’m not sure if I know enough coding.”
- “Will I actually build something?”
- “Is this worth one hour?”

## Why They Should Care

The product should communicate:

- Build something practical in 60 minutes
- Beginner-friendly
- Project can become a portfolio/resume starting point
- Personalized project recommendation
- Clear outcome rather than generic learning
- Free
- Social proof / campus participation
- Referral unlocks useful resources

---

# 5. Main Product Flow

There are two major modes:

## A. Student View

Flow:

1. Landing page
2. AI Project Matcher
3. Personalized project result
4. Registration form
5. AI LaunchPass dashboard
6. Referral/share flow
7. Campus leaderboard

## B. Growth Team View

Flow:

1. Growth Command Center
2. Funnel analytics
3. Acquisition channel breakdown
4. Referral metrics
5. Campus leaderboard
6. 500 Goal Simulator
7. Campaign recommendations

A prominent toggle should make switching easy:

**Student View | Growth Team View**

---

# 6. Screen Specifications

## Screen 1 — Landing Page

### Goal

Make the student curious enough to begin the project matcher.

### Hero Copy

Suggested headline:

**What AI project could YOU build in 60 minutes?**

Suggested subheadline:

**Answer 3 quick questions. We’ll match you with a beginner-friendly AI project and reserve your place in NxtWave’s free “Build Your First AI Project in 60 Minutes” workshop.**

Primary CTA:

**Find My AI Project**

Secondary CTA:

**See Campus Leaderboard**

### Supporting Points

Three short benefit cards:

- Build, don’t just watch
- Beginner-friendly
- Leave with a real project idea

### Trust / Relevance Strip

Examples:

- 60-minute live workshop
- Final-year friendly
- No advanced AI knowledge required
- Free

Avoid fake testimonials.

---

## Screen 2 — AI Project Matcher

Three-step questionnaire.

### Question 1 — Branch

Options:

- CSE / IT
- AI / ML / Data Science
- ECE / EEE
- Mechanical
- Civil
- Other

### Question 2 — Experience

Options:

- Beginner — little/no coding
- Some Python
- Built ML/AI projects before

### Question 3 — Interest

Options:

- Productivity
- Computer Vision
- Healthcare
- Finance
- Sustainability
- Career / Resume
- Automation
- Data / Analytics

### Behavior

Use a deterministic local recommendation engine.

No external LLM API is required.

Return a project based on a weighted rules table.

---

# 7. Project Recommendation Library

Create at least 10 project templates.

Each project needs:

- Title
- Short description
- Best-fit branches
- Best-fit interests
- Experience level
- Difficulty
- Estimated build time
- Tech stack
- 3 learning outcomes
- Workshop relevance

Suggested project list:

1. AI Resume Screener
2. Smart Study Planner
3. Plant Disease Detector
4. Expense Insight Assistant
5. Fake Review Detector
6. Campus FAQ Assistant
7. Energy Usage Predictor
8. Image Classifier
9. Interview Question Generator
10. Dataset Insight Copilot
11. Predictive Maintenance Demo
12. Sustainability Idea Evaluator

### Example Result

**Your AI Project Match: AI Resume Screener**

- Difficulty: Beginner
- Build time: ~55 min
- Stack: Python + Streamlit + LLM concepts

You’ll learn:

- Prompt design
- Simple scoring logic
- Building a lightweight user interface

CTA:

**Build This in the Free Workshop → Reserve My Seat**

---

# 8. Registration Form

Fields:

- Name
- Email
- Phone number
- College
- Branch
- Graduation year
- Optional referral code

Validation:

- Required fields
- Valid email
- 10-digit Indian phone format or permissive phone validation
- Graduation year default around final year

After registration:

- Generate unique participant ID
- Generate unique referral code
- Save selected AI project
- Save acquisition source
- Save college
- Save referring code if present
- Redirect to LaunchPass dashboard

---

# 9. Referral System

Each registered user gets a unique referral link.

Example:

`/r/JOSEPH7`

or:

`/?ref=JOSEPH7`

The system should:

1. Detect referral code from URL
2. Store it temporarily
3. Attribute the subsequent registration
4. Increment the referrer’s referral count
5. Update campus totals
6. Reflect metrics in Growth Team View

### Referral Code Generation

Simple readable approach:

- First-name prefix
- Random or deterministic short suffix
- Ensure uniqueness

Example:

`JOSEPH7`
`RIYA4K`
`ARJUN9`

---

# 10. AI LaunchPass Student Dashboard

After registration, display:

# Your AI LaunchPass

Example:

**Joseph — Amrita University**

- Workshop Seat: Reserved
- Your Project: AI Resume Screener
- Your Referrals: 2
- Campus Rank: #14
- Campus Registrations: 31 / 50

Progress bar:

`████████████░░░░ 31 / 50`

### Referral Milestones

Use non-monetary workshop-related benefits.

Suggested milestones:

- 1 referral → AI Prompt Cheat Sheet
- 3 referrals → AI Starter Pack
- 5 referrals → Priority Project Review
- 10 referrals → Campus AI Champion badge

These are campaign concepts, not real guaranteed rewards.

Clearly label them as **prototype campaign rewards**.

### Share Button

Primary share channel:

**Share on WhatsApp**

Pre-filled message example:

> I’m joining NxtWave’s free “Build Your First AI Project in 60 Minutes” workshop.  
> I matched with an AI project I can actually build during the session.  
> Find your project and join here: [referral link]

Also include:

- Copy Link
- Share button via Web Share API if available

---

# 11. Campus Leaderboard

Create a student-facing leaderboard.

Seed demo colleges such as:

- VIT
- Amrita
- SRM
- PSG Tech
- MIT Manipal
- Anna University
- SASTRA
- NIT Trichy

Example table:

| Rank | College | Registrations |
|---|---|---:|
| 1 | VIT | 47 |
| 2 | Amrita | 41 |
| 3 | SRM | 36 |
| 4 | PSG Tech | 29 |
| 5 | MIT Manipal | 26 |

Highlight the current user’s college.

### Campus Goal

Set a configurable campus milestone such as:

**50 registrations**

Example copy:

**Amrita needs 9 more registrations to unlock the Campus AI Pack.**

This is a prototype/simulation mechanic.

---

# 12. Growth Command Center

This is one of the most important screens.

It should look like a real growth operations dashboard.

## Top KPI Cards

Display:

- Total Registrations
- % of 500 Goal
- Referral Registrations
- Referral Share
- Cost Spent
- Estimated CPA
- Projected 7-Day Registrations

Example seeded demo values:

- Total Registrations: 386
- Goal Progress: 77.2%
- Referral Registrations: 142
- Cost Spent: ₹1,420 / ₹2,000
- Estimated CPA: ₹3.68
- Projected Total: 527

All seeded metrics must be clearly labeled:

**Demo / simulated campaign data**

Do not imply they are real NxtWave results.

---

# 13. Funnel Analytics

Show a simple funnel:

1. Landing Visitors
2. Project Matcher Started
3. Project Match Completed
4. Registration Started
5. Registration Completed
6. Shared Referral

Example seeded values:

- Visitors: 1,850
- Matcher started: 1,220
- Matcher completed: 940
- Registration started: 610
- Registered: 386
- Shared referral: 154

Display conversion percentages between stages.

---

# 14. Acquisition Channel Breakdown

Use only a few meaningful channels.

Primary campaign channels:

1. Campus Captains
2. Student Referrals
3. College Clubs / WhatsApp Groups
4. Organic

Example seeded table:

| Channel | Registrations | Conversion |
|---|---:|---:|
| Campus Captains | 168 | 51% |
| Referrals | 142 | 38% |
| College Clubs | 54 | 44% |
| Organic | 22 | 19% |

Optionally use a bar chart or donut chart.

Do not overload the page with charts.

---

# 15. 500 Goal Simulator

This is a signature feature.

The evaluator must be able to change assumptions and immediately see whether 500 registrations remain achievable.

## Inputs

### Campus Captains

- Number of captains
- Direct registrations per captain

### Club Distribution

- Number of club/WhatsApp registrations

### Referral Loop

- Percentage of registered students who share
- Average qualified invites per sharer
- Referral conversion rate

### Organic

- Expected organic registrations

### Budget

- Total available: ₹2,000
- Reward allocation

---

# 16. Simulator Formula

Use a transparent model.

## Direct Captain Registrations

`captainRegistrations = numberOfCaptains × registrationsPerCaptain`

Example:

`20 × 12 = 240`

## Referral Registrations

Use:

`referrals = baseRegistrations × shareRate × invitesPerSharer × referralConversion`

Example:

`240 × 0.40 × 2.5 × 0.35 = 84`

Depending on implementation, define whether baseRegistrations includes captains only or captain + clubs.

Be consistent and explain the formula in the UI.

## Total

`total = captainRegistrations + clubRegistrations + referralRegistrations + organicRegistrations`

Show:

- Expected total
- Gap to target
- Target achieved / not achieved

---

# 17. Dynamic Recommendations

If expected total is below 500, show actionable suggestions.

Examples:

- Increase campus captains
- Increase direct registrations per captain
- Improve share rate
- Improve referral conversion
- Add club distribution

Recommendation logic can be rule-based.

Example:

**Projected registrations: 456**

**Gap: 44**

Suggested action:

**Increase campus captains from 20 → 24**

or:

**Raise club contribution from 120 → 164**

Do not call an external LLM.

---

# 18. Initial Growth Strategy

The product should support a simple three-channel growth plan.

## Channel 1 — Campus Captains

Goal:

Recruit roughly 20 student ambassadors / club members.

Target:

**20 captains × 12 registrations each = 240**

Support each captain with:

- Unique referral link
- WhatsApp share copy
- Leaderboard visibility

### ₹2,000 Budget Allocation

Prototype assumption:

- 1st place: ₹1,000
- 2nd place: ₹600
- 3rd place: ₹400

Total:

**₹2,000**

Clearly describe this as a proposed campaign incentive structure.

---

## Channel 2 — College Clubs / Department Groups

Targets:

- AI clubs
- Coding clubs
- IEEE chapters
- Placement groups
- Department WhatsApp groups

Core hook:

**“Find the AI project you can build in 60 minutes.”**

Target contribution:

Approximately **120 registrations**

---

## Channel 3 — Student Referral Loop

Every registered student receives:

- Personal referral link
- Referral progress
- Unlock milestones
- Campus leaderboard visibility

Target contribution:

Approximately **120–140 registrations**

---

# 19. Example 500 Registration Model

Primary modeled plan:

- Campus Captains: 240
- Clubs / Groups: 120
- Referrals: 120–140
- Organic / spillover: optional buffer

Target:

**500+ registrations**

The simulator must allow the evaluator to challenge these assumptions.

Avoid claiming that 500 registrations are guaranteed.

Use wording such as:

- Expected
- Modeled
- Projected
- Target contribution
- Assumption

---

# 20. Data Model

Keep the data model simple and implementation-friendly.

Suggested TypeScript interfaces.

## Student

Fields:

- id
- name
- email
- phone
- college
- branch
- graduationYear
- experience
- interest
- selectedProjectId
- referralCode
- referredBy
- acquisitionSource
- createdAt

## AIProject

Fields:

- id
- title
- description
- branches
- interests
- experienceLevels
- difficulty
- buildTime
- stack
- learningOutcomes

## College

Fields:

- id
- name
- registrations
- target
- rank

## Referral

Fields:

- id
- referrerId
- referredStudentId
- code
- createdAt

## CampaignMetrics

Fields:

- visitors
- matcherStarted
- matcherCompleted
- registrationStarted
- registrations
- shares
- referralRegistrations
- costSpent
- projectedTotal

## ChannelMetric

Fields:

- id
- name
- registrations
- visitors
- conversionRate

---

# 21. Persistence Strategy

The app must work without requiring the evaluator to configure a database.

Preferred default:

**localStorage**

Use it to persist:

- Current user
- Registrations made during demo
- Referral relationships
- Updated college counts
- Simulator settings

Also seed realistic demo data from static TypeScript/JSON files.

Optional:

Provide an adapter or README note for Supabase, but **do not make Supabase mandatory**.

The live demo must work immediately after deployment.

---

# 22. Demo Mode

Add a visible indicator:

**Demo Campaign**

or:

**Simulation Data**

Seed enough data so the dashboard looks populated from first launch.

Create a reset control in Growth Team View:

**Reset Demo Data**

Reset should restore seeded metrics.

Optional:

**Generate Demo Registration**

This can simulate one registration and visibly update metrics.

If implemented, keep it simple and deterministic.

---

# 23. Suggested Technical Stack

Preferred:

- Next.js
- TypeScript
- Tailwind CSS
- Recharts for charts if needed
- Lucide icons
- localStorage
- Static seed data

Use:

- App Router if comfortable
- Reusable components
- Clean responsive design
- Minimal dependencies

Avoid:

- Paid APIs
- LLM API dependency
- Authentication systems
- Complex backend
- Unnecessary databases
- Heavy machine learning
- Large integration work

---

# 24. Design Direction

The product should feel like a modern startup growth tool.

## Visual Style

- Clean
- High contrast
- Modern
- Strong typography
- Rounded cards
- Generous spacing
- Clear progress bars
- Subtle animations
- Excellent mobile responsiveness

Avoid:

- Overly flashy gradients everywhere
- Excessive glassmorphism
- Generic AI robot imagery
- Stock photos
- Fake testimonials
- Dense enterprise UI

Use a consistent design system.

---

# 25. Navigation

Suggested navigation:

Left:

**AI LaunchPass**

Center / right:

- Discover Project
- Leaderboard
- About Workshop

Mode toggle:

**Student View | Growth Team View**

For registered demo user:

- My LaunchPass

---

# 26. Recommended Routes

Suggested structure:

- `/`
- `/match`
- `/project/[id]`
- `/register`
- `/pass`
- `/leaderboard`
- `/growth`
- `/growth/simulator`

Optional simpler architecture:

Keep some views as sections/tabs if this improves demo smoothness.

Astra should choose the cleanest structure.

---

# 27. Referral URL Behavior

Support URLs such as:

`/?ref=JOSEPH7`

or:

`/r/JOSEPH7`

If the latter requires route complexity, use query parameters.

Store incoming referral code in session/local storage until registration completes.

On successful registration:

- Attribute referral
- Increment metrics
- Display confirmation

---

# 28. Source Tracking

Support simple query parameters:

- `utm_source`
- `utm_medium`
- `utm_campaign`
- `ref`

Examples:

`/?utm_source=whatsapp&utm_medium=club&utm_campaign=ai60`

`/?ref=JOSEPH7&utm_source=referral`

Map these into acquisition sources.

---

# 29. Seeded Demo Data

Seed:

- 300–400 registrations worth of aggregate metrics
- 8+ colleges
- 10+ project recommendations
- 4 acquisition channels
- 10+ sample referral leaders

Do NOT create hundreds of unnecessary full user records.

Use aggregated seed metrics where possible.

Seeded data must be easy to understand and modify.

---

# 30. Growth Team Charts

Keep visualizations limited to useful ones.

Recommended:

1. Goal progress bar
2. Registration trend line
3. Acquisition channel bar chart
4. Funnel visualization
5. Campus leaderboard

Avoid redundant charts.

---

# 31. Landing Page Microcopy

Potential copy:

## Headline

**What AI project could you build in 60 minutes?**

## Subheadline

**Get a project matched to your branch, skills and interests — then build it during NxtWave’s free AI workshop.**

## CTA

**Find My Project**

## Supporting line

**3 questions. 30 seconds. No advanced AI experience required.**

---

# 32. Student Dashboard Microcopy

Suggested:

**Your seat is reserved. Now bring your campus with you.**

Referral card:

**2 friends joined through your LaunchPass**

Next milestone:

**1 more referral to unlock the AI Starter Pack**

Campus message:

**Amrita is 9 registrations away from its campus goal.**

Share CTA:

**Invite a Friend**

---

# 33. Growth Dashboard Microcopy

Hero:

**500 Registration Command Center**

Subheadline:

**Test the campaign assumptions, see where registrations come from, and identify the fastest way to close the gap.**

Simulator outcome:

**Projected: 504 registrations**

Status:

**Target achievable under current assumptions**

If below target:

**Projected: 456 registrations**

**44-registration gap**

---

# 34. What NOT to Build

Do not waste time building:

- Full chatbot
- RAG pipeline
- LLM integration
- AI agent
- Complex authentication
- Payment system
- Production email automation
- Real WhatsApp Business API
- Complex backend
- Overbuilt admin permissions
- Huge testing suite
- Large-scale simulation
- ML model training
- Web scraping

The challenge rewards judgment.

The product should demonstrate growth thinking, not technical excess.

---

# 35. Build Priorities

## Priority 0 — Must Work

- Landing page
- Project matcher
- Recommendation result
- Registration
- Referral link generation
- LaunchPass dashboard
- Campus leaderboard
- Growth dashboard
- 500 Goal Simulator
- Seeded data
- Demo labels
- Mobile responsiveness

## Priority 1 — Strong Polish

- WhatsApp share link
- Copy-link button
- Dynamic dashboard updates
- Source attribution
- Progress animations
- Reset Demo Data
- Empty/error states
- Clean loading states

## Priority 2 — Only if Easy

- Web Share API
- Simulate Registration button
- Optional Supabase adapter
- Export metrics JSON/CSV
- QR code for referral link

Do not sacrifice Priority 0 for Priority 2.

---

# 36. Build Sequence for Astra

Astra should execute in roughly this order.

## Phase 1 — Repository Setup

- Inspect existing repo
- Initialize project if needed
- Configure TypeScript
- Configure Tailwind
- Create design primitives
- Add required dependencies

## Phase 2 — Data Layer

- Seed project recommendations
- Seed college leaderboard
- Seed aggregate metrics
- Define TypeScript interfaces
- Implement localStorage helper layer

## Phase 3 — Student Acquisition Flow

- Landing page
- Project matcher
- Recommendation logic
- Project result page
- Registration
- Referral attribution

## Phase 4 — Student Growth Loop

- LaunchPass
- Referral code
- WhatsApp share
- Referral milestones
- Campus leaderboard

## Phase 5 — Growth Team View

- KPI cards
- Funnel
- Channel analytics
- Registration trend
- Campus performance

## Phase 6 — 500 Goal Simulator

- Input controls
- Growth equations
- Projected total
- Gap logic
- Recommendations

## Phase 7 — Polish

- Responsive design
- Copy quality
- Animations
- Empty/error states
- Demo labels
- Accessibility

## Phase 8 — Validation

Run lightweight checks:

- TypeScript build
- Lint if configured
- Main route rendering
- Project matcher flow
- Registration flow
- Referral flow
- Simulator math
- localStorage persistence
- Mobile layout sanity check

Fix any blocking errors.

Avoid spending time on large automated suites.

---

# 37. Acceptance Criteria

The project is complete only when the following are true.

## Student Flow

- [ ] User can start from landing page
- [ ] User can complete project matcher
- [ ] User receives a relevant project
- [ ] User can register
- [ ] Registration persists locally
- [ ] User receives referral code
- [ ] Referral link can be copied
- [ ] WhatsApp share opens correctly
- [ ] LaunchPass shows user details
- [ ] Referral milestone UI works
- [ ] Campus leaderboard renders

## Growth Team Flow

- [ ] Student/Growth mode switch works
- [ ] Growth dashboard renders seeded metrics
- [ ] 500 target progress is visible
- [ ] Funnel metrics are visible
- [ ] Channel breakdown is visible
- [ ] Campus rankings are visible
- [ ] Simulator assumptions can be edited
- [ ] Projection updates immediately
- [ ] Gap is calculated correctly
- [ ] Recommendation appears when under target

## Data / Demo

- [ ] Seed data loads on fresh launch
- [ ] Demo data is labeled as simulated
- [ ] New demo registrations update appropriate local metrics
- [ ] Referral attribution works
- [ ] Reset Demo Data works if implemented

## Technical

- [ ] Production build succeeds
- [ ] No required API key
- [ ] No required backend
- [ ] Mobile-friendly
- [ ] No major console errors
- [ ] README explains how to run and deploy

---

# 38. README Requirements

Astra must create a polished `README.md`.

Include:

1. Project name
2. Challenge context
3. Product thesis
4. Main features
5. Student flow
6. Growth Team flow
7. Growth model
8. Tech stack
9. Local setup
10. Run commands
11. Build commands
12. Deployment instructions
13. Demo data explanation
14. Simulator formula
15. Folder structure
16. Design decisions
17. Limitations
18. Future improvements

---

# 39. Deployment

Prefer:

**Vercel**

The app must be deployable with minimal configuration.

No environment variables should be required for the default demo.

Astra should leave exact deployment instructions.

If deployment is available in Astra’s environment, deploy it.

If deployment is not available, leave the repo completely ready for:

`npm install`

`npm run dev`

and:

`npm run build`

---

# 40. 5-Slide Growth Plan Structure

The app is only one part of the submission.

Prepare content that can later be converted into a maximum 5-slide deck.

## Slide 1 — The Student Problem

Title:

**The problem isn’t awareness. It’s relevance + distribution.**

Include:

- Final-year students see many generic workshops
- They need a concrete outcome
- “Build an AI project in 60 minutes” becomes stronger when personalized
- ₹2,000 means paid acquisition cannot be the primary engine

---

## Slide 2 — Growth Strategy

Title:

**A three-channel plan to reach 500 registrations**

Include:

- Campus Captains
- Clubs / WhatsApp Groups
- Student Referral Loop

Show modeled contributions.

Example:

- Captains: 240
- Clubs: 120
- Referrals: 120–140
- Buffer / organic: remaining

---

## Slide 3 — The Product

Title:

**AI LaunchPass turns the campaign into a growth loop**

Diagram:

Project Matcher  
↓  
Registration  
↓  
Referral Pass  
↓  
Campus Competition  
↓  
More Registrations

Mention:

- Personalized project matching
- Unique referral code
- Campus leaderboard
- Reward milestones

---

## Slide 4 — Why 500 Is Plausible

Title:

**Every assumption is visible and testable**

Show the simulator equation.

Example:

20 captains × 12 = 240

Referral loop:

base × share rate × invites × conversion

Show:

**Projected registrations: 504**

Emphasize:

- Not guaranteed
- Transparent assumptions
- Adjustable plan

---

## Slide 5 — What Was Built / Learned

Title:

**From landing page idea → measurable growth system**

Show:

Initial idea:

Landing page

Rejected because:

It improves conversion but not distribution.

Final:

AI LaunchPass

Include:

- Live asset
- Growth dashboard
- Simulator
- Referral engine
- Key AI learning/rejection points

---

# 41. AI + Learning Notes

Prepare at least three strong examples.

## Example 1 — Landing Page

### Asked AI

“How should I promote the AI workshop?”

### AI Suggested

Build a high-converting landing page with social media, email and WhatsApp promotion.

### Changed

Rejected the landing-page-only approach because the key constraint was not only conversion; it was reaching 500 students with ₹2,000.

Built a referral growth loop instead.

---

## Example 2 — AI Chatbot

### Asked AI

“What AI feature could make the project more impressive?”

### AI Suggested

An AI chatbot that answers workshop questions.

### Changed

Rejected it because it adds technical novelty without materially helping the 500-registration goal.

Used deterministic project personalization and the 500 Goal Simulator instead.

---

## Example 3 — Too Many Channels

### Asked AI

“What channels should the campaign use?”

### AI Suggested

Instagram, LinkedIn, paid ads, email, WhatsApp, Telegram, influencers, clubs, campus ambassadors, Discord and more.

### Changed

Reduced the plan to three primary engines:

1. Campus Captains
2. Clubs / Groups
3. Referral Loop

Reason:

The challenge asks for prioritization and the budget is only ₹2,000.

---

# 42. Reflection Questions

Prepare polished answers.

## What changed between the first idea and final solution?

Initial idea:

A polished workshop landing page.

Final insight:

A landing page helps conversion but cannot create enough distribution by itself.

Final solution:

AI LaunchPass combines project personalization, registration, referral incentives, campus competition and growth measurement.

---

## If you had another 24 hours, what would you improve?

Potential answers:

- Run real usability tests with 10–15 final-year students
- Test two project-matcher hooks
- Validate referral milestone incentives
- Connect Supabase for live multi-user state
- Create actual campaign tracking links
- Run a small campus ambassador experiment
- Compare conversion by branch / project interest

Do not claim these were actually done.

---

## What did AI suggest that you deliberately reject?

Best answer:

A chatbot / generic landing page / many-channel campaign.

Reason:

These added complexity or breadth without improving the primary growth constraint.

---

# 43. 3-Minute Demo Video Structure

Target runtime:

Approximately 2:40–3:00.

## 0:00–0:25 — Problem

Explain:

- 500 students
- 7 days
- ₹2,000
- Paid ads alone will not solve this
- Need a growth loop

## 0:25–1:05 — Student Experience

Demo:

- Landing page
- Project matcher
- Recommendation
- Registration

Explain:

Students first discover a project relevant to them.

## 1:05–1:40 — Referral Loop

Demo:

- LaunchPass
- Referral code
- Share button
- Milestones
- Campus leaderboard

Explain:

Every registration can become another acquisition source.

## 1:40–2:25 — Growth Command Center

Demo:

- KPI cards
- Funnel
- channel split
- campus leaderboard

Then open simulator.

Change one assumption live.

Show projected registrations changing.

## 2:25–2:50 — Learning

Explain:

- First thought was landing page
- Rejected because distribution was harder than conversion
- Rejected chatbot because it did not directly drive registrations

## 2:50–3:00 — Close

Suggested close:

**“The goal wasn’t to build the most complicated AI product. It was to build the smallest system that makes the 500-registration growth strategy measurable, testable and repeatable.”**

---

# 44. Demo Script Requirements

Do not make the demo sound memorized or over-polished.

Use:

- Short sentences
- Clear business reasoning
- Growth terms only where useful
- Product demo instead of long explanation

Avoid:

- Deep implementation detail
- Reading the slides
- Saying AI built everything
- Claiming simulated metrics are real

---

# 45. Submission Folder Structure

Astra should leave the repository organized.

Suggested:

```text
/
├── app/
├── components/
├── data/
├── lib/
├── public/
├── types/
├── README.md
├── plan.md
├── submission/
│   ├── growth-plan.md
│   ├── ai-learning-notes.md
│   ├── video-script.md
│   └── demo-checklist.md
└── package.json
```

If the framework naturally uses a different structure, that is fine.

Astra must create the `submission/` files.

---

# 46. Growth Plan Deliverable

Create:

`submission/growth-plan.md`

It should contain the exact content needed for a maximum 5-slide deck.

Keep it concise.

Each slide should include:

- Slide title
- Main message
- 3–5 bullets maximum
- Suggested visual

Do not create a massive report.

---

# 47. AI Learning Notes Deliverable

Create:

`submission/ai-learning-notes.md`

Include:

- 3 AI interactions
- What was asked
- What AI suggested
- What was changed
- Why the change improved the solution

Also answer:

- What changed from first idea to final solution?
- What would improve with another 24 hours?
- What AI suggestion was rejected and why?

---

# 48. Video Script Deliverable

Create:

`submission/video-script.md`

Include:

- Exact speaking script
- Approximate section timing
- What screen to show during each section
- Target under 3 minutes

---

# 49. Demo Checklist Deliverable

Create:

`submission/demo-checklist.md`

Include a final pre-submission checklist:

- Production build
- Live URL opens
- Student flow works
- Referral flow works
- Growth dashboard works
- Simulator works
- Demo data labels visible
- Mobile layout acceptable
- README complete
- 5-slide plan ready
- AI notes ready
- Video script ready

---

# 50. Evaluation Lens

Before finishing, Astra should review the project as if it were a NxtWave evaluator.

Ask:

## Learnability

Does the solution show iteration from a weaker idea to a better one?

## Ownership

Does it solve the ambiguous problem end-to-end?

## Intent to Grow

Does the reflection show learning instead of pretending the first idea was perfect?

## Bias to Ship

Is there a working asset?

## Problem Solving & Judgment

Did the solution prioritize the registration goal over technical novelty?

Any feature that does not strengthen these dimensions should be reconsidered.

---

# 51. Quality Bar

The final product should feel:

- Intentional
- Coherent
- Real
- Demo-ready
- Easy to understand
- Focused on the business objective

The evaluator should be able to understand the thesis in under 30 seconds:

> **Instead of spending ₹2,000 trying to buy 500 registrations, AI LaunchPass turns each registered student and campus into a distribution channel — and gives the growth team a simulator to test whether the assumptions can actually reach 500.**

---

# 52. Astra Operating Instructions

Astra should treat this project as an end-to-end implementation task.

## Rules

1. Read this entire plan before coding.
2. Inspect the existing repository before changing anything.
3. Make reasonable implementation decisions independently.
4. Do not stop for clarification unless execution is genuinely impossible.
5. Prefer a complete working implementation over speculative complexity.
6. Do not add features simply because they are technically impressive.
7. Keep the default app free of mandatory external services.
8. Use seeded demo data responsibly and label it.
9. Run lightweight tests/checks after major implementation stages.
10. Fix issues found during those checks.
11. Do not run long simulations, model training, huge test suites, or unnecessary benchmarks.
12. Keep the repository clean.
13. Document major decisions.
14. Leave the app ready to run and deploy.
15. Create all required `submission/` files.
16. If a design/implementation detail is unspecified, choose the option that best supports:
    - clarity
    - reliability
    - demo quality
    - speed to ship

---

# 53. Definition of Done

The project is done when:

- The application works end-to-end.
- It clearly demonstrates a plausible path to 500 registrations.
- It goes beyond a generic landing page.
- The referral mechanism is functional.
- Campus competition is visible.
- The Growth Command Center is convincing.
- The 500 Goal Simulator is interactive.
- Synthetic data is clearly labeled.
- The product runs without external API configuration.
- The production build passes.
- README is complete.
- Submission documents exist.
- A reviewer can demo the project in under 3 minutes.
- No major blocker remains.

---

# 54. Final Product Narrative

The final submission should communicate this story:

### Step 1

The first instinct was to build a better landing page.

### Step 2

The core constraint was recognized:

**₹2,000 cannot reliably buy 500 student registrations.**

### Step 3

Therefore, the product had to create distribution.

### Step 4

AI LaunchPass was built to:

- make the workshop personally relevant,
- convert interested students,
- turn registered students into referrers,
- create campus competition,
- measure every growth assumption.

### Step 5

The 500 Goal Simulator exposes the assumptions instead of hiding them.

### Final Message

**This is not just a workshop website. It is a small growth system designed around the exact constraint of the challenge.**

---

# 55. Start Execution

Astra should now:

1. Inspect the repository.
2. Create or update the project architecture.
3. Implement Priority 0 features first.
4. Add Priority 1 polish.
5. Run lightweight validation.
6. Fix errors.
7. Create the submission documents.
8. Finish with:
   - concise build summary,
   - exact run commands,
   - exact deployment instructions,
   - any remaining limitations.

Do not merely describe what should be built.

**Build it.**
