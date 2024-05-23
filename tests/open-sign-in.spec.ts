import { expect, test } from '@playwright/test';

import { openHomePage } from '../helpers/open-home-page';
import { CernToolbar } from '../models/toolbar';

let toolbar: CernToolbar;

test.beforeEach(async ({ page }) => {
  toolbar = new CernToolbar(page);
});

test('Open sign in', async ({ page }) => {
  // openHomePage is a helper function
  await test.step('Open the page', async () => openHomePage(page));

  await test.step('Open sign in form', async () => {
    await toolbar.clickOnSignIn();
    await expect(page, 'Should open auth page').toHaveURL(
      /.*auth.cern.ch\/auth\/.*/,
    );

    // https://playwright.dev/docs/test-assertions#expecttopass
    await expect(async () => {
      // Retry by intervals until the request is successful
      const response = await page.request.get(
        'https://sso-motd-api.web.cern.ch/api/motd/',
      );
      expect(response.status()).toBe(200);
    }).toPass({
      // Probe, wait 1s, probe, wait 2s, probe, wait 10s, probe, wait 10s, probe
      intervals: [1000, 2000, 10000],
      // toPass timeout does not respect custom expect timeout
      timeout: 60000,
    });
  });
});
