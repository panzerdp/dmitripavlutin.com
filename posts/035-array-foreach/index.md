---
title: "How to Use forEach() to Iterate an Array in JavaScript"
description: "forEach() in JavaScript calls the provided function on each array item with 3 arguments: item, index, the array itself. Learn how to use forEach()."
published: "2019-07-03"
modified: "2023-03-18"
thumbnail: "./images/cover.jpg"
slug: foreach-iterate-array-javascript
tags: ["javascript", "array", "foreach"]
type: post
---

What's the usual thing you do with an array? Iterate through its items! This is where `forEach()` array method can be helpful.  

This post describes how to use `forEach()` array method to iterate items of an array in JavaScript. Plus, you'll will read about `forEach()` best practices like correct handling of `this` and how to iterate array-like objects.  

<Affiliate type="traversyJavaScript" />

## 1. Basic forEach example

> `array.forEach()` method iterates over the array items, in ascending order, without mutating the array. 

The first argument of `forEach()` is the callback function called for every item in the array. The second argument (optional) is the value of `this` set in the callback.

```javascript
array.forEach(callback [, thisArgument])
```

Let's see how `forEach()` works in practice.  

`colors` array has 3 items. Let's use `forEach()` to log to console each color:  

```javascript
const colors = ['blue', 'green', 'white'];

function iterate(item) {
  console.log(item);
}

colors.forEach(iterate);
// logs "blue"
// logs "green"
// logs "white"
```
[Open the demo.](https://jsfiddle.net/dmitri_pavlutin/ajduzvL5/)

`iterate` is the [callback](/javascript-callback/) function. `colors.forEach(iterate)` executes `iterate` function for each item in `colors`.  

3 invocation of `iterate()` function are perfomed:

* `iterate('blue')`
* `iterate('green')`
* `iterate('white')`

That's how, in a few words, `forEach()` method works.  

## 2. Index of the iterated element

> `array.forEach(callback)` executes the `callback` function with 3 arguments: the current iterated *item*, the *index* of the iterated item and the *array* instance itself. 

```javascript
array.forEach(callback(item [, index [, array]]))
```

Let's access the index of each item in the colors array:

```javascript
const colors = ['blue', 'green', 'white'];

function iterate(item, index) {
  console.log(`${item} has index ${index}`);
}

colors.forEach(iterate);
// logs "blue has index 0"
// logs "green has index 1"
// logs "white has index 2"
```
[Open the demo.](https://jsfiddle.net/dmitri_pavlutin/hzL2uf1q/)

`iterate()` is called with the iterated item and the index arguments. The callback is executed 3 times:

* `iterate('blue', 0)`
* `iterate('green', 1)`
* `iterate('white', 2)`

## 3. Access the array inside the callback

To access the array itself during the iteration, you can use the 3rd parameter inside the callback function.  

Let's log the message `The last iteration!` when JavaScript executes the last iteration on the array items.

```javascript
const colors = ['blue', 'green', 'white'];

function iterate(item, index, array) {
  console.log(item);
  if (index === array.length - 1) {
    console.log('The last iteration!');
  }
}

colors.forEach(iterate);
// logs "blue"
// logs "green"
// logs "white"
// logs "The last iteration!"
```
[Open the demo.](https://jsfiddle.net/dmitri_pavlutin/xwc6sd5a/)

The 3rd parameter `array` inside the callback function is the array on which `forEach()` method was called on. 

## 4. this inside the callback

Let's run the following example in a browser, and pay attention to the value of `this`:

```javascript{3}
const letters = ['a', 'b', 'c'];

function iterate(letter) {
  console.log(this === window); // true
}

letters.forEach(iterate); // logs 3 times "true"
```
[Open the demo.](https://jsfiddle.net/dmitri_pavlutin/vr2ownkc/)

`this` inside `iterate()` equals to `window`, which is the global object in the browser environment. Follow [regular function invocation](/gentle-explanation-of-this-in-javascript/#2-function-invocation) to get more information.  

In some situations, you might need to set `this` to an object of interest. Just indicate this object as the second argument:

```javascript
array.forEach(callback, thisArgument)
```

Let's implement a `Unique` class, which always holds an unique list of items:

```javascript{10}
class Unique {
  constructor(items) {
    this.items = items;
  }
  
  append(newItems) {
    newItems.forEach(function(newItem) {
      if (!this.items.includes(newItem)) {
        this.items.push(newItem);
      }
    }, this);    
  }
}

const uniqueColors = new Unique(['blue']);
console.log(uniqueColors.items); // => ['blue']

uniqueColors.append(['red', 'blue']);
console.log(uniqueColors.items); // => ['blue', 'red']
```
[Open the demo.](https://jsfiddle.net/dmitri_pavlutin/em7pnwL6/)

`newItems.forEach(function() {}, this)` is called with the second argument pointing to `this`, i.e. the instance of `Unique` class. 

Inside the callback of `forEach()`, `this` points also to an instance of `Unique`. Now it's safe to access `this.items`.

For the above example using an arrow function as the callback of `forEach()` would be better (check the [demo](https://jsfiddle.net/dmitri_pavlutin/em7pnwL6/2/)). The [arrow function preserves](/gentle-explanation-of-this-in-javascript/#7-arrow-function) the value of `this` from the lexical scope, so there's no need to use the second argument on `forEach()`.  

## 5. forEach skips empty slots

`forEach()` skips the empty slots of the array (named [sparse array](/power-up-the-array-creation-in-javascript/#third-case-no-element-between-commas)).  

```javascript
const sparseArray = [1, , 3];
sparseArray.length; // => 3

sparseArray.forEach(function(item) {
  console.log(item);
}); // logs 1, 3
```
[Open the demo.](https://jsfiddle.net/dmitri_pavlutin/bqgrm08p/1/)

`sparseArray` contains `1`, an empty slot, and `3`. `forEach()` iterates over `1` and `3`, but skips the empty slot.  

## 6. Iterate array-like objects using forEach

`forEach()` can iterate over array-like objects using an indirect call:

```javascript{11}
const arrayLikeColors = {
  "0": "blue",
  "1": "green",
  "2": "white",
  "length": 3
};

function iterate(item) {
  console.log(item);
}

Array.prototype.forEach.call(arrayLikeColors, iterate);
// logs "blue"
// logs "green"
// logs "white"
```
[Open the demo.](https://jsfiddle.net/dmitri_pavlutin/ke6b8mrc/)

`arrayLikeColors` is an array-like object. To iterate over its items, you have to call `forEach()` indirectly: `Array.prototype.forEach.call(...)`.  

Alternatively, you can transform the array-like object into an array using `Array.from()`, then iterate:

```javascript{11}
const arrayLikeColors = {
  "0": "blue",
  "1": "green",
  "2": "white",
  "length": 3
};

function iterate(item) {
  console.log(item);
}

Array.from(arrayLikeColors).forEach(iterate);
// logs "blue"
// logs "green"
// logs "white"
```
[Open the demo.](https://jsfiddle.net/dmitri_pavlutin/geys3Ln0/)

## 7. When to use forEach()

`forEach()` fits to iterate array items, without breaking, and having simultaneously some [side-effect](https://en.wikipedia.org/wiki/Side_effect_(computer_science)). 

Side-effects examples are a mutation of an outer scope variable, I/O operations (HTTP requests), DOM manipulations, logging to console ,and alike.  

For example, let's select all input elements from the DOM and use `forEach()` to clear them:

```javascript
const inputs = document.querySelectorAll('input[type="text"]');

inputs.forEach(function(input) {
  input.value = '';
});
```

The side effect in the callback function is clearing the value of the input field.  

Keep in mind that you cannot normally break the iteration of `forEach()` (other than a tricky way to throw an error to stop the iteration, which is a cheap hack). The method normally iterates over all the items.  

If your case requires an early break from the cycle, a better option is the classic [for](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for) or [for..of](/javascript-for-of/).  

When the array iteration computes a result, without side-effects, a better alternative is to select an array method like:   

* [array.map()](/operations-on-arrays-javascript/#21-arraymap-method)
* [array.reduce()](/javascript-array-reduce/)
* [array.every()](/operations-on-arrays-javascript/#81-arrayevery-method)
* [array.some()](/operations-on-arrays-javascript/#82-arraysome-method)

For example, let's determine if all numbers of an array are even.  

The first solution involves `forEach()` method:

```javascript
let allEven = true;

const numbers = [22, 3, 4, 10];

numbers.forEach(function(number) {
  if (number % 2 === 1) {
    allEven = false;
    // Break here
  }
});

console.log(allEven); // => false
```
[Open the demo.](https://jsfiddle.net/dmitri_pavlutin/Lwn136sg/)

The code determines correctly if all numbers are even: since the array contains `3`, the variable `allEvent` is `false`. The problem is the impossibility to break after finding the first odd number `3`.  

For this situation, a better alternative is `array.every()` method:

```javascript
const numbers = [22, 3, 4, 10];

const allEven = numbers.every(function(number) {
  return number % 2 === 0;
});

console.log(allEven); // => false
```
[Open the demo.](https://jsfiddle.net/dmitri_pavlutin/uLyztvwd/)

`array.every()` makes the code shorter. Also `.every()` method breaks iterating after finding the first odd number &mdash; so the code skips unnecessary steps.    

## 8. Conclusion

`array.forEach(callback)` method is a good way to iterate over all array items. Its first argument is the `callback` function, which is invoked for each item in the array with 3 arguments: item, index, and the array itself.  

`forEach()` is useful to iterate over all array items, without breaking, involving simultaneously some side-effects. Otherwise, consider an alternative [array method](/operations-on-arrays-javascript/).  

*Have questions on how `array.forEach()` works? Write a comment and let's discuss!*