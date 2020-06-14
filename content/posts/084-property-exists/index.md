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

As an effect, even if every JavaScript object has a property `toString` (which is a method inherited from the object's propotype), `hasOwnProperty()` doesn't detect it as an own property:

```javascript
const hero = {
  name: 'Batman'
};

hero.toString; // => function() {...}

hero.hasOwnProperty('toString'); // => false
```

## 2. *in* operator

The `in` operator `propName in object` also determines whether `propName` property exists in `object`. 

`in` operator has a short syntax, and I personally prefer it over `hasOwnProperty()` method in most of the cases to check for property existence.  

Let's use `in` operator to detect the existence of a property:

```javascript
const hero = {
  name: 'Batman'
};

'name' in hero;     // => true
'realName' in hero; // => false
```

`'name' in hero` evaluates as expected to `true` because `hero` has a property `name`. 

However, `hero` doesn't have a property named `'realName'`. As result `'realName' in hero` evaluates to `false`.  

The main difference between checking properties for existance using `hasOwnProperty()` method and `in` operator is that `in` operator doesn't check only within the own properties, but also in the list of inherited properties.  

That's why, in contrast to `hasOwnProperty()`, the `in` operator detects that the inherited property `toString` exists inside `hero` object:

```javascript
const hero = {
  name: 'Batman'
};

hero.toString; // => function() {...}

'toString' in hero; // => true
```

## 3. Comparing against *undefined*

The access of a non-existing property from an object results in `undefined` special value. Let's try an exmaple:

```javascript{6}
const hero = {
  name: 'Batman'
};

hero.name;     // => 'Batman'
hero.realName; // => undefined
```

`hero.realName` evaluates to `undefined` because `realName` property is missing.  

Now you can probably see the idea: let's simply compare against `undefined` to determine the existence of the property.  

```javascript{6}
const hero = {
  name: 'Batman'
};

hero.name !== undefined;     // => true
hero.realName !== undefined; // => false
```

`hero.name !== undefined` evaluates to `true`, which shows the existence of property. 

On the other side, `hero.realName !== undefined` is `false`, which indicates the `realName` is missing.  

I've been using quite a lot of time `undefined` value to detect the existence of a property. It's a cheap and dirty approach.  

However, note one exception when this approach is a false-negative. If the property exists, but has `undefined` value (case, however, rarely happening), comparing against `undefined` evaluates incorrectly to `false`:

```javascript
const hero = {
  name: undefined
};

hero.name !== undefined; // => false
```

Even if the property `name` exists (but has `undefined` value), `hero.name !== undefined` evaluates to `false`: which incorrectly indicates a missing property.  

## 4. Summary

The are mainly 3 ways to check the property existing in objects.  

The first one is to invoke `object.hasOwnProperty(propName)`. The method returns `true` if the property exists inside `object`, and `false` if it doesn't.  

`hasOwnProperty()` searches only within the own properties of the object.  

The second approach makes use of `propName in object` operator. As well, the operator evaluates to `true` for an existing property, and `false` otherwise.  

`in` operator looks for properties existence in both own and inherited properties of the object.  

Finally, you can simply use `object.propName !== undefined` and compare against `undefined` directly.  

*What's your prefered way to check for properties existence?*