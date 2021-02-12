---
title: "How to Greatly Enhance fetch() with the Decorator Pattern"
description: "How to use the decorator pattern to enhance the possibilities and flexibily of fetch() API."
published: "2021-02-16T12:00Z"
modified: "2021-02-16T12:00Z"
thumbnail: "./images/cover.png"
slug: enhance-fetch-with-decorator-pattern
tags: ['fetch', 'decorator pattern', 'async await']
recommended: ['javascript-fetch-async-await', 'timeout-fetch-request']
type: post
---

## 1. fetch() is good, but you want better

`fetch()` API lets you perform network requests in web applications.   

`fetch()` usage is pretty straigforward: invoke `fetch('/movies.json')` to start the request. When the request completes, 
you get a [Response](https://developer.mozilla.org/en-US/docs/Web/API/Response) object from where you can extract data.  

Here's a simple example of how to fetch some movies, in JSON format, from `/movies.json` URL:

```javascript
async function executeRequest() {
  const response = await fetch('/movies.json');
  const moviesJson = await response.json();
  console.log(moviesJson);
}

executeRequest(); 
// logs [{ name: 'Heat' }, { name: 'Alien' }]
```

However, if you've used `fetch()` in your web application, soon you would have noticed you have to write *lots of boilerplate*.  

For example, as shown in the above code snippet, you have to manually extract the JSON object from the response: `moviesJson = await response.json()`. Doing it one time &mdash; not a problem. But if your application does many requests, extracting everything time the JSON object using `await response.json()` is tedious.  

That's why is tempting to use a 3rd party library, like [axios](https://github.com/axios/axios), that greatly simplifies the handling of requests. Consider the same fetching of movies using `axios`:

```javascript
async function executeRequest() {
  const moviesJson = await axios('/movies.json');
  console.log(moviesJson);
}

executeRequest(); 
// logs [{ name: 'Heat' }, { name: 'Alien' }]
```

`moviesJson = await axios('/movies.json')` returns the actual JSON response. You don't have to manually extract the JSON like `fetch()` requires you to do.  

But using a helper library like `axios` brings its own set of problems. First, it *increases the bundle size* of your web application. Secondly, you depend on the quality of the 3rd party library: you get all the benefits, but also you *get all the bugs*. In other words, your application couples with that library.   

Alternatively to using `axios`, I'm going to show you how to apply the decorator pattern and increase the flexibility and possibilities of `fetch()` API. 

## 2. Decorated fetch()