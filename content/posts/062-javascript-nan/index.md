---
title: 'NaN in JavaScript'
description: 'NaN, denoting "Not A Number", is a special number in JavaScript created after a faulty operation on numbers.'
published: '2020-01-07T12:00Z'
modified: '2020-01-07T12:00Z'
thumbnail: './images/nan-in-javascript-5.png'
slug: nan-in-javascript
tags: ['javascript', 'number']
recommended: ['infinity-in-javascript', '7-tips-to-handle-undefined-in-javascript']
type: post
commentsThreadId: nan-in-javascript
---

The number type in JavaScript holds integers and floats:

```javascript
const integer = 4;
const float = 1.5;

typeof integer; // => 'number'
typeof float;   // => 'number'
```

Apart from integers and floats, there are 2 values that have special behavior in JavaScript: `Infinity` (the biggest number) and `NaN` (result of a faulty operation on numbers):

```javascript
const infinite = Infinity;
const faulty = NaN;

typeof infinite; // => 'number'
typeof faulty;   // => 'number'
```

`NaN` is a special kind of number that indicates a faulty operation on numbers. While usually you don't work with `NaN` directly, often it's appearance is a surprise.  

Let's take a closer look at `NaN` special value: how to check whether a variable has `NaN` and importantly understand the operations that result in `NaN`.  

## 1. NaN number

## 2. NaN's special behavior

## 3. Checking for equality with NaN

## 4. Operations resulting in NaN

## 5. Conclusion