---
title: '3 Easy Steps to Setup a React Demo'
description: 'How to setup easily a React demo to serve as a playground, features check, or any other purposes.'
published: '2020-02-11T12:00Z'
modified: '2020-02-11T12:00Z'
thumbnail: './images/demo-setup-5.png'
slug: react-demo-setup
tags: ['react']
recommended: ['use-react-memo-wisely', 'react-fetch-lifecycle-methods-hooks-suspense']
type: post
commentsThreadId: react-demo-setup
---

Periodically you'd need a quick demo setup to check new features of React, or anything else.  

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
<html>
<body>
  <script src="./app.jsx"></script>
</body>
</html>
```

The second file `app.jsx` contains the base React code:

```jsx

```


## 3. Step 3: run parcel

## 4. Slight corrections

## 5. Alternative ways

## 5. Conclusion