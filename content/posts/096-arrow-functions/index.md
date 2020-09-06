---
title: "Understanding Arrow Functions in 5 Easy Steps"
description: "Take 5 easy steps to understand arrow functions in JavaScript: syntax, shortening, this value, arguments, and limitations."
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

> The central symbol of an arrow function is the fat arrow `=>`. On the left side enumerate the parameters `(param1, param2, ..., paramN) ` and on the right side write the body `{ ... }`.

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

The arrow function fits well as a callback function because of the concise syntax. For example, here's how you could sum an array of numbers:

```javascript
const numbers = [4, 5, 2, 6];

const duplicated = numbers.map((number) => {
  return number * 2;
});

duplicated; // => [8, 10, 4, 12]
```

`(number) => { return number * 2; }` is an arrow function used as a callback to `number.map()` method.  

## Step 2: shortening

In the previous examples, the arrow function has been used in the long form: both parentheses and curly braces were present. But under certain conditions you can omit these too, making the arrow function event shorter!  

### Omitting parenthesis

> If the arrow function has one parameter, the parentheses around this parameter can be omitted.  

```javascript
param => { ... };
```

For example, the `greet` function has only one parameter `who`. That's good because you can omit the parentheses the one parameter:

```javascript
const greet = who => {
  return `Hello, ${who}!`;
}

greet('Eric Cartman'); // => 'Hello, Eric Cartman!'
```

Nevertheless, if the arrow function accepts no parameters or uses a rest parameter, then you have to *keep the parentheses*:

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

> If the arrow function body contains one statement, you can omit the curly braces.  

```javascript
(param1, param2, ..., paramN) => statement;
```

Fortunately, `greet` contains one statement, so let's omit the curly braces and `return` keyword:

```javascript
const greet = who => return `Hello, ${who}!`;

greet('Eric Cartman'); // => 'Hello, Eric Cartman!'
```

### Implicit *return*

That's not all! 

> If the arrow function contains one `return expression` statement, you can skip the `return` keyword. 

`expression` is going to be implicitely returned by the arrow function:  

```javascript
 // expression is returned implicitely
(param1, param2, ..., paramN) => expression;
```

Let's continue shortening the `greet` function. Because it has one `` return `Hello, ${who}!` `` statement, let's omit `return`:

```javascript
const greet = who => `Hello, ${who}!`;

greet('Eric Cartman'); // => 'Hello, Eric Cartman!'
```

In the arrow function `` who => `Hello, ${who}!` `` the expression `` `Hello, ${who}!` `` is implicitely returned.

## Step 3: *this* value

> The arrow function resolves `this` lexically. 

`this` value inside of an arrow function always equals `this` value from the outer function. In other words, the arrow function doesn't define its own execution context.  

In the following example, an arrow function is defined inside a method:  

```javascript{4-6}
const object = {
  method(items) {
    console.log(this === object); // => true
    items.forEach(() => {
      console.log(this === object); // => true
    });
  }
};

myObject.myMethod([1, 2, 3]); 
```

`myObject.myMethod([1, 2, 3])` is a [method invocation](/gentle-explanation-of-this-in-javascript/#3-method-invocation), that's why  `this` value inside the arrow function equals to `this` of the outer function `method()`.   

`this` resolved lexically is a great feature of arrow functions. When using callbacks inside methods you are sure the arrow function doesn't define its own `this`.  

## Step 4: *arguments* object

> The arrow function accesses `arguments` from the outer function.  

Let's try to access `arguments` inside of an arrow function:

```javascript
function regularFunction() {
  const arrowFunction = () => {
    console.log(arguments);
  }

  arrowFunction('C', 'D');
}

myRegularFunction('A', 'B'); // logs { 0: 'A', 1: 'B' }
```

The arrow function `arrowFunction()` is invoked with the arguments `'C'`, `'D'`. Still, inside of its body, `arguments` object equals to the arguments of `regularFunction()` invocation: `'a'`, `'b'`.  

To access the direct arguments of the arrow function use [a rest parameter](/javascript-function-parameters/#5-rest-parameters):

```javascript
function regularFunction() {
  const arrowFunction = (...args) => {
    console.log(args);
  }

  arrowFunction('C', 'D');
}

regularFunction('A', 'B'); // logs ['C', 'D']
```

`...args` rest parameter collects the arguments of the arrow function: `['C', 'D']`.  

## Step 5: limitations

### Cannot be a method

> Don't use arrow functions to define methods.  

A method is a special function attached to an object. Inside of a method, `this` value equals to the object upon which the method was called on.

Let's consider the method `isEmpty()` in the `collection` object:

```javascript
const collection = {
  items: [1, 2, 3],
  isEmpty() {
    return this.items.length === 0;
  }
};

collection.isEmpty(); // => false
```

`collection.isEmpty()` is a method invocation. Inside of the method `isEmpty()`, you can access the special value `this`, which equals to the object upon which the method was called: `collection`.  

However, from a [previous section](#step-3-this-value) you know that `this` inside of an arrow function equals to `this` value of from the outer scope. That's why you normally cannot use an arrow function as a method:

```javascript
const collection = {
  items: [1, 2, 3],
  isEmpty: () => {
    console.log(this === window); // => true
    return this.items.length === 0;
  }
};

collection.isEmpty(); // throws "TypeError: this.items is undefined"
```

When permorming a method invocation `collection.isEmpty()` JavaScript throws a `TypeError this.items is undefined`. All because `this` inside of the arrow function to `window` (when running in a browser).  

### Cannot be a constructor

> The arrow function cannot be used as a constructor of objects.  


When you define a function using a function declaration, you can easily use this function as a constructor of instances:

```javascript
function User(name) {
  this.name = name;
}

const user = new User('Eric Cartman');
user instance User; // => true
```

However, the arrow function cannot be used as a constructor:

```javascript
const User = (name) => {
  this.name = name;
}

const user = new User('Eric Cartman');
// throws "TypeError: User is not a constructor"
```

When `User` is an arrow function, invoking `new User('Eric Cartman')` throws a `TypeError` simply meaning that the arrow function is not a constructor.  

### Cannot be a generator function

> The arrow function cannot be a generator function.  

Finally, because arrow functions are meant to be light functions, they cannot be used as generator functions:

```javascript
const getNumbersArrow = *() => {
  yield 1;
  yield 2;
};
// SyntaxError: Unexpected token '*'
```

When using an asterisk `*` to mark an arrow function as a generator, JavaScript throws a syntax error.  

However, `getNumbersRegular()` is generator function defined using a function declaration with an `*`. It works correctly:

```javascript
function *getNumbersRegular() {
  yield 1;
  yield 2;
}

// Works!
const gen = getNumbersRegular();
gen.next(); // => { value: 1, done: false }
gen.next(); // => { value: 2, done: false }
gen.next(); // => { value: undefined, done: true }
```

## Summary

The central symbol of an arrow function is the fat arrow `=>`: on the left side of it enumerate the params, and on the right side write the function body:

```javascript
(param1, param2, ..., paramN) => { ... };
```

The arrow function can be greatly shortened: when it has one parameter you can omit the parentheses `param => { ... }`, and when it has one statement you can omit the curly braces `param => statement`.  

`this` and `arguments` inside of an arrow function are resolved lexically, meaning that they're taken from the outer function scope.  

Finally, the arrow function has a few limitations. Particularly, you cannot use it as a method on an object, constructor, or generator function.  

Arrow functions are lightweight, inline, and easy to read (when not being nested too much) &mdash; use them as much as you want in your code.    

*What other nuances of arrow functions in JavaScript do you know?*