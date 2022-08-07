import { test, expect } from '@playwright/test';

test('Should have correct title', async ({ page }) => {
  await page.goto('/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Home/);
});
