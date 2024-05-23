import { expect, Page } from '@playwright/test';

export async function openHomePage(page: Page) {
  await page.goto('/');
  await expect(page, 'Should open / page').toHaveURL(/.*\//);
  await expect(page.getByRole('main')).toBeVisible();
}
