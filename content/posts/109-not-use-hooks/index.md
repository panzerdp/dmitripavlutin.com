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

```toc
```

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

## 2. Do Not use stale state

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

Now, before opening the demo, I want to ask you. If you click the button *Increase* once, does the counter increase by `3`?  

Ok. Open the [demo](https://codesandbox.io/s/stale-variable-fixed-3j0p8?file=/src/index.js) and click *Increase* button once.  

Unfortuantely, even if the `increase()` is called 3 times inside the `handleClick()`, when the button is clicked the `count` state variable is increased only by 1. Hm...

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

The first invocation of `setCount(count + 1)` correctly sets the counter to be `count + 1 = 0 + 1 = 1`. However, the next 2 calls of `setCount(count + 1)` also set the count to `1`, all because these calls use a *stale state*.  

Usually a stale state is solved by using a functional way to update the state. Instead of using `setCount(count + 1)`, let's simply use `setCount(count => count + 1)`.  

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
      <div>Counter: {counter}</div>
    </>
  );
}
```

Inside the updater function `count => count + 1` React can provide you with the latest actual state value.  

Open the fixed version [demo](https://codesandbox.io/s/stale-variable-fixed-3j0p8?file=/src/index.js). Now clicking *Increase* once increases the `count` by 3 as expected.  

Here's a good rule to avoid encountering a stale variable:

> If you use the current state value to calculate the next state, always use a functional way to update the state: `setValue(prevValue => prevValue + someResult)`.

## 3. Do Not create stale closures

React hooks heavily rely on the concept of closures. And exactly relying on closures is what makes them so expressive.  

As a quick reminder, the [closure](/simple-explanation-of-javascript-closures/) in JavaScript is the function that captures variables from its lexical scope. No matter where the closure is executed, it always has access to the variables from the place where it is defined.  

Sometimes, when working with hooks that use callbacks as arguments (like `useEffect()`, `useCallback()`) you might encounter an effect named stale closure. It happens when during re-renderings a closure has captured outdated state or props variables.  

Let's study a common case of stale closure when using `useEffect()` hook. Inside the component `<WatchCount>` the hook `useEffect()` logs every second the value of `count`:  

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
      <div>Counter: {counter}</div>
    </>
  );
}
```

[Open the demo](https://codesandbox.io/s/stale-closure-use-effect-broken-2-gyhzk) and click *Increase* button. Then check the console &mdash; every 2 seconds apprears `Count is: 0`, no matter the actual value of `count` state variable.  

Why does it happen?

At first render, the closure `log()` captures `count` variable as `0`. Later, even if `count` increases, `log()` still uses `count` as `0` from initial render. `log()` is a stale closure because it has captured a stale (in other words outdated) state variable `count`.  

The solution is to let know `useEffect()` that the closure `log()` depends on `count` and properly handle the reset of interval:  

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

With the dependencies properly set, `useEffect()` updates the closure as soon as `count` changes.  

Open the fixed demo and click a few times increase. The console will log the actual value of `count`.  

To prevent closures from capturing old values:

> Always makes sure that any state or prop value used inside of a callback supplied to a hook is indicated as a dependency.  

## 4. Do Not use state for infrastructure data

Once I had the necessity to invoke a side-effect when a state variable updates, but without invoking the side-effect on first render.  

As you might know, `useEffect(callback, deps)` always invokes the `callback` after initially mounting the component: so I want to avoid that.  

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

So, to hold the information whether now the first render happens is used a state variable `isFirst`. Don't do like that: the problem is that as soon as you update `setIsFirst(false)` you actually trigger another re-render: and for no reason.  

Holding the information whether this is the first render of the component shouldn't be stored into the state. Such information I call the infrstracuture info: the one that helps the component to render, however the infrastructure information isn't rendered by itself as an output.  

A good rule of thumb is to keep infrastructure into references.  

```jsx
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

`isFirstRef` is a referenence that holds the information if this the first render of the component. `isFirstRef.current` property is used to access and update the value of the reference.  

What's important updating a reference `isFirstRef.current = false` doesn't trigger a re-render.  

## 5. Do Not forget to cleanup side-effects

Finally, as you might now already, `useEffect()` is the hook that you would use to invoke some side-effects.  

A lot of side-effects, like making a fetch request, setting a timeout using `setTimeout()` are asynchornous.  

What's important is to Not forget to always clean-up the side-effect is the component unmounts or it doesn't need anymore the result of the side-effect.  

For example, if you'he started a timer, make sure to stop the timer if the component for some reason unmounts before the timer ends. 

(Try to use an example that involves a slow fetch request)

The following component has a button *Start increasing*. When the button is clicked, a counter increases by 1 with delay each second.  

```jsx
function DelayedIncreaser() {
  const [count, setCount] = useState(0);
  const [increase, setShouldIncrease] = useState(false);

  useEffect(() => {
    if (increase) {
      const id = setInterval(() => {
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

Open the demo, and click *Start increasing* button. As expected, the count state variable increase each second.  

What happens if `DelayedIncreaser` component unmounts? On the same demo, while having the increaser in progress, click the *Unmount Increaser* button. You would see React throwing warnings in console about updating the state of a componet that's been unmounted.  

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

Open the fixed version demo. Click *Start Increasing* button and check how the count increases. Then hit *Unmount Increaser*: and thanks to `() => clearInterval(id)` cleanup the interval stops. No complains from React.  

That being said, every time you code a side-effect, question yourself whether it should cleanup.  

## 6. Summary

The best way to start with React hooks is to learn how to use them. That's the right thing to do.  

However, if you've been working for a while with React hooks, you might encounter situations when you just can't understand why they behave differently that you expect.  

That's because knowing how to use React hooks is not enought: you also should know how Not to use them.  

In this post I've presented the common situations what you shoudn't do with hooks.  

The first thing thing Not to do is render the hooks conditionally or change the order of hooks invocation. React expects that, no matter the props or state values, the component between re-rendering always invokes the hooks in the same order.  

The second thing you should avoid is creating and using stale state values. That often could happen if you calculate state using previous state values. To solve that simply use a functional way to update the state. Also don't forget to indicate correctly the dependencies array for hooks that accept callbacks as arguments: e.g. `useEffect(callback, deps)`, `useCallback(callback, deps)`.  

The third thing you should avoid doing is to store infrastructure data (like keeping the information about component rendering, `setTimeout()` or `useInterval()` ids) into the state. The rule of thumb is to keep such data into references.  

Finally, do not forget to cleanup your side-effects, if that's the case.  

*What other thing you should Not do when using React hooks?*