---
title: '3 Ways to Merge Arrays in JavaScript'
description: "How to merge arrays in JavaScript using spread operator, array.concat() and array.push()."
published: "2021-04-06T12:00Z"
modified: "2021-04-06T12:00Z"
thumbnail: "./images/cover.png"
slug: javascript-merge-arrays
tags: ['javascript', 'array']
recommended: ['javascript-array-sort-numbers', 'operations-on-arrays-javascript']
type: post
---

The array is a data structure representing an ordered collection of items indexed by a number &mdash; the index.  

A common operation performed on multiple arrays is *merge* &mdash; when 2 or more arrays are merged to form a bigger array containing all the items of the merged arrays.  

For example, having two arrays `[1, 2]` and `[5, 6]`, then merging these arrays results in `[1, 2, 5, 6]`.  

In this post, you'll find how 3 ways to merge arrays in JavaScript: 2 immutable and 1 mutable ways.  

## 1. Immutable merge of arrays

### 1.1 Merge using the spread operator

If you'd like to remember just one but good way to merge arrays in JavaScript, then you should remember the merge using the spread operator.  

Write inside the array literal two or more arrays prefixed with the spread operator `...`:

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

`const all = [...heros, ...villains]` creates a new array having `heros` and `villains` arrays merged.  

The order of merged arrays inside the array literal does matter: items of the merged arrays are inserted in the same order as the array appears inside the literal. 

For example, let's put the list of villains before the list of heroes in the merged array:

```javascript
const heroes = ['Batman', 'Superman'];
const villains = ['Joker', 'Bane'];

const all = [...villains,  ...heroes];

all; // ['Joker', 'Bane', 'Batman', 'Superman']
```

The spread operator approach lets you merge 2 and even more arrays at once: 

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

The `array.concat()` method doesn't mutate the array upon which it is called, instead it return a new array having the merge result.    

Let's use `array.concat()` to merge the `heroes` and `villains`:

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

The approaches to merge using the spread operator and `array.concat()` create a new array with the merge result. However, sometimes you don't want to create a new array, but rather merge it into some existing array.  

The approach below performs a mutable way to merge arrays.  

### 2.1 Merge using *array.push()* method

You might know already that `array.push(item)` method pushes an item at the end of the array, mutating the array upon which the method is called:  

```javascript
const heroes = ['Batman'];

heroes.push('Superman');

heroes; // ['Batman', 'Superman']
```

Thanks to the fact that `array.push(item1, item2, ..., itemN)` accepts multiple items to push and using the spread operator on arguments, you can push an entire array into the original one (in other words, performing a merge):

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

`heroes.push(...villains)` pushes all the items of `villains` array at the end of `heroes` array &mdash; performing a mutable merge. `heros` does get mutated.  

## 3. Conclusion

JavaScript offers multiple ways to merge arrays.  

You can use either the spread operator `[...array1, ...array2]`, or a functional way `[].concat(array1, array2)` to merge 2 or more arrays. These approaches are immutable because the merge result is stored into a new array.  

If you'd like to perform a mutable merge, i.e. merge into an array without creating a new one, then you can use `array1.push(...array2)` approach.  

*What other ways to merge arrays do you know?*
