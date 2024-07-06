import { test } from '@playwright/test';
import { z } from 'zod';

// This test case illustrates usage of custom matchers
// https://playwright.dev/docs/test-assertions#add-custom-matchers-using-expectextend
import { expect } from '../helpers/fixtures';
import { baseURL } from '../playwright.config';

const schema = z.object({
  success: z.boolean(),
  data: z.object({
    maintenance: z.boolean(),
  }),
});

// Сommand to run this test:
// BASE_URL=https://www.sushi.com npm test -- --grep sushi-swap-custom-matcher
test('Open Sushi Swap', async ({ page }) => {
  test.skip(baseURL != 'https://www.sushi.com', 'Works only in the given URL');

  const [response] = await Promise.all([
    page.waitForResponse(`${baseURL}/api/config/swap`),
    page.goto('/swap'),
  ]);

  const responseBody = await response.body();
  const parsedResponseBody = JSON.parse(
    responseBody.toString() ?? '',
  ) as Record<string, unknown>;

  await expect(
    parsedResponseBody,
    'Should have valid job scheme',
  ).toMatchSchema(schema);
});
