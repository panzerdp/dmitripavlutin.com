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

Prototypal inheritance in JavaScript is an important concept, however, slightly conter-intuitive. *You don't know JavaScript until you know prototypal inheritance.*  

In this post, you'll read an accessible explanation of prototypal inheritance in JavaScript.  

## 1. Objects only

In JavaScript there are only primitives types, `null`, `undefined` and objects. A big world of objects.  

In Java or PHP languages there's a concept of *class*: a template or plan that describes the propeties and method of objects. 

But JavaScript doesn't have the concept of class &mdash; there are only objects.  

## 2. Inheritance

A primitive type is atomic, meaning that it cannnot be further deviced into smaller pieces. For example, a boolean `false` is atomic because you cannot divided into something smaller.

An object, however, is a composable structure. In JavaScript an object consists of multiple properties: key and value pairs.  

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

In JavaScript you can make an object *inherit* the properties from another object. The object from where the properties are inherited is named *prototype*.  

Following the example, you can make `pet` a *prototype* of `cat` and `dog`. Then `cat` and `dog` will *inherit* `legs` property from `pet`.  

[Object.create(prototype, propertiesObject)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create) is an utility function that creates a new object from `propertiesObject` and makes `prototype` as the prototype of the created object.  

Let's use `Object.create()` and make `pet` the prototype object of both `cat` and `dog`:

```javascript
const pet = { legs: 4 };

const cat = Object.create(pet, { sound: 'Meow!' });
const dog = Object.create(pet, { sound: 'Bark!' });

cat.legs; // => 4
dog.legs; // => 4
```

`legs` property inside `cat` and `dog` is now an *inherited property*. `sound` property, on the other side, is an *own property* because it's defined directly upon the object.  

![Prototypal Inheritance in JavaScript](./images/prototypal-inheritance-3.png)

> The essense of protypal inheritance in JavaScript: objects can inherit properties from other objects &mdash; the prototypes.  

## 4. The implicit prototype

Every time you create an object, if no prototype is explicitely set, JavaScript assigns an implicit prototype object specific to the type of object you've created.   

Let's look again at the `pet` object:

```javascript
const pet = { legs: 4 };

pet.toString(); // => `[object Object]`
```

`pet` has just one property `legs`, however you can invoke the method `pet.toString()`. Where did `toString()` come from?  

When you've created the `pet` object, JavaScript has assigned to it an implicit prototype object. From its prototype `pet` inherits `toString()` method:  

```javascript
const pet = { legs: 4 };

const petPrototype = Object.getPrototypeOf(pet);

pet.toString === petPrototype.toString; // => true
```

[Object.getPrototypeOf(object)]() is an utility function that returns the prototype of an object.  

## 5. The prototype chain

Let's go deeper and create an object `tail`, and set this object as a prototype of `pet`:

```javascript
const tail = { hasTail: true };
const pet = Object.create(tail, { legs: 4 });
const cat = Object.create(pet, { sound: 'Meow!' });
const dog = Object.create(pet, { sound: 'Bark!' });

cat.hasTail; // => true
dog.hasTail; // => true
```

`cat` and `dog` inherit the property `legs` from their direct prototype `pet`, however they inherit `hasTail` from the prototype of their prototype. 

That's called the prototype chain.  

![Prototypal Inheritance Chain in JavaScript](./images/prototypal-inheritance-chain.png)

JavaScript looks for inherited properties in chain. When you'd like to access a property `myObject.myProp`, JavaScript looks for `myProp` inside the own properties of `myObject`, then in the prototype of the object, then in the prototype's prototype and so on until it encounters `null` as the prototype.  

## 6. But JavaScript has classes!

You may be confused regarding the statement that JavaScript has only objects. You've probably already used `class` keyword in JavaScript!

For example, you can write a class `Pet`:

```javascript
class Pet {
  legs: 4;

  constructor(sound) {
    this.sound = sound;
  }
}

const cat = new Pet('Moew');
const dog = new Pet('Bark!');

cat.legs; // => 4
dog.legs; // => 4
```

and create `cat` and `dog` objects when instantiaging the class. 

The answer is that even when using `class` syntax, under the hood prototypes are used. ES2015 `class` syntax is a syntactic sugar on top of prototypal inheritance. 

The above code snippet is equivalent to the following:

```javascript
const pet = {
  legs: 4,
  constructor: CreatePet
};

function CreatePet(sound) {
  return Object.create(pet, {
    sound
  });
}

const cat = CreatePet('Moew');
const dog = CreatePet('Bark!');

cat.legs; // => 4
dog.legs; // => 4
```

where `constructor` is a special property that links to the function that constructs the object, which in this case is `CreatePet`.  

## 7. Summary

JavaScript has only primitive types, `null`, `undefined` and objects. 

Compared to languages like Java or PHP, in JavaScript there's no concept of class that serves as a template to create objects.  

Rather, in JavaScript objects inherit properties from other objects &mdash; the prototypes. That's the prototypal inheritance.  

JavaScript looks for inherited properties not only in the direct prototype of the object, but also in the prototype of the prototype, and so on in chain.  

Finally, JavaScript still provides the classic syntax of `class`-es. However, this syntax is only a syntactic sugar on top of prototypes.  

*Have questions about protoypal inheritance? Ask in a comment bellow!*