---
title: "Checking if a Variable is Defined in JavaScript"
description: "How to check correctly if a variable is defined in JavaScript."
published: "2020-11-17T12:00Z"
modified: "2020-11-17T12:00Z"
thumbnail: "./images/cover-2.png"
slug: javascript-defined-variable-checking
tags: ['javascript', 'variable']
recommended: ['javascript-hoisting-in-details', 'javascript-variables-and-temporal-dead-zone']
type: post
---

Sometimes you have to check whether a variable is defined. 

Usually you need this to determine whether a 3rd party service (like Google Analytics) or script you don't have control over has been successfully loaded into the web page, or whether the browser supports some Web API (e.g. `IntersectionObserver`, `Intl`).  

How to determine if a variable is defined in JavaScript? The answer is not so easy at it seems, so let's find it!

## 1. The states of a variable

I'd like to have an agreement about the terms I'm going to use. The following 4 sections will make clear about what it means a variable to be "defined"/"not defined" and "initialized"/"uninitialized".  

### 1.1 Defined / not defined variable

A variable is *defined* when there is a name binding available in the current scope.  

Examples of *defined variables*:

```javascript
const pi = 3.14; // pi is "defined"
let result;    // result is "defined"

window.message = 'Hello';
message;      // message is "defined"
```

A variable is *not defined* when there is no name binding available in the current scope.   

Examples of *not defined variables*:

```javascript
pi;     // Throws ReferenceError: pi is "not defined"

if (true) {
  let result;
}
let result; // Throws ReferenceError: result is "not defined"
```

Accessing a variable that's not defined in JavaScript throws a `ReferenceError`.  

### 1.2 Initialized / uninitialized variable

A variable is *initialized* when there is a name binding available in the current scope and the variable has been assigned with an initial value.  

Examples of *initialized variables*:

```javascript
const pi = 3.14; // pi is "initialized"
let result;
result = 'Value'; // result is "initialized"
```

A variable is *uninitialized* when there is a name binding available in the current scope and the variable has not been assigned with an initial value.  

Examples of *initialized variables*:

```javascript
let result; // result is "uninitialized"
var sum;    // result is "uninitialized"
```

The value of an uninitialized variable is always `undefined`:

```javascript
let result; // result is "uninitialized"
result; // => undefined
```

## 2. *typeof*

Having the possible states of variables defined, let's consider a few techniques that tells whether a variable is defined or not.  

As a reminder, the `typeof` operator determines the type of the value that the variable contains. `typeof myVar` can evaluate to one of the values: `'boolean'`, `'number'`, `'string'`, `'object'`, `'symbol'`, and `'undefined'`.

Aside from determining the variable value's type, `typeof myVar` has a really nice property: it doesn't throw a `ReferenceError` if the `myVar` is not defined. That's great because now you can use it to determine if the variable is not defined:

```javascript
// existingVar is defined
const existingVar = 'Hello';
typeof existingVar !== 'undefined'; // => true

// missingVar is not defined
typeof missingVar !== 'undefined'; // => false
```

Simply saying, the expression `typeof myVar !== 'undefined'` evaluates to `true` if `myVar` is defined, and `false` if `myVar` is not defined in the current scope.  

## 3. *try/catch*

## 4. Global variables case

## 5. Summary

