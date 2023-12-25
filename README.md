# UI Testing with TypeScript and Playwright

## Stack

A basic set of packages to test UI with TypeScript:

- [Playwright](https://playwright.dev) — testing framework;
- [Prettier](https://prettier.io) — code formatter;
- [ESLint](https://eslint.org/) — code linter.

Example website for testing: [CERN](https://home.cern), unless otherwise specified.

## How to Use

1. Clone repository
2. Install dependencies: `npm install`
3. Install dependencies for testing framework: `npm run test:install-deps`
4. Run tests: `npm test`

### CLI Options

- Different tested host could be passed to tests through .env variable:

`BASE_URL=https://home.cern npm test`

- Run a single test (for example: `switch-language.spec.ts`):

`npm test tests/switch-language.spec.ts`

Or:

`npm test -- --grep language`

- Run a single test in [debug mode](https://playwright.dev/docs/debug#pwdebug):

`npm run test:debug -- --grep language`

Or:

`npm test -- --debug --grep language`

## Examples of Test Cases

- `sushi-swap-contract-testing.spec.ts` — example of [API Contract Testing](https://adequatica.medium.com/api-contract-testing-on-frontend-with-playwright-4509b74b3008) with [Zod](https://zod.dev/) JSON schema validation;
- `switch-language.spec.ts` — has example of [test.fixme()](https://playwright.dev/docs/api/class-test#test-fixme-2) method;
- `toolbar-mobile.spec.ts` — has example of redefining the [browser context](https://playwright.dev/docs/api/class-browsercontext);
- `toolbar-throught-describe.spec.ts` — has example of [test.describe.configure()](https://playwright.dev/docs/api/class-test#test-describe-configure) method;
- `toolbar-throught-step.spec.ts` — has examples of [test.slow()](https://playwright.dev/docs/api/class-test#test-slow-1), [test.step()](https://playwright.dev/docs/api/class-test#test-step) and [expect.soft()](https://playwright.dev/docs/test-assertions#soft-assertions) methods.

Most of these test cases illustrate the article [Hidden Gems of Playwright](https://adequatica.medium.com/hidden-gems-of-playwright-68fcf8896bcb).
