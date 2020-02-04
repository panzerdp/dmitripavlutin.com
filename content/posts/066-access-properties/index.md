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

The common way to access the property of an object is the *dot property accessor*: an expression followed by a dot `.` and an identifier. 

```javascript
expression.identifier
```

`expression` should evaluate to an object and the `identifier` should indicate the name of the property you'd like to access.

For example, let's access the property `name` of the object `hero`:

```javascript
const hero = {
  name: 'Batman'
};

// Dot property accessor:
hero.name; // => 'Batman'
```

`hero.name` accesses the property `name` of `hero` object. 

You can use the dot property accessor in a chain, for example, to access deeper properties: `object.prop1.prop2`. 

> Choose the **dot property accessor** when the property name is *known ahead of time*.

### 1.1 Forbidden characters of the dot property accessor

In most of the cases, the property name you'd like to access contains only alpha characters: `abc...z`. In other words a legal identifier. 

But time to time, you can encounter properties having more than just alpha caracters: 

```javascript
const weirdObject = {
  'prop-3': 'three',
  '3': 'three'
}

weirdObject.prop-3; // => NaN
weirdObject.3; // throws SyntaxError: Unexpected number
```

`weirdObject.prop-3` evaluates to `NaN`, instead of the expected `'tree'`. 
`weirdObject.3` throws a `SyntaxError`! 

*Can you explain why `weirdObject.prop-3` does the expression evaluate to `NaN`? Please write your answer in a comment below!*

To be able to access the properties with these special name, use the square brackets property accessor (which is described in the next section):

```javascript
const weirdObject = {
  'prop-3': 'three',
  '3': 'three'
}

weirdObject['prop-3']; // => 'three'
weirdObject[3]; // => 'three' 
```

The square brackets syntax accesses without problems the properties that have special names: `weirdObject['prop-3']` and `weirdObject[3]`. 

## 2. Square brackets property accessor

The square brackets property accessor has the following syntax:

```javascript
expression[expression]
```

The first `expression` should evaluate to an object and the second `expression` should evaluate to a string denoting the property name. 

Here's an example:

```javascript
const property = 'name';
const hero = {
  name: 'Batman'
};

// Square brackets property accessor:
hero['name']; // => 'Batman'
hero[property]; // => 'Batman'
```

`hero['name']` and `hero[property]` both read the property by using the square brackets syntax. 

> Choose the **square brackets property accessor** when the property name is *dynamic*, i.e. determined at runtime. 

## 3. Object destructuring

The basic object destructuring syntax is pretty simple:

```javascript
const { identifier } = expression;
```

`expression` should evaluate to an object and the `identifier` should indicate the name of the property you'd like to access. After the destructuring, the variable `identifier` has the value of the accessed property. 

Here's an example:

```javascript
const hero = {
  name: 'Batman'
};

// Object destructuring:
const { name } = hero;
name; // => 'Batman'
```

`const { name } = hero` is an object destructuring. The destructuring defines a new variable `name`, and assigns to the new variable the `name` property value of `hero` object. 

When you get used to object destructuring, you will find that its syntax is a great way to extract the properties into variables. 

> Choose the **object destructuring** when you'd like to create a variable having the property value. 

Note that you can extract as many properties as you'd like: 

```javascript
const { identifier1, identifier2, .., identifierN } = expression;
``` 

### 3.1 Alias variable

If you'd like to access the property, but create a different variable name than the property name, you could use the aliasing feature of object destructuring. 

```javascript
const { identifier: aliasIdentifier } = expression;
```

Here's an example:

```javascript
const hero = {
  name: 'Batman'
};

// Object destructuring:
const { name: heroName } = hero;
heroName; // => 'Batman'
```

`const { name: heroName } = hero` is an object destructuring. The destucturing defines a new variable `heroName` (instead of `name` as in previous example), and assigns to the new variable the `name` property value of `hero` object. 

### 3.2 Dynamic property name

What makes the object destructuring even more useful is that you could extract to variables properties with the dynamic value:

```javascript
const { [expression]: identifier } = expression;
```

The first `expression` should evaluate to a property name, and the `identifier` should indicate the variable name created after the destructuring. The second `expression` should evaluate to the object you'd like to destructure. 

Here's an example:

```javascript
const property = 'name';
const hero = {
  name: 'Batman'
};

// Object destructuring:
const { [property]: name } = hero;
name; // => 'Batman'
```

`const { [property]: name } = hero` is an object destructuring that dynamically determines what property to extract. 

## 4. Conclusion

JavaScript provides a bunch of good ways to access object properties. 

The dot property accessor syntax `object.property` works nicely when you know the variable ahead of time. This syntax is easy. 

When the property name is dynamic, a better alternative is square brackets property accessor: `object[propertyName]`. 

The great object destructuring lets you extract the property directly into a variable: `{ property } = object`. Moreover, you can extract the property names that are dynamic, i.e. determined at runtime: `{ [propertName]: variable } = object`. 

There are no good or bad ways to access properties. Choose depending on your particular situation. 