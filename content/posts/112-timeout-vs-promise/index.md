---
title: "Why Promises Are Faster Than setTimeout()?"
description: "Why Immediatly Resolved Promise is Always Faster Than setTimeout(..., 0)?"
published: "2020-12-29T12:00Z"
modified: "2020-12-29T12:00Z"
thumbnail: "./images/cover-2.png"
slug: javascript-promises-settimeout
tags: ['javascript', 'function']
recommended: ['javascript-callback', 'timeout-fetch-request']
type: post
---

Let's try an experiment. What does execute faster: an immediately resolved promise or a timeout of `0` milliseconds?  

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

`Promise.resolve(true)` is a static function that returns an immediately resolved promise. `setTimeout(callback, 0)` also executes the callback with a delay of `0` milliseconds.  

Open the demo and check the console. You'll notice that `'Resolved!'` is logged first, then `'Timeout completed!'`. The immediately resolved promise resolves faster than an immediate timeout.  

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

Open the demo and look at the console. Hm... same result! 

Even `setTimeout(..., 0)` being called before `Promise.resolve(true).then(...)`, still, `'Resolved!'` is logged first, then `'Timed out!'`.  

The experiment has demonstrated that an immediately resolved promise is faster than an immediate timeout. The big question is... *why does it happen?* 

