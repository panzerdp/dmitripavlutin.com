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

The function above accepts 2 arguments of type `Date`: the start and end dates, and returns the difference (in days) between these dates.  

For example, let's determine the difference between January 1, 2021 and January 2, 2021:

```ts twoslash
// @include: diff
// ---cut---
const start = new Date('2021-01-01');
const end = new Date('2021-01-02');

diffInDays(start, end); // logs 1
```

As expected, the difference between these dates is 1 day.  

What if you'd like to make the `diffInDays()` function more universal. For example, improve it more to accept Unix timestamp numbers as arguments.  

```twoslash include to-date
function toDate(value: Date | number): Date {
  const SECOND = 1000;

  if (typeof value === 'number') {
    return new Date(value * SECOND);
  } else {
    return value;
  }
}
```

How to type such a function? There are 2 approaches.  

### 1.1 Updating the function signature

The first approach is straighforward and involves modifying the function signature directly by updating the parameter types from `Date` to `Date | number`.  

```twoslash include diff-updated-signature
function diffInDays(start: Date | number, end: Date | number): number {
  const DAY = 1000 * 60 * 60;

  return (toDate(start).getTime() - toDate(end).getTime()) / DAY;
}
```

Here's how `diffInDays()` looks after updating the parameter types:

```ts twoslash{1}
// @include: to-date
// ---cut---
// @include: diff-updated-signature
```

where `toDate()` is a helper function that creates `Date` instances from an argument of type `Date | number`.  

<details>
  <summary>Expand toDate() function</summary>

```ts twoslash
// @include: to-date
```

</details>

Now you can invoke `diffInDays()` using arguments of type `Date` or Unix timestamp:

```ts twoslash
// @include: to-date
// @include: diff-updated-signature
// ---cut---
diffInDays(new Date('2021-01-01'), new Date('2021-01-02')); // => 1
diffInDays(1609459200, 1609545600);                         // => 1
diffInDays(1609459200, new Date('2021-01-02'));             // => 1
```

While the approach to modify the function signature directly works, it might be a problem if you want to add more types. For example, you'd like to introduce string type, or you'd like to make the second argument optional. In time, such a complex signature would be difficult to understand.  

### 1.2 The function overloading

The second approach is to use the *function overloading* feature. I recommend it when the function signature is relatively complex and has multiple types involed.  

Putting the function overloading in practice requires defining the so called *overload signatures* and an *implementation signature*.  

The overload signatures is a list of function types 

## 2. Function overloading and subtyping

## 3. Method overloading

## 4. Conclusion