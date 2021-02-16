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

As result it's tempting to use a 3rd party library, like [axios](https://github.com/axios/axios), that greatly simplifies the handling of requests. Consider the same fetching of movies using `axios`:

```javascript
async function executeRequest() {
  const moviesJson = await axios('/movies.json');
  console.log(moviesJson);
}

executeRequest(); 
// logs [{ name: 'Heat' }, { name: 'Alien' }]
```

`moviesJson = await axios('/movies.json')` returns the actual JSON response. You don't have to manually extract the JSON like `fetch()` requires you to do.  

But... using a helper library like `axios` brings its own set of problems. 

First, it *increases the bundle size* of your web application. Secondly, your application couples with the 3rd party library: you get all the benefits of that library, but also you *get all its bugs*.  

I purpose a different approach that takes the best from both worlds &mdash; use the decorator pattern to increase the easy of use and flexibility of `fetch()` API. 

Let's see in the next sections how to do that.  

## 2. Preparing the Fetcher interface

What's great about the decorator pattern is that it lets you add funcionality on top of some base functionality (decorate) in a flexible and loosely coupled way.  

If you aren't familiar with the decorator pattern, I suggest you to pause and read the [decorator pattern explanation](https://refactoring.guru/design-patterns/decorator).  

Applying the decorator to enhance the `fetch()` requires a few simple steps.  

The first step is to declare an abstract interface named `Fetcher`:

```typescript
type ResponseWithData = Response & { data?: any };

interface Fetcher {
  run(input: RequestInfo, init?: RequestInit): Promise<ResponseWithData>;
} 
```

`Fetcher` interface has just one method that accepts exactly the same arguments and returns the same type of data as the regular `fetch()`.  

The second step is implementing the basic fetcher class:

```typescript
class BasicFetcher implements Fetcher {
  run(
    input: RequestInfo, 
    init?: RequestInit
  ): Promise<ResponseWithData> {
    return fetch(input, init);
  }
}
```

`BasicFetcher` implements the `Fetcher` interface. Its one method `run()` invokes the regular `fetch()` function. Simple as is.  

Let's use the basic fetcher class to fetch the list of movies:

```typescript{1,5}
const fetcher = new BasicFetcher();
const decoratedFetch = fetcher.run.bind(fetcher);

async function executeRequest() {
  const response = await decoratedFetch('/movies.json');
  const moviesJson = await response.json();
  console.log(moviesJson);
}

executeRequest(); 
// logs [{ name: 'Heat' }, { name: 'Alien' }]
```

`const fetcher = new BasicFetcher()` creates an instance of the fetcher class. `decoratedFetch = fetcher.run.bind(fetcher)` creates a bound method. Then you can use `decoratedFetch.fetch('/movies.json')` to fetch the movies JSON.  

At this step, `BasicFetcher` class doesn't bring benefits. Moreover, things are more complicated because of a new interface and a new class! Wait a bit... you will see the magic happens when the decorators are introduced into action.  

## 3. The JSON extractor decorator

The workhorse of the decorator pattern are the decorator classes. 

The decorator class must conform to the `Fetcher` interface, wrap the decorated instance, as well introduce the additional functionality in the `fetch()` method.  

Let's implement a decorator that extracts JSON data from the response object:

```typescript
class JsonFetcherDecorator implements Fetcher {
  private decoratee: Fetcher;

  constructor (decoratee: Fetcher) {
    this.decoratee = decoratee;
  }

  async run(
    input: RequestInfo, 
    init?: RequestInit
  ): Promise<ResponseWithData> {
    const response = await this.decoratee.run(input, init);
    const json = await response.json();
    response.data = json;
    return response;
  }
}
```

Let's look closer at how `JsonFetcherDecorator` is constructed.  

`JsonFetcherDecorator` conforms to the `Fetcher` interface. That's really important because it allows to use multiple decorators.    

`JsonExtractorFetch` has a private field `decoratee` that also conforms to the `Fetcher` interface. Inside the `fetch()` method `this.decoratee.run(input, init)` pefroms the actual fetch of data.  

Then `json = await response.json()` extracts the JSON data from the response. Finally `response.data = json` assigns to the response object the extracted JSON data.  

Now let's compose decorate the `BasicFetcher` with the `JsonFetcherDecorator` decorator, and simplify the use of `fetch()`:

```typescript
const fetcher = new JsonFetcherDecorator(
  new BasicFetcher();
);
const decoratedFetch = fetcher.run.bind(fetcher);

async function executeRequest() {
  const { data } = await decoratedFetch('/movies.json');
  console.log(data);
}

executeRequest(); 
// logs [{ name: 'Heat' }, { name: 'Alien' }]
```

Now, instead of extracting manually the JSON data from the response, you can access the extracted data from `data` property of the response object.  

## 4. The request timeout decorator

`fetch()` API by default timeouts the requests at the time specified by the browser. In Chrome a network request timeouts at 300 seconds, while in Firefox at 90 seconds.   

Users can wait up to 8 seconds for simple requests to complete. That's why you need to set a timeout on the network requests and inform the user after 8 seconds about the network problems.  

What's great about the decorator pattern is that you can decorate your basic implementation with as many decorators as you want! So, let's create a timeout decorator for the fetch requests.  

```typescript
const TIMEOUT = 8000; // 8 seconds

class TimeoutFetcherDecorator implements Fetcher {
  private decoratee: Fetcher;

  constructor(decoratee: Fetcher) {
    this.decoratee = decoratee;
  }

  async run(
    input: RequestInfo, 
    init?: RequestInit
  ): Promise<ResponseWithData> {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), TIMEOUT);
    const response = await this.decoratee.run(input, {
      ...init,
      signal: controller.signal
    });
    clearTimeout(id);
    return response;
  }
}
```

`TimeoutFetcherDecorator` is a decorator that implementes the `Fetcher` interface.  

Inside the `run()` method of `TimeoutFetcherDecorator`: the abort controller is used to abort the request if it hasn't been completed in 8 seconds.  

Now let's put this decorator to work:

```typescript
const fetcher = new TimeoutFetcherDecorator(
  new JsonFetcherDecorator(
    new BasicFetcher()
  )
);
const decoratedFetch = fetcher.run.bind(fetcher);

async function executeRequest() {
  try {
    const { data } = await decoratedFetch('/movies.json');
    console.log(data);
  } catch (e) {
    // Timeouts if the request takes
    // longer than 8 seconds
    console.log(error.name);
  }
}

executeRequest(); 
// if the request takes more than 8 seconds
// logs "AbortError"
```

Now, if the request to `/movies.json` takes more than 8 seconds `decoratedFetch('/movies.json')` will throw an abort error.  

## 5. Summary

`fetch()` API provides the basic functionality to perform fetch requests. But usually, you need more than that. Using `fetch()` solely forces you to extract manually the JSON data from the request, configure the timeout, and more.  

To avoid the boilerplate, you might choose to use a more friendly library like `axios`. However, using a 3rd party library like `axios` increases your bundle size, as well you tightly couple with it.  

An alternative solution is to apply the decorator pattern at the top of `fetch()`. You can make decorators for extracting automatically the JSON from the request, timeout the request, and much more. You can combine, add or remove decorators in the most flexible way.  

Would you like to use the `fetch()` with the most common decorators? I created a [gist]() for you! Feel free to use it in your application.  

*What other `fetch()` decorators might be useful? Write your implementation in a comment below! (please use TypeScript)*