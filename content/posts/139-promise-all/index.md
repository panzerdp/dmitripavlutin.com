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

In simple words, a promise is a placeholder for a value that's going to be available some time later. More techically, a promise is an object which allows you to access the result of an asynchornous operation. 

Sometimes, however, you'd like to perform in parallel and agreggate the result of multiple promises. For example, you'd like to fetch simultaniously the list of categories and products.   

JavaScript provides a helper funcion `Promise.all(promisesArrayOrIterable)` that allows you to starts multiple promises at once, in parallel, and then get the result in a single agreggate array.   

## 1. Promise.all()

`Promise.all()` is a built-in helper function that accepts an array of promises (or generally an iterable). The function returns a promise:  

```javascript
const allPromise = Promise.all([promise1, promise2, ...]);
```

The interesting part is in the way the promise returned by `Promise.all()` gets resolved or rejected.  

<u>If all promises are resolved successfully</u>, then `allPromise` fullfills with an array containing fullfilled values of individual promises. The order of promises in the array does matter &mdash; you'll get the fulfilled values in the same order.  

![Promise.all() - all fullfilled](./images/all-fullfilled-8.svg)

<u>But if at least one promise rejects</u>, then `allPromise` rejects right away (without waiting other promises to resolve) with the same reason as the rejected promise rejects.  

![Promise.all() - one rejects](./images/one-rejects-4.svg)

Let's see in a couple of examples how you can use `Promise.all()` to perform multiple async operation at once.  

## 2. Example: all promises fullfilled

To study how `Promise.all()` works, I'm going to use 2 helpers `resolveTimeout(value, delay)` and `rejectTimeout(reason, delay)` which would return promises that fullfill or reject with a specific delay.  

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

What `resolveTimeout(value, delay)` simply does it returns a promise that fullfills with `value` after passing `delay` time.  

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

[Try the demo.]()

`const allPromise = Promise.all([...])` returns a new promise `allPromise`. Then the statement `const lists = await allPromise` awaits 1 second until `allPromise` gets fullfilled with an array containining the first and second promises fullfill values.  

Finally, `lists` contains the aggregated result: `[['potatoes', 'tomatoes'], ['oranges', 'apples']]`.  

The order of promises array directly influences the order of the results.  

In the example above in the promises array the vegetables promise is the first item, and the fruits promise is the second item: `Promise.all([vegetablesPromise, fruitsPromise])`. Then you'd get in the results array the results in the same order: first vegetables list and second fruits list.  

## 3. Example: one promise rejects

Now let's image the situation that the grocerry is out of fruits. In such a case, let's throw an error `new Error('Out of fruits!')`.  

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

[Try the demo.]()

In this scenario `allPromise = Promise.all([...])` returns, as usual, a promise. 

However, after passing `1` second the promise `rejectTimeout(new Error('Out of fruits!'), SECOND)` rejects, which makes the `allPromise` reject right away with `new Error('Out of fruits!')` reason.  

Event if the first vegetables list promise `resolveTimeout(['potatoes', 'tomatoes'], 2 * SECOND)` has been fullfilled, `Promise.all()` doesn't take it into account.  

## 4. Conclusion

`Promise.all([...])` is a useful helper function that let's you execute asynchornous operation in parallel, using a fail-fast strategy, and agreggate the result into an array.  

