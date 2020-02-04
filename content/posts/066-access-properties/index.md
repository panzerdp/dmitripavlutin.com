---
title: '3 Ways To Access Object Properties in JavaScript'
description: 'Comparing the 3 ways to access object properties in JavaScript: '
published: '2020-02-04T12:00Z'
modified: '2020-02-04T12:00Z'
thumbnail: './images/access-object-properties-2.png'
slug: access-object-properties-javascript
tags: ['javascript', 'object', 'destructuring']
recommended: ['maps-vs-plain-objects-javascript', 'object-rest-spread-properties-javascript']
type: post
commentsThreadId: access-object-properties-javascript
---

You can access the properties of a JavaScript object in 3 ways: 

1. Dot property accessor: `object.property`
2. Square brakets property access: `object['property']`
3. Object destructuring: `const { property } = object`

In this post, I will describe each way to access the properties of an object. And importantly, help you to understand the benefits and downsides of each approach.  

## 1. Dot property accessor

The most common way to access the property of an object is the *dot property accessor*. The object followed by a dot `.` and the property identifier at the end lets you read the property: `object.property`.

Let's access the property `name` of the object `hero`:

```javascript
const hero = {
  name: 'Batman'
};

// Dot property accessor:
hero.name; // => 'Batman'
```

## 2. Square brakets property accessor

Here's an example:

```javascript
const hero = {
  name: 'Batman'
};

// Square brakets property accessor:
hero['name']; // => 'Batman'
```

## 3. Object destructuring

Here's an example:

```javascript
const hero = {
  name: 'Batman'
};
// Object destructuring:
const { name } = hero;
name; // => 'Batman'
```

## 4. Conclusion

