---
title: "How to Dynamically Import ECMAScript Modules"
description: "How to use import(pathToModule) to dynamically import ECMAScript modules in JavaScript."  
published: "2021-06-10T18:40Z"
modified: "2021-06-10T18:40Z"
thumbnail: "./images/cover.png"
slug: ecmascript-modules-dynamic-import
tags: ['javascript', 'module']
recommended: ['ecmascript-modules-nodejs', 'javascript-modules-best-practices']
type: post
---

ECMAScript (aka ES2015, or ES) modules are a way to organize cohesive chunks of code in JavaScript.  

ES modules system has 2 actors:  

1. The *importing* module &mdash; the one that uses `import { func } from './myModule'`
2. The *imported* module &mdash; the one which exports `export const func = () => {}`. 

The importing module is the one that uses `import` syntax to import a dependency:

```javascript
// The importing module
import { concat } from './concatModule';

concat('a', 'b'); // => 'ab'
```

While the imported module uses the `export` syntax to export components from itself:

```javascript
// The imported module exports components
export const concat = (paramA, paramB) => paramA + paramB;
```

`import { concat } from './concatModule'` way of using ES modules is *static*: meaning that the dependencies between modules are known at compile time.  

While static importing works in most situations, sometimes you'd like to save the client's bandwidth and load modules conditionally.  

To make it happen you can use the new dynamic importing of modules using `import(pathToModule)` syntax in a different way: as a function.  Dynamic import is a JavaScript language feature starting ES2020.  

Let's see how dynamic import works.   


## 1. Dynamic import of modules

When the `import` keyword is used as a function rather than as a static import syntax:

```javascript
const module = await import(pathToModule);
```

it returns a promise and starts an asynchronous task of loading the module. If the module was loaded successfully, then the promise resolves to the module content, otherwise, the promise rejects.   

Note that `pathToModule` can be any expression that evaluates to a string indicating the imported module path. Valid values are regular string literals (like `./myModule`) or variables having strings.  

For example, lets load a module inside of an asynchornous function:

```javascript{2}
async function loadMyModule() {
  const myModule = await import('./myModule');
  // ... use myModule
}

loadMyModule();
```

What's interesting is that, contrary to static import, the dynamic import accepts expressions that evaluate to the module path:

```javascript{2}
async function loadMyModule(pathToModule) {
  const myModule = await import(pathToModule);
  // ... use myModule
}

loadMyModule('./myModule');
```

Now, knowing how to load the module, let's see how to extract the components from the imported module.  

## 2. Importing components

### 2.1 Importing of *named* exports

Let's consider the following module, named `namedConcat.js`:

```javascript
// namedConcat.js
export const concat = (paramA, paramB) => paramA + paramB;
```

Note that it performs a named export of the `concat` function.  

If you'd like to dynamically import `namedConcat.js`, and access the named export `concat`, then simply destructure the resolved module object by the named export name:

```javascript{2}
async function loadMyModule() {
  const { concat } = await import('./namedConcat');
  concat('b', 'c'); // => 'bc'
}

loadMyModule();
```

### 2.2 Importing of *default* export

In case if the imported module exports as a default, you can easily have access to the dynamic default import using the `default` property.  

Let's say that `defaultConcat.js` exports the `concat` function as a `default` export:

```javascript
// defaultConcat.js
export default (paramA, paramB) => paramA + paramB;
```

On the dynamically importing module, you can access the `default` import accessing the `default` property.  

```javascript
async function loadMyModule() {
  const { default: defaultImport } = await import('./defaultConcat');
  defaultImport('b', 'c'); // => 'bc'
}

loadMyModule();
```

Note that `default` is a keyword in JavaScript, so it cannot be used as a variable name. 

### 2.3 Importing mixed content

If the imported component contains default, as well as multiple named exports, then you can easily access all these components using a single destructuring statement:

```javascript
async function loadMyModule() {
  const { 
    default: defaultImport,
    namedExport1,
    namedExport2
  } = await import('./mixedExportModule');
  // ...
}

loadMyModule();
```

## 3. When to use dynamic import

I recommend using dynamic import when importing big modules, conditionally.  

E.g. you might use the module from time to time, depending on runtime conditions. Or you might want to load different big modules, also depending on certain runtime conditions.  

```javascript
async function execBigModule(condition) {
  if (condition) {
    const { funcA } = await import('./bigModuleA');
    funcA();
  } else {
    const { funcB } = await import('./bigModuleB');
    funcB();
  }
}

execBigModule(true);
```

For small modules (like `namedConcat.js` or `defaultConcat.js` from the previous example), with a few dozens of lines of code, the dynamic import normally doesn't worth the hassle.  

## 4. Conclusion

When calling `import(pathToModule)` as a function with an argument indicating the specifier (aka path) to a module, then you're going to dynamically load that module.  

In such a case `module = await import(pathToModule)` returns a promise that resolves to an object containing the components of the imported module.  

The dynamic import is supported by both Node.js (version 13.2 and above) and [most modern browsers](https://caniuse.com/es6-module-dynamic-import).  

Next, I recommend checking my post on [4 Best Practices to Write Quality JavaScript Modules](/javascript-modules-best-practices/).