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

The specifics of Frontend development is that you have to always monitor the bundle size of the application in order not to include too much libraries.  

However, a good part of software develpment consists of not reinventing the wheel: should I include that utility library (lodash, ramda, date-fns, etc) or should you write that utility function by yourself? 

That's a good question. I'm glad you're asking it yourself because no user likes to download megabytes of bundles.  

In this post you will find the reasons when you should include the utility libraries in your code. And more importantly, how to do it correctly in order to have the minimum bundle size as result.  

## 1. The pros

### 1.1 Prevents reinventing the wheel

The main benefit of using an utility library is the code reuse. Instead of reinventing the wheel, it's wiser to explore if the problem wasn't solved already.  

For example, you'd like to find the unique items of an array you can:

1) Write the function by yourself. 
2) You can use an utility library like lodash that provides `_.unique(array)`.  

### 1.2 Quality

Another important benefit of utility libraries is that they are usually:

1. Well tested
2. Well documented
3. Performance tuned
4. "Bullet proofed" by the community

So if you're integrating a specific utility function in your code, you can be sure that it was tested by lots of developers. This guarantees that the quality of the utility function is at a high level.

## 2. The cons

### 2.1 Bundle size increase

Of course, the usage of an utility comes with a cost, the most significant one is by increasing the bundle size.  

But note that this problem is significant if you include the whole library inside of your application:

```javascript
// Not good!
const _ = require('lodash');

_.unique([1, 1, 2, 3]); // => [1, 2, 3]
```

The section [3.1 Cherry pick functions](#31-cherry-pick-functions) addresses this problem.  

### 2.2 Coupling

Another problem is that the code of your application becomes tighly coupled to the utility library.  

In case if the utility function has a bug, you'll have to wait until the author of the library fixes the problem.  

Also, if later you'd like a slighly different behavior of the utility function, you'd have to contact the author for changes. And quite often the author could refuse the proposed changes because that's only your use case.  

Being coupled with the utility library puts you in a risk zone because you depend on the library maintaince. 

## 3. The tips

### 3.1 Cherry pick functions

To avoid the increasing of bundle size when using the utility library is to cherry pick the utility functions.  

In case of lodash library, you could use the lodash build that has the utility functions in form of ES2015 modules: `lodash-es`.  

For example, here's how you could cherry pick `unique()` function:

```javascript
import unique from 'lodash-es/unique';

unique([1, 1, 2, 3]); // => [1, 2, 3]
```

`import unique from 'lodash-es/unique'` picks only the `unique` function from the library. It guarantees the minimal bundle size.  

### 3.2 Tree shaking

Also, because the ES2015 are defined statically, you could cherry pick the functions by using named imports:

```javascript
import { unique } from 'lodash-es';

unique([1, 1, 2, 3]); // => [1, 2, 3]
```

`import { unique } from 'lodash'` picks the `unique` function from the library. 

While technically a named import loads the entire utility library, the bundlers (like webpack or rollup) that implement [tree shacking](https://webpack.js.org/guides/tree-shaking/) mechanism will try to optimize the bundle by using the code for the imported functions only.  

### 3.3 Tiny npm modules

There's an idea that instead of using the entire library as a dependency, you could use the tiny npm modules for each function.  

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

// use doubounce and throttle
```

The problem of this approach is that `lodash.debounce` and `lodash.throttle` have some code in common. But because these are independent packages, the common code is going to be duplicated into the final bundle. And even when the tree shaking is enabled, still the duplication cannot be eliminated.  

So, in case when using 2 or more function from the same utility library, avoid using the tiny npm modules. Specify the entire library as a dependency, then cherry pick the necessary functions:

```javascript
import debounce from 'lodash-es/debounce';
import throttle from 'lodash-es/throttle';

// use doubounce and throttle
```

When the functions are cherry picked from the entire library, internally the common code is reused. In the final bundle only 1 copy of the common code is included.  

### 3.4 Monitor bundle size

Of course, periodically it makes sense to view what is included in the bundle. There are lot of useful tools, so let's see the ones I like.  

[Webpack Bundle Analyzer](https://www.npmjs.com/package/webpack-bundle-analyzer) is a webpack plugin that let's you visualize what's included in the JavaScript bundle:

![Webpack Bundle Analyzer](./images/webpack-bundle-analyzer.png)

Another interesting tool is [Webpack Size Plugin](https://www.npmjs.com/package/size-plugin). The plugin prints the sizes of webpack assets and the changes since the last build.

## 4. Key takeaway

Utility libraries are good for code reuse and let's you concentrate on creating the application, instead of reinventing the wheel.  

As a general rule of thumb, if the function you're trying to write is already implemented by a utility library, and it has almost the same size and the same functionality, it's better to use the utility function.  

When integrating utilities, care must be taken to use only the necessary functions. There's almost never a good idea to include the whole utility into your application, because it could significantly increase the bundle size of your application.  

A good approach is to cherry pick only the necessary functions from the utility. This will guarantee a small impact on the bundle size.  

*Does it worth using utility libraries? Please write your opinion in a comment below!*