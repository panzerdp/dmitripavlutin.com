---
title: "Don't Confuse Function Expressions and Function Declarations in JavaScript"
description: "What are the differences between function declarations and function expressions in JavaScript."
published: "2021-05-04T07:50Z"
modified: "2021-05-04T07:50Z"
thumbnail: "./images/cover-2.png"
slug: javascript-function-expressions-and-declarations
tags: ['javascript', 'function']
recommended: ['differences-between-arrow-and-regular-functions', '6-ways-to-declare-javascript-functions']
type: post
---

In JavaScript, the `function` keyword does a simple job: creates a function. However, the way you define a function using the  keyword can create functions with different properties.  

In this post, you'll find how using the `function` keyword you can write function declarations and function expressions, and what are the differences between the 2 types of functions.  

```toc
```

## 1. Function expressions vs function declarations

Function declarations and function expressions are 2 ways to create functions using the `function` keyword. 

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

In one case, you define the function as usual (the `sumA` function). In the other case, the function is placed into a pair of parentheses (the `sumB` function).  

What would happen if you invoke `sumA(1, 2)` and `sumB(1, 2)`?    

As expected, `sumA(1, 2)` simply returns the sum of `1` and `2` numbers &mdash; `3`. 
However, invoking `sumB(1, 2)` throws an error `Uncaught ReferenceError: sumB is not defined`.  

The explanation is that `sumA` was created using a function declaration, which creates a *function variable* (with the same name as the function name) in the current scope. But `sumB` was created using a function expression (it is wrapped into parentheses), which *doesn't create a function variable* in the current scope.  

If you want to access the function created using a function expression, then save the function object into a variable:

```javascript
// Works!
const sum = (function sumB(a, b) {
  return a + b;
});

sum(1, 2); // => 3
```

From a higher point of view, function declarations are useful to create standalone functions, but function expressions are good as callbacks.  

Now, let's dive more into the behavior of the function declarations and function expressions.  

## 2. The function declaration

As you already saw in the previous example, `sumA` is a function declaration:

```javascript
// Function declaration
function sumA(a, b) {
  return a + b;
}

sumA(4, 5); // => 9
```

A *function declaration* occurs when a statement contains the `function` keyword followed by the function name, a pair of parentheses with the parameters `(param1, param2, paramN)`, and the function body enclosed into a pair of curly braces `{ }`.  

The function declaration creates a *function variable* &mdash; a variable with the same name as the function name (e.g. `sumA` from the previous example). The function variable is accessible in the current scope (*before* and *after* the function declaration) and even *inside* the function's scope itself. 

The function variable is normally used to invoke the function or pass around the function object to other functions (to [higher-order functions](https://dev.to/damcosset/higher-order-functions-in-javascript-4j8b)).  

For example, let's write a function `sumArray(array)` that sums recursively items of an array (the array can contain either numbers or other arrays):  

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

### 2.1 Dos and don'ts of the function declaration

The role of the function declaration syntax is to create standalone functions. Function declarations are expected inside the global scope or the direct the scope of other functions:  

```javascript{2-4,8-10}
// Good!
function myFunc1(param1, param2) {
  return param1 + param2;
}

function bigFunction(param) {
  // Good!
  function myFunc2(param1, param2) {
    return param1 + param2;
  }

  const result = myFunc2(1, 3);
  return result + param;
}
```

Using the same reason it is not recommended to use function declarations inside conditionals (`if`)  and loops (`while`, `for`):  

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

Creating functions conditionally is better performed using function expressions.  

## 3. The function expression

The function expression occurs when the `function` keyword creates a function (with or without a name) inside of an expression.  

The following are examples of functions created using expressions:

```javascript{3,8,14}
// Function expressions

const sum = (function sumB(a, b) {
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

There are 2 kinds of functions created inside a function expression:

* If the function inside the expression doesn't have a name, e.g. `function() { return 42 }`, then that's an *anonymous function expression*
* If the function has a name, e.g. `sumB` and `callback` in the previous example, then that's a *named function expression*

Here's a simple hint on how to distinguish a function declaration from a function expression: 

> If the statement starts with the `function` keyword, then it's a *function declaration*, otherwise it's a *function expression*.  

```javascript
// Function declaration: STARTS with `function` keyword
function sumA(a, b) {
  return a + b;
}

// Function expression: DOES NOT START with `function` keyword
const mySum = (function sumB(a, b) {
  return a + b;
});

// Function expression: DOES NOT START with `function` keyword
[1, 2, 3].reduce(function sum3(acc, number) { 
  return acc + number 
});
```

### 3.1 Dos and don'ts of the function expression

Function expressions fit good as callbacks or functions created by condition:  

```javascript
// Functions created conditionally
let callback;
if (true) {
  callback = function() { return 42 };
} else {
  callback = function() { return 3.14 };
}

// Functions used as callbacks
[1, 2, 3].map(function increment(number) {
  return number + 1;
}); // => [2, 3, 4]
```

If you've created a named function expression, note that the function variable is *available only inside the created function scope*:  

```javascript{3,6}
const numbers = [4];
numbers.forEach(function callback(number) {
  console.log(callback); // logs function() { ... }
});

console.log(callback); // ReferenceError: callback is not defined
```

[Try the demo.](https://jsfiddle.net/dmitri_pavlutin/sujwmp10/2/)

`callback` is a named function expression, thus the `callback` function variable is available only inside the `callback()` function scope, but not outside.  

However, if you store the function object into a regular variable, then you can access the function object from that variable inside and outside of the function scope:

```javascript{2,7}
const callback = function(number) {
  console.log(callback); // logs function() { ... }
};

const numbers = [4];
numbers.forEach(callback);
console.log(callback); // logs function() { ... }
```

[Try the demo.](https://jsfiddle.net/dmitri_pavlutin/1btmrcu2/1/)

## 4. Summary

Depending on how you use the `function` keyword to create functions, you can end in 2 ways to create function: function declaration and function expression.  

A function declaration happens when you start the statement with the `function` keyword:

```javascript
// Function declaration
function sumA(a, b) {
  return a + b;
}
```

Function declarations are useful to create standalone, general purpose, functions.  

However, if a statement doesn't start with `function` keyword, then you have a function expression:

```javascript
// Function expression
(function sumB(a, b) {
  return a + b;
});
```

The functions created using functions expressions are useful to create callbacks or functions by condition.  

*Challenge: is `function sum(a, b) { return a + b } + 1;` a function declaration or function expression? Write your explanation in a comment below!*