---
title: "15 Common Operations on Arrays in JavaScript (Cheatsheet)"
description: "15 operations on arrays in JavaScript: iterate, map, reduce, concat, slice, clone, search, query, filter, insert, remove, empty, fill, flatten and sort."
published: '2019-11-20T14:00Z'
modified: '2019-11-20T14:00Z'
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
tableLayout: true
toHeading: 3
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

* `array.map()` creates a new mapped array, without mutating the original one

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

* `Array.from()` creates a new mapped array, without mutating the original one
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

* `array.concat()` creates a new array, without mutating the original one
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

`array.slice([fromIndex[, toIndex]])` returns a slice of the array starting `fromIndex` index and ending `toIndex` index (excluding `toIndex` itself). `fromIndex` optional argument defaults to `0`, `toIndex` optional argument defaults to `array.length`.  

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

* `array.slice()` creates a new array, without mutating the original one

## 6. Clone

### 6.1 Spread operator

The easier way to clone an array is to use the spread operator: `const clone = [...array]`;

Let's clone an array of `colors`:

```javascript
const colors = ['white', 'black', 'gray'];

const clone = [...colors];

clone;               // => ['white', 'black', 'gray']
colors === clone; // => false
```

`[...colors]` creates a clone of `sadColors` array.  

Tips:

* `[...array]` creates a shallow copy of the array

### 6.2 *array.concat()* method

`[].concat(array)` is yet another approach on how to clone `array`.  

```javascript
const colors = ['white', 'black', 'gray'];

const clone = [].concat(colors);

clone;            // => ['white', 'black', 'gray']
colors === clone; // => false
```

`[...color]` creates a clone of `colors` array.  

Tips:

* `[].concat(array)` creates a shallow copy of the array

### 6.3 *array.slice()* method

`array.slice()` is another approach on how to clone `array`.  

```javascript
const colors = ['white', 'black', 'gray'];

const clone = colors.slice();

clone;            // => ['white', 'black', 'gray']
colors === clone; // => false
```

`colors.slice()` creates a clone of `colors` array.  

Tips:

* `colors.slice()` creates a shallow copy of the array

## 7. Search

### 8.1 *array.includes()* method

`array.includes(itemToSearch, [, fromIndex])` returns a boolean whether `itemToSearch` exists in `array`. The optional argument `fromIndex`, defaulting to `0`, indicates the index to start searching.  

Let's determine if the number `2` exists in an array of numbers:

```javascript
const numbers = [1, 2, 3, 4, 5];

numbers.includes(2); // => true
```

`numbers.includes(2)` returns `true` because `2` exists in `numbers` array.  

### 7.2 *array.find()* method

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

### 7.3 *array.indexOf()* method

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

## 8. Query

### 8.1 *array.every()* method

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

### 8.2 *array.some()* method

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

## 9. Filter

### 9.1 *array.filter()*

`array.every(callback)` method returns a new array with items that passed `callback` predicate test.  

On each iteration `callback(item[, index[, array]])` predicate function is invoked with 3 arguments: iterated item, index and array itself.  

Let's filter an array to have only even numbers:

```javascript
const numbers = [1, 5, 7, 10];

const evens = numbers.filter(function isEven(number) {
  return number % 2 === 0;
});

evens; // => [10]
```

`numbers.filter(isEven)` creates a new array `evens` by filtering `numbers` to contain only even numbers: those that pass `isEven` predicate test.  

Tips:

* `array.filter()` creates a new array, without mutating the original one

## 10. Insert

### 10.1 *array.push()* method

`array.push(item1[..., itemN])` method appends one or more items to the end of an array, then returns the new length of array.  

Let's append `'Joker'` at the end of `names` array:

```javascript
const names = ['Batman'];

names.push('Joker');

names; // ['Batman', 'Joker']
```

`names.push('Joker')` inserts a new item `'Joker'` at the end of `names` array.  

Tips:

* `array.push()` mutates the array in place.

### 10.2 *array.unshift()* method

`array.unshift(item1[..., itemN])` method appends one or more items to the beginning of an array, then returns the new length of array.  

Let's append `'Catwoman'` at the beginning of `names` array:

```javascript
const names = ['Batman'];

names.push('Catwoman');

names; // ['Catwoman', 'Batman']
```

`names.push('Catwoman')` inserts a new item `'Catwoman'` at the beginning of `names` array.  

Tips:

* `array.unshift()` mutates the array in place.

### 10.3 Spread operator

You can insert items in an array in a immutable manner by combining the spread operator with the array literal.  

Appending an item at the *end of an array*:

```javascript
const names = ['Joker', 'Bane'];

const names2 = [
  ...names,
  'Batman',
];

names2; // => ['Joker', 'Bane', 'Batman'];
```

Appending an item at the *beginning of an array*:

```javascript
const names = ['Joker', 'Bane'];

const names2 = [
  'Batman',
  ...names
];

names2; // => ['Batman', 'Joker', 'Bane'];
```

Inserting an item *at any index*:

```javascript
const names = ['Joker', 'Bane'];
const indexToInsert = 1;

const names2 = [
  ...names.slice(0, indexToInsert),
  'Batman',
  ...names.slice(indexToInsert)
];

names2; // => ['Joker', 'Batman', 'Bane'];
```

## 11. Remove

### 11.1 *array.pop()* method

`array.pop()` method removes the last item from an array, then returns it.

For example, let's remove the last element of `colors` array:

```javascript
const colors = ['blue', 'green', 'black'];

const lastColor = colors.pop();

lastColor; // => 'black'
colors;    // => ['blue', 'green']
```

`colors.pop()` removes the last element of `colors` and returns it.  

Tips:

* `array.pop()` mutates the array in place.

### 11.2 *array.shift()* method

`array.shift()` method removes the first item from an array, then returns it.  

For example, let's remove the first element of `colors` array:

```javascript
const colors = ['blue', 'green', 'black'];

const firstColor = colors.pop();

firstColor; // => 'blue'
colors;    // => ['green', 'black']
```

`colors.shift()` removes the first element `'blue'` of `colors` and returns it.  

Tips:

* `array.shift()` mutates the array in place.

### 11.3 *array.splice()* method

`array.splice(fromIndex[, removeCount[, item1[, item2[, ...]]]])` removes items from an array and inserts new items instead.  

For example, let's remove 2 items from index `1`:

```javascript
const names = ['Batman', 'Catwoman', 'Joker', 'Bane'];

names.splice(1, 2);

names; // => ['Batman', 'Bane']
```

`names.splice(1, 2)` from index `1` removes 2 elements: `'Catwoman'` and `'Joker'`.  

What's nice about *names.splice()* method is the ability to insert new items instead of removed ones. 

Following the previous example, let's replace 2 items from index `1` with a new item `'Alfred'`:

```javascript
const names = ['Batman', 'Catwoman', 'Joker', 'Bane'];

names.splice(1, 2, 'Alfred');

names; // => ['Batman', 'Alfred' ,'Bane']
```

Tips:

* `array.splice()` mutates the array in place.  

### 11.4 Spread operator

You can remove items from an array in a immutable manner by combining the spread operator with the array literal.  

Let's remove a few items:

```javascript
const names = ['Batman', 'Catwoman', 'Joker', 'Bane'];
const fromIndex = 1;
const removeCount = 2;

const newNames = [
  ...names.slice(0, fromIndex),
  ...names.slice(fromIndex + removeCount)
];

newNames; // => ['Batman', 'Bane']
```

`newNames` contains the items of `names`, but with 2 ones removed.  

## 12. Empty

### 12.1 *array.length* property

`array.length` is a property that denotes the array length. What's interesting is that `array.length` is writable.  

If you write a smaller than current length `array.length = newLength`, the extra elements are removed from array.  

Let's use `array.length = 0` to remove all the items of an array:

```javascript
const colors = ['blue', 'green', 'black'];

colors.length = 0;

colors; // []
```

`colors.length = 0` removes all items from `colors` array.  

### 12.2 *array.splice()* method

`array.splice(fromIndex[, removeCount[, item1[, item2[, ...]]]])` removes items from an array and inserts new items instead. 

If `removeCount` argument is omitted, then `array.splice()` removes all elements of the array starting `fromIndex`.  

Let's use this to remove all elements of an array:

```javascript
const colors = ['blue', 'green', 'black'];

colors.splice(0);

colors; // []
```

`colors.splice(0)` removes all elements of `colors` array.  

## 13. Fill

### 13.1 *array.fill()* method

`array.fill(item[, fromIndex[, toIndex]])` fills the array with `item` starting `fromIndex` until `toIndex` (excluding `toIndex` itself). `fromIndex` optional argument defaults to `0`, `toIndex` optional argument defaults to `array.length`.  

For example, let's fill an array with zero values:

```javascript
const numbers = [1, 2, 3, 4];

numbers.fill(0);

numbers; // => [0, 0, 0, 0]
```

`numbers.fill(0)` fills the array with zeros.  

`array.fill()` can initialize an array of certain length with initial value:

```javascript
const length = 5;
const zeros = Array(length).fill(0);

zeros; // [0, 0, 0, 0, 0]
```

`Array(length).fill(0)` creates an array of 5 zeros.  

Tips:

* `array.splice()` mutates the array in place.  

### 13.2 *Array.from()* function

`Array.from()` can be useful to initialize an array of certain length with objects:

```javascript
const length = 4;
const emptyObjects = Array.from(Array.length, function() {
  return {};
});

emptyObjects; // [{}, {}, {}, {}]
```

`emptyObjects` is an array initialized with different instances of empty objects.  

## 14. Flatten

### 14.1 *array.flat()* method

`array.flat([depth])` method creates a new array by flatting the items that are arrays recursively until certain `depth`. `depth` optional argument defaults to `1`.  

Let's flatten array of of arrays:

```javascript
const arrays = [0, [1, 3, 5], [2, 4, 6]];

const flatArray = arrays.flat();

flatArray; // [0, 1, 3, 5, 2, 4, 6]
```

`arrays` contains a mix of numbers and arrays of numbers. `arrays.flat()` flats the array so that it contains only numbers.  

Tips:

* `array.flat()` mutates the array in place.  

## 15. Sort

### 15.1 *array.sort()* method

`array.sort([compare])` method sorts the items of the array.  

The optional argument `compare(item1, item2)` is a callback that customizes the order of items. If `compare(item1, item2)` returns:

* `-1` then `item1` is followed by `item2` in the sorted array
* `1` then `item2` is followed by `item1` in the sorted array
* `0` then the position of items doesn't change

Let's sort an array of numbers:

```javascript
const numbers = [4, 3, 1, 2];

numbers.sort();

numbers; // => [1, 2, 3, 4]
```

`numbers.sort()` sort the numbers in ascending order.  

Let's use the compare callback and make even numbers followed by odd ones:

```javascript
const numbers = [4, 3, 1, 2];

numbers.sort(function compare(number1, number2) {
  const isEven1 = number1 % 2 === 0;
  const isEven2 = number2 % 2 === 0;
  if (isEven1 && !isEven2) { return 1; }
  if (!isEven1 && isEven2) { return -1; }
  return 0;
});

numbers; // => [4, 2, 3, 1]
```

`numbers.sort(compare)` uses the custom compare function that orders even numbers first.  

Tips:

* `array.sort()` mutates the array in place.  