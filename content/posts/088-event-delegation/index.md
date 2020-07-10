---
title: "A Simple Explanation of Event Delegation in JavaScript"
description: "A Simple Explanation of Event Delegation in JavaScript."
published: "2020-07-14T12:00Z"
modified: "2020-07-14T12:00Z"
thumbnail: "./images/cover.png"
slug: javascript-event-delegation
tags: ['event delegation']
recommended: ['simple-explanation-of-javascript-closures', 'simple-but-tricky-javascript-interview-questions']
type: post
commentsThreadId: javascript-event-delegation
---

Let's say you'd like to log a message to console when a simple HTML button is clicked.

What you need to do is select the button, and use the `addEventListener()` DOM element method to attach the event listener:

```html{5}
<button id="buttonId">Click me</button>

<script>
  document.getElementById('buttonId')
    .addEventListener('click', () => console.log('Clicked!'));
</script>
```

When you'd like to listen for events on a single button, that a good way to go.  

What about a situation when you'd like to listen for click on a big list of buttons:

```html{10-13}
<div id="list">
  <button class="buttonClass">Click me</button>
  <button class="buttonClass">Click me</button>
  <!-- many buttons... -->
  <button class="buttonClass">Click me</button>
</div>

<script>
  document.getElementsByClassName('.buttonClass')
    .forEach(button => {
      button.addEventListener('click', () => console.log('Clicked!'));
    });
</script>
```

## 1. Event propagation

## 2. Event delegation

