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

The central symbol is the fat arrow `=>`  When defining an arrow function

* On the left side enumarate the parameters `(param1, param2, ..., paramN) `
* On the right side write the body `{ ... }`

```javascript
(param1, param2, ..., paramN) => { ... };
```

Let's define an arrow function to greet a person:

```javascript
const greet = (who) => {
  return `Hello, ${who}!`;
};

greet('Eric Cartman'); // => 'Hello, Eric Cartman!'
```

`greet` is an arrow function. Its parameter `who` is wrapper in parenthesis `(who)` and the function body consists of one statement ``return `Hello, ${who}!` ``.  

`greet('Eric Cartman')` is how you call an arrow function. There's no difference between calling a regular function and an arrow function.  

The arrow function fits well as callback function because of consize syntax. For example, here's how you could sum an array of numbers:

```javascript
const numbers = [4, 5, 2, 6];

const duplicated = numbers.map((number) => {
  return number * 2;
});

duplicated; // => [8, 10, 4, 12]
```

`(number) => { return number * 2; }` is an arrow function used as a callback to `number.map()` method.  

## Step 2: shortening

In the previous examples the arrow function was used in the long form: both parentheses and curly braces were present. But under certain conditions you can omit these too, making the arrow function event shorter!  

### Omitting parenthesis

You can omit the parentheses that wrap the arrow function parameters when it has *only one parameter*.  

```javascript
param => { ... };
```

For example, the `greet` function has only one parameter `who`. That's good, because you can omit the parentheses around `(who)`:

```javascript
const greet = who => {
  return `Hello, ${who}!`;
}

greet('Eric Cartman'); // => 'Hello, Eric Cartman!'
```

Nevetheless, if the arrow function accepts no parameters or a rest parameter, then you have to *keep the parentheses*:

```javascript
const sayHello = () => {
  return 'Hello!';
}

const greetPeople = (...args) => {
  return `Hello, ${args.join(' and ')}!`;
}

sayHello();                  // => 'Hello!'
greetPeople('Eric', 'Stan'); // => 'Hello, Eric and Stan!'
```

### Omitting curly braces

When the arrow function body has one statement you can also omit the curly braces.  

```javascript
(param1, param2, ..., paramN) => statement;
```

Fortunately, `greet` contains one statement, so let's omit the curly braces and `return` keyword:

```javascript
const greet = who => return `Hello, ${who}!`;

greet('Eric Cartman'); // => 'Hello, Eric Cartman!'
```

### Implicit *return*

That's not all! If the arrow function contains one `return expression` statement, you can also skip the `return` keyword at all. `expression` is going to be implicitely returned by the arrow function.  

```javascript
 // expression is returned implicitely
(param1, param2, ..., paramN) => expression;
```

Let's continue shortening the `greet` function. Because it has one `` return `Hello, ${who}!` `` statement, simpliy omit `return`:

```javascript
const greet = who => `Hello, ${who}!`;

greet('Eric Cartman'); // => 'Hello, Eric Cartman!'
```

In the arrow function `` who => `Hello, ${who}!` `` the expression `` `Hello, ${who}!` `` is implicitely returned.

## Step 3: *this* value

## Step 4: *arguments* object

## Step 5: limitations

### Cannot be a method

### Cannot be a constructor

### Cannot be a generator function
