---
title: "'return await promise' vs 'return promise' in JavaScript"
description: "Is there any difference between using 'return await promise' and 'return promise' in asynchronous JavaScript functions?"
published: "2021-08-10T06:40Z"
modified: "2021-08-10T06:40Z"
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

You'll see shortly that *both* expressions do work. 

However, are there cases when these expressions behave differently? Let's find out!

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

If the second (divisor) argument is `0`, the function returns a rejected promise because division by `0` is not possible.  

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

Inside the `run()` function the `await divideWithAwait()` expression evaluates to the division result `3`. All good.  

Now let's try to use the second expression without the `await` keyword, and return directly the promise wrapping the division result `return promisedDivision(6, 2)`:

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

At this step, you have seen that using `return await promise` and `return promise` don't differ. At least when dealing with successfully fulfilled promises.  

But let's search more!

## 2. Different behavior

Now let's take another approach, particularly try to work with rejected promises. To make the function `promisedDivision(n1, n2)` return a rejected promise let's set the second argument to `0`.  

Because `promisedDivision(n1, 0)` now would return rejected promises, let's also wrap the invocation into a `try {... } catch (error) {...}` &mdash; to see whether the rejected promise is caught.  

Ok, let's use `return await promisedDivision(5, 0)` expression with the `await` keyword:

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

> When being wrapped into `try { ... }`, the nearby `catch(error) { ... }` catches the rejected `promise` only if the promise is *awaited* (which is true for `return await promise`).  

## 3. Conclusion

In most situations, especially if the promises successfully resolve, there isn't a big difference between using `return await promise` and `return promise`.  

However, if you want to catch the rejected promise you're returning from an asynchronous function,
then you should definitely use `return await promise` expression and add deliberately the `await`.  

`catch(error) {...}` statement catches only *awaited* rejected promises in `try {...}` statement.  