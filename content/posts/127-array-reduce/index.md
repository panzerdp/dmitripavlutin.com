---
title: 'How to Use Array Reduce Method in JavaScript'
description: "How to use array.reduce() method in JavaScript"
published: "2021-04-13T12:00Z"
modified: "2021-04-13T12:00Z"
thumbnail: "./images/cover-3.png"
slug: javascript-array-reduce
tags: ['javascript', 'reduce']
recommended: ['javascript-merge-arrays', 'operations-on-arrays-javascript']
type: post
---

Let's say you have an array of numbers:

```javascript
const numbers = [1, 2, 4, 6];
```

How would you easily sum these numbers, but having the sum logic reusable?  

Thanks to the `array.reduce()` method of JavaScript, you can easily do that:

```javascript
const numbers = [1, 2, 4, 6];

const sum = numbers.reduce(function(sum, number) {
  const updatedSum = sum + number;
  return updatedSum;
}, 0);

sum; // 12
```

In this post, you will learn about what the reduce operation means, and how use `array.reduce(callback, initialValue)` method in JavaScript to perform the reduce operation on arrays.  

## 1. Reduce operation

Before diving into the actual detail of how to use the `array.reduce()` method, let's find distinguish what problem it tries to solve: reducing to a value.  

Reducing of an array meaning performing a concrete accumulative operation on its items to calculate a resulted value.  

The simplest example of reduce operation is calculating the sum of an array, where the accumulative operation is addition. The resulted value of sum reduce operation equals to sum of all the numbers in the array.  

For an array like `[1, 2, 4, 6]` the sum reduce operation results in `12` &mdash; the sum of all items.  

Another example of reduce operation would be calculating the maximum element of the array. For an array like `[1, 2, 4, 6]` the max reduce operation results in `6`.  

Having a good view of what reduce operation means  &mdash; now you can easily see what `array.reduce()` method does.  

## 2. array.reduce() method

The `array.reduce()` accepts 2 arguments:

```javascript
const value = array.reduce(callback[, initialValue]);
```

The `callback` is an obligatory argument which is a function that perform the reduce operation, which the second optional argument is the initial value. 

When running the reduce method, JavaScript invokes the reduce `callback` with 4 arguments: the accumulator value, the current array item, the current array item index, and the array itself. The `callback` function must return a new accumulator value.  

```javascript
array.reduce(function(accumulator, item, index, array) {
  // Use `accumulator` and `item` 
  // to calculate `updatedAccumulator`...
  return updatedAccumulator;
})
```

For example, let's get back to the code from the introduction:  

```javascript
const numbers = [1, 2, 4, 6];

const sum = numbers.reduce(function summarize(sum, number) {
  const updatedSum = sum + number;
  return updatedSum;
}, 0);

sum; // 12
```

The `numbers.reduce(summarize, 0)` calculates the sum of all elements in the array.  

For every item in the array, the `summarize` callback is invoked with the current sum of numbers and the iterated `number`. What's important is that the callback uses the current accumulated sum, adds to it the current number, then returns the updated sum. 

That's how reducing of the array to a value works.  

Also note the second argument of `numbers.reduce(summarize, 0)` &mdash; the sum of array items is initializes with `0`.  

*Side challenge: how would you use `array.reduce()` method to find the maximum value of the array? Write your solution in a comment below!*

## 3. Omitting initial value argument



## 4. Conclusion