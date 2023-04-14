---
title: "4 Ways to Create an Enum in JavaScript"
description: "An enum type represents a set of constants. The plain object, frozen object, proxied object or class-based are the 4 ways to create enums in JavaScript."
published: "2023-04-14"
modified: "2023-04-14"
thumbnail: "./images/cover-2.jpg"
slug: javascript-enum
tags: ['javascript', 'enum']
type: post
---

Strings and numbers have an infinite set of values, while others types like boolean are restricted to a finite set.  

The days of the week (Monday, Tuesday, ..., Sunday), seasons of the year (winter, spring, summer, autumn), and cardinal directions (north, east, south, west) are examples of sets with finite values.  

Using an [enum](https://en.wikipedia.org/wiki/Enumerated_type) is convenient if a variable has a value from a finite set of pre-defined constants. The enum saves you from magic numbers and strings (which are considered an [antipattern](https://stackoverflow.com/questions/47882/what-is-a-magic-number-and-why-is-it-bad)).    

Let's see the 4 good ways to create enums in JavaScript (with their pros and cons).  

<Affiliate type="traversyJavaScript" />

<TableOfContents maxLevel={1} />

## 1. Enum based on a plain object

An enum is a data structure that defines a finite set of constant values and gives access to a specific constant by its name.  

Let's consider the sizes of a T-shirt: `Small`, `Medium`, and `Large`. A variable containing the sizes enum value can have either small, medium, or large.   

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

The plain object enum buys with its simplicity: just define an object with keys and values, and the enum is ready.  

An issue with the plain object enum is that enum can be overwritten. 

In a large codebase, somebody might accidentally modify the enum object, and this will affect the entire runtime of the application.  

```javascript
const Sizes = {
  Small: 'small',
  Medium: 'medium',
  Large: 'large',
}

const size1 = Sizes.Medium
const size2 = Sizes.Medium = 'foo' // Changed!

console.log(size1 === Sizes.Medium) // logs false
```

`Sizes.Medium` enum value was accidently changed. `size1` initialized with `Sizes.Medium`, and accidental overwrite no longer equals `Sized.Medium`!  

The plain object implementation cannot protect from these accidental changes. 

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

const mySize = Sized.Medium

console.log(mySize === Sizes.Medium) // logs true
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

The downside of using symbols is that `JSON.stringify()` stringifies symbols to either `null`, `undefined`, or skips the property having a symbol:

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

In the follow-up code examples, I will use strings as values of enums. But you are free to use the value type that you need. 

If you a free to choose the enum value type, just go with the strings. The strings are more debuggable compared to numbers and symbols.  

## 3. Enum based on Object.freeze()

A good way to protect the enum object from modifications is to freeze it. When an object is frozen you cannot modify or add new properties to the object. In other words, the object becomes read-only.  

In JavaScript, [Object.freeze()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze) utility function freezes an object. Let's freeze the sizes enum object:

```javascript
const Sizes = Object.freeze({
  Small: 'small',
  Medium: 'medium',
  Large: 'large',
})

const mySize = Sizes.Medium

console.log(mySize === Sizes.Medium) // logs true
```

`const Sizes = Object.freeze({ ... })` creates a frozen object. Even being frozen, you can freely access the enum values: `const mySize = Sizes.Medium`.  

If an enum property is accidentally changed, JavaScript throws an error:  

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

The enum is now protected from accidental changes.  

Still, there's an issue with using the frozen object enum. If you accidentally misspelled the enum value the result will be simply `undefined`:

```javascript
const Sizes = Object.freeze({
  Small: 'small',
  Medium: 'medium',
  Large: 'large',
})

console.log(Sizes.Med1um) // logs undefined
```

`Sizes.Med1um` expression simply evaluates to `undefined`, rather than throwing an error about the non-existing enum value.  

Let's see how an enum based on a proxy can solve even this problem.  

## 4. Enum based on a proxy

An interesting, and my favorite implementation, are enums based on [proxies](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy).  

A proxy is a special object that wraps the original object to modify the behavior of operations on the original object. The proxy usually doesn't modify the structure of the original object.  

A proxy can improve the read and write operations on an enum by:

* Throwing an error if a non-existing enum value is read
* Throwing an error on write operations on enum properties

Here's an implementation of a factory function that accepts a plain object enum, and returns a proxied object:

```javascript {4,10}
// enum.js
export function Enum(baseEnum) {  
  return new Proxy(members, {
    get(target, name) {
      if (!baseEnum.hasOwnProperty(name)) {
        throw new Error(`"${name}" value does not exist in the enum`)
      }
      return members[name]
    },
    set(target, name, value) {
      throw new Error('Cannot add a new value to the enum')
    }
  })
}
```

`get()` method of the proxy intercepts the read operations and throws an error if the property name doesn't exist. 

`set()` method intercepts the write operations and just throws an error right away. It's made to protect the enum object from write operations.  

Let's wrap the plain object enum into a proxy:

```javascript
import { Enum } from './enum'

const Sizes = Enum({
  Small: 'small',
  Medium: 'medium',
  Large: 'large',
})

const mySize = Sizes.Medium

console.log(mySize === Sizes.Medium) // logs true
```

The proxied enum works exactly like the plain object enum.  

The proxy-based enums are protected from accidental overwriting and accessing of non-existing enum values:

```javascript
import { Enum } from './enum'

const Sizes = Enum({
  Small: 'small',
  Medium: 'medium',
  Large: 'large',
})

const size1 = Sizes.Med1um         // throws Error: non-existing value
const size1 = Sizes.Medium = 'foo' // throws Error: changing the enum
```

`Sizes.medium` throws an error because `medium` property does not exist on the enum. 

`Sizes.Medium = 'foo'` throws an error because the enum property is being changed.  

But you always have to import the `Enum` function and wrap your enums into it. 

## 5. Enum based on a class

Another interesting way to create an enum is using a JavaScript class.  

Each enum value represents an instance of a class that is stored as a [static field](/javascript-classes-complete-guide/#33-public-static-fields) on the same class.  

Let's implement the sizes enum using a class:

```javascript
class Sizes {
  static Small = new Season('small')
  static Medium = new Season('medium')
  static Large = new Season('large')
  #value

  constructor(value) {
    this.#value = value
  }

  toString() {
    return this.#value
  }
}

const mySize = Sizes.Small

console.log(mySize === Sizes.Small)  // logs true
console.log(mySize instanceof Sizes) // logs true
```

`Sizes` is a class that represents the enum. The enum values are static fields on the class, e.g. `static Small = new Season('small')`.

Each instance of the `Sizes` class also has a private field `#value`, which represents the raw value of the enum.  

A nice benefit of the class-based enum is the ability to determine at runtime if the value is an enum using `instanceof` operation. For example `mySize instanceof Sizes` evaluates to `true` since `mySize` is an enum value.  

The class-based enum comparison happens based on object instances, compared to plain object or proxy-based enums where the comparison happens based on primitives (usually a string). That's why you always have to use the enum's static field instances during assignment or comparison:

```javascript
class Sizes {
  static Small = new Season('small')
  static Medium = new Season('medium')
  static Large = new Season('large')
  #value

  constructor(value) {
    this.#value = value
  }

  toString() {
    return this.#value
  }
}

const mySize = Sizes.Small

console.log(mySize === new Sizes('small')) // logs false
```

`mySize` having `Sizes.Small` enum value, isn't equal to `new Sizes('small')`. `Sizes.Small` and `new Sizes('small')`, even having the same `#value`, are different object instances.  

If classes are your thing, you might use the class-based enums. 

Class-based enums are not protected from overwriting or accessing a non-existing enum value.  

```javascript
class Sizes {
  static Small = new Season('small')
  static Medium = new Season('medium')
  static Large = new Season('large')
  #value

  constructor(value) {
    this.#value = value
  }

  toString() {
    return this.#value
  }
}

const size1 = Sizes.medium         // a non-existing enum value can be accessed
const size2 = Sizes.Medium = 'foo' // enum value can be overwritten accidentally
```

## 6. Conclusion

There are 3 good ways to create enums in JavaScript.  

The simplest way is to use a plain JavaScript object:

```javascript
const MyEnum = {
  Option1: 'option1',
  Option2: 'option2',
  Option3: 'option3'
}
```

The plain object enum fits best for small projects or quick demos.  

The second option, if you want to protect the enum object from accidental overwrites, is to use a frozen plain object:

```javascript
const MyEnum = Object.freeze({
  Option1: 'option1',
  Option2: 'option2',
  Option3: 'option3'
})
```

The frozen object enum is good for medium or bigger-size projects when you want to make sure the enum isn't accidentally changed.  

The third option, if you want even better protection from overwrites and reading of non-existing enum values, then use the proxy approach:

```javascript
export function Enum(baseEnum) {  
  return new Proxy(members, {
    get(target, name) {
      if (!baseEnum.hasOwnProperty(name)) {
        throw new Error(`"${name}" value does not exist in the enum`)
      }
      return members[name]
    },
    set(target, name, value) {
      throw new Error('Cannot add a new value to the enum')
    }
  })
}
```

```javascript
import { Enum } from './enum'

const MyEnum = Enum({
  Option1: 'option1',
  Option2: 'option2',
  Option3: 'option3'
})
```

The proxied enum is good for medium or bigger size projects where you want to protect even more your enums from overwrites or access of non-existing values. The proxied enum is my personal preference.  

The fourth option, if you prefer classes, is to use the class-based enum where each value is an instance of the class and is stored as a static property on the class:

```javascript
class MyEnum {
  static Option1 = new Season('option1')
  static Option2 = new Season('option2')
  static Option3 = new Season('option3')
  #value

  constructor(value) {
    this.#value = value
  }

  toString() {
    return this.#value
  }
}
```

The class-based enum works if you like classes. Class-based enum, however, is less protected than frozen or proxied enums.    

*What other ways to create enums in JavaScript do you know?*