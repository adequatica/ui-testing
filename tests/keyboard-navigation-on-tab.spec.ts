/*
 * This test case illustrates the article «Automated Accessibility Testing of Keyboard Navigation on Tab»
 * https://adequatica.github.io/2024/03/25/automated-accessibility-testing-of-keyboard-navigation-on-tab.html
 *
 * The example in the articles may differ from the current state of the repository,
 * as the tests had to be updated due to changes in the layout of the [CERN](https://home.cern)'s website.
 */
import { expect, test } from '@playwright/test';

import { CernToolbar } from '../models/toolbar';

const activeElements = ['Skip to content'] as const;

test(
  'Keyboard Navigation',
  {
    tag: '@a11y',
  },
  async ({ page }) => {
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
  },
);
