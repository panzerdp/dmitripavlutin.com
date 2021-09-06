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

When I had started learning TypeScript, after grasping all the beauty of types, I had learned that `any` is a special keyword that represents any value.  

Basically using `any` makes a variable assignable to anything exactly like in JavaScript:

```typescript
let myVar: any = 0;
myVar = '1';
myVar = false;
```

What I had also learned is that using `any` keyword is discouraged. It's because `any` throws away any type restrictions (the first reason why you use TypeScript!).  

