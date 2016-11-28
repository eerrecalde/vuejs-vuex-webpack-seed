const fs = require('fs');
const compression = require('compression');
const serialize = require('serialize-javascript');
const lruCache = require('lru-cache');
// https:// github.com/vuejs/vue/blob/next/packages/vue-server-renderer/README.md#why-use-bundlerenderer
const createBundleRenderer = require('vue-server-renderer').createBundleRenderer;
const express = require('express');
const proxyMiddleware = require('http-proxy-middleware');
const devMiddleware = require('./devMiddleware');
const path = require('../config/path');

const app = express();

// Apply compression with no minimum size
app.use(compression({ threshold: 0 }));

// setup renderer bundle options
const renderBundleOptions = {
  cache: lruCache({
    // Maximum components to cache
    max: 1000,
    // Maximum cache validation peroid
    maxAge: 1000 * 60 * 15,
  }),
};

let template;
let renderer;
if (process.env.NODE_ENV === 'production') {
  let bundle;

  // Avoid server blowing up when file not found and show friendly message
  try {
    template = fs.readFileSync(path.output.index);
  } catch (err) {
    if (err.code !== 'ENOENT') throw err;
    console.log('File not found. Did you build first? \nPlease run the build task: npm run build:server');
    return;
  }

  // Avoid server blowing up when file not found and show friendly message
  try {
    bundle = fs.readFileSync(path.output.server);
  } catch (err) {
    if (err.code !== 'ENOENT') throw err;
    console.log('File not found. Did you build first? \nPlease run the build task: npm run build:server');
    return;
  }

  renderer = createBundleRenderer(bundle, renderBundleOptions);
} else {
  devMiddleware(
    app,
    bundle => (renderer = createBundleRenderer(bundle, renderBundleOptions)),
    res => (template = res)
  );
}

// serve static and compiled assets
// Max cache validation period
app.use('/static', express.static(path.asset.static, { maxage: '365d' }));
app.use('/asset', express.static(path.output.asset, { maxage: '365d' }));

// proxy api requests
// https://github.com/JSainsburyPLC/vue-webpack/blob/master/template/doc/proxy.md
Object.keys(path.proxy).forEach(context => {
  let options = path.proxy[context];
  if (typeof options === 'string') {
    options = { target: options };
  }
  app.use(proxyMiddleware(context, options));
});

// For every captured request
app.get('*', (req, res) => {
  // Ensure that there is a server renderer bundle and template (Possibly still building)
  if ((process.env.VUE_ENV !== 'client' && !renderer) || !template) {
    res.end('waiting for compilation... refresh in a moment.');
    return;
  }

  // If client mode then return template to target a SPA application format
  // https://github.com/JSainsburyPLC/vue-webpack/blob/master/template/doc/server.md
  if (process.env.VUE_ENV === 'client') {
    res.end(template);
    return;
  }

  // Provide context to the render bundle
  const context = { url: req.url };
  // Start the renderering process
  const renderStream = renderer.renderToStream(context);
  console.log('renderStream!!!!', renderStream)
  const appStartIndex = template.indexOf('<main id=app></main>');
  let firstChunk = true;

  // Set response headers
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Cache-Control', 'no-cache');

  renderStream.on('data', chunk => {
    console.log('renderStream DATA!!!!')
    // Write first chunk and initial state for client side Vuex
    if (firstChunk) {
      res.write(template.slice(0, appStartIndex));
      res.flush();
      // Write initial state for client to consume
      res.write(
        `<script>window.__INITIAL_STATE__=${
          serialize(context.state, { isJSON: true })
        }</script>`
      );
      res.flush();
      firstChunk = false;
    }
    // Write stream of component data
    res.write(chunk);
    res.flush();
  });

  // Completed stream so end with document tail contents
  renderStream.on('end', () => {
    console.log('renderStream END!!!!')
    res.end(template.slice(appStartIndex + '<main id=app></main>'.length));
  });

  // Critical error has occured render an error page and throw the error.
  renderStream.on('error', err => {
    res.status(500).end('Internal Error 500');
    throw err;
  });
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`server started at localhost:${port}`); // eslint-disable-line
});
