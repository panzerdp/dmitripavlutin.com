---
title: "How to Use fetch() with JSON"
description: "How to use fetch() API to load and post JSON data."
published: "2021-07-28T08:20Z"
modified: "2023-01-23"
thumbnail: "./images/cover-3.png"
slug: fetch-with-json
tags: ['fetch', 'json', 'javascript']
type: post
---

[JSON](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/JSON) is a popular format for sending data over the network. Here's an example of JSON containing an object with props and values:

```json
{
  "name": "Joker",
  "city": "Gotham",
  "isVillain": true,
  "friends": []
}
```

In this post, you'll learn how to use `fetch()` to load or post JSON data.  

<Affiliate />

## 1. Recalling fetch()

`fetch()` accepts 2 arguments:  

```javascript
const response = await fetch(urlOrRequest[, options]);
```

The first obligatory argument of `fetch()` is the URL of the request, or generally a [request](https://developer.mozilla.org/en-US/docs/Web/API/Request) object.    

`options`, the optional second argument, configures the request. The most useful options are:

* `options.method`: the HTTP method to perform the request. Defaults to `'GET'`
* `options.body`: the body of the HTTP request
* `options.headers`: an object with the headers to attach to the request

Calling `fetch()` starts a request and returns a promise. When the request completes, the promise resolves to the [response](https://developer.mozilla.org/en-US/docs/Web/API/Response) object.  

Response object provides useful [methods](https://developer.mozilla.org/en-US/docs/Web/API/Response#methods) for extracting data from a variety of formats. But to parse data from JSON, you only need one method &mdash; [response.json()](https://developer.mozilla.org/en-US/docs/Web/API/Response/json).  

## 2. GET JSON data

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

`await fetch('/api/names')` starts a `GET` request, and returns a response object when the request completes.  

Then, from the server response, you can extract the JSON into a plain JavaScript object using `await response.json()` (note: `response.json()` returns a promise!).

By default `fetch()` performs a `GET` request. But you can always indicate the HTTP method explicitly:

```javascript mark=3
// ...
const response = await fetch('/api/names', {
  method: 'GET'
});
// ...
```

### 2.1 Explicitly asking for JSON

Some API servers might work with multiple formats: JSON, XML, etc. That's why these servers might [require](https://stackoverflow.com/questions/43209924/rest-api-use-the-accept-application-json-http-header) to indicate the format of the posted data.  

Just use the `headers` option, and specifically set `Accept` header to `application/json` to explicitly ask for JSON:

```javascript mark=3:5
// ...
const response = await fetch('/api/names', {
  headers: {
    'Accept': 'application/json'
  }
});
// ...
```

When making the request, the server will understand that you're asking for data in JSON format.  

## 3. POST JSON data

`POST`-ing JSON data to the server is slightly trickier.  

First, indicate the HTTP `method` as `'POST'`. 

Second, set the `body` parameter with the object's JSON (as a string).

```javascript mark=4:5
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

Take a look at `body` option value. `JSON.stringify(object)` utility function stringifies the JavaScript object into a JSON string.  

`body` option requires a string, but not an object.  

This approach works for `POST`, but also for `PUT` and `PATCH` requests.  

### 3.1 Explicitly posting JSON

Again, some servers might require you to indicate explicitly that you `POST` (or `PATCH`, or `PUT`) data in JSON format.  

In such a case, specify the content type of the data you're pushing, in particular by setting the `Content-Type` header to `application/json`.  

```javascript mark=6:8
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

In the examples above `options` argument of `fetch(URL, option)` was used to set the `method`, `headers`, and `body` options.  

But sometimes you might want to encapsulate the request data into an object, thus [Request](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request) becomes handy.  

For example, let's post JSON data by creating a request object:

```javascript mark=4
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

When loading data, make sure to extract and parse JSON to an actual object from the response using `const object = await response.json()` method.  

However, when posting JSON data, be sure to indicate the stringified object into a JSON string using `JSON.stringify(object)`. Assign the JSON to the `body` option of the request.  

Would you like to know more on how to use `fetch()`? I recommend checking [How to Use Fetch with async/await](/javascript-fetch-async-await/).
