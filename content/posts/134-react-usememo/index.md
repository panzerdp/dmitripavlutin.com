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

From time to time in your React component, you have to perform some heavy computations. For example, given a list of employees and some search query, you'd like to filter the employees' names by that query.  

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

A component `<CalculateFactorial />` calculates the factorial of the number introduced by the user into an input field.

Here's a possible implementation of `<CalculateFactorial />` component:

```jsx{7,28}
import { useState } from 'react';

export function CalculateFactorial() {
  const [number, setNumber] = useState(1);
  const [inc, setInc] = useState(0);

  const factorial = factorialOf(number);

  const onChange = event => {
    setNumber(Number(event.target.value));
  };
  const onClick = () => setInc(i => i + 1);
  
  return (
    <div>
      Factorial of <input value={number} onChange={onChange} /> 
      is {factorial}
      <button onClick={onClick}>Re-render</button>
    </div>
  );
}

function factorialOf(n) {
  console.log('Factorial called!');
  return n <= 0 ? 1 : n * factorialOf(n - 1);
}
```

Every time you change the input value, `'Factorial called!'` is logged to console.  

But also, each time you click *Re-render* button, `inc` value is updated. Updating `inc` state value triggers `<CalculateFactorial />` re-rendering, and the factorial is recalculated again. `'Factorial called!'` is logged to console each time you click *Re-render*.  

How can you memoize the factorial calculation when the component re-renders? Welcome `useMemo()` hook!  

By using `useMemo(() => factorialOf(number), [number])` instead of simple `factorialOf(number)`, React memoizes the factorial calculation.  

Let's improve `<CalculateFactorial />` and memoize the factorial calculation:

```jsx{7,28}
import { useState, useMemo } from 'react';

export function CalculateFactorial() {
  const [number, setNumber] = useState(1);
  const [inc, setInc] = useState(0);

  const factorial = useMemo(() => factorialOf(number), [number]);

  const onChange = event => {
    setNumber(Number(event.target.value));
  };
  const onClick = () => setInc(i => i + 1);
  
  return (
    <div>
      Factorial of <input value={number} onChange={onChange} /> 
      is {factorial}
      <button onClick={onClick}>Re-render</button>
    </div>
  );
}

function factorialOf(n) {
  console.log('Factorial called!');
  return n <= 0 ? 1 : n * factorialOf(n - 1);
}
```

Open the demo. Every time you change the value of the number, `'Factorial called!'` is logged to console. That's expected.  

However, if you click *Re-render* button, `'Factorial called!'` isn't logged to console because `useMemo(() => factorialOf(number), [number])` returns the memoized factorial calculation.  

## 3. *useMemo()* vs *useCallback()*

`useCallback()`, compared to `useMemo()`, is a more specialized hook that memoizes callbacks:  

```jsx{7}
import { useCallback } from 'react';

function MyComponent({ prop }) {
  const callback = () => {
    return 'Result';
  };
  const memoizedCallback = useCallback(callback, [prop]);
  
  return <ChildComponent callback={memoizedCallback} />;
}
```

In the above example, `useCallback(() => {...}, [prop])` returns the same function instance as long as `prop` dependency is the same. 

You can use the same way the `useMemo()` to memoize callbacks:

```jsx{7}
import { useMemo } from 'react';

function MyComponent({ prop }) {
  const callback = () => {
    return 'Result';
  };
  const memoizedCallback = useMemo(() => callback, [prop]);
  
  return <ChildComponent callback={memoizedCallback} />;
}
```

## 4. Use memoization with care

While `useMemo()` can improve the performance of the component, you have to make sure to profile the component with and without the hook.  

When memoization is used inappropriately, it could harm the performance.  

## 5. Conclusion

`useMemo(() => computation(a, b), [a, b])` is the hook that lets you memoize some heavy computations. Given the same `[a, b]` dependencies, once memoized, the hook is 
going to return the memoized value.  

If you'd like to know more about the alternative to callback memoization `useCallback()`, I recommend following my post [How to Memoize with React.useMemo()](/react-usememo-hook/).  
