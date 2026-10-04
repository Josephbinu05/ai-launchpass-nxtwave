# AI LaunchPass — demo and submission checklist

Only mark a box after observing the result. The app is a simulation: use fictional data. A local build is not evidence of a live deployment, and a script is not a finished video.

## Automated checks

- [x] `npm ci` installs dependencies successfully.
- [x] `npm run typecheck` succeeds.
- [x] `npm run lint` succeeds.
- [x] `npm test` passes the focused domain tests.
- [x] `npm run build` succeeds and produces `out/`.
- [x] `npm start` serves the production export on port 3000.
- [x] `npm run test:e2e` passes the configured browser checks.

## Student and referral flow

- [x] Start on the landing page and complete all three matcher questions.
- [x] Inspect a relevant project result with stack, learning outcomes and build time.
- [x] Check required fields, invalid email and invalid phone feedback.
- [x] Register using fictional details; verify the pass shows the selected project and college.
- [x] Refresh and verify the registration persists in this browser.
- [x] Copy the generated referral link and check it contains the participant's code.
- [x] Inspect the WhatsApp destination and prepared message; sending a message is not required for this check.
- [x] Open a known referral link in the same browser, complete a second fictional registration, and verify attribution and local count changes.
- [x] Check the referral milestones and the current student's college highlight.
- [x] Verify the empty pass state provides a way to discover/register.

**Referral demo note:** For a locally created code, keep both registrations on the same browser and origin. A separate device cannot resolve that participant because no shared backend exists. A seeded referral code can demonstrate attribution on a fresh browser. Do not present this as production cross-device tracking.

## Growth Team and simulator

- [x] Switch between Student and Growth Team views.
- [x] Verify fresh seeded totals show 386 registrations, with visible simulation labeling.
- [x] Check goal progress, funnel conversion, channel breakdown and campus rankings.
- [x] Verify a new demo registration changes the relevant local totals.
- [x] Confirm the default model: `240 captains + 120 clubs + 144 referrals = 504`.
- [x] Lower referral conversion from 40% to 30%; confirm **468**, a **32** gap, and a useful recommendation.
- [x] Restore 40%; confirm **504** and that simulator changes persist after refresh.
- [x] Check a boundary case with no captains, clubs or organic contributions; the projection should not invent registrations.
- [x] Use **Reset Demo Data** and confirm the seeded state returns.

## Visual and runtime sanity

- [x] Read the landing page, form, pass and growth tools at a narrow mobile width without horizontal clipping.
- [x] Verify buttons, radio/options and inputs can be reached by keyboard.
- [x] Check that focus, field errors and copied-link feedback are visible.
- [x] Check the browser console during the main demo flow for blocking errors.
- [x] Confirm no API key or backend configuration is needed.
- [x] Confirm synthetic campaign figures and prototype rewards remain clearly labeled.

## Hosting and final submission

- [x] Deploy the built app; Sites confirmed the owner-private deployment succeeded.
- [ ] Verify access from an evaluator's browser after publishing to a public host.
- [ ] Confirm referral query parameters survive navigation on the deployed origin.
- [ ] Check student and growth views at the deployed URL.
- [x] README contains local setup, commands, static export, Vercel deployment, assumptions and limitations.
- [x] Five-slide growth plan content is ready in `growth-plan.md`.
- [x] AI notes are ready and reconstructed examples are explicitly identified.
- [x] Under-three-minute video speaking script is ready.
- [ ] Convert the growth-plan content into the final deck or two-page submission format if required by the submission portal.
- [ ] Record the video, verify its duration is below 3:00, and upload it where the submission requires.
- [ ] Add the actual working-asset and video links to the final submission.

**Live URL:** [AI LaunchPass private preview](https://ai-launchpass-growth-demo.joseph12378908.chatgpt.site). Owner-only access; Sites confirmed deployment success on 5 October 2026. Public evaluator access and hosted-origin browser checks are not claimed. Use the README's Vercel instructions for a public interview link.

**Video URL:** Not recorded in this checklist. Add only after recording and upload.

## Evidence log

Verified 5 October 2026 on Windows with Microsoft Edge against the production export. TypeScript, ESLint, 13 domain tests and six browser acceptance tests pass. The browser suite covers all eight main routes at 1280px and 390px, registration and referral persistence, clipboard text, WhatsApp URL, generated referrals, campus target changes, 504/468 projections, gap recommendations, budget overflow, reset, required/invalid fields, unknown referral codes and corrupt-storage recovery. No browser console errors or uncaught exceptions occurred. Desktop and mobile screenshots were inspected. Production build exports all project routes; a build finalizer fixes Next.js Windows route-payload paths. Deployment, slide export and recording remain separate until verified below.

Sites deployment `appgdep_6ac2dced3e1c8191abfffcc84a5c44d3` succeeded from source commit `51d83c7d5f32de9d255e62f8102919dc5fe5ff24`. The build uses static assets only. The local Windows packager required Git Bash and `TAR_OPTIONS=--force-local`; this is a hosting-helper detail, not a requirement to run or deploy through Vercel. Keyboard checks confirmed Tab reaches the skip link, Space selects matcher options, and focus outlines are visible. The browser's zero-base scenario projects zero registrations.
