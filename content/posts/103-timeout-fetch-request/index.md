---
title: "How to Timeout a fetch() Request"
description: "How to timeout fetch() API requests using setTimeout() and abort controller."
published: "2020-10-27T12:00Z"
modified: "2020-10-27T12:00Z"
thumbnail: "./images/cover-5.png"
slug: timeout-fetch-request
tags: ['fetch']
recommended: ['javascript-fetch-async-await', 'javascript-async-await']
type: post
commentsThreadId: timeout-fetch-request
---

When developing an application that makes requests over the network, the first rule to remember is *don't rely on the network*.  

The network is unreliable because an HTTP request or response can fail for many reasons: 

* The user is offline
* DNS lookup failed
* The server doesn't respond
* The server responds but with an error
* and more.  

Users are OK to wait up to 8 seconds for simple requests to complete. That's why you need to set a timeout on the network requests, and inform the user after 8 seconds about the network problems.  

In this post, I'm going to show you have to use `setTimeout()`, Abort controller and fetch() API to start requests with a configurable timeout time.  

## 1. Default fetch() timeout

If you start a `fetch()` request, without putting any control on timeout, by default the request timeouts as the browser indicates. In Chrome a network request timeouts at 300 seconds, while in Firefox at 90 seconds.  

```javascript
async function fetchGames() {
  const response = await fetch('http://games.com/list');
  // fetch() timeouts at 300 seconds in Chrome
  const games = await response.json();
  return games;
}
```

300 seconds and even 90 seconds are way more than a user would expect a simple network request to complete.  

## 2. Timeout a fetch() request

Here's a possible implementation of a fetch() request that timeout:

```javascript
async function fetchWithTimeout(resource, options) {
  const { timeout = 8000 } = options;
  
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  const response = await fetch(resource, {
    ...options,
    signal: controller.signal  
  });
  clearTimeout(id);

  return response;
}
```

Let's see quickly how it works.  

First, `const { timeout = 8000 } = options` extracts the timeout in milliseconds from the `options` object. If no timeout property is setup, then it default to `8000` (8 seconds).  

`const controller = new AbortController()` creates an instance of the [Abort controller](https://developer.mozilla.org/en-US/docs/Web/API/AbortController). This is the controller that let's you stop `fetch()` requests at will.  

`const id = setTimeout(() => controller.abort(), timeout)` starts a timing function. After `timeout` time, if the timining function wasn't cleared, `controller.abort()` is going to abort (or cancel) the fetch request.  

Next line `await fetch(resource, { ...option, signal: controller.signal })` starts properly the fetch request. Note that the special property `singal` assigned with `controller.singla`: this is how you make the `fetch()` request being controlled by the abort controller.  

Finally, `clearTimeout(id)` clears the abort timining function.  

Now here's how to use `fetchWithTimeout()`:

```javascript
async function fetchGames() {
  const response = await fetchWithTimeout('http://games.com/list', {
    timeout: 6000
  });
  // Request timeouts at 6 seconds
  const games = await response.json();
  return games;
}
```

`fetchWithTimeout()` (instead of simple `fetch()`) starts a request, where also you can indicate in the options argument the `timeout` time.  

If the request to `http://games.com/list` hasn't finished in up to 6 seconds, then the request is aborted and a timeout error is thrown.  

## 3. Be aware of the wrong solution


## 4. Summary

You might need to check the [browser support](https://caniuse.com/?search=abort%20controller) of abort controller, because as of 2020 it is an experimental technology. There's also a [polyfill](https://github.com/mo/abortcontroller-polyfill) for it.