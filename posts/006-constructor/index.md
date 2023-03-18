---
title: "Inheritance in JavaScript: Understanding the constructor Property"
description: "The `constructor` property is a piece of the inheritance mechanism in JavaScript. Precautions should be taken when creating hierarchies of classes.  "
published: "2016-05-01"
modified: "2016-05-01"
thumbnail: "./images/cover.jpg"
slug: understanding-constructor-property
tags: ["javascript", "constructor", "instanceof"]
type: post
---

JavaScript has an interesting inheritance mechanism: [prototypal](https://developer.mozilla.org/en/docs/Web/JavaScript/Inheritance_and_the_prototype_chain). Most of the starting JavaScript developers have hard time understanding it, as well as I had.  

All types in JavaScript (except the `null` and `undefined` values) have a constructor property, which is a part of the inheritance. For example:

```javascript
var num = 150;
num.constructor === Number // => true
var obj = {};
obj.constructor === Object // => true
var reg = /\d/g;
reg.constructor === RegExp; // => true
```

In this article we'll dive into the `constructor` property of an object. It serves as a public identity of the class, which means it can be used for:

* Identify to what class belongs an object (an alternative to `instanceof`)
* Reference from an object or a prototype the constructor function
* Get the class name

## 1. The constructor in primitive types

In JavaScript the [primitive types](https://developer.mozilla.org/en/docs/Web/JavaScript/Data_structures) are number, boolean, string, symbol (in ES6), `null` and `undefined`. 
Any value except `null` and `undefined` has a `constructor` property, which refers to the corresponding type function:

* `Number()` for numbers: `(1).constructor === Number`
* `Boolean()` for booleans: `(true).constructor === Boolean`
* `String()` for strings: `('hello').constructor === String`
* `Symbol()` for symbols: `Symbol().constructor === Symbol`

The constructor property of a primitive can be used to determine it's type by comparing it with the corresponding function. For example to verify if the value is a number:

```javascript
if (myVariable.constructor === Number) {
   // code executed when myVariable is a number
   myVariable += 1;
}
```
Notice that this approach is generally not recommended and `typeof` is preferable (see 1.1). But it can be useful for a `switch` statement, to reduce the number of `if/else`:

```javascript
// myVariable = ...
var type;
switch (myVariable.constructor) {
  case Number:
    type = 'number';
    break;
  case Boolean:
    type = 'boolean';
    break;
  case String:
    type = 'string';
    break;
  case Symbol:
    type = 'symbol';
    break;
  default:
    type = 'unknown';
    break;
}
```

### 1.1 The object wrapper for a primitive value
An object wrapper for a primitive is created when invoking the function with `new` operator. Wrappers can be created for `new String('str')`, `new Number(15)` and `new Boolean(false)` . It cannot be created for a `Symbol`, because invoked this way `new Symbol('symbol')` generates a TypeError.  
The wrapper exists to allow developer to attach custom properties and methods to a primitive, because JavaScript doesn't allow for primitives to have own properties.  

Existence of these objects may create confusion for determining the variable type based on the constructor, because the wrapper has the same constructor as the primitive:

```javascript
var booleanObject = new Boolean(false);
booleanObject.constructor === Boolean // => true

var booleanPrimitive = false;
booleanPrimitive.constructor === Boolean // => true
```

## 2. The constructor in a prototype object

The `constructor` property in a prototype is automatically setup to reference the constructor function.

```javascript
function Cat(name) {
  this.name = name;
}
Cat.prototype.getName = function() {
  return this.name;
}
Cat.prototype.clone = function() {
  return new this.constructor(this.name);
}
Cat.prototype.constructor === Cat // => true
```
Because properties are inherited from the prototype, the `constructor` is available on the instance object too.

```javascript
var catInstance = new Cat('Mew');
catInstance.constructor === Cat // => true
```
Even if the object is created from a literal, it inherits the constructor from `Object.prototype`.

```javascript
var simpleObject = {
  weekDay: 'Sunday'
};
simpleObject.prototype === Object // => true
```

### 2.1 Don't loose the constructor in the subclass

`constructor` is a regular non-enumerable property in the prototype object. It does not update automatically when a new object is created based on it. When creating a subclass, the correct constructor should be setup manually.  

The following example creates a sublcass `Tiger` of the `Cat` superclass. Notice that initially `Tiger.prototype` still points to `Cat` constructor.
```javascript
function Tiger(name) {
   Cat.call(this, name);
}
Tiger.prototype = Object.create(Cat.prototype);
// The prototype has the wrong constructor
Tiger.prototype.constructor === Cat   // => true
Tiger.prototype.constructor === Tiger // => false
```
Now if we clone a `Tiger` instance using `clone()` method defined on `Cat.prototype`, it will create a wrong `Cat` instance.

```javascript
var tigerInstance = new Tiger('RrrMew');
var wrongTigerClone = tigerInstance.clone();
tigerInstance instanceof Tiger    // => true
// Notice that wrongTigerClone is incorrectly a Cat instance
wrongTigerClone instanceof Tiger  // => false
wrongTigerClone instanceof Cat    // => true
```
It happens because `Cat.prototype.clone()` uses `new this.constructor()` to create a new clone. But the constructor still points to `Cat` function.  

To fix this problem it's necessary to manually update the `Tiger.prototype` with the correct constructor function: `Tiger`. The `clone()` method will be fixed too.

```javascript
//Fix the Tiger prototype constructor
Tiger.prototype.constructor = Tiger;
Tiger.prototype.constructor === Tiger // => true

var tigerInstance = new Tiger('RrrMew');
var correctTigerClone = tigerInstance.clone();

// Notice that correctTigerClone is correctly a Tiger instance
correctTigerClone instanceof Tiger  // => true
correctTigerClone instanceof Cat    // => false
```

[Check this demo](http://jsbin.com/yevape/1/edit?js,console) for a complete example.

## 3. An alternative to instanceof

`object instanceof Class` is used to determine if the `object` has the same prototype as the `Class`.  
This operator searches in the prototype chain too, which sometimes makes difficult to identify the subclass instance from superclass instance. For example:

```javascript
var tigerInstance = new Tiger('RrrMew');

tigerInstance instanceof Cat   // => true
tigerInstance instanceof Tiger // => true
```
As seen in the example, it's not possible to check if `tigerInstance` is exactly a `Cat` or `Tiger`, because `instanceof` returns `true` in both cases.  
This is where the `constructor` property shines, allowing to strictly determine the instance class.

```javascript
tigerInstance.constructor === Cat   // => false
tigerInstance.constructor === Tiger // => true

// or using switch
var type;
switch (tigerInstance.constructor) {
  case Cat:
    type = 'Cat';
    break;
  case Tiger:
    type = 'Tiger';
    break;
  default:
    type = 'unknown';    
}
type // => 'Tiger'
```

## 4. Get the class name

The function object in JavaScript has a property [name](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/name). It returns the name of the function or an empty string for anonymous one.  
In addition with `constructor` property, this can be useful to determine the class name, as an alternative to `Object.prototype.toString.call(objectInstance)`.

```javascript
var reg = /\d+/;
reg.constructor.name                // => 'RegExp'
Object.prototype.toString.call(reg) // => '[object RegExp]'

var myCat = new Cat('Sweet');
myCat.constructor.name                // => 'Cat'
Object.prototype.toString.call(myCat) // => '[object Object]'
```

Because `name` returns an empty string for an anonymous function (however in ES6 the name can be inferred), this approach should be used carefully.

## Conclusion

The `constructor` property is a piece of the inheritance mechanism in JavaScript. Precautions should be taken when creating hierarchies of classes.  
However it offers nice alternatives to determine the type of an instance.

**See also**  
[Object.prototype.constructor](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/constructor)  
[What's up with the constructor property in JavaScript?](http://www.2ality.com/2011/06/constructor-property.html)