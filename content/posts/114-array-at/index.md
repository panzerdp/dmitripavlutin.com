---
title: "The New Array Method You'll Enjoy: array.at()"
description: "array.at() method let's you access the array element at specific index"
published: "2021-01-12T12:00Z"
modified: "2021-01-12T12:00Z"
thumbnail: "./images/cover-2.png"
slug: javascript-array-at
tags: ['javascript', 'array']
recommended: ['operations-on-arrays-javascript', 'javascript-array-contains-value']
type: post
---

## 1. The problem of the regular way to access items

Alongside with the plain JavaScript object, the array is probably one of the most popular data structure. 

A widely used operation on array is the access of an element of the array by index:

```javascript
const fruits = ['orange', 'apple', 'banana', 'grape'];

const item = fruits[1];
item; // => 'apple'
```

The expression `array[index]` is named *property accessor*, which evaluates to the array item located at `index`.  

But sometimes I'd like to access the array elements indexed from the tail. For example, to access the latest element of the array I have to use the
construction:

```javascript
const fruits = ['orange', 'apple', 'banana', 'grape'];

const latestItem = fruits[fruits.length - 1];
latestItem; // => 'grape'
```

`fruits[fruits.length - 1]` is the way you can access the latest element of the array. `fruits.length - 1` is the index of the latest element of the array.  

The array accessor doesn't allow a straigfoward way to access items from the tail of the array.  

Fortuantely, a new proposal (at stage 3 as of January 2021) brings the method `at()` to arrays, and it can solve many limitations of the array accessor.  

## 2. array.at() method

`array.at(index)` accesses the element at `index` argument.  

If `index` argument is a positive integer, the method returns the item at that index:

```javascript
const fruits = ['orange', 'apple', 'banana', 'grape'];

const item = fruits.at(1);
item; // => 'apple'
```

If `index` argument is equal or bigger than the array length, then, like the regular accessor, the method returns `undefined`:

```javascript
const fruits = ['orange', 'apple', 'banana', 'grape'];

const item = fruits.at(999);
item; // => undefined
```

The real magic happens when you use a negative index for `array.at()` method. For example, let's use the index `-1` to access the latest element of 
the array:

```javascript
const fruits = ['orange', 'apple', 'banana', 'grape'];

const latestItem = fruits.at(-1);
latestItem; // => 'grape'
```

When using a negative index, the `array.at()` is going to look for items from the tail of the array. 

If `negIndex` is a negative index used as an argument on `array.at(negIndex)`, then the method accesses 
the element at index `array.length + negIndex`. Here's an example:

```javascript
const fruits = ['orange', 'apple', 'banana', 'grape'];

const negIndex = -2;

fruits.at(negIndex);              // => 'banana'
fruits[fruits.length + negIndex]; // => 'banana'
```

## 3. Summary

The array accessor syntax in JavaScript is the usual and good way to access items of arrays. Just put the index variable in square brakets `array[index]`,
and get the array item value at that index.  

In some cases, however, to access the array item from the tail (use a negative index) using the regular accessor isn't convinient since regular accessor doesn't access negative indexes. So, for example, to access the latest element of the array you have to use a long expression: `array[array.length - 1]`.

Fortuantely, the new array method `array.at(index)` lets you access the array elements by index as a regular accessor. What's better, `array.at(index)` also accepts negative indexes, in which case the method access the elements from the tail.  

Just include the [array.prototype.at](https://github.com/es-shims/Array.prototype.at) polyfill into your application, and start using `array.at()` today!