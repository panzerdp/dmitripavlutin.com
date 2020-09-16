---
title: "How to Use Fetch with async/await"
description: "How to use fetch() with async/await syntax in JavaScript: fetch JSON data, handle errors, make parallel requests, cancel and intercept requests."
published: "2020-09-15T08:40Z"
modified: "2020-09-15T08:40Z"
thumbnail: "./images/cover-4.png"
slug: javascript-fetch-async-await
tags: ['fetch', 'async await']
recommended: ['javascript-async-await', 'react-fetch-lifecycle-methods-hooks-suspense']
type: post
commentsThreadId: javascript-fetch-async-await
---

The [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) has become the native way to fetch resources in Frontend applications.  

In this post, I'm going to show the common scenarios of how to use Fetch API with async/await syntax. The goal is to make you confident on how to fetch data, handle fetch errors, cancel a fetch request, and more.  

Before starting, I recommend [familiarizing](/javascript-async-await/) with `async/await` syntax. I'm going to use it extensively in the examples below.  

```toc
```

## 1. Intro to *fetch()*

The Fetch API fetches resources, usually across the network. You can make HTTP requests (`GET`, `POST`), download and upload files.  

To start a request, call the special function `fetch()`:

```javascript
const response = await fetch(resource[, options]);
```

which accepts 2 arguments:

* `resource` can be either a URL string, or a [Request](https://developer.mozilla.org/en-US/docs/Web/API/Request) object  
* `options` is an object to configure the request with properties like `method` (`'GET'`, `'POST'`), `headers`, `body`, `credentials`, [and more](https://javascript.info/fetch-api).  

`fetch()` starts a request and returns a promise. When the request completes, the promise is resolved with the [Response](https://developer.mozilla.org/en-US/docs/Web/API/Response) object from where you can extract useful data like JSON. If the request fails due to some network problems, the promise is rejected.    

`async/await` syntax fits great with `fetch()` because it simplifies the work with promises.      

For example, let's make a request to fetch a list of movies:

```javascript
async function fetchMovies() {
  const response = await fetch('/movies');
  // waits until the request completes...
  console.log(response);
}
```

`fetchMovies()` is an asynchronous function since it's marked with the `async` keyword.  

`await fetch('/movies')` starts an HTTP request to `'/movies'` URL.  Because the `await` keyword is present, the asynchronous function is paused until the request completes. 

## 2. Fetching JSON

The `Response` object returned by the `fetch()` is a generic placeholder for multiple data formats.  

Here's how you could fetch movies as JSON data from the server:

```javascript
async function fetchMoviesJSON() {
  const response = await fetch('/movies');
  const movies = await response.json();
  return movies;
}

fetchMoviesJSON().then(movies => {
  movies; // fetched movies
});
```

`response.json()` is a method on the Response object that lets you extract parse a JSON object
from the response.  

To get the response data as JSON you have to use `await response.json()` because `response.json()` returns a promise.  

The response object offers a lot of useful methods (all returning promises):

* `response.json()` returns a promise resolved to a JSON object
* `response.text()` returns a promise resolved to raw text
* `response.formData()` returns a promise resolved to [FormData](https://developer.mozilla.org/en-US/docs/Web/API/FormData)
* `response.blob()` returns a promise resolved to a [Blog](https://developer.mozilla.org/en-US/docs/Web/API/Blob) (a file-like object of raw data)
* `response.arrayBuffer()()` returns a promise resolved to an [ArryBuffer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer) (raw generic binary data)

## 3. Handling fetch errors

When I was familiarizing with `fetch()`, I was surprised that `fetch()` doesn't throw an error when the server returns a bad HTTP status, e.g. `404` or `502`.  

Let's try to access a non-existing page `'/oops'` on the server. As expected, such request ends in a `404` response status:

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

A response with status `404` and the text `'Page not found'` is returned because the URL `'/oops'` doesn't exist. `fetch()` doesn't throw an error for a missing URL, but considers this as a *completed* HTTP request.  

`fetch()` rejects only if a request cannot be made or a response cannot be retrieved. Often it happens because of network problems: no internet connection, host not found, the server is not responding.  

Fortunately, `response.ok` property lets you separate good from bad HTTP response statuses. The property is set to `true` only if the response has status from `200` to `299`, inclusive. 

In the above example, the `response.ok` property is `false` because the response has status `404`.

If you'd like to throw an error on a *bad HTTP status* (outside of the range `200-299`), check the value of `response.ok` property and throw an error manually:

```javascript{4-7}
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

To cancel a fetch request you need an additional tool `AbortController`:

```javascript
// instantiate the abort controller
const controller = new AbortController();

// make the fetch() aware of controller.signal
fetch(..., { signal: controller.signal });

// call to cancel the request
controller.abort();
```

In the following example, a `fetch()` request is cancelled when clicking a button "Cancel":  

```javascript{3,9,12}
async function fetchMoviesWithCancel(controller) {
  const response = await fetch('/movies', { 
    signal: controller.signal
  });
  const movies = await response.json();
  return movies;
}

const controller = new AbortController();

cancelButton.addEventListener('click', () => {
  controller.abort();
});

fetchMoviesWithCancel(controller).catch(error => {
  error.name; // => 'AbortError'
});
```

`const controller = new AbortController()` creates an instance of the abort controller. Then `controller.signal` property is used as an option when starting the request: `fetch(..., {  signal: controller.signal })`.  

When `controller.abort()` is called inside the button click event handler, the controller cancels the request.  

Note that when a fetch request is canceled, the promise returned by `fetch()` is rejected with an abort error.  

## 5. Parallel fetch requests

To perform parallel fetch requests use the `Promise.all()` helper function.  

For example, let's start 2 parallel requests to fetch movies and categories:

```javascript{2-5}
async function fetchMoviesAndCategories() {
  const [moviesResponse, categoriesResponse] = await Promise.all([
    fetch('/movies'),
    fetch('/categories')
  ]);

  const movies = await moviesResponse.json();
  const categories = await categoriesResponse.json();

  return {
    movies,
    categories
  };
}

fetchMoviesAndCategories().then(({ movies, categories }) => {
  movies;     // fetched movies
  categories; // fetched categories
});
```

`await Promise.all([...])` starts the fetch requests in parallel, and waits until all of them are resolved. 

## 6. Intercepting fetch requests

Sometimes you might want to do some work before sending the request, or after receiving the response: this is named intercepting a request.  

A good use case to intercept and perform some behavior after the request completes is to perform the fixes that were made [Handling fetch errors](#3-handling-fetch-errors): throw an error if the response status is not within the range `200` to `299`.  

`fetch()` API doesn't provide any functionality to intercept the requests. That's understandable, because `fetch()` API is designed to be simple.  

The [decorator pattern](https://refactoring.guru/design-patterns/decorator) is a good solution to design the interception of `fetch()` requests.  

First, let's define a simple class `Fetcher` which has only a `fetch()` method:

```javascript
class Fetcher {
  fetch(resource, options) {
    return fetch(resource, options);
  }
}
```

Then let's create an instance of `Fetcher` class, and use it to fetch the movies list:

```javascript
const fetcher = new Fetcher();

async function fetchMoviesBadStatus() {
  const response = await fetcher.fetch('/movies');

  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }

  const movies = await response.json();
  return movies;
}

fetchMoviesBadStatus().then(movies => {
  // When fetch succeeds
  movies;
}).catch(error => {
  // When fetch ends with a bad http status
  error.message;
});
```

`await fetcher.fetch('/movies')` performs the request.  

The logic inside the if statement `if (!response.ok) { ... }` throws an error if the response status is outside `200` to `299` range. This logic should be refactored into an interceptor because it performs changes to the response. Let's move this logic into a decorator `FetchDecoratorBadStatus`:

```javascript
class FetchDecoratorBadStatus {
  decoratee;

  constructor(decoratee) {
    this.decoratee = decoratee;
  }

  async fetch(resource, options) {
    const response = await this.decoratee.fetch(resource, options);

    if (!response.ok) {
      const message = `An error has occured: ${response.status}`;
      throw new Error(message);
    }

    return response;
  }
}
```

`FetchDecoratorBadStatus` wraps a `Fetcher` instance (the `decoratee` property). Instance the `fetch()` method it calls `this.decoratee.fetch(resource, options)` (the decorated fetcher instance), and after makes the `if (!response.ok) { ... }` status checks.  

`fetchMoviesBadStatus()` can be simplified because the status verification logic has been moved to `FetchDecoratorBadStatus` decorator:

```javascript{1-3}
const fetcher = new FetchDecoratorBadStatus(
  new Fetcher()
);

async function fetchMoviesBadStatus() {
  const response = await fetcher.fetch('/movies');
  const movies = await response.json();
  return movies;
}

fetchMoviesBadStatus().then(movies => {
  // When fetch succeeds
  movies;
}).catch(error => {
  // When fetch ends with a bad HTTP status, e.g. 404
  error.message;
});
```

`new FetchDecoratorBadStatus(new Fetcher())` is how you decorate the regular `Fetcher` instance. Because the decorator doesn't change the interface of the decorated `Fetcher`, you can fetch movies as before: `await fetcher.fetch('/movies')`.  

The decorator makes `Fetcher` and `FetchDecoratorBadStatus` loosely coupled.  

Even better, you can wrap the fetcher in as many decorators as you want: 

```javascript
const fetcher = new FetchDecorator1(
  new FetchDecorator2(
    new FetchDecoratorBadStatus(
      new Fetcher()
    )
  )
);
```

## 7. Summary

When called, `fetch()` starts a request and right away returns a promise. When the request completes, the promise resolves with the response object. From the response object, you can extract data in any format you need: JSON, Blob, or even raw text.  

Because `fetch()` returns a promise, you can simplify the logic of fetching data by using the `async/await` syntax.  

In this post, you've found out how to use `fetch()` accompanied with `async/await` to fetch JSON data, handle fetching errors, cancel a request, perform parallel requests, and even how to intercept the requests with custom logic using decorators.  

*Challenge: can you write a decorator that intercepts the response and extracts the JSON data?*