---
title: "How to Access ES Module Metadata using import.meta"
description: "How to access the meta information (module URL, etc.) of an ES module in JavaScript."  
published: "2021-12-09"
modified: "2021-12-09"
thumbnail: "./images/cover.png"
slug: javascript-import-meta
tags: ['javascript', 'module']
recommended: ['javascript-json-modules', 'ecmascript-modules-nodejs']
type: post
---

`import.meta` is an object available inside of an ES module that contains useful information about the environment in which the module runs.  

`import.meta` object is extensible, and the host can write any useful information into it.  

Let's see what useful information about the module you can access using `import.meta`.  

## 1. Module's URL (the browser)

A useful property both browser and Node.js assign to `import.meta` is the `url` property.  

In a browser `import.meta.url` contains the absolute URL to the current ES module.  

For example, let's define a module named `main.mjs` that logs the value of the `import.meta.url`:

```javascript
// main.mjs
console.log(import.meta.url); 
```

If you load this module using a script tag (adding `type="module"` attribute) to a web page located on `http://mysite.com`:

```html
<script src="main.mjs" type="module"></script>
```
[Try the demo.](https://codesandbox.io/s/interesting-dewdney-r7th5?file=/main.mjs)

Then `import.meta.url` would contain the absolute URL to the script, e.g. `'http://mysite.com/main.mjs'`.  

## 2. Module's path (Node.js)

But if you run `main.mjs` as a Node.js script:

```bash
node main.mjs
```

Then `import.meta.url` would contain the absolute path to the module, e.g. `'file:///absolute-path/main.mjs'`. 

The absolute path inside `import.meta.url` is always prefixed with `file://`.  

*Challenge: create the file `main.mjs` on your computer, then run `node main.mjs`. What is logged to your console?*

## 3. Relative path resolver (Node.js)

Node.js also provides under `import.meta ` an async function `resolve(specifier[, parent])` that resolves a relative path `specifier` in regards to a `parent` path.  

`parent` argument is optional and defaults to the current module absolute path.  

The function is still experimental and is available with `--experimental-import-meta-resolve` flag.  

Let's say that you have a module `main.mjs` under the absolute path `/home/user/web-app/main.mjs`. You also have a module `helper.mjs` that is located in the same folder as `main.mjs`. You'd like to get the absolute path to `helper.mjs`.  

Here's how you could do it:

```javascript
// main.mjs
const resolvedPath = await import.meta.resolve('./helper.mjs');

console.log(resolvedPath); // '/home/user/web-app/helper.mjs'
```

Executing `await import.meta.resolve('./helper.mjs')` would resolve `'./helper.mjs'` to `'/home/user/web-app/helper.mjs'` absolute path.  

If the resolved module doesn't exist, then the function would throw a module not found error.  

## 4. Conclusion

`import.meta` is an object available inside the ES module scope. This object contains useful metadata information about the module.  

A useful meta property about the module is `import.meta.url` &mdash; which indicates the absolute URL of the module in the browser, and the absolute path (prefixed with `file://`) in Node.js.  

*Challenge: without using `import.meta.url`, how would you determine the URL of the script tag?*