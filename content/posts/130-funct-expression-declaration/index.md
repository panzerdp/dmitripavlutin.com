---
title: "Don't Confuse Function Expressions and Function Declarations in JavaScript"
description: "What are the differences between function declarations and function expressions in JavaScript."
published: "2021-05-04T12:00Z"
modified: "2021-05-04T12:00Z"
thumbnail: "./images/cover-4.png"
slug: javascript-function-expression-declaration
tags: ['javascript', 'function']
recommended: ['differences-between-arrow-and-regular-functions', '6-ways-to-declare-javascript-functions']
type: post
---

In JavaScript, the `function` keyword does a simple job: creates a function. 

However, the way you define a function using `function` keyword can create functions with different properties.  

In this post, you'll read what are the differences between function declarations and function expressions in JavaScript.  

## 1. The difference between function expression and declaration

Function declaration and function expression are both approaches to create functions in JavaScript using the `function` keyword.  

Let's pick an example to demonstrate the difference &mdash; let's say you want to create a function that simply sums 2 numbers.  

In one case you define the function as usual (the `sum1` function). But in the other case you place the function into a pair of parentheses (the `sum2` function).  

```javascript
function sum1(a, b) {
  return a + b;
}

(function sum2(a, b) {
  return a + b;
});

sum1(1, 2); // ???
sum2(1, 2); // ???
```

[Try the demo.](https://jsfiddle.net/dmitri_pavlutin/8b46yokr/)

What would happen if you invoke `sum1(1, 2)` and `sum2(1, 2)`?    

As expected, `sum1(1, 2)` simply returns the sum of `1` and `2` numbers &mdash; `3`. 
However, invoking `sum2(1, 2)` throws an error `Uncaught ReferenceError: sum2 is not defined`.  

The explanation is that `sum1` was created using a function declaration, which *creates a name binding* in the current scope. While `sum2` was created using a function expression (because it is wrapped into a pair of parentheses), which *doesn't create a name binding* in the current scope.  

In the next sections, let'd look into more detail about the function declaration and function expression.  

## 2. The function declaration

As you already saw in the previous example, `sum1` is a function declaration:

```javascript
// Function declaration
function sum1(a, b) {
  return a + b;
}

sum1(4, 5); // => 9
```

A *function declaration* occurs when a statement contains the `function` keyword followed by the function name, a pair of parentheses with the parameters `(para1, param2, paramN)`, and the function body enclosed into a pair of curly braces `{ ... }`.  

The function declaration creates a *name binding variable* &mdash; a variable with the same name as the function name (e.g. `sum1` from the previous example). The name binding is accessible in the current scope (*before* and *after* the function declaration) and even *inside* the function's scope itself. Use the function variable to invoke the function.  

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

(function sum2(a, b) {
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

But if the function has a name, e.g. `sum2` and `callback` in the previous example, then that's a *named function expression*.  

### 3.1 How to distinguish function declaration from function expression

Here's a simple hint on how to distinguish a function declaration from function expression. 

> If the statement starts with the `function` keyword, then it's a *function declaration*, otherwise it's a *function expression*.  

```javascript
// Function declaration: starts with `function` keyword
function sum1(a, b) {
  return a + b;
}

// Function expression: starts with `(`
(function sum2(a, b) {
  return a + b;
});
```

### 3.2 Don'ts of function expression

## 4. Summary

*Challenge: is `function sum(a, b) { return a + b } + 1;` a function declaration or function expression? Write your explanation in a comment below!*