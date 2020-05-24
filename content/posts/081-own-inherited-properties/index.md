---
title: "Own and Inherited Properties in JavaScript"
description: "Knowing the difference between own and inherited properties helps understanding the prototypal inheritance."
published: "2020-05-23T12:00Z"
modified: "2020-05-23T12:00Z"
thumbnail: "./images/cover.png"
slug: own-and-inherited-properties-in-javascript
tags: ["javascript", "object"]
recommended: ["access-object-properties-javascript", "javascript-object-destructuring"]
type: post
commentsThreadId: own-and-inherited-properties-in-javascript
---

In JavaScript, contrary to other programming languages like Java or Python, there is no concept of class as a template for creating objects.  

In JavaScript exists only objects or primitive types. Every object links to another special object named prototype, from which the object inherits properties.  

In this post, I'll describe the difference between own and inherited properties. This will help you understand the *slightly unusual* inheritance mechanism of JavaScript.  

## 1. Own properties

> *An own property* is a property defined directly on the object.  

In the following example:

```javascript
const myObject = {
  myProp: 'Value'
};

myObject.myProp; // => 'Value'
```

`myObject` is a plain JavaScript object. The property `myProp` is defined directly on `myObject`, being an *own property*.  

If you'd like to list the own properties of an object, you can use `Object.getOwnPropertyNames(object)`.  

Let's use `myObject` and list all of its own properties:

```javascript
const myObject = {
  myProp: 'Value'
};

Object.getOwnPropertyNames(myObject); // => ['myProp']
```

Because `myObject` has one own property `myProp`, invoking `Object.getOwnPropertyNames(myObject)` returns an array having this property name: `['myProp']`.  

## 2. Inherited properties

> *An inherited property* is a property the object inherits from the prototype object.  

Every object in JavaScript links to an object from which it inherties properties: this object named *prototype*.  

Let's use again `myObject`. But this time access a property that you haven't defined upon `myObject`:

```javascript
const myObject = {
  myProp: 'Value'
};

myObject.toString; // => function() {...}
```

The property accessor `myObject.toString` evaluates to a function.  

Even if directly upon `myObject` there isn't defined a property `toString`, still as the code snippets show there is a value on this property. How does it happen?  

The answer is `toString` of `myObject` is an inhertied property. In other words, `myObject` inherits `toString` property from its prototype object.  

When JavaScript evaluates the expression `myObject.toString`, first, it tries to find the property `toString` within the own properties - however it 
cannot find one (recall that `myObject` has just one own property `myProp`). Then JavaScript looks inside the prototype object of `myObject`, and finally finds the property `toString`.  

Let's compare the value of property `toString` from the prototype object against the one from `myObject`. Are they the same?  

```javascript
const myObject = {
  myProp: 'Value'
};

const myObjectProto = Object.getPrototypeOf(myObject);

myObject.toString === myObjectProto.toString; // => true
```

`Object.getPrototypeOf(myObject)` returns the prototype object of `myObject`.  

As expected, `toString` property of `myObject` equals to the same property access directly from the prototype object `myObjectProto`.  

## 3. Prototype object as source of properties

When I was trying to understand the prototypes in JavaScript, I was thinking that the prototype object is a complex and special God object. But it's much simpler.  

Think about the prototype object as a source of inherited properties for the object. And that's all.  

## 4. Own vs inherited

Let's slightly modify `myObject` and defined a method `toString` directly upon it.  

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

If you have defined an own property, then delete the property, the inheritance activates again:

```javascript
const myObject = {
  myProp: 'Value',
  toString() {
    return `[object MyObject]`;
  }
};

myObject.toString(); // => '[object MyObject]'

delete myObject.toString;

myObject.toString(); // => '[object Object]'
```

The first method invocation `myObject.toString()` uses the own property. Then `delete myObject.toString` deletes the own property.  

Later, however, even having the own property `toString` deleted, calling `myObject.toString()` uses the property `toString` from the prototype object.  

### 4. Summary

A JavaScript object can have either own or inherited properties.  

The own property means is the property is defined directly on the object. On the other side, the inhertied property is the one inherited from the prototype object.  

If my post has help you understand the difference between own and inhertied properties, then congrats! You've made a good step in understand the prototypal inheritance.  