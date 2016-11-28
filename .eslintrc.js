module.exports = {
  root: true,
  extends: 'airbnb-base',
  plugins: [
    'html',
    'vue',
  ],
  env: {
    es6: true,
    browser: true,
  },
  rules: {
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    // Turned off as webpack warns on compile (BUG attempted to resolve Vue files)
    'import/no-unresolved': 0,
    'import/no-extraneous-dependencies': 0,
    'import/extensions': 0,
    'semi': [1, 'never'],

    // Allow functions to be hoisted
    'no-use-before-define': [2, { functions: false, classes: true }],

    // Allow no parathesis on arrow functions
    'arrow-body-style': [2, 'as-needed', { requireReturnForObjectLiteral: true }],
    'arrow-parens': [2, 'as-needed', { requireForBlockBody: false }],

    // Reassign props is valid
    'no-param-reassign': [2, { props: false }],

    // Support Vue and JSX render function with h argument
    'no-unused-vars': [2, { vars: 'all', args: 'after-used', argsIgnorePattern: '^h$' }],

    // Always use object shorthand
    'object-shorthand': [2, 'always'],

    // JSDOC support
    'require-jsdoc': [1, {
      require: {
        FunctionDeclaration: true,
        MethodDefinition: true,
        ClassDeclaration: true,
      },
    }],
    'valid-jsdoc': [2, {
      prefer: {
        arg: 'param',
        argument: 'param',
        class: 'constructor',
        return: 'returns',
        virtual: 'abstract',
      },
      requireParamDescription: false,
      requireReturn: true,
      requireReturnType: true,
      requireReturnDescription: true,
      matchDescription: '^[A-Z]+.+',
    }],

    // Vue plugin options
    'vue/jsx-uses-vars': 2,
  },
  parserOptions: {
    ecmaFeatures: {
      ecmaVersion: 2017,
      experimentalObjectRestSpread: true,
      jsx: true,
    },
  },
};
