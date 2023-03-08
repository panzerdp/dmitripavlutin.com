---
title: "The New Array Method You'll Enjoy: array.at(index)"
description: "array.at(index) method in JavaScript accesses array items at positive and (finally!) at negative indexes."
published: "2021-01-12T09:00Z"
modified: "2021-01-13T17:00Z"
thumbnail: "./images/cover-3.png"
slug: javascript-array-at
tags: ['javascript', 'array']
recommended: ['operations-on-arrays-javascript', 'javascript-array-contains-value']
type: post
---

Alongside the plain object, the array is a widely used data structure in JavaScript. And a widely used operation on arrays is accessing elements by index.  

In this post, I'm going to present the new array method `array.at(index)`.    

The main benefit of the new method is accessing elements from the end of the array using a negative index, which isn't possible using the regular square brackets syntax `array[index]`.  

<Affiliate type="traversyJavaScript" />

## 1. The limitation of the square brackets syntax

The usual way to access an array element by index is the use of square brackets `array[index]`:

```javascript
const fruits = ['orange', 'apple', 'banana', 'grape'];

const item = fruits[1];
item; // => 'apple'
```

The expression `array[index]` evaluates to the array item located at `index` and is named *property accessor*. As you may already know, array indexing in JavaScript starts at `0`.  

In most cases, the square brackets syntax is a good way to access items by a positive index (`>= 0`). It has a simple and readable syntax.  

But sometimes you'd like to access the elements from the end, rather than from the beginning. For example, let's access the last element of the array:

```javascript
const fruits = ['orange', 'apple', 'banana', 'grape'];

const lastItem = fruits[fruits.length - 1];
lastItem; // => 'grape'
```

`fruits[fruits.length - 1]` is how you can access the last element of the array, where `fruits.length - 1` is the index of the last element.  

The difficulty is that the square brackets accessor doesn't allow a straightforward way to access items from the end of the array, and also doesn't accept a negative index.  

Fortunately, [a new proposal](https://github.com/tc39/proposal-relative-indexing-method) (at stage 3 as of January 2021) brings the method `at()` to arrays (as well to typed arrays and strings), and solves many limitations of the square brackets accessor.  

## 2. array.at() method

In simple words, `array.at(index)` accesses the element at `index` argument.  

If `index` argument is a positive integer `>= 0`, the method returns the item at that index:

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

The real magic happens when you use a negative index with `array.at()` method &mdash; then the element is accessed from the end of the array. 

For example, let's use the index `-1` to access the last element of 
the array:

```javascript
const fruits = ['orange', 'apple', 'banana', 'grape'];

const lastItem = fruits.at(-1);
lastItem; // => 'grape'
```

Here's a more detailed example of how `array.at()` method accesses elements:

```javascript
const vegetables = ['potatoe', 'tomatoe', 'onion'];

vegetables.at(0); // => 'potatoe'
vegetables.at(1); // => 'tomatoe'
vegetables.at(2); // => 'onion'
vegetables.at(3); // => undefined

vegetables.at(-1); // => 'onion'
vegetables.at(-2); // => 'tomatoe'
vegetables.at(-3); // => 'potatoe'
vegetables.at(-4); // => undefined
```

Check out the [demo](https://codesandbox.io/s/array-at-method-2xr74?file=/src/index.js).

If `negIndex` is a negative index `< 0`, then `array.at(negIndex)` accesses 
the element at index `array.length + negIndex`. Here's an example:

```javascript
const fruits = ['orange', 'apple', 'banana', 'grape'];

const negIndex = -2;

fruits.at(negIndex);              // => 'banana'
fruits[fruits.length + negIndex]; // => 'banana'
```

## 3. Summary

The square brackets syntax in JavaScript is the usual and good way to access items by index. Just put the index expression in square brackets `array[index]`,
and get the array item at that index.  

However, accessing items from the end using the regular accessor isn't convenient since it doesn't accept negative indexes. So, for example, to access the last element of the array you have to use a workaround expression: 

```javascript
const lastItem = array[array.length - 1];
```

Fortunately, the new array method `array.at(index)` lets you access the array elements by index as a regular accessor. Moreover, `array.at(index)` accepts negative indexes, in which case the method takes elements from the end: 

```javascript
const lastItem = array.at(-1);
```

Just include the [array.prototype.at](https://github.com/es-shims/Array.prototype.at) polyfill into your application, and start using `array.at()` today!

Where to go next? Find out how to [Check if an Array Contains a Value in JavaScript](/javascript-array-contains-value/).
