---
title: '3 Ways To Access Object Properties in JavaScript'
description: 'You can access an object property in JavaScript in 3 ways: dot property accessor, square brackets property accessor, or object destructuring.'
published: '2020-02-05T10:25Z'
modified: '2023-01-25'
thumbnail: './images/access-object-properties-2.png'
slug: access-object-properties-javascript
tags: ['javascript', 'object', 'property', 'destructuring']
recommended: ['check-if-object-has-property-javascript', 'object-rest-spread-properties-javascript']
type: post
---

You can access the properties of an object in JavaScript in 3 ways: 

1. Dot property accessor: `object.property`
2. Square brackets property accessor: `object['property']`
3. Object destructuring: `const { property } = object`

Let's see how each way works. And understand when it's reasonable, depending on the situation, to use one way or another.  

*Before I go on, let me recommend something to you.* 

*If you want to significantly improve your JavaScript knowledge, take the  amazingly useful course ["Modern JavaScript From The Beginning 2.0"](https://www.traversymedia.com/a/2147528886/FqXWyazh) by Brad Traversy. Use the coupon code "DMITRI" and get up to 20% discount!*

<TableOfContents />

## 1. Dot property accessor

A common way to access the property of an object is the *dot property accessor* syntax:

```javascript
expression.identifier
```

`expression` should evaluate to an object, and `identifier` is the name of the property you'd like to access.

For example, let's access the property `name` of the object `hero`:

```javascript{5}
const hero = {
  name: 'Batman'
};

// Dot property accessor
console.log(hero.name); // => 'Batman'
```
[Try the demo.](https://jsfiddle.net/v41hjdqy/)

`hero.name` is a dot property accessor that reads the property `name` of the object `hero`.  

You can use the dot property accessor in a chain to access deeper properties: `object.prop1.prop2`. 

> Choose the **dot property accessor** when the property name is *known ahead of time*.

### 1.1 Dot property accessor requires identifiers

The dot property accessor works correctly when the property name is a valid [identifier](https://developer.mozilla.org/en-US/docs/Glossary/Identifier). An identifier in JavaScript contains Unicode letters, `$`, `_`, and digits `0..9`, but cannot start with a digit.  

This is not a problem, because usually, the property names are valid identifiers: e.g. `name`, `address`, `street`, `createdBy`.  

But sometimes properties are not valid identifiers:

```javascript{5-6}
const weirdObject = {
  'prop-3': 'three',
  '3': 'three'
};

weirdObject.prop-3; // => NaN
weirdObject.3;      // throws SyntaxError: Unexpected number
```
[Try the demo.](https://jsfiddle.net/dnbe7crq/)

Because `prop-3` and `3` are invalid identifiers, the dot property accessor doesn't work:

* `weirdObject.prop-3` evaluates to `NaN`, instead of the expected `'tree'` 
* `weirdObject.3` throws a `SyntaxError`! 

*Why does the expression `weirdObject.prop-3` evaluate to `NaN`? Please write your answer below!*

To access the properties with these special names, use the square brackets property accessor (which is described in the next section):

```javascript{5-6}
const weirdObject = {
  'prop-3': 'three',
  '3': 'three'
};

console.log(weirdObject['prop-3']); // => 'three'
console.log(weirdObject['3']);      // => 'three' 
```
[Try the demo.](https://jsfiddle.net/5eqbs3zk/)

The square brackets syntax accesses without problems the properties that have special names: `weirdObject['prop-3']` and `weirdObject['3']`. 

## 2. Square brackets property accessor

The square brackets property accessor has the following syntax:

```javascript
expression[expression]
```

The first `expression` should evaluate to an object and the second `expression` should evaluate to a string denoting the property name. 

Here's an example:

```javascript{6-7}
const property = 'name';
const hero = {
  name: 'Batman'
};

// Square brackets property accessor:
console.log(hero['name']);   // => 'Batman'
console.log(hero[property]); // => 'Batman'
```
[Try the demo.](https://jsfiddle.net/9df5wvou/)

`hero['name']` and `hero[property]` both read the property `name` by using the square brackets syntax.  

> Choose the **square brackets property accessor** when the property name is *dynamic*, i.e. determined at runtime. 

## 3. Object destructuring

The basic object destructuring syntax is pretty simple:

```javascript
const { identifier } = expression;
```

`identifier` is the name of the property to access and `expression` should evaluate to an object. After the destructuring, the variable `identifier` contains the property value.  

Here's an example:

```javascript{5}
const hero = {
  name: 'Batman'
};

// Object destructuring:
const { name } = hero;
console.log(name); // => 'Batman'
```
[Try the demo.](https://jsfiddle.net/7j5o6hyb/)

`const { name } = hero` is an object destructuring. The destructuring defines a variable `name` with the value of property `name`.  

When you get used to object destructuring, you will find that its syntax is a great way to extract the properties into variables. 

> Choose the **object destructuring** when you'd like to create a variable having the property value. 

Note that you can extract as many properties as you'd like: 

```javascript
const { identifier1, identifier2, identifierN } = expression;
``` 

### 3.1 Alias variable

If you'd like to access the property, but create a variable with a name different than the property name, you could use aliasing.  

```javascript
const { identifier: aliasIdentifier } = expression;
```

`identifier` is the name of the property to access, `aliasIdentifier` is the variable name, and `expression` should evaluate to an object. After the destructuring, the variable `aliasIdentifier` contains `identifier` property value.  

Here's an example:

```javascript{5}
const hero = {
  name: 'Batman'
};

// Object destructuring:
const { name: heroName } = hero;
console.log(heroName); // => 'Batman'
```

[Try the demo.](https://jsfiddle.net/rc84nfg6/)

`const { name: heroName } = hero` is an object destructuring. The destucturing defines a new variable `heroName` (instead of `name`, as in the previous example), and assigns to `heroName` the value `hero.name`.  

### 3.2 Dynamic property name

What makes the object destructuring even more useful is extracting dynamic name properties into variables:

```javascript
const { [expression]: identifier } = expression;
```

The first `expression` should evaluate to a property name, and the `identifier` should indicate the variable name created after the destructuring. `expression` should evaluate to the object you'd like to destructure.  

Here's an example:

```javascript{6}
const property = 'name';
const hero = {
  name: 'Batman'
};

// Object destructuring:
const { [property]: name } = hero;
console.log(name); // => 'Batman'
```

[Try the demo.](https://jsfiddle.net/ytpeg2a1/1/)

`const { [property]: name } = hero` is an object destructuring that dynamically, at runtime, determines what property to extract. 

## 4. When the property doesn't exist

If the accessed property doesn't exist, all 3 accessor syntaxes evalute to `undefined`:

```javascript
const hero = {
  characterName: 'Batman'
};

console.log(hero.name);    // => undefined
console.log(hero['name']); // => undefined
const { name } = hero;
console.log(name);         // => undefined
```

[Try the demo.](https://jsfiddle.net/Lfuenohs/)

The property `name` doesn't exist in the object `hero`. Thus the dot property accessor `hero.name`, square brackets property accessor `hero['name']` and the variable `name` after destructuring evaluate to `undefined`.  

## 5. Conclusion

JavaScript provides a bunch of good ways to access object properties. 

The dot property accessor syntax `object.property` works nicely when you know the variable ahead of time.  

When the property name is dynamic or is not a valid identifier, a better alternative is square brackets property accessor: `object[propertyName]`. 

The object destructuring extracts the property directly into a variable: `const { property } = object`. Moreover, you can extract the dynamic property names (determined at runtime): `const { [propertName]: variable } = object`. 

There are no good or bad ways to access properties. Choose depending on your particular situation and personal preferences.  
