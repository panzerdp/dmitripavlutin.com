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

When executing a JavaScript file in a Node environment, `process.env` is a special object that contains all the environment variables accessible to the script.  

The keys are the env variable names, while the values are the env variable values.  

The following command uses Node.js to execute a JavaScript file `main.js` in the command line:

```bash
NODE_ENV=production node main.js
```

And let's say that `/home/dmitri/main.js` file contains the following code:

```javascript
// main.js
console.log(process.env.USER); // dmitri
console.log(process.env.PWD);  // '/home/dmitri/

console.log(process.env.NODE_ENV); // production
```

`process.env.USER` accesses the operating system user name that executes the command. 

`process.env.PWD` contains the absolute path to the folder of where the executed file (`main.js`) is located. 

These environment variables are taken from the environment of the operating system.  

`process.env.NODE_ENV` variable, however, is defined by the prefix `NODE_ENV=production` of the command `NODE_ENV=production node main.js`.  


## 2. *import.meta* object

In an ES module you use `import.meta` to access the environment variables. `import.meta` is a special keyword available only inside the scope of an ES module.  

```bash
NODE_ENV=production node main.mjs
```

And let's say that `/home/dmitri/main.mjs` file contains the following code:

```javascript
// main.mjs
console.log(import.meta.USER); // dmitri
console.log(import.meta.PWD);  // '/home/dmitri/

console.log(import.meta.NODE_ENV); // production
```

Same way as in the previous chapter, `import.meta.USER` accesses the user name, `import.meta.PWD` contains the absolute path to the folder where the executed file (`main.js`) is located, and `import.meta.NODE_ENV` is the env variable defined inside the command itself.

## 3. Accessing env variables in a browser environment

## 4. Conclusion