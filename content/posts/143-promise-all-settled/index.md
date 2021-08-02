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

`Promise.allSettled(promises)` is a helper function that runs promises in parallel and aggregates the settled statuses (either fulfilled or rejected) into a result array.  

Let's see how `Promise.allSettled()` works.  

### 1. *Promise.allSettled()*

`Promise.allSettled()` is useful to perform independent async operations in parallel, and collect the result of these operations.  

The function accepts an array (or generally an iterable) of promises as an argument:

```javascript
const statusesPromise = Promise.allSettled(promises);
```

When *all* input `promises` are being fulfilled or rejected, in parallel, `statusesPromise` resolves to an array having the statuses of the input promises:

1. `{ status: 'fulfilled', value: value }` &mdash; if the corresponding promise has fulfilled
2. Or `{ status: 'rejected', reason: reason }` &mdash; if the corresponding promise has rejected

After all input `promises` are being resolved, you can extract their statuses using a `then`-able syntax:

```javascript
statusesPromise.then(statuses => {
 statuses; // [ { status: '...', value: '...' }, ..]
});
```

or using an `async/await` syntax:  

```javascript
const statuses = await statusesPromise;

statuses; // [ { status: '...', value: '...' }, ...]
```

The promise returned by `Promise.allSettled()` *always fulfills with an array of statuses*, no matter if the input promises get resolved or rejected. 

In other words, the promise returned by `Promise.allSettled()` *never rejects*.  

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

Let's use these helper functions to experiment on `Promise.allSettled()`.  

### 2.1 All promises fulfilled

Let's access in parallel the lists of vegetables and fruits available at the local grocerry store. Accessing each list is an asynchornous operation:  

```javascript{2,3}
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

`Promise.allSettled([...])` returns a promise `statusesPromise` that resolves in 1 second, right after the list of vegetables and fruits were resolved, in parallel.  

The promise `statusesPromise` resolves to an array containing the statuses: 

1. The first item of the array contains the fulfilled status with vegetables: `{ status: 'fulfilled', value: ['potatoes', 'tomatoes'] }`
2. Same way, the second item is the fulfilled status of fruits: `{ status: 'fulfilled', value: ['oranges', 'apples'] }`.  

### 2.2 One promise rejected

Imagine there are no more fruits at the grocery. In such a case, let's reject the promise that returns fruits. 

How would `Promise.allSettled()` would work in such a case?  

```javascript{3}
const statusesPromise = Promise.allSettled([
  resolveTimeout(['potatoes', 'tomatoes'], 1000),
  rejectTimeout(new Error('Out of fruits!'), 1000)
]);

// wait...
const statuses = await statusesPromise;

// after 1 second
console.log(statuses); 
// [
//   { status: 'fulfilled', value: ['potatoes', 'tomatoes'] },
//   { status: 'rejected', reason: Error('Out of fruits!') }
// ]
```

[Try the demo.](https://codesandbox.io/s/one-rejected-ij3uo?file=/src/index.js)

The promise returned by `Promise.allSettled([...])` resolves to an array of statuses after 1 second:    

1. The first item of the array, since vegetables promise resolved successfully, is `{ status: 'fulfilled', value: ['potatoes', 'tomatoes'] }`  
2. The second item, because fruits promise rejected with an error, is a rejection status: `{ status: 'rejected', reason: Error('Out of fruits') }`.  

Note that even though the second promise in the input array is rejected, the `statusesPromise` still resolves successfully with an array of statuses.  

### 2.3 All promises rejected

What if the grocerry is out of both vegetables and fruits? In such case both promises should reject:

```javascript{2-3}
const statusesPromise = Promise.allSettled([
  rejectTimeout(new Error('Out of vegetables!'), 1000),
  rejectTimeout(new Error('Out of fruits!'), 1000)
]);

// wait...
const statuses = await statusesPromise;

// after 1 second
console.log(statuses); 
// [
//   { status: 'rejected', reason: Error('Out of vegetables!')  },
//   { status: 'rejected', reason: Error('Out of fruits!') }
// ]
```

[Try the demo.](https://codesandbox.io/s/all-rejected-z4jee?file=/src/index.js)

In such a case `statusesPromise` still resolves successfully to an array of statuses. However, the array contains the statuses of rejected promises.   

## 3. Conclusion

`Promise.allSettled(promise)` lets you run promises in parallel and collect the settle statuses into an aggregate array. 

It works great when you need to perform parallel and independent asynchronous operations when you need to always collect all the results even if some async operations could fail.  

