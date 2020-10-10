---
title: "A Simple Explanation of React.useEffect()"
description: "Learn how to use React useEffect() hook from examples and demos."
published: "2020-10-13T12:00Z"
modified: "2020-10-13T12:00Z"
thumbnail: "./images/effect-4.jpg"
slug: react-useeffect-explanation
tags: ['react', 'hook', 'useEffect']
recommended: ['dont-overuse-react-usecallback', 'use-react-memo-wisely']
type: post
commentsThreadId: react-useeffect-explanation
---

When I first read about the new React hooks feature, I was impressed by the expressiveness and their possibilities.  

But the expressiveness and brevity of hooks comes with a price &mdash; it's relatively difficult to get started with them.  

From this reason I had difficulties in understanding the `useEffect()` hook: the one that manages side-effects in React components.  

While you'll read some theory of `useEffect()` in the first section, in this post you'll learn `useEffect()` from interesting examples and demos.  

```toc
```

## 1. useEffect() API

A functional React component uses props and state values to calculate and return the output. If the functional component makes calculations that don't target the output value, then these calculations are named *side-effects*.  

Examples of side-effects are fetch requests, manipulating DOM directly, use timer functions like `setTimeout()`, and more.  

You cannot perform side-effects directly in the body of the functional component. When and how often the component renders isn't something you can control &mdash; if React wants to render the component, you cannot stop it.  

```jsx{4}
function Greet({ name }) {
  const message = `Hello, ${name}!`; // Calculates output
  // Bad!
  document.title = 'Greetings page'; // Side-effect!
  return <div>{message}</div>;       // Calculates output
}
```

Invoking side-effects require a different mechanism that is implemented by `useEffect()` hook.  

```jsx{5}
function Greet({ name }) {
  const message = `Hello, ${name}!`;   // Calculates output
  useEffect(() => {
    // Good!
    document.title = 'Greetings page'; // Side-effect!
  }, []);
  return <div>{message}</div>;         // Calculates output
}
```

`useEffect` accepts 2 arguments:

```javascript
useEffect(callback, dependencies);
```

* `callback` is the function invoked after React has finished updating DOM
* `depenendencies` is an optional array of dependencies. React is going to invoke the callback only when dependencies array has changed.  

## 2. Controlling the side-effects using dependencies

Often you'd like to invoke a side-effect when the component updates: being because of prop or state value change.  

Each time the side-effect uses props or state value, you must indicate the value inside the dependencies argument:

```jsx
function MyComponent({ prop }) {
  const [state, setState] = useState();

  useEffect(() => {
    someSideEffect(prop, state);
    // ....    
  }, [prop, state]);

  return <div>....</div>;
}
```

As soon as any value supplied in the dependencies array changes `[prop, state]`, the `useEffect(callback, [prop, state])` is going to invoke the `callback` argument after the changes are being commited to DOM.  

However, if the component re-renders but the dependencies values haven't changed, `useEffect()` isn't going to invoke the callback argument.  

Using dependencies argument of `useEffect()` you control when to invoke the side-effect, independenly from the rendering cycles of the component.  

## 3. Component did mount

There are side-effects that you'd like to invoke only once after the component has been mounted.  

To do so you need to supply the callback containing the side-effect executed after mounting, and as well supply an empty dependencies array `[]`: 

```jsx{4}
function Greet({ name }) {
  const message = `Hello, ${name}!`;   // Calculates output
  useEffect(() => {
    document.title = 'Greetings page'; // Side-effect!
  }, []);
  return <div>{message}</div>;         // Calculates output
}
```

Open the demo and check the title of the page. As soon as the output of the `<Greet>` component is applied to DOM, the `useEffect()` hook invokes the callback.   

`useEffect(..., [])` was supplied with an empty array as dependencies argument. This makes the `useEffect()` execute the callback *just once*, after initial mounting.  

## 4. Component did update



## 5. Side-effect cleanup

## 6. Summary