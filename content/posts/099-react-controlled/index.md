---
title: "Controlled Input Using React Hooks"
description: "How to implement a controlled input using React hooks."
published: "2020-09-29T12:00Z"
modified: "2020-09-29T12:00Z"
thumbnail: "./images/cover-2.png"
slug: controlled-input-using-react-hooks
tags: ['react', 'input']
recommended: ['use-react-memo-wisely', 'react-state-management']
type: post
commentsThreadId: controlled-input-using-react-hooks
---

If you'd like to access the value of an input element in React, you can use 2 approaches. 

In the first approach, named *uncontrolled input*, you access the value of the input from a reference to the input element.  

The second approach, the one I like because it doesn't use references, is using a *controlled input*.  You'll find in the sections that follow how to use React hooks to design a controlled input.  

## 1. The controlled input

A web page consists of a list of employees names.  

Your task is to add an input of type text to this page. When the user writes a query, then the list of employees filters by keeping the names that contain that query.  

That's a good scenario where you can design a controlled input. Here's a possible implementation:

```javascript{2,4-6,17-18}
function FilteredEmployeesList({ employees }) {
  const [query, setQuery] = useState('');
  
  const onChange = event => {
    setQuery(event.target.value);
  };

  const filteredEmployees = employees.filter(name => {
    return name.toLowerCase().includes(query);
  });

  return (
    <div>
      <h2>Employees of Big co.</h2>
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

The input field in this implementation is *controlled*, which means that React sets the value of the input from the state.  

It is created in 3 steps.

### Step 1. Define the state that holds the input value

Initially, you need to define the state that is going to hold the controlled input value. In the above example is use the `useState()` hook: `const [query, setQuery] = useState('')`.  

### Step 2. Define the event handler that updates the state

Then define an event handler (`onChange` function) which accesses the input element and updates the state with the input value: `setQuery(event.target.value)`.  

### Step 3. Assign the event handler and value to the input field

Finally, set on the input field the value attribute to the state value, as well attach the event handler.  


## 2. Debouncing the controlled input

## 3. Inputs that can be controlled

## 4. Summary