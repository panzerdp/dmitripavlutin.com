---
title: "How to Timeout a Fetch Request"
description: "In this post I explain how to timeout Fetch API requests using Abort controller."
published: "2020-10-27T12:00Z"
modified: "2020-10-27T12:00Z"
thumbnail: "./images/cover-2.png"
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

