---
title: "Detailed Overview of Well-known Symbols"
description: "Well-known symbols allow to customize many JavaScript algorithms: elements iteration, instanceof, regexp string methods, derived object and more."
published: "2016-08-03"
modified: "2019-07-05"
thumbnail: "./images/cover.jpg"
slug: detailed-overview-of-well-known-symbols
tags: ["javascript", "symbol", "es2015"]
type: post
---

[Symbol](http://www.ecma-international.org/ecma-262/6.0/#sec-ecmascript-language-types-symbol-type) is a new primitive type available from ECMAScript 2015, which allow to create unique identifiers `let uniqueKey = Symbol('SymbolName')`.  

You may use symbols as keys of properties in objects. A list of symbols that JavaScript treats specially is published as [well-known symbols](http://www.ecma-international.org/ecma-262/6.0/#sec-well-known-symbols).  
Well-known symbols are used by built-in JavaScript algorithms. For example `Symbol.iterator` is utilized to iterate over items in arrays, strings, or even to define your own iterator function.  

These special symbols are important because they are system properties of objects that allow to define custom behavior.  Sounds great, use them to hook into JavaScript!

Being unique, using symbols as keys (instead of string literals) allow easily to add new functionality to objects. You don't have to worry about keys collision (because every symbol is unique), which can be a problem when using string literals.  

This article guides through the list of well-known symbols and explains how to use them comfortable in your code.  

Often for simplicity a well-known `Symbol.<name>` is abbreviated to *@@&lt;name&gt;* format. For example `Symbol.iterator` is *@@iterator* or `Symbol.toPrimitive` is *@@toPrimitive*.  
It's possible to say that an object has an *@@iterator* method. It indicates that the object has a property named `Symbol.iterator` that holds a function:  
`{ [Symbol.iterator]: function(){...} }`.  

<Affiliate type="traversyJavaScript" />

## 1. A short introduction to Symbol

Symbol is a primitive type (like numbers, booleans and strings), unique and immutable.   

To create a symbol, invoke `Symbol` function with an optional name argument: 

```javascript
let mySymbol = Symbol();
let namedSymbol = Symbol('myName');
typeof mySymbol;    // => 'symbol'
typeof namedSymbol; // => 'symbol'
```
`mySymbol` and `namedSymbol` are symbol primitives. `namedSymbol` has an associated name `'myName'`, which is useful for debugging.  

It is important that every time `Symbol()` is invoked, a new and unique symbol is created. Two symbols are unique (or distinct) even if they have the same name:

```javascript
let first = Symbol();
let second = Symbol();
first === second; // => false
let firstNamed = Symbol('Lorem');
let secondNamed = Symbol('Lorem');
firstNamed === secondNamed; // => false
```
`first` and `second` create unique symbols and are different.   
`firstNamed` and `secondNamed` have the same name `'Lorem'`, but are still different.

Symbols can be keys for properties in objects. In object literals or classes declaration, it is necessary to use a [computed property name](/why-object-literals-in-javascript-are-cool/#4-computed-property-names) syntax `[symbol]`:

```javascript
let stringSymbol = Symbol('String');
let myObject = {
  number: 1,
  [stringSymbol]: 'Hello World'
};
myObject[stringSymbol];                 // => 'Hello World'
Object.getOwnPropertyNames(myObject);   // => ['number']
Object.getOwnPropertySymbols(myObject); // => ['Symbol(String)']
```
When defining `myObject` from a literal, a computed syntax is used to set the property key from a symbol `[stringSymbol]`.  
Properties defined with symbols are not accessible using `Object.keys()` or `Object.getOwnPropertyNames()` functions. To access those, call the special function [`Object.getOwnPropertySymbols()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertySymbols).  

Using symbols as keys is an important aspect. Special symbols (or well-known symbols) allow to define custom objects behavior like iteration, object to primitive or string conversion, etc.  

Well-known symbols are available as non-enumerable, non-writable and non-configurable properties of `Symbol` function object. Simply use a property accessor on `Symbol` function object to get them: `Symbol.iterator`, `Symbol.hasInstance`, etc.

You can get the list of well-known symbols this way:

```javascript
Object.getOwnPropertyNames(Symbol);
// => ["hasInstance", "isConcatSpreadable", "iterator", "toPrimitive", 
//     "toStringTag", "unscopables", "match", "replace", "search",    
//     "split", "species", ....];
typeof Symbol.iterator; // => 'symbol'
``` 
`Object.getOwnPropertiesNames(Symbol)` returns the owned properties of `Symbol` function object, including the list of well-known symbols.  
The type of `Symbol.iterator` of course is `'symbol'`.  

## 2. @@iterator to make the object iterable

`Symbol.iterator` is probably the most known symbol. It allows to define how the object should be iterated using `for...of` statement or consumed by `...` spread operator.  

Many built-in types like strings, arrays, maps, sets are iterables, i.e. they have an *@@iterator* method:

```javascript
let myString = 'Hola';
typeof myString[Symbol.iterator]; // => 'function'
for (let char of myString) {
  console.log(char); // logs on each iterator 'H', 'o', 'l', 'a'
}
[...myString]; // => ['H', 'o', 'l', 'a']
``` 
`myString` of primitive type string has a property `Symbol.iterator`. The property holds a method used to iterate over string characters.  

The object that defines a method named `Symbol.iterator` conforms to [iterable protocol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#iterable).  
The method should return an object that conforms to [iterator protocol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#iterator).  The iterator protocol object should have a method `next()` that returns `{value: <iterator_value>, done: <boolean_finished_iterator>}`.  

Let's see how to define a custom iterator. The following example creates an iterable object `myMethods`, which allows to go over the owned methods:

```javascript
function methodsIterator() {
  let index = 0;
  let methods = Object.keys(this).filter((key) => {
    return typeof this[key] === 'function';
  }).map(key => this[key]);
  return {
    next: () => ({ // Conform to Iterator protocol
      done : index >= methods.length,
      value: methods[index++]
    })
  };
}
let myMethods = {
  toString: function() {
    return '[object myMethods]';
  },
  sumNumbers: function(a, b) {
    return a + b;
  },
  numbers: [1, 5, 6],
  [Symbol.iterator]: methodsIterator // Conform to Iterable Protocol
};
for (let method of myMethods) {
  console.log(method); // logs methods `toString` and `sumNumbers`
}
```
`methodsIterator()` is a function that returns an iterator object `{ next: function() {...} }`.  
In `myMethods` object a property is setup with `Symbol.iterator` as key and `methodsIterator` as value.  This makes `myMethods` iterable, and now is possible to pass over object's own methods `toString()` and `sumNumbers()` in a `for...of` loop.  
Additionally you can get these methods by calling `[...myMethods]` or `Array.from(myMethods)`.  

*@@iterator* property accepts also a [generator function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*), which makes it even more valuable. The generator function returns a [generator object](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Generator), which conforms to iterator protocol. 

Let's create a class `Fibonacci` with an *@@iterator* method, which generates a Fibonacci sequence:  

```javascript
class Fibonacci {
  constructor(n) {
    this.n = n;    
  }
  *[Symbol.iterator]() {
    let a = 0, b = 1, index = 0;
    while (index < this.n) {  
      index++;
      let current = a;
      a = b;
      b = current + a;
      yield current;
    }
  }
}
let sequence = new Fibonacci(6);
let numbers = [...sequence];
numbers; // => [0, 1, 1, 2, 3, 5]
```

`*[Symbol.iterator]() {...}` declares a class method that is a generator function. The instances of `Fibonacci` class will conform to iterable protocol.    
Then `sequence` instance is used with the spread operator `[...sequence]`. The spread operator calls *@@iterator* method to create an array from the generated numbers. So the result is an array of first 5 Fibonacci numbers.  

If the primitive type or object have an *@@iterator* method, they can be applied in the following constructs:

* Iterate over the elements in `for...of` loop
* Create an array of elements using spread operator `[...iterableObject]`
* Create an array of elements using `Array.from(iterableObject)` 
* In `yield*` expression [to delegate to another generator](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/yield*#Other_Iterable_objects)
* In constructors for `Map(iterableObject)`, `WeakMap(iterableObject)`, `Set(iterableObject)`, `WeakSet(iterableObject)`
* In promise static methods `Promise.all(iterableObject)`, `Promise.race(iterableObject)`

## 3. @@hasInstance to customize instanceof

By default `obj instanceof Constructor` operator verifies if the prototype chain of `obj` contains `Constructor.prototype` object.  Let's see an example:

```javascript
function Constructor() {
  // constructor code
}
let obj = new Constructor();
let objProto = Object.getPrototypeOf(obj);
objProto === Constructor.prototype; // => true
obj instanceof Constructor;         // => true
obj instanceof Object;              // => true
```  
`obj instanceof Constructor` evaluates to `true` because the prototype of `obj` equals to `Constructor.prototype` (as result of constructor invocation).  
`instanceof` verifies also the prototype chain of `obj`, thus `obj instanceof Object` is `true`.  

Often an application does not deal with prototypes and requires a more specific instance verification.  

Fortunately is possible to define a method *@@hasInstance* on a callable type `Type` to customize `instanceof` evaluation. `obj instanceof Type` is now equivalent to `Type[Symbol.hasInstance](obj)`.  

For example let's verify if an object or primitive is iterable:

```javascript
class Iterable {
  static [Symbol.hasInstance](obj) {
    return typeof obj[Symbol.iterator] === 'function';
  }
}
let array = [1, 5, 5];
let string = 'Welcome';
let number = 15;
array instanceof Iterable;  // => true
string instanceof Iterable; // => true
number instanceof Iterable; // => false
```
`Iterable` is a class that contains *@@hasInstance* static method. This method verifies if the supplied `obj` parameter is iterable, i.e. contains a `Symbol.iterable` property.  
Later `Iterable` is used to verify different types of variables. `array` and `string` are iterables, `number` is not.  

In my opinion, using *@@hasInstance* such way with `instanceof` and constructors is more graceful than simply `isIterable(array)` calls.  
`array instanceof Iterable` clearly suggests that `array` is verified that it conforms to iterable protocol.  

## 4. @@toPrimitive to convert an object to a primitive

Use `Symbol.toPrimitive` to specify a property whose value is a function to transform an object to a primitive. 
*@@toPrimitive* method has one parameter *hint* that takes `"number"`, `"string"` or `"default"` value.  *hint* parameter indicates the suggested type of primitive that should be returned.  

As an example, let's improve an array instance with a *@@toPrimitive* method:

```javascript
function arrayToPrimitive(hint) {
  if (hint === 'number') {
    return this.reduce((sum, num) => sum + num);
  } else if (hint === 'string') {
    return `[${this.join(', ')}]`;
  } else {
    // hint is default
    return this.toString();    
  }
}
let array = [1, 5, 3];
array[Symbol.toPrimitive] = arrayToPrimitive;
// array to number. hint is 'number'
+ array; // => 9
// array to string. hint is 'string'
`array is ${array}`; // => 'array is [1, 5, 3]'
// array to default. hint is 'default'
'array elements: ' + array; // => 'array elements: 1,5,3'
```
`arrayToPrimitive(hint)` is a function that converts the array to a primitive depending on `hint`. The assignment `array[Symbol.toPrimitive] = arrayToPrimitive` makes the array to use the new conversion method.  
Executing `+ array` calls *@@toPrimitive* method with `'number'` hint. `array` is transformed to a number, which is the sum of array elements `9`.  
`array is ${array}` calls *@@toPrimitive* method with a hint `'string'`. The array to primitive conversion is `'[1, 5, 3]'`.  
The final `'array elements: ' + array` uses `'default'` hint for the transformation. In this case `array` evaluates to `'1,5,3'`.  

*@toPrimitive* method is used when an object interacts with a primitive type:

* In equality operator `object == primitive`
* In addition/concatenation operator `object + primitive`
* In subtraction operator `object - primitive`
* Different situations when an object is coerced to a primitive: `String(object)`, `Number(object)`, etc.

## 5. @@toStringTag to create the default description of an object

Use `Symbol.toStringTag` to specify a property whose value is a string that describes object's type tag. *@@toStringTag* method is used by `Object.prototype.toString()`.

The specification of `Object.prototype.toString()` [indicates](http://www.ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring) that many JavaScript types have tags by default:

```javascript
let toString = Object.prototype.toString;
toString.call(undefined); // => '[object Undefined]'
toString.call(null);      // => '[object Null]'
toString.call([1, 4]);    // => '[object Array]'
toString.call('Hello');   // => '[object String]'
toString.call(15);        // => '[object Number]'
toString.call(true);      // => '[object Boolean]'
// etc for Function, Arguments, Error, Date, RegExp
toString.call({});        // => '[object Object]'
```
These types do not have a property `Symbol.toStringTag`, because `Object.prototype.toString()` algorithm evaluates them separately.  

Many other JavaScript types define the *@@toStringTag* property, like symbols, generator functions, maps, promises, and more. Let's take a look:  

```javascript
let toString = Object.prototype.toString;
let noop = function() {};

Symbol.iterator[Symbol.toStringTag];   // => 'Symbol'
(function* () {})[Symbol.toStringTag]; // => 'GeneratorFunction'
new Map()[Symbol.toStringTag];         // => 'Map'
new Promise(noop)[Symbol.toStringTag]; // => 'Promise'

toString.call(Symbol.iterator);   // => '[object Symbol]'
toString.call(function* () {});   // => '[object GeneratorFunction]'
toString.call(new Map());         // => '[object Map]'
toString.call(new Promise(noop)); // => '[object Promise]'
```
As seen in the above sample, many JavaScript types define their own *@@toStringTag* properties.  

In other cases, when an object is not from default tagged types or does not provide *@@toStringTag* property, it is tagged simply as `'Object'`.  
Of course you can define a custom *@@toStringTag* property:

```javascript
let toString = Object.prototype.toString;

class SimpleClass {}
toString.call(new SimpleClass); // => '[object Object]'

class MyTypeClass {
  constructor() {
    this[Symbol.toStringTag] = 'MyType';
  }
}
toString.class(new TagClass); // => '[object MyType]'
```
`new SimpleClass` instance does not have defined *@@toStringTag*. `Object.prototype.toString()` returns for it a default `'[object Object]'`.  
In the constructor of `MyTypeClass`, the instance is configured with a custom tag `'MyType'`. For such a class instance `Object.prototype.toString()` returns the custom type description `'[object MyType]'`.

Notice that *@@toStringTag* exists more in terms of backward compatibility. Its usage is not encouraged. You probably should use other ways to determine the object type, e.g. `instanceof` (including with *@@hasInstance* symbol) or `typeof`.  

## 6. @@species to create derived objects

Use `Symbol.species` to specify a property whose value is a constructor function used to create derived objects.  

Many JavaScript constructors have the value of *@@species* equal to the constructor itself:  

```javascript
Array[Symbol.species] === Array;   // => true
Map[Symbol.species] === Map;       // => true
RegExp[Symbol.species] === RegExp; // => true
```

First, note that a *derived object* is one created after a specific operation on an original object. For example calling `.map()` method on original array returns a derived object: the mapping result array.  

Usually derived objects have the same constructor as the original object, which is expected. But sometimes is necessary to indicate a custom constructor (maybe one from the base class): this is where `@@species` property can help.  

Suppose a scenario when you extend `Array` constructor to a child class `MyArray`, in order to add useful methods. When later `MyArray` class instance is used with `.map()` method, you will need an instance of `Array`, but not the child one `MyArray`.  
To do so, define an accessor property *@@species* and indicate the derived object constructor: `Array`. Let's try an example:  

```javascript
class MyArray extends Array {
  isEmpty() {
    return this.length === 0;
  }
  static get [Symbol.species]() {
    return Array;
  }
}
let array = new MyArray(3, 5, 4);
array.isEmpty(); // => false
let odds = array.filter(item => item % 2 === 1);
odds instanceof Array;   // => true
odds instanceof MyArray; // => false
```

In `MyArray` a static accessor property is defined `static get [Symbol.species]() {}`. It indicates that derived objects should have an `Array` constructor.  
Later when filtering the array elements, `array.filter()` method returns an `Array`.  
If *@@species* property is not customized, `array.filter()` returns an `MyArray` instance.  

*@@species* accessor property is used with `Array` and `TypedArray` methods like `.map()`, `.concat()`, `.slice()`, `.splice()` that return derived objects.  
It is useful for extending maps, regular expression objects, promises, and still keep the original constructor.  

## 7. Create regular expression like objects: @@match, @@replace, @@search and @@split

JavaScript's string prototype has 4 methods that accept regular expression objects:

* `String.prototype.match(regExp)`
* `String.prototype.replace(regExp, newSubstr)`
* `String.prototype.search(regExp)`
* `String.prototype.split(regExp, limit)`

ECMAScript 2015 allows these 4 methods to accept types other than `RegExp`, with the condition to define the corresponding function valued properties *@@match*, *@@replace*, *@@search* and *@@split*.  

Interestingly that `RegExp` prototype defines these methods using symbols too:

```javascript
typeof RegExp.prototype[Symbol.match];   // => 'function'
typeof RegExp.prototype[Symbol.replace]; // => 'function'
typeof RegExp.prototype[Symbol.search];  // => 'function'
typeof RegExp.prototype[Symbol.split];   // => 'function'
```

Now let's create a custom pattern class. The following example defines a simplified class that can be used instead of `RegExp`:

```javascript
class Expression {
  constructor(pattern) {
    this.pattern = pattern;
  }
  [Symbol.match](str) {
    return str.includes(this.pattern);
  }
  [Symbol.replace](str, replace) {
    return str.split(this.pattern).join(replace);
  }
  [Symbol.search](str) {
  	return str.indexOf(this.pattern);
  }
  [Symbol.split](str) {
  	return str.split(this.pattern);
  }
}
let sunExp = new Expression('sun');
'sunny day'.match(sunExp);            // => true
'rainy day'.match(sunExp);            // => false
'sunny day'.replace(sunExp, 'rainy'); // => 'rainy day'
"It's sunny".search(sunExp);          // => 5
"daysunnight".split(sunExp);          // => ['day', 'night']
```
`Expression` class defines the methods *@@match*, *@@replace*, *@@search* and *@@split*.  
`sunExp` instance later is used in the corresponding string methods, roughly simulating a regular expression.  

## 8. @@isConcatSpreadable to flat an object to array elements

`Symbol.isConcatSpreadable` is a boolean valued property that indicates if an object should be flattened to its array elements by `Array.prototype.concat()` method.  

By default `.concat()` method spreads the array to its elements when used for concatenation:  

```javascript
let letters = ['a', 'b'];
let otherLetters = ['c', 'd'];
otherLetters.concat('e', letters); // => ['c', 'd', 'e', 'a', 'b']
```
To concatenate two array, `letters` is applied as an argument to `.concat()` method. The elements of `letters` are spread in the concatenation result `['c', 'd', 'e', 'a', 'b']`.

To avoid the spread and keep the whole array as an element in the concatenation, set *@@isConcatSpreadable* to `false`:

```javascript
let letters = ['a', 'b'];
letters[Symbol.isConcatSpreadable] = false;
let otherLetters = ['c', 'd'];
otherLetters.concat('e', letters); // => ['c', 'd', 'e', ['a', 'b']]
```
Assigning `false` to *@@isConcatSpreadable* property of `letters` array keeps it intact in the concatenation result `['c', 'd', 'e', ['a', 'b']]`.

Contrary to an array, by default `.concat()` method *does not spread* the array-like objects ([see here why, step 5](http://www.ecma-international.org/ecma-262/6.0/#sec-isconcatspreadable)).  
This behavior can be configured also by altering *@@isConcatSpreadable* property:

```javascript
let letters = {0: 'a', 1: 'b', length: 2};
let otherLetters = ['c', 'd'];
otherLetters.concat('e', letters); 
// => ['c', 'd', 'e', {0: 'a', 1: 'b', length: 2}]
letters[Symbol.isConcatSpreadable] = true;
otherLetters.concat('e', letters); // => ['c', 'd', 'e', 'a', 'b']
```
On first `.concat()` call the array-like object `letters` remains unmodified in the concatenation result array. This is the default for array-like objects.  
Then *@@isConcatSpreadable* property is set to `true` for `letters`. So the concatenation spreads the array-like object to its elements.   

## 9. @@unscopables for properties accessibility within with

`Symbol.unscopables` is an object valued property whose own property names are property names that are excluded from the `with` environment bindings of the associated object.  
*@@unscopables* property value has this format: `{ propertyName: <boolean_exclude_binding> }`.  

ES2015 defines by default *@@unscopables* for arrays only. The meaning is to hide the new methods that may override variables with the same name in older JavaScript code: 

```javascript
Array.prototype[Symbol.unscopables];  
// => { copyWithin: true, entries: true, fill: true, 
//      find: true, findIndex: true, keys: true }
let numbers = [3, 5, 6];  
with (numbers) {  
  concat(8); // => [3, 5, 6, 8]
  entries;   // => ReferenceError: entries is not defined
}
```
`.concat()` method can be accessed in `with` body, since it is not mentioned in `@@unscopables` property value.  
The method `.entries()` is listed in the *@@unscopables* property with `true`, thus is not available within `with`.

*@@unscopables* exists mostly for backward compatibility with older JavaScript code that utilizes `with` (which usage is deprecated and even not allowed in strict mode). 

## 10. Final thoughts

Well-know symbols are powerful properties that allow to hack into JavaScript internal algorithms. Their uniqueness is good for extensibility: object properties are not polluted. 

*@@iterable* is an useful property to configure how JavaScript iterates object elements. It is used by `for...of`, `Array.from()`, spread operator `...` and more.  

Use *@@hasInstance* for a straightforward type verification. For me, `obj instanceof Iterable` looks better than `isIterable(obj)`.  

*@@toStringTag* and *@@unscopables* well-known symbols exists for backward compatibility with *ancient* JavaScript code. Their utilization is not recommended.  

Feeling inspired? I suggest you to take a few hours and analyze your current JavaScript project. I'm sure you can improve it with well-known symbols!  
*Feel free to write a comment below about your experience on that!*  