---
title: "An Interesting Explanation of async/await in JavaScript"
description: "You'll read in this post how to use the async/await syntax in JavaScript."
published: "2020-09-01"
modified: "2020-09-01"
thumbnail: "./images/cover-7.png"
slug: javascript-async-await
tags: ['javacript', 'async await']
recommended: ['7-architectural-attributes-of-a-reliable-react-component', 'the-art-of-writing-small-and-plain-functions']
type: post
commentsThreadId: javascript-async-await
---

JavaScript has had a long way to simplify the handling async code.  

The fist approach to handle async operations was the callback. When an async operation had been completed,
a special function named *callback* gets called:

```javascript
asyncOperation(params, function callback() {
  // Called when the operation completes
});
```