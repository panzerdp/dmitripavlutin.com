---
title: Don't Use JavaScript Variables Without Knowing Temporal Dead Zone
description: Temporal Dead Zone manages the availability of variables and classes declaration in JavaScript.
published: '2019-10-01T13:00Z'
modified: '2019-10-01T13:00Z'
thumbnail: './images/hourglass.jpg'
slug: javascript-variables-and-temporal-dead-zone
tags: ['javascript', 'variable', 'function', 'class']
recommended: ['use-react-memo-wisely', '7-architectural-attributes-of-a-reliable-react-component']
type: post
commentsThreadId: temporal-dead-zone-in-javascript
---

Let me ask you a simple question. Which of the following code snippets will generate an error?

The first one that creates a class instance, then defines the class:

```javascript
new Car('red'); // Does it work?

class Car {
  constructor(color) {
    this.color = color;
  }
}
```

Or the second one that first invokes, then defines the function?

```javascript
greet('World'); // Does it work?

function greet(who) {
  return `Hello, ${who}!`;
}
```

The correct answer: the first snippet defining a class generates a `ReferenceError`. While the second works correctly.

If your answer is different than the above, then you need to grasp the _Temporal Dead Zone_ (TDZ), introduced in ES2015. It's an essential concept that manages the availability of `let`, `const`, `class`, and `import` module statements.

## 1. What is _Temporal Dead Zone_

Let's start with a simple `const` variable declaration. If you first declare and initialize the variable, then access it, everything works as expected:

```javascript
const white = '#FFFFFF';

white; // => '#FFFFFF'
```

But if you try to use the variable before declaration, you will get a `ReferenceError`:

```javascript{1}
white; // throws `ReferenceError`

const white = '#FFFFFF';

white;
```

In the lines of code until `const count = 4` statement, the variable `count` is in TDZ. Having `count` accessed in TDZ, JavaScript throws `ReferenceError: Cannot access 'count' before initialization`.

## 2. Statements affected by TDZ

TDZ is good because it enforces a quality discipline over declaration statements: _don't use anything before declaring it_.

Let's see the list of statements is affected by TDZ.

### 2.1 _const_ variables

As seen already, `const` variable is in TDZ before the declaration and initializtion line:

```javascript{2}
// Does not work!
pi; // throws `ReferenceError`

const pi = 3.14;
```

Use `const` variable after the declaration:

```javascript{4}
const pi = 3.14;

// Works!
pi; // => 3.14
```

### 2.2 _let_ variables

`let` declaration statement is as well affected by TDZ until the declaration line:

```javascript{2}
// Does not work!
count; // throws `ReferenceError`

let count;

count = 10;
```

Again, use `let` variable only after the declaration:

```javascript{4,9}
let count;

// Works!
count; // => undefined

count = 10;

// Works!
count; // => 10
```

### 2.3 _class_ statement

As seen in the introduction, you cannot use the `class` before defining it:

```javascript{2}
// Does not work!
const myNissan = new Car('red'); // throws `ReferenceError`

class Car {
  constructor(color) {
    this.color = color;
  }
}
```

Move the class usage after the definition:

```javascript{8}
class Car {
  constructor(color) {
    this.color = color;
  }
}

// Works!
const myNissan = new Car('red');
myNissan.color; // => 'red'
```

### 2.4 _import_ module statement

When using ES2015 modules system, it doesn't make much sense to use the module before importing it:

```javascript{2}
// Does not work!
myFunction(); // throws `ReferenceError`

import { myFunction } from './myModule';
```

It's reasonable to keep the module dependencies at the beginning of the file since it makes clear about the external dependencies right away:

```javascript{4}
import { myFunction } from './myModule';

// Works!
myFunction(); // throws `ReferenceError`
```

## 3. _var_ and _function_ statements

Contrary to the statements presented above, `var` and `function` definition are not affected by TDZ. They are hoisted up in the current scope.

If you access `var` variable before the declaration, you simply get an `undefined`:

```javascript{2}
// Works, but don't do this!
value; // => undefined

var value;
```

However, a function can be used regarding where it is defined:

```javascript{2,9}
// Works!
greet('World'); // => 'Hello, World!'

function greet(who) {
  return `Hello, ${who}!`;
}

// Works!
greet('Earth'); // => 'Hello, Earth!'
```

When using functions, sometimes it makes sense to use them before the declaration.

## 4. _typeof_ behavior in TDZ

`typeof` operator is useful to determine whether a variable is defined within the current scope.

For example, the variable `notDefined` is not defined. Using it with `typeof` operator does not generate an error:

```javascript
typeof notDefined; // => 'undefined'
```

But `typeof` operator has a different behavior when used with variables in a Temporal Dead Zone. In this case, JavaScript throws an error:

```javascript{1}
typeof definedLater; // throws `ReferenceError`

let definedLater;
```

## 5. TDZ acts within the current scope

The Temporal Dead Zone effect is applied to variables within the limits of the current scope.

Let's see an example:

```javascript{3,6}
// Outer scope
typeof variable; // => undefined
{
  // Inner scope
  typeof variable; // throws `ReferenceError`
  let variable;
}
```

There are 2 block scopes: the inner one where a `let` variable is defined, and the outer one.

In the inner scope, because it is used before the variable declaration, `typeof variable` statement throws an error `ReferenceError: Cannot access 'variable' before initialization`.

However, in the outer scope, `typeof variable` simply evaluates to `undefined`. In the outer scope, the TDZ has no effect.

## 6. Conclusion

TDZ is an important concept that affects the availability of `const`, `let`, `class` and `import` statements. Its idea is simple: first declare, then use.

Contrary, `var` variables inherit an older error-prone behavior when you can use the variable even before the declaration. You should avoid doing that.

In my opinion, TDZ is one of those good things when good coding practices reach almost into the language specification.
