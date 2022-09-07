import { test, expect } from '@playwright/test';
import { CernToolbar } from './models/toolbar';

test('Home page toolbar', async ({ page }) => {
  // Slow test will be given triple the default timeout.
  // See https://playwright.dev/docs/api/class-test#test-slow-1
  test.slow();

  await test.step('Open the page', async () => {
    await page.goto('/');
  });

  await test.step('Should have proper page title', async () => {
    // Failed soft assertions do not terminate test execution, but mark the test as failed.
    // See https://playwright.dev/docs/test-assertions#soft-assertions
    await expect.soft(page, 'Should have "Home" in title').toHaveTitle(/Home/);
  });

  await test.step('Should have toolbar', async () => {
    const toolbar = new CernToolbar(page);
    const toolbarVisibility = await toolbar.getToolbarVisibility();
    await expect(toolbarVisibility, 'Should have visible toolbar').toBeTruthy();
  });

  await test.step('Should have proper toolbar title', async () => {
    const toolbar = new CernToolbar(page);
    const toolbarH1 = await toolbar.getToolbarH1();
    await expect(toolbarH1, 'Should have "CERN" in toolbar title').toHaveText(
      /CERN/
    );
  });
});
