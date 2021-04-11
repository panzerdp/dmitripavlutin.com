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

const sum = numbers.reduce((sum, number) => sum + number, 0);

sum; // 12
```

In this post, you will learn about what the reduce operation means, and how use `array.reduce(callback, initialValue)` method in JavaScript to perform the reduce operation on arrays.  

## 1. Reduce operation

Before diving into the actual detail of how to use the `array.reduce()` method, let's find distinguish what problem it tries to solve: reducing to a value.  

Reducing of an array meaning performing a concrete accumulative operation on its items to calculate a resulted value.  

The simplest example of reduce operation is calculating the sum of an array, where the accumulative operation is addition. The resulted value of sum reduce operation equals to sum of all the numbers in the array.  

For an array like `[1, 2, 4, 6]` the sum reduce operation results in `12` &mdash; the sum of all items.  