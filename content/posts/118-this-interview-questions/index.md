---
title: '7 Interview Questions on this keyword in JavaScript. Can You Answer Them?'
description: "A compilied list of 7 interesting and challenging interview questions on this keyword in JavaScript."
published: "2021-02-02T10:30Z"
modified: "2021-02-02T10:30Z"
thumbnail: "./images/cover-2.png"
slug: javascript-this-interview-questions
tags: ['javascript', 'this', 'interview']
recommended: ['gentle-explanation-of-this-in-javascript', 'simple-but-tricky-javascript-interview-questions']
type: post
---


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

obj.method(callback);
```

## Questions 7

What will log to console the following code snippet:

```javascript
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