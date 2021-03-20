---
title: 'The Difference Between Values and References in JavaScript'
description: 'Understanding the difference between values and references is an important step to effective working with object in JavaScript.'
published: "2021-03-23T12:00Z"
modified: "2021-03-23T12:00Z"
thumbnail: "./images/cover-2.png"
slug: value-vs-reference-javascript
tags: ['javascript', 'object']
recommended: ['gentle-explanation-of-this-in-javascript', 'javascript-this-interview-questions']
type: post
---

You may have hear that in JavaScript you can pass by value and by reference.  

But what does it mean exactly?  

Let's find out in this post.  

## 1. Understanding primitive and objects

In JavaScript there 2 main categories of data types: primitives and objects.  

The primitive category is formed of numbers, booleans, strings, symbols and special values `null` and `undefined`.  

```javascript
// Primitives
const number = 10;

const bool = false;

const str = 'Hello!';

const missingObject = null;

const nothing = undefined;
```

The second important category of types are objects. Particularly the plain JavaScript object, arrays, functions &mdash; are all objects.  

```javascript
// Objects
const plainObject = {
  prop: 'Value'
};

const array = [1, 5, 6];

const functionObject = (n1, n2) => {
  return n1 + n2;
};
```

Hopefully, that short description of the 2 main categories of types in JavaScript.  



## 2. Pass by value

## 3. Pass by reference

## 4. Comparing values and references

## 5. Summary