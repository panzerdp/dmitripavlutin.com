---
title: "A Smarter JavaScript Mapper: array.flatMap()"
description: "array.flatMap() is a method on the array that let's you map elements a littler smarter."  
published: "2021-12-31"
modified: "2021-12-31"
thumbnail: "./images/cover-3.png"
slug: javascript-array-flatmap
tags: ['javascript', 'array']
recommended: ['javascript-array-at', 'javascript-array-group']
type: post
---

`array.map()` is a very useful and widely used mapper function: it takes an array and a mapper function, and returns the mapped array.  

But in this post I'm going to present an interesting array method `array.flatMap()` (available starting ES2019), as an alternative to `array.map()`.  

## 1. Smarter map

Having an array of numbers, how would you create a new array with the items doubled?  

The best way to do this is to use the `array.map()` function. For example:

```javascript
const numbers = [0, 3, 6];
const doubled = numbers.map(n => n * 2);

console.log(doubled); // [0, 6, 12]
```

`numbers.map(number => number * 2)` maps the `numbers` array to a new array where each item is doubled.  

What about a situation when you'd need to map the numbers, but at the same time remove some of the mapped numbers, for example 
the zeroes `0`?

Using `array.map()` directly isn't possible, because the method doesn't allow removing elements from the initial array. Of course you can use a combination of `array.map()` and `array.filter` to make it happen:

```javascript
const numbers = [0, 3, 6];
const doubled = numbers
  .filter(n => n !== 0)
  .map(n => n * 2);

console.log(doubled); // [6, 12]
```

Ok, a combination of `array.map()` and `array.filter()` allows to map elements, and also remove the ones that aren't needed.  

But thanks to the `array.flatMap()` method, you can perform mapping and removing items with just one method call. Here's how it works:

```javascript
const numbers = [0, 3, 6];
const doubled = numbers.flatMap(number => {
  return number === 0 ? [] : [number * 2];
});

console.log(doubled); // [6, 12]
```

As the example above demonstrates, by using only the `numbers.flatMap()` you can map an array to another array, but also skip mapping of certain elements.  

Let's see in the next section how `array.flatMap()` works in more detail.  

## 2. *array.flatMap()*

`array.flatMap()` function accepts a callback function as an argument and returns a new array:

```javascript
const mappedArray = array.flatMap((item, index, origArray) => {
  // ...
  return array;
}[, thisArg]);
```

The callback function is invoked with 3 arguments: the current item, index, and the original array. The value that's returned from the callback is then flatten by 1 level deep, and the resulted data is added to the mapped array.  

Also the method accepts a second, optional argument, that should indicate the `this` value inside of the callback.  

The simplest way you can use `array.flatMap()` is to flatten an array that contains items as arrays:

```javascript
const arrays = [[2, 4], [6]];
const flatten = arrays.flatMap(item => item);

console.log(flatten); // [2, 4, 6]
```

In the example above `arrays` items as arrays. `arrays` was flatten using `array.flatMap(item => item)`.  

But beyond simple flattening, the method can do much more. By controlling the number of items in the array you return from the callback, you can:

* remove the item from the array by returning an empty array `[]`
* modify the mapped item by returning an array with on the new value `[newValue]`
* or add new items by returning an array with multiple values: `[newValue1, newValue2, ...]`.  

For example, let's remove all `0` values from the array using `array.flatMap()`:



## 3. Conclusion