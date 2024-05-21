import { devices, expect, test } from '@playwright/test';

import { CernToolbar } from '../models/toolbar';

// https://playwright.dev/docs/api/class-testoptions/
// https://playwright.dev/docs/api/class-test#test-use
test.use({
  // https://playwright.dev/docs/emulation#devices
  // https://github.com/microsoft/playwright/blob/main/packages/playwright-core/src/server/deviceDescriptorsSource.json
  ...devices['Pixel 7'],
});

let toolbar: CernToolbar;

test.beforeEach(async ({ page }) => {
  toolbar = new CernToolbar(page);
});

test(
  'Home page toolbar about overlay on mobile',
  {
    tag: '@mobile',
  },
  async ({ page }) => {
    await test.step('Open the page', async () => {
      await page.goto('/');
    });

    await test.step('Should have toolbar', async () => {
      const topToolbar = await toolbar.getToolbar();
      await expect(topToolbar, 'Should have visible toolbar').toBeVisible();
    });

    await test.step('Should have closed mobile menu', async () => {
      await toolbar.waitForExpandedNavbar(false);
      const toolbarHeader = await toolbar.getToolbarHeader();
      await expect(
        toolbarHeader,
        'Header should not have "class" attribute',
      ).not.toHaveAttribute('class');
    });

    await test.step('Should open mobile menu', async () => {
      await toolbar.clickOnToggle();
      await toolbar.waitForExpandedNavbar(true);
      const toolbarHeader = await toolbar.getToolbarHeader();
      await expect(
        toolbarHeader,
        'Header should have "class" attribute',
      ).toHaveAttribute('class');
    });

    await test.step('Should open about overlay', async () => {
      await toolbar.clickOnMenuItem('About');
      const openedOverlay = await toolbar.getOpenedOverlay();
      await expect(openedOverlay, 'Should have visible overlay').toBeVisible();
    });
  },
);
