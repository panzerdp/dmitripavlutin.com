---
title: '5 Ways to Merge Arrays in JavaScript'
description: "How to merge arrays in JavaScript using spread operator, array.concat() and other approaches."
published: "2021-04-06T12:00Z"
modified: "2021-04-06T12:00Z"
thumbnail: "./images/cover-2.png"
slug: javascript-merge-arrays
tags: ['javascript', 'array']
recommended: ['javascript-array-sort-numbers', 'operations-on-arrays-javascript']
type: post
---

The array is a data structure that holds an ordered collection of items indexed by a number &mdash; the index.  

```javascript
// Example of an array
const numbers = [4, 8];

// Access elements by index
const index = 1;
numbers[index]; // => 1
```

The common operations you can perform on a single array are accessing an item by index, querying the array length, pushing a new item, etc. These are the operations performed on a single array.  

On top of that there are operations that can be perform on multiple arrays. One of such common operations is *merge* &mdash; when 2 or more arrays are merged to form a bigger array containing all the items of the merged smaller arrays.  

For example, having two arrays `[1, 2]` and `[5, 6]`, then merging these arrays will result in `[1, 2, 5, 6]`.  

