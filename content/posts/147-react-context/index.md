---
title: "A Simple Explanation of React Context and useContext() Hook"
description: "What is the context concept in React and how to use useContext() hook"
published: "2021-08-31T12:00Z"
modified: "2021-08-31T12:00Z"
thumbnail: "./images/cover-2.png"
slug: react-context-and-usecontext
tags: ['react', 'hook']
recommended: ['react-useref-guide', 'react-useeffect-explanation']
type: post
---

In this post, you'll learn what is the context concept in React and when you'd need to use it.  



## 1. Why do you need a context?

The simplest way to pass data from a parent to a child component is to pass them using props. Saying it differently, the parent assigns needed data to props of the
child component:

```jsx
function Application() {
  const userName = "John Smith";
  return <UserInfo name={userName} />;
}

function UserInfo(props) {
  return <span>{props.name}</span>;
}
```

```jsx
<Parent /> 
// renders 
<span>John Smith</span>
```

In the example above `<Application />` is a parent component. Note that the parent component has some data, for simplicity, let's say the name of the user `userName`.  



## 2. How to define and use context

### 2.1 Define a context

### 2.2 Provide a context

### 2.3 Consume a context

## 3. Conclusion