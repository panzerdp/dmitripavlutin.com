---
title: "Is the State of React Components Updated Sync or Async?"
description: "Why React.useState() Doesn't Mutate State Immediately?"
published: "2020-12-15T12:00Z"
modified: "2020-12-15T12:00Z"
thumbnail: "./images/cover-2.png"
slug: react-usestate-update-state-immediately
tags: ['react', 'hook', 'usestate']
recommended: ['react-usestate-hook-guide', 'react-hooks-mistakes-to-avoid']
type: post
---

`React.useState()` is the state hook in React. `useState()` let's you create, access and manage the state inside of
functional React components.  

Let's travel back in time a bit, and see how inside a React class component a state is updated.  

## 1. State update using *useState()*

Let's rewrite the previous class `DoubleIncreaser` into a functional React component, and let's manage the state using `useState()` hook.  

Here's a possible implementation:

```jsx{7-8}
import { useState } from 'react';

function DoubleIncreaser() {
  const [count, setCount] = useState(0);

  const doubleIncrease = () => {
    setCount(count + 1);
    setCount(count + 1);
  };

  return (
    <>
      <button onClick={this.doubleIncrease}>
        Double Increase
      </button>
      <div>Count: {count}</div>
    </>
  );
}
```

Same way, `doubleIncrease` event handler performs 2 consecutive increments of `count`: `setCount(count + 1)` and then `setCount(count + 1)` again.  

Open the demo and click the button *Double Increase*. Unfortunately, this time `count` has been increased by `1`.  

When `setCount` updates the state, the changes are not reflected immediately in the `count` variable. Rather React schedules a re-render of the component, and on next render `count` variable gets updated.  

> The setter function `setValue(newValue)` of `useState()` updates both state variable `value` and the component's output asynchronously.  

In other words, if you're updating the state, expect the state variable to have the actual value only on next rendering.  

If you'd like to access the actual state value, you can use the functional way to update the state:

```jsx{7-8}
import { useState } from 'react';

function DoubleIncreaser() {
  const [count, setCount] = useState(0);

  const doubleIncrease = () => {
    setCount(actualCount => actualCount + 1);
    setCount(actualCount => actualCount + 1);
  };

  return (
    <>
      <button onClick={this.doubleIncrease}>
        Double Increase
      </button>
      <div>Count: {count}</div>
    </>
  );
}
```

When updating the state using a function `setCount(actualCount => actualCount + 1)`, the `actualCount` argument contains the actual value of the state.  

Open the demo, and click the *Double Increase* button. The count updates by `2` as expected.  

## 2. The state variable is immutable and readonly

One particular difficulty with the asynchornous nature of state are the usage of state variable inside the event handlers.  

If you forget that the state variable gets updated on the next rendering, you might try to read the state variable right after changing it:  

```jsx{9-11}
function FetchUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const startFetching = async () => {
      const response = await fetch('/users');
      const fetchedUsers = await response.json();

      setUsers(fetchedUsers);
      console.log(users);        // => []
      console.log(fetchedUsers); // => ['John', 'Mike', 'Denis']
    };
    startFetching();
  }, []);

  return (
    <ul>
      {users.map(user => <li>{user}</li>)}
    </ul>
  );
}
```

`FetchUsers` component starts a fetch request on mounting.  

`setUsers(fetchedUsers)` updates the state with the fetched users, however the changes aren't reflected right away in `users` state variable.  


## 3. State update in a class component

The following component has the state `count`, which is increased when the button *Double Increase* is clicked:

```jsx{20-21}
import { Component } from 'react';

class DoubleIncreaser extends Component {
  state = {
    count: 0
  };

  render() {
    return (
      <>
        <button onClick={this.doubleIncrease}>
          Double Increase
        </button>
        <div>Count: {this.state.count}</div>
      </>
    );
  }

  doubleIncrease = () => {
    this.setState(actualCount => actualCount + 1);
    this.setState(actualCount => actualCount + 1);
  }
}
```

Take a look at the `doubleIncrease()` event handler: `this.state.count` is updated using 2 increases.  

Open the demo and click the button *Double Increase*. As expected, the `this.state.count` has been updated by 2. 

In class based components, `this.state` also are not updated immediately: the state updates are immediately reflected into the state. 

> `this.setState(newState)` updates `this.state` as well as the component output asynchronously (on next rendering).  

What about the `useState()` hook update? Is the state variable mutate right away after an update?  

## 4. Summary

The simple rule to remember is `useState()` hook (inside functional React components) as well as `this.setState()` (inside class components) update the state variable as well as the component output asynchronously.  

*Quiz: are references (created by `useRef()`) updated synchonously or asynchonously? Write the answer in a comment below!*