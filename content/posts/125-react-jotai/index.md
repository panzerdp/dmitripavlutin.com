---
title: 'A Guide to Jotai: the Minimalist React State Management Library'
description: "Jotai is a primitive and flexible state management for React."
published: "2021-03-30T12:00Z"
modified: "2021-03-30T12:00Z"
thumbnail: "./images/cover.png"
slug: react-jotai-state-management
tags: ['react', 'state', 'open source']
recommended: ['react-usestate-hook-guide', 'react-useref-guide']
type: post
---

Redux had been for a long time the leader of the global state management in React. *Action -> reducer -> state* paradigm is pretty 
efficient in solving a lot of global state management tasks.  

But with the introduction of hooks, I have found that alternative libraries like [react-query](https://react-query.tanstack.com/) or [useSWR()](https://swr.vercel.app/) handle the fetching of data in much less ceremony than Redux.  

While `redux-query` or `useSWR()` simplify greatly the management of asynchornously fetched data &mdash; there still remains some global state that you have to manage.  

For such simple global state, like storing whether a side-menu is expanded or not, fits well a simple React state management library &mdash; thus welcome `jotai` https://github.com/pmndrs/jotai.  

