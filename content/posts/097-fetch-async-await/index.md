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

## 1. Intro to *fetch()*

The Fetch API fetches resources, usually accross the network. To start a fetch request, you need to call the function `fetch`:

```javascript
const response = await fetch(resource[, options]);
```

`fetch` accepts 2 arguments:

* `resource` can be either the URL to resource, or a [Request](https://developer.mozilla.org/en-US/docs/Web/API/Request) object  
* `options` is an object to configure the request with properties like `method` (`'GET'`, `'POST'`), `headers`, `body`, `credentials`, [and more](https://javascript.info/fetch-api).  

Calling `fetch()` starts the request and returns a promise. When the request completes, the promise is resolved with the [Response](https://developer.mozilla.org/en-US/docs/Web/API/Response) object from where you can extract useful data like JSON.  

Because `fetch()` returns a promise, `async/await` syntax fits great here.    

For example, let's make a request to fetch a list of movies:

```javascript
async function fetchMovies() {
  const response = await fetch('https://movies.com');
  // waits until the request completes...
  console.log(response);
}
```

[Try the demo]() and see how the response is logged to console.  

## 2. Fetching JSON

The response object returned by the `fetch()` is generic placeholder for multiple data formats.  

Here's how you could fetch movies as JSON data from the server:

```javascript
async function fetchMoviesJSON() {
  const response = await fetch('https://movies.com/list');
  const moviesJSON = await response.json();
  return moviesJSON;
}
```

In the above example, `response.json()` is a method on the Response object that let's you extract parse a JSON object
from the response.  

Note that `response.json()` returns a promise, thus you have to use `await` in order to get the resolved JSON object: `await response.json()`.  

## 3. Handling fetch errors

When I was familiarizing with `fetch()`, I was surprised that `fetch()` doesn't throw an error when the server returns an http error status, e.g. `404`.  

For example, let's try to access a non-existing page `'https://movies.com/listzzz'` on the server. As expected, such request would end up in a `404` response status:

```javascript
async function fetchMovies404() {
  const response = await fetch('https://movies.com/listzzz');
  
  response.ok;     // => false
  response.status; // => 404

  const text = await response.text();
  return text;
}

fetchMovies404().then(text => {
  text; // => 'Page not found'
});
```

The server cannot find the URL `https://movies.com/listzzz` and thus a response with status `404` and the text `'Page not found'` is returned. `fetch()` doesn't throw an error, but rather considers this as a "completed" http request.  

`fetch()` rejects only if a request cannot be made or a response cannot be retrieved. Often it happens because of network problems: no internet connection, host not found, the server is not responding to requests.  

Fortuntately, `response.ok` property let's you separate successfull from unsuccessfull http requests. The property is set to `true` only if the response has status from `200` to `299` inclusive. 

In the above example, the `response.ok` property is `false` because the response has status `404`.

If you'd like to throw a rejection if the response status is outside of the range `200-299` (e.g. `404`, `500`, `502`), you can make some adjustements and throw an error manually:

```javascript{4-7}
async function fetchMovies404WithThrow() {
  const response = await fetch('https://movies.com/listzzz');

  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }

  return response;
}

fetchMovies404WithThrow().catch(error => {
  error.message; // 'An error has occurred: 404'
});
```

If `reponse.ok` is `false`, just throw an error indicating that the response didn't end up successfully.  

## 4. Cancelling a fetch request

Sometimes, you might want to cancel a fetch request that is in progress.  

In such a case you need an additional tool named `AbortController`, which allows you to cancel the fetch requests.  

## 5. Parallel fetch requests

If you'd like to make parallel fetch requests, it is also easy. What you need to do is start the requests using `Promise.all()` helper function.


For example, let's start 2 parallel requests to fetch movies and categories:

```javascript
async function fetchMoviesAndCategories() {
  const [moviesResponse, categoriesResponse] = await Promise.all([
    fetch('https://movies.com/list'),
    fetch('https://movies.com/categories-list')
  ]);

  const movies = await moviesResponse.json();
  const categories = await categoriesResponse.json();

  return {
    movies,
    categories
  };
}

fetchMoviesAndCategories().then(({ movies, categories }) => {
  movies;     // the list of fetched movies
  categories; // the list of fetched categories
});
```

`await Promise.all([...])` starts the fetch requests in parallel, and waits until all of them are resolved. 

## 6. Intercepting fetch requests

Sometimes you might want to do some work before sending the request, or after recieveing the response: this is named intercepting a request.  

A good use case to intercept and perform some behavior after the request completes is to perform the fixes that were made [Handling fetch errors](#3-handling-fetch-errors): throw an error if the response status is not within the range `200` to `299`.  

The thing is that `fetch()` API doesn't provide any functionality by itself to intercept the requests. That's understendable, because `fetch()` API is designed to be simple.  

While not being the only solution, the decorator pattern is a good solution to implement the interception of `fetch()` requests.  

First, let's define a simple class `Fetcher` which has only a `fetch()` method:

```javascript
class Fetcher {
  fetch(...args) {
    return fetch(...args);
  }
}

const myFetcher = new Fetcher();

async function fetchMovies404WithThrow() {
  const response = await myFetcher.fetch('https://movies.com/listzzz');

  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }

  return response;
}

fetchMovies404WithThrow().catch(error => {
  error.message; // 'An error has occurred: 404'
});
```

`myFetcher` is an intance of `Fetcher()` class. If you'd like to start a fetch request, simply invoke `await myFetcher.fetch('https://movies.com/listzzz')`.



## 7. Summary