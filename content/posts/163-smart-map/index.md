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

`array.map()` is a very useful mapper function: it takes an array and a mapper function, then returns a new mapped array.  

However, there's an alternative to `array.map()`: the `array.flatMap()` (available starting ES2019). This method gives you the ability to map, but also to remove or even add new items in the resulting mapped array.    

*Before I continue, allow me to make a recommendation.* 

*If you want to significantly improve your JavaScript knowledge, take the  amazingly useful ["Modern JavaScript From The Beginning 2.0"](https://www.traversymedia.com/a/2147528886/FqXWyazh) by Brad Traversy. Use the coupon code "DMITRI" and get up to 20% discount!*

## 1. Smarter mapper

Having an array of numbers, how would you create a new array with the items doubled?  

Using the `array.map()` function is a good approach:

```javascript
const numbers = [0, 3, 6];
const doubled = numbers.map(n => n * 2);

console.log(doubled); // logs [0, 6, 12]
```

[Try the demo.](https://jsfiddle.net/dmitri_pavlutin/7g5fz93y/)

`numbers.map(number => 2 * number)` maps `numbers` array to a new array where each number is doubled.  

For the cases when you need to map one to one, meaning that the mapped array will have the same number of items as the original array, `array.map()` works pretty well.

But what if you need to double the numbers of an array and also skip zeroes from the mapping?  

Using `array.map()` directly isn't possible, because the method always creates a mapped array with the same number of items as the original array. But you can use a combination of `array.map()` and `array.filter()`:

```javascript
const numbers = [0, 3, 6];
const doubled = numbers
  .filter(n => n !== 0)
  .map(n => n * 2);

console.log(doubled); // logs [6, 12]
```

[Try the demo.](https://jsfiddle.net/dmitri_pavlutin/cvtjyLpo/)

`doubled` array now contains items of `numbers` multiplied by 2 and also doesn't contain any zeroes.  

Ok, a combination of `array.map()` and `array.filter()` maps and filters arrays. But is there a shorter approach?  

Yes! Thanks to `array.flatMap()` method you can perform mapping and removing items with just one method call. 

Here's how you can use `array.flatMap()` to return a new mapped array with items doubled, at the same time filtering zeroes `0`:

```javascript
const numbers = [0, 3, 6];
const doubled = numbers.flatMap(number => {
  return number === 0 ? [] : [2 * number];
});

console.log(doubled); // logs [6, 12]
```

[Try the demo.](https://jsfiddle.net/dmitri_pavlutin/j945qunz/)

By using only the `numbers.flatMap()` you can map an array to another array, but also skip certain elements from mapping.  

Let's see in more detail how `array.flatMap()` works.  

## 2. *array.flatMap()*

`array.flatMap()` function accepts a callback function as an argument and returns a new mapped array:

```javascript
const mappedArray = array.flatMap((item, index, origArray) => {
  // ...
  return [value1, value2, ..., valueN];
}[, thisArg]);
```

The callback function is invoked upon each iteam in the original array with 3 arguments: the current item, index, and the original array. The array returned by the callback is then flattened by 1 level deep, and the resulting items are added to the mapped array.  

Also, the method accepts a second, optional, argument indicating the `this` value inside of the callback.  

The simplest way you can use `array.flatMap()` is to flatten an array that contains items as arrays:

```javascript
const arrays = [[2, 4], [6]];
const flatten = arrays.flatMap(item => item);

console.log(flatten); // logs [2, 4, 6]
```

[Try the demo.](https://jsfiddle.net/dmitri_pavlutin/5rwvcz17/)

In the example above `arrays` contains arrays of numbers: `[[2, 4], [6]]`. Calling `arrays.flatMap(item => item)` flattens the array to `[2, 4, 6]`.  

But `array.flatMap()` can do more beyond simple flattening. By controlling the number of array items you return from the callback, you can:

* *remove* the item from the resulting array by returning an empty array `[]`
* *modify* the mapped item by returning an array with one new value `[newValue]`
* or *add* new items by returning an array with multiple values: `[newValue1, newValue2, ...]`.  

For example, as you saw in the previous section, you can create a new array by doubling the items, but also remove the zeroes `0`:

```javascript
const numbers = [0, 3, 6];
const doubled = numbers.flatMap(number => {
  return number === 0 ? [] : [2 * number];
});

console.log(doubled); // logs [6, 12]
```

[Try the demo.](https://jsfiddle.net/dmitri_pavlutin/av1w9jd3/)

Let's look into more detail on how the example above works.  

The callback function returns an empty array `[]` if the current item is `0`. That would mean that when being flattened, the empty array `[]` provides no value at all.  

If the current iterated item is non-zero, then `[2 * number]` is returned. When `[2 * number]` array is flattened, only `2 * number` is added into the resulting array.  

You can also use `array.flatMap()` to increase the number of items in the mapped array. 

For example, the following code snipped maps an array of numbers to a new array by adding doubled and tripled numbers:

```javascript
const numbers = [1, 4];
const trippled = numbers.flatMap(number => {
  return [number, 2 * number, 3 * number];
});

console.log(trippled);
// logs [1, 2, 3, 4, 8, 12]
```

[Try the demo.](https://jsfiddle.net/dmitri_pavlutin/k7p2x1ar/)

## 3. Conclusion

`array.flatMap()` method is the way to go if you want to map an array to a new array, but also have control over how many items you'd like to add to the new mapped array.  

The callback function of `array.flatMap(callback)` is called with 3 arguments: the current iterated item, index, and the original array. The array returned from the callback function is then flattened at 1 level deep, and the resulting items are inserted in the resulting mapped array.  

Note that if you just want to map a single item to a single new value, then strive to the standard `array.map()`.  

*Challenge: can you implement a function `filter(array, predicateFunc)` that would return a new filtered array using `predicateFunc`? Please use `array.flatMap()` for your implementation.*
