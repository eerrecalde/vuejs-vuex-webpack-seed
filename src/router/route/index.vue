<template>
  <div>
    <img class="logo" src="~@asset/logo.png">
    <h1>Hello World!</h1>
    <p>Welcome to your Vue.js app!</p>
    <p>
      To get a better understanding of how this boilerplate works, check out its documentation.
      It is also recommended to go through the docs for
      <a href="http://webpack.github.io/" target="_blank">Webpack</a> and
      <a href="http://vuejs.github.io/vue-loader/" target="_blank">vue-loader</a>.
      If you have any issues with the setup, please file an issue.
    </p>
    <p>
      You may also want to checkout
      <a href="https://github.com/vuejs/vue-router/" target="_blank">vue-router</a> for routing and
      <a href="https://github.com/vuejs/vuex/" target="_blank">vuex</a> for state management and <a href="https://github.com/vuejs/vue-router-sync/" target="_blank">vue-router-sync</a> for syncronising routes to vuex.
    </p>
  </div>
</template>

<script>
  export default {
    name: 'IndexPage',
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  h1 {
    color: #42b983;
  }

  p {
    color: #42b983;
  }

  a {
    color: #42b983;
    text-decoration: none;
  }

  .logo {
    width: 100px;
    height: 100px;
  }
</style>
