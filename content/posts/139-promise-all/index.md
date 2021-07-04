---
title: "How to Use Promise.all()"
description: "How to use Promise.all() to perform parallel async operations."
published: "2021-07-06T12:00Z"
modified: "2021-07-06T12:00Z"
thumbnail: "./images/cover-5.png"
slug: promise-all
tags: ['javascript', 'promise', 'async']
recommended: ['javascript-fetch-async-await', 'javascript-async-await']
type: post
---

In simple words, a promise is a placeholder for a value that's going to be available some time later. More techically, a promise is an object which allows you to access the result of an asynchornous operation. 

Sometimes, however, you'd like to agreggate together multiple asynchornous oprations handled by promises. For example, you'd like to fetch simultaniously the list of categories and products.   

JavaScript provides a helper funcion `Promise.all(arrayOrIterableOfPromise)` that allows you to starts multiple promises at once, in parallel, and then get the result in a single agreggate array.   

## 1. Promise.all()

To beging with, let's recall the possible states of promises.  

When the promise object has been created it stays in the *pending* state. If the operation completes successfully, the promise enters in the *fullfilled* state, and you can access the value.  