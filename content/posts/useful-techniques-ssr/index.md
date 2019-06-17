---
title: Useful techniques to facilitate React server-side rendering
description: Useful techniques to facilitate React server-side rendering.
published: "2018-03-17"
modified: "2018-03-17"
thumbnail: "./images/cover.jpg"
slug: useful-techniques-react-server-side-rendering
tags: ['react', 'server side rendering']
recommended: ["7-tips-to-handle-undefined-in-javascript", "object-rest-spread-properties-javascript"]
type: post
---

At the beginning of 2017 I was planning the development of a web application. Because UI interactivity was an important
requirement, the decision was to use the single-page application approach.  

React was selected to power the user interface, Redux to control the state, Express to serve assets and HTML, 
and a GraphQL service to fetch data.  

## 1. SSR mind from day one

## 2. Abstract from environment

## 3. Server vs client side routing

## 4. Solving common hydration issues  

## 5. Code splitting and dynamic imports

## 6. The prize

## 7. Conlusion

Building universal applications is demanding because of strict environment interaction discipline. A component
can't access directly browser globals like `window` or `document`, or query the client environment.  

> SSR-mind is required from day one of the project