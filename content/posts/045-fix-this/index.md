---
title: 5 Ways to Fix 'this' value in JavaScript
description: Approaches on how to fix the value of this keyword in JavaScript.
published: "2019-09-10T13:00Z"
modified: "2019-09-10T13:00Z"
thumbnail: "./images/birds.jpg"
slug: how-to-fixate-this-value-javascript
tags: ["javascript", "this"]
recommended: ["gentle-explanation-of-this-in-javascript", "5-interesting-uses-javascript-destructuring"]
type: post
commentsThreadId: how-to-fix-this-in-javascript
---

I like in JavaScript is the possibility to change dynamically the function execution context, also known as `this`.   

For example, you can execute array methods on array-like objects:

```javascript{5}
const reduce = Array.prototype.reduce;

function sumArgs() {
  return reduce.call(arguments, (sum, value) => {
    this === arguments; // => true
    return sum += value;
  });
}

sumArgs(1, 2, 3); // => 6
```

The other side of the coin is that `this` keyword is sometimes difficult to grasp. In the following sections, I will explain easy ways to fix `this` value.  

Before starting, I'm going to need a helper function `execute(func)`. It simply executes the function supplied as an argument:   

```javascript
function execute(func) {
  return func();
}

execute(function() { return 10 }); // => 10
```

## 1. Method separation

Let's design a class `Person`. It contains the fields `firstName` and `lastName`. Plus, it has a method `getFullName()` that returns the full name of the person.  

One possible implementation of such class in JavaScript could be:

```javascript{6}
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

Calling `agent.getFullName()` returns the full name of the person: `'John Smith'`. As expected, `this` inside `getFullName()` method equals to `agent`.  

What would happen if `agent.getFullName` is executed by the helper function `execute()`:  

```javascript
execute(agent.getFullName); // => 'undefined undefined'
```

The execution result is incorrect: `'undefined undefined'`. Why does it happen?  

Inside the method `getFullName()` the value of `this` is the global object (`window` in a browser environment). Having `this` equal to `window`, the evaluation of `` `${window.firstName} ${window.lastName}` `` is `'undefined undefined'`.

It happens because the method was separated from the execution context when calling `execute(agent.getFullName)`:

```javascript
execute(agent.getFullName); // => 'undefined undefined'

// is equivalent to:

const getFullNameSeparated = agent.getFullName;
execute(getFullNameSeparated); // => 'undefined undefined'
```

This is the the source of the most confusion regarding `this` in JavaScript: *method separation from the original object*.  

When a method is a regular function (with the exception of arrow functions and fat arrow methods), `this` is determined by how the function is invoked (but not how it is defined).  

The method separation problem, and as result an incorrect value of `this`, appears in different shapes.

#### When setting callbacks

```javascript
// `this` inside `methodHandler()` is the global object (`window`)
setTimeout(object.handlerMethod, 1000);
```

#### When setting event handlers

```jsx
// JSX: `this` inside `methodHandler()` is the global object (`window`)
<button onClick={object.handlerMethod}>
  Click me
</button>
```

Let's continue with some useful approaches how to keep `this` pointing to the needed object, even if the method is separated from the object.  

## 2. Close over the context

The simplest way to keep `this` pointing to the object is to use an additional variable `self`:

```javascript{5,9}
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

 `getFullName()` closes over `self` variable statically, efficiently making a manual lexical binding of `this`.   

Now there's no problem when calling `execute(agent.getFullName)`, because `getFullName()` method always has the correct value of `this`.

Again, `execute(agent.getFullName)` returns the correct result because inside the arrow function `this` equals to `agent` object.  

## 3. Lexical this: arrow function

Is there are way to bind `this` statically without an additional variable? Yes, this is exactly what the arrow function does.  

Let's refactor `Person` to use an arrow function:

```javascript{5}
function Person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;

  this.getFullName = () => `${this.firstName} ${this.lastName}`;
}

const agent = new Person('John', 'Smith');

agent.getFullName();        // => 'John Smith'
execute(agent.getFullName); // => 'John Smith'
```

The arrow function binds `this` lexically. In simple words it uses `this` value from the outer function it is defined within.  

## 4. Bind the context

Now let's take a step forward and refactor `Person` and use an ES2015 classes. 

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

`execute(agent.getFullName)` still returns `'undefined undefined'`. 

The additional variables `self` or arrow functions to fix the value of `this` don't work in case of classes.  

Fortunately, there's a trick that involves using `myFunc.bind(thisValue)` to setup the context of the function. 

```javascript{6}
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

The above method of manual binding the context requires boilerplate code. But there's still room for improvement regarding classes. 

You can use the JavaScript class fields proposal that permits to defined a fat arrow method:

```javascript{7}
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

The fat arrow method `getFullName = () => { ... }` always binds to the class instance, even if you separate the method from its object.  

## 6. Conclusion

The method separated from object creates lots of missundesranding regarding `this`.  

To fix the context of the method, you can manually use an additional variable `self` that holds the correct context object. But a better alternative is to use the arrow functions, which are designed to bind `this` lexically.

In classes, you can use the `myFunc.bind(thisArg)` method to bind manually the class methods inside the constructor. Anyways, the new JavaScript proposal class fields brinds the fat arrow method on the table, which are automatically bound to the instance.  

*Does it worth using `this`, regardless of its complexity? Free to write a comment below.*