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

## 1. Module's URL

You can access the current module's path using the special property `import.meta.url`. The value of the `url` property
might be slightly different depending on the host that executes JavaScript.  

Let's define a simple module named `main.mjs` that logs the value of the `import.meta.url`:

```javascript
// main.mjs
console.log(import.meta.url); 
```

A) If you run `main.mjs` as Node.js script:

```bash
node main.mjs
```

Then `import.meta.url` would contain the absolute path to the module, e.g. `'file:///absolute-path/main.mjs'`. 

The absolute path inside `import.meta.value` is always prefixed with `file://`.  

*Challenge: create the file `main.mjs` on your computer, then run `node main.mjs`. What is logged to console?*

B) But if you include the module using a script tag in a browser:

```html
<script src="main.mjs" type="module"></script>
```
[Try the demo.](https://codesandbox.io/s/interesting-dewdney-r7th5?file=/main.mjs)

Then `import.meta.url` would contain the absolute URL to the script, e.g. `http://mysite.com/main.mjs`.  

## 2. Script's attributes

Another useful thing you can access using the `import.meta` is the data attached to the module script tag.  

For example, let's say you want to include an ES module as a script tag, but also attach to it some API key for the service
that the module provides:  

```html{1}
<script
  data-api-key="abc-0123456"
  src="my-service.mjs"
  type="module"
></script>
```

The script tag above is of type `module`, and as well has a data attribute `data-api-key` containing the API key value: `'abc-0123456'`.  

Then the browser assigns the script tag element to the `import.meta.scriptElement`, from where you can access the `api-key` data.

Here's how it works:

```javascript
const apiKey = import.meta.scriptElement.dataset.apiKey;

console.log(apiKey); // 'abc-0123456'
```

[Try the demo.](https://codesandbox.io/s/import-meta-dataset-qcbrj?file=/my-service.mjs)

## 3. Conclusion