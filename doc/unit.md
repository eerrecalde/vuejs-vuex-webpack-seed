# Unit Testing

An overview of the tools used by this boilerplate for unit testing:

- [Karma](http://karma-runner.github.io/0.13/index.html): the test runner that launches browsers, runs the tests and reports the results to us.
- [karma-webpack](https://github.com/webpack/karma-webpack): the plugin for Karma that bundles our tests using Webpack.
- [Jasmine](https://http://jasmine.github.io/): the test framework that we write test specs with.
- [Sinon](http://sinonjs.org/): test utility library that provides spies, stubs and mocks. This is used prodomitly for the features that Jasmine does not provide, such as mock servers.

And the files:

- `test/unit/index.js`

  This the entry file used by `karma-webpack` to bundle all the test code and source code (for coverage purposes). You can ignore it for the most part.

- `test/unit/specs/`

  This directory is where you write your actual tests. You can use full ES2015 and all supported Webpack loaders in your tests.

- `config/karma.unit.js`

  This is the Karma configuration file. See [Karma docs](http://karma-runner.github.io/0.13/index.html) for more details.

## Running Tests in More Browsers

You can run the tests in multiple real browsers by installing more [karma launchers](http://karma-runner.github.io/0.13/config/browsers.html) and adjusting the `browsers` field in `config/karma.unit.js`.

## Mocking Dependencies

This boilerplate comes with [inject-loader](https://github.com/plasticine/inject-loader) installed by default. For usage with `*.vue` components, see [vue-loader docs on testing with mocks](http://vue-loader.vuejs.org/en/workflow/testing-with-mocks.html).

## Coverage reports

The tests has a full coverage report system, any files within your project will be detected and checked for coverage levels.

You can use `codecov.io` as a tool to monitor coverage. You can also see the coverage once running `unit`/`unit:dev`. The output is in `test/coverage`.

Scrutinizer uses clover output for it's reporting. This file is located here: `test/coverage/clover.xml`.
