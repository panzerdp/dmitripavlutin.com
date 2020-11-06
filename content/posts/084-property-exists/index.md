---
title: "3 Ways to Check If an Object Has a Property in JavaScript"
description: "The 3 ways to check if an object has a property in JavaScript: hasOwnProperty() method, in operator, comparing with undefined."
published: "2020-06-16T09:00Z"
modified: "2020-10-16T07:15Z"
thumbnail: "./images/cover.png"
slug: check-if-object-has-property-javascript
tags: ["javascript", "object"]
recommended: ["7-tips-to-handle-undefined-in-javascript", "own-and-inherited-properties-in-javascript"]
type: post
---

In this post, you'll read 3 common ways to check for property existence in a JavaScript object.  

```toc
```

## 1. *hasOwnProperty()* method

Every JavaScript object has a special method `object.hasOwnProperty('myProp')` that returns a boolean indicating whether `object` has a property `myProp`. 

In the following example, `hasOwnProperty()` determines the presence of properties `name` and `realName`:

```javascript
const hero = {
  name: 'Batman'
};

hero.hasOwnProperty('name');     // => true
hero.hasOwnProperty('realName'); // => false
```

`hero.hasOwnProperty('name')` returns `true` because the property `name` exists in the object `hero`.  

On the other side, `hero` doesn't have `realName` property. Thus `hero.hasOwnProperty('realName')` returns `false` &mdash; denoting a missing property.  

The method name `hasOwnProperty()` suggests that it looks in the [own properties](/own-and-inherited-properties-in-javascript/#1-own-properties) of the object. The own properties are those defined directly upon the object.  

Because of that `hasOwnProperty()` doesn't detect the inherited `toString` property:

```javascript{7}
const hero = {
  name: 'Batman'
};

hero.toString; // => function() {...}

hero.hasOwnProperty('toString'); // => false
```

## 2. *in* operator

`'myProp' in object` also determines whether `myProp` property exists in `object`.  

Let's use `in` operator to detect the existence of `name` and `realName` in `hero` object:

```javascript
const hero = {
  name: 'Batman'
};

'name' in hero;     // => true
'realName' in hero; // => false
```

`'name' in hero` evaluates to `true` because `hero` has a property `name`. 

On the other side, `'realName' in hero` evaluates to `false` because `hero` doesn't have a property named `'realName'`.  

`in` operator has a short syntax, and I prefer it over `hasOwnProperty()` method.  

The main difference between `hasOwnProperty()` method and `in` operator is that the latter checks within *own and inherited* properties of the object.  

That's why, in contrast to `hasOwnProperty()`, the `in` operator detects that `hero` object contains the inherited property `toString`:

```javascript{7-8}
const hero = {
  name: 'Batman'
};

hero.toString; // => function() {...}

'toString' in hero;              // => true
hero.hasOwnProperty('toString'); // => false
```

## 3. Comparing with *undefined*

Accessing a non-existing property from an object results in `undefined`:

```javascript{6}
const hero = {
  name: 'Batman'
};

hero.name;     // => 'Batman'
hero.realName; // => undefined
```

`hero.realName` evaluates to `undefined` because `realName` property is missing.  

Now you can see an idea: you can compare with `undefined` to determine the existence of the property.  

```javascript{6}
const hero = {
  name: 'Batman'
};

hero.name !== undefined;     // => true
hero.realName !== undefined; // => false
```

`hero.name !== undefined` evaluates to `true`, which shows the existence of property. 

On the other side, `hero.realName !== undefined` is `false`, which indicates that `realName` is missing.  

Comparing with `undefined` to detect the existence of property is a cheap and dirty approach. 

But be aware of false-negatives. If the property exists, but has `undefined` value (case, however, rarely happening), comparing against `undefined` evaluates incorrectly to `false`:

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

The second approach makes use of `propName in object` operator. The operator evaluates to `true` for an existing property, and `false` otherwise.  

`in` operator looks for properties existence in both [own](/own-and-inherited-properties-in-javascript/#1-own-properties) and [inherited](/own-and-inherited-properties-in-javascript/#2-inherited-properties) properties.  

Finally, you can simply use `object.propName !== undefined` and compare against `undefined` directly.  

*What's your preferred way to check for properties existence?*