import Vue from 'vue';
import VueRouter from 'vue-router';
import map from '@router/map';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  base: '/',
  routes: map,
});

export default router;
