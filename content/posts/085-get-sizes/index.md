---
title: "How to Get the Screen, Window, and Web Page Sizes in JavaScript"
description: "How to Get the Screen, Window, and Web Page Sizes in JavaScript."
published: "2020-06-23T12:00Z"
modified: "2020-06-23T12:00Z"
thumbnail: "./images/cover.png"
slug: screen-window-page-sizes
tags: ["browser"]
recommended: ["7-tips-to-handle-undefined-in-javascript", "own-and-inherited-properties-in-javascript"]
type: post
commentsThreadId: screen-window-page-sizes
---

To detect whether the browser window is in landscape or portrait mode, one way to find out this information is to compare the window's width and height.  

To determine the device orientation you need to access the window width's and height.  

From my experience, it's easy to get confused in the bunch of sizes: screen, window, web page sizes. 

How exactly are these sizes defined, and, importantly, how to access them is what I'm going to discuss with you.  

```toc
```

## 1. The screen

### 1.1 The screen size

> *The screen size* consists of the width and height of the screen: a the monitor (in case of a desktop or laptop OS), or a mobile screen (in case of a mobile device).  

![Screen size](./images/screen-size-2.png)

`window.screen` is the object that holds the screen size information. Here's how to access the screen width and height:

```javascript
const screenWidth  = window.screen.width;
const screenHeight = window.screen.height;
```

### 1.2 The available screen size

> *The available screen size* consists of the width and height of the active screen without the Operating System toolbars.  

![Screen size](./images/avail-screen-size-3.png) 

To access the available screen size you can use again the `window.screen` object:

```javascript
const availScreenWidth  = window.screen.availWidth;
const availScreenHeight = window.screen.availHeight;
```

## 2. The window

### 2.1 The window outer size

> *The outer window size* consists of the width and height of the entire browser window, including the address bar, tabs bar, and other browser bars or panels.  

![Window outer size](./images/window-outer-size-2.png)

To access the outer window size, you can use the properties `outerWidth` and `outerHeight` that are available directly on the `window` object:  

```javascript
const windowOuterWidth  = window.outerWidth;
const windowOuterHeight = window.outerHeight;
```

### 2.2 The window inner size

> *The inner window size* consists of the width and height of the browser panel that displays the web page.  

![Window inner size](./images/window-inner-size-2.png)

`window` object provides the necessary properties `innerWidth` and `innerHeight`:

```javascript
const windowInnerWidth  = window.innerWidth;
const windowInnerHeight = window.innerHeight;
```

## 3. The web page size

> The web page size consists of the width and height of the web page content, and particularly the size of the `<body>` DOM element.  

![Web page size](./images/web-page-size.png)



## 4. Summary