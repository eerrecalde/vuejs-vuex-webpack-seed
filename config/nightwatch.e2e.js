// Used to enable ES6 with e2e modules
require('babel-core/register');
const seleniumPath = require('selenium-server').path;
const chromedriverPath = require('chromedriver').path;

// Launch urls based on enviroments
let url;
switch (process.env.E2E_ENV) {
  case 'dev':
    url = `http://${process.env.E2E_ENV}-www.env.io`;
    break;
  default:
    url = `http://localhost:${process.env.PORT || 8080}`;
}

// http://nightwatchjs.org/guide#settings-file
module.exports = {
  src_folders: ['test/e2e/spec'],
  output_folder: 'test/e2e/reports',
  custom_assertions_path: 'test/e2e/assertion',
  page_objects_path: 'test/e2e/page-object',
  globals_path: 'test/e2e/global',

  selenium: {
    start_process: true,
    server_path: seleniumPath,
    host: '127.0.0.1',
    port: 4444,
    cli_args: {
      'webdriver.chrome.driver': chromedriverPath,
    },
  },

  test_settings: {
    default: createTestLauncher(),
    chrome: createTestLauncher({ browserName: 'chrome' }),
    firefox: createTestLauncher({ browserName: 'firefox' }),
    phantomjs: createTestLauncher({ browserName: 'phantomjs' }),
  },
};

/**
 * Create e2e browser test launcher with configuration
 * @param {Object} [capabilities]
 * @param {Object} [screenshots]
 * @param {Object} [options]
 * @returns {Object} launcher settings Object
 */
function createTestLauncher(capabilities = {}, screenshots = {}, options = {}) {
  const launcher = {
    launch_url: url,
    silent: true,
    selenium_port: 4444,
    selenium_host: process.env.SAUCE_USER ? 'ondemand.saucelabs.com' : 'localhost',
    screenshots: {
      enabled: false,
      path: '',
    },
    desiredCapabilities: {
      'tunnel-identifier': process.env.SAUCE_IDENTIFIER || 'E2E_TUNNEL',
      javascriptEnabled: true,
      acceptSslCerts: true,
    },
    username: process.env.SAUCE_USER,
    access_key: process.env.SAUCE_KEY,
  };

  Object.assign(launcher.desiredCapabilities, capabilities);
  Object.assign(launcher.screenshots, screenshots);
  Object.assign(launcher, options);
  return launcher;
}
