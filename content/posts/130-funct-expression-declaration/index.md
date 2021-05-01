---
title: "Don't Confuse Function Expressions and Function Declarations in JavaScript"
description: "In this post you'll read what are the differences between function declarations and function expressions in JavaScript."
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

## 1. The difference

For example, let's define a function `sum()` in 2 ways.  

In one case you define the function as usual &mdash; `function sum1(...) {...}`. But in another case you place the function declaration into a pair of parentheses (the case of `sum2` function).  

```javascript
function sum1(a, b) {
  return a + b;
}

(function sum2(a, b) {
  return a + b;
});

console.log(sum1(a, b)); // ???
console.log(sum2(a, b)); // ???
```

## 2. The function declaration

### 2.1 Dos of function declaration

### 2.2 Don'ts of function declaration

## 3. The function expression

### 3.1 Dos of function expression

### 3.2 Don'ts of function expression

## 4. Summary