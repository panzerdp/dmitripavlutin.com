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

```typescript{7-8}
const myObject = {
  prop: 'Value'
};

for (const prop in myObject) {
  const value = myObject[prop];
  // No index signature with a parameter of type 'string' 
  // was found on type '{ prop: string; }'
}
```

[Try the demo.](https://www.typescriptlang.org/play?#code/MYewdgzgLgBAtgTwPICMBWBTYsC8MDeAUDDAA4BOIpAXDAOQBqAhgDYCuGdhAvgNyGEAZiHIwAFKEiwKVGAEsw8ZOixQAlAWIxJ0GADdWHGHkSpM2ANozSAXX7cgA)

What I want is to loop though all the `myObject` keys, and read the property value at the keys. TypeScript, however, triggers a type error on the expression `myObject[prop]`, requiring an index signature on the type of `myObject`.  

That's when I met index signatures. 

Let's find what TypeScript index signatures are and when they're needed.  

## 1. Index signature

Let's continue exploring the type error in the introduction:  

```typescript{7-8}
const myObject = {
  prop: 'Value'
};

for (const prop in myObject) {
  const value = myObject[prop];
  // No index signature with a parameter of type 'string' 
  // was found on type '{ prop: string; }'
}
```

[Try the demo.](https://www.typescriptlang.org/play?#code/MYewdgzgLgBAtgTwPICMBWBTYsC8MDeAUDDAA4BOIpAXDAOQBqAhgDYCuGdhAvgNyGEAZiHIwAFKEiwKVGAEsw8ZOixQAlAWIxJ0GADdWHGHkSpM2ANozSAXX7cgA)

Why TypeScript doesn't like `myObject[prop]`?  

First, let's see what type is the `myObject` variable? It is `{ prop: string }`: meaning that `myObject` variable contains an object with one property `prop` that can have a string value.  

Second, let's see what `prop` variable is? It's a `string` type.  

Now you can probably see the problem: `myObject[prop]` tries to read a property which may not exist on `myObject`, because `prop` can be any `string` value. That's what TypeScript is complaining about.  

## 2. Conclusion