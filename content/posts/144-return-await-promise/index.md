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

When returning from an asynchronous function a `promise`, should you wait for that promise to resolve `return await promise`, or should you return it right 
await `return promise`?  

```javascript{3,10}
function func1() {
  const promise = asyncOperation();
  return await promise;
}

// vs

async function func2() {
  const promise = asyncOperation();
  return promise;
}
```

Is there any difference between using and not using `await` keyword? Let's find the answer.  

## 1. When there's no difference

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

Let’s use the 2 approaches mentioned in the introduction: one by using return `await promisedDivision(6, 2)` and the second as `return promiseDivision()`.

```javascript{2,7}
async function divideWithAwait() {
  return await promisedDivision(6, 2);
}

async function run() {
  const result = await divideWithAwait();
  console.log(result); // logs 3
}
run();
```

As expected, `await divideWithAwait()` evaluates to the division result `3`.  

The second approach doesn't use an `await` keyword:

```javascript{2,7}
async function divideWithoutAwait() {
  return promisedDivision(6, 2);
}

async function run() {
  const result = await divideWithoutAwait();
  console.log(result); // logs 3
}
run();
```

Same thing, even without using the `await` keyword, the expression `await divideWithoutAwait()` still evaluates correctly to the division result `3`!  

So... where's the difference? Let's search more!

## 2. When there's a difference

Now let's say that you'd like to deliberately divide by `0`, and try to catch the rejected promise. 

Let's use the 2 approaches mentioned in the introduction: one by using `return await promisedDivision(5, 0)` and the second with `return promiseDivision(5, 0)`.  

```javascript{3}
async function divideWithAwait() {
  try {
    return await promisedDivision(5, 0);
  } catch (error) {
    console.log(error); // Rejection caught
  }
}

async function run() {
  const result = await divideWithAwait();
}
run(); // logs Error('Cannot divide by 0')
```

[Try the demo.](https://codesandbox.io/s/with-await-ihxg5?file=/src/index.js)

Open the demo, and you would notice that the `catch(error) { ... }` has successfully caught the rejected promise thrown by `promisedDivision(5, 0)`.  

What about the second approach, where the `await` is omitted?

```javascript{3}
async function divideWithoutAwait() {
  try {
    return promisedDivision(5, 0);
  } catch (error) {
    console.log(error); // Rejection NOT caught
  }
}

async function run() {
  const result = await divideWithoutAwait();
}
run(); // Uncaught Error: Cannot divide by 0
```

[Try the demo.](https://codesandbox.io/s/without-await-477nr?file=/src/index.js)

This time, however, `catch(error) { ... }` doesn't catch the rejected promise because of the missing `await`.  

