---
title: "How to Use Promise.any()"
description: "How to use the Promise.any(promises) helper function to get the value of the first resolved promise from an array of promises."
published: "2021-08-26T12:00Z"
modified: "2021-08-26T12:00Z"
thumbnail: "./images/cover.png"
slug: promise-any
tags: ['javascript', 'promise', 'async']
recommended: ['promise-all', 'promise-all-settled']
type: post
---

`Promise.any(promises)` is a helper function that runs promises in parallel and resolves to the value of the first promises that gets resolved from `promises` list.  

Let's see how `Promise.any()` works.  

### 1. *Promise.any()*

`Promise.any()` is useful to perform independent async operations in parallel in a race manner, in order to get the value of any first resolved promise.  

The function accepts an array (or generally an iterable) of promises as an argument:

```javascript
const anyFirstPromise = Promise.any(promises);
```

When *any* first promise from the input `promises` is fulfilled, right away the `anyFirstPromise` resolves to the value of that promise. You can extract the value of the first promise using a `then`-able syntax:

```javascript
anyFirstPromise.then(firstValue => {
 firstValue; // The value of the first fulfilled promise
});
```

or using an `async/await` syntax:  

```javascript
const firstValue = await anyFirstPromise;

firstValue; // The value of the first fulfilled promise
```

The promise returned by `Promise.any()` *always fulfills with any first fulfilled promise* &mdash; even if some promises get rejected, these rejections are ignored. 

However, if *all promises in the input array are rejected*, then `Promise.any()` rejects with an aggregate error containing all the rejection reasons of the input promises.  

## 2. Fruits and vegetables

Before diving into `Promise.any()`, let's define 2 simple helper functions.  

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

Let's use these helper functions to experiment on `Promise.any()`.  

### 2.1 All promises fulfilled

Let's try to access the first resolved list from the local grocerry store:

```javascript{2,3}
const promise = Promise.any([
  resolveTimeout(['potatoes', 'tomatoes'], 1000),
  resolveTimeout(['oranges', 'apples'], 2000)
]);

// wait...
const anyFirstList = await statusesPromise;

// after 1 second
console.log(anyFirstList); // logs ['potatoes', 'tomatoes']
```

[Try the demo.](https://codesandbox.io/s/all-resolved-yyc0l?file=/src/index.js)

`Promise.any([...])` returns a `promise` that resolves in 1 second to the list of vegetables `['potatoes', 'tomatoes']`: because this is the promise that resolved first.  

The second promise, with the list of fruits, resolves in 2 seconds, and its value is ignored.  

### 2.2 One promise rejected

Imagine there are no more vegetables at the grocery. In such a case, let's reject the vegetables' promise.  

How would `Promise.any()` would work in such a case?  

```javascript{2}
const promise = Promise.any([
  resolveTimeout(new Error('Out of vegetables!'), 1000),
  rejectTimeout(['oranges', 'apples'], 2000)
]);

// wait...
const anyFirstList = await promise;

// after 2 seconds
console.log(anyFirstList); // logs ['oranges', 'apples']
```

This case is a little trickier.  

First, the vegetables promise gets rejected after 1 second. However, `Promise.any()` does skip this rejection and still waits to see the resolving status of fruits.  

Finally, after 2 seconds, the fruits promise resolves to a list of fruits `['oranges', 'apples']`. Right away the promise returned by `Promise.any([...])` also resolves to this value.  

### 2.3 All promises rejected

What if the grocerry is out of both vegetables and fruits? In such case both promises reject:

```javascript{2-3}
const statusesPromise = Promise.any([
  rejectTimeout(new Error('Out of vegetables!'), 1000),
  rejectTimeout(new Error('Out of fruits!'), 2000)
]);

// wait...

try {
  const anyFirstList = await statusesPromise;
} catch (error) {
  console.log(error); 
  // logs Error([Error('Out of vegetables!'), Error('Out of fruits!')])
}
```

All of the input promises are rejected. Because of that the promise returned by `Promise.any([...])` also gets rejected with a special kind of error that aggregates the rejection rejason of input promises.  

## 3. Conclusion

`Promise.any()` is useful to perform independent async operations in parallel in a race manner, in order to get the value of any first resolved promise.  

In case if all input promises of `Promise.any()` get rejected, then the promise returned by the helper function also gets rejected with an aggregate error containing the rejection reasons of the input promises. 

Note that `Promise.any([])` rejects and in case if the input array is empty

*Challenge: what's the main difference between `Promise.any()` and `Promise.race()`?*