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

There are 2 big rules to remember about the behavior of `useRef()` references:

A) Between component re-renderings the value of the reference (`value = reference.current`) *stays the same*;

B) Updating a reference (`reference.current = newValue`) *doesn't trigger a component re-rendering*.  

### 2.1 Use case: *useRef()* as value holder

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

### 2.2 The difference from state

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

And that is the main difference between state (created by `useState()` hook) and references (created by `useRef()` hook): *updating state does trigger re-rendering, while updating a reference does not*.  

## 2. Access DOM elements

Another useful application of the `useRef()` hook is that it allows you to access DOM elements directly.  

You can do this pretty simple: 

A) Define a reference that's going to keep the link to DOM element `const elementRef = useRef()`; 

B) Use the reference as a value to `ref` attribute to the element you'd like to access: `<div ref={elementRef}></div>`;

C) Finally the reference contains a link to the DOM element: `elementRef.current` is an `HTMLElement`.  

### 2.1 Use case: *useRef()* accessing elements



## 3. The rule of useRef()

## 4. Summary