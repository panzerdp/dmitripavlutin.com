---
title: Use React memo wisely
description: "React memo only when used correctly increases the performance of components. It's best used with components that re-render often with rarely changing props."
published: "2019-07-14"
modified: "2019-07-14"
thumbnail: "./images/memo.jpg"
slug: use-react-memo-wisely
tags: ["react", "component", "memoization"]
recommended: ["7-architectural-attributes-of-a-reliable-react-component", "the-art-of-writing-small-and-plain-functions"]
type: post
---

Everyone likes fast and responsive user interfaces. 

When deciding whether or not use a tool (library, library feature, etc), I follow 2 axiomas:

* *"There are no silver bullets"*: only the situation dictates if a tool is useful
* *"Best code is no code"*: add more code only if you see real benefit

Having these axiomas in mind, I will describe in this post the scenarios when when React memo increase the performance of components. 

Last but not least, I will describe scenarios when React memo is useless. 

## 1. How React memo helps you

## 2. Cache hit ratio

## 3.When to use React memo

### 3.1 Often re-render with almost the same props

## 4. When to avoid React memo

### 4.1 Often changing props 

### 4.2 Rare or no re-render

## 5. Be aware of callback functions

## 5. Conclusion