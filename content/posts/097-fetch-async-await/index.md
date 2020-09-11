---
title: "How to use Fetch with async/await"
description: "In this post, accompanied with useful demos, you'll learn how to use Fetch API with async/await syntax in JavaScript."
published: "2020-09-15T12:00Z"
modified: "2020-09-15T12:00Z"
thumbnail: "./images/cover-4.png"
slug: javascript-fetch-async-await
tags: ['fetch', 'async await']
recommended: ['javascript-async-await', 'react-fetch-lifecycle-methods-hooks-suspense']
type: post
commentsThreadId: javascript-fetch-async-await
---

The [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) has become the native way to fetch data in Frontend applications.  

While the Fetch API is pretty good, sometimes you might be surprised how it works. For example, if the http request completes with status `4xx` or `5xx`, the fetch doesn't reject the promise. 

On the other side, JavaScript provides the `async/await` syntax to easily handle the asynchronous operations.  

In this post, I'm going to show the common scenarios how to use Fetch API with async/await syntax. The goal is to make you confident on how to fetch data, handle fetch errors, cancel a fetch request, and more goodies.  

Before starting, I recommend [familiarizing](/javascript-async-await/) with `async/await` syntax. I'm going to use it extensively in the examples below.  

```toc
```

## 1. Simplest fetch request

The Fetch API fetches resources, usually accross the network. To start a fetch request, you need to call the function `fetch`:

```javascript
const response = await fetch(resource[, options]);
```

`fetch` accepts the arguments:

* `resource` can be either the URL to resource, or a [Request](https://developer.mozilla.org/en-US/docs/Web/API/Request) object  
* `options` is an object to configure the request with properties like `method` (`'GET'`, `'POST'`), `headers`, `body`, `credentials`, [and more](https://javascript.info/fetch-api).  

Calling `fetch()` starts the request and returns a promise. When the request completes, the promise is resolved with the [Response](https://developer.mozilla.org/en-US/docs/Web/API/Response) object, from where you can extract useful data.  



## 2. Fetching JSON

## 3. Handling fetch errors

## 4. Cancelling a fetch request

## 5. Parallel fetch requests

## 6. Fetch request with progress

## 7. Intercepting fetch requests

## 8. Summary