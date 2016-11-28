import entry from '@entry';

// Polyfill provided by babel for promise for unsupported browsers;
// Assign to window for libaries to use.
if (!window.Promise) {
  window.Promise = Promise;
}

// prime the store with server-initialized state.
// the state is determined during SSR and inlined in the page markup.
if (window.__INITIAL_STATE__) { // eslint-disable-line
  entry.store.replaceState(window.__INITIAL_STATE__); // eslint-disable-line
}

// actually mount to DOM
entry.app.$mount('#app');
