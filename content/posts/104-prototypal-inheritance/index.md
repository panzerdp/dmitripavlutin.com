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

In this post you'll read an accessible explanation of prototypal inheritance in JavaScript.  

## 1. Objects only

In JavaScript there are only primitives types, `null`, `undefined` and objects. A big world of objects.  

In Java or PHP languages there's a concept of *class*: a template or plan that describes the propeties and method of objects. 

But JavaScript doesn't have the concept of class &mdash; there are only objects.  

## 2. Inheritance

A primitive type is atomic, meaning that it cannnot be further deviced into smaller pieces. For example, a boolean `false` is atomic because you cannot divided into something smaller.

An object, on the contrary to primitve types, is a composable structure. In JavaScript an object consists of multiple properties: key and value pairs.  

For example, the following objects `cat` and `dog` each has 2 properties:

```javascript
const cat = { sound: 'Meow!', limbs: 4 };
const dog = { sound: 'Bark!', limbs: 4 };
```

Being obsessed with "Do Not Repeat Yourself" (DRY) principle, I don't like that both objects have the property `limbs` with the same value `4`.  

I want to extract the `limbs` property into a specialized object `mammal`, and remove `limbs` property from both `cat` and `dog`:

```javascript
const mammal = { limbs: 4 };

const cat = { sound: 'Meow!' };
const dog = { sound: 'Bark!' };

cat.limbs; // => undefined
dog.limbs; // => undefined
```

Ok, I've made the refactoring. But I still want to have `limbs` property on `cat` and `dog`. How do I know connect the `cat` and `dog` object with `mammal`?  

Welcome inheritance.

> Inheritance is the mechanism when an object inherits properties from another object.  

## 3. The prototype object

How can you make `cat` and `dog` inherit the properties of `mammal` object in JavaScript?  

You can make the `mammal` a prototype object (aka parent) of `cat` and `dog`. Then `cat` and `dog` will *inherit* `limbs` property from `mammal`.  

In JavaScript `Object.create(prototype, object)` is an utility function that connects an `object` with a `prototype`. Let's use it:

```javascript
const mammal = { limbs: 4 };

const cat = Object.create(mammal, { sound: 'Meow!' });

const dog = Object.create(mammal, { sound: 'Bark!' });

cat.limbs; // => 4
dog.limbs; // => 4
```

Great! Now `cat` and `dog` objects both inherit `limbs` property. Now you're able to access it using `cat.limbs` and `dog.limbs`.  

`limbs` now is an *inherited property* since it's inherited from the prototype. `sound`, on the other side, is an *own property* because it's defined directly upon the object.  

That's the essense of protypal inheritance in JavaScript. Everything is an object, and objects can inherit properties from other objects (the prototypes).  

## 4. The prototype chain

Every time you create an object, if no prototype is explicitely set, JavaScript assigns a default prototype for the created object.  

Let's look again at the `mammal` object:

```javascript
const mammal = { limbs: 4 };

mammal.toString(); // => `[object Object]`
```




## 5. Object constructor

## 6. Summary