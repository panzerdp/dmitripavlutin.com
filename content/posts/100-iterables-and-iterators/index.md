---
title: "A Simple Explanation of JavaScript Iterators"
description: "What are iterators and iterables in JavaScript and how to use them to iterate collections."
published: "2020-10-06T08:30Z"
modified: "2020-10-06T08:30Z"
thumbnail: "./images/cover.png"
slug: javascript-iterators
tags: ['javascript', 'iterable', 'iterator', 'array']
recommended: ['javascript-closure', 'javascript-array-from-applications']
type: post
---

A collection is a data structure that contains elements. For example, a string is a collection of characters and an array is a collection of ordered items:  

```javascript
const message = 'Hi!';     // consists of 'H', 'i' and '!'

const numbers = [1, 3, 4]; // consists of 1, 3 and 4
```

To easily access elements of collections of different structure, JavaScript implements a special pattern named [iterator](https://refactoring.guru/design-patterns/iterator). 

In this post, as a part of the iterator pattern, you'll learn what are *iterables* and *iterators*. You'll also learn about iterables consumers: how to iterate over a collection using `for...of` cycle, transform any iterable to an array using the spread operator `[...iterable]`, and more.   

*Before I go on, let me recommend something to you.* 

*If you want to significantly improve your JavaScript knowledge, take the  amazingly useful ["Modern JavaScript From The Beginning 2.0"](https://www.traversymedia.com/a/2147528886/FqXWyazh) by Brad Traversy. Use the coupon code "DMITRI" and get up to 20% discount!*

```toc
```

## 1. Digging up the iterable

I don't want to jump right into the dry theory of iterators. I know how confusing they are. On the contrary, let's start with a warm-up example to dig up the concept of iterable.  

Let's reuse the `numbers` array from the introduction. Your task is to simply log to console each item of this array:

```javascript
const numbers = [1, 3, 4];

for (const item of numbers) {
  console.log(item);
}
// logs 1, 3, 4
```

As expected, the `for...of` loop logs to console each item of `numbers` array. Good.

Now let's try another experiment. Can `for...of` enumerate each property of a plain JavaScript object?  

```javascript
const person = { name: 'Eric', address: 'South Park' };

for (const prop of person) {
  console.log(prop);
}
// Throws "TypeError: person is not iterable"
```

Not this time. `for...of` cycle cannot iterate over the properties of `person` object. Why does it happen?

You can find the answer in the error message: `TypeError: person is not iterable`. The `for...of` cycle requires an *iterable* collection to iterate over its items.  

So, the first rule of thumb whether a data structure is iterable is try to iterate it using `for...of`.  

Having this warm-up experiment, let's state stricter what an iterable is in the next section.   

## 2. Iterable and iterator interfaces

> An object is *Iterable* when it conforms to `Iterable` interface.  

The `Iterable` interface requires the object to contain a method [`Symbol.iterator`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/iterator) that must return an *Iterator* object.  

```javascript
interface Iterable {
  [Symbol.iterator]() {
    //...
    return Iterator;
  }
}
```

In simple words, any object is *iterable* (*iter* + *able* meaning able to be iterated) if it contains a method name `Symbol.iterator` (symbols can also define methods) that returns an Iterator. 

Ok. But what's an Iterator? Let's find out:

> The *Iterator* object must conform to `Iterator` interface.  

The *Iterator* object must have a method `next()` that returns an object with properties `done` (a boolean indicating the end of iteration) and `value` (the item extracted from the collection at the iteration).  

```javascript
interface Iterator {
  next() {
     //...
     return {
        value: <value>,
        done: <boolean>
     };
  };
}
```

I know that these theoretical terms are confusing. But stay with me.  

### 2.1 How array conforms to iterable

You know from the warm-up experiment that the array is iterable. But how does exactly the array conform to the `Iterable` interface?  

```javascript
const numbers = [1, 3, 4];

numbers[Symbol.iterator](); // => object
```

Invoking the expression `numbers[Symbol.iterator]()` shows that the array instance contains the special method `Symbol.iterator`. This makes the array conform to the `Iterable` interface.  

The `numbers[Symbol.iterator]()` method must return the *iterator object*.  

The iterator object is the one that performs the iteration over the array items. Just call `iterator.next()` to access each item of the array!

```javascript
const numbers = [1, 3, 4];

const iterator = numbers[Symbol.iterator]();

iterator.next(); // => { value: 1, done: false }
iterator.next(); // => { value: 2, done: false }
iterator.next(); // => { value: 3, done: false }
iterator.next(); // => { value: undefined, done: true }
```

Each invocation of `iterator.next()` returns an object `{ value: <item>, done: <boolean> }`.  

The `value` property contains the iterated item, while `done` indicates whether the iteration is complete.  

When there are no more items to iterate, `iterator.next()` returns `{ value: undefined, done: true }`.  

## 3. Consumers of iterables

JavaScript provides a good set of cycles, syntaxes, and functions that consume iterables.

### 3.1 *for...of* cycle

As you know already, `for...of` cycle accepts an iterable object and iterates through its items:

```javascript
const message = 'Hi!';

for (const char of message) {
  console.log(char);
}
// logs 'H', 'i', '!'
```

In the above example, `message` is a string type that is an iterable. `for...of` cycle iterates over the characters in the string.  

### 3.2 Spread operator

Another great consumer of iterables is the spread operator `[...iterable]`:

```javascript
const message = 'Hi!';
const chars = [...message];

chars; // => ['H', 'i', '!']
```

The spread operator `[...message]` iterates over the characters of the string and creates an array of these characters.  

### 3.3 Array destructuring

The array destructuring syntax can destructure iterables too!

```javascript
const message = 'Hi!';

const [firstChar, ...restChars] = message;

firstChar; // => 'H'
restChars; // => ['i', '!']
```

`[firstChar, restChars] = message` is a destructuring assignment that destructures the iterable string `message`. 

`firstChar` is assigned with the first character `'H'`. The rest of the characters `['i', '!']` are stored into the array `restChars`.  

### 3.4 Array.from()

`Array.from(iterable[, mapFunction])` also accepts an iterable and transforms it into an array. 

```javascript
const message = 'Hi!';
const chars = Array.from(message);

chars; // => ['H', 'i', '!']
```

## 4. Native iterable types

Many native data types in JavaScript are iterables. What makes the iterator pattern in JavaScript so flexible and useful is that *any iterable can be consumed by any iterable consumer*.  

Here's a list of popular iterable data types.  

### 4.1 Iterable array

The array is iterable over its items:

```javascript
const numbers = [1, 3, 4];

for (const item of numbers) {
  console.log(item);
}
// logs 1, 3, 4
```

### 4.2 Iterable string

The string primitive is iterable over the characters:

```javascript
const message = 'Hi!';

for (const char of message) {
  console.log(char);
}
// logs 'H', 'i', '!'
```

### 4.3 Iterable Map

The `Map` object is iterable over its key and value pairs.

```javascript
const map = new Map();
map.set('name', 'Eric');
map.set('address', 'South Park');

for (const [key, value] of map) {
  console.log(key, value);
}
// logs 'name', 'Eric'
// logs 'address', 'South Park'
```

### 4.4 Iterable Set

The `Set` object is iterable over its items:

```javascript
const set = new Set(['blue', 'red', 'green']);

for (const item of set) {
  console.log(item);
}
// logs 'blue', 'red', 'green'
```

## 5. Summary

Iterables are collections that can be iterated. To be an iterable, the object must conform to `Iterable` interface.  

Iterable consumers are language constructs that consume iterables. `for...of` cycle is an iterable consumer that cycles over each item of the iterable, spread operator `[...iterable]` create an array from the iterable's items.  

What makes the iterator pattern so useful is that any iterable can be used by any iterable consumer. Even more: you can define your own iterable types, and even define your own iterable consumers!

*Challenge: how would you implement an iterable that generates `n` random numbers?*  