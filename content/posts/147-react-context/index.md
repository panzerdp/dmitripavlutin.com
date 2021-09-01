---
title: "A Guide on React Context and useContext() Hook"
description: "The React context let's you set data to deeply nested components in a convinient way."
published: "2021-08-31T12:00Z"
modified: "2021-08-31T12:00Z"
thumbnail: "./images/cover-5.png"
slug: react-context-and-usecontext
tags: ['react', 'context', 'hook']
recommended: ['react-useref-guide', 'react-useeffect-explanation']
type: post
---

The context can help you to provide data to components no matter how deep they are in the components hierarchy.  

The context fits great for use cases requiring components to access some global data: like the theme, global state, global-wise services.  

In this post, you'll learn how to use the context concept in React.  

## 1. How to initialize and use the context

Using the context in React requires 3 simple steps: *creating* the context, *providing* the context, and *consuming* the context.  

#### A. Creating the context

You can create a context using the built-in React factory `createContext(initialValue)`:

```javascript{3}
import { createContext } from 'react';

export const Context = createContext('Initial Value');
```

#### B. Providing the context

Provide the context using the property `Context.Provider` of the context instance: that is a component that provides the context. 

Use the `value` prop available on the `<Context.Provider value={value} />` so set the value of the context:

```javascript{6}
import { Context } from './myContext';

function Main() {
  const value = 'My Value';
  return (
    <Context.Provider value={value}>
      <MyComponent />
    </Context.Provider>
  );
}
```

What's important here is that all the components that 'd like later to consume the context have to be wrapped inside the provider component.  

#### C. Consuming the context

Consuming the context inside of the child components, wrapped inside the provider, allows to access the context value at any time. 

Accessing the context value can be performed in 2 ways.  

First way, the one I recommend, is to use the `userContext(Context)` React hook:

```jsx{5}
import { useContext } from 'react';
import { Context } from './context';

function MyComponent() {
  const value = useContext(Context);

  return <span>{value}</span>;
}
```

Having the context as an argument, the hook return the value of the context: `value = useContext(Context)`.  

The second way is by using a render function supplied as a child to `Context.Consumer` special component:

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

You can have as many consumers as you want for a single context. The only requirement is that these consumer components have to be wrapped, at any level of nesting, inside the provider component.  

If the context value changes (by changing the `value` prop of the provider `<Context.Provider value={value} />`) all the consumers are immediately notified about that changes and re-rendered.

## 2. When do you need a context?

### 2.1 The props drilling problem

The simplest way to pass data from a parent to a child component is simply when the parent assigns props to its child component:

```jsx
function Application() {
  const userName = "John Smith";
  return <UserInfo name={userName} />;
}

function UserInfo({ userName }) {
  return <span>{userName}</span>;
}
```

```jsx
<Application /> 
// renders 
<span>John Smith</span>
```

The parent component `<Application />` assigns `userName` data to its child component `<UserInfo name={userName} />` using the `name` prop.  

That's pretty the standard way how data is assigned in React using props. You can use this approach without problems.  

But the situation changes when `<UserInfo />` child component isn't a direct child of `<Application />`, but is contained within multiple ancestors. 

For example, when `<UserInfo />` is rendered inside of `<Header />` component, which in turn is rendered inside of a `<Layout />` component.  

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

```jsx
<Application /> 
// renders to:
<div>
  <header><span>John Smith</span></header>
  <main>Main content</main>
</div>
```

You can probably see the problem: because `<UserInfo />` component is rendered deep down in the tree, all the parent components (`<Layout />` and `<Header />`) have to pass the `userName` prop.  

This problem is also called [props drilling](https://kentcdodds.com/blog/prop-drilling).  

React context is a possible solution to solve this kind of issues. Let's see in the next section how to apply it.  

### 2.2 Context to the rescue

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

```jsx
<Application /> 
// renders to:
<div>
  <header><span>John Smith</span></header>
  <main>Main content</main>
</div>

```

Let's look into more detail what was done.  

First, `const UserContext = createContext('Unknown')` creates the context that's going to hold the user name information.  

Second, inside the `<Application />` component, all the application content is wrapped inside the user context provider: `<UserContext.Provider value={userName}>`. Note that the
`value` prop of the provider component is important: this how you set the value of the context.  

Finally, `<UserInfo />` becomes the consumer of the context. It does so by using the built-in `useContext(UserContext)` hook being called with the context as an argument.  

Note that when changing the context value, then all of its consumers are being notified and re-rendered. 

## 3. Conclusion

The context in React is a concept that let's you supply child components with data, no matter how deep they are in the components tree.  

Using the context requires 3 actors: the context, the context provider and the context consumer.  

Since applying the context inside of your application increases the level of complexity, you should be careful when deciding about the use of the contex.t  