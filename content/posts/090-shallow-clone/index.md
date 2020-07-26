---
title: "3 Ways to Shallow Clone Objects in JavaScript (w/ bonuses)"
description: "3 Ways to Shallow Clone Objects in JavaScript."
published: "2020-07-28T12:00Z"
modified: "2020-07-28T12:00Z"
thumbnail: "./images/cover-2.png"
slug: javascript-shallow-clone-objects
tags: ['object']
recommended: ['simple-explanation-of-javascript-closures', 'simple-but-tricky-javascript-interview-questions']
type: post
commentsThreadId: javascript-shallow-clone-objects
---

Immutability is great because it enables easier control of how data is changed and flows through the application.  

Since immutability requires no direct modification of objects, you can perform an object modification only on a clone.  

In this post, you'll find 3 easy ways to perform shallow clone (aka copy) of objects in JavaScript.  

That's not all. As a bonus, I'm going to show how when cloning objects, you can also update, add, or remove properties in place on the clone.  

### Note

Before starting, be aware that the following ways to clone objects perform only a *shallow copy* of objects.  

Shallow copy means that only the actual object gets copied. If the copied object conatins nested objects &mdash; these nested objects *are not copied* during a shallow copy.  

```toc
toHeading: 2
```

## 1. Cloning using object spread

The simplest way to clone a plain JavaScript object is to invoke the object spread operator:

```javascript
const clone = {
  ...object
};
```

For example, let's a copy of the `hero` object:

```javascript{6-8}
const hero = {
  name: 'Batman',
  city: 'Gotham'
};

const heroClone = {
  ...hero
};

heroClone; // { name: 'Batman', city: 'Gotham' }

hero === heroClone; // => false
```

`heroClone` is a clone object of `hero`, meaning that it contains all the properties of `hero`.  

At the same time, `hero === heroClone` evalutes to `false`, meaning that `hero` and `heroClone` are difference object instances.  

### 1.1 Object spread bonus: add or update cloned props

## 2. Cloning using object rest

### 2.1 Object rest bonus: remove cloned props

## 3. Cloning using *Object.assign()*

### 3.1 *Object.assing()* bonus: add or update cloned props

## 4. Summary