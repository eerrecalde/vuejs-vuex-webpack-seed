const merge = require('webpack-merge');
const webpack = require('webpack');
const webpackBaseConfig = require('./webpack.base');
const dependencies = require('../package.json').dependencies;
const env = require('./env');
const path = require('./path');

module.exports = merge(webpackBaseConfig, {
  // No source map
  devtool: false,
  // Target node from server bundle
  target: 'node',
  // Target server entry point
  entry: path.asset.entry.server,
  // Adjust output for server
  output: {
    libraryTarget: 'commonjs2',
    filename: 'server.js',
  },
  // Mark dependencies as external
  // https://www.npmjs.com/package/vue-server-renderer#externals
  externals: Object.keys(dependencies),
  plugins: [
    new webpack.DefinePlugin({ 'process.env': env.server }),
    // Do not split server bundle
    new webpack.optimize.MinChunkSizePlugin({ minChunkSize: 100000000 }),
  ],
});
