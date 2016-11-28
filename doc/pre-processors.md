# Pre-Processors

This boilerplate has pre-configured CSS extraction for most popular CSS pre-processors including LESS, SASS, Stylus, and PostCSS. To use a pre-processor, all you need to do is installing the appropriate webpack loader for it. Sass (scss) is already ready for you to use, if it is not in use then you can remove `node-sass` and `sass-loader` from the `package.json`.

Many of the most popular css tooling is available for you to use. `sass`, `scss`, `stylus`, `postcss` and `css`. Although stick to one and keep to it :).. Sainsbury's use `sass` with `scss` syntax.

### Using Pre-Processors inside Components

Once installed, you can use the pre-processors inside your `*.vue` components using the `lang` attribute on `<style>` tags:

```html
  <style lang="scss">
  /* write SASS! */
  </style>
```

### A note on SASS syntax

- `lang="scss"` corresponds to the CSS-superset syntax (with curly braces and semicolones).
- `lang="sass"` corresponds to the indentation-based syntax.

See [vue-loader's related documentation](http://vuejs.github.io/vue-loader/features/postcss.html) for more details for using PostCSS.

### Standalone CSS Files

To ensure consistent extraction and processing, it is recommended to import global, standalone style files from your root `App.vue` component, for example:

```html
  <!-- App.vue -->
  <style src="./styles/global.less" lang="less"></style>
```

Note you should probably only do this for the styles written by yourself for your application. For existing libraries e.g. Bootstrap or Semantic UI, you can place them inside `/static` and reference them directly in `index.html`. This avoids extra build time and also is better for browser caching. (See [Static Asset Handling](assets.md))
