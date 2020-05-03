---
title: "Don't Overuse React.useCallback()"
description: "React.useCallback() memoizes callback functions and prevents unnecessary re-rendering of child components."
published: "2020-05-02T12:30Z"
modified: "2020-05-02T12:30Z"
thumbnail: "./images/cover-1.jpg"
slug: dont-overuse-react-usecallback
tags: ["react", "component", "memoization"]
recommended: ["use-react-memo-wisely", "react-usestate-hook-guide"]
type: post
commentsThreadId: react-usecallback
---

A reader of my blog reached me on Facebook with an interesting question. He said his teammates are wrapping every callback function inside `useCallback()`, no matter the situation:

```jsx{4-6}
import React, { useCallback } from 'react';

function MyComponent() {
  const handleClick = useCallback(() => {
    // handle the click event
  }, []);

  return <button onClick={handleClick}>Click me</button>;
}
```

*"Every callback function should be memoized to prevent useless re-rendering of child components which use the callback function"* is the reasoning of his teammates.   

This statement is far from truth. Moreover, such usage of `useCallback()` makes the component slower, harming the performance.    

In this post, I'm going to explain how to use correctly `useCallback()`.   

## 1. Understanding functions equality check

Before diving into `useCallback()` usage, let's distinguish the problem the hook solves: functions equality check.    

Let's define a function named `factory()` that returns functions: 

```javascript{11-12}
function factory() {
  return (a, b) => a + b;
}

const sum1 = factory();
const sum2 = factory();

sum1(1, 2); // => 3
sum2(1, 2); // => 3

sum1 === sum2; // => false
sum1 === sum1; // => true
```

`sum1` and `sum2` are functions that sum two numbers. They've been created by the `factory()` function.  

The functions `sum1` and `sum2` share the same code source, however, they are different objects: comparing them `sum1 === sum2` evaluates to `false`.  

That's just how JavaScript works. An object (including a function object) [equals](/the-legend-of-javascript-equality-operator/#the-identity-operator) only to itself.  

## 2. The purpose of useCallback()

Different function instances sharing same code are often created inside React components. When you create a plain function (e.g. a callback or event handler), this function will be re-created on every rendering:  

```jsx{5-7}
import React from 'react';

function MyComponent() {
  // handleClick is re-created on each render
  const handleClick = () => {
    console.log('Clicked!');
  };

  return <button onClick={handleClick}>Click me</button>;
}
```

`handleClick` is going to be a different function object on every rendering of `MyComponent`.  

Because inline functions are cheap, the re-creation of functions on each rendering is not a problem. *A few inline functions per component are acceptable.*  

However, there are cases when you need exactly the same instance of a function. 

Going back to `useCallback()` hook, it is exactly what is solves: giving the same dependency values, the hook returns the same function instance between renderings.  



## 3. A good use case

## 4. Another good use case

## 5. A bad use case

## 6. The ballancing forces

## 7. useCallback() usage checklist

