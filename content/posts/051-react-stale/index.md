---
title: Be Aware of Stale Closures when Using React Hooks
description: The stale closures is a pitfall of React hooks when an outdated variable is captured by a closure.
published: '2019-10-24T12:40Z'
modified: '2019-10-24T14:15Z'
thumbnail: './images/landscape.jpg'
slug: react-hooks-stale-closures
tags: ['react', 'closure', 'hook']
recommended: ['use-react-memo-wisely', 'become-better-software-developer-digging-climbing']
type: post
commentsThreadId: react-hooks-stale-closure
---

Hooks replace class-based components by easying the reuse of state and side effects management. Additionally you can extract repeated logic into a custom hook to reuse across the application.  

Hooks heavily rely on JavaScript closures. But closures are sometimes tricky (recall memory leaks?).  

You can encounter the stale closure problem when working with a React component having a multitude of effects and state management. And it might be difficult to solve!

This post explains the important term JavaScript closure. Follows the stale closure problem description and solutions. Finally, you will understand how to distinguish stale closure situations within your React components, and how to solve them.  

### 1. The JavaScript closure

Before looking into the stale closure issue, it's important to understand what a closure is.  

The following code defines a factory function `createIncrement(i)` that returns an increment function. Later, every time the increment function is called, an internal counter is incremented by `i`:

```javascript{3-6,11-12}
function createIncrement(i) {
  let value = 0;
  function increment() {
    value += i;
    console.log(value);
  }
  return increment;
}

const inc = createIncrement(1);
inc(); // logs 1
inc(); // logs 2
```

`createIncrement(1)` returns an increment function, which is assigned to `inc` variable. When `inc()` is called, the `value` variable gets incremented by `1`.  

The first call of `inc()` returns `1`, the second call returns `2`, and so on.  

Did you spot the interesting thing? You simply call `inc()`, without arguments, but JavaScript still knows the current `value` and how much to increment `i`. How does it work? 

The answer lays inside `createIncrement()`. There you will find `increment()` function: the closure that does the magic. The closure captures (or closes over, or simply remembers) the variables `value` and `i` from the lexical scope.  

The *lexical scope* is the is the outer scope *where the closure is defined*. In the example, the lexical scope of `increment()` is the scope of `createIncrement()`, which contains variables `value` and `i`.  

![The lexical scope in JavaScript](./images/lexical-scope-2.png)

No matter where `inc()` is called, even outside the scope of `createIncrement()`, it has access to `value` and `i`.  

> *The closure* is a function that can remember and modify variables from its lexical scope, regardless of execution scope.  

Continuing the example, `inc()` can be called anywhere else, even inside an async callback:  
```javascript{2,7}
(function() {
  inc(); // logs 3
}());

setTimeout(function() {
  // after 1 second
  inc(); // logs 4
}, 1000);
```

#### 1.1 A mental model of closures

I know closures might be difficult to grasp. But once you *get it*, it's forever. 

You can model them in your mind the following way. 

Imagine a magical paintbrush with an interesting property. If you paint with it some objects from real life, then the painting becomes a window you can interact with.  

![Painting as a model of JavaScript closures](./images/rose.jpg)

Through this window, you can move the painted objects with your hands.  

Moreover, you can carry the magical painting anywhere, even far from the place where you've painted the objects. From there, through the magical painting as a window, you can still move the objects with your hands.  

The magical painting is a *closure*, while the painted objects are the *lexical scope*.  

Isn't JavaScript magic? &#x263a;

*If you know other meaningful mental models of closures, please share in a [comment](#disqus_thread) below!*

## 2. The stale closure

Let's modify the `increment()` to return a function that logs a message to console:

```javascript{6-9,20}
function createIncrement(i) {
  let value = 0;
  function increment() {
    value += i;
    console.log(value);
    const message = `Current value is ${value}`;
    return function logValue() {
      console.log(message);
    };
  }
  
  return increment;
}

const inc = createIncrement(1);
const log = inc(); // logs 1
inc();             // logs 2
inc();             // logs 3
// Does not work!
log();             // logs "Current value is 1"
```

On the first call of `inc()`, the returned closure is assigned to the variable `log`. The 3 invocations of `inc()` increment `value` up to `3`.  

Finally, the call of `log()` logs the message `"Current value is 1"`. This is unexpected because `value` equals to `3`.  

*`log()` is a stale closure.* On first invocation of `inc()`, the closure `log()` has captured `message` variable having `"Current value is 1"`. While now, when `value` is already `3`, `message` variable is outdated.  

> *The stale closure* captures variables that have outdated values.  

Let's see some approaches on how to fix the stale closure.  

### 2.1 Fixing the stale closure

#### A. Use a fresh closure

The first approach to solving stale closures is to find the closure that captured the freshest variables.  

Let's find the closure that has captured the most up to date `message` variable. That's the closure returned from the *latest* `inc()` invocation:

```javascript{7}
const inc = createIncrement(1);

inc();  // logs 1
inc();  // logs 2
const latestLog = inc(); // logs 3
// Works!
latestLog(); // logs "Current value is 3"
```

`latestLog` captured the `message` variable that has the most up to date `"Current value is 3"`.  

*By the way, this is approximately how React hooks handle the freshness of closures.* 

*Hooks implementation assumes that between the component re-renderings, the latest closure supplied as a callback to the hook (e.g. `useEffect(callback)`) has captured the freshest variables from the component's function scope.*  

#### B. Close over the changed variable

To second way is to make `logValue()` use `value` directly.  

Let's move the line `const message = ...;` into `logValue()` function body:

```javascript{7,20}
function createIncrementFixed(i) {
  let value = 0;
  function increment() {
    value += i;
    console.log(value);
    return function logValue() {
      const message = `Current value is ${value}`;
      console.log(message);
    };
  }
  
  return increment;
}

const inc = createIncrementFixed(1);
const log = inc(); // logs 1
inc();             // logs 2
inc();             // logs 3
// Works!
log();             // logs "Current value is 3"
```

`logValue()` closes over `value` variable from the scope of `createIncrementFixed()`.  `log()` now logs the correct message `"Current value is 3"`.   

## 3. Stale closures of hooks

### 3.1 *useEffect()*

Let's study a common case of stale closure when using `useEffect()` hook.

Inside the component `<WatchCount>` the hook `useEffect()` logs every second the value of `count`:  

```jsx
function WatchCount() {
  const [count, setCount] = useState(0);

  useEffect(function() {
    setInterval(function log() {
      console.log(`Count is: ${count}`);
    }, 2000);
  }, []);

  return (
    <div>
      {count}
      <button onClick={() => setCount(count + 1) }>
        Increase
      </button>
    </div>
  );
}
```

[Open the demo](https://codesandbox.io/s/stale-closure-use-effect-broken-2-gyhzk) and click a few times increase button. Then look at the console, and every 2 seconds apprears `Count is: 0`.   

Why does it happen?

At first render, the closure `log()` captures `count` variable as `0`. Later, even if `count` increases, `log()` still uses `count` as `0` from initial render. `log()` is a stale closure.  

The solution is to let know `useEffect()` that the closure `log()` depends on `count` and properly handle the reset of interval:  

```jsx{11}
function WatchCount() {
  const [count, setCount] = useState(0);

  useEffect(function() {
    const id = setInterval(function log() {
      console.log(`Count is: ${count}`);
    }, 2000);
    return function() {
      clearInterval(id);
    }
  }, [count]);

  return (
    <div>
      {count}
      <button onClick={() => setCount(count + 1) }>
        Increase
      </button>
    </div>
  );
}
```

With the dependencies properly set, `useEffect()` updates the closure as soon as `count` changes.  

[Open the fixed demo](https://codesandbox.io/s/stale-closure-use-effect-fixed-2-ybv47) and click a few times increase. The console will log the actual value of `count`.  

Proper management of hooks dependencies is an efficient way to solve the stale closure problem. 

I recommend to install [eslint-plugin-react-hooks](https://www.npmjs.com/package/eslint-plugin-react-hooks), which detects the forgotten dependencies.  

*There's another solution how to make log() work correctly. If you see it, let me know in a [comment](#disqus_thread)!*  

### 3.2 *useState()*

The component `<DelayedCount>` has 2 buttons: 

* "Increase async" increments the counter in async mode with 1 second delay 
* "Increase sync" increments the counter right away, in sync mode. 

```jsx
function DelayedCount() {
  const [count, setCount] = useState(0);

  function handleClickAsync() {
    setTimeout(function delay() {
      setCount(count + 1);
    }, 1000);
  }

  function handleClickSync() {
    setCount(count + 1);
  }

  return (
    <div>
      {count}
      <button onClick={handleClickAsync}>Increase async</button>
      <button onClick={handleClickSync}>Increase sync</button>
    </div>
  );
}
```

Now [open the demo](https://codesandbox.io/s/use-state-broken-0q994). Click "Increase async" then right away "Increase sync" buttons. The counter gets updated only to `1`.  

It happens because `delay()` is a stale closure.    

Let's explore what happens:

  1. *Initial render*. `count` is `0`.  
  * *"Increase async" is clicked*. `delay()` closure captures `count` as `0`. `setTimeout()` registers `delay()` to be called after 1 second.  
  * *"Increase sync" is clicked*. The handler `handleClickSync()` sets count state to `1` using `setCount(0 + 1)`. The component re-renders.  
  * *After 1 second*. `setTimeout()` executes the `delay()` function. But `delay()` closure still *remembers* `count` being `0` from initial render, so sets the state `setState(0 + 1)`. As result, the count remains `1`.  

`delay()` is a stale closure that uses an outdated `count` variable captured during the initial render.  

To fix the problem, let's use a functional way to update `count` state:

```jsx{6}
function DelayedCount() {
  const [count, setCount] = useState(0);

  function handleClickAsync() {
    setTimeout(function delay() {
      setCount(count => count + 1);
    }, 1000);
  }

  function handleClickSync() {
    setCount(count + 1);
  }

  return (
    <div>
      {count}
      <button onClick={handleClickAsync}>Increase async</button>
      <button onClick={handleClickSync}>Increase sync</button>
    </div>
  );
}
```

Now `setCount(count => count + 1)` updates the count state inside `delay()`. React makes sure the latest state value is supplied as an argument to the update state function. The stale closure is solved.    

[Open the demo](https://codesandbox.io/s/use-state-fixed-zz78r). Click "Increase async" then right away "Increase sync" buttons. The `counter` displays the correct value `2`.  

## 4. Conclusion

A closure is a function that captures variables from the place where it is defined (or its lexical scope).  

A good understanding of closures is the first requirement to efficiently use React hooks and avoid stale closures.   

The stale closure problem occurs when a closure captures outdated variables. An efficient way to solve stale closures is to correctly set the dependencies of React hooks. Or, in case of stale state, use a functional way to update the state.   

The key takeaway is to try to supply hooks with closures that have captured the freshest variables.  

*Do you think closures make React hooks difficult to understand?*