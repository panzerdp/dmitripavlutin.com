---
title: "What are Higher-Order Functions in JavaScript"
description: "The higher-order functions are useful because they allow reusability of behavior."
published: "2021-10-06T12:00Z"
modified: "2021-10-06T12:00Z"
thumbnail: "./images/cover-3.png"
slug: javascript-higher-order-functions
tags: ['javascript', 'function']
recommended: ['differences-between-arrow-and-regular-functions', '6-ways-to-declare-javascript-functions']
type: post
---

The usual way you think about JavaScript functions is as reusable pieces of code that make some calculations.  

The arguments are the input data of the function, and the return value is the output. For example, here's a simple
function that sums all the provided arguments:

```js
function sumOperation(...args) {
  let sum = 0;
  for (const number of args) {
    sum = sum + number;
  }
  return sum;
}

sumAll(1, 2, 3); // => 6
```

The numbers as arguments are the input, and the function `sumOperation()` returns the sum &mdash; the output.  

