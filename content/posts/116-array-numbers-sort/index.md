---
title: "array.sort() Does Not Simply Sort Numbers in JavaScript"
description: "array.sort() method, when invoked without arguments, doesn't sort numbers as you might expect."
published: "2021-01-26T12:00Z"
modified: "2021-01-26T12:00Z"
thumbnail: "./images/cover-2.png"
slug: javascript-array-sort-numbers
tags: ['javascript', 'array', 'number', 'sort']
recommended: ['react-hooks-mistakes-to-avoid', 'react-useeffect-explanation']
type: post
---

The `array.sort()` method sorts the elements of an array. The usual type of elements you want to sort in 
an array are numbers.  

Let's try to sort some numbers:

```javascript
const numbers = [10, 5, 11];

numbers.sort(); // => [10, 11, 5]
```

`numbers.sort()` doesn't return an array of sorted ascending number, but `[10, 11, 5]`. That's defintely not correctly sorted in ascending order.  

Why does `array.sort()` method, when invoked without arguments, doesn't sort the numbers as expected? Let's find the answer.  

## 1. *array.sort()* without arguments

`array.sort()` is a method on array instance that sorts the array in place, i.e. mutates the sorted array. When called without arguments, the array items are transformed to strings, and sorted... alphabetically.  

For example, let's sort an array of names:

```javascript
const names = ['joker', 'batman', 'catwoman'];

names.sort(); // => ['batman', 'catwoman', 'joker']
```

As the example above shows, the names are sorted alphabetically.  

The same alphabetical sorting happens in case of numbers:

```javascript
const numbers = [10, 5, 11];

numbers.sort(); // => [10, 11, 5]
```

`'10'` is alphabetically first, `'11'` is the second and finally `'5'` is the third item sorted alphabetically.  



## 2. *array.sort()* with comparator

Fortunately, `array.sort()` method accepts an optional argument: the comparator callback function. Using this function you can control how items are ordered in the array.  

```javascript
const mutatedArray = array.sort([comparator]);
```

`comparator` is the callback that customizes the order of items. 

If `comparator(a, b)` returns:

* A negative number `< 0`:  then `a` is placed before `b`
* A positive number `> 0`: then `b` is placed before `a`
* Zero `0`:  then the position of the compared items doesn't change

To correctly sort numbers in ascending order let's use the comparator function:

```javascript
const numbers = [10, 5, 11];

numbers.sort((a, b) => {
  if (a < b) {
    return -1;
  }
  if (a > b) {
    return 1;
  }
  return 0;
}); // => [5, 10, 11]
```

`numbers.sort(comparator)` now correctly sorts the numbers: `[5, 10, 11]`.  

The comparator function in the previous example is quite long, but fortunately, you can use a little trick:

```javascript
const numbers = [10, 5, 11];

numbers.sort((a, b) => a - b); // => [5, 10, 11]
```

`(a, b) => a - b` is short comparator that correctly sorts the numbers.  

## 3. Sorting typed arrays



## 4. Summary