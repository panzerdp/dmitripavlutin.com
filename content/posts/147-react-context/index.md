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


A. Define the context using `createContext()` built-in function:

```javascript
import { createContext } from 'react';

export const MyContext = createContext(initialValue);
```

B. Provide the context using the property `MyContext.Provider` of the context instance:

```javascript
import { MyContext } from './myContext';

function MyComponent() {
  const value = 'My Value';
  return (
    <MyContext.Provider value={value}>
      <MyContextUser />
    </MyContext>
  );
}
```

C. Consume the context inside of the components that are wrapped in a context provider:

```jsx
import { useContext } from 'react';
import { MyContext } from './myContext';

function MyContextUser() {
  const value = useContext(MyContext);

  return <span>{value}</span>;
}
```

## 2. When do you need a context?

### 2.1 The props drilling problem

The simplest way to pass data from a parent to a child component is simply when the parent assigns props to its child component:

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

The parent component `<Application />` assigns `userName` data to its child component `<UserInfo name={userName} />` using the `name` prop.  

That's pretty the standard way how data is assigned in React using props. You can use this approach without problems.  

But the situation changes when `<UserInfo />` child component isn't a direct child of `<Application />`, but is contained within multiple intermediate parents. That could happen, for example, when `<UserInfo />` is rendered inside of `<Header />` component, which in turn is rendered inside of a `<Layout />` component.  

### 2.2 Context to the rescue

## 3. Conclusion