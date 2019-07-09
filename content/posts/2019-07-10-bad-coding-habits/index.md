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

Unfortunately, JavaScript is known for its bizzare way of performing some type conversions. 

The following examples illustrate the confusion:

```javascript
console.log("2" + "1");  // => "21"
console.log("2" - "1");  // => 1

console.log('' == 0);    // => true

console.log({} == true);          // => false
console.log(Boolean({}) == true); // => true
```

Relying excessively on the implicit type coversion is a bad habit. First of all, it makes your code less stable in edge cases. Secondly, you increase the chance to introduce a bug that is difficult to reproduce and fix.  

Here's my advice: stop using implicit type conversion. Always use explicit type conversion.  

@TODO Give an example of transforming implicit to explicit

You might say that this approach requires writing more code... You're right! But with explicit type conversion, you control the behavior of your code. Plus the explicitness increases the readability.   

## 2. Don't use old JavaScript tricks

What's interesting about JavaScript language is that its creators weren't expecting it will become so popular.

The complexity of the applications built on JavaScript was increasing faster than the language evolution. This situation forced developers to use JavaScript hacks and tricks, just to make things work.  

A classic example is searching whether an array contains a specific item. I've never liked to use `array.indexOf(item) !== -1` to check the presence of an item.  

That's not the case of today's JavaScript! ECMAScript 2015 and beyond JavaScript is way more powerful. You can safely refactor a lot of tricks by using the new language features.  

Instead of `array.indexOf(item) !== -1` trick use the corresponding `array.includes(item)` new method (available in ECMAScript 2015).  

Follow [my compiled list of refactorings](http://localhost:8000/make-your-javascript-code-shide-knockout-old-es5-hack/) to remove old hacks from your JavaScript code. 

## 3. Don't pollute scope with too many variables

How often do you look at a variable, but have difficulties in understanding how did it get here, and where was it defined?  

```javascript{6}
function myBigFunction(param1, param2) {
 /*
  * A Lot of code...  
  */
 if (somethingTrue) {
  increment++; // <----  Where is this taken from?
  if (increment > 10) {
    /*
     * A lot of code...  
     */
  }
  /*
   * A lot of code...  
   */
 }
}
```

If that's the case, then the function or block scope is polluted with too many variables. 

The solution is to make the life of your JavaScript variables as short as possible. 

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