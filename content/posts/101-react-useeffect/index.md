---
title: "A Simple Explanation of React.useEffect()"
description: "useEffect() hook executes side-effects in React components."
published: "2020-10-13T08:50Z"
modified: "2020-10-14T09:00Z"
thumbnail: "./images/effect-4.jpg"
slug: react-useeffect-explanation
tags: ['react', 'hook', 'useeffect']
recommended: ['dont-overuse-react-usecallback', 'use-react-memo-wisely']
type: post
commentsThreadId: react-useeffect-explanation
---

I am impressed by the expressiveness of React hooks. You can do so much by writing so little.   

But the brevity of hooks has a price &mdash; they're relatively difficult to get started. This is true for `useEffect()` &mdash; the hook that manages side-effects in React components.  

In this post, I wrote a simple and accessible explanation of `useEffect()`.  

## 1. *useEffect()* is for side-effects

A functional React component uses props and/or state to calculate the output. If the functional component makes calculations that don't target the output value, then these calculations are named *side-effects*.  

Examples of side-effects are fetching requests, manipulating DOM directly, using timer functions like `setTimeout()`, and more.  

You cannot perform side-effects directly in the body of the functional component. How often the component renders isn't something you can control &mdash; if React wants to render the component, you cannot stop it.  

```jsx{5}
function Greet({ name }) {
  const message = `Hello, ${name}!`; // Calculates output

  // Bad!
  document.title = 'Greetings page'; // Side-effect!

  return <div>{message}</div>;       // Calculates output
}
```

The component rendering and side-effect invocation have to be *independent*. Welcome `useEffect()` &mdash; the hook that runs side-effects independently of rendering.    

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

`dependencies` array lets you control when the side-effect runs:

* Not provided: the side-effect runs after *each* rendering
* An empty array `[]`: the side-effect runs *once* after the initial rendering
* With props or state values `[prop1, prop2, ..., state1, state2]`: the side-effect runs *only when any value in the dependencies change*.

## 2. Side-effect on component did mount

There are side-effects that you'd like to invoke once after the component mounting.  

To do so, supply the callback with side-effect and indicate an empty dependencies array `[]`: 

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

## 3. Side-effect on component did update

Each time the side-effect uses props or state values, you must indicate these values as dependencies:

```jsx{8,10}
import React, { useEffect } from 'react';

function MyComponent({ prop }) {
  const [state, setState] = useState();

  useEffect(() => {
    someSideEffect(
      prop, state
    );
  }, [prop, state]);

  return <div>....</div>;
}
```

The `useEffect(callback, [prop, state])` invokes the `callback` after the changes are being committed to DOM *only if* any value in the dependencies array `[prop, state]` changes.  

Using the dependencies argument of `useEffect()` you control when to invoke the side-effect, independently from the rendering cycles of the component. *That's the essence of `useEffect()` hook.*  

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
<Greet name="Eric" />   // Side-effect runs

// Second render, name prop changes
<Greet name="Stan" />   // Side-effect runs

// Third render, name prop doesn't change
<Greet name="Stan" />   // Side-effect doesn't run

// Fourth render, name prop changes
<Greet name="Butters"/> // Side-effect runs
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

After finishing the initial render of `<FetchEmployeesByQuery query="query">`, `useEffect()` hook starts a fetch request by calling the asynchronous function `fetch()`.  

When the request completes, `setEmployees(await fetchEmployees(query))` updates the component state with the newly fetched employees list.  

When the `query` prop changes, `useEffect()` hook starts a new fetching process for a new query.  

If you'd like to run just one fetch request when the component mounts, simply indicate an empty dependencies list: `useEffect(fetchSideEffect, [])`.  

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

After initial rendering, `useEffect()` simply invokes the callback having the side-effect. `cleanup` function isn't invoked.  

On subsequent renderings, `useEffect()` is going to invoke the `cleanup` function from the previous side-effect execution (to clean up everything after the previous side-effect), then run the current side-effect.  

Finally, after unmounting the component, the cleanup function from the latest side-effect is invoked.  

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

You need to stop the logging of previous messages. That's the right case to clean up the side-effect.  

Let's return a clean up function that clears the previous timer:

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

`useEffect(callback, dependencies)` is the hook that manages the side-effects in functional components. 

`callback` argument is the function invoked after changes are committed to the screen: here is where you put the side-effect logic. `dependencies` is a list of dependencies of your side-effect: being props or state values.  

Because `useEffect()` hook heavily relies on closures, you might need to [get them well](/simple-explanation-of-javascript-closures/) too. Also be aware of [stale closures issue](/react-hooks-stale-closures/).  

*Still have questions about `useEffect()` hook? Ask in the comments below!*