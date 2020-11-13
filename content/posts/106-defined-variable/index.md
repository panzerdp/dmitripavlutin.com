---
title: "Checking if a Variable is Defined in JavaScript (Not Easy as It Seems!)"
description: "How to check if a variable is defined in JavaScript."
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

### 1.1 Defined variable

A variable is considered *defined* when there is a name binding available in the current scope.  

Examples of *defined* variables:

```javascript
const pi = 3.14; // pi is "defined"
let result;    // result is "defined"

window.message = 'Hello';
message;      // message is "defined"
```

### 1.2 Not defined variable

A variable is considered *not defined* when there is no name binding available in the current scope.   

Examples of *not defined* variables:

```javascript
pi;     // Throws ReferenceError: pi is "not defined"

if (true) {
  let result;
}
let result; // Throws ReferenceError: result is "not defined"
```

Here's a good criteria of determining whether a variable is not defined: JavaScript always throws a `ReferenceError` if you try to access a *not defined* variable.  

### 1.3 Initialized variable

A variable is considered *initialized* when there is a name binding available in the current scope and the variable has been assigned with an initial value.  


### 1.4 Uninitialized variable

## 2. *typeof*

## 3. *try/catch*

## 4. Global variables case

## 5. Summary

