# vue-cli-plugin-e2e-playwright
[Vue CLI](https://cli.vuejs.org/) plugin for e2e testing with [Mocha](https://mochajs.org/) and [Playwright](https://playwright.dev/).

## Installing
```bash
vue add plugin-e2e-playwright
```

## Running
Run `yarn test:e2e` or `npm run test:e2e` to run your end-to-end tests.

## Changes to your project
- Adds `vue-cli-service test:2e2` to `package.json` scripts
- Sets Mocha as global variable in eslint in the `*.spec.js` files inside `tests/e2e` in `package.json`
- Adds Chai and Playwright as dev dependencies in `package.json`
- Creates example e2e test in `tests/e2e/example.spec.js`

##  Features
### Options
```bash
// options
--timeout     test timeout in ms, default 90000
--url         url to test, it will not start the dev server
--browser     define browser to run tests (chromium, firefox, webkit),
              default chromium
```
Check more [options](https://mochajs.org/#command-line-usage) for Mocha.
