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

A component `<FactorialAndSum /> ` displayes 2 input fields where you can insert numbers. For the first field the component displays the factorial of the introduced number, and for the second input field the component calculates the sum of all positive numbers until that number.  

Here's a possible implementation of `<FactorialAndSum />` component:

```jsx
import { useState } from 'react';

function factorial(n) {
  const result = 
}

export function CompanyEmployees({ names }) {
  const [number1, setNumber1] = useState('1');
  const [number2, setNumber2] = useState('1');
  
  let filteredNames = names;

  if (devsQuery.length > 0) {
    filteredDevs = devs.filter(name => {
      return name.toLowerCase().includes(query.toLowerCase());
    });
  }

  const handleChange = event => {
    setQuery(event.target.value);
  };

  return (
    <div>
      <input value={devsQuery} onChange={handleChange}>
      {filteredDevs.map(name => <div>{name}</div>)}
    </div>
  );
}
```

If you open the demo, everything works as expected.  

But what would happen if the <CompanyEmployees> would re-render, for example if you add an auto-incrementing counter inside it?  

## 3. Potentially good use cases

### 3.1 Memoizing derived data

A good use case of `useMemo()` is to keep in memory the derived state. For example, having a list of names, you would memoize the names filtered by a query:

```jsx
import { useState } from 'react';

export function CompanyEmployees({ names }) {
  const [query, setQuery] = useState('');
  
  let filteredNames = names;

  if (devsQuery.length > 0) {
    filteredDevs = devs.filter(name => {
      return name.toLowerCase().includes(query.toLowerCase());
    });
  }

  const handleChange = event => {
    setQuery(event.target.value);
  };

  return (
    <div>
      <input value={devsQuery} onChange={handleChange}>
      {filteredDevs.map(name => <div>{name}</div>)}
    </div>
  );
}
```

