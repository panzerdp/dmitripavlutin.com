---
title: "A Simple Explanation of Function Overloading in TypeScript"
description: "How you can define multiple signatures of the same function in TypeScript to increase its usability."
published: "2021-11-17T12:00Z"
modified: "2021-11-17T12:00Z"
thumbnail: "./images/cover-2.png"
slug: typescript-function-overloading
tags: ['typescript', 'function']
recommended: ['typescript-unknown-vs-any', 'typescript-covariance-contravariance']
type: post
---

Most of the functions accept a fixed set of arguments. However, there are functions that accept a variable number of arguments, as well arguments
of different types.  

To be able to comfortable type the functions that accept variable arguments, TypeScript offers the function overloading feature. 

Let's see how function overloading works.  

## 1. When to use function overloading

Let's consider a function that returns the difference in days between 2 date instances:

```twoslash include diff
function diffInDays(start: Date, end: Date): number {
  const DAY = 1000 * 60 * 60;
  return (end.getTime() - start.getTime()) / DAY;
}
```

```ts twoslash
// @include: diff
```

The function above accepts 2 arguments of type `Date`: the start and end dates. Then the function returns the difference in 
days between start and end dates.  

For example, let's determine the difference between January 1, 2021 and January 2, 2021:

```ts twoslash
// @include: diff
// ---cut---
const start = new Date('2021-01-01');
const end = new Date('2021-01-02');

diffInDays(start, end); // 1
```

As expected, the difference between these dates is 1 day.  

## 2. Function overloading and subtyping

## 3. Method overloading

## 4. Conclusion