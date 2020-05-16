---
title: "5 Differences Between Arrow and Regular Functions"
description: "5 differences between arrow and regular functions in JavaScript"
published: "2020-05-16T12:00Z"
modified: "2020-05-16T12:00Z"
thumbnail: "./images/cover-2.png"
slug: differences-between-arrow-and-regular-functions
tags: ["javascript", "function", "arrow function"]
recommended: ["when-not-to-use-arrow-functions-in-javascript", "6-ways-to-declare-javascript-functions"]
type: post
commentsThreadId: differences-between-arrow-and-regular-functions
---

In JavaScript you can define functions in many ways.  

The first standard way is by using the `function` keyword:

```javascript
// Function declaration
function greet(who) {
  return `Hello, ${who}!`;
}
```

```javascript
// Function expression
const greet = function(who) {
  return `Hello, ${who}`;
}
```

The function declaration and function expression I'm naming a *regular function*.

The second way, available starting ES2015, is the *arrow function* syntax:

```javascript
const greet = (who) => {
  return `Hello, ${who}!`;
}
```

In this post, I'm going to show the main differences between the regular functions and arrow functions, so you could understand when to choose the right one for your situation.  

## 1. *this* invocation context

### 1.1 Regular function

Inside of a regular JavaScript function, `this` value, aka the execution context, is dynamic.  

The dynamic context means that the value of `this` depends on how the regular function is invoked.  



### 1.2 Arrow function

## 2. *arguments* object

### 2.1 Regular function

### 2.2 Arrow function

## 3. Implicit *return*

### 3.1 Regular function

### 3.2 Arrow function

## 4. Methods

### 4.1 Regular function

### 4.2 Arrow function

## 5. Constructors

### 5.1 Regular function

### 5.2 Arrow function