---
title: Use React.memo() wisely
description: "React.memo() uses memoization to skip unnecessary component re-render. But used incorrectly, it harms performance of components. Here's why..."
published: "2019-07-17"
modified: "2019-07-17"
thumbnail: "./images/instruments.jpg"
slug: use-react-memo-wisely
tags: ["react", "component", "memoization"]
recommended: ["7-architectural-attributes-of-a-reliable-react-component", "the-art-of-writing-small-and-plain-functions"]
type: post
---

Users enjoy fast and responsive user interfaces (UI). User insterface response delay of less than 100 milliseconds feels instant to a user. A delay between 100 and 300 milliseconds is already perceptible.  

To improve user interface performance, React offers a higher-order component `React.memo()`. By memoizing the rendered output, memoization helps to avoid unnecessary rendering.  

While it might be tempting to apply `React.memo()` on many components, you must use it wisely.  

This post helps you distinguish the situations when `React.memo()` improves the performance, and, not less important, understand when its usage is useless.  

Plus I'll describe some useful tips you should be aware of.  

## 1. React.memo()

When deciding to update DOM, React first renders your component, then compares the result with the previous render. If the render results are different, React decides to update the DOM.  

Current vs previous render results comparison is fast. But you can *speed up* the process under some circumstances.  

When a component is wrapper in `React.memo()`, React renders the component and memoizes the result. Before next render, if the props are the same, React reuses the memoized content.  

Let's define a functional component `Movie`, then wrap it in `React.memo()`:

```jsx
export function Movie({ title, releaseDate }) {
  return (
    <div>
      <div>Movie title: {title}</div>
      <div>Release date: {releaseDate}</div>
    </div>
  );
}

export const MemoizedMovie = React.memo(Movie);
```

`React.memo(Movie)` returns a new memoized component `MemoizedMovie`. It will output the same content as the original `Movie` component, but with one difference. 

`MemoizedMovie` render output is memoized. The memoized content is reused as long as `title` or `releaseDate` props are the same during next rendering rounds.  

This is where you gain performance benefit: by reusing the memoized result, React skips rendering the component and doesn't perform virtual DOM difference check.  

The same functionality for class components is implemented by [PureComponent](https://reactjs.org/docs/react-api.html#reactpurecomponent).  

### 1.1 Custom equality check of props

By default `React.memo()` does a [shallow](https://github.com/facebook/react/blob/v16.8.6/packages/shared/shallowEqual.js) comparison of props and objects of props. 

You can use the second argument to indicate a custom equality check function:  

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

`moviePropsAreEqual()` function returns `true` if prev and next props are equal.  

## 2. When to use React.memo()

![Inforgraphic explaining when to use React.memo()](./images/when-to-use-react-memo-infographic.jpg)

### 2.1 Component renders often with the same props

`React.memo()` is applied on pure functional components. These are components that given the same props, always render the same output.  

The best case of wrapping a component in `React.memo()` is when you expect the pure functional component to render often with usually the same props.  

A common situation that makes a component re-render with the same props is being forced to re-render by a parent component.  

Let's reuse `Movie` component defined above. A new parent component `MovieViewsRealtime` displays the number of views of a movie, with realtime updates every second:  

```jsx{4}
function MovieViewsRealtime({ title, releaseDate, views }) {
  return (
    <div>
      <Movie title={title} releaseDate={releaseDate} />
      Movie views: {views}
    </div>
  );
}
```
The application regularly polls the server in background (every second), updating `views` property of `MovieViewsRealtime` component.  

```jsx{3,10,17}
// Initial render
<MovieViewsRealtime 
  views={0} 
  title="Forrest Gump" 
  releaseDate="June 23, 1994" 
/>

// After 1 second, views is 10
<MovieViewsRealtime 
  views={10} 
  title="Forrest Gump" 
  releaseDate="June 23, 1994" 
/>

// After 2 seconds, views is 25
<MovieViewsRealtime 
  views={25} 
  title="Forrest Gump" 
  releaseDate="June 23, 1994" 
/>

// etc
```

Every time `views` prop is updated with a new number, `MovieViewsRealtime` re-renders. This triggers `Movie` re-render too, regardless of `title` and `releaseDate` being the same.  

That's the right case to apply memoization on `Movie` component.  

Improve `MovieViewsRealtime` to use the memoized component `MemoizedMovie`:

```jsx{4}
function MovieViewsRealtime({ title, releaseDate, views }) {
  return (
    <div>
      <MemoizedMovie title={title} releaseDate={releaseDate} />
      Movie views: {views}
    </div>
  )
}
```

As long as `title` and `releaseDate` props are the same, React skips re-rendering of `MemoizedMovie`. This improves the performance of `MovieViewsRealtime` component.  

> The more often the component re-renders with the same props, the heavier and the more computationally expensive the output is, the more chances are that component needs to be wrapped in `React.memo()`  

Anyways, use [profiling](https://reactjs.org/docs/optimizing-performance.html#profiling-components-with-the-chrome-performance-tab) to see the benefits of applying `React.memo()`.   

*Do you know other circumstances when React.memo() improves performance? If so, please write a comment below!*

## 3. When to avoid React.memo()

If your component's rendering situation doesn't fit into the case described above, most likely you don't need `React.memo()`.  

Use the following rule of thumb: if you don't see the gains of memoization, don't use it.  

> Performance-related changes applied incorrectly can even harm performance. Use `React.memo()` wisely. 

### 3.1 Useless props comparison

Suppose a case when the component typically renders with different props. In this case, memoization doesn't provide benefits. 

Even if you try to use `React.memo()`, React will have to do 2 jobs on every re-render:

1. Invoke the comparison function to determine whether the previous and next props are equal
2. Because the props are different, perform the diff of previous and current render output

Invocation of the comparison function is useless.  

## 4. React.memo() and callback functions

Function objects follow the same principles of comparison as any object. The function object equals only to itself.  

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
The functions `sum1` and `sum2` both sum 2 numbers. However, `sum1` and `sum2` are different function objects.  

Now, let's define a component that accepts a callback prop:

```jsx
function Logout({ username, onLogout }) {
  return (
    <div onClick={onLogout}>
      Logout {username}
    </div>
  );
}

const MemoizedLogout = React.memo(Logout);
```

Because of function equality pitfall, a component that accepts a callback must be handled with care when applying memoization. There's a chance that the parent component provides different instances of the callback function on every re-render:  

```jsx{7}
function MyApp({ store, cookies }) {
  return (
    <div className="main">
      <header>
        <MemoizedLogout
          username={store.username}
          onLogout={() => cookies.clear()}
        />
      </header>
      {store.content}
    </div>
  );
}
```
Even if provided with the same `username` value, `MemoizedLogout` re-renders every time because it receives new instances of `onLogout` callback.  

Memoization is broken.  

To fix it, the same callback instance must be used to set `onLogout` prop. Let's apply [useCallback()](https://reactjs.org/docs/hooks-reference.html#usecallback) to preserve the callback instance between renderings:

```jsx{4,10}
const MemoizedLogout = React.memo(Logout);

function MyApp({ store, cookies }) {
  const onLogout = useCallback(() => { cookies.clear() }, []);
  return (
    <div className="main">
      <header>
        <MemoizedLogout
          username={store.username}
          onLogout={onLogout}
        />
      </header>
      {store.content}
    </div>
  );
}
```

`useCallback(() => { cookies.clear() }, [])` always returns the same function instance. Memoization of `MemoizedLogout` is fixed.  

## 5. React.memo() is a performance hint

Strictly, React uses memoization as a performance hint. 

While in most situations React avoids re-rendering a memoized component, you shouldn't count on that to prevent rendering.  

## 6. Conclusion

`React.memo()` is a great tool to apply the benefits of memoization for pure functional components. When applied correctly, it prevents component re-render when next props are the same as previous.  

Take precaution when memoizing components that use props with callback functions. Make sure to provide the same callback function instance between renderings.  

Don't forget to use [profiling](https://reactjs.org/docs/optimizing-performance.html#profiling-components-with-the-chrome-performance-tab) to measure the performance gains of memoization.  

*Do you know interesting use cases of React.memo()? If so, please write a comment below!*
