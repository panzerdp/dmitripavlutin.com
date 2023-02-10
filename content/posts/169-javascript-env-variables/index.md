---
title: "Environment Variables in JavaScript: process.env"
description: "How to access environment variables in JavaScript using process.env and expose them to the browser runtime using bundlers like Vite and webpack."  
published: "2023-02-08"
modified: "2023-02-08"
thumbnail: "./images/environment-variables-javascript-2.png"
slug: environment-variables-javascript
tags: ['javascript', 'nodejs']
recommended: ['javascript-import-meta', 'ecmascript-modules-nodejs']
type: post
---

The environment variables are defined outside of the JavaScript execution context.  

There's a set of environment variables defined by the OS, for example:

* `USER`: the current user
* `HOME`: the current user's home path
* `PWD`: the current working directory
* `PATH`: directories to search in order to execute a command

In terms of the JavaScript and Node.js ecosystem, the following variables are common:

* `NODE_ENV`: determines if the script runs in development or production mode. Usually takes one of the values: `production`, `prod`, `development`, `dev`, or `test`
* `PORT`: the port the running application will use (e.g. `3000`, `8080`, etc.)

Let's see how you can access these environment variables (either OS or Node.js specific) in a JavaScript file.  

## 1. *process.env* object

When executing a JavaScript file as a Node CLI (command line interface) command, Node creates a special `process.env` object that contains the environment variables as properties.  

For example, let's execute the JavaScript file `main.js` in the command line:

```bash
cd /home/dmitri/
NODE_ENV=production node main.js
```

Where `main.js` file contains the following code:

```javascript
// /home/dmitri/main.js
console.log(process.env.USER); // dmitri
console.log(process.env.PWD);  // /home/dmitri/

console.log(process.env.NODE_ENV); // production
```

`process.env.USER` is the operating system user name that executes the command. The variable has a value of `'dmitri'` because this is my OS user name.  

`process.env.PWD` contains the absolute path to the current working directory. Since the executed file path is `/home/dmitri/main.js`, then the current working directory is `/home/dmitri/`.  

The above variables are taken from the environment of the operating system.  

`process.env.NODE_ENV` variable equals `'production'`. This variable is defined by the prefix `NODE_ENV=production` of the command `NODE_ENV=production node main.js`. 

If you'd like to provide local defaults to certain environment variables, then check the [dotenv](https://github.com/motdotla/dotenv) project.  

## 2. *process.env* in a browser environment

The environment variables, including `process.env`, are accessible to scripts running in the CLI.  

`process.env`, however, is not available in a browser environment.  

Fortunately, *exposing* environment variables to the browser runtime can be done using bundlers. Let's take a look at how it's done using Vite and webpack.   

### 2.1 Vite

Vite exposes a predefined set of variables through `import.meta.env` object:

* `import.meta.env.MODE`: is either `'development'` or `'production'`
* `import.meta.env.PROD`: is `true` in production mode
* `import.meta.env.DEV`: is `true` in development mode
* `import.meta.env.SSR`: is a boolean whether the app runs on the server side
* `import.meta.env.BASE_URL`: the base URL

On top of that, Vite can also load variables from `.env` file. Under the hood, Vite uses [dotenv](https://github.com/motdotla/dotenv). But you don't have to manually call anything related to dotenv: Vite does everything for you.

For example, having an `.env` file like this:

```bash
VITE_MY_VAR=value
```

then you can access this value in the browser at runtime `import.meta.env.VITE_MY_VAR`, which will be `'value'`.  

Note that Vite exposes publicly only variables starting with `VITE_` prefix (but this can be [configured](https://vitejs.dev/config/shared-options.html#envprefix)).  

In the [demo](https://stackblitz.com/edit/vitejs-vite-61fsdd?file=src%2FApp.vue) the environment variables provided by Vite are rendered on the webpage.  

Vite has a [detailed guide](https://vitejs.dev/guide/env-and-mode.html) on how to access the environment variables.  

### 2.2 webpack

The built-in plugin [EnvironmentPlugin](https://webpack.js.org/plugins/environment-plugin/) exposes environment variables in webpack.  

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

Open the [demo](https://stackblitz.com/edit/webpack-5-react-starter-twfbyv?file=src%2Fapp.tsx). `NODE_ENV` variable was exposed by webpack and is rendered on the webpage.  

If `NODE_ENV` variable is not available in the environment, the plugin will throw an error. But you can assign a default value to a variable using a plain JavaScript object as a config (with the value being the default value):

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

With the above configuration, if `NODE_ENV` variable isn't set up, webpack defaults `process.env.NODE_ENV` to `development`.  

## 3. Conclusion

A JavaScript file executed in Node CLI can access the environment variables using the special object `process.env`. 

For example, `process.env.USER` contains the user name that executes the script.  

The environment variables are not available at runtime in a browser. But modern bundlers like Vite and webpack can expose certain variables.  

For example, Vite exposes the current running mode using `import.meta.env.MODE`. In webpack `EnvironmentPlugin` lets you expose the necessary variables.  

*What env variables do you find useful during runtime?*
