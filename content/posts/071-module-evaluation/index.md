---
title: 'What Happens When A Module Is Imported Twice?'
description: 'How is the JavaScript module evaluated.'
published: '2020-03-10T12:00Z'
modified: '2020-03-10T12:00Z'
thumbnail: './images/modules-cover-11.png'
slug: javascript-module-twice-import
tags: ['javascript', 'es2015', 'module']
recommended: ['javascript-modules-best-practices', 'javascript-utility-libraries']
type: post
commentsThreadId: javascript-module-evaluation
---

Let's start the post with a question.  

The following ES2015 module named `increment`, contains the following code:

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

When the `consumer` module runs, what is the content of variables `counter1` and `counter2`?  

To answer the question, first, you need to understand how a JavaScript module is evaluated and imported.  

## 1. Module evaluation

A JavaScript module is evaluated just once. The behavior of *single time evaluation* of the module is described in [ModuleEvaluation](http://www.ecma-international.org/ecma-262/6.0/#sec-moduleevaluation), point 4 and 5 using `Evaluated` boolean flag.  

In simple words, the module-level scope of the same module is always evaluated just once.  

Unfortunately, the question doesn't end here. How to be sure that calling 2 times the import statement with the same path returns the same module?   

## 2. Resolving the imports

Let's look at the ES2015 [specification](http://www.ecma-international.org/ecma-262/6.0/#sec-hostresolveimportedmodule):

<hr/>

The implementation of `HostResolveImportedModule(referencingModule, specifier)` must conform to the following requirements:

* The normal return value must be an instance of a concrete subclass of `Module Record`.
* If a `Module Record` corresponding to the pair `referencingModule, specifier` does not exist or cannot be created, an **exception must be thrown**.
* This operation must be idempotent if it completes normally. Each time it is called with a specific `referencingModule, specifier` pair as arguments it must return **the same Module Record instance**.  
  
<hr />

Let's see what happens, in a human-readable manner.  

`HostResolveImportedModule(referencingModule, specifier)` is an abstract operation that returns a module that corresponds to `referencingModule, specifier`. 

The parameter `referencingModule` is the current module, i.e. the module that makes the import.  The parameter `specifier` is the string that corresponds to the path of the module within the `import` statement. 

## 3. The answer

Now you know that the same JavaScript module is evaluated just once. Also, you know that from within a module, if imported from the same path, even multiple times, the same module is always returned.  

Let's look back again at the `consumer` module:

```javascript
// consumer.js
import counter1 from './increment';
import counter2 from './increment';

counter1; // => ???
counter2; // => ???
```

`import counter1 from './increment'` and `import counter2 from './increment'` have the same `specifier`: `./increment`. And because the import is executed from the same `referencingModule` (which is the current module `consumer`), you import the same module, according to `HostResolveImportedModule()`.  

At the same time one module is evaluated just once, thus inside `increment` module:

```javascript
// increment.js
let counter = 0;
counter++;

export default counter;
```

`count++` statement is executed just once, even if the module `counter` is imported 2 times inside `consumer`.  

Finally, the answer to the question is that `counter1` and `counter2` variables inside the `consumer` module both equal to `1`.  

Here's the [demo]().

## 4. Conclusion

Just by exploring this simple question, you find the underneath details of how JavaScript modules are evaluated and imported.  

The rules are quite simple: the same module is evaluated only once, in other words, the module-level scope is executed just once. If the module, once evaluated, is imported again, it's second evaluation is skipped and the resolved already exports are used.  

If a module is imported multiple times, but with the same specifier (i.e. path), the JavaScript specification guarantees that you'll receive the same module instance.  