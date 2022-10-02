---
title: "Your Guide to React.useCallback()"
description: "React.useCallback() memoizes callback functions."
published: "2020-05-04T08:40Z"
modified: "2022-10-02"
thumbnail: "./images/cover-6.png"
slug: react-usecallback
tags: ["react", "memoization"]
recommended: ["use-react-memo-wisely", "react-usestate-hook-guide"]
type: post
---

A reader of my blog reached me on Facebook with an interesting question. He said his teammates, no matter the situation, were wrapping every callback function inside `useCallback()`:

```jsx{3-5}
import React, { useCallback } from 'react';

function MyComponent() {
  const handleClick = useCallback(() => {
    // handle the click event
  }, []);

  return <MyChild onClick={handleClick} />;
}
```

*"Every callback function should be memoized to prevent useless re-rendering of child components that use the callback function"* is the reasoning of his teammates.   

This reasoning is far from the truth. Such usage of `useCallback()` without profiling makes the component slower.  

In this post, I'm going to explain how to use correctly `useCallback()`.

## 1. Understanding functions equality check

Before diving into `useCallback()` usage, let's distinguish the problem `useCallback()` solves &mdash; the functions equality check.    

Functions in JavaScript are first-class citizens, meaning that a function is a regular object. The function object can be returned by other functions, be compared, etc.: anything you can do with an object.  

Let's write a function `factory()` that returns functions that sum numbers: 

```javascript{10-11}
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

The functions `sum1` and `sum2` share the same code source but they are different function objects. Comparing them `sum1 === sum2` evaluates to `false`.  

That's just how JavaScript objects works. An object (including a function object) [equals](/the-legend-of-javascript-equality-operator/#the-identity-operator) only to itself.  

## 2. The purpose of useCallback()

Different function objects sharing the same code are often created inside React components:

```jsx{2-4}
function MyComponent() {
  // handleClick is re-created on each render
  const handleClick = () => {
    console.log('Clicked!');
  };

  // ...
}
```

`handleClick` is a different function object on every rendering of `MyComponent`.  

Because inline functions are cheap, the re-creation of functions on each rendering is not a problem. *A few inline functions per component are acceptable.*  

But in some cases you need to maintain a single function instance between renderings:

1. A functional component wrapped inside `React.memo()` accepts a  function object prop
2. When the function object is a dependency to other hooks, e.g. `useEffect(..., [callback])`  
3. When the function has some internal state, e.g. when the [function is debounced or throttled](/react-throttle-debounce/#2-debouncing-a-callback-the-first-attempt).  

That's when `useCallback(callbackFun, deps)` is helpful: given the same dependency values `deps`, the hook returns the same function instance between renderings (aka memoization):

```jsx{4-6}
import { useCallback } from 'react';

function MyComponent() {
  // handleClick is the same function object
  const handleClick = useCallback(() => {
    console.log('Clicked!');
  }, []);

  // ...
}
```

`handleClick` variable has always the same callback function object between renderings of `MyComponent`. 

## 3. A good use case

Imagine you have a component that renders a big list of items:

```jsx
import useSearch from './fetch-items';

function MyBigList({ term, onItemClick }) {
  const items = useSearch(term);

  const map = item => <div onClick={onItemClick}>{item}</div>;

  return <div>{items.map(map)}</div>;
}

export default React.memo(MyBigList);
```

The list could be big, maybe hundreds of items. To prevent useless list re-renderings, you wrap it into `React.memo()`.  

The parent component of `MyBigList` provides a handler function to know when an item is clicked:  

```jsx{10}
import { useCallback } from 'react';

export function MyParent({ term }) {
  const onItemClick = useCallback(event => {
    console.log('You clicked ', event.currentTarget);
  }, [term]);

  return (
    <MyBigList
      term={term}
      onItemClick={onItemClick}
    />
  );
}
```

`onItemClick` callback is memoized by `useCallback()`. As long as `term` is the same, `useCallback()` returns the same function object.  

When `MyParent` component re-renders, `onItemClick` function object remains the same and doesn't break the memoization of `MyBigList`.  

That was a good use case of `useCallback()`.  

## 4. A bad use case

Let's look at another example:

```jsx{4-6}
import { useCallback } from 'react';

function MyComponent() {
  // Contrived use of `useCallback()`
  const handleClick = useCallback(() => {
    // handle the click event
  }, []);

  return <MyChild onClick={handleClick} />;
}

function MyChild ({ onClick }) {
  return <button onClick={onClick}>I am a child</button>;
}
```

The first problem is that `useCallback()` hook is called every time `MyComponent` renders. That reduces the render performance already.  

The second problem is using `useCallback()` increases code complexity. You have to keep the `deps` of `useCallback(..., deps)` in sync with what you're using inside the memoized callback.  

Does it make sense to apply `useCallback()`? Most likely not because `<MyChild>` component is light and its re-rendering doesn't create performance issues. In conclusion, *the optimization costs more than not having the optimization*.  

Simply *accept* that rendering creates new function objects:

```jsx{3-5}
import { useCallback } from 'react';

function MyComponent() {
  const handleClick = () => {
    // handle the click event
  };

  return <MyChild onClick={handleClick} />;
}

function MyChild ({ onClick }) {
  return <button onClick={onClick}>I am a child</button>;
}
```

## 5. Summary

When thinking about performance tweaks, recall the [statement](https://wiki.c2.com/?ProfileBeforeOptimizing):

> Profile before optimizing

When deciding to use an optimization technique, including memoization and particularly `useCallback()`, do:

1. [Profile](https://developer.chrome.com/docs/devtools/evaluate-performance/)
2. Quantify the increased performance (e.g. `150ms` vs `50ms` render speed increase)
3. Ask yourself: does the increased performance, compared to increased complexity, worth using `useCallback()`?  

To enable the memoization of the entire component output I recommend checking my post [Use React.memo() wisely](/use-react-memo-wisely/).  

*Do you know use cases that are worth using `useCallback()`? Please share your experience in a comment below.*