---
title: 'A Mistery of parseInt() in JavaScript'
description: "A mistery of how parseInt() parses some numbers in JavaScript."
published: "2021-04-20T12:00Z"
modified: "2021-04-20T12:00Z"
thumbnail: "./images/cover-3.png"
slug: parseint-mistery-javascript
tags: ['javascript', 'number']
recommended: ['nan-in-javascript', 'infinity-in-javascript']
type: post
---

`parseInt()` is a built-in function in JavaScript that parse integers  from numerical string values.  

For example, let's parse the integer from the numeric string `'100'`:

```javascript
const number = parseInt('100');
number; // 100
```

As expected, `'100'` is parsed to integer `100`.  

`parseInt(string, radix)` also accepts a second argument: the radix at which the string argument is. The radix argument allows you to parse integers from different
numerical bases.  

Let's use `parseInt()` to parse a numerical string in base 2:

```javascript
const number = parseInt('100', 2);
number; // 2
```

Because the radix argument is `2`, `parseInt('100', 2)` parses `'100'` as an integer in base 2: thus it returns the value `4` (in decimal).  

That's pretty much a short introduction to `parseInt()`.  

## 1. A mystery behavior of *parseInt()*

