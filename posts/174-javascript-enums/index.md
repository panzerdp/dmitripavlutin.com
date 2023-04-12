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

<Affiliate type="traversyJavaScript" />

<TableOfContents maxLevel={1} />

## 1. Enum based on plan object

An enum is a data structure that defines a finite set of values and provides access to a specific value by its name.  

Let's consider the sizes of a T-shirt: `Small`, `Medium`, and `Large`. 

A simple way (yet not the most optimal, see the approaches below) to create an enum in JavaScript is using a [plain JavaScript object](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Basics).  

```javascript
const Sizes = {
  Small: 'small',
  Medium: 'medium',
  Large: 'large',
}

const mySize = Sizes.Medium

console.log(mySize === Sizes.Medium) // logs true
```

`Sizes` is an enum based on a plain JavaScript object. Accessing an enum value is done using the property accessor: `Sizes.Medium`.  

A pros of using an plain object enum is its simplicity: just define an object with keys and values, and the enum is ready.  

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

Let's look further into value types exploration, and then how to freeze the enum object to avoid accidental changes.  

## 2. Enum value types

Alongside the string type, the value of an enum can be a number:

```javascript
const Sizes = {
  Small: 0,
  Medium: 1,
  Large: 3
}

const mySize = Sized.Medium

console.log(mySize === Sizes.Medium) // logs true
```

Or even a symbol:

```javascript
const Sizes = {
  Small: Symbol('small'),
  Medium: Symbol('medium'),
  Large: Symbol('large')
}

const str = JSON.strigify({ size: Sizes.Small })

console.log(str) // logs true
```

The benefit of using a symbol is that [each symbol is unique](https://javascript.info/symbol#symbols). Thus you always have to compare enums using the enum itself:

```javascript
const Sizes = {
  Small: Symbol('small'),
  Medium: Symbol('medium'),
  Large: Symbol('large')
}

const mySize = Sized.Medium

console.log(mySize === Sizes.Medium)     // logs true
console.log(mySize === Symbol('medium')) // logs false
```

The downside of using symbols is that `JSON.stringify()` stringifies symbols to either `null`, `undefined`, or skips the property having a symbol value:

```javascript
const Sizes = {
  Small: Symbol('small'),
  Medium: Symbol('medium'),
  Large: Symbol('large')
}

const str1 = JSON.strigify(Sizes.Small)
console.log(str1) // logs undefined

const str2 = JSON.stringify([Sizes.Small])
console.log(str2) // logs '[null]'

const str3 = JSON.stringify({ size: Sizes.Small })
console.log(str3) // logs '{}'
```

In the follo up code examples and implementations I will use strings as values of enums. But you are free to use the value type that you need. 

If you don't have restrictions on the enum value type, just go with the strings. The strings are more debuggable compared to numbers and symbols.  

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

Because `Sizes` is a frozen object, JavaScript throws (in [strict mode](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode)) the error:

```
TypeError: Cannot assign to read only property 'Medium' of object <Object>
```

The enum is now protected from accidential changes.  

## 3. Enum based on a class

## 4. Enum based on a proxy

## 5. Values of enum

## 6. Conclusion

