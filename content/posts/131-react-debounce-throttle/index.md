---
title: "How to Correctly Debounce and Throttle Callbacks in React"
description: "How to correctly create debounced and throttled callbacks in React using useMemo() hook."
published: "2021-05-11T08:00Z"
modified: "2021-05-11T08:00Z"
thumbnail: "./images/cover-3.png"
slug: react-throttle-debounce
tags: ['react', 'callback']
recommended: ['javascript-callback', 'controlled-inputs-using-react-hooks']
type: post
---

When a React component handles bursting events like window resize, scrolling, user typing into an input, etc. it makes sense to soften the execution of the callbacks of these events. Othwerise the handlers of these events are invoked too often, and you risk to make the application lagging or even unresponsive for a few seconds.   

For example, if the user types a query into an input field, and the component fetches data from the API using that query &mdash; then don't make the request as soon as the user types a character, but wait around 300ms until the user has typed the last character &mdash; then perform the request. This is debouncing.  

In this post, I'll learn how to correctly use React hooks to create debounced and throttled callbacks in React.  

*If you're unfamiliar with debounce and throttle concepts, I recommend checking [Debouncing and Throttling Explained Through Examples](https://css-tricks.com/debouncing-throttling-explained-examples/).*

## 1. The callback without debouncing

## 2. Debouncing a callback, first attempt

## 3. Debouncing a callback, second attempt

## 4. Conclusion