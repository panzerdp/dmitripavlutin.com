---
title: "Own and Inherited Properties in JavaScript"
description: "Knowing the difference between own and inherited properties helps understanding the JavaScript prototypal inheritance."
published: "2020-05-24T18:00Z"
modified: "2020-05-26T07:30Z"
thumbnail: "./images/cover.png"
slug: own-and-inherited-properties-in-javascript
tags: ["javascript", "object"]
recommended: ["access-object-properties-javascript", "javascript-object-destructuring"]
type: post
commentsThreadId: own-and-inherited-properties-in-javascript
---

In JavaScript, contrary to other programming languages like Java or Python, there's no template (e.g. class) concept for creating objects.  

Every JavaScript object links to another object named prototype, from which the object inherits properties.  

In this post, I'll describe the difference between own and inherited properties. It's a good way to understand the *slightly unusual* inheritance mechanism of JavaScript.  

## 1. Own properties

> *An own property* is a property defined directly on the object.  

Let's define a plain JavaScript object with one property:

```javascript
const myObject = {
  myProp: 'Value'
};

myObject.myProp; // => 'Value'
```

`myObject` is a plain JavaScript object. The property `myProp` is defined directly on `myObject`, being an *own property*.  

To list the own properties of an object use the built-in utility function `Object.getOwnPropertyNames(object)`.  

Let's list the own properties of `myObject`:

```javascript
const myObject = {
  myProp: 'Value'
};

Object.getOwnPropertyNames(myObject); // => ['myProp']
```

`Object.getOwnPropertyNames(myObject)` returns an array having one own property name: `['myProp']`.  

## 2. Inherited properties

> *An inherited property* is a property the object inherits from the prototype object.  

Every object in JavaScript links to an object, the prototype, from which it inherits properties.  

Let's use again `myObject`. This time let's access a property that you haven't defined upon `myObject` directly:

```javascript
const myObject = {
  myProp: 'Value'
};

myObject.toString; // => function() {...}
```

The property accessor `myObject.toString` evaluates to a function.  

`toString` is an inherited property. In other words, `myObject` inherits `toString` property from its prototype object.  

When JavaScript evaluates the expression `myObject.toString`, first, it tries to find the property `toString` within the own properties - however it cannot find one (`myObject` has just one own property `myProp`). Then JavaScript looks inside the prototype object of `myObject`, and finally finds a property `toString`.  

Inherited `toString` property of `myObject` equals to the same property access directly from the prototype object:

```javascript
const myObject = {
  myProp: 'Value'
};

const myObjectProto = Object.getPrototypeOf(myObject);

myObject.toString === myObjectProto.toString; // => true
```

Where `Object.getPrototypeOf(object)` is an utility function that returns the object's prototype.  

## 3. Prototype as a source of inherited properties

When I was trying to understand the prototypal inheritance in JavaScript, I was thinking that the prototype object is a complex or special God object. But it's much simpler.  

Think about the prototype object as a source of inherited properties for an object.  

## 4. Own vs inherited

Let's slightly modify `myObject` and define a method `toString` directly on it:  

```javascript
const myObject = {
  myProp: 'Value',
  toString() {
    return `[object MyObject]`;
  }
};

const myObjectProto = Object.getPrototypeOf(myObject);

myObject.toString === myObjectProto.toString; // => false
```

Because `myObject` has an own property `toString`, the object does no longer inherit `toString` from the prototype object.  

When an object has an own property and inherits a property with the same name, the own property takes precedence over the inherited one.  

If an own property gets deleted, then the inheritance re-activates:

```javascript
const myObject = {
  myProp: 'Value',
  toString() {
    return `[object MyObject]`;
  }
};

// Own properties
myObject.toString(); // => '[object MyObject]'
myObject.myProp;     // => 'Value'

delete myObject.toString;
delete myObject.myProp;

// Inherited property
myObject.toString(); // => '[object Object]'

// No inherited property
myObject.myProp;     // => undefined
```

The first method invocation `myObject.toString()` uses the own property. Then `delete myObject.toString` deletes the own property. 

The second invocation `myObject.toString()`, even having the own property `toString` deleted, uses the inherited `toString` property from the prototype object.  

However, there's no `myProp` inherited from the prototype. When the own prop `myProp` is deleted from the object `delete myObject.myProp`, later the expression `myObject.myProp` evaluates to `undefined`.  

### 5. Summary

A JavaScript object can have either own or inherited properties.  

The own property means that the property is defined directly on the object. On the other side, the inherited property is the one inherited from the prototype object.  

Knowing the difference between own and inherited properties is a big step in understanding the prototypal inheritance of JavaScript.  