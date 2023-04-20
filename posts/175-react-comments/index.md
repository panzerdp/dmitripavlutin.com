---
title: "How to Write Comments in React: The Good, the Bad and the Ugly"
description: "{/* Comment */} is the usual way to write comments in React. But there are 2 better ways to comment you just have to know."
published: "2023-04-21"
modified: "2023-04-21"
thumbnail: "./images/board-4.jpg"
slug: react-comments
tags: ['react']
type: post
---

I like React because its syntax is JavaScript, except when you write JSX.  

JSX comments syntax is `{/* Comment */}`. To me, this syntax is probably too verbose.    

Let's discuss the regular JSX comments syntax, but also 2 more readable and shorter ways to write comments in React components.  

## 1. Regular JSX comments

The regular way to write comments in JSX, also suggested by React documentation, is using the following syntax:

```jsx
function MyComponent() {
  return (
    <div>
      {/* message prop requires a string */}
      <Hello message="Hello, World!" /> 
    </div>
  )
}
```

 `{/* message prop requires a string */ }` is a regular JSX comment. 

You can also write multi-line comments:

 ```jsx
function MyComponent() {
  return (
    <div>
      {/* 
          Warning!
          message prop requires a string 
      */}
      <Hello message="Hello, World!" /> 
    </div>
  )
}
```

If you want to get rid of `/* */` symbols and use `//` for comments, then the following syntax is worth trying too:

```jsx
function MyComponent() {
  return (
    <div>
      {
        // message prop requires a string
      }
      <Hello message="Hello, World!" /> 
    </div>
  )
}
```

In the case of `//` comments you have to add a newline after the comment.  

## 2. JavaScript comments around JSX

Again, the good thing about React is that outside JSX it's regular JavaScript code.  

You can that advantage of that and write JavaScript comments just before the JSX tag:

```jsx
function MyComponent() {
  return (
    // message prop requires a string
    <div>
      <Hello message="Hello, World!" /> 
    </div>
  )
}
```

`// message prop requires a string` was added just before the JSX tag as a regular JavaScript comment.  

That's my preferred way to comment in JSX because I don't have to use the verbose syntax `{/* message prop requires a string */}`.  

JavaScript's `/* Comment */` also works if you have text to split into multiple lines:

```jsx
function MyComponent() {
  return (
    /*
       Warning! 
       message prop requires a string
    */ 
    <div>
      <Hello message="Hello, World!" /> 
    </div>
  )
}
```

If the situation requires, you can add the comment right after closing the JSX tag:

```jsx
function MyComponent() {
  return (
    <div>
      <div>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed 
        do eiusmod tempor incididunt ut labore et dolore magna aliqua
      </div>
      <Hello message="Hello, World!" /> 
    </div>
    // message prop requires a string
  )
}
```

## 3. JavaScript comments inside JSX

What's interesting is you can write regular JavaScript comments inside of a JSX tag! Just makes sure to add a newline after the comment.  

You can use it to add comments targeting a specic prop:

```jsx
function MyComponent() {
  return (
    <div>
      <Hello
        message="Hello, World!" // message prop requires a string
      /> 
    </div>
  )
}
```

Or add comments about a child component:

```jsx
function MyComponent() {
  return (
    <div>
      <Hello // Hello accepts message prop
        message="Hello, World!"
      /> 
    </div>
  )
}
```

That's my preferred way of commenting in JSX because it is concise and targets specific elements of the JSX.  

## 4. Conclusion

To resume, you have 3 ways of adding comments in a React component: 

1. using JSX comments syntax `{/* Comment */}`
2. JavaScript comments around JSX
3. JavaScript comments inside a JSX tag

```javascript
function MyComponent() {
  return (
    // Comment around JSX
    <div>
      {/* Comment inside JSX */}
      <Hello // comment inside JSX tag
        message="Hello, World!" // comment inside JSX tag
      /> 
    </div>
  )
}
```

*What is your preferred way to write comments?*