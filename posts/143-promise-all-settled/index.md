---
title: "How to Use Promise.allSettled()"
description: "How to use Promise.allSettled() to perform parallel async operations and collect the promises statuses into an array."
published: "2021-08-03T07:40Z"
modified: "2021-08-03T07:40Z"
thumbnail: "./images/cover-3.png"
slug: promise-all-settled
tags: ['javascript', 'promise', 'async']
recommended: ['promise-all', 'what-is-javascript-promise']
type: post
---

`Promise.allSettled(promises)` is a helper function that runs promises in parallel and aggregates the settled statuses (either fulfilled or rejected) into a result array.  

Let's see how `Promise.allSettled()` works.  

*Before I go on, let me recommend something to you.* 

*If you want to significantly improve your JavaScript knowledge, take the  amazingly useful course ["Modern JavaScript From The Beginning 2.0"](https://www.traversymedia.com/a/2147528886/FqXWyazh) by Brad Traversy. Use the coupon code "DMITRI" and get up to 20% discount!*

### 1. Promise.allSettled()

`Promise.allSettled()` is useful to perform independent async operations in parallel, and collect the result of these operations.  

The function accepts an array (or generally an iterable) of promises as an argument:

```javascript
const statusesPromise = Promise.allSettled(promises);
```

When *all* input `promises` are being fulfilled or rejected, in parallel, `statusesPromise` resolves to an array having their statuses:

1. `{ status: 'fulfilled', value: value }` &mdash; if the corresponding promise has fulfilled
2. Or `{ status: 'rejected', reason: reason }` &mdash; if the corresponding promise has rejected

![Promise.allSettled() in JavaScript](./images/all-settled.svg)

After all input `promises` are being resolved, you can extract their statuses using a `then`-able syntax:

```javascript
statusesPromise.then(statuses => {
 statuses; // [{ status: '...', value: '...' }, ...]
});
```

or using an `async/await` syntax:  

```javascript
const statuses = await statusesPromise;

statuses; // [{ status: '...', value: '...' }, ...]
```

The promise returned by `Promise.allSettled()` *always fulfills with an array of statuses*, no matter if some (or even all!) input promises are rejected. 

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

Let's access in parallel the vegetables and fruits available at the local grocerry store. Accessing each list is an asynchornous operation:  

```javascript{1,2}
const statusesPromise = Promise.allSettled([
  resolveTimeout(['potatoes', 'tomatoes'], 1000),
  resolveTimeout(['oranges', 'apples'], 1000)
]);

// wait...
const statuses = await statusesPromise;

// after 1 second
console.log(statuses); 
// [
//   { status: 'fulfilled', value: ['potatoes', 'tomatoes'] },
//   { status: 'fulfilled', value: ['oranges', 'apples'] }
// ]
```

[Try the demo.](https://codesandbox.io/s/all-resolved-yyc0l?file=/src/index.js)

`Promise.allSettled([...])` returns a promise `statusesPromise` that resolves in 1 second, right after vegetables and fruits were resolved, in parallel.  

The promise `statusesPromise` resolves to an array containing the statuses: 

1. The first item of the array contains the fulfilled status with vegetables: `{ status: 'fulfilled', value: ['potatoes', 'tomatoes'] }`
2. Same way, the second item is the fulfilled status of fruits: `{ status: 'fulfilled', value: ['oranges', 'apples'] }`.  

### 2.2 One promise rejected

Imagine there are no more fruits at the grocery. In such a case, let's reject the fruits' promise.  

How would `Promise.allSettled()` would work in such a case?  

```javascript{2}
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

Even though the second promise in the input array is rejected, the `statusesPromise` still resolves successfully with an array of statuses.  

### 2.3 All promises rejected

What if the grocerry is out of both vegetables and fruits? In such case both promises reject:

```javascript{1-2}
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

`Promise.allSettled(promises)` lets you run promises in parallel and collect the statuses (either fulfilled or reject) into an aggregate array. 

`Promise.allSettled(...)` works great when you need to perform parallel and independent asynchronous operations and collect all the results even if some async operations could fail.  

*Challenge: do you know cases when `Promise.allSettled()` returns a rejected promise? If so, please write a comment below!*