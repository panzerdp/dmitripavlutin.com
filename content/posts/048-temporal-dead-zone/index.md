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

The first one that first creates a class instance, then defines the class:

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

The correct answer: the first snippet, the one with a class, generates a `ReferenceError`. The second works correctly.

If your answer is different than the above, then you need to grasp the _Temporal Dead Zone_ (TDZ).

TDZ manages the availability of `let`, `const`, and `class` statements. It is essential to how variables work in JavaScript.

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

In the lines of code until `const count = 4` statement, the variable `count` is in TDZ.

Having `count` accessed in TDZ, JavaScript throws `ReferenceError: Cannot access 'count' before initialization`.

![Temporal Dead Zone in JavaScript](./images/temporal-dead-zone-in-javascript.png)

> _Temporal Dead Zone_ semantics forbids accessing a variable before its declaration.

TDZ enforces a quality discipline: _don't use anything before declaring it_.

## 2. Statements affected by TDZ

Let's see the statements affected by TDZ.

### 2.1 _const_ variables

As seen already, `const` variable is in TDZ before the declaration and initializtion line:

```javascript{2}
// Does not work!
pi; // throws `ReferenceError`

const pi = 3.14;
```

You have to use `const` variable after the declaration:

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

### 2.4 _super()_ inside _constructor()_

As a matter of precaution, before calling `super()`, the `this` binding is in TDZ:

```javascript{3-4,9}
class MuscleCar extends Car {
  constructor(color, power) {
    this.power = power;
    super(color);
  }
}

// Does not work!
const myCar = new MuscleCar('blue', '300HP'); // `ReferenceError`
```

Inisde `constructor()`, `this` cannot be used until `super()` is called.

That's a good thing because TDZ suggests you to call the parent constructor first to initialize the instance.

Just make sure to call `super()` before using `this`:

```javascript{3-4,9}
class MuscleCar extends Car {
  constructor(color, power) {
    super(color);
    this.power = power;
  }
}

// Works!
const myCar = new MuscleCar('blue', '300HP');
myCar.power; // => '300HP'
```

### 2.5 Default function parameters

The default parameters exist within an intermidiate scope, separated from global and function. Thus a default parameter variable is in TDZ before its declaration:

```javascript{6}
const a = 2;
function square(a = a) {
  return a * a;
}
// Does not work!
square(); // throws `ReferenceError`
```

The parameter `a` is used on the right side of the expression `a = a`, before being declared. This generates a reference error about `a` is not defined.

Make sure that the default parameter is used after its declaration and initialization. Let's use a special variable `init`, making sure it is initialized before usage:

```javascript{6}
const init = 2;
function square(a = init) {
  return a * a;
}
// Works!
square(); // => 4
```

## 3. _var_, _function_, _import_ statements

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

Often you're not interested much in the function implementation, but just want to invoke it. That's why sometimes it makes sense to invoke the function before defining it.

What's interesting that `import` modules are hoisted too:

```javascript{2}
// Works!
myFunction();

import { myFunction } from './myModule';
```

## 4. _typeof_ behavior in TDZ

`typeof` operator is useful to determine whether a variable is defined within the current scope.

For example, the variable `notDefined` is not defined. Using it with `typeof` operator does not generate an error:

```javascript
typeof notDefined; // => 'undefined'
```

Because the variable is not defined, `typeof notDefined` evaluates to `undefined`.

But `typeof` operator has a different behavior when used with variables in a Temporal Dead Zone. In this case, JavaScript throws an error:

```javascript{1}
typeof variable; // throws `ReferenceError`

let variable;
```

The reason behind the reference error is that you can statically (just by looking at code) determine that `variable` is already defined.

## 5. TDZ acts within the current scope

The Temporal Dead Zone affects the variable within the limits of the scope where the declaration statement is present.

![Limits of Temporal Dead Zone in JavaScript](./images/limits-of-temporal-dead-zone-javascript.png)

Let's see an example:

```javascript{3,6}
function doSomething(someVal) {
  // Function scope
  typeof variable; // => undefined
  if (someVal) {
    // Inner block scope
    typeof variable; // throws `ReferenceError`
    let variable;
  }
}
doSomething(true);
```

There are 2 scopes:

1. The function scope
2. The inner block scope where a `let` variable is defined

In the function scope, `typeof variable` simply evaluates to `undefined`. Here the TDZ of `let variable` statement has no effect.

In the inner scope the `typeof variable` statement, using a variable before the declaration, throws an error `ReferenceError: Cannot access 'variable' before initialization`. TDZ exists within this inner scope only.

## 6. Conclusion

TDZ is an important concept that affects the availability of `const`, `let`, and `class` statements. Its idea is simple: first declare, then use.

Contrary, `var` variables inherit an older behavior when you can use the variable even before the declaration. You should avoid doing that.

In my opinion, TDZ is one of those good things when good coding practices reach into the language specification.
