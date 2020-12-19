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
  const message = `Hello, ${name}`;
  return message;
}

greet('Cristina'); // => 'Hello, Cristina!'
```

What about greeting an entire array of persons? That's also possible using the special method `array.map()`:

```javascript
const persons = [
  'Cristina',
  'Ana',
];

const messages = persons.map(greet);
messages; // => ['Hello, Cristina!', 'Hello, Ana!'] 
```

`persons.map(greet)` invokes `greet(person)` function by using each person from the array as an argument.  

`persons.map(greet)` method accepts `greet` function as an argument. Doing so makes the `greet` a *callback function*.  

A function that accepts a another function as an arguments or returns a function is named *higher order function*.  

> A *higher order function* accepts a *callback function* as an argument and invokes ("calls back") the callback function to perform an operation.  

In the examples above, `persons.map(greet)` method is a higher order function that uses `greet()` callback function to map persons to greeting messages.  

You can always write higher order functions that use callbacks by yourself. For example, here's an equivalent version that maps items of an array:

```javascript{5}
function map(array, mapper) {
  const mappedArray = [];
  for (const item of array) {
    mappedArray.push(
      mapper(item)
    );
  }
  return mappedArray;
}

function greet(person) {
  const message = `Hello, ${name}`;
  return message;
}

const persons = [
  'Cristina',
  'Ana',
];

const messages = map(persons, greet);
messages; // => ['Hello, Cristina!', 'Hello, Ana!'] 
```

`map(array, mapper)` is a higher order function because it accepts a callback function as an argument, and then inside of its body invokes the callback function: `mapper(item)`.  



## 2. The synchronous callback

The way callback functions are used can be divided into 2 categories: synchornous and asynchornous callbacks.  

The synchornous callback function is executed during the execution of the higher order function that uses it.  

For example, recall the `map()` and `greet()` functions.  

## 3. The asynchornous callback

## 4. Summary