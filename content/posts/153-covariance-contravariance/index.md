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
  userName: string;

  constructor(userName: string) {
    this.userName = userName;
  }
}
```

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

// @include: admin
```

Since `Admin` extends `User` (`Admin extends User`), you could say that `Admin` is a *subtype* of the *base type* `User`.  

The substitutability of `Admin` (subtype) and `User` (base type) consists, for example, in the ability to assign to a variable of type `User` an instance of type `Admin`:

```ts twoslash
// @include: user
// @include: admin
// ---cut---
const user: User = new Admin('admin1', true); // OK
```

## 1.1 Why knowing subtyping 

Now let's introduce the symbol `A <: B` &mdash; meaning *"A is a subtype of B"*. Because `Admin` is a subtype of `User`, now you could write shorter:

```
Admin <: User
```

Let's also define a helper type `IsSubtype<S, P>`, which evaluates to `true` if `S` if a subtype of `P`, and `false` otherwise:

```twoslash include is-subtype
type IsSubtype<S, P> = S extends P ? true : false;
```

```ts twoslash
// @include: user
// @include: admin
// ---cut---
// @include: is-subtype
```

`IsSubtype<Admin, User>` evaluates to `true` because `Admin` is a subtype of `User`:

```ts twoslash
// @include: user
// @include: admin
// @include: is-subtype
// ---cut---
type T11 = IsSubtype<Admin, User>;
//   ^?
```

On a side note, subtyping is possible for other types. For example, the literal string type `'Hello'` is a subtype of `string`, or the literal number type `42` is a subtype of `number`.  

```ts twoslash
// @include: is-subtype
// ---cut---
type T12 = IsSubtype<'hello', string>;
//   ^?
type T13 = IsSubtype<42, number>;
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
type T21 = IsSubtype<Promise<Admin>, Promise<User>>
//   ^?
```

TypeScript has showed that indeed `Promise<Admin> <: Promise<User>` holds true as result of `Admin <: User`. Saying it formal, `Promise` type is *covariant*.  

![Covariance](./images/covariance.svg)

Here's a definition of *covariance*:

> A type `T` is *covariant* if having `S <: P`, then `T<S> <: T<P>`.  

The covariance of a type is intuitive. If `Admin` is a subtype of `User`, then you can expect `Promise<Admin>` to be a subtype of `Promise<User>`.  

Covariance holds for many types in TypeScript, for example:

```ts twoslash
// @include: user
// @include: admin
// @include: is-subtype
// ---cut---

// Capitalize<T>
type T22 = IsSubtype<'Hello', string>;
//   ^?
type T23 = IsSubtype<Capitalize<'Hello'>, Capitalize<string>>;
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

In other words, is `Func<Admin>` a subtype of `Func<User>`, or vice-versa: `Func<User>` is a subtype of `Func<Admin>`?  

Let's take a try:

```ts twoslash{5}
// @include: user
// @include: admin
// @include: is-subtype
// @include: param
// ---cut---
type T3 = IsSubtype<Func<Admin>, Func<User>>
//   ^?
type T4 = IsSubtype<Func<User>, Func<Admin>>
//   ^?
```

As the example above shows, `Func<Admin> <: Func<User>` is false.  

On the contrary, `Func<User> <: Func<Admin>` holds true &mdash; meaning that `Func<User>` is a subtype of `Func<Admin>` . The subtyping direction has flipped compared to the original types `Admin <: User`.  

Such behavior of `Func` type makes it *contravariant*. In other words, function types are contravariant in regards to their parameter types.   

![Contravariance](./images/contravariance.svg)

> A type `T` is *contravariant* if having `S <: P`, then `T<P> <: T<S>`.  

### 3.1 The idea of contravariance

The dry theory above is a bit difficult to understand, so let's find the intuitive sense behind contravariance.  

Let's define 2 functions that log the information stored in an `Admin` and `User` types of instances. `logAdmin()` logs `Admin` instances, while `logUser()` logs `User` instances information to the console.   

```twoslash include log
const logAdmin: Func<Admin> = (admin: Admin): void => {
  console.log(`Name: ${admin.userName}`);
  console.log(`Is super admin: ${admin.isSuperAdmin.toString()}`);
}

const logUser: Func<User> = (user: User): void => {
  console.log(`Name: ${user.userName}`);
}
```

```ts twoslash
// @include: param
// @include: user
// @include: admin
// ---cut---
// @include: log
```

Now let's try to assign `logUser()` function to a variable of type `Func<Admin>`, would it work?

```ts twoslash
// @include: user
// @include: admin
// @include: param
// @include: log
// ---cut---
const logger: Func<Admin> = logUser;  // OK
```

Yes, you can! Thanks to contravariance.  

The variable `logger` is of the base type `Func<Admin>`, so you can assign to it `logUser` function of type `Func<User>`.  

Now let's try the other way around: assign `logAdmin()` function to a variable of type `Func<User>`:

```ts twoslash
// @errors: 2322
// @include: user
// @include: admin
// @include: param
// @include: log
// ---cut---
const logger: Func<User> = logAdmin;
```

Nope, you can't! Again, thanks to the contravariance of functions in regards to parameter types.  

Why...?

`logger` variable is of type `Func<User>` &mdash; the subtype. And you cannot assign a variable of base type (`logAdmin` is `Func<Admin>`) to a subtype.  

As an experiment, let's disable type checking on the assignment by using type assertion to `any`. Then let's see what would happen during runtime:

```ts twoslash{9}
// @include: user
// @include: admin
// @include: param
// @include: log
// ---cut---
const logger: Func<User> = logAdmin as any;

const user = new User('user1');
logger(user);
// @error: "TypeError: Cannot read properties of undefined (reading 'toString')"
```

[Try the demo.](https://codesandbox.io/s/musing-mountain-kgsh6?file=/src/index.ts)

A runtime error is thrown because `logger(user)`, where `logger` is `logAdmin`, cannot log the instance data because `isSuperAdmin` property doesn't exist in the class `User`.  

Contravariance prevents such errors on functions subtyping.  

## 4. Conclusion

The type `T` is covariant if having 2 types `S <: P`, then `T<S> <: T<P>` (the subtyping direction is maintained). An example of covariant type is the `Promise<T>`.  

But if `T<P> <: T<S>` (the subtyping is flipper), then `T` is contravariant. The function type is contravariant by the parameter types.  

*Challenge: What other covariant or contravariant types do you know?*