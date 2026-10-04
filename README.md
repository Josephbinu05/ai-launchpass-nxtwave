# AI LaunchPass

**A workshop prototype built around a growth problem: 500 final-year engineering students, ₹2,000, seven days.**

AI LaunchPass helps a student find a relevant AI project, create a demo workshop pass and invite friends. The Growth Team view connects that experience to funnel metrics, campus participation and an adjustable 500-registration model.

This is an independent NxtWave Growth Challenge submission prototype. The workshop is **“Build Your First AI Project in 60 Minutes.”** Campaign numbers are synthetic; registration does not reserve an actual workshop seat, and reward milestones do not promise actual rewards. No campaign has been executed through this app.

**Hosted preview:** [Open AI LaunchPass](https://ai-launchpass-growth-demo.joseph12378908.chatgpt.site). Published successfully through Sites on 5 October 2026 with owner-only access. This is a private preview, not a publicly accessible interview link. Use the Vercel steps below to deploy a public submission link under your account.

## Run locally

Requires **Node.js 22 or newer** and npm. No API keys, environment variables, database or account setup are needed.

```bash
npm install
npm run dev
```

Open [localhost:3000](http://localhost:3000). Use fictional registration details: the demo keeps entered data in this browser.

For a reproducible install after cloning the repository with its lockfile, use `npm ci` in place of `npm install`.

## What to try

| Student View | Growth Team View |
| --- | --- |
| Answer three questions about branch, experience and interests. | Inspect the seeded 386 registrations and progress toward 500. |
| Get a project recommendation with stack, learning outcomes and build time. | Compare funnel stages, acquisition sources and campus activity. |
| Register with fictional details and receive a personal LaunchPass. | Change the simulator assumptions and see the projection immediately. |
| Copy a referral link or prepare a WhatsApp message. | Follow calculated suggestions when the projection falls below 500. |
| See referral milestones and the campus leaderboard. | Reset local demo data to the starting scenario. |

The interface keeps the student and growth experiences in one application so an evaluator can follow the full loop quickly. See [the timed demo script](submission/video-script.md) for a walkthrough under three minutes.

## Growth thesis

Personal relevance gives students a reason to join. Campus captains and clubs provide initial distribution. A referral pass gives each registration a way to bring the next student. The dashboard makes assumptions and drop-offs visible.

The proposed campaign has three primary engines:

| Engine | Base assumption | Modeled registrations |
| --- | --- | ---: |
| Campus captains | 20 captains × 12 direct registrations | 240 |
| Clubs and department groups | Permission-based group distribution | 120 |
| Student referrals | One referral generation from the 360-person base | 144 |
| Organic | No contribution required by the default model | 0 |
| **Total** | **Assumptions to validate during the seven days** | **504** |

The proposed captain incentive budget is ₹1,000 / ₹600 / ₹400 for the top three verified contributors, totaling ₹2,000. These are planning assumptions. No funds are spent and no prizes are awarded by this app.

## Simulator formula

```text
captainRegistrations = captains × directRegistrationsPerCaptain
baseRegistrations    = captainRegistrations + clubRegistrations
referralRegistrations = round(baseRegistrations × shareRate
                        × qualifiedInvitesPerSharer × referralConversion)
projectedTotal       = baseRegistrations + referralRegistrations + organic
gap                  = max(0, 500 - projectedTotal)
```

Default assumptions give `20 × 12 + 120 = 360` base registrations, then `360 × 0.40 × 2.5 × 0.40 = 144` referrals, for **504** registrations. Percentages are used as fractions in the calculation; the referral result is rounded to a whole registration once. The model counts one referral generation; it does not repeatedly compound referrals. Organic registrations are added separately and are not included in the referral base.

This is a scenario calculation, not a forecast trained on real campaign results. It assumes unique, qualified registrations without overlap between channels. The small margin matters: reducing referral conversion from 40% to 30% produces **468**, a **32-registration gap**. At that conversion, three more captains contributing 12 direct registrations each would bring the modeled total above 500. Validate conversion and overlap before treating these contributions as achievable.

Budget affects the planning and cost display; spending alone does not generate registrations in the formula. The dashboard's seeded campaign snapshot and simulator projection describe different things and should not be presented as observed results.

## Data, attribution and privacy

- The starting snapshot contains **386 synthetic aggregate registrations**. It uses campus/channel totals and a small set of sample referral leaders, rather than hundreds of fabricated student records.
- Registrations created in the demo are added locally to those aggregates. The app persists demo state and simulator settings in `localStorage` on the current browser and origin.
- Incoming `ref`, `utm_source`, `utm_medium` and `utm_campaign` parameters support demo attribution. An example club link is `/?utm_source=whatsapp&utm_medium=club&utm_campaign=ai60`. Referral links use `/?ref=CODE`; `/?ref=RIYA24` is a seeded example usable in a fresh browser.
- Referral attribution can resolve a seeded code or a participant stored in the same browser. **Another device or browser cannot look up a newly created local participant.** This is not a shared registration database or a real campaign analytics service.
- Copying or opening a share composer indicates sharing intent; the app cannot confirm that a message was sent, read or converted outside its local demo.
- Use fictional names and contact details. Entered data is not submitted to a backend. A copied referral link or prepared WhatsApp message goes to the chosen external destination only when the user takes that action.
- **Reset Demo Data** clears local demo progress and restores the seeded scenario. Browser site-data clearing also removes locally saved data. State does not sync between localhost and a deployed URL.

## Commands and validation

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Next.js development server. |
| `npm run typecheck` | Check TypeScript without generating JavaScript. |
| `npm run lint` | Run the configured ESLint checks. |
| `npm test` | Run the focused domain tests. |
| `npm run build` | Produce the static production export in `out/`. |
| `npm start` | Serve the built `out/` directory on port 3000. Run the build first. |
| `npm run test:e2e` | Run the configured Playwright browser checks. |

Browser checks use the installed Microsoft Edge browser on Windows. On other platforms, install Playwright's Chromium once with `npx playwright install chromium`. Build before running `npm run test:e2e`; its configuration starts the static server if one is not already running on port 3000.

To inspect the production artifact locally:

```bash
npm run build
npm start
```

The production script deliberately serves static files because this project uses `output: 'export'`. `next start` is not the serving command for this export. Next.js creates the `out/` assets during the build; these can be hosted by a static web server. See the [official static export guide](https://nextjs.org/docs/app/guides/static-exports).

Actual verification status and pre-submission checks are recorded in [the demo checklist](submission/demo-checklist.md). Do not infer that a deployment or a recorded video exists from the presence of its instructions.

## Deploy to Vercel

The app requires no runtime secrets. To explicitly deploy the static export:

1. Push this project, including `package.json` and `package-lock.json`, to a Git repository accessible to your Vercel account.
2. In Vercel, choose **Add New → Project**, import the repository, and set the root directory to the directory containing `package.json`.
3. Select **Other** as the Framework Preset and configure these overrides:

   | Setting | Value |
   | --- | --- |
   | Install command | `npm ci` |
   | Build command | `npm run build` |
   | Output directory | `out` |
   | Node.js version | `22.x` or a supported newer version |
   | Environment variables | None |

4. Deploy and open the resulting HTTPS URL. Complete one fictional registration and verify that the Growth Team view updates locally.
5. Open a referral query URL on the deployed origin, check the mobile layout, and record the actual URL in your submission. Use that deployment's own referral links; localhost links only work on the local machine.

These explicit settings use Vercel's static build output support. See [Vercel's build configuration documentation](https://vercel.com/docs/builds/configure-a-build). A deployment still requires access to a Vercel account; this repository does not include hosting credentials or claim a public deployment.

For another static host, run `npm ci` and `npm run build`, then publish the **contents of `out/`** at the site root. Serve over HTTP(S), rather than opening `out/index.html` directly as a file.

## Technology and structure

Next.js 16 App Router, React, TypeScript, custom CSS, Lucide icons, browser `localStorage`, ESLint, focused Node/tsx domain tests and Playwright browser checks. There is no paid API or LLM call at runtime.

DM Sans and Manrope variable fonts are bundled through Fontsource, so the demo does not depend on Google Fonts or another remote asset service. The build includes a small export finalizer that adds portable route-payload aliases for the [Next.js Windows static-export issue](https://github.com/vercel/next.js/issues/85374). It preserves the framework's original output and prevents failed navigation-prefetch requests on ordinary static hosts.

```text
app/                 App entry, metadata and styles
components/          Student and growth interfaces
data/                Project library and synthetic campaign seed
lib/                 Matching, attribution, storage and campaign calculations
types/               Shared TypeScript models
tests/               Focused verification
scripts/             Portable static-export finalizer
submission/          Growth plan, AI reflections, video script and checklist
README.md            Run, deploy and evaluate the prototype
plan.md              Original implementation brief
out/                 Generated static build; created by npm run build
```

The app includes `/`, `/match`, `/project/[id]`, `/register`, `/pass`, `/leaderboard`, `/growth` and `/growth/simulator`. Project pages are generated from the curated library during the static build. Use the navigation to move through the flow.

## Decisions and limits

**Deterministic matching:** a weighted project library makes results fast, consistent and explainable. “AI Project Matcher” means matching a student to an AI project; it is not an LLM responding to a prompt. The build times describe a guided prototype using prepared assets, not a production-ready application.

**Local persistence:** the evaluator can try the whole demo immediately. The tradeoff is that saved registrations, identity, referral relationships and analytics belong to one browser. There is no authentication, cross-device deduplication, verified attendance, fraud prevention or production consent workflow.

**Simple scenario model:** one generation exposes the referral assumptions without hiding risk behind compounding. It does not simulate network overlap, time delays or student quality. The 504 default total has very little buffer.

**Focused UI and dependencies:** custom CSS, lightweight charts and a single coherent demo flow keep the build easy to run. No chatbot, payment integration, automated messages, live workshop delivery or real reward redemption is included.

**Honest evidence:** seed metrics are examples. A browser registration is a prototype interaction. AI learning examples reconstructed from the brief are labeled as such, and no unobserved student research is claimed.

## Next improvements

With another 24 hours, test the hook and matcher with 10–15 final-year students, compare two invitation messages, and validate whether the proposed milestones motivate sharing. Before a real campaign, add a shared database, explicit consent, protected growth-team access, verified and deduplicated referrals, event instrumentation and delivery details. Use early campaign observations to replace simulator assumptions.

## Submission package

- [Five-slide growth plan](submission/growth-plan.md)
- [AI and learning notes](submission/ai-learning-notes.md)
- [Timed video script](submission/video-script.md)
- [Demo and submission checklist](submission/demo-checklist.md)

The plan is ready to transfer into five slides. The video script is ready to record; it is not a recorded video.

## Verified implementation

Verified on 5 October 2026 with the production static export and Microsoft Edge: the complete student-to-growth flow, local referral attribution, clipboard contents, WhatsApp link payload, reload persistence, campus highlighting, generated registrations, editable campus milestones, default 504 projection, 468 sensitivity scenario, recommendation application, budget feedback, demo reset, form validation and corrupt-storage recovery. The eight main screens fit 1280px and 390px viewports without horizontal page overflow. Browser tests assert no console errors or uncaught exceptions.

The focused suite contains 13 domain tests and six browser tests. The domain suite covers all 144 branch/experience/interest combinations. These are prototype acceptance checks, not evidence of campaign performance or cross-device referral tracking.
