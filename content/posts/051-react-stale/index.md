---
title: Be Aware of Stale Closures when Using React Hooks
description: The stale closures is a pitfall of React hooks when an outdated variable is captured by a closure.
published: '2019-10-22T13:00Z'
modified: '2019-10-22T13:00Z'
thumbnail: './images/landscape.jpg'
slug: react-hooks-stale-closures
tags: ['react', 'hook']
recommended: ['use-react-memo-wisely', 'become-better-software-developer-digging-climbing']
type: post
commentsThreadId: react-hooks-stale-closure
---

A side effect (state management, HTTP request, etc) inside a React component using [hooks](https://reactjs.org/docs/hooks-reference.html) is performed as a composition of a few functions. That's the selling point of React hooks.   

Hooks replace class-based components by easying the reuse of state and side effects management. Plus you can extract repeated logic into a custom hook to reuse across the application.  

Hooks heavily rely on JavaScript closures. Closures make hooks “simple” to use. But closures are sometimes tricky (recall memory leaks?). 

You can encouter the stale closure problem when working with a React component having a multitude of effects and state management. And it might be difficult to solve!

This post explains the important term JavaScript closure. Follows the stale closure problem description. Finally, you will understand how to distinguish stale closure situations within your React components, and how to solve them.  

### 1. The JavaScript closure

Let's start with a short introduction of what is a closure in JavaScript.  

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

`createIncrement(1)` returns the function `increment()`, assigned to a variable `inc`. When `inc()` is called, the `value` variable gets incremented by `1`.  

You can call `inc()` function as many times as you want. First call of `inc()` returns `1`, the second call returns `2`, and so on.  

Did you spot the interesting thing? You simply call `inc()`, without arguments, but JavaScript still knows the current `value` and how much to increment `i`. How does it do that? 

The answer lays inside `createIncrement()`. There you will find `increment()` function: the closure that does the magic. The closure captures (or closes over, or simply remembers) the variables `value` and `i` from the lexical scope.  

The *lexical scope* is the set of variables a closure accesses from the outer scope *where it is defined*. In the example, the lexical scope of `increment()` are variables `value` and `i`, accessed from the scope of `createIncrement()`.  

Because `inc()` is a closure (`inc` variable holds `increment` closure), no matter where invoked, it always has access to the variables from its lexical scope  `value` and `i`.  

Continuing the example, `inc()` can be called anywhere else, even inside an async callback:  
```javascript{2,7}
(function() {
  inc(); // logs 3
}());

setTimemout(function() {
  // after 1 second
  inc(); // logs 4
}, 1000);
```

#### 1.1 A mental model of closures

I know closures might be difficult to grasp. But once you *get it*, it's forever. 

You can model them in your mind the following way. 

Imagine a magical paintbrush with an interesting property. If you paint using it some objects from real life, then the painting becomes a window you can interact with.  

![Painting as a model of JavaScript closures](./images/rose.jpg)

Through this window you can move the painted objects with your hands.  

Moreover, you can carry the magical painting anywhere, even far from the place you've painted the objects. From there, through the magical painting as a widow, you can still move the objects with your hands.  

The magical painting is a *closure*, while the painted objects are the *lexical scope*.  

Isn't JavaScript magic? &#x263a;

*If you know other meaningful mental models of closures, please share in a [comment](#disqus_thread) below!*

## 2. The stale closure

Let's modify the `increment()` function to return a function that logs the current value to console:

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

`const log = inc()` increments the internal value by `1`, assigning the log function to `log` variable.  

After 3 invocations of `inc()`, `value` equals to `3`. 

But invoking `log()` the message `"Current value is 1"` is logged. Normally it should log `"Current value is 3"` (to reflect `value` being `3`).  

*`log` is the stale closure*. It happens when a closure captures variables with outdated values.  

Let's see some approaches how to fix the stale closure.  

### 2.1 Fixing the stale closure

#### A. Use a fresh closure

Let's find the closure that captured the most fresh `message` variable. That's the closure returned from the *latest* `inc()` invocation:

```javascript{7}
const inc = createIncrement(1);

inc();             // logs 1
inc();             // logs 2
const log = inc(); // logs 3
// Works!
log();             // logs "Current value is 3"
```

By the way, this is roughly how React hooks handle the freshness of closures.  

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

## 3. Stale closure inside hooks

### 3.1 *useEffect()*
Let's study a create the common case of stale closure when using `useEffect()` hook.

Inside the component `<SetDocumentTitle>` the hook `useEffect()` sets the title of the document.  

```jsx
function SetDocumentTitle() {
  const [message, setMessage] = useState("Nothing");
  const [who, setWho] = useState("Nobody");

  useEffect(function changeTitle() {
    document.title = `${message}, ${who}!`;
  }, [message]);

  return (
    <div>
      <button onClick={() => setWho("Joe") }>
        Set who to Joe
      </button>
      <button onClick={() => setMessage("Hello") }>
        Set message to Hello
      </button>
    </div>
  );
}
```

[Open the demo](https://jkp7w.csb.app/) and click on button "Set who to Joe". The document title doesn't update.  

At first render, the closure `changeTitle()` captures `who` variable having the initial state `"Nobody"`.  

When you click "Set who to Joe" button, the state variable `who` updates to `"Joe"` and the component re-renders. But `useEffect(..., [message])` still uses the stale closure from the first render , which captured `who` having `"Nobody"` value.  

The solution is to let know `useEffect()` that the closure `changeTitle()` depends on both variables `message` and `who`:  

```jsx{5}
function SetDocumentTitle() {
  // ...
  useEffect(function changeTitle() {
    document.title = `${message}, ${who}!`;
  }, [message, who]);
  // ...
}
```

With the dependencies properly set, `useEffect()` updates the closure as soon as `message` or `who` variables are changed.  

[Open the fixed demo](https://hu18o.csb.app/) and click on button "Set who to Joe". The document title updates correctly.  

Proper management of hooks dependencies is the most efficient way to solve the stale closure problem. 

I recommend to install [eslint-plugin-react-hooks](https://www.npmjs.com/package/eslint-plugin-react-hooks), which detects the forgotten dependencies.    

### 3.2 *useState()*

You have a button that increase a counter async with a delay of 1 second and the second button increments the counter by 1 right away. The naive implementation looks as follows:

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

Now [open the demo](https://codesandbox.io/s/use-state-broken-0q994). Click quickly *Increase async* then right away *Increase sync* buttons. You will see than the counter gets updated only by `1`.  

Again, it happens because of a stale closure. Particularly the `delay()` function.  

`count` is `0` on initial render. When you first click on *Increase async*, the `delay()` closure captures `count` as `0`. Then `setTimeout()` registers `delay()`
to be called after 1 second.  

Shortly after you click *Increase sync*, and right away the count is set at `setCount(0 + 1)`.  

After 1 second have passed, `setTimeout()` executes the `delay()` function. But delay still *remembers* that count is still `0`, so sets the state the same as `setState(0 + 1)`.

`delay()` is a stale closure that uses an outdated value of `count`.  

To fix the problem, use a function to increase the count:

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

`setCount(count => count + 1)` is used to update the count in the `delay()` function. This makes sure that the actual value of `count` is used to increase its value.  

[Open the demo](https://codesandbox.io/s/use-state-fixed-zz78r). Click quickly *Increase async* then right away *Increase sync* buttons. You will see than the counter gets updated only 2 times.  

## 4. Conclusion

A closure is the function that captures the variables from the place where it is defined (or its lexical scope).  

Good understanding of closures is the first requirement to efficiently use React hooks. 

The stale closure problem occurs when a closure captures outdated variables. An efficient way to solve stale closures is to correctly set the dependencies of React hooks.  

As a mental model, supply hooks with closures that have captured the most fresh variables.

*What do you find difficult about React hooks?*