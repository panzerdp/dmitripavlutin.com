---
title: "A Simple Explanation of JavaScript Variables: const, let, var"
description: "How to declare, initialize, assign and read JavaScript variables using const, let and var statements."  
published: "2021-06-16T10:00Z"
modified: "2021-06-16T10:00Z"
thumbnail: "./images/cover-3.png"
slug: javascript-variables-const-let-var
tags: ['javascript', 'variable', 'const', 'let', 'var']
recommended: ['javascript-hoisting-in-details', 'javascript-defined-variable-checking']
type: post
---

The variable is a fundamental concept that any developer.

In JavaScript the concept of variable works around 3 types of declaration statements: `const`, `let`, and `var`.  

I'm going to describe each variable type around the declaration, initialization, value access, and assignment. Each of the
3 types (`const`, `let`, and `var`) create variables that behave differently exactly in these 4 steps.  

This post isn't quite beginner friendly, but rather useful to solidify the knowledge of JavaScript variables.  

Let's get started.  

## 1. Variable identifier

First, let's understand what a variable is.  

In simple terms, a variable is a placeholder (or a box) for a value. A value in JavaScript can be either a primitive value or an object.  

The variable has a *name*, which stricter is called *identifier*. Examples of identifiers are `myNumber`, `name`, `list`, `item`.    

The syntax of an identifier is pretty simple: 

> *An identifier* can contain letters, digits `0..9`, and special symbols `$`, `_`. An identifier cannot start with a digit `0..9`.  

Examples of *valid identifiers* are `myNumber`, `my_number`, `list1`, `$item`, `_name`, `a`, `b`, `$`, `_`. 

Examples of *invalid identifiers* are `1number` (incorrectly starts with the digit `1`), `my-number` (the symbol `-` is not allow in an identifier), `function` (the identifier cannot be a [keyword](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#keywords)).  

Finally,

> JavaScript identifiers are *case sensitive*.  

For example, the identifiers `myNumber` and `mynumber` are different, because the letter `n` has different cases in the identifiers (`N` vs `n`).  

## 2. *const* variables

### 2.1 *const* declaration and initialization

Here's how you can *declare* a `const` variable with the identifier `myConstVariable`:

```javascript
const myConstVariable = initialValue;
```

The variable `myConstVariable` is *initialized* right away with an `initialValue`, which can be any expression that evaluates to a value. 

Examples of initial values are literals (numbers `1`, strings `'My Initial Value'`), other variables, function calls.  

For example the statement:

```javascript
const hero = 'Batman';
```

Declares a `const` variable using the identifier `hero` that is initialized with the string literal `'Batman'`.  

### 2.2 *const* access and assignment

After the declaration and initialization, you can *access* the variable value just by using its name (aka identifier):

```javascript
const hero = 'Batman';

console.log(hero);              // logs 'Batman'
console.log(`Hello, ${hero}!`); // logs 'Hello, Batman!'
```

What's also specific to `const` variables (in contrast to `let` and `var` variables) is that you have to assign the initial value:  

```javascript
const hero; // SyntaxError: Missing initializer in const declaration
```

Also, you cannot reassign a new value to `const` variable:  

```javascript
const hero = 'Batman';

hero = 'Joker'; // TypeError: Assignment to constant variable
```

Regarding when you can access a variable: you can access it only within its [scope](/javascript-scope/). Outside of its scope, the variable cannot the accessed.  

The code block and a function body create a scope for `const` variables:

```javascript
if (true) {
  // Code block scope
  const hero = 'Batman';
  console.log(hero); // logs 'Batman'
}
console.log(hero); // throws ReferenceError
```

```javascript
function greetBatman() {
  // Function scope
  const hero = 'Batman';
  console.log(`Hello, ${hero}!`); // logs 'Hello, Batman!'
}
console.log(`Hello, ${hero}!`); // throws ReferenceError

greetBatman();
```

On top of that, you can also access the `const` variable value only after the declaration statement, but not before:

```javascript
console.log(hero); // throws ReferenceError
const hero = 'Batman';
```

## 3. *let* variables

### 3.1 *let* declaration and initialization

Here's how you can *declare* a `let` variables with the identifiers `myVariable1` and `myVariable2`:

```javascript
let myVariable1 = initialValue;
// or
let myVariable2;
```

The variable `myVariable1` is *declared* and *initialized* right away with an `initialValue`, which can be any kind of expression.  

The variable `myVariable2` is *declared*, however doesn't have an initial value. By default, JavaScript considers uninitialized variables having the special value `undefined`.

In the following code snippet:

```javascript
let villain = 'Joker';

let name;
```

The `let` variable named `villain` is declared and initialized with the string literal `'Joker'`. `name` variable also has been defined, but it wasn't initialized.   

### 3.2 *let* access and assignment

After the declaration and initialization, you can *access* the `let` variable value just by writing the identifier:

```javascript
let villain = 'Joker';

console.log(villain);              // logs 'Joker'
console.log(`Hello, ${villain}!`); // logs 'Hello, Joker!'

let name;
console.log(name); // logs undefined
```

`name` variable, while being declared, isn't initialized so it has an `undefined` value.  

You can easily update the value of a `let` variable, a thing you cannot do with `const` variables - and this is the main difference between them.

```javascript
let villain = 'Joker';

villain = 'Bane';
console.log(villain); // logs 'Bane'
```

The scope of the `let` variables is defined the same way as for `const`: by a code block or function body.  

```javascript
if (true) {
  // Code block scope
  let villain = 'Joker';
  console.log(villain); // logs 'Joker'
}
console.log(villain); // throws ReferenceError
```

```javascript
function greetJoker() {
  // Function scope
  let villain = 'Joker';
  console.log(`Hello, ${villain}!`); // logs 'Hello, Joker!'
}
console.log(`Hello, ${villain}!`); // throws ReferenceError

greetJoker();
```

Same as with `const`, you cannot access a `let` variable before the declaration statement:

```javascript
console.log(villain); // throws ReferenceError
let villain = 'Joker';
```

## 4. *var* variables

### 4.1 *var* declaration and initialization

Here's how you can *declare* a `var` variable with the identifier `myVariable1` or `myVariable2`:

```javascript
var myVariable1 = initialValue;
// or
var myVariable2;
```

The variable `myVariable1` is *declared* and *initialized* right away with an `initialValue`, which can be any kind of expression: literal, function call, etc.

The variable `myVariable2` is *declared*, however doesn't have an initial value. By default, JavaScript considers uninitialized variables as having the special value `undefined`.

In the following code snippet:

```javascript
var city = 'Gotham';

var name;
```

The `var` variable `city` is declared and initialized with the string literal `'Gotham'`. `name` variable also has been defined, but it wasn't initialized.   

### 4.2 *var* access and assignment

After the declaration and optional initialization, you can *access* the `var` variable value just by using its name (or identifier):

```javascript
var city = 'Gotham';

console.log(city);                  // logs 'Gotham'
console.log(`Welcome to ${city}!`); // logs 'Welcome to Gotham!'

var name;
console.log(name); // logs undefined
```

`name` variable, while being declared, it is not yet initialized so it has an `undefined` value.  

Same as with `let` variables, you can easily reassign `var` variables:

```javascript
var city = 'Gotham';

city = 'New York';
console.log(city); // logs 'New York'
```

In contrast to `const` and `let`, the scope of the `var` variables is defined only by the function body:

```javascript
function welcomeTo() {
  // Function scope
  var city = 'Gotham';
  console.log(`Welcome to ${city}!`); // logs 'Welcome to Gotham!'
}
console.log(`Welcome to ${city}!`); // throws ReferenceError

welcomeTo();
```

A code block doesn't create a scope for `var` variables:

```javascript
if (true) {
  // Code block scope
  var city = 'Gotham';
  console.log(city); // logs 'Gotham'
}
console.log(city); // logs 'Gotham'
```

Normally, you won't access a `var` variable before the declaration statement. But if you do, JavaScript won't throw a reference error, but rather evaluate the variable to `undefined`:

```javascript
console.log(city); // logs undefined
var city = 'Gotham';
```

It happens because a `var` variables hoists up to the top of the scope.  

## 5. Conclusion

There are 3 ways to declare variables in JavaScript: using `const`, `let`, or `var` statements.  

Specific to `const` variable is that you have to initialize the variable right away with an initial value. Also, the `const` variable cannot be reassigned.  

`let`, on the other side, can be declared with or without an initial value. Also `let` variable value can be updated.  

`var` variables behave almost as `let` variables: can be initialized or not, as well can be reassigned with a new value. However, contrary to `let` and `const`, only the function body can create a scope for `var` variables.  

*In your opinion, does it make sense to use `var` statement to defined function scope variables? Write your opinion in a comment below!*