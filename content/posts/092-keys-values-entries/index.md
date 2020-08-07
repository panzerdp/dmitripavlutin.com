---
title: "How to Access Object's Keys, Values, and Entries in JavaScript"
description: "Let's see what utility functions provide JavaScript to extract the keys, values and entries from an object."
published: "2020-08-11T12:00Z"
modified: "2020-08-11T12:00Z"
thumbnail: "./images/cover-2.png"
slug: access-object-keys-values-entries
tags: ['javascript', 'object']
recommended: ['how-to-compare-objects-in-javascript', 'check-if-object-has-property-javascript']
type: post
commentsThreadId: access-object-keys-values-entries
---

When working with plain JavaScript objects, you often need to look through all the properties and values of it.  

Here are the common lists that you might be interested to extract from an object:

* *The keys* of an object is the list of property names. 
* *The values* of an object is the list og property values. 
* *The entries* of an object is the list of pairs of property name and corresponding value.  

As a reference, let's consider the following JavaScript object:

```javascript
const hero = {
  name: 'Batman',
  city: 'Gotham'  
};
```

The keys of `hero` are `['name', 'city']`. The values are `['Batman', 'Gotham']`. And the entries are `[['name', 'Batman'], ['city', 'Gotham']]`.  

Let's see what utility functions provide JavaScript to extract the keys, values and entries from an object.  

## 1. *Object.keys()* returns keys

`Object.keys(object)` is an utility function that returns the list of keys of `object`.  

Let's use `Object.keys()` to get the keys of `hero` object:

```javascript
const hero = {
  name: 'Batman',
  city: 'Gotham'  
};

Object.keys(hero); // => ['name', 'city']
```

`Object.keys(hero)` returns the list `['name', 'city']`, which, as expected, are the keys of `hero` object.  

### 1.1 Keys in practice: detect if object is empty

## 2. *Object.values()* returns values

`Object.values(object)` is the JavaScript utility function that returns the list of values of `object`.  

Let's use this function to get the values of `hero` object:

```javascript
const hero = {
  name: 'Batman',
  city: 'Gotham'  
};

Object.values(hero); // => ['Batman', 'Gotham']
```

`Object.values(hero)` returns the values of `hero`: `['Batman', 'Gotham']`.  

### 2.1 Values in practice: calculate properties sum

## 3. *Object.entries()* returns entries

Finally, `Object.entries(object)` is an useful function to access the entries of `object`.  

Let's extract the entries of `hero` object:

```javascript
const hero = {
  name: 'Batman',
  city: 'Gotham'  
};

Object.entries(hero); // => `[['name', 'Batman'], ['city', 'Gotham']]`
```

`Object.entries(hero)` returns the entries of `hero`: `[['name', 'Batman'], ['city', 'Gotham']]`.  

### 3.1 Entries in practice: find the property having 0 value

## 4. Summary

The keys, values and entries are 3 common lists you might need to extract from a JavaScript object for further processing.  

JavaScript provides the necessary utility function to access these lists:

* *The keys* are returned by `Object.keys(object)`
* *The values* are returned by `Object.values(object)`
* And *the entries* are returned by `Object.entries(object)`

*What other ways to access keys, values, and entries do you know?*