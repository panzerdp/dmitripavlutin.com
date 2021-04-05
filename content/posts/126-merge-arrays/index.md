---
title: '3 Ways to Merge Arrays in JavaScript'
description: "How to merge arrays in JavaScript using spread operator, array.concat() and other approaches."
published: "2021-04-06T12:00Z"
modified: "2021-04-06T12:00Z"
thumbnail: "./images/cover-2.png"
slug: javascript-merge-arrays
tags: ['javascript', 'array']
recommended: ['javascript-array-sort-numbers', 'operations-on-arrays-javascript']
type: post
---

The array is a data structure that holds an ordered collection of items indexed by a number &mdash; the index.  

```javascript
// Example of an array
const numbers = [4, 8];

// Access elements by index
const index = 1;
numbers[index]; // => 1
```

The common operations you can perform on a single array are accessing an item by index, querying the array length, pushing a new item, etc. These are the operations performed on a single array.  

On top of that, some operations can be performed on multiple arrays. One of such common operations is *merge* &mdash; when 2 or more arrays are merged to form a bigger array containing all the items of the merged arrays.  

For example, having two arrays `[1, 2]` and `[5, 6]`, then merging these arrays will result in `[1, 2, 5, 6]`.  

In this post, you'll find how to merge arrays in JavaScript: 2 ways to merge arrays by creating a new array (immutable), and 1 approach where the arrays merge into an array (mutable).  

## 1. Immutable merge of arrays

### 1.1 Merge using the spread operator

If you'd like to know just 1 one way to merge arrays in JavaScript, then you should remember the merge using the spread operator.  

Put inside the array literal two or more arrays prefixed with the spread operator `...`:

```javascript
// merge array1 and array2
const mergeResult = [...array1, ...array2];
```

For example, consider the following 2 arrays `heros` and `villains`:

```javascript
const heroes = ['Batman', 'Superman'];
const villains = ['Joker', 'Bane'];

const all = [...heroes, ...villains];

all; // ['Batman', 'Superman', 'Joker', 'Bane']
```

The statement `const all = [...heros, ...villains]` merges the 2 arrays `heros` and `villains` into a new array that's assigned to variable `all`.  

Note that the order of merged arrays inside the array literal does matter: items of the merged arrays are inserted in the same order as the array appears inside the literal. 

For example, let's put the list of villains before the list of heroes in the merged array:

```javascript
const heroes = ['Batman', 'Superman'];
const villains = ['Joker', 'Bane'];

const all = [...villains,  ...heroes];

all; // ['Joker', 'Bane', 'Batman', 'Superman']
```

Note that you can merge 2 and even more arrays at once: 

```javascript
const mergeResult = [...array1, ...array2, ...array3, ...arrayN];
```

### 1.2 Merge using *array.concat()* method

If you prefer a more functional way to merge arrays, then you can use the `array1.concat(array2)` method:

```javascript
// merge array1 and array2
const mergeResult = array1.concat(array2);
```

or using another form:

```javascript
// merge array1 and array2
const mergeResult = [].concat(array1, array2);
```

The `array.concat()` method doesn't mutate the array upon which it is called.  

Let's use the method to merge the `heroes` and `villains`:

```javascript
const heroes = ['Batman', 'Superman'];
const villains = ['Joker', 'Bane'];

const all1 = heroes.concat(villains);
const all2 = [].concat(heros, villains);

all1; // ['Batman', 'Superman', 'Joker', 'Bane']
all2; // ['Batman', 'Superman', 'Joker', 'Bane']
```

`heroes.concat(villains)` as well as `[].concat(heros, villains)` return a new array where `heros` and `villains` arrays are merged.  

The concat method accepts many arrays as arguments, thus you can merge 2 or more arrays at once:

```javascript
const mergeResult = [].concat(array1, array2, array3, arrayN);
```

# 2. Mutable merge of arrays

The spread operator and *array.concat()* ways to merge arrays create a new array with the merge result. However, sometimes you don't want to create a new array, but rather merge it into some existing array.  

The approach below performs a mutable way to merge arrays.  

### 2.1 Merge using *array.push()* method

You might know already that `array.push(item)` method pushes an item at the end of the array.  

```javascript
const heroes = ['Batman'];

heroes.push('Superman');

heroes; // ['Batman', 'Superman']
```

But thanks to the fact that `array.push(item1, item2, ..., itemN)` accepts multiple items to push and using the spread operator on arguments, you can push an entire array efficiently implementing a merge:

```javascript
// merge array2 into array1
array1.push(...array2);
```

For example, let's merge `villains` into `heros` arrays:

```javascript
const heroes = ['Batman', 'Superman'];
const villains = ['Joker', 'Bane'];

heroes.push(...villains);

heros; // // ['Batman', 'Superman', 'Joker', 'Bane']
```

`heroes.push(...villains)` pushes all the items of `villains` array at the end of `heroes` array &mdash; performing a merge into operator. `heros` does get mutated.  

## 3. Conclusion

JavaScript offers multiple ways to merge arrays.  

The 2 immutable approaches that I enjoy the most are either using the spread operator `[...array1, ...array2]` either using a functional way `[].concat(array1, array2)`.  

If you'd like to perform a mutable merge, i.e. merge into an array without creating a new one, then you can use `array1.push(...array2)` approach.  

