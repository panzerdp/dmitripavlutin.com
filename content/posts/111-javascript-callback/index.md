---
title: "Everything About Callback Functions in JavaScript"
description: "The callback is a function being called by another function, either synchronously or asynchronously."
published: "2020-12-22T11:40Z"
modified: "2020-12-23T19:00Z"
thumbnail: "./images/cover-4.png"
slug: javascript-callback
tags: ['javascript', 'function']
recommended: ['simple-explanation-of-javascript-closures', 'javascript-arrow-functions']
type: post
---

The callback function is one of those concepts that every JavaScript developer should know. Callbacks are used in arrays, timer functions, promises, event handlers, and much more.    

In this post, I will explain the concept of a callback function. Also, I'll help you distinguish the 2 types of callbacks: synchronous and asynchronous.  

## 1. The callback function

How can you compose a message to greet a person?  

Let's create a function `greet(name)` that accepts a `name` argument. The function should return the greeting message:

```javascript
function greet(name) {
  return `Hello, ${name}!`;
}

greet('Cristina'); // => 'Hello, Cristina!'
```

What about greeting a list of persons? That's possible using a special array method  `array.map()`:

```javascript
const persons = ['Cristina', 'Ana'];

const messages = persons.map(greet);
messages; // => ['Hello, Cristina!', 'Hello, Ana!'] 
```

`persons.map(greet)` takes each item of the `persons` array, and invokes the function `greet()` using each item as an invocation argument: `greet('Cristina')`, `greet('Ana')`.  

What's interesting is that `persons.map(greet)` method accepts `greet()` function as an argument. Doing so makes the `greet()` a *callback function*.  

The `persons.map(greet)` is a function that accepts another function as an argument, so it is named a *higher-order function*.  

> The *callback function* is supplied as an argument to a *higher-order function*  that invokes ("calls back") the callback function to perform an operation.  

What's important is that the [higher-order function](/javascript-higher-order-functions/) takes the full responsibility of invoking the callback and supplying it with the right arguments. 

In the previous example, the higher-order function `persons.map(greet)` takes the responsibility to invoke the `greet()` callback function with each item of the array as an argument: `'Cristina'` and `'Ana'`.  

That brings to an easy rule for identifying callbacks. If you've defined a function and you're not invoking it by yourself &mdash; but rather supply as an argument to another function &mdash; then you've created a callback.  

You can always write by yourself higher-order functions that use callbacks. For example, here's an equivalent version the `array.map()` method:

```javascript{4,16}
function map(array, callback) {
  const mappedArray = [];
  for (const item of array) { 
    mappedArray.push(
      callback(item)
    );
  }
  return mappedArray;
}

function greet(name) {
  return `Hello, ${name}!`;
}

const persons = ['Cristina', 'Ana'];

const messages = map(persons, greet);
messages; // => ['Hello, Cristina!', 'Hello, Ana!'] 
```

`map(array, callback)` is a higher-order function since it accepts a callback function as an argument, and then inside of its body invokes that callback function: `callback(item)`.  

Note that a regular function (defined using `function` keyword) or an arrow function (defined using the fat arrow `=>`) can equally serve as callbacks.  

## 2. The synchronous callback

There are 2 types of callbacks by the way they're invoked: *synchronous* and *asynchronous* callbacks.  

> The *synchronous callback* is executed *during* the execution of the higher-order function that uses the callback.  

In other words, the synchronous callbacks are *blocking*: the higher-order function doesn't complete its execution until the callback is done executing.

For example, recall the `map()` and `greet()` functions.  

```javascript
function map(array, callback) {
  console.log('map() starts');
  const mappedArray = [];
  for (const item of array) { mappedArray.push(callback(item)) }
  console.log('map() completed');
  return mappedArray;
}

function greet(name) {
  console.log('greet() called');
  return `Hello, ${name}!`;
}

const persons = ['Cristina'];

map(persons, greet);
// logs 'map() starts'
// logs 'greet() called'
// logs 'map() completed'
```

`greet()` is a synchronous callback because it's being executed at the same time as the higher-order function `map()`. You can try the [demo](https://jsitor.com/MZVUzLzql).

The synchronous way to invoke the callbacks:  

1. The higher-order function starts execution: `'map() starts'`
* The callback function executes: `'greet() called'`
* Finally, the higher-order function completes its execution: `'map() completed'`  

### 2.1 Examples of synchronous callbacks

A lot of methods of native JavaScript types use synchronous callbacks. 

The most used ones are the [array methods](/operations-on-arrays-javascript/) like `array.map(callback)`, `array.forEach(callback)`, `array.find(callback)`, `array.filter(callback)`, `array.reduce(callback, init)`:  

```javascript{4,12,19}
// Examples of synchronous callbacks on arrays
const persons = ['Ana', 'Elena'];

persons.forEach(
  function callback(name) {
    console.log(name);
  }
);
// logs 'Ana'
// logs 'Elena'

const nameStartingA = persons.find(
  function callback(name) {
    return name[0].toLowerCase() === 'a';
  }
);
nameStartingA; // => 'Ana'

const countStartingA = persons.reduce(
  function callback(count, name) {
    const startsA = name[0].toLowerCase() === 'a';
    return startsA ? count + 1 : count;
  }, 
  0
);
countStartingA; // => 1
```

`string.replace(callback)` method of the string type also accepts a callback that is executed synchronously:

```javascript{5}
// Examples of synchronous callbacks on strings
const person = 'Cristina';

// Replace 'i' with '1'
person.replace(/./g, 
  function(char) {
    return char.toLowerCase() === 'i' ? '1' : char;
  }
); // => 'Cr1st1na'
```

## 3. The asynchronous callback

> The *asynchronous callback* is executed *after* the execution of the higher-order function.  

Simply saying, the asynchronous callbacks are *non-blocking*: the higher-order function completes its execution without waiting for the callback. The higher-order function makes sure to execute the callback later on a certain event. 

In the following example, the `later()` function is executed with a delay of 2 seconds:

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

`later()` is an asynchronous callback because `setTimeout(later, 2000)` starts and completes its execution, but `later()` is executed after passing 2 seconds. Try the [demo](https://jsitor.com/MhhozrnIj).   

The asynchronous way to invoke the callbacks:

1. The higher-order function starts execution: `'setTimeout() starts'`
2. The higher-order function completes its execution: `'setTimeout() completed'`
3. The callback function executes after 2 seconds: `'later() called'`

### 3.1 Examples of asynchronous callbacks

The timer functions invoke the callbacks asynchronously:

```javascript
setTimeout(function later() {
  console.log('2 seconds have passed!');
}, 2000);
// After 2 seconds logs '2 seconds have passed!' 

setInterval(function repeat() {
  console.log('Every 2 seconds');
}, 2000);
// Each 2 seconds logs 'Every 2 seconds!' 
```

DOM event listeners also invoke the event handler function (a subtype of callback functions) asynchronously:

```javascript
const myButton = document.getElementById('myButton');

myButton.addEventListener('click', function handler() {
  console.log('Button clicked!');
});
// Logs 'Button clicked!' when the button is clicked
```

## 4. Asynchronous callback function vs asynchronous function

The special keyword `async` placed before the function definition creates an asynchornous function:

```javascript
async function fetchUserNames() {
  const resp = await fetch('https://api.github.com/users?per_page=5');
  const users = await resp.json();
  const names = users.map(({ login }) => login);
  console.log(names);
}
```

`fetchUserNames()` is asynchronous since it's prefixed with `async`. The function fetches `await fetch('https://api.github.com/users?per_page=5')` first 5 users from GitHub. Then extracts from the response object the JSON data: `await resp.json()`.  

The asynchronous functions are syntactic sugar on top of promises. When encountering the expression `await <promise>` (note that calling `fetch()` returns a promise), the asynchronous function pauses its execution until the promise is resolved.  

An asynchronous callback function and an asynchronous function are **different** terms.  

The asynchronous callback function is executed in a non-blocking manner by the higher-order function. But the asynchronous function pauses its execution while waiting for promises (`await <promise>`) to resolve.  

However... you can use an asynchronous function as an asynchronous callback! 

Let's make the asynchornous function `fetchUserNames()` an asynchronous callback called on button click:

```javascript
const button = document.getElementById('fetchUsersButton');

button.addEventListener('click', fetchUserNames);
```

Open the [demo](https://codesandbox.io/s/fetch-users-0jz0w?file=/index.html) and click *Fetch Users*. When the request completes, you'll see a list of users logged to the console.  

## 5. Summary

The callback is a function that's accepted as an argument and executed by another function (the higher-order function).  

There are 2 kinds of callback functions: synchronous and asynchronous.  

The synchronous callbacks are executed at the same time as the higher-order function that uses the callback. Synchronous callbacks are *blocking*.

On the other side, the asynchronous callbacks are executed at a later time than the higher-order function. Asynchronous callbacks are *non-blocking*.  

*Quiz: does `setTimeout(callback, 0)` execute the `callback` synchronously or asynchronously?*
