---
title: "How to Use Promise.all()"
description: "How to use Promise.all() to perform parallel async operations in a fail-fast manner."
published: "2021-07-06T07:00Z"
modified: "2021-07-10T07:00Z"
thumbnail: "./images/cover-6.png"
slug: promise-all
tags: ['javascript', 'promise', 'async']
recommended: ['promise-any', 'promise-all-settled']
type: post
---

In simple words, a promise is a placeholder for a value that's going to be available sometime later. 

Promises are useful when handling asynchoronous operations.  

JavaScript provides a helper function `Promise.all(promisesArrayOrIterable)` to handle multiple promises at once, in parallel, and get the results in a single aggregate array. Let's see how it works.  

## 1. Promise.all()

`Promise.all()` is a built-in helper that accepts an array of promises (or generally an iterable). The function returns a promise:  

```javascript
const allPromise = Promise.all([promise1, promise2, ...]);
```

Then you can extract promises resolved values using a `then`-able syntax:

```javascript
allPromise.then(values => {
  values; // [valueOfPromise1, valueOfPromise2, ...]
}).catch(error => {
  error;  // rejectReason of any first rejected promise
});
```

or `async/await` syntax:

```javascript
try {
  const values = await allPromise;
  values; // [valueOfPromise1, valueOfPromise2, ...]
} catch (error) {
  error;  // rejectReason of any first rejected promise
}
```

The interesting part is in the way the promise returned by `Promise.all()` gets resolved or rejected.  

<u>If all promises are resolved successfully</u>, then `allPromise` fulfills with an array containing fulfilled values of individual promises. The order of promises in the array does matter &mdash; you'll get the fulfilled values in that order.  

![Promise.all() - all fullfilled](./images/all-fullfilled-9.svg)

<u>But if at least one promise rejects</u>, then `allPromise` rejects right away (without waiting for other promises to resolve) with the same reason.  

![Promise.all() - one rejects](./images/one-rejects-5.svg)

Let's see in a couple of examples how to use `Promise.all()` to perform multiple async operations at once.  

## 2. Example: all promises fulfilled

To study how `Promise.all()` works, I'm going to use 2 helpers &mdash; `resolveTimeout(value, delay)` and `rejectTimeout(reason, delay)`.  

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

*The order of promises array directly influences the order of the results*. 

The vegetables promise is the first item, and the fruits promise is the second item in the input array: `Promise.all([vegetablesPromise, fruitsPromise])`. The results array contains values in the same order &mdash; first vegetables list and second fruits list.  

## 3. Example: one promise rejects

Now imagine the situation that the grocery is out of fruits. In such a case, let's reject the fruits promise with an error `new Error('Out of fruits!')`:

```javascript{3,11}
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

However, after passing 1 second the second promise (fruits) rejects with an error `new Error('Out of fruits!')`. This makes `allPromise` reject right away with the same `new Error('Out of fruits!')`.  

Even if the vegetables promise has been fulfilled, `Promise.all()` doesn't take it into account.  

Such behavior of `Promise.all([...])` is named *fail-fast*. If at least one promise in the promises array rejects, then the promise returned by `allPromise = Promise.all([...])` rejects too &mdash; with the same reason.    

## 4. Conclusion

`Promise.all([...])` is a useful helper function that lets you execute asynchronous operations in parallel, using a fail-fast strategy, and aggregate the results into an array.  

*Challenge: can you implement a function `myPromiseAll(arrayOfPromises)` that would work like `Promise.all()`? Share your solution in a comment below!*