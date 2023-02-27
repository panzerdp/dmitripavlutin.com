---
title: "3 Ways to Check if a Variable is Defined in JavaScript"
description: "How to check if a variable is defined in JavaScript using typeof operator, try/catch blocks, or window.hasOwnProperty()."
published: "2020-11-17T09:00Z"
modified: "2020-11-17T09:00Z"
thumbnail: "./images/cover-10.png"
slug: javascript-defined-variable-checking
tags: ['javascript', 'variable', 'undefined']
recommended: ['javascript-hoisting-in-details', 'javascript-variables-and-temporal-dead-zone']
type: post
---

From time to time you have to check whether a variable is defined in JavaScript. For example, to determine if an external script has been successfully loaded into the web page, or to determine if the browser supports a Web API (`IntersectionObserver`, `Intl`).  

How to check if a variable is defined in JavaScript? The answer is not straightforward, so let's find out!

*Before I go on, let me recommend something to you.* 

*If you want to significantly improve your JavaScript knowledge, take the  amazingly useful course ["Modern JavaScript From The Beginning 2.0"](https://www.traversymedia.com/a/2147528886/FqXWyazh) by Brad Traversy. Use the coupon code "DMITRI" and get up to 20% discount!*

## 1. The states of a variable

Before jumping into specific techniques, I'd like to have an agreement on the related terms.  

In the following 2 sections, let's make clear what it means for a variable to be "defined"/"not defined" and "initialized"/"uninitialized".  

### 1.1 Defined / not defined variable

A variable is *defined* when it has been declared in the current scope using a declaration statement.  

The usual way to declarate variables is `const`, `let` and `var` statements, plus the `function` and `class` declaration statements.  

Examples of *defined variables*:

```javascript
const pi = 3.14; // pi is defined
let result;      // result is defined

window.message = 'Hello';
message;         // message is defined
```

Contrary, a variable is *not defined* when it hasn't been declared in the current scope using a declaration statement. 

Examples of *not defined variables*:

```javascript
pi;     // pi is not defined, throws ReferenceError
result; // result is not defined, throws ReferenceError

if (true) {
  // result is defined, but in this block scope
  let result;
}
```

The [scope](/javascript-scope/) sets the limits where the variable is defined and accessible. A scope in JavaScript is defined by a code block (for `const` and `let` variables) and by a function body (for `const`, `let`, `var`).  

Accessing a variable that's not defined throws a `ReferenceError`:

```javascript
// pi is not defined
pi; // throws ReferenceError
```

### 1.2 Initialized / uninitialized variable

A variable is *initialized* when the declared variable has been assigned with an initial value.  

Examples of *initialized variables*:

```javascript
const pi = 3.14;   // pi is initialized

let result;
result = 'Value'; // result is initialized
```

On the other side, a variable is *uninitialized* when the declared variable has not been assigned with an initial value.  

Examples of *uninitialized variables*:

```javascript
let result; // result is uninitialized
var sum;    // sum is uninitialized
```

The value of an uninitialized variable is always `undefined`:

```javascript
let result; // result is uninitialized

result; // => undefined
```

## 2. Using *typeof*

Knowing the possible states of variables, let's consider the techniques to find whether a variable is defined or not.  

The `typeof` operator determines the variable's type. `typeof myVar` can evaluate to one of the values: `'boolean'`, `'number'`, `'string'`, `'symbol'`, `'object'`, `'function'` and `'undefined'`.  

The expression `typeof missingVar` doesn't throw a `ReferenceError` if the `missingVar` is not defined, contrary to simple access of the not defined variable:

```javascript
// missingVar is not defined

typeof missingVar; // Doesn't throw ReferenceError

missingVar;        // Throws ReferenceError
```

That's great because you can use the expression `typeof myVar === 'undefined'` to determine if the variable is not defined:

```javascript
if (typeof myVar === 'undefined') {
  // myVar is (not defined) OR (defined AND unitialized)
} else {
  // myVar is defined AND initialized
}
```

Be aware that `typeof myVar === 'undefined'` evaluates to `true` when `myVar` is *not defined*, but also when *defined* and *uninitialized*. All because accessing a defined but uninitialized variable evaluates to `undefined`.  

```javascript
// missingVar is not defined
typeof missingVar === 'undefined'; // => true

// myVar is defined and unininitialized
let myVar;
typeof myVar === 'undefined';      // => true
```

Usually, that's not a problem. When you check if the variable is defined, you want it initialized with a payload too.  

Of course, if the variable is defined and has a value, `typeof myVar === 'undefined'` evaluates to `false`:

```javascript
const myVar = 42;

typeof myVar === 'undefined'; // => false
```

## 3. Using *try/catch*

When accessing a not defined variable, JavaScript throws a reference error:

```javascript
// missingVar is not defined
missingVar; // throws "ReferenceError: missingVar is not defined"
```

So... what about wrapping the checked variable in a `try` block, and try to catch the reference error? If the error is caught, that would mean that the variable is not defined:  

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

`missingVar` in the above example is not defined. When trying to access the variable in a `try` block, a `ReferenceError` error is thrown and `catch` block catches this reference error. That's another way to check the variable's existence.  

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

Compared to `typeof` approach, the `try/catch` is more precise because it determines solely if the variable is *not defined*, despite being initialized or uninitialized.    

## 4. Using *window.hasOwnProperty()*

Finally, to check for the existence of global variables, you can go with a simpler approach. 

Each global variable is stored as a property on the global object (`window` in a browser environment, `global` in NodeJS). You can use this idea to determine if the global variable `myGlobalVar` is defined: simply check the global object for corresponding property existence: `window.hasOwnProperty('myGlobalVar')`.  

For example, here's how to check if the browser defines an `IntersectionObserver` variable:

```javascript
if (window.hasOwnProperty('IntersectionObserver')) {
  // The browser provides IntersectionObserver
} else {
  // The browser doesn't support IntersectionObserver
}
```

`var` variables and `function` declarations, when used in the [outermost scope](/javascript-scope/#6-global-scope) (aka global scope), do create properties on the global object:

```javascript
// Outermost scope
var num = 19;
function greet() {
  return 'Hello!';
}

window.hasOwnProperty('num');   // => true
window.hasOwnProperty('greet'); // => true
```

However, be aware that `const` and `let` variables, as well as `class` declarations, do not create properties on the global object:

```javascript
// Outermost scope
const pi = 3.14;
let message = 'Hi!';
class MyClass {}

window.hasOwnProperty('pi');      // => false
window.hasOwnProperty('message'); // => false
window.hasOwnProperty('MyClass'); // => false
```

## 5. Summary

In JavaScript, a variable can be either defined or not defined, as well as initialized or uninitialized.  

`typeof myVar === 'undefined'` evaluates to `true` if `myVar` is not defined, but also defined and uninitialized. That's a quick way to determine if a variable is defined.   

Another approach is to wrap the variable in a `try { myVar }` block, then catch the possible reference error in a `catch(e) {  }` block. If you've caught a `ReferenceError`, then the variable is not defined.  

Finally, to check the existence of a global variable `myGlobalVar` invoke `window.hasOwnProperty('myGlobalVar')`. This approach is useful to check if the browser supports a Web API.  

*What is your preferred way to check if a variable is defined?*
