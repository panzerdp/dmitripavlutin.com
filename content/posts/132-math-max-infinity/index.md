---
title: "Why Math.max() Without Arguments Returns -Infinity"
description: "What is the reason that Math.max() utility function when being called without arguments returns -Infinity."
published: "2021-05-18T12:00Z"
modified: "2021-05-18T12:00Z"
thumbnail: "./images/cover-2.png"
slug: javascript-math-max-infinity
tags: ['javascript', 'number']
recommended: ['infinity-in-javascript', 'nan-in-javascript']
type: post
---

`Math.max()` is a built-in JavaScript utility function that determines the maximum number from the numbers specified as arguments.  

For example, let's determine the maximum of the numbers `1`, `2` and `3`:

```javascript
Math.max(1, 2, 3); // => 3
```

As expected, `3` is the maximum of `1`, `2` and `3`.  

What would happen if `Math.max()` is invoked with just one argument:

```javascript
Math.max(1); // => 1
```

