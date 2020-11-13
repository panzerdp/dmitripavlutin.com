---
title: "Checking if a Variable is Defined in JavaScript"
description: "How to check correctly if a variable is defined in JavaScript using typeof operator, try/catch blocks, or window.hasOwnProperty()"
published: "2020-11-17T12:00Z"
modified: "2020-11-17T12:00Z"
thumbnail: "./images/cover-2.png"
slug: javascript-defined-variable-checking
tags: ['javascript', 'variable']
recommended: ['javascript-hoisting-in-details', 'javascript-variables-and-temporal-dead-zone']
type: post
---

Time to time you have to check whether a variable is defined in JavaScript.  

It happens when you need to determine whether a 3rd party service (like Google Analytics) or script you don't have control over has been successfully loaded into the web page, or whether the browser supports some Web API (`IntersectionObserver`, `Intl`).  

How to determine if a variable is defined in JavaScript? The answer is not straightforward as it seems, so let's find out!

## 1. The states of a variable

I'd like to have an agreement about the terms I'm going to use. The following 2 sections will make clear about what it means a variable to be "defined"/"not defined" and "initialized"/"uninitialized".  

### 1.1 Defined / not defined variable

A variable is *defined* when there is a name binding available in the current scope.  

Examples of *defined variables*:

```javascript
const pi = 3.14; // pi is "defined"
let result;      // result is "defined"

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

Be aware that `typeof myVar !== 'undefined'` evaluates to `false` when `myVar` is *not defined*, but also when `myVar` is *uninitialized*:

```javascript
// myVar is unininitialized
let myVar;
typeof myVar !== 'undefined'; // => false
```

Usually that's not a problem because when you check if the variable is defined, you'd like it to be initialized with a payload value too.  

## 3. *try/catch*

When you try to access the value of non defined variable, JavaScript throws a reference error:

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

`missingVar` in the above example is not defined. When trying to access the variable in a `try` block, a `ReferenceError` error is thrown. Then `catch` block catches the reference error.  

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

## 4. Global variables case

Finally, if you'd like to check for existance of some global variables, then you can go with a more simpler approach. Because each global variable is stored as property on the global object (`window` in a browser environment, `global` in NodeJS).  

You can use this approach to check, for example, if the browser support a certain Web API, like `IntersectionObserver`:

```javascript
// Detects if the browser supports IntersectionObserver API
window.hasOwnProperty('IntersectionObserver');
```

Be aware that `var` variables and `function` declarations when used in the topmost scope do create properties on the global object:

```javascript
var num = 19;
function greet() {
  return 'Hello!';
}

window.hasOwnProperty('num');   // => true
window.hasOwnProperty('greet'); // => true
```

But `const` and `let` variables, as well as `class` declerations, do not create properties on the global object:

```javascript
const pi = 3.14;
let message = 'Hi!';
class MyClass {}

console.log(window.hasOwnProperty('pi'));      // => false
console.log(window.hasOwnProperty('message')); // => false
console.log(window.hasOwnProperty('MyClass')); // => false
```

## 5. Summary

In JavaScript a variable can be defined or not defined, as well initialized and unitialized.  

A good way to detect if a variable is defined is to use the `typeof` operator. `typeof myVar !== 'undefined'` evaluates to `true` if `myVar` is defined and initialized.  

If you'd like to detect if a variable is solely defined, ingorining its initialized state, then you can use the idea that accessing a non defined variable throws a ReferenceError. Just wrap the potentially not defined variable in a `try { myVar }` block, then catch the possible reference error in a `catch(e) {  }` block.  

Finally, if you'd like to check the existence of some global variables, then you can simply use `window.hasOwnProperty('myVar')`. This approach is useful to check whether the browser supports a specific API.  

*What is your preferred way to check if a variable is defined?*
