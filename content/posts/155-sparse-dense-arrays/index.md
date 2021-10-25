---
title: "Sparse vs Dense Arrays in JavaScript"
description: "What's the difference between sparse and dence arrays in JavaScript"
published: "2021-10-26T12:00Z"
modified: "2021-10-26T12:00Z"
thumbnail: "./images/cover.png"
slug: javascript-sparse-dense-arrays
tags: ['javascript', 'array']
recommended: ['javascript-fill-array', 'javascript-array-from-applications']
type: post
---

Arrays in JavaScript are pretty easy to use. However, there's a nuance you should be aware about the arrays: the possible existence of holes (aka empty spaces) in arrays.  

In this post, I'm going to describe the difference between sparse and dense arrays in JavaScript. Also you'll read about the common ways that create sparse arrays: just to be aware of.  

## 1. Dense arrays

An array in JavaScript is an object representing an ordered collection of items.  

The items in the array have a exact order. You can access an item from the array using a special number *index* &mdash; the nth item of the array (zero based):

```javascript
const array = ['Batman', 'Joker', 'Bane'];

console.log(array[0]); // logs 'Batman'
console.log(array[1]); // logs 'Joker'
console.log(array[2]); // logs 'Bane'

console.log(array.length); // logs 3
```

`array[0]` accesses the item of the array at index `0` (the first element).  

The array also has a property `length`, which indicates the number of items in the array. In the previous example, `array.length` is `3` since the number of items in the array are `3`.

## 2. Sparse arrays

However... in some situations array instances can have holes in them.  

## 3.Ways that generate sparse arrays

## 4. Array methods and sparse arrays