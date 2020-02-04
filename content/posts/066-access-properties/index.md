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
2. Square brackets property access: `object['property']`
3. Object destructuring: `const { property } = object`

In this post, I will describe each way to access the properties of an object. And importantly, help you to understand the benefits and downsides of each approach.  

## 1. Dot property accessor

The common way to access the property of an object is the *dot property accessor*: an expression followed by dot `.` and an identifier.  

```javascript
expressionObject.identifier
```

`expressionObject` should evaluate to an object, and the `identifier` should indicate the name of the property you'd like to access.   

For example, let's access the property `name` of the object `hero`:

```javascript
const hero = {
  name: 'Batman'
};

// Dot property accessor:
hero.name; // => 'Batman'
```

`hero.name` accesses the property `name` of `hero` object.  

You can use the dot property accessor in chain, for example to access deeper properties: `object.prop1.prop2`.  

> Choose the **dot property accessor** when the property name is *known ahead of time* and is a *valid identifier*.    

### 1.1 Forbidden characters of dot property accessor

In most of the cases the property name you'd like to access contains only alpha characters: `abc...z`. In other words a legal identifier.  

But time to time, you can encounter properties having more than just alpha caracters:  

```javascript
const weirdObject = {
  'prop-3': 'three',
  '3': 'three'
}

weirdObject.prop-3; // => NaN
weirdObject.3;      // throws SyntaxError: Unexpected number
```

`weirdObject.prop-3` evaluates to `NaN`, instead of the expected `'tree'`.  
`weirdObject.3` throws a `SyntaxError`!  

*Can you explain why `weirdObject.prop-3` expression evaluates to `NaN`? Please write your answer in a comment below!*

To be able to access the properties with these special name, use the square brackets property accessor (which is described in the next section):

```javascript
const weirdObject = {
  'prop-3': 'three',
  '3': 'three'
}

weirdObject['prop-3']; // => 'three'
weirdObject[3];        // => 'three' 
```

The square brackets syntax accesses without problems the properties that have special names: `weirdObject['prop-3']` and `weirdObject[3]`.  

## 2. Square brackets property accessor

The square brackers property accessor has the following syntax:

```javascript
expressionObject[expressionProperty]
```

The `expressionObject` should evaluate to an object and the `expressionProperty` should evaluate to a string denoting the property name.  

Here's an example:

```javascript
const property = 'name';
const hero = {
  name: 'Batman'
};

// Square brackets property accessor:
hero['name'];   // => 'Batman'
hero[property]; // => 'Batman'
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

