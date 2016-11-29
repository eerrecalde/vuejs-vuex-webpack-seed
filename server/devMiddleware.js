const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackClientConfig = require('../config/webpack.client.dev');
const webpackServerConfig = require('../config/webpack.server');
const MFS = require('memory-fs');
const path = require('../config/path');

module.exports = function devMiddleware(app, onServerUpdate, onClientUpdate) {
  // setup on the fly compilation + hot-reload
  if (Array.isArray(webpackClientConfig.entry)) {
    webpackClientConfig.entry = ['webpack-hot-middleware/client', ...webpackClientConfig.entry];
  } else if (typeof webpackClientConfig.entry === 'string') {
    webpackClientConfig.entry = ['webpack-hot-middleware/client', webpackClientConfig.entry];
  } else {
    webpackClientConfig.entry = [
      'webpack-hot-middleware/client',
      ...Object.keys(webpackClientConfig.entry).map(key => webpackClientConfig.entry[key]),
    ];
  }

  // Setup client hot reload server
  const clientCompiler = webpack(webpackClientConfig);
  const clientDevMiddleware = webpackDevMiddleware(clientCompiler, {
    publicPath: webpackClientConfig.output.publicPath,
    stats: {
      colors: true,
      chunks: false,
    },
  });
  clientDevMiddleware.waitUntilValid(() => {
    // In order to enable long term asset caching with auto inject
    // The HtmlWebpackPlugin output is sent to the server from the client dev servers memory
    onClientUpdate(
      (() => clientDevMiddleware.fileSystem.readFileSync(path.output.index, 'utf-8'))()
    );
  });
  app.use(clientDevMiddleware);
  app.use(webpackHotMiddleware(clientCompiler));

  // Setup server and watch for changes
  const fs = new MFS();
  const serverCompiler = webpack(webpackServerConfig);
  serverCompiler.outputFileSystem = fs;
  // On an update to the server bundle push the bundle from memory to the server
  serverCompiler.watch({}, () => {
    onServerUpdate(fs.readFileSync(path.output.server, 'utf-8'));
  });
  return serverCompiler;
};
