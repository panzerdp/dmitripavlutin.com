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



### 2.2 Class method

### 2.3 Class arrow method

### 2.4 Adding a method dynamically

## 3. The 2 types of method invocation

### 3.1 Regular method invocation

### 3.2 Indirect method invocation

### 3.3 Bound method invocation

## 4. Summary