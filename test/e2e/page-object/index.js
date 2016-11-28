import global from './global.js';

module.exports = {
  url() { return `${this.api.launchUrl}/example/hello`; },
  elements: {
    ...global,

    logo: '.logo',
    title: 'h1',
    paragraphs: 'p',
  },
};
