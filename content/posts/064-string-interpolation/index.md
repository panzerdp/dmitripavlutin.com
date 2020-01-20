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
const string = `The number is ${number}`;

string; // => 'The number is 13'
```

Let's see in more detail and examples how to use template string to perform string interpolation in JavaScript.

## 1. The string literals

In JavaScript, there are 3 ways to create string literals.  

First, which I prefer for plain strings, is to wrap the string into a pair of single quotes `'`:

```javascript
const string = 'Hello, world!';
```

The second, which I use rarely, is to wrap the string into a pair of double quotes `"`:

```javascript
const string = "Hello, world";
```

The third, which permits string interpolation, is to wrap the string into a pair of backticks `` ` ``:

```javascript
const string = `Hello, world!`;
```



## 2. The placeholders

## 3. Escaping special characters

## 4. Conclusion