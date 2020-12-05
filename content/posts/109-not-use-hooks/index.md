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

## 2. Do Not use stale data

## 3. Do Not use state for infrastructure data

## 4. Do Not forget to cleanup side-effects

## 5. Summary