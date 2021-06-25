---
title: "How to Dynamically Import ECMAScript Modules"
description: "How to use import(pathToModule) to dynamically import ECMAScript modules in JavaScript."  
published: "2021-06-10T18:40Z"
modified: "2021-06-19T14:20Z"
thumbnail: "./images/cover.png"
slug: ecmascript-modules-dynamic-import
tags: ['javascript', 'module']
recommended: ['ecmascript-modules-nodejs', 'javascript-modules-best-practices']
type: post
---

ECMAScript (aka ES2015, or ES) modules are a way to organize cohesive chunks of code in JavaScript.  

ES modules system has 2 actors:  

1. The *importing* module &mdash; the one that uses `import { func } from './myModule.js'`
2. The *imported* module &mdash; the one which exports `export const func = () => {}`. 

The importing module uses `import` syntax to import a dependency:

```javascript
// The importing module
import { concat } from './concatModule.js';

concat('a', 'b'); // => 'ab'
```

While the imported module exports its components using `export` syntax:

```javascript
// The imported module exports components
export const concat = (paramA, paramB) => paramA + paramB;
```

`import { concat } from './concatModule.js'` way of using ES modules is *static*: meaning that the dependencies between modules are known at compile time.  

While static importing works in most situations, sometimes you'd like to save the client's bandwidth and load modules conditionally.  

You can import modules dynamically if you use `import` as a function &mdash; `import(pathToModule)`. Dynamic import is a JavaScript language feature starting ES2020.  

Let's see how dynamic import works, and when you might find it useful.  

## 1. Dynamic import of modules

When the `import` keyword is used as a function rather than as a static import syntax:

```javascript
const module = await import(path);
```

It returns a promise and starts an asynchronous task to load the module. If the module was loaded successfully, then the promise resolves to the module content, otherwise, the promise rejects.   

`path` can be any expression that evaluates to a string indicating a path. Valid path expressions are:

```javascript
// Classic string literals
const module1 = await import('./myModule.js');

// A variable
const path = './myOtherModule.js';
const module2 = await import(path);

// Function call
const getPath = (version) => `./myModule/versions/${version}.js`;
const moduleVersion1 = await import(getPath('v1.0'));
const moduleVersion2 = await import(getPath('v2.0'));
```

Because the `import(path)` returns a promise, it fits great with the `async/await` syntax. For example, lets load a module inside of an asynchornous function:

```javascript{2}
async function loadMyModule() {
  const myModule = await import('./myModule.js');
  // ... use myModule
}

loadMyModule();
```

Now, knowing how to load the module, let's see how to extract components (default or named) from the imported module.  

## 2. Importing components

### 2.1 Importing of *named* exports

Let's consider the following module, named `namedConcat.js`:

```javascript
// namedConcat.js
export const concat = (paramA, paramB) => paramA + paramB;
```

`namedConcat` performs a named export of the `concat` function.  

If you'd like to dynamically import `namedConcat.js`, and access the named export `concat`, then simply destructure the resolved module object by the named export name:

```javascript{2}
async function loadMyModule() {
  const { concat } = await import('./namedConcat.js');
  concat('b', 'c'); // => 'bc'
}

loadMyModule();
```

### 2.2 Importing of *default* export

In case if the imported module exports as a default, you can access the default import using by reading the `default` property from the module object.  

Let's say that `defaultConcat.js` exports  function as a `default` export:

```javascript
// defaultConcat.js
export default (paramA, paramB) => paramA + paramB;
```

When importing `defaultConcat.js` dynamically, and specifically accessing the `default` export, what you need is simply to read the `default` property. 

But there's a nuance. `default` is a keyword in JavaScript, so it cannot be used as a variable name, so you simply use destructuring with aliasing:

```javascript
async function loadMyModule() {
  const { default: defaultImport } = await import('./defaultConcat.js');
  defaultImport('b', 'c'); // => 'bc'
}

loadMyModule();
```

### 2.3 Importing mixed content

If the imported module exports `default` and multiple named exports, then you can easily access all these components using a single destructuring:

```javascript
async function loadMyModule() {
  const { 
    default: defaultImport,
    namedExport1,
    namedExport2
  } = await import('./mixedExportModule.js');
  // ...
}

loadMyModule();
```

## 3. When to use dynamic import

I recommend using dynamic import when importing big modules under certain conditions.  

E.g. you might use the module from time to time, depending on runtime conditions. Or you might want to load different big modules, also depending on certain runtime conditions.  

```javascript
async function execBigModule(condition) {
  if (condition) {
    const { funcA } = await import('./bigModuleA.js');
    funcA();
  } else {
    const { funcB } = await import('./bigModuleB.js');
    funcB();
  }
}

execBigModule(true);
```

For small modules (like `namedConcat.js` or `defaultConcat.js` from the previous example), with a few dozens of lines of code, the dynamic import doesn't worth the hassle.  

## 4. Conclusion

When calling `import(path)` as a function with an argument indicating the specifier (aka path) to a module, then you're going to dynamically load that module.  

`const module = await import(path)` returns a promise that resolves to an object containing the components of the imported module. 

In that object the `default` property contains the default export, and the named exports have the corresponding properties with the same name:

```javascript
const { 
  default: defaultComponent, 
  namedExport1,
  namedExport2
} = await import(path);
```

The dynamic import is supported by both Node.js (version 13.2 and above) and [most modern browsers](https://caniuse.com/es6-module-dynamic-import).  

*What other interesting use cases of the dynamic import do you know? Share your idea in a comment below!*