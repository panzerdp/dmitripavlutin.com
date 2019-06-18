---
title: "6 ways to declare JavaScript functions"
description: "JavaScript allows to declare functions in 6 ways. The article describes how to choose the right declaration type, depending on the situation and function purpose."
published: "2016-06-22"
modified: "2016-06-22"
thumbnail: "./images/cover.jpg"
slug: 6-ways-to-declare-javascript-functions
tags: ["javascript", "function"]
recommended: ["7-tips-to-handle-undefined-in-javascript", "object-rest-spread-properties-javascript"]
type: post
---

A **function** is a parametric block of code defined one time and called any number of times later. In JavaScript a function is composed and influenced by many components:

* JavaScript code that forms the function body
* The list of function parameters
* The variables accessible from the outer scope
* The returned value
* The context `this` when the function is invoked
* Named or anonymous function
* The variable that holds the function object after declaration
* `arguments` object (or its missing in an arrow function)


These components affect the function behavior depending on the declaration type. In JavaScript a function can be declared using several ways: 

* [Function declaration](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Statements/function)
* [Function expression](https://developer.mozilla.org/en/docs/web/JavaScript/Reference/Operators/function)
* [Shorthand method definition](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer#Method_definitions)
* [Arrow function](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Functions/Arrow_functions)
* [Generator function](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Statements/function*)
* [`Function` constructor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)

The function code has a slight impact on what declaration type to choose. Important is how the function interacts with the external components (the outer scope, the enclosing context, object that owns the method, etc) and the invocation type (regular function invocation, method invocation, constructor call, etc).

For instance you need `this` on a function invocation to be the same as the enclosing context (i.e. inherits `this` from the outer function). The best option is to use an [arrow function](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Functions/Arrow_functions), which provides the necessary context transparency.  
The following example demonstrates that:  

```javascript
class Names {
  constructor (names) {
    this.names = names;
  }
  contains(names) {
    return names.every((name) => this.names.indexOf(name) !== -1);
  }
}
var countries = new Names(['UK', 'Italy', 'Germany', 'France']);
countries.contains(['UK', 'Germany']); // => true
countries.contains(['USA', 'Italy']);  // => false
```

The arrow function passed to `.every()` has `this` (an instance of `Names` class) the same as `contains()` method. A function declared with the fat arrow is the most appropriate declaration type in a case when the context needs to be *inherited* from the outer method `.contains()`.  

If trying to use a function expression for `.every()` callback, it would require more manual configuration of the context. Available options are: set the second parameter of the `.every(function(){...}, this)` to indicate the context or use   `.bind()` method on the callback `function(){...}.bind(this)`. This is additional code and the arrow function provides the context transparency easier.  

This post describes six approaches how to declare functions in JavaScript. Every type is explained in which situations it fits better and produces lighter code. Interested? Let's get started.

Table of contents:

1. [Function declaration](#1-function-declaration)  
  1.1 [A regular function](#11-a-regular-function)  
  1.2 [Difference from function expression](#12-difference-from-function-expression)  
  1.3 [Function declaration in conditionals](#13-function-declaration-in-conditionals)  
2. [Function expression](#2-function-expression)  
  2.1 [Named function expression](#21-named-function-expression)  
  2.2 [Favor named function expression](#22-favor-named-function-expression)
3. [Shorthand method definition](#3-shorthand-method-definition)  
  3.1 [Computed property names and methods](#31-computed-property-names-and-methods)
4. [Arrow function](#4-arrow-function)  
  4.1 [Context transparency](#41-context-transparency)  
  4.2 [Short callbacks](#42-short-callbacks)  
5. [Generator function](#5-generator-function)  
6. [One more thing: `new Function`](#6-one-more-thing-new-function)
7. [In the end, which way is better?](#7-in-the-end-which-way-is-better)  
  

## 1. Function declaration

**A function declaration** is made of `function` keyword, followed by an obligatory function name, a list of parameters in a pair of parenthesis `(para1, ..., paramN)` and a pair of curly braces `{...}` that delimits the body code.  

A function declaration looks this way:

```javascript
// function declaration
function isEven(num) {
  return num % 2 === 0;
}
isEven(24); // => true
isEven(11); // => false
```
`function isEven(num) {...}` is a function declaration that defines `isEven` function, which determines if a number is even.  

The function declaration **creates a variable** in the current scope with the identifier equal to function name. This variable holds the function object. 

The function variable is **hoisted** up to the top of the current scope, which means that the function can be invoked before the declaration (see [this chapter](http://rainsoft.io/javascript-hoisting-in-details/#hoistingandfunctiondeclaration) for more details).  

The created function is **named**, which means that `name` property of the function object holds its name. It is useful when viewing the call stack: in debugging or error messages reading.

Let's see these properties in an example:

```javascript
// Hoisted variable
console.log(hello('Aliens')); // => 'Hello Aliens!'
// Named function
console.log(hello.name)       // => 'hello'
// Variable holds the function object
console.log(typeof hello);    // => 'function'
function hello(name) {
  return `Hello ${name}!`;
}
```
The function declaration `function hello(name) {...}` create a variable `hello` that is hoisted to the top of the current scope. `hello` variable holds the function object and `hello.name` contains the function name: `'hello'`.

### 1.1 A regular function

The function declaration matches for cases when a regular function should be created. Regular means that you declare the function once and later invoke it in many different places. This is the basic scenario:

```javascript
function sum(a, b) {
  return a + b;
}
sum(5, 6);           // => 11
([3, 7]).reduce(sum) // => 10
```

Because the function declaration creates a variable in the current scope, alongside with regular function call, it is useful for recursion or detaching event listeners. Contrary to function expressions or arrow functions that do not create binding with the function variable by its name.
For example to calculate recursively the factorial:

```javascript
function factorial(n) {
  if (n === 0) {
    return 1;
  }
  return n * factorial(n - 1);
}
factorial(4); // => 24
```
Inside `factorial()` a recursive call is being made using the variable that holds the function: `factorial(n - 1)`.  
Of course is possible to use a function expression and assign it to a regular variable, e.g. `var factorial = function(n) {...}`. But the function declaration `function factorial(n)` looks more compact (no need for `var` and `=`).

An important property of the function declaration is its hoisting mechanism. It allows to use the function before declaration in the same scope. 
Hoisting is useful in many cases. For instance when first you like to see how the function is called in the head of a script, without reading the details about function implementation. The function implementation can be situated below in the file and you may not even scroll there.  
You can read more details about function declaration hoisting [here](http://rainsoft.io/javascript-hoisting-in-details/#hoistingandfunctiondeclaration).

### 1.2 Difference from function expression

It is easy to confuse the [function declaration](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Statements/function) and [function expression](https://developer.mozilla.org/en/docs/web/JavaScript/Reference/Operators/function). They look very similar, but produce functions with different properties.  

An easy to remember rule: the *function declaration* in a statement always **starts** with the keyword `function`. Otherwise it's a *function expression* (see [2.](#2functionexpression)).  

The following sample is a function declaration where the statement **starts** with `function` keyword:

```javascript
// Function declaration: starts with "function"
function isNil(value) {
  return value == null;
}
```
In case of function expressions the JavaScript statement **does not start** with `function` keyword (it is present somewhere in the middle of the statement code): 

```javascript
// Function expression: starts with "var"
var isTruthy = function(value) {
  return !!value;
};
// Function expression: an argument for .filter()
var numbers = ([1, false, 5]).filter(function(item) {
  return typeof item === 'number';
});
// Function expression (IIFE): starts with "("
(function messageFunction(message) {
  return message + ' World!';
})('Hello');
```

### 1.3 Function declaration in conditionals

Some JavaScript environments can throw a reference error when invoking a function whose declaration appears within blocks `{...}` of `if`, `for` or `while` statements.  
Let's enable the strict mode and see what happens when a function is declared in a conditional:

```javascript
(function() {
  'use strict';
  if (true) {
    function ok() {
      return 'true ok';
    }
  } else {
    function ok() {
      return 'false ok';
    }
  }
  console.log(typeof ok === 'undefined'); // => true
  console.log(ok()); // Throws "ReferenceError: ok is not defined"
})();
```
When calling `ok()`, JavaScript throws `ReferenceError: ok is not defined`, because the function declaration is inside a conditional block. 
Notice that this scenario works well in non-strict mode, which make it even more confusing.

As a general rule for these situations, when a function should be create based on some conditions - use a function expression. Let's see how it is possible:

```javascript
(function() {
  'use strict';
  var ok;
  if (true) {
    ok = function() {
      return 'true ok';
    };
  } else {
    ok = function() {
      return 'false ok';
    };
  }
  console.log(typeof ok === 'function'); // => true
  console.log(ok()); // => 'true ok'
})();
```
Because the function is a regular object, it is fine to assign it to a variable depending on a condition. Invoking `ok()` works fine and does not throw any errors.


## 2. Function expression

**A function expression** is determined by a `function` keyword, followed by an optional function name, a list of parameters in a pair of parenthesis `(para1, ..., paramN)` and a pair of curly braces `{ ... }` that delimits the body code.  
Some samples of the function expression usage:

```javascript
var count = function(array) { // Function expression
  return array.length;
}
var methods = {
  numbers: [1, 5, 8],
  sum: function() { // Function expression
    return this.numbers.reduce(function(acc, num) { // func. expression
      return acc + num;
    });
  }
}
count([5, 7, 8]); // => 3
methods.sum();    // => 14
```
The function expression creates a function object that can be used in different situations: 

*  Assigned to a variable as an object `count = function(...) {...}`
*  Create a method on an object `sum: function() {...}`
*  Use the function as a callback `.reduce(function(...) {...})`

The function expression is the working horse in JavaScript. Most of the time developer deals with this type of function declaration alongside the arrow function (if you prefer short syntax and lexical context).  

### 2.1 Named function expression

A function is anonymous when it does not have a name (`name` property is an empty string `''`):

```javascript
var getType = function(variable) {
  return typeof variable;
};
getType.name // => ''
```
`getType` is an anonymous function and `getType.name` is `''`.

When the expression has the name specified, this is a **named function expression**. It has some additional properties in comparison with simple function expression:

* A named function is created, i.e. `name` property holds the function name
* Inside the function body a variable with the same name holds the function object

Let's use the above example, but specify a name in the function expression:

```javascript
var getType = function funName(variable) {
  console.log(typeof funName === 'function'); // => true
  return typeof variable;
}
console.log(getType(3));                    // => 'number'
console.log(getType.name);                  // => 'funName'
console.log(typeof funName === 'function'); // => false
```

`function funName(variable) {...}` is a named function expression. The variable `funName` is accessible within function scope, but not outside. The property `name` of the function object holds the name: `funName`.

### 2.2 Favor named function expression

When a variable assignment is used with a function expression `var fun = function() {}`, many engines can infer the function name from this variable. Often callbacks are passed as anonymous function expressions, without storing into variables: so the engine cannot determine its name. 

In many situations [it seems reasonable](https://toddmotto.com/avoiding-anonymous-javascript-functions/) to use named functions and avoid anonymous ones. This brings a series of benefits:

* The error messages and call stacks show more detailed information when use the function names
* More comfortable debugging by reducing the number of *anonoymous* stack names 
* The function name helps to understand quickly what it does
* It is possible to access the function by name inside its scope for recursive calls or detaching event listeners

## 3. Shorthand method definition

**Shorthand method definition** can be used in a method declaration on object literals and ES6 classes. You can define them using a function name, followed by a list of parameters in a pair of parenthesis `(para1, ..., paramN)` and a pair of curly braces `{ ... }` that delimits the body statements.

The following example uses shorthand method definition in an object literal:

```javascript
var collection = {
  items: [],
  add(...items) {
    this.items.push(...items);
  },
  get(index) {
    return this.items[index];
  }
};
collection.add('C', 'Java', 'PHP');
collection.get(1) // => 'Java'
```
`add()` and `get()` methods in `collection` object are defined using short method definition. These methods are called as usual: `collection.add(...)` and `collection.get(...)`.  

The short approach of method definition has several benefits over traditional property definition with a name, colon `:` and a function expression `add: function(...) {...}`:

* A shorter syntax is easier to read and write
* Shorthand method definition creates named functions, contrary to a function expression. It is useful for debugging.

Notice that `class` syntax requires method declarations in a short form:

```javascript
class Star {
  constructor(name) {
    this.name = name;
  }
  getMessage(message) {
    return this.name + message;
  }
}
var sun = new Star('Sun');
sun.getMessage(' is shining') // => 'Sun is shining'
```

### 3.1 Computed property names and methods

ECMAScript 6 adds a nice feature: computed property names in object literals and classes.  
The computed properties use a slight different syntax `[methodName]() {...}`, so the method definition looks this way:

```javascript
var addMethod = 'add',
  getMethod = 'get';
var collection = {
  items: [],
  [addMethod](...items) {
    this.items.push(...items);
  },
  [getMethod](index) {
    return this.items[index];
  }
};
collection[addMethod]('C', 'Java', 'PHP');
collection[getMethod](1) // => 'Java'
```
`[addMethod](...) {...}` and  `[getMethod](...) {...}` are shorthand method declarations with computed property names.

## 4. Arrow function

**An arrow function** is defined using a pair of parenthesis that contains the list of parameters `(param1, param2, ..., paramN)`, followed by a fat arrow `=>` and a pair of curly braces `{...}` that delimits the body statements.  
When the arrow function has only one parameter, the pair of parenthesis can be omitted. When it contains a single statement, the curly braces can be omitted too.

The following example shows the arrow function basic usage:

```javascript
var absValue = (number) => {
  if (number < 0) {
    return -number;
  }
  return number;
}
absValue(-10); // => 10
absValue(5);   // => 5
```
`absValue` is an arrow function that calculates the absolute value of a number.

The function declared using a fat arrow has the following properties:

*  The arrow function does not create its own execution context, but takes it lexically (contrary to function expression or function declaration, which create  own `this` depending on invocation)
* The arrow function is anonymous: `name` is an empty string (contrary to function declaration which have a name)
* `arguments` object is not available in the arrow function (contrary to other declaration types that provide `arguments` object)

### 4.1 Context transparency

`this` keyword is one of the most confusing aspects of JavaScript (check [this article](http://rainsoft.io/gentle-explanation-of-this-in-javascript/) for a detailed explanation on `this`).   
Because functions create their own execution context, often it is hard to catch the flying around `this`.

ECMAScript 6 improves `this` usage by introducing the arrow function, which takes the context lexically. This is nice, because from now on is not necessary to use `.bind(this)` or store the context `var self = this` when a function needs the enclosing context.

Let's see how `this` is inherited from the outer function:

```javascript
class Numbers {
  constructor(array) {
    this.array = array;
  }
  addNumber(number) {
    if (number !== undefined) {
       this.array.push(number);
    } 
    return (number) => { 
      console.log(this === numbersObject); // => true
      this.array.push(number);
    };
  }
}
var numbersObject = new Numbers([]);
numbersObject.addNumber(1);
var addMethod = numbersObject.addNumber();
addMethod(5);
console.log(numbersObject.array); // => [1, 5]
```
`Numbers` class holds an array of numbers and provides a method `addNumber()` to insert new numbers.  
When `addNumber()` is called without arguments, a closure is returned that allows to insert numbers. This closure is an arrow function which has `this` as `numbersObject` instance, because the context is taken lexically from `addNumbers()` method.  

Without the arrow function is necessary to manually fix the context. It means adding fixes by using `.bind()` method:

```javascript
//...
    return function(number) { 
      console.log(this === numbersObject); // => true
      this.array.push(number);
    }.bind(this);
//...
```
or store the context into a separated variable `var self = this`:

```javascript
//...
    var self = this;
    return function(number) { 
      console.log(self === numbersObject); // => true
      self.array.push(number);
    };
//...
```

The context transparency property can be used whenever you want to keep `this` as is, taken from the enclosing context.

### 4.2 Short callbacks
When creating an arrow function, the parenthesis pairs and curly braces are optional for a single parameter and single body statement. This helps creating very short callback functions.

Let's make a function that finds if an array has `0` elements:

```javascript
var numbers = [1, 5, 10, 0];
numbers.some(item => item === 0); // => true
```
`item => item === 0` is an arrow function that looks straightforward.

Sometimes nested short arrow functions are difficult to read. So the most convinient way to use the short form is a single callback function (without nested ones).  
If necessary, in the nested functions the optional curly braces can be restored to increase the readability.  

## 5. Generator function

The generator function in JavaScript returns a [Generator object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator). Its syntax is similar to function expression, function declaration or method declaration, just that it requires a star character `*`.

The generator function can be declared in the following forms:

a. Function declaration form `function* <name>()`:

```javascript
function* indexGenerator(){
  var index = 0;
  while(true) {
    yield index++;
  }
}
var g = indexGenerator();
console.log(g.next().value); // => 0
console.log(g.next().value); // => 1
```
b. Function expression form `function* ()`:

```javascript
var indexGenerator = function* () {
  var index = 0;
  while(true) {
    yield index++;
  }
};
var g = indexGenerator();
console.log(g.next().value); // => 0
console.log(g.next().value); // => 1
```
c. Shorthand method definition form `*<name>()`:

```javascript
var obj = {
  *indexGenerator() {
    var index = 0;
    while(true) {
      yield index++;
    }
  }
}
var g = obj.indexGenerator();
console.log(g.next().value); // => 0
console.log(g.next().value); // => 1
```
In all 3 cases the generator function returns the generator object `g`. Later `g` is used to generated series of incremented numbers.

## 6. One more thing: new Function

In JavaScript functions are first class objects - a function is a regular object of type `function`.  
The ways of declaration described above create the same function object type. Let's see an example:

```javascript
function sum1(a, b) {
  return a + b;
}
var sum2 = function(a, b) {
  return a + b;
}
var sum3 = (a, b) => a + b;
console.log(typeof sum1 === 'function'); // => true
console.log(typeof sum2 === 'function'); // => true
console.log(typeof sum3 === 'function'); // => true
```
The function object type has a constructor: [`Function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function).  
When `Function` is invoked as a constructor `new Function(arg1, arg2, ..., argN, bodyString)`, a new function is created. The arguments `arg1, args2, ..., argN` passed to constructor become the parameter names for the new function and the last argument `bodyString` is used as the function body code.  

Let's create a function that sums two numbers: 

```javascript
var numberA = 'numberA', numberB = 'numberB';
var sumFunction = new Function(numberA, numberB, 
   'return numberA + numberB'
);
sumFunction(10, 15) // => 25
```
`sumFunction` created with `Function` constructor invocation has parameters `numberA` and `numberB` and the body `return numberA + numberB`.

The functions created this way don't have access to current scope, thus closures cannot be created. They are always created in the global scope. 
 
One *possible* application of `new Function` is a [better way](https://twitter.com/WebReflection/status/269578376833024000) to access the  global object in a browser or NodeJS script:

```javascript
(function() {
   'use strict';
   var global = new Function('return this')();
   console.log(global === window); // => true
   console.log(this === window);   // => false
})();
```

Important to remember about `new Function` is that **almost never** functions should be declared this way. Because the function body is evaluated on runtime, this approach inherits many `eval()` usage [problems](http://stackoverflow.com/a/86580/1894471): security risks, harder debugging, no way to apply interpreter optimizations, no code auto-complete.

## 7. In the end, which way is better?

There is no winner or looser. The decision which declaration type to choose depends on the situation.  

There are some rules however that you may follow for common situations.

If the function should use `this` from the enclosing function, the arrow function is a good solution. When the callback function has one short statement, the arrow function is a good option too, because it creates short and light code. 

For a shorter syntax when declaring methods on object literals, the shorthand method declaration is preferable.  

`new Function` way to declare functions generally should not be used. Mainly because it opens potential security risks, doesn't allow code auto-complete in editors and lose the engine optimizations.

I believe this article is another step to write more readable and less buggy functions. Especially because they are the living cells of any application.