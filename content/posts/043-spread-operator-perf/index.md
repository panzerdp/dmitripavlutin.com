---
title: How To Accelerate the JavaScript Spread Operator
description: How To Accelerate the JavaScript Spread Operator
published: "2019-09-03T13:00Z"
modified: "2019-09-03T13:00Z"
thumbnail: "./images/powerboat.jpg"
slug: javascript-spread-operator-performance-optimization
tags: ["javascript", "spread", "performance"]
recommended: ["how-three-dots-changed-javascript", "object-rest-spread-properties-javascript"]
type: post
commentsThreadId: javascript-spread-operator-performance
---

Let's start with a short intoduction on how [spread operator](how-three-dots-changed-javascript/#41-array-construction) works in array literals. 

The spread operator, or three dots, takes an array or generally an iterable `[...arrayOrIterable]` and slices it into pieces. Then the array literal uses these pieces to construct a new array.  

The spread operator can be placed in any position inside the array literal:

```javascript
const numbers = [1, 2, 3];
[10, ...numbers]; // => [10, 1, 2, 3]
[...numbers, 10]; // => [1, 2, 3, 10]
```

This way the spread operator can do the operations:

* *Append to head*: `[10, ...numbers]`
* *Append to tail*: `[...numbers, 10]`

Now comes the interesting question. What performs faster: appending to head or to tail?  

## 1. Append to head and to tail functions

Before starting the performance comparisons, let's define two functions.

The first one is `appendToHead()`:  

```javascript
function appendToHead(item, array) {
  return [item, ...array];
}

const numbers = [1, 2, 3];
appendToHead(10, numbers); // => [10, 1, 2, 3]
```

As you might expect, `appendToHead()` is a pure function that returns a new array where the item is appended to the head of the original array.  

The second `appendToTail()`:

```javascript
function appendToTail(item, array) {
  return [...array, item];
}

const numbers = [1, 2, 3];
appendToTail(10, numbers); // => [1, 2, 3, 10]
```

`appendToTail()` inserts the item at the end of array.  

Having these functions defined, let's compare them in some interesting performance checks.  

## 2. Firefox and Safari performance checks

## 3. Chrome performance check

## 4. The fast path optimization

## 5. Conclusion



*What interesting performance optimizations in JavaScript do you know?*  