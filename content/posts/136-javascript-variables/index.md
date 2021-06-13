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

Variables is a fundamental concept that any developer must know in order to use a specific programming language.  

In JavaScript the concept of variables works around 3 types of declaration statements: `const`, `let`, and `var`.  

To make the understanding easier, I'm going to describe each statement using 4 phases: declaration, initilization, assignment and access. Each of the
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

Here's how you can *declare* a `const` variable with the identifier `myConstVariable`:

```javascript
// Declaration
const myConstVariable = initialValue;
```

The variable `myConstVariable` is *initialized* right away with an `initialValue`, which can be any expression that evaluates to a value. 

Examples of initial values are literals (numbers `1`, strings `'My Initial Value'`), or even other variables or function calls.  

For example:

```javascript
// Declaration
const hero = 'Batman';
```

declares a `const` variable named `hero` that is initialized with the string literal `'Batman'`.  

## 3. *let* variables

## 4. *var* variables

## 5. Conclusion