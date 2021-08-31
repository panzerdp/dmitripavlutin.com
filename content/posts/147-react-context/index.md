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

## 1. How to define and use context in React

The context can help you to provide data to components no matter how deep they are in the components nesting.  

Using the context in React usually requires initialization and wiring the 3 main components of the context: the context itself, the context provider and the context consumer.  


A. Define the context

```javascript
import { createContext } from 'react';
const MyContext = createContext(initialValue);
```

B. Provide the context

C. Consume the context

## 2. When do you need a context?

### 2.1 The props drilling problem

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
<Application /> 
// renders 
<span>John Smith</span>
```

In the example above `<Application />` is a parent component. Note that the parent component has some data, for simplicity, let's say the name of the user `userName`.  

The parent component assigns `userName` data to its child component `<UserInfo name={userName} />` using the `name` prop available on the  `<UserInfo />` child component.  

That's pretty the standard way how data is assigned in React using props. You can use this approach without problems.  

But the situation changes when `<UserInfo />` child component isn't a direct child of `<Application />`, but is contained within multiple intermediate parents. That could happen, for example, when `<UserInfo />` is rendered inside of `<Header />` component, which in turn is rendered inside of a `<Layout />` component.  

### 2.2 Context to the rescue

## 3. Conclusion