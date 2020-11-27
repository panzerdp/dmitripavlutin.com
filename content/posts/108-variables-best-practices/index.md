---
title: "5 Best Practices to Write Quality JavaScript Variables"
description: "5 best practices to write quality JavaScript variables."
published: "2020-12-01T12:00Z"
modified: "2020-12-01T12:00Z"
thumbnail: "./images/cover-2.png"
slug: javascript-variables-best-practices
tags: ['javascript', 'variable', 'clean code']
recommended: ['javascript-modules-best-practices', 'javascript-arrow-functions-best-practices']
type: post
---

Variables are everywhere. Even if you're writing a small function, or writing a big application: you always declare, assign, and read variables.  

Regarding good coding discipline, I would put the ability to correctly use variables at a high level.  

So, if you'd like to improve the way you work with variables in JavaScript, and then enjoy the benefits of increased readability and maintainability of your code: then let's get started.  

In this post, you'll read about 5 best practices of how to declare and use JavaScript variables.

## 1. Prefer *const*, othewise use *let*

Usually I declare my JavaScript variables using `const` or `let`.  

 The main difference between `const` and `let` is that `const` always requires an initial value, and you cannnot reassign a value to `const` variable once initialized.  

```javascript
// const requires initialization
const pi = 3.14;
// const cannot be reassigned
pi = 4.89; // throws "TypeError: Assignment to constant variable"
```

```javascript
// let initialization is optional
let result;
// let can be reassigned
result = 14;
result = result * 2;
```

A good practice when choosing the declaration statement for variables is to *prefer `const`, otherwise use `let`.*  

Because `const` requires initialization and cannot be reassigned, it is much easier to reason about it compared to `let` variables.    

For example, if you're looking at a function body and see a `const result = ...` declaration:

```javascript{4}
function myBigFunction(param1, param2) {
  /* lots of stuff... */

  const result = otherFunction(param1);

  /* lots of stuff... */
  return something;
}
```

Without knowing much about what happens inside `myBigFunction()`, you can conclude that `result` variable is assigned once, and after declaration is readonly.  

In other cases, if your variable has to be reassigned multiple times during execution, then `let` declaration is the way to go.  

## 2. Minimize lifetime and lifespace

The variables in JavaScript live and are accessible within the [scope](/javascript-scope/) they've been created. A code block and a function body create a scope for `const` and `let` variables.  

A good practice to increase the readability of variables is to try to keep them in smallest possible scope.  

For example, the following function is an implementation of [binary search algorithm](https://en.wikipedia.org/wiki/Binary_search_algorithm):

```javascript{2,3,8,9}
function binarySearch(array, search) {
  let middle;
  let middleItem;
  let left = 0;
  let right = array.length - 1;

  while(left <= right) {
    middle = Math.floor((left + right) / 2);
    middleItem = array[middle];
    if (middleItem === search) { 
      return true; 
    }
    if (middleItem < search) { 
      left = middle + 1; 
    } else {
      right = middle - 1; 
    }
  }
  return false;
}

binarySearch([2, 5, 7, 9], 7); // => true
binarySearch([2, 5, 7, 9], 1); // => false
```

Let's look at the `middle` and `middleItem` variables. During each cycle of searching, `middle` variable keeps the index of the current middle item of binary search, while `middleItem` variable keep the middle item.  

As you can see, the `middle` and `middleItem` variables are declired at the beginning of the function `binarySearch()`. Thus, these variables are available within the entire scope created by `binarySearch()` function body.  

However, `middle` and `middleItem` variables are used only within the `while` cycle code block. So... why not declaring these variables directly within `while` code block?  

```javascript{6,7}
function binarySearch(array, search) {
  let left = 0;
  let right = array.length - 1;

  while(left <= right) {
    const middle = Math.floor((left + right) / 2);
    const middleItem = array[middle];
    if (middleItem === search) { 
      return true; 
    }
    if (middleItem < search) { 
      left = middle + 1; 
    } else {
      right = middle - 1; 
    }
  }
  return false;
}
```

Now `middle` and `middleItem` variables exists solely in the scope that uses the variables. They have a minimal lifetime and lifespace, and it is easier to reason about them.  

## 3. As close as possible to usage

## 4. Good naming means easy reading

## 5. Introduce exlanatory variables

## 6. Summary