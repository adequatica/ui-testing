import { test, expect, Page } from '@playwright/test';
import { CernToolbar } from '../models/toolbar';

let page: Page;

test.beforeAll(async ({ browser }) => {
  const context = await browser.newContext();
  page = await context.newPage();
});

test.afterAll(async () => {
  await page.close();
});

test.describe('Home page toolbar', async () => {
  // Running tests sequentially
  // See https://playwright.dev/docs/api/class-test#test-describe-configure
  test.describe.configure({ mode: 'serial' });

  test.beforeAll(async () => {
    await page.goto('/');
  });

  test('Should have proper page title', async () => {
    await expect(page, 'Should have "Home" in title').toHaveTitle(/Home/);
  });

  test('Should have toolbar', async () => {
    const toolbar = new CernToolbar(page);
    const toolbarVisibility = await toolbar.getToolbarVisibility();
    await expect(toolbarVisibility, 'Should have visible toolbar').toBeTruthy();
  });

  test('Should have proper toolbar title', async () => {
    const toolbar = new CernToolbar(page);
    const toolbarH1 = await toolbar.getToolbarH1();
    await expect(toolbarH1, 'Should have "CERN" in toolbar title').toHaveText(
      /CERN/
    );
  });
});
