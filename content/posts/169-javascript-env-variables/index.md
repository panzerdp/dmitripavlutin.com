---
title: "Environment Variables in JavaScript: process.env"
description: "How to access environment variables in JavaScript: process.env"  
published: "2023-02-07"
modified: "2023-02-07"
thumbnail: "./images/environment-variables-javascript-2.png"
slug: environment-variables-javascript
tags: ['javascript']
recommended: ['vue-next-tick', 'props-destructure-vue-composition']
type: post
---

Environment variables in JavaScript can define how your application behaves depending on conditions defined in the environment. 

For example, it's common for an application to run in development or production mode: which is usually defined by some sort of environment variable (usually `NODE_ENV`).  

There's a set of environment variables defined by the OS, for example:

* `USER`: the current user
* `HOME`: the current user's home path
* `PWD`: the current working directory
* `PATH`: directories to search to execute a command

In regards to JavaScript and Node.js ecosystem, you might find the following variables common:

* `NODE_ENV`: determines if the script runs in development or production mode. Usually takes one of the values: `production`, `prod`, `development`, `dev`, or `test`
* `PORT`: the port with which the started application should work with

Let's see how you can access the environment variables (either OS or Node.js specific) in a JavaScript file.  

## 1. *process.env* object

When executing a JavaScript file in a CLI (command line interface) environment, `process.env` contains the environment variables accessible to the script.  

`process.env` is plain object where the keys are the variables names and values are the variable values.  

The following command uses Node.js to execute a JavaScript file `/home/dmitri/main.js` in the command line:

```bash
NODE_ENV=production node main.js
```

Where `main.js` file contains the following code:

```javascript
// main.js
console.log(process.env.USER); // dmitri
console.log(process.env.PWD);  // /home/dmitri/

console.log(process.env.NODE_ENV); // production
```

`process.env.USER` is the operating system user name that executes the command. The variable has a value of `'dmitri'` because this is my OS user name.  

`process.env.PWD` contains the absolute path to the directory where the executed file (`main.js`) is located. Since the executed file path is `/home/dmitri/main.js`, then the current working directory path is `'/home/dmitri/'`.  

These above variables are taken from the environment of the operating system.  

`process.env.NODE_ENV` variable equals `'production'`. This variable, contrary to the 2 above, is defined by the prefix `NODE_ENV=production` of the command `NODE_ENV=production node main.js`. 

If you'd like to provide local default values to certain environment variables, then I recommend you to check the [dotenv](https://github.com/motdotla/dotenv) project.  

## 2. *process.env* in a browser environment

The environment variables, including `process.env`, are accessible to scripts running in the CLI.  

But if you run the same script in a browser environment, then `process.env` is not available. The browser doesn't define `process.env`.  

Fortunately, *exposing* environment variables to the runtime in the browser can be done using bundlers. Let's see how it's done using Vite and Webpack.   

### 2.1 Vite

Vite exposes a predefined set of variables using `import.meta.env` object:

* `import.meta.env.MODE`: is either `'development'` or `'production'`
* `import.meta.env.PROD`: is `true` in production mode
* `import.meta.env.DEV`: is `true` in development mode
* `import.meta.env.SSR`: is a boolean whether the app runs on the server side
* `import.meta.env.BASE_URL`: the base URL

On top of that, Vite can also load variables from `.env` file. Under the hood, Vite uses [dotenv](https://github.com/motdotla/dotenv). But you don't have to manually call anything related to dotenv: Vite does everything for you.

For example having an `.env` file like this:

```bash
VITE_MY_VAR=value
```

then you can access in the browser during runtime `import.meta.env.VITE_MY_VAR`, which is going to be `'value'`.  

Please note that Vite exposes publicly only variables starting with `VITE_` prefix. 

Open the [demo](https://stackblitz.com/edit/vitejs-vite-61fsdd?file=src%2FApp.vue) and see that the variables provided by Vite are rendered on the webpage.  

Vite has a [detailed guide](https://vitejs.dev/guide/env-and-mode.html) on how to access the environment variables.  

### 2.2 Webpack

Unlike Vite, Webpack doesn't expose variables to the web application out of the box.  

But it can be easily achieved using the [EnvironmentPlugin](https://webpack.js.org/plugins/environment-plugin/), which is a built-in webpack plugin.  

For example, to expose the `NODE_ENV` env variable, you can use the following configuration:

```javascript {7}
// webpack.config.js
const { EnvironmentPlugin } = require('webpack');

module.exports = {
  // ...
  plugins: [
    // ...
    new EnvironmentPlugin(['NODE_ENV'])
  ]
}
```

Open the [demo](https://stackblitz.com/edit/webpack-5-react-starter-twfbyv?file=src%2Fapp.tsx). `NODE_ENV` variable was exposed by Webpack and its value is rendered on the webpage.  

If `NODE_ENV` variable is not available in the environment, the plugin will throw an error. But you can assign a default value to a variable using a plain JavaScript object (with the value being the default value):

```javascript {8}
// webpack.config.js
const { EnvironmentPlugin } = require('webpack');

module.exports = {
  // ...
  plugins: [
    // ...
    new EnvironmentPlugin({
      NODE_ENV: 'development'
    })
  ]
}
``` 

With the above configuration, if `NODE_ENV` variable isn't set up, Webpack will default `process.env.NODE_ENV` to `development`.  

## 3. Conclusion

A JavaScript file executed in CLI can access the environment variables using the special object `process.env`. 

For example, `process.env.USER` contains the user name that executes the script.  

The environment variables are not available during runtime in a browser. But modern bundlers like Vite and Webpack can expose certain variables.  

For example, Vite exposes the current running mode of the application using `import.meta.env.MODE`. 

In webpack `EnvironmentPlugin` let's you expose the necessary variables.  