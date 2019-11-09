---
title: "Your Guide on React useState()"
description: "useState() is a hook that manages the state in functional React components."
published: '2019-11-12T14:00Z'
modified: '2019-11-12T14:00Z'
thumbnail: './images/wood.jpg'
slug: react-usestate-guide
tags: ['react', 'component', 'state', 'hook']
recommended: ['react-hooks-stale-closures', 'use-react-memo-wisely']
type: post
commentsThreadId: react-usestate-wise-guide
---

The state is information hidden inside of a component. The component can modify its state, without outside component knowing about it.  

In React the class-based components can have state. However, I don't like classes much, maybe because they are too verbose.  

So if you prefer functional components instead, like I do, then you need `useState()` hook to enable state management inside functional components.  

In this guide you will read how to manage the state of components using `useState()`. While this hook is simple at first, you also should be aware of its common usage pitfalls: 

# 1. State management using *useState()*

The state management consists of the following steps:

1. *Declaring state*: enabling state in a functional component
2. *Initializing state*: setting the initial value of the state
3. *Reading state*: how to read the state
4. *Updating state*: how to update the state

Let's see how to implement these steps using `useState()` hook.  

## 1.1 Declaring state

In regard of the state, let's divide the functional components into 2 categories:

1. *Stateless* functional components: those without state
2. *Stateful* functional components: those with state

## 1.2 Initializing state

## 1.3 Reading state

## 1.4 Updating state

# 2. Lazy initialization of state

# 3. Multiple states

# 4. Pitfalls

## 4.1 Incorrect place to declare state

## 4.2 Incorrect place to set state

## 4.3 Stale state

## 4.4 Complex state

# 5. Conclusion