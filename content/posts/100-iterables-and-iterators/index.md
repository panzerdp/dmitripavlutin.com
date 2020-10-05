---
title: "A Simple Explanation of JavaScript Iterators"
description: "What are iterables and iterators in JavaScript, how to use them to iterate collections, and what data types are iterables."
published: "2020-10-06T12:00Z"
modified: "2020-10-06T12:00Z"
thumbnail: "./images/cover.png"
slug: javascript-iterators
tags: ['javascript', 'iterable', 'iterator', 'array']
recommended: ['use-react-memo-wisely', 'react-state-management']
type: post
commentsThreadId: javascript-iterables
---

In JavaScript some primitive types and data structures of type collection hold elements.  

For example, a string type consists of characters, and an array contains items:

```javascript
const message = 'Hi!';     // consists of chars 'H', 'i' and '!'

const numbers = [1, 3, 4]; // consists of 1, 3 and 4
```

To help you easily access the elements of collections, JavaScript implements a special pattern named iterator. 

In this post, you will find what are iterables and iterators and how iterables are consumed to access each item of the collection.  

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

As expected, the loop `for...of` logs to console each item of `numbers` array. Good.

Now let's try another experiment. Can `for...of` enumerate each property of a plain JavaScript object?  

```javascript
const person = { name: 'Eric', address: 'South Park' };

for (const prop of person) {
  console.log(prop);
}
// Throws "TypeError: person is not iterable"
```

Unfortunately, `for...of` cycle cannot iterate over the properties of `person` object. 

And the answer is seen from the error message: `TypeError: person is not iterable`. The `for...of` cycle requires an iterable collection to iterate over its items.  

So, the first rule of thumb whether a data structure is iterable is whether it is accepted by `for...of`.  

Having this warm-up experiment, let's state stricter what an iterable is in the next section.   

## 2. Iterable and iterator interfaces

> An object is *Iterable* when it conforms to [iterable protocol](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Iteration_protocols#iterable). 

The iterable protocol requires the iterable object to contain a special method [`Symbol.iterator`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/iterator) and value as a function that returns an iterator object.

```javascript
interface Iterable {
  [Symbol.iterator]() {
    //...
    return Iterator;
  }
}
```

> The *Iterator* object must conform to [iterator protocol](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Iteration_protocols#iterator).  

It needs to provide a property `next`, which value is a function that returns an object with properties `done` (a boolean to indicate the end of iteration) and `value` (the iteration result).  

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

I know that these theoretical terms are slightly confusing. But stay with me.  

### 2.1 How array conforms to iterable

As you know already from the warm-up experiment, the array is an iterables. How does the array conform to the Iterable protocol?  

```javascript
const numbers = [1, 3, 4];

numbers[Symbol.iterator](); // => object
```

Invoking the expression `numbers[Symbol.iterator]()` shows that the array instance contains the special method `Symbol.iterator`. This makes the array conform to the Iterable protocol.  

However, the `Symbol.iterator` method must return an object which conforms to `Iterator` protocol: let's name it the iterator object. 

In simple words, the iterator object's sole purpose is to iterate the array items. Simply invoke the `iterator.next()` to access each item of the array!

```javascript
const numbers = [1, 3, 4];

const iterator = numbers[Symbol.iterator]();

iterator.next(); // => { value: 1, done: false }
iterator.next(); // => { value: 2, done: false }
iterator.next(); // => { value: 3, done: false }
iterator.next(); // => { value: undefined, done: true }
```

As the example demonstrates, each invocation of `iterator.next()` returns an array item in an object `{ value: <item>, done: <boolean> }`.  

The `value` property contains the iterated item, while `done` property indicates whether the iteration is complete.  

When there are no more items to iterate, `iterator.next()` returns `{ value: undefined, done: true }`.  

You can always define 

## 3. Consumers of iterables

Hopefully, you might have now the first grasp of iterable. But why are they needed?  

Iteration protocols is contract between iterable collections (e.g. arrays, strings) and the consumers of iterables (e.g. `for...of` cycle, `Array.from()`).  

JavaScript provides a good set of cycles and functions that consume iterables.

### 3.1 *for...of* cycle

As you know already, `for...of` cycle accepts an iterable object and iterates through its items:

```javascript
const message = 'Hi!';

for (const char of message) {
  console.log(char);
}
// logs 'H', 'i', '!'
```

In the above example, `message` is a string type which is also an iterable. `for...of` cycle iterates over the characters in the string.  

### 3.2 Spread operator

Another great consumer of iterable is the spread operator `[...iterable]`:

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

`firstChar` is assigned with the first character `'H'`. The rest of characters `['i', '!']` are stored into an array `restChars`.  

### 3.4 Array.from()

`Array.from(iterable[, mapFunction])` also accepts an iterable and transforms it into an array. 

```javascript
const message = 'Hi!';
const chars = Array.from(message);

chars; // => ['H', 'i', '!']
```

## 4. Native iterable types

A lot of native data types in JavaScript are iterables. Any iterable can be consumed by an iterable consumer.  

Here's a list of most used iterables in JavaScript.  

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

The `Map` object is iterable over its key, value pairs.

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

Iterables are data types that can be iterated. The common iterables are arrays, strings, maps, sets.  

Iterable consumers are language constructs to accepts iterables and consume their items. The most common iterable consumers are `for...of` cycle, spread operator `[...iterable]`.  

*Challenge: how would you implement an iterable that returns `n` random numbers from `0` to `100`?*  