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

## 1. The difference between dates

Let's consider a function that returns the difference in days between 2 date instances:

```twoslash include diff
function diff(start: Date, end: Date): number {
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

diff(start, end); // logs 1
```

As expected, the difference between these dates is 1 day.  

What if you'd like to make the `diff()` function more universal. For example, improve it more to accept Unix timestamp numbers as arguments.  

How to type such a function? There are 2 approaches.  

## 2. Updating the function signature

The first approach is straighforward and involves modifying the function signature directly by updating the parameter types from `Date` to `Date | number`.  

```twoslash include diff-signature
function diff(start: Date | number, end: Date | number): number {
  const DAY = 1000 * 60 * 60;

  return (toDate(start).getTime() - toDate(end).getTime()) / DAY;
}

function toDate(value: Date | number): Date {
  if (typeof value === 'number') {
    return new Date(value);
  }
  return value;
}
```

Here's how `diff()` looks after updating the parameter types:

```ts twoslash{1}
// ---cut---
// @include: diff-signature
```

where `toDate()` is a helper function that returns date instances.  

Now you can invoke `diff()` using arguments of type `Date` or Unix timestamp:

```ts twoslash
// @include: diff-signature
// ---cut---
diff(new Date('2021-01-01'), new Date('2021-01-02')); // => 1
diff(1609459200, 1609545600);                         // => 1
diff(1609459200, new Date('2021-01-02'));             // => 1
```

While the approach to modify the function signature directly works, it might be a problem if you want to add more types. For example, you'd like to introduce string type, or you'd like to make the second argument optional. In time, such a complex signature would be difficult to understand.  

## 3. The function overloading

The second approach is to use the *function overloading* feature. I recommend it when the function signature is relatively complex and has multiple types involed.  

Putting the function overloading in practice requires defining the so called *overload signatures* and an *implementation signature*.  

The overload signature defines the parameter types and the return type of the function, and has no body. Usually you have multiple overload signatures that describe the different ways your function can be used.  

The implementation signature, on the other side, also has the parameter types and return type, but also a body that implements the function. There can be only one implementation signature.  

Let's transform the function `diff()` to use the function overloading:

```twoslash include diff-overloading
// Overload signatures
function diff(startDate:      Date,   endDate: Date):        number;
function diff(startTimestamp: number, endTimestamp: number): number;
function diff(startTimestamp: number, endDate: Date):        number;
function diff(startDate:      Date,   endTimestamp: number): number;

// Implementation signature
function diff(start: unknown, end: unknown): number {
  const DAY = 1000 * 60 * 60;

  return (toDate(start).getTime() - toDate(end).getTime()) / DAY;
}

function toDate(value: unknown): Date {
  if (typeof value === 'number') {
    return new Date(value);
  } else if (value instanceof Date) {
    return value;
  }
  throw new Error('Unknown type');
}
```

```ts twoslash
// @include: diff-overloading
```

The `diff()` function has 4 overload signatures and one implementation signature.  

Each overload signature describes exactly what kind of arguments the function can support. In case of `diff()` function, you can call it with in 4 different ways by combining the `Date` and `number` types.  

Now, as before, you can invoke `diff()` with the arguments of type `Date` or `number`:

```ts twoslash
// @include: diff-overloading
// ---cut---
diff(new Date('2021-01-01'), new Date('2021-01-02')); // => 1
diff(1609459200, 1609545600);                         // => 1
diff(1609459200, new Date('2021-01-02'));             // => 1
```

### 3.1 Overload signatures are callable

Here's an important nuance to remember about the implementation signature. While the implementation signature implements the function behavior, however, it is not directly callable. Only the overload signatures are callable.  

For example, if you try to autocomplete all the possible ways to call `diff()`, you would see it is callable only in 4 ways (i.e. the 4 overload signatures), and the implementation signature is not available.  

```ts twoslash
// @include: diff-overloading
// ---cut---
diff
//^?
```

## 5. Function overloading and subtyping

## 5. Method overloading

## 6. Conclusion