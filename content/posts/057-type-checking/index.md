---
title: "5 Type Checking Pitfalls in JavaScript"
description: "This post contains 5 pitfalls of typeching in JavaScript using typeof and instanceof."
published: '2019-12-03T14:00Z'
modified: '2019-12-03T14:00Z'
thumbnail: './images/bird.jpg'
slug: javascript-type-checking-pitfalls
tags: ['javascript', 'typeof', 'instanceof']
recommended: ['7-tips-to-handle-undefined-in-javascript', 'the-legend-of-javascript-equality-operator']
type: post
commentsThreadId: javascript-type-checking-typeof-instanceof
---

JavaScript uses dynamic typing. You can assign to a variable values of different types:

```javascript
let number;
number = 10;
// Works too!
number = 'ten';
```

Dynamic typing is good and bad at the same time. It's good because you don't have to worry about indicating the variable type. It's bad because you can never be sure and enforce a type to a variable.

`typeof` is the operator to check the value type. It determines the 5 common types in JavaScript:

```javascript
typeof 10;        // => 'number'
typeof 'Hello';   // => 'string'
typeof false;     // => 'boolean'
typeof { a: 1 };  // => 'object'
typeof undefined; // => 'undefined'
```

As well, you can check the constuctor of an instance using `instanceof`:

```javascript
class Cat { }
const myCat = new Cat();

myCat instanceof Cat; // => true
```

But some behavior of `typeof` and `instanceof` can be confusing, especially at the edge case values like `null` or arrays. Let's see the 5 common pitfalls of `typeof` and `instanceof`, as well some other tips to be aware of.  

## 1. The type of null

## 2. The type of an array

## 3. The type of NaN

## 4. The prototype chain and instanceof

@@species
@@hasInstance

## 5. Falsy as type check

## 6. Key takeaway
