---
title: 'How && and || Operators Really Work in JavaScript'
description: '&& and || operate not only on boolean types, but also on falsy and truty values.'
published: '2020-04-09T12:00Z'
modified: '2020-04-09T12:00Z'
thumbnail: './images/javascript-import-module-drawback-cover-3.png'
slug: javascript-and-or-logical-operators
tags: ['javascript']
recommended: ['javascript-modules-best-practices', 'javascript-utility-libraries']
type: post
commentsThreadId: javascript-and-or-logical-operators
---

The logical *and* (`&&`) and *or* (`||`) are common logical operators used in JavaScript. 

Normally you're using these operators with operands of boolean type:

```javascript
true && true   // => true
true && false  // => false

true || true   // => true
true || false  // => true
```

Can you use `&&` and `||` with operands of a different kind that boolean? Turns out in JavaScript you *can*. 

Before understanding how the logical operators can work on any value type, let's understand what truthy and falsy values are.  

## 1. Falsy value

*Falsy* is a value for which `Boolean(value)` return `false`. Falsy values in JavaScript are `false`, `0`, `''`, `null`, `undefined` and `NaN`.  

Here's a quick demonstration that the provided values are falsy:

```javascript
Boolean(false);     // => false
Boolean(0);         // => false
Boolean('');        // => false
Boolean(null);      // => false
Boolean(undefined); // => false
Boolean(NaN);       // => false
```

## 2. Truthy value

*Truthy* is a value for which `Boolean(value)` returns `true`. Saying it differently, the truthy values are values that are not falsy. 

Examples of truthy values are `true`, `4`, `'Hello'`, `{ name: 'John' }` and everything else that's *not falsy*. 

```javascript
Boolean(true);             // => true
Boolean(4);                // => true
Boolean('Hello');          // => true
Boolean({ name: 'John' }); // => true
```

## 3. How && operator works

Knowing what truthy and falsy values are, let's check into more detail how the logical and `&&` operator works.  

Here's a generalized syntax of an `&&` operator that involves a chain of operators:

```
operand1 && operand2 && ... && operandN
```

The expression is evaluated as follows: 

> Starting from left and moving to the right, return the *first* operand that is *falsy*. If no falsy operand was found, return the *latest* operand.

While at first this way of evaluation and seems surprising, it gives the ability to have operands of any type.  

Let's evaluate a few examples.  
 
When the operands are booleans, it's simple:

```javascript
true && false && true; // => false
```
The evaluation starts from left and moves to the right. Passing the first `true` operand, the second operand `false` is a falsy value. Thus `false` becomes the result of the entire expression. The third operand `true` is not evaluated.  

When operands are numbers:

```javascript
3 && 1 && 0 && 10; // => 0
```

The evaluation starts from left and moves to the right. Passing the first `3` and second `1` operands, JavaScript stops at the third operand `0` since it's falsy. `0` becomes the result of the entire expression. The fourth operand `10` is not evaluated.  

A slighly more complex example with different types:

```javascript
true && 1 && { name: 'John' }
```

Again, from left to right, the operands are checked for falsy. No operand is falsy, so the last operand is returned. The evaluation result is `{ name: 'John' }`.

## 4. How || operator works

Here's a generalized syntax of `||` operator in chain:

```
operand1 || operand2 || ... || operandN
```

JavaScript evaluates the expression this way: 

> Starting from left and moving to the right, return the *first* operand that is *truthy*. If no truthy operand was found, return the *latest* operand.

`||` works the same way as `&&`, with the only difference that `||` stops evaluation on a truthy operand.  

Let's study some examples.  

A simple expression having 2 booleans:

```javascript
true || false; // => true
```
The evaluation starts from left and moves to the right. Luckily, the first operand `true` is a truthy value, so the whole expression evaluates as `true`. The second operand `false` is not checked.

Having some numbers as operands:

```javascript
0 || -1 || 10; // => -1
```

The first operand `0` is falsy, so the evaluation continues. The second argument `-1` is already truthy, so the evaluation stops, and the result is `-1`.

### 3.1 Default value when accessing properties

You can use this effect to access the properties of an object, and default to a value when the property doesn't exist:

```javascript
const person = {
  name: 'John'
};

person.name || 'Unknown'; // => 'John'
person.job  || 'Unknown'; // => 'Unknown'
```

`person.name || 'Unknown'`: because the first operand `person.name` is `'John'` (a truthy value), the expression evaluates to `'John'`.  

The second expression `person.job  || 'Unknown'` is different. `person` object doesn't have a `job` property, thus `person.job` is `undefined`. In the expression `undefined || 'Unknown'` JavaScript skips the first operand `undefined` (because it is falsy), and returns the second truthy value `'Unknown'`.  

## 5. Summary

Because JavaScript is a loosely typed language, the operands of `&&` and `||` can be of any type.  

To deal with types conversion within logical operators, the concepts of falsy and truthy are useful. Falsy values are `false`, `0`, `''`, `null`, `undefined` and `NaN`, while the rest of values are truthy.  

`&&` operator evaluates the operands from left to right and returns the first falsy value encountered. If no operand is falsy, the latest operand is returned.  

The same way `||` operator evaluates the operands from left to right but returns the first truthy value encountered. If no truthy value was found, the latest operand is returned.  

While `&&` and `||` evaluation algorithms seem weird at first, in my opinion, they're quite efficient. The early exit is a good optimization.  

In terms of usage, I recommend to use booleans as operands for both `&&` and `||`, and avoid other types if possible. Logical expressions that operate only on booleans are easier to understand.  

*Can you explain how 0 || 1 && 2 is evaluated?*