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

  return <MyChild onClick={handleClick} />;
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

  return <MyChild onClick={handleClick} />;
}
```

`handleClick` is going to be a different function object on every rendering of `MyComponent`.  

Because inline functions are cheap, the re-creation of functions on each rendering is not a problem. *A few inline functions per component are acceptable.*  

However, there are cases when you need to keep one instance of a function:

1. When a component is wrapped inside `React.memo()` (or `shouldComponentUpdate`) and you'd like make the moization work
2. When the function is used as a depedency to other hooks.

That's the case when `useCallback(callbackFun, deps)` helps you: giving the same dependency values `deps`, the hook returns the same function instance between renderings:

```jsx{5-7}
import React, { useCallback } from 'react';

function MyComponent() {
  // handleClick is the same function object
  const handleClick = useCallback(() => {
    console.log('Clicked!');
  }, []);

  return <MyChild onClick={handleClick} />;
}
```

`handleClick` variable will have always the same object of the callback function between renderings of `MyComponent`. 

## 3. A good use case

Imagine you have a component that renders a big list of items:

```jsx
import React from 'react';

function MyBigList({ items, handleClick }) {
  const map = (item, index) => (
    <div onClick={() => handleClick(index)}>{item}</div>;
  );
  return <div>{items.map(map)}</div>;
}

export const MyBigList = React.memo(MyBigList);
```

`MyBigList` renders a list of items. Knowing the list could be big, probably a few hunders of items. To preserve the list re-rendering, you wrap it into `React.memo`.  

The parent component of `MyBigList` needs to provide the list of items, and the handler function when an item is clicked.  

```jsx
import React from 'react';

function MyParent({ term }) {
  const handleClick = useCallback((item) => {
    console.log('You clicked ', item);
  }, [term]);

  const items = useSearch(term);

  return (
    <MyBigList
      items={items}
      handleClick={handleClick}
    />
  );
}
```

`handleClick` callback is memoizied by `useCallback()`. As long as `term` variable stays the same, `useCallback()` returns the same function object.  

Even if for some reason `MyParent` component is re-renders, `handleClick` statys the same and doesn't break the memoization of `MyBigList`.

## 4. Another good use case

Imagine a component that supplies an async fetch function:



## 5. A bad use case

## 6. useCallback() usage checklist

