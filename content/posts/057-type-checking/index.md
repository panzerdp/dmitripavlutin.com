---
title: "5 Type Checking Pitfalls in JavaScript"
description: '"typeof" and "instanceof" perform the type checking in JavaScript. While they are generally simple to use, make sure to known the edge cases.'
published: '2019-12-03T14:00Z'
modified: '2019-12-03T14:00Z'
thumbnail: './images/bird.jpg'
slug: javascript-type-checking-pitfalls
tags: ['javascript', 'typeof', 'instanceof']
recommended: ['7-tips-to-handle-undefined-in-javascript', 'the-legend-of-javascript-equality-operator']
type: post
commentsThreadId: javascript-type-checking-typeof-instanceof
---

JavaScript's dynamic typing is good and bad at the same time. It's good because you don't have to indicate the variable's type. It's bad because you can never be sure about the variable's type.  

`typeof` operator determines the 5 common types in JavaScript:

```javascript
typeof 10;        // => 'number'
typeof 'Hello';   // => 'string'
typeof false;     // => 'boolean'
typeof { a: 1 };  // => 'object'
typeof undefined; // => 'undefined'
```

As well, `instanceof` checks the constructor of an instance:

```javascript
class Cat { }
const myCat = new Cat();

myCat instanceof Cat; // => true
```

But some behavior of `typeof` and `instanceof` can be confusing. Especially at the edge cases. You have to be aware of the type checking pitfalls in advance.  

This post explains 5 common pitfalls you might encouter when using `typeof` and `instanceof`. Plus you'll find useful type checking best practices.  

## 1. The type of null

![typeof null in JavaScript meme](./images/typeof-5.jpg)

`typeof myObject === 'object'` would tell you if `myObject` is an object type. Let's try that in an example:

```javascript{3}
const person = { name: 'batman' };

typeof person; // => 'object'
```

`typeof person` is `'object'` because `person` holds a plain JavaScript object.  

Sometimes the variables that hold objects, for some reason, could be empty. Then you need a special value `null`.  

Here are a few use-cases:

* You can use `null` to skip indicating configuration objects
* When a function cannot construct an object for some reason, it can return `null`
* A variable, which later should hold an object, you can initialize with `null`.

For example, `str.match(regExp)` method returns `null` if no regular expression matches occur:

```javascript
const message = 'Hello';
message.match(/Hi/); // => null
```

Can you use `typeof` to differentiate an existing object from a missing object? 

Unfortunately, you can't:

```javascript
const myObject = null;
typeof myObject; // => 'object'

myObject = { prop: 'Value' };
typeof myObject; // => 'object'
```

`typeof` with an existing object and with `null` evaluates to `'object'`.  

A good approach to detect if a variable has an object, and no `null` values, is this:

```javascript{2}
function isObject(value) {
  return typeof value === 'object' && value !== null;
}

isObject({});   // => true
isObject(null); // => false
```

In addition to checking that `value` is an object: `typeof value === 'object'`, you also explicitely verify for null: `value !== null`.  

## 2. The type of an array

If you try to detect if a variable contains an array, the first temptation is to use `typeof` operator:

```javascript
const colors = ['white', 'blue', 'red'];

typeof colors; // => 'object'
```

However, the type of the array is an `'object'` too. While technically an array is an object, would it be better to have a spectial type for arrays? Maybe.  

The correct way to detect an array is to use explicitely `Array.isArray()`:

```javascript
const colors = ['white', 'blue', 'red'];
const hero = { name: 'Batman' };

Array.isArray(colors); // => true
Array.isArray(hero);   // => false
```

`Array.isArray(colors)` returns a boolean `true`, indicating that `colors` is an array.  

## 3. Falsy as type check

`undefined` in JavaScript is a special value meaning uninitialized variable.  

You can get an `undefined` value if you try to access an uninitialized variable, non-existing object property:

```javascript
let city;
let hero = { name: 'Batman', villain: false };

city;     // => undefined
hero.age; // => undefined
```

Accessing the uninitialized variable `city` and a non-existing property `hero.age` evaluates to `undefined`.  

To check if a property exists, and `undefined` being falsy, you might have the tempration to use `object[propName]` in a condition:

```javascript{11,15}
function getProp(object, propName, def) {
  // Not good
  if (!object[propName]) {
    return def;
  }
  return object[propName];
}

const hero = { 
  name: 'Batman', 
  villain: false 
};

getProp(hero, 'name', 'Unkown'); // => 'Batman'
getProp(hero, 'villain', true);  // => true
```

`object[propName]` evaluates to `undefined` when `propName` doesn't exist in `object`. `if (!object[propName]) { return def }` guards missing properties.

However, `hero.villain` property exists and has `false` value. But the function incorrectly returns `true` when executing `getProp(hero, 'villain', true)`.  

Don't use falsy as a type check. Explicitly verify if the property exists in the object:

* `typeof object[propName] === 'undefined'`
* `propName in object`
* `object.hasOwnProperty(propName)`

Let's improve `getProp()` function:

```javascript{3,11}
function getProp(object, propName, def) {
  // Better
  if (!(propName in object)) {
    return def;
  }
  return object[propName];
}

const hero = { name: 'Batman', villain: false };
getProp(hero, 'name', 'Unkown'); // => 'Batman'
getProp(hero, 'villain', true);  // => false
```

`if (!(propName in object)) { ... }` condition correctly determines if the property exists.  

### Logical operators

I think it's better to avoid using logical operator `||` as default mechanism. My code reading flow always stucks when I see this:

```javascript{6,9}
const hero = { name: 'Batman', villan: false };

const name = herro.villain || 'Unknown';
name; // => 'Unknwon'

// Bad
const villain = hero.villain || true;
villain; // => true
```

`hero` has a property `villain` with value `false`. However the expression `hero.villain || true` evaluates to `true`.  

*The logical operator `||` used as defaulting mechanism when accessing properties fails when the property exists and has a falsy value.* 

To default when the property does not exists, better options are the new [nullish coalescing operator](/javascript-optional-chaining/#3-default-with-nullish-coalescing):

```javascript{6,9}
const hero = { name: 'Batman', villan: false };

// Good
const villain = hero.villain ?? true;
villain; // => false
```

Or destructuring assignment:

```javascript{8}
const hero = { name: 'Batman', villan: false };

// Good
const { villain = true } = hero;
villain; // => false
```

## 4. The type of NaN

![Ultimate Answer to Universe: NaN](./images/nan.jpg)

`typeof` operator evaluates to `number` if the variable contains a number:

```javascript
const pi = 3.14;

typeof pi; // => 'number'
```

`pi` variable contains a number, respectively `typeof pi` is `'number'`.  

Trying to assume that a variable contains a "correct" number (integer or float) is not always correct using `typeof`:

```javascript
function isNumber(value) {
  // Not good
  return typeof value === 'number';
}

const styles = { fontsize: 16 };

isNumber(styles.fontSize * 2); // => true
styles.fontSize * 2;           // => NaN
```

`NaN`, while being a number, represents a faulty number *Not A Number*.  

If you want to be sure that you receive a correct number, you have to verify additionally against `NaN`.  

Let's make a better version of `isNumber()` function:

```javascript
function isNumber(value) {
  // Better
  return !isNaN(value) && typeof value === 'number';
}

const styles = { fontsize: 16 };

isNumber(styles.fontSize * 2); // => false
styles.fontSize * 2;           // => NaN
```

The better version of `isNumber()` now uses `isNaN(value)` function that returns `true` if `value` is `NaN`.  

## 5. *instanceof* and the prototype chain

`instanceof` is the operator that checks the constructor of an object.  

For example the constructor of any plain object in JavaScript is `Object`:

```javascript
const plainObject = {};

plainObject instanceof Object; // => true
```

Now, let's define a parent class `Pet` and its child class `Cat`:

```javascript
class Pet {
  constructor(name) {
    this.name;
  }
}

class Cat extends Pet {
  sound = 'Meow';
}

const myCat = new Cat('Scratchy');
```

`myCat` is an instance of the child class `Cat`.  

Now let's try to determine the instance of `myCat`:

```javascript
myCat instanceof Cat;    // => true
myCat instanceof Pet;    // => true
myCat instanceof Object; // => true
```

`instanceof` operator says that `myCat` is an instance of `Cat`, `Pet` and even `Object`.  

It happens because `instanceof` operator searches for the constructor of the object through the entire prototype chain.

To detect exactly the constructor that has created the object look at the `constructor` property of the instance, which holds a reference to the constructor of the object.  

Knowing that, let's detect the exact class of `myCat`:

```javascript
myCat.constructor === Cat;    // => true
myCat.constructor === Pet;    // => false
myCat.constructor === Object; // => false
```

Only `myCat.constructor === Cat` evaluates to `true`, indicating exactly the constructor of the `myCat` instance.  

### *instanceof* customization

`Symbol.hasInstance` is a special symbol that customizes the behavior of `instanceof` operator.  

For example, let's customize `instanceof` behavior of `Cat` class:

```javascript{4-6}
class Cat extends Pet {
  sound = 'Meow';

  [Symbol.hasInstance](constructor) {
    return this.constructor === constructor;
  }
}

const myCustomCat = new Cat('Scratchy');
```

`Pet` class defines a method named `Symbol.hasInstance`. The method receives the constructor parameter, and it should return a boolean indicating whether the current instance has a `constructor` parameter as a constructor.  

Let's try again to use `instanceof` to detect the constructor of `myCustomCat`:

```javascript
myCustomCat instanceof Cat;    // => true
myCustomCat instanceof Pet;    // => false
myCustomCat instanceof Object; // => false
```

Because of the special method `Symbol.hasInstance`, now only `myCustomCat instanceof Cat` evaluates to `true`.  

Anyways, carefully customize `instanceof` to avoid confusing developers or break code that relies on the default behavior of `instanceof`.

## 6. Key takeaways

The operators `typeof` and `instanceof` perform the type checking in JavaScript. While they are generally simple to use, make sure to know the edge cases.  

`typeof null` equals `'object'`, which could be unexpected. To determine exactly if a variable contains a non-null object you have to use a more verbose:

```javascript
typeof myObject === 'object' && myObject !== null
```

The best way to check if the variable holds an array is to use `Array.isArray()` built-in function.  

Because `undefined` is falsy, you might be tempted to use it directly in conditionals. Avoid using falsy as a type guard because it is error prone. 

Use better constructions like `prop in object` to verify the property existence, or nullish coalesing `object.prop ?? def` or destructuring assignment `{ prop = def } = object` to access potentially missing properties.  

`NaN` is a special value of type number that is generated after an invalid operation on numbers. If you want to be sure that your variable has a correct number, a more explicit verification `!isNaN(number) && typeof number === 'number'`.  

Finally, remember that `instanceof` checks the constructor of the instance in the whole prototype chain. Without knowing that, you could get a false-positive if you verify a child's class instance with the parent class.  

*What JavaScript type checking pitfalls do you know?*
