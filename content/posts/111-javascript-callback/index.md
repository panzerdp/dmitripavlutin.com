---
title: "What is a Callback Function in JavaScript?"
description: "What is a Callback Function in JavaScript?"
published: "2020-12-22T12:00Z"
modified: "2020-12-22T12:00Z"
thumbnail: "./images/cover.png"
slug: javascript-callback
tags: ['javascript', 'function']
recommended: ['6-ways-to-declare-javascript-functions', 'javascript-arrow-functions']
type: post
---

## 1. The callback function

Having a person's name, how can you create a message to greet the person?  

The simplest, yet not the most reusable, is to use 2 variables. One variable contains the person's `name`, the other variable
the constructed `message`:

```javascript
let name = 'Cristina';

let message = `Hello, ${name}`;
message; // => 'Hello, Cristina!'
```

The problem with the above code is the reuse difficulty: what if you'd like to use the greeting logic in multiple places? A function can help!

Let's create a function `greet()` that accepts `person` as an argument. This function returns the message:

```javascript
function greet(person) {
  return `Hello, ${name}`;
}

greet('Cristina'); // => 'Hello, Cristina!'
```

What about greeting an entire array of persons? That's also possible using the special method `array.map()`:

```javascript
const persons = ['Cristina', 'Ana'];

const messages = persons.map(greet);
messages; // => ['Hello, Cristina!', 'Hello, Ana!'] 
```

`persons.map(greet)` invokes `greet(person)` function by using each person from the array as an argument.  

`persons.map(greet)` method accepts `greet` function as an argument. Doing so makes the `greet` a *callback function*.  

A function that accepts a another function as an arguments or returns a function is named *higher order function*.  

> A *higher order function* accepts a *callback function* as an argument and invokes ("calls back") the callback function to perform an operation.  

In the examples above, `persons.map(greet)` method is a higher order function that uses `greet()` callback function to map persons to greeting messages.  

You can always write higher order functions that use callbacks by yourself. For example, here's an equivalent version that maps items of an array:

```javascript
function map(array, callback) {
  const mappedArray = [];
  for (const item of array) { mappedArray.push(callback(item)) }
  return mappedArray;
}

function greet(person) {
  return `Hello, ${name}`;
}

const persons = ['Cristina', 'Ana'];

const messages = map(persons, greet);
messages; // => ['Hello, Cristina!', 'Hello, Ana!'] 
```

`map(array, callback)` is a higher order function because it accepts a callback function as an argument, and then inside of its body invokes the callback function: `callback(item)`.  

## 2. The synchronous callback

The way callback functions are used can be divided into 2 categories: synchornous and asynchornous callbacks.  

The synchornous callback is executed during the execution of the higher order function that uses it.  

For example, recall the `map()` and `greet()` functions.  

```javascript
function map(array, callback) {
  console.log('map() started');
  const mappedArray = [];
  for (const item of array) { mappedArray.push(callback(item)) }
  console.log('map() completed');
  return mappedArray;
}

function greet(person) {
  console.log('greet() called');
  return `Hello, ${name}`;
}

const persons = ['Cristina', 'Ana'];

map(persons, greet);
// logs 'map() starts'
// logs 'greet() called'
// logs 'greet() called'
// logs 'map() completed'
```

Feel free to check the [demo](https://jsitor.com/MZVUzLzql).  

`greet()` here is a synchornous callback because its being executed at the same time as the higher order function `map()`.  

The synchornous way to invoke the callbacks:  

1. The higher order function starts execution
* The higher order calls a few times the callback function 
* Finally, the higher order function completes its execution.  

## 3. The asynchornous callback

The asynchonous callback, on the contrary to synchronous, is executed at a time after the execution of higher order function that uses it.  

A good example of asynchronous callbacks are the timer functions: `setTimeout(callback, time)` is a function that invokes the `callback` after `time` milliseconds have passed.  

In the following example the `callback` function is executed after 2 seconds:

```javascript
console.log('setTimeout() starts');
setTimeout(function callback() {
  console.log('callback() called');
}, 2000);
console.log('setTimeout() completed');

// logs 'setTimeout() starts'
// logs 'setTimeout() completed'
// logs 'callback() called' (after 2 seconds)
```

This time `callback()` is asynchornous because `setTimeout(callback)` is starts and completes, however the `callback()` is executed only after 2 seconds.  

The asynchornous way to invoke the callbacks:

1. The higher order function starts execution
2. The higher order function completes its execution
3. The higher order function executes the callback at a later time (due to an event, passed timeout)

## 4. Summary

The callback is a function that's accepted as an argument and executed by another function (also labeled the higher order function).  

There are 2 kinds of callback functions: synchornous and asynchornous.  

The synchornous callbacks are executed at the same time as the higher order function that uses the callback. 

On the other side, the asynchornous callbacks are executed at a later time than the higher order function that uses it.  