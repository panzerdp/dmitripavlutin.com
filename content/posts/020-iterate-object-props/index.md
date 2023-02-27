---
title: "How to Iterate Easily Over Object Properties in JavaScript"
description: "Object.values() and Object.entries() are another improvement step for JavaScript developers to have helper functions that iterate over object properties."
published: "2016-08-23"
modified: "2019-07-10T10:00:00Z"
thumbnail: "./images/cover.jpg"
slug: how-to-iterate-easily-over-object-properties-in-javascript
tags: ["javascript", "object"]
recommended: ["detailed-overview-of-well-known-symbols", "object-rest-spread-properties-javascript"]
type: post
---

In the same period of [ECMAScript 2016](/must-know-details-about-es2016-features/) released in June 2016, JavaScript developers are happy to know that another bunch of awesome proposals [reached the stage 4](https://github.com/tc39/proposals/blob/master/finished-proposals.md) (finished).  

Let's list these features:  

* [`Object.values()`](https://github.com/es-shims/Object.values) and [`Object.entries()`](https://github.com/es-shims/Object.entries)
* [Async functions](https://github.com/tc39/ecmascript-asyncawait)
* String padding: [`str.padStart()`](https://github.com/es-shims/String.prototype.padStart) and [`str.padEnd()`](https://github.com/es-shims/String.prototype.padEnd)
* [`Object.getOwnPropertyDescriptors()`](https://github.com/ljharb/proposal-object-getownpropertydescriptors)
* [Trailing commas](https://github.com/tc39/proposal-trailing-function-commas) in function parameter lists and calls

The new proposals are included in the ECMAScript 2017 standard, which probably will be released in the summer of 2017.  Notice that the list of features may grow until that time. That's great!

Of course, you don't have to wait for ES2017 release or until the new features are implemented by vendors! [Babel](https://babeljs.io/) already contains most of these finished proposals.  

This article is focused on how to improve the iteration over object properties:

* To get properties values using `Object.values()`
* To get properties key/value pairs using `Object.entries()`

At first sight, these static functions don't seem to add significant value. But when they're combined with destructuring assignments and `for..of` loops, you get a short and sweet way to iterate over object's properties.  
Let's dive in.  

*Before I continue, allow me to make a recommendation.* 

*If you want to significantly improve your JavaScript knowledge, take the  amazingly useful ["Modern JavaScript From The Beginning 2.0"](https://www.traversymedia.com/a/2147528886/FqXWyazh) by Brad Traversy. Use the coupon code "DMITRI" and get up to 20% discount!*

## 1. Own and enumerable properties

As you might know already, `Object.keys()` accesses only the object's own and enumerable properties. It is reasonable since most of the times only these kinds of properties need evaluation.  

Let's see an example when an object has own and inherited properties. `Object.keys()` returns only own property keys:  

```javascript
let simpleColors = {
  colorA: 'white',
  colorB: 'black'
};
let natureColors = {
  colorC: 'green',
  colorD: 'yellow'
};
Object.setPrototypeOf(natureColors, simpleColors);
Object.keys(natureColors); // => ['colorC', 'colorD']
natureColors['colorA'];    // => 'white'
natureColors['colorB'];    // => 'black'
```
`Object.keys(natureColors)` returns own and enumerable property keys of the `natureColors` object: `['colorC', 'colorD']`.  
`natureColors` contains the properties inherited from `simpleColors` prototype object. However `Object.keys()` function skips them.  

`Object.values()` and `Object.entries()` access object's properties by the same criteria: own and enumerable properties. Let's take a look:  

```javascript
// ...
Object.values(natureColors); 
// => ['green', 'yellow']
Object.entries(natureColors);
// => [ ['colorC', 'green'], ['colorD', 'yellow'] ]
```

Now notice the difference from `for..in` loop statement. The loop iterates over enumerable, own and **inherited** properties. The following example illustrates that:  

```javascript
// ...
let enumerableKeys = [];
for (let key in natureColors) {
  enumerableKeys.push(key);
}
enumerableKeys; // => ['colorC', 'colorD', 'colorA', 'colorB']
```
`enumerableKeys` array contains `natureColors` own properties keys: `'colorC'` and `'colorD'`.  
Additionally `for..in` iterated over the property keys inherited  from `simpleColors` prototype object: `'colorA'` and `'colorB'`.  

## 2. Object.values() returns property values

To distinguish the benefits of `Object.values()` usage, let's see how to get an object's property values in a pre-ES2017 way.  

First, the property keys are collected with `Object.keys()`. Then a property accessor is used and the value is stored in an additional variable. Let's see an example:  

```javascript
let meals = {
  mealA: 'Breakfast',
  mealB: 'Lunch',
  mealC: 'Dinner'
};
for (let key of Object.keys(meals)) {
  let mealName = meals[key];
  // ... do something with mealName
  console.log(mealName);
}
// 'Breakfast' 'Lunch' 'Dinner'
``` 
`meals` is a regular plain JavaScript object. The object keys are taken using `Object.keys(meals)` and in a `for..of` loop enumerated.  
The code looks pretty simple, however, it can be optimized by removing the line `let mealName = meals[key]`.  

The optimization is possible by applying direct access to object property values using `Object.values()`. Now the property accessor line can be removed:

```javascript
let meals = {
  mealA: 'Breakfast',
  mealB: 'Lunch',
  mealC: 'Dinner'
};
for (let mealName of Object.values(meals)) {
  console.log(mealName);
}
// 'Breakfast' 'Lunch' 'Dinner'
```
Because `Object.values(meals)` returns the object property values in an array, the whole task reduces to a compact `for..of` loop. `mealName` is assigned directly in the loop, so there is no need for the additional line like it was in the previous example.  

`Object.values()` does one thing, but does it well. This is a true path to clean code.  

## 3. Object.entries() returns pairs of property values and keys

`Object.entries()` goes beyond and returns an array of object's property values and keys in pairs: `[ [key1, value1], [key2, value2], ..., [keyN, valueN] ]`.  

Probably it's not comfortable to use these pairs directly. Fortunately the array destructuring assignment `let [x, y] = array` in a `for..of` loop makes it really easy to access the key and value.  

The following example shows `Object.entries()` in action:

```javascript
let meals = {
  mealA: 'Breakfast',
  mealB: 'Lunch',
  mealC: 'Dinner'
};
for (let [key, value] of Object.entries(meals)) {
  console.log(key + ':' + value);
}
// 'mealA:Breakfast' 'mealB:Lunch' 'mealC:Dinner'
```

`Object.entries(meals)` returns `meal` object's pairs of keys and values in an array.  
On the left side of `for..of` loop, the array destructuring assignment `let [key, value]` assigns `key` and `value` variables.  

As seen, accessing keys and values has now a comfortable and easy to understand form. No additional lines for assignments or declarations are necessary since the `Object.entries()` returns a collection compatible with the array destructuring assignment.  

`Object.entries()` is helpful when a plain object should be imported into a [`Map`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Map). The problem becomes trivial to solve because `Object.entries()` returns a format exactly that `Map` constructor accepts: key and value pairs.  

Let's create a JavaScript object and export it into a `Map`:

```javascript
let greetings = {
  morning: 'Good morning',
  midday: 'Good day',
  evening: 'Good evening'
};
let greetingsMap = new Map(Object.entries(greetings));
greetingsMap.get('morning'); // => 'Good morning'
greetingsMap.get('midday');  // => 'Good day'
greetingsMap.get('evening'); // => 'Good evening'
```
`new Map(Object.entries(greetings))` constructor is invoked with an argument that is an array of key and value pairs, exported from `greetings` object.  
As expected the map instance `greetingsMap` contains properties imported from `greetings` object.  These can be accessed using `.get(key)` method.  

Interestingly that `Map` provides equivalent to `Object.values()` and `Object.entries()` methods (only that they return Iterators), in order to extract property values or key-value pairs for a map instance:  

* [`Map.prototype.values()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/values) is equivalent to `Object.values()`
* [`Map.prototype.entries()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/entries) is equivalent to `Object.entries()`

Maps are an improved version of plain objects. You can get the size of a map (for a plain object you have to do it manually) and use as key any object type (plain object uses as key a string primitive type).  

Let's see what return `.values()` and `.entries()` map's methods:  

```javascript
// ...
[...greetingsMap.values()];
// => ['Good morning', 'Good day', 'Good evening']
[...greetingsMap.entries()];
// => [ ['morning', 'Good morning'], ['midday', 'Good day'], 
//      ['evening', 'Good evening'] ]
```
Notice that `greetingsMap.values()` and `greetingsMap.entries()` return iterator objects. To put the result into an array, the spread operator `...` is necessary.   
In a `for..of` loop statement the iterator can be used directly.

## 4. A note on ordering

JavaScript objects are simple key-value maps. So the order of properties in the object is insignificant. You should not rely on it in most cases.   

However ES2015 has standardized the way properties are iterated: first, come ordered number strings, then strings by insert order and then symbols by insert order. In ES5 and earlier standards, the order of properties is simply not specified.  

If you need an ordered collection, storing data into an Array or [Set](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Set) is the recommended way.  

## 5. Conclusion

`Object.values()` and `Object.entries()` are another improvement step for providing JavaScript developers with new standardized helper functions.  

`Object.entries()` works best with array destructuring assignments, in a way that key and value are assigned to different variables easily.  This function also makes easy to export plain JavaScript object properties into a `Map` object. Maps have better support of the traditional map (or hash) behavior.

Notice that the order in which `Object.values()` and `Object.entries()` return data is undetermined. So do not rely on the order.  

*I hope you enjoyed the reading! If so, feel free to share the post and write your opinion about these features in the comments below!* 