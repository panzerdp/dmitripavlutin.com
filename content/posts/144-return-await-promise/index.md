---
title: "'return promise' vs 'return await promise' in JavaScript"
description: ""
published: "2021-08-10T12:00Z"
modified: "2021-08-10T12:00Z"
thumbnail: "./images/cover-2.png"
slug: return-await-promise-javascript
tags: ['javascript', 'promise', 'async']
recommended: ['promise-all', 'what-is-javascript-promise']
type: post
---

When using the `async/await` syntax you should know an important rule: an `async` function always returns a promise.  

When returning from an asynchronous function a `promise`, should you await for that promise `return await promise`, or should you return it right 
await `return promise`?  

```javascript
return await promise;
// vs
return promise;
```

Let's find the answer.  

## 1. No difference...

To find the difference between the 2 expressions, I'm going to use a helper function `delayedDivide(n1, n2)`.  

The function divides 2 numbers, and returns the division result wrapped in a promise. In case if the second (divisor) argument is `0`, the function returns a rejected promise
because it is not possible to divide by `0`.  

```javascript
function promisedDivision(n1, n2) {
  if (n2 === 0) {
    return Promise.reject(new Error('Cannot divide by 0'));
  } else {
    return Promise.resolve(n1 / n2);
  }
}
```

## 2. (almost) No difference… 

Now let's say that you'd like to deliberately divide by `0`, and catch the rejected promise. Let's use the 2 approaches mentioned in the introduction: one by using `return await promisedDivision(5, 0)` and the second with `return promiseDivision()`.  

```javascript{3}
async function withAwait() {
  try {
    return await promisedDivision(5, 0);
  } catch (error) {
    console.log(error); // logs Error('Cannot divide by 0')
  }
}
```

[Try the demo.](https://codesandbox.io/s/with-await-ihxg5?file=/src/index.js)

Open the demo, and you would notice that the `catch(error) { ... }` has successfully caught the rejected promise thrown by `promisedDivision(5, 0)`.  

What about the second approach, where the `await` is omitted?

```javascript{3}
async function withAwait() {
  try {
    return promisedDivision(5, 0);
  } catch (error) {
    console.log(error);
  }
}
// Uncaught Error: Cannot divide by 0
```

[Try the demo.](https://codesandbox.io/s/without-await-477nr?file=/src/index.js)