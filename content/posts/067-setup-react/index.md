---
title: 'How To Setup Your Local React Playground'
description: 'How to setup your local React playground in 3 easy steps: install parcel, create 2 source files, run parcel. Then... play with React!'
published: '2020-02-11T12:00Z'
modified: '2020-02-11T12:00Z'
thumbnail: './images/react-playground-3.png'
slug: react-playground-setup
tags: ['react']
recommended: ['use-react-memo-wisely', 'react-fetch-lifecycle-methods-hooks-suspense']
type: post
commentsThreadId: react-demo-setup
---

Periodically you'd need a local React playrground to check new features of React, or anything else.  

These days, setting up a React project manually would require to setup Webpack, Babel, or who knows what else. For a quick demo setup, you don't have to care about these.  

In this post, I will show you how to setup a React demo in 3 easy steps.  

## 1. Step 1: install parcel

The first step is just one command: install the parcel builder.

You can install it globally with npm:

```bash
npm install -g parcel-bundler
```

or if you use yarn:

```bash
yarn global add parcel-bundler
```

After the installation is complete, you could easily create the source files.  

## 2. Step 2: create source files

Next, you'd need to create the folder of your demo project, with 2 files in it: the HTML code and the app.js.  

Let's create a new directory for the demo project. I will name the project `react-demo`, but you can choose your own.

```bash
mkdir react-demo && cd react-demo
```

Now, being inside the `react-demo` directory, let's create 2 source files.  

The first file `index.html` contains the base HTML code:

```html
<!-- index.html -->
<html>
<body>
  <div id="root"></div>
  <script src="./index.jsx"></script>
</body>
</html>
```

The second file `index.jsx` contains the base React code:

```jsx
// index.jsx
import React from 'react';
import ReactDOM from 'react-dom';

function App() {
  return <h1>Your React Playground is ready!</h1>;
}

ReactDom.render(
  <App />,
  document.getElementById('root')
);
```

## 3. Step 3: run parcel

After the files `index.html` and `index.jsx` are created in your playground project's directory, what you have to do is run the parcel build command:

```bash
parcel index.html
```

What a bit until parcel automatically loads all the dependencies (`react`, `react-dom`, etc). Note that parcel tries to load the latest stable dependencies at the time of installation.  

Finally your playground is available at http://localhost:1234. Have fun!

`parcel` watches for changes you make to the source files. As soon as you change the code, the application is automatically rebuilt and the changes are reflected in the browser. Pretty cool!

## 4. Customizations

Let's see the common customizations you'd possible need.

### 4.1 Add CSS

Adding styles to your local playground application is really easy.  

First, you'd need to update the `index.html` to link to the new external CSS file:

```html{3-5}
<!-- index.html -->
<html>
<head>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div id="root"></div>
  <script src="./index.jsx"></script>
</body>
</html>
```

Second, create the file `styles.css` in your playground project directory:

```css
/* styles.css */
h1 {
  font-style: italic;
}
```

Without any further configuration, parcel should pickup the new CSS file and apply it. That's all.

### 4.2 Specific versions of dependencies

By default paracel loads the latest stable dependencies of React, but you could easily customize their versions.  

After the first build, `parcel` automaitcally creates a `package.json` file in the project directory. 

So if you need a custom version of React, for example, simply update `package.json`:

```json{4-5}
// package.json
{
  "dependencies": {
    "react": "16.12.0",
    "react-dom": "16.12.0"
  }
}
```

### 4.3 TypeScript support

Amazing, but enabling TypeScript support requires you to just name the React source file as `index.tsx` (`.tsx` extension instead of `.jsx`), and parcel automatically enables the support of TypeScript.  

So, at step 2 create a file `index.tsx` having TypeScript code:

```tsx
// index.tsx
import * as React from 'react';
import ReactDOM from 'react-dom';

function App(): JSX.Element {
  return <h1>Your React Playground is ready!</h1>;
}

ReactDom.render(
  <App />,
  document.getElementById('root')
);
```

## 5. Conclusion

Playgrounds are a great way to play with the new features of React. If you prefer to have all your source code locally, then using parcel is a good start.  

To setup a local React playground you have to make only 3 easy steps. Install parcel builder globally, create your project directory with 2 source files: the HTML and main React source file. Finally, just run parcel build command. The playground is ready! 

If for some reason you don't like `parcel`, an alternative is the known react-create-app. Or if you don't like local playgrounds at all, I had a good experience with [codesandbox.io](https://codesandbox.io/).  

Happy playing!