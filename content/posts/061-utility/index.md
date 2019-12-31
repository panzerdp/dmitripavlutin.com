---
title: 'How To Use Correctly JavaScript Utility Libraries'
description: "How to efficiently integrate JavaScript utility libraries into your application and minimize the increase of bundle size."
published: '2019-12-31T14:00Z'
modified: '2019-12-31T14:00Z'
thumbnail: './images/javascript-utility-libraries-9.png'
slug: javascript-utility-libraries
tags: ['javascript']
recommended: ['announcing-voca-the-ultimate-javascript-string-library', 'become-better-software-developer-digging-climbing']
type: post
commentsThreadId: javascript-utility-libraries
---

Big JavaScript bundles is a common performance problem of the Frontend development. Nobody likes slow and heavy applications.  

An impact on the bundle size have the utility libraries: collections of functions implementing common tasks (finding unique items of an array, formatting dates, etc). Examples of utility libraries in JavaScript are Lodash, Ramda, Date-fns, Math.js.  

Let's discuss when it makes sense to use utility libraries. And importantly, how to integrate libraries to minimally impact the bundle size.  

## 1. My rule of thumb

If the following is true:

> Writing the solution by yourself would look similarly to the solution provided by the utility library.  

then it's good to use the utility library.  

In simple words, you want to avoid reinventing the wheel and leverage existing solutions.  

Let's continue looking at some pros and cons of using utility libraries.  

## 2. The pros

### 2.1 Prevents reinventing the wheel

The main benefit of utility libraries is the code reuse. When facing a problem, before solving it by yourself, research if there isn't a solution already. 

For example the common problems like:

* Operations on arrays
* Complex string manipulations
* Formatting dates
* URL parse and stringify
* and alike problems

are already solved by utility libraries.  

And let's be honest. Writing *your own date formatting utility* when developing a Frontend application is wasting of time.  

### 2.2 Quality

Popular utility libraries are usually:

1. Well tested
2. Well documented
3. Performance tuned
4. "Bullet proofed" by the community

So when you're include that library, you inherit all these nice benefits.  

## 3. The cons

### 3.1 Bundle size increase

The usage of a utility comes with costs, one being the potential increase of the bundle size.  

Bundle size increases too much when you include the whole library. You should always cherry peek only the functions you need.

For example, importing `lodash` library such way:

```javascript
// Not good!
import _ from 'lodash';

_.unique([1, 1, 2, 3]); // => [1, 2, 3]
```

clutters the JavaScript bundle with functions that are not used.  

The sections [4.1 Cherry pick functions](#41-cherry-pick-functions) and [4.2 ES2015 modules enable tree shaking](#42-es2015-modules-enable-tree-shaking) describe how to include only the used functions into the bundle.  

### 3.2 Tight coupling

The code of your application becomes tightly coupled to the utility library. Being coupled with the utility library puts you in a risk zone because you depend on the library API, bugs, maintenance. 

In case if the utility function has a bug, you'll have to wait until the library author fixes the problem.  

If you'd need a different behavior of some utility function, you'd have to contact the author to make changes. Often the author could refuse the proposed changes because that's only your use case.  

Integrate only the libraries that are high quality, well tested, actively maintained, have an API that fits your *current and potential future* uses cases.  

## 4. Tips

### 4.1 Cherry pick functions

To avoid the increase of bundle size when using the utility library, a good approach is to cherry-pick the utility functions.  

For example, here's how you could cherry-pick `unique` function out of `lodash`:

```javascript
import unique from 'lodash/unique';

unique([1, 1, 2, 3]); // => [1, 2, 3]
```

`import unique from 'lodash/unique'` picks only the `unique` function from the library. It guarantees the minimal bundle size. 

Cherry-picking functions becomes daunting when you'd like to include multiple functions. Each picked function requires an import statement, which is overhelming:

```javascript
import unique from 'lodash/unique';
import flatten from 'lodash/flatten';

unique(flatten([[1, 2], [2]])) // => [1, 2]
```

The next approach using ES2015 named imports, even when importing multiple functions, requires just one import statement.  

### 4.2 ES2015 modules enable tree shaking

ES2015 modules are static: what is imported and exported doesn't change during runtime. Bundlers like Webpack and Rollup analyzing the static modules structure can eliminate the unused code. This optimization is also called [tree shaking](https://webpack.js.org/guides/tree-shaking/).   

To enable tree shaking include the ES2015 modules build of the utility library into your application. The field `module` in the `package.json` file indicates the ES2015 modules build:

```json{4}
// package.json of the utility library
{
  "name": "library",
  "module": "es/index.js", // ES2015 modules build
  "main": "index.js"
}
```

Some libraries like `lodash` publish a standalone package having ES2015 build: [lodash-es](https://www.npmjs.com/package/lodash-es).

For example, let's use `lodash-es` to import `unique` function:

```javascript
import { unique, flatten } from 'lodash-es';

unique(flatten([[1, 2], [2]])) // => [1, 2]
```

`import { unique, flatten } from 'lodash-es'` includes the `unique` and `flatten` functions from the library. Tree shacking optimization will include in the bundle only the code of `unique` and `flatten` functions only.  

### 4.3 Small focused modules

[Small focused modules](https://blog.sindresorhus.com/small-focused-modules-9238d977a92a) practice suggests that instead of using the entire library as a dependency, you could use standalone tiny npm packages for each function.  

Small focused modules are easier to reason about, are loaded much faster by the package manager. But there's one downside you should be aware of.  

For example, let's use `lodash.debounce` and `lodash.debounce` packages:

```json{5-6}
// package.json of your application
{
  "name": "my-application",
  "dependencies": {
    "lodash.debounce": "4.0.8",
    "lodash.throttle": "4.1.1"
  }
}
```

Then you could include separately these functions in your application:

```javascript
import debounce from 'lodash.debounce';
import throttle from 'lodash.throttle';

// use debounce and throttle
```

`lodash.debounce` and `lodash.throttle` have some code in common. Because these are independent packages, the common code is duplicated into the final bundle. Even having tree shaking enabled, still the duplication cannot be eliminated.  

Don't use the tiny npm packages when integrating 2 or more functions from the same utility library. Use the entire library as a dependency and cherry-pick the necessary functions to avoid the common code duplication problem:

```javascript
import debounce from 'lodash/debounce';
import throttle from 'lodash/throttle';

// use debounce and throttle
```

or use ES2015 module named import:

```javascript
import { debounce, throttle } from 'lodash-es';

// use debounce and throttle
```

The common code of `debounce` and `throttle` is reused when the functions are picked from the library. In the final bundle, only 1 copy of the common code is included.  

### 4.4 Monitor bundle size

It's wise to periodically review what's included in the JavaScript bundle. A lot of useful plugins can help you monitor the bundle size.  

[Webpack Bundle Analyzer](https://www.npmjs.com/package/webpack-bundle-analyzer) is a webpack plugin that visualizes what's included in the JavaScript bundle:

![Webpack Bundle Analyzer](./images/webpack-bundle-analyzer.png)

Another interesting tool is [Webpack Size Plugin](https://www.npmjs.com/package/size-plugin). The plugin prints the sizes of webpack assets and the changes since the last build.

## 5. Key takeaway

Utility libraries are good for code reuse and let you concentrate on creating the application, instead of reinventing the wheel. 

As a general rule of thumb, if the function you're trying to write is already implemented by a utility library, and it has almost the same size and the same functionality, it's better to use the utility function.

When integrating utilities, care must be taken to use only the necessary functions. There's almost never a good idea to include the whole utility into your application because it could significantly increase the bundle size of your application.

A good approach is to cherry-pick only the necessary functions from the utility. This will guarantee a small impact on the bundle size. 

*Does it worth using utility libraries? I'd like to know your opinion!*