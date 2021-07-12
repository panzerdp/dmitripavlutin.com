---
title: "What is a Promise in JavaScript?"
description: "The post that I had wanted to read to understand promises myself: how promises make your life easier when coding asynchronous logic.  "
published: "2021-07-13T12:00Z"
modified: "2021-07-13T12:00Z"
thumbnail: "./images/cover-6.png"
slug: what-is-javascript-promise
tags: ['javascript', 'promise']
recommended: ['javascript-fetch-async-await', 'promise-all']
type: post
---

I had had difficulties in understanding promises when I had been learning them back in a few years. 

The problem was that most of the tutorials were solely describing the promise object, its methods, etc. I don't care too much about promises, I care about
them as long as they make coding easier!  

What follows is the post that I had wanted to read to understand promises myself. The post shows how promises make your life easier when coding asynchronous logic.  

## 1. Why promises

JavaScript works well with imperative and synchronous code.  

<div id="sync-code"></div>

```javascript
function getList() {
  return ['Joker', 'Batman'];
}

function findPerson(who) {
  const list = getList();

  return list.some(person => person === who);
}

findPerson('Joker'); // => true
```

The snippet above is synchronous and blocking code. When JavaScript enters into `findPerson()` function, it doesn't get out of there
until the function is executed.   

Getting the list of persons `const list = getList()` is a synchronous operation too.  

Until now, everything seems easy and straighforward.  

But what would happen if accessing the list of persons `getList()` is an operation that requires, for example, 1 second. Unfortunately, now the things become more complicated.  

```javascript{3,8}
function getList() {
  setTimeout(() => {
    ['Joker', 'Batman'] // How to return the list?
  }, 1000);
}

function findPerson(who) {
  const list = /* How to access the list? */;

  return list.some(person => person === who);
}

console.log(findPerson('Joker')); // logs true
```

How to return the list of persons from `getList()` with a delay of 1 second? Same way, how would `findPerson(who)` access the list of persons that's returned with a delay?  

### 1.1 The callbacks approach

One classic approach would be to introduce callbacks:

```javascript
function getList(callback) {
  setTimeout(() => callback(['Joker', 'Batman']), 1000);
}

function findPerson(who, callback) {
  getList(list => {
    callback(list.some(person => person === who))
  });
}

findPerson('Joker', result => {
  console.log(result); // logs true
});
```

The callbacks approach works. But what is the price? 

`getList(callback)` as well `findPerson(who, callback)` become more complex because they need one more argument: the callback.  

Callbacks approach code is hard to follow because the computations flow is hidden in between callbacks. Compare this code with the [synchronous code snippet](#sync-code): which is clearly easier to understand.  

While callbacks have their good place in JavaScript, still, let's find a better solution.  

### 1.2 An object encapsulating the operation result

I like the synchornous code because it is easy to understand. You see line by line how the code is executed.  

How to code asynchronous operations, while still preserving the readability of synchronous code? 

What about returning from `getList()` the *kind-of list of persons*?  

This *kind-of list of persons* is then *kind-of checked if contains `who`*, and then *a kind-of boolean value* is returned. And what's great is that these *kind-of* results can be returned, assigned to variables just like regular objects.  

This *kind-of result* object that encapsulates (aka holds, manages, contains) the result of an asynchronous operation is a *promise of a result* object. 

There isn't anything special about the promise object: it is still the result, just wrapped in a promise because you can't have the result right now, but sometime later.  

*The main idea of promises is to allow returning data wrapped in a promise ("kind-of data") from an asynchornous function exactly like from a synchronous one, because the synchornous code is easy to understand.*

## 2. What is a promise

> *A promise* is an object that encapsulates the result of an asynchronous operation.

A promise can be in one of the following state value:

* *Pending*
* *Fullfilled* with a *value*
* *Rejected* with of a *reason*



### 2.1 Promised list of persons

Now, having an understanding of promises, let's return to the delayed list example.  

Here's how it would work when using promises:

```javascript
function getList() {
  return new Promise(resolve => {
    setTimeout(() => resolve(['Joker', 'Batman']), 1000);
  });
}

function findPerson(who, callback) {
  return getList().then(list => {
    return list.some(person => person === who);
  });
}

findPerson('Joker').then(result => {
  console.log(result); // logs true
});
```

## 3. Chain of promises

The result of an asynchornous operation is used in another asynchornous operation.  

For example, let's imagine that in the the persons searching example the person to search is also a result of an asynchronous operation.  



## 4. *async/await*

While looking at the previous code sample that use promises, you might wonder &mdash; *Hey, using promises still requires callbacks and relatively lots of boilerplate code like `.then()`, `.catch()`.*  

Your observation would be reasonable.  

Fortunately, JavaScript made a step forward in improving even better the asynchornous code by providing the `async/await` syntax: which is a really useful syntactic sugar on top of promises.  

When possible, I highly recommend working with `async/await` syntax rather than dealing with raw promises.  

Let's write down the asynchornous access of the list of persons using the promises:

```javascript
function getList() {
  return new Promise(resolve => {
    setTimeout(() => resolve(['Joker', 'Batman']), 1000);
  });
}

function findPerson(who, callback) {
  return getList().then(list => {
    return list.some(person => person === who);
  });
}

findPerson('Joker').then(result => {
  console.log(result); // logs true
});
```

Let's reduce this code by applying the `async/await` syntax, which is relatively easy:

* If you want a function to become asynchronous and handle promises, then mark it as `async`
* Inside of the `async` function body, whether you want to wait for a promise to resolve, use `await promiseExpression` syntax.  

Now let's apply these rules to the previous code snippet:

```javascript{7,8,13}
function getList() {
  return new Promise(resolve => {
    setTimeout(() => resolve(['Joker', 'Batman'], 1000);
  });
}

async function findPerson(who) {
  const list = await getList();

  return list.some(person => person === who);
}

console.log(await findPerson('Joker')); // logs true
```

Now if you look at the `async` `findPerson()` function, you would notice how similar it is to the synchornous version of that function from the beginning of the post!

## 5. Conclusion

The promise is a placeholder holding the result of an asynchornous operation. If the operation completes successfully, then the promise *fulfills* with the operation value, but if the operation fails: the promise *rejects* with the reason of the failing.  