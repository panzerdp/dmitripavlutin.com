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

Objects have structured data, thus they are more difficult to compare. In this post, you will learn how to 
efficiently compare objects in JavaScript.  

## 1. Referential equality

JavaScript provides 3 ways to compare values: 

* The loose equality operator `===`
* The strict equality operator `==` 
* `Object.is()` function

When comparing objects using any of these, the comparison evaluates to `true` only if the compared values point to *the same
object instance*. This is *the referential equality*.    

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

Interestingly `hero1` and `hero2` objects have the same content: both objects have one property `name` with the value `'Batman'`. Still, even comparing objects of the same structure, `hero1 === hero2` evaluates to `false`.  

Referential equality is useful when you'd like to compare object references, rather than their content. However, in most of the situations, you'd like to compare the actual content of the objects: the properties and their values.  

Let's see how to compare objects for equality by their content.  

## 2. Manual comparison

The obvious way to compare objects by content is to access the properties and compare them manually.  

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
const hero3 = {
  name: 'Joker'
};

isHeroEqual(hero1, hero2); // => true
isHeroEqual(hero1, hero3); // => false
```

`isHeroEqual()` accesses the property `name` of both objects and compare them.  

If the compared objects have a few properties, I prefer to write the comparison functions like `isHeroEqual()` manually. They have good performance: only a few property accessors and equality operators are involved in the comparison.  

Manual comparison requires manual extraction of properties &mdash; for simple objects, that's not a problem. But to compare bigger objects (or objects of unknown structure), the manual comparison isn't convenient because it requires a lot of boilerplate code.   

Let's see how the shallow equality of objects can help.  

## 3. Shallow equality

During *shallow equality* check of objects you have to get the list of properties (using `Object.keys()`), then check the properties' values for equality.  

Here's a possible implementation of shallow equality check of objects:

```javascript
function shallowEqual(object1, object2) {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (let index = 0; index < keys1.length; index++) {
    const k1 = keys1[index];
    const k2 = keys2[index];
    if (object1[k1] !== object2[k2]) {
      return false;
    }
  }

  return true;
}
```

Inside the function, `keys1` and `keys2` are arrays containing correspondingly the property names of `object1` and `object2`. 

`for` cycle iterates over the keys, and compares each property of `object1` and `object2` for equality `object1[k1] !== object2[k2]`.  

Now using the shallow equality you could check the object of many properties:

```javascript
const hero1 = {
  name: 'Batman',
  realName: 'Bruce Wayne'
};
const hero2 = {
  name: 'Batman',
  realName: 'Bruce Wayne'
};
const hero3 = {
  name: 'Joker'
};

shallowEqual(hero1, hero2); // => true
shallowEqual(hero1, hero3); // => false
```

`shallowEqual(hero1, hero2)` returns `true` because the objects `hero1` and `hero2` have the same properties (`name` and `realName`) with the same values.  

On the other side, `shallowEqual(hero1, hero3)` returns `false` since `hero1` and `hero3` have different properties.  

But objects in JavaScript can be nested. In such a case, unfortunately, the shallow equality doesn't work well.  

Let's perform a shallow equality on nested objects having same content:

```javascript
const hero1 = {
  name: 'Batman',
  address: {
    city: 'Gotham'
  }
};
const hero2 = {
  name: 'Batman',
  address: {
    city: 'Gotham'
  }
};

shallowEqual(hero1, hero2); // => false
```

This time, even both objects `hero1` and `hero2` have the same content, `shallowEqual(hero1, hero2)` return `false`.  

It happens because the nested objects `hero1.address` and `hero2.address` are different object instances. Thus the shallow equality considers that 
`hero1.address` and `hero2.address` are different values.  

Solving the problem of nested objects helps the deep equality check of objects.  

## 4. Deep equality

The deep equality check helps to perform the equality check on objects that contain other objects, aka nested.  

The deep equality check is similar to the shallow equality check of objects, with the difference that when a property has an object, another recursive shallow equality check starts on this object.  

Let's see an implementation of deep equality check:

```javascript{15}
function deepEqual(object1, object2) {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (let index = 0; index < keys1.length; index++) {
    const value1 = object1[keys1[index]];
    const value2 = object2[keys2[index]];
    if (
         typeof value1 === 'object' 
      && typeof value2 === 'object'
      && !deepEqual(value1, value2)
      || value1 !== value2
    ) {
      return false;
    }
  }

  return true;
}
```

Now let's use the `deepEquality()` to compare object nested objects:

```javascript
const hero1 = {
  name: 'Batman',
  address: {
    city: 'Gotham'
  }
};
const hero2 = {
  name: 'Batman',
  address: {
    city: 'Gotham'
  }
};

deepEqual(hero1, hero2); // => true
```

The deep equal comparison function correctly determines that the objects have the same properties and values, even the nested objects.  

## 5. Summary

The referential equality (using `===`, `==` or `Object.is()`) determines whether the operands are the same object instance.  

The manual equality check of objects requires a manual comparison of properties' values. While this check requires writing by hand the properties checks, I often find this approach convenient because of its simplicity.  

When the compared objects have a lot of properties or the structure of the objects is determined during runtime, a better approach is to use shallow check.  

In case if the compared objects have nested objects, the deep equality check is the way to go.  

Hopefully, my post has helped you understand the specifics of checking objects in JavaScript.  