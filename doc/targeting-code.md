# Development only code

This will be removed on `npm run build`, and available during development. Try to keep this situation as minimal as possible, but if this helps temporally to override default production behavior then this is a great solution.

```js
  if (process.env.NODE_ENV !== 'production') {
    // Do development only code
  }
```

## Hot reloading

In certain scenarios, hot reloads may break due to a components functionality. E.g. a beforeDestroy removes state from the store. In this case during development and on a hot reload we do not want this to take affect.

We can use an if statement to determine different actions based on a hot reload. This statement will be removed upon production builds by Webpack.

```js
  if (module.hot) {
    return;
  }
```
