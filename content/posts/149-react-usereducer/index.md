---
title: "React.useReducer() Hook: Explanation and Examples"
description: "How to use the useReducer() hook in React to manage complex state."
published: "2021-09-14T12:00Z"
modified: "2021-09-14T12:00Z"
thumbnail: "./images/cover-3.png"
slug: react-usereducer
tags: ['react', 'usereducer', 'hook']
recommended: ['react-useref-guide', 'react-useeffect-explanation']
type: post
---

If you landed on this post, most like you're already familiar with the `useState()` hook in React. That's the 
hook that let's you create, update and read state in functional React components.  

If you've used `useState()` to manage non-trivial state like a list of items, where you need to add, update and remove
items in the state, you might have noticed that the state management logic takes a good part of the component body.  

That's a problem because the React component in nature should contain the logic that target the output, but the state management
logic is a separate concern that should be managed in a separated place. Otherwise, you get a mix of state management and rendering logic in one place, 
and that's difficult to read, maintain, and test!  

To help you with the problem describe above, and extract the complex state management out of the component, and enable easy unit testing of it,
React prodives the special state management hook `useReducer()`.  

