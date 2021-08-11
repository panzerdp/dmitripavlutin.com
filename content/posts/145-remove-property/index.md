---
title: "2 Ways to Remove a Property from an Object in JavaScript"
description: "How to use the delete operator or rest syntax to delete properties from an object in JavaScript."
published: "2021-08-17T12:00Z"
modified: "2021-08-17T12:00Z"
thumbnail: "./images/cover.png"
slug: remove-object-property-javascript
tags: ['javascript', 'object', 'property']
recommended: ['check-if-object-has-property-javascript', 'access-object-properties-javascript']
type: post
---

In simple words, a JavaScript object is a collection of properties, where each property has a name and a value.  

```javascript
const employee = {
  name: 'John Smith',
  position: 'Sales Manager',
};
```

The `user` variable contains an object describing an employee. The object contains 3 properties that
describe various employee data: `name`, `position` and years of `experience`.  

Sometimes, however, you need to remove properties from an object. For example, how would you remove the `position` property from the
`employee` object?  

Let's see 2 common ways on how to remove properties from object in JavaScript: using `delete` operator (mutable way) and object rest (immutable way).  

## 1. *delete* operator

`delete` is a special operator in JavaScript that removes a property from an object. It's single operand usually accepts a [property accessor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Property_accessors) that indicates what specific property to remove:

A) Remove using a dot property accessor:
```javascript
delete object.property;
```

B) Remove using square brakets property accessor:
```javascript
delete object['property'];
// or
const name = 'dynamicProperty';
delete object[name];
```

When applying the `delete` operator on a property accessor, the operator removes the corresponding property from the object:

```javascript{6}
const employee = {
  name: 'John Smith',
  position: 'Sales Manager'
};

delete employee.position;

console.log(employee); // { name: 'John Smith' }
```

Initially, `employee` has 2 properties: `name` and `position`. 

But after applying the `delete` operator on the `position` property: `delete employee.position`, the property is removed from the object. Simple as that.  

The property removal using `delete` operator is mutable because it mutates (aka alters, modifies) the original object. 

In case if the property name to remove is determined dynamically, then you can use the square breakets syntax:

```javascript{7}
const employee = {
  name: 'John Smith',
  position: 'Sales Manager'
};

const name = 'position';
delete employee[name];

console.log(employee); // { name: 'John Smith' }
```

`delete employee[name]` removes the property which name is contained inside `name` variable.  

## 2. Object rest syntax

## 3. Conclusion

*Challenge: what is the [time complexity](https://en.wikipedia.org/wiki/Time_complexity) of the property removal operation using `delete` and object rest syntax? Write your opinion in a comment below!*