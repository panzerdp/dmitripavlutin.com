---
title: "Environment Variables in JavaScript: env.process and import.meta"
description: "How to access enviroment variables in JavaScript: env.process and import.meta"  
published: "2023-02-05"
modified: "2023-02-05"
thumbnail: "./images/cover-2.png"
slug: enviroment-variables-javascript
tags: ['javascript']
recommended: ['vue-next-tick', 'props-destructure-vue-composition']
type: post
---

Environment variables in JavaScript are helpful to define how your application must behave depending on conditions defined in the environment where the app runs. The environment can be the Operating System, the Docker container, etc.  

There's a set of environment variables defined by the OS, for example:

* `USER`: the current user
* `HOME`: the current user's home path
* `PWD`: the current working directory
* `PATH`: directories to search to execute a command

In regards to JavaScript and Node.js ecosystem, you might find the following variables:

* `NODE_ENV`: determines if the scripts runs in development or production mode. Usually takes one of the values: `production`, `prod`, `development`, `dev`, or `test`
* `PORT`: the port with which the started application should work with

Let's see how you can access the environmnet variables (either OS or Node.js specific) in a JavaScript file.  

## 1. *process.env* object

Let's say that you use the following command to execute a JavaSciprt file:

## 2. *import.meta* object

## 3. Conclusion