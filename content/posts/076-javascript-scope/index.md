---
title: 'JavaScript Scope Explained in Simple Words'
description: "The scope manages the availability of variables in JavaScript."
published: '2020-04-14T12:00Z'
modified: '2020-04-14T12:00Z'
thumbnail: './images/cover-2.png'
slug: javascript-scope
tags: ['javascript', 'scope', 'variable']
recommended: ['simple-explanation-of-javascript-closures', 'gentle-explanation-of-this-in-javascript']
type: post
commentsThreadId: javascript-scope
---

There are important concepts you must understand to be able to code. Such crucial concepts
are data types, variables, functions, scope, closures. Mastering these concepts is a must.  

This post explains in-depth, but step by step, what a scope is in JavaScript. 

```toc
```

## 1. What is scope

Before diving into what the scope is, let's try an experiment that demonstrates the effects of scope.  

Let's say you define a variable named `message`:

```javascript
const message = 'Hello';
console.log(message); // 'Hello'
```

Then, you could easily log this variable in the next line after the declaration. 

Now, let's change slightly the code sample. The declaration of `message` is moved inside of an `if` block:

```javascript
if (true) {
  const message = 'Hello';
}
console.log(message); // ReferenceError: message is not defined
```

Unfortunately, this time the variable `message` is not available outside of `if` block. When trying to log the variable, JavaScript throws `ReferenceError: message is not defined`.   

Why does it happen? Because `if` code block creates a *scope* for variables defined within this code block. Thus `message` variable, being defined inside `if` code block, is accessible only within this scope, and inaccessible outside.  

At a higher level, the accessibility of variables is managed by scope. You are free to access the variable defined within its scope. But outside of its scope the variable is inaccessible.  

Now, let's put down a general definition of scope:

> *The scope* is a policy that manages the accessibility of variables.  



## 2. Block scope

A code block in JavaScript defines a scope for variables declared using `let` and `const`.  

```javascript{4,6}
if (true) {
  // "if" block scope
  const message = 'Hello';
  console.log(message); // 'Hello'
}
console.log(message); // throws ReferenceError
```

The statement `if`, `for`, `while` makes use of code blocks where scope is defined.

In the following example `for` loop defines a scope within its code block:

```javascript
for (const color of ['green', 'red', 'blue']) {
  // "for" block scope
  const message = 'Hi';
  console.log(color);   // 'green', 'red', 'blue'
  console.log(message); // 'Hi', 'Hi', 'Hi'
}
console.log(color);   // throws ReferenceError
console.log(message); // throws ReferenceError
```

`color` and `message` variables exist within the scope of `while` code block.  

The same way cycled code block of `while` statement creates a scope for its variables:

```javascript
while (/* condition */) {
  // "while" block scope
  const message = 'Hi';
  console.log(message); // 'Hi'
}
console.log(message); // => throws ReferenceError
```

`message` is defined within `while()` body, consequently `message` is accessible only within `while()` body.  

In JavaScript you can define standalone code blocks. These also delimit a scope:

```javascript{4,6}
{
  // block scope
  const message = 'Hello';
  console.log(message); // 'Hello'
}
console.log(message); // throws ReferenceError
```

### 2.1 *var* is not block scoped

As seen in the previous section, the variables declared using `const` and `let` within a code block are scoped to that code block.  

However, this isn't the case for variables declared using `var`.  

The following `var` variable `count` is defined inside an `if` code block:

```javascript{4,6}
if (true) {
  // "if" block scope
  var count = 0;
  console.log(count); // 0
}
console.log(count); // 0
```

`count` variable, as expected, is accessible within the scope of `if` code block. However, `count` variable is also accessible outside!  

`var` variables are scoped by a function body, rather than a code block. Let's continue on the function scope in the next section.  

## 3. Function scope

A function in JavaScript defines a scope for variables declared using  `var`, `let` and `const`.  

Let's declare a `var` variable within a function body:

```javascript{3,7}
function run() {
  // "run" function scope
  var message = 'Run, Forrest, Run!';
  console.log(message); // 'Run, Forrest, Run!'
}

run();
console.log(message); // throws ReferenceError
```

`run()` function body creates a scope. The variable `message` is accessible inside of the function scope, but inaccessible outside.   

Same way, a function body creates a scope for `let`, `const` and even function declarations.  

```javascript
function run() {
  // "run" function scope
  const two = 2;
  let count = 0;
  function run2() {}

  console.log(two);   // 2
  console.log(count); // 0
  console.log(run2);  // function
}

run();
console.log(two);   // throws ReferenceError
console.log(count); // throws ReferenceError
console.log(run2);  // throws ReferenceError
```

## 4. Module scope

ES2015 module also create a scope for variables, functions, classes.  

For example, a simple module `math` defines a constant `pi`, and exports a function that calculates the perimiter of a circle:

```javascript
// "circle" module scope
const pi = 3.14159;

console.log(pi); // 3.14159
```

`pi` variable is declared within the scope of `circle` module.  

When `circle` module is imported into another module `app`:

```javascript
// app.js
import './circle';

console.log(pi); // throws ReferenceError
```

The variable `pi` is not accessible inside `app` module. `pi` variable availability is limited only to `circle` module scope.  

## 5. Scopes can be nested

An interesting property of scopes is that they can be nested.  

In the following example a scope is created by the function `run()`, and other scope created by `if` condition code block: 

```javascript{8,11}
function run() {
  // "run" function scope
  const message = 'Run, Forrest, Run!';

  if (true) {
    // "if" code block scope
    const friend = 'Bubba';
    console.log(message); // 'Run, Forrest, Run!'
  }

  console.log(friend); // throws ReferenceError
}
```

`if` code block scope is nested inside the `run()` function scope. Thus, scopes can be nested.  

If a scope is contained within another scope, then the contained scope is called *inner scope*. In the example, `if` code block scope is an inner scope of `run()` function scope.  

If a scope wraps another scope, then the scope that wraps is named *outer scope*. In the example, `run()` function scope is an outer scope to `if` code block scope.  

> An *outer scope* wraps an *inner scope*.

What about the variables accessibility? Here are the simple 2 rules to remember:

> An *inner scope* can access the variables of an *outer scope*. However, an *outer scope* cannot access 

`message` variable, which is a part of the `run()` function scope (outer scope), is accessible inside `if` code block scope (*inner scope*).  

However, the inner scope `friend` variable is not accessible in the outer scope.  

## 6. Global scope

The global scope is the outermost scope. The global scope is the outer scope of all scopes and is accessible from any inner scope.  

In a browser environment, the JavaScript code put inside the `<script>` tag is executed in the global scope:

```html
<script>
// Global scope
let count = 1;
</script>
```

The variable declared inside the global scope are named *global* variables. In the previous code snippet, `counter` is a global variable. 

Global variables are accessible from any inner scope.  

In a browser eniroment another host-specific global variables are `window`, `document`.  

## 7. Lexical scope

Let's define 2 functions `innerFunc()` and `outerFunc()`. The function `innerFunc()` is nested inside `outerFunc()`:

```javascript{7,14}
function outerFunc() {
  // the outer scope
  let outerVar = 'I am outside!';

  function innerFunc() {
    // the inner scope
    console.log(outerVar); // 'I am outside!'
  }

  return innerFunc;
}

const inner = outerFunc();
inner();
```

Note that the `innerFunc()` invokation happens outside of `outerFunc()` scope. Still, how does JavaScript understand that `outerVar` inside `innerFunc()` corresponds to the variable `outerVar` of `outerFunc()`?  

JavaScript implements a scoping mechanism named lexical scoping (or static scoping). Lexical scoping means that the accessibility of variables is determined statically by the position of the variables within the nested function scopes: *the outer function scope variables are accessible within the inner function scope*.    

In the example, the lexical scope of `innerFunc()` consists of the scope of `outerFunc()`.  

A formal definition of lexical scope:

> The *lexical scope* consists of outer scopes determined statically.  

The `innerFunc()` is a *closure* because it captures the variable `outerVar` from the lexical scope. 

If you'd like to master the closure concept, I highly recommend reading my post [A Simple Explanation of JavaScript Closures](/simple-explanation-of-javascript-closures/).  

### 8. Variables isolation

An immediate property of scope arises: the scope isolates the variables names. Different scopes can have variables with the same name.  

You can reuse common variables names (`count`, `index`, `current`, `value`, etc) in different scopes without collisions.  

`foo()` and `bar()` function scopes have their own, but same named, variables `count`:

```javascript{4,10}
function foo() {
  // "foo" function scope
  let count = 0;
  console.log(count); // 0
}

function bar() {
  // "bar" function scope
  let count = 1;
  console.log(count); // 1
}

foo();
bar();
```

## 9. Conclusion

The scope is a policy that manages the availability of variables. A variable defined inside a scope is accessible only within than scope, and innacessible outside.  

In JavaScript scopes are created by code blocks and functions. While `const` and `let` variables are scoped by code blocks and functions, `var` variables are scoped only by functions.  

Scopes can be nested. The variables of outer scope are accessible within the inner scope.  

Lexical scope consists of the outer function scopes determined statically. Any function, no matter the place where being executed, can access the variables of its lexical scope (this is the concept of [closure](/simple-explanation-of-javascript-closures/)).  

The scope is a crucial concept that every JavaScript developer should master well.  

