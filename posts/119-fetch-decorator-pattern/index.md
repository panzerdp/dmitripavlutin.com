---
title: "How to Greatly Enhance fetch() with the Decorator Pattern"
description: "How to use the decorator pattern to enhance the possibilities and flexibily of fetch() API."
published: "2021-02-16T09:10Z"
modified: "2021-02-27T06:30Z"
thumbnail: "./images/cover.png"
slug: enhance-fetch-with-decorator-pattern
tags: ['fetch', 'decorator pattern', 'async await']
type: post
---

## 1. fetch() is good, but you want better

`fetch()` API lets you perform network requests in web applications.   

`fetch()` usage is pretty straightforward: invoke `fetch('/movies.json')` to start the request. When the request completes, 
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

As shown in the above code snippet, you have to manually extract the JSON object from the response: `moviesJson = await response.json()`. Doing it one time &mdash; not a problem. But if your application does many requests, extracting everything time the JSON object using `await response.json()` is tedious.  

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

I purpose a different approach that takes the best from both worlds &mdash; use the decorator pattern to increase the ease of use and flexibility of `fetch()` API. 

The idea is to wrap a base fetch class (I'll show how to define it) with any other functionality that *you* need: extract JSON, timeout, throw error on bad HTTP status, handle auth headers, and much more. Let's see in the next sections how to do that.  

## 2. Preparing the Fetcher interface

The decorator pattern is useful because it enables adding functionality  (in other words &mdash; decorate) on top of basic logic in a flexible and loosely coupled manner.  

If you aren't familiar with the decorator pattern, I suggest reading about [how it works](https://refactoring.guru/design-patterns/decorator).  

Applying the decorator to enhance the `fetch()` requires a few simple steps.  

The first step is to declare an abstract interface named `Fetcher`:

```typescript
type ResponseWithData = Response & { data?: any };

interface Fetcher {
  run(
    input: RequestInfo, 
    init?: RequestInit
  ): Promise<ResponseWithData>;
} 
```

`Fetcher` interface has just one method that accepts the same arguments and returns the same type of data as the regular `fetch()`.  

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

```typescript mark=1,5
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

[Open the demo.](https://codesandbox.io/s/basic-fetch-nm7qm?file=/src/index.ts)

`const fetcher = new BasicFetcher()` creates an instance of the fetcher class. `decoratedFetch = fetcher.run.bind(fetcher)` creates a bound method. 

Then you can use `decoratedFetch('/movies.json')` to fetch the movies JSON, exactly like using the regular `fetch()`.  

At this step, `BasicFetcher` class doesn't bring benefits. Moreover, things are more complicated because of a new interface and a new class! Wait a bit... you will see the great benefits when the decorators are introduced into the action.  

## 3. The JSON extractor decorator

The workhorse of the decorator pattern is the decorator class. 

The decorator class must conform to the `Fetcher` interface, wrap the decorated instance, as well introduce the additional functionality in the `run()` method.  

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

`JsonFetcherDecorator` conforms to the `Fetcher` interface.  

`JsonExtractorFetch` has a private field `decoratee` that also conforms to the `Fetcher` interface. Inside the `run()` method `this.decoratee.run(input, init)` pefroms the actual fetch of data.  

Then `json = await response.json()` extracts the JSON data from the response. Finally, `response.data = json` assigns to the response object the extracted JSON data.  

Now let's compose decorate the `BasicFetcher` with the `JsonFetcherDecorator` decorator, and simplify the use of `fetch()`:

```typescript mark=1:3,7
const fetcher = new JsonFetcherDecorator(
  new BasicFetcher()
);
const decoratedFetch = fetcher.run.bind(fetcher);

async function executeRequest() {
  const { data } = await decoratedFetch('/movies.json');
  console.log(data);
}

executeRequest(); 
// logs [{ name: 'Heat' }, { name: 'Alien' }]
```

[Open the demo.](https://codesandbox.io/s/json-extractor-decorator-eyror?file=/src/index.ts)

Now, instead of extracting manually the JSON data from the response, you can access the extracted data from `data` property of the response object.  

By moving the JSON extractor to a decorator, now in every place you use `const { data } = decoratedFetch(URL)` you won't have to manually extract the JSON object.  

## 4. The request timeout decorator

`fetch()` API by default timeouts the requests at the time specified by the browser. In Chrome a network request timeouts at 300 seconds, while in Firefox at 90 seconds.   

Users can wait up to 8 seconds for simple requests to complete. That's why you need to set a timeout on the network requests and inform the user after 8 seconds about the network problems.  

What's great about the decorator pattern is that you can decorate your basic implementation with as many decorators as you want! So, let's create a timeout decorator for the fetch requests:  

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

`TimeoutFetcherDecorator` is a decorator that implements the `Fetcher` interface.  

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
  } catch (error) {
    // Timeouts if the request takes
    // longer than 8 seconds
    console.log(error.name);
  }
}

executeRequest(); 
// if the request takes more than 8 seconds
// logs "AbortError"
```

[Open the demo.](https://codesandbox.io/s/timeout-decorator-ibsg7?file=/src/index.ts) 

In the demo, the request to `/movies.json` takes more than 8 seconds. 

`decoratedFetch('/movies.json')`, thanks to `TimeoutFetcherDecorator`, throws a timeout error.  

Now the basic fetcher is wrapped in 2 decorators: one extracts the JSON object, and another timeouts the request in 8 seconds. That greatly simplifies the use of `decoratedFetch()`: when invoking `decoratedFetch()` the decorators logic is working for you.  

## 5. Summary

`fetch()` API provides the basic functionality to perform fetch requests. But you need more than that. Using `fetch()` solely forces you to extract manually the JSON data from the request, configure the timeout, and more.  

To avoid the boilerplate, you can use a more friendly library like `axios`. However, using a 3rd party library like `axios` increases the app bundle size, as well you tightly couple with it.  

An alternative solution is to apply the decorator pattern on top of `fetch()`. You can make decorators that extract the JSON from the request, timeout the request, and much more. You can combine, add or remove decorators anytime you want, without affecting the code that uses the decorated fetch.  

Would you like to use the `fetch()` with the most common decorators? I created a [gist](https://gist.github.com/panzerdp/1312bcd5f455fa409d2aced844cad96f) for you! Feel free to use it in your application or even add more decorators for your own needs!  

*What other `fetch()` decorators might be useful? Write your implementation in a comment below! (please use TypeScript)*