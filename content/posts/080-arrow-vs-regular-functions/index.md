---
title: "5 Differences Between Arrow and Regular Functions"
description: "5 differences between arrow and regular functions in JavaScript"
published: "2020-05-16T12:00Z"
modified: "2020-05-16T12:00Z"
thumbnail: "./images/cover-2.png"
slug: differences-between-arrow-and-regular-functions
tags: ["javascript", "function", "arrow function"]
recommended: ["when-not-to-use-arrow-functions-in-javascript", "6-ways-to-declare-javascript-functions"]
type: post
commentsThreadId: differences-between-arrow-and-regular-functions
---

In JavaScript you can define functions in many ways.  

The first standard way is by using the `function` keyword:

```javascript
// Function declaration
function greet(who) {
  return `Hello, ${who}!`;
}
```

```javascript
// Function expression
const greet = function(who) {
  return `Hello, ${who}`;
}
```

The function declaration and function expression I'm naming a *regular function*.

The second way, available starting ES2015, is the *arrow function* syntax:

```javascript
const greet = (who) => {
  return `Hello, ${who}!`;
}
```

In this post, I'm going to show the main differences between the regular functions and arrow functions, so you could understand when to choose the right one for your situation.  

## 1. *this* value

### 1.1 Regular function

Inside of a regular JavaScript function, `this` value, aka the execution context, is dynamic.  

The dynamic context means that the value of `this` depends on how the regular function is invoked.  

There are 4 ways you can invoke a regular function in JavaScript. And depending on the invocation type, `this` value has the corresponding value.  

*Regular invocation*:

```javascript
function myFunction() {
  console.log(this);
}

// Regular invocation
myFunction(); // logs global object (window)
```

*Method invocation*:

```javascript
const myObject = {
  method() {
    console.log(this);
  }
};
// Method invocation
object.method(); // logs "myObject"
```

*Indirect invocation* using `call()` or `apply()` function methods:

```javascript
function myFunction() {
  console.log(this);
}

const myContext = { value: 'A' };

myFunction.call(myContext);  // logs "myContext"
myFunction.apply(myContext); // logs "myContext"
```

*Constructor invocation* using `new` keyword:

```javascript
function MyFunction() {
  console.log(this);
}

new MyFunction(); // logs an instance of MyFunction
```

### 1.2 Arrow function

No matter how or where the arrow function is executed, `this` value always equals to the one from the outer function. In other words, the arrow function binds `this` value lexically.  

In the following example, `this` value inside of `callback` arrow function equals to `myObject`:

```javascript{3-5}
const myObject = {
  myMethod(items) {
    const callback = () => {
      console.log(this);
    };
    items.forEach(callback);
  }
};

myObject.myMethod([1, 2, 3]); // logs "myObject" 3 times
```

`callback` arrow function has `this` value determined lexically, or it equals to the execution context of the outer function `myMethod`.  

`this` bound lexically is one of the great features of arrow functions. It doesn't change `this` value, thus you can easily access `this` value of the outer function in callbacks.  

## 2. *arguments* object

### 2.1 Regular function

Inside the body of a regular function, `arguments` is a special array-like object that contains the list of argument with which the function was invoked.  

Let's invoke the following function with 3 arguments:

```javascript{2}
functin myFunction() {
  console.log(arguments);
}

myFunction('a', 'b'); // logs { 0: 'a', 1: 'b'}
```

`argument` array-object contains all three arguments `'a'`, `'b'`.  

### 2.2 Arrow function

On the other side, no `arguments` special keyword is defined inside of the arrow function. 

Again, same as with `this` value, the `arguments` object is bound lexically. Which means that the arrow function accesses `arguments` from the outer function.  

Let's see the behavior of `argument` in practice:

```javascript{3}
function myRegularFunction() {
  const myArrowFunction = () => {
    console.log(arguments);
  }

  myArrowFunction('c', 'd');
}

myRegularFunction('a', 'b'); // logs { 0: 'a', 1: 'b' }
```

The arrow function `myArrowFunction()` is invoked with the arguments `'c'`, `'d'`. Still, inside of its body, `arguments` object equals to the arguments of `myRegularFunction()` invocation: `'a'`, `'b'`.  

## 3. Implicit *return*

### 3.1 Regular function



### 3.2 Arrow function

## 4. Methods

### 4.1 Regular function

### 4.2 Arrow function

## 5. Constructors

### 5.1 Regular function

### 5.2 Arrow function