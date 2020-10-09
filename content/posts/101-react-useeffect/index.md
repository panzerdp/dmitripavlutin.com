---
title: "Learning React.useEffect() from Examples"
description: "In this post you'll learn how to use React useEffect() from examples."
published: "2020-10-13T12:00Z"
modified: "2020-10-13T12:00Z"
thumbnail: "./images/effect-4.jpg"
slug: react-useeffect-by-examples
tags: ['react', 'hook', 'useEffect']
recommended: ['dont-overuse-react-usecallback', 'use-react-memo-wisely']
type: post
commentsThreadId: react-useeffect-by-examples
---

When I first read about the new React hooks feature, I was impressed by the expressiveness and their possibilities.  

But the expressiveness and brevity of hooks comes with a price &mdash; it's relatively difficult to get started with them.  

From this reason I had difficulties in understanding the `useEffect()` hook: the one that manages side-effects in React components.  

While you'll read some theory of `useEffect()` in the first section, in this post you'll learn `useEffect()` from interesting examples and demos.  

```toc
```

## 1. useEffect() API

A functional React component uses props and state values to calculate and return the output. If the functional component makes calculations that don't target the output value, then these calculations are named *side-effects*.  

```jsx{3}
function MyComponent({ name }) {
  const message = `Hello, ${name}!`; // Calculates output
  document.title = 'Greetings page'; // Side-effect!
  return <div>{message}</div>;       // Calculates output
}
```

Examples of side-effects are fetch requests, manipulating DOM directly, use timer functions like `setTimeout()`, and more.  

You cannot perform side-effects directly in the body of the functional component. When and how often the component renders isn't something you can control &mdash; if React wants to render the component, you cannot stop it.  

Invoking side-effects require a different mechanism: welcome `useEffect()` hook.  

```jsx{3-5}
function MyComponent({ name }) {
  const message = `Hello, ${name}!`;   // Calculates output
  useEffect(() => {
    document.title = 'Greetings page'; // Side-effect!
  }, []);
  return <div>{message}</div>;         // Calculates output
}
```

`useEffect` accepts 2 arguments:

```javascript
useEffect(callback, deps);
```

* `callback` is a function 
* `deps` is an array of dependencies




## 2. Component did mount

## 3. Component did update

### 3.1 Prop did change

### 3.2 State did change

## 4. Fetch data

## 5. Effect cleanup

## 6. Summary