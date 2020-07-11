---
title: "A Simple Explanation of Event Delegation in JavaScript"
description: "A Simple Explanation of Event Delegation in JavaScript."
published: "2020-07-14T12:00Z"
modified: "2020-07-14T12:00Z"
thumbnail: "./images/cover-2.png"
slug: javascript-event-delegation
tags: ['javascript', 'event delegation']
recommended: ['simple-explanation-of-javascript-closures', 'simple-but-tricky-javascript-interview-questions']
type: post
commentsThreadId: javascript-event-delegation
---

## 1. Why event delegation?

Let's say you'd like to log a message to console when a simple HTML button is clicked.

What you need to do is select the button, and use the `addEventListener()` DOM element method to attach the event listener:

```html{5}
<button id="buttonId">Click me</button>

<script>
  document.getElementById('buttonId')
    .addEventListener('click', () => console.log('Clicked!'));
</script>
```

That's a the way to go when you'd like to listen for events on a single button.   

What about listening for click events on a large list of buttons? Let's look at a possible implementation:

```html{10-13}
<div id="list">
  <button class="buttonClass">Click me</button>
  <button class="buttonClass">Click me</button>
  <!-- buttons... -->
  <button class="buttonClass">Click me</button>
</div>

<script>
  document.getElementsByClassName('.buttonClass')
    .forEach(button => {
      button.addEventListener('click', () => console.log('Clicked!'));
    });
</script>
```

The code sample shows that you had to manually iterate the whole list of buttons, and add event listeners to each and every button.  

This approach becomes problematic when the buttons list changes: for example you can add new buttons or remove existing. You have to manually remove or attach event listeners each time a button is added or removed.  

Fortunately, the *event delegation* pattern provides a simpler and elegant solution. With using event delegation just one event listener is needed,
even if you'd like to listen for events on multiple elements.  

The event delegation pattern makes use of the event propagation mechanism of DOM events. If you'd like to understand how event delegation works, first, you'll have to understand the event propagation, particularly the even bubbling and event capturing.  

## 2. Event propagation

## 3. Event delegation

