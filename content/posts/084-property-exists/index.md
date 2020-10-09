---
title: "3 Ways to Check If an Object Has a Property in JavaScript"
description: "The 3 ways to check if an object has a property in JavaScript: hasOwnProperty() method, in operator, comparing with undefined."
published: "2020-06-16T09:00Z"
modified: "2020-10-09T09:50Z"
thumbnail: "./images/cover.png"
slug: check-if-object-has-property-javascript
tags: ["javascript", "object"]
recommended: ["7-tips-to-handle-undefined-in-javascript", "own-and-inherited-properties-in-javascript"]
type: post
commentsThreadId: check-if-object-has-property-javascript
---

Due to the dynamic nature of JavaScript, sometimes you need to verify whether a specific property exists in an object.  

In this post, you'll read about the 3 common ways to check for property existence.  

```toc
```

## 1. *hasOwnProperty()* method

Every JavaScript object has a special method `object.hasOwnProperty('myProp')` that returns a boolean indicating whether `object` has a property `myProp`. 

In the following example, `hasOwnProperty()` determines the presence of properties:

```javascript
const hero = {
  name: 'Batman'
};

hero.hasOwnProperty('name');     // => true
hero.hasOwnProperty('realName'); // => false
```

`hero.hasOwnProperty('name')` returns `true` because the property `name` exists in the object `hero`.  

On the other side, `hero` doesn't have `realName` property. Thus `hero.hasOwnProperty('realName')` returns `false` &mdash; denoting a missing property.  

The method name `hasOwnProperty()` suggests that it looks for properties in the [own properties](/own-and-inherited-properties-in-javascript/#1-own-properties) of the object. The own properties are those defined directly upon the object.  

`hasOwnProperty()` doesn't detect `toString` as a property because it is inherited:

```javascript
const hero = {
  name: 'Batman'
};

hero.toString; // => function() {...}

hero.hasOwnProperty('toString'); // => false
```

## 2. *in* operator

`'myProp' in object` also determines whether `myProp` property exists in `object`.  

Let's use `in` operator to detect the existence of a property:

```javascript
const hero = {
  name: 'Batman'
};

'name' in hero;     // => true
'realName' in hero; // => false
```

`'name' in hero` evaluates to `true` because `hero` has a property `name`. 

On the other side, `'realName' in hero` evaluates to `false` because `hero` doesn't have a property named `'realName'`.  

`in` operator has a short syntax, and I prefer it over `hasOwnProperty()` method in most of the cases.  

The main difference between `hasOwnProperty()` method and `in` operator is that the latter checks within the own properties and also in the list of inherited properties.  

That's why, in contrast to `hasOwnProperty()`, the `in` operator detects that the inherited property `toString` exists inside `hero` object:

```javascript{7-8}
const hero = {
  name: 'Batman'
};

hero.toString; // => function() {...}

'toString' in hero;              // => true
hero.hasOwnProperty('toString'); // => false
```

## 3. Comparing with *undefined*

If you access a non-existing property from an object, the result is `undefined`:

```javascript{6}
const hero = {
  name: 'Batman'
};

hero.name;     // => 'Batman'
hero.realName; // => undefined
```

`hero.realName` evaluates to `undefined` because `realName` property is missing.  

Now you can see an idea: let's compare against `undefined` to determine the existence of the property.  

```javascript{6}
const hero = {
  name: 'Batman'
};

hero.name !== undefined;     // => true
hero.realName !== undefined; // => false
```

`hero.name !== undefined` evaluates to `true`, which shows the existence of property. 

On the other side, `hero.realName !== undefined` is `false`, which indicates the `realName` is missing.  

Comparing with `undefined` to detect the existence of property is a cheap and dirty approach. 

Be aware of false-negative. If the property exists, but has `undefined` value (case, however, rarely happening), comparing against `undefined` evaluates incorrectly to `false`:

```javascript
const hero = {
  name: undefined
};

hero.name !== undefined; // => false
```

Even if the property `name` exists (but has `undefined` value), `hero.name !== undefined` evaluates to `false`: which incorrectly indicates a missing property.  

## 4. Summary

There are mainly 3 ways to check if the property exists.  

The first way is to invoke `object.hasOwnProperty(propName)`. The method returns `true` if the `propName` exists inside `object`, and `false` otherwise.  

`hasOwnProperty()` searches only within the [own](/own-and-inherited-properties-in-javascript/#1-own-properties) properties of the object.  

The second approach makes use of `propName in object` operator. As well, the operator evaluates to `true` for an existing property, and `false` otherwise.  

`in` operator looks for properties existence in both [own](/own-and-inherited-properties-in-javascript/#1-own-properties) and [inherited](/own-and-inherited-properties-in-javascript/#2-inherited-properties) properties.  

Finally, you can simply use `object.propName !== undefined` and compare against `undefined` directly.  

*What's your preferred way to check for properties existence?*