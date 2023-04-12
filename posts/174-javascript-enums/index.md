---
title: "3 Ways to Create a JavaScript Enum"
description: "Using an enum is convinient if a variable has a value from a finite set. The enum saves you from magic numbers and strings."
published: "2023-04-12"
modified: "2023-04-12"
thumbnail: "./images/cover-2.jpg"
slug: javascript-enum
tags: ['javascript', 'enum']
type: post
---

Certain data types like strings have an infinite number of potential values , while others are restricted to a finite set.  

The days of the week (Monday, Tuesday, ..., Sunday), seasons of the year (winter, spring, summer, autumn), cardinal directions (north, east, south, west) are examples of sets with finite values.  

Using an enum is convinient if a variable has a value from a finite set of pre-defined values. The enum saves you from magic numbers and strings, which are considered an [antipattern](https://stackoverflow.com/questions/47882/what-is-a-magic-number-and-why-is-it-bad).    

Let's see the 3 good ways to create enums in JavaScript (with their pros and cons).  

<TableOfContents maxLevel={1} />

<Affiliate type="traversyJavaScript" />

## 1. Plain object enum

An enum is a data structure that defines a finite set of values and provides access to a specific value by its name.  

Let's consider the sizes of a T-shirt: `Small`, `Medium`, and `Large`. 

A simple way (yet not the most optimal, see the approaches below) to create an enum in JavaScript is using a [plain JavaScript object](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Basics).  

```javascript
const Sizes = {
  Small: 'Small',
  Medium: 'Medium',
  Large: 'Large',
}

const mySize = Sizes.Medium

console.log(mySize === Sizes.Medium) // logs true
```

`Sizes` is an enum based on a plain JavaScript object. Accessing an enum value is done using the property accessor: `Sizes.Medium`.  

### 1.1 Plain object enum is mutable

An issue with the enum implementation based on a plain JavaScript is that the enum can be easily modified. In a large codebase, somebody might accidently modify the enum object, and this will affect the entire runtime of the application.  

```javascript
const Sizes = {
  Small: 'Small',
  Medium: 'Medium',
  Large: 'Large',
}

const size1 = Sizes.Medium
const size2 = Sizes.Medium = 'foo' // Changed!

console.log(size1 === size2) // logs false
```

`Sizes.Medium` enum value was changed by accident. The plain object implementation cannot protect these accidental changes.  

Let's look further into how you could freeze the objects to avoid accidental changes.  

## 2. Enum based on Object.freeze()

A good way to protect the enum object from modifications is to freeze it. When an object is frozen you cannot modify or add new properties to the object. In other words, the object becomes readonly.  

In JavaScript [Object.freeze()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze) utility function freezes an object. Let's freeze the sizes enum object:

```javascript
const Sizes = Object.freeze({
  Small: 'Small',
  Medium: 'Medium',
  Large: 'Large',
})

const mySize = Sizes.Medium

console.log(mySize === Sizes.Medium) // logs true
```

`const Sizes = Object.freeze({ ... })` creates a frozen object. Even being frozen, you can freely access the enum values: `const mySize = Sizes.Medium`.  

In case if you accidently modify a property in a frozen object, JavaScript throws an error.  

```javascript
const Sizes = Object.freeze({
  Small: 'Small',
  Medium: 'Medium',
  Large: 'Large',
})

const size1 = Sizes.Medium
const size2 = Sizes.Medium = 'foo' // throws TypeError
```

The statement `const size2 = Sizes.Medium = 'foo'` makes an accidental assignment to `Sizes.Medium` property. 

Because `Sizes` is a frozen object, JavaScript throws (in [strict mode](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode)):
```
TypeError: Cannot assign to read only property 'Medium' of object <Object>
```

The enum is now protected from accidential changes.  

## 3. Enum based on a class

## 4. Enum based on a proxy

## 5. Values of enum

## 6. Conclusion

