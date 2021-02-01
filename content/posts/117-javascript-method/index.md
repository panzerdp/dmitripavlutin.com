---
title: "What's a Method in JavaScript?"
description: "A method is a function that belongs to an object and executed with that object as a context."
published: "2021-02-02T12:00Z"
modified: "2021-02-02T12:00Z"
thumbnail: "./images/cover-2.png"
slug: javascript-method
tags: ['javascript', 'function', 'method']
recommended: ['6-ways-to-declare-javascript-functions', 'javascript-arrow-functions']
type: post
---

## 1. What is a method

Here's how you can define a regular function in JavaScript:

```javascript
function greet(who) {
  return `Hello, ${who}!`;
}

greet('World'); // => 'Hello, World!'
```

Put the `function` keyword followed by its name, params, and body: `function greet(who) {...}`. That's a *regular function definition*.

`greet('World')` is the *regular function invocation*. The function `greet('World')` accepts data from the argument. 

What if `who` is a property of an object? To easily access the properties of an object, things are easier if you attach the function to that object, in other words, create a method on that object.  

Let's make `greet()` a method on the object `world`:

```javascript{4-6}
const world = {
  who: 'World',

  greet() {
    return `Hello, ${this.who}!`;
  }
}

world.greet(); // => 'Hello, World!'
```

`greet() { ... }` is now a *method* that belongs to the `world` object. `world.greet()` is a *method invocation*: write the object followed by a dot and the method call.   

Inside of the `greet()` method `this` points to the object the method belongs to &mdash; `world`. That's why `this.who` expression access the property `who`.  

Note that `this` is also named *context*.  

### The context is optional

While in the previous example you use `this` to access the object the method belongs to &mdash; JavaScript, however, doesn't impose a method to use the context.  

For this reason you can use an object as a namespace of methods:

```javascript
const namespace = {
  greet(who) {
    return `Hello, ${who}!`;
  }

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

```javascript{4-6}
const world = {
  who: 'World',

  greet() {
    return `Hello, ${this.who}!`;
  }
};

world.greet(); // => 'Hello, World!'
```

`greet() { .... }` is a method defined on an object literal. Such type of definition is named *shorthand method definition* (available starting ES2015).  

There's also a longer syntax of how you can define methods:

```javascript{4-6}
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

The method is just a function that is stored as a property on the object. That's why you can add method dynamically to an object:

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

`world` object at first doesn't have a method `farewell`. It is later added dynamically.  

The dynamically added method can be invoked as a method: `world.farewell()`.  

## 3. Class method

In JavaScript, the `class` syntax defines a class that's going to serve as a template for its instances.  

A class can also have methods:

```javascript{6-8}
class Greeter {
  constructor(who) {
    this.who = who;
  }

  greet() {
    return `Hello, ${this.who}!`;
  }
}

const myGreeter = new Greeter('World');
myGreeter.greet(); // => 'Hello, World!' 
```

`greet() { ... }` is a method defined inside a class.  

Every time you create an instance of the class using `new` operator (e.g. `myGreeter = new Greeter('World')`) the defined method is available on the created instance.  

`myGreeter.greet()` is how you invoke the method `greet()` on the instance. What's important is that `this` inside of the method equals the instance itself.  

## 4. Method invocation

### 3.1 Method invocation

What's particularly interesting about JavaScript is that defining a method on an object or class is half of the job. To maintain inside the method the context, you also have to make sure to *invoke the method as a... method*.  

Let me show you why it's important.  

Recall the `world` object having the method `greet()` upon it. Let's check what value has `this` when `greet()` is invoked as a method and as a regular function:

```javascript{5,11,15}
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

!!!Write about the pitfall of separating method from object. Put link to the corresponding section in this post.

### 3.2 Indirect function invocation

As stated in the previous section, a regular function invocation has `this` resolved as the global object. Is there a way, still, having a function defined as a function, but not a method, but to specify the value of `this`?  

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

`greet.call(aliens)` and `greet.apply(aliens)` are both indirect method invocations. `this` value inside the `greet()` function equal to `aliens` object.  

### 3.3 Bound function invocation

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

## 4. Arrow functions as methods

Using an arrow function as a method isn't recommended, and here's why.  

Let's define the `greet()` as a method, but using the arrow function syntax:

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

The value of `this` inside of the arrow function equals `this` of the outer scope. Always.  

That's why `this` inside of the arrow function equals the global object: `window` in a browser. `'Hello, ${this.who}!'` evaluates as ``Hello, ${windows.who}!``, which in the end is `'Hello, undefined!'`.  

## 5. Summary

The method is a function belonging to an object. The context of a method (`this` value) equals the object the method belongs to.  

You can also define methods on classes. `this` inside of a method of a class equals to the instance.  

What's specific to JavaScript is that it is not enough to define a method. You also need to make sure to use a method invocation. Typically, the method invocation has the following syntax:

```javascript
// Method invocation
myObject.myMethod('Arg 1', 'Arg 2');
```

Interestingly is that in JavaScript you can define a regular function, not belonging to an object, but then invoke that function as a method on an arbitrar object. You can do so using an indirect invocation of the function or bind a function to a particular context:  

```javascript
// Indirect function invocation
myRegularFunc.call(myObject, 'Arg 1', 'Arg 2');
myRegularFunc.apply(myObject, 'Arg 1', 'Arg 2');

// Bound function
const myBoundFunc = myRegularFunc.bind(myObject);
myBoundFunc('Arg 1', 'Arg 2');
```

Indirect invocation and bounding emulate the method invocation.  

Slighly confused on how `this` works in JavaScript? I recommend reading my extensive post [Gentle Explanation of "this" in JavaScript
](/gentle-explanation-of-this-in-javascript/).  

!! Add quizz with setTimeout and methods