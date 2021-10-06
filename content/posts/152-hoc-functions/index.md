---
title: "What are Higher-Order Functions in JavaScript"
description: "The higher-order functions are useful because they allow reusability of behavior."
published: "2021-10-06T12:00Z"
modified: "2021-10-06T12:00Z"
thumbnail: "./images/cover-3.png"
slug: javascript-higher-order-functions
tags: ['javascript', 'function']
recommended: ['differences-between-arrow-and-regular-functions', '6-ways-to-declare-javascript-functions']
type: post
---

The usual way you think about JavaScript functions is as reusable pieces of code that make some calculations.  

The arguments are the input data of the function, and the return value is the output. 

For example, here's a simple function that sums all the provided arguments:

```js
function calculate(...args) {
  let sum = 0;
  for (const number of args) {
    sum = sum + number;
  }
  return sum;
}

calculate(1, 2, 3); // => 6
```

The numbers as arguments are the input, and the function `calculate()` returns the sum &mdash; the output.  

But what if you'd like to implement a more universal function, which should be able to support more operations on numbers: the addition, multiplication and concatention of numbers. How would you implement that?  

Let's see how the higher-order functions concept can help you.

## 1. Higher-order functions

Let's make a pause and think a bit about fundamentals.  

In JavaScript the functions can use primitive types (like numbers, strings) as arguments, and return a primitive type too.  

In the previous example, `calculate(1, 2, 3)` accepts numbers as arguments, and returns a number `6` &mdash; the sum.  

But is it possible to assign functions themselves to variables, use as arguments, or even return? Yes, that's possible! 

All because *functions in JavaScript are first-class citizens*. You can:

A. Assign functions to variables:

```javascript{1}
// Assign to variables
const hiFunction = function() { 
  return 'Hello!' 
};

hiFunction(); // => 'Hello!'
```

B. Use functions as arguments to other function:

```javascript{1,5}
// Use as arguments
function iUseFunction(func) {
  return func();
}

iUseFunction(function () { return 42 }); // => 42
```

C. And even return functions from functions:

```javascript{2}
// Return function from function
function iReturnFunction() {
  return function() { return 42 };
}

const myFunc = iReturnFunction();
myFunc(); // => 42
```


## 2.

## 3.