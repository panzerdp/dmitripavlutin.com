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

While most likely you haven't encountered much of `Infinity` during day by day coding, it still worth knowing because it's a useful initial value for certain algorithms. 

Let's look at the properties of `Infinity` number in JavaScript, some of its use cases, as well as demystify some misconceptions. 

## 1. The definition of *Infinity*

The ECMAScript standard describes `Infinity` as follows:

> There are two other special values, called *positive Infinity* and *negative Infinity*. [...] Note that these two infinite Number values are produced by the program expressions `+Infinity` (or simply `Infinity`) and `-Infinity`. 

Which means that `Infinity`, as well as `-Infinity` (the number small than any finite number) are special numbers:

```javascript
typeof Infinity;  // => 'number'
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

You might end up in negative infinity when having operands of different signs:

```javascript
Infinity * -1; // => -Infinity
Infinity / -2; // => -Infinity
-2 / 0;        // => -Infinity
```
 
## 3. Checking for *Infinity*

Fortunately, an infinite value equals to an infinite value:

```javascript
Infinity === Infinity; // => true
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

The infinity value is handy when you'd like to initialize computations involving numbers comparisons. 

For example, when searching for a minimum value in an array:

```javascript{2}
function findMin(array) {
  let min = Infinity;
  for (const item of array) {
    min = Math.min(min, item);
  }
  return min;
}

findMin([5, 2, 1, 4]); // => 1
```

The `min` variable is initialized with `Infinity`. It makes sure that on first `for()` cycle iteration the minimum value becomes the first item. 

## 5. Pitfalls of *Infinity*

Most likely you're not going to work often directly with `Infinity` values. However, it worth knowing when the infinite values could appear. 

### 5.1 Parsing numbers

Let's say JavaScript an input (POST request, value from an input field, etc) and tries to parse a number from it. In simple cases it would work fine:

```javascript
// Parses the float number
parseFloat('10.5'); // => 10.5

// Indicates an invalid number
parseFloat('ZZZ'); // => NaN
```

Care must be taken because `'Infinity'` string is parsed by `parseFloat()` as an actual `Infinity` number:

```javascript
parseFloat('Infinity'); // => Infinity
```

It should be a validation error when the user introduces the `'Infinity'` string into an input field that requires a number. 

A better alternative is to use `parseInt()` to parse integers. It doesn't recongize `'Infinity'` as an integer:

```javascript
parseInt('10', 10); // => 10

parseInt('Infinity', 10); // => NaN
```

### 5.2 JSON serialization

`JSON.stringify()` serializes an `Infinity` number to `null`. 

```javascript
const worker = {
 salary: Infinity
};

JSON.stringify(worker); // => '{ "salary": null }'
```

`salary` property has the `Infinity` value. However when stringified to JSON, `"salary"` becomes `null`. 

### 5.3 Max number overflow

`Number.MAX_VALUE` is the biggest float number in JavaScript. 

If you try to use a number that is even bigger than `Number.MAX_VALUE`, JavaScript transforms such number to `Infinity`:

```javascript
2 * Number.MAX_VALUE; // => Infinity
Math.pow(10, 1000);   // => Infinity
```

### 5.4 Math functions

Some functions of `Math` namespace in JavaScript can return infinite numbers. 

Here are a few examples:

```javascript{2,5}
Math.max(1, 2); // => 2
Math.max();     // => -Infinity

Math.min(1, 2); // => 1
Math.min();   // => Infinity
```

## 6. Key takeaway

`Infinity` in JavaScript represents the concept of an infinite number. Any finite number is smaller than `Infinity`, and any finite number is bigger `-Infinity`. 

Comparing infinite values in JavaScript is easy: `Infinity === Infinity` is `true`. The special function `Number.isFinite()` determines if the supplied argument is a finite number. 

You can initialize variables with `Infinite` when starting an algorithm that involves numbers of comparisons. A use case is finding the minimum of an array. 

Care must be taken with `Infinity` when parsing numbers from inputs: `Number('Infinity')`, `parseFloat('Infinity')` return the actual `Infinity` number. When serialized with `JSON.stringify()`, the infinite value `Infinite` becames `null`. 

Hopefully, after reading my post you have a better grasp of how `Infinite` works in JavaScript!