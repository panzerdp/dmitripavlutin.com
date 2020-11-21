---
title: "Type checking in JavaScript: typeof and instanceof operators"
description: "How to perform type checking in JavaScript using typeof and instance of operators."
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
function geet(who) {
  return `Hello, ${who}!`
}

greet('World'); // => 'Hello, World!'
// You can use any type as argument
greet(true);    // => 'Hello, true!'
greet([1]);     // => 'Hello, 1!'
```

That's why, sometimes, you need to check the variable's type in JavaScript &mdash; using `typeof` operator, as well as `instanceof` to check instances types.  

Let's see in more detail how to use `typeof` and `instanceof` operators in JavaScript.  

## 1. *typeof* operator

JavaScript provides the following primitive types: strings, numbers, booleans, symbols. Plus functions, object types, and the special `undefined`.

To determine the type of the variable, simply invoke the expression `typeof myVariable`, and it will evaluate to one of the values: `'string'`, `'number'`, `'boolean'`, `'symbol'`, `'undefined'`, `'object'`, `'function'`.  

`typeof` operator lets you distinguish these types.

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

As mentioned in the previous section, `typeof` an object is `'object'`. 

However, `typeof null` resolves to `'object'` as well!

```javascript
const missingObject = null;
typeof missingObject; // => 'object'
```

That's a bit confusing, and as the rumors [say](https://twitter.com/BrendanEich/status/1140637621183377408), `typeof null` being `'object'` was a bug in the initial implementation of JavaScript.  

When using `typeof` to detect a real object be sure to check againts `null` additionally:

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

JavaScript throws a reference error if you access a variable that is not defined:

```javascript
// missingVar is not defined
missingVar; // throws ReferenceError
```

But `typeof` has a nice property &mdash; a reference error is not thrown when `typeof` evaluates the type of a not defined variable:

```javascript
// missingVar is not defined
typeof missingVar; // => 'undefined'
```

In simple words, if `missingVar` is not defined, `typeof missingVar` evaluates to `'undefined'`.  

This way, you can use `typeof` to detect if a variable is not defined: `typeof missingVar === 'undefined'` evaluates to `true` if `missingVar` is not defined.

Follow the post [3 Ways to Check if a Variable is Defined in JavaScript](/javascript-defined-variable-checking/) to read more about not defined variables.  

## 2. *instanceof* operator

Ok, `typeof` lets you detect the primitive type of the variable. But what about more complex object-oriented type checking?  

For example, you've defined a class `Pet`, and then created an instance of that class `myPet`:

```javascript
class Pet {
  constructor(name) {
    this.name = name;
  }
}

const myPet = new Pet('Lily');
```

How can you check that `myPet` is an instance of `Pet` class? 

Welcome `object instanceof Constructor` operator: it checks whether the `object` was instantiated by `Constructor`.  

Since `myPet` was created using `Pet` class, `myPet instanceof Pet` evaluates to `true`:  

```javascript
myPet instanceof Pet; // => true
```

However, a plain object isn't an instance of `Pet`:

```javascript
const plainPet = { name: 'Zoe' };
plainPet instanceof Pet; // => false
```

### 2.1 *instanceof* and the parent class

Now let's extended the class `Pet`:

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

*Quiz: What is the built-in constructor in JavaScript for which `instanceof` for any object returns `true`?*