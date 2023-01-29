import { test, expect, Page } from '@playwright/test';
import { CernToolbar } from '../models/toolbar';
import { CernLanguageSwitcher } from '../models/language-switcher';

let page: Page;

test.beforeAll(async ({ browser }) => {
  const context = await browser.newContext();
  page = await context.newPage();
});

test.afterAll(async () => {
  await page.close();
});

test.describe('Switch language', async () => {
  // Running tests sequentially.
  // See https://playwright.dev/docs/api/class-test#test-describe-configure
  test.describe.configure({ mode: 'serial' });

  test.beforeAll(async () => {
    await page.goto('/');
  });

  test('Should have english toolbar title', async () => {
    const toolbar = new CernToolbar(page);
    const toolbarH1 = await toolbar.getToolbarH1();
    await expect(
      toolbarH1,
      'Should have "Accelerating science" in toolbar title'
    ).toHaveText(/Accelerating science/);
  });

  test('Should have english language in navigation', async () => {
    const lang = new CernLanguageSwitcher(page);
    const langEn = await lang.getLang();
    await expect(langEn, 'Should have "EN" language').toHaveText(/en/);
  });

  test('Should change URL after switch language', async () => {
    const lang = new CernLanguageSwitcher(page);
    await lang.switchLang();
    await expect(page).toHaveURL(/fr/);
  });

  test('Should have french language in navigation', async () => {
    const lang = new CernLanguageSwitcher(page);
    const langEn = await lang.getLang();
    await expect(langEn, 'Should have "FR" language').toHaveText(/fr/);
  });

  test('Should have french toolbar title', async () => {
    const toolbar = new CernToolbar(page);
    const toolbarH1 = await toolbar.getToolbarH1();
    await expect(
      toolbarH1,
      'Should have "Accélérateur de science" in toolbar title'
    ).toHaveText(/Accélérateur de science/);
  });

  test('Should have proper page title', async () => {
    // Test is immediately aborted
    // See https://playwright.dev/docs/api/class-test#test-fixme-2
    test.fixme();
    await expect(page, 'Should have "Home" in title').toHaveTitle(/Home/);
  });
});
