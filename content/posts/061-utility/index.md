---
title: 'Should You Use JavaScript Utility Libraries?'
description: "Does it worth using JavaScript utility libraries like Lodash?"
published: '2019-12-31T14:00Z'
modified: '2019-12-31T14:00Z'
thumbnail: './images/javascript-utility-libraries-8.png'
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

## 2. The pros of utilities

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

## 3. The cons of utilities

### 3.1 Bundle size increase

The usage of a utility comes with costs, one being the potential increase of the bundle size.  

Bundle size increases too much when you include the whole library. You should always cherry peek only the functions you need.

For example, importing `lodash` library such way:

```javascript
// Not good!
import _ from 'lodash';

_.unique([1, 1, 2, 3]); // => [1, 2, 3]
```

clutters the application with unneded functions. 

The sections [3.1 Cherry pick functions](#31-cherry-pick-functions) and [3.2 Tree shaking](#32-tree-shaking) describe the tips how to include only the used functions into the bundle.  

### 3.2 Tight coupling

The code of your application becomes tightly coupled to the utility library. Being coupled with the utility library puts you in a risk zone because you depend on the library API, bugs, maintenance. 

In case if the utility function has a bug, you'll have to wait until the library author fixes the problem.  

If later you'd like a different behavior of some utility function, you'd have to contact the author to make changes. Often the author could refuse the proposed changes because that's only your use case.  

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

### 4.2 Tree shaking

Also, because the ES2015 are defined statically, you could cherry-pick the functions by using named imports:

```javascript
import { unique } from 'lodash-es';

unique([1, 1, 2, 3]); // => [1, 2, 3]
```

`import { unique } from 'lodash-es'` picks the `unique` function from the library. 

While technically a named import loads the entire utility library, the bundlers (like webpack or rollup) that implement [tree shacking](https://webpack.js.org/guides/tree-shaking/) mechanism will try to optimize the bundle by using the code for the imported functions only. 

### 4.3 Tiny npm packages

There's an idea that instead of using the entire library as a dependency, you could use tiny npm packages for each function.  

Here's an example how you could use `debounce` and `throttle`:

```json{4-5}
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

The problem of this approach is that `lodash.debounce` and `lodash.throttle` have some code in common. But because these are independent packages, the common code is going to be duplicated into the final bundle. And even when the tree shaking is enabled, still the duplication cannot be eliminated. 

When using 2 or more functions from the same utility library, don't use the tiny npm modules. Specify the entire library as a dependency, then cherry-pick the necessary functions:

```javascript
import debounce from 'lodash-es/debounce';
import throttle from 'lodash-es/throttle';

// use debounce and throttle
```

When the functions are cherry-picked from the entire library, internally the common code is reused. In the final bundle, only 1 copy of the common code is included. 

### 4.4 Monitor bundle size

Of course, periodically it makes sense to view what is included in the bundle. There are a lot of useful tools, so let's see the ones I like. 

[Webpack Bundle Analyzer](https://www.npmjs.com/package/webpack-bundle-analyzer) is a webpack plugin that lets you visualize what's included in the JavaScript bundle:

![Webpack Bundle Analyzer](./images/webpack-bundle-analyzer.png)

Another interesting tool is [Webpack Size Plugin](https://www.npmjs.com/package/size-plugin). The plugin prints the sizes of webpack assets and the changes since the last build.

## 5. Key takeaway

Utility libraries are good for code reuse and let you concentrate on creating the application, instead of reinventing the wheel. 

As a general rule of thumb, if the function you're trying to write is already implemented by a utility library, and it has almost the same size and the same functionality, it's better to use the utility function. 

When integrating utilities, care must be taken to use only the necessary functions. There's almost never a good idea to include the whole utility into your application because it could significantly increase the bundle size of your application. 

A good approach is to cherry-pick only the necessary functions from the utility. This will guarantee a small impact on the bundle size. 

*Does it worth using utility libraries? I'd like to know your opinion!*