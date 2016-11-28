// This is a karma config file. For more details see
// http://karma-runner.github.io/0.13/config/configuration-file.html
// we are also using it with karma-webpack
// https://github.com/webpack/karma-webpack
const webpackTestConfig = require('./webpack.unit');

module.exports = function karmaConfig(config) {
  config.set({
    browsers: ['PhantomJS'],
    frameworks: ['jasmine'],
    reporters: ['spec', 'coverage'],
    files: ['../test/unit/index.js'],
    preprocessors: {
      '../test/unit/index.js': ['webpack', 'sourcemap'],
    },
    webpack: webpackTestConfig,
    webpackMiddleware: {
      noInfo: true,
    },
    coverageReporter: {
      dir: '../test/coverage',
      reporters: [
        { type: 'lcov', subdir: '.' },
        { type: 'clover', subdir: '.' },
        { type: 'text-summary' },
      ],
    },
    singleRun: true,
  });
};
