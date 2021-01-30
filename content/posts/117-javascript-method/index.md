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

In JavaScript here's how you can define a regular function:

```javascript
function greet(who) {
  return `Hello, ${who}!`;
}

greet('World'); // => 'Hello, World!'
```

To *define* the function write the `function` keyword followed by its name, params and body: `function greet(who) {...}`.  

Then, to *invoke* it, write the function name followed by the arguments: `greet('World')`.  

You can see that the function `greet(who)` accepts data about who to greet from the argument. What if the `who` is a property of an object?  

You can access the `who` property from the object inside of a method:

```javascript{4-6}
const world = {
  who: 'World',

  greet() {
    return `Hello, ${this.who}!`;
  }
}

world.greet(); // => 'Hello, World!'
```

`greet() { ... }` is now a *method definition*, because it belongs to the `world` object. 

Inside of the method `this` points to the object the method belongs to &mdash; `world`. That's why `this.who` expression access the property `who`.  

Note that `this` is also named *context*.  

Finally, `world.greet()` is a *method invocation*: write the object followed by a dot and the method call.  

### 1.1 The context is optional

While in the previous method example you use `this` to access the object the method belongs to: JavaScript, however, doesn't impose a method to use the context.  

For this reason you can use an object as a namespace of method:

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

`namespace` is an object that holds 2 method: `namespace.greet()` and `namespace.farewell()`. 

The methods do not use `this` to access any of the object properties.  

## 2. The 3 types of method definition

JavaScript offers a bunch of ways to define methods. The way to define fall into 2 main categories:

* Defining methods on an object literal
* Defining methods in classes

### 2.1 Object literal method

As seen in the previous chapter, you can define a method directly in an object literal:

```javascript{4-6}
const world = {
  who: 'World',

  greet() {
    return `Hello, ${this.who}!`;
  }
}

world.greet(); // => 'Hello, World!'
```

`greet() { .... }` is a method defined on an object literal. Saying it stricter, this type of definition is named *shortand method definition* (available starting ES2015).  

Before ES2015 there was a longer syntax of how you can define methods:

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

### 2.2 Adding a method dynamically


### 2.3 Class method

In JavaScript the `class` syntax allows you to define a class that is going to serve as a template for the created instance.  

A class can also have methods, and you define method on a class using a shortand method definition:

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
instance.greet(); // => 'Hello, World!' 
```

`greet() { ... }` is a method defined inside a class.  

Every time you create an instance of the class using `new` operator (e.g. `new Greeter('World')`) the defined method is available on the instance.  

`instance.greet()` is how you invoke the method `greet()` on the instance. What's important is that `this` inside of the method equals the instance itself.  

## 3. The 3 types of method invocation

What's particularly interesting about JavaScript is that defining a function as a method is half of the job. To maintain inside the method the context, you also have to make sure to invoke the method as a method.  

Let me show you why it's important.  



### 3.1 Regular method invocation

### 3.2 Indirect method invocation

### 3.3 Bound method invocation

## 4. Arrow functions as methods

## 5. Summary