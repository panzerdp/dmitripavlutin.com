---
title: 'How to Use ECMAScript Modules in Node.js'
description: "How to enable and use natively ECMAScript 2015 modules in Node.js."
published: "2021-04-27T12:00Z"
modified: "2021-04-27T12:00Z"
thumbnail: "./images/cover-4.png"
slug: javascript-modules-nodejs
tags: ['javascript', 'module', 'nodejs']
recommended: ['javascript-modules-best-practices', 'javascript-module-import-twice']
type: post
---

The ECMAScript (ES) modules is a format of writing JavaScript modules using the `import` and `export` statements. The JavaScript modules
were introduced as a part of ES2015 specification.  

Here's an ES module exporting a function `monthFromDate()`:

```javascript{6}
const MONTHS = [
  'January', 'February', 'March','April', 'May', 'June', 'July', 
  'August', 'September', 'October', 'November', 'December'
];

export function monthFromDate(date) {
  if (!(date instanceof Date)) {
    date = new Date(date);
  }
  return MONTHS[date.getMonth())];
}
```

Node.js version 13.2.0 and above supports natively ES modules (without experimental flags). 

In this post, you'll learn how to enable and use ES modules in Node.js. 

As well, you'll find what global variables of Node.js environment are no longer available in ES module scope.  

## 1. Enabling ES modules in Node.js

