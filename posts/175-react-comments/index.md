---
title: "How to Write Comments in React"
description: "{/* Comment */} is the usual way to write comments in React. But there are 2 more you just have to know."
published: "2023-04-21"
modified: "2023-04-21"
thumbnail: "./images/board-3.jpg"
slug: react-comments
tags: ['react']
type: post
---

I like React because its syntax is the same old JavaScript or TypeScript, except when you write JSX.  

A particular issue I don't find comfortable when writing JSX is the comments syntax: `{/* Comment */}`. To me this comments syntax is JSX always felt akward.  

Let's discuss in this post the regular JSX comments syntax, but also 2 more useful and more readable ways to write comments.  

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

 `{/* message prop requires a string */ }` is the regular JSX comment. 

 Note that you can also write multi-line comments too:

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

If you wanto to get rid of `/* */` symbols and use `//` for comments, then the following syntax worth trying too:

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

In case of `//` comments you have to add a newline after the comment.  

## 2. JavaScript comments around JSX

Again, the good thing about React is that outside the JSX it's the regular JavaScript code.  

You can use that as an advantage and write JavaScript comments exactly just before the JSX tag:

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

JavaScript's `/* Comment */` also works if you have text split in multiple lines:

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

What's interesting is that you can write regular JavaScript comments inside of the JSX tag. Just makes sure that a newlines is added after the comment.  

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

This way of commenting is useful if you want to add comments to a particular prop.  

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
      <Hello
        message="Hello, World!" // comment inside JSX tag
      /> 
    </div>
  )
}
```

*What is your prefered way to write comments?*