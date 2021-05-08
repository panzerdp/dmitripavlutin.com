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

When a React component watches events like window resize, user typing into an input, etc. it makes sense to soften the execution of the callbacks of these events.  

For example, if the user types into an input field and the component makes requests to server to perform some queries, 