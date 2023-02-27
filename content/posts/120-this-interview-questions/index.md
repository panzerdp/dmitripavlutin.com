---
title: '7 Interview Questions on "this" keyword in JavaScript. Can You Answer Them?'
description: '7 interview questions to challenge your knowledge on "this" keyword in JavaScript.'
published: "2021-02-23T09:30Z"
modified: "2021-02-23T09:30Z"
thumbnail: "./images/cover.jpg"
slug: javascript-this-interview-questions
tags: ['javascript', 'this', 'interview']
recommended: ['gentle-explanation-of-this-in-javascript', 'javascript-closures-interview-questions']
type: post
---

In JavaScript `this` is the function invocation context. 

The challenge is that `this` has a complicated behavior. That's why during a JavaScript coding interview you might be asked how `this` behaves in certain situations.  

Since the best way to prepare for a coding interview is to practice, in this post I compiled a list of 7 interesting interview questions on `this` keyword.  

If you're not familiar with `this` keyword, I recommend reading the post [Gentle Explanation of "this" in JavaScript](/gentle-explanation-of-this-in-javascript/).

Note: JavaScript snippets below run in non-strict mode, also known as sloppy mode.  

*Before I go on, let me recommend something to you.* 

*If you want to significantly improve your JavaScript knowledge, take the  amazingly useful ["Modern JavaScript From The Beginning 2.0"](https://www.traversymedia.com/a/2147528886/FqXWyazh) by Brad Traversy. Use the coupon code "DMITRI" and get up to 20% discount!*

```toc
```

## Question 1: Variable vs property

What logs to console the following code snippet:

```javascript
const object = {
  message: 'Hello, World!',

  getMessage() {
    const message = 'Hello, Earth!';
    return this.message;
  }
};

console.log(object.getMessage()); // What is logged?
```

<details>
  <summary>Expand answer</summary>

`'Hello, World!'` is logged to console. [Try the demo.](https://jsfiddle.net/dmitri_pavlutin/cmhv85g9/)

`object.getMessage()` is a method invocation, that's why `this` inside the method equals `object`.  

There's also a variable declaration `const message = 'Hello, Earth!'` inside the method. The variable doesn't influence anyhow the value of `this.message`.  
</details>

## Question 2: Cat name

What logs to console the following code snippet:

```javascript
function Pet(name) {
  this.name = name;

  this.getName = () => this.name;
}

const cat = new Pet('Fluffy');

console.log(cat.getName()); // What is logged?

const { getName } = cat;
console.log(getName());     // What is logged?
```

<details>
  <summary>Expand answer</summary>

`'Fluffy'` and `'Fluffy'` are logged to console. [Try the demo.](https://jsfiddle.net/dmitri_pavlutin/k7em3bho/) 

When a function is invoked as a constructor `new Pet('Fluffy')`, [*this* inside the constructor function](/gentle-explanation-of-this-in-javascript/#41-this-in-a-constructor-invocation) equals the constructed object. 

`this.name = name` expression inside `Pet` constructor creates `name` property on the constructed object.  

`this.getName = () => this.name` creates a method `getName` on the constructed object. And since the arrow function is used, [*this* inside the arrow function](/gentle-explanation-of-this-in-javascript/#71-this-in-arrow-function) equals to `this` of the outer scope &mdash; the constructor function `Pet`.  

Invoking `cat.getName()`, as well as `getName()`, returns the expression `this.name` that evaluates to `'Fluffy'`.  

</details>

## Question 3: Delayed greeting

What logs to console the following code snippet:

```javascript
const object = {
  message: 'Hello, World!',

  logMessage() {
    console.log(this.message); // What is logged?
  }
};

setTimeout(object.logMessage, 1000);
```

<details>
  <summary>Expand answer</summary>

After a delay of 1 second, `undefined` is logged to console. [Try the demo.](https://jsfiddle.net/dmitri_pavlutin/ducwj3e8/) 

While `setTimeout()` function uses the `object.logMessage` as a callback, still, it inovkes `object.logMessage` as a regular function, rather than a method.  

And during a [regular function invocation *this* equals the global object](/gentle-explanation-of-this-in-javascript/#21-this-in-a-function-invocation), which is `window` in the case of the browser environment.  

That's why `console.log(this.message)` inside `logMessage` method logs `window.message`, which is `undefined`.  

*Side challenge: how can you fix this code so that `'Hello, World!'` is logged to console? Write your solution in a comment below!*

</details>

## Question 4: Artificial method

How can you call `logMessage` function so that it logs `"Hello, World!"`?

```javascript
const object = {
  message: 'Hello, World!'
};

function logMessage() {
  console.log(this.message); // "Hello, World!"
}

// Write your code here...
```

<details>
  <summary>Expand answer</summary>

  There are at least 3 ways how to call `logMessage()` as a method on the `object`. Any of them is considered a correct answer: 

```javascript
const object = {
  message: 'Hello, World!'
};

function logMessage() {
  console.log(this.message); // logs 'Hello, World!'
}

// Using func.call() method
logMessage.call(object);

// Using func.apply() method
logMessage.apply(object);

// Creating a bound function
const boundLogMessage = logMessage.bind(object);
boundLogMessage();
```

[Try the demo.](https://jsfiddle.net/dmitri_pavlutin/0oubpzje/)

</details>

## Question 5: Greeting and farewell

What logs to console the following code snippet:

```javascript
const object = {
  who: 'World',

  greet() {
    return `Hello, ${this.who}!`;
  },

  farewell: () => {
    return `Goodbye, ${this.who}!`;
  }
};

console.log(object.greet());    // What is logged?
console.log(object.farewell()); // What is logged?
```

<details>
  <summary>Expand answer</summary>

`'Hello, World!'` and `'Goodbye, undefined!'` are logged to console. [Try the demo.](https://jsfiddle.net/dmitri_pavlutin/o4gsLyfe/) 

When calling `object.greet()`, inside the method `greet()` `this` value equals `object` because `greet` is a regular function. Thus `object.greet()` returns `'Hello, World!'`.  

But `farewell()` is an arrow function, so [*this* value inside of an arrow function](/gentle-explanation-of-this-in-javascript/#71-this-in-arrow-function) *always* equals `this` of the outer scope. 

The outer scope of `farewell()` is the global scope, where `this` is the global object. Thus `object.farewell()` actually returns `'Goodbye, ${window.who}!'`, which evaluates to `'Goodbye, undefined!'`.  

</details>

## Question 6: Tricky length

What logs to console the following code snippet:

```javascript
var length = 4;
function callback() {
  console.log(this.length); // What is logged?
}

const object = {
  length: 5,
  method(callback) {
    callback();
  }
};

object.method(callback, 1, 2);
```

<details>
  <summary>Expand answer</summary>

`4` is logged to console. [Try the demo.](https://jsfiddle.net/dmitri_pavlutin/Lr618c3s/)

`callback()` is called using regular function invocation inside `method()`. Since [*this* value during a regular function invocation](/gentle-explanation-of-this-in-javascript/#21-this-in-a-function-invocation) equals the global object, `this.length` is evaluated as `window.length` inside `callback()` function.   

The first statement `var length = 4`, being in the outermost scope, creates a property `length` on the global object: `window.length` becomes `4`.  

Finally, inside the `callback()` function `this.length` evaluates as `window.length` &mdash; `4` being logged to console.  

</details>

## Question 7: Calling arguments

What logs to console the following code snippet:

```javascript
var length = 4;
function callback() {
  console.log(this.length); // What is logged?
}

const object = {
  length: 5,
  method() {
    arguments[0]();
  }
};

object.method(callback, 1, 2);
```

<details>
  <summary>Expand answer</summary>

`3` is logged to console. [Try the demo.](https://jsfiddle.net/dmitri_pavlutin/ucat9ymL/1/)

`obj.method(callback, 1, 2)` is invoked with 3 arguments: `callback`, `1` and `2`. As result the `arguments` special variable inside `method()` is an array-like object of the following structure:

```javascript
{
  0: callback,
  1: 1, 
  2: 2, 
  length: 3 
}
```

Because `arguments[0]()` is a method invocation of `callback` on `arguments` object, `this` inside the `callback` equals `arguments`. As result `this.length` inside `callback()` is same as `arguments.length` &mdash; which is `3`.  

</details>

## Summary

If you've answered correctly 5 or more questions, then you have a good understanding of `this` keyword! 

Otherwise, you need a good refresher on `this` keyword. I recommend revising the post [Gentle Explanation of "this" in JavaScript](/gentle-explanation-of-this-in-javascript/).  

Ready for a new challenge? Try to solve the [7 Interview Questions on JavaScript Closures](/javascript-closures-interview-questions/).  