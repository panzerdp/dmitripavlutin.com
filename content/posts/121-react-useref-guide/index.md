---
title: 'React.useRef() Guide'
description: 'React.useRef() creates references holding mutable values persisting between component renderings or access DOM elements.'
published: "2021-03-02T12:00Z"
modified: "2021-03-02T12:00Z"
thumbnail: "./images/cover-4.png"
slug: react-useref-guide
tags: ['react', 'useref', 'hook', 'element']
recommended: ['react-useeffect-explanation', 'use-react-memo-wisely']
type: post
---

`React.useRef()` is a hook that solves 2 main issues: it can hold mutable values that should persist between component renderings or reference DOM elements directly.  

In this post, I'll describe in detail how `useRef()` works and when you should use it. Interesting demos included.  

## 1. Mutable values

The usage of `useRef()` hooks is pretty straigfoward:

```javascript
const reference = useRef(initialValue);

// Access reference value:
reference.current;

// Update reference value:
reference.current = newValue;
```

`reference = useRef(initialValue)` accepts one argument which sets the initial value of the reference. The hook returns a special value, named reference.  

`current` property is the workhorse of the reference. Read `value = reference.current` property to access the reference value, as well update the property `reference.current = newValue` to set a new value to the reference.  

There are 2 main rules to remember about the behavior of `useRef()` references:

A) Between component re-renderings the value of the reference (`value = reference.current`) *stays the same*;

B) Updating a reference (`reference.current = newValue`) *doesn't trigger a component re-rendering*.  

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

Try the demo.

`const countRef = useRef(0)` creates a references `countRef` initialized with `0`.  

When the button is clicked, `handle` function is invoked where `countRef.current++` gets incremented. Then to console is logged the ref value.  

What's interesting is that no matter how many times you click the button and `countRef.current++` gets incremented: that doesn't trigger re-rendering. You can see that by `'I rendered!'` message being logged to console just once: during initial rendering of the component.  

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

Try the demo.

Open the demo and click a few times the button. Each time you click, you will see in console the message `'I rendered!'`. It demonstrates that each time the state is updated, the component re-renders.  

So, the 2 main difference between state and references:

1. Updating state does trigger component re-rendering, while updating a reference doesn't.  

2. The state update is asynchronous (the state variable is updated after re-rendering), while the reference is update synchornously (the updated value is available right away)

### 1.2 Use case: implementing a stopwatch

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

Try the demo.

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

