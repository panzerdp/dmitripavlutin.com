---
title: 'How to Use ECMAScript Modules in Node.js'
description: "How to enable and use ECMAScript 2015 modules in Node.js."
published: "2021-04-27T09:00Z"
modified: "2021-04-27T09:00Z"
thumbnail: "./images/cover-4.png"
slug: ecmascript-modules-nodejs
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

Starting version 13.2.0, Node.js production-ready supports ES modules.  

In this post, you'll learn how to enable and use ES modules in Node.js.  

```toc
```

## 1. Enabling ECMAScript modules in Node.js

The default format of modules in Node.js is the [CommonJS](https://nodejs.org/docs/latest/api/modules.html#modules_modules_commonjs_modules). To make Node.js understand ES modules format, you have to explicitly make so.  

Node.js uses [ECMAScript modules](https://nodejs.org/docs/latest/api/esm.html#esm_modules_ecmascript_modules) format if:

1. The module's file extension is `.mjs` 
2. Or the module's nearest parent folder has `{ "type": "module" }` in `package.json`
3. Or the argument `--input-type=commonjs` is present, and the module's code is passed as a string using `--eval="<module-code>"` argument or from `STDIN`.   

Let's detail into the first (`.mjs` extension) and second (`{ "type": "module" }` in `package.json`) ways.  

### 1.1 *.mjs* file extension

An easy way to tell Node.js to treat the modules in ECMAScript format is to use the `.mjs` file extension.  

The following ES module `month-from-date.mjs` (note the `.mjs` file extension) exports a function `monthFromDate()`, which determines the month name of an arbitrary date: 

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

Same way another module `month.mjs` uses the ES module `import` syntax to import `monthFromDate()` function from `'month-from-date.mjs'` module. This module also runs as a CLI script, and prints the month name of the date string passed as an argument:

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

By default `.js` files in Node.js are considered CommonJS modules. To make `.js` files as ES modules simply set `"type"` field as `"module"` in the `package.json`:

```json{4}
{
  "name": "my-app",
  "version": "1.0.0",
  "type": "module",
  // ...
}
```

Now all `.js` files inside the folder containing such `package.json` execute as ECMAScript modules.  

Regarding the month modules, let's rename `month-from-date.mjs` to `month-from-date.js` and `month.mjs` to `month.js` (while still keeping the `import` and `export` syntax), set `"type"` field as `"module"` in the `package.json`, and Node.js is going to execute these modules as ECMAScript ones.

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

There are 3 kinds of specifiers in Node.js: relative, bare and absolute.  

### 2.1 Relative specifier

Importing a module using a *relative specifier* would resolve the path of the imported module relative to the current (importing) module location.  

Relative specifiers usually start with `'.'`, `'..'`, or `'./'`:

```javascript
// Relative specifiers:
import module1 from './module1.js';
import module2 from '../folder/module2.mjs';
```

When using relative specifiers indicating the file extension (`.js`, `'.mjs'`, etc.) is obligatory.

### 2.2 Bare specifier

*A bare specifier* starts with a module name (doesn't start with `'.'`, `'./'`, `'..'`, `'/'`), and imports modules from `node_modules` or the built-in Node.js modules.  

For example, if you've installed the `lodash-es` package in `node_modules`, then you can access that module using a bare specifier:
 
```javascript
// Bare specifiers:
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
// Absolute specifier:
import module from 'file:///usr/opt/module.js';
```

Note the presence of the `file://` prefix in the absolute specifiers.  

## 3. Dynamic import of modules

The default importing mechanism of ES modules *always* evaluates and imports the module specified in the `import module from 'path'` &mdash; no matter if you use the module or not.  

But sometimes you may want to import the modules dynamically, in which case you can invoke the asynchornous function `import('./path-to-module')`:

```javascript
async function loadModule() {
  const { 
    default: defaultComponent, 
    component1 
  } = await import('./path-to-module');
  // ...
}

loadModule();
```

`import('./path-to-module')` loads asynchronously the module and returns a promise that resolves to the imported module components: `default` property as the default import, and the named imports as properties with the same names.  

For example, let's improve `month.js` script to load `month-from-date.js` module only when the user sets the date argument:

```javascript {9}
// month.js (ES Module)

const dateString = process.argv[2] ?? null;

if (dateString === null) {
  console.log('Please indicate date argument');
} else {
  (async function() {
    const { monthFromDate } = await import('./month-from-date.js');
    console.log(monthFromDate(dateString));
  })();
}
```

`const { monthFromDate } = await import('./month-from-date.mjs')` loads the module dynamically, and assigns the named export `monthFromDate` to a variable with the same name.  

```bash
node ./month.js "2022-04-01"
```

[Run the command in the demo.](https://codesandbox.io/s/dynamic-t15zl?file=/month.js)

`April` is logged in the terminal.  

## 4. Mixing module formats

You can be in a situation when you need to import a CommonJS module from an ES module, and vice-versa.  

Fortunately, Node.js allows an ES module to include a CommonJS module as a default import:

```javascript{3}
// ES module

import defaultComponent from './module.commonjs.js';

// use `defaultComponent`...
```

When imported in an ES module, the `module.exports` of the CommonJS module becomes the default import.  

However, the `require()` function of the CommonJS format *cannot* import an ES module. Instead, you can use the async function `import()` inside CommonJS to load an ES module:

```javascript{7}
// CommonJS module

async function loadESModule() {
  const { 
    default: defaultComponent, 
    component1 
  } = await import('./module.es.mjs');
  // ...
}

loadESModule();
```

I recommend as much as possible to avoid mixing module formats.  

## 5. ECMAScript modules and Node.js environment

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

## 6. Conclusion

Node.js supports ES modules when the module extension is `.mjs`, or the nearest folder of the module has a `package.json` containing `{ “type”: “module” }`.   

Then you can import modules using:

* Relative path, e.g. `import module from './module.js'`
* Absolute path, e.g. `import module from 'file:///abs/path/module.js'`
* Modules installed in `node_modules`, e.g. `import lodash from 'lodash-es'`
* Or built-in Node.js modules like `import fs from 'fs'`.

You can import dynamically a module using `import('./path-to-module')` syntax.  

Also, while not desirable, but sometimes necessary, you can import a CommonJS module from an ES module using the `import ... from 'path'` statement.  

*Would you switch completely to use ECMAScript modules in your Node.js project?*