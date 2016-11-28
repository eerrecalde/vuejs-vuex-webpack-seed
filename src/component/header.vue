<template>
  <header class="header">
    <router-link to="/" exact>Home</router-link>
    <router-link to="/courses">Courses</router-link>
    <router-link to="/about">About</router-link>
    <Loading></Loading>
  </header>
</template>

<script>
import Loading from '@component/loading'

export default {
  name: 'header',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
      timer: null,
    }
  },
  components: { Loading },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px 0 0;
}

a {
  color: #42b983;
  text-decoration: none;

  &.router-link-active {
    color: mix(#000, #42b983, 50%);
  }
}
</style>
