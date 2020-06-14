---
title: "3 Ways to Check If an Object Has a Property"
description: "3 Ways to Determine if an Object Has a Property in JavaScript"
published: "2020-06-15T12:00Z"
modified: "2020-06-15T12:00Z"
thumbnail: "./images/cover-3.png"
slug: check-if-object-has-property-javascript
tags: ["javascript", "object"]
recommended: ["the-legend-of-javascript-equality-operator", "object-is-vs-strict-equality-operator"]
type: post
commentsThreadId: check-if-object-has-property-javascript
---

In JavaScript objects can have a very different set of properties. Because of that, sometimes you might
want to check if the object has a certain property.  

Let's see the most common ways to check whether a property exists inside of a JavaScript object.

## 1. *hasOwnProperty()* method

The JavaScript object has a special method `object.hasOwnProperty(propName)` returns a boolean that indicates
whether `object` has a property `propName`.  

In the following example the method correctly determines the existing and missing of specific properties:

```javascript
const hero = {
  name: 'Batman'
};

hero.hasOwnProperty('name');     // => true
hero.hasOwnProperty('realName'); // => false
```

The property `name` exists in the object `hero`: thus `hero.hasOwnProperty('name')` returns `true`.  

On the other side, `realName` property doesn't exist in the object `hero`. As expected, `hero.hasOwnProperty('realName')` returns `false` &mdash; denoting a missing property.  

The method name `hasOwnProperty()` suggestd that it searches for the desired property in the list of [own properties](/own-and-inherited-properties-in-javascript/#1-own-properties) of the object. In simple words, the own properties are those defined directly upon the object. 

As an effect, even if every JavaScript object has the property `toString` (which is a method inherited from the object's propotype), `hasOwnProperty()` doesn't detect it as an own property:

```javascript
const hero = {
  name: 'Batman'
};

hero.toString; // => function() {...}
hero.hasOwnProperty('toString'); // => false
```

## 2. *in* operator



## 3. Comparing against *undefined*