---
title: "An Interesting Explanation of async/await in JavaScript"
description: "async/await syntax in JavaScript is a syntactic sugar around promises."
published: "2020-09-01"
modified: "2020-09-01"
thumbnail: "./images/cover-2.png"
slug: javascript-async-await
tags: ['javacript', 'async await']
recommended: ['7-architectural-attributes-of-a-reliable-react-component', 'the-art-of-writing-small-and-plain-functions']
type: post
commentsThreadId: javascript-async-await
---

JavaScript has taken a long way to simplify the coding of async tasks.  

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

## 1. The synchronous addition

Because the title of the post says about an *interesting* explanation, I'm going to gradually explain how `async/await` works.  

Let's start with a simple (synchronous) function which task is to calculate the salary increase:

```javascript
function increaseSalary(base, increase) {
  const newSalary = base + increase;
  console.log(`New salary: ${newSalary}`);
  return newSalary;
}

increaseSalary(1000, 100); // => 1100
```

`increaseSalary()` is a function that sums 2 numbers. `n1 + n2` is a synchronous operation.   

The boss doesn't want a quick increase of employee's salary ☹. So you're not allowed to use the addition operator `+` in `increaseSalary()` function. 

Instead, you have to use a slow function that requires 2 seconds to summarize numbers. Let's name the function `slowAddition()`:

```javascript
function slowAddition(n1, n2) {
  return new Promise(resolve => {
    setTimeout(() => resolve(n1 + n2), 2000);
  });
}

slowAddition(1, 5).then(sum => console.log(sum));
// After 2 seconds logs "6"
```

`slowAddition()` returns a promise, which resolves to the sum of arguments after a delay of 2 seconds.  

How to update the `increaseSalary()` function to support the slow addition?

## 2. The asynchronous addition

The first naive attemtp is to replace the `n1 + n2` expression with a call to `slowAddition(n1, n2)`:

```javascript{2}
function increaseSalary(base, increase) {
  const newSalary = slowAddition(base, increase);
  console.log(`New salary: ${newSalary}`);
  return newSalary;
}

increaseSalary(1000, 100); // => [object Promise]
// Logs "New salary [object Promise]"
```

Unfortunately, the function `increaseSalary()` doesn't know how to handle promises.  

Now it's the right time to make the `increaseSalary()` aware about the async function `slowAddition()` using the `async/await` syntax.  

First, you need to add the `async` keyword near the function declaration. Then, inside the function body, you need to use the `await` operator to make the function *wait* for the promise to be resolved before continuing.  

Let's make these changes to `increaseSalary()` function:

```javascript{1-2}
async function increaseSalary(base, increase) {
  const newSalary = await slowAddition(base, increase);
  console.log(`New salary: ${newSalary}`);
  return newSalary;
}

increaseSalary(1000, 200); // => [object Promise]
// After 2 seconds logs "New salary 1200"
```

JavaScript evaluates `const newSalary = await slowAddition(base, increase)` the following way:

1. `await slowAddition(base, increase)` pauses the `increaseSalary()` function execution
* After 2 seconds, the promise returned by `slowAddition(base, increase)` is resolved
* `increaseSalary()` function execution resumes
* `newSalary` is assigned with the promise's resolved value `1200` (`1000+200`)  
* The function execution continues as usual, in a sync manner.  

In simple words, when JavaScript encounters `await promise` in an `async` function, it pauses the function execution until the promise is resolved. The promise's resolved value becomes the result of `await promise` evaluation.  

Despite the fact that `return newSalary` returns the number `1200`, if you look at the actual value returned by the function `increaseSalary(1000, 200)` &mdash; it is still a promise!  

An `async` function always returns a promise, which resolves to the value of `return value` inside the function body:

```javascript
increaseSalary(1000, 100).then(salary => {
  salary; // => 1100
});
```

`async` functions returning promises is a good thing because you can [nest](#4-nesting-asynchornous-functions) `async` functions.  

## 3. The broken asynchronous addition

It's unfair that the boss has put a requirement to increase slowly the salary. So, to fight the boss, you've decided to sabotage the `slowAddition()` function.  

Now, the slow addition function is going to reject the numbers addition:

```javascript
function slowAdditionBroken(n1, n2) {
  return new Promise((resolve) => {
    setTimeout(() => reject(new Error('Unable to sum numbers'), 3000);
  });
}

slowAdditionBroken(1, 5).catch(e => console.log(e.message));
// After 3 seconds logs "Unable to sum numbers"
```

Knowing that `slowAdditionBroken()` is unable to sum number and the promise is rejected, how would you handle such cases insisde the `calculateSalary()` async function?  

All you need to do is wrap the `await` operator in an `try/catch` clause:

```javascript
async function increaseSalary(base, increase) {
  let newSalary;
  try {
    newSalary = await slowAdditionBroken(base, increase);
  } catch (e) {
    console.log('Error: ', e.message);
    newSalary = base * 2;
  }
  console.log(`New salary: ${newSalary}`);
  return newSalary;
}

increaseSalary(1000, 200)
```

## 4. Nesting asynchornous functions

## 5. Parallel async