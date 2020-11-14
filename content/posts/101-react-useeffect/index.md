---
title: "A Simple Explanation of React.useEffect()"
description: "useEffect() hook executes side-effects in React components."
published: "2020-10-13T08:50Z"
modified: "2020-11-14T12:00Z"
thumbnail: "./images/effect-4.jpg"
slug: react-useeffect-explanation
tags: ['react', 'hook', 'useeffect']
recommended: ['dont-overuse-react-usecallback', 'use-react-memo-wisely']
type: post
---

I am impressed by the expressiveness of React hooks. You can do so much by writing so little.   

But the brevity of hooks has a price &mdash; they're relatively difficult to get started. This is true for `useEffect()` &mdash; the hook that manages side-effects in functional React components.  

In this post, you'll find everything to understand and start using `useEffect()` hook.  

## 1. *useEffect()* is for side-effects

A functional React component uses props and/or state to calculate the output. If the functional component makes calculations that don't target the output value, then these calculations are named *side-effects*.  

Examples of side-effects are fetch requests, manipulating DOM directly, using timer functions like `setTimeout()`, and more.  

Normally the component rendering and side-effect invocation logic are *independent*.  

It would be a mistake to perform side-effects directly in the body of the functional component. How often the component renders isn't something you can control &mdash; if React wants to render the component, you cannot stop it.  

```jsx{5}
function Greet({ name }) {
  const message = `Hello, ${name}!`; // Calculates output

  // Bad!
  document.title = 'Greetings page'; // Side-effect!

  return <div>{message}</div>;       // Calculates output
}
```

 How to decouple rendering from side-effect? Welcome `useEffect()` &mdash; the hook that runs side-effects independently of rendering.    

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
useEffect(callback[, dependencies]);
```

* `callback` is the callback function containing side-effect logic. `useEffect()` executes the callback function after React has committed the changes to the screen.
* `dependencies` is an optional array of dependencies. `useEffect()` executes `callback` only when the dependencies have changed between renderings.  

`dependencies` array lets you control when the side-effect runs. When dependencies are:

* Not provided: the side-effect runs after *each* rendering
* An empty array `[]`: the side-effect runs *once* after the initial rendering
* Has props or state values `[prop1, prop2, ..., state1, state2]`: the side-effect runs *only when any value in the dependencies change*.

In simple words, put the side-effect logic inside the `callback` argument, and use `dependencies` argument to control when the side-effect should run. That's the sole purpose of `useEffect()`.  

## 2. Side-effect on component did mount

There are side-effects that you'd like to invoke once after the mounting of the component.  

To do so, indicate an empty dependencies array `[]` to `useEffect(..., [])`: 

```jsx{9}
import { useEffect } from 'react';

function Greet({ name }) {
  const message = `Hello, ${name}!`;

  useEffect(() => {
    // Run once, after mounting
    document.title = 'Greetings page';
  }, []);

  return <div>{message}</div>;
}
```

`useEffect(..., [])` was supplied with an empty array as dependencies argument. When configured in such a way, the `useEffect()` is going to execute the callback *just once*, after initial mounting. 

Even if the component re-renders with different `name` property, the side-effect runs only once after the first render:

```jsx
// First render
<Greet name="Eric" />   // Side-effect RUNS

// Second render, name prop changes
<Greet name="Stan" />   // Side-effect does NOT RUN

// Third render, name prop changes
<Greet name="Butters"/> // Side-effect does NOT RUN
```

## 3. Side-effect on component did update

Each time the side-effect uses props or state values, you must indicate these values as dependencies:

```jsx{8}
import React, { useEffect } from 'react';

function MyComponent({ prop }) {
  const [state, setState] = useState();

  useEffect(() => {
    // Side-effect uses `prop` and `state`
  }, [prop, state]);

  return <div>....</div>;
}
```

The `useEffect(callback, [prop, state])` invokes the `callback` after the changes are being committed to DOM and *if and only if* any value in the dependencies array `[prop, state]` have changed.  

Using the dependencies argument of `useEffect()` you control when to invoke the side-effect, independently from the rendering cycles of the component. Again, *that's the essence of `useEffect()` hook.*  

Let's improve the `Greet` component by using `name` prop in the document title:

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

`name` prop is mentioned in the dependencies argument of `useEffect(..., [name])`. `useEffect()` hook runs the side-effect after initial rendering, and on later renderings only if the `name` value changes.  

```jsx
// First render
<Greet name="Eric" />   // Side-effect RUNS

// Second render, name prop changes
<Greet name="Stan" />   // Side-effect RUNS

// Third render, name prop doesn't change
<Greet name="Stan" />   // Side-effect does NOT RUN

// Fourth render, name prop changes
<Greet name="Butters"/> // Side-effect RUN
```

## 4. Fetching data

`useEffect()` can perform data fetching side-effect.  

The following component `FetchEmployeesByQuery` fetches the employees list over the network. The `query` prop filters the fetched employees:

```jsx
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

Inside `<FetchEmployeesByQuery query="query">`, `useEffect()` starts a fetch request by calling the asynchronous function `fetch()` right after the initial mounting.    

When the request completes, `setEmployees(await fetchEmployees(query))` updates the component state with the newly fetched employees list.  

On later renderings, if the `query` prop changes, `useEffect()` hook starts a new fetching process for a new `query` value.  

To run only once the fetch request when the component mounts, simply indicate an empty dependencies list: `useEffect(fetchSideEffect, [])`.  

## 5. Side-effect cleanup

There are side-effects that need cleanup. `useEffect()` invokes the clean up function you return from the callback function:

```jsx{4-6}
useEffect(() => {
  // Side-effect...

  return function cleanup() {
    // Side-effect cleanup...
  };
}, dependencies);
```

Cleanup works the following way: 

A) After initial rendering, `useEffect()` invokes the callback having the side-effect. `cleanup` function is not invoked.  

B) On later renderings, before invoking the next side-effect, `useEffect()` is going to invoke the `cleanup` function from the previous side-effect execution (to clean up everything after the previous side-effect), then runs the current side-effect.  

C) Finally, after unmounting the component, `useEffect()` invokes the cleanup function from the latest side-effect.  

For example, let's log a message to console every 3 seconds:

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

Open the [demo](https://codesandbox.io/s/restless-wildflower-c0cfw?file=/src/App.js) and type different messages &mdash; the console logs every 3 seconds each message ever typed.  

You need to stop the logging of previous messages. That's the right case to cleanup the side-effect: cancel the previous timer when starting a new one.    

Let's return a cleanup function that clears the previous timer:

```jsx{8-10}
import React, { useEffect } from 'react';

function RepeatMessage({ message }) {
  useEffect(() => {
    const id = setInterval(() => {
      console.log(message);
    }, 3000);
    return () => {
      clearInterval(id);
    };
  }, [message]);

  return <div>I'm logging to console "{message}"</div>;
}
```

Open the [demo](https://codesandbox.io/s/gracious-tdd-gy4zo?file=/src/App.js) and type some messages: only the latest message logs to console.  

## 6. Conclusion

`useEffect(callback, dependencies)` is the hook that manages the side-effects in functional components. `callback` argument is the place to put the side-effect logic. `dependencies` is a list of dependencies of your side-effect: being props or state values.  

`useEffect()` will make sure to invoke the `callback` after initial mounting, and on later renderings if any value inside `dependencies` has changed.  

Because `useEffect()` hook heavily relies on closures, you might need to [get them well](/simple-explanation-of-javascript-closures/) too. Also be aware of [stale closures issue](/react-hooks-stale-closures/).  

*Still have questions about `useEffect()` hook? Ask in the comments below!*