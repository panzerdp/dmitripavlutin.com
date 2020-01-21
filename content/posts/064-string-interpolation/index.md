---
title: 'String Interpolation in JavaScript'
description: 'How to use template literals to perform string interplation in JavaScript.'
published: '2020-01-21T14:00Z'
modified: '2020-01-21T14:00Z'
thumbnail: './images/once-upon-a-time.jpg'
slug: string-interpolation-in-javascript
tags: ['javascript', 'string', 'es2015']
recommended: ['what-every-javascript-developer-should-know-about-unicode', 'replace-all-string-occurrences-javascript']
type: post
commentsThreadId: string-interpolation-in-javascript
---

The string interpolation is the process of evaluating a string literal containing placeholders that during evaluation are replaced with corresponding values. 

In JavaScript (starting ES2015), the template literals and `${expression}` as placeholder implement the string interpolation:

```javascript
const number = 13;
const message = `The number is ${number}`;

message; // => 'The number is 13'
```

Let's see in more detail with examples and best practices how to use template strings to perform string interpolation in JavaScript.

## 1. The string literals

In JavaScript, there are 3 ways to create string literals. 

First, which I prefer for plain strings, is to wrap the string into a pair of single quotes `'`:

```javascript
const message = 'Hello, World!';
```

The second, which I use rarely, is to wrap the string into a pair of double quotes `"`:

```javascript
const message = "Hello, World";
```

The third, which permits string interpolation, is to wrap the string into a pair of backticks `` ` ``:

```javascript
const message = `Hello, World!`;
```

The string literal wrapped in backticks `` ` `` is also named *template string*. Let's continue in the next section on how to use the template string placeholders. 

## 2. The placeholders

The template string supports placeholders to insert data into the string. 

The template string placeholder has a special format: `${expressionToEvaluate}`. Examples of placeholders are `${myVar}`, `${1 + 2}`, `${number + 1}`.

Here's an example:

```javascript{4}
const greeting = 'Hello';
const who = 'World';

const message = `${greeting}, ${who}!`;
message; // => 'Hello, World!'
```

`` `${greeting}, ${who}!` `` is a template string having placeholders `${greeting}` and `${who}`. 

On script execution, the first placeholder `${greeting}` is replaced with the value of `greeting` variable, and the same for `${who}`. The result of string interpolation is `'Hello, World!'`. 

The sky is the limit for the expression you can put inside the placeholder. It can be an operator, a function call, or even more complex expressions:

```javascript{4,10}
const n1 = 2;
const n2 = 3;

const message1 = `The sum is ${n1 + n2}`;
message1; // => 'The sum is 5';

function sum(num1, num2) {
  return num1 + num2;
}
const message2 = `The sum is ${sum(n1, n2)}`;
message2; // => 'The sum is 5'
```

`${n1 + n2}` is a placeholder consisting of the addition operator and 2 operands. `${sum(n1, n2)}` consists of a function invocation. In both cases, the expression is fully evaluated, and the result is inserted into the string. 

### 2.1 The placeholder is converted to a string

If the placeholder expression evaluation result is a type other than a string, then it is converted into a string. 

For example, a number in a placeholder is transformed into a string:

```javascript
const n = 3.5;
const message = `The number is ${n}`;

message; // => `The number is 3.5`
```

In the first step, the expression `n` of the placeholder `${n}` is evaluated to number `3.5`. The number `3.5` is then transformed into a string `'3.5'`, and inserted into the interpolation result: `'The number is 3.5'`.

If the placeholder contains an object, following the conversion to string rule, the object is converted to a string too. The `toString()` method of the object is called to transform it into a string.

For example, let's insert an array into a string:

```javascript
const numbers = [1, 2, 3];
const message = `The numbers are ${numbers}`;

message; // => 'The numbers are 1,2,3'
```

The placeholder `${numbers}` contains an array of numbers. 

`toString()` array method executes `array.join(',')` when the array is converted to string. Thus the string interpolation result is `'The numbers are 1,2,3'`. 

## 3. Escaping placeholders

Because the placeholder format `${expression}` has a special meaning in the template literals, you cannot use the sequence of characters `"${someCharacters}"` without escaping. 

For example, let's try to create a string literal containing the sequence of characters `${abc}`:

```javascript
const message = `Some weird characters: ${abc}`;
// Throws "ReferenceError: abc is not defined"
```

Inserting `${abc}` directly throws an error because JavaScript interprets `${abc}` as a placeholder. 

A backslash `\` before the placeholder-like sequence of characters `\${abc}` solves the problem:

```javascript
const message = `Some weird characters: \${abc}`;
message; // => 'Some weird characters follow: ${abc}'
```

In the template string `` `Some weird characters: \${abc}` `` JavaScript interprets `\${abc}` as a sequence of characters, rather than a placeholder. 

Alongside with `${abc}`, the sequence of characters like `${abc` and `${` also have to be escaped with a backslash `\`:

```javascript
const message = `Some weird characters: \${abc} \${abc \${`;

message; // => 'Some weird characters: ${abc} ${abc ${'
```

## 4. Best practices

### 4.1 Refactor string concatentation

The string interpolation replaces the string concatenation when constructing large strings. That's the benefit of string interpolation I like the most. 

If for some reason you're still concatenating string literals and expressions:

```javascript{3}
const n1 = 2;
const n2 = 3;
const message = 'The sum of ' + n1 + ' and ' + n2 + ' is ' + (n1 + n2);

message; // => 'The sum of 2 and 3 is 5'
```

Then it's the time to switch to string interpolation using template strings:

```javascript{3}
const n1 = 2;
const n2 = 3;
const message = `The sum of ${n1} + ${n2} is ${n1 + n2}`;

message; // => 'The sum of 2 and 3 is 5'
```

The template string usage requires less code and is easier to read. 

### 4.2 Single quotes in placeholders

The ternary operator inside a placeholder chooses to render a message based on a condition. 

I find that inside the placeholder it makes sense to use the string literals wrapped in single quotes `${condition ? 'string A' : 'string B'}`, because this form is easier to read. 

Here's an example:

```jsx{4}
// A React component

function LoadingMessage({ isLoading }) {
  const message = `Data is ${isLoading ? 'loading' : 'loaded' }`;

  return <div>{message}</div>;
}
```

The string literals `'loading'` and `'loaded'` are wrapped in single quotes, rather than backticks `` ` ``.

### 4.3 Helper variables

When the template string contains complex expressions, it might decrease the readability of the literal. 

Here's a template string having placeholders with complex expressions:

```javascript
const n1 = 2;
const n2 = 3;

const message = 
  `Sum: ${n1 + n2}, difference: ${n1 - n2}, pow: ${Math.pow(n1, n2)}`;

message; // => 'Sum: 5, difference: -1, pow: 8'
```

The more complex the placeholders are, the more it makes sense to add helper variables that store intermediate values. 

```javascript{4-6}
const first = 2;
const second = 3;

const sum = n1 + n2;
const diff = n1 - n2;
const pow = Math.pow(n1, n2);

const message = `Sum: ${sum}, difference: ${diff}, pow: ${pow}`;

message; // => 'Sum: 5, difference: -1, pow: 8'
```

With the introduction of additional helper variables `sum`, `diff` and `pow`, the template string becomes lighter. Additionally, the intermediate variables
self-document the code. 

### 4.4 Alternative solutions

The string interpolation is helpful in many situations. But when the template string becomes large and difficult to read, you should start looking for other solutions. 

The following component determines the CSS class based on multiple variables:

```jsx{3}
function LoadingMessage({ isLoading, isModal }) {
  const className = 
   `${isLoading ? 'loading' : ''} ${isModal ? 'modal' : ''}`;

  return (
    <div className={className}>
      {isLoading ? 'Loading...' : 'Done!'}
    </div>
  );
}
```

The template literal that determines the class name is difficult to understand. 

In this situation, I suggest avoiding the template strings in favor of the tool [classnames](https://github.com/JedWatson/classnames). It constructs the class name string
in a more expressive and declarative way. 

Let's refactor the component to use the classnames tool:

```jsx{4-7}
import classNames from 'classnames';

function LoadingMessage({ isLoading, isModal }) {
  const className = classNames({
    loading: isLoading,
    modal: isModal
  });

  return (
    <div className={className}>
      {isLoading ? 'Loading...' : 'Done!'}
    </div>
  );
}
```

This version of the component that uses the classnames tool is declarative and easy to understand. 

If you'd need to add another class (for example to handle `isErrorLoading`), the version that uses classnames grows without significantly affecting the readability. 

## 5. Conclusion

The string interpolation in JavaScript is implemented by the template strings. 

The template strings are defined by wrapping the sequence of characters into a pair of backticks `` `I'm template string` ``. The placeholders to insert values into the template string have the format `${expression}`, for example `` `The number is ${number}` ``. 

The string interpolation is a great feature. Its main use case is to insert values into string literals in a relatively short and readable manner. And avoid the clumsy string concatenation approach. 

Make sure not to overcomplicate the string literal. If the template string uses complex expressions, try to introduce intermediate variables to store the expressions before putting them into placeholders. 

I use string interpolation often in my code, and I recommend you do it too.