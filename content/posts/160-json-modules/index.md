---
title: "JSON Modules in JavaScript"
description: "How to easily import JSON data into an ES module"  
published: "2021-12-01T12:00Z"
modified: "2021-12-01T12:00Z"
thumbnail: "./images/cover.png"
slug: javascript-json-modules
tags: ['javascript', 'json', 'module']
recommended: ['fetch-with-json', 'ecmascript-modules-nodejs']
type: post
---

The ECMAScript modules system (`import` and `export` keywords) allows importing inside of an ES module only an another ES module. In other words, you can only import JavaScript code inside of an importing module.  

But what if you'd like to simply import an object from a JSON file? For example, it's convinient to store application configuration values into a JSON file.  

Importing JSON is supported by commonjs modules format. But if you want to import JSON data into an ES module, you had to use a webpack loader like [json-loader](https://v4.webpack.js.org/loaders/json-loader/). 

Fortunately, a new proposal at stage 3 named [JSON modules](https://github.com/tc39/proposal-json-modules) proposes a way to import JSON into an ES module directly. Let's see how JSON modules work.

## 1. JSON modules

Let's say that you have a simple JSON file named `config.json` that contains some useful information about the application: the name and the current version.  

```json
// config.json
{
  "name": "My Application",
  "version": "v1.2"
}
```

How to import `config.json` into an ES module?  

For example, let's create a simple HTTP application that renders the app name and version.  

If you'd try to import `config.json` directly, the engine would throw an error:

```javascript{1}
import http from 'http';
import config from './config.json';

http
  .createServer((req, res) => {
    res.write(`App name: ${config.name}`);
    res.write(`App version: ${config.version}`);
    res.end();
  })
  .listen(8080);
```

[Try the demo.](https://codesandbox.io/s/busy-wu-sgk82?file=/src/index.mjs)

When trying to start the application, Node.js throws an error `TypeError [ERR_UNKNOWN_FILE_EXTENSION]: Unknown file extension ".json"`.  

