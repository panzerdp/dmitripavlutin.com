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

In this post, I'm going to show the common scenarios of how to use Fetch API with async/await syntax. The goal is to make you confident on how to fetch data, handle fetch errors, cancel a fetch request, and more goodies.  

Before starting, I recommend [familiarizing](/javascript-async-await/) with `async/await` syntax. I'm going to use it extensively in the examples below.  

```toc
```

## 1. Intro to *fetch()*

The Fetch API fetches resources, usually across the network. To start a fetch request, you need to call the function `fetch`:

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

## 2. Fetching JSON

The response object returned by the `fetch()` is a generic placeholder for multiple data formats.  

Here's how you could fetch movies as JSON data from the server:

```javascript
async function fetchMoviesJSON() {
  const response = await fetch('https://movies.com/list');
  const moviesJSON = await response.json();
  return moviesJSON;
}
```

In the above example, `response.json()` is a method on the Response object that lets you extract parse a JSON object
from the response.  

Note that `response.json()` returns a promise, thus you have to use `await` to get the resolved JSON object: `await response.json()`.  

## 3. Handling fetch errors

When I was familiarizing with `fetch()`, I was surprised that `fetch()` doesn't throw an error when the server returns an http error status, e.g. `404`.  

For example, let's try to access a non-existing page `'https://movies.com/oops'` on the server. As expected, such request would end up in a `404` response status:

```javascript
async function fetchMovies404() {
  const response = await fetch('https://movies.com/oops');
  
  response.ok;     // => false
  response.status; // => 404

  const text = await response.text();
  return text;
}

fetchMovies404().then(text => {
  text; // => 'Page not found'
});
```

The server cannot find the URL `https://movies.com/oops` and thus a response with status `404` and the text `'Page not found'` is returned. `fetch()` doesn't throw an error, but rather considers this as a "completed" http request.  

`fetch()` rejects only if a request cannot be made or a response cannot be retrieved. Often it happens because of network problems: no internet connection, host not found, the server is not responding to requests.  

Fortunately, `response.ok` the property lets you separate successful from unsuccessful HTTP requests. The property is set to `true` only if the response has status from `200` to `299` inclusive. 

In the above example, the `response.ok` property is `false` because the response has status `404`.

If you'd like to throw a rejection if the response status is outside of the range `200-299` (e.g. `404`, `500`, `502`), you can make some adjustements and throw an error manually:

```javascript{4-7}
async function fetchMoviesBadStatus() {
  const response = await fetch('https://movies.com/oops');

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

If `response.ok` is `false`, just throw an error indicating that the response didn't end up successfully.  

## 4. Canceling a fetch request

Sometimes, you might want to cancel a fetch request that is in progress.  

In such a case you need an additional tool named `AbortController`, which allows you to cancel the fetch requests.  

For example, let's have a button "Cancel request" that when clicked cancels the current request of movies.  

```javascript{3,9}
async function fetchMoviesWithCancel(controller) {
  const response = await fetch('https://movies.com/list', { 
    signal: controller.signal
  });
  const movies = await response.json();
  return movies;
}

const controller = new AbortController();
cancelRequestButton.addEventListener('click', () => {
 controller.abort();
});

fetchMoviesWithCancel(controller).catch(error => {
  // when aborted
  error.name; // => 'AbortError'
});
```

`const controller = new AbortController()` creates an instance of the abort controller. Then `controller.signal` property should be used as an option when starting the request: `fetch(..., {  signal: controller.signal })`.  

Finally, when calling `controller.abort()` inside the event handler, the controller signals to the fetch to abort the request.  

Note that when a fetch request is aborted, the promise gets rejected with an abort error.  

## 5. Parallel fetch requests

If you'd like to make parallel fetch requests, it is also easy. What you need to do is start the requests using `Promise.all()` helper function.

For example, let's start 2 parallel requests to fetch movies and categories:

```javascript{2-4}
async function fetchMoviesAndCategories() {
  const [moviesResponse, categoriesResponse] = await Promise.all([
    fetch('https://movies.com/list'),
    fetch('https://categories.com/list')
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

Sometimes you might want to do some work before sending the request, or after receiving the response: this is named intercepting a request.  

A good use case to intercept and perform some behavior after the request completes is to perform the fixes that were made [Handling fetch errors](#3-handling-fetch-errors): throw an error if the response status is not within the range `200` to `299`.  

The thing is that `fetch()` API doesn't provide any functionality by itself to intercept the requests. That's understandable, because `fetch()` API is designed to be simple.  

While not being the only solution, the decorator pattern is a good solution to implement the interception of `fetch()` requests.  

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
  const response = await fetcher.fetch('https://movies.com/list');

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

`await fetcher.fetch('https://movies.com/list')` performs the request.  

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

Now, since the status verification logic is moved to decorator, the function that makes the request can be simplified:

```javascript{1-3}
const fetcher = new FetchDecoratorBadStatus(
  new Fetcher()
);

async function fetchMoviesBadStatus() {
  const response = await fetcher.fetch('https://movies.com/list');
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

Using decorators, you can easily intercept the requests and make the necessary adjustments. Both `Fetcher` and `FetchDecoratorBadStatus` are loosely coupled.   

Even better, you can wrap your fetcher in as many decorators as you want. You can also remove and add decorators without affecting the users of the fetcher.  

## 7. Summary

When called, `fetch()` starts a request and right away returns a promise. When the request completes, the promise resolves with the response object. From the response object, you can extract data in any format you need: JSON, Blob, or even raw text.  

Because `fetch()` returns a promise, you can simplify the logic of fetching data by using the `async/await` syntax.  

In this post, you've found out how to use `fetch()` accompanied with `async/await` to fetch JSON data, handle fetching errors, cancel a request, perform parallel requests, and even how to intercept the requests with custom logic using decorators.  

*Do you prefer native `fetch()` API, or rather use a utility library like `axios`?*