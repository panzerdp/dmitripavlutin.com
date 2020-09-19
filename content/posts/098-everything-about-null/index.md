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

If you see `null` (either assigned to a variable or returned by a function), then at that place should have been an object, but for some reason an object wasn't created.  

Let's study the idea of `null` from an example. 

The function `greetObject()` creates objects, but also can return `null` when an object cannot be created:

```javascript{3}
function greetObject(who) {
  if (!who) {
    return null;
  }
  return { message: `Hello, ${who}!` };
}

greetObject('Eric'); // => { message: 'Hello, Eric!' }
greetObject();       // => null
```

`greetObject(who)` creates plain JavaScript objects with a `message` property.  

When invoking the function with a string argument like `greetObject('Eric')`, as expected, the function returns an object `{ message: 'Hello, Eric!' }`. 

However, when invoking the function with no arguments &mdash; `greetObject()` &mdash; the function returns `null`, which means a missing object. Returning `null` is reasonable because `who` parameter has no value, and the greeting object cannot be created.  

## 2. How to check for null

The simplest and the most correct way to check for `null` value is by using the strict equality operator:

```javascript
const missingObject = null;
const existingObject = { message: 'Hello!' };

missingObject  === null; // => true
existingObject === null; // => false
```

`missingObject === null` evaluates to `true` because `missingObject` variable contains a `null` value.  

If the variable contains a non-null value, like an object, the expression `existingObject === null` evaluates to `false`.  

It worth mentioning that `null`, alongside with `false`, `0`, `''`, `undefined`, `NaN` are falsy values. If a falsy value is encountered in conditionals, then JavaScript transforms this value to `false`.  

## 3. null vs undefined

## 4. Alternatives to null

## 5. Summary

