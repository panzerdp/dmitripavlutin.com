---
title: How to Handle Easily 'this' in JavaScript
description: How to handle easily 'this' value in JavaScript using an additional variable, arrow functions, manual binding, or fat arrow methods.
published: "2019-09-11T13:00Z"
modified: "2019-09-11T14:44Z"
thumbnail: "./images/birds.jpg"
slug: fix-this-in-javascript
tags: ["javascript", "this"]
type: post
---

I like in JavaScript the possibility to change the function execution context, also known as `this`.   

For example, you can use array methods on array-like objects:

```javascript
const reduce = Array.prototype.reduce;

function sumArgs() {
  return reduce.call(arguments, (sum, value) => {
    return sum += value;
  });
}

sumArgs(1, 2, 3); // => 6
```

The other side of the coin is that `this` keyword is difficult to grasp. 

Often you might find yourself searching why `this` has an incorrect value. The following sections will teach you easy ways how to bind `this` to the desired value.  

Before starting, I'll need a helper function `execute(func)`. It simply executes the function supplied as an argument:   

```javascript
function execute(func) {
  return func();
}

execute(function() { return 10 }); // => 10
```

Now, let's continue with understanding the essence of mistakes around `this`: method separation.  

<Affiliate />

## 1. Method separation problem

A class `Person` contains the fields `firstName` and `lastName`. Plus, it has a method `getFullName()` that returns the full name of the person.  

One possible implementation of `Person` could be:

```javascript mark=6
function Person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;

  this.getFullName = function() {
    this === agent; // => true
    return `${this.firstName} ${this.lastName}`;
  }
}

const agent = new Person('John', 'Smith');
agent.getFullName(); // => 'John Smith'
```

You can see that `Person` function is invoked as a constructor: `new Person('John', 'Smith')`. Inside `Person` function this is the newly created instance.  

`agent.getFullName()` returns the full name of the person: `'John Smith'`. As expected, `this` inside `getFullName()` method equals to `agent`.  

What would happen if `agent.getFullName` method is executed by the helper function:  

```javascript
execute(agent.getFullName); // => 'undefined undefined'
```

The execution result is incorrect: `'undefined undefined'`. That's a problem of `this` having an incorrect value.  

Now inside the method `getFullName()` the value of `this` is the global object (`window` in a browser environment). Having `this` equal to `window`, the evaluation of `` `${window.firstName} ${window.lastName}` `` is `'undefined undefined'`.

It happens because the method was separated from the object when calling `execute(agent.getFullName)`. Basically what happens is just a regular function invocation (not method invocation):  

```javascript
execute(agent.getFullName); // => 'undefined undefined'

// is equivalent to:

const getFullNameSeparated = agent.getFullName;
execute(getFullNameSeparated); // => 'undefined undefined'
```

This effect is what I name *method separated from its object*. When the method is separated, and later executed, it has no connection with its original object.  

To be sure that `this` inside the method points to the right object, you have to:

1) Execute the method in the form of a property accessor: `agent.getFullName()`
2) Or bind `this` statically to the containing object (using arrow functions, `.bind()` method, etc)

The method separation problem, and as a result an incorrect value of `this`, appears in different shapes:

#### When setting callbacks

```javascript
// `this` inside `methodHandler()` is the global object
setTimeout(object.handlerMethod, 1000);
```

#### When setting event handlers

```jsx
// React: `this` inside `methodHandler()` is the global object
<button onClick={object.handlerMethod}>
  Click me
</button>
```

Let's continue with some useful approaches on how to keep `this` pointing to the needed object, even if the method is separated from the object.  

## 2. Close over the context

The simplest way to keep `this` pointing to the class instance is to use an additional variable `self`:

```javascript mark=5,9
function Person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;

  const self = this;

  this.getFullName = function() {
    self === agent; // => true
    return `${self.firstName} ${self.lastName}`;
  }
}

const agent = new Person('John', 'Smith');

agent.getFullName();        // => 'John Smith'
execute(agent.getFullName); // => 'John Smith'
```

 `getFullName()` closes over `self` variable statically, efficiently making a manual binding to `this`.   

Now everything works correctly when calling `execute(agent.getFullName)`, as it returns `'John Smith'`, because `getFullName()` method always has the correct value of `this`.

## 3. Lexical this using arrow function

Is there are a way to bind `this` statically without an additional variable? Yes, this is exactly what the arrow function does.  

Let's refactor `Person` to use an arrow function:

```javascript mark=5
function Person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;

  this.getFullName = () => `${this.firstName} ${this.lastName}`;
}

const agent = new Person('John', 'Smith');

agent.getFullName();        // => 'John Smith'
execute(agent.getFullName); // => 'John Smith'
```

The arrow function binds `this` lexically. In simple words, it uses `this` value from the outer function it is defined within.  

I recommend using arrow functions in all the situations when you need to use the context of the outer function.  

## 4. Bind the context

Now let's take a step forward and refactor `Person` by using an ES2015 class. 

```javascript
class Person {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  getFullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}

const agent = new Person('John', 'Smith');

agent.getFullName();        // => 'John Smith'
execute(agent.getFullName); // => 'undefined undefined'
```

Unfortunately, even with the new class syntax, `execute(agent.getFullName)` still returns `'undefined undefined'`. 

The use of additional variable `self` or arrow functions to fix the value of `this` would not work in case of classes.  

But there's a trick involving [bind()](/gentle-explanation-of-this-in-javascript/#6-bound-function) method that binds the context of the method inside the constructor: 

```javascript mark=6
class Person {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;

    this.getFullName = this.getFullName.bind(this);
  }

  getFullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}

const agent = new Person('John', 'Smith');

agent.getFullName();        // => 'John Smith'
execute(agent.getFullName); // => 'John Smith'
```

`this.getFullName = this.getFullName.bind(this)` inside the constructor binds the method `getFullName()` to the class instance.  

`execute(agent.getFullName)` works as expected, returning `'John Smith'`.

## 5. Fat arrow method

The above method using manual context binding requires boilerplate code. Fortunately, there's still room for improvement. 

You can use the JavaScript [class fields proposal](https://github.com/tc39/proposal-class-fields) that permits to define a fat arrow method:

```javascript mark=7
class Person {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  getFullName = () => {
    return `${this.firstName} ${this.lastName}`;
  }
}

const agent = new Person('John', 'Smith');

agent.getFullName();        // => 'John Smith'
execute(agent.getFullName); // => 'John Smith'
```

The fat arrow method `getFullName = () => { ... }` is bound to the class instance, even if you separate the method from its object.  

This approach is the most efficient and concise to bind `this` in classes.  

## 6. Conclusion

The method separated from its object creates lots of misunderstanding regarding `this`. You should be aware of this effect.  

To bind `this` statically, you can manually use an additional variable `self` that holds the correct context object. However, a better alternative is to use arrow functions, which are by nature designed to bind `this` lexically.

In classes, you can use the `bind()` method to bind manually the class methods inside the constructor. 

If you want to skip writing boilerplate code, the new JavaScript proposal class fields brings the fat arrow method that automatically binds `this` to the class instance.  

*Do you find `this` useful, or rather it should be avoided? Feel free to write a comment below!*