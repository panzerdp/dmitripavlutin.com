---
title: "A Wise Guide on React useState()"
description: "React useState() hook manages the state of functional components."
published: '2019-11-12T14:00Z'
modified: '2019-11-12T14:00Z'
thumbnail: './images/wood.jpg'
slug: react-usestate-guide
tags: ['react', 'state', 'hook']
recommended: ['react-fetch-lifecycle-methods-hooks-suspense', 'use-react-memo-wisely']
type: post
commentsThreadId: react-usestate-wise-guide
---

The state is information hidden inside of a component. The component can modify its state, without outside component knowing about it.  

In React a class-based component can have state. However, I don't like classes much, maybe because they are too verbose.  

I prefer functional components because they are simple. If you do too, then you need `useState()` hook to enable state management.  

You will understand how to manage the state of components using `useState()`. Plus I will present the common pitfalls when using `useState()` to be aware of.  

# 1. State management using *useState()*

The state management consists of the following steps:

1. *Enabling state*: enabling state in a functional component
2. *Initializing state*: setting the initial value of the state
3. *Reading state*: how to read the state
4. *Updating state*: how to update the state

Let's see how to implement these steps using `useState()` hook.  

In regard of the state, let's divide the functional components into 2 categories:

1. *Stateless* functional components: those without state
2. *Stateful* functional components: those with state

Here's an example of a stateless functional component:  

```jsx
import React from 'react';

function Bulb() {
  return (
    <div className="bulb">
      <img src="bulb-off.jpg" /> 
    </div>
  );
}
```

`<Bulb />` is a stateless functional component. For now it simply renders a bulb.  

What if you'd like to add a button inside this component that switches the bulb between on or off? In such case you would need a *stateful functional component*.  

`useState()` is the right hook to achieve the bulb switch state. Let's divide the integration of state management into a functional component in 4 steps: declaring the state, initalizing, reading and updating. 

## 1.1 Enabling state

In order to transform `<Bulb>` into a stateful component, you would need to tell React about it. 

What you need is to import the `useState` hook from `'react'` package, then make a call of `useState()` at the beginning of the component's function.  
 
Let's make these change for `<Bulb>` component:

```jsx{1,4}
import React, { useState } from 'react';

function Bulb() {
  ... = useState(...);
  return (
    <div className="bulb">
      { isOn ? 
        <img src="bulb-on.jpg" /> : 
        <img src="bulb-off.jpg" /> 
      }
    </div>
  );
}
```

You can see that the first line of `<Bulb>` function calls `useState()`. Let's not think much about its parameters and returned value. It's important for now that calling this hook at the top of the component makes it stateful functional component.  

Having the state declared, the next step is to initialize it.  

## 1.2 Initializing state

Every state must have an initial value. Straigforward, the first argument of `useState(initialState)` function is the initial state.  

Let's set bulb switch state to initialize with `false`. It means that when the component is rendered first, the bulb is switched off.

```jsx{4}
import React, { useState } from 'react';

function Bulb() {
  ... = useState(false);
  return (
    <div className="bulb">
      <img src="bulb-on.jpg" /> : 
    </div>
  );
}
```

Calling `useState(false)` indicates that the state is initialized with `false`.  

Having the state declared and initialized, how do you read it? Now is the time to see the returned value of `useState(false)`.  

## 1.3 Reading state

`useState(false)` returns an array of 2 items `stateArray`, where the first item `stateArray[0]` contains the state:

```javascript
const stateArray = useState(false);
stateArray[0]; // => the state value
```

Let's read the switch state inside `<Bulb>` component. `isOn` prop is no longer needed can be deleted.  

```jsx{4,7}
import React, { useState } from 'react';

function Bulb() {
  const stateArray = useState(false);
  return (
    <div className="light-switch">
      { stateArray[0] ? 
        <img src="bulb-on.jpg" /> : 
        <img src="bulb-off.jpg" /> 
      }
      <img src={imgSrc} />
    </div>
  );
}
```

[Open the demo !!!](./) and see that `<Bulb>` component state is initialized with `false`.  

`useState(false)` returns an array of 2 items. The first item contains the value of the state, which is stored into `on` variable.  

Obviously because the state is initialized with `false`, the variable `on` contains `false` value.  

To make things straighforward, let's use the destrucuing assignment and read the state in one line:

```jsx{4}
import React, { useState } from 'react';

function Bulb() {
  const [isOn] = useState(false);
  // ...
}
```

What's important about `isOn` state variable is that unless the state is not changed, it will remains the same even if the React component rerenders.  

The whole idea of state is to be able to change it. Let's see how to do this in a final step.  

## 1.4 Updating state

As you know already `useState(false)` returns an array where the first item is the state value. Now the second item of the array is a function that accepts one argument: the new state value. Use this function to update the state.   

```javascript
const [isOn, setIsOn] = useState(false);
setIsOn(true); // changes the state to `true`
```

State update happens in response to an event: e.g. the user clicked a button.  

Let's make the following changes to `<Bulb>` component: 

* Add 2 buttons: `Light on` and `Light off`
* Add click event handlers to these buttons where the state of bulb is updated

Let's make these updates to `<Bulb>` component:

```jsx{6-7,15-16}
import React, { useState } from 'react';

function Bulb() {
  const [isOn, setIsOn] = useState(false);

  const lightOn = () => setIsOn(true);
  const lightOff = () => setIsOn(false);

  return (
    <div className="light-switch">
      { isOn ? 
        <img src="bulb-on.jpg" /> : 
        <img src="bulb-off.jpg" /> 
      }
      <button onClick={lightOn}>Light on</button>
      <button onClick={lightOff}>Light off</button>
    </div>
  );
}
```

[Open the demo !!!](./) and click *Light off* and *Light on* buttons. The bulb lights on or off depending on the clicked button.  

When *Light on* button is clicked, `lingOn()` event handler is executed. Inside the event handler `setIsOn(true)` updates the state to `true`.  

As soon as the state changes, React re-renders the component. `isOn` variable gets the new state value `true`.  

**Key takeaway**

To *enable state* in a functional component, call `useState()` within the component function. The first argument of the `useState(initialValue)` is the state's *initial value*.  

`useState()` returns an array consiting of 2 items: the current *state value* and a state updater function.  

To *update the state*, invoke the state updater function with the new value. React makes sure to re-render the component so that the new state is consumed.  

# 2. Multiple states

A functional component can have as many states as necessary. Just initialize as many states as you need with multiple calls of `useState()`.  

The rule to remember is that states declaration should always happen in the same order (more about that in [4.1](#41-incorrect-place-to-declare-state)).  

Let's improve `<Bulb>` component with a button *Add bulb* that increases the number of bulbs.  

To do so a new state is necessary. Let's name the new state `count` and initialize it with `1`:

```jsx{5,9,20}
import React, { useState } from 'react';

function Bulb() {
  const [isOn, setIsOn] = useState(false);
  const [count, setCount] = useState(1);

  const lightOn = () => setIsOn(true);
  const lightOff = () => setIsOn(false);
  const addBulb = () => setCount(count + 1);

  const bulb = isOn ? 
    <img src="bulb-on.jpg" /> :  
    <img src="bulb-off.jpg" />;

  return (
    <div className="bulb">
      {Array.from(Array(count), () => bulb )}
      <button onClick={lightOn}>Light on</button>
      <button onClick={lightOff}>Light off</button>
      <button onClick={addBulb}>Add bulb</button>
    </div>
  );
}
```

[Open the demo!!!](./) and click *Add bulb* button: the number of bulbs increases. Clicking *Light on* or *Light off* buttons switches on/off the bulbs.  

`const [count, setCount] = useState(1)` creates a new state that manages the number of bulbs. It works alongside with `isOn` state.  

# 3. Lazy initialization of state

Every time React re-renders the component, `useState(initialState)` is executed. If the initial state is a primitive value (number, boolean, etc) there are no performance issues.  

But when the initial state requires complex computation, you can use the *lazy initialization of state* by supplying a function as an argument to `useState(computeInitialState)`.  

Here's an example:
```javascript
function MyComponent() {
  const [value, setValue] = useState(function getInitialState() {
    let result;
    // expensive computation
    return result;
  });

  // ...
}
```

`getInitialState()` is executed just once, at the initial render, to get the initial state. On later renderings `getInitialState()` is not invoked, skipping the expensive computation.  

# 4. Pitfalls

Now you have the first grasp of how to use `useState()`. 

## 4.1 Incorrect place to declare state

## 4.2 Incorrect place to set state

## 4.3 Stale state

## 4.4 Too complex state

# 5. Conclusion