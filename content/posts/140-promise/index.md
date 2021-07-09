---
title: "What is a Promise in JavaScript?"
description: "In this post I will help you understand and show how to use promises in JavaScript."
published: "2021-07-13T12:00Z"
modified: "2021-07-13T12:00Z"
thumbnail: "./images/cover-6.png"
slug: what-is-javascript-promise
tags: ['javascript', 'promise']
recommended: ['javascript-fetch-async-await', 'promise-all']
type: post
---

To be honest, I had hard time understanding promises when I had been learning them. 

Thinking back, the problem was that most tutorials were solely describing the promise object, its methods, etc.  


## 1. Why promises

JavaScript works well with imperative and synchronous code.  

```javascript
function getList() {
  return ['Joker', 'Batman', 'Cat Woman'];
}

function findPerson(who) {
  const list = getList();

  for (const person of list) {
    if (person === who) {
      return true;
    }
  }

  return false;
}

findPerson('Joker'); // => true
```

The snippet above is synchronous and blocking code. Which simply means that when JavaScript enters into `findPerson()` function, it doesn't get out of there
until executed.  

## 2. What is a promise

## 3. Promise state

## 4. Chain of promises

## 5. *async/await*

## 6. Conclusion