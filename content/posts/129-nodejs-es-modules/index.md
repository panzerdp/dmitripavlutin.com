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

The ECMAScript modules (in short ES modules) is a JavaScript modules format that uses `import` and `export` statements:

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

In this post, you'll learn how to enable and use ES modules in Node.js. Also you'll read what global variables of Node.js environment are no longer available in ES module scope, compared to CommonJS format.    

## 1. CommonJS modules format

The default format of modules in Node.js is the [CommonJS](https://nodejs.org/docs/latest/api/modules.html#modules_modules_commonjs_modules). 

To include a CommonJS module you have to use a special function `require('<path-to-module>')`. To export use a special object `exports` or `module.exports` available in the scope of a CommonJS module.  

For example, the following module `month-from-data.js` is a CommonJS module. The module exports a function `monthFromDate()`, which determines the month name of an arbitrary date:

```javascript{6}
// month-from-date.js (CommonJS)

const MONTHS = ['January', 'February', 'March','April', 'May', 'June', 
  'July', 'August', 'September', 'October', 'November', 'December'];

exports.monthFromDate = function(date) {
  if (!(date instanceof Date)) {
    date = new Date(date);
  }
  return MONTHS[date.getMonth()];
}
```

Note the `exports.monthFromDate` part &mdash; this is how the CommonJS module exports the function.  

Let's write a Node.js CLI script that accepts a date string argument, and the script should echo the month name of that date. Let's name the script `month.js`:

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

There are 3 ways to configure Node.js to use [ECMAScript modules](https://nodejs.org/docs/latest/api/esm.html#esm_modules_ecmascript_modules) format:

1. The module's file has the extension `.mjs` 
2. The nearest parent folder of the module has `{ "type": "module" }` in `package.json`
3. The module's code is passed as a string using `--eval="<module-code>"` argument or from `STDIN` using the argument `--input-type=commonjs`.  

Let's detail into the first (`.mjs` extension) and second (`{ type: "module" }` in `package.json`) ways.  

### 2.1 *.mjs* file extension

An easy way to tell Node.js to treat the modules in ECMAScript format is to use the `.mjs` extensions (instead of the common `.js`).  

Let's transform both modules from the previous example into ECMAScript format and change files extension from `.js` to `.mjs`.  

```javascript{1,6}
// month-from-date.mjs (ES Module)

const MONTHS = ['January', 'February', 'March','April', 'May', 'June', 
  'July', 'August', 'September', 'October', 'November', 'December'];

export function monthFromDate(date) {
  if (!(date instanceof Date)) {
    date = new Date(date);
  }
  return MONTHS[date.getMonth()];
}
```

`month-from-date.mjs` now uses the ES format way to export a function from the module: `export function monthFromDate(...) { ... }`.  

```javascript{1,3}
// month.mjs (ES Module)

import { monthFromDate } from './month-from-date.mjs';

const dateString = process.argv[2] ?? null;

console.log(monthFromDate(dateString));
```

Same way `month.mjs` uses the ES module `import` syntax to import `monthFromDate()` function from `'month-from-date.mjs'` module.  

That's all you need to make Node.js use ES modules!

Let's run `month.mjs` module in command line:

```bash
node ./month.mjs "2022-02-01"
```

[Run the command in the demo.](https://codesandbox.io/s/mjs-extension-8cio7?file=/month.mjs)

`February` is printed in terminal.  

### 2.2 { "type": "module" } in *package.json*

If you want to tell Node.js to treat all `.js` files as ES modules then indicate `"type"` field as `"module"` in the `package.json`
file:

```json{4}
{
  "name": "my-app",
  "version": "1.0.0",
  "type": "module",
  // ...
}
```

Now all `.js` files inside the folder containing such `package.json` are as ECMAScript modules.  

Recalling the month modules, now you can rename `month-from-date.mjs` to `month-from-date.js` and `month.mjs` to `month.js` (while still keeping the `import` and `export` syntax), and Node.js is going to execute these module as ECMAScript ones.

```bash
node ./month.js "2022-03-01"
```

[Run the command in the demo.](https://codesandbox.io/s/type-module-lcr0m?file=/month.js)

`March` is printed in terminal.  

## 3. Importing ECMAScript modules

The *specifier* is the static string value that's the path from where you'd like to import the module.  

```javascript
// 'path' is the specifier
import module from 'path';
```

### 3.1 Relative specifier

You can import modules using a *relative specifier*, which would import the module relative to the current module location.  

```javascript
// Relative specifiers:
import module1 from './module1.js';
import module2 from '../folder/module2.mjs';
```

When using relative specifiers indicating the file extension (`.js`, `'.mjs'`, etc.) is obligatory.

### 3.2 Bare specifier

*A bare specifier* starts with a module name (doesn't start with `.` `./` `..` `/`), and let's you import modules from `node_modules` or the built-in Node.js modules.  

For example, if you've installed `lodash-es` package in `node_modules`, then you can access that module:
 
```javascript
import lodash from 'lodash-es';
import intersection from 'lodash-es/intersection';
```

Using bare specifiers you can also import the Node.js built-in modules:

```javascript
import fs from 'fs';
```

### 3.3 Absolute specifier

An *absolute specifier* let's you import modules using an absolute path:

```javascript
import module from 'file:///usr/opt/module.js';
```

## 4. ECMAScript modules and Node.js environment

Inside the ECMAScript module are *not available* the CommonJS specific variables like:

* `require()`
* `exports`
* `module.exports`
* `__dirname`
* `__filename`

However, you can use `import.meta.url` to determine the absolute path of the current module:

```javascript
// An ES module at path "/usr/opt/module.mjs"

console.log(import.meta.url); // "file:///usr/opt/module.mjs"
```

## 5. Conclusion

Node.js supports ES modules when the module extension is `.mjs`, or the nearest folder of the module has a `package.json` containing `{ “type”: “module” }`.   

Then you can import modules using:

* Relative path, e.g. `import module from './module.js'`
* Absolute path, e.g. `import module from 'file:///abs/path/module.js'`
* Modules installed in `node_modules`, e.g. `import lodash from 'lodash-es'`
* Or built-in Node.js modules like `import fs from 'fs'`.
