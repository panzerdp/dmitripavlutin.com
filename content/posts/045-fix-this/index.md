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

One thing I like in JavaScript is the possibility to change dynamically the function execution context. For example, you can execute array methods on array-like objects:

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

Unfortunately, such flexibility comes with a price. As result, one of the most confusing aspects of the JavaScript is `this` keyword.  

If you struggle understanding `this`, in this post  I will present several easy ways how to keep `this` under control.  

Before starting, I'm going to need a helper function `execute(func)`. It simply executes the function supplied as an argument:   

```javascript
function execute(func) {
  return func();
}

execute(function() { return 10 }); // => 10
```

In the above example, `execute()` returns the execution result of `function() { return 10 }`, which is `10`. As easy as pie.

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

`agent` is an instance of `Person` class. Calling `agent.getFullName()` returns the full name of the person: `'John Smith'`.  

As expected, `this` inside `getFullName()` method equals to `agent` object.  

What would happen if `agent.getFullName` is executed by the helper function `execute()`:  

```javascript
execute(agent.getFullName);
```



## 2. Close over the context

## 2. Bind the context



## 3. Lexical this: arrow function

## 4. Fat arrow method

## 5. Conclusion

