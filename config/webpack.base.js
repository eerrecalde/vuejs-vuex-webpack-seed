const path = require('./path');
const loader = require('./loader');

// Base webpack configuration
module.exports = {
  // Default entry point
  entry: path.asset.entry.client,
  // Defualt output configuration
  output: {
    path: path.output.path,
    publicPath: path.output.public,
    filename: '[name].js',
    chunkFilename: '[name].js',
  },
  // Resolving strategies for files
  resolve: {
    // Extensions to support if excluded from path
    extensions: ['', '.js', '.vue', '.scss'],
    fallback: [path.nodeModules.root],
    // https://github.com/JSainsburyPLC/vue-webpack/blob/master/template/doc/structure.md#aliases
    alias: path.alias,
  },
  resolveLoader: {
    fallback: [path.nodeModules.root],
  },
  // Default loader configuration of vue
  vue: loader(),
  // Defualt loaders for all targets
  module: {
    preLoaders: [
      // Loader for automatic Eslint during development and build
      {
        test: /\.(vue|js)$/,
        loader: 'eslint-loader',
        include: path.root,
        exclude: /node_modules/,
      },
    ],
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: path.root,
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loaders: [
          `url-loader?limit=1&name=${
            path.output.getAssetPosixPath('images/[name].[hash:7].[ext]')
          }`,
          'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false',
        ],
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 1,
          name: path.output.getAssetPosixPath('fonts/[name].[ext]?[hash]'),
        },
      },
    ],
  },
};
