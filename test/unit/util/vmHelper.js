import Vue from '@entry/vue';
import VueRouter from 'vue-router';
import store from '@store';

export default {
  create: createVM,
  createMixin: createMixinVM,
  spyOnDependencies: spyOnVmDependencies,
  update: vmUpdate,
};

/**
 * Helper for creating and instantiating component with defined mixin.
 * @param {Object} mixin
 * @returns {VueComponent} Intantiated component with mixin
 */
export function createMixinVM(mixin) {
  return createVM({ mixins: [mixin] });
}

/**
 * Helper for creating and instantiating simple page components.
 * @param {Object} component
 * @param {String} [path]
 * @param {String} [goTo]
 * @returns {VueComponent} Intantiated page component
 */
export function createVM(component, path = '/', goTo = path) {
  document.body.innerHTML = '<div id="test"></div>';
  const router = new VueRouter({
    mode: 'abstract',
    routes: [{ path, component }],
  });
  const vm = new Vue({
    store,
    router,
    render(h) {
      return (<router-view></router-view>);
    },
  });
  router.push(goTo);
  vm.$mount('#test');
  return vm.$children[0];
}

/**
 * Helper for spying on known vm dependencies (vuex, vue-router, ect)
 * @param {VueComponent} vm
 * @returns {Void} Function does not return
 */
export function spyOnVmDependencies(vm) {
  spyOn(vm.$store, 'dispatch');
  spyOn(vm.$router, 'push');
  spyOn(vm.$router, 'back');
  spyOn(vm.$router, 'forward');
  spyOn(vm.$router, 'go');
  spyOn(vm.$router, 'replace');
}

/**
 * Helper for async assertions.
 * Use like this:
 *
 * it('test', async done => {
 *   try {
 *     vm.type = 'error';
 *     await vmHelper.update();
 *     expect(vm.$el.className).toEqual('error');
 *     done();
 *   } catch (error) {
 *     done.fail(error);
 *   }
 * });
 *
 * it('Adds notification type class', async done => {
 *   try {
 *     setTimeout(200, () => { vm.type = 'error'; });
 *     await vmHelper.update(200);
 *     expect(vm.$el.className).toEqual('error');
 *     done();
 *   } catch (error) {
 *     done.fail(error);
 *   }
 * });
 *
 * @param {Number} [time]
 * @returns {Promise} For async await syntax
 */
export function vmUpdate(time = 0) {
  return new Promise(resolve => {
    function resolver() { Vue.nextTick(() => resolve()); }
    return setTimeout(resolver, time);
  });
}
