---
title: "How to Correctly Debounce and Throttle Callbacks in React"
description: "How to correctly create debounced and throttled callbacks in React using useMemo() hook."
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

function FilterList({ list }) {
  const [query, setQuery] = useState('');

  let filteredList = [];

  if (query !== '') {
    filteredList = list.filter(name => {
      return name.toLowerCase().includes(query.toLowerCase());
    });
  }

  const changeHandler = event => {
    setQuery(event.target.value);
  };

  return (
    <div>
      <input 
        onChange={changeHandler} 
        type="text" 
        placeholder="Type a query..."
      />
      {filteredList.map(name => <div>{name}</div>)}
    </div>
  );
}
```

[Try the demo.]()

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

The only problem with applying debouncing to `changeHandler` is that the debounce version of the function should remain the same between component re-renderings.  

## 3. Debouncing a callback, second attempt

## 4. Conclusion