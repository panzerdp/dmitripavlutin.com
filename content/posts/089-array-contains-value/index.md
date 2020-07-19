---
title: "Checking if an Array Contains a Value in JavaScript"
description: "Checking if an Array Contains a Value in JavaScript"
published: "2020-07-14T07:10Z"
modified: "2020-07-14T07:10Z"
thumbnail: "./images/cover-3.png"
slug: javascript-array-contains-value
tags: ['javascript', 'event delegation']
recommended: ['simple-explanation-of-javascript-closures', 'simple-but-tricky-javascript-interview-questions']
type: post
commentsThreadId: javascript-array-contains-value
---

JavaScript offers a bunch of useful array methods to to check whether an array contains a particular value.  

While searching for primitive values like numbers and strings is easy, searching for objects is slightly more complicated.  

In this post, you will read about how to determine if an array contains a particular value, being a primitive or object.  

## 1. Array contains a primitive value

A primitive value in JavaScript is a string, number, boolean, symbol, and special value `undefined`.  

The easiest way to determine if an array contains a primitive value is to use `array.includes(value)` array method.  

This method accepts the following arguments:

```javascript
const hasValue = array.includes(value[, fromIndex]);
```

The fist argument `value` is the value to search for in array. The second, optional, argument `fromIndex` is the index from where to start searching. Finally, the method returns a boolean indicating whether `value` has been found.  

For example, let's search determine whether an array of greetings contains the values `'hi'` and `'hey'`:

```javascript
const greetings = ['hello', 'hi'];

greetings.includes('hi');  // => true
greetings.includes('hey'); // => false
```

`greetings.includes('hi')` returns `true` because the array contains `'hi'` item.  

At the same time, `greetings.includes('hey')` correctly returns `false`, denoting that `'hey'` is missing in the `greetings` array.  



## 2. Array contains an object

### 2.1 Shallow check

### 2.2 Deep check

## 3. Summary