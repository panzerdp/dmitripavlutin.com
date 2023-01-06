---
title: "Covariance and Contravariance in TypeScript"
description: "Covariance and contravariance are the concepts behind the subtyping of composable types."
published: "2021-10-14T12:00Z"
modified: "2022-01-11"
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

Subtyping is a form of [polymorphism](https://en.wikipedia.org/wiki/Polymorphism_(computer_science)) in which a *subtype* is associated with a base type by some form of substitutability.  

The substitutability means that a variable of base type can also accept subtype values.

For example, let's define a base class `User` and a class `Admin` that extends `User` class:

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

The substitutability of `Admin` (subtype) and `User` (base type) consists, for example, in the ability to assign to a variable of type `User` an instance of type `Admin`:

```ts twoslash
// @include: user
// @include: admin
// ---cut---
const user1: User = new User('user1');         // OK
const user2: User = new Admin('admin1', true); // also OK
```

How can you benefit from the substitutability?

One of the great benefits is that you can define behavior that doesn't depend on details. In simple words, you can create functions that accept the base type as a parameter, but then you can invoke that function with subtypes.  

For example, let's write a function that logs the user name to the console:

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

This function accepts arguments of type `User`, `Admin`, and instances of any other subtypes of `User` you might create later. That makes `logUsername()` more reusable and less bothered with details:

```ts twoslash
// @include: user
// @include: admin
// @include: log-username
// ---cut---
logUsername(new User('user1'));         // logs "user1"
logUsername(new Admin('admin1', true)); // logs "admin1"
```

### 1.1 A few helpers

Now let's introduce the symbol `A <: B` &mdash; meaning *"A is a subtype of B"*. 

Because `Admin` is a subtype of `User`, now you could write shorter:

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

Subtyping is possible for many other types, including primitives and built-in JavaScript types. 

For example, the literal string type `'Hello'` is a subtype of `string`, the literal number type `42` is a subtype of `number`, `Map<K, V>` is a subtype of `Object`.    

```ts twoslash
// @include: is-subtype
// ---cut---
type T12 = IsSubtypeOf<'hello', string>;
//   ^?
type T13 = IsSubtypeOf<42, number>;
//   ^?
type T14 = IsSubtypeOf<Map<string, string>, Object>
//   ^?
```

## 2. Covariance

Let's think about some asynchronous code that fetches `User` and `Admin` instances. Working with async code requires dealing with promises of `User` and `Admin`: `Promise<User>` and `<: Promise<Admin>`.  

Here's an interesting question: having `Admin <: User`, does it mean that `Promise<Admin> <: Promise<User>` holds as well?  

Let's make the experiment:

```ts twoslash{5}
// @include: user
// @include: admin
// @include: is-subtype
// ---cut---
type T21 = IsSubtypeOf<Promise<Admin>, Promise<User>>
//   ^?
```

Having `Admin <: User`, then `Promise<Admin> <: Promise<User>` indeed holds true. This demonstrates that `Promise` type is *covariant*.  

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

Having `Admin <: User`, which of the expressions is true: 

* `Func<Admin> <: Func<User>`, or
* `Func<User>  <: Func<Admin>`?  

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

`Func<User> <: Func<Admin>` holds true &mdash; meaning that `Func<User>` is a subtype of `Func<Admin>` . Note that the subtyping direction has *flipped* compared to the original types `Admin <: User`.  

Such behavior of `Func` type makes it *contravariant*. Speaking generally, *function types are contravariant in regards to their parameter types*.   

![Contravariance](./images/contravariance-2.svg)

> A type `T` is *contravariant* if having `S <: P`, then `T<P> <: T<S>`.  

The subtyping direction of function types is in the *opposite* direction of the subtyping of the parameter types.  

```ts twoslash
// @include: user
// @include: admin
// @include: is-subtype
// @include: param
// ---cut---
type FuncUser = (p: User) => void;
type FuncAdmin = (p: Admin) => void;

type T31 = IsSubtypeOf<Admin, User>;
//   ^?

type T32 = IsSubtypeOf<FuncUser, FuncAdmin>;
//   ^?
```

## 4. Functions subtyping

What is interesting about functions subtyping is that it combines both covariance and contravariance.  

> A function type is a *subtype* of a base type if its parameter types are *contravariant* with the base type' parameter types, and the return type is *covariant** with the base type' return type.  

**when [strictFunctionTypes](https://www.typescriptlang.org/tsconfig#strictFunctionTypes) mode is enabled.*

In other words, the subtyping for functions requires that the parameter types be contravariant, while the return types covariant.  

![Function Types Subtyping in TypeScript](./images/function-types-subtyping-4.svg)

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

Knowing subtyping greatly helps to understand the substitutability of function types.  

For example, having a list of `Admin` instances:

```twoslash include admins
const admins: Admin[] = [
  new Admin('john.smith', false),
  new Admin('jane.doe', true),
  new Admin('joker', false)
];
```

```ts twoslash
// @include: user
// @include: admin
// ---cut---
// @include: admins
```

What types of callbacks does the `admins.filter(...)` accept?

Obviously, it accepts a callback with one parameter of type `Admin`:

```ts twoslash
// @include: user
// @include: admin
// ---cut---
// @include: admins

const superAdmins = admins.filter((admin: Admin): boolean => {
  return admin.isSuperAdmin;
});

superAdmins; // [ Admin('jane.doe', true) ]
```

But would `admins.filter(...)` accept a callback which parameter type is `User`?

```ts twoslash
// @include: user
// @include: admin
// @include: admins
// ---cut---
const jokers = admins.filter((user: User): boolean => {
  return user.username.startsWith('joker');
});

jokers; // [ Admin('joker', false) ]
```

Yes, `admins.filter()` accepts `(admin: Admin) => boolean` base type, but also its subtypes like `(user: User) => boolean`.  

If a [higher-order function](/javascript-higher-order-functions/) accepts callbacks of a specific type, e.g. `(admin: Admin) => boolean`, then you can also supply callbacks that are subtypes of the specific type, e.g. `(user: User) => boolean`.  

## 5. Conclusion

The type `T` is covariant if having 2 types `S <: P`, then `T<S> <: T<P>` (the subtyping direction is maintained). An example of a covariant type is the `Promise<T>`.  

But if `T<P> <: T<S>` (the subtyping is flipped), then `T` is contravariant. 

The function type is contravariant by the parameter types, but covariant by the return types.  

*Challenge: What other covariant or contravariant types do you know?*