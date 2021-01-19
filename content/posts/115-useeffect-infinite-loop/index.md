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

*If you aren't familiar with `useEffect()`, I recommend reading my post [A Simple Explanation of React.useEffect()](/react-useeffect-explanation/) before continuing. Having good fundamental knowledge of a non-trivial subject helps bypass rookie mistakes*.  

## 1. The infinite loop and side-effect updating state

Imagine a simple functional component that contains an input element. What I'd like to do is show on the
screen how much times the input has changed.  

A possible implementation looks as follows:

```jsx{7}
import { useEffect, useState } from 'react';

function CountInputChanges() {
  const [value, setValue] = useState('');
  const [count, setCount] = useState(-1);

  useEffect(() => setCount(count + 1));

  const onChange = ({ target }) => setValue(target.value);

  return (
    <div>
      <input type="text" value={value} onChange={onChange} />
      <div>Number of changes: {count}</div>
    </div>
  )
}
```

`<input type="text" value={value} onChange={onChange} />` is a [controlled component](/controlled-inputs-using-react-hooks/). `value` state variable hold the input value,
and the `onChange` event handler updates the `value` state as the user types into the input.  

I took the decision to update the `count` variable using `useEffect()` hook. Every time the component re-renders due to user typing into the input,
the `useEffect(() => setCount(count + 1))` updates the counter.  

Do you expect any problems with this component? Take a try and open the [demo](https://codesandbox.io/s/infinite-loop-9rb8c?file=/src/App.js). 

The demo shows that `count` state variable increases uncontrollable, even if you haven't typed anything into the input. That's an infinite loop.

When `useEffect()` is used as such:

```jsx{3}
useEffect(() => setCount(count + 1));
```

it generates an infinite loop of component re-renderings.  

After initial rendering `useEffect()` executes the side-effect callback that updates the state. The state update triggers re-rendering. After re-rendering `useEffect()` executes the side-effect callback and again updates the state, which triggers again a re-rendering. ...and so on indefintely.  

![React useEffect() infinite loop](./images/1.png)

### 1.1 Fixing dependencies

The infinite loop is fixed by correct management of the `useEffect(callback, dependencies)` dependencies argument.  

Because you want the `count` to change when `value` changes, you can simply add `value` as a dependency of the side-effect:

```jsx{7}
import { useEffect, useState } from 'react';

function CountInputChanges() {
  const [value, setValue] = useState('');
  const [count, setCount] = useState(-1);

  useEffect(() => setCount(count + 1), [value]);

  const onChange = ({ target }) => setValue(target.value);

  return (
    <div>
      <input type="text" value={value} onChange={onChange} />
      <div>Number of changes: {count}</div>
    </div>
  );
}
```

Adding `[value]` as a dependency of `useEffect(..., [value])`, the `count` state variable is updated only when `[value]` is changed.  

![React useEffect() controlled rendering loop](./images/2-2.png)

Open the fixed [demo](https://codesandbox.io/s/infinite-loop-fixed-4sgfr?file=/src/App.js). Now, as soon as you type into the input field, the `count` state correctly
display the number of input value changes.  

### 1.2 Using a reference

An alternative to the above solution is to use a reference (created by `useRef()` hook) to store the number of changes of the input. 

The idea is that updating a reference doesn't trigger re-rendering of the component.  

Here's a possible implementation:

```jsx{7}
import { useEffect, useState, useRef } from "react";

function CountInputChanges() {
  const [value, setValue] = useState("");
  const countRef = useRef(0);

  useEffect(() => countRef.current++);

  const onChange = ({ target }) => setValue(target.value);

  return (
    <div>
      <input type="text" value={value} onChange={onChange} />
      <div>Number of changes: {countRef.current}</div>
    </div>
  );
}
```

Thanks to `useEffect(() => countRef.current++)`, after every re-rendering because of `value` change, the `countRef.current` gets incremented.  

![React useEffect() controlled rendering loop](./images/3.png)

Check out the [demo](https://codesandbox.io/s/infinite-loop-fixed-4sgfr?file=/src/App.js). Now, as soon as you type into the input field, the `countRef` reference is updated without triggering a re-rendering &mdash; efficiently solving the infinite loop problem.  

## 2. The infinite loop and new objects references

Even if you setup correctly the `useEffect()` dependencies, still, you have to be careful when using objects as dependencies.  

For example, the following component `CountSecrets` watches the words user types into the input, and as soon as the user types the special word `'secret'`, a counter is increased and showed on the page.  

Here's a possible implementation of the component:

```jsx{8,10}
import { useEffect, useState } from "react";

function CountSecrets() {
  const [secret, setSecret] = useState({ value: "", countSecrets: 0 });

  useEffect(() => {
    if (secret.value === 'secret') {
      setSecret(s => ({...s, countSecrets: s.countSecrets + 1}));
    }
  }, [secret]);

  const onChange = ({ target }) => {
    setSecret(s => ({ ...s, value: target.value }));
  };

  return (
    <div>
      <input type="text" value={secret.value} onChange={onChange} />
      <div>Number of secrets: {secret.countSecrets}</div>
    </div>
  );
}
```

Open the [demo](https://codesandbox.io/s/infinite-loop-obj-dependency-7t26v?file=/src/App.js) and type a few different words, one of which to be `'secret'`. You will notice that as soon as you type the word `'secret'`, the `secret.countSecrets` state variable starts to grow uncontrollable.  

That's an infinite loop problem.  

Why does it happen?

The `secret` object is used as a dependency of `useEffect(..., [secret])`. Inside the side-effect callback, as soon as the input value equals `'secret'`, the state updater function is called:

```javascript
setSecret(s => ({...s, countSecrets: s.countSecrets + 1}));
```

which increments the secrets counter `countSecrets`, but also creates *a new object*.  

And because `secret` now is a new object, the `useEffect()` invokes again the side-effect that updates the state and a new `secret` object is created again, and so on.  

### 2.1 Avoid objects as dependencies

The best way to solve the problem of an infinite loop created by circular new objects creation is... to avoid using references to object in the dependency argument of `useEffect()`.  

Fixing the infinite loop of `<CountSecrets>` component requires changing the dependency from `useEffect(..., [secret])` to `useEffect(..., [secret.value])`. 

Calling the side-effect callback when solely `secret.value` changes is enough. So here's the fixed version of the component:

```jsx{10}
import { useEffect, useState } from "react";

function CountSecrets() {
  const [secret, setSecret] = useState({ value: "", countSecrets: 0 });

  useEffect(() => {
    if (secret.value === 'secret') {
      setSecret(s => ({...s, countSecrets: s.countSecrets + 1}));
    }
  }, [secret.value]);

  const onChange = ({ target }) => {
    setSecret(s => ({ ...s, value: target.value }));
  };

  return (
    <div>
      <input type="text" value={secret.value} onChange={onChange} />
      <div>Number of secrets: {secret.countSecrets}</div>
    </div>
  );
}
```

Open the fixed [demo](https://codesandbox.io/s/infinite-loop-obj-dependency-fixed-hyv66?file=/src/App.js). Type a few different words into the input, but as soon as you enter the special word `'secret'` the secrets counter increments.  No infinite loop is created.  

## 3. Summary

`useEffect(callback, deps)` is the hook that executed `callback` (the side-effect) after the component rendering.  

Sometimes, if you aren't careful with what the side-effect does, you might trigger an infinite loop of component renderings.  

One common case that most likely will generate an infinite loop is updating state in the side-effect, at the same time without having any dependency argument at all:

```javascript
useEffect(() => {
  // Infinite loop!
  setState(count + 1);
});
```

Usually the best way to avoid the infinite loop is to properly manage the hook dependencies: have the control on when exactly the side-effect should run:

```javascript
useEffect(() => {
  // No infinite loop
  setState(count + 1);
}, [whenToUpdateValue]);
```

Alternatively, you can also use a reference. Updating a reference doesn't trigger a re-rendering:

```javascript
useEffect(() => {
  // No infinite loop
  countRef.current++;
});
```

Another common recipe of an infinite loop is using an object as a dependency of `useEffect()`, and inside the side-effect updating that object (effectively creating a new object):

```javascript
useEffect(() => {
  // Infinite loop!
  setObject({
    ...object,
    prop: 'newValue'
  })
}, [object]);
```

Try to avoid using objects as dependencies directly, and stick to use a specific property only (the end result should be a primitive value):

```javascript
useEffect(() => {
  // No infinite loop
  setObject({
    ...object,
    prop: 'newValue'
  })
}, [object.whenToUpdateProp]);
```

*What other scenarios that create infinite loops when using `useEffect()` do you know?*