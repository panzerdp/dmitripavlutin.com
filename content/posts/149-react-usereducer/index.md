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

To help you with the problem describe above React prodives the special state management hook `useReducer()`. The hook does so by extracting the complex state management out of the component.  

Let's see how `useReducer()` hook works.  

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

Now, let's decipher what the terms of *initial state*, *reducer* and *dispatch* function means.  

#### A. Initial state

The *initial state* is the value the state is initialized with. In case of a counter state, the initial value could be:  

```javascript
// initial state
const initialState = { 
  counter: 0 
};
```

#### B. Reducer function

The *reducer* is a special pure function that accepts 2 arguments: the current state and an *action object*. Depending on the action object, the reducer function
must update the state in an immutable manner, and return the new state.  

The following reducer function supports the increase and decrease of a counter state operations:

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

Note that the reducer above doesn't modify directly the current state in `state` variable, but rather creates a new state object stored in `newState`.  

#### C. Action object

An *action object* is an object that tells the reducer how to update the state.  

Typically, the action object would have a property `type` &mdash; a string describing what kind of state update the reducer must do.  

For example, an action object to increase the counter can look as follows:

```javascript
const action = {
  type: 'increase'
};
```

If the action object must carry some useful information (aka payload) to be used by the reducer, then you can add additional properties on the action object. 

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

#### E. Dispatch, action object and reducer wired toghether

Wiring all these terms toghether, here's how the state update using a reducer works.  

As a result of an event handler or after completing a fetch request, you call the *dispatch* function with the action object. 

Then React redirects the action object and the current state value to the *reducer* function.

The reducer function uses the action object and performs a state update, returning the new state.  

React then checks whether the state has been updated. If so, it re-renders the component and `useReducer()` returns the new state value: `[newState, ...] = useReducer(...)`.  

If all these terms sound too abstract, then you have the right feeling! 

## 2. Example: implementing a stopwatch

## 3. A mental model of dispatch, action object and reducer

Ok, I know that all these terms floating around aren't easy to grasp at first because they are relatively abstract.  

So, let's see a real world example that works similarly to a reducer.  

Imagine you're the captain of a ship in the middle of the 19th century. 

## 4. Conclusion

*Challenge: write a custom hook `myUseState()` that works exactly `useState()`, only that it uses the `useReducer()` hook internally to manage the state. Write your solution in a comment below!*