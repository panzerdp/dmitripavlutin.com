---
title: Arrow Functions Shortening Recipes in JavaScript
description:  How to shorten arrow functions in JavaScript to increase the readability of your code.
published: "2019-07-30T13:00Z"
modified: "2019-07-30T13:00Z"
thumbnail: "./images/arrows.jpg"
slug: javascript-arrow-functions-shortening-recipes
tags: ['javascript', 'arrow function', 'es2015']
recommended: ["6-ways-to-declare-javascript-functions", "when-not-to-use-arrow-functions-in-javascript"]
type: post
---

With fat arrow syntax you can define functions shorter than a [function expression](/6-ways-to-declare-javascript-functions/#2-function-expression). There are cases when you can completely omit:  

* parameters parentheses `(param1, param2)`
* `return` keyword 
* or even curly braces `{ }`.  

Let's explore how to make arrow functions concise and straightforward to read. Plus you'll find some tricky shortening cases to be aware of.   

## 1. Basic syntax

An arrow function declaration in its full version consists of:

* a pair of parentheses with the params enumerated `(param1, param2)`
* followed by an arrow `=>`
* ended with the function body `{ FunctionBody }`

A typical arrow function looks as follows:  

```javascript
const sayMessage = (what, who) => {
  return `${what}, ${who}!`;
};

sayMessage('Hello', 'World'); // => 'Hello, World!'
```

One small nuance here: you can't put a newline between the parameters `(param1, param2)` and the arrow `=>`.  

Let's see how the arrow function can be shortened, making the function easy to read, almost inline. Such readability is convinient when dealing with callbacks.  

## 2. Reducing parameters parentheses

The following function `greet` has just one parameter:

```javascript
const greet = (who) => {
  return `${who}, Welcome!`
};

greet('Aliens'); // => "Aliens, Welcome!"
```

`greet` arrow function has only one parameter `who`. This parameter is wrapped in a pair of parentheses `(who)`.  

When the arrow function has only one parameter, you can omit the parameters parentheses. 

Let's use this possibility and simplify `greet`:  

```javascript
const greetNoParentheses = who => {
  return `${who}, Welcome!`
};

greetNoParentheses('Aliens'); // => "Aliens, Welcome!"
```

The new version of the arrow function `greetNoParentheses` doesn't have parentheses around its single parameter `who`. Two characters less: still a win.  

While this simplification is easy to grasp, there are a few exceptions when you have to keep the parentheses. Let's see these exceptions.  

### 2.1 Be aware of default param  

If the arrow function has one parameter with a default value, you must keep the parentheses.

```javascript
const greetDefParam = (who = 'Martians') => {
  return `${who}, Welcome!`
};

greetDefParam(); // => "Martians, Welcome!"
```

`who` parameter has a default value `'Martians'`. In such a case, you must keep the pair of parentheses around the single parameter: `(who = 'Martians')`.

### 2.2 Be aware of param destructuring

You must also keep the parentheses around a destructured parameter:  

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

The only parameter of the function uses destructuring `{ who }` to access the object's property `who`. In this case, you must wrap the destructuring in parentheses: `({ who })`.

### 2.3 No parameters

When the function has no parameters, the parentheses are required as well:

```javascript
const greetEveryone = () => {
  return 'Everyone, Welcome!';
}

greetEveryone(); // => "Everyone, Welcome!"
```

`greetEveryone` doesn't have any parameters. The params parentheses `()` are kept.  

## 3. Reducing curly braces and return

When the arrow function body consists of only one expression, you can remove the curly braces `{ }` and `return` keyword. 

Don't worry about omitting `return`. The arrow function implicitly returns the expression evaluation result.  

That's the simplification I like the most in the arrow function syntax.  

`greetConcise` function that doesn't have the curly braces `{ }` and `return`:  

```javascript
const greetConcise = who => `${who}, Welcome!`;

greetConcise('Friends'); // => "Friends, Welcome!"
```

`greetConcise` is the shortest version of the arrow function syntax. The expression ``` `${who}, Welcome!` ``` is implicitly returned, even without `return` being present.  

### 3.1 Be aware of object literal

When using the shortest arrow function syntax, and returning an object literal, you might experience an unexpected result.

Let's see what would happen in such case:

```javascript
const greetObject = who => { message: `${who}, Welcome!` };

greetObject('Klingons'); // => undefined
```

Being expected that `greetObject` returns an object, it actually returns `undefined`. 

The problem is that JavaScript interprets the curly braces `{ }` as function body delimiter, rather than an object literal. `message: ` is interpreted as a [label identifier](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/label), rather than a property.  

To make the function return an object, wrap the object literal into a pair of parentheses:

```javascript
const greetObject = who => ({ message: `${who}, Welcome!` });

greetObject('Klingons'); // => { message: `Klingons, Welcome!` }
```

```({ message: `${who}, Welcome!` })``` is an expression. Now JavaScript sees this as [an expression](https://2ality.com/2012/09/expressions-vs-statements.html) containing an object literal.  

## 4. Fat arrow method

[Class Fields Proposal](https://github.com/tc39/proposal-class-fields) (as of August 2019 at stage 3) introduces the fat arrow method syntax to classes. `this` inside such a method always binds to the class instance.  

Let's define a class `Greet` containing a fat arrow method:

```javascript{4-6}
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

`getMessage` is a method in `Greet` class defined using the fat arrow syntax. `this` inside `getMessage` method always binds to the class instance.  

Can you write concise fat arrow methods? Yes, you can!

Let's shorten `getMessage` method:

```javascript{4}
class Greet {
  constructor(what) {
    this.what = what;
  }
  getMessage = who => `${who}, ${this.what}!`
}
const welcome = new Greet('Welcome');
welcome.getMessage('Romulans'); // => 'Romulans, Welcome!'
```

```getMessage = who => `${who}, ${this.what}!` ``` is a concise fat arrow method definition. The pair of parentheses around its single param `who` was omitted, as well as the curly braces `{ }` and `return` keyword.  

## 5. Concise is not always readable

I enjoy concise arrow functions for the ability to instantly expose what the function does.  

```javascript
const numbers = [1, 4, 5];
numbers.map(x => x * 2); // => [2, 8, 10]
```
`x => x * 2` easily implies a function that multiplies a number by `2`.

While it might be tempting to use the short syntax as much as possible, it must be done wisely. Otherwise you might end up in a readability issue, especially in the case of multiple nested concise arrow functions.    

![JavaScript code Readability](./images/between-cables.jpg)

I favor readability over brevity, so sometimes I would deliberately keep the curly braces and `return` keyword.  

Let's define a concise factory function:

```javascript 
const multiplyFactory = m => x => x * m;

const double = multiplyFactory(2);
double(5); // => 10
```
While `multiplyFactory` is short, it might be difficult to understand at first glance what it does.  

In such a case, I would avoid the shortest syntax and make the function definition a bit longer:

```javascript
const multiplyFactory = m => { 
  return x => x * m;
};

const double = multiplyFactory(2);
double(5); // => 10
```

In the longer form, `multiplyFactory` is easier to understand that it returns an arrow function.  

Anyways, you might have your taste. But I advise you to prioritize readability over passionate shortening.  

## 6. Conclusion

The arrow function is known for its ability to provide short definitions.  

Using the recipes presented above, you can shorten arrow functions by removing the params parentheses, curly braces or `return` keyword.  

You can use these recipes with the upcoming fat arrow methods in classes.  

However, shortening is good as long as it increases readability. If you have many nested arrow functions, it might be wise to avoid the shortest possible forms.  

*What JavaScript shortening techniques do you know? Please write a comment below!*