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

When making my first steps in TypeScript, I was surprised that the following code triggers a type error:

```twoslash include with-error
// @errors: 7053
const dictionary = {
  'one': 1,
  'two': 2,
  'three': 3
};

for (const name in dictionary) {
  const myNumber = dictionary[name];
}
// - 1
```

```ts twoslash
// @include: with-error-1
```

What I want is to loop through the `dictionary` properties and get their values. TypeScript, however, triggers a type error on the expression `dictionary[name]`, requiring an index signature on the type of `dictionary`.  

That's when I met index signatures. 

Let's find what are TypeScript index signatures and when they're needed.  

```toc
```

## 1. Why index signature

Let's continue exploring the type error from the previous code sample. Why TypeScript doesn't like `dictionary[name]`?  

First, let's see what type is the `dictionary` variable &mdash; an object type with fixed property names:

```ts twoslash
// @include: with-error
// ---cut---
dictionary;
// ^?
```

Second, let's see what `name` variable is? It's a `string` type.  

Here's the problem: since the dictionary has a predefined set of properties, `dictionary[name]` tries to read a property that may not exist on `dictionary`, because `name` can be any `string` value. That's what TypeScript is complaining about.  

How to access properties using a key of `string` type?  

That's where the index signature can help. Let's annotate the `dictionary` variable with an index signature:

```twoslash include fixed
interface NumberByName {
  [name: string]: number
}

const dictionary: NumberByName = {
  'one': 1,
  'two': 2,
  'three': 3
};

for (const name in dictionary) {
  const myNumber = dictionary[name]; // Good!
//       ^?                     
}
// - 1
```

```ts twoslash{2,5}
// @include: fixed-1
```

Having the `dictionary` annotated with an index signature where the key is `string` and value is a `number` type, the TypeScript doesn't complain about `dictionary[name]`.  

TypeScript understands that if you use a property accessor with a `string` type, the resulted value is going to be a `number`:

```ts twoslash
// @include: fixed-1
// ---cut---
type ValueType = (typeof dictionary)[string];
//      ^?
```

The idea of the index signatures is to map key type to value type. That allows you to type objects of unknown structure when the only thing you know about the object is the key type and value type.  

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

As expected, TypeScript would infer the type of the value as `string`, however checking the runtime value it would be `undefined`:

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

To fix the example above, you can simply mark the indexed value as `string` or `undefined`. Doing so, TypeScript is going to be aware that the properties you access might now exist:

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

Because JavaScript implicitly coerces numbers to strings when used as keys in property accessors (`names[1]` is same as `names['1']`). TypeScript performs this coercion too.  

You can think that `[key: string]` is the same as `[key: string | number]`.  

## 4. Conclusion

If you don't know the structure of the object you're going to work with, but you know the possible key and value types, then the index signature is
what you need.  

The index signature consists of the index name and its type in square brackets, followed by a colon and the value type: `{ [indexName: KeyType]: ValueType }`. `KeyType` can be a `string`, `number`, or `symbol`, while `ValueType` can be any type.  

*Challenge: Write a generic type `Indexed<K, V>` that creates an index signature where `K` is the key type and `V` is the value type. Share your solution in a comment below!* 