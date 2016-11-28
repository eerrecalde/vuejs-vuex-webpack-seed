# Linter Configuration

## ESLint

This boilerplate uses [ESLint](http://eslint.org/) as the linter, and uses the [airbnb-base](https://github.com/airbnb/javascript) preset.

If you are not happy with the default linting rules, you can:

1. Overwrite individual rules in `.eslintrc.js`. For example, you can add the following rule to enforce semicolons instead of omitting them:

```js
  "semi": [2, "always"]
```

## StyleLint

This boilerplate uses [stylelint](https://github.com/stylelint/stylelint) as the style linters, it supports multiple languages (sass, scss and css) and support linting of html/vue files. It uses the [stylelint-config-standard](https://github.com/stylelint/stylelint-config-standard) preset.

It is configured with webpack with the [stylelint webpack plugin](https://github.com/vieron/stylelint-webpack-plugin).

You can overwrite the rules in the `.stylelintrc.js` file if you are not happy with the default linting rules.
