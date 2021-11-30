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

What if you'd like to import data from a JSON file? For example, it's convinient to keep application's configuration values in a JSON file.  

Importing JSON is supported by commonjs modules format.  

Fortunately, a new proposal at stage 3 named [JSON modules](https://github.com/tc39/proposal-json-modules) proposes a way to import JSON into an ES module directly. Let's see how JSON modules work.

## 1. Importing config.json

Let's say that you have a simple JSON file named `config.json` that contains useful config values of an application: the name and the current version:

```json
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

When trying to run the application, Node.js throws an error `TypeError [ERR_UNKNOWN_FILE_EXTENSION]: Unknown file extension ".json"`.  

## 2. JSON modules proposal

The essence of the JSON modules proposal is to allow importing of data of JSON format inside of an ES module.  

To make JavaScript aware about the specific format you're trying to import you need to use a so called type assertion.  

```javascript
import jsonContent from "./file.json" assert { type: "json" };
```

where `assert { type: "json" }` is a type assertion indicating the module should be parsed and imported as JSON content.  

## 3. Enabling JSON modules

Now, applying these updates to the simple application:

```javascript{1}
import http from 'http';
import config from './config.json' assert { type: "json" };

http
  .createServer((req, res) => {
    res.write(`App name: ${config.name}`);
    res.write(`App version: ${config.version}`);
    res.end();
  })
  .listen(8080);
```

[Try the demo.](https://codesandbox.io/s/relaxed-paper-otpov?file=/src/index.mjs)

Now if you open the demo you'd see that the app name and version, which were read from the `config.json`, are rendered on the web page.  

Note that you need to add `--experimental-json-modules` flag to enable [Experimental JSON modules](https://nodejs.org/api/esm.html#esm_experimental_json_modules) in Node.js:

```bash
node --experimental-json-modules index.mjs
```

In the browser environment, the JSON modules are enabled starting Chrome 91.  

## 4. Conclusion

By default, an ES module can import only JavaScript code.  

Thanks to JSON modules proposal you can import JSON content directly into an ES module. This is done a type assertion to `json` right after the import statement:

```javascript
import jsonContent from "./file.json" assert { type: "json" };
```