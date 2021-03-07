---
title: 'An Easy Algorithm to Determine "this" value in JavaScript'
description: 'An universal algorithm to determine "this" value in JavaScript.'
published: "2021-03-09T12:00Z"
modified: "2021-03-09T12:00Z"
thumbnail: "./images/cover-2.png"
slug: javascript-this-algorithm
tags: ['javascript', 'this', 'function']
recommended: ['gentle-explanation-of-this-in-javascript', 'javascript-this-interview-questions']
type: post
---

A confusing aspect of JavaScript language you would probably hear often is `this` keyword.  

`this` &mdash; the function invocation conent &mdash; is confusing because it behaves differently depending on how the function is invoked.  

So, if you have hard time in determining the value of `this` keyword in a particular situation, I've created an easy algorithm for you to follow.  

While I've tried to make the algorithm as accessible as possible, I recommend reading it multiple times. Then follow the examples where the algorithm is put into practice &mdash; the examples help greatly to solidify the algorithm. Finally, try the homework examples by yourself!

Ready? Let's begin!  

## 1. *this* algorithm

**ThisValue(func)**:

The formal definition of `ThisValue(func)` that returns `this` value of an arbitrary function `func`.



1. If `func` is an *arrow function*, then  

    1. If `func` is defined in the outermost scope, then `return globalObject`
    * Else
        1. let `outerFunc` be the *outer function* of `func`  
        * `return ThisValue(outerFunc)`  

* Else if `func` is a *bound function* of an `originFunc` function, then  

    1. let `thisArg` be the argument of `func = originFunc.bind(thisArg)`  
    * `return thisArg`  

* Else if `func` is a *regular function*, then  

    1. If `func` is *invoked as a constructor*, then  

        1. let `newObject` be the newly constructed object `newObject = new func()`  
        * `return newObject`  

    * 

    * Else if `func` is *invoked as a method*, then

        1. let `owningObject` be the object upon which `func` is invoked on `owningObject.func()`
        * `return owningObject`

## 2. Examples

### 2.1 Arrow function

### 2.2 Nested arrow function

### 2.3 Regular function invocation

### 2.4 *new* objects

## 3. Summary