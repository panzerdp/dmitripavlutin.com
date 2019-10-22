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

A side effect (state management, HTTP request, etc) inside a React component using [hooks](https://reactjs.org/docs/hooks-reference.html) is performed as a composition of a few functions. That's the selling point of React hooks.   

Hooks replace class-based components by easying the reuse of state and side effects management. Plus you can extract repeated logic into a custom hook to reuse across the application.  

Like any tool, hooks have benefits and downsides. While it's obvious to know the benefits, nevertheless is equally important to understand the downsides. 

By design, hooks rely heavily on JavaScript closures. Closures make hooks “simple” to use. But closures are sometimes tricky to use (recall memory leaks?). 

When working with a React component having a spagetti of effects and state management, you might encouter the stale closure problem. And it might be difficult to solve!

This post will explain the important term JavaScript closure. Follows the stale closure problem description. Finally, you will understand how to distinguish stale closure situations within your React components, and how to solve them.  

### 1. The JavaScript closure

Let's start with a short introduction of what is a closure in JavaScript.  

The following code snippet defines a factory function `createIncrement(by)` that returns an increment function. Later, every time the increment function is called, an internal counter is incremented by `i`:

```javascript{3-6,11-12}
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

You can call `inc()` function as many times as you want. First call of `inc()` returns `1`, the second call returns `2`, and so on.  

Did you spot the interesting thing? You simply call `inc()`, without arguments, but JavaScript still knows the current `value` and how much to increment `i`. How does it do that? 

The answer is inside `createIncrement()`. There you will find `function increment() {}`: the closure that does the magic. The closure captures (or closes over, or simply remembers) the variables `value` and `i` from the lexical scope.  

The *lexical scope* is just the set of variables a closure can access from the outer scope *where it is defined*. In the current example, these variables are `value` and `i`, accessed from the scope of `createIncrement()`.  

Because `inc` is a closure, no matter where invoked, it always has access to the variables from its lexical scope `value` and `i`, and perform the increment.  

Continuing the example, `inc()` can be called further anywhere, even async:  
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

Imagine a magical paintbrush with an interesting property. If you paint using it some objects from real life, then the painting becomes a window.  

![Painting as a model of JavaScript closures](./images/rose.jpg)

Through this window you can move the painted objects with your hands.  

Moreover, you can carry the magical painting anywhere, even far from the place you've painted the objects. From there, through the magical painting as a widow, you can still move the objects with your hands.  

The magical painting is a *closure*, while the painted objects are the *lexical scope*.  

Isn't JavaScript magic? &#x263a;

*If you know other meaningful mental models of closures, please write a [comment](#disqus_thread)!*

## 2. The stale closure

## 3. The stale closure and *useState()*

## 4. The stale closure and *useEffect()*

## 5. Conclustion


*What do you find difficult about React hooks?*