---
title: 'React.useRef() Guide'
description: 'How to use React useRef() hook to create references and access DOM elements.'
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

Here are the 2 big rules to remember about the behavior of `useRef()` references:

A) Between component re-renderings the `reference.current` *maintains its value*;

B) Updating a reference `reference.current = newValue` *doesn't trigger a component re-rendering*.  

### 2.1 *useRef()* in practice

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



## 2. Access DOM elements

## 3. The rule of useRef()

## 4. Summary