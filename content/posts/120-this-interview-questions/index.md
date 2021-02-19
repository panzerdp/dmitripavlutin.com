---
title: '7 Interview Questions on "this" keyword in JavaScript. Can You Answer Them?'
description: 'A compilied list of 7 interesting and challenging interview questions on "this" keyword in JavaScript.'
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

</details>

## Question 2: A new cat

What logs to console the following code snippet:

```javascript
function Pet(name) {
  this.name = name;

  this.getName = () => {
    return this.name;
  };
}

const cat = new Pet('Fluffy');

console.log(cat.getName()); // What is logged?
```

<details>
  <summary>Expand answer</summary>

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