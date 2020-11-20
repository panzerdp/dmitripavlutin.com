---
title: "Type checking in JavaScript: typeof and instanceof operators"
description: "How to perform type checking in JavaScript using typeof and instance of operators."
published: "2020-11-17T09:00Z"
modified: "2020-11-17T09:00Z"
thumbnail: "./images/cover-2.png"
slug: javascript-typeof-instanceof
tags: ['javascript', 'typeof', 'instanceof']
recommended: ['javascript-defined-variable-checking', 'javascript-null']
type: post
---

JavaScript is a loosely-typed language, meaning that there isn't any restriction on types of values you can assign to variables. 

For example, if you've created a variable with a string type, later you can assign to the same variable a number:

```javascript
let message = 'Hello'; // assign a string

message = 14; // assign a number
```

Such dynamism is useful because it gives you flexibility and simplifies variables declaration.  

On the other side, you can never be sure that a variable is going to have a value of a certain type. For example, the following function `greet(who)` expects a string argument, however you can invoke the function with any type of argument:

```javascript
function geet(who) {
  return `Hello, ${who}!`
}

greet('World'); // => 'Hello, World!'
// You can use any type as argument
greet(true);    // => 'Hello, true!'
greet([1]);     // => 'Hello, 1!'
```

That's why, sometimes, you need to check the type of variables in JavaScript: using `typeof` operator, as well as `instanceof` to check instances types.  

Let's see in more detail how to use `typeof` and `instanceof` operators in JavaScript.  

## 1. *typeof* operator

## 1.1 *typeof* and *null* problem

## 2. *instanceof* operator