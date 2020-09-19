---
title: "Everything About null in JavaScript"
description: "In JavaScript null is a special value  that represents a missing object."
published: "2020-09-22T08:00Z"
modified: "2020-09-22T08:00Z"
thumbnail: "./images/cover.png"
slug: javascript-null
tags: ['javascript', 'null', 'object']
recommended: ['7-tips-to-handle-undefined-in-javascript', 'nan-in-javascript']
type: post
commentsThreadId: javascript-null
---

In JavaScript there 2 main categories of types: primitives (strings, booleans, numbers, symbols) and objects.  

Objects are complex data structures. The simplest object in JavaScript is the plain object: a collection of keys and associated values. 

For example the variable `myObject` contains a plain object defined using an object literal:

```javascript
let myObject = {
  name: 'Eric Cartman'
};
```

But there are situations when for some reason an object cannot be created. In such a case JavaScript provides a special value `null` &mdash; which indicates a missing object.  

```javascript
let myObject = null;
```

In this post you will learn about `null` value in JavaScript: its meaning, how to detect it, and the difference between `undefined` and `null`, and more.  

## 1. What is null

Here's what the JavaScript [specification](https://tc39.es/ecma262/#sec-null-value) says about `null`:

> `null` is a primitive value that represents *the intentional absence of any object value*.

If you see a `null` value, then at that place should have been an object, but for some reason an object wasn't created.  

For example, let's create a function that creates object with greetings messages:

```javascript
function greetObject(who) {
  if (!who) {
    return null;
  }
  return {
    message: `Hello, ${who}!`;
  };
}


```

## 2. How to check for null

## 3. null vs undefined

## 4. Alternatives to null

## 5. Summary

