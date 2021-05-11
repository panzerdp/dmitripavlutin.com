---
title: "How to Correctly Debounce and Throttle Callbacks in React"
description: "How to correctly debounce and throttle callbacks in React using useCallback() and useMemo() hooks."
published: "2021-05-11T08:00Z"
modified: "2021-05-11T08:00Z"
thumbnail: "./images/cover-3.png"
slug: react-throttle-debounce
tags: ['react', 'callback']
recommended: ['javascript-callback', 'controlled-inputs-using-react-hooks']
type: post
---

When a React component handles bursting events like window resize, scrolling, user typing into an input, etc. it makes sense to soften the handlers of these events. Othwerise the handlers are invoked too often, and you risk to make the application lagging or even unresponsive for a few seconds.   

For example, if the user types a query into an input field, and the component fetches data from the API using that query &mdash; then don't make the request as soon as the user types a character, but wait around 300ms until the user has typed the last character &mdash; then perform the request. This is debouncing.  

In this post, I'll learn how to correctly use React hooks to create debounced and throttled callbacks in React.  

*If you're unfamiliar with debounce and throttle concepts, I recommend checking [Debouncing and Throttling Explained Through Examples](https://css-tricks.com/debouncing-throttling-explained-examples/).*

## 1. The callback without debouncing

Let's say that you code a component named `<FilterList>`, which accepts as a prop a potentially quite big list of names (at least 200 records). The component has an input field where the user types a query and the list of names if filtered by that query.  

Let's implement the filtering in a plain way:

```jsx
import { useState } from 'react';

export function FilterList({ names }) {
  const [query, setQuery] = useState("");

  let filteredNames = names;

  if (query !== "") {
    filteredNames = names.filter((name) => {
      return name.toLowerCase().includes(query.toLowerCase());
    });
  }

  const changeHandler = (event) => {
    setQuery(event.target.value);
  };

  return (
    <div>
      <input 
        onChange={changeHandler} 
        type="text" 
        placeholder="Type a query..."
      />
      {filteredNames.map(name => <div key={name}>{name}</div>)}
    </div>
  );
}
```

[Try the demo.](https://codesandbox.io/s/no-debouncing-bbd0e?file=/src/FilterList.js)

When typing the query into the input field, you would notice the list gets filtered for every introduced character.  

For example, if you type the word `Michael`, then the component would display flashes of filtered lists for the queries `M`, `Mi`, `Mic`, `Mich`, `Micha`, `Michae`, `Michael`. However, the user would need to see just one list: for the word `Michael`.  

Let's improve the process of filtering by applying `300ms` time debouncing to the `changeHandler` function.  

## 2. Debouncing a callback, first attempt

To debounce the `changeHandler` function I'm going to use the `lodash.debounce` package. You can use any other library at your will, or even write the debounce function by yourself.  

Let's look at how to use the [debounce()](https://lodash.com/docs/#debounce) function:

```javascript
import debounce from 'lodash.debounce';

const debouncedCallback = debounce(callback, waitTime);
```

`debounce()` function accepts the `callback` argument function, and returns a debounced version of that function.  

When the debounced function `debouncedCallback` gets invoked multiple times, even in bursts, it will invoke the callback only after `waitTime` has passed after the last invocation.  

The debouncing then fits great to soften the filtering inside the `<FilterList>`: let's debounce `changeHandler` to wait about `300ms` when the user stops typing, and only then filter the list.  

The only problem with applying debouncing to `changeHandler` is that the debounced version of the function should remain the same between component re-renderings. The first approach would be to use the `useCallback(callback, dependencies)` that would make sure to keep one instance of the debounced function between component re-renderings.  

```jsx{2,19-21,26}
import { useState, useCallback } from 'react';
import debounce from 'lodash.debounce';

export function FilterList({ names }) {
  const [query, setQuery] = useState("");

  let filteredNames = names;

  if (query !== "") {
    filteredNames = names.filter((name) => {
      return name.toLowerCase().includes(query.toLowerCase());
    });
  }

  const changeHandler = event => {
    setQuery(event.target.value);
  };

  const debouncedChangeHandler = useCallback(
    debounce(changeHandler, 300)
  , []);

  return (
    <div>
      <input 
        onChange={debouncedChangeHandler} 
        type="text" 
        placeholder="Type a query..."
      />
      {filteredNames.map(name => <div key={name}>{name}</div>)}
    </div>
  );
}
```

[Try the demo.](https://codesandbox.io/s/use-callback-debouncing-0ch2q?file=/src/FilterList.js)

`debounce(changeHandler, 300)` creates a debounced version of the event handled and `useCallback(debounce(changeHandler, 300), [])` makes sure to return the same instance of the debounced callback between re-renderings.  

*The approach also works with creating throttled functions, e.g. `useCallback(throttle(callback, time), [])`.*

Open the demo and type a query: you'll see that the list is filtered with a delay of `300ms` after the last typing: which brings a softer and better user experience.  

However... this implementation has a small performance issue: each time the component re-renders, a new instance of the debounced function is created by the `debounce(changeHandler)`. 

That's not a problem regarding the correctness: `useCallback()` makes sure to return the same debounced function instance. But it would be wise to avoid calling `debounce(...)` on each rendering.  

Let's see how to do that in the next section.  

## 3. Debouncing a callback, second attempt

Fortunately, using `useMemo()` hook as an alternative to `useCallback()` is a more optimal choice:

```jsx{19-21}
import { useState, useMemo } from 'react';
import debounce from 'lodash.debounce';

export function FilterList({ names }) {
  const [query, setQuery] = useState("");

  let filteredNames = names;

  if (query !== "") {
    filteredNames = names.filter((name) => {
      return name.toLowerCase().includes(query.toLowerCase());
    });
  }

  const changeHandler = (event) => {
    setQuery(event.target.value);
  };

  const debouncedChangeHandler = useMemo(
    () => debounce(changeHandler, 300)
  , []);

  return (
    <div>
      <input
        onChange={debouncedChangeHandler}
        type="text"
        placeholder="Type a query..."
      />
      {filteredNames.map(name => <div key={name}>{name}</div>)}
    </div>
  );
}
```

[Try the demo.](https://codesandbox.io/s/use-memo-debouncing-jwsog?file=/src/FilterList.js)

`useMemo(() => debounce(changeHandler, 300), [])` to memoize the debounced handler doesn't need calling `debounce()` at each rendering.  

*This approach also works with creating throttled functions: `useMemo(() => throttle(callback, time), [])`.*

If you open the demo, you'd see that typing into the input field is still debounced.  

## 4. Be careful with dependencies

If the debounced handler uses props or state, to avoid creating [stale closures](/react-hooks-stale-closures), I'd recommend setting up correctly the dependencies of `useMemo()`:

```jsx{8,13}
import { useMemo } from 'react';
import debounce from 'lodash.debounce';

function MyComponent({ prop }) {
  const [value, setValue] = useState('');
  
  const eventHandler = () => {
    // the event uses `prop` and `value`
  };

  const debouncedEventHandler = useMemo(() => {
    () => debounce(eventHandler, 300)
  }, [prop, stateValue]);
  
  // ...
}
```

Properly setting the dependencies guarantees refreshing the debounced event callback.  

## 5. Conclusion

A good way to create debounced and throttled functions, to handle often happening events, is by using the `useMemo()` hook:

```jsx{10-12,14-16}
import { useMemo } from 'react';
import debounce from 'lodash.debounce';
import throttle from 'lodash.throttle';

function MyComponent() {
  const eventHandler = () => {
    // handle the event...
  };

  const debouncedEventHandler = useMemo(() => {
    () => debounce(eventHandler, 300)
  }, []);

  const throttledEventHandler = useMemo(() => {
    () => throttle(eventHandler, 300)
  }, []);
  
  // ...
}
```

If the debounced or throttled event handler access props or state values, do not forget to set property the dependencies argument of `useMemo(..., dependencies)`.  