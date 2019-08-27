---
title: 5 Handy Applications of JavaScript Array.from()
description: Array.from() transforms array-like to array, generate ranges, remove array duplicates, fill array with values and clone.
published: "2019-08-27T13:00Z"
modified: "2019-08-27T13:00Z"
thumbnail: "./images/bulb.jpg"
slug: javascript-array-from-applications
tags: ["javascript", "array", "es2015"]
recommended: ["how-three-dots-changed-javascript", "power-up-the-array-creation-in-javascript"]
type: post
commentsThreadId: javascript-array-from-use-cases
---

Any programming language has functions that go beyond the basic usage. 

One such function in JavaScript is the `Array.from()`: a workhorse doing lots of useful stuff to generate and transform arrays.  

In this post, I will describe 5 use cases that are both interesting and useful.  

Before starting, let's recall what `Array.from()` does: transforms an array-like or iterable object into an array. 

```javascript
Array.from(arrayLikeOrIterable[, mapFunction[, thisArgument]]);
```

## 1. Transform array-like into an array

The first useful application of `Array.from()` is indicated directly from its definition: transform an array-like object into an array.  

The usual cases when you work with array-like objects are `arguments` special keywords and working with the results of DOM queries.  

In the following example, let's sum the arguments of a function:

```javascript
function sumArguments() {
  return Array.from(arguments).reduce((sum, num) => sum + num);
}

sumArguments(1, 2, 3); // => 6
```

`Array.from(arguments)` transforms the array-like `arguments` into an array. On the new array, a reducer function is applied to calculate the sum of arguments.  

Moreover, you can use `Array.from()` with any object or primitive that implements the iterable protocol. Let's see a few examples:

```javascript
Array.from('Hey');                   // => ['H', 'e', 'y']
Array.from(new Set(['one', 'two'])); // => ['one', 'two', 'three']

const map = new Map();
map.set('one', 1)
map.set('two', 2);
Array.from(map); // => [['one', 1], ['two', 2]]
```

## 2. Clone an array

There is a tremendous number of ways to [clone an array](https://www.freecodecamp.org/news/how-to-clone-an-array-in-javascript-1d3183468f6a/) in JavaScript.  

Of course, you can use `Array.from()` to shallow copy an array:

```javascript
const numbers = [3, 6, 9];
const numbersCopy = Array.from(numbers);

numbers === numbersCopy; // => false
```

`Array.from(numbers)` creates a shallow copy of `numbers` array. The equality check `numbers === numbersCopy` is `false`, meaning that while having the same items, these are different array objects.  

Is it possible to use `Array.from()` to create a deep copy of an array? Challenge accepted!

```javascript
function deepCopy(val) {
  return Array.isArray(val) ? Array.from(val, deepCopy) : val;
}

const numbers = [[0, 1, 2], ['one', 'two', 'three']];
const numbersDeepCopy = deepCopy(numbers);

numbersDeepCopy; // => [[0, 1, 2], ['one', 'two', 'three']]
numbers[0] === numbersDeepCopy[0] // => false
```

`deepCopy()` creates a deep copy of the supplied array. This is achieved by calling recursively `deepCopy()` on any array item that is an array itself.  

*Can you wrote a shorter than mine version of deep copy that uses `Array.from()`? If so, please write a comment below!*

## 3. Fill an array with values

In case if you need to initialize an array with the same values, `Array.from()` is at your service too. 

Let's define a function that creates an array filled with the same default values:

```javascript
function fillArray(value, length) {
  return Array.from({ length }, () => value);
}

fillArray(0, 3); // => [0, 0, 0]
```

`fillArray(0, 3)` creates a new array having `3` items initialized with zeros. `Array.from()` is invoked with an array-like object `{ length }`, and a map function that returns the initialization value.  

Interestigly, is it possible to use [array.map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) method to achieve the same. Let's try that:

```javascript
function fillArray1(value, length) {
  return Array(length).map(() => value);
}

fillArray1(0, 3); // => [undefined, undefined, undefined]
```

The `map()` approach doesn't return the right result. It happens because `Array(length)` creates an array of length 3, however having 3 empty slots. And `map()` simply skips the iteration over these empty slots.  

However, there is an alternative method [array.fill()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/fill) that can be used to achieve the same result:

```javascript
function fillArray2(value, length) {
  return Array(length).fill(value);
}

fillArray2(0, 3); // => [0, 0, 0]
```

This time `fill()` method fills the array correctly, even having empty slots, with initialization values.  

## 4. Generate ranges of numbers

You can use `Array.from()` to generate ranges of values. For example, the following function range generates an array with items starting `0` until `end - 1`:

```javascript
function range(end) {
  return Array.from({ length: end }, (_, index) => index);
}

range(4); // => [0, 1, 2, 3, 4]
```
Inside `range()` function, `Array.from()` is supplied with the array-like `{ length: end }`, and a map function that simply returns the current index. This way you can generate ranges of values.  

## 5. Unique items of an array

A nice trick resulting from the ability of `Array.from()` to accept iterable objects is to quickly remove duplicates from an array. It is achieved in combination with `Set` data structure:

```javascript
function unique(array) {
  return Array.from(new Set(array));
}

unique([1, 1, 2, 3, 3]); // => [1, 2, 3]
```

At first, `new Set(array)` creates a set containing the items of the array. Internally, the set removes the duplicates.  
Because the set is iterable, `Array.from()` extracts the unique items into a new array.  

## 6. Conclusion

`Array.from()` static method accepts array-like objects, as well as iterables. Plus you can use a custom mapping function. Moreover, the function does not skip iteration over empty holes. This combination of features gives `Array.from()` a lot of possibilities.  

As presented above, you can easily transform array-like objects to arrays, clone arrays, fill arrays with initial values, generates ranges and remove duplicated array items. 

*What other interesting use cases of Array.from() do you know? Please write a comment below!*  