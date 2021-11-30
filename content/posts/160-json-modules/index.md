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

The ECMAScript modules system (`import` and `export` keywords) is designed to import and export regular JavaScript entities like variables, functions, etc.

However, in some cases you'd like to import into your ES module some custom data, e.g. an object from a JSON file. For example, it's convinient to import raw JSON that serves as a configuration file.  

Until now, if you wanted to import JSON data into an ES module, you had to use a webpack loader like [json-loader](https://v4.webpack.js.org/loaders/json-loader/).  

Fortunately, there's a proposal at stage 3 named [JSON modules](https://github.com/tc39/proposal-json-modules) that allows importing raw JSON into an ES module directly.  

Let's see how JSON modules work.  

