---
title: "Don't Confuse Function Expressions and Function Declarations in JavaScript"
description: "What are the differences between function declarations and function expressions in JavaScript."
published: "2021-05-04T12:00Z"
modified: "2021-05-04T12:00Z"
thumbnail: "./images/cover.png"
slug: javascript-function-expression-declaration
tags: ['javascript', 'function']
recommended: ['differences-between-arrow-and-regular-functions', '6-ways-to-declare-javascript-functions']
type: post
---

In JavaScript, the `function` keyword does a simple job: creates a function. 

However, the way you define a function using `function` keyword can create functions with different properties.  

In this post, you'll find how using `function` keyword you can write function declarations and function expressions, and what are the differences between them. 

```toc
```

## 1. Function expressions vs function declarations

Function declarations and function expressions are 2 ways create functions using the `function` keyword. 

Let's pick an example to demonstrate the difference &mdash; let's create 2 versions of a function that sums numbers:

```javascript
function sumA(a, b) {
  return a + b;
}

(function sumB(a, b) {
  return a + b;
});

sumA(1, 2); // ???
sumB(1, 2); // ???
```

[Try the demo.](https://jsfiddle.net/dmitri_pavlutin/8b46yokr/2/)

In one case you define the function as usual (the `sumA` function). But in the other case the function is placed into a pair of parentheses (the `sumB` function).  

What would happen if you invoke `sumA(1, 2)` and `sumB(1, 2)`?    

As expected, `sumA(1, 2)` simply returns the sum of `1` and `2` numbers &mdash; `3`. 
However, invoking `sumB(1, 2)` throws an error `Uncaught ReferenceError: sumB is not defined`.  

The explanation is that `sumA` was created using a function declaration, which *function variable* (with the same name as the function name) in the current scope. But `sumB` was created using a function expression (being wrapped into parentheses), which *doesn't create a function variable* in the current scope.  

From a higher point of view, function declarations are useful to create standalone functions, but function expressions are great to create callbacks.  

Now, let's into the behavior and dont's of the function declarations and function expressions.  

## 2. The function declaration

As you already saw in the previous example, `sumA` is a function declaration:

```javascript
// Function declaration
function sumA(a, b) {
  return a + b;
}

sumA(4, 5); // => 9
```

A *function declaration* occurs when a statement contains the `function` keyword followed by the function name, a pair of parentheses with the parameters `(para1, param2, paramN)`, and the function body enclosed into a pair of curly braces `{ ... }`.  

The function declaration creates a *name binding variable* &mdash; a variable with the same name as the function name (e.g. `sumA` from the previous example). The name binding is accessible in the current scope (*before* and *after* the function declaration) and even *inside* the function's scope itself. Use the function variable to invoke the function.  

For example, let's write a function `sumArray(array)` that calculates the sum of items of an array. If the item is an array itself, then a recursive call `sumArray(item)` is made:  

```javascript{1, 6, 11}
sumArray([10, [1, [5]]]); // => 16

function sumArray(array) {
  let sum = 0;
  for (const item of array) {
    sum += Array.isArray(item) ? sumArray(item) : item;
  }
  return sum;
}

sumArray([1, [4, 6]]); // => 11
```

[Try the demo.](https://jsfiddle.net/dmitri_pavlutin/n7wcryuo/)

`function sumArray(array) { ... }` is a function declaration. 

The function variable `sumArray`, containing the function object, is available in the current scope: before `sumArray([10, [1, [5]]])` and after `sumArray([1, [4, 6]])` the function declaration, and also in the scope of the function itself `sumArray(item)` (allowing recursive calls).  

The function variable is available before the function declaration thanks to [hoisting](/javascript-hoisting-in-details/#hoisting-and-function-declaration).  

### 2.1 Don'ts of function declaration

Note that it is not recommended to use function declarations inside conditionals (`if`)  and loops (`while`, `for`).  

```javascript
// Bad!
if (myCondition) {
  function myFunction(a, b) {
    return a * b;
  }
} else {
  function myFunction(a, b) {
    return a + b;
  }
}

myFunction(2, 3);
```

## 3. The function expression

The function expression occurs when a function is declared (with or without a name) inside of an expression. 

The following are examples function expressions:

```javascript{3,8,14}
// Function expressions

(function sumB(a, b) {
  return a + b;
});

const myObject = {
  myMethod: function() {
    return 42;
  }
};

const numbers = [4, 1, 6];
numbers.forEach(function callback(number) {
  console.log(number);
  // logs 4
  // logs 1
  // logs 1
});
```

If the function inside the expression doesn't have a name, e.g. `function() { return 42 }`, then that's an *anonymous function expression*. 

But if the function has a name, e.g. `sumB` and `callback` in the previous example, then that's a *named function expression*.  

Here's a simple hint on how to distinguish a function declaration from a function expression: 

> If the statement starts with the `function` keyword, then it's a *function declaration*, otherwise it's a *function expression*.  

```javascript
// Function declaration: STARTS with `function` keyword
function sumA(a, b) {
  return a + b;
}

// Function expression: DOES NOT START with `function` keyword
(function sumB(a, b) {
  return a + b;
});

// Function expression: DOES NOT START with `function` keyword
[1, 2, 3].reduce(function sum3(acc, number) { 
  return acc + number 
});
```

### 3.1 Don'ts of function expression

If you've created a named function expression, note that the function variable is *available only inside the function scope*:  

```javascript
const numbers = [4, 1, 6];
numbers.forEach(function callback(number) {
  console.log(typeof callback); // logs 'function'
});

console.log(typeof callback); // logs 'undefined'
```

`callback` is a named function expression. `callback` function variable is available only inside the `callback()` function scope, but not outside.  

To increase the code readability, I recommend using named function expressions over anonymous ones. If you trace an error or perform a debugging session, then using named function expressions in your code you'll get a call stack with the function names.  

## 4. Summary

Depending on how you use `function` keyword to create functions, you can end in 2 ways to create function: function declaration and function expression.  

A function declaration happens when you start the statement with the `function` keyword:

```javascript
// Function declaration
function sumA(a, b) {
  return a + b;
}
```

However, if a statement doesn't start with `function` keyword, then you have a function expression:

```javascript
// Function expression
(function sumB(a, b) {
  return a + b;
});
```

*Challenge: is `function sum(a, b) { return a + b } + 1;` a function declaration or function expression? Write your explanation in a comment below!*