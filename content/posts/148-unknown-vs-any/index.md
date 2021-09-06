---
title: "unknown vs any in TypeScript"
description: "What is the difference between unknown and any types in TypeScript."
published: "2021-09-07T12:00Z"
modified: "2021-08-07T12:00Z"
thumbnail: "./images/cover-3.png"
slug: typescript-unknown-vs-any
tags: ['typescript', 'unknown', 'any']
recommended: ['javascript-null', '7-tips-to-handle-undefined-in-javascript']
type: post
---

`any` is a special keyword that represents any value. `any` makes a variable assignable to anything (exactly like a variable in pure JavaScript):

```typescript
let myVar: any = 0;
myVar = '1';
myVar = false;
```

Many TypeScript guides  discourage the use of `any`. It's understenable because `any` throws away the type restrictions (the first reason why you use TypeScript!).  

Sometimes, however, you don't know what type the variable is going to have. For such cases TypeScript provides the special type `unknown`. 

What's interesting is that you can assign any value to an `unknown` type variable, exactly like in the case of `any`:

```typescript
let myVar: unknown = 0;
myVar = '1';
myVar = false;
```

Wow... the big question is: what is the difference between using `any` and `unknown`? Let's find out in this post.  

## 1. *unknown* vs *any*

## 2. *don't care* vs *don't know*

## 3. Conclusion