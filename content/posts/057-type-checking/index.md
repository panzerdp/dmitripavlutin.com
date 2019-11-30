---
title: "5 Type Checking Pitfalls in JavaScript"
description: "This post contains 5 pitfalls of typeching in JavaScript using typeof and instanceof."
published: '2019-12-03T14:00Z'
modified: '2019-12-03T14:00Z'
thumbnail: './images/bird.jpg'
slug: javascript-type-checking-pitfalls
tags: ['javascript', 'typeof', 'instanceof']
recommended: ['7-tips-to-handle-undefined-in-javascript', 'the-legend-of-javascript-equality-operator']
type: post
commentsThreadId: javascript-type-checking-typeof-instanceof
---

JavaScript uses dynamic typing. You can assign to a variable values of different types:

```javascript
let number;
number = 10;
// Works too!
number = 'ten';
```

Dynamic typing is good and bad at the same time. It's good because you don't have to worry about indicating the variable type. It's bad because you can never be sure and enforce a type to a variable.

`typeof` is the operator to check the value type. It determines the 5 common types in JavaScript:

```javascript
typeof 10;        // => 'number'
typeof 'Hello';   // => 'string'
typeof false;     // => 'boolean'
typeof { a: 1 };  // => 'object'
typeof undefined; // => 'undefined'
```

As well, you can check the constuctor of an instance using `instanceof`:

```javascript
class Cat { }
const myCat = new Cat();

myCat instanceof Cat; // => true
```

But some behavior of `typeof` and `instanceof` can be confusing, especially at the edge case values like `null` or arrays. You have to be aware of them in advance.   

Let's see the 5 common pitfalls of `typeof` and `instanceof`, and how to solve them. As well as other type checking tips.  

## 1. The type of null

![typeof null in JavaScript meme](./images/typeof-5.jpg)

`typeof` operator can determine whether a variable holds an object. `typeof myObject === 'object'` would tell you if `myObject` is an object type.  

Let's try that in an example:

```javascript{3}
const person = { name: 'batman' };

typeof person; // => 'object'
```

`typeof person` is `'object'` because `person` holds a plain JavaScript object.  

Sometimes the places where object are expected can receive an empty value: `null`. You can use `null` to skip indicating configuration objects. When a function that expects to return an object cannot create tha object for some reason, it can also return `null`.  

For example, `str.match(regExp)` method returns `null` if no regular expression matches occur:

```javascript
const message = 'Hello';
message.match(/!/); // => null
```

A known confusion of `typeof` operator happens when you want to detect the missing object:

```javascript
const missing = null;

typeof null; // => 'object'
```

Even if `missing` is `null`, JavaScript still evaluates `typeof missing` to `'object'`.  

Why does the type of `null` is `'object'`? Let's see how JavaScript [defines](http://www.ecma-international.org/ecma-262/6.0/#sec-null-value) `null`:

> `null` is primitive value that represents the intentional absence of any object value

So the correct way to detect when a variable really contains an object, no missing objects like `null` or primitives, it's better to use:

```javascript
const missing = null;

typeof missing === 'object' && missing !== null; // => false
```

This constuction is verbose, but it trully assets if `missing` contains an object.  

## 2. The type of an array

If you try to detect if a variable contains an object, the first temptation is to use `typeof` operator:

```javascript
const colors = ['white', 'blue', 'red'];

typeof colors; // => 'object'
```

However, the type of the array is an object. Nothing useful...

A better way to detect if the variable contains an array is to use explicitely `Array.isArray()`:

```javascript
const colors = ['white', 'blue', 'red'];
const who = { name: 'Batman' };

Array.isArray(colors); // => true
Array.isArray(who);    // => false
```

`Array.isArray(colors)` returns a boolean `true`, indicating that `colors` holds an array.  

## 3. The type of NaN

## 4. The prototype chain and instanceof

@@species
@@hasInstance

## 5. Falsy as type check

## 6. Key takeaway
