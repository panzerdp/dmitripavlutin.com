---
title: "How to Access ES Module Metadata using import.meta"
description: "How to access the meta information (url, script attributes, etc.) of an ES module in JavaScript."  
published: "2021-12-09"
modified: "2021-12-09"
thumbnail: "./images/cover-3.png"
slug: javascript-import-meta
tags: ['javascript', 'module']
recommended: ['javascript-json-modules', 'ecmascript-modules-nodejs']
type: post
---

`import.meta` is available inside of an ES module and gives you access to useful information
about the environment the module runs.  

Let's see what useful meta information about the module you can access using `import.meta`.  

## 1. Module's URL: The browser

You can access the current module's path using the special property `import.meta.url`. The value of the `url` property
might be slightly different depending on the host that executes JavaScript.  

But if you include the module using a script tag in a browser:

```html
<script src="main.mjs" type="module"></script>
```
[Try the demo.](https://codesandbox.io/s/interesting-dewdney-r7th5?file=/main.mjs)

Then `import.meta.url` would contain the absolute URL to the script, e.g. `http://mysite.com/main.mjs`.  

## 2. Module's URL: Node.js

Let's define a simple module named `main.mjs` that logs the value of the `import.meta.url`:

```javascript
// main.mjs
console.log(import.meta.url); 
```

If you run `main.mjs` as Node.js script:

```bash
node main.mjs
```

Then `import.meta.url` would contain the absolute path to the module, e.g. `'file:///absolute-path/main.mjs'`. 

The absolute path inside `import.meta.value` is always prefixed with `file://`.  

*Challenge: create the file `main.mjs` on your computer, then run `node main.mjs`. What is logged to console?*

## 3. Relative URL resolver

In Node.js the async function `import.meta.resolve(specifier[, parent])` helps determining the absolute URL from a `specifier` and `parent` URL (which is optional, and defaults to current's module absolute URL).  

The function is still experimental, so to use be sure to add the flag `--experimental-import-meta-resolve` to the Node.js execution command.  

Let's say that you have a module `main.mjs` under the absolute path `/home/user/web-app/main.mjs`.  

```javascript
const resolvedPath = await import.meta.resolve('index.module.css');

console.log(resolvedPath); // '/home/user/web-app/index.module.css'
```

Executing `await import.meta.resolve('index.module.css')` would resolve `'index.module.css'` relative to the current module's path: `'/home/user/web-app/index.module.css'`.

## 4. Conclusion