---
title: "How to Fill an Array with Initial Values in JavaScript"
description: "How to initialize an array with initial values in JavaScript using array.fill() or Array.from()."
published: "2021-10-19T12:00Z"
modified: "2021-10-19T12:00Z"
thumbnail: "./images/cover-1.png"
slug: javascript-fill-array
tags: ['javascript', 'array']
recommended: ['javascript-array-from-applications', 'operations-on-arrays-javascript']
type: post
---

There are many cases when you'd like to initialize arrays in JavaScript with some initial values.  

You would need to do so in cases of multiple algorithms, especially for the problems that are solved 
using dynamic programming.  

JavaScript provides many ways to initialize arrays with data, and let's see in this post which ways
are the most simple and popular.  

```toc
```

## 1. Fill an array with primitives

Let's say that you'd like to initialize an array of length `10` with zeros. The most convinient way you could 
use is the [array.fill()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/fill) method available on the array instance.  

```javascript
const length = 3;
const initialValue = 0;

const filledArray = Array(length).fill(initialValue);

filledArray; // [0, 0, 0]
```

`Array(length)` creates a [sparse array](/power-up-the-array-creation-in-javascript/#21-numeric-argument-creates-sparse-array) with the `length` of `5`. The newly created array has 5 empty slots.  

Then `Array(length).fill(initialValue)` method alters the fills the sparse array filling it with `initialValue`, i.e. with zeroes. Then returns the modified and filled array: `[0, 0, 0, 0, 0]`.  

## 2. Fill an array with objects

### 2.1 Using *array.fill()*

What if you need to fill an array with objects?  

If you don't care that the entire array is filled with the same object instance, then 
you could easily use `array.fill()` method mentioned above:

```javascript
const length = 5;
const initialObject = { value: 0 };

const filledArray = Array(length).fill(initialObject);

filledArray; // [{ value: 0 }, { value: 0 }, { value: 0 }]
```

`Array(length).fill(initialObject)` creates an array of length `3`, and assigns to each item the `initialObject`.  

Note that using this approach creates an array having the same object instance. So if you happen to modify an item in the
array, then each item in the array is affected:

```javascript{7,9}
const length = 3;
const initialObject = { value: 0 };

const filledArray = Array(length).fill(initialObject);

filledArray; // [{ value: 0 }, { value: 0 }, { value: 0 }]

filledArray[1].value = 3;

filledArray; // [{ value: 3 }, { value: 3 }, { value: 3 }]
```

### 2.2 Using Array.from()

In case if you want the array to fill with copies of the initial object, then you could use the [Array.from()](/operations-on-arrays-javascript/#22-arrayfrom-function) utility function.  

`Array.from(array, mapperFunction)` accepts 2 arguments: an array (or generally an iterable), and a mapper function.  

`Array.from()` invokes the `mapperFunction` upon each item of the array, pushes the result to a new array, and finally returns the newly mapped array.  

Thus `Array.from()` method can be easily reused to initalize array with different object instances:

```javascript
const length = 3;

const filledArray = Array.from(Array(length), () => {
  return { value: 0 };
});

filledArray; // [{ value: 0 }, { value: 0 }, { value: 0 }]
```

`Array.from()` invokes the mapper function on each empty slot of the array. creates a new array with every value returned from the mapper function.  

Such way you get a filled array with differnt object instances, because by calling at each step the mapper function new object instances are created.  

Now, for example, if you'd modify any item in the array, only that item would be affected, and the other ones untouched:

```javascript{8,10}
const length = 3;

const filledArray = Array.from(Array(length), () => {
  return { value: 0 };
});

filledArray; // [{ value: 0 }, { value: 0 }, { value: 0 }]

filledArray[1].value = 3;

filledArray; // [{ value: 0 }, { value: 3 }, { value: 0 }]
```

`filledArray[1].value = 3` modifies only the second items of the array.  

### 2.3 Using array.map() with spread operator

You may be wondering... Why use `Array.from()` and its mapper function, since the JavaScript array has already an [array.map()](/operations-on-arrays-javascript/#21-arraymap-method) method?  

Good question!

In case if you use `Array(length)` to create array instances, calling this function creates sparse arrays with empty slots:

```javascript
const length = 3;

const sparseArray = Array(length);

sparseArray; // [empty × 3]
```

And the problem is that `array.map()` skips iterating over the empty slots:

```javascript
const length = 3;

const filledArray = Array(length).map(() => {
  return { value: 0 };
});

filledArray; // []
```

`Array(length).map(...)` simply creates an empty array.  

However, you can use the spread operator to transform a sparse array into an array with items initialized with `undefined`. Then apply `array.map()` method 
on that array:

```javascript
const length = 3;

const filledArray = [...Array(length)].map(() => {
  return { value: 0 };
});

filledArray; // [{ value: 0 }, { value: 0 }, { value: 0 }]
```

The expression `[...Array(length)]` creates an array with items initialized as `undefined`. On such array, `array.map()` can map to new object instances.  

I prefer the `Array.from()` approach to fill an array with objects because it involves less magic.  

## 3. Conclusion

Fortunately, JavaScrip provides a bunch of good ways to fill an array with initial values.  

If you'd like to create an array initialized with primitive values, then the best approach is `Array(length).fill(initialValue)`.  

In case if you'd like to create an array initialized with object instances, and you don't care that each item would have the same object instance,
then `Array(length).fill(initialObject)` is the way to go.  

Otherwise, to fill an array with different object instances you could use `Array.from(Array.length, mapper)` or `[...Array(length)].map(mapper)`, where `mapper` is a function
that returns a new object instance during each call.  

*What other ways to fill an array in JavaScript do you know?*