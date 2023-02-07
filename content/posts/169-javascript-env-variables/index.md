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

Environment variables in JavaScript are helpful to define how your application must behave depending on conditions defined in the environment where the app runs. The environment can be the Operating System, the Docker container, etc.  

There's a set of environment variables defined by the OS, for example:

* `USER`: the current user
* `HOME`: the current user's home path
* `PWD`: the current working directory
* `PATH`: directories to search to execute a command

In regards to JavaScript and Node.js ecosystem, you might find the following variables:

* `NODE_ENV`: determines if the script runs in development or production mode. Usually takes one of the values: `production`, `prod`, `development`, `dev`, or `test`
* `PORT`: the port with which the started application should work with

Let's see how you can access the environment variables (either OS or Node.js specific) in a JavaScript file.  

## 1. *process.env* object

When executing a JavaScript file in a CLI (command line interface) environment, `process.env` contains the environment variables accessible to the script.  

The keys are the env variable names, while the values are the env variable values.  

The following command uses Node.js to execute a JavaScript file `main.js` in the command line:

```bash
NODE_ENV=production node main.js
```

And let's say that `/home/dmitri/main.js` file contains the following code:

```javascript
// main.js
console.log(process.env.USER); // dmitri
console.log(process.env.PWD);  // /home/dmitri/

console.log(process.env.NODE_ENV); // production
```

`process.env.USER` accesses the operating system user name that executes the command. The variable has a value of `'dmitri'` because this is my user name in the operating system.  

`process.env.PWD` contains the absolute path to the folder where the executed file (`main.js`) is located. Since the executed file path is `/home/dmitri/main.js`, then the current working folder path is `'/home/dmitri/'`.  

These environment variables are taken from the environment of the operating system.  

`process.env.NODE_ENV` variable, however, is defined by the prefix `NODE_ENV=production` of the command `NODE_ENV=production node main.js`. 

If you'd like to provide local default values to certain environment variables, then I recommend you to check the [dotenv](https://github.com/motdotla/dotenv) project.  

## 2. *process.env* in a browser environment

The environment variables are accessible to scripts running in the command line interface (CLI) mode.  

To access a certain environment variable during the runtime of your application requires additional steps.  

Exposing certain environment variables can be done using the specific bundler you're using.  

### 2.1 Vite

Vite exposes a predefined set of variables using `import.meta.env` object. 

There's a list of predefined variables: 

* `import.meta.env.MODE`: is either `'development'` or `'production'`
* `import.meta.env.PROD`: is `true` in production mode
* `import.meta.env.DEV`: is `true` in development mode
* `import.meta.env.SSR`: is a boolean whether the app runs on the server side
* `import.meta.env.BASE_URL`: the base URL

On top of that, Vite can load variables from `.env` file:

```bash
VITE_MY_VAR=value
```

which then you can access in the browser during runtime as `import.meta.env.VITE_MY_VAR`.  

Here is important to note that Vite exposes publicity only variables that start with `VITE_` prefix.  

Under the hood, Vite uses [dotenv](https://github.com/motdotla/dotenv). But you don't have to manually call anything related to dotenv: Vite does everything for you.

Open the [demo](https://stackblitz.com/edit/vitejs-vite-61fsdd?file=src%2FApp.vue) and see that the variables provided by Vite are rendered on a webpage.  

Vite has a [detailed guide](https://vitejs.dev/guide/env-and-mode.html) on how to access the environment variables.  

### 2.2 Webpack

Unlike Vite, Webpack out of the box doesn't expose any variables to the web application.  

But it can be easily achieved using the [EnvironmentPlugin](https://webpack.js.org/plugins/environment-plugin/).  

For example, if you'd like to expose the `NODE_ENV` env variable, you can use the following configuration:

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

Open the [demo](https://stackblitz.com/edit/webpack-5-react-starter-twfbyv?file=src%2Fapp.tsx) and take a look that `NODE_ENV` variable was exposed by Webpack and is rendered on the webpage.  

A nuance with the above configuration is that in case `NODE_ENV` variable is not available in the environment, the plugin will throw an error.  

To assign a default value to variable use a plain JavaScript object with the value being the default value:

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

With the above configuration, if `NODE_ENV` variable isn't set up, Webpack will simply default `process.env.NODE_ENV` to `development`.  

## 3. Conclusion

A JavaScript file that is executed in CLI can access the environment variables using the special object `process.env`. 

For example, `process.env.NODE_ENV` contains the value of the `NODE_ENV` variable.  

Normally the environment variables are not available to the web application during runtime in a browser environment. But modern bundlers like Vite can expose certain variables to the application runtime. 

For example, Vite exposes the current running mode of the application using `import.meta.env.MODE`.  