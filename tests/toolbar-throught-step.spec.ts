import { expect, test } from '@playwright/test';

import { CernToolbar } from '../models/toolbar';

test('Home page toolbar', async ({ page }) => {
  // Slow test will be given triple the default timeout
  // See https://playwright.dev/docs/api/class-test#test-slow-1
  test.slow();

  // Test steps
  // See https://playwright.dev/docs/api/class-test#test-step
  await test.step('Open the page', async () => {
    await page.goto('/');
  });

  await test.step('Should have proper page title', async () => {
    // Failed soft assertions do not terminate test execution, but mark the test as failed
    // See https://playwright.dev/docs/test-assertions#soft-assertions
    await expect.soft(page, 'Should have "Home" in title').toHaveTitle(/Home/);
  });

  await test.step('Should have toolbar', async () => {
    const toolbar = new CernToolbar(page);
    const topToolbar = await toolbar.getToolbar();
    await expect(topToolbar, 'Should have visible toolbar').toBeVisible();
  });

  await test.step('Should have proper toolbar title', async () => {
    const toolbar = new CernToolbar(page);
    const toolbarH1 = await toolbar.getToolbarH1();
    await expect(toolbarH1, 'Should have "CERN" in toolbar title').toHaveText(
      /CERN/,
    );
  });
});
