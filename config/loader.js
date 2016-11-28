const ExtractTextPlugin = require('extract-text-webpack-plugin');

/**
 * Vue loader options generator
 * @param {Object} option
 * @param {Object} [option.css]
 * @param {Boolean} [option.css.extract] - true to extract css from vue files
 * @param {Boolean} [option.css.sourceMap] - true to generate sourcemap
 * @returns {Object} Vue loader object
 */
module.exports = function vue({ css = {} } = {}) {
  // Vue file style loaders
  return {
    loaders: {
      css: generateStyleLoader(css),
      postcss: generateStyleLoader(css),
      less: generateStyleLoader(css, ['less']),
      sass: generateStyleLoader(css, ['sass?indentedSyntax']),
      scss: generateStyleLoader(css, ['sass']),
    },
    // Support webpack loading svg sprites with use attribute
    html: {
      attrs: ['img:src', 'use:xlink:href'],
    },
  };
};

/**
 * Style loader generator
 * @param {Object} option
 * @param {Boolean} [option.extract] - true to extract css from vue files
 * @param {Boolean} [option.sourceMap] - true to generate sourcemap
 * @param {Array<String>} [loaders] - string of additional loaders
 * @returns {String} loader string
 */
function generateStyleLoader({ extract, sourceMap } = {}, loaders = []) {
  const sourceLoader = ['css', ...loaders].map(_loader => {
    let extraParamChar;
    let loader;
    if (/\?/.test(_loader)) {
      loader = _loader.replace(/\?/, '-loader?');
      extraParamChar = '&';
    } else {
      loader = `${_loader}-loader`;
      extraParamChar = '?';
    }
    return `${loader}${sourceMap ? `${extraParamChar}sourceMap` : ''}`;
  }).join('!');

  if (extract) {
    return ExtractTextPlugin.extract('vue-style-loader', sourceLoader);
  }
  return ['vue-style-loader', sourceLoader].join('!');
}
