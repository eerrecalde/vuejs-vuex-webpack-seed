// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

export default {
  '@tags': ['index'],

  'default e2e tests'(browser) {
    browser.page.index()
      .navigate()
      .waitForElementVisible('@app', 5000)
      .assert.elementPresent('@logo')
      .assert.containsText('@title', 'Hello World!')
      .assert.elementCount('@paragraphs', 3);
    browser.end();
  },
};
