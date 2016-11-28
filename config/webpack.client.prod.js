const ExtractTextPlugin = require('extract-text-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const PurifyCssPlugin = require('purifycss-webpack-plugin');
const merge = require('webpack-merge');
const webpack = require('webpack');
const webpackBaseConfig = require('./webpack.base');
const path = require('./path');
const env = require('./env');
const loader = require('./loader');

module.exports = merge(webpackBaseConfig, {
  // Traditional sourcemap output
  devtool: '#source-map',
  // Use output names for long term asset caching
  output: {
    filename: path.output.getAssetPosixPath('js/[name].[chunkhash].js'),
    chunkFilename: path.output.getAssetPosixPath('js/[name].[chunkhash].js'),
  },
  // Extract provide sourcemaps for vue files
  vue: loader({
    css: {
      extract: true,
      sourceMap: true,
    },
  }),
  plugins: [
    // https://webpack.github.io/docs/list-of-plugins.html
    new webpack.DefinePlugin({ 'process.env': env.client }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    // extract css into its own file
    new ExtractTextPlugin(path.output.getAssetPosixPath('css/[name].[contenthash].css')),
    // remove any unused css from output
    new PurifyCssPlugin({
      basePath: path.src,
      paths: [
        '**/*.html',
        '**/*.vue',
        '**/*.js',
      ],
      purifyOptions: {
        minify: true,
        info: true,
      },
    }),
    // Minify js
    new webpack.optimize.UglifyJsPlugin({
      mangle: true,
      compress: {
        warnings: false,
      },
    }),
    // Favicon generator
    new FaviconsWebpackPlugin({
      logo: path.asset.favicon,
      prefix: path.output.getAssetPosixPath('favicons/[hash]/'),
      background: '#363636',
      title: 'A Vue.js project',
      persistentCache: false,
      inject: true,
    }),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: path.output.index,
      template: path.asset.index,
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency',
    }),
    // split vendor js into its own file
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks(module) {
        // any required modules inside node_modules are extracted to vendor
        return (module.resource && module.resource.indexOf(path.nodeModules) === 0);
      },
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor'],
    }),
  ],
});
