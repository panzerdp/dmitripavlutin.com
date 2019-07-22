---
title: How to Write Concise Arrow Functions in JavaScript
description: Useful tips on how to write consice arrow functions in JavaScript.
published: "2019-07-30"
modified: "2019-07-30"
thumbnail: "./images/arrows.jpg"
slug: concise-arrow-functions-javascript
tags: ['javascript', 'arrow function']
recommended: ["7-tips-to-handle-undefined-in-javascript", "object-rest-spread-properties-javascript"]
type: post
---

An arrow function expression is a way to define a JavaScript function using a short form that contains, surprisingly, an arrow `=>`.  

```javascript
const message = () => {
  return 'Hello, World!';
};

message(); // => 'Hello, World!'
```

As a side note, I consider that arrow function's main role is to [bind `this` lexically](https://dmitripavlutin.com/gentle-explanation-of-this-in-javascript/#71thisinarrowfunction).  

Arrow function syntax is attractive because you can define functions shorter than a function expression. There are cases when you can completely omit:  

* parameters parenthesis
* `return` keyword 
* or even curly braces `{ }`.  

Let's explore how to make arrow functions short and straightforward to read.  