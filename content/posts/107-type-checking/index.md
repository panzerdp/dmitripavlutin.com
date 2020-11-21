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

JavaScript is a loosely-typed language, meaning that there isn't any restriction on types of values you can assign to variables. 

For example, if you've created a variable with a string type, later you can assign to the same variable a number:

```javascript
let message = 'Hello'; // assign a string

message = 14; // assign a number
```

Such dynamism is useful because it gives you flexibility and simplifies variables declaration.  

On the other side, you can never be sure that a variable is going to have a value of a certain type. For example, the following function `greet(who)` expects a string argument, however you can invoke the function with any type of argument:

```javascript
function geet(who) {
  return `Hello, ${who}!`
}

greet('World'); // => 'Hello, World!'
// You can use any type as argument
greet(true);    // => 'Hello, true!'
greet([1]);     // => 'Hello, 1!'
```

That's why, sometimes, you need to check the type of variables in JavaScript: using `typeof` operator, as well as `instanceof` to check instances types.  

Let's see in more detail how to use `typeof` and `instanceof` operators in JavaScript.  

## 1. *typeof* operator

JavaScript provides the following primitive types: strings, numbers, booleans, symbols as primitive types. Plus  special `undefined` and object types.    

To determine the type of the variable, simply invoke the expression `typeof myVariable`, and it will evaluate to one of the values: `'string'`, `'number'`, `'boolean'`, `'symbol'`, `'undefined'`, `'object'`.  

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

What about the type of `null`? Uh, oh, that's a nasty one.

### 1.1 *typeof null*

As mentioned in the previous section, `typeof` an object is `'object'`. 

However, as confusing it might be, `typof null` resolves to `'object'` as well!

```javascript
const missingObject = null;
typeof missingObject; // => 'object'
```

If you'd like to check if variable's type is a real object, then you'd have to additionally check againts `null`:

```javascript
function isRealObject(object) {
  return typeof object === 'object' && object !== null;
}

isRealObject({ name: 'Batman' }); // => true
isRealObject(15);                 // => false
isRealObject(null);               // => false
```

### 1.2. *typeof* and not defined variables

If you access a not defined variable, JavaScript simply throws a reference error:

```javascript
// missingVar is not defined
missingVar; // throws ReferenceError
```

But `typeof` has a nice property that when applied to a not defined variable `typeof missingVar`, a reference error is not thrown:

```javascript
// missingVar is not defined
typeof missingVar; // => 'undefined'
```

In simple words, if `missingVar` is not defined, `typeof missingVar` evaluates to `'undefined'`.  

Follow the post [3 Ways to Check if a Variable is Defined in JavaScript](/javascript-defined-variable-checking/) to read more about not defined variables.  

## 2. *instanceof* operator

You've defined a class `Pet`, and then created an instance of that class `myPet`:

```javascript
class Pet {
  constructor(name) {
    this.name = name;
  }
}

const myPet = new Pet('Lily');
```

How can you check that `myPet` is an instance of `Pet` class? 

Welcome `object instanceof Constructor` operator: it checks whether the `object` was created by `Constructor`.  

Since `myPet` was created using `Pet` class:

```javascript
myPet instanceof Pet; // => true
```

`myPet instanceof Pet` evaluates to `true`.  

However, a plain object isn't an instance of `Pet`:

```javascript
{ name: 'Zoe' } instanceof Pet; // => false
```

### 2.1 *instanceof* parent class

Now let's say that you've extended the class `Pet`:

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

But at the same time, `myCat` is also an instance of the base class `Pet`:

```javascript
myCat instanceof Pet; // => true
```

In simple words, `object instanceof Constructor` evaluates to `true` if `object` is an instance of `Constructor`, but also if `Constructor` is the parent class of instance's class.  

## 3. Summary

JavaScript is loosely-typed language, meaning that there are no restriction on what type a variable can have.  

Thus, sometimes, you have to check what type the variable is.  

`typeof myVariable` is the operator that let's you determine the type of `myVariable`. It can evaluate to one of the values: `'string'`, `'number'`, `'boolean'`, `'symbol'`, `'undefined'`, `'object'`.  

Note that `typeof null` evaluates to `'object'`, which might be a bit confgusing.  

`instanceof` operator let's identify the class that created an instance. `object instanceof Constructor` evaluates to `true` if `object` is an instance of `Constructor`.  