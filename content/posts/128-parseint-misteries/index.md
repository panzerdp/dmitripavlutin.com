---
title: 'A Mistery of parseInt() in JavaScript'
description: "A mistery of how parseInt() parses some numbers in JavaScript."
published: "2021-04-20T12:00Z"
modified: "2021-04-20T12:00Z"
thumbnail: "./images/cover-3.png"
slug: parseint-mistery-javascript
tags: ['javascript', 'number']
recommended: ['nan-in-javascript', 'infinity-in-javascript']
type: post
---

`parseInt()` is a built-in function in JavaScript that parse integers  from numerical string values.  

For example, let's parse the integer from the numeric string `'100'`:

```javascript
const number = parseInt('100');
number; // 100
```

As expected, `'100'` is parsed to integer `100`.  

`parseInt(numericalString, radix)` also accepts a second argument: the radix at which the string argument is. The radix argument allows you to parse integers from different
numerical bases.  

Let's use `parseInt()` to parse a numerical string in base 2:

```javascript
const number = parseInt('100', 2);
number; // 2
```

Because the radix argument is `2`, `parseInt('100', 2)` parses `'100'` as an integer in base 2: thus it returns the value `4` (in decimal).  

That's pretty much a short introduction to `parseInt()`.  

## 1. A mystery behavior of *parseInt()*

`parseInt(numericalString)` always converts its first argument to a string (if it's not a string), then parses that numeric string to the integer value.  

That's why you could even use floats as the first argument, and `parseInt()` converts the float to an integer value:

```javascript
parseInt(0.5);      // 0
parseInt(0.05);     // 0
parseInt(0.005);    // 0
parseInt(0.0005);   // 0
parseInt(0.00005);  // 0
parseInt(0.000005); // 0
```

Floats like `0.5`, `0.05`, etc. when parsed to an integer become `0`.  

But what about trying the float value `0.0000005`?  

```javascript
parseInt(0.0000005); // 5
```

`parseInt()` parses the float `0.0000005` to... `5`. Interesting and kind of unexpected...  

Why does `parseInt(0.0000005)` have such a mystery behavior?  

## 2. Discovering the mystery of *parseInt()*

Let's look again at what `parseInt()` does with its first argument: if it's not a string, then it is converted to a string, then parsed, and the parsed integer returned.  

That might be the first clue.  

Let's try then to convert manually the floats to a string represenation:

```javascript
String(0.5);      // '0.5'
String(0.05);     // '0.05'
String(0.005);    // '0.05'
String(0.0005);   // '0.005' 
String(0.00005);  // '0.00005'
String(0.000005); // '0.000005'

String(0.0000005); // '5e-7'
```

The expliciti conversion to string of `String(0.0000005)` expression clearly behaves differently than other floats: it's a string representation of [exponential notation](https://en.wikipedia.org/wiki/Scientific_notation)!

That's the second &mdash; and a significant clue!

And when the expontential notiation as a string value is parsed to an integer, you get the number `5`:

```javascript
parseInt(0.0000005); // 5
// same as
parseInt('5e-7');   // 5
```

`parseInt('5e-7')` takes into consideration the first digit `5`, but skips `e-7`.  

Mystery solved!

## 3. Conclusion

`parseInt()` is the function that parses numerical string values into integers. 

But if trying to transform to an integer a float smaller than 10<sup>-6</sup> (e.g. `0.0000005` which is same as 5*10<sup>-7</sup>), then such float transform into a string has the exponential notiation (e.g. `5e-7` is the expontential notation of `0.0000005`) into an exponential notation. And `parseInt()` is going to parse the exponential notation, which might lead to unexpected results.  

*Side challenge: can you explain why `parseInt('999999999999999999999')` equals `1`? Write your considerations in a comment below!*