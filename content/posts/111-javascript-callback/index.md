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

Having a person's name, how can you create a message to greet that person?  

The simplest, yet not the most reusable, is to use 2 variables. One variable contains the person's `name`, the other variable
the constructed `message`:

```javascript
let name = 'Cristina';

let message = `Hello, ${name}`;
message; // => 'Hello, Cristina!'
```

The problem with the above code is the reuse difficulty: what if you'd like to use the greeting logic in multiple places? A function can help!

Let's create a function `greet` that accepts `person` as an argument. This function returns the message:

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
message;
// => ['Hello, Cristina!', 'Hello, Ana!'] 
```

What is so interesting about the invocation `persons.map(greet)`? Let's look closer.  

First of all, `persons.map(greet)` method of array instance accepts function as an argument! 

## 2. The synchronous callback

## 3. The asynchornous callback

## 4. Summary