---
title: "A Simple Explanation of JavaScript Iterables"
description: "What are iterators in JavaScript, how to use them to iterate elements, and what data types are iterables."
published: "2020-10-06T12:00Z"
modified: "2020-10-06T12:00Z"
thumbnail: "./images/cover-4.png"
slug: javascript-iterators
tags: ['javascript', 'iterable', 'iterator', 'array']
recommended: ['use-react-memo-wisely', 'react-state-management']
type: post
commentsThreadId: javascript-iterators
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

I don't want to jump right into the dry theory of iterators. I know how confusing they are. On the contrary, let's study a simple example, and dig from there the ideas of iterable and iterator.  

Let's reuse the `numbers` array from the introduction. Your task is to simply log to console each item of this array:

```javascript
const numbers = [1, 3, 4];

for (const number of numbers) {
  console.log(number);
}
// logs 1, 3, 4
```

## 2. Iterable and iterator interfaces

## 3. Native iterable types

## 4. Consumers of iterables

## 5. Summary