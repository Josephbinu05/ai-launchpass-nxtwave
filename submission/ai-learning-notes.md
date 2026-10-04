# AI + learning notes

These three examples are **reconstructed design reflections from `plan.md`**, written in the requested “asked / suggested / changed” format. They are not verbatim conversations or proof that these exchanges historically occurred. The supplied brief already contained the landing-page, chatbot and channel-prioritization examples. AI-assisted implementation then turned that brief into the working prototype and supporting documents.

## 1. From a landing page to a distribution loop

**What was asked — reconstructed:** “How should I promote the free AI workshop to 500 final-year students in seven days with ₹2,000?”

**What AI suggested — scenario from the brief:** A high-converting landing page promoted through social media, email and WhatsApp.

**What was changed:** Keep a clear landing page, but connect it to project discovery, registration, a personal referral pass, campus participation and channel measurement. Recruit captains and clubs to create the initial audience.

**Why this improves the solution:** Conversion only helps after someone arrives. The constraint demands a credible source of low-cost reach. The final product gives a registered student a specific sharing action and gives the team a way to inspect its contribution.

**Evidence in the asset:** Complete the matcher and registration, open the LaunchPass, then switch to the Growth Team view.

## 2. From an impressive AI feature to a useful decision tool

**What was asked — reconstructed:** “What AI feature would make this workshop asset more useful?”

**What AI suggested — scenario from the brief:** An AI chatbot to answer workshop questions.

**What was changed:** Use a deterministic weighted project matcher and an interactive 500 Goal Simulator. The app makes no external LLM calls. Three student answers select from a curated project library; editable assumptions calculate the expected registration total.

**Why this improves the solution:** A chatbot would introduce setup and response-quality risks without resolving distribution. The matcher makes the workshop relevant; the simulator exposes whether the acquisition strategy is plausible. Both can run immediately without a paid service.

**Evidence in the asset:** The default model is 504. Lower referral conversion from 40% to 30% and it becomes 468. That visible gap is a useful decision signal, not a generated reassurance.

## 3. From many channels to a manageable seven-day campaign

**What was asked — reconstructed:** “Which channels should this campaign use?”

**What AI suggested — scenario from the brief:** A broad mix of Instagram, LinkedIn, paid ads, email, WhatsApp, Telegram, influencers, clubs, ambassadors and Discord.

**What was changed:** Focus execution on campus captains, clubs/department groups and student referrals. Organic remains a tracked channel, but contributes zero to the default plan. Put the entire proposed ₹2,000 incentive allocation into a simple ₹1,000 / ₹600 / ₹400 structure.

**Why this improves the solution:** Seven days leaves little time to operate many channels well. Three engines have explicit contribution targets, clear owners and daily corrective actions. Avoiding an assumed organic buffer makes the target calculation easier to challenge.

**Evidence in the asset:** Acquisition breakdown and simulator inputs match these engines. The five-slide plan includes a concrete daily operating schedule.

## What changed between the first idea and final solution?

The brief's first idea was a polished workshop landing page. The stronger version connects relevance to distribution: project discovery, registration, sharing, campus progress and measurement. The biggest improvement is the visible link between product features and the 500-registration target. The simulator also prevents a polished UI from hiding weak growth assumptions.

## What would another 24 hours improve?

First, observe 10–15 final-year students trying the matcher and registration; note where they hesitate and whether the recommended outcome is appealing. Test two short invitation hooks with consenting campus contacts and ask whether the proposed milestones are useful. Then revise the weakest assumption in the simulator.

For a real campaign, replace browser-local data with a shared database and protected growth-team access. Add consent, deduplication, verified referrals and event instrumentation before collecting real student details. None of this research or production rollout is claimed as completed.

## What suggestion was deliberately rejected, and why?

The chatbot and the broad channel list in the reconstructed examples were rejected as design directions. They add complexity or execution spread without a clear contribution to the primary constraint. A deterministic matcher, focused distribution plan and transparent simulator were more useful within the scope.

## What should the evaluator keep in mind?

The app demonstrates the mechanics locally. Seeded registrations are synthetic; demo registrations do not reserve real seats. Referral rewards are campaign concepts, and referral attribution does not sync between browsers. The **504** projection assumes one referral generation, unique qualified registrations and no channel overlap. It is a hypothesis to validate, not a campaign result or guarantee.
