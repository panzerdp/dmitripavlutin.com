---
title: "How to Memoize with React.useMemo()"
description: "How to memoize data in a React component using useMemo() hook."  
published: "2021-06-03T12:00Z"
modified: "2021-06-03T12:00Z"
thumbnail: "./images/cover-4.png"
slug: react-usememo-hook
tags: ['react', 'usememo', 'hook']
recommended: ['use-react-memo-wisely', 'dont-overuse-react-usecallback']
type: post
---

Time to time in your React component you have to perform some heavy computations. For example, given a list of employees and some search query, you'd like to 
filter the employees' names by that query.  

In such cases, with care, you can try to improve the performance of your components using the [memoization](https://en.wikipedia.org/wiki/Memoization) technique.  

In this post, I'm going to describe how and when to use the `useMemo()` React hook.  

## 1. *useMemo()* hook

`useMemo()` is a built-in React hook that accepts 2 arguments &mdash; a function that computes a result value and the depedencies array:  

```javascript
import { useMemo } from 'react';

function MyComponent() {
  const memoizedResult = useMemo(computationCallback, deps);

  // ...
}
```

The essence of `useMemo(computationCallback, deps)` hook is this: the hook invokes, memoizes, and returns the value returned by `computationCallback()`.  

If `deps` argument doesn't change during re-rendering, then `useMemo()` *doesn't invoke* `computationCallback()` and returns the memoized value. 

However, if `deps` argument had changed compared to previous render, then `useMemo()` *invokes* `computationCallback()`, memoizes the new value, and returns it.  

That's the essence of `useMemo()` hook.  

Let's see how it works in an example.  

## 2. *useMemo()* &mdash; an example

There's a component that displays 2 categories of employees in a company: software developers and technical support. Each list also can be filtered by a search query.  

Here's a possible implementation of `<CompanyEmployees />` component:

```jsx
import { useState } from 'react';

export function CompanyEmployees({ devs, support }) {
  const [devsQuery, setDevsQuery] = useState('');
  const [supQuery, setSupQuery] = useState('');

  let filteredDevs = devs;

  if (devsQuery.length > 0) {
    filteredDevs = devs.filter(name => {
      return name.toLowerCase().includes(devsQuery.toLowerCase());
    });
  }

  let fildeteredSupport = support;

}

function List({ employees, listName }) {
  
}
```