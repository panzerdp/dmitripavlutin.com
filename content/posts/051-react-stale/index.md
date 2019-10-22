---
title: Be Aware of Stale Closures when Using React Hooks
description: The stale closures is a pitfall of React hooks when an outdated variable is captured by a closure.
published: '2019-10-22T13:00Z'
modified: '2019-10-22T13:00Z'
thumbnail: './images/landscape.jpg'
slug: react-hooks-stale-closures
tags: ['react', 'hook']
recommended: ['use-react-memo-wisely', 'become-better-software-developer-digging-climbing']
type: post
commentsThreadId: react-hooks-stale-closure
---

A side effect (state management, HTTP requests, etc) using [React hooks](https://reactjs.org/docs/hooks-reference.html) is programmed as a combination of a few functions. That's the selling point.   

Hooks replace class-based components easying the reuse of state logic and side effects management. Plus you can extract repeated hooks logic into a custom hook to reuse across the application.  

Like any tool, hooks have benefits and downsides. While it's obvious to know the benefits, nevertheless is equally important to understand the downsides. 

By design, hooks rely heavily on JavaScript closures. Closures make hooks “simple” to use. At the same time closures bring a bunch of traps (recall memory leaks?). 

When working with React component that involes spagetti of effects and state management, you might encouter the stale closure problem.  

This post will introduce you briefly to the term of closures. Follows the stale closure as a seprated problem. Finally, you will understand how to distinguish stale closure situations within React components, and how to solve them.  

### 1. The JavaScript closure

Let's start with a short introduction of what is a closure in JavaScript.  

The following code snippet defines a factory function `createIncrement(by)` that returns an increment function. Later, every time the increment function is called, an internal counter is incremented by `i`:

```javascript{3-6}
function createIncrement(i) {
  let value = 0;
  function increment() {
    value += i;
    return count;
  }
  return increment;
}

const inc = createIncrement(1);
inc(); // => 1
inc(); // => 2
```

`createIncrement(1)` returns a function `inc`. When `inc()` is called, the `value` variable gets incremented by `1` and returned.  

You can call `inc()` function as many times as you want. Every time the internal `value` is incremented by `i`. First call of `inc()` returns `1`, the second call returns `2`, and so on.  

Let's look inside `createIncrement()`. You will find `function increment() {}`: which is a classic example of closure. This closure captures (or closes over, or simple remembers) the variables `value` and `i` from its lexical scope.  

The *lexical scope* is just the set of variables a function/closure can access from its outer scope where it is defined. In the example these variables are `value` and `i`, accessed from the scope of `createIncrement()`.  

The main property of the closure is that no matter where `inc()` is invoked, it will always have access to the variables from its lexical scope and perform the incrementation:

```javascript
(function() {
  inc(); // => 3
}());

setTimemout(function() {
  // after 1 second
  inc(); // => 4
}, 1000);
```

#### 1.1 A mental model of closures

I know closures might be difficult to grasp. But once you *get it*, it's forever. 

You can model them in your mind the following way. 

Imagine a magic paintbrush with an interesting property. If you paint using it some objects from real life, then the painting becomes a magical window.  

![Painting as a model of JavaScript closures](./images/rose.jpg)

Through this window you can move the painted objects with your hands.  

Moreover, you can take this magical painting anywhere, even far from the place where you painted the objects. From there, through the magical painting, you can still move with your hands the objects you've painted.  

The magic painting is a closure, while the painted objects are the lexical scope.  

Isn't JavaScript magic? &#x263a;

### 2. The stale closure

*What do you find difficult about React hooks?*