---
title: 5 JavaScript bad coding habits to unlearn right now
description: "To write quality JavaScript code don't use implicit type conversion, old JavaScript tricks, pollute scope with variables, and avoid undefined & null"
published: "2019-07-10"
modified: "2019-07-10"
thumbnail: "./images/cover.jpg"
slug: unlearn-javascript-bad-coding-habits
tags: ["javascript", "undefined", "clean code", "craftsmanship"]
recommended: ["the-art-of-writing-small-and-plain-functions", "make-your-javascript-code-shide-knockout-old-es5-hack"]
type: post
---

When reading JavaScript code, have you ever had the feeling:

* that you barely understand what the code does?  
* the code uses lots of JavaScript tricks?  
* the naming, coding style are rather random?

These are the signs of bad coding habits. 

In this post I describe 5 common bad coding habits in JavaScript. And importantly I will present my actionable recommendations how to get rid of these habits.  

## 1. Don't use implicit type conversion

JavaScript is a loosely typed language. If used correctly, this is a benefit because of the flexibility it gives you.   

Most of the operators `+ - * /  ==` (but not `===`) when working with operands of different types use implicit conversion of types.  

The statements `if (condition) {...}`, `while(condition) {...}` implicitly transform the condition to a boolean.  

The following examples rely on the implicit conversion of types. I bet you feel the confusion:  

```javascript
console.log("2" + "1");  // => "21"
console.log("2" - "1");  // => 1

console.log('' == 0);    // => true

console.log(true == []); // -> false
console.log(true == ![]); // -> false
```

Relying excessively on the implicit type coversion is a bad habit. First of all, it makes your code less stable in edge cases. Secondly, you increase the chance to introduce a bug that is difficult to reproduce and fix.  

Let's implement a function that gets the property of an object. If the property does not exist, the function returns a default value:

```javascript
function getProp(object, propertyName, defaultValue) {
  if (!object[propertyName]) {
    return defaultValue;
  }
  return object[propertyName];
}

const hero = {
  name: 'Batman',
  isVillain: false
};

console.log(getProp(hero, 'name', 'Unknown'));     // => 'Batman'
```

`getProp()` reads the value of the `name` property, which is `'Batman'`.  

What about trying to access `isVillian` property:

```javascript
console.log(getProp(villian, 'isVillian', true)); // => true
```
That's an error. Even if the `hero`'s property `isVillian` is `false`, the function `getProp()` return the incorrect `true`.  

It happens because the verification of property existence relies on implicit conversion to a boolean by the `if (!object[propertyName]) {...}`. 

These kind of errors are difficult to spot. To fix the function, verify explicitely the type of the value: 

```javascript{2}
function getPropFixed(object, propertyName, defaultValue) {
   if (object[propertyName] === undefined) {
     return defaultValue;
   }
   return object[propertyName];
}

const hero = {
  name: 'Batman',
  isVillain: false
};

console.log(getPropFixed(villian, 'isVillian', true)); // => false
```

`object[propertyName] === undefined` verifies exactly if the property accessor evaluates to `undefined`.  

Here's my advice: whenever possible, do not use implicit type conversions. Instead, make sure that variables and function parameters always have the same type. Use explicit type conversion when necessary.  

A list of best practices:

* Always use strict equality operator `===` to perform comparisons 
* Don't use loose equality operator `==`
* Addition operator `operand1 + operand2`: both operands should be numbers or both strings
* Arithmetic operators `- * / % **`: both operands should be numbers
* `if (condition) {...}`, `while (condition) {...}`, etc statements: `condition` should be a boolean

You might say that this approach requires writing more code... You're right! But with an explicit approach, you control the behavior of your code. Plus, the explicitness increases readability.   

## 2. Don't use old JavaScript tricks

What's interesting about JavaScript is its creators weren't expecting the language to become so popular.

The complexity of the applications built on JavaScript was increasing faster than the language evolution. This situation forced developers to use JavaScript hacks and workarounds, just to make things work.  

A classic example is searching whether an array contains an item. I've never liked to use `array.indexOf(item) !== -1` to check the presence of an item.  

ECMAScript 2015 and beyond are way more powerful. You can safely refactor a lot of tricks by using new language features.  

Refactor `array.indexOf(item) !== -1` in favor of the new ES2015 method `array.includes(item)` .  

Follow [my compiled list of refactorings](http://localhost:8000/make-your-javascript-code-shide-knockout-old-es5-hack/) to remove old hacks from your JavaScript code. 

## 3. Don't pollute the function scope

Before ES2015, JavaScript variables where function scoped. Because of that, you might have a bad habit of declaring all the variables as function scoped.

Let's look at an example:  
```javascript
function someFunc(array) {
  var index, item, length = array.length;
  /*
   * Lots of code
   */
  for (index = 0; index < length; index++) {
    item = array[index];
    // some code...
  }
  return someResult;
}
```
The variables `index`, `item` and `length` are function scoped. But they actually pollute the function scope, because they are necessary only inside the `for()` scope.  

With the introduction of block scope variables `let` and `const`, limit the life of your variables as much as possible. 

Let's clean up the function scope:

```javascript
function someFunc(array) {
  /*
   * Lots of code
   */
  const length = array.length;
  for (let index = 0; index < length; index++) {
    const item = array[index];
    // some 
  }
  return someResult;
}
```
`index` and `item` variables are limited to `for()` cycle block scope. `length` is moved near the place of its usage.  

The refactored code is easier to understand because the variables are not spread accross the entire function scope. They exist solely near the place of usage.  



## 4. If possible, avoid using undefined and null

Tony Hoare, inventor of ALGOL, once stated:

> *I call it my billion-dollar mistake...* [...] I was designing the first comprehensive type system for references in an object-oriented language. [...] But I couldn’t resist the temptation to put in a *null* reference, simply because it was so easy to implement. This has led to *innumerable errors, vulnerabilities, and system crashes,* which have probably caused a billion dollars of pain and damage in the last forty years.


The post ["The worst mistake of computer science"](https://www.lucidchart.com/techblog/2015/08/31/the-worst-mistake-of-computer-science/) goes in depth why `null` is damaging the quality of your code.  

## 5. Don't use casual coding style. Enforce a standard

What could be more daunting than reading code that has a random coding style. You never know what to expect!  

What if the codebase contains different coding styles of many developers? An assorted character graffiti wall.
 
![Different coding styles](./images/different-coding-styles.jpg)

Same coding style across the entire team and the application codebase is a requirement. It's a boost for the code readability.  

But I'll be honest with you. I'm lazy. When I'm on a deadline, or I'm about to commit  before going home - I might "forget" about styling my code.  

“Myself lazy” says to leave the code as is, and update later. But later means never.  

In order for "Myself rationale" to beat the "Myself lazy", enforce respecting the coding style.  



## 6. Conclusion

Writing quality and clean code requires discipline and overcome of the bad coding habits. 

Good coding habits produce an easy to understand, less buggy code. 