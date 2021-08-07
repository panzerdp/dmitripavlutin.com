---
title: "'return await promise' vs 'return promise' in JavaScript"
description: "Is there any difference between using 'return await promise' and 'return promise' in asynchronous JavaScript functions?"
published: "2021-08-10T12:00Z"
modified: "2021-08-10T12:00Z"
thumbnail: "./images/cover-3.png"
slug: return-await-promise-javascript
tags: ['javascript', 'promise', 'async']
recommended: ['promise-all', 'what-is-javascript-promise']
type: post
---

When returning from a promise from an asynchronous function, you can wait for that promise to resolve `return await promise`, or you can return it directly 
`return promise`:  

```javascript{3,10}
async function func1() {
  const promise = asyncOperation();
  return await promise;
}

// vs

async function func2() {
  const promise = asyncOperation();
  return promise;
}
```

Both of the expressions actually work. But are there cases that make a difference between them? Let's find out!

## 1. Same behavior

To find the difference between the 2 expressions (`return await promise` vs `return promise`), I'm going to use a helper function `delayedDivide(n1, n2)`.  

The function divides 2 numbers, and returns the division result wrapped in a promise:
```javascript
function promisedDivision(n1, n2) {
  if (n2 === 0) {
    return Promise.reject(new Error('Cannot divide by 0'));
  } else {
    return Promise.resolve(n1 / n2);
  }
}
```

In case if the second (divisor) argument is `0`, the function returns a rejected promise because it is not possible to divide by `0`.  

Ok, having the helper function defined, let's divide some numbers.  

The following function `divideWithAwait()` uses `return await promisedDivision(6, 2)` expression to return the division of `6` by `2` wrapped in a promise:

```javascript{2}
async function divideWithAwait() {
  return await promisedDivision(6, 2);
}

async function run() {
  const result = await divideWithAwait();
  console.log(result); // logs 3
}
run();
```

[Try the demo.](https://codesandbox.io/s/with-await-resolved-mdzz5?file=/src/index.js)

Then, inside the `run()` function, `await divideWithAwait()` expression evaluates to the division result `3`. All good.  

Now let's try to use the second expression without the `await` keyword, and return right away the promise wrapping the division result `return promisedDivision(6, 2)`:

```javascript{2}
async function divideWithoutAwait() {
  return promisedDivision(6, 2);
}

async function run() {
  const result = await divideWithoutAwait();
  console.log(result); // logs 3
}
run();
```

[Try the demo.](https://codesandbox.io/s/without-await-resolved-u06sb)

Even without using the `await` keyword inside `divideWithoutAwait()`, the expression `await divideWithoutAwait()` inside the `run()` function still evaluates correctly to the `6 / 2` division as `3`!  

At this step, you have seen that using `return await promise` and `return promise` doesn't make a difference in use.  

But let's search more!

## 2. Different behavior

Now let's deliberately divide by `0` using the 2 approaches, and try to catch the rejected promise.  

First, let's use again the `return await promisedDivision(5, 0)`:

```javascript{3}
async function divideWithAwait() {
  try {
    return await promisedDivision(5, 0);
  } catch (error) {
    // Rejection caught
    console.log(error); // logs Error('Cannot divide by 0')
  }
}

async function run() {
  const result = await divideWithAwait();
}
run();
```

[Try the demo.](https://codesandbox.io/s/with-await-rejected-ihxg5?file=/src/index.js)

Because the division by zero is not possible, `promisedDivision(5, 0)` returns a rejected promise. The `catch(error) { ... }` successfully catches the rejected promise thrown by `promisedDivision(5, 0)`.  

What about the second approach, where the `await` is omitted?

```javascript{3}
async function divideWithoutAwait() {
  try {
    return promisedDivision(5, 0);
  } catch (error) {
    // Rejection NOT caught
    console.log(error);
  }
}

async function run() {
  const result = await divideWithoutAwait();
}
run(); // Uncaught Error: Cannot divide by 0
```

[Try the demo.](https://codesandbox.io/s/without-await-rejected-477nr)

This time, however, `catch(error) { ... }` doesn't catch the rejected promise.  

Now you can easily see the main difference between using `return await promise` and `return promise`:

> When being wrapped into `try { ... }`, only for the expression `return await promise` the nearby `catch(error) { ... }` would be able to catch the rejected `promise`.  

## 3. Conclusion

In most of the situations, especially if the promises successfully resolve, there isn't a big difference between using `return await promise` and `return promise`.  

However, if you want to catch the rejected promise you're returning from an asynchronous function,
then you should defintely use `return await promise` expression, by adding deliberately the `await`.  

`catch(error) {...}` statement catches only *awaited* rejected promises in `try {...}` statement.  