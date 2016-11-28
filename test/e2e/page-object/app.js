import global from './global.js';

module.exports = {
  url() { return this.api.launchUrl; },
  elements: {
    ...global,
  },
};
