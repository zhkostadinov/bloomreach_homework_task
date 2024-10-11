## Main Concepts

Code decomposition.

There should be a balance between code and template engines (yml). Practicality is key

We follow  the industry's good practices where applicable and sensible. Tests follow AAA pattern

Redefine the parallel execution as steps fan out within the processing of single workflow execution, via N-N dependency (Batch array jobs) model.

IMPORTANT When adding dependency to the project (a package), be sure to list it in the package.json we use NPM.

Read the official Playwright documentation at https://playwright.dev/docs/intro

All sensitive data is kept as env vars. Passwords, accounts, etc. are set as secrets.

The hermetic pattern states that every test should be completely independent and self-sufficient! This is achieved by proper Fixture strategies

Analyze the Workflow to Improve Concurrency. Always try to exploit concurrency in the user's workflow, so you can run tests in parallel.

Abstractions live longer than details, so when creating test logic, invest in the abstractions, not the concrete implementation. Abstractions can survive the barrage of changes from different implementations and new technologies.

Find bugs once! Once a human tester finds a bug, that should be the last time a human finds it! Consider automation feasibility and let Automation tests check those bugs from now on. Create bug-driven tests.

Convention over Configuration: It is better to utilize the playwright's support (config) for configuration instead of our own. We try to minimize OS reading and later on, just use it in all configs. Implement an enum for the configs, so all hardcoded data is in SSOT place.

Favour Dynamic over Static test data. New users, Disposable temporary e-mail addresses etc. should be part of Fresh Fixture.

Parallel test execution, and horizontal scaling of Test agent/runner containers (due to virtualization issues with non-GPU browser rendering). Always keep in mind the CI server execution, when creating tests.

Retry - retrying several times when a call to the app fails.

## Architecture

- [Playwright](https://playwright.dev/) to enable Web and API tests
- [env-cmd](https://www.npmjs.com/package/env-cmd) that loads environment variables are to be injected in the configs

### Project structure breakdown 

`tests` - API tests split by functionality

`utils` - Data loader           

## Development

`yaen v1.22.9`

`node v20.12.1`


### Running Tests Locally
1. Setup your IDE to use the Playwright plugins
2. Create the file `.env.vault` in the root project folder. Add needed environmental variables to it.
3. Install dependencies with:

```sh
yarn --dev
```
4. Run backend tests with:

```sh
yarn run tests:api
```

