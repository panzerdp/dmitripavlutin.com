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

Every JavaScript developer should understand closures. Thanks to closures, the callbacks, event handlers, higher-order functions can access outer scope variables. Functional programming wouldn't be possible without closures.   

While closures are widely used, they could be difficult to grasp. Closures, like recusion, require an "Aha!" moment.  

In this post, I will start with the terms fundamental to closures: scope and lexical scope. Then, after grasping the basics, it will be easier to understand the closure itself.  

A nice bonus awaits at the end: the closure concept explained with a real world example.  

## 1. The scope

When you define a variable (except a global one), you want it to exist for one purpose. E.g. an `index` variable makes sense to exist within a `for()` loop.  

The concept that manages the accessibility of variables is called *scope*. You are free to access the variable defined within its scope.  However, outside of its  scope, the variable is not accessible.  

In JavaScript, a scope is created by:

* A body of a function
* A code block

The function `foo()` defines a scope where `count` variable exists:

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

The scope is a space policy that dictates where you can or cannot access a variable. In JavaScript, if you've defined a variable inside of a function, then use it only within that function.  

Furthermore, different scopes can have *variables with the same name*. You can reuse common variables names (`count`, `index`, `current`, `value`, etc) in different scopes without collisions.  

`foo()` and `bar()` function scopes have their own, but same named, variables `count`:

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

## 2. Scopes nesting

Let's play a bit more with scopes, and put one scope into antother.  

The function `innerFunc()` is nested inside an outer function `outerFunc()`:

```javascript
function outerFunc() {
  let outerVar = 'I am outside!';

  function innerFunc() {
    let innerVar = 'I am inside!';
  }

  innerFunc();
}

outerFunc();
``` 

How would the 2 function scopes interract with each other? Can I access the variable `outerVar` from within `innerFunc()` scope?  

```javascript{6,10}
function outerFunc() {
  let outerVar = 'I am outside!';

  function innerFunc() {
    let innerVar = 'I am inside!';
    console.log(outerVar); // => logs "I am outside!"
  }

  innerFunc();
}

outerFunc();
```

`outerVar` variable is accessible inside `innerFunc()` scope. *The inner (aka nested) scope can access the outer scope*.  

## 3. The lexical scope

How does JavaScript understand that `outerVar` inside `innerFunc()` corresponds to the variable `outerVar` of `outerFunc()`? 

It's because JavaScript implements a scoping mechanism named *lexical scoping* (or static scoping). The scope of variables is determined by the variables position in the source code.  

The previous code snippet, before executing it, the engine understands the following way:

  1. *I can see you define a function `outerFunc()` that has a variable `outerVar`. Good.*  
  * *Inside the `outerFunc()`, I can see you define a function `innerFunc()`.*  
  * *Inside the `innerFunc()`, I can see a variable `outerVar` without declaration. Since I use lexical scoping, I consider the variable `outerVar` inside `innerFunc()` to be the same variable as `outerVar` of `outerFunc()`.*

> *The lexical scope* of a function consists of the outer scopes of that function determined statically.   

For example:

```javascript{11-13}
const myGlobal = 0;

function func() {
  const myVar = 1;

  function innerOfFunc() {
    const myInnerVar = 2;

    function innerOfInnerOfFunc() {
      const myInnerInnerVar = 3;
      console.log(myInnerVar); // => 2
      console.log(myVar);      // => 1
      console.log(myGlobal);   // => 0
    }

    innerOfInnerOfFunc();
  }

  innerOfFunc();
}

func();
```

The lexical scope of `innerOfInnerOfFunc()` consits of scopes of `innerOfFunc()`, `func()` and global scope (the outermost scope). Within `innerOfInnerOfFunc()` you can access the variables `myInnerVar`, `myVar` and `myGlobal`.  

## 4. The closure

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

No matter where `inc()` is called, even outside the scope of `createIncrement()`, it has access to `value` and `i`.  

> *The closure* is a function that can remember and modify variables from its lexical scope, even when executed outside of its lexical scope.  

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

## 5. Real world example of closure

I know closures might be difficult to grasp. But once you *get it*, it's forever. 

You can model them in your mind the following way. 

Imagine a magical paintbrush with an interesting property. If you paint with it some objects from real life, then the painting becomes a window you can interact with.  

![Painting as a model of JavaScript closures](./images/rose.jpg)

Through this window, you can move the painted objects with your hands.  

Moreover, you can carry the magical painting anywhere, even far from the place where you've painted the objects. From there, through the magical painting as a window, you can still move the objects with your hands.  

The magical painting is a *closure*, while the painted objects are the *lexical scope*.  

Isn't JavaScript magic? &#x263a;

## 6. Conclusion

A closure is a function that captures variables from the place where it is defined (or its lexical scope).  

You can imagine the closure as a magical painting through which you can modify objects.   

The closure is an important concept that every JavaScript developer should know.  

*If you know other meaningful mental models of closures, please share in a [comment](#disqus_thread) below!*