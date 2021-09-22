---
title: "React Controlled Components, the Hooks Way"
description: "The step by step guide on how to implement controlled components in React using hooks."
published: "2020-09-29T07:20Z"
modified: "2020-11-17T08:20Z"
thumbnail: "./images/cover-6.png"
slug: controlled-inputs-using-react-hooks
tags: ['react', 'component', 'input', 'form', 'hook']
recommended: ['use-react-memo-wisely', 'react-state-management']
type: post
---

React offers 2 approaches to access the value of an input field: using a controlled or uncontrolled component techniques. I prefer controlled components because you read and set the input value through the component's state.  

In this post, you'll read how to implement controlled components using React hooks.  

## 1. The controlled component

Let's say you have a simple text input field, and you'd like to access its value:

```jsx
import { useState } from 'react';

function MyControlledInput({ }) {
  const [value, setValue] = useState('');

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <>
      <div>Input value: {value}</div>
      <input value={value} onChange={onChange} />
    </>
  );
}
```

Open the [demo](https://codesandbox.io/s/controlled-component-uwf8n) and type into the input field. You can see that `value` state variable contains the value entered into the input field, and it also updates each time you enter a new value.  

The input field is *controlled* because React sets its value from the state `<input value={value} ... />`. When the user types into the input field, the `onChange` handler updates the state with the input’s value accessed from the event object: `event.target.value`.  

`value` state variable is the source of truth. Each time you need to access the value entered by the user into the input field &mdash; just read `value` state variable.  

The controlled components approach can help you access the value of any input type: being regular textual inputs, textareas, select fields.  

## 2. The controlled component in 3 steps

Setting up the controlled component requires 3 steps:

1) Define the state that's going to hold the input value: `const [value, setValue] = useState('')`.  

2) Create the event handler that updates the state when the input value changes:

```javascript
const onChange = event => setValue(event.target.value);
```

3) Assign the input field with the state value and attach the event handler: `<input type="text" value={value} onChange={onChange} />`. 

## 3. The state as the source of truth

Let's see a more complex example. A web page consists of a list of employees' names. You need to add an input field, and when the user types into this field, the employees' list is filtered by name.  

That's a good scenario to use a controlled input. Here's a possible implementation:

```jsx{1,3,14-15}
function FilteredEmployeesList({ employees }) {
  const [query, setQuery] = useState('');
  
  const onChange = event => setQuery(event.target.value);

  const filteredEmployees = employees.filter(name => {
    return name.toLowerCase().includes(query.toLowerCase());
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

What's important the `query` state variable is the source of truth for the value entered in the input field. You use it inside `employees.filter()` to filter the list of employees: `name.toLowerCase().includes(query)`.  

## 4. Debouncing the controlled input

In the previous implementation, as soon as you type a character into the input field, the list gets filtered instantly. That's not always convenient because it distracts the user when typing the query. 

Let's improve the user experience with debouncing: filter the list with a delay of 400 ms after the last input change.  

Let's see a possible implementation of a debounced controlled input:

```jsx{0,4,9}
import { useDebouncedValue } from './useDebouncedValue';

function FilteredEmployeesList({ employees }) {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebouncedValue(query, 400);
  
  const onChange = event => setQuery(event.target.value);

  const filteredEmployees = employees.filter(name => {
    return name.toLowerCase().includes(debouncedQuery.toLowerCase());
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

## 5. Summary

The controlled component is a convenient technique to access the value of input fields in React. It doesn't use references and serves as a single source of truth to access the input value.  

Setting up a controlled input requires 3 steps:  

1. Create the state to hold the input value: `[val, setVal] = useState('')`
* Define the event handler to update the state when the user types into the input: `onChange = event => setVal(event.target.value)`
* Attach the event handler and set `value` attribute on the input field: `<input onChange={onChange} value={val} />`.  

Debouncing of the input value state requires creating a new derived state using the specialized hook `debouncedQuery = useDebouncedValue(value, wait)`.  

*Do you prefer controlled or uncontrolled components?*