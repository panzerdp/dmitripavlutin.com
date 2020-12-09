---
title: "Mistakes to Avoid When Using React Hooks"
description: "Common mistakes and anti-patterns to avoid when using React hooks."
published: "2020-12-08T11:10Z"
modified: "2020-12-08T11:10Z"
thumbnail: "./images/cat-2.jpg"
slug: how-not-to-use-react-hooks
tags: ['react', 'hook', 'useffect', 'usestate']
recommended: ['use-react-memo-wisely', 'dont-overuse-react-usecallback']
type: post
---

Most likely you've read many posts on how to use React hooks. But *knowing how Not to use*, sometimes, is equally important as *knowing how to use*.  

In this post, I will describe the React hooks anti-patterns, and how to fix them.  

```toc
```

## 1. Do Not change hooks invocation order

A few days before writing this post, I was coding a component that fetches a game information by id. Here's a simplified version of `FetchGame` component:

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

The component `FetchGame` accepts a prop `id` &mdash; the id of the game to be fetched. `useEffect()` hook fetches the game information ``await fetch(`/game/${id}`)`` and saves it into the state variable `game`.  

Open the [demo](https://codesandbox.io/s/hooks-order-warning-rdxpg?file=/pages/index.js) and load a few games. The component correctly performs the fetch, as well updates the state with the fetched data. But look at the Problems tab &mdash; Eslint warns about incorrect order of hooks execution:  

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

When `id` is empty, the component renders `'Please select a game to fetch'` and exits. No hooks are invoked. 

But if `id` is not empty (e.g. equals `'1'`) the `useState()` and `useEffect()` hooks are invoked.  

Having the hooks executed conditionally can lead to unexpected errors that might be hard to debug. The way React hooks internally work require components to always invoke hooks in the same order between renderings. 

That's exactly what suggests [the first rule of hooks](https://reactjs.org/docs/hooks-rules.html#only-call-hooks-at-the-top-level): *Don’t call Hooks inside loops, conditions, or nested functions*.  

Solving the incorrect order of hooks means moving the `return` statements after invoking the hooks:

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

Now, no matter `id` is empty or not, the `useState()` and `useEffect()` hooks are always invoked in the same order. That's how hooks should always be invoked.  

A rule of thumb is to execute the hooks at the top of the component body. [eslint-plugin-react-hooks](https://www.npmjs.com/package/eslint-plugin-react-hooks) can help you enforce the correct hooks execution order.  

## 2. Do Not use stale state

The following component `MyIncreaser` increases the state variable `count` when a button is clicked:

```jsx{9-11}
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
      <div>Counter: {count}</div>
    </>
  );
}
```

The interesting part is that `handleClick` invokes the state update `3` times.  

Now, before opening the demo, I want to ask you. If you click the button *Increase* once, does the counter increase by `3`?  

Ok. Open the [demo](https://codesandbox.io/s/stale-variable-jo32q?file=/src/index.js) and click *Increase* button once.  

Unfortunately, even if the `increase()` is called 3 times inside the `handleClick()`, `count` increases only by `1`. Hm...

The problem lays in the `setCount(count + 1)` state updater. When the button is clicked, React invokes `setCount(count + 1)` 3 times:

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

The first invocation of `setCount(count + 1)` correctly updates the counter as `count + 1 = 0 + 1 = 1`. However, the next 2 calls of `setCount(count + 1)` also set the count to `1` because they use a *stale state*.  

The stale state is solved by using a functional way to update the state. Instead of  `setCount(count + 1)`, let's better use `setCount(count => count + 1)`:  

```jsx{5}
function MyIncreaser() {
  const [count, setCount] = useState(0);

  const increase = useCallback(() => {
    setCount(count => count + 1);
  }, []);

  const handleClick = () {
    increase();
    increase();
    increase();
  };

  return (
    <>
      <button onClick={handleClick}>Increase</button>
      <div>Counter: {count}</div>
    </>
  );
}
```

By using a updater function `count => count + 1`, React can give you the latest *actual* state value.  

Open the fixed [demo](https://codesandbox.io/s/stale-variable-fixed-3j0p8?file=/src/index.js). Now clicking *Increase* button updates the `count` by `3`, as expected.  

Here's a good rule to avoid encountering a stale variable:

> If you use current state to calculate the next state, always use a functional way to update the state: `setValue(prevValue => prevValue + someResult)`.

## 3. Do Not create stale closures

React hooks heavily rely on the concept of closures. Relying on closures is what makes them so expressive.  

As a quick reminder, the [closure](/simple-explanation-of-javascript-closures/) in JavaScript is the function that captures variables from its lexical scope. No matter where the closure is executed, it always has access to the variables from the place where it is defined.  

When using hooks accept callbacks as arguments (like `useEffect(callback, deps)`, `useCallback(callback, deps)`) you might create a stale closure &mdash; a closure that has captured outdated state or prop variables.  

Let's see a case of a stale closure created when using `useEffect(callback, deps)` hook and forgetting to correctly set the hook dependencies.   

Inside the component `<WatchCount>` the hook `useEffect()` logs every second the value of `count`:  

```jsx
function WatchCount() {
  const [count, setCount] = useState(0);

  useEffect(function() {
    setInterval(function log() {
      console.log(`Count is: ${count}`);
    }, 2000);
  }, []);

  const handleClick = () => setCount(count => count + 1);

  return (
    <>
      <button onClick={handleClick}>Increase</button>
      <div>Counter: {count}</div>
    </>
  );
}
```

[Open the demo](https://codesandbox.io/s/stale-closure-tmcpd?file=/src/index.js) and click *Increase* button. Then check the console &mdash; every 2 seconds appears `Count is: 0`, no matter the actual value of `count` state variable.  

Why does it happen?

At first render, the closure `log` captures `count` variable as `0`. 

Later, when the button is clicked and `count` increases, `setInterval` still invokes the old `log` closure that has captured `count` as `0` from initial render. `log` is a stale closure because it has captured a stale (in other words outdated) state variable `count`.  

The solution is to let know `useEffect()` that the closure `log` depends on `count` and properly reset the timer:  

```jsx{8,9}
function WatchCount() {
  const [count, setCount] = useState(0);

  useEffect(function() {
    const id = setInterval(function log() {
      console.log(`Count is: ${count}`);
    }, 2000);
    return () => clearInterval(id);
  }, [count]);

  const handleClick = () => setCount(count => count + 1);

  return (
    <>
      <button onClick={handleClick}>Increase</button>
      <div>Counter: {counter}</div>
    </>
  );
}
```

With the dependencies properly set, `useEffect()` updates the closure of `setInterval()` as soon as `count` changes.  

Open the fixed [demo](https://codesandbox.io/s/stale-closure-fixed-rrfc2?file=/src/index.js) and click a few times increase. The console will log the actual value of `count`.  

To prevent closures from capturing old values:

> Always makes sure that any state or prop values used inside of a callback supplied to a hook is indicated as a dependency.  

[eslint-plugin-react-hooks](https://www.npmjs.com/package/eslint-plugin-react-hooks) can help you not forget to properly set the hooks dependecies.  

## 4. Do Not use the state for infrastructure data

Once I needed to invoke a side-effect on state update, but without invoking the side-effect on the first render. `useEffect(callback, deps)` always invokes the `callback` after mounting of the component: so I want to avoid that.  

Surprinsngly for me, I found the following solution:

```jsx
function MyComponent() {
  const [isFirst, setIsFirst] = useState(true);
  const [count, setCounter] = useState(0);

  useEffect(() => {
    if (isFirst) {
      setIsFirst(false);
      return;
    }
    console.log('The counter increased!');
  }, [counter]);

  return (
    <button onClick={() => setCounter(count => count + 1)}>
      Increase
    </button>
  );
}
```

A state variable `isFirst` holds the information about whether this is the first render of the component. Holding such information in state is a problem &mdash; as soon as you update `setIsFirst(false)` another re-render happens &mdash; and for no reason.  

It makes sense to keep `count` as a state because counter information is rendered. However, `isFirst` isn't used to directly calculate the output.  

The information whether this is the first render shouldn't be stored in the state. The infrastructure data, like details about rendering cycle (is first rendering, the number of renderings), timer ids (`setTimeout()`, `setInterval()`), direct references to DOM elements, etc. should be stored and updated using references `useRef()`.   

Let's store the information about first rendering into a reference:

```jsx{2}
function MyComponent() {
  const isFirstRef = useRef(true);
  const [count, setCounter] = useState(0);

  useEffect(() => {
    if (isFirstRef.current) {
      isFirstRef.current = false;
      return;
    }
    console.log('The counter increased!');
  }, [counter]);

  return (
    <button onClick={() => setCounter(count => count + 1)}>
      Increase
    </button>
  );
}
```

`isFirstRef` is a reference that holds the information whether this is the first rendering of the component. `isFirstRef.current` property is used to access and update the value of the reference.  

What's important: updating a reference `isFirstRef.current = false` doesn't trigger re-rendering.  

## 5. Do Not forget to cleanup side-effects

A lot of side-effects, like making a fetch request or using timers like `setTimeout()`, are asynchronous.  

Do not forget to clean-up the side-effect if the component unmounts or it doesn't need anymore the result of the side-effect.  

For example, if you've started a timer, make sure to stop the timer if the component when the component unmounts.  

The following component has a button *Start increasing*. When the button is clicked, a counter increases by 1 with delay each second:  

```jsx
function DelayedIncreaser() {
  const [count, setCount] = useState(0);
  const [increase, setShouldIncrease] = useState(false);

  useEffect(() => {
    if (increase) {
      setInterval(() => {
        setCount(count => count + 1)
      }, 1000);
    }
  }, [increase]);

  return (
    <>
      <button onClick={() => setShouldIncrease(true)}>
        Start increasing
      </button>
      <div>Count: {count}</div>
    </>
  );
}
```

Open the [demo](https://codesandbox.io/s/unmounted-state-update-n1d3u?file=/src/index.js), and click *Start increasing* button. As expected, the count state variable increases each second.  

While having the increaser in progress, click the *Unmount Increaser* button that umounts the component. React warns in the console about updating the state of an unmounted component.  

![React unmounted component update state warning](./images/react-unmounted-update-state.png)

Fixing `DelayedIncreaser` is simple: just return a cleanup function from the callback of `useEffect()`:

```jsx{9}
function DelayedIncreaser() {
  // ...

  useEffect(() => {
    if (increase) {
      const id = setInterval(() => {
        setCount(count => count + 1)
      }, 1000);
      return () => clearInterval(id);
    }
  }, [increase]);

  // ...
}
```

Open the fixed [demo](https://codesandbox.io/s/unmounted-state-update-fixed-siq8w?file=/src/index.js). Click *Start Increasing* button and check how the count increases. Then hit *Unmount Increaser*: and thanks to `() => clearInterval(id)` cleanup the interval stops. No complaints from React.  

That being said, every time you code a side-effect, question yourself whether it should clean up. Timers, heavy fetch requests (like uploading files), sockets almost always have to be clean up.  

## 6. Summary

The best way to start with React hooks is to learn how to use them. 

But you can encounter situations when you can't understand why they behave differently than you expect. Knowing how to use React hooks is not enough: you also should know how Not to use them.  

The first thing Not to do is render the hooks conditionally or change the order of hooks invocation. React expects that, no matter the props or state values, the component always invokes the hooks in the same order.    

The second thing to avoid is using stale state values. To avoid stale state use a functional way to update the state.  

Don't forget to indicate the dependencies for hooks that accept callbacks as arguments: e.g. `useEffect(callback, deps)`, `useCallback(callback, deps)`. That allows you to solve the stale closures.  

Do not store infrastructure data (like information about component rendering cycle, `setTimeout()` or `useInterval()` ids) into the state. The rule of thumb is to keep such data into references.  

Finally, do not forget to clean up your side-effects, if that's the case.  

*What other React hooks anti-patterns do you know?*