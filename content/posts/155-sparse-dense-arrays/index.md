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
const names = ['Batman', 'Joker', 'Bane'];

console.log(names[0]); // logs 'Batman'
console.log(names[1]); // logs 'Joker'
console.log(names[2]); // logs 'Bane'

console.log(names.length); // logs 3
```

`names[0]` accesses the item of the array at index `0` (the first element).  

The array also has a property `length`, which indicates the number of items in the array. In the previous example, `names.length` is `3` since the number of items in the array are `3`.

`names` array created a above is a *dense* array: meaning that it conains items at each index starting `0` until `names.lenght - 1`.  

Here's a function `isDense(array)` that determines whether the array has items at each index:

```javascript
function isDense(array) {
  for (let index = 0; index < array.length; index++) {
    if (!(index in array)) {
      return false;
    }
  }
  return true;
}

const names = ['Batman', 'Joker', 'Bane'];
console.log(isDense(names)); // logs true
```

where `index in array` determines if the `array` has an item at `index` position.  

Here's an interesting question: are all arrays in JavaScript dense? Or maybe there are arrays for which `isDense(array)` would return `false`?  

Let's dig more!

## 2. Sparse arrays

Unfortunately... there are situations when JavaScript arrays can have holes in them, also named a *sparse* array.  

For example, if you use the array literal but omit indicating an item, then a hole is created instead of the missing item. And as result a sparse array is created:

```javascript
const names = ['Batman', , 'Bane'];

console.log(names[0]); // logs 'Batman'
console.log(names[1]); // logs undefined
console.log(names[2]); // logs 'Bane'

console.log(isDense(names)); // logs false
```

`['Batman', , 'Bane']` array literal creates a sparse arrays, where there's a hole at the `1` index. If you access the value of a hole &mdash; `names[1]` &mdash; it evaluates to `undefined`.  

To check explicity whether at a specific index there's a hole you need to use `index in names` expression:

```javascript
const names = ['Batman', , 'Bane'];

// No hole
console.log(0 in names); // logs true
// Hole
console.log(1 in names); // logs false
```

Of course, if you run `isDense()` on a sparse array it would return `false`:

```javascript
const names = ['Batman', , 'Bane'];
console.log(isDense(names)); // logs false
```

Now, hopefully, you have a clue about the sparse arrays. But what are the common ways to create sparse arrays?  

Let's find in the next section.  

## 3. Ways to create sparse arrays

Here's a list of most common ways to create sparse arrays in JavaScript.  

### 3.1 Array literal

As already mentioned, omitting a value when using the array literal creates a sparse array:

```javascript
const names = ['Batman', , 'Bane'];

console.log(isDense(names)); // logs false
console.log(names);          // logs ['Batman', empty, 'Bane']
```

### 3.2 *Array()* constructor

When invoking `Array(length)` or `new Array(length)` (with a number argument) creates a fully sparse array:

```javascript
const array = Array(3);

console.log(array); // logs [empty, empty, empty]
```

### 3.3 *delete* operator

When you use `delete array[index]` operator on the array:

```javascript
const names = ['Batman', 'Joker', 'Bane'];

delete names[1];

console.log(isDense(names)); // logs false
console.log(names);          // logs ['Batman', empty, 'Bane']
```

Initially `names` array is dense. But executing `delete names[1]` deletes the item at index `1` and makes `names` array sparse.  

### 3.4 Increase *length* property

If you increase `length` property of an existing array, then you also create holes in the array:

```javascript
const names = ['Batman', 'Joker', 'Bane'];

names.length = 5;

console.log(names); // logs ['Batman', 'Joker', 'Bane', empty, empty]
```

Initially `names` array had 3 items, and it was a dense array.

However, increase the `names.length` to `5` items, the array now has 2 holes at `3` and `4` indexes.  

## 4. Array methods and sparse arrays

A problem of the sparse arrays is that many array built-in methods just skip the holes in a sparse array.  

For example `array.forEach(eachFunc)` doesn't not invoke `eachFunc` on the holes:

```javascript
const names = ['Batman', , 'Bane'];

names.forEach(name => {
  console.log(name);
});
// logs 'Batman'
// logs 'Bane'
```

Same way `array.map(mapperFunc)`, `array.filter(predicateFunc)`, and more functions do simply skip the holes.  

*Challenge: what utility function in JavaScript doesn't skip the empty holes?*

## 5. Conclusion

In JavaScript, an array can be *dense* or *sparse*.  

An array is dense if there are items at each index starting `0` until `array.length - 1` . Otherwise, if at least one item is missing at an index, the array is sparse.  

While you won't deal much with sparse arrays, it worth knowing the situations when one can be created: 

* when skipping a value inside an array literal `[1, , 3]`
* when using `Array(length)`
* when using `delete array[index]`
* when increasing `array.length` property

The problem with sparse arrays is that some JavaScript functions (like `array.forEach()`, `array.map()`, etc.).  

*What other ways to create sparse arrays in JavaScript do you know?*