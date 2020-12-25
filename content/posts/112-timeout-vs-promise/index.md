---
title: "Why Promises Are Faster Than setTimeout()?"
description: "Why Immediatly Resolved Promise is Always Faster Than setTimeout(..., 0)?"
published: "2020-12-29T12:00Z"
modified: "2020-12-29T12:00Z"
thumbnail: "./images/cover-4.png"
slug: javascript-promises-settimeout
tags: ['javascript', 'function']
recommended: ['javascript-callback', 'timeout-fetch-request']
type: post
---

Let's try an experiment. What does execute faster: an immediately resolved promise or a timeout of `0` milliseconds?  

```javascript
Promise.resolve(true).then(() => {
  console.log('Promise resolved!');
});

setTimeout(() => {
  console.log('Timeout completed!');
}, 0);

// logs 'Promise resolved!'
// logs 'Timeout completed!'
```

`Promise.resolve(true)` is a static function that returns an immediately resolved promise. `setTimeout(callback, 0)` also executes the callback with a delay of `0` milliseconds.  

Open the demo and try. You'll noticed that in the console `'Promise resolved!'` is logged first, then `'Timeout completed!'`. The immediately resolved promise was executed faster.   

