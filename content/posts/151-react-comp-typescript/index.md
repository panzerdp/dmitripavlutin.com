---
title: "How to type React Components with TypeScript"
description: "How to use TypeScript to annotate React components."
published: "2021-09-29T12:00Z"
modified: "2021-09-29T12:00Z"
thumbnail: "./images/cover-3.png"
slug: typescript-react-components
tags: ['typescript', 'react']
recommended: ['typescript-unknown-vs-any', 'typescript-index-signatures']
type: post
---

In this post, I'm going to discuss why and how to use TypeScript to type React components. 

You'll find how to annotate component props, mark
a prop optional, and indicate the return type.

```toc
```

## 1. Why typing React components?

TypeScript is useful if you're coding middle and bigger size web applications. Annotating variables, objects, and functions creates contracts between different parts of your application.  

Typing constrains how a certain variable, object, or function must be used. Constraining guides how to use a function the way its author has designed it.  

For example, let's say I am the author of a component that displays a formatted date on the screen.  

```twoslash include format-date-component
interface FormatDateProps {
  date: Date
}

function FormatDate({ date }: FormatDateProps): JSX.Element {
  return <div>{date.toLocaleString()}</div>;
}
```

```tsx twoslash{2}
// @include: format-date-component
```

According to the `FormatDateProps` interface, the component `FormatDate` accepts `date` prop only an instance of `Date`. That is a *constraint* of how the component should be used.  

Why is this constraint important? Because the `FormatDate` component calls the method `date.toLocaleString()` on the date instance.  

Then the user of the `FormatDate` component would have to satisfy the constraint, and provide `date` prop only with `Date` instances:

```tsx twoslash
// @include: format-date-component
// ---cut---
<FormatDate
  date={new Date()}
/>
```

If the user forgets about the constraint, and for example provides a string `"Sep 28 2021"` to `date` prop:

```tsx twoslash
// @errors: 2322
// @include: format-date-component
// ---cut---
<FormatDate
  date="Sep 28 2021"
/>
```

Then TypeScript will show a type error and indicate the expected data type.  

## 2. Typing props

In my opinion, the best benefit React takes from TypeScript is the props typing.  

Typing a React component is usually a 2 steps process.  

A) Define the interface that describes what props the component accepts using an [object type](https://www.typescriptlang.org/docs/handbook/2/objects.html). A good naming convention for the
props interface is `ComponentName` + `Props` = `ComponentNameProps`

B) Inside the functional component, annotate the props parameter with the props interface.  

For example, let's annotate a component `Message` that accepts 2 props: `text` (a string) and `important` (a boolean):

```twoslash include message
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

```tsx twoslash
// @include: message
```

`MessageProps` is the interface that describes the type of props the component accepts: `text` prop as `string`, and `important` as `boolean`.  

[Basic Prop Types Examples](https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/basic_type_example#basic-prop-types-examples) gives examples of types for different kinds of props. Use the list as an inspiration for your prop typing.

Now when rendering the component, you would have to set the prop values according to the props type:

```tsx twoslash
// @include: message
// ---cut---
<Message
  text="The form has been submitted!"
  important={false}
/>
```

### 2.1 Props validation

If `Message` component renders with invalid prop value:

```tsx twoslash
// @errors: 2322
// @include: message
// ---cut---
<Message
  text="The form has been submitted!"
  important={0}
/>
```

or without a prop:

```tsx twoslash
// @errors: 2741
// @include: message
// ---cut---
<Message
  important={true}
/>
```

then TypeScript will warn about that.  

### 2.2 *children* prop

`children` is a special prop in React components: it holds the content between the opening and closing tag of the component.  

That's why the most often content of the `children` prop is the JSX element, which can be typed using a special type `JSX.Element`.  

Let's slightly change the `Message` component to support the `children` prop:

```twoslash include message-children
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

```tsx twoslash{2}
// @include: message-children
```

Take a look at the `children` prop in the interface: it accepts a single element `JSX.Element` or an array of element `JSX.Element[]`.  

Now you can use an element as a child to indicate the message:

```tsx twoslash
// @include: message-children
// ---cut---
<Message important={false}>
  <span>The form has been submitted!</span>
</Message>
```

or multiple children:

```tsx twoslash
// @include: message-children
// ---cut---
<Message important={false}>
  <span>The form has been submitted!</span>
  <span>Your request will be processed.</span>
</Message>
```

*Challenge: how would you update the `MessageProps` interface to support also a simple `string` value as a child? Write your solution in a comment below!*

### 2.3 Optional props

If you'd like to mark a prop as optional, you can mark the corresponding prop as [optional](https://www.typescriptlang.org/docs/handbook/2/objects.html#optional-properties) with `?` in the object type of the props.  

For example, let's mark the `important` prop as optional:

```twoslash include message-optional
interface MessageProps {
  children: JSX.Element | JSX.Element[];
  important?: boolean;
}
// - 1

function Message({ children, important = false }: MessageProps) {
  return (
    <div>
      {important ? 'Important message: ' : 'Regular message: '}
      {children}
    </div>
  );
}
// - 2
```

```tsx twoslash{3,6}
// @include: message-optional
```

You can see that inside that `MessageProps` interface the `important` prop is marked with an `?` &mdash; `important?: boolean` &mdash; making the prop optional.  

Inside the `Message` function I have also added a `false` default value to the `important` prop. That's going to be the default value in case if `important` prop is not indicated.  

Now TypeScript allows you to skips indicating `important` prop:

```tsx twoslash
// @include: message-optional
// ---cut---
<Message>
  <span>The form has been submitted!</span>
</Message>
```

Of course, you can indicate a specific value if you need so:

```tsx twoslash
// @include: message-optional
// ---cut---
<Message important={true}>
  <span>The form has been submitted!</span>
</Message>
```

## 3. Return type

In the previous examples `Message` function doesn't indicate explicitly its return type. That's because TypeScript is smart and can infer the function's return type.  

```tsx twoslash{3,6}
// @include: message-optional-1
// @include: message-optional-2
// ---cut---

type MessageReturnType = ReturnType<typeof Message>;
//      ^?
```

However, my personal preference is to enforce each function to explicitly indicate the return type. In the case of React functional components the return type is usually `JSX.Element`:

```tsx twoslash{5}
// @include: message-optional-1
// ---cut---

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

```tsx twoslash
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

`ShowText` returns an element if `show` prop is `true`, otherwise returns `null`.  

That's why the `ShowText` function's return type is a union `JSX.Element | null`.  

## 4. Conclusion

React components can greatly benefit when used with TypeScript.  

In my opinion, one of the best benefits is the ability to easily verify the component props. Usually, that's performed by defining an interface using an object type, and indicate each prop what type it should have.  

Then, when the annotated component is rendered, TypeScript takes care to verify that the correct data types were supplied.  