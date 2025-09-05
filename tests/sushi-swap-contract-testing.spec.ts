// This test case illustrates the article «API Contract Testing on Frontend with Playwright»
// https://adequatica.github.io/2023/12/25/api-contract-testing-on-frontend-with-playwright.html
import { expect, type Page, test } from '@playwright/test';
import { z } from 'zod';

import { baseURL } from '../playwright.config';

// Contract
const schema = z.object({
  jsonrpc: z.string(),
  id: z.number(),
  method: z.string(),
});

let page: Page;

test.beforeAll(async ({ browser }) => {
  const context = await browser.newContext();
  page = await context.newPage();

  await page.route(
    /.+lb\.drpc\.org\/ogrpc\?network=ethereum.+/,
    async (route) => {
      if (route.request().method() === 'POST') {
        await route.abort();

        return;
      }
    },
  );
});

// Сommand to run this test:
// BASE_URL=https://www.sushi.com npm test -- --grep sushi-swap-contract-testing
test('Open Sushi Swap', async () => {
  test.skip(baseURL != 'https://www.sushi.com', 'Works only in the given URL');
  // Waiting for a request should be before .goto() method,
  // because desired request can be done before the page is fully loaded.
  // Note, in this case, you should not put await before .waitForRequest()
  // https://playwright.dev/docs/api/class-page#page-wait-for-request
  const requestPromise = page.waitForRequest(
    (request) =>
      request.url().includes('lb.drpc.org/ogrpc?network=ethereum') &&
      request.method() === 'POST',
  );

  await page.goto('/swap');

  const request = await requestPromise;
  await expect(
    () => schema.parse(request.postDataJSON()),
    'Should have a request by the contract',
  ).not.toThrowError();
});
