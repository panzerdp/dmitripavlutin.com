---
title: "A Smarter JavaScript Mapper: array.flatMap()"
description: "array.flatMap() is a method on the array that let's you map elements a littler smarter."  
published: "2021-12-31"
modified: "2021-12-31"
thumbnail: "./images/cover.png"
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
  return number === 0 ? [] : [2 * number];
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

For example, as you saw in the previous section, you can create a new array by doubling the values, but also remove the zeroes `0`:

```javascript
const numbers = [0, 3, 6];
const doubled = numbers.flatMap(number => {
  return number === 0 ? [] : [2 * number];
});

console.log(doubled); // [6, 12]
```

Let's look into more detail on how this works.  

The callback function returns an empty array `[]` in case if the current iterated item is `0`. That would mean that when being flattened, the empty array `[]` provides no value at all.  

However, if the current iterated item is non-zero, then `[number * 2]` is returned. When `[number * 2]` array is flatenned, only `number * 2` is added in the resulted array.  

Of course, you can use `array.flatMap()` to increase the number of items in the mapped array. 

For example, the following code snipped an array of numbers is increased by adding a doubled and trippled value:

```javascript
const numbers = [1, 4];
const trippled = numbers.flatMap(number => {
  return [number, 2 * number, 3 * number];
});

console.log(trippled);
// [1, 2, 3, 4, 8, 12]
```

## 3. Conclusion

If you want to map an array to a new array, but also have control over how many items you'd like to add to the new mapped array, then `array.flatMap()` method is the way to go.  

The callback function of the `array.flatMap(callback)` is called with 3 arguments: the current iterated item, index, and the original array. The array returned from the callback function is then flattened at 1 level deep, and the resulted items are inserted in the resulted mapped array.  

Note that if you just want to map a single item value to a single new value, then the standard `array.map()` is the way to go. 

*Challenge: can you implement a function `filter(array, predicateFunc)` that would return a new filtered array using `predicateFunc`? Please use `array.filterMap()` for your implementation.*