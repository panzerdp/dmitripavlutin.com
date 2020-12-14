---
title: "Is the State of React Components Updated Sync or Async?"
description: "Why React.useState() doesn't mutate state immediately?"
published: "2020-12-15T12:00Z"
modified: "2020-12-15T12:00Z"
thumbnail: "./images/cover-2.png"
slug: react-usestate-update-state-immediately
tags: ['react', 'hook', 'usestate']
recommended: ['react-usestate-hook-guide', 'react-hooks-mistakes-to-avoid']
type: post
---

React `useState()` hook lets you create, access, and manage the state inside of functional React components.  

In this post, I'll let you know the subtle way of how React updates the state of the component: async or sync?

## 1. State update using *useState()*

`useState()` hook called inside of a functional component returns a tuple: the current state value and the state updater function.  

```javascript
import { useState } from 'react';

function MyComponent() {
  const [value, setValue] = useState('Initial value');

  return (
    <button onClick={() => setValue('Changed value')}>
      Change state
    </button>
  );
}
```

In the above example `value` is the current state value, and `setValue()` is the state updater function. Calling `setValue('Changed value')` inside the click event handler the state to `'Changed value'`.  

An important idea to remember about the update of the state inside of the React component is that the state update is *asynchronous*.  

Consider a functional component `DoubleIncreaser` that has a counter state. The component has a button *Double Increase*:

```jsx{7-8}
import { useState } from 'react';

function DoubleIncreaser() {
  const [count, setCount] = useState(0);

  const doubleIncreaseHandler = () => {
    setCount(count + 1);
    setCount(count + 1);
  };

  return (
    <>
      <button onClick={this.doubleIncreaseHandler}>
        Double Increase
      </button>
      <div>Count: {count}</div>
    </>
  );
}
```

When the button is clicked, `doubleIncreaseHandler` event handler performs 2 consecutive increments of `count`: `setCount(count + 1)` and then `setCount(count + 1)` again.  

Open the demo and click the button *Double Increase*. Unfortunately, `count` is increased by `1` at each click.  

When `setCount(count + 1)` updates the state, the changes are not reflected immediately in the `count` variable. Rather React **schedules a re-rendering** of the component, and on the next render `count` variable gets updated.  

> The setter function `setValue(newValue)` of `useState()` updates both state variable `value` and the component's output asynchronously.  

In other words, if you're updating the state, expect the state variable to have the actual value only on the next rendering. That's why, event calling `setCount(count + 1)`, on later statement `count` is still going to have the old value.  

If you'd like to access the actual state value, use the functional way to update the state:

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

If you forget that the state variable gets updated on the next rendering, you might try to read the state variable right after changing it. Unfortunately, it won't work:  

```jsx{10-11}
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

`FetchUsers` component starts a fetch request on mounting. `setUsers(fetchedUsers)` updates the state with the fetched users, however, the changes aren't reflected right away in `users` state variable.  

## 3. State update in a class component

The following component has the state `count`, which is increased when the button *Double Increase* is clicked:

```jsx{21-22}
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
    // Works!
    this.setState(actualCount => actualCount + 1);
    this.setState(actualCount => actualCount + 1);

    // Won't work!
    // this.setState({ count: this.state.count + 1 });
    // this.setState({ count: this.state.count + 1 });
  }
}
```

Take a look at the `doubleIncrease()` event handler: `this.state.count` is updated using 2 increases.  

Open the demo and click the button *Double Increase*. As expected, the `this.state.count` has been updated by 2. 

In class based components, `this.state` is also not updated immediately. When calling `this.setState(newState)`, React again schedules a re-render, and exactly on next rendering ``
`this.state` contains the actual value.

> `this.setState(newState)` updates `this.state` and the component output asynchronously, i.e. on next rendering.  

## 4. Summary

`useState()` hook (inside functional React components) and `this.setState()` (inside class components) update the state variable and the component output asynchronously.  

Remember the simple rule: 

> Calling the setter function `setValue(newValue)` of `useState()` hook (and `this.setState()` inside class components) doesn't exactly update the state, but rather *schedules a state update*.  

*Quiz: are references (created by `useRef()`) updated synchronously or asynchronously? Write the answer in a comment below!*