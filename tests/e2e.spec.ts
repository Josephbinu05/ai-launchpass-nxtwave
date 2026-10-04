import { expect, test, type Page } from '@playwright/test';

const browserErrors = new WeakMap<Page, string[]>();

test.beforeEach(async ({ page }) => {
  const errors: string[] = [];
  browserErrors.set(page, errors);
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => {
    if (message.type() === 'error') errors.push(message.text());
  });
});

test.afterEach(async ({ page }, testInfo) => {
  const errors = browserErrors.get(page) ?? [];
  if (errors.length) {
    await testInfo.attach('browser-errors', { body: errors.join('\n'), contentType: 'text/plain' });
  }
  expect(errors, 'The demo should not emit browser console errors or uncaught exceptions.').toEqual([]);
});

async function registerSample(page: Page, name: string, email: string, phone: string) {
  await page.getByRole('textbox', { name: 'Full name', exact: true }).fill(name);
  await page.getByRole('textbox', { name: 'Email address', exact: true }).fill(email);
  await page.getByRole('textbox', { name: 'Phone number', exact: true }).fill(phone);
  await page.getByRole('combobox', { name: 'College', exact: true }).selectOption('VIT');
  await page.getByRole('combobox', { name: 'Engineering branch', exact: true }).selectOption('CSE / IT');
  await page.getByRole('button', { name: 'Create My LaunchPass', exact: true }).click();
  await expect(page).toHaveURL(/\/pass\/?$/);
  await expect(page.getByRole('heading', { name, exact: true })).toBeVisible();
}

test('student discovery, saved pass, copied invitation and same-browser referral form one working loop', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.goto('/');
  await expect(page.getByText('Demo Campaign', { exact: true })).toBeVisible();
  await page.getByRole('link', { name: 'Find My AI Project', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Continue', exact: true })).toBeDisabled();
  await page.getByRole('button', { name: /CSE \/ IT/ }).click();
  await page.getByRole('button', { name: 'Continue', exact: true }).click();
  await page.getByRole('button', { name: /Beginner — little\/no coding/ }).click();
  await page.getByRole('button', { name: 'Continue', exact: true }).click();
  await page.getByRole('button', { name: /Career \/ Resume/ }).click();
  await page.getByRole('button', { name: 'Find my match', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Meet your AI project match.', exact: true })).toBeVisible();
  const projectTitle = await page.getByRole('article').getByRole('heading', { level: 2 }).innerText();
  expect(projectTitle).toMatch(/Resume|Interview/);
  await page.getByRole('link', { name: 'Reserve My Seat', exact: true }).click();
  await registerSample(page, 'Riya Demo', 'riya.demo@example.com', '9000000001');
  await expect(page.getByRole('heading', { name: projectTitle, exact: true })).toBeVisible();

  await page.reload();
  await expect(page.getByRole('heading', { name: 'Riya Demo', exact: true })).toBeVisible();
  const invitation = await page.getByRole('textbox', { name: 'Your personal invitation link', exact: true }).inputValue();
  const referralCode = new URL(invitation).searchParams.get('ref');
  expect(referralCode).toBeTruthy();
  await page.getByRole('button', { name: 'Copy Link', exact: true }).click();
  await expect(page.getByRole('status')).toHaveText('Referral link copied. Share it with a friend!');
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(invitation);
  const whatsapp = await page.getByRole('link', { name: 'Share on WhatsApp' }).getAttribute('href');
  expect(new URL(whatsapp!).hostname).toBe('wa.me');
  expect(new URL(whatsapp!).searchParams.get('text')).toContain(invitation);

  await page.goto(invitation);
  await page.getByRole('link', { name: 'My LaunchPass', exact: true }).click();
  await page.getByRole('link', { name: 'Register another demo student' }).click();
  await expect(page.getByRole('textbox', { name: /Referral code/ })).toHaveValue(referralCode!);
  await registerSample(page, 'Alex Demo', 'alex.demo@example.com', '9000000002');
  await page.getByRole('combobox', { name: 'View a local LaunchPass' }).selectOption({ label: 'Riya Demo' });
  await expect(page.getByRole('heading', { name: 'Riya Demo', exact: true })).toBeVisible();
  await expect(page.getByText('1 referral · Unlocked in this demo', { exact: true })).toBeVisible();

  await page.getByRole('link', { name: 'See your campus on the leaderboard' }).click();
  const campus = page.getByRole('row').filter({ has: page.getByText('YOUR CAMPUS', { exact: true }) });
  await expect(campus).toContainText('VIT');
  await expect(campus.getByRole('cell', { name: '74', exact: true })).toBeVisible();
  await page.getByRole('link', { name: 'Growth Team View', exact: true }).click();
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  const totalRegistrations = page.getByRole('article').filter({ has: page.getByText('Total registrations', { exact: true }) });
  const referralRegistrations = page.getByRole('article').filter({ has: page.getByText('Referral registrations', { exact: true }) });
  await expect(totalRegistrations).toContainText(/388\s*\/\s*500/);
  await expect(referralRegistrations).toContainText('143');
});

test('growth assumptions update immediately, persist, and reset to the seeded scenario', async ({ page }) => {
  await page.goto('/growth/');
  const totalRegistrations = page.getByRole('article').filter({ has: page.getByText('Total registrations', { exact: true }) });
  await expect(totalRegistrations).toContainText(/386\s*\/\s*500/);
  await page.getByRole('link', { name: 'Test the 500 goal' }).click();
  await expect(page.getByLabel('Projected registrations', { exact: true })).toContainText('504');
  await page.getByRole('spinbutton', { name: 'Invite → registration', exact: true }).fill('30');
  await expect(page.getByLabel('Projected registrations', { exact: true })).toContainText('468');
  await expect(page.getByText('32 more registrations needed', { exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Try this assumption' }).first().click();
  await expect(page.getByRole('spinbutton', { name: 'Campus captains', exact: true })).toHaveValue('23');
  await expect(page.getByLabel('Projected registrations', { exact: true })).toContainText('515');
  await page.getByRole('button', { name: 'Reset assumptions', exact: true }).click();
  await page.getByRole('spinbutton', { name: '1st place ₹', exact: true }).fill('1500');
  await expect(page.getByRole('main').getByRole('alert')).toContainText('₹500');
  await page.getByRole('button', { name: 'Try this assumption' }).first().click();
  await expect(page.getByRole('main').getByRole('alert')).toHaveCount(0);
  await page.getByRole('spinbutton', { name: 'Campus captains', exact: true }).fill('10');
  await expect(page.getByLabel('Projected registrations', { exact: true })).toContainText('336');
  await expect(page.getByText('Recruit 10 more campus captains', { exact: true })).toBeVisible();
  await page.reload();
  await expect(page.getByRole('spinbutton', { name: 'Campus captains', exact: true })).toHaveValue('10');
  await expect(page.getByLabel('Projected registrations', { exact: true })).toContainText('336');
  await page.goto('/growth/');
  await page.getByRole('button', { name: 'Reset demo', exact: true }).click();
  await page.getByRole('button', { name: 'Reset demo data', exact: true }).click();
  await expect(page.getByRole('status')).toHaveText('Demo reset. Original simulated campaign restored.');
  await expect(totalRegistrations).toContainText(/386\s*\/\s*500/);
  await page.goto('/growth/simulator/');
  await expect(page.getByRole('spinbutton', { name: 'Campus captains', exact: true })).toHaveValue('20');
  await expect(page.getByLabel('Projected registrations', { exact: true })).toContainText('504');
});

test('empty state, form validation, unknown referrals and corrupt storage recover visibly', async ({ page }) => {
  await page.goto('/pass/');
  await expect(page.getByRole('heading', { name: 'Your next chapter needs a LaunchPass.' })).toBeVisible();
  await page.goto('/register/?ref=UNKNOWN');
  await page.getByRole('button', { name: 'Create My LaunchPass', exact: true }).click();
  await expect(page.getByRole('textbox', { name: 'Full name', exact: true })).toBeFocused();
  await page.getByRole('textbox', { name: 'Full name', exact: true }).fill('Sample Builder');
  await page.getByRole('textbox', { name: 'Email address', exact: true }).fill('not-email');
  await page.getByRole('textbox', { name: 'Phone number', exact: true }).fill('123');
  expect(await page.getByRole('textbox', { name: 'Email address', exact: true }).evaluate((el: HTMLInputElement) => el.validity.typeMismatch)).toBe(true);
  expect(await page.getByRole('textbox', { name: 'Phone number', exact: true }).evaluate((el: HTMLInputElement) => el.validity.patternMismatch)).toBe(true);
  await page.getByRole('textbox', { name: 'Email address', exact: true }).fill('sample@example.com');
  await page.getByRole('textbox', { name: 'Phone number', exact: true }).fill('9000000042');
  await page.getByRole('combobox', { name: 'College', exact: true }).selectOption('VIT');
  await page.getByRole('combobox', { name: 'Engineering branch', exact: true }).selectOption('CSE / IT');
  await page.getByRole('button', { name: 'Create My LaunchPass', exact: true }).click();
  await expect(page.getByRole('main').getByRole('alert')).toContainText('referral code is not available');
  await page.getByRole('textbox', { name: /Referral code/ }).fill('');
  await page.getByRole('button', { name: 'Create My LaunchPass', exact: true }).click();
  await expect(page).toHaveURL(/\/pass\/?$/);
  await page.evaluate(() => localStorage.setItem('ai-launchpass:v1', 'broken JSON'));
  await page.reload();
  await expect(page.getByRole('heading', { name: 'Your next chapter needs a LaunchPass.' })).toBeVisible();
  await expect(page.getByRole('status')).toContainText('Saved demo data could not be loaded');
});

test('generated demo registrations update referrals and campus totals without setup', async ({ page }) => {
  await page.goto('/growth/');
  await page.getByRole('button', { name: 'Generate demo registration', exact: true }).click();
  await expect(page.getByRole('article').filter({ has: page.getByText('Total registrations', { exact: true }) })).toContainText('387');
  await expect(page.getByRole('article').filter({ has: page.getByText('Referral registrations', { exact: true }) })).toContainText('143');
  await page.getByRole('spinbutton', { name: 'Campus milestone', exact: true }).fill('75');
  await page.getByRole('link', { name: 'Student View', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Demo Student 1', exact: true })).toBeVisible();
  await page.getByRole('link', { name: 'See your campus on the leaderboard' }).click();
  const campus = page.getByRole('row').filter({ has: page.getByText('YOUR CAMPUS', { exact: true }) });
  await expect(campus).toContainText('Amrita University');
  await expect(campus).toContainText('65');
  await expect(campus).toContainText('of 75');
});

for (const width of [1280, 390]) {
  test(`the key screens fit a ${width}px viewport without page overflow`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/register/');
    await registerSample(page, 'Layout Demo', 'layout.demo@example.com', '9000000003');
    for (const route of ['/', '/match/', '/project/resume-screener/', '/register/', '/pass/', '/leaderboard/', '/growth/', '/growth/simulator/']) {
      await page.goto(route);
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
      await expect(page.getByText('Demo Campaign', { exact: true })).toBeVisible();
      await expect.poll(
        () => page.evaluate(() => Math.max(document.documentElement.scrollWidth, document.body.scrollWidth) - window.innerWidth),
        { message: `${route} should fit the ${width}px viewport without horizontal page scrolling.` },
      ).toBeLessThanOrEqual(1);
    }
  });
}
