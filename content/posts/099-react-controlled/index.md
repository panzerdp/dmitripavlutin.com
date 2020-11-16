---
title: "React Controlled Components — the Hooks Way"
description: "The step by step guide on how to implement controlled components in React using hooks."
published: "2020-09-29T07:20Z"
modified: "2020-11-16T10:30Z"
thumbnail: "./images/cover-3.png"
slug: controlled-inputs-using-react-hooks
tags: ['react', 'component', 'input', 'form', 'hook']
recommended: ['use-react-memo-wisely', 'react-state-management']
type: post
---

There are 2 approaches to access the value of an input element in React.  

In the first approach, named *uncontrolled component*, you access the value from a reference to the input element. The second approach, which I like because it doesn't use references, is using a *controlled component*. 

In this post, you'll read how to implement controlled components using React hooks.  

## 1. The controlled component

The input field is *controlled* because React sets its value from the state. When the user types into the input field, the `onChange` handler updates the state with the input's value, which's accessed from the event object: `event.target.value`.  

A good way to understand how controlled components work is by studying an example.  

A web page consists of a list of employees' names. You need to add an input field, and when the user types into this field, the employees' list is filtered by name.  

That's a good scenario to use a controlled input. Here's a possible implementation:

```jsx{2,4,15-16}
function FilteredEmployeesList({ employees }) {
  const [query, setQuery] = useState('');
  
  const onChange = event => setQuery(event.target.value);

  const filteredEmployees = employees.filter(name => {
    return name.toLowerCase().includes(query);
  });

  return (
    <div>
      <h2>Employees List</h2>
      <input 
        type="text" 
        value={query} 
        onChange={onChange}
      />
      <div className="list">
        {filteredEmployees.map(name => <div>{name}</div>)}
      </div>
    </div>
  );
}
```

Open the [demo](https://codesandbox.io/s/gracious-dawn-29qi6?file=/src/App.js) and enter a query in the input field. You'll see how the list of employees is filtered.  

Setting up the controlled input requires 3 steps.

### Step 1. Define the state that holds the input value

Define the state that's going to hold the input value: `const [query, setQuery] = useState('')`.  

### Step 2. Define on change event handler

Then define an event handler that updates the state when the input value changes:

```javascript
const onChange = event => setQuery(event.target.value);
```

### Step 3. Assign the event handler and value to the input field

Finally, set on the input field the value attribute as the state value, as well attach the event handler: `<input type="text" value={query} onChange={onChange} />`. 

## 2. Debouncing the controlled input

In the previous implementation, as soon as you type a character into the input field, the list gets filtered instantly. That's not always convenient because it distracts the user when typing the query. 

Let's improve the user experience with debouncing: let's filter the list only after passing 400ms after the last change of the input field.  

Let's see a possible implementation of a debounced controlled input:

```jsx{1,5,10}
import { useDebouncedValue } from './useDebouncedValue';

function FilteredEmployeesList({ employees }) {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebouncedValue(query, 400);
  
  const onChange = event => setQuery(event.target.value);

  const filteredEmployees = employees.filter(name => {
    return name.toLowerCase().includes(debouncedQuery);
  });

  return (
    <div>
      <h2>Employees List</h2>
      <input 
        type="text" 
        value={query} 
        onChange={onChange}
      />
      <div className="list">
        {filteredEmployees.map(name => <div>{name}</div>)}
      </div>
    </div>
  );
}
```

Open the [demo](https://codesandbox.io/s/affectionate-swartz-9yk2u?file=/src/App.js), then enter a query into the input field. The employees' list doesn't filter while you type, but after passing 400ms after the latest keypress.  

The new state value `debouncedQuery` value is managed by a specialized hook that implements the debouncing: `useDebouncedValue(query, 400) `. `debouncedQuery` state value is used to filter the employees' list and is derived from the input value state.  

Here's the implementation of `useDebouncedValue()`:

```javascript
export function useDebouncedValue(value, wait) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => setDebouncedValue(value), wait);
    return () => clearTimeout(id);
  }, [value]);

  return debouncedValue;
}
```

In a few words, here's how it works.  

First, the `useDebouncedValue()` hook creates a new state derived from the main state.  

Then, `useEffect()` updates after `wait` delay the `debouncedValue` state when the main `value` state changes.  

## 3. Summary

The controlled component is a convenient technique to access the value of input fields in React. It doesn't use references and serves as a single source of truth to access the input value.  

Setting up a controlled input requires 3 steps:  

1. Create the state to hold the input value: `[val, setVal] = useState('')`
* Define the event handler to update the state when the user types into the input: `onChange = event => setVal(event.target.value)`
* Attach the event handler and set `value` attribute on the input field: `<input onChange={onChange} value={val} />`.  

Debouncing of the input value state requires creating a new derived state using the specialized hook `debouncedQuery = useDebouncedValue(value, wait)`.  

*Do you prefer controlled or uncontrolled components?*