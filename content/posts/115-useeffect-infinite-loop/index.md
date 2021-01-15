---
title: "How to Solve the Infinite Loop of React.useEffect()"
description: "This post describes the common scenarios that generate infinite loops when using React useEffect() hook and ways to solve it."
published: "2021-01-19T12:00Z"
modified: "2021-01-19T12:00Z"
thumbnail: "./images/cover-4.png"
slug: react-useeffect-infinite-loop
tags: ['react', 'hook', 'useeffect']
recommended: ['react-hooks-mistakes-to-avoid', 'react-useeffect-explanation']
type: post
---

`useEffect()` React hook manages the side-effects. The usual side-effects are the fetching over the network, manipulating DOM directly, starting and ending timers.  

While the `useEffect()` is, alongside with `useState()` (the one that manages state), is one of the most used hooks, it requires 
effort to familiarize and use correctly.  

A pitfall you might experience when working with `useEffect()` is the infinite loop of re-renderings. In this post, I'll describe the common scenarios that generate infinite loops and how to avoid them.  

*If aren't familiar with `useEffect()`, before continuing I recommend reading my post [A Simple Explanation of React.useEffect()](/react-useeffect-explanation/). Usually having good fundamental knowledge of a non-trivial subject can help you bypass rookie mistakes*.  

## 1. The side-effect updates state

Imagine a simple functional component that contains an input element. What I'd like to do is show on the
screen how much times the input has changed.  

A possible implementation looks as follows:

```jsx{7-9}
import { useEffect, useState } from 'react';

function CountInputChanges() {
  const [value, setValue] = useState('');
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(count + 1);
  });

  const onChange = ({ target }) => setValue(target.value);

  return (
    <div>
      <input type="text" value={value} onChange={onChange} />
      <div>Number of changes: {count}</div>
    </div>
  )
}
```

`<input type="text" value={value} onChange={onChange} />` is a controlled component. `value` contains the value of the input,
and the `onChange` event handler updates the `value` state from the input.  

What's interesting is that I took the decision to update the `count` variable using `useEffect()` hook.  