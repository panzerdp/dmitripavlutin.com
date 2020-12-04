---
title: "How Not to Use React Hooks"
description: "A list of common mistakes to avoid when using React hooks."
published: "2020-12-08T12:00Z"
modified: "2020-12-08T12:00Z"
thumbnail: "./images/cat-2.jpg"
slug: how-not-to-use-react-hooks
tags: ['react', 'hook', 'useffect']
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
    const response = await fetch(`/game/${id}`);
    const fetchedGame = await response.json();
    setGame(fetchedGame);
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

Now open the demo and load a few games. If you open the console, you can see that React warns about incorrect order of hooks execution.  

## 2. Do Not use stale data

## 3. Do Not use state for infrastructure data

## 4. Do Not forget to cleanup side-effects

## 5. Summary