---
title: 'NaN in JavaScript'
description: 'NaN, denoting "Not A Number", is a special number in JavaScript created after a faulty operation on numbers.'
published: '2020-01-07T12:00Z'
modified: '2020-01-07T12:00Z'
thumbnail: './images/nan-in-javascript-6.png'
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

Plus there are 2 special number values: `Infinity` (the biggest number) and `NaN` ("Not A Number"):

```javascript
const infinite = Infinity;
const faulty = NaN;

typeof infinite; // => 'number'
typeof faulty;   // => 'number'
```

`NaN` is a special number that indicates a faulty operation on numbers. While working directly with `NaN` is rare, it's appearance can be surprising.  

Let's take a closer look at `NaN` special value: how to check whether a variable has `NaN` and importantly understand the operations that result in `NaN`.  

## 1. NaN number

The number type in JavaScript is a set of all number values, including "Not A Number" value, positive infinity and negative infinity.  

"Not A Number" numeric value can be accessed using a special expression `NaN`, or as a property of the lobal object or `Number` function:

```javascript
typeof NaN;        // => 'number'
typeof window.NaN; // => 'number'
typeof Number.NaN; // => 'number'
```

"Not a Number" concept represents a value that does not represent a real number, even having the number type. In simpler words, `NaN` becomes useful to represent faulty operations on numbers.  

For example, multiplying a number with `undefined` is not a valid operation, thus the result is `NaN`:

```javascript
1 * undefined;     // => NaN
```

Also trying to parse an invalid numeric string like `'Joker'` results in `NaN` too:

```javascript
parseInt('Joker', 10); // => NaN
```

The section [3. Operations resulting in NaN](#3-operations-resulting-in-nan) details into the operations that generate `NaN`.  

## 2. Checking for equality with NaN

The interesting property of `NaN` is that it doesn't equal to any value, even with the `NaN` itself.  

```javascript
NaN === NaN; // => false
```

As the example above shows, `NaN` does not equal `NaN`.  

This behavior is useful to detect if a variable contains `NaN` value:  

```javascript{3}
const someNumber = NaN;

if (someNumber !== someNumber) {
  console.log('Is NaN');
} else {
  console.log('Is Not NaN');
}

// logs "Is NaN"
```

`someNumber !== someNumber` expression is `true` only if `someNumber` is `NaN`. The above snippet logs to console `"Is NaN"`.  

JavaScript has bult-in functions that let's you detect `NaN` value: `isNaN()` and `Number.isNaN()`:   

```javascript
isNaN(NaN); // => true
isNaN(1);   // => false

Number.isNaN(NaN); // => true
Number.isNaN(1);   // => false
```

`isNaN()` and `Number.isNaN()` behave the same way, with one difference that `Number.isNaN()` doesn't convert its argument to a number:

```javascript
isNaN('Joker');        // => true
Number.isNaN('Joker'); // => false
```

`isNaN('Joker')` converts the argument `'Joker'` into a number, which is `NaN`. Thus the function returns `true`.  

On the other side, `Number.isNaN('Joker')` checks without conversion if the argument is `NaN`. The function returns `false` because `'Joker'` string is not `NaN`.  

## 3. Operations resulting in NaN

## 3.1 Parsing numbers

JavaScript offers the possibility to parse strings that have numerical values. For example, you could easily transform the `'1.5'` string into a `1.5` number.  

```javascript
const numberString = '1.5';
const number = parseFloat(numberString);

number; // => 1.5
```

But not all string values can be parsed to numbers, in which case the parsing function returns `NaN` value: which indicates that parsing failed. Here are some examples:

```javascript
parseFloat('Joker12.5'); // => NaN
parseInt('Joker12', 10); // => NaN
Number('Joker12');       // => NaN
```

When parsing numbers, it's always a good idea to verify if the parsing result is not `NaN`:

```javascript{5}
let inputToParse = 'Invalid10';
let number;

number = parseInt(inputToParse, 10);
if (isNaN(number)) {
  number = 0;
}

number; // => 0
```

If parsing of the `inputToParse` failed, the `number` variable gets a default number `0`.  

## 3.2 *undefined* as an operand

Another common case when `NaN` value is created is when `undefined` is an operand in arithmetical operations like addition, multiplication, etc.  

For example:

```javascript
function getFontSize(style) {
  return style.fontSize;
}

const fontSize = getFontSize({ size: 16 }) * 2;
const doubledFontSize = fontSize * 2;

doubledFontSize; // => NaN
```

`getFontSize()` is a function that simply accesses the `fontSize` from a style object. When invoking `getFontSize({ size: 16 })`, the result is `undefined`. The reson is that `fontSize` property does not exist in `{ size: 16 }` object.  

`fontSize * 2` is evaluated as `undefined * 2`, which results in `NaN`.  

Most of the situations when `NaN` value is created is when a missing property or a function returning `undefined` is used as a value in arithmetical operations.

To properly prevent generating `NaN` value is to make sure that `undefined` doesn't reach arithmetical operations. Handle missing properties correctly (for example by using default values).  

## 3.3 *NaN* as an operand

`NaN` value is also generated when an operand in aritemtical operations is `NaN`:

```javascript
1 + NaN; // => NaN
2 * NaN; // => NaN
```

This case is closely related to the previous scenario.  

## 3.4 Indeterminate forms

`NaN` value is created when arithmetical operations are in indeterminate forms.  

The division of `0 / 0` and `Inifinity / Infinity`:

```javascript
0 / 0;               // => NaN
Infinity / Infinity; // => NaN
```

The multiplication of `0` and `Infinity`:

```javascript
0 * Infinity; // => NaN
```

Additions of infinite numbers of different signs:

```javascript
-Infinity + Infinity; // => NaN
```

## 3.5 Invalid arguments of math functions

The square root of negative number:

```javascript
Math.pow(-2, 0.5); // => NaN
(-2) ** 0.5;       // => NaN
```

Or the lograrithm of a negative number:

```javascript
Math.log2(-2); // => NaN
```

## 4. Conclusion

In conclusion, "Not A Number" is a special number that represents a number type that is not a value. While it might seem funny at first, "Not A Number" is useful to represent faulty operations on numbers.  

In JavaScript `NaN` is the expression that represents "Not A Number".  

`NaN` doesn't equal to any value, even with `NaN` itself. The recommended way to check if a variable contains `NaN` value is to use `Number.isNaN(value)`.  

`undefined` or `NaN` as an operand in arithmetical operations almost always result in `NaN`. It happens when you try to access a missing property or use the result from a function that returned `undefined`.

Also, `NaN` can be created when having indeterminate forms or invalid arguments for mathematical functions. But these cases happen rarely.  

Here's my pragmatic advice: "Got `NaN`? Search for `undefined`!"