# Build Commands

All build commands are executed via [NPM Scripts](https://docs.npmjs.com/misc/scripts).

### `npm start`

> Starts a Node.js local development server. See [API Proxying During Development](proxy.md) for more details.

- Webpack + `vue-loader` for single file Vue components.
- State preserving hot-reload
- State preserving compilation error overlay
- Proxy configuration for standalone running outside VM
- Lint-on-save with ESLint
- Source maps
- Automatic Polyfills with `babel-runtime`
- Easy SSR capabilities out of the box

### `NODE_ENV=production npm start`

> Starts a Node.js server.

- Runs production version of server. See [Server and SSR documentation](server.md) for more information.

### `VUE_ENV=client npm start`

> Starts a Node.js server that serves a SPA compliant build.

- Runs SPA version of server. See [Server and SSR documentation](server.md) for more information.

### `npm run build`

> Build assets for production. See [Integrating with Backend Framework](backend.md) for more details. Runs `build:client` and `build:server`

### `npm run build:client`

> Build assets for client

- JavaScript minified with [UglifyJS](https://github.com/mishoo/UglifyJS2).
- HTML minified with [html-minifier](https://github.com/kangax/html-minifier).
- CSS across all components extracted into a single file and minified with [cssnano](https://github.com/ben-eb/cssnano).
- All static assets compiled with version hashes for efficient long-term caching, and a production `index.html` is auto-generated with proper URLs to these generated assets.

### `npm run build:server`

> Builds server bundle for SSR


### `npm run test`

Runs the following commands, useful for CI and running all tests:
- `npm run test:lint`
- `npm run test:unit`
- `npm run test:e2e` - with phantomjs

### `npm run test:lint`

> Run all linters

### `npm run test:lint:eslint`

> Run eslint linter

### `npm run test:lint:stylelint`

> Run stylelint linter

### `npm run test:unit`

> Run unit tests in PhantomJS with [Karma](http://karma-runner.github.io/0.13/index.html). See [Unit Testing](unit.md) for more details.

- Supports ES2015 in test files.
- Supports all webpack loaders.
- Single run
- Easy [mock injection](http://vuejs.github.io/vue-loader/workflow/testing-with-mocks.html).

### `npm run test:unit:dev`

> Same as `npm run test:unit` but with watching.

### `npm run test:e2e`
> Run end-to-end tests if installed with [Nightwatch](http://nightwatchjs.org/). See [End-to-end Testing](e2e.md) for more details.

- Run tests in multiple browsers in parallel.
- Works with one command out of the box:
  - Selenium and chromedriver dependencies automatically handled.
  - Automatically spawns the Selenium server.

### `npm run test:e2e -- --env firefox`
> Same as `npm run test:e2e` however runs in specified browsers see [End-to-end Testing](e2e.md)).

### `SAUCE_USER=username SAUCE_KEY=key npm run test:e2e`

- run e2e tests with saucelabs
- adds tunneling support (please request username and key)
- Please see e2e doc for more information

`SAUCE_USER=username SAUCE_KEY=key ENTS_ENV={dev,uat,stg,prod} npm run test:e2e`
