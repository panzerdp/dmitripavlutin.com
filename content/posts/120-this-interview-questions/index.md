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

In JavaScript `this` is a special value that equals to the function invocation context. While simple at first, `this` is one of the most confusing aspects of the language. 

That's why you might expect during a JavaScript coding interview to get asked about how `this` behave in certain situations.  

Since the best way to prepare for a coding interview is practice, in this post I compiled a list of 7 interesting interview questions about `this`.  

*If you're not familiar with `this` keyword, I highly recommend studying well the post [Gentle Explanation of "this" in JavaScript](/gentle-explanation-of-this-in-javascript/).*  

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

`'Hello, World!'` is logged to console.  

`object.getMessage()` is a method invocation, that's why `this` inside the method equals `object`.  

There's also a variable declaration `const message = 'Hello, Earth!'` inside the method. The variable doesn't influence anyhow the value of `this.message`.  
</details>

## Question 2: A new cat

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

`'Fluffy'` and `'Fluffy'` is logged to console.  

When a function is invoked as a constructor `new Pet('Fluffy')`, `this` inside the constructor function equals to the constructed object. Then `this.name = name` creates `name` property on the object having `'Fluffy'` value.  

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

After a delay of 1 second, `undefined` is logged to console.  

While `setTimeout()` function uses the `object.logMessage` as a callback, still, it inovkes `object.logMessage` as a regular function, rather than a method.  

And inside of a regular function `this` equals the global object, which is `window` in case of the browser environment.  

That's why `console.log(this.message)` inside `logMessage` method actually logs `window.message`, which is `undefined`.  

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
object.call(logMessage);

// Using func.apply() method
object.call(logMessage);

// Creating a bound function
const boundLogMessage = logMessage.bind(object);
boundLogMessage();
```
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
    return `Good bye, ${this.who}!`;
  }
};

console.log(object.greet());    // What is logged?
console.log(object.farewell()); // What is logged?
```

<details>
  <summary>Expand answer</summary>

`'Hello, World!'` and `'Good bye, undefined!'` is logged to console.  

When calling `object.greet()`, inside the method `greet()` `this` value equals `object` because `greet` is a regular function. Thus `object.greet()` returns `'Hello, World!'`.  

But `farewell` is an arrow function, so `this` value inside of an arrow function *always* equals `this` of the outer scope. 

The outer scope of `farewell` function is the global scope, where `this` is the global obect. Thus `object.farewell()` actually returns `'Good bye, ${window.who}!'`, which is evaluated as `'Good bye, undefined!'`.  

</details>

## Question 6: Calling arguments

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

obj.method(callback, 1, 2);
```

<details>
  <summary>Expand answer</summary>

</details>

## Question 7: Tricky length

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

obj.method(callback, 1, 2);
```

<details>
  <summary>Expand answer</summary>

</details>