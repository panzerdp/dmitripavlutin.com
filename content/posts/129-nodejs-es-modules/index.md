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
  return MONTHS[date.getMonth()];
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

[Run the command in the demo.](https://codesandbox.io/s/commonjs-qv4np?file=/month.js)

`January` is printed in the terminal.  

Having that working, let's transform both `month-from-data.js` and `month.js` modules to ECMAScript module format, and setup Node.js to understand that.  

## 2. Enabling ES modules in Node.js

Now comes the interesting part. There are 3 ways how to configure Node.js to use ECMAScript modules format:

1. The module's file has the extension `.mjs` 
2. Or if the nearest parent folder of the module has `{ type: "module" }` in `package.json`
3. Or if the module's code is passed as a string using `--eval="<module-code>"` argument or from `STDIN` using the argument `--input-type=commonjs`.  

The detail into the first (`.mjs` extension) and second ways (setting `type` field as `"module"` in `package.json`).  

### 2.1 *.mjs* file extension

A simple way to tell Node.js to treat the modules in ECMAScript format is simply to use the `.mjs` extensions, instead of the common `.js`.  

Let's transform both modules from the previous example into ECMAScript format, and also not forget to use `.mjs` extension.  

```javascript
// month-from-date.mjs (ES Module)

const MONTHS = [
  'January', 'February', 'March','April', 'May', 'June', 'July', 
  'August', 'September', 'October', 'November', 'December'
];

export function monthFromDate(date) {
  if (!(date instanceof Date)) {
    date = new Date(date);
  }
  return MONTHS[date.getMonth()];
}
```

`month-from-date.mjs` now uses the ES format way to export a function from the module: `export function monthFromDate(...) { ... }`.  

```javascript
// month.mjs (ES Module)

import { monthFromDate } from './month-from-date.js';

const dateString = process.argv[2] ?? null;

console.log(monthFromDate(dateString));
```

Same way `month.mjs` uses the ES module `import` syntax to import `monthFromDate()` function from `'month-from-date.mjs'` module.  

That's all you need to do to make Node.js understand ES modules format. That was easy!

Now let's use the `month.mjs` module in command line:

```bash
node ./month.mjs "2022-02-01"
```

`February` is printed in terminal.  

### 2.2 { "type": "module" } in *package.json*

If you don't want to mess with file extensions, and just tell Node.js to treat all `.js` files as ES modules, then indicate `"type"` field as `"module"` in the `package.json`
file:

```json{4}
{
  "name": "my-app",
  "version": "1.0.0",
  "type": "module",
  // ...
}
```

Now all `.js` files inside the folder containing such `package.json` are going to be treated by Node.js as ECMAScript modules.  

Recalling the month modules, now you can rename `month-from-date.mjs` to `month-from-date.js` and `month.mjs` to `month.js` (while still keeping the `import` and `export` syntax), and Node.js is going to execute these module as ECMAScript ones.

```bash
node ./month.js "2022-03-01"
```

`March` is printed in terminal.  

