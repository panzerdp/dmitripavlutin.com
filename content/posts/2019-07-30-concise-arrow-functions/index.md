---
title: Recipes of Concise Arrow Functions in JavaScript
description: Useful tips on how to write consice arrow functions in JavaScript.
published: "2019-07-30"
modified: "2019-07-30"
thumbnail: "./images/arrows.jpg"
slug: concise-arrow-functions-javascript
tags: ['javascript', 'arrow function', 'es2015']
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
};

greet('Aliens'); // => "Aliens, Welcome!"
```

`greet` arrow function has only one parameter `who`.  

When the arrow function has only one parameter, you can ommit the parameters parenthesis. Let's shorten `greet` function:

```javascript
const greetNoParenthesis = who => {
  return `${who}, Welcome!`
};

greetNoParenthesis('Aliens'); // => "Aliens, Welcome!"
```

The new version of the arrow function `greetNoParenthesis` doesn't have parenthesis around its single parameter `who`.  

### 2.1 Be aware of default param  

If the arrow function has one parameter, but it has a default value, you must keep the parenthesis:

```javascript
const greetDefParam = (who = 'Martians') => {
  return `${who}, Welcome!`
};

greetDefParam(); // => "Martians, Welcome!"
```

`who` parameter has a default value `'Martians'`. In such case you must keep the pair of parenthesis around the single parameter: `(who = 'Martians')`.

### 2.2 Be aware of param destructuring

The same applies to destructring a parameter: don't skip the parameters parenthesis.

```javascript
const greetDestruct = ({ who }) => {
  return `${who}, Welcome!`;
};

const race = {
  planet: 'Jupiter',
  who: 'Jupiterians'
};

greetDestruct(race); // => "Jupiterians, Welcome!"
```

The only parameter of the function uses destructuring `{ who }` to access the object's property who. In this case you must also wrap the destructuring in parenthesis: `({ who })`.

### 2.3 No parameters

When the function has no parameters, you must keep the parenthesis as well:

```javascript
const greetEveryone = () => {
  return 'Everyone, Welcome!';
}

greetEveryone(); // => "Everyone, Welcome!"
```

`greetEveryone` doesn't have any paremeters. The params parenthesis are kept.  

## 3. Reducing curly braces and return

When the arrow function body consists of only one expression, you can remove the curly braces and `return` keyword.  

Let's simplify `greetNoParenthesis` function (defined in [2.](#2-reducing-parameters-parenthesis)) by removing the curly braces `{ }` and `return`:  

```javascript
const greetConcise = who => `${who}, Welcome!`;

greetConsice('Friends'); // => "Friends, Welcome!"
```

`greetConcise` is the shortest version of the arrow function syntax.  

### 3.1 Be aware of object literal

When using the shortest arrow function syntax, and returning an object literal, you might see an unexpected result.

Let's see what would happen in such case:

```javascript
const greetObject = who => { message: `${who}, Welcome!` };

greetObject('Klingons'); // => undefined
```

While it could be expected that `greetObject` to return an object, it actually returns `undefined`. 

The problem is that JavaScript interprets the curly braces as a function body delimiter, rather than an object literal. `message: ` is interpreted as a [label identifier](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/label), rather than a property.  

To make JavaScript return an object, wrap the object literal into a pair of parenthesis:

```javascript
const greetObject = who => ({ message: `${who}, Welcome!` });

greetObject('Klingons'); // => { message: `Klingons, Welcome!` }
```

```({ message: `${who}, Welcome!` })``` is explicitly written as an expresion. Now JavaScript understands the expression containing an object literal.  

## 4. Fat arrow method

[Class Fields Proposal](https://github.com/tc39/proposal-class-fields) (as of August 2019 at stage 3) introduces the fat arrow method syntax to classes. I find it convinient that fat arrow binds `this` lexically to the class instance.  

Let's see a class `Greet` containing a method defined using the fat arrow syntax:

```javascript
class Greet {
  constructor(what) {
    this.what = what;
  }
  getMessage = (who) => {
    return `${who}, ${this.what}!`;
  }
}
const welcome = new Greet('Welcome');
welcome.getMessage('Romulans'); // => 'Romulans, Welcome!'
```

`getMessage` is a method defined as a  in `Greet` class using the fat arrow syntax. `this` inside `getMessage` method always binds to the class instance.  

Can you write consice fat arrow methods? Yes, you can!

Let's shorten `getMessage` method:

```javascript
class Greet {
  constructor(what) {
    this.what = what;
  }
  getMessage = who => `${who}, ${this.what}!`
}
const welcome = new Greet('Welcome');
welcome.getMessage('Romulans'); // => 'Romulans, Welcome!'
```

```getMessage = who => `${who}, ${this.what}!` ``` is a concise fat arrow method definition. The pair of perenthesis around its single param `who` was ommited, as well as the curly braces `{ }` and `return` keyword.  

## 5. Concise is not always readable

I enjoy the consice arrow functions for the ability to instantly show what the function does.  

```javascript
const numbers = [1, 4, 5];
numbers.map(x => x * 2); // => [2, 8, 10]
```
`x => x * 2` easily implies a function that multiplies a number by `2`.

While it might be tempting to use the short syntax as much as possible, it must be done wisely.  

I shorten the functions as long as it increases readability. Otherwise, it's ok to keep the curly braces and `return` keyword.  

Let's define a concise factory function:

```javascript 
const multiplyFactory = m => x => x * m;

const double = multiplyFactory(2);
double(5); // => 10
```
While `multiplyFactory` is short, it might be difficult to understand at first glance what it does.  

In such case, I would avoid the shortest syntax and make the function definition a bit longer:

```javascript
const multiplyFactory = m => { 
  return x => x * m;
};

const double = multiplyFactory(2);
double(5); // => 10
```

In the longer form, `multiplyFactory` is easier to understand that it returns an arrow function. 

Anyways, you can have your own taste. But I personally prioritize readability over passionate shortening.  

## 6. Conclusion

The arrow function is known for its ability to provide short definitions.  

Under the recipes presented above, you can shorten the arrow function by removing the params parenthesis, curly braces  or `return` keyword.  

Good news are that you can use these recipes with the upcoming fat arrow method in classes.  

In my opinion, shortening is good as long as it increases readability. If you have many nested arrow functions, it might be wisely to avoid the shortest possible forms.  

*Do you think concise arrow functions are good or bad for readability? Feel free to leave a comment!*