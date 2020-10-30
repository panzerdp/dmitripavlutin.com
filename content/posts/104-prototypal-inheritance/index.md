---
title: "What Makes JavaScript JavaScript? Prototypal Inheritance"
description: "You don't know JavaScript until you know prototypal inheritance. Follow up an accessible explanation of prototypal inheritance in JavaScript."
published: "2020-11-03T12:00Z"
modified: "2020-11-03T12:00Z"
thumbnail: "./images/cover.png"
slug: javascript-prototypal-inheritance
tags: ['javascript', 'prototype', 'inheritance']
recommended: ['simple-explanation-of-javascript-closures', 'own-and-inherited-properties-in-javascript']
type: post
commentsThreadId: javascript-prototypal-inheritance
---

Prototypal inheritance in JavaScript is a slightly conter-intuitive, nevertheless, an important concept. *You don't know JavaScript until you know prototypal inheritance.*  

In this post you'll read an accessible explanation of prototypal inheritance in JavaScript.  

## 1. Objects only

I'm not going to throw you from the beginning into the "prototypal inheritance is blah blah...". I'd like to guide step by step to it.  

In JavaScript there are only primitives types, `null`, `undefined` and objects. A big world of objects.  

In Java or PHP languages there's a concept of *class*: a template or plan that describes the propeties and method of objects. 

But JavaScript doesn't have the concept of class &mdash; there are only objects.  

## 2. Inheritance

A primitive type is atomic, meaning that it cannnot be further deviced into smaller pieces. For example, a boolean `false` is atomic because you cannot divided into something smaller.

An object, on the contrary to primitve types, is a composable structure. In JavaScript an object consists of multiple properties: key and value pairs.  

For example, the following object `user` consists of 3 properties and associated values:

```javascript
const userJohn = {
  email: 'john@site.com',
  name: 'John Smith',
  isAdmin: false
};
```

`name` and `email` are properties containing string values, and `isAdmin` is a property holding a boolean.  

The same way you can define another object, `userJane`, with the same property keys but different values:

```javascript
const userJane = {
  email: 'jane@site.com',
  name: 'Jane Doe',
  isAdmin: false
};
```



## 3. The prototype object



## 4. The prototype chain

## 5. Object constructor

## 6. Summary