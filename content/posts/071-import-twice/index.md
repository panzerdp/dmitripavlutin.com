---
title: 'What Happens When a Module Is Imported Twice?'
description: 'A JavaScript module is evaluated just once. When imported multiple times from the same path, the same module instance is returned.'
published: '2020-03-10T12:00Z'
modified: '2020-03-10T12:00Z'
thumbnail: './images/import-module-twice-2.png'
slug: javascript-module-import-twice
tags: ['javascript', 'es2015', 'module']
recommended: ['javascript-modules-best-practices', 'javascript-utility-libraries']
type: post
---

Let's start the post with a question.  

The ES2015 module named `increment` contains the following code:

```javascript
// increment.js
let counter = 0;
counter++;

export default counter;
```

Then inside of another module, `consumer`, the above module `increment` is imported 2 times:

```javascript
// consumer.js
import counter1 from './increment';
import counter2 from './increment';

counter1; // => ???
counter2; // => ???
```

The question is: when the `consumer` module runs, what is the content of variables `counter1` and `counter2`?  

To answer the question, first, you need to understand how JavaScript evaluates and imports modules.  

*Before I go on, let me recommend something to you.* 

*If you want to significantly improve your JavaScript knowledge, take the  amazingly useful ["Modern JavaScript From The Beginning 2.0"](https://www.traversymedia.com/a/2147528886/FqXWyazh) by Brad Traversy. Use the coupon code "DMITRI" and get up to 20% discount!*

## 1. Module evaluation

A good way to understand how the internals of JavaScript are working is to look at the [specification](https://tc39.es/ecma262/). 

In terms of the specification, every JavaScript module is associated with a [Module Record](https://tc39.es/ecma262/#sec-abstract-module-records). The Module Record has a method `Evaluate()`, which evaluates the module:

<hr />

If this module *has already been evaluated* successfully, return `undefined`; [...]. Otherwise, transitively evaluate all module dependencies of this module and then evaluate this module.

<hr />

Thus, the same module is evaluated just once.  

Unfortunately, the question doesn't end here. How to be sure that calling 2 times the import statement with the same path returns the same module?   

## 2. Resolving the imports

The responsibility of associating the path (also named specifier) to a concrete module is performed by [HostResolveImportedModule()](https://tc39.es/ecma262/#sec-source-text-module-record-execute-module) abstract operation.  

```javascript
import module from 'path';
```

According to the specification:

<hr />

The implementation of `HostResolveImportedModule` must conform to the following requirements:

* The normal return value must be an instance of a concrete subclass of `Module Record`.
* If a `Module Record` corresponding to the pair `referencingScriptOrModule, specifier` does not exist or cannot be created, an exception must be thrown.
* Each time this operation is called with a specific `referencingScriptOrModule, specifier` pair as arguments it must *return the same `Module Record` instance* if it completes normally.

<hr />

Let's review what happens, in a human-readable manner.  

`HostResolveImportedModule(referencingScriptOrModule, specifier)` is an abstract operation that returns a module that corresponds to `referencingScriptOrModule, specifier`:

* The parameter `referencingScriptOrModule` is the current module, i.e. the module that makes the import.  
* The parameter `specifier` is the string that corresponds to the path of the module within the `import` statement.  

Finally, `HostResolveImportedModule()` says that when importing modules from the same path, the same module is imported:

```javascript
import moduleA from 'path';
import moduleB from 'path';
import moduleC from 'path';

// moduleA, moduleB and moduleC are equal

moduleA === moduleB; // => true
moduleB === moduleC; // => true
```

What's interesting is that the specification says the host (the browser, Node, or anything that tries to run JavaScript) must provide the concrete implementation of `HostResolveImportedModule()`.  

## 3. The answer

After reviewing the specification, you know that a JavaScript module is evaluated once. Also, when importing modules from the same path, the same module instance is returned.   

Let's return to the question.  

The `increment` module is always evaluated once:

```javascript
// increment.js
let counter = 0;
counter++;

export default counter;
```

No matter how many times the` increment` module is being imported, `counter++` statement is executed just once. The default exported `counter` variable has the value `1`.

Now looking at the `consumer` module:

```javascript
// consumer.js
import counter1 from './increment';
import counter2 from './increment';

counter1; // => 1
counter2; // => 1
```

`import counter1 from './increment'` and `import counter2 from './increment'` have the same path: `'./increment'`. Thus you import the same module instance.  

Finally, `counter1` and `counter2` variables inside the `consumer` both equal to `1`.  

## 4. Conclusion

Just by exploring the proposed simple question, you find the details of how JavaScript modules are evaluated and imported.  

The rules are quite simple: the same module is evaluated only once, in other words, the module-level scope is executed just once. If the module, once evaluated, is imported again, it's second evaluation is skipped and the resolved already exports are used.  

If a module is imported multiple times, but with the same specifier (i.e. path), the JavaScript specification guarantees that you'll receive the same module instance.  