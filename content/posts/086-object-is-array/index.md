---
title: "3 Ways to Detect an Array in JavaScript"
description: "3 ways to check if a value is an array in JavaScript: Array.isArray(), instanceof Array and toString() === '[object Array]'."
published: "2020-06-28T12:00Z"
modified: "2020-06-29T12:00Z"
thumbnail: "./images/cover-1.png"
slug: is-array-javascript
tags: ["javascript", "array"]
recommended: ["operations-on-arrays-javascript", "the-magic-behind-array-length-property"]
type: post
commentsThreadId: is-array-javascript
---

Checking whether a value is an array in JavaScript might happen when you'd like to work with arrays,
but the received value can be other than an array.  

In this post, you will find the 3 usual ways to detect a JavaScript array.

## 1. *Array.isArray(value)*

It's ok if you don't have time to read the entire post. If you want just one good idea how to detect an array in JavaScript, here it is: use `Array.isArray(value)` utility function.  

But if you want to know more, let's continue. Here are a few examples of using `Array.isArray()`:

```javascript
const array = [1, 2, 3];
const object = { message: 'Hello!' };
const string = 'Hello!';

Array.isArray(array);  // => true
Array.isArray(object); // => false
Array.isArray(string); // => false
```

`Array.isArray()` has a [good browser support](https://caniuse.com/#search=isArray). It's the recommended way to check
for an array in JavaScript.  

> `Array.isArray(value)` utility function returns `true` if `value` is an array.  

## 2. *value instanceof Array*

An array is an object. And like any object in JavaScript, the array instance has a constructor function &mdash; `Array`.  

`Array` invoked as a constructor (prefixed with `new` keyword) easily creates array instances:   

```javascript
const array = new Array(1, 2, 3);
array; // => [1, 2, 3]
```

Moreover, the array instance exposes its constructor using a property `.constructor`:

```javascript
const array = [1, 2, 3];
array.constructor === Array;
```

What is the operator that verifies whether a function is the constructor of an instance? `instanceof`!  

Now emerges the next way to verify if a value is an array: `value instance Array` evaluates to `true` if `value` is an array.  

Let's see a few examples:

```javascript
const array = [1, 2, 3];
const object = { message: 'Hello!' };
const string = 'Hello!';

array  instanceof Array; // => true
object instanceof Array; // => false
string instanceof Array; // => false
```

Resuming:  

> `value instanceof Array` expressions evaluates to `true` if `value` is an array.  

*Note: `value instanceof Array` incorrectly evaluates to `false` when `value` is an array created in a different iframe than the `Array` constructor function. If you're not writing cross-frames JavaScript, use this approach without worries.*  

## 3. *({}).toString.call(value)*

What's nice about `toString()` of a plain JavaScript object is that it returns `'[object <type>]'`, where `<type>` is the object type it was called upon. Take a look at the [specification](http://www.ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring) which indicates how exactly `Object.prototype.toString()` works.  

In the simplest case, when `toString()` method is invoked directly on a plain object, it returns `'[object Object]'`:

```javascript
({}).toString(); // => '[object Object]'
```

However, you can use an [indirect call](/gentle-explanation-of-this-in-javascript/#5-indirect-invocation) of `toString()` on different types of values, and the method returns the corresponding string representation of the type:

```javascript{7}
const array = [1, 2, 3];
const object = { message: 'Hello' };
const string = 'Hello!';
const nothing = undefined;
const empty = null;

({}).toString.call(array);   // => '[object Array]'
({}).toString.call(object);  // => '[object Object]'
({}).toString.call(string);  // => '[object String]'
({}).toString.call(nothing); // => '[object Undefined]'
({}).toString.call(empty);   // => '[object Null]'
```

Now you can spot the idea: `({}).toString.call(value)` equals to `'[object Array]'` if `value` is an array.  

```javascript
const array = [1, 2, 3];

({}).toString.call(array) === '[object Array]'; // => true
```

In conclusion:

> `({}).toString.call(value) === '[object Array]'` expression evaluates to `true` if `value` is an array.

## 4. Summary

To detect an array, my recommendation is `Array.isArray(value)`. The function returns a boolean whether `value` is an array.  

Another approach is `value instanceof Array`, which uses the idea that the constructor of the array is `Array` function.  

Finally, (maybe not the most aesthetic approach) is to use the expression `({}).toString.call(value) === '[object Array]'` which evaluates to `true` if `value` is an array. This approach uses the idea that `Object.prototype.toString()` returns the type representation of the object it was invoked upon.  

*What is your favorite approach to detect arrays in JavaScript?*