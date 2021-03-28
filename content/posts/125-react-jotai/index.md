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

While `redux-query` or `useSWR()` greatly simplifies the management of asynchronously fetched data &mdash; sometimes there are left the simple global state.  

For such a simple global state, like storing whether a side-menu is expanded or not, fits well a simple React state management library &mdash; welcome `jotai` https://github.com/pmndrs/jotai.  

```toc
```

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
  return <main>Search query: ???</main>;
}
```

[Try the demo.](https://codesandbox.io/s/search-query-no-global-state-ppr2c?file=/src/App.js)

`<App>` component wires 2 components: `<Header>` and `<Main>`.  

`<Header>` is a component that contains an input field: the one where the user introduces a search query.  

`<Main>` is the component that should render the query entered into the input field. How would you access the value here?  

The search query is a global state variable. And `jotai` library can help you here using a construction named *atom*.  

## 2. Jotai atoms

The piece of state in jotai is organized in an atom. An atom accepts an initial value, be it a primitive type like a number, string, or more complex structures like arrays and objects.  

```javascript
import { atom } from 'jotai';

const counterAtom = atom(0);
```

`counterAtom` is the atom that holds the counter state.

But the atom alone doesn't help much. To read and update the atom's state use a special hook `useAtom()`:

```jsx{3,6}
import { atom, useAtom } from 'jotai';

export const counterAtom = atom(0);

export function Button() {
  const [count, setCount] = useAtom(counterAtom);

  const handleClick = () => {
    setNumber(number => number + 1); // Increment number
  };

  return <button onClick={handleClick}>Increment</button>;
}
```

`const [count, setCount] = useAtom(counterAtom)` returns a tuple where the first item is the value of the state, and the second is a state updater function.  

`count` contains the atom's value, while `setCount()` can be used to update the atom's value. 

What makes the atoms so great is that you can access the same atom from multiple components. If a component updates the atom, then all the components that read this atom are going to be updated. This is the global state management!  

```jsx{5}
import { useAtom } from 'jotai';
import { counterAtom } from './Button';

function CurrentCount() {
  const [count] = useAtom(counterAtom);

  return <div>Current count: {counter}</div>;
}
```

For example, if you click the button *Increment*, then both components `<Button>` and `<CurrentCount>` are going to re-render because of the `counterAtom` change.  

What's great about `useAtom(atom)` is that it keeps the same API as the built-in `useState()` hook &mdash; which also returns a tuple of state value and updater function.  

### 2.1 Storing the search query in an atom

Now let's return to the problem of section 1: how to share the search query from the `<Header>` component in `<Main>` component.  

Most likely you already know the solution: let's create an atom `searchAtom` and share it between `<Header>` and `<Main>` components.  

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
  return <main>Search query: {search}</main>;
}
```

`const searchAtom = atom('')` creates the atom that's going to hold the search query global state variable.  

Inside of the `<Header>` component `const [search, setSearch] = useAtom(searchAtom)` returns the current search value, as well as the updater function.  

As soon as the user types into the input field, `handleChange()` event handler updates the atom value: `setSearch(event.target.value)`.  

`<Main>` component can also access the `searchAtom` value: `const [search] = useAtom(searchAtom)`. And when the atom's value changes when user types into the input, the `<Main>` component is updated to received the new value.  

In conclusion, atoms are global state pieces that can be accessed and modified by any component.  

## 3. Jotai derived atoms

If you find yourself calculating data from an atom's value, then you may find useful the *derived atoms* feature of `jotai`.  

You can create a derived atom when supplying a callback function to `atom(get => get(myAtom))`: in which case `jotai` invokes the callback with a getter function `get` from where you can extract the value of the base atom `get(myAtom)`.  

```javascript{4}
import { atom } from 'jotai';

const baseAtom = atom(2);
const derivedAtom = atom(get => get(baseAtom) % 2 === 0); 
```

In the example above `baseAtom` is an atom holding a number. But `derivedAtom` is a derived atom that simply determines whether the number stored in `baseAtom` is even.  

Of course, as soon as the base atom changes, all the derived atoms change: triggering a re-render in components that use them.  

For example, let's create `nameLengthAtom` derived atom that calculates the length of the string stored in a base atom `nameAtom`:

```jsx{4,8,15}
import { atom } from 'jotai';

const nameAtom = atom('Batman');
const isNameEmptyAtom = atom(get => get(nameAtom).length === 0);

function HeroName() {
  const [name, setName] = useAtom(nameAtom);
  const [isNameEmpty] = useAtom(isNameEmptyAtom);

  const handleChange = event => setSearch(event.target.value);

  return (
    <div>
      <input type="text" value={name} onChange={handleChange} />
      <div>Is name empty: {isNameEmpty ? 'Yes' : 'No'}</div>
    </div>
  );
}
```

What's even better is that you can create a derived atom from multiple base atoms!

```javascript
import { atom } from 'jotai';

const counterAtom1 = atom(0);
const counterAtom2 = atom(0);

const sumAtom = atom((get) => get(counterAtom1) + get(counterAtom2));
```

`sumAtom` is derived from 2 base atoms: `counterAtom1` and `counterAtom2`.  

## 4. Conclusion

I like `jotai` for its minimalistic but flexible way to manage a simple global state.  

To create a global state variable using jotai you need to make 2 simple steps:  

A) Define the atom for your global state variable: 

```javascript
const myAtom = atom(<initialValue>);
```

B) Then access the atom' value and updater function inside of the component using a special hook:

```jsx
function MyComponent() {
  const [value, setValue] = useAtom(myAtom);
  // ...
}
```

I found that `jotai` fits well for the management of simple global variables, as a complement to asynchronous state management libraries like `react-query` and `useSWR()`.    

*Would you use `jotai` to manage simple global state variables? What features, in your opinion, `jotai` is still missing?*