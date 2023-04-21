---
title: "A Guide to React Context and useContext() Hook"
description: "The React context provides data to components no matter how deep they are in the components hierarchy."
published: "2021-09-02T11:00Z"
modified: "2023-02-02"
thumbnail: "./images/cover.png"
slug: react-context-and-usecontext
tags: ['react', 'context', 'hook']
type: post
---

React context provides data to components no matter how deep they are in the components tree. The context is used to manage global data, e.g. global state, theme, services, user settings, and more.    

In this post, you'll learn how to use the context concept in React.  

<Affiliate type="traversyReact" />

<TableOfContents maxLevel={3} />

## 1. How to use the context

Using the context in React requires 3 simple steps: *creating* the context, *providing* the context, and *consuming* the context.  

### A. Creating the context

The built-in factory function `createContext(default)` creates a context instance:

```javascript
// context.js
import { createContext } from 'react';

export const Context = createContext('Default Value');
```

The factory function accepts one optional argument: the default value.   

### B. Providing the context

`Context.Provider` component available on the context instance is used to provide the context to its child components, no matter how deep they are.  

To set the value of context use the `value` prop available on the `<Context.Provider value={value} />`:

```javascript
import { Context } from './context';

function Main() {
  const value = 'My Context Value';
  return (
    <Context.Provider value={value}>
      <MyComponent />
    </Context.Provider>
  );
}
```

Again, what's important here is that all the components that'd like later to consume the context have to be wrapped inside the provider component. 

If you want to change the context value, simply update the `value` prop.  

### C. Consuming the context

Consuming the context can be performed in 2 ways.  

The first way, the one I recommend, is to use the `useContext(Context)` React hook:

```jsx
import { useContext } from 'react';
import { Context } from './context';

function MyComponent() {
  const value = useContext(Context);

  return <span>{value}</span>;
}
```

[Open the demo.](https://codesandbox.io/s/react-context-usecontext-pi5uv?file=/src/Main.js)

The hook returns the value of the context: `value = useContext(Context)`. The hook also makes sure to re-render the component when the context value changes.    

The second way is by using a render function supplied as a child to `Context.Consumer` special component available on the context instance:

```jsx
import { Context } from './context';

function MyComponent() {
  return (
    <Context.Consumer>
      {value => <span>{value}</span>}
    </Context.Consumer>
  );
}
```

[Open the demo.](https://codesandbox.io/s/react-context-consumer-f413s?file=/src/Main.js)

Again, in case the context value changes, `<Context.Consumer>` will re-call its render function.  

![React context](./images/react-context-3.svg)

You can have as many consumers as you want for a single context. If the context value changes (by changing the `value` prop of the provider `<Context.Provider value={value} />`), then all consumers are immediately notified and re-rendered.  

If the consumer isn't wrapped inside the provider, but still tries to access the context value (using `useContext(Context)` or `<Context.Consumer>`), then the value of the context would be the default value argument supplied to `createContext(defaultValue)` factory function that had created the context.  

## 2. When do you need context?

The main idea of using the context is to allow your components to access global data and re-render when that global data is changed. Context solves the [props drilling problem](https://kentcdodds.com/blog/prop-drilling): when you have to pass down props from parents to children.   

You can hold inside the context:

* global state
* theme
* application configuration
* authenticated user name 
* user settings
* preferred language 
* a collection of services 

On the other side, you should think carefully before deciding to use context in your application.  

First, integrating the context adds complexity. Creating a context, wrapping everything in a provider, and using the `useContext()` in every consumer &mdash; increases complexity.  

Secondly, adding context complicates unit testing of components. During testing, you'll have to wrap the consumer components into a context provider. Including the components that are indirectly affected by the context &mdash; the ancestors of context consumers!  

## 3. Use case: global user name

The simplest way to pass data from a parent to a child component is when the parent assigns props to its child component:

```jsx
function Application() {
  const userName = "John Smith";
  return <UserInfo userName={userName} />;
}

function UserInfo({ userName }) {
  return <span>{userName}</span>;
}
```

The parent component `<Application />` assigns `userName` data to its child component `<UserInfo name={userName} />` using the `userName` prop.  

That's the usual way how data is passed using props. You can use this approach without problems.  

The situation changes when `<UserInfo />` component isn't a direct child of `<Application />`, but is buried somewhere deeper.  

For example, let's say that `<Application />` component (the one having the global data `userName`) renders `<Layout />` component, which in turn renders `<Header />` component, which in turn finally renders `<UserInfo />` component (that'd like to access `userName`).  

Here's how such a structuring would look:

```jsx
function Application() {
  const userName = "John Smith";
  return (
    <Layout userName={userName}>
      Main content
    </Layout>
  );
}

function Layout({ children, userName }) {
  return (
    <div>
      <Header userName={userName} />
      <main>
        {children}
      </main>
    </div>
  )
}

function Header({ userName }) {
  return (
    <header>
      <UserInfo userName={userName} />
    </header>
  );
}

function UserInfo({ userName }) {
  return <span>{userName}</span>;
}
```

[Open the demo.](https://codesandbox.io/s/props-drilling-xhrfd?file=/src/Application.js)

You can see the problem: because `<UserInfo />` component renders deep down in the tree, all the parent components (`<Layout />` and `<Header />`) have to pass the `userName` prop.  

This problem is also known as [props drilling](https://kentcdodds.com/blog/prop-drilling).  

React context is a possible solution. Let's see how to apply it in the next section.  

### 3.1 Context to the rescue

As a quick reminder, applying the React context requires 3 actors: the context, the provider extracted from the context, and the consumer.  

Here's how the sample application would look when applying the context to it:

```jsx
import { useContext, createContext } from 'react';

const UserContext = createContext('Unknown');

function Application() {
  const userName = "John Smith";
  return (
    <UserContext.Provider value={userName}>
      <Layout>
        Main content
      </Layout>
    </UserContext.Provider>
  );
}

function Layout({ children }) {
  return (
    <div>
      <Header />
      <main>
        {children}
      </main>
    </div>
  );
}

function Header() {
  return (
    <header>
      <UserInfo />
    </header>
  );
}

function UserInfo() {
  const userName = useContext(UserContext);
  return <span>{userName}</span>;
}
```

[Open the demo.](https://codesandbox.io/s/react-context-example-gzovv?file=/src/Application.js)

Let's look into more detail at what has been done.  

First, `const UserContext = createContext('Unknown')` creates the context that's going to hold the user name information.  

Second, inside the `<Application />` component, the application's child components are wrapped inside the user context provider: `<UserContext.Provider value={userName}>`. Note that the
`value` prop of the provider component is important: this is how you set the value of the context.  

Finally, `<UserInfo />` becomes the consumer of the context by using the built-in `useContext(UserContext)` hook. The hook is called with the context as an argument and returns the user name value.  

`<Layout />` and `<Header />` intermediate components don't have to pass down the `userName` prop.  That is the great benefit of the context: it removes the burden of passing down data through the intermediate components.  

### 3.2 When context changes

When the context value is changed by altering `value` prop of the context provider (`<Context.Provider value={value} />`), then all of its consumers are notified and re-rendered.  

For example, if I change the user name from `'John Smith'` to `'Smith, John Smith'`, then `<UserInfo />` consumer immediately re-renders to display the latest context value:

```jsx
import { createContext, useEffect, useState } from 'react';

const UserContext = createContext('Unknown');

function Application() {
  const [userName, setUserName] = useState('John Smith');
  useEffect(() => {
    setTimeout(() => {
      setUserName('Smith, John Smith');
    }, 2000);
  }, []);

  return (
    <UserContext.Provider value={userName}>
      <Layout>
        Main content
      </Layout>
    </UserContext.Provider>
  );
}

// ...
```

[Open the demo.](https://codesandbox.io/s/react-context-example-change-hw32y?file=/src/Application.js)

Open the [demo](https://codesandbox.io/s/react-context-example-change-hw32y?file=/src/Application.js) and you'll see `'John Smith'` (context value) displayed on the screen. After 2 seconds, the context value changes to `'Smith, John Smith'`, and correspondingly the screen is updated with the new value.  

The demo shows that `<UserInfo />` component, the consumer that renders the context value on the screen, re-renders when the context value changes.  

```jsx
function UserInfo() {
  const userName = useContext(UserContext);
  return <span>{userName}</span>;
}
```

## 4. Updating the context

The React Context API is stateless by default and doesn't provide a dedicated method to update the context value from consumer components. 

But this can be easily implemented by integrating a state management mechanism (like `useState()` or `useReducer()` hooks), and providing an update function right in the context next to the value itself.

In the following example, `<Application />` component uses `useState()` hook to manage the context value. 

```jsx
import { createContext, useState, useContext, useMemo } from 'react';

const UserContext = createContext({
  userName: '',
  setUserName: () => {},
});

function Application() {
  const [userName, setUserName] = useState('John Smith');
  const value = useMemo(
    () => ({ userName, setUserName }), 
    [userName]
  );
  
  return (
    <UserContext.Provider value={value}>
      {useMemo(() => (
        <>
          <UserNameInput />
          <UserInfo />
        </>
      ), [])}
    </UserContext.Provider>
  );
}

function UserNameInput() {
  const { userName, setUserName } = useContext(UserContext);
  const changeHandler = event => setUserName(event.target.value);

  return (
    <input
      type="text"
      value={userName}
      onChange={changeHandler}
    />
  );
}

function UserInfo() {
  const { userName } = useContext(UserContext);
  return <span>{userName}</span>;
}
```

[Open the demo.](https://codesandbox.io/s/update-context-value-l39t0?file=/src/App.js)

`<UserNameInput />` consumer reads the context value, from where `userName` and `setUserName` are extracted. The consumer then can update the context value by invoking the update function `setUserName(newContextValue)`.  

`<UserInfo />` is another consumer of the context. When `<UserNameInput />` updates the context, this component is updated too.  

Note that `<Application />` memoizes the context value. Memoization keeps the context value object unchanged as long as `userName` remains the same, preventing re-rendering of consumers every time the `<Application />` re-renders.  

Otherwise, without memoization, `const value = { userName, setUserName }` would create different object instances during re-rendering of `<Application />`, triggering re-rendering in context consumers. See more about [referential equality of objects](/how-to-compare-objects-in-javascript/#1-referential-equality).

## 5. Conclusion

The context in React lets you supply child components with global data, no matter how deep they are in the components tree.  

Using the context requires 3 steps: creating, providing, and consuming the context.  

When integrating the context into your application, consider that it adds a good amount of complexity. Sometimes drilling the props through 2-3 levels in the hierarchy isn't a big problem.  

*What use cases of React context do you know?*
