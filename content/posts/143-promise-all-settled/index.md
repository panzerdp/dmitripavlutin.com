---
title: "How to Use Promise.allSettled()"
description: "How to use Promise.allSettled() to perform parallel async operations and collect the statuses into an array."
published: "2021-08-03T12:00Z"
modified: "2021-08-03T12:00Z"
thumbnail: "./images/cover-2.png"
slug: promise-all-settled
tags: ['javascript', 'promise', 'async']
recommended: ['promise-all', 'what-is-javascript-promise']
type: post
---

Let's say that you'd like to fetch 2 kinds of products &mdash; fruits and vegerables &mdash; that are available at the local grocerry store.  

Also you'd like to fetch these products in parallel, indipendent on each other. What helper function can help you with that?

Welcome `Promise.allSettled(promises)` helper function: which runs promises in parallel and aggregates the settle statuses (either fulfilled or rejected) into a result array.  

Let's see how `Promise.allSettled()` works.  

### 1. *Promise.allSettled()*

The function accepts a single argument: an array (or generally an iterable) of promises, and right away returns a special promise.  

```javascript
const statusesPromise = Promise.allSettled(promises);
```

When *all* the `promises` in the input array are being fulfilled or rejected, in parallel, the returned promise `statusesPromise` resolves with an array where each item is a status object:

1. `{ status: 'fulfilled', value: value }` &mdash; if the corresponding promise has fulfilled
2. Or `{ status: 'rejected', reason: reason }` &mdash; if the corresponding promise has rejected

The promise returned by `Promise.allSettled()` *always resolves with an array of statuses*, no matter if the input promises get resolved or rejected.  

## 2. Fetching fruits and vegetables

Before diving into `Promise.allSettle()`, let's define 2 simple helper functions.  

First, `resolveTimeout(value, delay)` &mdash; returns a promise that fulfills with `value` after passing `delay` time:

```javascript
function resolveTimeout(value, delay) {
  return new Promise(
    resolve => setTimeout(() => resolve(value), delay)
  );
}
```

Second, `rejectTimeout(reason, delay)` &mdash; returns a promise that rejects with `reason` after passing `delay` time:

```javascript 
function rejectTimeout(reason, delay) {
  return new Promise(
    (r, reject) => setTimeout(() => reject(reason), delay)
  );
}
```

Let's use these helper functions to experiment how `Promise.allSettled()` behaves.  

### 2.1 All promises fulfilled

For example, let's access, at the same time, the lists of vegetables and fruits available at the local grocerry store. Accessing each list is an asynchornous operation:  

```javascript{1-4}
const statusesPromise = Promise.allSettled([
  resolveTimeout(['potatoes', 'tomatoes'], 1000),
  resolveTimeout(['oranges', 'apples'], 1000)
]);

// wait...
const statuses = await productsPromise;

// after 1 second
console.log(statuses); 
// [
//   { status: 'fulfilled', value: ['potatoes', 'tomatoes'] },
//   { status: 'fulfilled', value: ['oranges', 'apples'] }
// ]
```

[Try the demo.](https://codesandbox.io/s/all-resolved-yyc0l?file=/src/index.js)

`Promise.allSettled([...])` returns a promise `statusesPromise` that resolves in 1 second, right after the list of vegetables and fruits were resolved in parallel.  

The resolved value of promise `productsPromise` is an array containing the statuses. 

The first item of the array contains the fulfilled status with vegetables: `{ status: 'fulfilled', value: ['potatoes', 'tomatoes'] }`.  

Same way, the second item is the fulfilled status of fruits: `{ status: 'fulfilled', value: ['oranges', 'apples'] }`.  

### 2.2 One promise rejected

Let's imagine the situation when there are no more fruits at the grocerry. In such case, let's reject the promise that returns fruits. How would `Promise.allSettled()` would work in such case?  

```javascript{1-4}
const statusesPromise = Promise.allSettled([
  resolveTimeout(['potatoes', 'tomatoes'], 1000),
  rejectTimeout(new Error('Out of fruits!'), 1000)
]);

// wait...
const statuses = await productsPromise;

// after 1 second
console.log(statuses); 
// [
//   { status: 'fulfilled', value: ['potatoes', 'tomatoes'] },
//   { status: 'rejected', reason: Error('Out of fruits!') }
// ]
```

After 1 second passing, `productsPromise`, which is returned `Promise.allSettled([...])` resolves with an array of statuses.  

The first item of the array, since vegetables promise resolved successfully, is `{ status: 'fulfilled', value: ['potatoes', 'tomatoes'] }`.  

The second item, because fruits promise rejected with an error, is a rejection status: `{ status: 'rejected', reason: Error('Out of fruits') }`.  

Note that even thought the second promise in the input array rejected, the `statusesPromise` was still resolved successfully with an array of statuses.  

### 2.3 All promises rejected

What is the grocerry is oout of vegetables and out of fruits? In such case both promises reject:


```javascript{1-4}
const statusesPromise = Promise.allSettled([
  resolveTimeout(new Error('Out of vegetables!'), 1000),
  rejectTimeout(new Error('Out of fruits!'), 1000)
]);

// wait...
const statuses = await productsPromise;

// after 1 second
console.log(statuses); 
// [
//   { status: 'fulfilled', reason: Error('Out of vegetables!')  },
//   { status: 'rejected', reason: Error('Out of fruits!') }
// ]
```

In such case `statusesPromise` still gets resolves with an array of statues, which, however, are statuses of rejected promises with the corresponding reason.  

## 3. Conclusion

`Promise.allSettled(promise)` let's you resolve and collect the statuses of the promises supplied as an array.  

