---
title: "Index Signatures in TypeScript"
description: "What are index signatures in TypeScript."
published: "2021-09-21T12:00Z"
modified: "2021-09-21T12:00Z"
thumbnail: "./images/cover.png"
slug: typescript-index-signatures
tags: ['typescript', 'object']
recommended: ['typescript-unknown-vs-any', 'how-to-iterate-easily-over-object-properties-in-javascript']
type: post
---

When I was making my first steps in using TypeScript, I was surprised that the following code snippet has a type error:

```typescript{9}
const dictionary = {
  'one': 1,
  'two': 2,
  'three': 3
};

for (const name in dictionary) {
  const number = dictionary[name];
  // No index signature with a parameter of type 'string' was found
}
```

[Try the demo.](https://www.typescriptlang.org/play?#code/MYewdgzgLgBAJgS2FB4CGAnAnjAvDAbwFgAoGGAcnAFMKAuGARgBpTyKoB3EemAJlZlKUABYZqtBgGZSAXwDcpUgDMQGGAApQkWGDQBbajARh4SFOmwBKQmxjboMMAFd9AI2rr8iZKj3YAbT1DAF1FIQB6CJgAORBjMDhqAA8YCAQAcz0oZ3EYTgRRGDQYAAdMA2ooTxgQZRgoLFKjCmgMEwyKfLQIGFVnRLkgA)

What I want is to loop though all `dictionary` properties and get their values. TypeScript, however, triggers a type error on the expression `dictionary[name]`, requiring an index signature on the type of `dictionary`.  

That's when I met index signatures. 

Let's find what TypeScript index signatures are and when they're needed.  

## 1. Index signature

Let's continue exploring the type error in the introduction:  

```typescript{9}
const dictionary = {
  'one': 1,
  'two': 2,
  'three': 3
};

for (const name in dictionary) {
  const number = dictionary[name];
  // No index signature with a parameter of type 'string' was found
}
```

[Try the demo.](https://www.typescriptlang.org/play?#code/MYewdgzgLgBAJgS2FB4CGAnAnjAvDAbwFgAoGGAcnAFMKAuGARgBpTyKoB3EemAJlZlKUABYZqtBgGZSAXwDcpUgDMQGGAApQkWGDQBbajARh4SFOmwBKQmxjboMMAFd9AI2rr8iZKj3YAbT1DAF1FIQB6CJgAORBjMDhqAA8YCAQAcz0oZ3EYTgRRGDQYAAdMA2ooTxgQZRgoLFKjCmgMEwyKfLQIGFVnRLkgA)

Why TypeScript doesn't like `dictionary[name]`?  

First, let's see what type is the `dictionary` variable? TypeScript infer `dictionary` type as `{ one: number, two: number, three: number }`.  

Second, let's see what `name` variable is? It's a `string` type.  

Here's the problem: `dictionary[name]` tries to read a property which may not exist on `dictionary`, because `name` can be any `string` value. That's what TypeScript is complaining about.  

How to make TypeScript to allow us access properties of string type?  

That's where the index signature can help. Let's annotate `dictionary` variable with an index signature:

```typescript
interface NumberByName {
  [name: string]: number
}

const dictionary: NumberByName = {
  'one': 1,
  'two': 2,
  'three': 3
};

for (const name in dictionary) {
  const number = dictionary[name]; // Good!
}
```

[Try the demo.](https://www.typescriptlang.org/play?#code/JYOwLgpgTgZghgYwgAgHIFcC2AjaAhAT1TkxQG8BYAKGWQG0QSIAuZAZzClAHMBdVkFlxRqAX2rUEAexAdkAE2AIwwGXCgFWGHPiJNkAXmSUayAOQyIZ1gEYANNVpmwAdynXkAJgennACygIK1YAZjEAbgkqGCkoZAAKaVkwZEZSZFAFJRU1DQBKY0dkJLlBHTijRWVVRg0GJl5w5AB6ZuQAcSkpeQBCMSA)

Having the `person` variable of type `{ [key: string]: string }` (the index signature), the TypeScript doesn't complain anymore about about `person[prop]`.  

`{ [name: string]: number }` is an index signature, describing a general object with properties having `string` type as a key and `number` type as value.  

## 2. Index signature syntax

The index signature consists of 2 parts: 

```typescript
{
  [index: IndexType]: ValueType
}
```

A pair of square brakets `[index: IndexType]` containing the index name `index` and the index type `IndexType`, followed by a colon and a `ValueType`.  

The `IndexType` can be either a `string` or `number`, while `ValueType` can be any type: string, number, object, etc.  

## 3. Conclusion

If you don't know the structure of the object you're going to work with, but you know the possible key and value types, then the index signature is
what you need.  

```typescript
interface IndexesType {
  [key: string]: string
}
```

