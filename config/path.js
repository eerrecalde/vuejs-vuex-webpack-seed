const { join, posix } = require('path');

const root = join(__dirname, '../');
const src = join(__dirname, '../src');

module.exports = {
  root,
  src,
  nodeModules: join(__dirname, '../node_modules'),
  alias: {
    $vue: 'vue/dist/vue.common.js',
    '@api': join(src, 'api'),
    '@asset': join(src, 'asset'),
    '@component': join(src, 'component'),
    '@constant': join(src, 'constant'),
    '@directive': join(src, 'directive'),
    '@entry': join(src, 'entry'),
    '@helper': join(src, 'helper'),
    '@mixin': join(src, 'mixin'),
    '@router': join(src, 'router'),
    '@store': join(src, 'store'),
    '@style': join(src, 'style'),
    '@view': join(src, 'view'),
  },
  asset: {
    index: join(src, 'index.html'),
    favicon: join(src, 'asset/favicon.png'),
    static: join(__dirname, '../static'),
    entry: {
      client: join(src, 'entry/client.js'),
      server: join(src, 'entry/server.js'),
    },
  },
  output: {
    asset: join(__dirname, '../dist/asset'),
    index: join(
      __dirname,
      `../dist/${process.env.NODE_ENV === 'production' ? '' : '_'}index.html`
    ),
    path: join(__dirname, '../dist'),
    server: join(__dirname, '../dist/server.js'),
    public: '/',
    getAssetPosixPath(subpath) {
      return posix.join('asset', subpath);
    },
  },
  proxy: {
  },
  unit: {
    root: join(root, 'test/unit'),
    alias: {
      '@unit': join(root, 'test/unit'),
    },
  },
};
