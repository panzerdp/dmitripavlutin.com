---
title: "Don't Overuse React.useCallback()"
description: "React.useCallback() memoizes callback functions and prevents unnecessary re-rendering of child components."
published: "2020-05-02T12:30Z"
modified: "2020-05-02T12:30Z"
thumbnail: "./images/cover.jpg"
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

## 1. The purpose of useCallback()

Before diving into `useCallback()` usage, let's distinguish the problem it solves.  

A function `factory()` returns functions that sum numbers: 

```javascript{11}
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

`sum1` and `sum2` are functions that sum two numbers. They were both created by the `factory()` function.  

The function `sum1` and `sum2` functions share the same code source, however, they are different objects. Comparing `sum1 === sum2` evaluates to `false`.  

## 2. A good use case

## 3. Another good use case

## 4. A bad use case

## 5. The ballancing forces

## 6. useCallback() usage checklist

