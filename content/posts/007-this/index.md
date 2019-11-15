---
title: 'Gentle Explanation of "this" in JavaScript'
description: "The value of this keyword in JavaScript is determined by how the function is called. My guide will help you effortlessly understand this."
published: "2016-05-22"
modified: "2016-07-08"
thumbnail: "./images/cover.jpg"
slug: gentle-explanation-of-this-in-javascript
tags: ["javascript", "this"]
recommended: ["fix-this-in-javascript", "when-not-to-use-arrow-functions-in-javascript"]
type: post
---

## 1. The mystery of this

`this` keyword has been a mystery for me for a long time. It is a powerful feature but requires efforts to be understood.  

From a background like *Java*, *PHP* or other *standard* language, [`this`](https://en.wikipedia.org/wiki/This_(computer_programming)) is seen as an instance of the current object in the class method. Mostly, `this` cannot be used outside the method and such a simple approach does not create confusion. 

In JavaScript the situation is different: `this` is the current execution context of a function. The language has 4 function invocation types:  

 * function invocation: `alert('Hello World!')`
 * method invocation: `console.log('Hello World!')`
 * constructor invocation: `new RegExp('\\d')`
 * indirect invocation: `alert.call(undefined, 'Hello World!')`

Each invocation type defines the context in its own way, so `this` behaves slightly different than the developer expects. 

![The mystery of this in JavaScript](./images/Gentle-explanation-of-this--7--1.png)

Moreover [strict mode](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Strict_mode) also affects the execution context. 

*The key to understanding `this`* keyword is having a clear view over *function invocation* and how it impacts the context.  
This article focuses on the invocation explanation, how the function call influences `this` and demonstrates the common pitfalls of identifying the context.

Before starting, let's familiarize with a couple of terms:

* **Invocation** of a function is executing the code that makes the body of a function, or simply *calling* the function. For example `parseInt` function **invocation** is `parseInt('15')`. 
* **Context** of an invocation is the value of `this` within function body. For example the invocation of `map.set('key', 'value')` has the context `map`.
* **Scope** of a function is the set of variables, objects, functions accessible within a function body.

```toc
# Table of contents
```

## 2. Function invocation

**Function invocation** is performed when an expression that evaluates to a function object is followed by an open parenthesis `(`, a comma separated list of arguments expressions and a close parenthesis `)`. For example `parseInt('18')`. 

*Function invocation* expression cannot be a [property accessor](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Property_accessors) `obj.myFunc()`, which creates a *method invocation*. For example `[1,5].join(',')` is **not** a function invocation, but a method call. Please remember the distinction between them.  

A simple example of function invocation:

```javascript
function hello(name) {
  return 'Hello ' + name + '!';
}
// Function invocation
const message = hello('World');
console.log(message); // => 'Hello World!'
```

`hello('World')` is a function invocation: `hello` expression evaluates to a function object, followed by a pair of parenthesis with the `'World'` argument. 

A more advanced example is the [IIFE](https://en.wikipedia.org/wiki/Immediately-invoked_function_expression) (immediately-invoked function expression):

```javascript
const message = (function(name) {
  return 'Hello ' + name + '!';
})('World');
console.log(message) // => 'Hello World!'
```

IIFE is a function invocation too: the first pair of parenthesis `(function(name) {...})` is an expression that evaluates to a function object, followed by the pair of parenthesis with `'World'` argument: `('World')`.

### 2.1. this in a function invocation

> `this` is the **global object** in a function invocation.

The global object is determined by the execution environment. In a browser, the global object is [`window`](https://developer.mozilla.org/en-US/docs/Web/API/Window) object.  

![this in JavaScript function invocation](./images/2-1.png)

In a function invocation, the execution context is the global object. 

Let's check the context in the following function:

```javascript
function sum(a, b) {
  console.log(this === window); // => true
  this.myNumber = 20; // add 'myNumber' property to global object
  return a + b;
}
// sum() is invoked as a function
// this in sum() is a global object (window)
sum(15, 16);     // => 31
window.myNumber; // => 20
```

At the time `sum(15, 16)` is called, JavaScript automatically sets `this` as the global object (`window` in a browser).  

When `this` is used outside of any function scope (the topmost scope: global execution context), it also the global object:

```javascript
console.log(this === window); // => true
this.myString = 'Hello World!';
console.log(window.myString); // => 'Hello World!'
```

```html
<!-- In an html file -->
<script type="text/javascript">
 console.log(this === window); // => true
</script>
```

### 2.2. this in a function invocation, strict mode

> `this` is **`undefined`** in a function invocation in strict mode

The strict mode is available starting [ECMAScript 5.1](http://www.ecma-international.org/ecma-262/5.1/#sec-10.1.1), which is a restricted variant of JavaScript. It provides better security and stronger error checking.  

To enable the strict mode place the directive `'use strict'` at the top of a function body. 

Once enabled, the strict mode affects the execution context, making `this` to be `undefined` in a regular function invocation. The execution context is **not** the global object anymore, contrary to above case [2.1](#21-this-in-function-invocation).

![this in JavaScript function invocation, strict mode](./images/3-1.png)

An example of a function called in strict mode:

```javascript
function multiply(a, b) {
  'use strict'; // enable the strict mode
  console.log(this === undefined); // => true
  return a * b;
}
// multiply() function invocation with strict mode enabled
// this in multiply() is undefined
multiply(2, 5); // => 10
```

When `multiply(2, 5)` is invoked as a function in strict mode, `this` is `undefined`.  

The strict mode is active not only in the current scope but also in the inner scopes (for all functions declared inside):

```javascript
function execute() {
  'use strict';

  function concat(str1, str2) {
    // the strict mode is enabled too
    console.log(this === undefined); // => true
    return str1 + str2;
  }

  // concat() is invoked as a function in strict mode
  // this in concat() is undefined
  concat('Hello', ' World!'); // => "Hello World!"
}

execute();
```

`'use strict'` sits at the top of `execute` body, enabling the strict mode within its scope. Because `concat` is declared within the `execute` scope, it inherits the strict mode. And the invocation `concat('Hello', ' World!')` makes `this` to be `undefined`.

A single JavaScript file may contain both strict and non-strict modes. So it is possible to have different context behavior in a single script for the same invocation type:  

```javascript
function nonStrictSum(a, b) {
  // non-strict mode
  console.log(this === window); // => true
  return a + b;
}

function strictSum(a, b) {
  'use strict';
  // strict mode is enabled
  console.log(this === undefined); // => true
  return a + b;
}

// nonStrictSum() is invoked as a function in non-strict mode
// this in nonStrictSum() is the window object
nonStrictSum(5, 6); // => 11
// strictSum() is invoked as a function in strict mode
// this in strictSum() is undefined
strictSum(8, 12); // => 20
```

### 2.3. Pitfall: this in an inner function

⚠️ A common trap with the function invocation is thinking that `this` is the same in an inner function as in the outer function.  

👍Correctly the context of the inner function depends only on its invocation type, but not on the outer function's context.  

To make `this` have a desired value, modify the inner function's context with indirect invocation (using [`.call()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call) or [`.apply()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply), see [5.](#5indirectinvocation)) or create a bound function (using [`.bind()`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_objects/Function/bind), see [6.](#6boundfunction)).

The following example is calculating a sum of two numbers:

```javascript{10}
const numbers = {
  numberA: 5,
  numberB: 10,

  sum: function() {
    console.log(this === numbers); // => true

    function calculate() {
      // this is window or undefined in strict mode
      console.log(this === numbers); // => false
      return this.numberA + this.numberB;
    }

    return calculate();
  }
};

numbers.sum(); // => NaN or throws TypeError in strict mode
```

⚠️ `numbers.sum()` is a method invocation on an object (see [3.](#3-method-invocation)), so the context in `sum` is `numbers` object. `calculate()` function is defined inside `sum()`, so you might expect to have `this` as `numbers` object in `calculate()` too.  

`calculate()` is a function invocation (but **not** method invocation), thus here `this` is the global object `window` (case [2.1.](#21-this-in-function-invocation)) or `undefined` in strict mode (case [2.2.](#22-this-in-function-invocation-strict-mode)). Even if the outer function `sum()` has the context as `numbers` object, it doesn't have influence here.  

The invocation result of `numbers.sum()` is `NaN` (or an error is thrown `TypeError: Cannot read property 'numberA' of undefined` in strict mode). Definitely not the expected result `5 + 10 = 15`. All because `calculate()` is not invoked correctly.  

👍To solve the problem, `calculate()` function must execute with the same context as the `sum()` method, to access `numberA` and `numberB` properties.  

One solution is to change manually the context of `calculate()` to the desired one by calling `calculate.call(this)` (an indirect invocation of a function, see section [5.](#5indirectinvocation)):

```javascript{13}
const numbers = {
  numberA: 5,
  numberB: 10,
  sum: function() {
    console.log(this === numbers); // => true

    function calculate() {
      console.log(this === numbers); // => true
      return this.numberA + this.numberB;
    }

    // use .call() method to modify the context
    return calculate.call(this);
  }
};
numbers.sum(); // => 15
```

`calculate.call(this)` executes `calculate()` function as usual, but additionally modifies the context to a value specified as the first parameter.  
Now `this.numberA + this.numberB` is equivalent to `numbers.numberA + numbers.numberB`. The function returns the expected result `5 + 10 = 15`. 

Another solution, slightly better, is to use an arrow function: 

```javascript{7-10}
const numbers = {
  numberA: 5,
  numberB: 10,
  sum: function() {
    console.log(this === numbers); // => true

    const calculate = () => {
      console.log(this === numbers); // => true
      return this.numberA + this.numberB;
    }

    return calculate();
  }
};

numbers.sum(); // => 15
```

The arrow function binds `this` lexically, or simpler just uses `this` value of `sum()` method.  

## 3. Method invocation

A **method** is a function stored in a property of an object. For example:

```javascript
const myObject = {
  // helloFunction is a method
  helloFunction: function() {
    return 'Hello World!';
  }
};
const message = myObject.helloFunction();
```

`helloFunction` is a method of `myObject`. Use a property accessor `myObject.helloFunction` to access the method.  

**Method invocation** is performed when an expression in a form of [property accessor](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Property_accessors) that evaluates to a function object is followed by an open parenthesis `(`, a comma separated list of arguments expressions and a close parenthesis `)`. 
 
Recalling the previous example, `myObject.helloFunction()` is a method invocation of `helloFunction` on the object `myObject`. 

More examples of method calls are: `[1, 2].join(',')` or `/\s/.test('beautiful world')`.

It is important to distinguish **function invocation** (see section [2.](#2-function-invocation)) from **method invocation**. The main difference is that method invocation requires a property accessor form to call the function (`obj.myFunc()` or `obj['myFunc']()`), while function invocation does not (`myFunc()`).

```javascript
const words = ['Hello', 'World'];

words.join(', '); // method invocation
const obj = {
  myMethod() {
    return new Date().toString();
  }
};
obj.myFunction(); // method invocation

const func = obj.myMethod;
func();              // function invocation
parseFloat('16.60'); // function invocation
isNaN(0);            // function invocation
```

Understanding the difference between function invocation and method invocation helps in identifying the context.

### 3.1. this in a method invocation

> `this` is the **object that owns the method** in a method invocation

When invoking a method on an object, `this` is the object that owns the method.  

![this in JavaScript method invocation](./images/4-1.png)

Let's create an object with a method that increments a number:

```javascript{4}
const calc = {
  num: 0,
  increment() {
    console.log(this === calc); // => true
    this.num += 1;
    return this.num;
  }
};

// method invocation. this is calc
calc.increment(); // => 1
calc.increment(); // => 2
```

Calling `calc.increment()` makes the context of `increment` function to be `calc` object. So using `this.num` to increment the number property works well.  

Let's follow another case. A JavaScript object inherits a method from its `prototype`. When the inherited method is invoked on the object, the context of the invocation is still the object itself:

```javascript{3}
const myDog = Object.create({
  sayName() {
    console.log(this === myDog); // => true
    return this.name;
  }
});

myDog.name = 'Milo';
// method invocation. this is myDog
myDog.sayName(); // => 'Milo'
```

[`Object.create()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create) creates a new object `myDog` and sets its prototype from the first argument. `myDog` object inherits `sayName` method.

When `myDog.sayName()` is executed, `myDog` is the context of invocation.

In ECMAScript 2015 [`class`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Classes) syntax, the method invocation context is also the instance itself:

```javascript{7}
class Planet {
  constructor(name) {
    this.name = name;
  }

  getName() {
    console.log(this === earth); // => true
    return this.name;
  }
}

const earth = new Planet('Earth');
// method invocation. the context is earth
earth.getName(); // => 'Earth'
```

### 3.2. Pitfall: separating method from its object

⚠️ A method can be extracted from an object into a separated variable `const alone = myObj.myMethod`. When the method is called alone `alone()`, detached from the original object, you might think that `this` is the object `myObject` on which the method was defined.  

👍 Correctly if the method is called without an object, then a function invocation happens, where `this` is the global object `window` or `undefined` in strict mode (see [2.1](#21-this-in-function-invocation) and [2.2](#22-this-in-function-invocation-strict-mode)). 

A bound function `const alone = myObj.myMethod.bind(myObj)` (using [`.bind()`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_objects/Function/bind), see [6.](#6-bound-function)) fixes the context by binding `this` the object that owns the method.  

The following example defines `Pet` constructor and makes an instance of it: `myCat`. Then `setTimout()` after 1 second logs `myCat` object information:

```javascript{6}
function Pet(type, legs) {
  this.type = type;
  this.legs = legs;

  this.logInfo = function() {
    console.log(this === myCat); // => false
    console.log(`The ${this.type} has ${this.legs} legs`);
  }
}

const myCat = new Pet('Cat', 4);
// logs "The undefined has undefined legs"
// or throws a TypeError in strict mode
setTimeout(myCat.logInfo, 1000);
```

⚠️ You might think that `setTimeout(myCat.logInfo, 1000)` will call the `myCat.logInfo()`, which should log the information about `myCat` object.

Unfortunately the method is separated from its object when passed as a parameter: `setTimout(myCat.logInfo)`. The following cases are equivalent:

```javascript
setTimout(myCat.logInfo);
// is equivalent to:
const extractedLogInfo = myCat.logInfo;
setTimout(extractedLogInfo);
```

When the separated `logInfo` is invoked as a function, `this` is global object or `undefined` in strict mode (but **not** `myCat` object). So the object information does not log correctly.

👍 A function bounds with an object using [`.bind()`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_objects/Function/bind) method (see [6.](#6-bound-function)). If the separated method is bound with `myCat` object, the context problem is solved:

```javascript{6,14}
function Pet(type, legs) {
  this.type = type;
  this.legs = legs;

  this.logInfo = function() {
    console.log(this === myCat); // => true
    console.log(`The ${this.type} has ${this.legs} legs`);
  };
}

const myCat = new Pet('Cat', 4);

// Create a bound function
const boundLogInfo = myCat.logInfo.bind(myCat);
// logs "The Cat has 4 legs"
setTimeout(boundLogInfo, 1000);
```

`myCat.logInfo.bind(myCat)` returns a new function that executes exactly like `logInfo`, but has `this` as `myCat`, even in a function invocation.  

An alternative solution is to define `logInfo()` method as an arrow function, which binds `this` lexically:

```javascript{5-8}
function Pet(type, legs) {
  this.type = type;
  this.legs = legs;

  this.logInfo = () => {
    console.log(this === myCat); // => true
    console.log(`The ${this.type} has ${this.legs} legs`);
  };
}

const myCat = new Pet('Cat', 4);
// logs "The Cat has 4 legs"
setTimeout(myCat.logInfo, 1000);
```

## 4. Constructor invocation

**Constructor invocation** is performed when [`new`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/new) keyword is followed by an expression that evaluates to a function object, an open parenthesis `(`, a comma separated list of arguments expressions and a close parenthesis `)`.  

Examples of construction invocation: `new Pet('cat', 4)`, `new RegExp('\\d')`.

This example declares a function `Country`, then invokes it as a constructor:

```javascript{11,13}
function Country(name, traveled) {
  this.name = name ? name : 'United Kingdom';
  this.traveled = Boolean(traveled); // transform to a boolean
}

Country.prototype.travel = function() {
  this.traveled = true;
};

// Constructor invocation
const france = new Country('France', false);
// Constructor invocation
const unitedKingdom = new Country;

france.travel(); // Travel to France
```

`new Country('France', false)` is a constructor invocation of the `Country` function. This call creates a new object, which `name` property is `'France'`.

If the constructor is called without arguments, then the parenthesis pair can be omitted: `new Country`.

Starting ECMAScript 2015, JavaScript allows to define constructors using [`class`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Classes) syntax:

```javascript{13}
class City {
  constructor(name, traveled) {
    this.name = name;
    this.traveled = false;
  }

  travel() {
    this.traveled = true;
  }
}

// Constructor invocation
const paris = new City('Paris', false);
paris.travel();
```

`new City('Paris')` is a constructor invocation. The object initialization is handled by a special method in the class: [`constructor`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/constructor), which has `this` as the newly created object.

A constructor call creates an empty new object, which inherits properties from the constructor's prototype. The role of the constructor function is to initialize the object.
As you might know already, the context in this type of call is the created instance.  

When a property accessor `myObject.myFunction` is preceded by `new` keyword, JavaScript performs a **constructor invocation**, but **not** a **method invocation**.

For example `new myObject.myFunction()`: the function is first extracted using a property accessor `extractedFunction = myObject.myFunction`, then invoked as a constructor to create a new object: `new extractedFunction()`.

### 4.1. this in a constructor invocation

> `this` is the **newly created object** in a constructor invocation

The context of a constructor invocation is the newly created object. The constructor initializes the object with data that comes from constructor arguments, sets up initial values for properties, attaches event handlers, etc.

![this in JavaScript constructor invocation](./images/5-1.png)

Let's check the context in the following example:

```javascript{2}
function Foo () {
  console.log(this === fooInstance); // => true
  this.property = 'Default Value';
}

// Constructor invocation
const fooInstance = new Foo();
fooInstance.property; // => 'Default Value'
```

`new Foo()` is making a constructor call where the context is `fooInstance`. Inside `Foo` the object is initialized: `this.property` is assigned with a default value.

The same scenario happens when using [`class`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes) syntax (available in ES2015), only the initialization happens in the `constructor` method:

```javascript{3}
class Bar {
  constructor() {
    console.log(this === barInstance); // => true
    this.property = 'Default Value';
  }
}

// Constructor invocation
const barInstance = new Bar();
barInstance.property; // => 'Default Value'
```

At the time when `new Bar()` is executed, JavaScript creates an empty object and makes it the context of the `constructor()` method. Now you can add properties to object using `this` keyword: `this.property = 'Default Value'`.

### 4.2. Pitfall: forgetting about new

Some JavaScript functions create instances not only when invoked as constructors, but also when invoked as functions. For example `RegExp`:

```javascript{1,2}
const reg1 = new RegExp('\\w+');
const reg2 = RegExp('\\w+');

reg1 instanceof RegExp; // => true
reg2 instanceof RegExp; // => true
reg1.source === reg2.source; // => true
```

When executing `new RegExp('\\w+')` and `RegExp('\\w+')`, JavaScript creates equivalent regular expression objects.

⚠️ Using a function invocation to create objects is a potential problem (excluding [factory pattern](http://javascript.info/tutorial/factory-constructor-pattern)), because some constructors may omit the logic to initialize the object when `new` keyword is missing.

The following example illustrates the problem:

```javascript
function Vehicle(type, wheelsCount) {
  this.type = type;
  this.wheelsCount = wheelsCount;
  return this;
}

// Function invocation
const car = Vehicle('Car', 4);
car.type; // => 'Car'
car.wheelsCount // => 4
car === window // => true
```

`Vehicle` is a function that sets `type` and `wheelsCount` properties on the context object. 
When executing `Vehicle('Car', 4)` an object `car` is returned, which has the correct properties: `car.type` is `'Car'` and `car.wheelsCount` is `4`. You might think it works well for creating and initializing new objects.  

However `this` is `window` object in a function invocation (see [2.1.](#21-this-in-function-invocation)), thus `Vehicle('Car', 4)` sets properties on the `window` object. This is a mistake. A new object is not created.  

👍 Make sure to use `new` operator in cases when a constructor call is expected:

```javascript
function Vehicle(type, wheelsCount) {
  if (!(this instanceof Vehicle)) {
    throw Error('Error: Incorrect invocation');
  }

  this.type = type;
  this.wheelsCount = wheelsCount;
  return this;
}

// Constructor invocation
const car = new Vehicle('Car', 4);
car.type               // => 'Car'
car.wheelsCount        // => 4
car instanceof Vehicle // => true

// Function invocation. Throws an error.
const brokenCar = Vehicle('Broken Car', 3);
```

`new Vehicle('Car', 4)` works well: a new object is created and initialized because `new` keyword is present in the constructor invocation. 

A verification is added in the constructor function: `this instanceof Vehicle`, to make sure that execution context is a correct object type. If `this` is not a `Vehicle` type, then an error is thrown. Whenever `Vehicle('Broken Car', 3)` is executed without `new` an exception is thrown: `Error: Incorrect invocation`.  

## 5. Indirect invocation

**Indirect invocation** is performed when a function is called using `myFun.call()` or `myFun.apply()` methods.

Functions in JavaScript are first-class objects, which means that a function is an object. The type of this object is [`Function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function).  

From the [list of methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function#Methods) that a function object has, [`.call()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call) and [`.apply()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply) are used to invoke the function with a configurable context:  

* The method `.call(thisArg[, arg1[, arg2[, ...]]])` accepts the first argument `thisArg` as the context of the invocation and a list of arguments `arg1, arg2, ...` that are passed as arguments to the called function.

* The method `.apply(thisArg, [arg1, arg2, ...])` accepts the first argument `thisArg` as the context of the invocation and an [array-like object](http://www.2ality.com/2013/05/quirk-array-like-objects.html) of values `[arg1, arg2, ...]` that are passed as arguments to the called function.

The following example demonstrates the indirect invocation:

```javascript{5,6}
function increment(number) {
  return ++number;
}

increment.call(undefined, 10); // => 11
increment.apply(undefined, [10]); // => 11
```

`increment.call()` and `increment.apply()` both invoke the increment function with `10` argument.

The main difference between the two is that `.call()` accepts a list of arguments, for example `myFun.call(thisValue, 'val1', 'val2')`. But `.apply()` accepts a list of values in an array-like object, e.g. `myFunc.apply(thisValue, ['val1', 'val2'])`.

### 5.1. this in an indirect invocation

> `this` is the **first argument** of `.call()` or `.apply()` in an indirect invocation

`this` in indirect invocation is the value passed as first argument to `.call()` or `.apply()`.

![this in JavaScript indirect invocation](./images/6-1.png)

The following example shows the indirect invocation context:

```javascript{4}
const rabbit = { name: 'White Rabbit' };

function concatName(string) {
  console.log(this === rabbit); // => true
  return string + this.name;
}

// Indirect invocations
concatName.call(rabbit, 'Hello ');  // => 'Hello White Rabbit'
concatName.apply(rabbit, ['Bye ']); // => 'Bye White Rabbit'
```

The indirect invocation is useful when a function should be executed with a specific context. For example, to solve the context problems with function invocation, where `this` is always `window` or `undefined` in strict mode (see [2.3.](#23pitfallthisinaninnerfunction)). It can be used to simulate a method call on an object (see the previous code sample).

Another practical example is creating hierarchies of classes in ES5 to call the parent constructor:

```javascript{9}
function Runner(name) {
  console.log(this instanceof Rabbit); // => true
  this.name = name;
}

function Rabbit(name, countLegs) {
  console.log(this instanceof Rabbit); // => true
  // Indirect invocation. Call parent constructor.
  Runner.call(this, name);
  this.countLegs = countLegs;
}

const myRabbit = new Rabbit('White Rabbit', 4);
myRabbit; // { name: 'White Rabbit', countLegs: 4 }
```

`Runner.call(this, name)` inside `Rabbit` makes an indirect call of the parent function to initialize the object.

## 6. Bound function

**A bound function** is a function whose context and/or arguments are bound to specific values. You create a bound function using [`.bind()`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_objects/Function/bind) method. The original and bound functions share the same code and scope, but different contexts on execution.

The method `myFunc.bind(thisArg[, arg1[, arg2[, ...]]])` accepts the first argument `thisArg` as the context of the bound function on invocation and an optional list of arguments `arg1, arg2, ...` that are passed as arguments to the called function. It returns a new function bound with `thisArg`.

The following code creates a bound function and later invokes it:

```javascript{7}
function multiply(number) {
  'use strict';
  return this * number;
}

// create a bound function with context
const double = multiply.bind(2);
// invoke the bound function
double(3); // => 6
double(10); // => 20
```

`multiply.bind(2)` returns a new function object `double`, which is bound with number `2`. `multiply` and `double` have the same code and scope.

Contrary to `.apply()` and `.call()` methods (see [5.](#5-indirect-invocation)), which invoke the function right away, the `.bind()` method only returns a new function supposed to be invoked later with a pre-defined `this` value.  

### 6.1. this inside a bound function

> `this` is the **first argument** of `.bind()` when invoking a bound function

The role of `.bind()` is to create a new function, which invocation will have the context as the first argument passed to `.bind()`. It is a powerful technique that allows creating functions with a predefined `this` value.

![this in JavaScript bound function invocation](./images/7-1.png)

Let's see how to configure `this` of a bound function:

```javascript
const numbers = {
  array: [3, 5, 10],

  getNumbers() {
    return this.array;
  }
};

// Create a bound function
const boundGetNumbers = numbers.getNumbers.bind(numbers);
boundGetNumbers(); // => [3, 5, 10]

// Extract method from object
const simpleGetNumbers = numbers.getNumbers;
simpleGetNumbers(); // => undefined or throws an error in strict mode
```

`numbers.getNumbers.bind(numbers)` returns a function `boundGetNumbers` that is bound with `numbers` object. Then `boundGetNumbers()` is invoked with `this` as `numbers` and returns the correct array object.  

The function `numbers.getNumbers` can be extracted into a variable `simpleGetNumbers` without binding. On later function invocation `simpleGetNumbers()` has `this` as `window` or `undefined` in strict mode, but not `numbers` object (see [3.2. Pitfall](#32-pitfall-separating-method-from-its-object)). In this case `simpleGetNumbers()` will not return correctly the array.

### 6.2. Tight context binding

`.bind()` makes a **permanent context link** and will always keep it. A bound function cannot change its linked context when using `.call()` or `.apply()` with a different context or even a rebound doesn't have any effect.

Only the constructor invocation of a bound function can change an already bound context, but this is not something you would normally do (constructor invocation must use *regular*, non-bound functions).  

The following example creates a bound function, then tries to change its already pre-defined context:

```javascript
function getThis() {
  'use strict';
  return this;
}

const one = getThis.bind(1);

one();         // => 1

one.call(2);   // => 1
one.apply(2);  // => 1
one.bind(2)(); // => 1

new one();     // => Object
```

Only `new one()` changes the context of the bound function. Other types of invocation always have `this` equal to `1`.

## 7. Arrow function

**Arrow function** is designed to declare the function in a shorter form and [lexically](https://en.wikipedia.org/wiki/Scope_(computer_science)#Lexical_scoping) bind the context.

It can used the following way:

```javascript{1-3}
const hello = (name) => {
  return 'Hello ' + name;
};

hello('World'); // => 'Hello World'
// Keep only even numbers
[1, 2, 5, 6].filter(item => item % 2 === 0); // => [2, 6]
```

Arrow functions have a light syntax, don't have the verbose keyword `function`. When the arrow function has only 1 statement, you could even omit the `return` keyword.  

An arrow function is [anonymous](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/name). This way it doesn't have a lexical function name (which would be useful for recursion, detaching event handlers).  

Also it doesn't provide the [`arguments`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments) object, opposed to a regular function. The missing `arguments` is fixed using ES2015 [rest parameters](/how-three-dots-changed-javascript/#21-rest-parameter):  

```javascript{1}
const sumArguments = (...args) => {
  console.log(typeof arguments); // => 'undefined'
  return args.reduce((result, item) => result + item);
};

sumArguments.name      // => ''
sumArguments(5, 5, 6); // => 16
```

### 7.1. this in arrow function

> `this` is the **enclosing context** where the arrow function is defined

The arrow function doesn't create its own execution context but takes `this` from the outer function where it is defined. In other words, the arrow function bind `this` lexically. 

![this in JavaScript arrow function invocation](./images/8-1.png)

The following example shows the context transparency property:

```javascript{12}
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  log() {
    console.log(this === myPoint); // => true
    setTimeout(() => {
      console.log(this === myPoint);      // => true
      console.log(this.x + ':' + this.y); // => '95:165'
    }, 1000);
  }
}
const myPoint = new Point(95, 165);
myPoint.log();
```

`setTimeout()` calls the arrow function with the same context (`myPoint` object) as the `log()` method. As seen, the arrow function "inherits" the context from the function where it is defined. 

A regular function in this example would create its own context (`window` or `undefined` in strict mode). So to make the same code work correctly with a function expression it's necessary to manually bind the context: `setTimeout(function() {...}.bind(this))`. This is verbose, and using an arrow function is a cleaner and shorter solution.

If the arrow function is defined in the topmost scope (outside any function), the context is always the global object (`window` in a browser):

```javascript{2}
const getContext = () => {
 console.log(this === window); // => true
 return this;
};

console.log(getContext() === window); // => true
```

An arrow function is bound with the lexical context **once and forever**. `this` cannot be modified even when using the context modification methods:

```javascript
const numbers = [1, 2];

(function() { 
  const get = () => {
    console.log(this === numbers); // => true
    return this;
  };
  
  console.log(this === numbers); // => true
  get(); // => [1, 2]
  
  // Try to change arrow function context manually
  get.call([0]);  // => [1, 2]
  get.apply([0]); // => [1, 2]
  
  get.bind([0])(); // => [1, 2]
}).call(numbers);
```

No matter how the arrow function `get()` is called, it always keeps the lexical context `numbers`. Indirect call with other context `get.call([0])` or `. get.apply([0])`, rebinding `get.bind([0])()` have no effect.

An arrow function cannot be used as a constructor. Invoking it as a constructor `new get()` throws an error: `TypeError: get is not a constructor`.

### 7.2. Pitfall: defining method with an arrow function

⚠️ You might want to use arrow functions to declare methods on an object. Fair enough: their declaration is quite short comparing to a [function expression](https://developer.mozilla.org/en/docs/web/JavaScript/Reference/Operators/function): `(param) => {...}` instead of `function(param) {..}`.  

This example defines a method `format()` on a class `Period` using an arrow function:

```javascript{7,12}
function Period (hours, minutes) { 
  this.hours = hours;
  this.minutes = minutes;
}

Period.prototype.format = () => {
  console.log(this === window); // => true
  return this.hours + ' hours and ' + this.minutes + ' minutes';
};

const walkPeriod = new Period(2, 30);
walkPeriod.format(); // => 'undefined hours and undefined minutes'
```

Since `format` is an arrow function and is defined in the global context (topmost scope), it has `this` as `window` object. 

Even if `format` is executed as a method on an object `walkPeriod.format()`, `window` is kept as the context of invocation. It happens because the arrow function has a static context that doesn't change on different invocation types.  

The method returns `'undefined hours and undefined minutes'`, which is not the expected result.

👍 The function expression solves the problem because a regular function *does change its context* depending on invocation:

```javascript{7,12}
function Period (hours, minutes) {
  this.hours = hours;
  this.minutes = minutes;
}

Period.prototype.format = function() {
  console.log(this === walkPeriod); // => true
  return this.hours + ' hours and ' + this.minutes + ' minutes';
};

const walkPeriod = new Period(2, 30);
walkPeriod.format(); // => '2 hours and 30 minutes'
```

`walkPeriod.format()` is a method invocation on an object (see [3.1.](#31-this-in-method-invocation)) with the context `walkPeriod` object. `this.hours` evaluates to `2` and `this.minutes` to `30`, so the method returns the correct result: `'2 hours and 30 minutes'`.

## 8. Conclusion

Because the function invocation has the biggest impact on `this`, from now on **do not** ask yourself:

> Where is `this` taken from?

but **do** ask yourself:

> How is the `function invoked`?

For an arrow function ask yourself:

> What is `this` where the arrow function is `defined`?

This mindset is correct when dealing with `this` and will save you from the headache.

*If you have an interesting example of context pitfall or just experience difficulties with a case, write a comment below and let's discuss!*
