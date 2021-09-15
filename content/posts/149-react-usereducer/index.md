---
title: "An Easy Guide to React useReducer() Hook"
description: "How to use React useReducer() hook to manage complex state: initial state, action object, dispatch, reducer."
published: "2021-09-14T12:00Z"
modified: "2021-09-14T12:00Z"
thumbnail: "./images/cover.png"
slug: react-usereducer
tags: ['react', 'usereducer', 'hook']
recommended: ['react-useref-guide', 'react-useeffect-explanation']
type: post
---

If you landed on this post, most likely you're already familiar with the `useState()` hook in React. That's the hook that lets you create, update and read state in functional React components.  

If you've used `useState()` to manage a non-trivial state like a list of items, where you need to add, update and remove
items in the state, you might have noticed that the state management logic takes a good part of the component body.  

That's a problem because the React component in nature should contain the logic that calculates the output, but the state management
logic is a separate concern that should be managed in a separate place. Otherwise, you get a mix of state management and rendering logic in one place, 
and that's difficult to read, maintain, and test!  

To help you with the problem describe above React provides the special state management hook `useReducer()`. The hook does so by extracting the complex state management out of the component.  

Let's see how the `useReducer()` hook works.  

```toc
toHeading: 2
```

## 1. *useReducer()*

The `useReducer(reducer, initialState)` hook accept 2 arguments: the *reducer* function and the *initial state*. The hook then returns an array of 2 items: the current state and the *dispatch* function.

```jsx
import { useReducer } from 'react';

function MyComponent() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const action = {
    type: 'ActionType'
  };

  return (
    <button onClick={() => dispatch(action)}>
      Click me
    </button>
  );
}
```

Now, let's decipher what the terms of *initial state*, *reducer*, and *dispatch* function mean.  

#### A. Initial state

The *initial state* is the value the state is initialized with. In the case of a counter state, the initial value could be:  

```javascript
// initial state
const initialState = { 
  counter: 0 
};
```

#### B. Reducer function

The *reducer* is a special pure function that accepts 2 arguments: the current state and an *action object*. Depending on the action object, the reducer function
must update the state in an immutable manner, and return the new state.  

The following reducer function supports the increase and decrease of counter state operations:

```javascript
function reducer(state, action) {
  let newState;
  switch (action.type) {
    case 'increase':
      newState = { counter: state.counter + 1 };
      break;
    case 'descrease':
      newState = { counter: state.counter - 1 };
      break;
    default:
      throw new Error();
  }
  return newState;
}
```

Note that the reducer above doesn't modify directly the current state in the `state` variable, but rather creates a new state object stored in `newState`, then returns it.  

React checks the difference between the new and the current state to determine whether the state has been updated, so do not mutate the current state directly.  

#### C. Action object

An *action object* is an object that tells the reducer how to update the state.  

Typically, the action object would have a property `type` &mdash; a string describing what kind of state update the reducer must do.  

For example, an action object to increase the counter can look as follows:

```javascript
const action = {
  type: 'increase'
};
```

If the action object must carry some useful information (aka payload) to be used by the reducer, then you can add additional properties to the action object. 

For example, here's an action object to add a new user to an array of users state:

```javascript
const action = {
  type: 'add',
  user: { 
    name: 'John Smith',
    email: 'jsmith@mail.com'
  }
};
```

#### D. Dispatch function

The *dispatch* is a special function that accepts one argument: the action object.  

The dispatch function is created for your by the `useReducer()` hook: 

```javascript
const [state, dispatch] = useReducer(reducer, initialState);
```

#### E. Wiring everything

Wiring all these terms together, here's how the state update using a reducer works.  

As a result of an event handler or after completing a fetch request, you call the *dispatch* function with the action object. 

Then React redirects the action object and the current state value to the *reducer* function.

The reducer function uses the action object and performs a state update, returning the new state.  

React then checks whether the new state differs from the previous one. If the state has been updated, React re-renders the component and `useReducer()` returns the new state value: `[newState, ...] = useReducer(...)`.  

Note that `useReducer()` design is based on the [Flux architecture](https://facebook.github.io/flux/docs/in-depth-overview).  

If all these terms sound too abstract, then you have the right feeling! Let's see how `useReducer()` works in an interesting example.  

## 2. Implementing a stopwatch

Now let's see how all the terms involving the work of `useReducer()` hook work together in an example.  

The task is to implement a simpler stopwatch. The stopwatch has 3 buttons: Start, Stop and Reset, and has a number displaying the passed seconds.  

Now let's think about structuring the state of the stopwatch. There are 2 important state properties: a boolean indicating whether the stopwatch runs (let's name it `isRunning`) and a number indicating the number of passed seconds (let's name it `time`). As result, here's how the *initial state* can look like:

```javascript
const initialState = {
  isRunning: false,
  time: 0
};
```

The initial state indicates that the stopwatch starts as inactive and at `0` seconds.  

Then let's consider what *action objects* the stopwatch should use. It's easy to find that we need 4 kinds of actions: to start, stop and reset the stopwatch running process, as well as tick the time each second.  

```javascript
// The start action object
{ type: 'start' }

// The stop action object
{ type: 'stop' }

// The reset action object
{ type: 'reset' }

// The tick action object
{ type: 'tick' }
```

Having the state structure, as well the possible actions, let's use the *reducer* function to define how the action objects update the state of the component:

```javascript
function reducer(state, action) {
  switch (action.type) {
    case 'start':
      return { ...state, isRunning: true };
    case 'stop':
      return { ...state, isRunning: false };
    case 'reset':
      return { isRunning: false, time: 0 };
    case 'tick':
      return { ...state, time: state.time + 1 };
    default:
      throw new Error();
  }
}
```

Finally, here's the component `Stopwatch` that wires everything together by invoking the `useReducer()` hook:

```jsx
import { useReducer, useEffect, useRef } from 'react';

function Stopwatch() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const idRef = useRef(0);

  useEffect(() => {
    if (!state.isRunning) { 
      return; 
    }
    idRef.current = setInterval(() => dispatch({type: 'tick'}), 1000);
    return () => {
      clearInterval(idRef.current);
      idRef.current = 0;
    };
  }, [state.isRunning]);
  
  return (
    <div>
      {state.time}s
      <button onClick={() => dispatch({ type: 'start' })}>
        Start
      </button>
      <button onClick={() => dispatch({ type: 'stop' })}>
        Stop
      </button>
      <button onClick={() => dispatch({ type: 'reset' })}>
        Reset
      </button>
    </div>
  );
}
```

[Try the demo.](https://codesandbox.io/s/use-reducer-stopwatch-d1ocz?file=/src/Stopwatch.js)

The click event handlers of the Start, Stop, and Reset buttons correspondingly use the `dispatch()` function to dispatch the necessary action object. 

Inside the `useEffect()` callback, if `state.isRunning` is `true`, the `setInterval()` timer function dispatches the tick action object each second `dispatch({type: 'tick'})`.  

Each time the `reducer()` function updates the state as a result of dispatching an action, the component re-renders as a result and receives the new state.  

## 3. Reducer mental model

Let's see a real-world example that works similarly to a reducer.  

Imagine you're the captain of a ship in the first half of the 20th century.  

![Engine Order Telegraph](./images/engine-order-telegraph-2.jpg)

The captain's bridge has a special communication device called *engine order telegraph* (see the picture above). This communication tool is used to transmit commands from the bridge to the engine room. Typical commands would be to move *back slowly*, move *ahead half* power, *stop*, etc.  

For example, the ship is at full stop. You (the captain) want the ship to move forward at full speed. You'd approach the engine order telegraph and set the handle to *ahead full* power. Then, the engineers in the engine room, having the same device, see the handle moved to *ahead full* power, and set the engine to the corresponding regime.  

The *engine order telegraph* is the *dispatch* function, the *commands* are the *action objects*, the *engineers in the engine room* are the *reducer* function, and the *engine regime* is the *state*.  

The engine order telegraph helps separate the bridge from the engine room. The same way the `useReducer()` hook helps separate the component from the state management logic.  

## 4. Conclusion

The `useReducer()` hook in React lets you separate the state management from the rendering logic of the component.  

`const [state, dispatch] = useReducer(reducer, initialState)` accepts 2 argument: the reducer function and the initial state. Also, the reducer returns an array of 2 items: the current state and the dispatch function.  

When you'd like to update the state, simply call `dispatch(action)` with the appropriate action object. The action object is then forwarded to the `reducer()` function that updates the state. If the state has been updated by the reducer, the component re-renders, and `[state, ...] = useReducer(...)` hook returns the new state value.  

`useReducer()` fits great with relatively complex state update (requiring at least 2-3 different update actions). For simple state management, simply use `useState()`.  

*Challenge: write a custom hook `myUseState()` that works exactly `useState()`, only that it uses the `useReducer()` hook to manage the state. Write your solution in a comment below!*