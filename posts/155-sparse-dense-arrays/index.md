---
title: "Sparse vs Dense Arrays in JavaScript"
description: "What's the difference between sparse and dence arrays in JavaScript"
published: "2021-10-27T07:00Z"
modified: "2021-10-27T07:00Z"
thumbnail: "./images/cover-1.png"
slug: javascript-sparse-dense-arrays
tags: ['javascript', 'array']
type: post
---

Arrays in JavaScript are pretty easy to use. However, there's a nuance you should be aware of: some arrays might have holes in them.

In this post, I'm going to describe the difference between sparse and dense arrays in JavaScript. Also, you'll find the common ways to create sparse arrays, just to be aware of.  

<Affiliate type="traversyJavaScript" />

## 1. Dense arrays

An array in JavaScript is an object representing an ordered collection of items.  

The items in the array have an exact order. You can access the nth item of the array using a special number &mdash; the *index*.

```javascript
const names = ['Batman', 'Joker', 'Bane'];

console.log(names[0]); // logs 'Batman'
console.log(names[1]); // logs 'Joker'
console.log(names[2]); // logs 'Bane'

console.log(names.length); // logs 3
```

[Try the demo.](https://jsfiddle.net/dmitri_pavlutin/e1xkqvLm/)

`names[0]` accesses the item of the array at index `0` (the first element).  

The array also has a property `length`, which indicates the number of items in the array. In the previous example, `names.length` is `3` since the number of items in the array is `3`.

`names` array created above is a *dense* array: meaning that it contains items at each index starting `0` until `names.length - 1`.  

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

[Try the demo.](https://jsfiddle.net/dmitri_pavlutin/bq5tohLk/)

where `index in array` determines if the `array` has an item at `index` position.   

Here's an interesting question: are all arrays in JavaScript dense? Or there might be arrays when `isDense(array)` would return `false`?  

Let's dig more!

## 2. Sparse arrays

Unfortunately... there are situations when JavaScript arrays can have holes in them. Such arrays are named *sparse*.   

For example, if you use the array literal but omit indicating an item, then a hole is created in the place of the missing item. And as result a sparse array is created:

```javascript
const names = ['Batman', , 'Bane'];

console.log(names[0]); // logs 'Batman'
console.log(names[1]); // logs undefined
console.log(names[2]); // logs 'Bane'

console.log(isDense(names)); // logs false
```

[Try the demo.](https://jsfiddle.net/dmitri_pavlutin/krva0udw/)


`['Batman', , 'Bane']` array literal creates a sparse array, having a hole at the `1` index. If you access the value of a hole &mdash; `names[1]` &mdash; it evaluates to `undefined`.  

To check explicitly whether there's a hole at a specific index you need to use `index in names` expression:

```javascript
const names = ['Batman', , 'Bane'];

// No hole
console.log(0 in names); // logs true
// Hole
console.log(1 in names); // logs false
```

[Try the demo.](https://jsfiddle.net/dmitri_pavlutin/hj7dk0tq/)

Of course, if you run `isDense()` on a sparse array it will return `false`:

```javascript
const names = ['Batman', , 'Bane'];
console.log(isDense(names)); // logs false
```

[Try the demo.](https://jsfiddle.net/dmitri_pavlutin/quLjmoav/)

Now you have a clue about the sparse arrays. But what are the common ways to create sparse arrays?  

Let's find out in the next section.  

## 3. Ways to create sparse arrays

Here's a list of the most common ways to create sparse arrays in JavaScript.  

### 3.1 Array literal

As already mentioned, omitting a value when using the array literal creates a sparse array (note the `empty` word in the logger array):

```javascript
const names = ['Batman', , 'Bane'];

console.log(names); // logs ['Batman', empty, 'Bane']
```

[Try the demo.](https://jsfiddle.net/dmitri_pavlutin/ej3a62f4/)

### 3.2 Array() constructor

Invoking `Array(length)` or `new Array(length)` (with a number argument) creates a fully sparse array:

```javascript
const array = Array(3);

console.log(isDense(array)); // logs false
console.log(array);          // logs [empty, empty, empty]
```

[Try the demo.](https://jsfiddle.net/dmitri_pavlutin/zb3mxgLq/)

### 3.3 delete operator

When you use `delete array[index]` operator on the array:

```javascript
const names = ['Batman', 'Joker', 'Bane'];

delete names[1];

console.log(isDense(names)); // logs false
console.log(names);          // logs ['Batman', empty, 'Bane']
```

[Try the demo.](https://jsfiddle.net/dmitri_pavlutin/xn5zvosa/)

Initially, `names` array is dense. 

But executing `delete names[1]` deletes the item at index `1` and makes `names` array sparse.   

### 3.4 Increase length property

If you *increase* `length` property of an array, then you also create holes in the array:

```javascript
const names = ['Batman', 'Joker', 'Bane'];

names.length = 5;

console.log(isDense(names)); // logs false
console.log(names); // logs ['Batman', 'Joker', 'Bane', empty, empty]
```

[Try the demo.](https://jsfiddle.net/dmitri_pavlutin/xn5zvosa/2/)

Initially `names` array had 3 items, and it was a dense array.

However, increasing the `names.length` to `5` items creates 2 holes &mdash; at `3` and `4` indexes.   

On a side note, *decreasing* the `length` property doesn't create a sparse array but removes items from the end of the array.  

## 4. Array methods and sparse arrays

A problem of the sparse arrays is that many array built-in methods just skip the holes in a sparse array.  

For example, `array.forEach(eachFunc)` doesn't not invoke `eachFunc` on the holes:

```javascript
const names = ['Batman', , 'Bane'];

names.forEach(name => {
  console.log(name);
});
// logs 'Batman'
// logs 'Bane'
```

[Try the demo.](https://jsfiddle.net/dmitri_pavlutin/3df4mLn8/)

Same way `array.map(mapperFunc)`, `array.filter(predicateFunc)`, and more functions do skip the holes.  If you've accidentally created a sparse array, you might find a hard time understanding why an array method doesn't work as expected.  

*Challenge: do you know array functions in JavaScript that don't skip the empty holes?*

## 5. Conclusion

In JavaScript, an array can be *dense* or *sparse*.  

An array is dense if there are items at each index starting `0` until `array.length - 1` . Otherwise, if at least one item is missing at any index, the array is sparse.  

While you won't deal much with sparse arrays, you should be aware of the situations when one can be created: 

* when skipping a value inside an array literal `[1, , 3]`
* when using `Array(length)`
* when using `delete array[index]`
* when increasing `array.length` property

The problem with sparse arrays is that some JavaScript functions (like `array.forEach()`, `array.map()`, etc.) skip empty holes when iterating over the array items.  

*What other ways to create sparse arrays in JavaScript do you know?*