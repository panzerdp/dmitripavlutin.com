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

When it comes to writing comments, React offers the syntax `{/* Comment */}`. To me, this syntax is a bit verbose.    

Let's see how to use the regular JSX comments and other 2 better ways to comment.

<Affiliate type="traversyReact" />

<TableOfContents maxLevel={2} />

## 1. Regular JSX comments

The regular way to write comments in JSX is using the following syntax:

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

The good thing about React is that outside JSX it's regular JavaScript code.  

You can take advantage of that and write JavaScript comments just before the JSX tag:

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

That's a shorter way to comment in JSX because you don't have to use the verbose syntax `{/* message prop requires a string */}`.  

JavaScript's `/* Comment */` also works if you have text to split the comment into multiple lines:

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

What's interesting is you can write regular JavaScript comments inside of a JSX tag! Just make sure to add a newline after the comment.  

You can use it to add comments targeting a prop:

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

Or add comments targeting a child component:

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

<CH.Section>
To resume, you have 3 ways of adding comments in a React component: 

1. [JSX comments syntax](focus://5[6:32]) (the ugly)
2. [JavaScript comments around JSX](focus://3[5:25]) (the bad)
3. [JavaScript comments inside a JSX tag](focus://6[14:38],7[33:57]) (the good)

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
</CH.Section>

*What is your preferred way to write comments?*
