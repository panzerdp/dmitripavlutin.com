---
title: "Checking if a Variable is Defined in JavaScript"
description: "How to check correctly if a variable is defined in JavaScript using typeof operator, try/catch blocks, or window.hasOwnProperty()"
published: "2020-11-17T12:00Z"
modified: "2020-11-17T12:00Z"
thumbnail: "./images/cover-8.png"
slug: javascript-defined-variable-checking
tags: ['javascript', 'variable', 'undefined']
recommended: ['javascript-hoisting-in-details', 'javascript-variables-and-temporal-dead-zone']
type: post
---

From time to time you have to check whether a variable is defined in JavaScript.  

Checking for variables existence is necessary to determine if an external script has been successfully loaded into the web page, or to determine if the browser supports a Web API (`IntersectionObserver`, `Intl`).  

How to determine if a variable is defined in JavaScript? The answer is not straightforward as it seems, so let's find out!

## 1. The states of a variable

Before jumping into specific techniques to determine the variable's existence, I'd like to have an agreement about the terms I'm going to use. 

In the following 2 sections, I'll make clear what it means for a variable to be "defined"/"not defined" and "initialized"/"uninitialized".  

### 1.1 Defined / not defined variable

A variable is *defined* when there is a name binding available in the current scope.  

Examples of *defined variables*:

```javascript
const pi = 3.14; // pi is defined
let result;      // result is defined

window.message = 'Hello';
message;         // message is defined
```

Contrary, a variable is *not defined* when there is no name binding available in the current scope.   

Examples of *non defined variables*:

```javascript
pi;     // Throws ReferenceError: pi is not defined

if (true) {
  let result;
}
let result; // Throws ReferenceError: result is not defined
```

The space where the variable is defined is determined by the scope. A scope in JavaScript is defined by a block of code (for `const` and `let` variables) and by a function (for `const`, `let`, `var`).  

Accessing a variable that's not defined in JavaScript throws a `ReferenceError`.  

### 1.2 Initialized / uninitialized variable

A variable is *initialized* when there is a name binding available in the current scope and the variable has been assigned with an initial value.  

Examples of *initialized variables*:

```javascript
const pi = 3.14; // pi is initialized
let result;
result = 'Value'; // result is initialized
```

On the other side, a variable is *uninitialized* when there is a name binding available in the current scope and the variable has not been assigned with an initial value.  

Examples of *uninitialized variables*:

```javascript
let result; // result is uninitialized
var sum;    // result is uninitialized
```

The value of an uninitialized variable is always `undefined`:

```javascript
let result; // result is uninitialized
result; // => undefined
```

## 2. Using *typeof*

Having the possible states of variables defined, let's consider a few techniques that tell whether a variable is defined.  

As a reminder, the `typeof` operator determines the variable's value type. `typeof myVar` can evaluate to one of the values: `'boolean'`, `'number'`, `'string'`, `'object'`, `'symbol'`, and `'undefined'`.

Plus, `typeof missingVar` has a nice property: it doesn't throw a `ReferenceError` if the `missingVar` is not defined:

```javascript
// missingVar is not defined

typeof missingVar; // Doesn't throw ReferenceError

missingVar;        // Throws ReferenceError
```

That's great because you can use the expression `typeof myVar === 'undefined'` to determine if the variable is defined:

```javascript
if (typeof myVar === 'undefined') {
  // myVar is (not defined) OR (defined AND unitialized)
} else {
  // myVar is defined AND initialized
}
```

Accessing a defined but uninitialized variable evaluates to `undefined`. Thus be aware that `typeof myVar === 'undefined'` evaluates to `true` when `myVar` is *not defined*, but also when is *defined* but *uninitialized*:

```javascript
// myVar is defined and unininitialized
let myVar;
typeof myVar === 'undefined';      // => true

// missingVar is not defined
typeof missingVar === 'undefined'; // => true
```

Usually, that's not a problem. When you check if the variable is defined, you want it initialized with a payload.  

## 3. Using *try/catch*

When accessing the value of a non defined variable, JavaScript throws a reference error:

```javascript
// missingVar is not defined
missingVar; // throws "ReferenceError: missingVar is not defined"
```

So... what about wrapping the checked variable in a `try` block, and try to catch the reference error?  

```javascript
// missingVar is not defined
try {
  missingVar;
  console.log('missingVar is defined')
} catch(e) {
  e; // => ReferenceError
  console.log('missingVar is not defined');
}
// logs 'missingVar is not defined'
```

`missingVar` in the above example is not defined. When trying to access the variable in a `try` block, a `ReferenceError` error is thrown. Then `catch` block catches the reference error. That's another way to check the variable's existence.  

Of course, if the variable is defined, no reference error is thrown:

```javascript
// missingVar is defined
let existingVar;
try {
  existingVar;
  console.log('existingVar is defined')
} catch(e) {
  console.log('existingVar is not defined');
}
// logs 'existingVar is defined'
```

Compared to `typeof` approach, the `try/catch` is more precise because it determines solely if the variable is *not defined*.  

## 4. Using *window.hasOwnProperty()*

Finally, to check for the existence of global variables, you can go with a simpler approach. 


Each global variable is stored as a property on the global object (`window` in a browser environment, `global` in NodeJS). So, to determine if the global variable `myGlobalVar` is defined, simply check the global object for corresponding property existence: `window.hasOwnProperty('myGlobalVar')`.  

For example, here's how to check if the browser supports the `IntersectionObserver` API:

```javascript
if (window.hasOwnProperty('IntersectionObserver')) {
  // The browser provides IntersectionObserver
} else {
  // The browser doesn't support IntersectionObserver
}
```

`var` variables and `function` declarations when used in the top-most scope do create properties on the global object:

```javascript
// Top-most scope
var num = 19;
function greet() {
  return 'Hello!';
}

window.hasOwnProperty('num');   // => true
window.hasOwnProperty('greet'); // => true
```

However, be aware that `const` and `let` variables, as well as `class` declarations, do not create properties on the global object:

```javascript
// Top-most scope
const pi = 3.14;
let message = 'Hi!';
class MyClass {}

console.log(window.hasOwnProperty('pi'));      // => false
console.log(window.hasOwnProperty('message')); // => false
console.log(window.hasOwnProperty('MyClass')); // => false
```

## 5. Summary

In JavaScript, a variable can be defined or not defined, as well as initialized and uninitialized.  

`typeof myVar === 'undefined'` evaluates to `true` if `myVar` is not defined, but also defined and uninitialized.  

To detect if a variable is exactly defined or not &mdash; wrap the variable in a `try { myVar }` block, then catch the possible reference error in a `catch(e) {  }` block.  

Finally, if you'd like to check the existence of global variables, then invoke `window.hasOwnProperty('myVar')`. This approach fits determining if the browser supports a Web API.  

*What is your preferred way to check if a variable is defined?*
