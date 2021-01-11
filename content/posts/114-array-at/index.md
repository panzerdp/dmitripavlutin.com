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

Alongside the plain JavaScript object, the array is probably one of the most popular data structure. 

In this post, I'm going to present the new array method `array.at(index)`.  

The main benefit of the new method is the ability to access elements from the end of the array using a negative index, which isn't possible using the regular square brackets syntax `array[index]`.  

## 1. The limitation of the square brackets syntax

To access an element by index from an array in JavaScript the usual syntax is using the square brackets `array[index]`:

```javascript
const fruits = ['orange', 'apple', 'banana', 'grape'];

const item = fruits[1];
item; // => 'apple'
```

The expression `array[index]` is named *property accessor*, which evaluates to the array item located at `index`.  

In most cases, if you'd like to access the item by a positive index &mdash; the square brackets accessor is the way to go. It has a simple and readable syntax.  

But sometimes you'd like to access the array elements from the end, rather than from the beginning. For example, to access the last element of the array:

```javascript
const fruits = ['orange', 'apple', 'banana', 'grape'];

const latestItem = fruits[fruits.length - 1];
latestItem; // => 'grape'
```

`fruits[fruits.length - 1]` is how you can access the last element of the array. `fruits.length - 1` is the index of the last element of the array.  

The array accessor doesn't allow a straightforward way to access items from the end of the array, and also don't accept a negative index.     

Fortunately, [a new proposal](https://github.com/tc39/proposal-relative-indexing-method) (at stage 3 as of January 2021) brings the method `at()` to arrays (as well to typed arrays and strings), and it can solve many limitations of the array accessor.  

## 2. array.at() method

`array.at(index)` accesses the element at `index` argument.  

If `index` argument is a positive integer, the method returns the item at that index:

```javascript
const fruits = ['orange', 'apple', 'banana', 'grape'];

const item = fruits.at(1);
item; // => 'apple'
```

If `index` argument is bigger or equal than the array length, then, like the regular accessor, the method returns `undefined`:

```javascript
const fruits = ['orange', 'apple', 'banana', 'grape'];

const item = fruits.at(999);
item; // => undefined
```

The real magic happens when you use a negative index with `array.at()` method. For example, let's use the index `-1` to access the latest element of 
the array:

```javascript
const fruits = ['orange', 'apple', 'banana', 'grape'];

const lastItem = fruits.at(-1);
lastItem; // => 'grape'
```

When using a negative index, the `array.at()` looks for items from the end of the array.  

Here's a more detailed example of how `array.at()` method accesses elements:

```javascript
const vegetables = ['potatoes', 'tomatoes', 'onions'];

vegetables.at(0); // => 'potatoes'
vegetables.at(1); // => 'tomatoes'
vegetables.at(2); // => 'onions'
vegetables.at(3); // => undefined

vegetables.at(-1); // => 'onions'
vegetables.at(-2); // => 'tomatoes'
vegetables.at(-3); // => 'potatoes'
vegetables.at(-4); // => undefined
```

If `negIndex` is a negative index used as an argument on `array.at(negIndex)`, then the method accesses 
the element at index `array.length + negIndex`. Here's an example:

```javascript
const fruits = ['orange', 'apple', 'banana', 'grape'];

const negIndex = -2;

fruits.at(negIndex);              // => 'banana'
fruits[fruits.length + negIndex]; // => 'banana'
```

## 3. Summary

The square brackets syntax in JavaScript is the usual and good way to access items by index. Just put the index variable in square brackets `array[index]`,
and get the array item at that index.  

However, accessing an array item from the end using the regular accessor isn't convenient since it doesn't accept negative indexes. So, for example, to access the last element of the array you have to use a workaround expression: 

```javascript
const lastItem = array[array.length - 1];
```

Fortunately, the new array method `array.at(index)` lets you access the array elements by index as a regular accessor. Moreover, `array.at(index)` accepts negative indexes, in which case the method accesses the elements from the end.  

```javascript
const lastItem = array.at(-1);
```

Just include the [array.prototype.at](https://github.com/es-shims/Array.prototype.at) polyfill into your application, and start using `array.at()` today!