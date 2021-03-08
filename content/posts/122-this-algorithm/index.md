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

`this` &mdash; the function invocation context in JavaScript &mdash; behaves differently depending on how the function is invoked.  

So, if you have hard time in determining the value of `this` keyword in a particular situation, I've created an easy algorithm for you to follow.  

While I made the algorithm as accessible as possible, I recommend reading it multiple times and understand the terms that it uses. 

Then follow the examples where the algorithm is put into practice &mdash; the examples help greatly to solidify the algorithm. Finally, try the homework exercises by yourself!

Ready? Let's begin!  

## 1. *this* algorithm

The formal definition of `ThisValue(func)` that returns `this` value of an arbitrary invoked function `func`.

**ThisValueOfFunction(func)**:

1. If `func` is an *arrow function*, then  

    1. If `func` is defined in the *outermost scope*, then `return globalObject`
    * Else
        1. let `outerFunc` be the *outer function* of `func`  
        * `return ThisValue(outerFunc)`  

* Else if `func` is a *bound function* of an `originFunc` function, then  

    1. let `thisArg` be the argument of `func = originFunc.bind(thisArg)`  
    * `return thisArg`  

* Else if `func` is a `constructor()` method inside of a *class* `SomeClass`, then  
    
    1. let `instance` be the instance of the class `instance = new SomeClass()`
    * `return instance`

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
        1. If *strict mode* is enabled, then `return undefined`
        * Else `return globalObject`

### 2.1 Defining the terms

The algorithm uses a plenty of JavaScript terms. If you aren't familiar with something, expand and look at the explanation.  

<details>
  <summary>Arrow function</summary>

*An arrow function* is a function defined using the fat arrow syntax `=>`. Example of an arrow function:

```javascript
const sum = (number1, number2) => {
  return number1 + number2;
}
```

</details>

<details>
  <summary>Bound function</summary>

*A bound function* is a function created from invoking the method `myFunc.bind(thisArg, arg1, ..., argN)` upon a function. Example of a bound function:

```javascript
function originalFunction() {
  console.log(this); // logs { prop: 'Value' }
}

const boundFunction = originalFunction.bind({ prop: 'Value' });
```
</details>

<details>
  <summary>Regular function</summary>

*A regular function* is a simple JavaScript function being defined using `function` keyword or using a shorthand definition on an object. Examples of regular functions:

```javascript
function regularFunction(who) {
  return `Hello, ${who}!`;
}

const object = {
  anotherRegularFunction(who) {
    return `Good bye, ${who}!`
  }
};
```
</details>

<details>
  <summary>constructor()</summary>

*constructor()* is a special method inside of a `class` that initializes the class instance.


```javascript
class SomeClass() {
  constructor(prop) {
    this.prop = prop;
  }
}
```
</details>

<details>
  <summary>Outermost scope</summary>

*The outermost scope* is the top scope that doesn't have an outer scope.  

```javascript
// The outermost scope
let a = 1;

function someFunction() {
  // someFunction() scope
  // Not the outermost scope
  let b = 1;
}
```
</details>

<details>
  <summary>Global object</summary>

*The global object* is the object that always exists in the global scope. `window` is the global object in a browser environment.
</details>

<details>
  <summary></summary>

</details>

<details>
  <summary></summary>

</details>

## 3. Examples

### Example 1

### Example 2

### Example 3

## 4. Homework

### Exersize 1

### Exersize 2

### Exersize 3

## 5. Summary