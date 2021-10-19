---
title: "How to Fill an Array with Initial Values in JavaScript"
description: "How to initialize an array with initial values in JavaScript using array.fill(), Array.from(), or array.map()"
published: "2021-10-19T06:00Z"
modified: "2021-10-19T06:00Z"
thumbnail: "./images/cover.png"
slug: javascript-fill-array
tags: ['javascript', 'array']
recommended: ['javascript-array-from-applications', 'operations-on-arrays-javascript']
type: post
---

JavaScript provides many ways to initialize arrays with initial data. Let's see in this post which ways are the most simple and popular.  

```toc
```

## 1. Fill an array with primitives

Let's say that you'd like to initialize an array of length `3` with zeros. 

The [array.fill(initalValue)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/fill) method available on the array instance is a convenient way to initialize an arrays: when the method is called on an array, the entire array is filled with `initialValue`, and the modified array is returned.  

But you need to use `array.fill(initialValue)` in combination with `Array(n)` (the array constructor):

```javascript
const length = 3;

const filledArray = Array(length).fill(0);

filledArray; // [0, 0, 0]
```

[Try the demo.](https://jsfiddle.net/dmitri_pavlutin/ntaLhkzu/)

`Array(length)` creates a [sparse array](/power-up-the-array-creation-in-javascript/#21-numeric-argument-creates-sparse-array) with the `length` of `3`.  

Then `Array(length).fill(0)` method fills the array with zeroes, returning the filled array: `[0, 0, 0]`.  

`Array(length).fill(initialValue)` is a convenient way to create arrays with a desired length and initialized with a primitive value (number, string, boolean).  

## 2. Fill an array with objects

What if you need to fill an array with objects? This requirement is slightly nuanced depending if you want the array filled with the initial object instances, or different instances.  

### 2.1 Using *array.fill()*

If you don't mind initializing the array with the same object instance, then you could easily use `array.fill()` method mentioned above:

```javascript
const length = 3;

const filledArray = Array(length).fill({ value: 0 });

filledArray; // [{ value: 0 }, { value: 0 }, { value: 0 }]
```

[Try the demo.](https://jsfiddle.net/dmitri_pavlutin/vx4rmkqn/)

`Array(length).fill({ value: 0 })` creates an array of length `3`, and assigns to each item the `{ value: 0 }` (note: same object instance).  

This approach creates an array having the same object instance. If you happen to modify any item in the array, then each item in the array is affected:

```javascript
const length = 3;

const filledArray = Array(length).fill({ value: 0 });

filledArray; // [{ value: 0 }, { value: 0 }, { value: 0 }]

filledArray[1].value = 3;

filledArray; // [{ value: 3 }, { value: 3 }, { value: 3 }]
```

[Try the demo.](https://jsfiddle.net/dmitri_pavlutin/t90gusyo/)

Altering the second item of the array `filledArray[1].value = 3` alters all the items in the array.  

### 2.2 Using Array.from()

In case if you want the array to fill with copies of the initial object, then you could use the [Array.from()](/operations-on-arrays-javascript/#22-arrayfrom-function) utility function.  

`Array.from(array, mapperFunction)` accepts 2 arguments: an array (or generally an iterable), and a mapper function.  

`Array.from()` invokes the `mapperFunction` upon each item of the array, pushes the result to a new array, and finally returns the newly mapped array.  

Thus `Array.from()` method can easily create and initialize an array with different object instances:

```javascript
const length = 3;

const filledArray = Array.from(Array(length), () => {
  return { value: 0 };
});

filledArray; // [{ value: 0 }, { value: 0 }, { value: 0 }]
```

[Try the demo.](https://jsfiddle.net/dmitri_pavlutin/6zaoyqk8/)

`Array.from()` invokes the mapper function on each empty slot of the array and creates a new array with every value returned from the mapper function.  

You get a filled array with different object instances because each mapper function call returns a new object instance.  

If you'd modify any item in the array, then only that item would be affected, and the other ones remain unaffected:

```javascript
const length = 3;

const filledArray = Array.from(Array(length), () => {
  return { value: 0 };
});

filledArray; // [{ value: 0 }, { value: 0 }, { value: 0 }]

filledArray[1].value = 3;

filledArray; // [{ value: 0 }, { value: 3 }, { value: 0 }]
```

[Try the demo.](https://jsfiddle.net/dmitri_pavlutin/z9g254qf/)

`filledArray[1].value = 3` modifies only the second item of the array.  

### 2.3 Using array.map() with spread operator

You may be wondering: why use `Array.from()` and its mapper function, since the array has already an [array.map()](/operations-on-arrays-javascript/#21-arraymap-method) method?  

Good question!

When using `Array(length)` to create array instances, it creates sparse arrays (i.e. with empty slots):

```javascript
const length = 3;

const sparseArray = Array(length);

sparseArray; // [empty × 3]
```

And the problem is that `array.map()` skips the empty slots:

```javascript
const length = 3;

const filledArray = Array(length).map(() => {
  return { value: 0 };
});

filledArray; // [empty × 3]
```

[Try the demo.](https://jsfiddle.net/dmitri_pavlutin/ac5xrL29/2/)

Thus using directly `Array(length).map(mapperFunc)` would create sparse arrays.  

Fortunately, you can use the spread operator to transform a sparse array into an array with items initialized with `undefined`. Then apply `array.map()` method 
on that array:

```javascript
const length = 3;

const filledArray = [...Array(length)].map(() => {
  return { value: 0 };
});

filledArray; // [{ value: 0 }, { value: 0 }, { value: 0 }]
```

[Try the demo.](https://jsfiddle.net/dmitri_pavlutin/yzhe031g/)

The expression `[...Array(length)]` creates an array with items initialized as `undefined`. On such an array, `array.map()` can map to new object instances.  

I prefer the `Array.from()` approach to filling an array with objects because it involves less magic.  

## 3. Conclusion

JavaScript provides a bunch of good ways to fill an array with initial values.  

If you'd like to create an array initialized with primitive values, then the best approach is `Array(length).fill(initialValue)`.  

To create an array initialized with object instances, and you don't care that each item would have the same object instance,
then `Array(length).fill(initialObject)` is the way to go.  

Otherwise, to fill an array with different object instances you could use `Array.from(Array.length, mapper)` or `[...Array(length)].map(mapper)`, where `mapper` is a function
that returns a new object instance on each call.  

*What other ways to fill an array in JavaScript do you know?*
