---
title: '5 Best Practices to Write Quality Arrow Functions'
description: 'Best practices to write better and quality JavaScript arrow function.'
published: '2020-01-28T12:00Z'
modified: '2020-01-28T12:0Z'
thumbnail: './images/quality-2.png'
slug: javascript-arrow-functions-best-practices
tags: ['javascript', 'arrow function', 'es2015']
recommended: ['when-not-to-use-arrow-functions-in-javascript', '6-ways-to-declare-javascript-functions']
type: post
commentsThreadId: javascript-arrow-functions-best-practices
---

The arrow function syntax is a popular way to define functions in JavaScript. Its popularity is deserved. The arrow function is short and concise, binds `this` lexically, fits great as a callback function.  

In this post you'll read 5 best practices to get even more benefits from the arrow functions.  

## 1. Arrow function name inference

The arrow function in JavaScript is an anonymous function. Which means that the `name` property of an arrow function is an empty string:

```javascript
( number => number + 1 ).name; // => ''
```

During a debug session or call stack analysis the anonymous functions are marked as `Anonymous`. That could be an issue because such function names give you no clue about the code being executed.  

The following picture shows a debug session of a code that uses anonymous arrow functions: 

![Anonymous arrow functions call stack](/images/anonymous-arrow-functions-3.png)

The call stack on the right side consists of 2 functions. But being marked as anonymous, it takes effort to understand the control flow or generally what happens here.  

Fortunately, the *function name inference* feature is helpful to put a name on the arrow functions. JavaScript can determine the arrow function name from its syntactic position.  

Let's try to help JavaScript determine the function name. In the following code snippet the variable `increaseNumber` holds the arrow function:

```javascript
const increaseNumber = number => number + 1;

increaseNumber.name; // => 'increaseNumber'
```

The function name inference takes place and the arrow function now has the name `'increaseNumber'`.  

> A good practice is to use function name inference to create named arrow functions.

Now let's check a debug session with arrow functions whose names are inferred:

![Anonymous arrow functions call stack](/images/named-arrow-functions-2.png)

When the arrow functions have names, the call stack gives more information about the execution of the application. 

`handleButtonClick` function name indicates that a click event had happened. Then a call to `increaseCounter` had been done, which seem to increase a counter variable.  

## 2. Inline when possible

An inline function is one which body consists of one expression only. I especially like about arrow functions the ability to create create short inline functions.  

For example, instead of using the long form of an arrow function:

```javascript
const array = [1, 2, 3];

array.map((number) => { 
  return number * 2;
});
```

You could easily remove the curly braces `{ }` and `return` statement when the arrow function has one expression:

```javascript
const array = [1, 2, 3];

array.map(number => number * 2);
```

Here's my advice:

> When the function has one expression, a good practice is to use an inline arrow function.

## 3. Fat arrow and comparison operators

The comparison operators `>`, `<`, `<=` and `>=` look similar to the fat arrow `=>` that defines the arrow function.  

When these comparison operators are used in an inline arrow function, it creates some confusion.

Let's define an arrow function that makes zero any negative number:

```javascript
const negativeToZero = number => number <= 0 ? 0 : number;
```

The presence of both symbols `=>` and `<=` on the same line might is misleading.  

To make your intent more clear, the first option is to wrap the expression into a pair of parentheses:

```javascript
const negativeToZero = number => (number <= 0 ? 0 : number);
```

The second option is to deliberately define the arrow function using the longer form:

```javascript
const negativeToZero = number => {
  return number <= 0 ? 0 : number;
}
```

These refactorings eliminate the confusion between fat arrow symbol and comparison operators.  

> If the arrow function contains the operators `>`, `<`, `<=` and `>=`, a good practice is to wrap the expression into a pair of parentheses or deliberately use a longer arrow function form.  

## 4. Constructing plain objects

Using an object literal inside of an inline arrow function could be a problem:

```javascript
const array = [1, 2, 3];

// throws SyntaxError!
array.map(number => { 'number': number });
```

JavaScript considers the curly braces as a code block, rather than an object literal.  

> A good practice when using object literals inside inline arrow function is to wrap them into a pair of parentheses.  

This problem is solved when the object literal is wrapped into parentheses:  

```javascript
const array = [1, 2, 3];

// Works!
array.map(number => ({ 'number': number }));
```

Note that you could also use an alternative form, by specifying the properties in a new line. This form might be more readable:

```javascript
const array = [1, 2, 3];

// Works!
array.map(number => ({
  'number': number
}));
```

## 5. Be aware of excessive nesting

The syntax of the arrow function is short at the same time, which is good. But as a side effect it could be cryptic when nesting many arrow function.  

Let's consider the following scenario. When a button is clicked, a request to server is started, and when the response is ready the items are logged to console.  

```javascript
myButton.addEventListener('click', () => {
  fetch('/items.json')
    .then(response => response.json();
    .then(json => {
      json.forEach(item => {
        console.log(item.name);
      })
    });
});
```

In the above code snippet, 3 levels of nesting of the functions is present. It takes effort and time to understand what the code does.  

When the arrow functions are nested, to increase redability, the first approach is to introduce variables that hold each arrow function. The variable should describe concisely what the function does (see [arrow function name inference](#1-arrow-function-name-inference) best practice).  

```javascript
const readItemsJson = json => {
  json.forEach(item => console.log(item.name));
};

const handleButtonClick = () => {
  fetch('/items.json')
    .then(response => response.json();
    .then(readItemsJson);
};

myButton.addEventListener('click', handleButtonClick);
```

This version is refactored by extracting the arrow functions into variables `readItemsJson` and `handleButtonClick`. The level of nesting also decreased from 3 to 2. Now, it easier to understand what the script does.  

Even better you could refactor the entire function to use `async/await` syntax, which is a great way to solve the nesting of functions:  

```javascript
const handleButtonClick = async () => {
  const response = await fetch('/items.json');
  const json = await response.json();
  json.forEach(item => item.name);
};

myButton.addEventListener('click', handleButtonClick);
```

Resuming:

> A good practice is to avoid excessive nesting of arrow functions by extracting them into variables as separate functions, or embrace better features like `async/await` syntax.  

## 6. Conclusion

The arrow functions in JavaScript are anonymous. To make your debugging more productive, a good practice is to use variables to hold the arrow functions, which would allow JavaScript to infer the function name.  

An inline arrow function is handy when the function body has one expression.  

The operators `>`, `<`, `<=` and `>=` look similar to the fat arrow `=>`. Care must be taken when these operators are used inside inline arrow functions.  

The object literal syntax `{ prop: 'value' }` is similar to a code of block `{}`. That's why when the object literal is used inside an inline arrow function, you need to wrap it into a pair of parentheses: `() => ({ prop: 'value' })`.  

Finally, the excessive nesting of functions obscures the code intent. Especially with arrow functions, which are somehow cryptic by themeselves. A good approach to reduce the arrow functions nesting is to try to extract them into variables. And if possible, you might try to use even more powerful features like `async/await` syntax.  

*What best practices do you use with arrow functions?*