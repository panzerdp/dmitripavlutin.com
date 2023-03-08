---
title: "What's a Method in JavaScript?"
description: "A method is a function that belongs to an object and executed with that object as a context."
published: "2021-02-02T10:30Z"
modified: "2021-02-02T10:30Z"
thumbnail: "./images/cover-2.png"
slug: javascript-method
tags: ['javascript', 'function', 'method']
recommended: ['6-ways-to-declare-javascript-functions', 'javascript-arrow-functions']
type: post
---

## 1. What is a method

Let's define and call a regular function:

```javascript
function greet(who) {
  return `Hello, ${who}!`;
}

greet('World'); // => 'Hello, World!'
```

The `function` keyword followed by its name, params, and body: `function greet(who) {...}` makes a *regular function definition*.  

`greet('World')` is the *regular function invocation*. The function `greet('World')` accepts data from the argument. 

<Affiliate type="traversyJavaScript" />

What if `who` is a property of an object? To easily access the properties of an object you can attach the function to that object, in other words, create a method.  

Let's make `greet()` a method on the object `world`:

```javascript{3-5}
const world = {
  who: 'World',

  greet() {
    return `Hello, ${this.who}!`;
  }
}

world.greet(); // => 'Hello, World!'
```

`greet() { ... }` is now a *method* that belongs to the `world` object. `world.greet()` is a *method invocation*.  

Inside of the `greet()` method `this` points to the object the method belongs to &mdash; `world`. That's why `this.who` expression accesses the property `who`.  

Note that `this` is also named *context*.  

### The context is optional

While in the previous example I've used `this` to access the object the method belongs to &mdash; JavaScript, however, doesn't impose a method to use `this`.  

For this reason you can use an object as a namespace of methods:

```javascript
const namespace = {
  greet(who) {
    return `Hello, ${who}!`;
  },

  farewell(who) {
    return `Good bye, ${who}!`;
  }
}

namespace.greet('World');    // => 'Hello, World!'
namespace.farewell('World'); // => 'Good bye, World!'
```

`namespace` is an object that holds 2 methods: `namespace.greet()` and `namespace.farewell()`. 

The methods do not use `this`, and `namespace` serves as a holder of alike methods.  

## 2. Object literal method

As seen in the previous chapter, you can define a method directly in an object literal:

```javascript{3-5}
const world = {
  who: 'World',

  greet() {
    return `Hello, ${this.who}!`;
  }
};

world.greet(); // => 'Hello, World!'
```

`greet() { .... }` is a method defined on an object literal. Such type of definition is named *shorthand method definition* (available starting ES2015).  

There's also a longer syntax of methods definition:

```javascript{3-5}
const world = {
  who: 'World',

  greet: function() {
    return `Hello, ${this.who}!`;
  }
}

world.greet(); // => 'Hello, World!'
```

`greet: function() { ... }` is a *method definition*. Note the additional presence of a colon and `function` keyword.  

### Adding methods dynamically

The method is just a function that is stored as a property on the object. That's why you can add methods dynamically to an object:

```javascript
const world = {
  who: 'World',

  greet() {
    return `Hello, ${this.who}!`;
  }
};

// A a new property holding a function
world.farewell = function () {
  return `Good bye, ${this.who}!`;
}

world.farewell(); // => 'Good bye, World!'
```

`world` object at first doesn't have a method `farewell`. It is added dynamically.  

The dynamically added method can be invoked as a method without problems: `world.farewell()`.  

## 3. Class method

In JavaScript, the `class` syntax defines a class that's going to serve as a template for its instances.  

A class can also have methods:

```javascript {6-9}
class Greeter {
  constructor(who) {
    this.who = who;
  }

  greet() {
    console.log(this === myGreeter); // logs true
    return `Hello, ${this.who}!`;
  }
}

const myGreeter = new Greeter('World');
myGreeter.greet(); // => 'Hello, World!' 
```

`greet() { ... }` is a method defined inside a class.  

Every time you create an instance of the class using `new` operator (e.g. `myGreeter = new Greeter('World')`), methods are available for invocation on the created instance.    

`myGreeter.greet()` is how you invoke the method `greet()` on the instance. What's important is that `this` inside of the method equals the instance itself: `this` equals `myGreeter` inside `greet() { ... }` method.   

## 4. How to invoke a method

### 4.1 Method invocation

What's particularly interesting about JavaScript is that defining a method on an object or class is half of the job. To maintain the method the context, you have to make sure to *invoke the method as a... method*.   

Let me show you why it's important.  

Recall the `world` object having the method `greet()` upon it. Let's check what value has `this` when `greet()` is invoked as a method and as a regular function:

```javascript{4,10,14}
const world = {
  who: 'World',

  greet() {
    console.log(this === world);
    return `Hello, ${this.who}!`;
  }
};

// Method invocation
world.greet(); // logs true

const greetFunc = world.greet;
// Regular function invocation
greetFunc(); // => logs false
```

`world.greet()` is a method invocation. The object `world`, followed by a dot `.`, and finally the method itself &mdash; that's what makes the *method invocation*.  

`greetFunc` is the same function as `world.greet`. But when invoked as *regular function* `greetFunc()`, `this` inside `greet()` isn't equal to the `world` object, but rather to the global object (in a browser this is `window`).   

I name expressions like `greetFunc = world.greet` *separating a method from its object*. When later invoking the separated method `greetFunc()` would make `this` equal to the global object.  

Separating a method from its object can take different forms:

```jsx
// Method is separated! this is lost!
const myMethodFunc = myObject.myMethod;

// Method is separated! this is lost!
setTimeout(myObject.myMethod, 1000);

// Method is separated! this is lost!
myButton.addEventListener('click', myObject.myMethod)

// Method is separated! this is lost!
<button onClick={myObject.myMethod}>My React Button</button>
```

To avoid loosing the context of the method, make sure to use the method invocation `world.greet()` or [bind the method manually to the object](#33-bound-function-invocation) `greetFunc = world.greet.bind(this)`.  

### 4.2 Indirect function invocation

As stated in the previous section, a regular function invocation has `this` resolved as the global object. Is there a way for a regular function to have a customizable value of `this`?  

Welcome the indirect function invocation, which can be performed using:

```javascript
myFunc.call(thisArg, arg1, arg2, ..., argN);
myFunc.apply(thisArg, [arg1, arg2, ..., argN]);
```
 
methods available on the function object. 

The first argument of `myFunc.call(thisArg)` and `myFunc.apply(thisArg)` is the context (the value of `this`) of the indirect invocation. In other words, you can manually indicate what value `this` is going to have inside the function.  

For example, let's define `greet()` as a regular function, and an object `aliens` having a `who` property:

```javascript
function greet() {
  return `Hello, ${this.who}!`;
}

const aliens = {
  who: 'Aliens'
};

greet.call(aliens); // => 'Hello, Aliens!'
greet.apply(aliens); // => 'Hello, Aliens!'
```

`greet.call(aliens)` and `greet.apply(aliens)` are both indirect method invocations. `this` value inside the `greet()` function equals `aliens` object.  

The indirect invocation lets you emulate the method invocation on an object!

### 4.3 Bound function invocation

Finally, here's the third way how you can make a function be invoked as a method on an object. Specifically, you can bound a function to have a specific context.  

You can create a bound function using a special method:

```javascript
const myBoundFunc = myFunc.bind(thisArg, arg1, arg2, ..., argN);
```

The first argument of `myFunc.bind(thisArg)` is the context to which the function is going to be bound to. 

For example, let's reuse the `greet()` and bind it to `aliens` context:

```javascript
function greet() {
  return `Hello, ${this.who}!`;
}

const aliens = {
  who: 'Aliens'
};

const greetAliens = greet.bind(aliens);

greetAliens(); // => 'Hello, Aliens!'
```

Calling `greet.bind(aliens)` creates a new function where `this` is bound to `aliens` object.  

Later, when invoking the bound function `greetAliens()`, `this` equals `aliens` inside that function.  

Again, using a bound function you can emulate the method invocation.  

## 5. Arrow functions as methods

Using an arrow function as a method isn't recommended, and here's why.  

Let's define the `greet()` method as an arrow function:

```javascript
const world = {
  who: 'World',

  greet: () => {
    return `Hello, ${this.who}!`;
  }
};

world.greet(); // => 'Hello, undefined!'
```

Unfortunately, `world.greet()` returns `'Hello, undefined!'` instead of the expected `'Hello, World!'`.

The problem is that the value `this` inside of the arrow function [equals](/javascript-arrow-functions/#2-this-value) `this` of the outer scope. Always. But what you want is `this` to equal `world` object.  

That's why `this` inside of the arrow function equals the global object: `window` in a browser. `'Hello, ${this.who}!'` evaluates as ``Hello, ${windows.who}!``, which in the end is `'Hello, undefined!'`.  

I like the arrow functions. But they don't work as methods.  

## 6. Summary

The method is a function belonging to an object. The context of a method (`this` value) equals the object the method belongs to.  

You can also define methods on classes. `this` inside of a method of a class equals to the instance.  

What's specific to JavaScript is that it is not enough to define a method. You also need to make sure to use a method invocation. Typically, the method invocation has the following syntax:

```javascript
// Method invocation
myObject.myMethod('Arg 1', 'Arg 2');
```

Interestingly is that in JavaScript you can define a regular function, not belonging to an object, but then invoke that function as a method on an arbitrar object. You can do so using an indirect function invocation or bind a function to a particular context:  

```javascript
// Indirect function invocation
myRegularFunc.call(myObject, 'Arg 1', 'Arg 2');
myRegularFunc.apply(myObject, 'Arg 1', 'Arg 2');

// Bound function
const myBoundFunc = myRegularFunc.bind(myObject);
myBoundFunc('Arg 1', 'Arg 2');
```

Indirect invocation and bounding emulate the method invocation.  

To read about all ways you can define functions in JavaScript follow my post [6 Ways to Declare JavaScript Functions](/6-ways-to-declare-javascript-functions/).  

Confused about how `this` works in JavaScript? Then I recommend reading my extensive guide [Gentle Explanation of "this" in JavaScript
](/gentle-explanation-of-this-in-javascript/).  

*Quizzzzz: can a method in JavaScript be an asynchronous function?*