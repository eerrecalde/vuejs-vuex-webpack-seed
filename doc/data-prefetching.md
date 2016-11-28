# Data PreFetching

For best practices it is best to preFetch data on top level route components. This ensures a seamless transition to a SSR driven application. It also helps structure the application in a uniform and data is preFetched in a consistant way.


```js
export default {
  preFetch({ dispatch }) {
    return dispatch('FETCH_DATA');
  },

  beforeMount() {
    exports.default.preFetch(this.$store);
  }
}
```

The preFetch function is used on the client and server in the same manner. To create a better user experience on the client, you may find displaying a loading indicator valuable to inform the user that there is an action taking place.

The `src/entry/server.js` bundle will call all preFetch functions on matched components before rendering to ensure the application's state is determined before rendering starts.
