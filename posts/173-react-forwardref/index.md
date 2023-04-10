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

To access a DOM element rendered in the component's body you can use [use](/react-useref/#2-accessing-dom-elements) a ref created by `useRef()` hook.  

But what if you need to access a DOM element of a child component? Then a simple ref is not enough and you have to combine refs with `React.forwardRef()`: a technique called *refs forwarding*.  

Moreover, `useImperativeHandle()` is a hook that increases the capabilities of `forwardRef()` by giving the parent component access to more goodies like multiple refs or imperative methods of a child component. 

Let's see how it works.  

<Affiliate type="traversyReact" />

<TableOfContents maxLevel={2} />

## 1. Refs in child components

There are situations when you have to work with the DOM because the existing React abstractions (components, state, props, hooks, context) do not cover all possible use cases:

* call methods on DOM elements to manage focus, scroll, and text selection
* integrate 3rd party scripts that are unaware of React abstractions
* working with animation libraries, for example [GSAP](https://greensock.com/react-basics#refs)

Let's recall how to access a DOM element directly from the body of the component:

```jsx
import { useRef, useEffect } from 'react'

export function Parent() {
  const elementRef = useRef() // create the ref

  useEffect(() => {
    // after mounting
    console.log(elementRef.current) // logs <div>Hello, World!</div>
  }, [])

  return <div ref={elementRef}>Hello, World!</div> // assign the ref
}
```

[Open the demo.](https://codesandbox.io/s/competent-grass-89so21?file=/src/Parent.jsx)

`const elementRef = useRef()` creates a [ref](/react-useref/). Then `elementRef` is assigned to the `ref` attribute of the tag which element you want to access: `<div ref="elementRef">`.  

`elementRef` after mounting will contain the DOM element instance. When the component is mounted is [detected](/react-useeffect-explanation/#31-component-did-mount) using `useEffect()` hook with an empty array as a dependency.  

Open the [demo](https://codesandbox.io/s/competent-grass-89so21?file=/src/Parent.jsx) and you'll see the element logged to the console. 

Ok, then what is the limitation of this approach? A problem appears when the element is not rendered directly in the body of the component, but rather in a child component. The described approach of using a ref does not work in this case. Let me show you why.  

Let's modify the previous example by extracting the `<div>Hello, World!</div>` into a child component `<Child>`. Also, let's create a prop `ref` on `<Child>`, to which `<Parent>` assigns `elementRef`:

```jsx
import { useRef, useEffect } from 'react'

export function Parent() {
  const elementRef = useRef()

  useEffect(() => {
    // Does not work!
    console.log(elementRef.current) // logs undefined
  }, [])

  return <Child ref={elementRef} /> // assign the ref
}

function Child({ ref }) { // a new component
  return <div ref={ref}>Hello, World!</div>
}
```
[Open the demo.](https://codesandbox.io/s/react-ref-dom-child-zztlg5?file=/src/Parent.jsx)

Is this code working? Open the [demo](https://codesandbox.io/s/react-ref-dom-child-zztlg5?file=/src/Parent.jsx) and you'll see that after mounting `elementRef.current` contains `undefined`. `<Parent>` wasn't able to access the DOM element from the child component. 

![React ref as prop does not work](./diagrams/ref-prop.svg)

React also throws a useful warning: `Warning: Function components cannot be given refs. Attempts to access this ref will fail. Did you mean to use React.forwardRef()?`

Let's follow React's advice and see how `forwardRef()` can help.  

## 2. forwardRef()

Now is the right moment to introduce `forwardRef()`.  

`forwardRef()` is a [higher-order component](https://dev.to/nibble/higher-order-components-in-react-4c7h) that wraps a React component. The wrapped component works same way as the original component but also receives as *the second parameter a `ref`: the forwarded ref from the parent component*.  

Assigning the forwarded `ref` in the wrapped component to a tag `<div ref={ref} />` connects the DOM element to `parentRef` in the parent component.  

![React forwardRef()](./diagrams/forwardref.svg)

Let's wrap `<Child>` component into  `forwardRef()` with the goal to connect `<Parent>`'s `elementRef` with `<div>Hello, World!</div>`:

```jsx
import { useRef, useEffect, forwardRef } from 'react'

export function Parent() {
  const elementRef = useRef()

  useEffect(() => {
    // Works!
    console.log(elementRef.current) // logs <div>Hello, World!</div>
  }, [])

  return <Child ref={elementRef} /> // assign the ref
}

const Child = forwardRef(function(props, ref) {
  return <div ref={ref}>Hello, World!</div>
})
```

[Open the demo.](https://codesandbox.io/s/react-ref-dom-forwardref-kyuklk?file=/src/Parent.jsx)

The parent component assigns `elementRef` as an attribute on the child component ` <Child ref={elementRef} />`. Then, thanks to being wrapped into `forwardRef()`, `<Child>` component reads that ref from the second parameter and uses it on its element `<div ref={ref}>`.  

After mounting `elementRef.current` in the parent component `<Parent>` *contains* the DOM element from `<Child>` component. Open the [demo](https://codesandbox.io/s/react-ref-dom-forwardref-kyuklk?file=/src/Parent.jsx): it works!

## 3. useImperativeHandle()

What if you want to access something else from the child component? For example, a simple function to focus the input.  

That's when [useImperativeHandle()](https://react.dev/reference/react/useImperativeHandle) hook can help you.  

```jsx
import { forwardRef, useImperativeHandle } from 'react'

const MyComponent = forwardRef(function(props, ref) {
  useImperativeHandle(ref, function getRefValue() {
    return {
      // new ref value...
      method1() { },
      method2() { }
    }
  }, []) // dependencies

  return <div>...</div>
}
```

`useImperativeHandle(ref, getRefValue, deps)` accepts 3 arguments: the forwarded `ref`, the function returning the ref value, and the dependencies array.  

The value returned by `getRefValue()` function becomes the value of the forwarded ref. That's the main benefit of `useImperativeHandle()`: you can customize forwarded ref value with anything you want.  

![React forwardRef() and useImperactiveHandle()](./diagrams/useimperativehandle.svg)

For example, let's use the hook and give the parent an object with methods `focus()` and `blur()`:

```jsx
import { useRef, forwardRef, useImperativeHandle } from 'react'

export function Main() {
  const methodsRef = useRef()

  const focus = () => methodsRef.current.focus()
  const blur = () => methodsRef.current.blur()

  return (
    <>
      <FocusableInput ref={methodsRef} />
      <button onClick={focus}>Focus input</button>
      <button onClick={blur}>Blur input</button>
    </>
  )
}

const FocusableInput = forwardRef(function (props, ref) {
  const inputRef = useRef()

  useImperativeHandle(
    ref,
    function () {
      return {
        focus() { inputRef.current.focus() },
        blur() { inputRef.current.blur() }
      };
    }, [])

  return <input type="text" ref={inputRef} />
})
```
[Open the demo.](https://codesandbox.io/s/react-useimperativehandle-no2tli?file=/src/Main.jsx)

`useImperativeHandle(ref, ..., [])` gives the parent an object with `focus()` and `blur()` methods.  

Finally, remember that `useImperativeHandle()` can be used only inside a component wrapped in `forwardRef()`.  

## 4. Deep refs forwarding

You can forward refs more than 1 level deep in the components hierarchy. Just wrap every child, grandchild, and so on components in `forwardRef()`, and pass down the ref until reaching the destination DOM element.  

Let's forward 2 times `elementRef` to access the DOM element from a grandchild component:

```jsx
import { forwardRef, useRef, useEffect } from "react";

export function Parent() {
  const elementRef = useRef()

  useEffect(() => {
    console.log(elementRef.current); // logs <div>Deep!</div>
  }, [])

  return <Child ref={elementRef} />
}

const Child = forwardRef(function (props, ref) {
  return <GrandChild ref={ref} />
})

const GrandChild = forwardRef(function (props, ref) {
  return <div ref={ref}>Deep!</div>
})
```
[Open the demo.](https://codesandbox.io/s/react-useimperativehandle-forked-0jzpnw?file=/src/Parent.jsx)

`elementRef` is forwarded to `<Child>`, which then forwards the ref to `<GrandChild>`, which finally connect the ref to `<div>Deep!</div>`.  

![React deep forwardRef()](./diagrams/deep-forwardref.svg)

On a side note, try to keep the forwarding at a minimum to avoid increasing the code complexity.  

## 5. Pitfalls

### 5.1 Anonymous component

An anonymous function doesn't have a name near `function` keyword. 

```javascript
import { forwardRef } from 'react'

const MyComponent = forwardRef(function() { // Anonymous function
  // ...
})
```

In React dev tools an anonymous function wrapped in `forwardRef()` results in a component with an unmeaningful name:

<ImgShadow>
![Anonymous React component because of forwardRef()](./images/cryptic-name-5.png)
</ImgShadow>

Having no component name in the hierarchy makes it hard to understand what is rendered on the page. Moreover, you cannot use the search functionality of the React dev tools to find your component.  

To give component a name use the use [named function expressions](/6-ways-to-declare-javascript-functions/#21-named-function-expression) for components wrapped in `forwardRef()`:

```javascript
import { forwardRef } from 'react'

const MyComponent = forwardRef(function MyComponent() {// Named function
  // ...
})
```

Using `function MyComponent() {...}` displays the component name in React dev tools:

<ImgShadow>
![Named React component in forwardRef()](./images/good-name.png)
</ImgShadow>

With the proper names of components debugging the application is much easier.  

## 6. forwardRef() in TypeScript

Using `forwardRef()` in TypeScript is a bit trickier because you have to indicate the type arguments of `useRef<T>()` in the parent component and `forwardRef()<T, P>` wrapping the child component. Both functions are [generic function types]((https://www.typescriptlang.org/docs/handbook/2/generics.html#generic-types)).

`forwardRef<V, P>()` accepts 2 argument types:

1. `V` is the type of the value stored in a ref, which is usually an `HTMLDivElement` or `HTMLInputElement`
2. `P` is the props type of the wrapped component 

`useRef<V>()` hook in TypeScript has one argument type `V`: denoting the value type stored in the ref. If you store DOM elements in the ref, `V` can be `HTMLDivElement` or `HTMLInputElement`.  

Now let's annotate the `<Parent>` and `<Child>` components:

```tsx
import { useRef, forwardRef } from "react"

export function Parent() {
  const elementRef = useRef<HTMLDivElement>(null)

  return <Child ref={elementRef} />
}

const Child = forwardRef<HTMLDivElement>(function (props, ref) {
  return <div ref={ref}>Hello, World!</div>
})
```
[Open the demo.](https://codesandbox.io/s/eloquent-burnell-3vrm0o?file=/src/Parent.tsx)

`useRef<HTMLDivElement>(null)` creates a ref holding a div element because `HTMLDivElement` is used as a type argument.  

The ref is initialized with `null` &mdash; this is important. Otherwise, TypeScript [throws a type error](https://stackoverflow.com/a/69143200/1894471) when assigning the ref to the child component: `<Child ref={elementRef} />`.  

Finally, when wrapping the child component `forwardRef<HTMLDivElement>(...)` indicate `HTMLDivElement` as the value type of the forwarded ref.  

## 7. Conclusion

Before ending the post, I advise you to keep the refs' usage at a minimum. Here's why.    

React is the library which goal is to abstract you from manipulating DOM, cross-browser compatibility, and DOM manipulation performance. React gives you wonderful components, props, state, hooks, and context abstractions to save you from dealing with DOM and browser-specific details.  

When deciding to use refs to access DOM, including with the help of `forwardRef()` and `useImperativeHandle()`, you do not use React abstractions, but directly the DOM-specific details. The code that uses many refs with DOM elements in the [long run is more difficult to maintain](https://blog.logrocket.com/why-you-should-use-refs-sparingly-in-production/).  

Consider using a React abstraction to achieve your goal before using a ref to access DOM. Of course, it's not always possible, and from time to time you have to get your hands dirty.

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

`Parent` component safely assigns `elementRef` to the child component `<Child ref={elementRef} />`. After mounting, `elementRef` contains the DOM element instance of the child component.  

*Do you think React should support refs forwarding natively, without the use of `forwardRef()`?*