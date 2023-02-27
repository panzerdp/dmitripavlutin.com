---
title: "Why Promises Are Faster Than setTimeout()?"
description: "Why an immidiately resolved promise is faster then an immediate timeout?"
published: "2020-12-29T09:30Z"
modified: "2020-12-29T09:30Z"
thumbnail: "./images/cover-4.png"
slug: javascript-promises-settimeout
tags: ['javascript', 'promise', 'event loop']
recommended: ['javascript-callback', 'timeout-fetch-request']
type: post
---

## 1. The experiment

Let's try an experiment. What does execute faster: an immediately resolved promise or an immediate timeout (aka a timeout of `0` milliseconds)?  

```javascript
Promise.resolve(1).then(function resolve() {
  console.log('Resolved!');
});

setTimeout(function timeout() {
  console.log('Timed out!');
}, 0);

// logs 'Resolved!'
// logs 'Timed out!'
```

[Promise.resolve(1)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/resolve) is a static function that returns an immediately resolved promise. `setTimeout(callback, 0)` executes the callback with a delay of `0` milliseconds.  

Open the [demo](https://jsitor.com/wJFrt5VCiU) and check the console. You'll notice that `'Resolved!'` is logged first, then `'Timeout completed!'`. An immediately resolved promise is processed faster than an immediate timeout.  

Might the promise process faster because the `Promise.resolve(true).then(...)` was called before the `setTimeout(..., 0)`? Fair enough question.  

*Before I go on, let me recommend something to you.* 

*If you want to significantly improve your JavaScript knowledge, take the  amazingly useful ["Modern JavaScript From The Beginning 2.0"](https://www.traversymedia.com/a/2147528886/FqXWyazh) by Brad Traversy. Use the coupon code "DMITRI" and get up to 20% discount!*

Let's change slighly the conditions of the experiment and call `setTimeout(..., 0)` first:

```javascript
setTimeout(function timeout() {
  console.log('Timed out!');
}, 0);

Promise.resolve(1).then(function resolve() {
  console.log('Resolved!');
});

// logs 'Resolved!'
// logs 'Timed out!'
```

Open the [demo](https://jsitor.com/kslO11KZW5) and look at the console. Hm... the same result!

`setTimeout(..., 0)` is called before `Promise.resolve(true).then(...)`. However, `'Resolved!'` is still logged before `'Timed out!'`.  

The experiment has demonstrated that an immediately resolved promise is processed before an immediate timeout. The big question is... *why?* 

## 2. The event loop

The questions related to asynchronous JavaScript can be answered by investigating the event loop. Let's recall the main components of how asynchronous JavaScript works.  

*Note: if you aren't familiar with the event loop, I recommend watching this [video](https://www.youtube.com/watch?v=8aGhZQkoFbQ) before reading further.*  

![Event Loop Empty](./images/Selection_019.png)

*The call stack* is a LIFO (Last In, First Out) structure that stores the execution context created during the code execution. In simple words, the call stack executes the functions.  

*Web APIs* is the place the async operations (fetch requests, promises, timers) with their callbacks are waiting to complete.   

*The task queue* (also named macrostasks) is a FIFO (First In, First Out) structure that holds the callbacks of async operations that are ready to be executed. For example, the callback of a timed out `setTimeout()` &mdash; ready to be executed &mdash; is enqueued in the task queue.  

*The job queue* (also named microtasks) is a FIFO (First In, First Out) structure that holds the callbacks of promises that are ready to be executed. For example, the resolve or reject callbacks of a fulfilled promise are enqueued in the job queue.  

Finally, *the event loop* permanently monitors whether the call stack is empty. If the call stack is empty, the event loop looks into the job queue or task queue, and dequeues any callback ready to be executed into the call stack.  

## 3. Job queue vs task queue

Let's look again at the experiment from the event loop perspective. I'll make a step by step analysis of the code execution.  

A) The call stack executes `setTimeout(..., 0)` and *schedules* a timer. `timeout()` callback is stored in *Web APIs*:

```javascript{0-2}
setTimeout(function timeout() {
  console.log('Timed out!');
}, 0);

Promise.resolve(1).then(function resolve() {
  console.log('Resolved!');
});
```

![Event Loop](./images/Selection_020.png)

B) The call stack executes `Promise.resolve(true).then(resolve)` and *schedules* a promise resolution. `resolved()` callback is stored in *Web APIs*:

```javascript{4-6}
setTimeout(function timeout() {
  console.log('Timed out!');
}, 0);

Promise.resolve(1).then(function resolve() {
  console.log('Resolved!');
});
```

![Event Loop](./images/Selection_021.png)

C) The promise is resolved immediately, as well the timer is timed out immediately. Thus the timer callback `timeout()` is *enqueued* to task queue, the promise callback `resolve()` is *enqueued* to job queue:

![Event Loop](./images/Selection_025.png)

D) Now's the interesting part: the event loop priorities dequeueing jobs over tasks. The event loop dequeues the promise callback `resolve()` from the job queue and puts it into the call stack. Then the call stack executes the promise callback `resolve()`:  

```javascript{5}
setTimeout(function timeout() {
  console.log('Timed out!');
}, 0);

Promise.resolve(1).then(function resolve() {
  console.log('Resolved!');
});
```

`'Resolved!'` is logged to console.

![Event Loop](./images/Selection_026.png)

E) Finally, the event loop dequeues the timer callback `timeout()` from the task queue into the call stack. Then the call stack executes the timer callback `timeout()`:  

```javascript{1}
setTimeout(function timeout() {
  console.log('Timed out!');
}, 0);

Promise.resolve(1).then(function resolve() {
  console.log('Resolved!');
});
```

`'Timed out!'` is logged to console.  

![Event Loop](./images/Selection_027.png)

The call stack is empty. The script execution has been completed.  

## 4. Summary

Why an immediately resolved promise is processed faster than an immediate timer?  

Because of the event loop *priorities* dequeuing jobs from the job queue (which stores the fulfilled promises' callbacks) over the tasks from the task queue (which stores timed out `setTimeout()` callbacks).  