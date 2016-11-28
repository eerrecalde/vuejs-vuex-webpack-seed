const HtmlWebpackPlugin = require('html-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const merge = require('webpack-merge');
const webpack = require('webpack');
const webpackBaseConfig = require('./webpack.base');
const path = require('./path');
const env = require('./env');

module.exports = merge(webpackBaseConfig, {
  // eval-source-map is faster for development
  devtool: '#eval-source-map',
  plugins: [
    // https://webpack.github.io/docs/list-of-plugins.html
    new webpack.DefinePlugin({ 'process.env': env.client }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new StyleLintPlugin({
      configFile: `${path.root}/.stylelintrc.js`,
      context: 'inherits from webpack',
      files: '../src/**/*.@(?(s)?(a|c)ss|less|vue|html)',
      failOnError: false,
    }),
    new HtmlWebpackPlugin({
      filename: path.output.index,
      template: path.asset.index,
      inject: true,
    }),
  ],
});
