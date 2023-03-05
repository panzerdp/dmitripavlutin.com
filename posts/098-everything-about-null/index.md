---
title: "Everything about null in JavaScript"
description: "null in JavaScript is a special value  that represents a missing object."
published: "2020-09-22T06:30Z"
modified: "2020-09-22T06:30Z"
thumbnail: "./images/cover-2.png"
slug: javascript-null
tags: ['javascript', 'null', 'object']
recommended: ['7-tips-to-handle-undefined-in-javascript', 'nan-in-javascript']
type: post
---

JavaScript has 2 kinds of types: primitives (strings, booleans, numbers, symbols) and objects.  

Objects are complex data structures. The simplest object in JavaScript is the plain object &mdash; a collection of keys and associated values:

```javascript
let myObject = {
  name: 'Eric Cartman'
};
```

But there are situations when an object cannot be created. For such cases, JavaScript provides a special value `null` &mdash; which indicates a missing object.  

```javascript
let myObject = null;
```

In this post, you'll learn everything about `null` in JavaScript: its meaning, how to detect it, the difference between  `null` and `undefined`, and why using `null` extensively creates code maintenance difficulties.  

*Before I go on, let me recommend something to you.* 

*If you want to significantly improve your JavaScript knowledge, take the  amazingly useful course ["Modern JavaScript From The Beginning 2.0"](https://www.traversymedia.com/a/2147528886/FqXWyazh) by Brad Traversy. Use the coupon code "DMITRI" and get up to 20% discount!*

```toc
```

## 1. The concept of *null*

The JavaScript [specification](https://tc39.es/ecma262/#sec-null-value) says about `null`:

> `null` is a primitive value that represents *the intentional absence of any object value*.

If you see `null` (either assigned to a variable or returned by a function), then at that place should have been an object, but for some reason, an object wasn't created.  

For example, the function `greetObject()` creates objects, but also can return `null` when an object cannot be created:

```javascript{2}
function greetObject(who) {
  if (!who) {
    return null;
  }
  return { message: `Hello, ${who}!` };
}

greetObject('Eric'); // => { message: 'Hello, Eric!' }
greetObject();       // => null
```

When invoking the function with a string argument like `greetObject('Eric')`, as expected, the function returns an object `{ message: 'Hello, Eric!' }`. 

However, when invoking the function with no arguments &mdash; `greetObject()` &mdash; the function returns `null`. Returning `null` is reasonable because `who` parameter has no value, and the greeting object cannot be created.  

### 1.1 Real-world analogy of *null*

Thinking about a real-world analogy, you can imagine a variable as being a box. Just like a variable can hold an object, the box can contain objects like a teapot.  

But once you receive a box and open it... and *nothing* there! Someone made a mistake and sent you an empty box. The box contains nothing, or, saying it differently, contains a `null` value.  

## 2. How to check for *null*

The good way to check for `null` is by using the [strict equality operator](/the-legend-of-javascript-equality-operator/#the-identity-operator):

```javascript
const missingObject = null;
const existingObject = { message: 'Hello!' };

missingObject  === null; // => true
existingObject === null; // => false
```

`missingObject === null` evaluates to `true` because `missingObject` variable contains a `null` value.  

If the variable contains a non-null value, like an object, the expression `existingObject === null` evaluates to `false`.  

### 2.1 *null* is falsy

`null`, alongside `false`, `0`, `''`, `undefined`, `NaN`, is a falsy value. If a falsy value is encountered in conditionals, then JavaScript coerces falsy to `false`.  

```javascript
Boolean(null); // => false

if (null) {
  console.log('null is truthy');
} else {
  console.log('null is falsy'); // logs 'null is falsy'
}
```

### 2.2 *typeof null*

`typeof value` operator determines the type of value. For example `typeof 15` is `'number'` and `typeof { prop: 'Value' }` evaluates to `'object'`.  

Interestingly, to what value `type null` evaluates to? 

```javascript
typeof null; // => 'object'
```

Hm... how could the type of a *missing object* evaluate to `'object'`? Turns out `typoef null` being `'object'` was a [mistake](https://2ality.com/2013/10/typeof-null.html) in the early JavaScript implementation.  

Do not use `typeof` operator to detect a `null` value. As mentioned previously, use the strict equality operator `myVar === null`.  

If you'd like to check whether a variable contains an object using `typeof` operator, you have to check againts `null` too:

```javascript
function isObject(object) {
  return typeof object === 'object' && object !== null;
}

isObject({ prop: 'Value' }); // => true
isObject(15);                // => false
isObject(null);              // => false
```

## 3. The trap of *null*

`null` might appear, often unexpectedly, in situations when you expect an object. Then if you try to extract a property from `null`, JavaScript throws an error.  

Let's use again `greetObject()` function and try to access `message` property from the returned object:

```javascript
let who = '';

greetObject(who).message; 
// throws "TypeError: greetObject() is null"
```

Because `who` variable is an empty string, the function returns `null`. When accessing `message` property from `null`, a TypeError error is thrown.  

You can handle `null` by either using the [optional chaining](https://dmitripavlutin.com/javascript-optional-chaining/) with nullish coalescing:

```javascript
let who = '';

greetObject(who)?.message ?? 'Hello, Stranger!';  
// => 'Hello, Stranger!'
```

or use 2 alternatives described in the next section.  

## 4. Alternatives to *null*

It's tempting to return `null` when you cannot construct an object. But this practice has downsides.  

As soon as `null` appears within your execution stack, you always have to check for it.  

I try to avoid returning `null` in favor of:

* returning a default object instead of `null`
* throwing an error instead of returning `null`

Let's recall the `greetObject()` function that returns greeting objects. 

Instead of returning `null` when the argument is missing, you could either return a default object:

```javascript
function greetObject(who) {
  if (!who) {
    who = 'Stranger';
  }
  return { message: `Hello, ${who}!` };
}

greetObject('Eric'); // => { message: 'Hello, Eric!' }
greetObject();       // => { message: 'Hello, Stranger!' }
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

These practices let you avoid dealing with `null` at all.  

## 5. *null* vs *undefined*

`undefined` is the value of an uninitialized variable or object property.

For example, if you declare a variable without assigning an initial value, accessing such variable evaluates to `undefined`:

```javascript
let myVariable;

myVariable; // => undefined
```

The main difference between `null` and `undefined` is that `null` represents a missing object, while `undefined` represents an uninitialized state.  

The strict equality operator `===` distinguishes `null` from `undefined`:

```javascript
null === undefined; // => false
```

While [loose equality operator](/the-legend-of-javascript-equality-operator/#the-equality-operator) `==` considers `null` and `undefined` equal:

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

## 6. Summary

`null` is a special value in JavaScript that represents a missing object.  

The strict equality operator determines whether a variable is null: `variable === null`.  

`typoef` operator is useful to determine the type of a variable (number, string, boolean). However, `typeof` is misleading in case of `null`: `typeof null` evaluates to `'object'`.  

`null` and `undefined` are somehow equivalent, still, `null` represents a missing object, while `undefined` uninitialized state.  

Avoid if possible returning `null` or setting variables to `null`. This practice leads to the spread of null values and verifications for `null`. Instead, try to use objects with default properties, or even throw errors.  

Having mastered `null`, why not master `undefined`? Follow my post [7 Tips to Handle undefined in JavaScript](/7-tips-to-handle-undefined-in-javascript/).

*What condition do you use to check for `null`?*