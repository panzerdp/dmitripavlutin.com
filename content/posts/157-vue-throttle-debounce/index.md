---
title: "How to Debounce and Throttle Event Handlers in Vue"
description: "How to apply debouncing and throttling techniques to amortize the execution of event handlers in Vue"
published: "2021-11-03T09:20Z"
modified: "2021-11-03T09:20Z"
thumbnail: "./images/cover-3.png"
slug: vue-debounce-throttle
tags: ['vue', 'callback', 'event']
recommended: ['react-throttle-debounce', 'vue-show-hide-elements']
type: post
---

If you've been dealing with often occurring events like user typing into the input field, window resize, scroll, intersection observer events, you might notice that invoking an action when such an event occurs is not the best choice.  

These events could occurs so often, e.g. a few times per second, that invoking an action a fetch request, on every event isn't a wise approach.  

In such cases you would be interested to amortize, or slow down, the execution of the event handlers. Such amortizing techniques are [debouncing and throttling](https://css-tricks.com/debouncing-throttling-explained-examples/).  

In this post, let's see how you can apply debouncing and throttling to Vue components.  

## 1. Debouncing input change event

