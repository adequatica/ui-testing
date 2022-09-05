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

- Run a single test (for example: `toolbar-throught-steps.spec.ts`):

`npm run test tests/toolbar-throught-steps.spec.ts`

Or:

`npm run test -- --grep toolbar`

## Exaples of Test Cases

- `toolbar.spec.ts`;
