---
title: "A Simple Explanation of Event Delegation in JavaScript"
description: "A Simple Explanation of Event Delegation in JavaScript."
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

Let's log a message to console when an HTML button is clicked. What you need to do is select the button, and use the `addEventListener()` method to attach the event listener:

```html{5}
<button id="buttonId">Click me</button>

<script>
  document.getElementById('buttonId')
    .addEventListener('click', () => console.log('Clicked!'));
</script>
```

That's a the way to go when you'd like to listen for events on a single element, parcticularly a button.   

What about listening for click events on a large list of buttons? Here's a <span id="many-event-listeners">possible implementation</span>:

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

Check the [Codesanbox demo](https://codesandbox.io/s/infallible-archimedes-6feob?file=/index.html) to see how it works.  

The buttons list is iterated and an event listener is attached to each button. That's only a part of difficulties: you'd have to manually remove or attach event listeners each time a button is added or removed.  

Fortunately, the *event delegation* pattern provides a simpler and elegant solution. When using event delegation, just one event listener is needed,
even if you'd like to listen for events on multiple elements.  

To work, the event delegation uses specifics of *event propagation*. To understand how event delegation works, first, I recommend to understand the event propagation.  

## 2. Event propagation

Let's take a closer look at what happens when a button is clicked. Let's consider that the `<button>` in the following HTML structure is clicked:

```html{4}
<html>
  <body>
    <div id="buttons">
      <button class="buttonClass">Click me</button>
    </div>
  </body>
</html>
```

When you click the button, the click event propagates in the following sequence of phases: 

1. *Capture phase* &mdash; Starting from `window`, `document` and the root element, the event dives down through ancestors until the target element
2. *Target phase* &mdash; The event triggers on the element on which the user clicked
3. *Bubble phase* &mdash; Finally, the event bubbles up through ancestors until the root element, `document` and `window`.  

If you click on the `<button>` in the example html, here's how the click event propagates:

![JavaScript Event Propagation](./images/javascript-event-propagation-4.png)

To attach to events of a particular phase, you need to indicate specific arguments on the `addEventListener()` method.  

* `element.addEventListener('eventType', handler)` captures the events of *target and bubble phases*  
* `element.addEventListener('eventType', handler, true)` (the 3rd argument being `true`) captures the events of *capture phase*  

Open the [Codesandbox demo](https://codesandbox.io/s/event-propagation-example-71yvl?file=/src/index.js) and click on the button. The console 'll show the logs on how the click event passes through 3 phases.  

How does event propagation help capturing events of multiple buttons? 

The algorithm is simple: attach the event listener on the parent of the buttons, and catch the bubbling event when a button is clicked. Let's see how it's done in the next section.  

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

Using the event delegation requires 3 steps:

#### Step 1. Determine the parent of elements to watch for events

In the example above, `<div id="buttons"></div>` is the parent element of the buttons.  

#### Step 2. Attach the event listener to parent element

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

As a side note, `event.currentTarget` points to the element on which the event listener is attached directly. In the example, this is the parrent element `<div id="buttons">`.  

Finally, you can clearly see the benefit of event delegation pattern: instead of attaching listeners to every button like it was done [earlier](#many-event-listeners), thanks to event delegation just one event listener is necessary.  

## 4. Summary

The idea of event delegation is based on the event propagation mechanism. When a click event happens (or any other event that propagates):

* The event travels down from `window`, `document`, root element through the ancestors (capture phase)
* Then the event occurrs on the target (the target phase) 
* Finally, the event bubbles up through target's ancestors until the root element, `document` and `window` (the bubble phase).  

The event delegation is an useful pattern because it let's you listen for events on multiple elements with just one event handler that's attached to the parent element. 

Making the event delegation work requires 3 steps:

1. Determine the parent of elements to watch for events
2. Attach the event listener to parent element
3. Use `event.target` to select the target element

*Do you have any questions regarding the event propagation or event delegation? If so, please write a comment below!*