---
title: When to Use Map instead of Plain JavaScript Object
description: Map complements plain objects, allowing keys of any type and not having collisions with prototype object keys.
published: '2019-10-09T13:00Z'
modified: '2019-10-18T15:00Z'
thumbnail: './images/named.jpg'
slug: maps-vs-plain-objects-javascript
tags: ['javascript', 'map', 'object']
recommended: ['why-object-literals-in-javascript-are-cool', 'how-to-iterate-easily-over-object-properties-in-javascript']
type: post
commentsThreadId: use-map-instead-of-object-javascript
---

The plain JavaScript object `{ key: 'value' }` holds structured data. Mostly it does this job well enough.  

But the plain object has a limitation: its keys have to be strings (or rarely used symbols). What happens if you use numbers as keys? Let's try an example:
```javascript
const names = {
  1: 'One',
  2: 'Two',
};

Object.keys(names); // => ['1', '2']
```

The numbers `1` and `2` are keys in `names` object. Later, when the object's keys are accessed,  turns out the numbers were converted to strings.  

JavaScript implicitly converts plain object's keys to strings. That's tricky because you lose the consistency of the types (what you put is what exactly you'll extract later).  

A lot of plain object's issues (including keys to string conversion, impossibility to use objects as keys) are solved by [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) object. This post describes the use cases when it's better to use maps instead of plain objects.  

## 1. The map accepts any key type

As presented above, if the object's key is not a string or symbol, JavaScript implicitly transforms it into a string.

Contrary, the map accepts keys of any type: strings, numbers, boolean, symbols. Moreover the map preserves the type of the key, avoiding any implicit conversion of types. That's the main benefit of a map over a plain JavaScript object.  

For example, if you use a number as a key inside a map, it will remain a number:

```javascript{6}
const numbersMap = new Map();

numbersMap.set(1, 'one');
numbersMap.set(2, 'two');

[...numbersMap.keys()]; // => [1, 2]
```

`1` and `2` are keys in `numbersMap`. The type of these keys, *number*, remains the same. 

Continuing, you can use booleans as keys inside a map:

```javascript{6}
const booleansMap = new Map();

booleansMap.set(true, "Yep");
booleansMap.set(false, "Nope");

[...booleansMap.keys()]; // => [true, false]
```

`booleansMap` uses booleans `true` and `false` as keys. 

Inside a plain object using booleans as keys is impossible. These keys would be transformed into strings: `'true'` or `'false'`.

Let's push the boundaries: can you use an entire object as a key in a map? Turns out, you can. Just be aware of memory leaks.  

## 1.1 Object as key

Let's say you need to store some object-related data, without attaching this data on the object itself. 

Doing so using plain objects is not possible. But there's a workaround using an array of object-value tuples:

```javascript
const foo = { name: 'foo' };
const bar = { name: 'bar' };

const kindOfMap = [
  [foo, 'Foo related data'],
  [bar, 'Bar related data'],
];
```

`kindOfMap` is an array holding pairs of an object and associated value. 

The biggest issue with this approach is the O(n) complexity to get the value by key. You have to loop through the entire array to get the desired value:

```javascript 
function getByKey(kindOfMap, key) {
  for (const [k, v] of kindOfMap) {
    if (key === k) {
      return v;
    }
  }
  return undefined;
}

getByKey(kindOfMap, foo); // => 'Foo related data'
```

You don't need all this headache with [WeakMap](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap) (a specialized version of `Map`): it accepts objects as keys. 

The main difference between `Map` and `WeakMap`is that the latter allows garbage collection of the objects that are keys. This prevents memory leaks.  

The above code refactored to use `WeakMap` becomes trivial:

```javascript{9}
const foo = { name: 'foo' };
const bar = { name: 'bar' };

const mapOfObjects = new WeakMap();

mapOfObjects.set(foo, 'Foo related data');
mapOfObjects.set(bar, 'Bar related data');

mapOfObjects.get(foo); // => 'Foo related data'
```

`WeakMap`, contrary to `Map`, accepts only objects as keys and has a [reduced set of methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap#Methods).

## 2. The map has no restriction over keys names

Any object in JavaScript inherits the properties from its prototype object. The same happens to plain JavaScript objects.

The accidentally overwritten property inherited from the prototype is dangerous. Let's study such a scenario.

First, let's ovewrite the `toString()` property in an object `actor`:

```javascript{3}
const actor = {
  name: 'Harrison Ford',
  toString: 'Actor: Harrison Ford'
};
```

Then, let's define a function `isPlainObject()` that determines if the supplied argument is a plain object. This function uses the method `toString()`:

```javascript{11}
function isPlainObject(value) {
  return value.toString() === '[object Object]';
}
```

Finally, because `actor` has a string inside `toString` property, calling `isPlainObject(actor)` generates an error:

```javascript
// Does not work!
isPlainObject(actor); // TypeError: value.toString is not a function
```

When the application input [generates keys on objects](#21-real-world-example), you have to use maps instead of plain objects to avoid the problem described above.

The map doesn't have any restriction on the keys names. You can use keys names as `toString`, `constructor`, etc. without consequences:

```javascript{11}
function isMap(value) {
  return value.toString() === '[object Map]';
}

const actorMap = new Map();

actorMap.set('name', 'Harrison Ford');
actorMap.set('toString', 'Actor: Harrison Ford');

// Works!
isMap(actorMap); // => true
```

Regardless of `actorMap` having a property named `toString`, the method `toString()` works correctly.  

### 2.1 Real world example

What could be the situation when the user input creates keys on objects?

Imagine a User Interface that manages some custom fields. The user can add a custom field by indicating the name and value:

![Custom fields User Interface](./images/custom-fields-2.png)

It would be convenient to store the state of the custom fields into a plain object:

```javascript{4}
const userCustomFields = {
  'color':    'blue',
  'size':     'medium',
  'toString': 'A blue box'
};
```

The user can choose a custom field name like `toString` (as in the example), `constructor`, etc. that could potentially break the code that later uses this object. 

*Don't take user input to create keys on your plain objects!*  

It's more reasonable to bind the user interface state to a map:

```javascript
const userCustomFieldsMap = new Map([
  ['color', 'blue'],
  ['size', 'medium'],
  ['toString', 'A blue box']
]);
```

There is no way to break the map, even using keys as `toString`, `constructor`, etc.

## 3. The map is iterable

In order to iterate over the plain object's properties, you have to use additional helper static functions like `Object.keys()` or `Object.entries()` (available in ES2017):

```javascript
const colorsHex = {
  'white': '#FFFFFF',
  'black': '#000000'
};

for (const [color, hex] of Object.entries(colorsHex)) {
  console.log(color, hex);
}
// 'white' '#FFFFFF'
// 'black' '#000000'
```

`Object.entries(colorsHex)` returns an array of key-value pairs extracted from the object.

A map, however, is an iterable by itself:

```javascript
const colorsHexMap = new Map();

colorsHexMap.set('white', '#FFFFFF');
colorsHexMap.set('black', '#000000');

for (const [color, hex] of colorsHexMap) {
  console.log(color, hex);
}
// 'white' '#FFFFFF'
// 'black' '#000000'
```

`colorsHexMap` is iterable. You can use it anywhere an iterable is accepted: `for()` loops, spread operator `[...map]`.  

The map provides additional methods that return an iterable: `map.keys()` to iterate over keys and `map.values()` over values.  

## 4. Map's size

Another issue with the plain object is that you cannot easily determine the number of properties that it holds:

```javascript
const exams = {
  'John Smith': '10 points',
  'Jane Doe': '8 points',
};

Object.keys(exams).length; // => 2
```

To determine the size of `exams`, you would have to pass through all the keys to determine the number of them.

The map provides an alternative with the accessor property `size` counting the key-value pairs:

```javascript
const examsMap = new Map([
  ['John Smith', '10 points'],
  ['Jane Doe', '8 points'],
]);
  
examsMap.size; // => 2
```

It's simpler to determine the size of the map: `examsMap.size`.  

## 5. Conclusion

Plain JavaScript objects normally do a good job to hold structured data. But they have some limitations:

1) Only strings or symbols can be used as keys
* Own object properties might collide with property keys inherited from the prototype (e.g. `toString`, `constructor`, etc). 
* Objects cannot be used as keys

All these issues are easily solved by maps. Moreover, they provide benefits like being iterators and easy size look-up.  

Don't consider maps as a replacement of plain objects, but rather a complement.  

*Do you know other benefits of maps over plain objects? Please write a comment below!*
