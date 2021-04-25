---
title: 'How to Use ECMAScript Modules in Node.js'
description: "How to enable and use ECMAScript 2015 modules in Node.js."
published: "2021-04-27T12:00Z"
modified: "2021-04-27T12:00Z"
thumbnail: "./images/cover-4.png"
slug: javascript-modules-nodejs
tags: ['javascript', 'module', 'nodejs']
recommended: ['javascript-modules-best-practices', 'javascript-module-import-twice']
type: post
---

The ECMAScript (ES) modules is a format of writing JavaScript modules using the `import` and `export` statements. The JavaScript native modules
were introduced as a part of ES2015 specification.  

Here's an ES module exporting a function `monthFromDate()`:

```javascript{8}
// ES module exporting "monthFromDate()" function
const MONTHS = [
  'January', 'February', 'March','April', 'May',
  'June', 'July', 'August', 'September', 'October',
  'November', 'December'
];

export function monthFromDate(date) {
  if (!(date instance of Date)) {
    date = new Date(date);
  }
  return MONTHS[date.getMonth())];
}
```

Thanks to Babel.js, you were able to use the ES modules long before Node.js or browsers were able to support natively ES modules.  

