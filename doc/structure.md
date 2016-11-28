# Project Structure

## Sacrificial Architecture

The project stucture is formed with *Sacrificial Architecture* in mind, splitting the application up into it's core concerns. Essentially [Sacrificial architecture](http://slides.com/blakenewman/adapting-to-change) helps separate the concerns of the application at a higher level, which improves ability to update tooling and change tooling with ease.

[Slide 41](http://slides.com/blakenewman/adapting-to-change#/41) shows a rough plan of how Sacrificial Architecture works with a store.

It helps by organizing then application structure into logical areas of the application. For a example of this structure take a further read of this documentation.

### Layers

- `API -> Normalizer -> Store <-> View`
- `API <- Store <- View`
- `Helpers <-> Store`
- `Helpers <-> View`
- `Constants -> (ALL)`
- `Routes components (Smart components) -> components (Dumb components)`


- The Normalizer layer should help to normalize the data and aggregate into a consumable form (Improving speeds and reducing logic in view)
- The Store layer should reduce logic in view and reduce duplication and ensure a single data flow
- Helpers are used to reduce complexity in view and abstract reusable code to a functional layer
- Constants should be used to standardize and reduce duplication across all of the application

## Smart and Dumb components

Smart components (Higher lever views that build core UI and retrieve and dispatch change to state etc), are designed to reduce complexity of other components and should be the only area with complex logic to build the structure for that page. They also ensure that other components become simple and more reusable.

Dumb components should be as stateless and contain as little logic as possible, this improves the maintainability and reduces complexity and ensures components are reusable.

Smart component are usually defined in the *src/router/route* directory as they are used at the top level of the application via the router. The dumb components are generally reusable and can be defined in the *component folder*.

## Aliases

Aliases means you can change file and folders structure with less concern about breaking the linkage between modules. The aliases are assigned within the `config/path.js`.

For example:

```js
  // bad
  import example from '../../component/example';

  // good
  import example from '@component/example';
```

## Structure

``` bash
.
├── config/                     # project build config files
│   └── ...
├── dist/                       # project compiled files with `npm run build`
│   └── ...
├── doc/                        # project docs
│   └── ...
├── script/                     # script files
│   └── ...
├── server/                     # server files
│   └── ...
├── src/
│   ├── index.html              # index.html template
│   ├── api/                    # services for API interactions
│   │   └── ...
│   ├── asset/                  # module assets (processed by webpack)
│   │   └── ...
│   ├── component/              # vue components
│   │   └── ...
│   ├── constant/               # constant files
│   │   └── ...
│   ├── directive/              # vue directives
│   │   └── ...
│   ├── entry/                  # bundle entries
│   │   ├── client.js           # client entry point
│   │   ├── server.js           # server entry point
│   │   ├── app.js              # shared app entry point for server and client
│   │   └── ...
│   ├── helper/                 # helper's (resusable code)
│   │   └── ...
│   ├── mixin/                  # component mixins
│   │   └── ...
│   ├── router/                 # routing (maps and route components)
│   │   ├── map/                # route map
│   │   │   └── ...
│   │   ├── route/              # route components
│   │   │   └── ...
│   │   └── index.js            # router entry point
│   ├── store/                  # store (Vuex state)
│   │   ├── constant/           # store constants
│   │   │   ├── action.js       # store action constants
│   │   │   ├── getter.js       # store getter constants
│   │   │   └── mutation.js     # store mutation constants
│   │   ├── module/             # store modules (state, actions and mutations)
│   │   │   └── ...
│   │   └── index.js            # store entry point
│   └── styles/                 # Application global styles - structure with team preference
│       └── ...
├── static/                     # pure static assets
├── test/
│   ├── unit/                   # unit tests
│   │   ├── spec/               # test spec files
│   │   ├── util/               # test utility files
│   │   │   └── ...
│   │   └── index.js            # test build entry file
│   └── e2e/                    # e2e tests
│       ├── assertion/          # custom assertions for e2e tests
│       │   └── ...
│       ├── global/             # Nightwatch globals
│       │   ├── index.js        # Consolidates globals to single export
│       │   └── ...
│       ├── page-object/        # Page objects for e2e tests
│       │   └── ...
│       └── spec/               # test spec files
│           └── ...
├── .babelrc                    # babel config
├── .editorconfig.js            # editor config
├── .eslintrc.js                # eslint config
├── .stylelintrc.js             # stylelint config
├── package.json                # build scripts and dependencies
└── PULL_REQUEST_TEMPLATE.md    # projects pull request template
```

## `package.json`

The NPM package meta file that contains all the build dependencies and [build commands](commands.md).

## `PULL_REQUEST_TEMPLATE.md`

Help structure your pull requests with this template. Modify it to your project needs, workflow and deployment.

## `config/` and `script/`

The config folder contains all the relevant configuration for the build and test runners.

The scripts are the node scripts for building and running the test environments.

Please read [setup](setup.md), [config](config.md), [commands](commands.md).

## `src/`

This is where most of your application code will live in. How to structure everything inside this directory is largely up to you, however follow the rules of the code base, and keep structured.

### `src/index.html`

This is the **template** `index.html` for our single page application. During development and builds, Webpack will generate assets, and the URLs for those generated assets will automatically injected into this template to render the final HTML.

### `src/api/`

This contains the API service files. Calling external API's should be abstracted here, to ensure reusablity of such services. Organise the sub structure appropriately to contain related code.

For the API communication abstraction we are using [vue-resource](https://github.com/vuejs/vue-resource/tree/master/docs).

### `src/asset/ `
This is where assets like images, fonts, are held that should be processed via webpack.

For more information on asset handling please read the [docs]( assets.md)

### `src/component/ `

Components are one of the most powerful features of Vue.js. They help you extend basic HTML elements to encapsulate reusable code. At a high level, Components are custom elements that Vue.js’ compiler would attach specified behavior to. In some cases, they may also appear as a native HTML element extended with the special is attribute.

Please see appropriate [documentation](http://vuejs.org/guide/components.html) and [Vue component/file docs](http://vue-loader.vuejs.org/en/index.html).

### `src/constant/ `

Contains application constants, this helps aid maintainability and centralization of primitive types for the application.

### `src/directive/ `

In addition to the default set of directives shipped in core, Vue.js also allows you to register custom directives. Custom directives provide a mechanism for mapping data changes to arbitrary DOM behaviour. Please use appropriately, most scenarios of directives could be done via components.

Please see appropriate [docs](http://vuejs.org/guide/custom-directive.html).

### `src/entry/ `

This is where the application entry points sit. Use entry points for single instances to ensure Vendor and application installations are unique to the entry.

### `src/helper/ `

This should contain files, that have reusable use cases. Avoid creating wrapped filters in Vue. These can be easily translated to reusable functions in the form of helpers.

Helpers are generally tool/framework/library agnostic, so abstracting code to helpers can help with migrations and updates of tools. As code here has no influence over the tools in use.

### `src/api/`

Mixins are a flexible way to distribute reusable functionalities for Vue components. A mixin object can contain any component options. When a component uses a mixin, all options in the mixin will be “mixed” into the component’s own options.

Please see appropriate [docs](http://vuejs.org/guide/mixins.html).

### `src/router/`

Contains the [Vue router configuration](http://router.vuejs.org/en/index.html).

*Please use [named routes](http://router.vuejs.org/en/named.html). This makes is easier to reason with in components.*

#### `src/router/map/`

This is the mapping configuration files for the router, split into appropriate files matching the route groups. This helps with modularising the application into key areas with simpler mapping files.

Route components should be using code splitting and asynchronous components where needed see [Code Splitting](code-splitting.md).

#### `src/router/route/`

Similar to components but they typically resemble pages and have a route mapping associated to them. They should be grouped into sub directories where appropriate.

### `src/store/`

The store is where the application/website is centralised. The state and communication layers are stored here. This ensures that are components are state free, and with reduced dependencies. For more information on how to use `Vuex` and it's benefits look at the [docs](http://vuex.vuejs.org/en/index.html).

#### `src/store/constant/`

This folder is for combining the stores constants. The constants are available to ensure that you can easily see what available types for actions, mutations ect are available. This also helps reduce chances of conflict with naming.

For more information please read the [Vuex structure docs](http://vuex.vuejs.org/en/structure.html).

#### `src/store/plugin/`

Vuex stores accept the plugins option that exposes hooks for each mutation. A Vuex plugin is simply an object that implements some hook functions.

For more information please read the [Vuex plugins docs](http://vuex.vuejs.org/en/plugins.html).

#### `src/store/module/`

This folder is for modularising the state actions, mutations and getters.

For more information please read the [Vuex structure docs](http://vuex.vuejs.org/en/structure.html).

### `src/style/`

This is where your global styles sit for the application. Please structure with your teams preference for css. Component css should sit with the component, and can import any reusable utils (colors etc).

## `test/e2e`

For more information on the testing strategy please refer to [Unit testing docs](./doc/e2e.md)

## `test/unit`

For more information on the testing strategy please refer to [Unit testing docs](./doc/unit.md)

## `static/`

This directory is an escape hatch for static assets that you do not want to process with Webpack.

For more information on asset handling please read the [template docs](./doc/assets.md)
