---
title: '7 Interview Questions on "this" keyword in JavaScript. Can You Answer Them?'
description: '7 interview questions to challenge your knowledge on "this" keyword in JavaScript.'
published: "2021-02-23T12:00Z"
modified: "2021-02-23T12:00Z"
thumbnail: "./images/cover.jpg"
slug: javascript-this-interview-questions
tags: ['javascript', 'this', 'interview']
recommended: ['gentle-explanation-of-this-in-javascript', 'javascript-closures-interview-questions']
type: post
---

In JavaScript `this` is a special value that equals the function invocation context. While simple at first, `this` is one of the most confusing aspects of the language. 

That's why you might expect during a JavaScript coding interview to get asked about how `this` behaves in certain situations.  

Since the best way to prepare for a coding interview is to practice, in this post I compiled a list of 7 interesting interview questions about `this`.  

*If you're not familiar with `this` keyword, I recommend reading the post [Gentle Explanation of "this" in JavaScript](/gentle-explanation-of-this-in-javascript/) before continuing with answering the questions.*  

Note: JavaScript snippets below run in strict mode.  

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

`'Hello, World!'` is logged to console. [Try the demo.](https://jsitor.com/oFyrX3rV9)

`object.getMessage()` is a method invocation, that's why `this` inside the method equals `object`.  

There's also a variable declaration `const message = 'Hello, Earth!'` inside the method. The variable doesn't influence anyhow the value of `this.message`.  
</details>

## Question 2: A cat

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

`'Fluffy'` and `'Fluffy'` are logged to console. [Try the demo.](https://jsitor.com/e6FDBGpam) 

When a function is invoked as a constructor `new Pet('Fluffy')`, `this` inside the constructor function equals the constructed object. Then `this.name = name` creates `name` property on the object having `'Fluffy'` value.  

`this.getName = () => this.name` creates a method `getName` on the object. And since the arrow function is used, `this` inside the arrow function equals to `this` of the outer function (`Pet`).  

Invoking `cat.getName()`, as well as `getName()`, returns `this.name` as `'Fluffy'`, where `this` is `cat`.  

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

After a delay of 1 second, `undefined` is logged to console. [Try the demo.](https://jsitor.com/YMveKYTTE) 

While `setTimeout()` function uses the `object.logMessage` as a callback, still, it inovkes `object.logMessage` as a regular function, rather than a method.  

And inside of a regular function `this` equals the global object, which is `window` in the case of the browser environment.  

That's why `console.log(this.message)` inside `logMessage` method logs `window.message`, which is `undefined`.  

*Side challenge: how can you fix this code so that `'Hello, World!'` is logged to console by `logMessage()` method? Write your solution in a comment below!*

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

[Try the demo.](https://jsitor.com/tDJH-ufto)

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

`'Hello, World!'` and `'Goodbye, undefined!'` are logged to console. [Try the demo.](https://jsitor.com/TLj-FLReJ) 

When calling `object.greet()`, inside the method `greet()` `this` value equals `object` because `greet` is a regular function. Thus `object.greet()` returns `'Hello, World!'`.  

But `farewell` is an arrow function, so `this` value inside of an arrow function *always* equals `this` of the outer scope. 

The outer scope of `farewell` function is the global scope, where `this` is the global object. Thus `object.farewell()` actually returns `'Goodbye, ${window.who}!'`, which is evaluated as `'Goodbye, undefined!'`.  

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

`4` is logged to console. [Try the demo.](https://jsitor.com/EkwQ6ArxK)

`callback()` function is invoked using a regular function invocation inside `method()`.  

Since `this` value during a regular function invocation equals the global object, `this.length` is evaluated as `window.length`. 

Also the first statement `var length = 4` actually creates a property `length` on the global object: `window.length` becomes `4`.  

Finally `console.log(this.length)` logs `window.length`, which is `4`.  

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
  method(callback) {
    arguments[0]();
  }
};

object.method(callback, 1, 2);
```

<details>
  <summary>Expand answer</summary>

`3` is logged to console. [Try the demo.](https://jsitor.com/uZ2X-75_0)

`obj.method(callback, 1, 2)` is invoked with 3 arguments: `callback`, `1` and `2`. As result the `arguments` is an array-like object of the following structure:

```javascript
{
  0: callback, 
  1: 1, 
  2: 2, 
  length: 3 
}
```

`arguments[0]()` performs a method invocation of the `callback` on the `arguments` object. 

`this` inside the `callback` equals `arguments`, so `this.length` is same as `arguments.length` &mdash; which is `3`.  

</details>

## Summary

If you've answered correctly 5 or more questions, then you have a good understanding of `this` keyword! 

Otherwise, you need a good refresher on how `this` keyword works in JavaScript. I recommend revising the post [Gentle Explanation of “this” in JavaScript](/gentle-explanation-of-this-in-javascript/).  

Ready for a new challenge? Try to solve the [7 Interview Questions on JavaScript Closures](/javascript-closures-interview-questions/).