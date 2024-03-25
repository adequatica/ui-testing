// This test case illustrates the article «Automated Accessibility Testing of Keyboard Navigation on Tab»
// https://adequatica.medium.com/automated-accessibility-testing-of-keyboard-navigation-on-tab-89d30087c111
import { expect, test } from '@playwright/test';

import { CernToolbar } from '../models/toolbar';

const activeElements = [
  '\n	Skip to main content\n',
  '\n            CERN\n            <span>Accelerating science</span>\n        ',
  'Sign in',
  'Directory',
  '\n              <img src="/sites/default/files/logo/cern-logo.png" alt="home">\n            ',
] as const;

test('Keyboard Navigation', async ({ page }) => {
  await test.step('Open the page', async () => {
    await page.goto('/');
  });

  for (const element of activeElements) {
    await test.step('Press TAB key', async () => {
      const toolbar = new CernToolbar(page);
      const focusedOn = await toolbar.focusAfterTab();
      expect(focusedOn, 'Should have correct active element').toBe(element);
    });
  }
});
