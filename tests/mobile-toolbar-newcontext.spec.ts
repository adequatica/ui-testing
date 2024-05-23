import { expect, Page, test } from '@playwright/test';

import { openHomePage } from '../helpers/open-home-page';
import { CernToolbar } from '../models/toolbar';

const MOBILE = {
  userAgent:
    'Mozilla/5.0 (iPhone; CPU iPhone OS 15_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.6,2 Mobile/15E148 Safari/604.1',
  viewport: { width: 375, height: 812 },
};

let page: Page;

test.beforeAll(async ({ browser }) => {
  // Use context to open page with specific non-standard parameters
  // See https://playwright.dev/docs/api/class-browsercontext
  const context = await browser.newContext(MOBILE);
  page = await context.newPage();
});

test.afterAll(async () => {
  await page.close();
});

test(
  'Home page toolbar on mobile',
  {
    tag: '@mobile',
  },
  async () => {
    // openHomePage is a helper function
    await test.step('Open the page', async () => openHomePage(page), {
      box: true,
    });

    await test.step('Should have toolbar', async () => {
      const toolbar = new CernToolbar(page);
      const topToolbar = await toolbar.getToolbar();
      await expect(topToolbar, 'Should have visible toolbar').toBeVisible();
    });

    await test.step('Should not have toolbar subtitle', async () => {
      const toolbar = new CernToolbar(page);
      await toolbar.waitForVisibleText('Accelerating science', false);
    });

    await test.step('Should have closed mobile menu', async () => {
      const toolbar = new CernToolbar(page);
      await toolbar.waitForExpandedNavbar(false);
      const toolbarHeader = await toolbar.getToolbarHeader();
      await expect(
        toolbarHeader,
        'Header should not have "class" attribute',
      ).not.toHaveAttribute('class');
    });

    await test.step('Should open mobile menu', async () => {
      const toolbar = new CernToolbar(page);
      await toolbar.clickOnToggle();
      await toolbar.waitForExpandedNavbar(true);
      const toolbarHeader = await toolbar.getToolbarHeader();
      await expect(
        toolbarHeader,
        'Header should have "class" attribute',
      ).toHaveAttribute('class');
    });
  },
);
