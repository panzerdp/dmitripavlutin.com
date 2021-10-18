---
title: "Covariance and Contravariance in TypeScript"
description: "Covariance and contravariance are the concepts behind the subtyping of composable types."
published: "2021-10-14T12:00Z"
modified: "2021-10-14T12:00Z"
thumbnail: "./images/cover-1.png"
slug: typescript-covariance-contravariance
tags: ['typescript']
recommended: ['typescript-unknown-vs-any', 'typescript-index-signatures']
type: post
---

Learning covariance and contravariance in TypeScript could be tricky (I know from my experience!), but knowing them is a great addition to understanding types and subtyping.  

In this post, you'll read an accessible explanation of covariance and contravariance concepts.  

```toc

```

## 1. Subtyping

Subtyping is a form of [polymorphism](https://en.wikipedia.org/wiki/Polymorphism_(computer_science)) in which a *subtype* data type is associated with a *supertype* data type, also named base type by some form of substitutability.  

The substitutability means that each variable, function parameter of base type can also accept subtype values.

For example, let's define a base class `User`, then extend it by `Admin` class:

```twoslash include user
class User {
  username: string;

  constructor(username: string) {
    this.username = username;
  }
}
```

```twoslash include admin
class Admin extends User {
  isSuperAdmin: boolean;

  constructor(username: string, isSuperAdmin: boolean) {
    super(username);
    this.isSuperAdmin = isSuperAdmin;
  }
}
```

```ts twoslash
// @include: user

// @include: admin
```

Since `Admin` extends `User` (`Admin extends User`), you could say that `Admin` is a *subtype* of the *base type* `User`.  

![User and Admin Classes](./images/user-admin-3.svg)

### 1.1 Why understanding subtyping?

The substitutability of `Admin` (subtype) and `User` (base type) consists, for example, in the ability to assign to a variable of type `User` an instance of type `Admin`:

```ts twoslash
// @include: user
// @include: admin
// ---cut---
const user: User = new Admin('admin1', true); // OK
```

That's a good trick. But why is this important? How can you benefit from understanding subtyping and the substitutability?

Of the many benefits is the ability to create functions that accept a base type, but also all of the subtypes.  

For example, let's write a function that logs the user name to console:

```twoslash include log-username
function logUsername(user: User): void {
  console.log(user.username);
}
```

```ts twoslash
// @include: user
// @include: admin
// ---cut---
// @include: log-username
```

This function accepts as an argument both a `User` and `Admin` instances (and instances of any other subtypes of `User` you might create later), becoming more reusable and less bothered with details:

```ts twoslash
// @include: user
// @include: admin
// @include: log-username
// ---cut---
logUsername(new User('user1'));         // logs "user1"
logUsername(new Admin('admin1', true)); // logs "user2"
```

### 1.2 A few helpers

Now let's introduce the symbol `A <: B` &mdash; meaning *"A is a subtype of B"*. Because `Admin` is a subtype of `User`, now you could write shorter:

```
Admin <: User
```

Let's also define a helper type `IsSubtypeOf<S, P>`, which evaluates to `true` if `S` if a subtype of `P`, and `false` otherwise:

```twoslash include is-subtype
type IsSubtypeOf<S, P> = S extends P ? true : false;
```

```ts twoslash
// @include: user
// @include: admin
// ---cut---
// @include: is-subtype
```

`IsSubtypeOf<Admin, User>` evaluates to `true` because `Admin` is a subtype of `User`:

```ts twoslash
// @include: user
// @include: admin
// @include: is-subtype
// ---cut---
type T11 = IsSubtypeOf<Admin, User>;
//   ^?
```

On a side note, subtyping is possible for other types. For example, the literal string type `'Hello'` is a subtype of `string`, or the literal number type `42` is a subtype of `number`.  

```ts twoslash
// @include: is-subtype
// ---cut---
type T12 = IsSubtypeOf<'hello', string>;
//   ^?
type T13 = IsSubtypeOf<42, number>;
//   ^?
```

## 2. Covariance

Let's think about some asynchronous code that fetches `User` and `Admin` instances. Thus, you have to work with promises of `User` and `Admin`.  

Having `Admin <: User`, does it mean that `Promise<Admin> <: Promise<User>` holds as well? In other words, is `Promise<Admin>` a subtype of `Promise<User>`?

Let's see what TypeScript is saying:

```ts twoslash{5}
// @include: user
// @include: admin
// @include: is-subtype
// ---cut---
type T21 = IsSubtypeOf<Promise<Admin>, Promise<User>>
//   ^?
```

Indeed `Promise<Admin> <: Promise<User>` holds true, having `Admin <: User`. Saying it formal, `Promise` type is *covariant*.  

![Covariance](./images/covariance-2.svg)

Here's a definition of *covariance*:

> A type `T` is *covariant* if having `S <: P`, then `T<S> <: T<P>`.  

The covariance of a type is intuitive. If `Admin` is a subtype of `User`, then you can expect `Promise<Admin>` to be a subtype of `Promise<User>`.  

Covariance holds for many types in TypeScript.

A) `Promise<V>` (demonstrated above)

B) `Record<K,V>`:

```ts twoslash
// @include: user
// @include: admin
// @include: is-subtype
// ---cut---
type RecordOfAdmin = Record<string, Admin>;
type RecordOfUser  = Record<string, User>;

type T22 = IsSubtypeOf<RecordOfAdmin, RecordOfUser>;
//   ^?
```

C) `Map<K,V>`:

```ts twoslash
// @include: user
// @include: admin
// @include: is-subtype
// ---cut---
type MapOfAdmin = Map<string, Admin>;
type MapOfUser  = Map<string, User>;

type T23 = IsSubtypeOf<MapOfAdmin, MapOfUser>;
//   ^?
```

## 3. Contravariance

Now let's consider the following generic type:

```twoslash include param
type Func<Param> = (param: Param) => void;
```

```ts twoslash
// @include: param
```

`Func<Param>` creates function types with one parameter of type `Param`.  

Having `Admin <: User`, which of the expressions is true: `Func<Admin> <: Func<User>`, or
`Func<User> <: Func<Admin>`.  

Is `Func<Admin>` a subtype of `Func<User>`, or vice-versa: `Func<User>` is a subtype of `Func<Admin>`?  

Let's take a try:

```ts twoslash{5}
// @include: user
// @include: admin
// @include: is-subtype
// @include: param
// ---cut---
type T31 = IsSubtypeOf<Func<Admin>, Func<User>>
//   ^?
type T32 = IsSubtypeOf<Func<User>, Func<Admin>>
//   ^?
```

As the example above shows, `Func<Admin> <: Func<User>` is false.  

On the contrary, `Func<User> <: Func<Admin>` holds true &mdash; meaning that `Func<User>` is a subtype of `Func<Admin>` . The subtyping direction has flipped compared to the original types `Admin <: User`.  

Such behavior of `Func` type makes it *contravariant*. In other words, function types are contravariant in regards to their parameter types.   

![Contravariance](./images/contravariance-2.svg)

> A type `T` is *contravariant* if having `S <: P`, then `T<P> <: T<S>`.  

In simple words, the subtyping of function types is determined in the opposite direction with the subtyping of the parameter types (when returning types are the same).  

```ts twoslash
// @include: user
// @include: admin
// @include: is-subtype
// @include: param
// ---cut---
type T33 = IsSubtypeOf<(p: User) => void, (p: Admin) => void>
//   ^?
type T34 = IsSubtypeOf<(n: number) => void, (n: 1 | 2 | 3) => void>
//   ^?
```

## 4. Function types subtyping

What is really interesting about function types subtyping is that it combines both variances and contravariance.  

> A function type is a *subtype* of a base type if its parameter types are *contravariant* with the base type' parameter types, and the return type is *covariant** with the base type' return type.  

**when [strictFunctionTypes](https://www.typescriptlang.org/tsconfig#strictFunctionTypes) mode is enabled.*

In other words, the subtyping for functions requires that the parameter types to be contravariant, while the return type covariant.  

![Function Types Subtyping in TypeScript](./images/function-types-subtyping-2.svg)

For example:

```ts twoslash
// @include: user
// @include: admin
// @include: is-subtype
// @include: param
// ---cut---
type SubtypeFunc = (p: User) => '1' | '2';
type BaseFunc = (p: Admin) => string;  

type T41 = IsSubtypeOf<SubtypeFunc, BaseFunc>
//    ^?
```

`SubtypeFunc <: BaseFunc` because:

A) parameter types are contravariant (subtyping direction flipped `User :> Admin`)  
B) return types are covariant (same subtyping direction `'1' | '2' <: string`).  

Knowing how function types subtyping works helps you understand the substituaiability of function types.  

## 5. Conclusion

The type `T` is covariant if having 2 types `S <: P`, then `T<S> <: T<P>` (the subtyping direction is maintained). An example of covariant type is the `Promise<T>`.  

But if `T<P> <: T<S>` (the subtyping is flipper), then `T` is contravariant. The function type is contravariant by the parameter types, but covariant by the return types.  

*Challenge: What other covariant or contravariant types do you know?*