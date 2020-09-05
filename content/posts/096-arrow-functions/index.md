---
title: "Understanding Arrow Functions in 5 Easy Steps"
description: "I'm going to explain, in 5 easy steps, how to use arrow functions in JavaScript."
published: "2020-09-08T12:00Z"
modified: "2020-09-08T12:00Z"
thumbnail: "./images/cover-12.png"
slug: javascript-arrow-functions
tags: ['javacript', 'arrow function', 'function']
recommended: ['differences-between-arrow-and-regular-functions', 'javascript-arrow-functions-best-practices']
type: post
commentsThreadId: javascript-arrow-functions
---

```toc
toHeading: 2
```

For a long time in JavaScript the usual way to define functions was using the *function declaration* or *function expression*:

```javascript
// Function declaration
function greet(who) {
  return `Hello, ${who}!`;
}

// Function expression
const greetExpression = function(who) {
  return `Hello, ${who}!`;
}
```

The practice showed that functions can be further improved: particularly making the syntax lighter (useful for writing short callbacks) and ease the resolving of `this`.  

Welcome the arrow functions.  

I'm going to explain, in 5 easy steps, how to use arrow functions in JavaScript.

## Step 1: syntax

When defining an arrow function the central symbol is the fat arrow `=>`:  

* On the left side enumarate the parameters `(param1, param2, ..., paramN) `
* On the right side write the body `{ ... }`

```javascript
(param1, param2, ..., paramN) => { ... };
```

Let's define an arrow function to greet a person:

```javascript
const greet = (who) => {
  return `Hello, ${who}!`;
}

greet('Eric Cartman'); // => 'Hello, Eric Cartman!'
```

`greet` is an arrow function. Its parameter `who` is wrapper in parenthesis `(who)` and the function body consists of one statement ``return `Hello, ${who}!` ``.  

`greet('Eric Cartman')` is how you call an arrow function. There's no difference between calling a regular function and an arrow function.  

The arrow functions fit well as callback functions because of their consize syntax.  

## Step 2: shortening

### Omitting parenthesis

### Implicit return

## Step 3: *this* value

## Step 4: *arguments* object

## Step 5: limitations

### Cannot be a method

### Cannot be a constructor

### Cannot be a generator function
