---
title: Tips on shortening arrow functions
description: Tips on shortening arrow functions.
published: "2018-03-04"
modified: "2018-03-04"
thumbnail: "./images/runner.jpg"
slug: tips-on-shortening-arrow-functions
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