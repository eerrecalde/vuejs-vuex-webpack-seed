// Polyfill fn.bind() for PhantomJS
/* eslint-disable no-extend-native */
Function.prototype.bind = require('function-bind');

// Polyfill provided by babel for promise for unsupported browsers;
// Assign to window for libaries to use.
if (!window.Promise) {
  window.Promise = Promise;
}

// require all test files (files that ends with .spec.js)
const testsContext = require.context('./spec', true, /\.spec$/);
testsContext.keys().forEach(testsContext);

// require all src files except entries for coverage.
// you can also change this to match only the subset of files that
// you want coverage for.
const srcContext = require.context(
  '../../src',
  true,
  /^\.\/(?!entry|style)\/?(?:.*?\.js)$/,
);
srcContext.keys().forEach(srcContext);
