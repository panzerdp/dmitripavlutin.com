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

The following ways to clone objects perform *shallow copy*.  

Shallow copy means that only the actual object gets copied. If the copied object conatins nested objects &mdash; these nested objects *aren't get cloned*.  

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

`hero === heroClone` evalutes to `false`, meaning that `hero` and `heroClone` are difference object instances.  

### 1.1 Object spread bonus: add or update cloned props

An immediate benefit of using object spread is that you can update or add new properties to the cloned object in place, if you need.  

Let's clone the `hero` object, but at the same time update `name` property and add a new property `realName`:  

```javascript{6-10}
const hero = {
  name: 'Batman',
  city: 'Gotham'
};

const heroEnhancedClone = {
  ...hero,
  name: 'Batman Clone',
  realName: 'Bruce Wayne'
};

heroEnhancedClone; 
// { name: 'Batman Clone', city: 'Gotham', realName: 'Bruce Wayne' }
```

## 2. Cloning using object rest

Another good way to shallow clone objects is by using the object spread opeartor:

```javascript
const { ...clone } = object;
```

Again, let's use the rest operator to make a copy of `hero` object:  

```javascript{6}
const hero = {
  name: 'Batman',
  city: 'Gotham'
};

const { ...heroClone } = hero;

heroClone; // { name: 'Batman', city: 'Gotham' }
```

### 2.1 Object rest bonus: skip cloned props

A nice bonus when using object rest to clone objects is the ability to skip properties when cloning.  

Let's create a clone of `hero` object, but skip `city` property in the clone:

```javascript{6}
const hero = {
  name: 'Batman',
  city: 'Gotham'
};

const { city, ...heroClone } = hero;

heroClone; // { name: 'Batman' }
```

### 2.2 Super bonus: combining object spread and rest

Object spread brings the bonus of updating or adding new properties, while object rest has the benefit of skipping properties.  

Can you combine object spread and rest to inherit all these benefits? Yes, you can!

Let's clone the `hero` object, also adding a new property `realName` and skipping the property `city`:

```javascript{6-9}
const hero = {
  name: 'Batman',
  city: 'Gotham'
};

const { city, ...heroClone } = {
  ...hero,
  realName: 'Bruce Wayne'
};

heroClone; // { name: 'Batman', realName: 'Bruce Wayne' }
```

Combining the object spread and rest to clone object and perform properties manipulation in a single statement is great!  

## 3. Cloning using *Object.assign()*

Finally, `Object.assign(target, ...sources)` let's you peform the same object clone:

```javascript
const clone = Object.assign({}, object);
```

Let's use `Object.assign()` in practice and create a clone object of `hero` object:

```javascript
const hero = {
  name: 'Batman',
  city: 'Gotham'
};

const heroClone = Object.assign({}, hero);

heroClone; // { name: 'Batman', city: 'Gotham' }

hero === heroClone; // => false
```

### 3.1 *Object.assign()* bonus: add or update cloned props

`Object.assign()`, aside from cloning the object, enables you to update or add new properties to the clone.  

Let's copy the `hero` object, but at the same time update `name` property:

```javascript
const hero = {
  name: 'Batman',
  city: 'Gotham'
};

const heroClone = Object.assign({}, hero, { name: 'Batman Clone' });

heroClone; // { name: 'Batman Clone', city: 'Gotham' }
```

`Object.assign({}, hero, { name: 'Batman Clone' })` creates the object in 2 steps.

First, the second argument `hero` is merged into the first argument `{}`. This equals to `{ name: 'Batman', city: 'Gotham' }`.  

Second, the third argument `{ name: 'Batman Clone' }` is merged into the result from previous step, which actually overwrites the property `name`. And you get the final object `{ name: 'Batman Clone', city: 'Gotham' }`.  

## 4. Summary

JavaScript provides 3 good ways to clone objects: using spread operator, rest operator and `Object.assign()` function.  

Aside from just cloning objects, using object spread and `Object.assign()` let's you add or updated properties when performing the clone.  

Rest operator also gives the benefit of skipping certain properties from cloning.  

And what's really great, you can combine the object spread and rest in a single statement, so you can clone the object, and at the same time add, update or skip properties from being cloned. That's useful if you'd like to embrace the immutability and be able to manipulate object properties with ease.  

*What other good ways to clone objects in JavaScript do you know?*