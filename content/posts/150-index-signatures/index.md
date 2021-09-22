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

When making my first steps in TypeScript, I was surprised that the code triggers a type error:

```ts twoslash
// @errors: 7053
const dictionary = {
  'one': 1,
  'two': 2,
  'three': 3
};

for (const name in dictionary) {
  const myNumber = dictionary[name];
}
```

What I want is to loop through all `dictionary` properties and get their values. TypeScript, however, triggers a type error on the expression `dictionary[name]`, requiring an index signature on the type of `dictionary`.  

That's when I met index signatures. 

Let's find what TypeScript index signatures are and when they're needed.  

## 1. Index signature

```twoslash include main
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

Let's continue exploring the type error from the previous code sample. Why TypeScript doesn't like `dictionary[name]`?  

First, let's see what type is the `dictionary` variable? It's a simple object type with fixed property names:

```ts twoslash
const dictionary = {
  'one': 1,
  'two': 2,
  'three': 3
};

dictionary;
// ^?
```

Second, let's see what `name` variable is? It's a `string` type.  

Here's the problem: `dictionary[name]` tries to read a property that may not exist on `dictionary`, because `name` can be any `string` value. That's what TypeScript is complaining about.  

How to make TypeScript access properties of string type?  

That's where the index signature can help. Let's annotate the `dictionary` variable with an index signature:

```ts twoslash
// @include: main-1
```

Having the `dictionary` annotated with an index signature where the key is `string` and value is a `number` type, the TypeScript doesn't complain about `dictionary[name]`.  

TypeScript understands that if you use a property accessor with a `string` type, the resulted value is going to be a `number`:

```ts twoslash
// @include: main-1
// ---cut---
type ValueType = (typeof dictionary)[string];
//      ^?
```

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

## 3. Conclusion

If you don't know the structure of the object you're going to work with, but you know the possible key and value types, then the index signature is
what you need.  

The index signature consists of the index name and its type in square brackets, followed by a colon and the value type: `{ [indexName: KeyType]: ValueType }`. `KeyType` can be a `string`, `number`, or `symbol`, while `ValueType` can be any type.  

*Challenge: Write a generic type `Indexed<K, V>` that creates an index signature where `K` is the key type and `V` is the value type. Share your solution in a comment below!* 