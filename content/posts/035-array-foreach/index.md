---
title: How to Use forEach() to Iterate an Array in JavaScript
description: "forEach() in JavaScript calls the provided function on each array item with 3 arguments: item, index, the array itself. Learn how to use forEach()."
published: "2019-07-03"
modified: "2020-06-19T11:00Z"
thumbnail: "./images/cover.jpg"
slug: foreach-iterate-array-javascript
tags: ["javascript", "array", "foreach"]
recommended: ["how-to-iterate-easily-over-object-properties-in-javascript", "power-up-the-array-creation-in-javascript"]
type: post
---

What's the usual thing you do with an array? Iterate through its items! This is where `forEach()` array method can be helpful.  

This post describes how to use `forEach()` array method to iterate items of an array in JavaScript. Plus, you will read about `forEach()` best practices like correct handling of `this` and how to iterate array-like objects.  

## 1. Basic forEach example

> `array.forEach()` method iterates over the array items, in ascending order, without mutating the array. 

The first argument of `forEach()` is the callback function called for every item in the array. The second argument (optional) is the value of `this` set in the callback.

```javascript
array.forEach(callback [, thisArgument])
```

Let's see how `forEach()` works in practice.  

In the following example, `colors` array has 3 items. Let's use `forEach()` to log to console every color:  

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

`iterate` a the callback function. `colors.forEach(iterate)` executes `iterate` function for every item in `colors`, setting the iterated item as the first argument. 

This way, 3 invocation of `iterate()` function are perfomed:

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

`iterate()` function has access to the current iterated item and the index. The callback is executed 3 times:

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

The 3rd parameter `array` inside the callback function is the array on which `forEach()` method was called on. 

## 4. *this* inside the callback

Let's run the following example in a browser, and pay attention to the value of `this`:
```javascript{4}
const letters = ['a', 'b', 'c'];

function iterate(letter) {
  console.log(this === window); // true
}

letters.forEach(iterate); // logs 3 times "true"
```

`this` inside `iterate()` equals to `window`, which is the global object in the browser environment. Follow [regular function invocation](/gentle-explanation-of-this-in-javascript/#2-function-invocation) to get more information.  

In some situations, you might need to set `this` to an object of interest. Then indicate this object as the second argument when calling `forEach()`:

```javascript
array.forEach(callback, thisArgument)
```

Let's implement a `Unique` class, which always holds an unique list of items:
```javascript{11}
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

`newItems.forEach(function() {}, this)` is called with the second argument pointing to `this`, i.e. the instance of `Unique` class. 

Inside the callback of `forEach()`, `this` points also to an instance of `Unique`. Now it's safe to access `this.items`.

Note that for the above example using an arrow function as the callback of `forEach()` would be better. The [arrow function preserves](/gentle-explanation-of-this-in-javascript/#7-arrow-function) the value of `this` from the lexical scope, so there's no need to use the second argument on `forEach()`.  

## 5. forEach skips empty slots

`forEach()` skips the empty slots of the array (named [sparse array](/power-up-the-array-creation-in-javascript/#third-case-no-element-between-commas)).  

```javascript
const sparseArray = [1, , 3];
sparseArray.length; // => 3

sparseArray.forEach(function(item) {
  console.log(item);
}); // logs 1, 3
```

`sparseArray` contains `1`, an empty slot, and `3`. `forEach()` iterates over `1` and `3`, but skips the empty slot.  

## 6. Iterate array-like objects using forEach

`forEach()` can iterate over array-like objects:

```javascript{12}
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
`arrayLikeColors` is an array-like object. In order to iterate over its items, you have to call indirectly `forEach()` using the `call()`. The `forEach()` method is taken from `Array.prototype`.  

Alternatively, you can transform the array-like object into an array using `Array.from()`, then iterate:

```javascript{12}
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

## 7. When to use forEach()

`forEach()` is best used to iterate array items, without breaking, and having simultaneously some [side-effect](https://en.wikipedia.org/wiki/Side_effect_(computer_science)). 

Side-effects examples are a mutation of an outer scope variable, I/O operations (HTTP requests), DOM manipulations, and alike.  

For example, let's select all input elements from the DOM and use `forEach()` to clear them:

```javascript
const inputs = document.querySelectorAll('input[type="text"]');

inputs.forEach(function(input) {
  input.value = '';
});
```
The side effect in the callback function is clearing the value of the input field.  

Keep in mind that you cannot normally break the iteration of `forEach()` (other than a tricky way to throw an error to stop the iteration, which is a cheap hack). The method will always iterate over all the items.  

If your case requires an early break from the cycle, a better option is the classic [for](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for) or [for..of](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of).  

When the array iteration computes a result, without side-effects, a better alternative is to select an array method like:   

* [array.map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
* [array.reduce()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)
* [array.every()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every)
* [array.some()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some)

For example, let's determine whether all numbers of an array are even.  

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

The code determines correctly if all numbers are even. The problem is the impossibility to break after finding the first odd number `3`.  

For this situation, a better alternative is `array.every()` method:

```javascript
const numbers = [22, 3, 4, 10];

const allEven = numbers.every(function(number) {
  return number % 2 === 0;
});

console.log(allEven); // => false
```
`array.every()` doesn't only make the code shorter. It is also optimal, because `.every()` method breaks iterating after finding the first odd number.  

## 8. Conclusion

`array.forEach(callback)` method is an efficient way to iterate over all array items. Its first argument is the `callback` function, which is invoked for every item in the array with 3 arguments: item, index, and the array itself.  

`forEach()` is useful to iterate over all array items, without breaking, involving simultaneously some side-effects. Otherwise, consider an alternative [array method](https://javascript.info/array-methods).  

*Do you know good uses cases of `forEach()`? Write them in a comment below.*