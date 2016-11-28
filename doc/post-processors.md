# Post-processors

## Favicon generator
Favicons are already generated with `webpack-favicon-plugin`. It looks at the `src/assets/favicon.png` file to generate the full set of favicons and injects the markup into the index.html file.

## CSS purifying
We are using PurifyCSS to remove unused css. You may need to add whitelisting for dynamic css (PurifyCSS can handle most dynamic css, however this should be fine). This can be configured in the `webpack.client.prod.js` file. Please see [docs](https://github.com/purifycss/purifycss#the-optional-options-argument).
