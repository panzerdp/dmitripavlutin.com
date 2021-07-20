---
title: "JavaScript Promises: then(f,f) vs then(f).catch(f)"
description: "What's the difference between promise.then(fn, fn) and promise.then(fn).catch(fn) when using JavaScript promises?"
published: "2021-07-20T12:00Z"
modified: "2021-07-20T12:00Z"
thumbnail: "./images/cover-4.png"
slug: javascript-promises-then-vs-then-catch
tags: ['javascript', 'promise']
recommended: ['what-is-javascript-promise', 'promise-all']
type: post
---

In JavaScript you can check the status of the resolved promise using 2 approaches.  

A) The first one is to just one method `promise.then()` but supply 2 callback arguments: the first for fullfillment and the second for rejection:

```javascript
promise
  .then(success, error);
```

B) The second approach, which is more popular, is to use a chain of `promise.then().catch()`:

```javascript
promise
  .then(success)
  .catch(error);
```

Do these 2 approaches work exactly the same way, or there's a slight difference between them?

## 1. What's the same

Let's consider the callbacks we're going to use:

```javascript
function success(value) {
  console.log('Resolved: ', value);
};
function error(err) {
  console.log('Error: ', err);
};
```

At first sight, and in most cases that's true, both approaches work same way: if `promise` resolves successfully, `success` is called:

```javascript
Promise.resolve('Hi!')
  .then(success, error);
// Logs 'Resolved: Hi!'

Promise.resolve('Hi!')
  .then(success)
  .catch(error);
// Logs 'Resolved: Hi!'
```

 Otherwise, in case of rejection, `error` callback is called:

 ```javascript
Promise.reject('Oops!')
  .then(success, error);
// Logs 'Error: Oops!'

Promise.reject('Oops!')
  .then(success)
  .catch(error);
// Logs 'Resolved: Oops!'
```

As seen above, the behavior of both forms is the same.  

## 2. What's the difference

The difference is seen when the success callback of the resolved promise, for some reason (usually when the resolved value is invalid), returns a rejected promise.  

Let's modify the success callback to return a rejected promise:

```javascript{3}
function invalidSuccess(invalidValue) {
  console.log('Invalid success: ', invalidValue);
  return Promise.reject('Invalid!');
}
```

Now let's use `invalidSuccess` in both approaches:

 ```javascript{9}
Promise.resolve('Zzz!')
  .then(invalidSuccess, error);
// Logs 'Invalid success: Zzzzz!'

Promise.resolve('Zzz!')
  .then(invalidSuccess)
  .catch(error);
// Logs 'Invalid success: Zzzzz!'
// Logs 'Error: Invalid!'
```

`Promise.resolve('Zzz!').then(invalidSuccess, error)` only calls `invalidSuccess`, even if `invalidSuccess` returns a rejected promise.  

`Promise.resolve('Zzz!').then(invalidSuccess).catch(error)` calls `invalidSuccess` because the promise is resolved. However, because `invalidSuccess` returns a rejected promise, which is caugth by `.catch(error)`, the `error` callback is invoked too. *That's the main difference.*  

## 3. Conclusion

The main difference between the forms `promise.then(success, error)` and `promise.then(success).catch(error)` is that in case if `success` callback returns a rejected promise in case of invalid data, then only the second form is going to catch that rejection.  

That could be useful, for example, when you perform a fetch request to get a list of items, but for some reason the returned list is empty:

```javascript
axios('/list.json')
  .then(list => {
    if (list.length === 0) {
      return Promise.reject(new Error('Empty list!'));
    }
    return list;
  })
  .catch(err => {
    console.log(err);
  });
```

In the example above `catch(error)` would catch the request errors, and as well the manual validation of the list being non-empty.  