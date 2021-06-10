---
title: "Dynamic Import of ECMAScript Modules"
description: "How to import dynamically ECMAScript Modules in JavaScript"  
published: "2021-06-10T13:00Z"
modified: "2021-06-10T13:00Z"
thumbnail: "./images/cover-4.png"
slug: ecmascript-modules-dynamic-import
tags: ['javascript', 'module']
recommended: ['ecmascript-modules-nodejs', 'javascript-modules-best-practices']
type: post
---

ECMAScript (aka ES2015, or ES) modules are a way to organize cohesive chunks of code in JavaScript.  

ES modules system has 2 actors: 

1. The *importing* module 
2. The *imported* module.  

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

This way of using ES modules is *static*: meaning that the dependencies between modules is known at compile time.  

While static importing works in most of the situations, sometimes you'd like to safe client's bandwidth 
and load modules conditionally.  

To make it happen you can use the new dynamic importing of modules using `import` syntax in a different way: like a function. This feature is
a standard JavaScript language feature starting ES2020.  

Let's see how dynamic import works.   


## 1. Dynamic import of modules

When the `import` keyword is used as a function rather than as a static import syntax:

```javascript
promise = import(moduleSpecifier);
```

For example, lets load 

```javascript
async function loadMyModule() {
  const myModule = await import('./myModule');
  // ... use myModule
}

loadMyModule();
```

it returns a promise, and starts an asynchornous task of loading the module. If the module was loaded successfully, then the promise resolves to the module content, otherwise the promise rejects.   

## 2. Named dynamic import

Let's consider the following imported module, named `namedConcat.js`:

```javascript
// namedConcat.js
export const concat = (paramA, paramB) => paramA + paramB;
```

As you can see, it performs a named exports of the `concat` function.  

If you'd like to dynamically import `namedConcat.js`, and specifically import the named component `concat`, then simple destructure the resolved object:

```javascript
async function loadMyModule() {
  const { concat } = await import('./namedConcat');
  concat('b', 'c'); // => 'bc'
}

loadMyModule();
```

## 3. Default dynamic import

In case if the imported module exports as a default, you can easily have access to the dynamic default import using `default` property.  

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

## 4. When to use dynamic import

I recommend to use dynamic import when you're unsure whether you'll the module or not. Also, a rule of thumb is to dynamically import modules that are relatively big size.   

For small module (e.g. `namedConcat.js` or `defaultConcat.js` from the previous example), with a few dozens of line of code, then dynamic import usually doesn't worth the hassle.  

## 5. Conclusion

When calling `import` as a function with an argument indicating the specifier (aka path) to a module, then you're going to dynamically load that module.  

In such case `promise = import(pathToModule)` returns a promise that resolves to an object containing the components of the imported module.  

The dynamic import is supported by both Node.js and most of the modern browsers.  