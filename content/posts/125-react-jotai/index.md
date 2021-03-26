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

```jsx{25}
function App() {
  return (
    <div>
      <Header />
      <Main />
    </div>
  );
}

function Header() {
  const [value, setValue] = useState('');

  const handleChange = event => setValue(event.target.value);

  return (
    <header>
      <input type="text" value={value} onChange={handleChange} />
    </header>
  );
}

function Main() {
  return (
    <main>
      {/* How to access the search query??? */}
    </main>
  )
}
```

`<App>` component wires 2 components: `<Header>` and `<Main>`.  

`<Header>` is a component that contains an input field: the one where the user introduces a search query.  

`<Main>` is the component the component that should render the query entered into the input field. How would you access the value here?  

Clearly the search query is a global state variable. And `jotai` library can help you here using a construction named *atom*.  

## 2. Jotai atoms

The piece of state in jotai is organized in an atom. An atom accepts an initial value, be it a primitive type like number, string, or objects like arrays and plain JavaScript objects.  

```javascript
import { atom } from 'jotai';

const numberAtom = atom(0);
const stringAtom = atom('My value');
const arrayAtom = atom(['item 1', 'item 2']);
```

The atom alone doesn't help much. 

## 3. Jotai derived atoms

