---
title: "An Interesting Explanation of async/await in JavaScript"
description: "Let's learn async/await syntax in JavaScript by following a few interesting examples."
published: "2020-09-01T08:10Z"
modified: "2020-09-02T08:30Z"
thumbnail: "./images/cover-5.png"
slug: javascript-async-await
tags: ['javascript', 'async await']
type: post
---

In JavaScript, you can code async tasks in 3 ways.  

The first approach is using callbacks. When an async operation had been completed, a *callback* function (meaning *call me back when the operation has been completed*) is executed:

```javascript
const callbackFunction = result = {
  // Called when the operation completes
};
asyncOperation(params, callbackFunction);
```

But as soon as you handle multiple async operations, the callback functions nest into each other ending in callback hell.  

A promise is a placeholder object for the results of an async task. With the use of promises, you can handle the async operations easier.

```javascript
const promise = asyncOperation(params);

promise.then(result => {
  // Called when the operation completes
});
```

Have you seen the  `.then().then()...then()` chains of promises 🚂🚃🚃🚃🚃?  An issue of promises is their verbosity.  

Finally, the third attempt is the `async/await` syntax (starting ES2017). It lets you write async code in a concise and sync manner:

```javascript
(async function() {
  const result = await asyncOperation(params);
  // Called when the operation completes
})();
```

In this post I'm going to explain, step by step, how to use `async/await` in JavaScript.  

<Affiliate type="traversyJavaScript" />

<TableOfContents />

## 1. The sync addition

Because the title of the post mentions an *interesting* explanation, I'm going to gradually explain `async/await` in regards to a greedy boss story.  

Let's start with a simple (synchronous) function which task is to calculate the salary increase:

```javascript
function increaseSalary(base, increase) {
  const newSalary = base + increase;
  console.log(`New salary: ${newSalary}`);
  return newSalary;
}

increaseSalary(1000, 200); // => 1200
// logs "New salary: 1200"
```

`increaseSalary()` is a function that sums 2 numbers. `n1 + n2` is a synchronous operation.   

The boss doesn't want a quick increase in the employee's salary ☹. So you're not allowed to use the addition operator `+` in `increaseSalary()` function. 

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

## 2. The async addition

The first naive attemtp is to replace the `n1 + n2` expression with a call to `slowAddition(n1, n2)`:

```javascript{1}
function increaseSalary(base, increase) {
  const newSalary = slowAddition(base, increase);
  console.log(`New salary: ${newSalary}`);
  return newSalary;
}

increaseSalary(1000, 100); // => [object Promise]
// Logs "New salary [object Promise]"
```

Unfortunately, the function `increaseSalary()` doesn't know how to handle promises. The function considers promises regular objects: it doesn't know how and when to extract values from promises.   

Now it's the right time to make the `increaseSalary()` aware of how to handle the promise returned by `slowAddition()` using `async/aware` syntax.  

First, you need to add the `async` keyword near the function declaration. Then, inside the function body, you need to use the `await` operator to make the function *wait* for the promise to be resolved.  

Let's make these changes to `increaseSalary()` function:

```javascript{0-1}
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
* The function execution continues as usual.  

In simple words, when JavaScript encounters `await promise` in an `async` function, it pauses the function execution until the promise is resolved. The promise's resolved value becomes the result of `await promise` evaluation.  

Even though `return newSalary` returns the number `1200`, if you look at the actual value returned by the function `increaseSalary(1000, 200)` &mdash; it is still a promise!  

An `async` function always returns a promise, which resolves to the value of `return value` inside the function body:

```javascript
increaseSalary(1000, 200).then(salary => {
  salary; // => 1200
});
```

`async` functions returning promises is a good thing because you can [nest](#4-nesting-asynchronous-functions) `async` functions.  

## 3. The broken async addition

It's unfair that the boss has put a requirement to increase slowly the salary. You've decided to sabotage the `slowAddition()` function.  

You modify the slow addition function to reject the numbers addition:

```javascript
function slowAdditionBroken(n1, n2) {
  return new Promise((resolve, reject) => {
    setTimeout(() => reject(new Error('Unable to sum numbers')), 3000);
  });
}

slowAdditionBroken(1, 5).catch(e => console.log(e.message));
// After 3 seconds logs "Unable to sum numbers"
```

How to handle a rejected promise inside the `calculateSalary()` async function? Just wrap the `await` operator in an `try/catch` clause:

```javascript
async function increaseSalaryBroken(base, increase) {
  let newSalary;
  try {
    newSalary = await slowAdditionBroken(base, increase);
  } catch (e) {
    console.log(`Error: ${e.message}`);
    newSalary = base * 2;
  }
  console.log(`New salary: ${newSalary}`);
  return newSalary;
}

increaseSalaryBroken(1000, 200);
// After 3 seconds logs 
// "Error: Unable to sum numbers", "New salary: 2000"
```

At the expression `await slowAdditionBroken(base, increase)` JavaScript pauses the function execution and waits until the promise is fulfilled (the promise successfully resolved) or rejected (an error has occurred).  

After 3 seconds, the promise is rejected with `new Error('Unable to sum numbers')`. Because of rejection, the function execution jumps into the `catch (e){ }` clause where the base salary is multiplied by 2.  

Miser pays twice. Now the boss has to pay double salaries. Nice one!

If you don't catch a rejected promise, then the error propagates and the promise returned by the `async` function gets rejected:

```javascript
async function increaseSalaryBroken(base, increase) {
  const newSalary = await slowAdditionBroken(base, increase);
  return newSalary;
}

increaseSalaryBroken(1000, 200).catch(e => {
  e.message; // => "Unable to sum numbers"
});
```

## 4. Nesting async functions

Despite `return <value>` expression inside an async function returning the payload value and not a promise, still, when the async function is invoked it returns a promise.  

That's a good thing because you can nest asynchronous functions!  

For example, let's write an async function that increases an array of salaries using the `slowAddition()` function:  

```javascript{4}
async function increaseSalaries(baseSalaries, increase) {
  let newSalaries = [];
  for (let baseSalary of baseSalaries) {
    newSalaries.push(
      await increaseSalary(baseSalary, increase);
    );
  }
  console.log(`New salaries: ${newSalaries}`);
  return newSalaries;
}

increaseSalaries([950, 800, 1000], 100);
// After 6 seconds logs "New salaries: 1050,900,1100"
```

`await increaseSalary(baseSalary, increase)` is called 3 times for each salary in the array. Each time JavaScript waits 2 seconds until the sum is calculated.    

This way you can nest `async` function into `async` functions.  

## 5. Parallel async

In the previous example of summing an array of salaries, the summing happens in sequence: the function is paused 2 seconds for every salary.  

But you can make salary increases in parallel! Let's use `Promise.all()` utility function to start all the salary increases simultaniously:

```javascript{4,7}
async function increaseSalaries(baseSalaries, increase) {
  let salariesPromises = [];
  for (let baseSalary of baseSalaries) {
    salariesPromises.push(
      increaseSalary(baseSalary, increase)
    );
  }
  const newSalaries = await Promise.all(salariesPromises);
  console.log(`New salaries: ${newSalaries}`);
  return newSalaries;
}

increaseSalaries([950, 800, 1000], 100);
// After 2 seconds logs "New salaries: 1050,900,1100"
```

The salary increase tasks start right away (`await` isn't used near `increaseSalary(baseSalary, increase)`) and promises are collected in `salariesPromises`.  

`await Promise.all(salariesPromises)` then pauses the function execution until all the async operations processed in parallel finish. Finally, only after 2 seconds, `newSalaries` variable contains the increased salaries.  

You've managed to increase the salaries of all employees in just 2 seconds, even if each operation is slow and requires 2 seconds. You've tricked the boss again!  

## 6. Practical async example

A common situation when you'd want to use `async/await` syntax is to fetch remote data. 

`fetch()` method is a good candidate to be used with `async/await` because it returns a promise that resolves to the value returned by a remote API.  

For example, here's how you would fetch a list of movies from a remote server:

```javascript{1}
async function fetchMovies() {
  const response = await fetch('https://api.example.com/movies');
  if (!response.ok) {
    throw new Error('Failed to fetch movies');
  }
  const movies = await response.json();
  return movies;
}
```

`await fetch('https://api.example.com/movies')` is going to pause `fetchMovies()` execution until the request is completed. Then you can extract the actual using `await response.json()`.  

## 7. Conclusion

`async/await` is syntactic sugar on top of the promises and provides a way to handle the asynchronous tasks in a synchronous manner.  

`async/await` has 4 simple rules:

1. A function handling an asynchronous task must be marked using the `async` keyword.
2. `await promise` operator pauses the function execution until `promise` is either resolved successfully or rejected.
3. If `promise` resolves successfully, the `await` operator returns the resolved value: `const resolvedValue = await promise`. Otherwise, you can catch a rejected promise inside `try/catch`.  
4. An async function always returns a promise, which gives the ability to nest async functions.  

Having a good understanding of `async/await`, check my detailed post on [How to Use Fetch with async/await](/javascript-fetch-async-await/).  

*Quiz: Is it an error to await for primitive values, e.g. `await 3`?*