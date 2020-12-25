---
title: "Why Promises Are Faster Than setTimeout()?"
description: "Why an immidiately resolved promise is faster then an immediate timeout?"
published: "2020-12-29T12:00Z"
modified: "2020-12-29T12:00Z"
thumbnail: "./images/cover-2.png"
slug: javascript-promises-settimeout
tags: ['javascript', 'function']
recommended: ['javascript-callback', 'timeout-fetch-request']
type: post
---

## 1. The experiment

Let's try an experiment. What does execute faster: an immediately resolved promise or a an immediate timeout (aka a timeout of `0` milliseconds)?  

```javascript
Promise.resolve(1).then(() => {
  console.log('Resolved!');
});

setTimeout(() => {
  console.log('Timed out!');
}, 0);

// logs 'Resolved!'
// logs 'Timed out!'
```

`Promise.resolve(1)` is a static function that returns an immediately resolved promise. `setTimeout(callback, 0)` also executes the callback with a delay of `0` milliseconds.  

Open the [demo](https://jsitor.com/wJFrt5VCiU) and check the console. You'll notice that `'Resolved!'` is logged first, then `'Timeout completed!'`. The immediately resolved promise resolves faster than an immediate timeout.  

Can it be related to the fact that the `Promise.resolve(true).then(...)` was called before the `setTimeout(..., 0)`? Fair enough question.  

Let's change slighly the conditions of the experiment and call `setTimeout(..., 0)` first:

```javascript
setTimeout(() => {
  console.log('Timed out!');
}, 0);

Promise.resolve(true).then(() => {
  console.log('Resolved!');
});

// logs 'Resolved!'
// logs 'Timed out!'
```

Open the [demo](https://jsitor.com/kslO11KZW5) and look at the console. Hm... same result!

`setTimeout(..., 0)` is called before `Promise.resolve(true).then(...)`. However, `'Resolved!'` is still logged before `'Timed out!'`.  

The experiment has demonstrated that an immediately resolved promise is processed before an immediate timeout. The big question is... *why does it happen?* 

## 2. Task queue vs job queue

What's related with the asynchornous JavaScript can be answered by investigating the event loop behavior. The question asked above can be found in how event loop processes
promises and `setTimeout()`.  

JavaScript is a single-threaded. At any point in time, JavaScript executes only one function.  

## 3. Summary