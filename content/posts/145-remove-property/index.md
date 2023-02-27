---
title: "2 Ways to Remove a Property from an Object in JavaScript"
description: "How to remove properties from an object in JavaScript using the delete operator or object destructuring with rest syntax."
published: "2021-08-17T12:00Z"
modified: "2021-08-17T12:00Z"
thumbnail: "./images/cover-2.png"
slug: remove-object-property-javascript
tags: ['javascript', 'object', 'property']
recommended: ['check-if-object-has-property-javascript', 'access-object-properties-javascript']
type: post
---

A JavaScript object is a collection of properties, where each property has a name and a value.  

```javascript
const employee = {
  name: 'John Smith',
  position: 'Sales Manager',
};
```

The `user` variable contains an object describing an employee. The object contains 2 properties that
describe employee data: `name` and `position`.  

Sometimes, however, you need to remove properties from an object. For example, how would you remove the `position` property from the
`employee` object?  

Let's see 2 common ways on how to remove properties from an object in JavaScript &mdash; using the `delete` operator (mutable way) and object destructuring combined with object rest (immutable way).  

*Before I continue, allow me to make a recommendation.* 

*If you want to significantly improve your JavaScript knowledge, take the  amazingly useful ["Modern JavaScript From The Beginning 2.0"](https://www.traversymedia.com/a/2147528886/FqXWyazh) by Brad Traversy. Use the coupon code "DMITRI" and get up to 20% discount!*

## 1. *delete* operator

`delete` is a special operator in JavaScript that removes a property from an object. Its single operand usually accepts a [property accessor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Property_accessors) to indicate what property to remove:

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

```javascript{5}
const employee = {
  name: 'John Smith',
  position: 'Sales Manager'
};

delete employee.position;

console.log(employee); // { name: 'John Smith' }
```

[Try the demo.](https://codesandbox.io/s/delete-cop3o?file=/src/index.js)

Initially, `employee` has 2 properties: `name` and `position`. 

But after applying the `delete` operator on the `position` property: `delete employee.position`, the property is removed from the object. Simple as that.  

The property removal using `delete` operator is mutable because it mutates (aka alters, modifies) the original object. 

In case if the property name to remove is determined dynamically, then you can use the square brackets syntax:

```javascript{6}
const employee = {
  name: 'John Smith',
  position: 'Sales Manager'
};

const name = 'position';
delete employee[name];

console.log(employee); // { name: 'John Smith' }
```

[Try the demo.](https://codesandbox.io/s/delete-dynamic-9k03s?file=/src/index.js)

`delete employee[name]` removes the property which name is contained inside `name` variable.  

## 2. Object destructuring with rest syntax

Another approach to removing properties, but in an immutable manner without altering the original object, is to use the [object destructuring and rest syntax](/javascript-object-destructuring/#8-rest-object-after-destructuring).  

The idea is simple: destructure the object to the property you want to remove, and the remaining properties collect into a rest object:

A) The property name is known:
```javascript
const { property, ...restObject } = object;
```

B) The property name is dynamic:
```javascript
const name = 'property';
const { [name]: removedProperty, ...restObject } = object;
```

After applying the destructuring and rest syntax, `restObject` is going to contain the same properties as `object`, only without the removed property.  

For example, let's remove the property `position` from `employee` object:

```javascript{5}
const employee = {
  name: 'John Smith',
  position: 'Sales Manager'
};

const { position, ...employeeRest } = employee;

console.log(employeeRest); // { name: 'John Smith' }

console.log(employee); 
// { name: 'John Smith',position: 'Sales Manager' }
```

[Try the demo.](https://codesandbox.io/s/destructuring-rest-uh68c?file=/src/index.js)

The statement `const { position, ...employeeRest } = employee` destructures the `employee` objects and collects the properties into a rest object `employeeRest` without including the `position` property. 

Object destructuring with rest syntax is an immutable way of property removal: the original `employee` object isn't mutated. Rather a new object `employeeRest` is created which contains all the properties of `employee` but without the removed `position`.  

If the property name to remove is determined dynamically, then you can use use the dynamic property name destructuring syntax:

```javascript{6}
const employee = {
  name: 'John Smith',
  position: 'Sales Manager'
};

const name = 'position';
const { [name]: removedProperty, ...employeeRest } = employee;

console.log(employeeRest); // { name: 'John Smith' }
```

[Try the demo.](https://codesandbox.io/s/destructuring-rest-dynamic-m4jgf)

`const { [name]: removedProperty, ...employeeRest } = employee` let's you remove a property with dynamic name by collecting the properties, but removed one, into `employeeRest` object.  

What's interesting is that you can remove multiple properties at once using the destructuring and rest syntax:

```javascript{6}
const employee = {
  name: 'John Smith',
  position: 'Sales Manager',
  experience: 6, // years
};

const { position, experience, ...employeeRest } = employee;

console.log(employeeRest); // { name: 'John Smith' }
```

[Try the demo.](https://codesandbox.io/s/destructuring-rest-multiple-i73ki?file=/src/index.js)

`const { position, experience, ...employeeRest } = employee` has removed 2 properties at once: `position` and `experience`.  

## 3. Conclusion

In JavaScript, there are 2 common ways to remove properties from an object.  

The first mutable approach is to use the `delete object.property` operator.  

The second approach, which is immutable since it doesn't modify the original object, is to invoke the object destructuring and spread syntax:  `const {property, ...rest} = object`.  

*Side challenge: what is the [time complexity](https://en.wikipedia.org/wiki/Time_complexity) of the property removal using `delete` and object rest syntax? Write your opinion in a comment below!*