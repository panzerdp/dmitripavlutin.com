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

Here's an example of JSON containing an object with props and values:

```json
{
  "name": "Joker",
  "city": "Gotham",
  "isVillain": true,
  "friends": []
}
```

In this post, I'll guide you on how to use `fetch()` API to both load JSON data (usually using `GET` method) or post JSON
data (usually using a `POST` method).  

## 1. Recalling *fetch()*

`fetch()` accepts 2 arguments:  

```javascript
const response = await fetch(urlOrRequest[, options]);
```

The first obligatory argument of `fetch()` is the URL of the request, or generally a [request](https://developer.mozilla.org/en-US/docs/Web/API/Request) object.    

`options`, the optional second argument, lets you configure the request. The most useful options are:

* `options.method`: the HTTP method to perform the request. Defaults to `'GET'`
* `options.body`: the body of the HTTP request
* `option.headers`: an object with the headers to attach to the request

Calling `fetch()` starts a request and returns a promise. When the request completes, the promise resolves to the [response](https://developer.mozilla.org/en-US/docs/Web/API/Response) object.  

Response object provides useful [methods](https://developer.mozilla.org/en-US/docs/Web/API/Response#methods) to extract data from a multitude of formats. But to parse data from JSON you need just one method &mdash; `response.json()`.  

## 2. *GET* JSON data

Let's fetch from the path `/api/names` a list of persons in JSON format:

```javascript
async function loadNames() {
  const response = await fetch('/api/names');
  const names = await response.json();

  console.log(names); 
  // logs [{ name: 'Joker'}, { name: 'Batman' }]
}

loadNames();
```

`await fetch('/api/names')` starts a `GET` request, and evaluates to the response object when the request is complete.  

Then, from the server response, you can parse the JSON into a plain JavaScript object using `await response.json()` (note: `response.json()` returns a promise!).

By default `fetch()` performs a `GET` request. But you can always indicate the HTTP method explicitly:

```javascript{3}
// ...
const response = await fetch('/api/names', {
  method: 'GET'
});
// ...
```

### 2.1 Explicitly asking for JSON

Some API servers might work with multiple formats: JSON, XML, etc. That's why these servers might [require](https://stackoverflow.com/questions/43209924/rest-api-use-the-accept-application-json-http-header) you to indicate the format of the posted data.  

To do so you need to use the `headers` option, and specifically set `Accept` header to `application/json` to explicitly ask for JSON:

```javascript{3-5}
// ...
const response = await fetch('/api/names', {
  headers: {
    'Accept': 'application/json'
  }
});
// ...
```

## 3. *POST* JSON data

`POST`-ing JSON data to the server is slightly trickier.  

First, you need to set a couple of parameters on the `fetch()`. Particularly indicate the HTTP method as `'POST'`. 

Second, you need to set the `body` parameter with the stringified object (the actual JSON string).  

```javascript{4-5}
async function postName() {
  const object = { name: 'James Gordon' };
  const response = await fetch('/api/names', {
    method: 'POST',
    body: JSON.stringify(object)
  });

  const responseText = await response.text();
  console.log(responseText); // logs 'OK'
}

postName();
```

Take a look at `body` option value. `JSON.stringify(object)` utility function is used to transform a JavaScript object into a JSON string.  

`body` option accepts a string, but not an object.  

This approach works also when performing `POST`, but as well `PUT` or `PATCH` requests.  

### 3.1 Explicitly pushing JSON

Again, some servers might require you to indicate explicitly that you `POST` (or `PATCH`, or `PUT`) data in JSON format.  

In such a case you can indicate the content type of data you're pushing, particularly setting the `Content-Type` header to `application/json`.  

```javascript{6-8}
// ...
const object = { name: 'James Gordon' };

const response = await fetch('/api/names', {
  method: 'POST',
  body: JSON.stringify(object),
  headers: {
    'Content-Type': 'application/json'
  }
});
// ...
```

## 4. Using a request object

In the examples above I was using the `options` argument of `fetch()` to set the `method`, `headers`, and `body`. 

But sometimes you might want to encapsulate the request data into an object, especially when implementing a middleware. You can create request objects using the same options using the [Request](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request) constructor.  

For example, let's post JSON data by creating a request object:

```javascript
// ...
const object = { name: 'James Gordon' };

const request = new Request('/api/names', {
  method: 'POST',
  body: JSON.stringify(object),
  headers: {
    'Content-Type': 'application/json'
  }
});

const response = await fetch(request);

// ...
```

## 5. Conclusion

This is pretty much all the main information you need to load or post JSON data to the server using `fetch()`.  

When loading data, make sure to extract and parse JSON to an actual object from the response using `const object = await response.json()` method.  

But when posting JSON data, make sure to indicate the stringified object into a JSON string using `JSON.stringify(object)`. Assign the JSON to `body` option of the request.  

Would you like to know more on how to use `fetch()`? I recommend checking [How to Use Fetch with async/await](/javascript-fetch-async-await/).