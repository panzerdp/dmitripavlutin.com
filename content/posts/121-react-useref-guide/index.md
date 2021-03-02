---
title: 'React.useRef() Guide'
description: 'React.useRef() hook solves 2 issues: holds mutable values that persist between component renderings and reference DOM elements.'
published: "2021-03-02T12:00Z"
modified: "2021-03-02T12:00Z"
thumbnail: "./images/cover-4.png"
slug: react-useref-guide
tags: ['react', 'useref', 'hook', 'dom', 'element']
recommended: ['react-useeffect-explanation', 'use-react-memo-wisely']
type: post
---

`React.useRef()` is a hook that solves 2 main issues: holding mutable values that should persist between component renderings and reference DOM elements.  

In this post, you'll learn in detail how `useRef()` works. Interesting demos included.  

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

`useRef(initialValue)` accepts one argument that sets the initial value of the reference. The hook returns a special value &mdash; named *reference*, or *ref* &mdash; which is an object having one property `current`:

```javascript
const reference = useRef(initialValue);

reference; // => { current: <referenceValue> }
```

Read the property `reference.current` to access the reference value, as well update that property `reference.current = newValue` to set a new value to the reference. 

There are 2 main rules to remember about the behavior of `useRef()` references:

1. The value of the reference is *persisted* (stays the same) between component re-renderings;

* Updating a reference *doesn't trigger a component re-rendering*.  

Now, let's see how `useRef()` works in practice.

### 1.1 Use case: logging button clicks

The component `LogButtonClicks` uses a reference to store the number of clicks on a button: 

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

When the button is clicked, `handle` function is invoked where `countRef.current++` gets incremented. The ref value is logged to the console.  

What's interesting is that clicking the button and updating the reference value `countRef.current++` doesn't trigger component re-rendering. You can see that by `'I rendered!'` message being logged to console just once: during the initial rendering of the component.  

Now a reasonable question: what's the main difference between using `useRef()` and `useState()`?  

#### Reference and state diff

Let's reuse the component `LogButtonClicks` from the previous section, but use `useState()` hook to count the number of button clicks:  

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

Open the demo and click the button. Each time you click, you will see in the console the message `'I rendered!'` &mdash; that each time the state is updated, the component re-renders.  

So, the 2 main differences between state and references:

1. Updating state does trigger component re-rendering while updating a reference doesn't.  

2. The state update is asynchronous (the state variable is updated after re-rendering), while the reference updates synchronously (the updated value is available right away)

From a higher point of view, references are used to store infrastructure data of the component, while the state stores information that is directly rendered on the screen.  

### 1.2 Use case: implementing a stopwatch

The things you can store inside a reference are infrastructure information that involves some kind of side-effect. For example, you can store into a reference the timer ids, different kinds of pointers (e.g. socket ids).  

The following component `Stopwatch` starts a `setInterval()` timer function that increases each second the counter of a stopwatch.  

Because the timer id should persist between renderings of the component (`count` state increases each second and triggers re-rendering), it is wise to keept the timer id in a reference `const timerIdRef = useRef(0)`:  

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

`timerIdRef` is a reference that holds the `setInterval()` timer id.  

`startHandler()` function, which is invoked when the *Start* button is clicked, starts the timer and saves its id to the reference `timerIdRef.current = setInterval(...)`.  

When the user decides to stop the stopwatch, one clicks *Stop* button. The corresponding `stopHandler()` accesses the timer id from the reference and stops the timer `clearInterval(timerIdRef.current)`.  

Additionally, if the component unmounts with the stopwatch active, the cleanup function of `useEffect()` is going to stop the timer.  

*Side challenge: can you improve the stopwatch by adding a Reset button? Share your solution in a comment below!*

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

The classic example of when you need to access DOM elements is to focus on the input element as soon as the component renders.  

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

#### Ref is null on initial rendering

Note that during initial rendering, the reference that holds the DOM element is empty:  

```jsx{8,14}
import { useRef, useEffect } from 'react';

function InputFocus() {
  const inputRef = useRef();

  useEffect(() => {
    // Logs `HTMLInputElement` 
    console.log(inputRef.current);

    inputRef.current.focus();
  }, []);

  // Logs `undefined` during initial rendering
  console.log(inputRef.current);

  return <input ref={inputRef} type="text" />;
}
```

[Try the demo.](https://codesandbox.io/s/empty-on-initial-rendering-5my4g?file=/src/App.js)

During initial rendering, the DOM structure isn't created yet. React just doesn't know what content the component is going to output.  

That's why `inputRef.current` evaluates to `undefined` during initial rendering before React has committed any changes to DOM.  

However, `useEffect()` hook invokes the callback right after initial rendering and changes being committed to the DOM. In such a case, the input element has already been created, and `inputRef.current` evaluates to the actual input element.  

## 3. Updating references restriction

The function scope of the functional React component should either calculate the output, either invoke hooks.  

That's why updating a reference (as well as updating state) shouldn't be performed inside the immediate scope of the functional component. The reference can be updated either inside `useEffect()` or different kinds of handlers (event handlers, timer handlers, etc).  

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

`useRef()` hook can do 2 things: store mutable values that persist between renderings, as well access DOM elements.  

Calling `const reference = useRef(initialValue)` with the initial value returns a special object named reference. The reference object has a property `current`: you can use this property to access the reference value `reference.current`, or update the reference `reference.current = newValue`.  

Between the component re-renderings, the value of the reference is persistent. 

References can also access DOM elements. Assign the reference to `ref` attribute of the element you'd like to have access to: `<div ref={reference}>Element</div>`. Then you can access the element by reading `reference.current`.  

Want to improve you React knowledge further? Follow [A Simple Explanation of React.useEffect()](/react-useeffect-explanation/).  

*Challenge: write a custom hook that works as `useEffect()`, only that it doesn't invoke the callback after initial rendering (Hint: you need to use `useRef()`). Share your solution in a comment below!*