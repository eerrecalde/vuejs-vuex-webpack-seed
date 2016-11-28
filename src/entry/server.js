import entry from '@entry';

/**
 * Server entry, calls all data preFetching and renders application to a given route
 * @param {Object} context
 * @param {String} context.url
 * @returns {VueInstance} Application Vue instance
 */
export default async function serverEntry(context) {
  // set router's location
  entry.router.push(context.url);

  // Call preFetch hooks on components matched by the route. A preFetch hook
  // dispatches a store action and returns a Promise, which is resolved when the
  // action is complete and store state has been updated.
  await Promise.all(
    entry.router.getMatchedComponents()
      .filter(component => component && component.preFetch)
      .map(component => component.preFetch(entry.store)),
  );

  // After all preFetch hooks are resolved, our application state is now detirmined
  // Expose the state on the render context, so that it can be injected on HTML for
  // client to consume. This will ensure that the logic for fetching the data is not
  // needed to be repeated on the cliend during hydration.
  context.state = entry.store.state;
  return entry.app;
}
