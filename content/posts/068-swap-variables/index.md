---
title: '4 Ways To Swap Variables in JavaScript'
description: 'You can swap 2 variables in JavaScript using a destructuring assingment, a temporary variable, addition & difference or XOR operator.'
published: '2020-02-18T12:00Z'
modified: '2020-02-18T12:00Z'
thumbnail: './images/swap-variables-cover-9.png'
slug: swap-variables-javascript
tags: ['javascript', 'variable']
recommended: ['5-interesting-uses-javascript-destructuring', 'javascript-hoisting-in-details']
type: post
commentsThreadId: swap-variables-javascript
---

A lot of algorithms require swapping the values of 2 variables.  

Swapping variables is often asked during JavaScript coding interviews. If you'd like to prepare for the question *"How to swap 2 variables without a temporary variable?"*, then the chapters [3](#3-addition-and-difference) and [4](#4-xor-operator) answer this question.  

So, let's see the 4 ways you can swap variables.  

## 1. Destructuring assignment

Destructuring assignment (a feature of [ES2015](https://en.wikipedia.org/wiki/ECMAScript#6th_Edition_-_ECMAScript_2015)) let's you extract items of an arrays into variables.  

For example, the following code destructures an array:

```javascript
let a;
let b;

[a, b] = [1, 2, 3];

a; // => 1
b; // => 2
```

`[a, b] = [1, 2, 3]` is a destructuring assignment that destructures `[1, 2, 3]` array. The variable `a` is assigned with the first item of `[1, 2, 3]`, correspondingly `b` is assigned with the second item.  

Knowing how the destructuring of an array works, it's easy to use it to swap the values of 2 variables. What you have to do is construct an array having the variables at different positions.

Let's swap the variables `a` and `b` using destructuring assignment way:

```javascript{4}
let a = 1;
let b = 2;

[a, b] = [b, a];

a; // => 2
b; // => 1
```

`[a, b] = [b, a]` is the destructuring assignment that swaps the variables `a` and `b`.  

At first step, on the right side of the destructuring assignment `= [b, a]` a *temporary array* `[2, 1]` is created.  

Then the destructuring of the temporary array occurs: `[a, b] = [2, 1]`. The variable `a` is assigned with `2`, and `b` with `1`. The swapping of `a` and `b` has been performed.  

I recommend swapping variables using destructuring assignment in most of the cases. It works with any kind of data type: numbers, strings, booleans, objects. 

This way to swap variables is short because it requires just one statement.  

## 2. Temporary variable

Swapping variables using a temporary variable is the first way I've learnt how to swap variables.  

As the name suggest, this approach requires a temporary variable `temp`. 

Let's swap the values of variables `a` and `b` using a temporary variable:

```javascript{5-7}
let a = 1;
let b = 2;
let temp;

temp = a;
a = b;
b = temp;

a; // => 2
b; // => 1
```

`temp` is the temporary variable that holds the value of `a`. Then `a` variable is assigned with the value of `b`. Finally, the variable `b` is assigned with the value of `temp` (having the initial value of `a`).  

The swapping of variables using a temporary variable is the most known and a lot of time the most used approach. It works with any value types, like numbers, strings, booleans, objects.  

The downside of this approach is the need of a specialized temporary variables, plus the swapping happens in 3 statements.  

## 3. Addition and difference

You can to swap variables without using temporary array or temporary variables.  

The following example swaps the variables `a` and `b` using the sum and difference approach:

```javascript{4-6}
let a = 1;
let b = 2;

a = a + b;
b = a - b;
a = a - b;

a; // => 2
b; // => 1
```

Initially, `a` is `1` and `b` is `2`. Let's see how the 3 statements perform the swapping:

1. `a = a + b` assigns to variable `a` the value `1 + 2`.  
2. `b = a - b` assigns to variable `b` the value `1 + 2 - 2 = 1` (`b` is now `1`).  
3. `a = a - b` assigns to variable `a` the value `1 + 2 - 1 = 2` (`a` is now `2`).

Finally, `a` is `2` and `b` is `1`. The swapping of variables `a` and `b` has been performed.  

While this approach doesn't use temporary variables, it has considerable limitations. 

First, you can swap only integer numbers. Secondly, be aware of the integer overflow when perfoming the addition at the first step `a = a + b`.  

## 4. XOR operator

The XOR operator evaluates to true if the operands are different. As a reminder, here's the truth table for the XOR operator:

a&nbsp;&nbsp;|&nbsp;&nbsp;b&nbsp;&nbsp;| a^b       |
-------------| ----------------------- | ----------- |
0&nbsp;&nbsp;|&nbsp;&nbsp;0&nbsp;&nbsp;|&nbsp;&nbsp;1|
1&nbsp;&nbsp;|&nbsp;&nbsp;1&nbsp;&nbsp;|&nbsp;&nbsp;1|
0&nbsp;&nbsp;|&nbsp;&nbsp;1&nbsp;&nbsp;|&nbsp;&nbsp;0|
1&nbsp;&nbsp;|&nbsp;&nbsp;0&nbsp;&nbsp;|&nbsp;&nbsp;0|

In JavaScript, the bitwise XOR operator `operand1 ^ operand2` performs  the XOR operation on each bit of `operand1` and `operand2`.  

For example, here's how `5 ^ 7` evaluates `2`:

```
1 0 1 (5 in binary)
1 1 1 (7 in binary)
------
0 1 0 (5 ^ 7 = 2 in binary)
```

Bitwise XOR has 2 interesting properties: 

* `a ^ a = 0`: XOR perfomed on equals numbers always equals `0`
* `a ^ 0 = a`: XOR perfomed on a number and `0` always equals to the number.

These 2 properties are useful when perfoming swapping of 2 variables using the bitwise XOR.  

Let's see how to swap the values of `a` and `b` variables using bitwise XOR operator in the following example:

```javascript
let a = 1;
let b = 2;

a = a ^ b;
b = a ^ b;
a = a ^ b;

a; // => 2
b; // => 1
```

At the beginning, `a` has value `1`, and `b` has value `2`.

1. `a = a ^ b`: let's just remember this fact.
2. `b = a ^ b = (a ^ b) ^ b = a ^ b ^ b = a ^ 0 = a` (`b` is now `a`)
3. `a = a ^ b = (a ^ b) ^ a = a ^ b ^ a = b ^ a ^ a = b ^ 0 = b` (`a` is `b`)

In the steps 2 and 3, `a` was substituted with `a ^ b`. Later the 2 properties of bitwise XOR operator were applied.  

Again, swapping variables using bitwise XOR operator has limitations: you can swap only integers.  

## 5. Conclusion

JavaScript offers a bunch of good ways to swap the values of variables.  

First way, which I recommend for day by day use, is swapping variables using destructuring assignment `[a, b] = [b, a]`. It's a short and expressive approach.  

The second way uses a temporary variable, but is still a good approach. Use it as an alternative to destructuring assignment approach.  

The thrid way, using additional and substraction, doesn't use additional variables or memory. Howerer, the approach is limited to swapping integer numbers only.  

The same way the fourth approach using bitwise XOR doesn't use additional elements. And again, you can only swap interegers using the XOR operator.  

*Which way is better to swap 3 and more variables? Please write your opinion in a comment below!*