# e2e

Must be running server `npm run serve` to test locally.

- [Nightwatch guide](http://nightwatchjs.org/guide)
- [Nightwatch api](http://nightwatchjs.org/api)

*Code styles*

- Avoid:
  - `xPaths` (Difficult to manage)

- Use:
 - `css selector` (where possible)

*Environments*

- firefox
- chrome (default)

- `npm run e2e -- --env firefox`
- `npm run e2e -- --env chrome,firefox`

You should also specify the environment for the test suite to run against. You can add env urls within `config/nightwatch.e2e.js` Possible values are: `dev`. Default when not running with website is localhost. This will need to have the dev server running `npm run serve`.

- `E2E_ENV=dev npm run e2e`

*Tags*
You can also selectively target tests to run based on tags, such that a test may be belong to multiple tags. For example, you might have a login test that belongs to a login suite as well as a sanity suite.

docs: [Nightwatch guide](http://nightwatchjs.org/guide)

- `npm run e2e -- --tag tag`
- `npm run e2e -- --skiptags tag`
- `npm run e2e -- --skiptags tag,othertag`

*Tag List*

- example

## SauceLabs

SauceLabs can be used to run the e2e test suite. In order to run the e2e test suites please set `SAUCE_USER` and `SAUCE_KEY` environment variable and run `e2e:saucelabs`. (Ask for user and key details if needed)

- `SAUCE_USER=username SAUCE_KEY=key npm run e2e:saucelabs`

You should also specify the environment for the test suite to run against.

- `SAUCE_USER=username SAUCE_KEY=key E2E_ENV=dev npm run e2e:saucelabs`

You can pick a browser testing to run the tests in Saucelabs as above in the env section. Please ensure that you have set the testing environment in `config/e2e.js`.

- `SAUCE_USER=username SAUCE_KEY=key npm run e2e:saucelabs -- --env firefox`
- `SAUCE_USER=username SAUCE_KEY=key npm run e2e:saucelabs -- --env chrome,firefox`
