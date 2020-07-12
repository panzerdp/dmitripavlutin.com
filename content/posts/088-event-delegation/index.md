---
title: "A Simple Explanation of Event Delegation in JavaScript"
description: "The event delegation is an useful pattern to listen for events on multiple elements using just one event handler."
published: "2020-07-14T12:00Z"
modified: "2020-07-14T12:00Z"
thumbnail: "./images/cover-3.png"
slug: javascript-event-delegation
tags: ['javascript', 'event delegation']
recommended: ['simple-explanation-of-javascript-closures', 'simple-but-tricky-javascript-interview-questions']
type: post
commentsThreadId: javascript-event-delegation
---

## 1. Why event delegation?

Let's log a message to the console when an HTML button is clicked.  

To make it work, you need to select the button, then `addEventListener()` method to attach the click event listener:

```html{5}
<button id="buttonId">Click me</button>

<script>
  document.getElementById('buttonId')
    .addEventListener('click', () => console.log('Clicked!'));
</script>
```

That's the way to go when you'd like to listen for events on a single element, particularly a button.   

What about listening for events on a large list of buttons? Here's a <span id="many-event-listeners">possible implementation</span>:

```html{10-13}
<div id="buttons">
  <button class="buttonClass">Click me</button>
  <button class="buttonClass">Click me</button>
  <!-- buttons... -->
  <button class="buttonClass">Click me</button>
</div>

<script>
  const buttons = document.getElementsByClassName('buttonClass');
  for (const button of buttons) {
    button.addEventListener('click', () => console.log('Clicked!'));
  }
</script>
```

Take a look at the [Codesandbox demo](https://codesandbox.io/s/infallible-archimedes-6feob?file=/index.html) to see how it works.  

The buttons list is iterated `for (const button of buttons)` and a new listener is attached to each button. Also, when a button is added or removed from the list, you'd have to manually remove or attach event listeners.  

Is there a better approach?

Fortunately, when using *event delegation* pattern, listening for events on multiple elements requires just one event listener.  

The event delegation uses specifics of *event propagation* mechanism. To understand how event delegation works, I recommend understanding the event propagation first.   

## 2. Event propagation

When you click the button in the following sample html:

```html{4}
<html>
  <body>
    <div id="buttons">
      <button class="buttonClass">Click me</button>
    </div>
  </body>
</html>
```

the click event propagates in a sequence of 3 phases: 

1. *Capture phase* &mdash; Starting from `window`, `document` and the root element, the event dives down through ancestors until the target element
2. *Target phase* &mdash; The event gets triggered on the element on which the user made a click
3. *Bubble phase* &mdash; Finally, the event bubbles up through ancestors of the target element until the root element, `document`, and `window`.  

![JavaScript Event Propagation](./images/javascript-event-propagation-4.png)

You need to indicate specific arguments on the `addEventListener()` method to attach to events in a particular phase:

* `element.addEventListener('eventType', handler)` captures the events of *target and bubble phases*  
* `element.addEventListener('eventType', handler, true)` (the 3rd argument being `true` or `{ capture: true }`) captures the events of *capture phase*  

In this [Codesandbox demo](https://codesandbox.io/s/event-propagation-example-71yvl?file=/src/index.js), when clicking on the button, you can see in console how the event propagates.  

Ok, how does event propagation help capturing events of multiple buttons? 

The algorithm is simple: attach the event listener to the parent of buttons, and catch the bubbling event when a button is clicked. This is exactly how event delegation works.  

## 3. Event delegation

Let's use the event delegation to catch the clicks on multiple buttons. Here's a possible implementation:

```html
<div id="buttons">
  <button class="buttonClass">Click me</button>
  <button class="buttonClass">Click me</button>
  <!-- buttons... -->
  <button class="buttonClass">Click me</button>
</div>

<script>
  document.getElementById('buttons')
    .addEventListener('click', event => {
      if (event.target.className === 'buttonClass') {
        console.log('Click!');
      }
    });
</script>
```

Open the [Codesandbox demo](https://codesandbox.io/s/event-delegation-example-6y6gc?file=/index.html) and click any button &mdash; you'll see `'Click!'` message logged to console.  

The idea of event delegation is simple. Instead of attaching the event listeners directly to the buttons, you *delegate* listening to the parent element of buttons  `<div id="buttons">`. And when a button is clicked, the listener of the parent element catches the *bubbling event* (recall the event propagation?) from the button.   

Using the event delegation requires 3 steps:

#### Step 1. Determine the parent of elements to watch for events

In the example above, `<div id="buttons"></div>` is the parent element of the buttons.  

#### Step 2. Attach the event listener to the parent element

`document.getElementById('buttons').addEventListener('click', handler)` attaches the event listener to the parent element of buttons. Due to the event propagation mechanism, this event listener reacts also to buttons clicks, because the *button click event bubbles through ancestors*.  

#### Step 3. Use *event.target* to select the target element

When a button is clicked, the handler function is invoked with an argument: the `event` object. The property `event.target` accesses the element upon which the event has been dispatched, which in the example is a button: 

```javascript{3}
  // ...
  .addEventListener('click', event => {
    if (event.target.className === 'buttonClass') {
      console.log('Click!');
    }
  });
```

As a side note, `event.currentTarget` points to the element to which the event listener is attached directly. In the example, `event.currentTarget` is `<div id="buttons">`.  

Now you can see the *benefit* of event delegation pattern: *instead of attaching listeners to every button* like it was done [earlier](#many-event-listeners), thanks to event delegation *just one event listener is necessary*.  

## 4. Summary

The idea of event delegation is based on the event propagation mechanism. When a click event happens (or any other event that propagates):

* The event travels down from `window`, `document`, root element and through the ancestors of the target element (capture phase)
* The event occurs on the target (the target phase) 
* Finally, the event bubbles up through the target's ancestors until the root element, `document` and `window` (the bubble phase).  

The event delegation is a useful pattern because it lets you listen for events on multiple elements with just one event handler.  

Making the event delegation work requires 3 steps:

1. Determine the parent of elements to watch for events
2. Attach the event listener to the parent element
3. Use `event.target` to select the target elements

*Do you have any questions regarding the event propagation or event delegation? If so, please write a comment below!*