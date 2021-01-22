---
title: "array.sort() Does Not Simply Sort Numbers in JavaScript"
description: "Be careful when using React.useEffect() hook because it can generate infinite loops."
published: "2021-01-26T12:00Z"
modified: "2021-01-26T12:00Z"
thumbnail: "./images/cover-2.png"
slug: javascript-array-sort-numbers
tags: ['javascript', 'array', 'number', 'sort']
recommended: ['react-hooks-mistakes-to-avoid', 'react-useeffect-explanation']
type: post
---

The `array.sort()` method sorts the elements of an array. The usual type of elements you want to sort in 
an array are numbers.  

Let's try to sort some numbers:

```javascript
const numbers = [10, 5, 11];

numbers.sort(); // => [10, 11, 5]
```

Unfortunately, `numbers.sort()` returns an array `[10, 11, 5]` (instead of the expected `[5, 10, 11]`) that is defintely not correctly sorted in ascending order.  

