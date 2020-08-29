---
title: "An Interesting Explanation of async/await in JavaScript"
description: "async/await syntax in JavaScript let's you write async code in a sync way."
published: "2020-09-01"
modified: "2020-09-01"
thumbnail: "./images/cover.png"
slug: javascript-async-await
tags: ['javacript', 'async await']
recommended: ['7-architectural-attributes-of-a-reliable-react-component', 'the-art-of-writing-small-and-plain-functions']
type: post
commentsThreadId: javascript-async-await
---

JavaScript has had a long way to simplify to simplify the coding of async tasks.  

The first approach are the callbacks. When an async operation had been completed,
a special function named *callback* is called:

```javascript
asyncOperation(params, function callback(result) {
  // Called when the operation completes
});
```

But as soon as you handle multiple async operations, the callback functions nest into each other ending in a callback hell. That's the main problem of callbacks.  

A promise is placeholder object for results of an async task. With the use of promises you can handle the async operations easier.

```javascript
const promise = asyncOperation(params);

promise.then(function resolved(result) {
  // Called when the operation completes
});
```

Have you seen the  `.then().then()...then()` chains of promises 🚂🚃🚃🚃🚃?  An issue of promises is their verbosity.  

Finally, the third attempt is the `async/await` syntax (starting ES2017). It let's you write async code in a concise and sync manner, solving the verbosity of promises:    

```javascript
(async function() {
  const result = await asyncOperation(params);
  // Called when the operation completes
})();
```

In this post I'm going to explain, step by step, how to use `async/await` in JavaScript.  

**Note**: *`async/await` is a syntactic sugar on top of promises*. I recommend getting familiar with [promises](https://www.freecodecamp.org/news/javascript-promises-explained/) before continuing.  

## 1. The fast machine

Because the title of the post says about an *interesting* explanation, I'm going to gradually explain how `async/await` works.  

Let's start with a simple (synchronous) function which task is to summarize 2 numbers:

```javascript

```

## 2. The slow machine

## 3. The broken machine

## 4. *async/await* rules

