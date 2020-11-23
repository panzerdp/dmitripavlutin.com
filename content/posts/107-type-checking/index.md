---
title: "Type checking in JavaScript: typeof and instanceof operators"
description: "How to perform type checking in JavaScript using typeof and instanceof operators."
published: "2020-11-24T12:00Z"
modified: "2020-11-24T12:00Z"
thumbnail: "./images/cover-2.png"
slug: javascript-typeof-instanceof
tags: ['javascript', 'typeof', 'instanceof']
recommended: ['javascript-defined-variable-checking', 'javascript-null']
type: post
---

JavaScript is a loosely-typed language, so there isn't any restriction on the variable's type.  

For example, if you've created a variable with a string type, later you can assign to the same variable a number:

```javascript
let message = 'Hello'; // assign a string

message = 14; // assign a number
```

Such dynamism gives you flexibility and simplifies variables declaration.  

On the other side, you can never be sure that a variable contains a value of a certain type. For example, the following function `greet(who)` expects a string argument, however, you can invoke the function with any type of argument:

```javascript
function greet(who) {
  return `Hello, ${who}!`
}

greet('World'); // => 'Hello, World!'
// You can use any type as argument
greet(true);    // => 'Hello, true!'
greet([1]);     // => 'Hello, 1!'
```

That's why, sometimes, you need to check the variable's type in JavaScript &mdash; using `typeof` operator, as well as `instanceof` to check instance types.  

Let's see in more detail how to use `typeof` and `instanceof` operators in JavaScript.  

## 1. *typeof* operator

In JavaScript, you can find primitive types like strings, numbers, booleans, symbols. Additionally, there are functions, objects, and the special values `undefined` and `null`.  

`typeof` is an operator that let's you determine the type of the `expression`:

```javascript
const typeAsString = typeof expression;
```

where `expression` is an expression that evaluates to a value: a variable `myVariable`, property accessor `myObject.myProp`, function invocation `myFunction()`, or even a raw literal `14`.  

`typeof expression`, depending on the value of `expression`, will evaluate to one of the strings: `'string'`, `'number'`, `'boolean'`, `'symbol'`, `'undefined'`, `'object'`, `'function'`.  

Let's see how `typeof` operator works in a few examples.  

Strings:

```javascript
const message = 'hello!';
typeof message; // => 'string'
```

Numbers:

```javascript
const number = 5;
typeof number; // => 'number'
```

Booleans:

```javascript
const ok = true;
typeof ok; // => 'boolean'
```

Symbols:

```javascript
const symbol = Symbol('key');
typeof symbol; // => 'symbol'
```

`undefined`:

```javascript
const nothing = undefined;
typeof nothing; // => 'undefined'
```

Objects:

```javascript
const object = { name: 'Batman' };
typeof object; // => 'object'

const array = [1, 4, 5];
typeof array; // => 'object'

const regExp = /Hi/;
typeof regExp; // => 'object'
```

Functions:

```javascript
function greet(who) {
  return `Hello, ${who}!`
}

typeof greet; // => 'function'
```

What about the type of `null`? Uh, that's a nasty one!

### 1.1 *typeof null*

As mentioned in the previous section, `typeof myObject` an object evaluates to `'object'` string. That's reasonable.  

However, `typeof null` evaluates to `'object'` string as well!

```javascript
const missingObject = null;
typeof missingObject; // => 'object'
```

That's a bit confusing, and as the rumors [say](https://twitter.com/BrendanEich/status/1140637621183377408), `typeof null` being `'object'` was a bug in the initial implementation of JavaScript.  

That's why, when using `typeof` to detect a real object, be sure to check againts `null` additionally:

```javascript
function isRealObject(object) {
  return typeof object === 'object' && object !== null;
}

isRealObject({ name: 'Batman' }); // => true
isRealObject(15);                 // => false
isRealObject(null);               // => false
```

Follow my post [Everything about null in JavaScript](/javascript-null/) to read more about `null` in JavaScript.    

### 1.2. *typeof* and not defined variables

While `typeof`'s direct scope is to determine the type of the value, it has an interesting property that you can use to determine if a variable is defined on not.  

JavaScript throws a reference error if you access a variable that is not defined:

```javascript
// notDefinedVar is not defined
notDefinedVar; // throws ReferenceError
```

But `typeof` has a nice property &mdash; a reference error is *not thrown* when `typeof` evaluates the type of a not defined variable:

```javascript
// notDefinedVar is not defined
typeof notDefinedVar; // => 'undefined'
```

The variable `notDefinedVar` is not defined in the current scope. However, executing the expression `typeof notDefinedVar` doesn't throw a reference error, and evaluates to `'undefined'` string.  

This way, you can use `typeof` to detect if a variable is not defined: `typeof notDefinedVar === 'undefined'` evaluates to `true` if `notDefinedVar` is not defined.

Follow the post [3 Ways to Check if a Variable is Defined in JavaScript](/javascript-defined-variable-checking/) to read more about not defined variables.  

## 2. *instanceof* operator

Ok, `typeof` lets you detect the primitive type. But what about more complex object-oriented type checking?  

For example, you've defined a class `Pet`, and then created an instance of it `myPet`:

```javascript
class Pet {
  constructor(name) {
    this.name = name;
  }
}

const myPet = new Pet('Lily');
```

How can you check that `myPet` is an instance of `Pet` class? 

Welcome `instanceof` operator:

```javascript
const bool = object instanceof Constructor;
```

`object instanceof Constructor` checks whether the `object` was instantiated by `Constructor`.    

Since `myPet` was created using `Pet` class, `myPet instanceof Pet` evaluates to `true`:  

```javascript
myPet instanceof Pet; // => true
```

However, a plain object isn't an instance of `Pet`:

```javascript
const plainPet = { name: 'Zoe' };
plainPet instanceof Pet; // => false
```

As for more practical examples, you may find `instanceof` useful to determine the built-in special objects in JavaScript like regular expressions, arrays:

```javascript
function isRegExp(value) {
  return value instanceof RegExp;
}
isRegExp(/Hello/); // => true
isRegExp('Hello'); // => false

function isArray(value) {
  return value instanceof Array;
}
isArray([1, 2, 3]); // => true
isArray({ prop: 'Val' }); // => false
```

### 2.1 *instanceof* and the parent class

Now the class `Cat` extends the parent class `Pet`:

```javascript
class Cat extends Pet {
  constructor(name, color) {
    super(name);
    this.color = color;
  }
}

const myCat = new Cat('Callie', 'red');
```

As expected, `myCat` is an instance of `Cat` class:

```javascript
myCat instanceof Cat; // => true
```

But at the same time, `myCat` is also an instance of the base class `Pet`!

```javascript
myCat instanceof Pet; // => true
```

In simple words, `object instanceof Constructor` evaluates to `true` if `object` is an instance of `Constructor`, but also if `Constructor` is the parent class of instance's class.  

## 3. Summary

JavaScript is a loosely-typed language, meaning that there is no restriction on what type a variable can have.  

Thus, sometimes, you have to check what type the variable is.  

`typeof myVariable` is the operator that lets you determine the type of `myVariable`. It can evaluate to one of the values: `'string'`, `'number'`, `'boolean'`, `'symbol'`, `'undefined'`, `'object'`, `'function'`.  

Note that `typeof null` evaluates to `'object'`.  

`instanceof` operator let's identify the instance's constructor. `object instanceof Constructor` evaluates to `true` if `object` is an instance of `Constructor`.  

*Quiz: What is the built-in constructor for which `instanceof` for any object returns `true`?*