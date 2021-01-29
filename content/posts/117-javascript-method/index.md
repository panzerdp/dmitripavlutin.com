---
title: "What's a Method in JavaScript?"
description: "A method is a function that belongs to an object and executed with that object as a context."
published: "2021-02-02T12:00Z"
modified: "2021-02-02T12:00Z"
thumbnail: "./images/cover-2.png"
slug: javascript-method
tags: ['javascript', 'function', 'method']
recommended: ['6-ways-to-declare-javascript-functions', 'javascript-arrow-functions']
type: post
---

In JavaScript here's how you can define a regular function:

```javascript
function greet(who) {
  return `Hello, ${who}!`;
}

greet('World'); // => 'Hello, World!'
```

To *define* the function write the `function` keyword followed by its name, params and body: `function greet(who) {...}`.  

Then, to *invoke* it, write the function name followed by the arguments: `greet('World')`.  

