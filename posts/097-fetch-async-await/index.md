---
title: "How to Use Fetch with async/await"
description: "How to use fetch() with async/await syntax in JavaScript: fetch JSON data, handle errors, make parallel requests, cancel requests."
published: "2020-09-15T08:40Z"
modified: "2023-01-25"
thumbnail: "./images/cover-4.png"
slug: javascript-fetch-async-await
tags: ['fetch', 'async await']
type: post
---

The [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) is the default tool for performing network operations in web applications. Although `fetch()` is generally easy to use, there are some nuances to be aware of.  

In this post, you'll find the common scenarios of how to use `fetch()` with `async/await` syntax. You'll understand how to fetch data, handle fetch errors, cancel a fetch request, and more. 

<Affiliate type="traversyJavaScript" />

<TableOfContents />

## 1. Intro to fetch()

The Fetch API accesses resources across the network. You can make HTTP requests (using `GET`, `POST` and other methods), download, and upload files.  

To start a request, call the special function `fetch()`:

```javascript
const response = await fetch(resource[, options]);
```

which accepts 2 arguments:

* `resource`: the URL string, or a [Request](https://developer.mozilla.org/en-US/docs/Web/API/Request) object  
* `options`: the configuration object with properties like `method`, `headers`, `body`, `credentials`, [and more](https://javascript.info/fetch-api).  

`fetch()` starts a request and returns a promise. When the request completes, the promise is resolved with the [Response](https://developer.mozilla.org/en-US/docs/Web/API/Response) object. If the request fails due to some network problems, the promise is rejected.   

`async/await` syntax fits great with `fetch()` because it simplifies the work with promises with syntactic sugar.      

For example, let's make a request to fetch movies:

```javascript
async function fetchMovies() {
  const response = await fetch('/movies');
  // waits until the request completes...
  console.log(response);
}
```

`fetchMovies()` is an asynchronous function since it's marked with the `async` keyword.  

`await fetch('/movies')` starts an HTTP request to `'/movies'` URL.  Because the `await` keyword is present, the asynchronous function is paused until the request completes.  

When the request completes, `response` is assigned with the response object of the request. Let's see in the next section how to extract useful data, like JSON or plain text, from the response.  

## 2. Fetching JSON

The `response` object, returned by the `await fetch()`, is a generic placeholder for multiple data formats.  

For example, you can extract the JSON object from a fetch response:

```javascript {3}
async function fetchMoviesJSON() {
  const response = await fetch('/movies');
  const movies = await response.json();
  return movies;
}

fetchMoviesJSON().then(movies => {
  movies; // fetched movies
});
```

`response.json()` is a method of the Response object that allows a JSON object to be extracted from the response. The method returns a promise, so you have to wait for the JSON: `await response.json()`.

The [Response](https://developer.mozilla.org/en-US/docs/Web/API/Response) object offers a lot of useful methods (all returning promises):

* `response.json()` returns a promise resolved to a JSON object
* `response.text()` returns a promise resolved to raw text
* `response.formData()` returns a promise resolved to [FormData](https://developer.mozilla.org/en-US/docs/Web/API/FormData)
* `response.blob()` returns a promise resolved to a [Blob](https://developer.mozilla.org/en-US/docs/Web/API/Blob) (a file-like object of raw data)
* `response.arrayBuffer()()` returns a promise resolved to an [ArryBuffer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer) (raw generic binary data)

## 3. Handling fetch errors

When I was familiarizing with `fetch()`, I was surprised that `fetch()` doesn't throw an error when the server returns a bad HTTP status, e.g. client errors (`400–499`) or server errors (`500–599`).  

For example, let's access a non-existing page `'/oops'` on the server. As expected, such request ends in a `404` response status:

```javascript
async function fetchMovies404() {
  const response = await fetch('/oops');
  
  response.ok;     // => false
  response.status; // => 404

  const text = await response.text();
  return text;
}

fetchMovies404().then(text => {
  text; // => 'Page not found'
});
```

When fetching the URL `'/oops'` the server responds with status `404` and text `'Page not found'`. Surprisingly, `fetch()` doesn't throw an error for a missing URL, but considers this as a *completed* HTTP request.  

`fetch()` rejects only if a request cannot be made or a response cannot be retrieved. This can happen during network problems: no internet connection, host not found, the server is not responding.  

Fortunately, `response.ok` property lets you distinguish good from bad HTTP response statuses. The property is set to `true` only if the response has status `200-299`.  

In the above example, the `response.ok` property is `false` because the response has the status `404`.

To throw an error on a *bad HTTP status* (outside of the range `200-299`), check the value of `response.ok` property and throw an error manually:

```javascript{3-6}
async function fetchMoviesBadStatus() {
  const response = await fetch('/oops');

  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }

  const movies = await response.json();
  return movies;
}

fetchMoviesBadStatus().catch(error => {
  error.message; // 'An error has occurred: 404'
});
```

## 4. Canceling a fetch request

Unfortunately, `fetch()` API alone doesn't allow to cancel a fetch request once started. To cancel a fetch request you need an additional tool [AbortController](https://developer.mozilla.org/en-US/docs/Web/API/AbortController). 

Connecting `fetch()` and `AbortController` requires 3 steps:

```javascript
// Step 1: instantiate the abort controller
const controller = new AbortController();

// Step 2: make the fetch() aware of controller.signal
fetch(..., { signal: controller.signal });

// Step 3: call to cancel the request
controller.abort();
```

A) Before starting the request, create an abort controller instance: `controller = new AbortController()`. 

B) When starting the request properly, use the options argument of `fetch(url, { signal: controller.signal })` and set `signal` property to be `controller.signal`.  

C) Finally, if you need to cancel the request, just call `controller.abort()` method.  

For example, let's implement 2 buttons that control a fetch request. Clicking the button *Fetch movies* starts a `fetch()` request, while clicking *Cancel fetch* aborts the request in progress:

```javascript{3,6,16}
let controller = null;

fetchMoviesButton.addEventListener('click', async () => {
  controller = new AbortController();
  try {
    const response = await fetch('/movies', { 
      signal: controller.signal 
    });
  } catch (error) {
    console.log('Fetch error: ', error);
  }
  controller = null;
});

cancelFetchButton.addEventListener('click', () => {
  if (controller) {
    controller.abort();
  }
});
```

[Open the demo.](https://codesandbox.io/p/sandbox/cancel-fetch-request-ggieh?file=%2Fsrc%2Findex.html&selection=%5B%7B%22endColumn%22%3A15%2C%22endLineNumber%22%3A28%2C%22startColumn%22%3A15%2C%22startLineNumber%22%3A28%7D%5D)

Open [the demo](https://codesandbox.io/p/sandbox/cancel-fetch-request-ggieh?file=%2Fsrc%2Findex.html&selection=%5B%7B%22endColumn%22%3A15%2C%22endLineNumber%22%3A28%2C%22startColumn%22%3A15%2C%22startLineNumber%22%3A28%7D%5D). Click *Fetch movies* to start the request, then right away click *Cancel fetch* to cancel it. This makes the active request cancel: `await fetch()` gets rejected by throwing an abort error. The `catch` block then catches the abort error.  

The abort controller instances *are not reusable*. Each time you start a `fetch()` request, you have to create a new abort controller instance for each request.  

On a side note, if you'd like to timeout a `fetch()` request, follow my post [How to Timeout a fetch() Request](/timeout-fetch-request/).  

## 5. Parallel fetch requests

To perform parallel fetch requests use the [Promise.all()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all) helper function.  

Let's start 2 parallel requests to fetch movies and categories:

```javascript{1-4}
async function fetchMoviesAndCategories() {
  const [moviesResponse, categoriesResponse] = await Promise.all([
    fetch('/movies'),
    fetch('/categories')
  ]);

  const movies = await moviesResponse.json();
  const categories = await categoriesResponse.json();

  return [movies, categories];
}

fetchMoviesAndCategories().then(([movies, categories]) => {
  movies;     // fetched movies
  categories; // fetched categories
}).catch(error => {
  // /movies or /categories request failed
});
```

`await Promise.all([...])` starts fetch requests in parallel, and waits until all of them are resolved. 

If any request fails, then the whole parallel promise gets rejected right away with the failed request error.  

In case if you want all parallel requests to complete, despite any of them fail, consider using [Promise.allSettled()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled).  

## 6. Summary

Calling `fetch()` starts a request and returns a promise. When the request completes, the promise resolves to the response object. From the response object you can extract data in the format you need: JSON, raw text, Blob. 

Because `fetch()` returns a promise, you can simplify the code by using the `async/await` syntax: `response = await fetch()`.    

If you need to cancel a `fetch()` request, then you need to connect the request with an abort controller.  

Having mastered the basics of `fetch()` with `async/await`, follow my post on [How to Timeout a fetch() Request](/timeout-fetch-request/).  

*Still have questions on how to use `fetch()`? Write a question in the comments below!*
