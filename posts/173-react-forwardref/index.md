---
title: "React forwardRef(): How to Pass Refs to Child Components"
description: "React forwardRef() is a tool for passing refs to child components. Discover how to use it with ease in this comprehensive tutorial."
published: "2023-04-06"
modified: "2023-04-06"
thumbnail: "./images/cover.jpg"
slug: react-forwardref
tags: ['react', 'ref']
type: post
---

To access a DOM element rendered in the component's body you can use [use](/react-useref/#2-accessing-dom-elements) a ref, which is created by `useRef()` hook.  

But what if you need to access a DOM element of a child component? Then a simple ref is not enough and you have to combine refs with `React.forwardRef()`: a technique called *refs forwarding*.  

Moreover, `useImperativeHandle()` is a hook that increases the capabilities of `forwardRef()` by giving the parent component access to more goodies like multiple refs or imperative methods of a child component. 

Let's see how it works.  

<Affiliate type="traversyReact" />

<TableOfContents maxLevel={1} />

## 1. Refs in child components

There are situations when you have to work with the DOM because the existing React abstractions do not cover all possible use cases:

* call methods on DOM elements to manage focus, scroll, and text selection
* integrate 3rd party scripts that are unaware of React abstractions
* working with animation libraries, for example [GSAP](https://greensock.com/react-basics#refs)

Let's quickly recall how to access a DOM element directly from the body of the component. Consider the following example where the goal is to access the instance of the single `<div>` element rendered by the component:

```jsx
import { useRef, useEffect } from 'react'

export function Main() {
  const elementRef = useRef() // create the ref

  useEffect(() => {
    // after mounting
    console.log(elementRef.current) // logs HTMLDivElement
  }, [])

  return <div ref={elementRef}>Hello, World!</div> // assign the ref
}
```

[Open the demo.](https://codesandbox.io/s/competent-grass-89so21?file=/src/Main.jsx)

`const elementRef = useRef()` creates a ref. `elementRef` will contain after mounting the DOM element instance. You don't have to initialize the ref with any initial value.  

Then `elementRef` have to be assigned to the `ref` attribute of the tag which element you want to access: `<div ref="elementRef">`.  

Finally, after component mounting, `elementRef.current` contains the DOM element instance. The moment right after mounting is captured using `useEffect()` hook using an empty array as a dependency.  

Open the [demo](https://codesandbox.io/s/competent-grass-89so21?file=/src/Main.jsx) and you'll see the element logged to the console. 

Ok, then what is the limitation of this approach? A problem appears when the element is not rendered directly in the body of the component, but is rather rendered in a child component. The simple approach of using a ref does not work in this case. Let me show you why.  

Let's modify the previous example by extracting the `<div>Hello, World!</div>` into a child component `<HelloWorld>`. Also, let's create a prop `ref` to allow the parent `<Main>` to access the div element:

```jsx
import { useRef, useEffect } from 'react'

export function Main() {
  const elementRef = useRef()

  useEffect(() => {
    // Does not work!
    console.log(elementRef.current) // logs null
  }, [])

  return <HelloWorld ref={elementRef} /> // assign the ref
}

function HelloWorld({ ref }) { // a new component
  return <div ref={ref}>Hello, World!</div>
}
```
[Open the demo.](https://codesandbox.io/s/react-ref-dom-child-zztlg5?file=/src/Main.jsx)

Is this code working? Open the [demo](https://codesandbox.io/s/react-ref-dom-child-zztlg5?file=/src/Main.jsx) and you'll see that after mounting `elementRef.current` contains `undefined`. `<Main>` wasn't able to access the DOM element from the child component. 

React also throws a useful warning: `Warning: Function components cannot be given refs. Attempts to access this ref will fail. Did you mean to use React.forwardRef()?`

Let's follow React's warning advice and see how `forwardRef()` can help.  

## 2. Introducing forwardRef()

Now is the right moment to introduce `forwardRef()`: a function that wraps a component making it accept a ref as a prop.  

```javascript
import { forwardRef } from 'react'

const Component = forwardRef(function(props, ref) {
  return <div ref={ref} />
})
```

`forwardRef()` is a [higher-order function](/javascript-higher-order-functions/) that wraps a React component. The wrapped component works the same as the original component but also receives as the second parameter the `ref`. 

The `ref` parameter then has to be assigned, as usual, to the ref attribute of the tag `<div ref={ref}>`.  

Let's use `forwardRef()` and `<HelloWorld>` component into it:

```jsx {13-15}
import { useRef, useEffect, forwardRef } from 'react'

export function Main() {
  const elementRef = useRef()

  useEffect(() => {
    // Works!
    console.log(elementRef.current) // logs HTMLDivElement
  }, [])

  return <HelloWorld ref={elementRef} /> // assign the ref
}

const HelloWorld = forwardRef(function(props, ref) {
  return <div ref={ref}>Hello, World!</div>
})
```

[Open the demo.](https://codesandbox.io/s/react-ref-dom-forwardref-kyuklk?file=/src/Main.jsx)

`HelloWorld` component is wrapped into `forwardRef()`. Doing so allow the component to access the ref from the second parameter.  

Open the [demo](https://codesandbox.io/s/react-ref-dom-forwardref-kyuklk?file=/src/Main.jsx) and you'll see that after mounting `elementRef.current` *contains* the DOM element from `<HelloWorld>` component. It works!

## 3. Stay declarative as much as possible

Before ending the post, I advise you to keep the refs' usage at a minimum. Here's the main reason why.    

React is the library which goal is to abstract you from manipulating DOM, cross-browser compatibility, and DOM manipulation performance. React gives you wonderful components, props, state, and hooks abstractions to save you from dealing with DOM and browser-specific details.  

When deciding to use refs to access DOM, including with the help of `forwardRef()` and `useImperativeHandle()`, consider at first using a React abstraction to achieve your goal. React abstractions are declarative and easier to deal with.  

The code that uses many refs with DOM elements in the [long run is more difficult to maintain](https://blog.logrocket.com/why-you-should-use-refs-sparingly-in-production/).  

## 4. Conclusion

Accessing a DOM element instance is relatively easy when the element is rendered directly in the body of the component. Just assign the ref to the tag: `<div ref={elementRef} />`.  

Things become trickier when the element you need access to is rendered inside of a child component. In this case, you have to wrap the child component into the built-in React function `forwardRef()`:

```jsx
import { forwardRef } from 'react'

function Parent() {
  const elementRef = useRef()

  return <Child ref={elementRef} />
}

const Child = forwardRef(function(props, ref) {
  return <div ref={ref}>...</div>
})
```

`Parent` component safely assigns `elementRef` to the child component `<Child ref={elementRef} />`. After mounting, `elementRef` contains the DOM element instance from within the child component.  

*What questions do you have about `forwardRef()`?*