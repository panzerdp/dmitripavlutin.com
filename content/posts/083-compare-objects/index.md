---
title: "How to Compare Objects in JavaScript"
description: "How to compare objects in JavaScript: referential equality, shallow and deep comparison."
published: "2020-06-09T12:00Z"
modified: "2020-06-09T12:00Z"
thumbnail: "./images/cover-3.png"
slug: how-to-compare-objects-in-javascript
tags: ["javascript", "equality", "object"]
recommended: ["the-legend-of-javascript-equality-operator", "object-is-vs-strict-equality-operator"]
type: post
commentsThreadId: how-to-compare-javascript-objects
---

It's simple to compare primitive values in JavaScript. What you need to do is use any of the available
eqality operators, for example the strict equality operator:

```javascript
'a' === 'c'; // => false
1   === 1;   // => true
```

Object have structured data, thus they are more difficult to compare. In this post, you will learn how to 
efficiently compare objects in JavaScript.  

## 1. Referencial equality

JavaScript provides 3 ways to compare values: 

* The loose equality operator `===`
* The strict equality operator `==` 
* `Object.is()` function

When comparing objects using any of these, the comparison evaluates to `true` only if the compared values point to *the same
object instance*. This is *the referencial equality*.    

Let's define 2 objects `hero1` and `hero2`, and see the referential equality in practice:

```javascript
const hero1 = {
  name: 'Batman'
};
const hero2 = {
  name: 'Batman'
};

hero1 === hero1; // => true
hero1 === hero2; // => false

hero1 == hero1; // => true
hero1 == hero2; // => false

Object.is(hero1, hero1); // => true
Object.is(hero1, hero2); // => false
```

`hero1 === hero1` evaluates to `true` because both operands point to the same object instance `hero1`.  

On the other side, `hero1 === hero2` evaluates to `false` because the operands `hero1` and `hero2` are different object instances.  

Interestingly `hero1` and `hero2` objects have the same content: both objects have one property `name` with the value `'Batman'`. Still, even comparing objects of exactly the same structure, `hero1 === hero2` evaluates to `false`.  

Referenctial equality is useful when you'd like to compare object references, rather than their content. However, in most of the situations, you'd like to compare the actual content of the objects: the properties and their values.  

Let's see how to compare objects for equality by their content.  

## 2. Manual comparison

The obvious way to compare object by content is to access the properties and compare them manually.  

For example, let's write a special function `isHeroEqual()` that compare 2 hero objects:

```javascript
function isHeroEqual(object1, object2) {
  return object1.name === object2.name;
}

const hero1 = {
  name: 'Batman'
};
const hero2 = {
  name: 'Batman'
};

isHeroEqual(object1, object2); // => true
```

`isHeroEqual()` accesses the property `name` of both objects and compare them.  

If the compared objects have a few properties, I prefer to write the comparison functions like `isHeroEqual()` manually. They have good performance: only a few property accessors and equality operators are involved in comparison.  

Manual comparison requires manual extraction of properties &mdash; for simple objects that's not a problem. But to compare bigger objects (or object of unkown structure), the manual comparison isn't convienient because it requires a lot of boilerplate code.   

Let's see how the shallow equality of objects can help.  

## 3. Shallow equality

## 4. Deep equality

### 4.1 Deep equality utilities

## 5. Summary