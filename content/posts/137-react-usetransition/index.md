---
title: "Don't Stop Me Now: How to Use React useTransition() hook"
description: "How to correctly priotitize updates using React useTranstion() hook to speed up the UI."
published: "2021-06-22T12:00Z"
modified: "2021-06-22T12:20Z"
thumbnail: "./images/cover-3.png"
slug: react-usetransition
tags: ['react', 'usetransition', 'hook']
recommended: ['react-throttle-debounce', 'controlled-inputs-using-react-hooks']
type: post
---

There are some updates of UI that should be performed as fast as possible, while other have less priority.  

Until now, React didn't provide a built-in tool to let you priorities the UI screen updates.  

Fortunately, starting React 18 (which is still in alpha as June 2021), you can make as less priority the heavy UI 
changes.  

In this post, you'll learn when to use the new `useTransition()` hook to make your UI more responsive when perfoming
heavy updates.  

## 1. *useTransition()* hook



## 2. Heavy UI updates as urgent

Let's consider an example of where it makes sense to separate urgent from non-urgent updates.  

You have a list of emplyee names, as well an input field where the user introduces a query. The component should highglight the query matches in
the name of the employee.  

Here's a possible implementation:

```jsx
export function FilterList({ names }) {
  const [query, setQuery] = useState("");

  const changeHandler = event => setQuery(event.target.value);

  return (
    <div>
      <input onChange={changeHandler} type="text" />
      {names.map((name, i) => (
        <ListItem key={i} name={name} query={query} />
      ))}
    </div>
  );
}

function ListItem({ name, query }) {
  const index = name.toLowerCase().indexOf(query.toLowerCase());
  return (
    <div>
      {name.slice(0, index)}
      <span className="highlight">
        {name.slice(index, index + query.length)}
      </span>
      {name.slice(index + query.length)}
    </div>
  );
}
```

[Try the demo.](https://codesandbox.io/s/heavy-update-as-urgent-ejwbg?file=/src/FilterList.js)

`<FilterList names={names}>` accepts a big array of names. Inside of the component, `query` is the state variable that contains the query string. The input field is a [controlled
component](/controlled-inputs-using-react-hooks/) that updates `query` state variable when the user types.  

Open the [demo]((https://codesandbox.io/s/heavy-update-as-urgent-ejwbg?file=/src/FilterList.js)) and type quickly a query into the input field. You would notice typiing lags and the UI feels unresponsive for noticeable periods of time.  

Why does it happen, and how to solve it?

Updating the input field value when the user types is an urgent task that must perform fast. However, updating the list by highlighting the matches is a heavy but non-urgent task.  

*The non-urgent but heavy task slows down the light but urgent task.*

`useTransition()` hook can help you separate urgent from non-urgent UI updates.  

## 3. Heavy UI updates as non-urgent



## 4. Conclusion

