---
title: "What Makes JavaScript JavaScript? Prototypal Inheritance"
description: "You don't know JavaScript until you know prototypal inheritance. Follow up an accessible explanation of prototypal inheritance in JavaScript."
published: "2020-11-03T12:00Z"
modified: "2020-11-03T12:00Z"
thumbnail: "./images/cover.png"
slug: javascript-prototypal-inheritance
tags: ['javascript', 'prototype', 'inheritance']
recommended: ['simple-explanation-of-javascript-closures', 'own-and-inherited-properties-in-javascript']
type: post
commentsThreadId: javascript-prototypal-inheritance
---

Prototypal inheritance in JavaScript is a slightly conter-intuitive, nevertheless, an important concept. *You don't know JavaScript until you know prototypal inheritance.*  

In this post, you'll read an accessible explanation of prototypal inheritance in JavaScript.  

## 1. Objects only

In JavaScript there are only primitives types, `null`, `undefined` and objects. A big world of objects.  

In Java or PHP languages there's a concept of *class*: a template or plan that describes the propeties and method of objects. 

But JavaScript doesn't have the concept of class &mdash; there are only objects.  

## 2. Inheritance

A primitive type is atomic, meaning that it cannnot be further deviced into smaller pieces. For example, a boolean `false` is atomic because you cannot divided into something smaller.

An object, on the contrary to primitve types, is a composable structure. In JavaScript an object consists of multiple properties: key and value pairs.  

For example, the following objects `cat` and `dog` each has 2 properties:

```javascript
const cat = { sound: 'Meow!', legs: 4 };
const dog = { sound: 'Bark!', legs: 4 };
```

Following "Do Not Repeat Yourself" (DRY) principle, you don't want both objects to have the property `legs` with the same value `4`.  

Let's extract `legs` property into a specialized object `pet`:

```javascript
const pet = { legs: 4 };

const cat = { sound: 'Meow!' };
const dog = { sound: 'Bark!' };

cat.legs; // => undefined
dog.legs; // => undefined
```

Ok, you've made the refactoring. 

But you still want to have `legs` property on `cat` and `dog`. How can you know connect `cat` and `dog` with `pet`?  

Inheritance can help you!

## 3. The prototype object

You can make `pet` a *prototype object* of `cat` and `dog`. Then `cat` and `dog` will *inherit* `legs` property from `pet`.  

In JavaScript `Object.create(prototype, object)` is an utility function that connects an `object` with a `prototype`. Let's use it and make `pet` the prototype object of both `cat` and `dog`:

```javascript
const pet = { legs: 4 };

const cat = Object.create(pet, { sound: 'Meow!' });
const dog = Object.create(pet, { sound: 'Bark!' });

cat.legs; // => 4
dog.legs; // => 4
```

Great! Now `cat` and `dog` objects both inherit `legs` property. Now you can access `cat.legs` and `dog.legs`.  

`legs` property inside `cat` and `dog` is now an *inherited property* the prototype object `pet`. `sound` property, on the other side, is an *own property* because it's defined directly upon the object.  

> The essense of protypal inheritance in JavaScript: objects can inherit properties from other objects &mdash; the prototypes.  

## 4. The default prototype

Every time you create an object, if no prototype is explicitely set, JavaScript assigns a default prototype specific to the type of object you've created.   

Let's look again at the `pet` object:

```javascript
const pet = { legs: 4 };

pet.toString(); // => `[object Object]`
```

`pet` has just one property `legs`, however you can invoke the method `pet.toString()`. Where did `toString()` come from?  

When you've created the `pet` object, JavaScript has assigned to it a default prototype object. From that object `pet` inherits `toString()` method:  

```javascript
const pet = { legs: 4 };

const petPrototype = Object.getPrototypeOf(pet);

pet.toString === petPrototype.toString; // => true
```

## 5. The prototype chain

Let's return to the `cat` and `dog`. Can you run same way `toString()` method on them?  

```javascript
const pet = { legs: 4 };

const cat = Object.create(pet, { sound: 'Meow!' });
const dog = Object.create(pet, { sound: 'Bark!' });

pet.toString(); // => `[object Object]`
pet.toString(); // => `[object Object]`
```

## 6. Object constructor

## 7. Summary