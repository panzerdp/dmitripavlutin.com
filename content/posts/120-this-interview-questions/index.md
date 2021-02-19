---
title: '7 Interview Questions on "this" keyword in JavaScript. Can You Answer Them?'
description: 'A compilied list of 7 interesting and challenging interview questions on "this" keyword in JavaScript.'
published: "2021-02-23T12:00Z"
modified: "2021-02-23T12:00Z"
thumbnail: "./images/cover.jpg"
slug: javascript-this-interview-questions
tags: ['javascript', 'this', 'interview']
recommended: ['gentle-explanation-of-this-in-javascript', 'simple-but-tricky-javascript-interview-questions']
type: post
---

In JavaScript `this` is a special value that equals to the function invocation context. While simple at first, `this` is one of the most confusing aspects of the language. 

That's why you might expect during a JavaScript coding interview to get asked about how `this` behave in certain situations.  

Since the best way to prepare for a coding interview is practice, in this post I compiled a list of 7 interesting interview questions about `this`.  

*If you're not familiar on how exactly `this` keyword works, I highly recommend to study well [Gentle Explanation of "this" in JavaScript](/gentle-explanation-of-this-in-javascript/).*

## Question 6

What will log to console the following code snippet:

```javascript
var length = 4;
function callback() {
  console.log(this.length); // ???
}

var object = {
  length: 5,
  method(callback) {
    callback();
  }
};

obj.method(callback, 1, 2);
```

## Questions 7

What will log to console the following code snippet:

```javascript
var length = 4;
function callback() {
  console.log(this.length); // ???
}

const object = {
  length: 5,
  method(callback) {
    arguments[0]();
  }
};

obj.method(callback, 1, 2);
```