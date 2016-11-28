# Code splitting

Code splitting is a great tool to ensure initial startup times are improved. Pages/Routes should be split out accordingly.

In general practice non-essential components should be asynchronously loaded on demand when required. Webpack will cleverly differentiate common used chunks of code and organize efficiently. It will also intelligently match issues with multiple named splits that use the same chunks.

Use the outputted `/webpack-stats.json` with https://webpack.github.io/analyse to get useful information on how to improve performance and code splitting.

You can use the hints section to help highlight potential issues. This highlights the use of `require.include(...)` to move modules into parent change. The `src/entry/client.js` is an entry point for managing top level chunk moves for client.

```js
  component(resolve) {
    require.ensure(['components/exampleComponent'], (require) => {
      resolve(require('components/exampleComponent'));
    }, 'example-component');
  },
```

For more information on code splitting refer to [webpack docs](https://webpack.github.io/docs/code-splitting.html), and [Vue's asynchrous components](http://vuejs.org/guide/components.html#Async-Components).

### NOTE

SSR does not currently support code splitting, this is being looked at currently. Will update when available
