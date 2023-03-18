---
title: "Type checking in JavaScript: typeof and instanceof operators"
description: "How to perform type checking in JavaScript using typeof and instanceof operators."
published: "2020-11-24T08:30Z"
modified: "2020-11-24T08:30Z"
thumbnail: "./images/cover-2.png"
slug: javascript-typeof-instanceof
tags: ['javascript', 'typeof', 'instanceof']
type: post
---

JavaScript is a loosely-typed language, so there is no restriction on the variable's type.  

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

<Affiliate type="traversyJavaScript" />

## 1. typeof operator

In JavaScript, you can find primitive types like strings, numbers, booleans, symbols. Additionally, there are functions, objects, and the special values `undefined` and `null`.  

`typeof` is the operator that let's you determine the type of the `expression`:

```javascript
const typeAsString = typeof expression;
```

where `expression` evaluates to a value which type you'd like to find. `expression` can be a variable `myVariable`, property accessor `myObject.myProp`, function invocation `myFunction()`, or even a raw literal `14`.  

`typeof expression`, depending on the value of `expression`, evaluates to one of the strings: `'string'`, `'number'`, `'boolean'`, `'symbol'`, `'undefined'`, `'object'`, `'function'`.  

Let's see how `typeof` operator works for each type:  

A) Strings:

```javascript
const message = 'hello!';
typeof message; // => 'string'
```

B) Numbers:

```javascript
const number = 5;
typeof number; // => 'number'

typeof NaN;    // => 'number'
```

C) Booleans:

```javascript
const ok = true;
typeof ok; // => 'boolean'
```

D) Symbols:

```javascript
const symbol = Symbol('key');
typeof symbol; // => 'symbol'
```

E) `undefined`:

```javascript
const nothing = undefined;
typeof nothing; // => 'undefined'
```

F) Objects:

```javascript
const object = { name: 'Batman' };
typeof object; // => 'object'

const array = [1, 4, 5];
typeof array; // => 'object'

const regExp = /Hi/;
typeof regExp; // => 'object'
```

G) Functions:

```javascript
function greet(who) {
  return `Hello, ${who}!`
}

typeof greet; // => 'function'
```

What about the type of `null`? Uh, that's a nasty one!

### 1.1 typeof null

As mentioned in the previous section, `typeof` of an object evaluates to `'object'`. That's expected.  

However, `typeof null` evaluates to `'object'` as well!

```javascript
const missingObject = null;
typeof missingObject; // => 'object'
```

As the rumors [say](https://twitter.com/BrendanEich/status/1140637621183377408), `typeof null` being `'object'` was a bug in the initial implementation of JavaScript.   

That's why, when using `typeof` to detect an object, be sure to check againts `null` additionally:

```javascript
function isObject(object) {
  return typeof object === 'object' && object !== null;
}

isObject({ name: 'Batman' }); // => true
isObject(15);                 // => false
isObject(null);               // => false
```

Follow my post [Everything about null in JavaScript](/javascript-null/) to read more about `null` in JavaScript.    

### 1.2. typeof and not defined variables

While usually `typeof expression` determines the type of `expression`, you can use `typeof` also to determine if a variable is defined or not.  

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

The variable `notDefinedVar` is not defined in the current scope. However, `typeof notDefinedVar` doesn't throw a reference error, and evaluates to `'undefined'` string.  

You can use `typeof` to detect if a variable is not defined: `typeof myVar === 'undefined'` evaluates to `true` if `myVar` is not defined.  

Follow the post [3 Ways to Check if a Variable is Defined in JavaScript](/javascript-defined-variable-checking/) to read more about defined/not defined variables.  

## 2. instanceof operator

The usual way to use a JavaScript function is to invoke it by adding a pair of parentheses after its name:

```javascript
function greet(who) {
  return `Hello, ${who}!`;
}

greet('World'); // => 'Hello, World!'
```

`greet('World')` is a regular function invocation.  

But JavaScript functions can do more: they can even construct objects! To make a function construct objects, just use `new` keyword before the regular function invocation:

```javascript
function Greeter(who) {
  this.message = `Hello, ${who}!`;
}

const worldGreeter = new Greeter('World');
worldGreeter.message; // => 'Hello, World!'
```

`new Greeter('World')` is a constructor invocation that creates the instance `worldGreeter`.  

How can you check in JavaScript that a certain instance was created with a certain constructor? Welcome `instanceof` operator:

```javascript
const bool = object instanceof Constructor;
```

where `object` is an expression that evaluates to an object, `Contructor` is a class or function that [constructs](/gentle-explanation-of-this-in-javascript/#4-constructor-invocation) objects. `instanceof` evaluates to a boolean.  

`worldGreeter` instance was created using `Greeter` constructor, so `worldGreeter instanceof Greeter` evaluates to `true`.  

Starting ES2015, a better way to construct objects is by using the `class` syntax. For example, let's define a class `Pet` and then created an instance of it `myPet`:

```javascript
class Pet {
  constructor(name) {
    this.name = name;
  }
}

const myPet = new Pet('Lily');
```

`new Pet('Lily')` is a construction invocation that creates an instance `myPet`.

Since `myPet` was constructed using `Pet` class &mdash; `const myPet = new Pet('Lily')` &mdash; `myPet instanceof Pet` also evaluates to `true`:  

```javascript
myPet instanceof Pet; // => true
```

However, a plain object isn't an instance of `Pet`:

```javascript
const plainPet = { name: 'Zoe' };
plainPet instanceof Pet; // => false
```

As for more practical examples, you may find `instanceof` useful to determine the built-in special instances like regular expressions, arrays:

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

### 2.1 instanceof and the parent class

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

Thus, sometimes, you have to check what type the variable has.  

`typeof expression` is the operator that lets you determine the type of `expression`. `typeof` evaluates to one of the values: `'string'`, `'number'`, `'boolean'`, `'symbol'`, `'undefined'`, `'object'`, `'function'`.  

`typeof null` evaluates to `'object'`, thus the correct way to use `typeof` to detect an object is `typeof object === 'object' && object !== null`.   

`instanceof` operator let's identify the instance's constructor. `object instanceof Constructor` evaluates to `true` if `object` is an instance of `Constructor`.  

*Quiz: What is the built-in constructor for which `instanceof` for any object returns `true`?*