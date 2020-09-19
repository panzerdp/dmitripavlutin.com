---
title: "Everything about null in JavaScript"
description: "In JavaScript null is a special value  that represents a missing object."
published: "2020-09-22T08:00Z"
modified: "2020-09-22T08:00Z"
thumbnail: "./images/cover-2.png"
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

```toc
```

## 1. What is *null*

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

## 2. How to check for *null*

The simplest and the most correct way to check for `null` value is by using the strict equality operator:

```javascript
const missingObject = null;
const existingObject = { message: 'Hello!' };

missingObject  === null; // => true
existingObject === null; // => false
```

`missingObject === null` evaluates to `true` because `missingObject` variable contains a `null` value.  

If the variable contains a non-null value, like an object, the expression `existingObject === null` evaluates to `false`.  

### 2.1 *null* is falsy

It worth mentioning that `null`, alongside with `false`, `0`, `''`, `undefined`, `NaN` are falsy values. If a falsy value is encountered in conditionals, then JavaScript coerces falsy to `false`.  

```javascript
Boolean(null); // => false

if (null) {
  console.log('null is truthy');
} else {
  console.log('null is falsy'); // logs 'null is falsy'
}
```

### 2.2 *typeof null*

`typeof value` operator determines the type of value. For example `typoeof 15` is `'number'`, `typeof false` is `'boolean'`, `typeof { prop: 'Value' }` evaluates to `'object'`, etc.

However, to what value would `type null` evaluate to? 

```javascript
const missingObject = null;

typeof missingObject; // => 'object'
```

How could the type of a *missing object* could evaluate to `'object'`? Turns out `typoef null` evaluating `'object'` was a mistake in the early JavaScript implementation.  

If you'd like to check whether a variable contains an object using `typoeof` operator, you have to check againts `null` too:

```javascript
function isObject(object) {
  return typoeof object === 'object' && object !== null;
}

isObject({ prop: 'Value' }); // => true
isObject(15);                // => false
isObject(null);              // => false
```

## 3. null vs undefined

`undefined` is also a special value meaning a missing value. However, stricter `undefined` means a variable or object property that is in an unitialized state.  

For example, if you declare a variable without assigning an initial value, accessing such variable evaluates to `undefined`:

```javascript
let myVariable;

myVariable; // => undefined
```

The main difference between `null` and `undefined` is that `null` represents a missing object, while `undefined` represents unitialized state.  

The strict equality operator `===` distinguishes `null` from `undefined`:

```javascript
null === undefined; // => false
```

While loose equality operator `==` considers `null` and `undefined` equal:

```javascript
null == undefined; // => true
```

I use the loose equality operator to check whether a variable is `null` or `undefined`:

```javascript
function isEmpty(value) {
  return value == null;
}

isEmpty(42);                // => false
isEmpty({ prop: 'Value' }); // => false
isEmpty(null);              // => true
isEmpty(undefined);         // => true
```

## 4. Alternatives to *null*

It's tempting to return `null` when you cannot construct an object. Unfortunetely, this practice has downsides.  

As soon as `null` appears within your execution stack, you always have to check for it and handle it separately.  

I try to avoid returning `null` in favor of other approaches:

* return default object instead of `null`
* throw an error instead of returning `null`

Let's recall the `greetObject()` function that returns greeting objects. 

Instead of returning `null` when the argument is missing, you could either return a default object:

```javascript
function greetObject(who) {
  if (!who) {
    who = 'Unknown';
  }
  return { message: `Hello, ${who}!` };
}

greetObject('Eric'); // => { message: 'Hello, Eric!' }
greetObject();       // => { message: 'Hello, Unknown!' }
```

either throw an error:

```javascript
function greetObject(who) {
  if (!who) {
    throw new Error('"who" argument is missing');
  }
  return { message: `Hello, ${who}!` };
}

greetObject('Eric'); // => { message: 'Hello, Eric!' }
greetObject();       // => throws an error
```

## 5. Summary

`null` is a special value in JavaScript that represents a missing object.  

The strict equality operator can be used to check whether a variable is null: `variable === null`.  

`typoef` operator is useful to determine the type of a variable (number, string, boolean). However, `typeof` is misleading in case of `null`: `typoeof null` evaluates to `'object'`.  

`null` and `undefined` as somehow equal, still, `null` represents a missing object, while `undefined` unitialized state.  

I advise to avoid if possible returning `null` or setting variables to `null`. That would lead to a spread of null values and verifications for `null`. Instead, try to use approaches like using object with default props, or even throw errors.  

Either way, `null` is an important value in JavaScript. Hopefully, this post has helped you understand it.  

*What condition do you use to check for `null` value?*