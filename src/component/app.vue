<template>
  <div id="app">
    <HeaderComponent></HeaderComponent>
    <transition name="fade" mode="out-in">
      <router-view class="view"></router-view>
    </transition>
  </div>
</template>

<script>
import HeaderComponent from '@component/header'

export default {
  name: 'app',
  components: {
    HeaderComponent,
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  margin: 10px 0 0 10px;
}
</style>
