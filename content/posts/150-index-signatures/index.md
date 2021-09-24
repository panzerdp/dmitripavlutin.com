---
title: "Index Signatures in TypeScript"
description: "Index signatures in TypeScript let's you annotate objects of unknown structure."
published: "2021-09-22T18:10Z"
modified: "2021-09-22T18:10Z"
thumbnail: "./images/cover-2.png"
slug: typescript-index-signatures
tags: ['typescript', 'object']
recommended: ['typescript-unknown-vs-any', 'how-to-iterate-easily-over-object-properties-in-javascript']
type: post
---

You have 2 objects that describe the salary of 2 software developers:

```twoslash include salary
// @errors: 7053
const salary1 = {
  baseSalary: 100_000,
  yearlyBonus: 20_000
};

const salary2 = {
  contractSalary: 110_000
};
// - 1
```

```ts twoslash
// @include: salary-1
```

You want to implement a function that returns the total salary using the salary object:

```ts{0}
function totalSalary(salaryObject: ???) {
  let total = 0;
  for (const name in salaryObject) {
    total += salaryObject[name];
  }
  return total;
}

totalSalary(salary1); // => 120_000
totalSalary(salary2); // => 110_000
```

How would you annotate the `salaryObject` parameter of the `totalSalary()` function to accept objects with string keys and number values?  

The answer is to use an index signature!

Let's find what are TypeScript index signatures and when they're needed.  

```toc
```

## 1. Why index signature

The idea of the index signatures is to type objects of unknown structure when the only thing you know is the key and value types.  

It fits exactly the case of the salary parameter since the function should accept salary objects of different structures, with the only requirement
is property values to be numbers.  

Let's annotate the `salaryObject` parameter with an index signature:

```ts twoslash{1}
// @include: salary-1
// ---cut---
function totalSalary(salaryObject: { [key: string]: number }) {
  let total = 0;
  for (const name in salaryObject) {
    total += salaryObject[name];
  }
  return total;
}

totalSalary(salary1); // => 120_000
totalSalary(salary2); // => 110_000
```

`{ [key: string]: number }` is the index signature, which tells TypeScript that `salaryObject` has to be an object with `string` type as key and `number` type as value.  

## 2. Index signature syntax

The syntax of an index signature is pretty simple and looks similar to the syntax of a property, but with one difference. Instead of the property name, you simply write the type of the key
inside the square brackets: `{ [key: KeyType]: ValueType }`.  

Here are a few examples of index signatures.

The `string` type is the key and value:

```ts twoslash
interface StringByString {
  [key: string]: string;
}

const heroesInBooks: StringByString = {
  'Gunslinger': 'The Dark Tower',
  'Jack Torrance': 'The Shining'
};
```

The `string` type is the key, the value can be a `string`, `number`, or `boolean`:

```ts twoslash
interface Options {
  [key: string]: string | number | boolean;
  timeout: number;
}

const options: Options = {
  timeout: 1000,
  timeoutMessage: 'The request timed out!',
  isFileUpload: false
};
```

`Options` interface also has a field `timeout`, which works fine near the index signature.  

The key of the index signature can only be a `string`, `number`, or `symbol`. Other types are not allowed:

```ts twoslash
// @errors: 1268
interface OopsDictionary {
  [key: boolean]: string;
}
```

## 3. Index signature caveats

The index signatures in TypeScript have a few caveats you should be aware of.  

### 3.1 Non-existing properties

What would happen if you try to access a non-existing property of an object whose index signature is `{ [key: string]: string }`?  

As expected, TypeScript infers the type of the value to `string`. But if you check the runtime value &mdash; it's `undefined`:

```ts twoslash
interface StringByString {
  [key: string]: string;
}

const object: StringByString = {};

const value = object['nonExistingProp'];
value; // => undefined
// ^?
```

`value` variable is a `string` type according to TypeScript, however, its runtime value is `undefined`.  

The index signature simply maps a key type to a value type, and that's all. If you don't make that mapping correct, the value type can deviate from the actual runtime data type.  

To make typing more accurate, mark the indexed value as `string` or `undefined`. Doing so, TypeScript is going to be aware that the properties you access might not exist:

```ts twoslash{2}
interface StringByString {
  [key: string]: string | undefined;
}

const object: StringByString = {};

const value = object['nonExistingProp'];
value; // => undefined
// ^?
```

### 3.2 String and number key

Let's say that you have a dictionary of number names:

```twoslash include loose
interface NumbersNames {
  [key: string]: string
}

const names: NumbersNames = {
  '1': 'one',
  '2': 'two',
  '3': 'three',
  // etc...
};
```

```ts twoslash
// @include: loose
```

Accessing a value by a string key works as expected:

```ts twoslash
// @include: loose
// ---cut---
const value1 = names['1'];
//     ^?
```

Would it be an error if you try to access a value by a number `1`?

```ts twoslash
// @include: loose
// ---cut---
const value2 = names[1];
//     ^?
```

Nope, all good!

JavaScript implicitly coerces numbers to strings when used as keys in property accessors (`names[1]` is the same as `names['1']`). TypeScript performs this coercion too.  

You can think that `[key: string]` is the same as `[key: string | number]`.  

## 4. Index signature vs Record<Keys, Type>

TypeScript has a [utility type](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeystype) `Record<Keys, Type>` to annotate records, similar to the index signature.  

```ts twoslash
const object1: Record<string, string> = { prop: 'Value' }; // OK
const object2: { [key: string]: string } = { prop: 'Value' }; // OK
```

The big question is... when to use a `Record<Keys, Type>` and when an index signature? At first sight, they look quite similar!

As you saw earlier, the index signature accepts only `string`, `number` or `symbol` as key type. If you try to use, for example, a union of string literal types as keys in an index signature, it would be an error:

```ts twoslash
// @errors: 1337
interface Salary {
  [key: 'yearlySalary' | 'yearlyBonus']: number
}
```

*The index signature is meant to be generic in regards to keys.*

But you can use a union of string literals to describe the keys in a `Record<Keys, Type>`:

```ts twoslash
type Salary = Record<'yearlySalary'|'yearlyBonus', number>

const salary1: Salary = { 
  'yearlySalary': 120_000,
  'yearlyBonus': 10_000
}; // OK
```

*The `Record<Keys, Type>` is meant to be *specific* in regards to keys.*

I recommend using the index signature to annotate generic objects, e.g. keys are `string` type. But use `Record<Keys, Type>` to annotate specific objects when you know the keys in advance, e.g. a union of string literals `'prop1' | 'prop2'`  is used for keys.  

## 5. Conclusion

If you don't know the object structure you're going to work with, but you know the possible key and value types, then the index signature is what you need.  

The index signature consists of the index name and its type in square brackets, followed by a colon and the value type: `{ [indexName: KeyType]: ValueType }`. `KeyType` can be a `string`, `number`, or `symbol`, while `ValueType` can be any type.  

*Challenge: Write a generic type `Indexed<K, V>` that creates an index signature where `K` is the key type and `V` is the value type. Share your solution in a comment below!* 