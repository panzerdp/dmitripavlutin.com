---
title: "Why Math.max() Without Arguments Returns -Infinity"
description: "What is the reason that Math.max() utility function when being called without arguments returns -Infinity."
published: "2021-05-18T12:00Z"
modified: "2021-05-18T12:00Z"
thumbnail: "./images/cover-2.png"
slug: javascript-math-max-infinity
tags: ['javascript', 'number']
recommended: ['infinity-in-javascript', 'nan-in-javascript']
type: post
---

`Math.max()` is a built-in JavaScript utility function that determines the maximum number from the numbers specified as arguments.  

For example, let's determine the maximum of the numbers `1`, `2` and `3`:

```javascript
Math.max(1, 2, 3); // => 3
```

As expected, `3` is the maximum of `1`, `2` and `3`.  

What would happen if `Math.max()` is invoked with just one argument:

```javascript
Math.max(1); // => 1
```

As expected, the maximum of one number is the number itself.  

But what would happen if you invoke `Math.max()` without arguments at all?  

```javascript
Math.max(); // => -Infinity
```

While it might be unexpected at first, but calling `Math.max()` without arguments returns `-Infinity`. Let's find out why it happens, 
and why it's important to happen that way.  

## 1. Max of max of arrays

First, it worth noting that `Math.max()` accepts multiple arguments, and from that multiple argument the maximum number is returned.  

So, if you want to determine the maximum number of an array, then you can use the [spread arguments operator](/how-three-dots-changed-javascript/#3-improved-function-call) on the array:

```javascript
const numbers1 = [1, 2, 3];

Math.max(...numbers1); // => 3
```

`Math.max(...numbers1)` expressions uses the spread syntax and returns the maximum number of `numbers1` array.  

