---
title: "Controlled Inputs Using React Hooks"
description: "How to implement a controlled inputs using React hooks."
published: "2020-09-29T12:00Z"
modified: "2020-09-29T12:00Z"
thumbnail: "./images/cover-2.png"
slug: controlled-inputs-using-react-hooks
tags: ['react', 'input']
recommended: ['use-react-memo-wisely', 'react-state-management']
type: post
commentsThreadId: controlled-inputs-using-react-hooks
---

If you'd like to access the value of an input element in React, you can use 2 approaches. 

In the first approach, named *uncontrolled input*, you access the value of the input from a reference to the input element.  

The second approach, which I like because it doesn't use references, is using a *controlled input*. Let's see how to design a controlled inputs using React hooks.  

## 1. The controlled input

A web page consists of a list of employees names.  

Your task is to add an input field on this page. When the user types into this field, then the list of employees is filtered by keeping the names that contain the query.  

That's a good scenario where you can design a controlled input. Here's a possible implementation:

```jsx{2,4,15-17}
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

Open the [demo]() and enter a query in the input field. You'll see how the list of employees is filtered.  

Let's see the 3 steps required to setup a controlled input.  

### Step 1. Define the state that holds the input value

Initially, define the state that's going to hold the controlled input value. In the example above `useState()` hook is used: `const [query, setQuery] = useState('')`.  

### Step 2.The event handler to update state

Then define an event handler (`onChange` function) which accesses the input element and updates the state with the input value: `setQuery(event.target.value)`.  

### Step 3. Assign the event handler and value to the input field

Finally, set on the input field the value attribute to the state value, as well attach the event handler: `<input type="text" value={query} onChange={onChange} />`. The input field is *controlled* because React sets the value of the input from the state.   

## 2. Debouncing the controlled input

If you've took a try of the previous filtering implementation, you might notice that as soon as you type a character into the input field, the list gets filtered right away.  

That's not always convinient because it distracts the user when typing the query. You can improve the user experience by applying a debounce: when the user types the query do not filter right away, but apply filtering after a timeout of 400ms.  

How could you debounce a controlled input? Let's see a possible implementation:

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

Open the [demo](), then enter a query into the input field. The employees list doesn't filter right away while you type, but only after passing 400ms after latest keypress.  

Because React controls the value of the input, you have to keep the state `const [query, setQuery] = useState('')` that updates the input value.  

The value that filters the employees list requires a new state value (`debouncedQuery`), separate from the input value state. Doing so requires using a specialized hook
`debouncedQuery = useDebouncedValue(query, 400)`.  

The `debouncedQuery` value must be used to filter the list of employees.  

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

## 3. Summary

The controlled inputs are a good approach to work with input fields in React. I like it because I don't have to use references, and the enables having a single source of thruth.  

Setting up controlled inputs requires 3 easy steps:  

1. Create the state to hold the input value: `[val, setVal] = useState('')`
* Define the event handler to update the state: `onChange = (event) => setVal(event.target.value)`
* Attach the event handler and set value attribute on the input: `<input value={val} onChange={onChange} />`.  

To debounce the changing value of the input you need to use a separate state holding the debounced value. For such cases use the specialized hook `useDebouncedValue(value, wait)`.  

*Do you prefer controlled or uncontrolled components?*