---
title: "A Simple Explanation of JavaScript Variables: const, let, var"
description: "How to declare, initialize, assign and read JavaScript variables using const, let and var statements."  
published: "2021-06-15T12:00Z"
modified: "2021-06-15T12:00Z"
thumbnail: "./images/cover-3.png"
slug: javascript-variables-const-let-var
tags: ['javascript', 'variable', 'const', 'let', 'var']
recommended: ['javascript-hoisting-in-details', 'javascript-defined-variable-checking']
type: post
---

Variables is a fundamental concept that any developer must know to program.  

In JavaScript the concept of variables works around 3 types of declaration statements: `const`, `let`, and `var`.  

To make the understanding easier, I'm going to describe each statement using 4 phases: declaration, initilization, access the value and assignment of a new value. Each of the
3 statements (`const`, `let`, and `var`) create variables that behave differently exactly in these 4 phases.  

Let's get started.  

## 1. Variable identifier

Before getting into the variables statements, it is important to understand what a variable actually is.  

In simple terms, a variable is a placeholder for a value. A value in JavaScript can be either a primitive value or an object.  

Any variable has a *name*, which stricter is called *identifier*. Example of identifiers are `myNumber`, `name`, `list`, `item`, etc.  

Regarding the syntax of an identifier, there rules are pretty simple: 

> *An identifier* can contain letters, `$`, `_` and digits `0..9`, but cannot start with a digit `0..9`.  

Examples of *valid identifiers* are `myNumber`, `my_number`, `list1`, `$item`, `_name`, `a`, `b`, `$`, `_`. 

Examples of *invalid identifiers* are `1number` (incorrectly starts with the digit `1`), `my-number` (the symbol `-` is not allow in an identifier), `function` (the identifier cannot be a [keyword](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#keywords)).  

Finally,

> JavaScript identifiers are *case sensitive*.  

For example, identifiers like `myNumber` and `mynumber` are different, because the letter `n` has different cases in the identifiers (`N` vs `n`).  

## 2. *const* variables

### 2.1 *const* declaration and initialization

Here's how you can *declare* a `const` variable with the identifier `myConstVariable`:

```javascript
const myConstVariable = initialValue;
```

The variable `myConstVariable` is *initialized* right away with an `initialValue`, which can be any expression that evaluates to a value. 

Examples of initial values are literals (numbers `1`, strings `'My Initial Value'`), or even other variables or function calls.  

For example:

```javascript
const hero = 'Batman';
```

declares a `const` variable named `hero` that is initialized with the string literal `'Batman'`.  

### 2.2 *const* access and assignment

After the declaration and initialization, you can *access* the variable value just by writing the identifier:

```javascript
const hero = 'Batman';

console.log(hero);              // logs 'Batman'
console.log(`Hello, ${hero}!`); // logs 'Hello, Batman!'
```

What's also specific to `const` variables (in contrast to `let` and `var` variables) is that you have to assign the initial value.  

```javascript
const hero; // SyntaxError: Missing initializer in const declaration
```

Also you cannot reassign a new value to the variable:  

```javascript
const hero = 'Batman';

hero = 'Joker'; // TypeError: Assignment to constant variable
```

It's important to remember when you can and cannot *access* the variable value &mdash; this is also called scope. Outside of its scope, the variable cannot the accessed.  

The code block and a function create a scope for `const` variables:

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

Here's how you can *declare* a `let` variable with the identifier `myVariable1` or `myVariable2`:

```javascript
let myVariable1 = initialValue;
// or
let myVariable2;
```

The variable `myVariable1` is *initialized* right away with an `initialValue`, which can be any expression that evaluates to a value.  

Examples of initial values are literals (numbers `1`, strings `'My Initial Value'`), or even other variables, expressions or function calls.  

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

`name` variable, while being declared, it is not yet initialized so it has `undefined` value.  

You can easily reassign values to `let` variables, thing you cannot do with `const` variables - and this is the main difference between the them.

```javascript
const villain = 'Joker';

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

You can access the value of the `let` variable within the current scope, and only after the declaration statement:

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

The variable `myVariable1` is *declared* and *initialized* right away with an `initialValue`, which can be any expression that evaluates to a value.  

The variable `myVariable2` is *declared*, however doesn't have an initial value. By default, JavaScript considers uninitialized variables as having the special value `undefined`.

In the following code snippet:

```javascript
var city = 'Gotham';

var name;
```

The `var` variable `city` is declared and initialized with the string literal `'Gotham'`. `name` variable also has been defined, but it wasn't initialized.   

### 4.2 *var* access and assignment

After the declaration and optional initialization, you can *access* the `var` variable value just by writing the identifier:

```javascript
var city = 'Gotham';

console.log(city);                  // logs 'Gotham'
console.log(`Welcome to ${city}!`); // logs 'Welcome to Gotham!'

var name;
console.log(name); // logs undefined
```

`name` variable, while being declared, it is not yet initialized so it has `undefined` value.  

You can easily reassign values to `var` variables, same as with `let` variables.  

```javascript
var city = 'Gotham';

city = 'New York';
console.log(city); // logs 'New York'
```

The scope of the `var` variables is defined only by the function body:

```javascript
function welcomeTo() {
  // Function scope
  var city = 'Gotham';
  console.log(`Welcome to ${city}!`); // logs 'Welcome to Gotham!'
}
console.log(`Welcome to ${city}!`); // throws ReferenceError

welcomeTo();
```

```javascript
// A code block doesn't create a scope
// for `var` variables
if (true) {
  // Code block scope
  var city = 'Gotham';
  console.log(city); // logs 'Gotham'
}
console.log(city); // logs 'Gotham'
```

Normally, you won't access `var` variables before the declaration statement. But if you do, JavaScript won't throw a reference error, but rather evaluate the variable to `undefined`:

```javascript
console.log(city); // logs undefined
var city = 'Gotham';
```

It happens because `var` variables hoist up to the top of the scope.  

## 5. Conclusion

There are 3 ways to declare variables in JavaScript: using `const`, `let` or `var`.  

Specific to `const` variable is that you have to initialize the variable right away with an initial value. Also, `const` variable cannot be updated to a new value.  

`let`, on the other side, can be initialized, but can be declared without an initial value. Also `let` variable value can be updated.  

`var` variables behave almost the same as `let` variables: can be initialized or not, as well can be reassigned with a new value. However, contrary to `let` and `const`, only the function body can create a scope for `var` variables.  

