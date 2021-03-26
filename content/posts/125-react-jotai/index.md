---
title: 'A Guide to Jotai: the Minimalist React State Management Library'
description: "Jotai is a primitive and flexible state management for React."
published: "2021-03-30T12:00Z"
modified: "2021-03-30T12:00Z"
thumbnail: "./images/cover-2.png"
slug: react-jotai-state-management
tags: ['react', 'state', 'open source']
recommended: ['react-usestate-hook-guide', 'react-useref-guide']
type: post
---

Redux had been for a long time the leader of the global state management in React. *Action -> reducer -> state* paradigm is pretty 
efficient in solving a lot of global state management tasks.  

But with the introduction of hooks, I have found that alternative libraries like [react-query](https://react-query.tanstack.com/) or [useSWR()](https://swr.vercel.app/) handle the fetching of data in much less ceremony than Redux.  

While `redux-query` or `useSWR()` greatly simplify the management of asynchornously fetched data &mdash; there still the simple global state that you have to manage.  

For such simple global state, like storing whether a side-menu is expanded or not, fits well a simple React state management library &mdash; thus welcome `jotai` https://github.com/pmndrs/jotai.  

## 1. Search query: a global state variable

Let's say that you code an application that has a search input in the header, and your task is to display the entered search query in the main part of the page.  

Here's the initial sketch of the application:

```jsx
function App() {
  return (
    <div>
      <Header />
      <Main />
    </div>
  );
}

function Header() {
  const [search, setSearch] = useState('');
  const handleChange = event => setSearch(event.target.value);
  return (
    <header>
      <input type="text" value={search} onChange={handleChange} />
    </header>
  );
}

function Main() {
  // How to access the search?
  return <main>???</main>;
}
```

`<App>` component wires 2 components: `<Header>` and `<Main>`.  

`<Header>` is a component that contains an input field: the one where the user introduces a search query.  

`<Main>` is the component the component that should render the query entered into the input field. How would you access the value here?  

Clearly the search query is a global state variable. And `jotai` library can help you here using a construction named *atom*.  

## 2. Jotai atoms

The piece of state in jotai is organized in an atom. An atom accepts an initial value, be it a primitive type like number, string, or objects like arrays and plain JavaScript objects.  

```javascript
// atoms.js
import { atom } from 'jotai';

const counterAtom = atom(0);
```

`counterAtom` is the atom that holds the counter state.

But the atom alone doesn't help much. To read and update the atom's state use a special hook `useAtom()`:

```jsx{5,15}
import { useAtom } from 'jotai';
import { counterAtom } from './atoms';

function MyComponent1() {
  const [count, setCount] = useAtom(counterAtom);

  const handleClick = () => {
    setNumber(number => number + 1); // Increment number
  };

  return <button onClick={handleClick}>Increment</button>;
}

function MyComponent2() {
  const [count] = useAtom(counterAtom);

  return <div>Current count: {counter}</div>;
}
```

`const [count, setCount] = useAtom(counterAtom)` returns a tuple where the first item is the value of the state, and the second is a state updater function.  

`count` variable is the atom's value, while `setCount()` can be used to update the atom's value. 

What makes the atoms so great is that you can access the same atom from multiple components. If a component updates the atom, then all the components that read this atom are going to be updated. This is the global state management!  

For example, if you click the button *Increment*, then both components `<MyComponent1>` and `<MyComponent2>` are going to re-render because of the `counterAtom` change.  

What's great about `useAtom(atom)` is that it keeps the same API as the built-in `useState()` hook &mdash; which also return a tuple of state value and updater function.  

### 2.1 Making the search query an atom

Now let's return to the problem of section 1: how to share the search query from the `<Header>` component in `<Main>` component.  

Most likely you already aknowledged the solution: let's create an atom `searchAtom` and share it between `<Header>` and `<Main>` components.  

```jsx{12,15,25-26}
import { atom, useAtom } from 'jotai';

function App() {
  return (
    <div>
      <Header />
      <Main />
    </div>
  );
}

const searchAtom = atom('');

function Header() {
  const [search, setSearch] = useAtom(searchAtom);
  const handleChange = event => setSearch(event.target.value);
  return (
    <header>
      <input type="text" value={search} onChange={handleChange} />
    </header>
  );
}

function Main() {
  const [search] = useAtom(searchAtom);
  return <main>{search}</main>;
}
```

`const searchAtom = atom('')` creates the atom that's going to hold the search global state variable.  

Inside of the `<Header>` component `const [search, setSearch] = useAtom(searchAtom)` the `useAtom()` hooks returns the current search value, as well as the updater function.  

As soon as the user types into the input field, `handleChange()` event handler updates the atom value: `setSearch(event.target.value)`.  



## 3. Jotai derived atoms

