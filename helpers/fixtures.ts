import { APIResponse, expect as baseExpect } from '@playwright/test';
import { ZodTypeAny } from 'zod';

export const expect = baseExpect.extend({
  async toMatchSchema(
    objectToMatch: Record<string, unknown>,
    schema: ZodTypeAny,
  ) {
    const assertionName = 'toHaveStatusCode';
    const result = await schema.safeParseAsync(objectToMatch);

    if (result.success) {
      return {
        message: () => 'Schema matches',
        pass: true,
        name: assertionName
      };
    } else {
      return {
        message: () =>
          `Schema does not match:\n${result.error.issues.map((issue) => issue.message).join('\n')}\n\nDetails:\n${JSON.stringify(result.error, null, 2)}`,
        pass: false,
        name: assertionName
      };
    }
  },

  async toHaveStatusCode(receivedResponse: APIResponse, expected: number) {
    const assertionName = 'toHaveStatusCode';
    const statusCode = receivedResponse.status();
    const pass = statusCode === expected;

    const body = await receivedResponse.json();

    const message = `
    Expected status code: ${expected}
    Received status code: ${statusCode}
    Requested URL: ${receivedResponse.url()}
    Received body: ${JSON.stringify(body)}
    `;

    if (pass) {
      return {
        message: () =>  message,
        pass: true,
        name: assertionName
      };
    } else {
      return {
        message: () => message,
        pass: false,
        name: assertionName
      };
    }
  },
});
