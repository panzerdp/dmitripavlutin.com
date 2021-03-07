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

The formal definition of `ThisValue(func)` that returns `this` value of an arbitrary invoked function `func`.

**ThisValueOfFunction(func)**:

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

    * Else if `func` is *invoked indirectly*, then
        
        1. let `thisArg` be the argument of `func.call(thisArg)` or `func.apply(thisArg)`
        * `return thisArg`

    * Else if `func` is *invoked as a method*, then

        1. let `owningObject` be the object upon which `func` is invoked on `owningObject.func()`
        * `return owningObject`

    * Else if `func` is *simply invoked*, then
        1. if *strict mode* is enabled, then `return undefined`
        * else `return globalObject`

### 2.1 Defining the terms

The algorithm uses a plenty of JavaScript terms. 

A) *An arrow function* is a function defined using the fat arrow syntax `=>`. Example of an arrow function:

```javascript
const sum = (number1, number2) => {
  return number1 + number2;
}
```

B) *A bound function* is a function created from invoking the method `originalFunc.bind(thisArg, arg1, ..., argN)` upon an original function. Example of a bound function:

```javascript
function originalFunction() {
  console.log(this); // logs { prop: 'Value' }
}

const boundFunction = originalFunction.bind({ prop: 'Value' });
```

C) *A regular function* is a simple function being defined using `function` keyword or using a shorthand definition on an object. Examples of regular functions:

```javascript
function regularFunction(who) {
  return `Hello, ${who}!`;
}

const object = {
  anotherRegularFunction(who) {
    return `Good bye, ${who}!`
  }
}
```

## 3. Examples

### Example 1

### Example 2

### Example 3

## 4. Homework

### Exersize 1

### Exersize 2

### Exersize 3

## 5. Summary