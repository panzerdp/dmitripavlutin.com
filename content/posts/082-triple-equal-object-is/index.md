---
title: "Object.is() vs Strict Equality Operator in JavaScript"
description: "When should you use Object.is() instead of strict equality check in JavaScript?"
published: "2020-05-30T12:00Z"
modified: "2020-05-30T12:00Z"
thumbnail: "./images/cover-3.png"
slug: object-is-vs-strict-equality-operator
tags: ["javascript", "equality"]
recommended: ["the-legend-of-javascript-equality-operator", "javascriptss-addition-operator-demystified"]
type: post
commentsThreadId: object-is-vs-strict-equality-operator
---

The tripe equality operator checks strictly whether 2 values are the same:

```javascript
1 === 1;    // => true
1 === '1';  // => false
1 === true; // => false
```

However, ES2015 specification brings `Object.is()`, which behaves *almost* same way as strict equality operator:

```javascript
Object.is(1, 1);    // => true
Object.is(1, '1');  // => false
Object.is(1, true); // => false
```

The main question is when would you use Object.is() instead of strict equality check? Let's find out.  

## 1. Strick equality check operator

To begin with, let's refresh quickly how the strick equality operator works. 

The strict equality check operator evaluates to `true` when both values are of the same type and hold the same value.  

For example, the following primive values are equal because they're the same type and have the same value:

```javascript
1         === 1;         // => true
'abc'     === 'abc';     // => true
true      === true;      // => true
null      === null;      // => true
undefined === undefined; // => true
```

The strict equality operator doesn't perform type coersion of operators. Even if operators hold *reasonable* the same value, but nevertheless of different types, they aren't strictly equal:

```javascript
'1'  === 1;         // => false
1    === true;      // => false
null === undefined; // => false
```

When performing the strict equality check on objects, an object is strictly equal only to itself:  

```javascript
const myObject = { prop: 'Value' };
myObject === myObject;  // => true
```

Even if 2 objects have exactly the same properties and values, the strict equality operator considers them different
values:

```javascript
const myObject1 = { prop: 'Value' };
const myObject2 = { prop: 'Value' };
myObject1 === myObject2; // => false
```

All the above comparison scenarios work exactly the same in `Object.is(valueA, valueB)`. 

So here's what makes the difference between the strict equality operator and `Object.is()`.  

Firstly, `NaN` ([Not A Number](/nan-in-javascript/)) isn't strictly equal to any other value, even with another `NaN`:

```javascript
NaN === 1;   // => false
NaN === NaN; // => false
```

Secondly, the strict equality operator doesn't distinguish from `-0` and `+0`:  

```javascript
-0 === +0; // => true
```

## 2. Object.is()

The Object.is(valueA, valueB) function check the arguments for equality same way as the strict eqality operator, with the 2 differences.  

Firstly, `NaN` can equal to another `NaN` value:

```javasript

```

## 3. When to use Object.is()

## 4. Summary