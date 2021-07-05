---
title: "How to Use Promise.all()"
description: "How to use Promise.all() to perform parallel async operations."
published: "2021-07-06T12:00Z"
modified: "2021-07-06T12:00Z"
thumbnail: "./images/cover-5.png"
slug: promise-all
tags: ['javascript', 'promise', 'async']
recommended: ['javascript-fetch-async-await', 'javascript-async-await']
type: post
---

In simple words, a promise is a placeholder for a value that's going to be available sometime later. More technically, a promise is an object which allows you to access the result of an asynchronous operation. 

Sometimes, however, you'd like to perform in parallel and aggregate the result of multiple promises. For example, you'd like to fetch simultaneously the list of categories and products.   

JavaScript provides a helper function `Promise.all(promisesArrayOrIterable)` that allows you to starts multiple promises at once, in parallel, and then get the result in a single aggregate array.   

## 1. Promise.all()

`Promise.all()` is a built-in helper function that accepts an array of promises (or generally an iterable). The function returns a promise:  

```javascript
const allPromise = Promise.all([promise1, promise2, ...]);
```

The interesting part is in the way the promise returned by `Promise.all()` gets resolved or rejected.  

<u>If all promises are resolved successfully</u>, then `allPromise` fulfills with an array containing fulfilled values of individual promises. The order of promises in the array does matter &mdash; you'll get the fulfilled values in the same order.  

![Promise.all() - all fullfilled](./images/all-fullfilled-9.svg)

<u>But if at least one promise rejects</u>, then `allPromise` rejects right away (without waiting for other promises to resolve) with the same reason as the rejected promise rejects.  

![Promise.all() - one rejects](./images/one-rejects-5.svg)

Let's see in a couple of examples how you can use `Promise.all()` to perform multiple async operations at once.  

## 2. Example: all promises fulfilled

To study how `Promise.all()` works, I'm going to use 2 helpers `resolveTimeout(value, delay)` and `rejectTimeout(reason, delay)` which would return promises that fulfill or reject with a specific delay.  

```javascript
function resolveTimeout(value, delay) {
  return new Promise(
    resolve => setTimeout(() => resolve(value), delay)
  );
}

function rejectTimeout(reason, delay) {
  return new Promise(
    (r, reject) => setTimeout(() => reject(reason), delay)
  );
}
```

`resolveTimeout(value, delay)` returns a promise that fulfills with `value` after passing `delay` time.  

On the other side, `rejectTimeout(reason, delay)` returns a promise that rejects with `reason` (usually an error) after passing `delay` time.  

For example, let's access, at the same time, the lists of vegetables and fruits available at the local grocerry store. Accessing each list is an asynchornous operation:  

```javascript{1-4}
const allPromise = Promise.all([
  resolveTimeout(['potatoes', 'tomatoes'], 1000),
  resolveTimeout(['oranges', 'apples'], 1000)
]);

// wait...
const lists = await allPromise;

// after 1 second
console.log(lists); 
// [['potatoes', 'tomatoes'], ['oranges', 'apples']]
```

[Try the demo.](https://codesandbox.io/s/all-promises-fullfilled-2wte0?file=/src/index.js)

`const allPromise = Promise.all([...])` returns a new promise `allPromise`. 

Then the statement `const lists = await allPromise` awaits 1 second until `allPromise` gets fulfilled with an array containing the first and second promises fulfill values.  

Finally, `lists` contains the aggregated result: `[['potatoes', 'tomatoes'], ['oranges', 'apples']]`.  

The order of promises array directly influences the order of the results.  

In the example above, in the promises array, the vegetables promise is the first item, and the fruits promise is the second item: `Promise.all([vegetablesPromise, fruitsPromise])`. Then you'd get in the results array the results in the same order: first vegetables list and second fruits list.  

## 3. Example: one promise rejects

Now let's imagine the situation that the grocery is out of fruits. In such a case, let's throw an error `new Error('Out of fruits!')`.  

```javascript{1-4}
const allPromise = Promise.all([
  resolveTimeout(['potatoes', 'tomatoes'], 1000),
  rejectTimeout(new Error('Out of fruits!'), 1000)
]);

try {
  // wait...
  const lists = await allPromise;
} catch (error) {
  // after 1 second
  console.log(error.message); // 'Out of fruits!'
}
```

[Try the demo.](https://codesandbox.io/s/one-rejects-w5guk?file=/src/index.js)

In this scenario `allPromise = Promise.all([...])` returns, as usual, a promise. 

However, after passing 1 second the second promise (fruits) rejects with an error `new Error('Out of fruits!')`. This makes the `allPromise` reject right away with the same `new Error('Out of fruits!')` reason.  

Even if the vegetables promise has been fulfilled, `Promise.all()` doesn't take it into account.  

Such behavior of `Promise.all([...])` is named *fail-fast*. If at least one promise in the promises array rejects, then the promise returned by `allPromise = Promise.all([...])` rejects too &mdash; with the same reason.    

## 4. Conclusion

`Promise.all([...])` is a useful helper function that lets you execute asynchronous operations in parallel, using a fail-fast strategy, and aggregate the result into an array.  

