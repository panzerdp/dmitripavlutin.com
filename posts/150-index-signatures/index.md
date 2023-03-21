---
title: "Index Signatures in TypeScript"
description: "Index signatures in TypeScript let's you annotate objects of unknown structure."
published: "2021-09-22T18:10Z"
modified: "2023-03-21"
thumbnail: "./images/cover-2.png"
slug: typescript-index-signatures
tags: ['typescript', 'object']
type: post
---

You have 2 objects that describe the salary of 2 software developers:

```twoslash include salary-objects
const salary1 = {
  baseSalary: 100_000,
  yearlyBonus: 20_000
};

const salary2 = {
  contractSalary: 110_000
};
```

```ts twoslash
// @include: salary-objects
```

You want to implement a function that returns the total remuneration based on the salary object:

```ts{0}
function totalSalary(salaryObject: ???) {
  let total = 0;
  for (const name in salaryObject) {
    total += salaryObject[name];
  }
  return total;
}

console.log(totalSalary(salary1)); // => 120_000
console.log(totalSalary(salary2)); // => 110_000
```

How would you annotate `salaryObject` parameter of `totalSalary()` function to accept objects with key as string and value as number?  

The answer is to use an index signature!

Let's find what are TypeScript index signatures and when they're needed.  

<TableOfContents />

## 1. Why index signature

The idea of the index signatures is to type objects of unknown structure when you only know the key and value types.  

An index signature fits the case of the salary parameter: the function should accept salary objects of different structures &mdash; just make sure that object values are numbers.  

Let's annotate the `salaryObject` parameter with an index signature:

```twoslash include total-salary
function totalSalary(salaryObject: { [key: string]: number }) {
  let total = 0;
  for (const name in salaryObject) {
    total += salaryObject[name];
  }
  return total;
}
```


```ts twoslash{1}
// @include: salary-objects
// ---cut---
// @include: total-salary

console.log(totalSalary(salary1)); // => 120_000
console.log(totalSalary(salary2)); // => 110_000
```

`{ [key: string]: number }` is the index signature, which tells TypeScript that `salaryObject` has to be an object with `string` type as key and `number` type as value.  

Now the `totalSalary()` accepts as arguments both `salary1` and `salary2` objects, since they are objects with number values.  

However, the function would not accept an object that has, for example, strings as values:

```ts twoslash
// @errors: 2345
// @include: total-salary
// ---cut---
const salary3 = {
  baseSalary: '100 thousands'
};

totalSalary(salary3);
```

## 2. Index signature syntax

The syntax of an index signature is simple and looks similar to the syntax of a property. But with one difference: write the type of the key inside the square brackets: `{ [key: KeyType]: ValueType }`.  

Here are a few examples of index signatures.

`string` type is the key and value:

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
console.log(value); // => undefined
//           ^?
```

`value` variable is a `string` type according to TypeScript, however, its runtime value is `undefined`.  

The index signature maps a key type to a value type &mdash; that's all. If you don't make that mapping correct, the value type can deviate from the actual runtime data type.  

To make typing more accurate, mark the indexed value as `string` or `undefined`. Doing so, TypeScript becomes aware that the properties you access might not exist:

```ts twoslash{2}
interface StringByString {
  [key: string]: string | undefined;
}

const object: StringByString = {};

const value = object['nonExistingProp'];
console.log(value); // => undefined
//           ^?
```

### 3.2 String and number key

Let's say you have a dictionary of number names:

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

Would it be an error if you access a value by a number `1`?

```ts twoslash
// @include: loose
// ---cut---
const value2 = names[1];
//     ^?
```

Nope, all good!

JavaScript implicitly coerces numbers to strings when used as keys in property accessors (`names[1]` is the same as `names['1']`). TypeScript performs this coercion too.  

You can think that `[key: string]` is the same as `[key: string | number]`.  

## 4. Index signature vs Record

TypeScript has a [utility type](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type) `Record<Keys, Values>` to annotate records, similar to the index signature.  

```ts twoslash
const object1: Record<string, string> = { prop: 'Value' }; // OK
const object2: { [key: string]: string } = { prop: 'Value' }; // OK
```

The big question is... when to use a `Record<Keys, Values>` and when an index signature? At first sight, they look quite similar!

As you saw earlier, the index signature accepts only `string`, `number` or `symbol` as key type. If you try to use, for example, a union of string literal types as keys in an index signature, it would be an error:

```ts twoslash
// @errors: 1337
interface Salary {
  [key: 'yearlySalary' | 'yearlyBonus']: number
}
```

This behavior suggests that *the index signature is meant to be generic in regards to keys.*

But you can use a union of string literals to describe the keys in a `Record<Keys, Values>`:

```ts twoslash
type SpecificSalary = Record<'yearlySalary'|'yearlyBonus', number>
type GenericSalary = Record<string, number>

const salary1: SpecificSalary = { 
  'yearlySalary': 120_000,
  'yearlyBonus': 10_000
}; // OK
```

If you'd like to limit the keys to a union of specific strings, then `Record<'prop1' | 'prop2' | ... | 'propN', Values>` is the way to go instead of an index signature.  

## 5. Conclusion

An index signature annotiation fits well the case when you don't know the exact structure of the object, but you know the key and value types.  

The index signature consists of the index name and its type in square brackets, followed by a colon and the value type: `{ [indexName: Keys]: Values }`. `Keys` can be a `string`, `number`, or `symbol`, while `Values` can be any type.  

To limit the key type to a specific union of strings, then using the `Record<Keys, Values>` utilty type is a better idea. The index signature doesn't support unions of string literal types.  

*Do you prefer index signatures or `Record<Keys, Values>` utility type?*