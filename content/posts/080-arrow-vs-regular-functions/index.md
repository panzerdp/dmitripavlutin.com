---
title: "5 Differences Between Arrow and Regular Functions"
description: "5 differences between arrow and regular functions in JavaScript"
published: "2020-05-16T12:00Z"
modified: "2020-05-17T17:20Z"
thumbnail: "./images/cover-3.png"
slug: differences-between-arrow-and-regular-functions
tags: ["javascript", "function", "arrow function"]
recommended: ["when-not-to-use-arrow-functions-in-javascript", "6-ways-to-declare-javascript-functions"]
type: post
commentsThreadId: differences-between-arrow-and-regular-functions
---

In JavaScript, you can define functions in many ways.  

The first, usual, way is by using the `function` keyword:

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

In this post, I'm going to show the main differences between the regular functions and arrow functions, so you could choose the right syntax for your situation.  

## 1. *this* value

### 1.1 Regular function

Inside of a regular JavaScript function, `this` value (aka the execution context) is dynamic.  

The dynamic context means that the value of `this` depends on how the regular function is invoked. In JavaScript, there are 4 ways you can invoke a regular function in JavaScript and have a corresponding `this` value.  

During a *simple invocation* the value of `this` is the global object (or `undefined` if the function runs in strict mode):

```javascript
function myFunction() {
  console.log(this);
}

// Simple invocation
myFunction(); // logs global object (window)
```

During a *method invocation* the value of `this` is the object owning the method:

```javascript
const myObject = {
  method() {
    console.log(this);
  }
};
// Method invocation
myObject.method(); // logs "myObject"
```

During and *indirect invocation* using `call()` or `apply()` function methods the value of `this` equals to the first argument:

```javascript
function myFunction() {
  console.log(this);
}

const myContext = { value: 'A' };

myFunction.call(myContext);  // logs { value: 'A' }
myFunction.apply(myContext); // logs { value: 'A' }
```

During a *constructor invocation* using `new` keyword `this` equals to the newly created instance:

```javascript
function MyFunction() {
  console.log(this);
}

new MyFunction(); // logs an instance of MyFunction
```

### 1.2 Arrow function

The way `this` value is bound inside of an arrow function completely differs from the regular function.  

No matter how or where the arrow function is executed, `this` value always equals `this` value from the outer function. In other words, the arrow function binds `this` lexically.  

In the following example, `callback` is an arrow function which outer function is `myMethod`:

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

`callback` arrow function has `this` value determined lexically, in other words, `this` equals to the execution context of the outer function `myMethod`.  

`this` bound lexically is one of the great features of arrow functions. 

## 2. Constructors

## 2.1 Regular function

As seen in the previous section, the regular function can easily constructor objects.  

For example, the following function creates instances of a car:

```javascript
function Car(color) {
  this.color = color;
}

const redCar = new Car('red');
redCar instanceof Car; // => true
```

`Car` is a regular function, and when invoked with `new` keyword, it creates new instances of `Car` type.  

## 2.2 Arrow function

A direct consequence of arrow function binding `this` lexically is that you cannot use the arrow functions as a constructor.  

If you try to invoke an arrow function prefixed with `new` keyword, JavaScrip throws an error:

```javascript
const Car = (color) => {
  this.color = color;
};

const redCar = new Car('red'); // TypeError: Car is not a constructor 
```

Invoking `new Car('red')` where `Car` is an arrow function throws `TypeError: Car is not a constructor`. 

## 3. *arguments* object

### 3.1 Regular function

Inside the body of a regular function, `arguments` is a special array-like object that contains the list of arguments with which the function was invoked.  

Let's invoke the following function with 3 arguments:

```javascript{2}
functin myFunction() {
  console.log(arguments);
}

myFunction('a', 'b'); // logs { 0: 'a', 1: 'b'}
```

`argument` array-object contains all three arguments `'a'`, `'b'`.  

### 3.2 Arrow function

On the other side, no `arguments` special keyword is defined inside of the arrow function. 

Again (same as with `this` value), the `arguments` object is bound lexically: the arrow function accesses `arguments` from the outer function.  

Let's see the behavior of `argument` in practice:

```javascript{2-4}
function myRegularFunction() {
  const myArrowFunction = () => {
    console.log(arguments);
  }

  myArrowFunction('c', 'd');
}

myRegularFunction('a', 'b'); // logs { 0: 'a', 1: 'b' }
```

The arrow function `myArrowFunction()` is invoked with the arguments `'c'`, `'d'`. Still, inside of its body, `arguments` object equals to the arguments of `myRegularFunction()` invocation: `'a'`, `'b'`.  

If you'd like to access the direct arguments of the arrow function, then you can use the rest parameters feature of ES2015:

```javascript{2-4}
function myRegularFunction() {
  const myArrowFunction = (...args) => {
    console.log(args);
  }

  myArrowFunction('c', 'd');
}

myRegularFunction('a', 'b'); // logs { 0: 'c', 1: 'd' }
```

`...args` rest parameters collects all the arguments with which the arrow function is invoked: `{ 0: 'c', 1: 'd' }`.  

## 4. Implicit *return*

### 4.1 Regular function

To return a result from a regular function, just use `return expression` statement:

```javascript
function myFunction() {
  return 42;
}

myFunction(); // => 42
```

If the `return` statement is missing, or there's no expression after return statement, the regular function implicitely returns `undefined`:

```javascript
function myEmptyFunction() {
  42;
}

function myEmptyFunction2() {
  42;
  return;
}

myEmptyFunction();  // => undefined
myEmptyFunction2(); // => undefined
```

`myEmptyFunction()` doesn't have a `return` statement at all, and `myEmptyFunction2()` doesn't have any expressions after `return` keyword. Boths function return implicitly `undefined` value.  

### 4.2 Arrow function

The way you can return value from the arrow function behaves the same way as a regular function, with one useful exception.  

If the arrow function contains a single expression, and you omit the curly braces, then the expression is explicitly returned. 

```javascript
const increment = (num) => num + 1;

increment(41); // => 42
```

The `increment()` arrow consists of only one expression: `num + 1`. The expression is implicitly returned by the arrow function without the use of `return` keyword.  

## 5. Methods

### 5.1 Regular function

The regular functions are the usual way to define methods on classes.  

In the following class `Hero` the method `logName()` is defined as a regular function:

```javascript{6-8}
class Hero {
  constructor(heroName) {
    this.heroName = heroName;
  }

  logName() {
    console.log(this.heroName);
  }
}

const batman = new Hero('Batman');
```

Usually, the regular functions as methods are the way to go.  

But in some situations, you might need to use the method as a callback. But you might encounter difficulties to access `this` value when the method as the callback is invoked.  

For example, let's use use `logName()` method as a callback to setTimeout():

```javascript
setTimeout(batman.logName, 1000);
// after 1 second logs "undefined"
```

Unfortunately, after 1 second, `undefined` is logged to console. All because `setTimeout()` performs a simple invocation of `logName` (where `this` is the global object).  

To make it work as expected, you have to bind `logName()` method to the instance manually:

```javascript
setTimeout(batman.logName.bind(batman), 1000);
// after 1 second logs "Batman"
```

Calling `bind()` on the method `batman.logName.bind(batman)` binds `this` value to `batman` instance. Then you can be sure that the method doesn't lose the context.   

Binding manually `this` is daunting, especially if you have lots of methods. There's a better way, to arrow functions in class properties.

### 5.2 Arrow function

Thanks to [Class fields proposal](https://github.com/tc39/proposal-class-fields) (at this moment at stage 3) you can use the arrow function as methods in classes.  

Now, in contrast with regular functions, the method defined using an arrow function binds `this` lexically to the instance of the class.  

Let's use the arrow function as a field:

```javascript{6-8}
class Hero {
  constructor(heroName) {
    this.heroName = heroName;
  }

  logName = () => {
    console.log(this.heroName);
  }
}

const batman = new Hero('Batman');
```

Now you can easily supply `batman.logName` as a callback without any manual binding of `this`. The value of `this` is already bound to the instance `batman`:

```javascript
setTimeout(batman.logName, 1000);
// after 1 second logs "Batman"
```

## 6. Summary

Knowing well the differences between regular and arrow function helps make better decisions when it's right to use a specific type of function. 

`this` value inside a regular function is dynamic and depends on the invocation. On the opposite, inside the arrow function `this` is bound lexically and equals to `this` of the outer function.  

`arguments` object inside the regular functions contains the list of arguments. The arrow function, on the opposite, doesn't define `arguments` (but you can easily access the arrow function arguments using rest parameters `...args`).  

If the arrow function has only once expression, then it is returned implicitly, even without using the `return` keyword.  

Last but not least, you can define methods using the arrow function syntax inside classes. Fat arrow methods bind tightly `this` value to the class instance. No matter how the fat arrow method is invoked later, `this` always equals to the class instance, which is very useful when the methods are used as callbacks.    

*What other differences between arrow and regular functions do you know?*