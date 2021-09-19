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
  console.log(myObject[prop]);
  // No index signature with a parameter of type 'string' 
  // was found on type '{ prop: string; }'
}
```

[Try the demo.](https://www.typescriptlang.org/play?#code/MYewdgzgLgBAtgTwPICMBWBTYsC8MDeAUDDAA4BOIpAXDAOQBqAhgDYCuGdhAvgNyGEAZiHIwAFKEiwKVGAEsw8ZOixQAlAWIxJEECwwA6FiADmYxKkzYA2jNIBdNf25A)

What I want is to loop though all the `myObject` keys, and read the property value at the keys. TypeScript, however, triggers a type error on the expression `myObject[prop]`, requiring an index signature on the type of `myObject`.  

That's when I met index signatures. 

Let's find in this post what TypeScript index signatures are and when they're needed.  

## 1. Index signature

## 2. Conclusion