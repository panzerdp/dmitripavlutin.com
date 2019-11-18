---
title: "14 Common Operations on Arrays in JavaScript (Cheatsheet)"
description: "14 operations on arrays in JavaScript: iterate, map, reduce, concat, slice, filter, find, insert, delete, and more."
published: '2019-11-19T14:00Z'
modified: '2019-11-19T14:00Z'
thumbnail: './images/birds.jpg'
slug: operations-on-arrays-javascript
tags: ['javascript', 'array']
recommended: ['power-up-the-array-creation-in-javascript', 'javascript-array-from-applications']
type: post
commentsThreadId: operations-on-arrays-javascript
---

Arrays are one of the most used data structure in JavaScript.   

The number of operations you can perform on arrays (iteration, adding items, removing, etc) is also big. In this regards, the array object provides a big number of useful methods like `array.forEach()`, `array.map()` and more.  

Time to time I find myself overhelmed by the amount of possible operations and corresponding implementations. You might be in the same situation too.  

I've decided to create a compiled list of common 14 operations on arrays alongside with implementations. If you need an operation like iteration, deleting an array item, and so on, cherry pick it from the table of contents.  

While the list is created to cherry pick from it, you could still read it whole to get familiar with some implementations you might not be familiar with.  

```toc
# Table of contents
```

## 1. Iterate

### 1.1 *for..of* cycle

`for(const item of items)` cycle iterates over array items.  

Let's iterate over a list of `colors`:

```javascript
const colors = ['blue', 'green', 'white'];

for (const color of colors) {
  console.log(color);
}
// 'blue'
// 'green'
// 'white'
```

On each iteration the variable `color` is assigned with the iterated item.  

Tips:

* You can stop iterating at anytime using `break` statement.

### 1.2 *for* cycle

`for(let i; i < array.length; i++)` cycle iterates over array items using an incrementing index variable.  

`for` normally requires `index` variable that increments on each cycle:

```javascript
const colors = ['blue', 'green', 'white'];

for (let index = 0; index < colors.length; index++) {
  const color = colors[index];
  console.log(color);
}
// 'blue'
// 'green'
// 'white'
```

`index` variable increments starting `0` until `color.length - 1`. This variable is used to access the array item by index: `colors[index]`.  

Tips:

* You can stop iterating at anytime using `break` statement.

### 1.3 *array.forEach()* method

`array.forEach(callback)` method iterates over array items by invoking `callback` function on every array item.  

On each iteration `callback(item [, index [, array]])` is called with arguments: iterated item, index and the array itself.

Let's iterate over `colors` array:

```javascript
const colors = ['blue', 'green', 'white'];

colors.forEach(function callback(value, index) {
  console.log(value, index);
});
// 'blue', 0
// 'green', 1
// 'white', 2
```

`array.forEach(callback)` invokes `callback` 3 times for every item in the array: `'blue'`, `'green'` and `'white'`.  

Tips: 

* You cannot break `array.forEach()` iterating.  

## 2. Map

### 2.1 *array.map()* method

`array.map(callback)` method maps to a new array by using `callback` invocation result called on each array item.  

On each iteration `callback(item[, index[, array]])` is invoked with arguments: current item, index and the array itself.  

Let's increment the numbers of an array:

```javascript
const numbers = [0, 2, 4];

const newNumbers = numbers.map(function callback(number) {
  return number + 1;
});

newNumbers; // => [1, 3, 5]
```

`numbers.map(callback)` creates a new array from `numbers` by incrementing each array item.  

Tips:

* `array.map()` creates a new mapped array, without altering the original one

### 2.2 *Array.from()* function

`Array.from(arrayLike[, callback])` method maps to a new array by using `callback` invocation result called on each array item.  

On each iteration `callback(item[, index[, array]])` is invoked with arguments: current item, index and the array itself.  

Let's increment the numbers of an array:

```javascript
const numbers = [0, 2, 4];

const newNumbers = Array.from(function callback(number) {
  return number + 1;
}, numbers);

newNumbers; // => [1, 3, 5]
```

`Array.from(callback, numbers)` creates a new array from `numbers` by incrementing each array item.  

Tips:

* `Array.from()` creates a new mapped array, without altering the original one
* `Array.from()` fits better to map from an [array-like object](/javascript-array-from-applications/#2-transform-array-like-into-an-array)

## 3. Reduce

### 3.1 *array.reduce()* method

`array.reduce(callback[, initialValue])` reduces the array to a value by invoking `callback` function as a reducer.  

On each iteration `callback(accumulator, item[, index[, array]])` is invoked with arguments: accumulator, current item, index and the array itself.  

The classic example is summing an array of numbers:

```javascript
const numbers = [0, 2, 4];

const sum = numbers.reduce(function callback(accumulator, number) {
  return accumulator + number;
}, 0);

sum; // => 6
```

First, the sum is initalized with `0`. Then `callback` function is invoked on each array item accumulating the sum of numbers.  

Tips:

* The first array item becomes the initial value if you skip the `initialValue` argument.  

## 4. Concat

### 4.1 *array.concat()* method

`array.concat(array1[, array2, ...])` concatenates to the original array one or more arrays.  

Let's concatenate 2 arrays of names:

```javascript
const heros = ['Batman', 'Robin'];
const villians = ['Joker', 'Bane'];

const everyone = heros.concat(vaillians);

everyone; // => ['Batman', 'Robin', 'Joker', 'Bane']
```

`heros.concat(vaillians)` creates a new array by concatenating `heros` and `villians` arrays.  

Tips:

* `array.concat()` creates a new array, without altering the original one
* `array.concat(array1[, array2, ...])` accepts more than one array to merge.

### 4.2 Spread operator

You can use the spread operator inside an array literal to concatenate arrays: `[...array1, ...array2]`.

Let's concatenate 2 arrays:

```javascript
const heroes = ['Batman', 'Catwoman'];
const villians = ['Joker', 'Bane'];

const names = [...heroes, ...villians];

names; // => ['Batman', 'Catwoman', 'Joker', 'Bane']
```

`[...heroes, ...villians]` spreads `heroes` and `villians` items, then creates a new array containing all spread items.  

* `[...arr1, ...arr2, ...arrN]`: you can concat as many arrays as you need using spread operator.  

## 5. Slice

### 5.1 *array.slice()* method

`array.slice([begin[, end]])` returns a slice of the array starting `begin` index and ending `end` index (excluding `end` itself). `begin` optional argument defaults to `0`, `end` optional argument defaults to `array.length`.  

Let's get some array slices:  

```javascript
const names = ['Batman', 'Catwoman', 'Joker', 'Bane'];

const heroes = names.slice(0, 2);
const villians = names.slice(2);

heroes;   // => ['Batman', 'Catwoman']
villians; // => ['Joker', 'Bane']
```

`names.slice(0, 2)` returns a slice of 2 items from `names` array. 
`names.slice(1)` returns a slice 2 items, `end` being omitted and defaulted to `names.length`.  

Tips:

* `array.slice()` creates a new array, without altering the original one

## 6. Search

### 6.1 *array.includes()* method

`array.includes(itemToSearch, [, fromIndex])` returns a boolean whether `itemToSearch` exists in `array`. The optional argument `fromIndex`, defaulting to `0`, indicates the index to start searching.  

Let's determine if the number `2` exists in an array of numbers:

```javascript
const numbers = [1, 2, 3, 4, 5];

numbers.includes(2); // => true
```

`numbers.includes(2)` returns `true` because `2` exists in `numbers` array.  

### 6.2 *array.find()* method

`array.find(callback)` method returns the first array item that satisfies the `callback` predicate function.  

On each iteration `callback(item[, index[, array]])` predicate function is invoked with 3 arguments: iterated item, index and array itself.  

For example, let's find the first odd number:

```javascript
const numbers = [1, 2, 3, 4, 5];

const oddNumber = numbers.find(function callback(number) {
  return number % 2 === 0;
});

oddNumber; // => 2
```

`numbers.find(callback)` returns the first odd number inside `numbers`, which is `2`.  

Tips:

* The iteration breaks when the predicate returns `true` 
* `array.find(callback)` returns `undefined` if no item has satisfied the predicate.

### 6.3 *array.indexOf()* method

`array.indexOf(itemToSearch[, fromIndex])` returns the index of the first appearance `itemToSearch` in `array`. The optional argument `fromIndex`, defaulting to `0`, is the index to start searching.  

Let's find the index of `'Joker'`:

```javascript
const names = ['Batman', 'Catwoman', 'Joker', 'Bane'];

const index = names.indexOf('Joker');

index; // => 2
```

The index of `'Joker'` inside `names` is `2`.  

Tips:  

* `array.indexOf(itemToSearch)` returns `-1` if the item hasn't been found.

## 7. Query

### 7.1 *array.every()* method

`array.every(callback)` method returns `true` if every item the `callback` predicate function.  

On each iteration `callback(item[, index[, array]])` predicate function is invoked with 3 arguments: iterated item, index and array itself.  

Let's determine whether arrays `evens` and `mix` contain only even numbers:

```javascript
const evens = [0, 2, 4, 6];
const numbers = [0, 1, 4, 6];

function isEven(number) {
  return number % 2 === 0;
}

evens.every(isEven); // => true
mix.every(isEven);   // => false
```

`odds.every(isEven)` is `true` because *all* numbers in `evens` are even.  

However, `numbers.every(isEven)` evaluates to `false` because `numbers` contains an odd number `1`.  

### 7.2 *array.some()* method

`array.every(callback)` method returns `true` if at least one item the `callback` predicate function.  

On each iteration `callback(item[, index[, array]])` predicate function is invoked with 3 arguments: iterated item, index and array itself.  

Let's determine whether the arrays contain at least one even number:

```javascript
const numbers = [1, 5, 7, 10];
const odds = [1, 3, 3, 3];

function isEven(number) {
  return number % 2 === 0;
}

numbers.some(isEven); // => true
odds.some(isEven);    // => false
```

`numbers.some(isEven)` is `true` because at least one even number, `10`, exists in `numbers`.  

But `odds.some(isEven)` is `false` because `odds` contains only odd numbers.  

## 8. Filter

### 8.2 *array.filter()*



## 9. Insert

### 9.1 *array.push()* method

### 9.2 *array.unshift()* method

### 9.3 Spread operator (immutable)

## 10. Delete

### 10.1 *array.pop()* method

### 10.2 *array.shift()* method

### 10.3 *array.splice()* method

### 10.4 Spread operator (immutable)

## 11. Empty

### 11.1 *array.length* property

### 11.2 *array.splice()* method

## 12. Fill

### 12.1 *array.fill()* method

### 12.2 *Array.from()* function

## 13. Flatten 

### 13.1 *array.flatten()* method

## 14. Sort

### 14.1 *array.sort()* method

## 15. Conclusion

