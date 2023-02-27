---
title: "3 Ways to Shallow Clone Objects in JavaScript (w/ bonuses)"
description: "In this post, you’ll find 3 ways to perform shallow clone (aka copy) of objects in JavaScript."
published: "2020-07-28T11:00Z"
modified: "2020-07-28T11:00Z"
thumbnail: "./images/cover-2.png"
slug: javascript-shallow-clone-objects
tags: ['javascript', 'object']
recommended: ['object-rest-spread-properties-javascript', 'how-to-compare-objects-in-javascript']
type: post
---

In this post, you'll find 3 easy ways to perform shallow clone (aka copy) of objects in JavaScript.  

As a bonus, I'm going to show how you can also update, add, or remove properties in place on the clone. That's useful when you want to perform an update on the object
in an immutable manner.    

*Before I go on, let me recommend something to you.* 

*If you want to significantly improve your JavaScript knowledge, take the  amazingly useful course ["Modern JavaScript From The Beginning 2.0"](https://www.traversymedia.com/a/2147528886/FqXWyazh) by Brad Traversy. Use the coupon code "DMITRI" and get up to 20% discount!*

### Note

The 3 ways to clone objects described in this post perform *shallow copy*.  

A shallow copy means that only the actual object gets copied. If the copied object contains nested objects &mdash; these nested objects *aren't get cloned*.  

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

Where `object` is the object you'd like to copy, and `clone` is the shallow copy of `object`.  

For example, let's create a shallow copy of `hero` object:

```javascript{5-7}
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

`hero === heroClone` evalutes to `false` &mdash; `hero` and `heroClone` are, nevertheless, difference object instances.  

### 1.1 Object spread bonus: add or update cloned props

An immediate benefit of using object spread is that you can update or add new properties to the cloned object in place if you need it.  

Let's clone the `hero` object, but update `name` property to a different value and add a new property `realName`:  

```javascript{5-9}
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

Another good way to shallow clone objects is by using the object rest operator:

```javascript
const { ...clone } = object;
```

Again, let's use the rest operator to make a copy of `hero` object:  

```javascript{5}
const hero = {
  name: 'Batman',
  city: 'Gotham'
};

const { ...heroClone } = hero;

heroClone; // { name: 'Batman', city: 'Gotham' }

hero === heroClone; // => false
```

After applying the rest operator `const { ...heroClone } = hero`, the `heroClone` variable contains a copy of `hero` object.  

### 2.1 Object rest bonus: skip cloned props

A nice bonus when using object rest is the ability to skip certain properties when cloning.  

For example, let's create a clone of `hero` object, but skip `city` property in the clone:

```javascript{5}
const hero = {
  name: 'Batman',
  city: 'Gotham'
};

const { city, ...heroClone } = hero;

heroClone; // { name: 'Batman' }
```

### 2.2 Super bonus: combining object spread and rest

Object spread brings the bonus of updating or adding new properties, while object rest has the benefit of skipping properties in the resulting clone.  

Can you combine object spread and rest into one statement to inherit all these benefits? Yes, you can!

Let's clone the `hero` object, also adding a new property `realName` and skipping the property `city`:

```javascript{5-8}
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

Combining the object spread and rest to clone objects and perform properties manipulation in a single statement is great!  

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

`Object.assign({}, hero)` creates a clone of `hero` object by merging the second argument `hero` into the first argument `{}`.  

### 3.1 *Object.assign()* bonus: add or update cloned props

`Object.assign()` enables also to update or add new properties to the clone.  

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

Second, the third argument `{ name: 'Batman Clone' }` is merged into the result from the previous step, overwriting the property `name`. Finally, you get the object `{ name: 'Batman Clone', city: 'Gotham' }`.  

## 4. Summary

JavaScript provides 3 good ways to clone objects: using spread operator, rest operator and `Object.assign()` function.  

Aside from just cloning objects, using object spread and `Object.assign()` lets you add or updated properties when creating the clone.  

Rest operator also gives the benefit of skipping certain properties when cloning.  

And what's great, you can combine the object spread and rest in a single statement, so you can clone the object, and at the same time add, update or skip properties from being cloned. 

That's useful if you'd like to embrace the immutability and be able to manipulate the cloned object's properties in place.  

*What other good ways to clone objects in JavaScript do you know?*