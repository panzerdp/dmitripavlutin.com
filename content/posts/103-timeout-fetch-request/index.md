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
async function FetchGames() {
  const response = await fetch('http://games.com/list');
  // fetch() timeouts at 300 seconds in Chrome
  const games = await response.json();
  return games;
}
```

300 seconds and even 90 seconds are way more than a user would expect a simple network request to complete.  



## 2. Timeout a fetch() request



## 3. Be aware of the wrong solution