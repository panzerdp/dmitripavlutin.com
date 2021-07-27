---
title: "How use fetch() with JSON"
description: "How to use fetch() API to GET or POST JSON data."
published: "2021-07-27T12:00Z"
modified: "2021-07-27T12:00Z"
thumbnail: "./images/cover-2.png"
slug: fetch-with-json
tags: ['fetch', 'json']
recommended: ['javascript-fetch-async-await', 'timeout-fetch-request']
type: post
---

[JSON](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/JSON), which is a simple format of structured data, has become a popular format to send data over the network.  

In this post, I'm going to show you how to use `fetch()` API to both load JSON data (usually using GET method) or send JSON
data (usually using a POST method).  

## 1. Recall *fetch()*

`fetch()` accepts 2 arguments: the URL or request object, while the second is an optional settings object.  

```javascript
const response = await fetch(urlOrRequest[, options]);
```

Calling `fetch()` starts the request and returns right away a promise. When the request completes, the promise is going to resolve to the [response](https://developer.mozilla.org/en-US/docs/Web/API/Response) object.  

Response object provides useful [methods](https://developer.mozilla.org/en-US/docs/Web/API/Response#methods) to extract from a multitude of formats. But to extract data from JSON you need just one method `response.json`:  

```javascript{3}
const response = await fetch('/data.json');

const jsonData = await response.json();
```

`options`, the optional second argument, let's you configure the request. I'm interested in using the following options props:  

* `options.method`: the HTTP method used to perform the request. Valid values are `'GET'`, `'POST'`, `'PATCH'`, `'PUT'`, `'DELETE'`. Defaults to `'GET'`
* `options.body`: the body of the HTTP request


## 2. *GET* JSON data

Let's fetch a simple list of names. You know that `/names.json` path on the server returns a list in JSON format. 

```javascript
async function loadNames() {
  const response = await fetch('/names.json');
  const names = await response.json();

  console.log(names); 
  // logs [{ name: 'Joker'}, { name: 'Batman' }]
}
```

[Try the demo.]()

`await fetch('/names.json')` starts the request, and returns the response object as soon as it is ready.  

Then, from the response, you can parse the JSON returned from the server into a plain JavaScript object: `await response.json()`. 

*Note: `response.json()` returns a promise.*    

## 3. *POST* JSON data

In case if you want to submit some JSON data to server, it gets a little trickier.  

First, you need to set a couple of parameters on the `fetch()`. Particularly indicate the HTTP method as `'POST'`, as well you need to set the `body` parameter as the stringified object (the actual JSON string).  

```javascript{4-5}
async function pushName() {
  const object = { name: 'James Gordon' };
  const response = await fetch('/names.json', {
    method: 'POST',
    body: JSON.stringify(object)
  });

  const responseText = await response.text();
  console.log(responseText); // logs 'OK'
}

pushName();
```

Take a look at `body` option value: `JSON.stringify(object)` utility function is used to transform a JavaScript object into a JSON string.  

This is pretty much all the main information you need to know to load or push JSON data to server using `fetch()`.  

