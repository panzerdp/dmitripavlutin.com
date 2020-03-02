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

Let's take a look at 3 simple rules that will guide you on how to structure your React state.  

This post makes heavy use of hooks.  

## 1. Make the state atomic

The first good rule of efficient state management is:

> Make the state atomic.

Having an atomic state means that you no longer can chunk the state into multiple state values.  

Let's see an example of a compound state, i.e. a state that incorporates multiple state values.  

```javascript
const [state, setState] = useState({
  on: true,
  count: 0
});
```

`state` is composed of 2 state value: `state.on` and `state.count`.  

The first one, `state.on`, holds a boolean value which indicates whether something is on or off. 

The same way `state.count` value holds a number denoting counting something, for example, how many times the user had clicked a button.  

What happens if you'd like to update such a compound state? Let's say you'd like to increase the counter by 1:

```javascript
// Updating compound state
setUser({
  ...state,
  count: state.count + 1
});
```

This is a big construction to invoke to simply increase the counter state.  

The solution is to split the compound state into 2 atomic states `on` and `count`:

```javascript
const [on, setOnOff] = useState(true);
const [count, setCount] = useState(0);
```

Both `on` and `count` are atomic states. An atomic state can no longer be divided into something smaller.  

Now increasing the counter is easy:

```javascript
setCount(count + 1);
// or using a callback
setCount(count => count + 1);
```

`count` atomic state is easy to update since you don't have to deal with unnecessary concerns.  

The atomic state takes care of only one concern. Thus, such a state is easy to update and test.  

## 2. Extract complex state logic

> Extract complex state logic into a custom hook.  

Imagine a component having a state that has custom logic when updated. Would it make sense to keep the complex operation within the component?  

The search for an answer by looking at the fundamentals.  

React hooks are created to isolate the component from *complex state management* and side effects. So, since the component should be concerned only about the elements to render and some event listeners to attach, the complex state setter should be extracted.  

Let's consider a component that manages a list of products. The user can add new product names, but importantly the names have to be *non-empty* and *unique*.  

The first attempt is to keep the setter of such state directly inside the component:

```jsx{}
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

Inside `addNewProduct()`, a `Set` object is used to make sure that the product names are unique.  

The problem is that the code of adding a new product name to the list is about 1/3 of the component size. It would be better to isolate the complex state setter logic into a custom hook. Great, let's do that.  

The new custom hook `useUniqueNonEmpty()` takes care of the complex state management:

```javascript
export function useUnique(initial) {
  const [items, setItems] = useState(initial);
  const add = newItem => {
    const uniqueItems = [...new Set([...items, newItem])];
    setItems(uniqueItems);
  };
  return [items, add];
};
```

In a few words, `useUnique()` custom hook makes sure the state items always are unique.  

Having the custom state management extracted into a hook, the `ProductsList` component becomes much lighter:

```jsx{1,5}
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

## 3. Extract multiple state operations

> Extract multiple state operations into a reducer.

If you find yourself performing many operations over the same state value, a good idea is to extract these operations into a reducer.  

Again, this approach fits the main idea of hooks: extract the complex state management out of the components.  

Continuing the example with `ProductsList`, let's add a Delete operation to the list of products. Thus, now you have to code 2 operations: deleting a product name and adding a new product name.  

The handle these operations, it makes sense to use a reducer hook and keep the component out of the complex state management logic.  

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

Then it can be used inside the products list:

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

`const [names, dispatch] = useReducer(uniqueReducer, [])` enables the reducer `uniqueReducer` inside the component. `names` is the state variable that is an array of product names, and `dispatch` is a special function that accepts an action object.  

When *Add* button is clicked, the button handler invokes `dispatch({ type: 'add', name: newName })`. Dispatching an `add` action makes the reducer `uniqueReducer` add a new product name to the state.  

In the same way, when *Delete* button is clicked, the button handler invokes `dispatch({ type: 'delete', name })`. Dispatching a `remove` action removes the product name from the state of names.  

## 4. Conclusion

An atomic state is something that can't be further divided into smaller states. You should favor creating atomic states inside of your components because they are easy to manage.  

If the state has a complicated update logic, then it's better to extract this logic out of the component into a custom hook.  

In the same way, if the state requires multiple operations, then it's a good idea to use a reducer to incorporate these operations.  

No matter what rule you use, the state should be as simple and decoupled as possible. The component should not be cluttered with the details of how the state is updated: these should be a part of the custom hook or the reducer.  

Confirming to these 3 simple rules will make your state logic easy to understand, maintain, and test.  