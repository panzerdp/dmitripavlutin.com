---
title: '5 Best Practices To Write Quality JavaScript Modules'
description: 'Some good practices how to write good ES2015 JavaScript modules.'
published: '2020-02-25T12:00Z'
modified: '2020-02-25T12:00Z'
thumbnail: './images/modules-cover-9.png'
slug: javascript-modules-best-practices
tags: ['javascript', 'es2015', 'clean code']
recommended: ['javascript-arrow-functions-best-practices', 'the-path-of-software-development-craftsmanship']
type: post
commentsThreadId: javascript-modules-best-practices
---

JavaScript modules are great to organize the code of an application. Modules offer encapsulation at its best: nothing from the outside can influence how the module runs, other than using the public exported functions of the module.  

Every module does it small part of the job. Modules can export public functions, and other modules can import the public functionality.  

```javascript{1}
import { myFunc } from 'myModule';

export function myApp() {
  const result = myFunc();
  // Do something...
}
```

In this post, you will find 5 best practices how to organize your JavaScript modules. 

## 1. Prefer named exports

Often you might encouter modules that export only one piece of functionality: a function, class, etc.  

When I first started working with JavaScript modules, I had used the default syntax to export the one piece of functionality from my module. For example, a default export of a class:

```javascript{1}
export default class Greeter {
  constructor(name) {
    this.name = name;
  }

  greet() {
    return `Hello, ${this.name}!`;
  }
}
```

`export default class Greeter` is a default export that exports the class `Greeter`.  

As I've been creating more and more modules having default exports, I've noticed the difficulty in refactoring the classes or functions that were default exported. 

Additionally, the editor doesn't give autocomplete the name of the class or function that's being imported as a default.  

> If you'd like to benefit from easy renaming refactoring and import autocomplete from your text editor, I recommended to use named export instead of the default.  

If you change the module to export `Greeter` as a named export:

```javascript{1}
export class Greeter {
  constructor(name) {
    this.name = name;
  }

  greet() {
    return `Hello, ${this.name}!`;
  }
}
```

`export class Greeter` performs a named export of the `Greeter` class.  

Now you can benefit from the autocomplete when importing the named class inside the consumer module:

!!Insert the screenshot

## 2. No work during import

The top most scope of the module should only define functions, classes, light object and variables. It shouldn't do any heavy payload work, like parsing JSON configuration, etc.  

For example, you should't parse some configuration JSON when the module is evaluated:

```javascript
// parseConfiguration.js
// Bad
const configuration = JSON.parse(bigJSON);

export { configuration };
```

When the module is imported, the parsing of `bigJSON` happens during import:

```javascript
// The parse of configuration happens during import
import { configuration } from 'parseConfiguration';

// ...
```

The import of a module should perform minimum work. You should let the consumer of the module decide when it's the right time to perform the heavy work, like parsing the configuration.  

Regarding the parsing configuration example, one solution is to perform the lazy parsing. Here's how you could refactor `parseConfiguration` module:

```javascript
// parseConfiguration.js
let parsed = false;

export { }
```

## 3. Make side effects explicit

## 4. Favor small cohesive modules

## 5. Avoid parent selectors in path



## 6. Conclusion