---
title: Recipes of Concise Arrow Functions in JavaScript
description: Useful tips on how to write consice arrow functions in JavaScript.
published: "2019-07-30"
modified: "2019-07-30"
thumbnail: "./images/arrows.jpg"
slug: concise-arrow-functions-javascript
tags: ['javascript', 'arrow function']
recommended: ["6-ways-to-declare-javascript-functions", "when-not-to-use-arrow-functions-in-javascript"]
type: post
---

Arrow function syntax offers a way to define functions using a short arrow-like `=>` form:

```javascript
const sayMessage = (what, who) => {
  return `${what}, ${name}!`;
};

sayMessage('Hello', 'World'); // => 'Hello, World!'
```

Arrow function syntax is attractive because you can define functions shorter than a [function expression](/6-ways-to-declare-javascript-functions/#2-function-expression). There are cases when you can completely omit:  

* parameters parenthesis `(param1, param2)`
* `return` keyword 
* or even curly braces `{ }`.  

Let's explore how to make arrow functions short and straightforward to read. Plus I'll describe some tricky shortening cases to be aware of.   

## 1. Base extended syntax

An arrow function declaration in its extended version consists of:

* a pair of parenthesis with the params enumerated `(param1, param2)`
* followed by an arrow `=>`
* and finally the function body `{ FunctionBody }`

Simply, the function would looks as follows:  

```javascript
const myArrowFunction = (param1, param2) => {
  let someResult = param1;
  // ...
  return someResult;
};
```

Note that you can't put a newline between the parameters `(param1, param2)` and the arrow `=>`.  

The example that defines `sayMessage` presented in the introduction is the extended version of the arrow function.  

## 2. Reducing parameters parenthesis

The following function has just one parameter:

```javascript
const greet = (who) => {
  return `${who}, Welcome!`
}

greet('Aliens'); // => "Aliens, Welcome!"
```

`greet` arrow function has only one parameter `who`.  

When the arrow function has only one parameter, you can ommit the parameters parenthesis. Let's shorten `greet` function:

```javascript{1}
const greetNoParenthesis = who => {
  return `${who}, Welcome!`
}

greetNoParenthesis('Aliens'); // => "Aliens, Welcome!"
```

The new version of the arrow function `greetNoParenthesis` doesn't have parenthesis around its single parameter `who`.  

### 2.1 Be aware of default param  

If the arrow function has one parameter, but it has a default value, you cannot ommit the parenthesis:

```javascript
const greetDefParam = (who = 'Martians') => {
  return `${who}, Welcome!`
}

greetDefParam(); // => "Martians, Welcome!"
```

### 2.2 Be aware of param destructuring

The same applies to destructring a parameter: you must keep the parameters parenthesis.

```javascript
const greetDestruct = ({ who }) => {
  return `${who}, Welcome!`;
}

const 
```

## 3. Reducing curly braces

### 3.1 Be aware of object literal

## 4. Reducing return keyword



## 5. Concise is not always readable

## 6. Conclusion