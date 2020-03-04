---
title: '3 Rules of React State Management'
description: '3 Simple Rules of Efficient React State Management: atomic state, extract complex into hook and extract multiple operations into reducer'
published: '2020-03-02T12:00Z'
modified: '2020-03-02T12:00Z'
thumbnail: './images/couch.jpg'
slug: react-state-management
tags: ['javascript', 'react', 'state']
recommended: ['react-usestate-hook-guide', 'use-react-memo-wisely']
type: post
commentsThreadId: react-state-management
---

State inside a React component is the encapsulated data that is persistent between renderings. `useState()` is the React hook responsible for managing state inside a functional component. 

I like that `useState()` indeed makes the work with state quite easy. But often I encounter questions like: 

- should I divide my component's state into small states, or keep a compound one? 
- if the state management becomes complicated, should I extract it from the component? How to do that?
- if `useState()` usage is so simple, when would you need `useReducer()`?  

This post describes 3 easy rules that answer the above questions and help you design the component's state.  

## 1. One concern

The first good rule of efficient state management is:

> Make a state variable responsible for one concern.

Having a state variable responsible for one concern makes it conform to the Single Responsibility Principle.  

Let's see an example of a compound state, i.e. a state that incorporates multiple state values.  

```javascript
const [state, setState] = useState({
  on: true,
  count: 0
});

state.on    // => true
state.count // => 0
```

The state consists of a plain JavaScript object, having the properties `on` and `count`.  

The first property, `state.on`, holds a boolean denoting a switch. The same way `state.count` holds a number denoting a counter, for example, how many times the user had clicked a button.  

Then, let's say you'd like to increase the counter by 1:

```javascript
// Updating compound state
setUser({
  ...state,
  count: state.count + 1
});
```

You have to keep nearby the whole state to be able to update just `count`. This is a big construction to invoke to simply increase a counter: all because the state variable is responsible for 2 concerns: switch and counter.   

The solution is to split the compound state into 2 atomic states `on` and `count`:

```javascript
const [on, setOnOff] = useState(true);
const [count, setCount] = useState(0);
```

`on` state variable is solely responsible for storing the switch state. The same way `count` variable is solely responsible for a counter.  

Now let's try to update the counter:

```javascript
setCount(count + 1);
// or using a callback
setCount(count => count + 1);
```

`count` state, which is responsible for counting only, is easy to reason about, and respectively easy to update and read.  

Don't worry about calling multiple `useState()` to create state variables for each concern. 

Note, however, that if you have way too much `useState()` variables, there's a good chance that your component violates the Single Responsibility Principle. Just split such components into smaller ones.  

## 2. Extract complex state logic

> Extract complex state logic into a custom hook.  

Would it make sense to keep complex state operations within the component?  

The answer is in fundamentals (as usually happens).  

React hooks are created to isolate the component from *complex state management* and side effects. So, since the component should be concerned only about the elements to render and some event listeners to attach, the complex state logic should be extracted into a custom hook.  

Let's consider a component that manages a list of products. The user can add new product names. The constraint is that product names have to be *unique*.  

The first attempt is to keep the setter of product names list state directly inside the component:

```jsx{2,8-11}
function ProductsList() {
  const [names, setNames] = useState([]);
  const [newName, setNewName] = useState('');

  const map = name => <div>{name}</div>;

  const handleChange = event => setNewName(event.target.value);
  const handleAdd = () => {
    const s = new Set([...names, newName]);
    setNames([...s]);
  };

  return (
    <div className="products">
      {names.map(map)}
      <input type="text" onChange={handleChange} />
      <button onClick={handleAdd}>Add</button>
    </div>
  );
}
```

`names` state variable holds the product names. When the *Add* button is clicked, `addNewProduct()` event handler is invoked.  

Inside `addNewProduct()`, a `Set` object is used to keep the product names unique. Should the component be concerned about this implementation detail? Nope.   

It would be better to isolate the complex state setter logic into a custom hook. Let's do that.  

The new custom hook `useUnique()` takes care of keeping the items unique:

```javascript
// useUnique.js
export function useUnique(initial) {
  const [items, setItems] = useState(initial);
  const add = newItem => {
    const uniqueItems = [...new Set([...items, newItem])];
    setItems(uniqueItems);
  };
  return [items, add];
};
```

Having the custom state management extracted into a hook, the `ProductsList` component becomes much lighter:

```jsx{4,10}
import { useUnique } from './useUnique';

function ProductsList() {
  const [names, add] = useUnique([]);
  const [newName, setNewName] = useState('');

  const map = name => <div>{name}</div>;

  const handleChange = event => setNewName(e.target.value);
  const handleAdd = () => add(newName);

  return (
    <div className="products">
      {names.map(map)}
      <input type="text" onChange={handleChange} />
      <button onClick={handleAdd}>Add</button>
    </div>
  );
}
```

`const [names, addName] = useUnique([])` is what enables the custom hook. The component is no longer cluttered with complex state management. 

If you'd like to add a new name to the list, you only have to invoke `add('New Product Name')`.  

Bottom line, the benefits of extracting the complex state management into a custom hook are:

* The component becomes free of state management details
* The custom hook can be reused
* The custom hook can be easily tested in isolation

## 3. Extract multiple state operations

> Extract multiple state operations into a reducer.

Continuing the example with `ProductsList`, let's introduce a Delete operation, which deletes a product name from the list. 

Now you have to code 2 operations: adding and deleting products. The handle these operations, it makes sense to create a reducer and make the component free of state management logic.  

Again, this approach fits the idea of hooks: extract the complex state management out of the components.  

Here's a possible implementation of the reducer that adds and deletes products:

```javascript
function uniqueReducer(state, action) {
  switch (action.type) {
    case 'add':
      return [...new Set([...state, action.name])];
    case 'delete':
      return state.filter(name => name === action.name);
    default:
      throw new Error();
  }
}
```

Then `uniqueReducer()` can be used inside the products list by invoking React's `useReducer()` hook:

```jsx{2,7,10}
function ProductsList() {
  const [names, dispatch] = useReducer(uniqueReducer, []);
  const [newName, setNewName] = useState('');

  const handleChange = event => setNewName(event.target.value);

  const handleAdd = () => dispatch({ type: 'add', name: newName });

  const map = name => {
    const delete = () => dispatch({ type: 'delete', name });
    return (
      <div>
        {name}
        <button onClick={delete}>Delete</button>
      </div>
    );
  }

  return (
    <div className="products">
      {names.map(map)}
      <input type="text" onChange={handleChange} />
      <button onClick={handleAdd}>Add</button>
    </div>
  );
}
```

`const [names, dispatch] = useReducer(uniqueReducer, [])` enables `uniqueReducer`. `names` is the state variable holding the product names, and `dispatch` is a function to be called using an action object.  

When *Add* button is clicked, the handler invokes `dispatch({ type: 'add', name: newName })`. Dispatching an `add` action makes the reducer `uniqueReducer` add a new product name to the state.  

In the same way, when *Delete* button is clicked, the handler invokes `dispatch({ type: 'delete', name })`. Dispatching a `remove` action removes the product name from the state of names.  

Interestingly, the reducer is a special case of [Command design pattern](https://refactoring.guru/design-patterns/command). 

## 4. Conclusion

A state variable should be responsible for one concern. 

If the state has a complicated update logic, extract this logic out of the component into a custom hook. 

Same way, if the state requires multiple operations, use a reducer to incorporate these operations.  

No matter what rule you use, the state should be as simple and decoupled as possible. The component should not be cluttered with the details of how the state is updated: these should be a part of a custom hook or a reducer.  

Confirming to these 3 simple rules will make your state logic easy to understand, maintain, and test.  