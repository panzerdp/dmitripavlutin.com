---
title: "A Simple Explanation of JavaScript Iterables"
description: "What are iterables and iterators in JavaScript, how to use them to iterate collections, and what data types are iterables."
published: "2020-10-06T12:00Z"
modified: "2020-10-06T12:00Z"
thumbnail: "./images/cover-4.png"
slug: javascript-iterables
tags: ['javascript', 'iterable', 'iterator', 'array']
recommended: ['use-react-memo-wisely', 'react-state-management']
type: post
commentsThreadId: javascript-iterables
---

In JavaScript some primitive types and data structures of type collection hold elements.  

For example, a string type consists of characters, and an array contains items:

```javascript
const message = 'Hi!';    // consists of chars H, i, !

const numbers = [1, 3, 4]; // consists of 1, 3, 4
```

To help you easily access the elements of collections, JavaScript implements a special pattern named iterator. 

In this post, you will find what are iterables and iterators and how iterables are consumed in order to access each item of the collection.  

## 1. Digging out the iterators

I don't want to jump right into the dry theory of iterators. I know how confusing they are. On the contrary, let's study a simple example, and dig from there the concept of iterables.  

Let's reuse the `numbers` array from the introduction. Your task is to simply log to console each item of this array:

```javascript
const numbers = [1, 3, 4];

for (const item of numbers) {
  console.log(item);
}
// logs 1, 3, 4
```

As expected, the loop `for...of` logs to console each item of `numbers` array. Good.

Now let's try another experiment: can `for-of` take each property of a plain JavaScript object?  

```javascript
const person = { name: 'Eric', address: 'South Park' };

for (const prop of person) {
  console.log(prop);
}
// Throws "TypeError: person is not iterable"
```

Unfortunately, this time `for...of` cycle cannot iterate over the properties of `person` object. 

## 2. Iterable and iterator interfaces

## 3. Native iterable types

## 4. Consumers of iterables

## 5. Summary