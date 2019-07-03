---
title: How to use forEach() to iterate an array in JavaScript
description: How to use forEach() method to iterate over items of an array in JavaScript, with lots of best practices.
published: "2019-07-03"
modified: "2019-07-03"
thumbnail: "./images/cover.jpg"
slug: foreach-iterate-array-javascript
tags: ["javascript", "array", "foreach"]
recommended: ["how-to-iterate-easily-over-object-properties-in-javascript", "power-up-the-array-creation-in-javascript"]
type: post
---

When searching for new themes to learn, I'm asking myself:  

* Should I concentrate on the fundamentals? 
* Or look into new directions?  

For example: should I learn well JavaScript language, or study how to use React?  

After trials and mistakes, I see the importance of strengthening the fundamentals first. Especially the programming language you're coding with every day. It's impossible to master React without mastering JavaScript first.  

Let's solidify your JavaScript fundamentals knowledge.  

In this post I will explore how `forEach()` array method works in JavaScript. Plus I'll describe situations when the usage of `forEach()` is convenient, and when it is not.  

## 1. Basic forEach example

Let's iterate over a list of colors:  
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

`colors.forEach(iterate)` executes `iterate()` callback function for every item in `colors` array.  

`iterate()` is executed 3 times: 

* `iterate('blue')`
* `iterate('green')`
* `iterate('white')`

After the first look, let's introduce a formal definition:  

> `forEach()` method of the array object iterates over the array's items, in ascending order, without mutating the array 

The first argument of `forEach()` is the callback function called for every item in the array. The second, optional argument, is the value of `this` set in the callback.

```javascript
array.forEach(callback [, thisArgument])
```

Note that `forEach()` always returns `undefined`.  

When iterating over an array with empty slots (named [sparse array](/power-up-the-array-creation-in-javascript/#third-case-no-element-between-commas)), `forEach()` skips the empty slots.  

## 2. Index of the iterated element

> `forEach()` executes the callback function with 3 arguments: the current iterated array *item*, the *index* of the iterated item and the *array* instance itself. 

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

`iterate()` function has access to the current iterated item and its index. The callback is executed 3 times:

* `iterate('blue', 0)`
* `iterate('green', 1)`
* `iterate('white', 2)`

## 3. Access the array inside the callback

You might want to access the array itself during the iteration. One option is to use the 3rd parameter inside the callback function.  

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

The 3rd parameter `array` inside the callback function is the array on which `forEach()` method was called on. `array` parameter and `colors` variable point to the same array object.  

### 3.1 Strive for modular functions

You might be wondering: why not to use `colors` variable directly inside the callback, and skip the third parameter `array` at all? At first sight, that would simplify the code.  

```javascript{3,9}
function iterateCoupled(item, index) {
  console.log(item);
  if (index === colors.length - 1) {
    console.log('The last iteration!');
  }
}

const numbers = [42];
numbers.forEach(iterateCoupled); // (!) Wrong
```

Unfortunately, this change creates a tight coupling problem. Here's why. 

`iterateCoupled()` callback couples with the outer scope variable `colors`. In this case, the modularity and reusability of the callback function are reduced. You cannot reuse `iterateCoupled()` with other array instances, other than `colors`. 

Unless you have a good reason to access outer scope variables, I don't recommend doing this.  

Let's look back to the original `iterate()`. This function uses only its parameters to access data, without looking at the outer scope. Its modularity is high. 

Because of that `iterate()` callback can be reused to iterate any other array instance:

```javascript{9,14}
function iterate(item, index, array) {
  console.log(item);
  if (index === array.length - 1) {
    console.log('The last iteration!');
  }
}

const numbers = [42];
numbers.forEach(iterate); // Correct
// logs "42"
// logs "The last iteration!"

const animals = ['cat', 'dog'];
animals.forEach(iterate); // Correct
// logs "cat"
// logs "dog"
// logs "The last iteration!"
```

## 4. this inside the callback

Let's run the following example in a browser, and pay attention to the value of `this`:
```javascript{4}
const letters = ['a', 'b', 'c'];

function iterate(letter) {
  console.log(this === window); // true
}

letters.forEach(iterate); // logs 3 times "true"
```

`this` inside `iterate()` equals to `window`, which is the global object in the browser environment. Follow [regular function invocation](./gentle-explanation-of-this-in-javascript/#2-function-invocation) to get more information.  

In some situations, you might need to set `this` to an object of interest. Then indicate this object as the second argument when calling `forEach()`:

```javascript
array.forEach(callback, thisArgument)
```

Let's implement a `Unique` class, which always holds an unique list of items:
```javascript{8,9,11}
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

Because of that, inside the callback of `forEach()`, `this` points also to an instance of `Unique`. Now it's safe to access `this.items`.

However, using an arrow function as the callback of `forEach()` would be better. The [arrow function preserves](/gentle-explanation-of-this-in-javascript/#7-arrow-function) the value of `this` from the lexical scope, so there would be no need to use the second argument on `forEach()`.  

## 5. Appropriate usage of forEach()

I find that the appropriate usage of `forEach()` is the need to iterate over all items of the array, without breaking, and have simultaneously some side-effects. 

Side-effects examples are a mutation of an outer scope variable, I/O operations (HTTP requests), DOM manipulations, and alike.  

For example, here's how you would clear the values of the input fields in a DOM document:

```javascript
const inputs = document.querySelectorAll('input[type="text"]');

inputs.forEach(function(input) {
  input.value = '';
});
```
The side effect in the callback function is clearing the value of the input field.  

One thing to keep in mind is that you cannot normally break the iteration of `forEach()`. The method will always iterate over all the items in the array (other than a tricky way to throw an error, which is a cheap hack).  

If your case requires an early break from the cycle, a better option is the classic [for](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for) or [for..of](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of).  

When the array iteration only computes a result, without involving side-effects, a better alternative is select an array method like:   

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

The code determines correctly if all numbers are even. But one problem is that you cannot break right after finding the first odd number `3`.  

A better solution is to choose `array.every()` method:

```javascript
const numbers = [22, 3, 4, 10];

const allEven = numbers.every(function(number) {
  return number % 2 === 0;
});

console.log(allEven); // => false
```
The usage of `array.every()` not only makes the code shorter and more expressive. It is also more optimal, because `.every()` method breaks iterating right after finding the first odd number.  

## 6. Conclusion

`forEach()` method is an efficient way to iterate over all array items. Its first argument is the callback function, which is invoked for every item in the array with 3 arguments: item, index and the array itself.  

You would use `forEach()` when iterating over all array items, without breaking, involving simultaneously some side-effects. Otherwise, consider selecting an alternative array method that fits better your task.   

*Do you know good uses cases of `forEach()`? Write them in a comment below.*