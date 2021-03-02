---
title: 'React.useRef() Guide'
description: 'React.useRef() hook solves 2 issues: holding mutable values that persist between component renderings and reference DOM elements.'
published: "2021-03-02T12:00Z"
modified: "2021-03-02T12:00Z"
thumbnail: "./images/cover-4.png"
slug: react-useref-guide
tags: ['react', 'useref', 'hook', 'element']
recommended: ['react-useeffect-explanation', 'use-react-memo-wisely']
type: post
---

`React.useRef()` is a hook that solves 2 main issues: holding mutable values that should persist between component renderings and reference DOM elements.  

In this post, you'll learn in detail how `useRef()` works and when you should use it. Interesting demos included.  

## 1. Mutable values

The usage of `useRef()` hooks is pretty straigfoward:

```jsx{4,8,11}
import { useRef } from 'react';

function MyComponent() {
  const reference = useRef(initialValue);

  const someHandler = () => {
    // Access reference value:
    const value = reference.current;

    // Update reference value:
    reference.current = newValue;
  };

  // ...
}
```

`useRef(initialValue)` accepts one argument which sets the initial value of the reference. The hook returns a special value &mdash; named *reference*, or *ref* &mdash; which is an object having one property `current`:

```javascript
const reference = useRef(initialValue);

reference; // => { current: <referenceValue> }
```

Use `value = reference.current` to access the reference value, as well `reference.current = newValue` to set a new value to the reference.  

There are 2 main rules to remember about the behavior of `useRef()` references:

1. The value of the reference is *persisted* (stays the same) between component re-renderings;

* Updating a reference *doesn't trigger a component re-rendering*.  

### 1.1 Use case: logging button clicks

Let's see all these ideas in action using a component `LogButtonClicks` which simply counts and logs the number of clicks on a button.  

Here's a possible implementation of `LogButtonClicks` using `useRef()` hook:

```jsx
import { useRef } from 'react';

function LogButtonClicks() {
  const countRef = useRef(0);
  
  const handle = () => {
    countRef.current++;
    console.log(`Clicked ${countRef.current} times`);
  };

  console.log('I rendered!');

  return <button onClick={handle}>Click me</button>;
}
```

[Try the demo.](https://codesandbox.io/s/logging-button-clicks-reference-ogcnc?file=/src/index.js)

`const countRef = useRef(0)` creates a references `countRef` initialized with `0`.  

When the button is clicked, `handle` function is invoked where `countRef.current++` gets incremented. The ref value is logged to console.  

What's interesting is that clicking the button and updating the reference value `countRef.current++` doesn't trigger component re-rendering. You can see that by `'I rendered!'` message being logged to console just once: during initial rendering of the component.  

Now a reasonable question: what's the main difference between using `useRef()` and `useState()`?  

#### Reference and state diff

Let's reuse the component `LogButtonClicks` from the previous section, but instead of using `useRef()`, let's use `useState()` hook to coint the number of button clicks.  

```jsx
import { useState } from 'react';

function LogButtonClicks() {
  const [count, setCount] = useState(0);
  
  const handle = () => {
    const updatedCount = count + 1;
    console.log(`Clicked ${updatedCount} times`);
    setCount(updatedCount);
  };

  console.log('I rendered!');

  return <button onClick={handle}>Click me</button>;
}
```

[Try the demo.](https://codesandbox.io/s/logging-button-clicks-state-nzzuk?file=/src/App.js)

Open the demo and click a few times the button. Each time you click, you will see in console the message `'I rendered!'`. It demonstrates that each time the state is updated, the component re-renders.  

So, the 2 main difference between state and references:

1. Updating state does trigger component re-rendering, while updating a reference doesn't.  

2. The state update is asynchronous (the state variable is updated after re-rendering), while the reference is update synchornously (the updated value is available right away)

### 1.2 Use case: implementing a stopwatch

The things you can store inside a reference are infrastructure information that involves some kind of side-effect.  

For example, you can store into a refence the timer ids, for later control.  

The following component `Stopwatch` starts a `setInterval()` timer function that invokes a callback each second increasing the counter of a stopwatch.  

Because the timer id should be kept between renderings of the component, it is good to keept it into a reference.  

```jsx
import { useRef, useState, useEffect } from 'react';

function Stopwatch() {
  const timerIdRef = useRef(0);
  const [count, setCount] = useState(0);

  const startHandler = () => {
    if (timerIdRef.current) { return; }
    timerIdRef.current = setInterval(() => setCount(c => c + 1), 1000);
  };

  const stopHandler = () => {
    clearInterval(timerIdRef.current);
    timerIdRef.current = 0;
  };

  useEffect(() => {
    return () => clearInterval(timerIdRef.current);
  }, []);

  return (
    <div>
      <div>Timer: {count}s</div>
      <div>
        <button onClick={startHandler}>Start</button>
        <button onClick={stopHandler}>Stop</button>
      </div>
    </div>
  );
}
```

[Try the demo.](https://codesandbox.io/s/stopwatch-cm7zz?file=/src/App.js)

## 2. Access DOM elements

Another useful application of the `useRef()` hook is that it allows you to access DOM elements directly.  

You can do this pretty simple: 

A) Define a reference that's going to keep the link to DOM element `const elementRef = useRef()`; 

B) Use the reference as a value to `ref` attribute to the element you'd like to access: `<div ref={elementRef}></div>`;

C) Finally the reference contains a link to the DOM element: `elementRef.current` is an `HTMLElement`.  

```jsx{4,7,11}
import { useRef, useEffect } from 'react';

function AccessingElement() {
  const elementRef = useRef();

   useEffect(() => {
    const divElement = elementRef.current;
  }, []);

  return (
    <div ref={elementRef}>
      I'm an element
    </div>
  );
}
```

### 2.1 Use case: focusing an input

The classic example of when you need to access DOM elements is to focus into an input as soon as the component renders.  

To make it work you'll need to create a reference to the input element, and then right after mount call the special method `inputElement.focus()` to focus.  

Here's a possible implementation of the `InputFocus` component:

```jsx
import { useRef, useEffect } from 'react';

function InputFocus() {
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return <input ref={inputRef} type="text" />;
}
```

[Try the demo.](https://codesandbox.io/s/input-focus-zntci?file=/src/App.js)

`const inputRef = useRef()` creates a reference that's going to hold the input element.  

When writing the input itself, do assign to its `ref` attribute the reference: `<input ref={inputRef} type="text" />`. React then, right after mounting the component into the DOM, is going to set `inputRef.current` to be the input element.  

## 3. Updating references restriction

The function scope of the functional React component should either calculate the output, either invoke hooks.  

That's why updating a reference (as well as updating state) shouldn't be performed inside the body of the functional component. In other words, keep your rendering logic pure.  

The reference can be updated either inside `useEffect()` or inside handlers (event handlers, timer handlers, etc).  

```jsx{7,10,15,18,21}
import { useRef, useEffect } from 'react';

function MyComponent({ prop }) {
  const myRef = useRef(0);

  useEffect(() => {
    myRef.current++; // Good!

    setTimeout(() => {
      myRef.current++; // Good!
    }, 1000);
  }, []);

  const handler = () => {
    myRef.current++; // Good!
  };

  myRef.current++; // Bad!

  if (prop) {
    myRef.current++; // Bad!
  }

  return <button onClick={handler}>My button</button>;
}
```

## 4. Summary

`useRef()` is the hook that let's you do 2 things: store mutable values that keep between renderings, as well access DOM elements.  

