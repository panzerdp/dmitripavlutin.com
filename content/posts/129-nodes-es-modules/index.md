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

The ECMAScript modules (in short ES modules) is a JavaScript modules format using the `import` and `export` statements. The JavaScript modules
were introduced as a part of ES2015 specification.  

```javascript
// An ECMAScript module

// import statement
import myFunc from './my-func';

// export statement
export myImprovedFunction(param) {
  const someOtherResult = myFunc(param);
  // ....
  return someResult;
}
```

Starting version 13.2.0 Node.js supports natively ES modules (without experimental flags).  

In this post, you'll learn how to enable and use ES modules in Node.js. Also you'll read what global variables of Node.js environment are no longer available in ES module scope.  

## 1. CommonJS modules format

The default format of modules in Node.js is the CommonJS. 

To include a module in CommonJS format you have to use a special function `require('path-to-module')`. And to export use a special object `exports` available in the scope of a CommonJS module.  

For example, the following module `month-from-data.js` is a CommonJS module that exports a function `monthFromDate()` returning the month name of a date:   

```javascript{8}
// month-from-date.js (CommonJS)

const MONTHS = [
  'January', 'February', 'March','April', 'May', 'June', 'July', 
  'August', 'September', 'October', 'November', 'December'
];

exports.monthFromDate = function(date) {
  if (!(date instanceof Date)) {
    date = new Date(date);
  }
  return MONTHS[date.getMonth())];
}
```

Note the `exports.monthFromDate` part &mdash; this is how the CommonJS module exports the function `monthFromDate()`.  

Now, let's say that you're writing a small Node.js CLI script that accepts a date as an argument, and the script should echo the name of the month of the date. Let's name the script `month.js`:

```javascript{3}
// month.js (CommonJS)

const { monthFromDate } = require('./month-from-date.js');

const dateString = process.argv[2] ?? null;

console.log(monthFromDate(dateString));
```

`const { monthFromDate } = require('./month-from-date.js')` is how you import the `monthFromDate` function from the `month-from-date.js` CommonJS module.  

Now, if you run `month.js` as a CLI script, everything works as expected:

```bash
node ./month.js "2022-01-01"
```

`January` is logged to console.  

Having that working, let's transform both `month-from-data.js` and `month.js` modules to ECMAScript module format, and setup Node.js to understand that.  

## 2. Enabling ES modules in Node.js