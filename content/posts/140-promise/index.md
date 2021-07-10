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

I think the problem was that most of the tutorials were solely describing the promise object, its methods, etc. I don't care too much about promises directly, I care about
them only in how they can make my life easier!

What follows is the post that I wanted to read in order to understand promises myself. The post shows how promises can make your life easier when coding asynchornous logic.  

## 1. Why promises

JavaScript works well with imperative and synchronous code.  

<div id="sync-code"></div>

```javascript
function getList() {
  return ['Joker', 'Batman', 'Cat Woman'];
}

function findPerson(who) {
  const list = getList();

  return list.some(person => person === who);
}

findPerson('Joker'); // => true
```

The snippet above is synchronous and blocking code. Which simply means that when JavaScript enters into `findPerson()` function, it doesn't get out of there
until executed.  

Getting the list of persons `const list = getList()` is a synchronous operation too.  

Until now, everything seems easy and straighforward.  

But what would happen if accessing the list of persons `getListDelayed()` is an operation that requires, for example, 1 second. Unfortunately, now the things become more complicated.  

```javascript{3,8}
function getListDelayed() {
  setTimeout(() => {
    // ...how to return the list?
  }, 1000);
}

function findPerson(who) {
  // ...how to access the list?

  return list.some(person => person === who);
}

findPerson('Joker');
```

How in such a case `getList()` would return the list of persons with a delay of 1 second. Same way, how would `findPerson(who)` access the list of persons that's returned with a delay?

### 1.1 The callback approach

One classic approach would be to introduce callbacks:

```javascript
function getListDelayed(callback) {
  setTimeout(() => {
   callback(['Joker', 'Batman', 'Cat Woman']);
  }, 1000);
}

function findPerson(who, callback) {
  getListDelayed(list => {
    callback(list.some(person => person === who))
  });
}

findPerson('Joker', result => {
  console.log(result); // => true
});
```

The callbacks approach works. But what is the price? 

By adding callbacks, `getListDelayed(callback)` as well `findPerson(who, callback)` become more complex because they need one more argument: the callback.  

Moreover, such code is harder to understand because the flow of calculations is hidden in between callbacks. Compare this code with the [synchronous code snippet](#sync-code): which is clearly easier to understand.  

The problem becomes more apparent when you'd try to use results from multiple asynchornous operations using callbacks. The more operations you handle, the more callbacks are nested into each other creating so calleed [callback hell problem](http://callbackhell.com/).  

```javascript
asyncOperation1(result1 => {
  asyncOperation2(result2 => {
    asyncOperation3(result3 => {
      console.log(result1 + result2 + result3);
    });
  });
})
```

While callbacks have their good place in JavaScript, still, let's find a better solution.  

### 1.2 An object encapsulating the operation result

Like I mentioned above, I really like the synchornous code because it is easy to understand. You see, step by step and line by line how the code is executed.  

Let me write again the synchornous code example:

```javascript
function getList() {
  return ['Joker', 'Batman', 'Cat Woman'];
}

function findPerson(who) {
  const list = getList();

  return list.some(person => person === who);
}

findPerson('Joker'); // => true
```

How would it be possible to code asynchornous operations, while still keeping the readability of synchronous code?  

What about still returning from `getListDelayed()` the list of persons, 

## 2. What is a promise

## 3. Promise state

## 4. Chain of promises

## 5. *async/await*

## 6. Conclusion