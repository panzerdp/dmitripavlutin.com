---
title: "How to Compare Objects in JavaScript"
description: "How to compare objects in JavaScript: referential, manual, shallow, and deep equality."
published: "2020-06-08T08:00Z"
modified: "2023-01-28"
thumbnail: "./images/cover-3.png"
slug: how-to-compare-objects-in-javascript
tags: ["javascript", "equality", "object"]
recommended: ["the-legend-of-javascript-equality-operator", "object-is-vs-strict-equality-operator"]
type: post
---

Comparing primitive values in JavaScript is simple. Just use any of the available equality operators, for example, strict equality:

```javascript
'a' === 'c'; // => false
1   === 1;   // => true
```

Objects, however, are more difficult to compare because they are structured data. 

In this post, you will learn how to compare objects correctly in JavaScript.  

*Before I go on, let me recommend something to you.* 

*If you want to significantly improve your JavaScript knowledge, take the  amazingly useful ["Modern JavaScript From The Beginning 2.0"](https://www.traversymedia.com/a/2147528886/FqXWyazh) by Brad Traversy. Use the coupon code "DMITRI" and get up to 20% discount!*

```toc
```

## 1. Referential equality

JavaScript provides 3 ways to compare values: 

* The strict equality operator `===`
* The loose equality operator `==` 
* `Object.is()` function

When comparing objects using any of the above, the comparison evaluates to `true` only if the compared values refer to the same object instance. This is *referential equality*.  

*If you want to learn more about values and references, then check [this post](/value-vs-reference-javascript/).*

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

[Try the demo](https://jsfiddle.net/dmitri_pavlutin/y2g0k4bf/)

`hero1 === hero1` evaluates to `true` because both operands point to the same object instance `hero1`.  

On the other side, `hero1 === hero2` evaluates to `false` because the operands `hero1` and `hero2` are different object instances.  

Interestingly `hero1` and `hero2` objects have the same content: both have one property `name` with the value `'Batman'`. Still, even comparing objects of the same structure, `hero1 === hero2` evaluates to `false`.  

Referential equality is useful when you'd like to compare object references, rather than their content. 

But more often you'll need to compare the actual contents of the objects: the properties and their values. Let's see how to do this.  

## 2. Manual comparison

A simple way to compare objects by content is to read the properties and compare them manually.  

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

console.log(isHeroEqual(hero1, hero2)); // => true
console.log(isHeroEqual(hero1, hero3)); // => false
```

[Try the demo.](https://jsfiddle.net/dmitri_pavlutin/mu2abpgv/)

`isHeroEqual()` accesses the property `name` of both objects and compares their values.  

If the compared objects have a few properties, I prefer to write the comparison functions like `isHeroEqual()`. Such functions have good performance &mdash; only a few property accessors and equality operators are involved in the comparison.  

Manual comparison requires manual extraction of properties &mdash; for simple objects, that's not a problem. But to compare bigger objects (or objects of unknown structure), the manual comparison isn't convenient because it requires a lot of boilerplate code.   

Let's see how the shallow equality of objects can help.  

## 3. Shallow equality

During *the shallow equality* check of objects you get the list of properties (using `Object.keys()`) of both objects, then check the properties' values for equality.  

Here's a possible implementation of shallow equality check:

```javascript
function shallowEqual(object1, object2) {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (let key of keys1) {
    if (object1[key] !== object2[key]) {
      return false;
    }
  }

  return true;
}
```

Inside the function, `keys1` and `keys2` are arrays containing the property names of `object1` and `object2`. 

`for` cycle iterates over the keys, and compares objects' properties (`object1[key]` and `object2[key]`) for equality.  

Let's use shallow equality to compare objects with many properties:

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

console.log(shallowEqual(hero1, hero2)); // => true
console.log(shallowEqual(hero1, hero3)); // => false
```
[Try the demo.](https://jsfiddle.net/dmitri_pavlutin/nptcuvk4/)

`shallowEqual(hero1, hero2)` returns `true` because the objects `hero1` and `hero2` have the same properties (`name` and `realName`) with the same values.  

On the other side, `shallowEqual(hero1, hero3)` returns `false` since `hero1` and `hero3` have different properties.  

If the properties' values of objects to compare are primitive values, then the shallow equality check is the way to go.  

But objects in JavaScript can be nested. In this case, unfortunately, shallow equality doesn't work well.    

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

console.log(shallowEqual(hero1, hero2)); // => false
```

[Try the demo.](https://jsfiddle.net/dmitri_pavlutin/71rozs4h/)

This time, even `hero1` and `hero2` have the same content, `shallowEqual(hero1, hero2)` returns `false`.  

The nested objects `hero1.address` and `hero2.address` are different object instances. Thus shallow equality considers `hero1.address` and `hero2.address` to be not equal.  

Fortunately, the deep equality correctly compares the objects that contain other objects. Let's take a look at how this works.  

## 4. Deep equality

Deep equality is similar to shallow equality, but with one difference. During the object check, if the values being compared are objects, then a recursive equality check is performed on these nested objects.  

Let's look at the implementation of a deep equality check:

```javascript{13}
function deepEqual(object1, object2) {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    const val1 = object1[key];
    const val2 = object2[key];
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

The highlighted line `areObjects && !deepEqual(val1, val2)` indicates that as soon as the compared properties are objects, a recursive call starts to verify
whether the nested objects are equal too.  

Now, let's see an example of `deepEquality()`:

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

console.log(deepEqual(hero1, hero2)); // => true
```

[Try the demo.](https://jsfiddle.net/dmitri_pavlutin/hfjk38bu/)

The deep equality function correctly determines that `hero1` and `hero2` have the same properties and values, including the equality of the nested objects `hero1.address` and `hero2.address`.  

To deeply compare objects I recommend to use:

* [isDeepStrictEqual(object1, object2)](https://nodejs.org/api/util.html#util_util_isdeepstrictequal_val1_val2) of Node built-in `util` module
* or [_.isEqual(object1, object2)](https://lodash.com/docs/4.17.15#isEqual) of `lodash` library.  

## 5. Summary

The referential equality (using `===`, `==` or `Object.is()`) determines whether the operands are the same object instance.  

The manual equality check requires a manual comparison of properties' values. Although this check requires writing down the properties to be compared by hand, I find this approach convenient because of its simplicity.

If the objects being compared have a lot of properties or if the structure of the objects is determined at runtime, a better approach is to use a shallow check.  

Finally, if the compared objects have nested objects, the deep equality check is the way to go.  

*What is the main issue when using `JSON.stringify(object1) === JSON.stringify(object2)` to compare objects?*
