---
title: "5 Must-Know Tips about console.log()"
description: 'console.log() can do more than you think.'
published: '2020-03-17T12:00Z'
modified: '2020-03-17T12:00Z'
thumbnail: './images/import-module-twice-2.png'
slug: console-log-tips
tags: ['javascript', 'debugging']
recommended: ['javascript-modules-best-practices', 'javascript-utility-libraries']
type: post
commentsThreadId: console-log-tips
---

The first tool in debugging JavaScript code is the `console.log()` logging function. 

It's usage is simple. The argument on function invokation is logged to console:

```javascript
// Log a message
console.log('My message');

const myVar = 13;
// Log a variable
console.log(myVar);
```

This post suggests 5 useful tips that will make you even more productive when using `console.log()`.

## 1. String formatting

The most common way to log something to console is to simply call `console.log()` with one argument:

```javascript
console.log('My message');
// logs "My message"
```

But sometimes you might want to a message containing multiple variables. For such cases `console.log()` offers a possibility to format the string using an `sprintf()` way.  

For example, let's format and then log a message:

```javascript
const user = 'john_smith';
const attemps = 5;

console.log('%s failed to login %i times', user, attemps);
// logs "john_smith failed to login 5 times"
```

`%s` and `%i` are replaced with values of `user` and `attemps`. The specifier `%s` is converted to a string, while `%i` is converted to a number.  

Here's a list of available specifiers:

| Specifier    |	  Purpose                                                        |
|--------------|-------------------------------------------------------------------|
| `%s`         |  Element is converted to a string                                 |
| `%d` or `%i` |  Element is converted to an integer                               |
| `%f`	       |  Element is converted to a float                                  |
| `%o`	       |  Element is displayed with optimally useful formatting            |
| `%O`	       |  Element is displayed with generic JavaScript object formatting   |
| `%c`         |  Applies provided CSS                                             |


## 2. Distinguish logged variables



## 3. Log with style

## 4. Interactive logs

### 4.1 Objects

### 4.2 Arrays

### 4.3 DOM trees

## 5. Deep object log in Node console