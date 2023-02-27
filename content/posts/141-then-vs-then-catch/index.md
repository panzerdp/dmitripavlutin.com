---
title: "JavaScript Promises: then(f,f) vs then(f).catch(f)"
description: "What's the difference between promise.then(fn, fn) and promise.then(fn).catch(fn) when using JavaScript promises?"
published: "2021-07-21T08:30Z"
modified: "2021-07-21T08:30Z"
thumbnail: "./images/cover-4.png"
slug: javascript-promises-then-vs-then-catch
tags: ['javascript', 'promise']
recommended: ['what-is-javascript-promise', 'promise-all']
type: post
---

In JavaScript, you can access the fullfillment value or the rejection reason of a promise in 2 ways.  

A) Use 2 callbacks on `promise.then(fn, fn)`:

```javascript
promise
  .then(success, error);
```

B) Or use a chain of `promise.then(fn).catch(fn)`:

```javascript
promise
  .then(success)
  .catch(error);
```

Is there any difference between the 2 approaches? Let's find out!

*Before I continue, allow me to make a recommendation.* 

*If you want to significantly improve your JavaScript knowledge, take the  amazingly useful ["Modern JavaScript From The Beginning 2.0"](https://www.traversymedia.com/a/2147528886/FqXWyazh) by Brad Traversy. Use the coupon code "DMITRI" and get up to 20% discount!*

## 1. What's the same

Let's consider the callbacks we're going to use:

```javascript
function success(value) {
  console.log('Resolved: ', value);
}

function error(err) {
  console.log('Error: ', err);
}
```

`success()` function would be called on fulfillments, while `error()` on rejections.  

In most cases both approaches work the same way: if `promise` resolves successfully, then `success` is called in both approaches:

```javascript
Promise.resolve('Hi!')
  .then(success, error);
// Logs 'Resolved: Hi!'

Promise.resolve('Hi!')
  .then(success)
  .catch(error);
// Logs 'Resolved: Hi!'
```

[Try the demo.](https://codesandbox.io/s/youthful-satoshi-wh7el?file=/src/index.js)

 Otherwise, in case of rejection, `error` callback is called:

 ```javascript
Promise.reject('Oops!')
  .then(success, error);
// Logs 'Error: Oops!'

Promise.reject('Oops!')
  .then(success)
  .catch(error);
// Logs 'Error: Oops!'
```

[Try the demo.](https://codesandbox.io/s/priceless-surf-iyj8p?file=/src/index.js)

In the above examples, the behavior of both approaches is the same.  

## 2. What's the difference

The difference is seen when the `success()` callback of the resolved promise returns a rejected promise. That might happen when the resolved value is invalid.  

Let's modify the success callback to return a rejected promise:

```javascript{2}
function rejectSuccess(invalidValue) {
  console.log('Invalid success: ', invalidValue);
  return Promise.reject('Invalid!');
}
```

Now let's use `rejectSuccess` in both approaches:

 ```javascript{8}
Promise.resolve('Zzz!')
  .then(rejectSuccess, error);
// Logs 'Invalid success: Zzzzz!'

Promise.resolve('Zzz!')
  .then(rejectSuccess)
  .catch(error);
// Logs 'Invalid success: Zzzzz!'
// Logs 'Error: Invalid!'
```

[Try the demo.](https://codesandbox.io/s/elated-snowflake-y174u?file=/src/index.js)

`Promise.resolve('Zzz!').then(rejectSuccess, error)` only calls `rejectSuccess`, even if `rejectSuccess` returns a rejected promise. *`error` callback is not invoked*.  

`Promise.resolve('Zzz!').then(rejectSuccess).catch(error)` calls `rejectSuccess` because the promise is resolved. But `rejectSuccess` returns a rejected promise, &mdash; it is caugth by `.catch(error)` and the *`error` callback is invoked*. That's the difference.  

## 3. When to use

That could be useful, for example, when you perform a fetch request to get a list of items, but the list must obligatory have at least one item.  

So, in case if the list is empty, you could simply reject that list:

```javascript{5-7}
import axios from "axios";

axios("/list.json")
  .then(response => {
    const list = response.data;
    if (list.length === 0) {
      return Promise.reject(new Error("Empty list!"));
    }
    return list;
  })
  .catch((err) => {
    console.log(err);
  });
```

[Try the demo.](https://codesandbox.io/s/epic-breeze-m186p?file=/src/index.js)

In the above example `.catch(error)` would catch the request errors and the empty list error.  

## 4. Conclusion

The main difference between the forms `promise.then(success, error)` and `promise.then(success).catch(error)` is that in case if `success` callback returns a rejected promise, then only the second form is going to catch that rejection.  