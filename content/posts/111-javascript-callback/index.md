---
title: "What is a Callback Function in JavaScript?"
description: "The callback is a function that's accepted as an argument and executed by another function (the higher-order function)."
published: "2020-12-22T12:00Z"
modified: "2020-12-22T12:00Z"
thumbnail: "./images/cover-2.png"
slug: javascript-callback
tags: ['javascript', 'function']
recommended: ['6-ways-to-declare-javascript-functions', 'javascript-arrow-functions']
type: post
---

The callback function is one of those concepts that every JavaScript developer should know. Callbacks mechanism is used in arrays, timer functions, promises, event handlers, and more.    

In this post, I will explain the concept of a callback function. Also I'll help you distinguish the 2 types of callbacks: synchronous and asynchronous.

## 1. The callback function

How can you compose a message to greet a person?  

The simplest (yet not the most reusable) way is to use 2 variables. One variable contains the person's `name`, the other variable
the constructed `message`:

```javascript
let name = 'Cristina';

let message = `Hello, ${name}`;
message; // => 'Hello, Cristina!'
```

A problem with the above code is the reuse difficulty: what if you want to reuse the greeting logic in multiple places? A function can help!

Let's create a function `greet(person)` that accepts a `person` argument. The should return the greeting message:

```javascript
function greet(person) {
  return `Hello, ${name}`;
}

greet('Cristina'); // => 'Hello, Cristina!'
```

What about greeting a list of persons? That's possible using a special array method  `array.map()`:

```javascript
const persons = ['Cristina', 'Ana'];

const messages = persons.map(greet);
messages; // => ['Hello, Cristina!', 'Hello, Ana!'] 
```

`persons.map(greet)` takes each item of the `persons` array, an invokes the function `greet()` with each item as an argument: `greet('Cristina')`, `greet('Ana')`.  

What's interesting is that `persons.map(greet)` method accepts `greet` function as an argument. Doing so makes the `greet()` a *callback function*.  

The `persons.map(callbackFunc)` is a function that accepts another function as an argument, thus is named a *higher-order function*.  

> A *higher-order function* accepts a *callback function* as an argument and invokes ("calls back") the callback function to perform an operation.  

You can always write  by yourself higher-order functions that use callbacks. For example, here's an equivalent version the `array.map()` method:

```javascript{5}
function map(array, callback) {
  const mappedArray = [];
  for (const item of array) { 
    mappedArray.push(
      callback(item)
    );
  }
  return mappedArray;
}

function greet(person) {
  return `Hello, ${name}`;
}

const persons = ['Cristina', 'Ana'];

const messages = map(persons, greet);
messages; // => ['Hello, Cristina!', 'Hello, Ana!'] 
```

`map(array, callback)` is a higher-order function since it accepts a callback function as an argument, and then inside of its body invokes that callback function: `callback(item)`.  

## 2. The synchronous callback

The callback functions are divided into 2 types: *synchronous* and *asynchronous* callbacks.  

> The *synchronous callback* is executed *during* the execution of the higher-order function that invokes the callback.  

For example, recall the `map()` and `greet()` functions.  

```javascript
function map(array, callback) {
  console.log('map() starts');
  const mappedArray = [];
  for (const item of array) { mappedArray.push(callback(item)) }
  console.log('map() completed');
  return mappedArray;
}

function greet(person) {
  console.log('greet() called');
  return `Hello, ${name}`;
}

const persons = ['Cristina'];

map(persons, greet);
// logs 'map() starts'
// logs 'greet() called'
// logs 'map() completed'
```

Try the [demo](https://jsitor.com/MZVUzLzql).  

`greet()` is a synchronous callback because it's being executed at the same time as the higher-order function `map()`.  

The synchronous way to invoke the callbacks:  

1. The higher-order function starts execution: `'map() starts'`
* The higher-order calls the callback function: `'greet() called'`
* Finally, the higher-order function completes its execution: `'map() completed'`  

### 2.1 Examples of synchronous callbacks

A lot of methods of native JavaScript types use synchornous callbacks. 

The most used ones are the [array methods](/operations-on-arrays-javascript/) like `array.map(callback)`, `array.forEach(callback)`, `array.find(callback)`, `array.filter(callback)`, `array.reduce(callback, init)`:  

```javascript{5,13,20}
// Examples of synchronous callbacks on arrays
const persons = ['Ana', 'Elena'];

persons.forEach(
  function callback(person) {
    console.log(person);
  }
);
// logs 'Ana'
// logs 'Elena'

const containsAna = persons.find(
  function callback(person) {
    return person === 'Ana';
  }
);
containsAna; // => true

const namesStartingA = persons.reduce(
  function callback(count, person) {
    const startsA = person[0].toLowerCase() === 'a';
    return startsA ? count + 1 : count;
  }, 
  0
);
namesStartingA; // => 1
```

## 3. The asynchronous callback

> The *asynchronous callback* is executed at a *later* time than the execution of the higher-order function.  

A good example of asynchronous callbacks is the timer function `setTimeout(callback, time)`. It invokes the `callback` after `time` milliseconds have passed.  

In the following example the `later` function is executed after 2 seconds:

```javascript
console.log('setTimeout() starts');
setTimeout(function later() {
  console.log('later() called');
}, 2000);
console.log('setTimeout() completed');

// logs 'setTimeout() starts'
// logs 'setTimeout() completed'
// logs 'later() called' (after 2 seconds)
```

Try the [demo](https://jsitor.com/MhhozrnIj).  

`later()` is an asynchornous callback because `setTimeout(later, 2000)` starts and completes its execution, but the `later()` is executed only after 2 seconds.  

The asynchronous way to invoke the callbacks:

1. The higher-order function starts execution: `'setTimeout() starts'`
2. The higher-order function completes its execution: `'setTimeout() completed'`
3. The higher-order function executes the callback after 2 seconds: `'later() called'`

## 4. Summary

The callback is a function that's accepted as an argument and executed by another function (the higher-order function).  

There are 2 kinds of callback functions: synchronous and asynchronous.  

The synchronous callbacks are executed at the same time as the higher-order function that uses the callback. 

On the other side, the asynchronous callbacks are executed at a later time than the higher-order function that uses it.  