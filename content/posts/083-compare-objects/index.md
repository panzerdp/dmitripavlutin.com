---
title: "How to Compare Objects in JavaScript"
description: "How to compare objects in JavaScript: referential, manual, shallow and deep equality."
published: "2020-06-08T08:00Z"
modified: "2020-06-09T07:00Z"
thumbnail: "./images/cover-3.png"
slug: how-to-compare-objects-in-javascript
tags: ["javascript", "equality", "object"]
recommended: ["the-legend-of-javascript-equality-operator", "object-is-vs-strict-equality-operator"]
type: post
commentsThreadId: how-to-compare-javascript-objects
---

It's simple to compare primitive values in JavaScript. Just use any of the available
eqality operators, for example the strict equality operator:

```javascript
'a' === 'c'; // => false
1   === 1;   // => true
```

Objects have structured data, thus they are more difficult to compare. In this post, you will learn how to 
correctly compare objects in JavaScript.  

## 1. Referential equality

JavaScript provides 3 ways to compare values: 

* The loose equality operator `===`
* The strict equality operator `==` 
* `Object.is()` function

When comparing objects using any of the above, the comparison evaluates to `true` only if the compared values reference *the same
object instance*. This is *the referential equality*.    

Let's define the objects `hero1` and `hero2`, and see the referential equality in practice:

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

The obvious way to compare objects by content is to read the properties and compare them manually.  

For example, let's write a special function `isHeroEqual()` that compares 2 hero objects:

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

`isHeroEqual()` accesses the property `name` of both objects and compares their values.  

If the compared objects have a few properties, I prefer to write the comparison functions like `isHeroEqual()`. Such functions have good performance: only a few property accessors and equality operators are involved in the comparison.  

Manual comparison requires manual extraction of properties &mdash; for simple objects, that's not a problem. But to compare bigger objects (or objects of unknown structure), the manual comparison isn't convenient because it requires a lot of boilerplate code.   

Let's see how the shallow equality of objects can help.  

## 3. Shallow equality

During *shallow equality* check of objects you have to get the list of properties (using `Object.keys()`) of both objects, then check the properties' values for equality.  

Here's a possible implementation of shallow equality check:

```javascript
function shallowEqual(object1, object2) {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (let index = 0; index < keys1.length; index++) {
    const val1 = object1[keys1[index]];
    const val2 = object2[keys2[index]];
    if (val1 !== val2) {
      return false;
    }
  }

  return true;
}
```

Inside the function, `keys1` and `keys2` are arrays containing correspondingly the property names of `object1` and `object2`. 

`for` cycle iterates over the keys, and compares each property of `object1` and `object2` for equality `val1 !== val2`.  

Using the shallow equality you can easily check for equality objects having many properties:

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

Let's perform a shallow equality check on objects having nested objects:

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

Solving the problem of nested objects helps the deep equality check.  

## 4. Deep equality

The deep equality is similar to the shallow equality, with the difference that when a property has an object, a recursive shallow equality check is performed on the nested objects.  

Let's see an implementation of deep equality check:

```javascript{14}
function deepEqual(object1, object2) {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (let index = 0; index < keys1.length; index++) {
    const val1 = object1[keys1[index]];
    const val2 = object2[keys2[index]];
    const areObjects = isObject(val1) && isObject(val2);
    if (
      areObjects && !deepEqual(val1, val2) ||
      !areObjects && val1 !== val2
    ) {
      return false;
    }
  }

  return true;
}

function isObject(object) {
  return object != null && typeof object === 'object';
}
```

The highlighted line `areObjects && !deepEqual(val1, val2)` indicates that as soon as the checked properties are objects, a recursive call starts to verify
whether the nested objects are equal too.  

Now let's use the `deepEquality()` to compare objects having nested objects:

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

The deep equality function correctly determines that `hero1` and `hero2` have the same properties and values, including the equality of the nested objects `hero1.address` and `hero2.address`.  

To deeply compare objects I recommend to use [isDeepStrictEqual(object1, object2)](https://nodejs.org/api/util.html#util_util_isdeepstrictequal_val1_val2) of Node built-in `util` module, or [_.isEqual(object1, object2)](https://lodash.com/docs/4.17.15#isEqual) of `lodash` library.  

## 5. Summary

The referential equality (using `===`, `==` or `Object.is()`) determines whether the operands are the same object instance.  

The manual equality check of objects requires a manual comparison of properties' values. While this check requires writing by hand the properties to compare, I often find this approach convenient because of its simplicity.  

When the compared objects have a lot of properties or the structure of the objects is determined during runtime, a better approach is to use shallow check.  

If the compared objects have nested objects, the deep equality check is the way to go.  

Hopefully, my post has helped you understand the specifics of checking objects in JavaScript.  

*What is the main issue when using `JSON.stringify(object1) === JSON.stringify(object2)` to compare objects?*