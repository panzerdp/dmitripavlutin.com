---
title: 'A Simple Guide to "Props" in React'
description: "In this guide you'll find what are component's props in React and how to use them."
published: "2021-07-02T12:00Z"
modified: "2021-07-02T12:00Z"
thumbnail: "./images/cover-4.png"
slug: react-props
tags: ['react']
recommended: ['react-state-management', 'use-react-memo-wisely']
type: post
---

To start using React you don't have to learn a lot. Understand the concept of 
components, state, props, and hooks &mdash; and you basically know how to use React.  

In this post, you'll read a simple but pragmatic guide on how to use props on React components.  

## 1. The component props

A component in React is an encpasulated piece of logic. For example, here's a component that displays a `Hello, World!` message:

```jsx
function Message() {
  return <span>Hello, World!</span>;
}
```

```jsx
// Render
<Message />

// Output
<span>Hello, World!</span>
```

The problem with `<Message />` component is that it displays a static value: `Hello, World!`.  

But how to display a message for an arbitary person, not just `World`? You can use the concept of component *props*.  

Let's make the `<Message />` component more reusable, and add to it the prop `who`. 

There are 2 steps to add a prop to a component.  

*1) Make the function of your component read the props from the `props` parameter*:

```jsx{1}
function Message(props) {
  return <span>Hello, {props.who}!</span>;
}
```

Now `Message` function has a parameter `props`. When rendering this component, React will make sure to assign to `props` object all the props you assign to the component.  

*2) When rendering the component, add the prop to the compnent using the attribute syntax `who="Earth"`:*

```jsx
// Render
<Message who="Earth" />

// Output
<span>Hello, Earth!</span>
```

What's great is that you can use any value you'd like. For example, let's greet the `Mars`!

```jsx
// Render
<Message who="Mars" />

// Output
<span>Hello, Mars!</span>
```

## 1.1 Passing down props

## 2. The values of props

## 3. Optional props

## 4. Props spread syntax

## 5. Special prop: *children*

## 6. Conclusion