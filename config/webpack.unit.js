const merge = require('webpack-merge');
const webpack = require('webpack');
const webpackBaseConfig = require('./webpack.base');
const path = require('./path');
const env = require('./env');

const testWebpackConfig = merge(webpackBaseConfig, {
  // Infer additional resolving logic for unit test files
  resolve: {
    alias: merge(path.unit.alias, path.alias),
  },
  // Sourcemap to be inlined
  devtool: '#inline-source-map',
  // Apply coverage for script in vue files
  vue: {
    loaders: {
      js: 'babel-istanbul-loader',
    },
  },
  plugins: [
    new webpack.DefinePlugin({ 'process.env': env.unit }),
  ],
});

// no need for app entry during tests
delete testWebpackConfig.entry;

// make sure instable loader is applied before eslint
testWebpackConfig.module.preLoaders = testWebpackConfig.module.preLoaders || [];
testWebpackConfig.module.preLoaders.unshift({
  test: /\.js$/,
  loader: 'babel-istanbul-loader',
  include: path.src,
});

// only apply babel for test files
testWebpackConfig.module.loaders.some(_loader => {
  const loader = _loader;
  if (loader.loader === 'babel-loader') {
    loader.include = path.unit.root;
    return true;
  }
  return false;
});

module.exports = testWebpackConfig;
