---
title: 'Infinity in JavaScript'
description: 'Infinity in JavaScript is a special number bigger than any finite number.'
published: '2019-12-17T13:00Z'
modified: '2019-12-17T13:00Z'
thumbnail: './images/infinity.png'
slug: infinity-in-javascript
tags: ['javascript']
recommended: ['the-legend-of-javascript-equality-operator', '7-tips-to-handle-undefined-in-javascript']
type: post
commentsThreadId: infinity-in-javascript
---

In JavaScript `Infinity` is a special number with an interesting property: it's bigger than any finite number.  

While most likely you haven't encoutered much of `Infinity` during day by day coding, it still worth knowing because it's an useful initial values for certain algorithms.  

Let's look at the properties of `Infinity` number in JavaScript, some of its use cases, as well as demystify some misconceptions.  

## 1. The definition of *Infinity*

The ECMAScript standard describe `Infinity` as follows:

> There are two other special values, called *positive Infinity* and *negative Infinity*. [...] Note that these two infinite Number values are produced by the program expressions `+Infinity` (or simply `Infinity`) and `-Infinity`.  

Which means that `Infinity`, as well as `-Infinity` (the number small than any finite number) are special numbers:

```javascript
typeof Infinity; // => 'number'
typeof -Infinity; // => 'number'
```

Note that `Number` function has 2 properties holding the infinite values as well:

```javascript
Number.POSITIVE_INFINITY; // => Infinity
Number.NEGATIVE_INFINITY; // => -Infinity
```

## 2. The properties of *Infinity*

`Infinity` is bigger than any finite number in JavaScript:  

```javascript
Infinity > 100;                     // => true
Infinity > 1000000;                 // => true
Infinity > Number.MAX_SAFE_INTEGER; // => true

Infinity > Infinity;                // => false
```

`Infinity` has some interesting effects when used as an operand in arithmetical operations like addition, multiplication and division:

```javascript
Infinity + 1;        // => Infinity
Infinity + Infinity; // => Infinity

Infinity * 2;        // => Infinity
Infinity * Infinity; // => Infinity

Infinity / 2;        // => Infinity
```

Some operations with `Infinity` result in finite numbers:

```javascript
10 / Infinity; // => 0
```

If you divide a finite number by `0`, it results in `Infinity`:

```javascript
2 / 0; // => Infinity
```

Making conceptually incorrect operations on infinite numbers results in `NaN`. For example, you can't divide infinite numbers, and you cannot determine if an infinite number is odd or even:

```javascript
Infinity / Infinity; // => NaN
Infinity % 2;        // => NaN
```

### 2.1 The negative infinity

`-Infinity` (the negative infinity) is smaller than any finite number:

```javascript
-Infinity < 100;                      // => true
-Infinity < 1000000;                  // => true
-Infinity < -Number.MAX_SAFE_INTEGER; // => true
```

At the same time `-Infinity` is smaller than positive infinity:  

```javascript
-Infinity < Infinity; // => true
```


 
## 3. Checking for *Infinity*

Fortunately, an infinite value equals to an infinite value:

```javascript
Infinity === Infinity;   // => true
-Infinity === -Infinity; // => true
```

However, because of different signs, `Infinity` does not equal `-Infinity`:

```javascript
Infinity === -Infinity; // => false
```

JavaScript has a special function `Number.isFinite(value)` that checks whether the provided value is finite:

```javascript
Number.isFinite(Infinity);  // => false
Number.isFinite(-Infinity); // => false
Number.isFinite(999);       // => true
```

## 4. *Infinity* use cases

## 5. Pitfalls of *Infinity*

## 5.1 Parsing integers

## 5.2 Serialization

## 6. Key takeaway

*Have you ever used `Inifinity`?*