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

The array is a widely used data structure in JavaScript.

The number of operations you can perform on arrays (iteration, inserting items, removing items, etc) is big. The array object provides a decent number of useful methods like `array.forEach()`, `array.map()` and more.  

Often I find myself overwhelmed by the number of possible operations on arrays and the corresponding implementations. You might be in the same situation too.

I've decided to implement 15 common operations on arrays. If you need to perform a specific operation, just pick the implementation from the table of contents.  

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

On each iteration, the variable `color` is assigned with the iterated item. 

Tips:

* You can stop iterating at any time using a `break` statement.

### 1.2 *for* cycle

`for(let i; i < array.length; i++)` cycle iterates over array items using an incrementing index variable. 

`for` usually requires `index` variable that increments on each cycle:

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

`index` variable increments from `0` until `colors.length - 1`. This variable is used to access the item by index: `colors[index]`.  

Tips:

* You can stop iterating at any time using a `break` statement.

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

`array.map(callback)` method creates to a new array by using `callback` invocation result on each array item.  

On each iteration `callback(item[, index[, array]])` is invoked with arguments: current item, index and the array itself. It should return the new item.  

Let's increment the numbers of an array:

```javascript
const numbers = [0, 2, 4];

const newNumbers = numbers.map(function increment(number) {
  return number + 1;
});

newNumbers; // => [1, 3, 5]
```

`numbers.map(increment)` creates a new array from `numbers` by incrementing each array item. 

Tips:

* `array.map()` creates a new mapped array, without mutating the original one.

### 2.2 *Array.from()* function

`Array.from(arrayLike[, callback])` method creates to a new array by using `callback` invocation result on each array item.  

On each iteration `callback(item[, index[, array]])` is invoked with arguments: current item, index and the array itself. It should return the new item.  

Let's increment the numbers of an array:

```javascript
const numbers = [0, 2, 4];

const newNumbers = Array.from(numbers,
 function increment(number) {
   return number + 1;
 }
);

newNumbers; // => [1, 3, 5]
```

`Array.from(numbers, increment)` creates a new array from `numbers` by incrementing each array item.

Tips:

* `Array.from()` creates a new mapped array, without mutating the original one
* `Array.from()` fits better to map from an [array-like object](/javascript-array-from-applications/#2-transform-array-like-into-an-array).

## 3. Reduce

### 3.1 *array.reduce()* method

`array.reduce(callback[, initialValue])` reduces the array to a value by invoking `callback` function as a reducer. 

On each iteration `callback(accumulator, item[, index[, array]])` is invoked with arguments: accumulator, current item, index and the array itself. It should return the accumulator.   

The classic example is summing an array of numbers:

```javascript
const numbers = [2, 0, 4];

function summarize(accumulator, number) {
  return accumulator + number;
}

const sum = numbers.reduce(summarize, 0);

sum; // => 6
```

At first step `accumulator` is initialized with `0`. Then `summarize` function is invoked on each array item accumulating the sum of numbers.  

Tips:

* The first array item becomes the initial value if you skip the `initialValue` argument.

## 4. Concat

### 4.1 *array.concat()* method

`array.concat(array1[, array2, ...])` concatenates to the original array one or more arrays. 

Let's concatenate 2 arrays of names:

```javascript
const heroes = ['Batman', 'Robin'];
const villains = ['Joker', 'Bane'];

const everyone = heroes.concat(villains);

everyone; // => ['Batman', 'Robin', 'Joker', 'Bane']
```

`heroes.concat(villains)` creates a new array by concatenating `heroes` and `villains` arrays. 

Tips:

* `array.concat()` creates a new array, without mutating the original one
* `array.concat(array1[, array2, ...])` accepts multiple arrays to concat.  

### 4.2 Spread operator

You can use the spread operator with an array literal to concatenate arrays: `[...array1, ...array2]`.

Let’s concatenate 2 arrays of names:

```javascript
const heroes = ['Batman', 'Catwoman'];
const villains = ['Joker', 'Bane'];

const names = [...heroes, ...villains];

names; // => ['Batman', 'Catwoman', 'Joker', 'Bane']
```

`[...heroes, ...villains]` spreads `heroes` and `villains` items, then creates a new array containing all spread items. 

* `[...arr1, ...arr2, ...arrN]`: you can concat as many arrays as you need using spread operator.  

## 5. Slice

### 5.1 *array.slice()* method

`array.slice([fromIndex[, toIndex]])` returns a slice of the array starting `fromIndex` and ending `toIndex` (excluding `toIndex` itself). `fromIndex` optional argument defaults to `0`, `toIndex` optional argument defaults to `array.length`.  

Let's get some array slices:  

```javascript
const names = ['Batman', 'Catwoman', 'Joker', 'Bane'];

const heroes = names.slice(0, 2);
const villains = names.slice(2);

heroes; // => ['Batman', 'Catwoman']
villains; // => ['Joker', 'Bane']
```

`names.slice(0, 2)` returns a slice of 2 items from `names` array.  

`names.slice(2)` returns a slice of 2 items. The `end` argument defaults to `names.length`.  

Tips:

* `array.slice()` creates a new array, without mutating the original one.

## 6. Clone

### 6.1 Spread operator

An easy way to clone an array is to use the spread operator: `const clone = [...array]`;

Let's clone an array of `colors`:

```javascript
const colors = ['white', 'black', 'gray'];

const clone = [...colors];

clone; // => ['white', 'black', 'gray']
colors === clone; // => false
```

`[...colors]` creates a clone of `colors` array.

Tips:

* `[...array]` creates a shallow copy.

### 6.2 *array.concat()* method

`[].concat(array)` is yet another approach on how to clone `array`. 

```javascript
const colors = ['white', 'black', 'gray'];

const clone = [].concat(colors);

clone; // => ['white', 'black', 'gray']
colors === clone; // => false
```

`[].concat(colors)` creates a clone of `colors` array.  

Tips:

* `[].concat(array)` creates a shallow copy.

### 6.3 *array.slice()* method

`array.slice()` is another approach on how to clone `array`.

```javascript
const colors = ['white', 'black', 'gray'];

const clone = colors.slice();

clone; // => ['white', 'black', 'gray']
colors === clone; // => false
```

`colors.slice()` creates a clone of `colors` array. 

Tips:

* `colors.slice()` creates a shallow copy.

## 7. Search

### 8.1 *array.includes()* method

`array.includes(itemToSearch[, fromIndex])` returns a boolean whether `array` contains `itemToSearch`. The optional argument `fromIndex`, defaulting to `0`, indicates the index to start searching.  

Let's determine if `2` and `99` exist in an array of numbers:

```javascript
const numbers = [1, 2, 3, 4, 5];

numbers.includes(2);  // => true
numbers.includes(99); // => false
```

`numbers.includes(2)` returns `true` because `2` exists in `numbers` array.

`numbers.includes(99)` is, however, `false` because `numbers` doesn't contain `99`.  

### 7.2 *array.find()* method

`array.find(callback)` method returns the first array item that satisfies the `callback` predicate function. 

On each iteration `callback(item[, index[, array]])` predicate function is invoked with the arguments: iterated item, index and the array itself.  

For example, let's find the first odd number:

```javascript
const numbers = [1, 2, 3, 4, 5];

const oddNumber = numbers.find(function isOdd(number) {
  return number % 2 === 0;
});

oddNumber; // => 2
```

`numbers.find(isOdd)` returns the first odd number inside `numbers`, which is `2`. 

Tips:

* `array.find()` returns `undefined` if no item has satisfied the predicate.  

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

* `array.indexOf(itemToSearch)` returns `-1` if the item hasn't been found
* `array.findIndex(predicate)` is an alternative to find the index using a predicate function.

## 8. Query

### 8.1 *array.every()* method

`array.every(predicate)` method returns `true` if every item passes `predicate` check.  

On each iteration `predicate(item[, index[, array]])` predicate function is invoked with the arguments: iterated item, index and the array itself.

Let's determine whether arrays `evens` and `mix` contain only even numbers:

```javascript
const evens = [0, 2, 4, 6];
const numbers = [0, 1, 4, 6];

function isEven(number) {
  return number % 2 === 0;
}

evens.every(isEven); // => true
numbers.every(isEven); // => false
```

`odds.every(isEven)` is `true` because *all* numbers in `evens` are even. 

However, `numbers.every(isEven)` evaluates to `false` because `numbers` contains an odd number `1`.  

### 8.2 *array.some()* method

`array.every(predicate)` method returns `true` if at least one item passes `predicate` check.  
On each iteration `predicate(item[, index[, array]])` function is invoked with the arguments: iterated item, index and the array itself.  

Let's determine whether the arrays contain at least one even number:

```javascript
const numbers = [1, 5, 7, 10];
const odds = [1, 3, 3, 3];

function isEven(number) {
  return number % 2 === 0;
}

numbers.some(isEven); // => true
odds.some(isEven);   // => false
```

`numbers.some(isEven)` is `true` because at least one even number, `10`, exists in `numbers`. 

But `odds.some(isEven)` is `false` because `odds` contains only odd numbers. 

## 9. Filter

### 9.1 *array.filter()*

`array.every(predicate)` method returns a new array with items that have passed `predicate` check.  

On each iteration `predicate(item[, index[, array]])` function is invoked with the arguments: iterated item, index and the array itself.  

Let's filter an array to have only even numbers:

```javascript
const numbers = [1, 5, 7, 10];

function isEven(number) {
 return number % 2 === 0;
}

const evens = numbers.filter(isEven);

evens; // => [10]
```

`numbers.filter(isEven)` creates a new array `evens` by filtering `numbers` to contain only even numbers.  

Tips:

* `array.filter()` creates a new array, without mutating the original one.

## 10. Insert

### 10.1 *array.push()* method

`array.push(item1[..., itemN])` method appends one or more items to the end of an array, returning the new length.  

Let's append `'Joker'` at the end of `names` array:

```javascript
const names = ['Batman'];

names.push('Joker');

names; // ['Batman', 'Joker']
```

`names.push('Joker')` inserts a new item `'Joker'` at the end of the `names` array. 

Tips:

* `array.push()` mutates the array in place
* `array.push(item1, item2, ..., itemN)` can push multiple items.  

### 10.2 *array.unshift()* method

`array.unshift(item1[..., itemN])` method appends one or more items to the beginning of an array, returning the new length of the array.

Let's append `'Catwoman'` at the beginning of `names` array:

```javascript
const names = ['Batman'];

names.unshift('Catwoman');

names; // ['Catwoman', 'Batman']
```

`names.unshift('Catwoman')` inserts a new item `'Catwoman'` at the beginning of `names` array.  

Tips:

* `array.unshift()` mutates the array in place.  
* `array.unshift(item1, item2, ..., itemN)` can insert multiple items.  

### 10.3 Spread operator

You can insert items in an array in an immutable manner by combining the spread operator with the array literal.  

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

`array.pop()` method removes the last item from an array, then returns that item.

For example, let's remove the last element of `colors` array:

```javascript
const colors = ['blue', 'green', 'black'];

const lastColor = colors.pop();

lastColor; // => 'black'
colors; // => ['blue', 'green']
```

`colors.pop()` removes the last element of `colors` and returns it.

Tips:

* `array.pop()` mutates the array in place.

### 11.2 *array.shift()* method

`array.shift()` method removes the first item from an array, then returns that item.

For example, let's remove the first element of `colors` array:

```javascript
const colors = ['blue', 'green', 'black'];

const firstColor = colors.shift();

firstColor; // => 'blue'
colors; // => ['green', 'black']
```

`colors.shift()` removes the first element `'blue'` of `colors` and returns it.  

Tips:

* `array.shift()` mutates the array in place
* `array.shift()` has O(n) complexity.

### 11.3 *array.splice()* method

`array.splice(fromIndex[, removeCount[, item1[, item2[, ...]]]])` removes items from an array and inserts new items instead.

For example, let's remove 2 items from index `1`:

```javascript
const names = ['Batman', 'Catwoman', 'Joker', 'Bane'];

names.splice(1, 2);

names; // => ['Batman', 'Bane']
```

`names.splice(1, 2)` removes the elements `'Catwoman'` and `'Joker'`.  

`names.splice()` can insert new items instead of removed ones. Let's replace 2 items from index `1`, and insert a new item `'Alfred'` instead:

```javascript
const names = ['Batman', 'Catwoman', 'Joker', 'Bane'];

names.splice(1, 2, 'Alfred');

names; // => ['Batman', 'Alfred' ,'Bane']
```

Tips:

* `array.splice()` mutates the array in place.

### 11.4 Spread operator

You can remove items from an array in an immutable manner by combining the spread operator with the array literal.

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

`newNames` contains the items of `names`, but without 2 that were removed.  

## 12. Empty

### 12.1 *array.length* property

`array.length` is a property that holds the array length. More than that, `array.length` is writable.  

If you write a smaller than current length `array.length = newLength`, the extra elements are removed from the array.  

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

`array.fill(value[, fromIndex[, toIndex]])` fills the array with `value` starting `fromIndex` until `toIndex` (excluding `toIndex` itself). `fromIndex` optional argument defaults to `0`, `toIndex` optional argument defaults to `array.length`.  

For example, let's fill an array with zero values:

```javascript
const numbers = [1, 2, 3, 4];

numbers.fill(0);

numbers; // => [0, 0, 0, 0]
```

`numbers.fill(0)` fills the array with zeros.  

More than that, you can initialize arrays of specific length and initial value using `Array(length).fill(initial)`:  

```javascript
const length = 3;
const zeros = Array(length).fill(0);

zeros; // [0, 0, 0]
```

`Array(length).fill(0)` creates an array of 3 zeros.

Tips:

* `array.fill()` mutates the array in place.

### 13.2 *Array.from()* function

`Array.from()` can be useful to initialize an array of certain length with objects:

```javascript
const length = 4;
const emptyObjects = Array.from(Array(length), function() {
 return {};
});

emptyObjects; // [{}, {}, {}, {}]
```

`emptyObjects` is an array initialized with different instances of empty objects. 

## 14. Flatten

### 14.1 *array.flat()* method

`array.flat([depth])` method creates a new array by recursively flatting the items that are arrays, until certain `depth`. `depth` optional argument defaults to `1`. 

Let's flatten an array of arrays:

```javascript
const arrays = [0, [1, 3, 5], [2, 4, 6]];

const flatArray = arrays.flat();

flatArray; // [0, 1, 3, 5, 2, 4, 6]
```

`arrays` contains a mix of numbers and arrays of numbers. `arrays.flat()` flats the array so that it contains only numbers. 

Tips:

* `array.flat()` creates a new array, without mutating the original one.

## 15. Sort

### 15.1 *array.sort()* method

`array.sort([compare])` method sorts the items of the array.

The optional argument `compare(item1, item2)` is a callback that customizes the order of items. If `compare(item1, item2)` returns:

* `-1` then `item1` will follow by `item2` in the sorted array
* `1` then `item2` will follow by `item1` in the sorted array
* `0` then the position of items doesn't change

Let's sort an array of numbers:

```javascript
const numbers = [4, 3, 1, 2];

numbers.sort();

numbers; // => [1, 2, 3, 4]
```

`numbers.sort()` sort the numbers in ascending order. 

Let's use the compare function and make even numbers followed by odd ones:

```javascript
const numbers = [4, 3, 1, 2];

function compare(n1, n2) {
 if (n1 % 2 === 0 && n2 % 2 !== 0) {
   return -1;
 }
 if (n1 % 2 !== 0 && n2 % 2 === 0) {
   return -1;
 }
 return 0;
}

numbers.sort(compare);

numbers; // => [4, 2, 3, 1]
```

`numbers.sort(compare)` uses the custom compare function that orders even numbers first.  

Tips:

* `array.sort()` mutates the array in place.
