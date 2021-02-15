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
  fetch(input: RequestInfo, init?: RequestInit): Promise<ResponseWithData>;
}
```

`Fetcher` interface has just one method that accepts exactly the same arguments and returns the same type of data as the regular `fetch()`.  

The second step is implementing the basic fetcher class:

```typescript
class BasicFetcher implements Fetcher {
  fetch(input: RequestInfo, init?: RequestInit): Promise<ResponseWithData> {
    return fetch(input, init);
  }
}
```

`BasicFetcher` implements the `Fetcher` interface. 

Its one method `BasicFetcher.fetch()` simply invokes the regular `fetch()` function. Simple as is.  

Let's use the basic fetcher class to fetch the list of movies:

```typescript{1,5}
const fetcher = new BasicFetcher();
const decoratedFetch = fetcher.fetch(bind, fetcher);

async function executeRequest() {
  const response = await decoratedFetch('/movies.json');
  const moviesJson = await response.json();
  console.log(moviesJson);
}

executeRequest(); 
// logs [{ name: 'Heat' }, { name: 'Alien' }]
```

`const fetcher = new BasicFetcher()` creates an instance of the fetcher class. `decoratedFetch = fetcher.fetch(bind, fetcher)` creates a bound method. Then you can use `decoratedFetch.fetch('/movies.json')` to fetch the movies JSON.  

At this step, `BasicFetcher` class doesn't bring benefits. Moreover, things are more complicated because of a new interface and a new class! Wait a bit... you will see the magic happens when the decorators are introduced into action.  

## 3. Introducing JSON extractor decorator

The workhorse of the decorator pattern are the decorator classes. 

The decorator class must conform to the `Fetcher` interface, wrap the decorated instance, as well introduce the additional functionality in the `fetch()` method.  

Let's implement a decorator that extracts JSON data from the response object:

```typescript
class JsonExtractorFetcher implements Fetcher {
  private decoratee: Fetcher;

  constructor (decoratee: Fetcher) {
    this.decoratee = decoratee;
  }

  async fetch(input: RequestInfo, init?: RequestInit): 
    Promise<ResponseWithData> {
    const response = await this.decoratee.fetch(input, init);
    const json = await response.json();
    response.data = json;
    return response;
  }
}
```

Let's look closer at how `JsonExtractorFetcher` is constructed.  

`JsonExtractorFetch` conforms to the `Fetcher` interface. That's really important because it allows to use multiple decorators.    

`JsonExtractorFetch` has a private field `decoratee` that also conforms to the `Fetcher` interface. Inside the `fetch()` method `this.decoratee.fetch(input, init)` pefroms the actual fetch of data.  

Then `json = await response.json()` extracts the JSON data from the response. Finally `response.data = json` assigns to the response object the extracted JSON data.  

Now let's compose decorate the `BasicFetcher` with the `JsonExtractorFetcher` decorator, and simplify the use of `fetch()`:

```typescript
const fetcher = new JsonExtractorFetcher(
  new BasicFetcher();
);
const decoratedFetch = fetcher.fetch(bind, fetcher);

async function executeRequest() {
  const { data } = await decoratedFetch('/movies.json');
  console.log(data);
}

executeRequest(); 
// logs [{ name: 'Heat' }, { name: 'Alien' }]
```

Now, instead of extracting manually the JSON data from the response, you can access the extracted data from `data` property of the response object.  

## 4. Introducing request timeout decorator

What's great about the decorator pattern is that you can decorate with as many decorators as you want.  

