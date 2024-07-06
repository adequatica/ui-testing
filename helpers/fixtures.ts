import { expect as baseExpect } from '@playwright/test';
import { ZodTypeAny } from 'zod';

export const expect = baseExpect.extend({
  async toMatchSchema(
    objectToMatch: Record<string, unknown>,
    schema: ZodTypeAny,
  ) {
    const result = await schema.safeParseAsync(objectToMatch);

    if (result.success) {
      return {
        message: () => 'Schema matches',
        pass: true,
      };
    } else {
      return {
        message: () =>
          `Schema does not match:\n${result.error.issues.map((issue) => issue.message).join('\n')}\n\nDetails:\n${JSON.stringify(result.error, null, 2)}`,
        pass: false,
      };
    }
  },
});
