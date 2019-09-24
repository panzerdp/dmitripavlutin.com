---
title: How to Solve Render Props Callback Hell
description: Efficient techniques to solve the callback hell problem of React render props.
published: "2019-09-24T13:00Z"
modified: "2019-09-24T13:00Z"
thumbnail: "./images/tree.jpg"
slug: solve-render-props-callback-hell-react
tags: ["react", "render prop"]
recommended: ["6-ways-to-declare-javascript-functions", "when-not-to-use-arrow-functions-in-javascript"]
type: post
commentsThreadId: solve-render-props-callback-hell-react
---

A good design of React components is the key to a maintainable and easy to change codebase.  

In this sense, React offers a lot of design techniques like [composition](https://www.robinwieruch.de/react-component-composition), [hooks](https://reactjs.org/docs/hooks-intro.html), [higher-order components](https://reactjs.org/docs/higher-order-components.html), [render props](https://reactjs.org/docs/render-props.html), and more.  

There are no good or bad techniques. Rather there are only inappropriate usages.  

Render props technique is efficient to design components in a [loosely coupled](https://en.wikipedia.org/wiki/Loose_coupling) manner. Its essence consists in using a special prop (usually named `render`) that delegates the rendering logic to the parent component:

```jsx{6}
import Mouse from 'Mouse';

function ShowMousePosition() {
  return (
    <Mouse
      render={({ x, y }) => <div>Position: {x}px, {y}px</div> } 
    />
  );
}
```

When using render props, sooner or later you'll face a problem of nesting multiple components with render props: the *render props callback hell*.  

In this post, I will describe 3 simple and efficient approaches on how to solve this problem: using class component, function composition or `react-adopt` tool.  

## 1. Render props callback hell

Let's say you need to detect and display the city of the website visitor.

First, you'll need the component that determines the user's geographical coordinates. A component like `<AsyncCoords render={{lat, long} => ... } />` makes an async call, for example using [Geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API), then calls `render` prop callback with the coordinates.  

Then these coordinates are used to determine approximately the user's city: `<AsyncCity lat={lat} long={long} render={city => ...} />`. This component also calls `render` prop as soon as the city is known.   

The implementation details of `<AsyncCoords>` and `<AsynCity>` are unimportant for now. What's important is that the component calls `render` prop callback as soon as the result is ready.  

Let's combine these async components into `<DetectCity>`:

```jsx
function DetectCity() {
  return (
    <AsyncCoords 
      render={({ lat, long }) => {
        return (
          <AsyncCity 
            lat={lat} 
            long={long} 
            render={city => {
              if (city == null) {
                return <div>Unable to detect city.</div>;
              }
              return <div>You might be in {city}.</div>;
            }}
          />
        );
      }}
    />
  );
}

// Somewhere
<DetectCity />
```

You might already spot the issue: the nesting of the `render` prop callback functions. The more callbacks are nested, the harder it is going to understand the code. This is the render props callback hell problem.  

Let's find better ways to design the component to exclude the nesting of the callbacks.  

![How to solve React render props callback hell](./images/solving.png)

The first approach using a class is what I use mostly. I like it for its simplicity.  

## 2. Class approach

To transform the nesting of callbacks into something more readable, let's refactor the callbacks into methods of a class. 

The refactored `<DetectCity>` to a class component might look like this:

```jsx
class DetectCity extends React.Component {
  render() {
    return <AsyncCoords render={this.renderCoords} />;
  }

  renderCoords = ({ lat, long }) => {
    return <AsyncCity lat={lat} long={long} render={this.renderCity}/>;
  }

  renderCity = city => {
    if (city == null) {
      return <div>Unable to detect city.</div>;
    }
    return <div>You might be in {city}.</div>;
  }
}

// Somewhere
<DetectCity />
```

The callbacks were extracted into separated methods `renderCoords()` and `renderCity()`. Such component design is easier to understand because the rendering logic is encapsulated into a separated method.  

If you need even more nesting, the class will grow vertically (by adding new methods) rather than horizontally (by nesting functions into each other). The callback hell problem vanishes.  

### 2.1 Access component props inside render methods

The new render methods `renderCoors()` and `renderCity()` are defined using a [fat arrow method](/fix-this-in-javascript/#5-fat-arrow-method) syntax. It allows to bind `this` value to the component instance, even if these methods are invoked correspondigly inside `<AsyncCoords>` and `<AsyncCity>`.  

This is useful if you want to access the props of the main component inside the render methods:

```jsx{11}
class DetectCityMessage extends React.Component {
  render() {
    return <AsyncCoords render={this.renderCoords} />;
  }

  renderCoords = ({ lat, long }) => {
    return <AsyncCity lat={lat} long={long} render={this.renderCity}/>;
  }

  renderCity = city => {
    const { noCityMessage } = this.props;
    if (city == null) {
      return <div>{noCityMessage}</div>;
    }
    return <div>You might be in {city}.</div>;
  }
}

// Somewhere
<DetectCityMessage noCityMessage="Unable to detect city." />
```

Inside `renderCity()` the `this` value points to the `<DetectCityMessage>` component instance. Now it's easy to access `noCityMessage` prop from `this.props`.  

## 3. Function composition approach

If you want a lighter approach that doesn't involve creating classes, you can simply use function composition. 

In such case the refactored `<DetectCity>` might look like this:

```jsx
function DetectCity() {
  return <AsyncCoords render={renderCoords} />;
}

function renderCoords({ lat, long }) {
  return <AsyncCity lat={lat} long={long} render={renderCity}/>;
}

function renderCity(city) {
  if (city == null) {
    return <div>Unable to detect city.</div>;
  }
  return <div>You might be in {city}.</div>;
}

// Somewhere
<DetectCity />
```

Now, instead of creating a class with methods, regular functions `renderCoors()` and `renderCity()` encapsulate the rendering logic.  

If you need more nesting, you can simply add new functions. The code will grow vertically (by adding new functions) rather than horizontally (by nesting), solving this way the callback hell problem.  

One more nice benefit of this approach is that you can test in isolation the render functions: `renderCoords()` and `renderCity()`. It would help achieve easier higher code coverage. Plus, you can always create a module for each render function and reuse it.  

### 3.1 Access component props inside render functions

Unfortunately, the downside of the separated render functions is the difficulty to access the main component props.  

To access the props, you need to bind and pass manually the props through the call stack:

```jsx{4,14,20}
function DetectCityMessage(props) {
  return (
    <AsyncCoords 
      render={renderCoords.bind(null, props)} 
    />
  );
}

function renderCoords(props, { lat, long }) {
  return (
    <AsyncCity 
      lat={lat} 
      long={long} 
      render={renderCity.bind(null, props)}
    />
  );
}

function renderCity (props, city) {
  const { noCityMessage } = props;
  if (city == null) {
    return <div>{noCityMessage}</div>;
  }
  return <div>You might be in {city}.</div>;
}

// Somewhere
<DetectCityMessage noCityMessage="Unknown city." />
```

`renderCoords.bind(null, props)` and `renderCity.bind(null, props)` are used to bind the render function to the main component props. 

If you need to access the main component props inside the render prop callback, it's better to apply the already mentioned [class approach](#access-component-props-inside-render-methods). Render methods are always bound to the component instance, so you can access `this.props` without hassle.

## 4. Utility approach

[React-adopt](https://github.com/pedronauck/react-adopt) utility is a decent alternative if you want more flexibility on how to handle the render props callbacks.  

The refactored `<DetectCity>` component by using `react-adopt` is as follows:

```jsx
import { adopt } from 'react-adopt';

const Composed = adopt({
  coords: ({ render }) => <AsyncCoords render={render} />,
  city: ({ coords: { lat, long }, render }) => (
    <AsyncCity lat={lat} long={long} render={render} />
  )
});

function DetectCity() {
  return (
    <Composed>
      { city => {
        if (city == null) {
          return <div>Unable to detect city.</div>;
        }
        return <div>You might be in {city}.</div>;
      }}
    </Composed>
  );
}

// Somewhere
<DetectCity />
```

`react-adopt` requires a special mapper `Composed` that describes the order of async operations. At the same time, the library takes care of creating the customized `render` callbacks to ensure the correct async execution order.  

As you might notice, the above example using `react-adopt` requires more code than the approaches using a class component or function composition. So why bother using `react-adopt`?  

Unfortunately, the class component and function composition approaches are not suitable if you need to aggregate the results of multiple render props.  

Let's detail this issue.  

### 4.1 Aggregate multiple render props results

Imagine a situation when you want to render the result of 3 render prop callbacks (`AsyncFetch1`, `AsyncFetch2`, `AsyncFetch3`):

```jsx
function MultipleFetchResult() {
  return (
    <AsyncFetch1 render={result1 => (
      <AsyncFetch2 render={result2 => (
        <AsyncFetch3 render={result3 => (
          <span>
            Fetch result 1: {result1}
            Fetch result 2: {result2}
            Fetch result 3: {result3}
          </span>
        )} />
      )} />
    )} />
  );
}

// Somewhere
<MultipleFetchResult />
```

`<MultipleFetchResult>` component renders the result of all 3 async fetch actions. That's a nasty callback hell situation.  

If you try to use the class component or function composition approach, it's going to be hard. The callback hell problem transforms into arguments binding hell:

```jsx{9,17}
class MultipleFetchResult extends React.Component {
  render() {
    return <AsyncFetch1 render={this.renderResult1} />;
  }

  renderResult1(result1) {
    return (
      <AsyncFetch2 
        render={this.renderResult2.bind(this, result1)} 
      />
    );
  }

  renderResult2(result1, result2) {
    return (
      <AsyncFetch2 
        render={this.renderResult3.bind(this, result1, result2)}
      />
    );
  }

  renderResult3(result1, result2, result3) {
    return (
      <span>
        Fetch result 1: {result1}
        Fetch result 2: {result2}
        Fetch result 3: {result3}
      </span>
    );
  }
}

// Somewhere
<MultipleFetchResult />
```

You have to manually bind the result of render prop callbacks until they finally reach `renderResult3()` method. 

If you don't like manual binding, `react-adopt` could work better. Let's see a refactored version using this utility:

```jsx{12}
import { adopt } from 'react-adopt';

const Composed = adopt({
  result1: ({ render }) => <AsyncFetch1 render={render} />,
  result2: ({ render }) => <AsyncFetch2 render={render} />,
  result3: ({ render }) => <AsyncFetch3 render={render} />
});

function MultipleFetchResult() {
  return (
    <Composed>
      {({ result1, result2, result3 }) => (
        <span>
          Fetch result 1: {result1}
          Fetch result 2: {result2}
          Fetch result 3: {result3}
        </span>
      )}
    </Composed>
  );
}

// Somewhere
<MultipleFetchResult />
```

The render props results are ready inside the function `({ result1, result2, result3 }) => {...}` supplied to `<Composed>`. Note that you don't to manual bind arguments or nest callbacks. `react-adopt` takes care to solve that for you.  

Of course `react-adopt` comes with the price of additional abstractions to learn and a slight app size increase. 

## 5. Conclusion

Render prop is an efficient technique to design React components. However, one problem that affects its usability is the render props callback hell.  

For simple situations when the render prop results are used in a chain, the function composition or class component approaches work well.  

But if you have a more complex case, with multiple render prop callbacks using the result of each other, `react-adopt` will make your code lighter and easier to understand.  

*Do you know other effective ways to solve render props callback hell? Please write a comment below!*