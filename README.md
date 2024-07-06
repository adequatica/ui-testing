# UI Testing with TypeScript and Playwright

[![Run Playwright Tests](https://github.com/adequatica/ui-testing/actions/workflows/run-playwright-tests.yaml/badge.svg?branch=main)](https://github.com/adequatica/ui-testing/actions/workflows/run-playwright-tests.yaml)

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

- Run tests [filtered by tag](https://playwright.dev/docs/test-annotations#tag-tests):

`npm test -- --grep @mobile`

- Run a single test (for example: `switch-language.spec.ts`):

`npm test tests/switch-language.spec.ts`

Or:

`npm test -- --grep language`

- Run tests in [debug mode](https://playwright.dev/docs/debug#pwdebug):

`npm test -- --debug --grep language`

Or through the custom command:

`npm run test:debug -- --grep language`

## Examples of Test Cases

All tests are synthetic and written in different «styles» and approaches with the intent to demonstrate various cases from the articles [Hidden Gems of Playwright](https://adequatica.medium.com/hidden-gems-of-playwright-68fcf8896bcb) and [Part 2](https://adequatica.medium.com/hidden-gems-of-playwright-part-2-ca3e38a5954a), unless otherwise specified:

- `keyboard-navigation-on-tab.spec.ts` — example of [Automated Accessibility Testing of Keyboard Navigation on Tab](https://adequatica.medium.com/automated-accessibility-testing-of-keyboard-navigation-on-tab-89d30087c111);
- `mobile-toolbar-about-overlay-use.spec.ts` — has an example of rewriting config through [test.use()](https://playwright.dev/docs/api/class-test#test-use) with a [boxed step](https://playwright.dev/docs/release-notes#hide-implementation-details-box-test-steps);
- `mobile-toolbar-newcontext.spec.ts` — has an example of redefining the [browser context](https://playwright.dev/docs/api/class-browsercontext) with a [boxed step](https://playwright.dev/docs/release-notes#hide-implementation-details-box-test-steps);
- `open-sign-in.spec.ts` — has an example of [expect.toPass](https://playwright.dev/docs/test-assertions#expecttopass) assertion;
- `sushi-swap-contract-testing.spec.ts` — example of [API Contract Testing](https://adequatica.medium.com/api-contract-testing-on-frontend-with-playwright-4509b74b3008) with [Zod](https://zod.dev/) schema validation;
- `sushi-swap-custom-matcher.spec.ts` — example of usage [custom matchers](https://playwright.dev/docs/test-assertions#add-custom-matchers-using-expectextend) for [Zod](https://zod.dev/) schema validation;
- `switch-language.spec.ts` — has an example of [test.fixme()](https://playwright.dev/docs/api/class-test#test-fixme-2) method;
- `toolbar-throught-describe.spec.ts` — has an example of [test.describe.configure()](https://playwright.dev/docs/api/class-test#test-describe-configure) method;
- `toolbar-throught-step.spec.ts` — has examples of [test.slow()](https://playwright.dev/docs/api/class-test#test-slow-1), [test.step()](https://playwright.dev/docs/api/class-test#test-step) and [expect.soft()](https://playwright.dev/docs/test-assertions#soft-assertions) methods.
