---
title: "Don't Overuse React.useCallback()"
description: "React.useCallback() memoizes callback functions and prevents unnecessary re-render of components that use callbacks as props."
published: "2020-05-02T12:30Z"
modified: "2020-05-02T12:30Z"
thumbnail: "./images/cover.jpg"
slug: use-react-usecallback-carefully
tags: ["react", "component", "memoization"]
recommended: ["use-react-memo-wisely", "react-usestate-hook-guide"]
type: post
commentsThreadId: react-usecallback
---

A reader of my blog reached me on Facebook with an interesting question. He said his teammates are wrapping every callback function inside `useCallback()`, no matter the situation:

```jsx{4-6}
import React, { useCallback } from 'react';

function MyComponent() {
  const handleClick = useCallback(() => {
    // handle the click event
  }, []);

  return <button onClick={handleClick}>Click me</button>;
}
```

Every callback function should be memoized in order to prevent useless re-render of the components or elements that use the callback function. 

Unfortunately, that's far from truth. 

## 1. The purpose of useCallback()

## 2. A good use case

## 3. Another good use case

## 4. A bad use case

## 5. The ballancing forces

## 6. useCallback() usage checklist

