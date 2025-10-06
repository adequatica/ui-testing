import { APIResponse, test } from '@playwright/test';
import { expect } from '../helpers/fixtures';
import { toCurl } from '../helpers/curl';

import { baseURL } from '../playwright.config';

const ENDPOINT = '/data/2.5/air_pollution';

const QUERY = {
  lat: 44.804,
  lon: 20.4651,
  appid: '',
};

test.describe('Request Air Pollution API', () => {
  test.skip(baseURL != 'https://api.openweathermap.org', 'Works only in the given URL');

  test('Make API request', async ({ request }) => {
    const fullUrl = `${baseURL}${ENDPOINT}`;
    test.info().attach('cURL command', {
      body: toCurl(fullUrl, { params: QUERY }),
      contentType: 'text/plain'
    });
    
    const response: APIResponse = await request.get(ENDPOINT, { params: QUERY });
    expect(response, 'Should have successful response status').toHaveStatusCode(200);
  });
});
