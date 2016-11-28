# Documentation

Please add documentation with each Pull Request, and keep it up to date. There is some basic `eslint` rules enabled to enforce some documentation standards.

Add documentation to `docs` folder when you are adding architectural documentation or further information.

Add inline documentation where possible. Use JSDoc blocks to document methods and functions. Single line comments for flow descriptions. JSDoc should be easy to follow and not over cumbersome, revealing enough information to aid others understanding.

## Rules

- Do not add parameter descriptions, your parameter names should be descriptive.
- Descriptions at top of block
 - Multiline descriptions are valid
- Add return description
 - If does not return use: `@returns {void} Does not return value`
- Make components self documented within the code, do not write lots of JSDocs at component level as this can sacrifice readability. Add JSDocs for components where complexity may be involved.
- Avoid option parameters where destructuring is clear.

## Examples

Simple example:

```js
  /**
   * A single line description message
   * @param {Number} a
   * @returns {Number} return description
   */
  function increment(a) {
    return a + 1;
  }
```

Multiline description:

```js
  /**
   * A Multiline line description message
   * as we need
   * @param {Number} a
   * @returns {Number} return description
   */
  function increment(a) {
    return a + 1;
  }
```

No return value (Always use `No return value` as description):

```js
  /**
   * A single line description message
   * @param {Number} a
   * @returns {Void} No return value
   */
  function increment(a) {
    return a + 1;
  }
```

Optional parameter (denoted by `[]`):

```js
  /**
   * A single line description message
   * @param {Number} a
   * @param {Number} [b]
   * @returns {Void} return description
   */
  function increment(a, b = 1) {
    return a + b;
  }
```

Object parameter descriptions:

```js
  /**
   * A single line description message
   * @param {Object} options
   * @param {Number} options.a
   * @param {Number} options.b
   * @returns {Void} return description
   */
  function increment({ a, b }) {
    return a + b;
  }
```

Optional Object parameter descriptions (denoted by `[]`):

```js
  /**
   * A single line description message
   * @param {Object} options
   * @param {Number} options.a
   * @param {Number} [options.b]
   * @returns {Void} return description
   */
  function increment({ a, b = 1 }) {
    return a + b;
  }
```
