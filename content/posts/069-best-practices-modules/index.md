---
title: '4 Best Practices To Write Quality JavaScript Modules'
description: 'Some good practices how to write good ES2015 JavaScript modules.'
published: '2020-02-25T12:00Z'
modified: '2020-02-25T12:00Z'
thumbnail: './images/modules-cover-11.png'
slug: javascript-modules-best-practices
tags: ['javascript', 'es2015', 'clean code']
recommended: ['javascript-arrow-functions-best-practices', 'the-path-of-software-development-craftsmanship']
type: post
commentsThreadId: javascript-modules-best-practices
---

ES2015 modules are great to organize the code of an application. Modules offer encapsulation at its best: nothing from the outside can influence how the module runs, other than using the public exported functions of the module.  

Every module does it a small part of the job. Modules can export public functions, and other modules can import public functionality.  

```javascript{1}
import { myFunc } from 'myModule';

export function myApp() {
  const result = myFunc();
  // Do something...
}
```

In this post, you will find 4 best practices on how to organize your JavaScript modules.  

## 1. Prefer named exports

Often you might encounter modules that export only one piece of functionality: a function, class, etc.  

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

> Favor named module exports to benefit from renaming refactoring and code autocomplete.  

## 2. No work during import

The module-level scope should only define functions, classes, light objects, and variables. It shouldn't do any heavy payload work, like parsing JSON configuration, etc.  

For example, you shouldn't parse configuration JSON when the module is evaluated:

```javascript{3}
export const configuration = {
  // Bad
  data: JSON.parse(bigJSON)
};
```

When the module is imported, the parsing of `bigJSON` happens during import:

```javascript
// Bad: parsing happens when the module is imported
import { configuration } from 'configuration';

export function MyApp() {
  return <h1>{configuration.data.siteName}</h1>;
}
```

The import of a module should perform minimum work. Let the consumer of the module decide when it's the right time to perform the heavy operations.  

Regarding the parsing configuration example, one solution is to perform lazy parsing. Here's how you could refactor `parseConfiguration` module:

```javascript{5}
let parsedData = null;

export const configuration = {
  // Good
  get data() {
    if (parsedData === null) {
      parsedData = JSON.parse(bigJSON);
    }
    return parsedData;
  }
};
```

`data` property is defined as a getter. The getter parses `bigJSON` only when the consumer accesses the configuration data. This optimization increases the [time to interactive](https://developers.google.com/web/tools/lighthouse/audits/time-to-interactive).  

> When imported, the module shouldn't execute any heavy work. Rather, the module should use lazy initialization and let the consumer decide the right time to perform heavy operations.  

## 3. Favor high cohesive modules

The functions, classes or variables of a high cohesive module are closely related. They are focused to perform a single task.  

For example, the following module `formatDate` is highly cohesive because the functions are closely related and focus on date formatting.  

```javascript
// formatDate.js
const MONTHS = [];

function getMonthName(monthIndex) {

}

export function formatDate(date) {
  return ``
}
```

`getMonthName()`, `formatDate()` and `MONTHS` variables are closely-related to each other.  

### 3.1 The problem of low cohesion modules

On the other side, there are low cohesion modules. Those that contain components that a low related to each other.  

For example, the following `utils` module has functions that are low related to each other, and perform a different set of tasks:

```javascript
// utils.js
import cookies from 'cookies';

export function getRandomInRange(start, end) {
  return start + Math.floor((end - start) * Math.random());
}

export function pluralize(itemName, count) {
  return count > 1 ? `${itemName}s` : itemName;
}

export function cookieExists(cookieName) {
  const cookiesObject = cookie.parse(document.cookie);
  return cookieName in cookiesObject;
}
```

The 3 functions that the module contain `getRandomInRange()`, `pluralize()` and `cookieExists()` perform different tasks: generate a random number, format a string and check the existence of a cookie. That's the sign of a low cohesion module.  

Because the low cohesion module focuses on multiple tasks that are not related, it's difficult to reason about such a module.  

Plus, the low cohesion module forces its consumer to depend on modules that it doesn't always need, i.e. it creates unneeded transitive dependencies.  

For example, the component `ShoppingCartCount` imports `pluralize()` function from `utils` module:

```jsx
// ShoppingCartCount.jsx
import { pluralize } from 'utils';

export function ShoppingCartCount({ count }) {
  return (
    <div>
      Shopping cart has {pluralize('product', count)}
    </div>
  );
}
```

While `ShoppingCartCount` module uses only the `pluralize()` function out of the `utils` module, it has a transitive dependency on the `cookies` module.  

The good solution is to split the low cohesion modules into several high cohesive ones.  

> Favor high cohesive modules whose functions, classes, variables are closely related and perform a common task. Refactor big low cohesion modules by splitting them into multiple high cohesive modules.  

## 4. Avoid long relative paths

It's kind of difficult to understand the path of a module that contains one, or even more parent folders:

```javascript{1-2}
import { compareDates } from '../../date/compare';
import { formatDate }   from '../../date/format';

// Use compareDates and formatDate
```

While having one parent selector `../` is usually not a problem, having 2 or more is generally difficult to grasp.  

That's why I'd recommend to avoid the parent folders in favor of absolute paths:

```javascript{1-2}
import { compareDates } from 'utils/date/compare';
import { formatDate }   from 'utils/date/format';

// Use compareDates and formatDate
```

While the absolute paths are sometimes longer to write, using them makes it clear the location of the imported module.  

You can introduce new root directories to avoid the problem of the relative paths. This is possible using [babel-plugin-module-resolver](https://github.com/tleunen/babel-plugin-module-resolver#readme), for example.  

> Use absolute paths (optionally adding new shortcut root directories) instead of the long relative paths.  

## 5. Conclusion

The JavaScript modules are great to split the logic of your application into small, self-contained chunks.  

To make the usage of JavaScript modules even more productive, you can apply a few best practices.  

By using named exports instead of default exports, you could benefit from easier renaming refactoring and editor autocomplete assistance when importing the named component.

The sole purpose of `import { myFunc } from 'myModule'` is to import `myFunc` component, and nothing more. The module-level scope of `myModule` should only define classes, functions, or variables with light content.  

How many functions or classes a component should have, and how do these components should relative to each one? The answer is to favor modules of high cohesion: its components should be closely related and perform a common task.  

Long relative paths containing many parent folders `../` are difficult to understand. Refactor them to absolute paths.  

