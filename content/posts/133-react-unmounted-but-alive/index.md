---
title: "How to Cleanup Async Effects in React"
description: "How to handle the asynchornous effects in React that might finish after the component had unmounted."  
published: "2021-05-25T12:00Z"
modified: "2021-05-25T12:00Z"
thumbnail: "./images/cover-2.png"
slug: react-dispose-async-effects
tags: ['react', 'async']
recommended: ['react-useeffect-infinite-loop', 'react-hooks-stale-closures']
type: post
---

The common asynchonous side effects are: performing fetch requests to load data from a remote server, as well as handle timers like `setTimeout()`, debounce or throttle functions.  

Handling of the side-effects in React is a medium complexity task. However, time to time you might find some difficulties that are at the intersection of component lifecycle and the side effect lifecycle.  

## 1. The effect is active after unmounting

## 2. Cleaning up effects

### 2.1 Fetch request

### 2.2 Timer functions

### 2.3 Debounce and throttle

## 3. Conclusion