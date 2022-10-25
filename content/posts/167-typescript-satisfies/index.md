---
title: '"satisfies" keyword in TypeScript'
description: "How to use satisifies keyword in TypeScript to check type compatibility in TypeScript"  
published: "2022-10-06"
modified: "2022-10-06"
thumbnail: "./images/cover-2.png"
slug: typescript-satisfies
tags: ['typescript']
recommended: ['typescript-unknown-vs-any', 'typescript-index-signatures']
type: post
---

While most of the time you might be use TypeScript's type checking capabitilies on the background,

## 1. Checking a value type: old way

Let's say that you have an object that represents some favorties movies:

```ts twoslash
type Favorites = {
  movie: string | string[]
}
```

The type represents an object having a property `movie`, which can be either a string or an array of strings (if you're many favorite movies).

## 2. Checking a value type using satisfies



## 3. Conclusion