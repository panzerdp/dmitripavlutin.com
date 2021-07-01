---
title: 'A Simple Guide to Component Props in React'
description: "In this guide you'll find what are component's props in React and how to use them."
published: "2021-07-02T12:00Z"
modified: "2021-07-02T12:00Z"
thumbnail: "./images/cover.png"
slug: react-props
tags: ['react']
recommended: ['react-state-management', 'use-react-memo-wisely']
type: post
---

To start using React you don't have to learn a lot. Understand the concept of 
components, state, props, and hooks &mdash; and you basically know how to use React.  

In this post, you'll read a simple but pragmatic guide on how to use props on React components.  

## 1. The component props

A component in React is an encpasulated piece of logic. For example, here's a component that displays a `Hello, World!` message:

```jsx
function HelloWorld() {
  return <span>Hello, World!</span>;
}
```

```jsx
// Render
<HelloWorld />

// Output
<span>Hello, World!</span>
```

The problem with `<HelloWorld />` component is that it displays a static value: `Hello, World!`. You have no way of reusing this logic.  

But how to display a message for an arbitary person, not just `World`? You can use the concept of component *props*.  

Let's make the `<HelloWorld />` component more reusable, and add to it the prop `who`. Let's name the new component `<Message>`.  

There are 2 steps to add a prop to a component.  

*1) Make the function of your component read the props from the `props` parameter*:

```jsx{1}
function Hello(props) {
  return <div>Hello, {props.who}!</div>;
}
```

Now `Hello` function has a parameter `props`. When rendering this component, React will make sure to assign to `props` object all the props you assign to the component.  

*2) When rendering the component, add the prop to the compnent using the attribute syntax `who="Earth"`:*

```jsx
// Render
<Hello who="Earth" />

// Output
<div>Hello, Earth!</div>
```

### 1.1 Multiple props

What's great is that you can use any value you'd like. For example, let's greet the `Mars`!

```jsx
// Render
<Hello who="Mars" />

// Output
<div>Hello, Mars!</div>
```

Of course, you can use as many props as you like. Let's make the message component even more reusable by using a prop for the greeting and for the person.  

```jsx
function Message({ greet, who }) {
  return <div>{greet}, {who}!</div>;
}
```

```jsx
// Render
<Message greet="Welcome" who="Aliens" />

// Output
<div>Welcome, Aliens!</div>
```

### 1.2 Class component props

In case if you use class based components, then you can access the list of props from `this.props` property of the component instance.  

```jsx
import { Component } from 'react';

class HelloAsClass extends Component {
  render() {
    return <div>Hello, {this.props.who}!</div>;
  }
}
```

Setting the prop value for a class component is the same as for a functional one:

```jsx
// Render
<HelloAsClass who="Earth" />

// Output
<div>Hello, Earth!</div>
```

## 2. Values of props

In most of the previous example the values of props were strings. But often you'd like to set props to different primitive types like numbers, booleans, objects, arrays and even variables.  

All values, except double quoted string literals, have to be wrapped in curly braces `prop={value}`.  

Use the following guide to set different types of values.

1) String literals:

```jsx
<MyComponent prop="My String Value">
```

2) Template literals with variables:

```jsx
<MyComponent prop={`My String Value ${myVariable}`}>
```

3) Number literals:

```jsx
<MyComponent prop={42} />
```

4) Boolean literals:

```jsx
<MyComponent prop={false} />
```

5) Plain object literals:

```jsx
<MyComponent prop={{ property: 'Value' }} />
```

6) Array literals:

```jsx
<MyComponent prop={['Item 1', 'Item 2']} />
```

7) JSX:

```jsx
<MyComponent prop={<Message who="Joker" />} />
```

8) Variables having any kind of value:

```jsx
<MyComponent prop={myVariable} />
```

## 3. Passing down props

What's interesting is that inside the component you can use props as any regular JavaScript variable. You can render conditionally, or you can event pass down props to other components.  

For example, let's create a component `<HelloPeople />` that accepts a list of persons. This component is going to pass down each person to the `<Message>` component.  

```jsx
function HelloPeople({ persons }) {
  return (
    <div>
      {persons.map((person, index) => {
        return <Hello who={person} key={index} />
      })}
    </div>
  );
}
```

`<HelloPeople persons={persons} />` accepts a prop `persons`. Inside the component the list of persons is iterated and each person is mapped to a `<Message who={person} />`. This way, the props can be passed down to child components.  

```jsx
// Render
<HelloPeople persons={['Joker', 'Batman']} />

// Output
<div>
  <div>Hello, Joker!</div>
  <div>Hello, Batman!</div>
</div>
```

## 4. Optional props

There are situation when you have a good default value for a prop. In such a case, you can omit indicating the prop at all.  

However, make sure to indicate the default value when accessing the prop inside of the component.  

For example, let's make the `who` prop inside the `<HelloOptional />` component as optional, but default to `'Unknown'`.  

```jsx
function HelloOptional({ who = 'Unknown' }) {
  return <div>Hello, {who}!</div>;
}
```

Looking at the parameter destructuring `{ who = 'Unknown' }` you would notice that if `who` prop is not indicated, then it defaults
to `'Unknown'` value.  

When `who` prop isn't indicated, it defaults to `Unknown`:

```jsx
// Render
<HelloOptional />

// Output
<div>Hello, Unknown!</div>
```

However, if indicated, it is the actual value:

```jsx
// Render
<HelloOptional who="Batman" />

// Output
<div>Hello, Batman!</div>
```

## 5. Props spread syntax

If you dynamically construct the props of a component, you might have the props of the component inside of a plain JavaScript object.  

In such a case you might find useful the props spread syntax `<MyComponent {...propsAsObject} />`, which allows you to indicate an object having the props.  

For example, let's define the object `hiBatman` with the properties `greet` and `who`:

```javascript
const hiBatman = { greet: 'Hi', who: 'Batman' };

function Message({ greet, who }) {
  return <div>{greet}, {who}!</div>;
}
```

Then, instead of manually enumerating the props, simply use the spread syntax `<Message {...hiBatman} />`:

```jsx
// Render
<Message {...hiBatman} />

// Output
<div>Hi, Batman!</div>
```

The above spread syntax example is equivalent to the following:

```jsx
// Render
<Message greet={hiBatman.greet} who={hiBatman.who} />

// Output
<div>Hi, Batman!</div>
```

The property names inside of the spread object have to correspond to the prop names.  

## 6. Special props

While you are free to use any prop names you like, React, however, has some properties with a special use.  

### 6.1 *children*

`children` is a special property that is set by React with the content of the body of the component: the content between open tag `<MyComponent>` and closing tag `</MyComponent>`.

```jsx
function Parent({ children }) {
  return <div>{children}</div>;
}
```

```jsx
// Render
<Parent>
  <span>I'm a child!</span>
</Parent>

// Output
<div><span>I'm a child!</span></div>
```

### 6.2 *key*

If you recall the `<HelloPeople persons={persons} />` component:

```jsx
function HelloPeople({ persons }) {
  return (
    <div>
      {persons.map((person, index) => {
        return <Hello who={person} key={index} />;
      })}
    </div>
  );
}
```

`<Hello who={person} key={index} />` uses the special `key` prop. It allows React to perform updates on arrays of elements faster.  

## 7. Conclusion

Component props is a way you can write reusable pieces of UI logic. Props serve as an input for the component.  

Using props is pretty simple.  

First, make sure your component reads the prop from the props argument (or `this.props` in case of class components):

```jsx
function MyComponent({ prop }) {
  return <div>Prop value: {prop}</div>;
}
```

Then, when rendering the component in JSX make sure to set the prop value using an HTML-like attribute: `prop="My Value"`:

```jsx
// Render
<MyComponent prop="My Value" />

// Output
<div>Prop value: My Value</div>
```

