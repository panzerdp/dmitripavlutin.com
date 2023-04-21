---
title: "How to Use TypeScript with React Components"
description: "How to use TypeScript to type React components: validate props, mark props as optional."
published: "2021-09-29T15:00Z"
modified: "2021-10-08T10:20Z"
thumbnail: "./images/cover-3.png"
slug: typescript-react-components
tags: ['typescript', 'react']
type: post
---

In this post, I'm going to discuss why and how to use TypeScript to type React components. 

You'll find how to annotate component props, mark a prop optional, and indicate the return type.

<Affiliate type="traversyReact" />

<TableOfContents />

## 1. Why typing React components?

TypeScript is useful if you're coding middle and bigger size web applications. Annotating variables, objects, and functions creates contracts between different parts of your application.  

For example, let's say I am the author of a component that displays a formatted date on the screen.  

```ts
interface FormatDateProps {
  date: Date
}

function FormatDate({ date }: FormatDateProps): JSX.Element {
  return <div>{date.toLocaleString()}</div>;
}
```

According to the `FormatDateProps` interface, the component `FormatDate` the value of `date` prop can only be an instance of `Date`. That is a *constraint*.  

Why is this constraint important? Because the `FormatDate` component calls the method `date.toLocaleString()` on the date instance, and the `date` prop have to be a date instance. Otherwise, the component wouldn't work.    

Then the user of the `FormatDate` component would have to satisfy the constraint, and provide `date` prop only with `Date` instances:

```tsx
<FormatDate
  date={new Date()}
/>
```

If the user forgets about the constraint, and for example provides a string `"Sep 28 2021"` to `date` prop:

```tsx
// Type error:
// Type 'string' is not assignable to type 'Date'.
<FormatDate
  date="Sep 28 2021"
/>
```

then TypeScript will show a type error. 

That's great because the error is caught during development, without hiding in the codebase.  

## 2. Typing props

In my opinion, the best benefit React takes from TypeScript is the props typing.  

Typing a React component is usually a 2 steps process.  

A) Define the interface that describes what props the component accepts using an [object type](https://www.typescriptlang.org/docs/handbook/2/objects.html). A good naming convention for the
props interface is `ComponentName` + `Props` = `ComponentNameProps`

B) Then use the interface to annotate the props parameter inside the functional component function.  

For example, let's annotate a component `Message` that accepts 2 props: `text` (a string) and `important` (a boolean):

```tsx
interface MessageProps {
  text: string;
  important: boolean;
}

function Message({ text, important }: MessageProps) {
  return (
    <div>
      {important ? 'Important message: ' : 'Regular message: '}
      {text}
    </div>
  );
}
```

`MessageProps` is the interface that describes the props the component accepts: `text` prop as `string`, and `important` as `boolean`.  

Now when rendering the component, you have to set the prop values according to the props type:

```tsx
<Message
  text="The form has been submitted!"
  important={false}
/>
```

[Basic Prop Types](https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/basic_type_example#basic-prop-types-examples) suggests types for different kinds of props. Use the list as an inspiration.  

### 2.1 Props validation

Now if you happen to provide the component with the wrong set of props, or wrong value types, then TypeScript will warn you at compile time about the wrong prop value.  

Usually, a bug is caught in one of the following phases &mdash; type checking, unit testing, integration testing, end-to-end tests, bug report from the user &mdash; and *the earlier you catch the bug, the better!*

If the `Message` component renders with an invalid prop value:

```tsx
<Message
  text="The form has been submitted!"
  // Type error:
  // Type 'number' is not assignable to type 'boolean'.
  important={0}
/>
```

or without a prop:

```tsx
<Message
  // Type error:
  // Property 'text' is missing in type '{ important: true; }' 
  // but required in type 'MessageProps'.
  important={true}
/>
```

then TypeScript will warn about that.  

### 2.2 children prop

`children` is a special prop in React components: it holds the content between the opening and closing tag when the component is rendered: `<Component>children</Component>`.  

Mostly the content of the `children` prop is a JSX element, which can be typed using a special type `JSX.Element` (a type available globally in a React environment).  

Let's slightly change the `Message` component to use a `children` prop:

```tsx
interface MessageProps {
  children: JSX.Element | JSX.Element[];
  important: boolean;
}

function Message({ children, important }: MessageProps) {
  return (
    <div>
      {important ? 'Important message: ' : 'Regular message: '}
      {children}
    </div>
  );
}
```

Take a look at the `children` prop in the interface: it accepts a single element `JSX.Element` or an array of element `JSX.Element[]`.  

Now you can use an element as a child to indicate the message:

```tsx
<Message important={false}>
  <span>The form has been submitted!</span>
</Message>
```

or multiple children:

```tsx
<Message important={false}>
  <span>The form has been submitted!</span>
  <span>Your request will be processed.</span>
</Message>
```

*Challenge: how would you update the `MessageProps` interface to support also a simple `string` value as a child? Write your solution in a comment below!*

### 2.3 Optional props

To make a prop [optional](https://www.typescriptlang.org/docs/handbook/2/objects.html#optional-properties) in the props interface, mark it with a special symbol symbol `?`.  

For example, let's mark the `important` prop as optional:

```tsx
interface MessageProps {
  children: JSX.Element | JSX.Element[];
  important?: boolean;
}

function Message({ children, important = false }: MessageProps) {
  return (
    <div>
      {important ? 'Important message: ' : 'Regular message: '}
      {children}
    </div>
  );
}
```

Inside `MessageProps` interface the `important` prop is marked with an `?` &mdash; `important?: boolean` &mdash; making the prop optional.  

Inside the `Message` function I have also added a `false` default value to the `important` prop: `{ children, important = false }`. That's going to be the default value in case if `important` prop is not indicated.  

Now TypeScript allows you to skip the `important` prop:

```tsx
<Message>
  <span>The form has been submitted!</span>
</Message>
```

Of course, you can still use `important` if you'd like to:

```tsx
<Message important={true}>
  <span>The form has been submitted!</span>
</Message>
```

## 3. Return type

In the previous examples `Message` function doesn't indicate explicitly its return type. That's because TypeScript is smart and can infer the function's return type &mdash; `JSX.Element`:    

```tsx
// MessageReturnType is JSX.Element
type MessageReturnType = ReturnType<typeof Message>;
```

In the case of React functional components the return type is usually `JSX.Element`:

```tsx
function Message({ 
    children, 
    important = false 
  }: MessageProps): JSX.Element {
  return (
    <div>
      {important ? 'Important message: ' : 'Regular message: '}
      {children}
    </div>
  );
}
```

There are cases when the component might return nothing in certain conditions. If that's the case, just use
a union `JSX.Element | null` as the return type:

```tsx
interface ShowTextProps {
  show: boolean;
  text: string;
}

function ShowText({ show, text }: ShowTextProps): JSX.Element | null {
  if (show) {
    return <div>{text}</div>;
  }
  return null;
}
```

`ShowText` returns an element if `show` prop is `true`, otherwise returns `null`. That's why the `ShowText` function's return type is a union `JSX.Element | null`.  

### 3.1 Tip: enforce the return type

My recommendation is to [enforce](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/explicit-function-return-type.md) each function to explicitly indicate the return type. Many silly mistakes and typos can be caught by doing so.  

For example, if you have set accidently a newline between `return` and the returned expression, then the explicitly indicated return type would catch this problem:

```tsx
function BrokenComponent(): JSX.Element {
  // Type error:
  // Type 'undefined' is not assignable to type 'Element'.
  return
    <div>Hello!</div>;
}
```

(Note: when there's a newline between the `return` keyword and an expression, then the function returns `undefined` rather than the expression.)  

However, if there's no return type indicated, the incorrectly used `return` remains unnoticed by TypeScript (and by you!):

```tsx
function BrokenComponent() {
  return 
    <div>Hello!</div>;
}
```

Then good luck debugging!

## 4. Conclusion

React components can greatly benefit from TypeScript.  

Typing components is especially useful to validate the component props. Usually, that's performed by defining an interface where each prop has its type.  

Then, when the annotated component renders, TypeScript verifies if correct prop values were supplied.  

On top of data validation, the types can be a great source of meta-information with clues of how the annotated function or variable works.  
