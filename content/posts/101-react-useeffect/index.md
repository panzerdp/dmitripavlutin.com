---
title: "A Simple Explanation of React.useEffect()"
description: "How to use React useEffect() hook to execute side-effects in components."
published: "2020-10-13T12:00Z"
modified: "2020-10-13T12:00Z"
thumbnail: "./images/effect-4.jpg"
slug: react-useeffect-explanation
tags: ['react', 'hook', 'useEffect']
recommended: ['dont-overuse-react-usecallback', 'use-react-memo-wisely']
type: post
commentsThreadId: react-useeffect-explanation
---

When I was first reading about React hooks, I was impressed by their expressiveness.  

However, the brevity of hooks come with a price &mdash; they're relatively difficult to get started. This is especially true for `useEffect()` hook &mdash; the one that manages side-effects in React components.  

In this post, I'll learn how to use `useEffect()` from a simple explanation, interesting examples, and demos.  

## 1. *useEffect()* is for side-effects

A functional React component uses props and/or state to calculate the output, then return it. If the functional component makes calculations that don't target the output value, then these calculations are named *side-effects*.  

Examples of side-effects are fetching requests, manipulating DOM directly, use timer functions like `setTimeout()`, and more.  

You cannot perform side-effects directly in the body of the functional component. How often the component renders isn't something you can control &mdash; if React wants to render the component, you cannot stop it.  

```jsx{4}
function Greet({ name }) {
  const message = `Hello, ${name}!`; // Calculates output

  // Bad!
  document.title = 'Greetings page'; // Side-effect!

  return <div>{message}</div>;       // Calculates output
}
```

Invoking side-effects require a different mechanism that is implemented by `useEffect()` hook.  

```jsx{8}
import React, { useEffect } from 'react';

function Greet({ name }) {
  const message = `Hello, ${name}!`;   // Calculates output

  useEffect(() => {
    // Good!
    document.title = 'Greetings page'; // Side-effect!
  }, []);

  return <div>{message}</div>;         // Calculates output
}
```

`useEffect()` hook accepts 2 arguments:

```javascript
useEffect(callback, dependencies);
```

* `callback` is the function invoked after React has finished updating DOM
* `dependencies` is an optional array of dependencies. React is going to invoke the callback only when the dependencies array has changed.  

## 2. Dependencies control when side-effect runs

Often you'd like to invoke a side-effect when the component updates: being because of prop or state value change.  

Each time the side-effect uses props or state value, you must indicate the value inside the dependencies argument:

```jsx{9}
import React, { useEffect } from 'react';

function MyComponent({ prop }) {
  const [state, setState] = useState();

  useEffect(() => {
    someSideEffect(prop, state);
    // ....    
  }, [prop, state]);

  return <div>....</div>;
}
```

As soon as any value supplied in the dependencies array changes `[prop, state]`, the `useEffect(callback, [prop, state])` is going to invoke the `callback` after the changes are being committed to DOM.  

However, if the component re-renders but the dependencies values haven't changed, `useEffect()` doesn't invoke the callback.  

Using the dependencies argument of `useEffect()` you control when to invoke the side-effect, independently from the rendering cycles of the component. In simple words, that's the essence of `useEffect()` hook.  

## 3. Side-effect on component did mount

There are side-effects that you'd like to invoke once after the component has been mounted.  

To do so, supply the callback containing the side-effect executed after mounting, and indicate an empty dependencies array `[]`: 

```jsx{8}
import { useEffect } from 'react';

function Greet({ name }) {
  const message = `Hello, ${name}!`;

  useEffect(() => {
    document.title = 'Greetings page';
  }, []);

  return <div>{message}</div>;
}
```

`useEffect(..., [])` was supplied with an empty array as dependencies argument. This makes the `useEffect()` execute the callback *just once*, after initial mounting. 

Even if the component re-renders with different `name` property, the side-effect runs only once after the first render:

```jsx
// First render
<Greet name="Eric" />   // Side-effect runs

// Second render, name prop changes
<Greet name="Stan" />   // Side-effect doesn't run

// Third render, name prop changes
<Greet name="Butters"/> // Side-effect doesn't run
```

## 4. Side-effect on component did update

How to run a side-effect each time the component's prop or state changes? That's easy too! Just remember the simple rule:

> Mention the props or state values inside the dependencies array argument if you use them inside the callback of `useEffect(callback, dependencies)`.  

Let's improve the `Greet` component by making use of the `name` prop inside of the side-effect that changes the document title:

```jsx{8}
import { useEffect } from 'react';

function Greet({ name }) {
  const message = `Hello, ${name}!`;

  useEffect(() => {
    document.title = `Greetings to ${name}`; 
  }, [name]);

  return <div>{message}</div>;
}
```

`name` prop is mentioned in the dependencies argument of `useEffect(..., [name])`. When configured in such a way, `useEffect()` hook runs the callback having the side-effect after initial rendering, and on later renderings only if the `name` prop value changes.  

```jsx
// First render
<Greet name="Eric" />   // Side-effect runs

// Second render, name prop changes
<Greet name="Stan" />   // Side-effect runs

// Third render, name prop doesn't change
<Greet name="Stan" />   // Side-effect doesn't run

// Fourth render, name prop changes
<Greet name="Butters"/> // Side-effect runs
```

## 5. Fetching data

In the previous example, a simple side-effect was used: it was simply updating the document title.  

But you can encounter more complex side-effects, like fetching data. `useEffect()` is helpful to implement the data fetching too.  

The following component `FetchEmployeesByQuery` fetches the employees using fetch requests over the network. The supplied `query` property must be used to filter the fetched
employees whose name contains the query:

```jsx{7-12}
import React, { useState } from 'react';
import { fetchEmployees } from "./fetchEmployees";

function FetchEmployeesByQuery({ query }) {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      setEmployees(await fetchEmployees(query));
    };
    fetch();
  }, [query]);

  return (
    <div>
      {employees.map(name => <div>{name}</div>)}
    </div>
  );
}
```

Right after finishing the initial render of `<FetchEmployeesByQuery query="query">`, `useEffect()` hooks invokes the callback function that starts a fetch request by calling the asynchronous function `fetch()`.  

When the request completes, `setEmployees(await fetchEmployees(query))` updates the component state with the newly fetched employees list.  

When the `query` prop changes (the component is asked to a new list for a new query), `useEffect()` hook starts a new fetching process the same way.  

If you'd like to run just one fetch request when the component mounts, simply indicate an empty dependencies list: `useEffetch(fetchSideEffect, [])`.  

## 6. Side-effect cleanup

There are side-effects that need cleanup. In such a case the callback supplied as an argument to `useEffect()` can return a cleanup function:

```jsx
useEffect(() => {
  // Side-effect...

  const cleanup = () => {
    // Side-effect cleanup...
  };
  return cleanup;
}, dependencies);
```

After initial rendering, `useEffect()` simply invokes the callback of the side-effect function. `cleanup` function isn't invoked.  

On subsequent renderings, `useEffect()` is going to invoke the `cleanup` function from the previous side-effect (to clean up everything from the last side-effect), then the current side-effect.  

For example, let's log to console on each second a message:

```jsx
import React, { useEffect } from 'react';

function RepeatMessage({ message }) {
  useEffect(() => {
    setInterval(() => {
      console.log(message);
    }, 1000);
  }, [message]);

  return <div>I'm logging to console "{message}"</div>;
}
```

If you open the demo and try to type into the input field different message, you will see that for each new message the console is going to log the message.    

You need to stop the logging to console for the previous message. That's the right case to clean up the side-effect.  

Let's make the necessary adjustment:

```jsx{8-10}
import React, { useEffect } from 'react';

function RepeatMessage({ message }) {
  useEffect(() => {
    const id = setInterval(() => {
      console.log(message);
    }, 1000);
    return () => {
      clearInterval(id);
    };
  }, [message]);

  return <div>I'm logging to console "{message}"</div>;
}
```

The callback supplied to `useEffect()` returns a cleanup function that stops the previous interval. Open the demo and see how it works.  

## 7. Conclusion

`useEffect(callback, dependencies)` is the hook that manages the side-effects in React. 

`callback` argument is the function invoked after changes are committed to DOM: here is where you put the side-effect logic. `dependencies` is a list of dependencies of your side-effect: being props or state values.  

Because `useEffect()` hook heavily relies on closures, you might need to [get them well](/simple-explanation-of-javascript-closures/). Also be aware of [stale closures issue](/react-hooks-stale-closures/).  

*Still have questions about `useEffect()` hook? Feel free to ask in the comments below.*