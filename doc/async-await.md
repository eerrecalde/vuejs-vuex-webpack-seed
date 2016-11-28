# Async and Await

This is a syntactical enhancement. It simply brings asynchronous flows into a synchronous flows. Aiding the simplifying and reasoning of logic.

Behind the scenes `async` declarations create the intent for the function to be asynchronous thus when compiled the output of the function will be in the form of a promise.

`await` declarations indicate to the flow that it must not continue execution until the flowing statement has been resolved.

Avoid using traditional promise structures in favor of this structure.

Please look at this [great resource for more information on async and await](https://ponyfoo.com/articles/understanding-javascript-async-await).

Where possible use concurrency to improve performance, concurrency can be applied where asynchronous behaviour does not need to resolve in a specific order. For example:

```js
  // Bad
  await store.dispatch(actionNames.authenticatePerson);
  await store.dispatch(actionNames.getBasket);

  // Good
  await Promise.all([
    store.dispatch(actionNames.authenticatePerson),
    store.dispatch(actionNames.getBasket),
  ]);
```
