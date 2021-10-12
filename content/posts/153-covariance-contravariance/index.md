---
title: "Covariance and Contravariance in TypeScript"
description: "Covariance and contravariance describes the assignment compatiblity between types in TypeScript."
published: "2021-10-12T10:00Z"
modified: "2021-10-12T10:00Z"
thumbnail: "./images/cover.png"
slug: typescript-covariance-contravariance
tags: ['typescript']
recommended: ['typescript-unknown-vs-any', 'typescript-index-signatures']
type: post
---

Learning the covariance and contravariance in TypeScript could be tricky (I know from my own experience!), but knowing them is a great addition to your types understanding.  

In this post, I'm going to use a good example and a bit of theory to explain the covariance and contravariance concepts.  

## 1. Subtyping

Let's say you have a class `User`:

```twoslash include user
class User {
  userName: string;

  constructor(userName: string) { 
    this.userName = userName;
  }
}
```

```ts twoslash
// @include: user
```

And another class `Admin` that extends `User` class defined above:

```twoslash include admin
class Admin extends User {
  isSuperAdmin: boolean;

  constructor(userName: string, isSuperAdmin: boolean) {
    super(userName);
    this.isSuperAdmin = isSuperAdmin;
  }
}
```

```ts twoslash
// @include: user
// ---cut---
// @include: admin
```

Since `Admin` extends `User`, you could say that `Admin` is a subtype of `User`.  

Now let's introduce the symbol `A <: B`, which means *"A is a subtype of B"*. Because `Admin` is a subtype of `User`, now you could write shorter:

```
Admin <: User
```

Aditionally, I'm going to use a helper type `IsSubtype<S, P>`, which evaluates to `true` if `S` if a subtype of `P`, and `false` otherwise:


```twoslash include is-subtype
type IsSubtype<S, P> = S extends P ? true : false;
```

```ts twoslash
// @include: user
// @include: admin
// ---cut---
// @include: is-subtype
```

Since `Admin` is a subtype of `User`, as expected, `IsSubtype<Admin, User>` is `true`:

```ts twoslash
// @include: user
// @include: admin
// @include: is-subtype
// ---cut---
type T1 = IsSubtype<Admin, User>;
//   ^?
```

## 2. Covariance

Let's think about some asynchornous code that fetches `User` and `Admin` instances. Thus, you have to work with promises of `User` and `Admin`.  

Having `Admin <: User`, does it mean that `Promise<Admin> <: Promise<User>` holds as well? In other words, is `Promise<Admin>` is a subtype of `Promise<User>`?

Let's see what TypeScript is saying:

```ts twoslash{5}
// @include: user
// @include: admin
// @include: is-subtype
// ---cut---
type T2 = IsSubtype<Promise<Admin>, Promise<User>>
//   ^?
```

TypeScript has showed that indeed `Promise<Admin> <: Promise<User>` holds true as result of `Admin <: User`. Saying it formal, `Promise` type is *covariant*.  

Here's a definition of *covariance*:

> A type `T` is *covariant* if having `S <: P`, then `T<S> <: T<P>`.  

## 3. Contravariance

Now let's consider the following generic type:

```twoslash include func-param
type Func<Param> = (param: Param) => void;
```

```ts twoslash
// @include: func-param
```

`Func<Param>` creates function types with one parameter of type `Param`.  

Having `Admin <: User`, which of the expressions below is true?

A) `Func<Admin> <: Func<User>`, or  
B) `Func<User> <: Func<Admin>`

Let's take a try:

```ts twoslash{5}
// @include: user
// @include: admin
// @include: is-subtype
// @include: func-param
// ---cut---
type T3 = IsSubtype<Func<Admin>, Func<User>>
//   ^?
type T4 = IsSubtype<Func<User>, Func<Admin>>
//   ^?
```

For the `Func` type, having `Admin <: User`, doesn't mean that `Func<Admin> <: Func<User>`. But vice versa, `Func<User> <: Func<Admin>` holds true.  

That demonstrates that `Func` type is contravariant.  

> A type `T` is *contravarian* if having `S <: P`, then `T<P> <: T<S>`.  

To be honest, contravariance looks a big contreintuitive to me. Having `S` a subtype of `P`, then I *expect* for any type `T` it would result `T<S>` is a subtype of 
`P<T>`. But that's not always true, as you saw earlier! 

## 4. Conclusion

The type `T` is covariant if having 2 types `S <: P`, then `T<S> <: T<P>` (the subtyping direction is mainained). 

But if `T<P> <: T<S>` (the subtyping is flipper), then `T` is contravariant.   

*Challenge: do you know other contravariant types in TypeScript?*