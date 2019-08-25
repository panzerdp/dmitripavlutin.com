---
title: "Power Up the Array Creation in JavaScript"
description: "ES6 improves the way arrays are created in JavaScript. See how the combination of array literal, spread operator and iterators upgrade array initialization."
published: "2016-06-28"
modified: "2019-07-05"
thumbnail: "./images/cover.jpg"
slug: power-up-the-array-creation-in-javascript
tags: ["javascript", "array"]
recommended: ["the-magic-behind-array-length-property", "how-three-dots-changed-javascript"]
type: post
---

The array is an ordered collection of objects or primitive types. It's hard to imagine an application that doesn't use this data structure.  
Working with arrays consists in the following phases:

1. Initialize the array and setup the initial elements
* Access the array elements by index
* Add new elements
* Remove existing elements

The current article covers the array initialization and setting the initial elements. The basic way to do this in JavaScript is using an array literal, e.g. `[1, 5, 8]`  or an array constructor `new Array (1, 5, 8)`. 

Fortunately JavaScript offers more interesting and straightforward ways to create arays, not limited to manual enumeration. Let's illustrate the common and advanced scenarios how to initialize arrays in JavaScript.
 
## 1. Array literal

An array literal syntax is created from a list of comma separated elements `element1, element2, ..., elementN` included in a pair of square brackets `[` `]`.  
Let's see some examples of array literals:

```javascript
let numbers = [1, 5, 7, 8];
let planets = ['Earth', 'Mercury', 'Jupiter'];
```

An array literal can contain elements of any type, including `null` and `undefined`, primitives and objects:

```javascript
let mixed = [1, 'Earth', null, NaN, undefined, ['Mars']];
```

### 1.1 Commas in array literal

The comma character *`,`* is used to separate the elements enumerated in the array literal. Depending on the comma position or the missing element between commas, arrays with different structure are created.  

Let's see in details the three existing situations.

#### First case: usual array literal
The usual case is when between **any pair of commas is specified one element** and the array literal **does not start or end with a comma**. This is the recommended commas composition to manually initialize arrays:  

```javascript
let items = ['first', 'second', 'third'];
items; // => ['first', 'second', 'third']
```
`items` is created from 3 elements that are separated with 2 commas.  
In this code sample `items` is a **dense** array, because its elements have contiguous indexes (or simply the array does not have holes).  

Most of the time you will initialize array using this form.

#### Second case: a noop comma at the end
The second case is similar to first one, only that **after the last comma no element is specified**. In this case the last comma is ignored by JavaScript:

```javascript
let items = ['first', 'second', 'third', ];
items; // => ['first', 'second', 'third']
```

After the element `'third'` a comma is specified, which is the last one in the literal and does not have any element after. The last comma is a noop, meaning that it has no impact over the created array. 

For this case JavaScript creates a **dense** array too.

#### Third case: no element between commas
The third case happens when between a **pair of commas no element is specified** or the array literal **starts with a comma**.  
Such configuration creates a **sparse** array: a collection whose elements don't have contiguous indexes (in other words the array has holes).  

The following array literal starts with a comma and creates a sparse array:

```javascript
let items = [, 'first', 'second', 'third'];
items;        // => [<1 empty slot>, 'first', 'second', 'third']
items[0];     // => undefined
items[1];     // => 'first'
items.length; // => 4
```
The array literal `[, ...]` is starting with a comma. As result `items` is a sparse array with an empty slot at index `0`. Accessing an empty slot `items[0]` evaluates to `undefined`.  

It is important to **distinguish** an empty slot element from an element that has `undefined` value. When accessing these elements by index both return `undefined`, which makes the distinction tricky.  
The empty slot means that the array has no element at an index (`index in array` returns `false`), contrary to an existing element that contains `undefined` (`index in array` returns `true`).

Notice that `<1 empty slot>` is displayed in Firefox console, which is a correct way to represent empty slots. Chrome console displays `undefined x 1`. In other consoles you might see a simple `undefined`.

When the array literal has commas with no element between, a sparse array is created too:

```javascript
let items = ['first', , 'second', 'third'];
items;        // => ['first', <1 empty slot> ,'second', 'third']
items[0];     // => 'first'
items[1];     // => undefined
items.length; // => 4
```
The array literal contains commas with no element in between: `[... , , ...]`. This way `items` is a sparse array with an empty slot at index `1`. Accessing an empty slot `items[1]` evaluates to `undefined`.  

Using this configuration of the array literal, which creates sparse arrays, generally should be avoided.  Also you might want not to deal at all with sparse arrays, if possible.

You can *accidentally* fall into this case when deleting or adding elements in a normal array literal (see the first case above). So double check the commas after modification.

### 1.2 Improved by spread operator

The [spread operator](/how-three-dots-changed-javascript/) from ECMAScript 6 improves how an array can be initialized from other arrays.  
There are many uses cases how three dots makes the array creation easier. The idea is to prefix with `...` the source array in the literal, then the elements from the source are included in the created array. Pretty straightforward. 

The following array literal is using the spread operator:

```javascript
let source = ['second', 'third'];
let items = ['first', ...source];
items; // => ['first', 'second', 'third']
```
The array literal `['First', ...source]` indicates that `'First'` is the first element. The rest of elements are taken from `source` array using the spread operator.  

It's nice that regular elements enumeration and arrays with spread operators can be combined without limitation:

```javascript
let odds = [1, 3, 5];
let evens = [4, 6];
let zero = 0;
let negative = -1;
let items = [...odds, zero, ...evens, negative];
items; // => [1, 3, 5, 0, 4, 6, -1]
```
`items` is created by an array literal that has a combination of regular elements `zero` and `negative`, and source arrays prefixed with the spread operator `...odds` and `...evens`.

Because the spread operator generally accepts [iterable objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols) (an array is iterable by default), it is possible to create custom initialization. 
A [generator function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*) returns a [ generator object](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Generator) that is iterable too, so you can use the generators flexibility to create arrays.

Let's create a generator function that accepts first argument as the elements value and the second argument as the number of elements. Then use it with spread operator and array literal to instantiate a new array:

```javascript
function* elements(element, length) {
  let index = 0;
  while (length > index++) {
    yield element;
  }
}
[...elements(0, 5)];    // => [0, 0, 0, 0, 0]
[...elements('hi', 2)]; // => ['hi', 'hi']
```
Each time `elements(element, length)` is called, a generator object is created. This generator object is used by the spread operator to initialize the array with elements.  
`[...elements(0, 5)]` is creating an array with five zeros. Respectively `[...elements('hi', 2)]` creates an array of two `'hi'` strings.  


## 2. Array constructor

The array in JavaScript is an object. As any object, it has a constructor function  `Array` that allows creating new instances. Let's see this in a sample:

```javascript
// From constructor invocation
let arrayConstr = new Array(1, 5);  
arrayConstr;                        // => [1, 5]
typeof arrayConstr;                 // => 'object'
arrayConstr.constructor === Array;  // => true
// From array literal
let arrayLiteral = [1, 5];
arrayLiteral;                       // => [1, 5]
typeof arrayLiteral;                // => 'object'
arrayLiteral.constructor === Array; // => true
```

`arrayConstr` and `arrayLiteral` are array instances whose constructor is `Array`. `arrayConstr` object is created using a constructor invocation: `new Array(1, 5)`.

Notice that you can call `Array` as a regular function (without `new` operator) to create array instances: `Array(1, 5)`.

You should broadly favor the literal `[item1, item2, ..., itemN]` over the constructor `new Array(item1, item2, ..., itemN)` to create arrays. Mainly because the array literal is shorter and simpler. But also the array constructor has a strange behavior depending on the type of the first argument. 
Let's see how `Array` creates array instances depending on the first argument type and the number of arguments.

### 2.1 Numeric argument creates sparse array

When the array constructor `new Array(numberArg)` is invoked  with a single argument of type number, JavaScript creates a sparse array containing only empty slots with the length equal to `numberArg`.
Let's take a look:

```javascript
let items = new Array(3);
items;        // => [<3 empty slots>]
items.length; // => 3
```
`new Array(3)` is a constructor invocation with a single argument `3`. A sparse array `items` is created with length `3`, but actually without elements and just empty slots.  

By itself this way to create arrays has little value. However it can be useful in combination with static methods as a way to initialize an array with specific length, which is filled with generated elements (see the chapter below [2.3](#23usefulstaticmethods)).

### 2.2 Enumerating elements

If `Array` constructor is invoked with a list of arguments other than a single number, then these arguments become the array elements.  
This approach works almost like the array literal, just in a constructor call.

The following example is creating an array:

```javascript
let items = new Array('first', 'second', 'third');
items; // => ['first', 'second', 'third']
```

`new Array('first', 'second', 'third')` is creating a new array with the elements taken from arguments list.

Due to flexibility of the spread operator, is possible to indicate on constructor call to use elements from another array:

```javascript
let source = new Array('second', 'third');
let items = new Array('first', ...source);
items; // => ['first', 'second', 'third']
```
`new Array('First', ...source)` is creating an array with `'First'` element and all the elements from `source` array.

Either way, you should prefer the array literals over the array constructors as a more straightforward solution.  

### 2.3 Useful static methods

When reading [2.1](#21numericargumentcreatessparsearray) about creating the sparse arrays by indicating a number in a constructor you might wonder what practical use cases it produces?

ECMAScript 6 added useful methods like [`Array.prototype.fill()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/fill) and [`Array.from()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from). Both functions can be used to fill the empty slots of a sparse array.  

Let's use `fill()` method to initialize an array with 5 zeros:

```javascript
let zeros = new Array(5).fill(0);
zeros; // => [0, 0, 0, 0, 0]
```
`new Array(5)` is creating a sparse array with 5 empty slots. Then `fill(0)` method fills the empty slots with `0`.

The static method `Array.from()` has a wider range of possibilities. Like the example above, let's fill an array with 5 zeros:

```javascript
let zeros = Array.from(new Array(5), () => 0);
zeros; // => [0, 0, 0, 0, 0]
```
A sparse array with length `5` created using `new Array(5)` is passed as an argument to `Array.from()`. The second argument is used as a map function that returns `0`.  
`5` iterations (the array length) are made and the arrow function invocation result on each step is used as the array element value.

Because the map function is called on every iteration, it is possible to create the array elements dynamically. Let's create an array with items from `1` up to `5`:

```javascript
let items = Array.from(new Array(5), (item, index) => index + 1);
items; // => [1, 2, 3, 4, 5]
```
The map function is called with 2 arguments: current `item` and iteration `index`. The index parameter is used to generate numbers by increment: `index + 1`.

`Array.from()` accepts as the first argument an [iterable object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols), making it even more valuable.  
Let's use a [generator object](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Generator) (which is an iterable) to create a list of incremented numbers (like the example above): 

```javascript
function* generate(max) {
  let count = 0;
  while (max > count++) {
    yield count;
  }
}
let items = Array.from(generate(5));
items;       // => [1, 2, 3, 4, 5]
let itemsSpread = [...generate(5)];
itemsSpread; // => [1, 2, 3, 4, 5]
```
`generate(max)` is a generator function that creates numbers from `1` to `max` parameter.  
`Array.from(generate(5))` accepts a generator object and creates numbers from `1` to `5` that are added to the array.  
Using the spread operator `[...generate(5)]` and the array literal achieves the same array with incremented numbers.

## 3. Conclusion

Array initialization is an usual task when dealing with collections. JavaScript allows a decent number of ways and flexibility to achieve that.

The array constructor has a number of situations when its behavior may be surprising. So the array literal is a better and simpler solution to initialize array instances.

When an array should be initialized with calculated on each iteration elements, `Array.from()` is a nice solution.  
If an array should be loaded with the same value, use `Array.prototype.fill()` in combination with `new Array(length)`.

Do not underestimate the power of iterable objects and generator functions, which can be combined with the spread operator in an array literal or used directly in `Array.from()` static method. 