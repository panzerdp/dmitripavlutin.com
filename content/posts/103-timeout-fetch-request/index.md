---
title: "How to Timeout a fetch() Request"
description: "How to use setTimeout(), the abort controller, and fetch() API to make requests with a configurable timeout."
published: "2020-10-27T09:00Z"
modified: "2020-12-03T08:00Z"
thumbnail: "./images/cover-2.png"
slug: timeout-fetch-request
tags: ['fetch']
recommended: ['javascript-fetch-async-await', 'javascript-async-await']
type: post
---

When developing an application that uses the network, the first rule to remember is *don't rely on the network*.  

The network is unreliable because an HTTP request or response can fail for many reasons: 

* The user is offline
* DNS lookup failed
* The server doesn't respond
* The server responds but with an error
* and more.  

Users are OK to wait up to 8 seconds for simple requests to complete. That's why you need to set a timeout on the network requests and inform the user after 8 seconds about the network problems.  

I'm going to show you how to use `setTimeout()`, the abort controller, and `fetch()` API to make requests with a configurable timeout time (interesting demos included!).

## 1. Default fetch() timeout

By default a `fetch()` request timeouts at the time indicated by the browser. In Chrome a network request timeouts at 300 seconds, while in Firefox at 90 seconds.  

```javascript
async function loadGames() {
  const response = await fetch('/games');
  // fetch() timeouts at 300 seconds in Chrome
  const games = await response.json();
  return games;
}
```

300 seconds and even 90 seconds are way more than a user would expect a simple network request to complete.  

In the [demo](https://codesandbox.io/s/strange-merkle-xqs7n?file=/src/index.html:271-470) the `/games` URL was configured to respond in 301 seconds. Click *Load games* button to start the request, and it will timeout at 300 seconds (in Chrome).  

## 2. Timeout a fetch() request

`fetch()` API by itself doesn't allow canceling programmatically a request. To stop a request at the desired time you need additionally an [abort controller](https://developer.mozilla.org/en-US/docs/Web/API/AbortController).  

The following `fetchWithTimeout()` is an improved version of `fetch()` that creates requests with a configurable timeout:

```javascript
async function fetchWithTimeout(resource, options = {}) {
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

First, `const { timeout = 8000 } = options` extracts the timeout param in milliseconds from the `options` object (defaults to 8 seconds).   

`const controller = new AbortController()` creates an instance of the [abort controller](https://developer.mozilla.org/en-US/docs/Web/API/AbortController). This controller lets you stop `fetch()` requests at will. Note that for each request a new abort controlled must be created, in other words, controllers aren't reusable.   

`const id = setTimeout(() => controller.abort(), timeout)` starts a timing function. After `timeout` time, if the timining function wasn't cleared, `controller.abort()` is going to abort (or cancel) the fetch request.  

Next line `await fetch(resource, { ...option, signal: controller.signal })` starts properly the fetch request. Note the special `controller.signal` value assigned to `signal` property: it connectes `fetch()` with the abort controller.  

Finally, `clearTimeout(id)` clears the abort timing function if the request completes faster than `timeout` time.  

Now here's how to use `fetchWithTimeout()`:

```javascript
async function loadGames() {
  try {
    const response = await fetchWithTimeout('/games', {
      timeout: 6000
    });
    const games = await response.json();
    return games;
  } catch (error) {
    // Timeouts if the request takes
    // longer than 6 seconds
    console.log(error.name === 'AbortError');
  }
}
```

`fetchWithTimeout()` (instead of simple `fetch()`) starts a request that cancels at `timeout` time &mdash; 6 seconds.

If the request to `/games` hasn't finished in 6 seconds, then the request is canceled and a timeout error is thrown.

You can use the expression `error.name === 'AbortError'` inside the `catch` block to determine if there was a request timeout.  

Open the [demo](https://codesandbox.io/s/stoic-dust-cctin?file=/src/index.html) and click *Load games* button. The request to `/games` timeouts because it takes longer than 6 seconds.  

## 3. Summary

By default a `fetch()` request timeouts at the time setup by the browser. In Chrome, for example, this setting equals 300 seconds. That's way longer than a user would expect for a simple network request to complete.  

A good approach when making network requests is to configure a request timeout of about 8 - 10 seconds.  

As shown in the post, using `setTimeout()` and abort controller you can create `fetch()` requests configured to timeout when you'd like to.  

Check the [browser support](https://caniuse.com/?search=abort%20controller) of the abort controller because as of 2020 it is an experimental technology. There's also a [polyfill](https://github.com/mo/abortcontroller-polyfill) for it.  

Please note that without the use of an abort controller there's no way you can stop a `fetch()` request. Don't use solutions like [this](https://stackoverflow.com/a/46946573/1894471).  

*What other good practices regarding network requests do you know?*