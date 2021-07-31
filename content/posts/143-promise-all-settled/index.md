---
title: "How to Use Promise.allSettled()"
description: "How to use Promise.allSettled() to perform parallel async operations."
published: "2021-08-03T12:00Z"
modified: "2021-08-03T12:00Z"
thumbnail: "./images/cover.png"
slug: promise-all-settled
tags: ['javascript', 'promise', 'async']
recommended: ['promise-all', 'what-is-javascript-promise']
type: post
---

Let's say that you'd like to fetch 3 kinds of products, fruits, vegerables and nuts, that are available at the local grocerry store.  

Also you'd like to fetch these products in parallel, indipendent on each other. What helper function can help you with that?

Welcome `Promise.allSettled(promises)` helper function: which runs promises in parallel and aggregates the settle statuses (either fulfilled or rejected) into a result array.  

Let's see how `Promise.allSettled()` works.  

### 1. *Promise.allSettled()*

The helper function accepts a single argument: an array (or generally an iterable) of promises.

```javascript
const statusesPromise = Promise.allSettled(promises);
```

`Promise.allSettled()` returns a promise `statusesPromise`. 

After *all* the `promises` in the input array are being fulfilled or rejects, `statusPromise` resolves with an array where each item is either:

1. `{ status: 'fulfilled', value: value }` &mdash; if the corresponding promise resolved successfuly
2. Or `{ status: 'rejected', reason: reason }` &mdash; if the corresponding promise rejected

The promise returned by `Promise.allSettled()` *always resolves with an array of statuses*, no matter promises get resolved or rejected in the input array.