---
title: "How to Memoize with React.useMemo()"
description: "How to memoize data in a React component using useMemo() hook."  
published: "2021-06-04T13:00Z"
modified: "2021-06-04T13:00Z"
thumbnail: "./images/cover-5.png"
slug: react-usememo-hook
tags: ['react', 'usememo', 'hook']
recommended: ['use-react-memo-wisely', 'dont-overuse-react-usecallback']
type: post
---

From time to time in your React component can perform some expensive calculations. For example, given a big list of employees and a search query, the component should filter the employees' names by that query.  

In such cases, with care, you can try to improve the performance of your components using the [memoization](https://en.wikipedia.org/wiki/Memoization) technique.  

In this post, I'm going to describe how and when to use the `useMemo()` React hook.  

## 1. *useMemo()* hook

`useMemo()` is a built-in React hook that accepts 2 arguments &mdash; a function that computes a result and the depedencies array:  

```javascript
import { useMemo } from 'react';

function MyComponent() {
  const memoizedResult = useMemo(() => heavyCalc(a, b), [a, b]);

  // ...
}
```

During initial rendering, `useMemo(() => heavyCalc(a, b), [a, b])` invokes `heavyCalc(a, b)`, memoizes the calculation result, and returns it to the component.  

If `a` and `b` dependencies don't change during re-rendering, then `useMemo()` *doesn't invoke* `heavyCalc(a, b)` but returns the memoized value. 

However, if `a` and `b` change during re-rendering, then `useMemo()` *invokes* `heavyCalc(a, b)`, memoizes the new value, and returns it.  

That's the essence of `useMemo()` hook.  

Don't forget to provide the dependencies argument. Otherwise, without dependencies argument, `useMemo(() => heavyCalc(a, b))` invokes `heavyCalc(a, b)` during every re-rendering. 

Now let's see how `useMemo()` works in an example.  

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
      Factorial of 
      <input type="number" value={number} onChange={onChange} />
      is {factorial}
      <button onClick={onClick}>Re-render</button>
    </div>
  );
}

function factorialOf(n) {
  console.log('factorialOf(n) called!');
  return n <= 0 ? 1 : n * factorialOf(n - 1);
}
```

[Try the demo.](https://codesandbox.io/s/factorial-without-memoization-26yp4?file=/src/App.js)

Every time you change the input value, the factorial calculation function is invoked `factorialOf(n)` and `'factorialOf(n) called!'` is logged to console.  

On the other side, each time you click *Re-render* button, `inc` state value is updated. Updating `inc` state value triggers `<CalculateFactorial />` re-rendering. But, as a secondary effect, the factorial is recalculate too and `'factorialOf(n) called!'` is logged to console each time you click *Re-render*.  

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
      Factorial of 
      <input type="number" value={number} onChange={onChange} />
      is {factorial}
      <button onClick={onClick}>Re-render</button>
    </div>
  );
}

function factorialOf(n) {
  console.log('factorialOf(n) called!');
  return n <= 0 ? 1 : n * factorialOf(n - 1);
}
```

[Try the demo.](https://codesandbox.io/s/factorial-with-memoization-65mkk?file=/src/App.js)

Open the [demo](https://codesandbox.io/s/factorial-with-memoization-65mkk?file=/src/App.js). Every time you change the value of the number, `'factorialOf(n) called!'` is logged to console. That's expected.  

However, if you click *Re-render* button, `'factorialOf(n) called!'` isn't logged to console because `useMemo(() => factorialOf(number), [number])` returns the memoized factorial calculation. Great! 

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

While `useMemo()` can improve the performance of the component, you have to make sure to profile the component with and without the hook. Only after that make the conclusion whether memoization worth it.   

When memoization is used inappropriately, it could harm the performance.  

## 5. Conclusion

`useMemo(() => computation(a, b), [a, b])` is the hook that lets you memoize some heavy computations. Given the same `[a, b]` dependencies, once memoized, the hook is 
going to return the memoized value without invoking `computation(a, b)`.  

Also check the post [Your Guide to React.useCallback()](/dont-overuse-react-usecallback/) if you'd like to read about `useCallback()` hook.  
