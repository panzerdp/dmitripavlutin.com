---
title: "5 Best Practices to Write Quality JavaScript Variables"
description: "5 best practices to write quality JavaScript variables."
published: "2020-12-01T12:00Z"
modified: "2020-12-01T12:00Z"
thumbnail: "./images/cover-2.png"
slug: javascript-variables-best-practices
tags: ['javascript', 'variable', 'clean code']
recommended: ['javascript-modules-best-practices', 'javascript-arrow-functions-best-practices']
type: post
---

Variables are everywhere. Even if you're writing a small function, or writing a big application: you always declare, assign, and read variables.  

Regarding good coding discipline, I would put the ability to correctly use variables at a higher level.  

So, if you'd like to improve the way you work with variables in JavaScript, and then enjoy the benefits of increased readability and maintainability of your code: then let's get started.  

In this post, you'll read about 5 best practices of how to declare and use JavaScript variables.

## 1. Prefer *const*, othewise use *let*

Usually I declare my JavaScript variables using `const` or `let`.  

 The main difference between `const` and `let` is that `const` always requires an initial value, and you cannnot reassign a value to `const` variable once initialized.  

```javascript
// const requires initialization
const pi = 3.14;
// const cannot be reassigned
pi = 4.89; // throws "TypeError: Assignment to constant variable"
```

```javascript
// let initialization is optional
let result;
// let can be reassigned
result = 14;
result = result * 2;
```

A good practice when choosing the declaration statement for variable is to *prefer `const`, otherwise use `let`.*  

Because `const` requires initialization and cannot be reassigned, it is much easier to reason about it compared to `let` variables.    

For example, if you're looking at a function body and see a `const` declaration:

```javascript{4}
function myBigFunction(param1, param2) {
  /* lots of stuff... */

  const result = otherFunction(param1);

  /* lots of stuff... */
  return something;
}
```

without knowing much about what happens inside `myBigFunction()` you can conclude that `result` variable is assigned once and then readonly variable.  

In other cases, if your variable has to be reassigned multiple times during execution, then `let` declaration is the way to go.  

## 2. Minimize lifetime and lifespace



## 3. As close as possible to usage

## 4. Good naming means easy reading

## 5. Add exlanatory variables

## 6. Summary