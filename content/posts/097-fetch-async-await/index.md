---
title: "How to use Fetch with async/await"
description: "How to use Fetch API with async/await syntax in JavaScript."
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

On the other side, JavaScript provides the [async/await](/javascript-async-await/) syntax to easily handle the asynchronous operations, like data fetching, in a sync manner.  

While the Fetch API is pretty good, sometimes you might be surprised how it works. For example, if the http request ended in status `4xx` or `5xx`, the fetch doesn't reject the promise. 

In this post I'm going to show the most common scenarios how you would need to use Fetch API with async/await syntax, so you could avoid any surpises and become confident on how to fetch data and handle error or corrupt data.  

## 1. Common fetch request

## 2. JSON fetch request

## 3. Handling server error on fetch request

## 4. Cancelling a fetch request

## 5. Fetch request with progress

## 6. Summary