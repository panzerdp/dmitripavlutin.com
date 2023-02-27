---
title: "3 Ways to Check If an Object Has a Property/Key in JavaScript"
description: "The 3 ways to check if an object has a property or key in JavaScript: hasOwnProperty() method, in operator, comparing with undefined."
published: "2020-06-16T09:00Z"
modified: "2023-01-25"
thumbnail: "./images/cover.png"
slug: check-if-object-has-property-javascript
tags: ["javascript", "object", "property"]
recommended: ["access-object-properties-javascript", "javascript-defined-variable-checking"]
type: post
---

In this post, you'll read 3 common ways to check for property or key existence in a JavaScript object. 

Note: In the post, I  describe property existence checking, which is the same as checking for key existence in an object.

*Before I continue, allow me to make a recommendation.* 

*If you want to significantly improve your JavaScript knowledge, take the  amazingly useful ["Modern JavaScript From The Beginning 2.0"](https://www.traversymedia.com/a/2147528886/FqXWyazh) by Brad Traversy. Use the coupon code "DMITRI" and get up to 20% discount!*

```toc
```

## 1. *hasOwnProperty()* method

Every JavaScript object has a special method `object.hasOwnProperty('myProp')` that returns a boolean indicating whether `object` has a property `myProp`. 

In the following example, `hasOwnProperty()` determines the presence of properties `name` and `realName`:

```javascript
const hero = {
  name: 'Batman'
};

console.log(hero.hasOwnProperty('name'));     // => true
console.log(hero.hasOwnProperty('realName')); // => false
```

[Try the demo.](https://jsfiddle.net/u4o85ckr/1/)

`hero.hasOwnProperty('name')` returns `true` because the property `name` exists in the object `hero`.  

On the other side, `hero` doesn't have `realName` property. Thus `hero.hasOwnProperty('realName')` returns `false` &mdash; denoting a missing property.  

The method name `hasOwnProperty()` suggests that it looks for the [own properties](/own-and-inherited-properties-in-javascript/#1-own-properties) of the object. The own properties are those defined directly upon the object.  

This way `hasOwnProperty()` doesn't detect the `toString` &mdash; an inherited method from the prototype object:

```javascript{6}
const hero = {
  name: 'Batman'
};

console.log(hero.toString); // => function() {...}

console.log(hero.hasOwnProperty('toString')); // => false
```
[Try the demo.](https://jsfiddle.net/frtdawc4/)

## 2. *in* operator

`'myProp' in object` also determines whether `myProp` property exists in `object`.  

Let's use `in` operator to detect the existence of `name` and `realName` in `hero` object:

```javascript
const hero = {
  name: 'Batman'
};

console.log('name' in hero);     // => true
console.log('realName' in hero); // => false
```
[Try the demo.](https://jsfiddle.net/r9g0nae3/)

`'name' in hero` evaluates to `true` because `hero` has a property `name`. 

On the other side, `'realName' in hero` evaluates to `false` because `hero` doesn't have a property named `'realName'`.  

`in` operator has a short syntax, and I prefer it over `hasOwnProperty()` method.  

The main difference between `hasOwnProperty()` method and `in` operator is that the latter checks within *own and inherited* properties of the object.  

That's why, in contrast to `hasOwnProperty()`, the `in` operator detects that `hero` object contains the inherited property `toString`:

```javascript{6-7}
const hero = {
  name: 'Batman'
};

console.log(hero.toString); // => function() {...}

console.log('toString' in hero);              // => true
console.log(hero.hasOwnProperty('toString')); // => false
```
[Try the demo.](https://jsfiddle.net/2urp4n0a/)

## 3. Comparing with *undefined*

Accessing a non-existing property from an object results in `undefined`:

```javascript{5}
const hero = {
  name: 'Batman'
};

console.log(hero.name);     // => 'Batman'
console.log(hero.realName); // => undefined
```
[Try the demo.](https://jsfiddle.net/cq60uw1f/)

`hero.realName` evaluates to `undefined` because `realName` property is missing.  

Now you can see the idea: you can compare with `undefined` to determine the existence of the property.  

```javascript{5}
const hero = {
  name: 'Batman'
};

console.log(hero.name !== undefined);     // => true
console.log(hero.realName !== undefined); // => false
```
[Try the demo.](https://jsfiddle.net/ouhgvf15/)

`hero.name !== undefined` evaluates to `true`, which shows the existence of property. 

On the other side, `hero.realName !== undefined` is `false`, which indicates that `realName` is missing.  

Comparing with `undefined` to detect the existence of property is a cheap and dirty approach. 

But be aware of false-negatives. If the property exists, but has `undefined` value (case, however, rarely happening), comparing against `undefined` evaluates incorrectly to `false`:

```javascript
const hero = {
  name: undefined
};

console.log(hero.name !== undefined); // => false
```
[Try the demo.](https://jsfiddle.net/5ukpcxe7/)

Even if the property `name` exists (but has `undefined` value), `hero.name !== undefined` evaluates to `false`: which incorrectly indicates a missing property.  

## 4. Summary

There are mainly 3 ways to check if the properties or keys exist in an object.  

The first way is to invoke `object.hasOwnProperty(propName)`. The method returns `true` if the `propName` exists inside `object`, and `false` otherwise.  

`hasOwnProperty()` searches only within the [own](/own-and-inherited-properties-in-javascript/#1-own-properties) properties of the object.  

The second approach makes use of `propName in object` operator. The operator evaluates to `true` for an existing property, and `false` otherwise.  

`in` operator looks for properties existence in both [own](/own-and-inherited-properties-in-javascript/#1-own-properties) and [inherited](/own-and-inherited-properties-in-javascript/#2-inherited-properties) properties.  

Finally, you can simply use `object.propName !== undefined` and compare against `undefined` directly.  

*What's your preferred way to check for properties existence?*
