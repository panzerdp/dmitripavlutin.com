---
title: How forEach array method works in JavaScript
description: How to use forEach method to iterate over array items in JavaScript.
published: "2019-07-01"
modified: "2019-07-01"
thumbnail: "./images/cover.jpg"
slug: foreach-array-method-javascript
tags: ["javascript", "array", "foreach"]
recommended: ["how-three-dots-changed-javascript", "7-tips-to-handle-undefined-in-javascript"]
type: post
---

When searching for new themes to learn, I'm asking myself:  

* Should I concentrate on the fundamentals? 
* Or look into new directions?  

For example: should I learn well JavaScript language, or study how to use React?  

After trials and mistakes, I see the importance of strengthening the fundamentals first. Especially the programming language you're coding with every day. It's impossible to master React without mastering JavaScript first.  

Let's solidify the JavaScript fundamentals. In this post I will explore how `forEach()` array method works in JavaScript. Plus I'll describe situations when the usage of `forEach()` is convinient, and when it is not.  

## 1. Basic forEach example

`forEach()` method of the array object iterates over the array's items, without mutating the array. Method's first argument is the callback function that is called for every item in the array.  

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

Note that `forEach()` always returns `undefined`. A good use case of this method is to iterate through items involving simultaneously some side-effect.  

Examples of side-effects are: mutation of an outer scope variable, log to console, make an ajax call, and alike.  

## 2. Index of the iterated element

`forEach()` executes the callback function with 3 arguments: the current iterated array item, the index of the iterated item and the array instance itself. 

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

Let's log the message `Last iteration!` when JavaScript executes the last iteration on the array items.

```javascript
const colors = ['blue', 'green', 'white'];

function iterate(item, index, array) {
  console.log(item);
  if (index === array.length - 1) {
    console.log('Last iteration!');
  }
}

colors.forEach(iterate);
// logs "blue"
// logs "green"
// logs "white"
// logs "Last iteration!"
```

The 3rd parameter `array` inside the callback function is the array on which `forEach()` method was called on. `array` parameter and `colors` variable point to the same array object.  

### 3.1 Strive for modular functions

You might be wondering: why not to use `colors` variable directly inside the callback, and skip the third parameter `array` at all? At first sight, that would simplify the code.  

```javascript{3}
function iterateCoupled(item, index) {
  console.log(item);
  if (index === colors.length - 1) {
    console.log('Last iteration!');
  }
}
```

This change creates tight coupling problem. Here's why. 

`iterateCoupled()` callback couples with the outer scope variable `colors`. In this case the modularity and reusability of the callback function is reduced. You cannot reuse `iterateCoupled()` with other array instances, other than `colors`. 

Unless you have a good reason to access outer scope variables, I don't recommend doing this.  

Let's look back to the original `iterate()`. It uses only its parameters to read data, without accessing the outer scope. Its modularity is high. 

You can reuse `iterate()` callback to iterate any other array instance:

```javascript{9,15}
function iterate(item, index, array) {
  console.log(item);
  if (index === array.length - 1) {
    console.log('Last iteration!');
  }
}

const numbers = [4, 10];
numbers.forEach(iterate);
// logs "4"
// logs "10"
// logs "Last iteration!"

const animals = ['cat', 'dog', 'pigeon'];
animals.forEach(iterate);
// logs "cat"
// logs "dog"
// logs "pigeon"
// logs "Last iteration!"
```

## 4. this inside the callback



If you want to know more about `this` keyword, I recommend reading [Gentle explanation of 'this' keyword in JavaScript](/gentle-explanation-of-this-in-javascript/).  

