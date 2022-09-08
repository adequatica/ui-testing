# UI Testing with TypeScript

## Stack

A basic set of packages to test API with TypeScript:

- [Playwright](https://playwright.dev) — testing framework;
- [Prettier](https://prettier.io) — code formatter;
- [ESLint](https://eslint.org/) – code linter.

Example web site for testing: [CERN](https://home.cern).

## How to Use

1. Clone repository
2. Intall dependencies: `npm install`
3. Intall dependencies for testing framework: `npm run test:install-deps`
4. Run tests: `npm run test`

### CLI Options

- Different tested host could be passed to tests through .env variable:

`BASE_URL=https://home.cern npm run test`

- Run tests in [debug mode](https://playwright.dev/docs/debug#pwdebug):

`npm run test:debug`

- Run a single test (for example: `switch-language.spec.ts`):

`npm run test tests/switch-language.spec.ts`

Or:

`npm run test -- --grep language`

## Exaples of Test Cases

- `switch-language.spec.ts` — has example of [test.fixme()](https://playwright.dev/docs/api/class-test#test-fixme-2) method;
- `toolbar-throught-describe.spec.ts` — has example of [test.describe.configure()](https://playwright.dev/docs/api/class-test#test-describe-configure) method;
- `toolbar-throught-step.spec.ts` — has examples of [test.slow()](https://playwright.dev/docs/api/class-test#test-slow-1), [test.step()](https://playwright.dev/docs/api/class-test#test-step) and [expect.soft()](https://playwright.dev/docs/test-assertions#soft-assertions) methods.

This test cases also illustrate the article [Hidden Gems of Playwright](https://adequatica.medium.com/hidden-gems-of-playwright-68fcf8896bcb).
