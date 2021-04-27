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

The ECMAScript modules (in short ES modules) is a JavaScript modules format that uses `import` and `export` statements:

```javascript
// An ECMAScript module

// import statement
import myFunc from './my-func';

// export statement
export myOtherFunc(param) {
  const result = myFunc(param);
  // ....
  return otherResult;
}
```

Starting version 13.2.0, Node.js supports natively and production-ready ES modules.  

In this post, you'll learn how to enable and use ES modules in Node.js and other useful details.  

```toc
```

## 1. Enabling ECMAScript modules in Node.js

The default format of modules in Node.js is the [CommonJS](https://nodejs.org/docs/latest/api/modules.html#modules_modules_commonjs_modules). So if you want to make Node.js understand ES modules format, you have to explicitly make so.  

Node.js uses [ECMAScript modules](https://nodejs.org/docs/latest/api/esm.html#esm_modules_ecmascript_modules) format when:

1. The module's file extension is `.mjs` 
2. Or the nearest parent folder of the module has `{ "type": "module" }` in `package.json`
3. Or the argument `--input-type=commonjs` is present, and the module's code is passed as a string using `--eval="<module-code>"` argument or from `STDIN`.   

Let's detail into the first (`.mjs` extension) and second (`{ type: "module" }` in `package.json`) ways.  

### 1.1 *.mjs* file extension

An easy way to tell Node.js to treat the modules in ECMAScript format is to use the `.mjs` file extension.  

The follow ES module `month-from-date.mjs` (note the `.mjs` file extension) exports a function `monthFromDate()`, which determines the month name of an arbitrary date. 

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

Same way another module `month.mjs` uses the ES module `import` syntax to import `monthFromDate()` function from `'month-from-date.mjs'` module. This module accepts   

```javascript{1,3}
// month.mjs (ES Module)

import { monthFromDate } from './month-from-date.mjs';

const dateString = process.argv[2] ?? null;

console.log(monthFromDate(dateString));
```

That's all you need to make Node.js use ES modules!

Let's run `month.mjs` module in command line:

```bash
node ./month.mjs "2022-02-01"
```

[Run the command in the demo.](https://codesandbox.io/s/mjs-extension-8cio7?file=/month.mjs)

`February` is printed in the terminal.  

### 1.2 { "type": "module" } in *package.json*

If you want to tell Node.js to treat all `.js` files as ES modules, then set `"type"` field as `"module"` in the `package.json`
file:

```json{4}
{
  "name": "my-app",
  "version": "1.0.0",
  "type": "module",
  // ...
}
```

Now all `.js` files inside the folder containing such `package.json` execute as ECMAScript modules.  

Recalling the month modules, now you can rename `month-from-date.mjs` to `month-from-date.js` and `month.mjs` to `month.js` (while still keeping the `import` and `export` syntax), and Node.js is going to execute these modules as ECMAScript ones.

```bash
node ./month.js "2022-03-01"
```

[Run the command in the demo.](https://codesandbox.io/s/type-module-lcr0m?file=/month.js)

`March` is printed in the terminal.  

## 2. Importing ECMAScript modules

The *specifier* is the string literal representing the path from where to import the module.  

In the example below `'path'` is a specifier:

```javascript
// 'path' is the specifier
import module from 'path';
```

There are 3 kinds of specifiers: relative, bare and absolute.  

### 2.1 Relative specifier

You can import modules using a *relative specifier*, which would import a module relative to the current module location.  

Relative specifiers usually start with `'.'`, `'..'`, or `'./'`:

```javascript
// Relative specifiers:
import module1 from './module1.js';
import module2 from '../folder/module2.mjs';
```

When using relative specifiers indicating the file extension (`.js`, `'.mjs'`, etc.) is obligatory.

### 2.2 Bare specifier

*A bare specifier* starts with a module name (doesn't start with `'.'`, `'./'`, `'..'`, `'/'`), and imports modules from `node_modules` or the built-in Node.js modules.  

For example, if you've installed the `lodash-es` package in `node_modules`, then you can access that module:
 
```javascript
import lodash from 'lodash-es';
import intersection from 'lodash-es/intersection';
```

Using bare specifiers you can also import the Node.js built-in modules:

```javascript
import fs from 'fs';
```

### 2.3 Absolute specifier

An *absolute specifier* imports modules using an absolute path:

```javascript
import module from 'file:///usr/opt/module.js';
```

Note the presence of the `file://` prefix in the absolute specifiers.  

## 3. ECMAScript modules and Node.js environment

Inside the ECMAScript module scope are *not available* the CommonJS specific variables like:

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

## 4. Conclusion

Node.js supports ES modules when the module extension is `.mjs`, or the nearest folder of the module has a `package.json` containing `{ “type”: “module” }`.   

Then you can import modules using:

* Relative path, e.g. `import module from './module.js'`
* Absolute path, e.g. `import module from 'file:///abs/path/module.js'`
* Modules installed in `node_modules`, e.g. `import lodash from 'lodash-es'`
* Or built-in Node.js modules like `import fs from 'fs'`.
