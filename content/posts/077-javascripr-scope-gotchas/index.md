---
title: '5 JavaScript Scope Gotchas'
description: '5 situations when the JavaScript scope behaves differently than you expect.'
published: '2020-04-24T12:00Z'
modified: '2020-04-24T12:00Z'
thumbnail: './images/javascript-scope-cover-2.png'
slug: javascript-scope-gotchas
tags: ['javascript', 'scope', 'variable']
recommended: ['simple-explanation-of-javascript-closures', 'javascript-scope']
type: post
commentsThreadId: javascript-scope-gotchas
---

When you declare a variable, you don't expect it to be available in the entire codebase. But rather within some limits.  

That's when the scope comes in. In JavaScript a code block, a function or module create scopes for variables. And the best part
is that a variable can be accessible only within its scope.  

For example, the `if` code block creates a scope for the variable `message`:

```javascript{3,5}
if (true) {
  const message = 'Hello';
  console.log(message); // 'Hello'
}
console.log(message); // throws ReferenceError
```

The variable `message` is accessible inside the scope of `if` code block. However, outside of the scope the variable is not accessible.  

That was a short intro to scopes. If you'd like to learn more, I recommend reading my post [JavaScript Scope Explained in Simple Words
](/javascript-scope/).  

What follows are 5 interesting cases when the JavaScript scopes behaves differently than you expect. You might study these cases to improve your knowledge of scopes, or just prepare for a fancy coding interview.  

##1. *var* variables inside *for* cycle

Consider the following code snippet:

```javascript
const colors = ['red', 'blue', 'white'];


```

##2. function declaration inside code blocks

##3. Where can you import a module?

##4. Function parameters scope

##5. Function declaration vs class declaration

