---
title: "3 Ways to Check if a Value is an Array in JavaScript"
description: "3 ways to check if a value is an array in JavaScript: Array.isArray(), instanceof Array and toString() === '[object Array]'."
published: "2020-06-28T12:00Z"
modified: "2020-06-29T12:00Z"
thumbnail: "./images/cover-1.png"
slug: value-is-array-javascript
tags: ["javascript", "array"]
recommended: ["operations-on-arrays-javascript", "the-magic-behind-array-length-property"]
type: post
commentsThreadId: value-is-array-javascript
---

Checking whether a value is an array in JavaScrit might happen when you'd like to work with arrays,
but the received value can be other than an array.  

In this post, you will find the 3 usual ways to detect a JavaScript array.

## 1. *Array.isArray(value)*

It's ok if you don't have time to read the entire post. If you want just one good idea how to detect an array in JavaScript, here it is: use `Array.isArray(value)` utility function.  

But if you want to know more, let's continue. Here are a few examples of using `Array.isArray()`:

```javascript
const array = [1, 2];
const object = { message: 'Hello!' };
const string = 'Hello!';

Array.isArray(array);  // => true
Array.isArray(object); // => false
Array.isArray(string); // => false
```

`Array.isArray()` has a [good browser support](https://caniuse.com/#search=isArray). It's the recommended way to check
for an array in JavaScript.  

> `Array.isArray(value)` utility function returns `true` if `value` is an array, or `false` otherwise.  

## 2. *value instanceof Array*

The array is an object. And like any object in JavaScript, the array instance has a constructor function: which is `Array`.  

You can easily create arrays using a `Array` invoked as a constructor (which requires the `new` keyword):  

```javascript
const array = new Array(1, 2, 3);
array; // => [1, 2, 3]
```

Moreover, the array instance exposes its constructor using a property `.constructor`:

```javascript
const array = [1, 2, 3];
array.constructor === Array;
```

And what is the JavaScript operator that verifies whether a function is the constructor of an instance? `instanceof`!  

Now emerges the next way to verify if a value is an array: `value instance Array` evaluates to `true` if `value` is an array.  

Let's see a few examples:

```javascript
const array = [1, 2];
const object = { message: 'Hello!' };
const string = 'Hello!';

array  instanceof Array; // => true
object instanceof Array; // => false
string instanceof Array; // => false
```

Resuming:  

> `value instanceof Array` expressions evaluates to `true` if `value` is an array, or `false` otherwise.

*Note: `value instanceof Array` incorrectly evaluates to `false` if `value` array has been created in a different iframe than the `Array` constructor function. If you're not writing cross-iframes JavaScript, use this approach without worries.*  

## 3. *({}).toString.apply(value)*



## 4. Extending the Array class

## 5. Summary