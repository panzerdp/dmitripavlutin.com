---
title: "What are Higher-Order Functions in JavaScript"
description: "The higher-order functions are useful because they allow reusability of behavior."
published: "2021-10-07T10:00Z"
modified: "2021-10-07T10:00Z"
thumbnail: "./images/cover.png"
slug: javascript-higher-order-functions
tags: ['javascript', 'function']
recommended: ['differences-between-arrow-and-regular-functions', '6-ways-to-declare-javascript-functions']
type: post
---

The usual way you think about JavaScript functions is as reusable pieces of code that make some calculations.  

The arguments are the input data of the function, and the return value is the output. 

For example, here's a simple function that sums an array of numbers:

```js
function calculate(numbers) {
  let sum = 0;
  for (const number of numbers) {
    sum = sum + number;
  }
  return sum;
}

calculate([1, 2, 4]); // => 7
```

The numbers as arguments are the input, and the function `calculate()` returns the sum &mdash; the output.  

But what if you'd like to implement a more universal function, which should be able to support more operations on numbers: addition, multiplication, and more. How would you implement that?  

Let's see how the concept of the higher-order functions can help you.

## 1. Higher-order functions

Let's make a pause and think a bit about fundamentals.  

In JavaScript, the functions can use primitive types (like numbers, strings), objects (like arrays, plain objects, regular expressions, etc) as arguments, and return a primitive type or object too.  

In the previous example, `calculate([1, 2, 4])` accepts an array of numbers as an argument, and returns the number `7` &mdash; the sum.  

What about using functions as values? Is it possible to assign functions themselves to variables, use them as arguments, or even return? Yes, that's possible! 

All because *functions in JavaScript are first-class citizens*. This means that you can:

A. Assign functions to variables:

```javascript{1}
// Assign to variables
const hiFunction = function() { 
  return 'Hello!' 
};

hiFunction(); // => 'Hello!'
```

B. Use functions as arguments to other functions:

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

Finally, here's the interesting part: 

> The functions that use other functions as arguments, or return functions, are named *higher-order functions*.

In the previous examples, `iUseFunction()` is higher-order because it accepts a function as an argument. Also `iReturnFunction()` is a higher-order function because it returns another function.  

On the other side, the functions that use only primitives or objects as arguments, and only return primitives or objects are named *first-order functions*.  

In the previous examples, `hiFunction()` is a first-order function since it simply returns a number.  

So, in JavaScript *a function kind is either first-order or high-order.*  

That's interesting, but why are higher-order functions useful? Let's find out next!

## 2. The benefits of higher-order functions

Let's recall the question from the post introduction. How to make the `calculate()` function support multiple operations on an array of numbers?  

The answer is to make `calculate()` a *higher-order function*, as supply the required operation as a function. 

Let's modify the function to make it happen:

```javascript
function calculate(operation, initialValue, numbers) {
  let total = initialValue;
  for (const number of numbers) {
    total = operation(total, number);
  }
  return total;
}

function sum(n1, n2) {
  return n1 + n2;
}

function multiply(n1, n2) {
  return n1 * n2;
}

calculate(sum, 0, [1, 2, 4]);      // => 7
calculate(multiply, 1, [1, 2, 4]); // => 8
```

Now `calculate(operation, initialValue, numbers)` is a higher-order function because it accepts as the first argument a function that describes an operation.  

What's great is you can reuse the `calculate()` function to support multiple operations by providing different functions as an argument.  

What's interesting is that in the invocation `calculate(sum, 0, [1, 2, 4])`, the function supplied as an argument is also called [callback](/javascript-callback/) function.  

*Challenge: does the array object has a higher-order method similar to `calculate(operation, initialValue, numbers)`? Write your guess in a comment below!*

## 3. Examples of higher-order functions

If you take a look closely at the built-in JavaScript function on arrays, strings, DOM methods, promise method &mdash; you could notice that many of them are higher-order functions as soon as they function as an argument.  

For example, the `array.map(mapperFunc)` method is a higher-order function because it accepts a mapper function as an argument:

```javascript
const numbers = [1, 2, 4];

const doubled = numbers.map(function mapper(number) {
  return 2 * number;
});

doubles; // [2, 4, 8]
```

## 4. Conclusion

Higher-order functions in JavaScript are a special category of functions that either accept functions as an argument or return functions.  

On the other side, if the function only uses primitives or objects for arguments or return, these functions are first-order.  

Higher-order functions provide the reusability benefit: the main behavior is provided by the higher-order function itself, but by accepting a function as an argument you modify that behavior at your will.  