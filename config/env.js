// Enviroment variables used in webpack configuration, to enable code targetted to enviroments.
// See https://github.com/JSainsburyPLC/vue-webpack/development-only-code
// Default enviorment variables
const env = {
  NODE_ENV: `"${process.env.NODE_ENV || 'development'}"`,
  VUE_ENV: `"${process.env.VUE_ENV}"`,
};

// Overrides targetting bundle types
module.exports = {
  client: Object.assign({}, env, { VUE_ENV: '"client"' }),
  server: Object.assign({}, env, { VUE_ENV: '"server"' }),
  unit: Object.assign({}, env, { VUE_ENV: '"client"' }),
};
