---
title: Use React memo wisely
description: "React memo only when used correctly increases the performance of components. It's best used with components that re-render often with rarely changing props."
published: "2019-07-17"
modified: "2019-07-17"
thumbnail: "./images/memo.jpg"
slug: use-react-memo-wisely
tags: ["react", "component", "memoization"]
recommended: ["7-architectural-attributes-of-a-reliable-react-component", "the-art-of-writing-small-and-plain-functions"]
type: post
---

Users enjoy fast and responsive user interfaces (UI). When [directly manipulating](https://www.nngroup.com/articles/direct-manipulation/) elements of the UI, users expect a feedback of up to 0.1 seconds. Otherwise the application feels "laggy".

To increase the performance of user interface components, React offers a higher order component React.memo(). It helps avoiding unnecessary re-renders.  

While it might be tempting to use apply React.memo() to improve the performance of any component, that's not always corrent.  

Continue reading to get a good grasp of when React.memo() really improves the performance. And contrarily, understand the situations when React.memo() is useless.  

## 1. React.memo

When deciding to update DOM or not, React first renders your component, then compares the result with previous render. If the render results are different, React decides to update the DOM.  

Current vs previous render results comparison is reasonable fast. But you can speed up the process by comparing only current vs previous props supplied to the component. This is what [React.memo()](https://reactjs.org/docs/react-api.html#reactmemo) does for functional components.

Let's define a functional component `Movie`, then wrap it with React.memo():

```jsx
function Movie({ title, releaseDate }) {
  return (
    <div>
      <div>Movie title: {title}</div>
      <div>Release date: {releaseDate}</div>
    </div>
  );
}

const MemoizedMovie = React.memo(Movie);
```

`React.memo(Movie)` returns a new memoized component `MemoizedMovie`. It will output the same content as original `Movie` component. 

However, `MemoizedMovie` only re-renders if `title` or `releaseDate` props change. 

This is where you gain performance benefit: as long as the memoized component receives the same props as in previous render, React skips re-rendering and uses the previous saved render output.  

### 1.1 Custom props comparison

By default React.memo() makes a shallow comparison of props and complex object of props. Use the second argument to indicate a custom props comparison function:

```javascript
React.memo(Component, [areEqual(prevProps, nextProps)]);
```

`areEqual(prevProps, nextProps)` function must return `true` if `prevProps` and `nextProps` are equal.

For example, let's manually calculate if `Movie` component props are equal:

```jsx

function moviePropsAreEqual(prevMovie, nextMovie) {
  return prevMovie.title === nextMovie.title
    && prevMovie.releaseDate === nextMovie.releaseDate;
}

const MemoizedMovie2 = React.memo(Movie, moviePropsAreEqual);
```

(The alternative of `React.memo()` for class based components is the method [shouldComponentUpdate()](https://reactjs.org/docs/react-component.html#shouldcomponentupdate). Note that the considerations in this post apply to `shouldComponentUpdate()` too.) 

## 2. When to use React memo

![Inforgraphic explaining when to use React.memo()](./images/when-to-use-react-memo.jpg)

### 2.1 Often re-render with usually the same props

As mentioned in previous section, the main benefit of `React.memo()` is to skip re-rendering when props are the same.  

The best case of wrapping a component with `React.memo()` is when you expect the component to re-render often with the same props. 

*Do you know other circumstances when React.memo() improves performance? If so, please write a comment below!*

## 3. When to avoid React memo

If your component's rendering situation doesn't fit into the case described above, most likely you don't need `React.memo()`.  

I use the following rule of thumb. If I weren't able to definitely prove the gains of memoizing, I don't need it. 

Performance-related changes applied incorectly can even damage the basic performance. Use React.memo() wisely. 

### 3.1 Component props change often

Suppose a case when the component almost always receives different props. In this case, memoizing doesn't give benefits. 

Even if you try to use `React.memo()`, React will have to do 2 jobs on every re-render:

1. Invoke the comparison function to determine whether the props are equal
2. Because the props are different, the component re-renders

Invokation of the comparison function is useless.  

## 4. React memo and callback functions

Function objects follow the same principles of comparison like any object. The function object is equal only to itself.  

Let's compare some functions:
```javascript
function sum1(a, b) {
  return a + b;
}
function sum2(a, b) {
  return a + b;
}

console.log(sum1 === sum2); // => false
console.log(sum1 === sum1); // => true
console.log(sum2 === sum2); // => true
```
The functions `sum1` and `sum2` both sum 2 numbers. However, comparing `sum1` and `sum2` shows that these are different function objects.  

## 5. Conclusion

`React.memo()` is a great tool to apply the benefits of memoization for functional components. When applied correctly, it will prevent component re-render when props are the same as previous props.  

Don't forget to use [profiling](https://reactjs.org/docs/optimizing-performance.html#profiling-components-with-the-chrome-performance-tab) to practically see the performance gains of memoization.  