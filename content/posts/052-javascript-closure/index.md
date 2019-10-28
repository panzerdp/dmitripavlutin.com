---
title: A Simple Explanation of JavaScript Closures
description: A closure is a function that captures variables from the place where it is defined (or its lexical scope).  
published: '2019-10-25T04:00Z'
modified: '2019-10-25T04:00Z'
thumbnail: './images/bulb.jpg'
slug: simple-explanation-of-javascript-closures
tags: ['javascript', 'closure']
recommended: ['6-ways-to-declare-javascript-functions', 'when-not-to-use-arrow-functions-in-javascript']
type: post
commentsThreadId: explanation-of-javascript-closures
---

Every JavaScript developer should understand closures. Thanks to closures, the callbacks, event handlers, higher-order functions can access outer scope variables.  

While closures are everywhere, they could be difficult to grasp. Closures, like recusion, require an "Aha!" moment.  

In this post, I will start with the terms fundamental to closures. Then, after grasping the basics, it will be easier to understand the closure itself.  

A nice bonus awaits at the end: the closure concept explained with a real world example.  

## 1. The scope

> *The scope* defines the boundaries within which variables exists.  

Any variable exists within the limits of a *scope*.  

You are free to access the variable defined within its scope.  However, outside of its  scope, the variable is not accessible.

The body of the function `foo()` is the scope where the variable `count` exists:

```javascript{4,8}
function foo() {
  // The function scope
  let count = 0;
  console.log(count); // logs 0
}

foo();
console.log(count); // ReferenceError: count is not defined
```

`count` is freely accessed within the scope of `foo()`.  

However, outside of `foo()` scope, the same variable `count` is not accessible. If you try to access `count` from outside anyways, JavaScript throws `ReferenceError: count is not defined`.  

Furthermore, 2 different scopes can have *variables with the same name*. You can reuse common variable names (`count`, `index`, `current`, `value`, etc) in different scopes without worrying about collision.  

`foo()` and `bar()` function scopes have their own, but same named, variable `count`:

```javascript{4,10}
function foo() {
  // "foo" function scope
  let count = 0;
  console.log(count); // logs 0
}

function bar() {
  // "bar" function scope
  let count = 1;
  console.log(count); // logs 1
}

foo();
bar();
```

`count` variables from `foo()` and `bar()` function scopes do not collide.  

**Types of scopes**

JavaScript has 2 kinds of scopes:

1. A function scope

```javascript{2-4}
function foo() {
  // function scope
  const pi = 3.14;
  // ...
}
```

2. A block scope (only `let` and `const`, but not `var`)

```javascript{2-4,8-10,14-16}
if (isValid) {
  // block scope
  const message = 'Data is validated';
  // ...
}

while (items.length !== 0) {
  // block scope
  let items = [];
  // ...
}

{
  // block scope
  let result = '';
  // ...
}
```

## 2. The lexical scope

Ok. Variables defined inside a function are limited to this function's scope.  

Now let's nest the function `innerFunc()` inside an outer function `outerFunc()`:

```javascript
function outerFunc() {
  let message = 'Hello, World!';

  function innerFunc() {
    let count = 0;
  }

  foo();
}

bar();
``` 

How would the 2 function scopes interract with each other? Can I access the variable `message` from within `innerFunc()` scope?  

```javascript{6}
function outerFunc() {
  let message = 'Hello!';

  function innerFunc() {
    let count = 0;
    console.log(message); // => logs "Hello!"
  }

  foo();
  console.log(count); // ReferenceError: count is not defined
}

bar();
```

Yes, `message` variable is accessible inside `innerFunc()` scope. Thus *the inner scope can access the outer scope*. 



## 3. The closure

The following code defines a factory function `createIncrement(i)` that returns an increment function. Later, every time the increment function is called, an internal counter is incremented by `i`:

```javascript
function createIncrement(i) {
  let value = 0;
  function increment() {
    value += i;
    return value;
  }
  return increment;
}

const inc = createIncrement(1);
inc(); // => 1
inc(); // => 2
```

`createIncrement(1)` returns an increment function, which is assigned to `inc` variable. When `inc()` is called, the `value` variable gets incremented by `1`.  

The first call of `inc()` returns `1`, the second call returns `2`, and so on.  

Did you spot the interesting thing? You simply call `inc()`, without arguments, but JavaScript still knows the current `value` and how much to increment `i`. How does it work? 

The answer lays inside `createIncrement()`. There you will find `increment()` function: the closure that does the magic. The closure captures (or closes over, or simply remembers) the variables `value` and `i` from the lexical scope.  

The *lexical scope* is the outer scope *where the closure is defined*. In the example, the lexical scope of `increment()` is the scope of `createIncrement()`, which contains variables `value` and `i`.  

![The lexical scope in JavaScript](./images/lexical-scope-2.png)

No matter where `inc()` is called, even outside the scope of `createIncrement()`, it has access to `value` and `i`.  

> *The closure* is a function that can remember and modify variables from its lexical scope, regardless of execution scope.  

Continuing the example, `inc()` can be called anywhere else, even inside an async callback:  
```javascript{2,7}
(function() {
  inc(); // => 3
}());

setTimeout(function() {
  // after 1 second
  inc(); // => 4
}, 1000);
```

## 4. Real world example of closure

I know closures might be difficult to grasp. But once you *get it*, it's forever. 

You can model them in your mind the following way. 

Imagine a magical paintbrush with an interesting property. If you paint with it some objects from real life, then the painting becomes a window you can interact with.  

![Painting as a model of JavaScript closures](./images/rose.jpg)

Through this window, you can move the painted objects with your hands.  

Moreover, you can carry the magical painting anywhere, even far from the place where you've painted the objects. From there, through the magical painting as a window, you can still move the objects with your hands.  

The magical painting is a *closure*, while the painted objects are the *lexical scope*.  

Isn't JavaScript magic? &#x263a;

## 5. Conclusion

A closure is a function that captures variables from the place where it is defined (or its lexical scope).  

You can imagine the closure as a magical painting through which you can modify objects.   

The closure is an important concept that every JavaScript developer should know.  

*If you know other meaningful mental models of closures, please share in a [comment](#disqus_thread) below!*