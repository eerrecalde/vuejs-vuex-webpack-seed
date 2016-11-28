# Server with SSR capabilities

The server script is able to scale from a SPA type application into an isomorphic application with very little adjustments.

If you want to learn how to use SSR please look at [Vue.js documentation](http://vuejs.org/guide/ssr.html)

This template includes all the necessary code to start using SSR. Below are some suggestions to enable practical solutions for isomorphic error pages and SEO.

## Requirements

At this point it is assumed that you are using `vuex` and `vue-router`, you must be using these to start with SSR.

## Turning off SSR

To turn off SSR you must set the `VUE_ENV` to `client`.

> `VUE_ENV=client npm start` / `VUE_ENV=client NODE_ENV=production npm start`

## SSR with isomorphic error pages

You can easily use isomorphic error pages with this setup, by including an `error` state module in the store. You can send correct error codes through SSR and display correct contents. The error state module should have a `status` property that you can populate with the applications error status code.

The implementation of the error pages is up to you as you may have different requirements. (Notification, Pages ect).

### SEO

To take advantage of SEO the rendered template head is manipulated before being served. You can provide a `seo` state object or use `vue-router`'s `meta` object to pass information to the server during render. See the server script code for more information.

### Deploying

There is many great resources for managing node server instances. Try using a solution like PM2 to cluster the application. These choices are left out from this template, as every project will have different requirements and needs when it comes to deploying the node server.
