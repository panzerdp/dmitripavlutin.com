---
title: "How Not to Use React Hooks"
description: "A list of common mistakes to avoid when using React hooks."
published: "2020-12-08T12:00Z"
modified: "2020-12-08T12:00Z"
thumbnail: "./images/cat-2.jpg"
slug: how-not-to-use-react-hooks
tags: ['react', 'hook', 'useffect', 'usestate']
recommended: ['use-react-memo-wisely', 'dont-overuse-react-usecallback']
type: post
---

React hooks make the side-effects and state management easier. I've been enjoying working with hooks since the beginning.  

However, despite hooks simplicity, there are situations when you just can't understand why they don't work as you expect.  

In this post I will describe you situations how not to use React hooks, in simple words the common mistakes you might be doing when using them.  

## 1. Do Not change hooks invocation order

Just a few days before writing this post, I was writing a component that fetches data of a game. Here's a simplified version of `FetchGame` component:

```jsx
function FetchGame({ id }) {
  if (!id) {
    return 'Please select a game to fetch';
  }

  const [game, setGame] = useState({ 
    name: '',
    description: '' 
  });

  useEffect(() => {
    const fetchGame = async () => {
      const response = await fetch(`/api/game/${id}`);
      const fetchedGame = await response.json();
      setGame(fetchedGame);
    };
    fetchGame();
  }, [id]);

  return (
    <div>
      <div>Name: {game.name}</div>
      <div>Description: {game.description}</div>
    </div>
  );
}
```

The component `FetchGame` accepts a prop `id`. This prop is used to fetch the game information ``await fetch(`/game/${id}`)`` using the `useEffect()` hook.  

Now open the demo and load a few games. Look at the Problems tab &mdash; Eslint warns about incorrect order of hooks execution:  

![React hooks order problem](./images/hooks-order-problem-3.png)

The problem happens because of the early exit:  

```javascript{2-4}
function FetchGame({ id }) {
  if (!id) {
    return 'Please select a game to fetch';
  }
  
   // ...
}
```

When `id` is empty, the function render a simple message and exists. No hooks are invoked in such case. However, in case if `id` is not empty, e.g. equal `'1'`, the `useState()` and `useEffect()` hooks are invoked.  

So, be sure to never invoke the hooks conditionally, but always invoke them in the same order, regardless of the props or state values.  

Solving the broken `FetchGame` component would simply mean moving the return after invoking the hooks:

```jsx{13-15,18-20}
function FetchGame({ id }) {
  const [game, setGame] = useState({ 
    name: '',
    description: '' 
  });

  useEffect(() => {
    const fetchGame = async () => {
      const response = await fetch(`/api/game/${id}`);
      const fetchedGame = await response.json();
      setGame(fetchedGame);
    };
    if (id) { 
      fetchGame(); 
    }
  }, [id]);

  if (!id) {
    return 'Please select a game to fetch';
  }

  return (
    <div>
      <div>Name: {game.name}</div>
      <div>Description: {game.description}</div>
    </div>
  );
}
```

Now, no matter the value of `id`, the `useState()` and `useEffect()` hooks are always invoked in the same order. That's how hooks should always be configured.  

A rule of thumb I found useful: always all the invocations of React hooks at the beginning of the component.  

## 2. Do Not create stale data

React hooks heavily rely on the concept of closures. And exactly relying on closures is what makes them so expressive.  

As a quick reminder, the [closure](/simple-explanation-of-javascript-closures/) in JavaScript is the function that captures variables from its lexical scope. No matter where the closure is executed, it always has access to the variables from the place where it is defined.  

Sometimes, when working with hooks that use callbacks as arguments (like `useEffect()`, `useCallback()`) you might encounter an effect named stale closure. It happens when during re-renderings a closure has captured outdated state or props variables.  

Let's an interesting example of a stale closure.

The following component `MyIncreaser` increases the state variable `counter` when a button is clicked:

```jsx
function MyIncreaser() {
  const [count, setCount] = useState(0);

  const increase = useCallback(() => {
    setCount(count + 1);
  }, [count]);

  const handleClick = () {
    increase();
    increase();
    increase();
  };

  return (
    <>
      <button onClick={handleClick}>Increase</button>
      <div>Counter: {counter}</div>
    </>
  );
}
```

Now, before opening the demo, I want to ask you. If you click the button *3x Increase* once, does the counter increase by `3`?  

Ok. Open the demo and click *3x Increase* once.  

Unfortuantely, even if the `increase()` is called 3 times inside the `handleClick()`, when the button is clicked the `count` state variable is increased only by 1. Hm...

The problem lays in the `setCount(count + 1)` state updater. When the button is clicked, React invokes 3 times:

```javascript
  const handleClick = () {
    increase();
    increase();
    increase();
  };

// same as:

  const handleClick = () {
    setCount(count + 1);
    // count variable is now stale
    setCount(count + 1);
    setCount(count + 1);
  };
```

The first invocation of `setCount(count + 1)` correctly sets the counter to be `count + 1 = 0 + 1 = 1`. However, the next 2 calls of `setCount(count + 1)` also set the count to `1`, all because these calls use a *stale state*.  

Usually a stale state is solved by using a functional way to update the state. Instead of using `setCount(count + 1)`, let's simply use `setCount(count => count + 1)`.  

```jsx{5}
function MyIncreaser() {
  const [count, setCount] = useState(0);

  const increase = useCallback(() => {
    setCount(count => count + 1);
  }, [count]);

  const handleClick = () {
    increase();
    increase();
    increase();
  };

  return (
    <>
      <button onClick={handleClick}>Increase</button>
      <div>Counter: {counter}</div>
    </>
  );
}
```

Inside the updater function `count => count + 1` React can provide you with the latest actual state value.  

Open the demo with the fixed version. Now clicking *3x Increase* once increases the `count` by 3 as expected.  

Here's a good rule to avoid encountering a stale variable:

> If you use the current state value to calculate the next state, always use a functional way to update the state: `setValue(prevValue => prevValue + someResult)`.

And to prevent closures from capturing old values:

> Always makes sure that any state or prop value used inside of a callback supplied to a hook is indicated as a dependency.  

## 3. Do Not use state for infrastructure data

## 4. Do Not forget to cleanup side-effects

## 5. Summary