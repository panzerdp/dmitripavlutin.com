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
  .then(function successCallback(value) {
    // use value...
  }, function errorCallback(error) {
    // check the error...
  });
```

B) The second approach, which is more popular, is to use a chain of `promise.then().catch()`:

```javascript
promise
  .then(function successCallback(value) {
    // use value...
  }).catch(function errorCallback(error) {
    // check the error...
  });
```

Do these 2 approaches work exactly the same way, or there's a slight difference between them?

## 1. What's the same

At first sight, and in most cases that's true, both approaches work alomst the same: if `promise` rejects, `successCallback` is called. 

Otherwise, in case of rejection, `errorCallback` is called.  

## 2. What's the difference

## 3. Conclusion