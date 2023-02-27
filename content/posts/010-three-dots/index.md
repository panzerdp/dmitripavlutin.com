---
title: "How Three Dots Changed JavaScript"
description: "Spread operator and rest parameter are great additions. The article explains how they improve array literals, array destructuring and function arguments handling."
published: "2016-06-14"
modified: "2020-01-18T12:40Z"
thumbnail: "./images/cover.jpg"
slug: how-three-dots-changed-javascript
tags: ["javascript", "spread", "rest", "iterable", "iterator"]
recommended: ["object-rest-spread-properties-javascript", "7-tips-to-handle-undefined-in-javascript"]
type: post
---

I don't like `arguments` keyword when I access the arguments of a function call. Its hardcoded name makes difficult to access `arguments` of an outer function in an inner one (which defines its own `arguments`).  

Even worse `arguments` is an array-like object. You cannot use array methods like `.map()` or `.forEach()` directly on it.  

*Before I continue, allow me to make a recommendation.* 

*If you want to significantly improve your JavaScript knowledge, take the  amazingly useful ["Modern JavaScript From The Beginning 2.0"](https://www.traversymedia.com/a/2147528886/FqXWyazh) by Brad Traversy. Use the coupon code "DMITRI" and get up to 20% discount!*

To access `arguments` from the enclosing function, you have to use workarounds by storing it into a separated variable. And to walk through this array-like object, you have to use *duck typing* and make indirect invocations. See the following example:

```javascript
function outerFunction() {
   // store arguments into a separated variable
   const argsOuter = arguments;
   function innerFunction() {
      // args is an array-like object
      const even = Array.prototype.map.call(argsOuter, function(item) {
         // do something with argsOuter               
      });
   }
}
```

Another situation is the function invocation that accepts a dynamic number of arguments. Filling the arguments from an array is unpleasant.  

For instance `.push(item1, ..., itemN)` inserts elements into an array one by one: you have to enumerate each element as an argument. This is not always convenient: often an entire array of elements needs to be pushed into an existing array, without creating a new instance.  

In ES5 it's solved with `.apply()`: an unfriendly and verbose approach. Let's  take a look:

```javascript
const fruits = ['banana'];
const moreFruits = ['apple', 'orange'];
Array.prototype.push.apply(fruits, moreFruits);
console.log(fruits); // => ['banana', 'apple', 'orange']
``` 

Fortunately, the JavaScript world is changing. The three dots operator `...` fixes many of these situations. The operator is introduced by ECMAScript 6 and in my opinion, is a noticeable improvement.  

This article walks through `...` operator use cases and shows how to solve similar problems.

## 1. Three dots

**The JavaScript rest operator** collects the arguments list passed to a function on invocation or collects the pieces after destructuring an array. A case when *the operator gathers the rest remained after the operation*.  

```javascript
function countArguments(...args) {
   return args.length;
}
// get the number of arguments
countArguments('welcome', 'to', 'Earth'); // => 3
// destructure an array
let otherSeasons, autumn;
[autumn, ...otherSeasons] = ['autumn', 'winter'];
otherSeasons      // => ['winter']
```

**The JavaScript spread operator** constructs arrays or sets the function arguments on invocation from an array. A case when *the operator spreads the array (or iterable object) elements*.  

```javascript
let cold = ['autumn', 'winter'];
let warm = ['spring', 'summer'];
// construct an array
[...cold, ...warm] // => ['autumn', 'winter', 'spring', 'summer']
// function arguments from an array
cold.push(...warm);
cold              // => ['autumn', 'winter', 'spring', 'summer']
```

## 2. Improved parameters access

### 2.1 Rest parameter
As presented in the introduction, dealing with `arguments` object in a function body becomes troublesome in complex scenarios.  

For example a JavaScript inner function `filterNumbers()` wants to access `arguments` from its outer function `sumOnlyNumbers()`:

```javascript
function sumOnlyNumbers() {
  const args = arguments;
  const numbers = filterNumbers();
  return numbers.reduce((sum, element) => sum + element);
  function filterNumbers() {
     return Array.prototype.filter.call(args, 
       element => typeof element === 'number'
     );
  }
}
sumOnlyNumbers(1, 'Hello', 5, false); // => 6
```

To access `arguments` of `sumOnlyNumbers()` inside `filterNumbers()`, you have to create a temporary variable `args`. It happens because `filterNumbers()` defines its own `arguments` object that overwrites the external one.  

The approach works, but it's too verbose. `const args = arguments` can be omitted and `Array.prototype.filter.call(args)` can be transformed to `args.filter()` using a rest parameter. Let's optimize this part.

The rest operator solves this elegantly. It allows to define a **rest parameter** `...args` in a function declaration: 

```javascript
function sumOnlyNumbers(...args) {
  const numbers = filterNumbers();
  return numbers.reduce((sum, element) => sum + element);
  function filterNumbers() {
     return args.filter(element => typeof element === 'number');
  }
}
sumOnlyNumbers(1, 'Hello', 5, false); // => 6
```

The function declaration `function sumOnlyNumbers(...args)` indicates that `args` receives the invocation arguments in an array. Because the names conflict is solved, `args` can be used inside `filterNumbers()`.  

Also forget about array-like objects: `args` *is an array* - which is a nice bonus. As result, `filterNumbers()` can get rid of `Array.prototype.filter.call()` and make a filter method call directly  `args.filter()`.  

Notice that the rest parameter must be the last one in the function parameters list.

### 2.2 Selective rest parameter

When not all values should be included in the rest parameter, you can keep those as comma separated parameters at the beginning. Explicitly defined parameters are not included in the rest parameter.  

Let's see an example:

```javascript
function filter(type, ...items) {
  return items.filter(item => typeof item === type);
}
filter('boolean', true, 0, false);        // => [true, false]
filter('number', false, 4, 'Welcome', 7); // => [4, 7]
```

`arguments` object doesn't have this selective property and always includes all the values.

### 2.3 Arrow function case

[An arrow function](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Functions/Arrow_functions) does not define `arguments` object in its body but accesses the one from the enclosing scope.  

If you want to get all the arguments in an arrow function, use a rest parameter.

Let's try this in an example:  

```javascript
(function() {
  let outerArguments = arguments;
  const concat = (...items) => {
    console.log(arguments === outerArguments); // => true
    return items.reduce((result, item) => result + item, '');
  };
  concat(1, 5, 'nine'); // => '15nine'
})();
```

`items` rest parameter contains all function call arguments in an array. Also `arguments` object is taken from the enclosing scope and equals to `outerArguments` variable, so it has no valuable meaning.

## 3. Improved function call

In the article introduction, the second problem asks a better way to fill the invocation arguments from an array.  
ES5 provides [`.apply()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply) method on the function object to solve this. Unfortunately, this technique has 3 problems:  

* It's necessary to indicate manually the context of the function invocation
* Is not possible to use in a constructor invocation
* A shorter solution is more preferable

Let's see an example of `.apply()` usage:

```javascript
const countries = ['Moldova', 'Ukraine'];
const otherCountries = ['USA', 'Japan'];
countries.push.apply(countries, otherCountries);
console.log(countries); // => ['Moldova', 'Ukraine', 'USA', 'Japan']
```

As mentioned, it seems irrelevant to indicate in `.apply()` the second time the context `countries`. The property accessor `countries.push` is enough to determine the method invocation on an object.  
And the entire invocation looks verbose.  

**The JavaScript spread operator**  fills the function invocation arguments with values from an array (or more strictly from an iterable object, see [5.](#5spreadoperatoranditerationprotocols)).  
Let's improve the above sample with a spread operator:

```javascript
const countries = ['Moldova', 'Ukraine'];
const otherCountries = ['USA', 'Japan'];
countries.push(...otherCountries);
console.log(countries); // => ['Moldova', 'Ukraine', 'USA', 'Japan']
```

As seen, the spread operator is a cleaner and straightforward solution. The only additional characters are 3 dots (`...`).

The JavaScript spread operator configures the constructor invocation arguments from an array, which is [not possible directly](http://stackoverflow.com/questions/1606797/use-of-apply-with-new-operator-is-this-possible) when using `.apply()`. Let's see an example:

```javascript
class King {
   constructor(name, country) {
     this.name = name;
     this.country = country;     
   }
   getDescription() {
     return `${this.name} leads ${this.country}`;
   }
}
const details = ['Alexander the Great', 'Greece'];
const Alexander = new King(...details);
Alexander.getDescription(); // => 'Alexander the Great leads Greece'
```

Moreover you can combine multiple spread operators and regular arguments in the same invocation. The following example is removing from an array existing elements, then adds other array and an element:  

```javascript
const numbers = [1, 2];
const evenNumbers = [4, 8];
const zero = 0;
numbers.splice(0, 2, ...evenNumbers, zero);
console.log(numbers); // => [4, 8, 0]
```

## 4. Improved array manipulation

### 4.1 Array construction

The array literal `[item1, item2, .., itemN]` does not provide functionality other than enumerating the initial array elements.

The spread operator improves array literals by allowing to insert on the fly other arrays (or any other [iterables](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Iteration_protocols#Iterable_examples)) into the initialized instance. 
This improvement makes easier to accomplish common tasks described below.

**Create** an array with initial elements **from another array**:

```javascript
const initial = [0, 1];
const numbers1 = [...initial, 5, 7];
console.log(numbers1); // => [0, 1, 5, 7]
const numbers2 = [4, 8, ...initial];
console.log(numbers2); // => [4, 8, 0, 1]
```
`number1` and `number2` arrays are created using an array literal and in the meantime initialized with items from `initial`.

**Concatenate** 2 or more arrays:

```javascript
const odds = [1, 5, 7];
const evens = [4, 6, 8];
const all = [...odds, ...evens];
console.log(all); // => [1, 5, 7, 4, 6, 8]
```
`all` array is created from concatentation of `odds` and `evens` arrays.

**Clone** an array instance:

```javascript
const words = ['Hi', 'Hello', 'Good day'];
const otherWords = [...words];
console.log(otherWords);           // => ['Hi', 'Hello', 'Good day']
console.log(otherWords === words); // => false
```

`otherWords` is a clone version of `words` array. Notice that cloning happens only on the array itself, but not on the contained elements (i.e. it's not a deep clone).

### 4.2 Array destructure

[Destructuring assignments](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment), available in ECMAScript 6, are powerful expressions to extract data from arrays and objects.  

As a part of the destructuring, the rest operator extracts parts of an array. The extraction result is always an array.  

In terms of syntax, the rest operator should be the last one in a destructuring assignment: `[extractedItem1, ...restArray] = destructuredArray`.  

Let's see some applications:

```javascript
const seasons = ['winter', 'spring', 'summer', 'autumn'];
const head, restArray;
[head, ...restArray] = seasons;
console.log(head);      // => 'winter'
console.log(restArray); // => ['spring', 'summer', 'autumn']
```

`[head, ...restArray]` extracts the first item `'winter'` into `head` variable and the rest of elements into `restArray`.  

## 5. Spread operator and iteration protocols

The spread operator uses [iteration protocols](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Iteration_protocols) to navigate over elements of a collection. This makes the spread operator even more valuable because any object can define how the operator will extract data.

> An object is *Iterable* when it conforms to [iterable protocol](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Iteration_protocols#iterable). 

The iterable protocol requires the object to contain a special property. The property name must be [`Symbol.iterator`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/iterator) and value as a function that returns an iterator object.

```javascript
interface Iterable {
  [Symbol.iterator]() {
    //...
    return Iterator;
  }
}
```

> The *Iterator* object must conform to [iterator protocol](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Iteration_protocols#iterator).  

It needs to provide a property `next`, which value is a function that returns an object with properties `done` (a boolean to indicate the end of iteration) and `value` (the iteration result).  

```javascript
interface Iterator {
  next() {
     //...
     return {
        value: <value>,
        done: <boolean>
     };
  };
}
```

It seems tough to understand the iteration protocols from verbal description, but the code behind those is quite simple.  

The object or primitive **must** be iterable so that the spread operator to extract data from it.  

Many native primitive types and objects are iterable: strings, arrays, [typed arrays](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray), [sets](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Set) and [maps](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map). They work by default with the spread operator.  

For instance, let's see how a string conforms to iteration protocols:

```javascript
const str = 'hi';
const iterator = str[Symbol.iterator]();
iterator.toString(); // => '[object String Iterator]'
iterator.next();     // => { value: 'h', done: false }
iterator.next();     // => { value: 'i', done: false }
iterator.next();     // => { value: undefined, done: true }
[...str];            // => ['h', 'i']
```

I like the spread operator for its ability to use the object's custom iteration implementation. You can control how the spread operator consumes your object - an effective coding technique.  

The following sample makes an array-like object conformed to iteration protocols, then transforms it to an array using spread operator:

```javascript
function iterator() {
  let index = 0;
  return {
    next: () => ({ // Conform to Iterator protocol
      done : index >= this.length,
      value: this[index++]
    })
  };
}
const arrayLike = {
  0: 'Cat',
  1: 'Bird',
  length: 2
};
// Conform to Iterable Protocol
arrayLike[Symbol.iterator] = iterator;
const array = [...arrayLike];
console.log(array); // => ['Cat', 'Bird']
```

`arrayLike[Symbol.iterator]` creates a property on the object that contains an iteration function `iterator()`, making the object conformed to [iterable protocol](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Iteration_protocols#iterable).  

`iterator()` returns an object (conformed to [iteration protocol](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Iteration_protocols#iterator)) with `next` property as a function that returns the control object `{done: <boolean>, value: <item>}`.  

Since `arrayLike` is now iterable, spread operator is used to extract its elements into an array: `[...arrayLike]`.

### 6. Finale

Three dots operator adds a bunch of great features to JavaScript.  

The rest parameter makes it a lot easier to collect the arguments. It's a reasonable replacement for the hardcoded array-like object `arguments`. If the situation permits to choose between the rest parameter and `arguments`, use the first one.  

`.apply()` method is not convenient for its verbose syntax. The spread operator is a good alternative when invocation arguments should be taken from an array.

The spread operator improves array literals. You can initialize, concatenate and clone arrays a lot simpler.  

You can extract parts of an array using destructuring assignments. In combination with iteration protocols, the spread operator can be used in a more configurable manner.  

I hope from now on the spread operator will appear more often in your code!