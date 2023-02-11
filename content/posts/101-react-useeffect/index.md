---
title: "A Simple Explanation of React.useEffect()"
description: "useEffect() hook executes side-effects in React components."
published: "2020-10-13T08:50Z"
modified: "2023-01-28"
thumbnail: "./images/effect-4.jpg"
slug: react-useeffect-explanation
tags: ['react', 'hook', 'useeffect']
recommended: ['react-usecallback', 'use-react-memo-wisely']
type: post
---
 
I am impressed by the expressiveness of React hooks. You can do so much by writing so little.   

But the brevity of hooks comes at a price &mdash; they're relatively difficult to understand at the beginning. That's especially true for `useEffect()` &mdash; the hook that manages side-effects in functional React components.  

I'll help you understand `useEffect()` in an accessible way. Let's get started. 

```toc
```

## 1. Side-effects

A functional React component uses props and/or state to calculate the output. If the component makes calculations that don't target the output value, then these calculations are named *side-effects*.  

Examples of side-effects are fetch requests, manipulating DOM directly, using timer functions like `setTimeout()`, and [more](https://www.reddit.com/r/reactjs/comments/8avfej/what_does_side_effects_mean_in_react/).  

Component rendering and the side-effect logic are *independent*. Performing side-effects directly in the body of the component is a mistake, because the body computes the component's output or calls hooks.

How often the component renders isn't something you can control &mdash; if React wants to render the component, you cannot stop it.    

```jsx{4}
function Greet({ name }) {
  const message = `Hello, ${name}!`; // Calculates output

  // Bad!
  document.title = `Greetings to ${name}`; // Side-effect!

  return <div>{message}</div>;       // Calculates output
}
```

How to decouple rendering from the side-effect? Welcome `useEffect()` &mdash; the hook that runs side-effects independently of rendering.    

```jsx{7}
import { useEffect } from 'react';

function Greet({ name }) {
  const message = `Hello, ${name}!`;   // Calculates output

  useEffect(() => {
    // Good!
    document.title = `Greetings to ${name}`; // Side-effect!
  }, [name]);

  return <div>{message}</div>;         // Calculates output
}
```

## 2. *useEffect()* arguments

`useEffect()` hook accepts 2 arguments:

```javascript
useEffect(callback[, dependencies]);
```

* `callback` is a function that contains the side-effect logic. `callback` is executed right after the DOM update.   
* `dependencies` is an optional array of dependencies. `useEffect()` executes `callback` only if the dependencies have changed between renderings.  

*Put your side-effect logic into the `callback` function, then use the `dependencies` argument to control when you want the side-effect to run. That's the sole purpose of `useEffect()`.*  

<img src="./images/react-useeffect-hook.svg" width="531" height="666" alt="React useEffect() Hook: when callback is invoked" />

For example, in the previous code snippet you saw the `useEffect()` in action:

```javascript
useEffect(() => {
  document.title = `Greetings to ${name}`;
}, [name]);
```

The *document title update* is the side-effect because it doesn't directly calculate the component output. That's why the document title update is placed in a callback and supplied to `useEffect()`. 

Also, you don't want the document title update to run every time `Greet` component renders. You only want it to happen when the `name` prop changes &mdash; that's the reason you supplied `name` as a dependency to `useEffect(callback, [name])`.  

### 2.1 Dependencies argument

`dependencies` argument of `useEffect(callback, dependencies)` lets you control when the side-effect runs. If dependencies are:

A) <u>Not provided</u>: the side-effect runs after *every* rendering.

```jsx{5}
import { useEffect } from 'react';

function MyComponent() {
  useEffect(() => {
    // Runs after EVERY rendering
  });  
}
```

B) <u>An empty array</u> `[]`: the side-effect runs *once* after the initial rendering.

```jsx{5}
import { useEffect } from 'react';

function MyComponent() {
  useEffect(() => {
    // Runs ONCE after initial rendering
  }, []);
}
```

C) <u>Has props or state values</u> `[prop1, prop2, ..., state1, state2]`: the side-effect runs once after initial rendering and then *only when any dependency value changes*.  

```jsx{7}
import { useEffect, useState } from 'react';

function MyComponent({ prop }) {
  const [state, setState] = useState('');
  useEffect(() => {
    // Runs ONCE after initial rendering
    // and after every rendering ONLY IF `prop` or `state` changes
  }, [prop, state]);
}
```

Let's detail cases B) and C) since they're often used.  

## 3. Component lifecycle

The dependencies argument of the `useEffect()` lets you catch certain component lifecycle events: when the component has been mounted or a specific prop or state value has changed.  

### 3.1 Component did mount

Use an empty dependencies array to invoke a side-effect once after component mounting:

```jsx{8}
import { useEffect } from 'react';

function Greet({ name }) {
  const message = `Hello, ${name}!`;

  useEffect(() => {
    // Runs once, after mounting
    document.title = 'Greetings page';
  }, []);

  return <div>{message}</div>;
}
```

`useEffect(..., [])` was supplied with an empty array as the dependencies argument. When configured in such a way, the `useEffect()` executes the callback *just once*, after initial rendering (mounting). 

Even if the component re-renders with different `name` property, the side-effect runs just once after initial rendering:

```jsx
// First render
<Greet name="Eric" />   // Side-effect RUNS

// Second render, name prop changes
<Greet name="Stan" />   // Side-effect DOES NOT RUN

// Third render, name prop changes
<Greet name="Butters"/> // Side-effect DOES NOT RUN
```

[Try the demo.](https://codesandbox.io/s/sweet-jepsen-r8m6t?file=/src/Greet.js)

### 3.2 Component did update

Each time the side-effect uses props or state values, you must indicate these values as dependencies:

```jsx{7}
import { useEffect } from 'react';

function MyComponent({ prop }) {
  const [state, setState] = useState();

  useEffect(() => {
    // Side-effect uses `prop` and `state`
  }, [prop, state]);

  return <div>....</div>;
}
```

`useEffect(callback, [prop, state])` invokes the `callback` once after mounting, and again after committing the changes to the DOM, *if and only if* any value in the dependencies array `[prop, state]` has changed.  

By using the dependencies argument of `useEffect()`, you control when the side-effect is called, independently from the rendering cycles of the component. Again, *that's the essence of `useEffect()` hook.*  

Let's improve the `Greet` component by using `name` prop in the document title:

```jsx{7}
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
<Greet name="Stan" />   // Side-effect DOES NOT RUN

// Fourth render, name prop changes
<Greet name="Butters"/> // Side-effect RUNS
```

[Try the demo.](https://codesandbox.io/s/nifty-yonath-mo2qf?file=/src/Greet.js)

## 4. Side-effect cleanup

Some side-effects need cleanup: close a socket, clear timers.  

If the `callback` of `useEffect(callback, deps)` returns a function, then `useEffect()` considers that function as an *effect cleanup*:  

```jsx{3-5}
useEffect(function callback() => {
  // Side-effect...

  return function cleanup() {
    // Side-effect cleanup...
  };
}, dependencies);
```

Cleanup works the following way: 

A) After the first rendering, `useEffect()` invokes the `callback` with the side-effect. `cleanup` function is *not invoked*.  

B) On later renderings, before calling the next side-effect `callback`, `useEffect()` *invokes* the `cleanup` function from the previous side-effect execution (to clean up everything after the previous side-effect), then executes the current side-effect.  

C) Finally, after unmounting the component, `useEffect()` *invokes* the `cleanup` function from the latest side-effect.  

<img src="./images/react-useeffect-hook-cleanup.svg" width="531" height="706" alt="React useEffect() Hook: when callback and cleanup are invoked" />

Let's see an example of when the side-effect cleanup is useful.  

The following component `<RepeatMessage message="My Message" />` accepts a prop `message`. Then, every 2 seconds the `message` prop is logged to the console:  

```jsx
import { useEffect } from 'react';

function RepeatMessage({ message }) {
  useEffect(() => {
    setInterval(() => {
      console.log(message);
    }, 2000);
  }, [message]);

  return <div>I'm logging to console "{message}"</div>;
}
```

[Try the demo.](https://codesandbox.io/s/restless-wildflower-c0cfw?file=/src/App.js)

Open the demo and type some messages. The console logs every 2 seconds the messages typed into the input. However, you need to log only the latest message.  

That's the case to clean up the side-effect: cancel the previous timer when starting a new one. Let's return a cleanup function that stops the previous timer before starting a new one:

```jsx {7-9}
import { useEffect } from 'react';

function RepeatMessage({ message }) {
  useEffect(() => {
    const id = setInterval(() => {
      console.log(message);
    }, 2000);
    return () => {
      clearInterval(id);
    };
  }, [message]);

  return <div>I'm logging to console "{message}"</div>;
}
```

[Try the demo.](https://codesandbox.io/s/gracious-tdd-gy4zo?file=/src/App.js)

Open the demo and type some messages. You'll see that every 2 seconds only the latest message logs to the console. Which means that all of the previous timers were cleaned up.  

## 5. *useEffect()* in practice

### 5.1 Fetching data

`useEffect()` can perform data fetching side-effect.  

The following component `FetchEmployees` fetches the employees list over the network:

```jsx
import { useEffect, useState } from 'react';

function FetchEmployees() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    async function fetchEmployees() {
      const response = await fetch('/employees');
      const fetchedEmployees = await response.json();
      setEmployees(fetchedEmployees);
    }

    fetchEmployees();
  }, []);

  return (
    <div>
      {employees.map(name => <div>{name}</div>)}
    </div>
  );
}
```

`useEffect()` starts a fetch request by calling `fetchEmployees()` async function after the initial rendering.   

When the request completes, `setEmployees(fetchedEmployees)` updates the `employees` state with the just fetched employees list.  

Note that the `callback` argument of `useEffect(callback)` cannot be an `async` function. But you can always define and then invoke an `async` function inside the callback itself:  

```jsx{3,7}
function FetchEmployees() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {  // <--- CANNOT be an async function
    async function fetchEmployees() {
      // ...
    }
    fetchEmployees(); // <--- But CAN invoke async functions
  }, []);

  // ...
}
```

To run the fetch request depending on a prop or state value, simply indicate the required dependency in the dependencies argument: `useEffect(fetchSideEffect, [prop, stateValue])`.  

## 6. Conclusion

`useEffect(callback, dependencies)` is the hook that manages the side-effects in functional components. `callback` argument is a function where to put the side-effect logic. `dependencies` is a list of dependencies of your side-effect: being props or state values.  

`useEffect(callback, dependencies)` invokes the `callback` after initial rendering (mounting), and on later renderings, if any value inside `dependencies` has changed.  

The next step to mastering `useEffect()` is to understand and avoid [the infinite loop pitfall](/react-useeffect-infinite-loop/).  

*Still have questions about `useEffect()` hook? Write a comment below!*
