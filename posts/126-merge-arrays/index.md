---
title: "3 Ways to Merge Arrays in JavaScript"
description: "How to merge arrays in JavaScript using spread operator, array.concat(), and array.push()."
published: "2021-04-06T06:30Z"
modified: "2023-01-28"
thumbnail: "./images/cover.png"
slug: javascript-merge-arrays
tags: ['javascript', 'array']
type: post
---

An array is a data structure representing an ordered collection of indexed items.  

A common operation performed on multiple arrays is *merge* &mdash; when 2 or more arrays are merged to form a bigger array containing all the items of the merged arrays.  

For example, having two arrays `[1, 2]` and `[5, 6]`, then merging these arrays results in `[1, 2, 5, 6]`.  

In this post, you'll find 3 ways to merge arrays in JavaScript: 2 immutable (a new array is created after the merge) and 1 mutable (items are merged into an array).  

<Affiliate type="traversyJavaScript" />

<TableOfContents />

## 1. Merge using the spread operator

If you want to know one good way to merge arrays in JavaScript, then remember the merge using the spread operator.  

Write inside the array literal two or more arrays prefixed with the spread operator `...`, and JavaScript will create a new array with all these arrays merged:

```javascript
// merge array1 and array2
const mergeResult = [...array1, ...array2];
```

For example, let's merge 2 arrays `heroes` and `villains`:

```javascript
const heroes = ['Batman', 'Superman'];
const villains = ['Joker', 'Bane'];

const all = [...heroes, ...villains];

console.log(all); // ['Batman', 'Superman', 'Joker', 'Bane']
```

[Open the demo.](https://jsfiddle.net/dmitri_pavlutin/7ktcmnvs/)

`const all = [...heroes, ...villains]` creates a new array having `heroes` and `villains` arrays merged.  

The order of merged arrays inside the array literal does matter: items of the merged arrays are inserted in the same order as the arrays appear inside the literal. 

For example, let's put the list of villains before the list of heroes in the merged array:

```javascript
const heroes = ['Batman', 'Superman'];
const villains = ['Joker', 'Bane'];

const all = [...villains,  ...heroes];

console.log(all); // ['Joker', 'Bane', 'Batman', 'Superman']
```
[Open the demo.](https://jsfiddle.net/dmitri_pavlutin/esqxrctg/)

The spread operator approach lets you merge 2 and even more arrays at once: 

```javascript
const mergeResult = [...array1, ...array2, ...array3, ...arrayN];
```

## 2. Merge using array.concat()

If you prefer a functional way to merge arrays, then you can use the `array1.concat(array2)` method:

```javascript
// merge array1 and array2
const mergeResult = array1.concat(array2);
```

or using another form:

```javascript
// merge array1 and array2
const mergeResult = [].concat(array1, array2);
```

`array.concat()` method doesn't mutate the array upon which it is called but returns a new array having the merge result.    

Let's use `array.concat()` to merge the `heroes` and `villains`:

```javascript
const heroes = ['Batman', 'Superman'];
const villains = ['Joker', 'Bane'];

const all1 = heroes.concat(villains);
const all2 = [].concat(heroes, villains);

console.log(all1); // ['Batman', 'Superman', 'Joker', 'Bane']
console.log(all2); // ['Batman', 'Superman', 'Joker', 'Bane']
```

[Open the demo.](https://jsfiddle.net/dmitri_pavlutin/swkpyqug/)

`heroes.concat(villains)` or `[].concat(heroes, villains)` return a new array where `heroes` and `villains` arrays are merged.  

The concat method accepts multiple arrays as arguments, thus you can merge 2 or more arrays at once:

```javascript
const mergeResult = [].concat(array1, array2, array3, arrayN);
```

## 3. Merge using array.push()

The merge performed using the spread operator or `array.concat()` creates a new array. However, sometimes you don't want to create a new array, but rather merge it into some existing array.  

The approach below performs a mutable way to merge.

You might know already that `array.push(item)` method pushes an item to the end of the array, mutating the array upon which the method is called:  

```javascript
const heroes = ['Batman'];

heroes.push('Superman');

console.log(heroes); // ['Batman', 'Superman']
```
[Open the demo.](https://jsfiddle.net/dmitri_pavlutin/w837cxfd/)

`array.push(item1, item2, ..., itemN)` also accepts multiple items to push at once, thus you can push an entire array using the spread operator applied to arguments (in other words, performing a merge into):

```javascript
// merge array2 into array1
array1.push(...array2);
```

For example, let's merge `villains` into `heroes` arrays:

```javascript
const heroes = ['Batman', 'Superman'];
const villains = ['Joker', 'Bane'];

heroes.push(...villains);

console.log(heroes); // ['Batman', 'Superman', 'Joker', 'Bane']
```
[Open the demo.](https://jsfiddle.net/dmitri_pavlutin/94nuokzs/)

`heroes.push(...villains)` pushes all the items of `villains` array at the end of `heroes` array &mdash; performing a mutable merge. `heroes` array is mutated.  

*Side challenge: what expression would you use to push multiple arrays at once? Share your solution in a comment below!*

## 4. Conclusion

JavaScript offers multiple ways to merge arrays.  

You can use either the spread operator `[...array1, ...array2]`, or a functional way `[].concat(array1, array2)` to merge 2 or more arrays. These approaches are immutable because the merge result is stored in a new array.  

To perform a mutable merge, i.e. merge into an array without creating a new one, then you can use `array1.push(...array2)` approach.  

*What other ways to merge arrays do you know?*
