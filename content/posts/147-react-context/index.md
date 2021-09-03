---
title: "A Guide to React Context and useContext() Hook"
description: "The React context provides data to components no matter how deep they are in the components hierarchy."
published: "2021-09-02T11:00Z"
modified: "2021-08-02T11:00Z"
thumbnail: "./images/cover-6.png"
slug: react-context-and-usecontext
tags: ['react', 'context', 'hook']
recommended: ['react-useref-guide', 'react-useeffect-explanation']
type: post
---

The context can help you provide data to components no matter how deep they are in the components tree. It is used to access global data like global state, theme, services.  

In this post, you'll learn how to use the context concept in React.  

```toc
toHeading: 3
```

## 1. How to use the context

Using the context in React requires 3 simple steps: *creating* the context, *providing* the context, and *consuming* the context.  

#### A. Creating the context

The built-in factory function `createContext(default)` creates a context instance:

```javascript{3}
import { createContext } from 'react';

const Context = createContext('Default Value');
```

The factory function accepts one optional argument: the default value.   

#### B. Providing the context

`Context.Provider` component available on the context instance is used to provide the context to its child components, no matter how deep they are.  

To set the value of context use the `value` prop available on the `<Context.Provider value={value} />`:

```javascript{4}
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

#### C. Consuming the context

Consuming the context can be performed in 2 ways.  

The first way, the one I recommend, is to use the `useContext(Context)` React hook:

```jsx{4}
import { useContext } from 'react';

function MyComponent() {
  const value = useContext(Context);

  return <span>{value}</span>;
}
```

[Try the demo.](https://codesandbox.io/s/react-context-usecontext-pi5uv?file=/src/Main.js)

The hook returns the value of the context: `value = useContext(Context)`.   

The second way is by using a render function supplied as a child to `Context.Consumer` special component:

```jsx
function MyComponent() {
  return (
    <Context.Consumer>
      {value => <span>{value}</span>}
    </Context.Consumer>
  );
}
```

[Try the demo.](https://codesandbox.io/s/react-context-consumer-f413s?file=/src/Main.js)

You can have as many consumers as you want for a single context. The only requirement is that the consumer components have to be wrapped inside the provider component.  

If the context value changes (by changing the `value` prop of the provider `<Context.Provider value={value} />`), then all consumers are immediately notified and re-rendered.  

If the consumer isn't wrapped inside the provider, but still tries to access the context value (using `useContext()` or `<Context.Consumer>`), then the value of the context would be the default value `defaultValue` supplied to `createContext(defaultValue)` factory function that had created the context.  

## 2. When do you need context?

The main idea of using the context is to allow your components to access some global data and re-render when that global data is changed.  

You can hold inside the context:

* global state
* theme
* application configuration
* authenticated user name 
* user settings
* preferred language 
* a collection of services 

that consumer components should use at any nesting level. Context solves primarily the props drilling problem: when you have to pass down props from parents to children.  

On the other side, you should think carefully before deciding to use context in your application.  

First, adding context introduces complexity to the application. Creating the context, wrapping everything in the context provider, using the `useContext()` &mdash; this increases complexity.  

Secondly, adding context makes it more difficult to unit test the components. During unit testing, you would have to wrap the consumer component into a context provider. Including the components that are indirectly affected by the context &mdash; the ancestors of context consumers!  

## 3. Use case: global user name

The simplest way to pass data from a parent to a child component is when the parent assigns props to its child component:

```jsx
function Application() {
  const userName = "John Smith";
  return <UserInfo name={userName} />;
}

function UserInfo({ userName }) {
  return <span>{userName}</span>;
}
```

The parent component `<Application />` assigns `userName` data to its child component `<UserInfo name={userName} />` using the `name` prop.  

That's the usual way how data is passed using props. You can use this approach without problems.  

The situation changes when `<UserInfo />` child component isn't a direct child of `<Application />` but is contained within multiple ancestors. 

For example, let's say that `<UserInfo />` renders inside of `<Header />` component, which in turn renders inside of a `<Layout />` component.  

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

[Try the demo.](https://codesandbox.io/s/props-drilling-xhrfd?file=/src/Application.js)

You can probably see the problem: because `<UserInfo />` component renders deep down in the tree, all the parent components (`<Layout />` and `<Header />`) have to pass the `userName` prop.  

This problem is also known as [props drilling](https://kentcdodds.com/blog/prop-drilling).  

React context is a possible solution. Let's see in the next section how to apply it.  

### 3.1 Context to the rescue

As a quick reminder, applying the React context requires 3 actors: the context, the provider extracted from the context, and the consumer.  

Here's how the sample application would look when applying the context to it:

```jsx{3,8,36}
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

[Try the demo.](https://codesandbox.io/s/react-context-example-gzovv?file=/src/Application.js)

Let's look into more detail what has been done.  

First, `const UserContext = createContext('Unknown')` creates the context that's going to hold the user name information.  

Second, inside the `<Application />` component, the application's child components are wrapped inside the user context provider: `<UserContext.Provider value={userName}>`. Note that the
`value` prop of the provider component is important: this is how you set the value of the context.  

Finally, `<UserInfo />` becomes the consumer of the context. It does so by using the built-in `useContext(UserContext)` hook, which is called with the context as an argument and returns the user name value.  

`<Layout />` and `<Header />` intermediate components don't have to pass down the `userName` prop.  That is the great benefit of the context: it removes the burden of passing down data from the intermediate components.  

### 3.2 Updating the context value

When changing the context value then all of its consumers are being notified and re-rendered.  

For example, if I change the user name from `'John Smith'` to `'Smith, John Smith'`, then `<UserInfo />` consumer immediately re-renders to display the latest context value:

```jsx{8-10}
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

[Try the demo.](https://codesandbox.io/s/react-context-example-change-hw32y?file=/src/Application.js)

Open the [demo](https://codesandbox.io/s/react-context-example-change-hw32y?file=/src/Application.js) and you'd see `'John Smith'` (context value) displayed on the screen. After 2 seconds the context value changes to `'Smith, John Smith'`, and correspondingly the screen is updated with the new value.  

It demonstrates that `<UserInfo />` component, the consumer that renders the context value on the screen, re-renders when the context value changes.  

```jsx
function UserInfo() {
  const userName = useContext(UserContext);
  return <span>{userName}</span>;
}
```

## 4. Conclusion

The context in React is a concept that lets you supply child components with data, no matter how deep they are in the components tree.  

Using the context requires 3 steps: creating, providing, and consuming the context.  

When introducing the context into your application, consider that it adds a good amount of complexity. Sometimes drilling the props through 2-3 levels in the hierarchy isn't a big problem.  

*What use cases of React context do you know?*
