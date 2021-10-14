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

In this post, I'll read an accessible explanation of covariance and contravariance concepts.  

```toc

```

## 1. Subtyping

Thanks to inheritance, in TypeScript a *base* type can be extended by another type named *subtype*. 

For example, let's define a base class `User`, then extend that class by a new `Admin` class:

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

Since `Admin` extends `User` (note the `Admin extends User`), you could say that `Admin` is a *subtype* of `User`.  

Subtyping is possible not only in classes but also in other types. For example, the literal string type `'Hello'` is a subtype of `string`, or the literal number type `42` is a subtype of `number`.  

Now let's introduce the symbol `A <: B` &mdash; meaning *"A is a subtype of B"*. Because `Admin` is a subtype of `User`, now you could write shorter:

```
Admin <: User
```

Additionally, I'm going to use a helper type `IsSubtype<S, P>`, which evaluates to `true` if `S` if a subtype of `P`, and `false` otherwise:

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

Let's think about some asynchronous code that fetches `User` and `Admin` instances. Thus, you have to work with promises of `User` and `Admin`.  

Having `Admin <: User`, does it mean that `Promise<Admin> <: Promise<User>` holds as well? In other words, is `Promise<Admin>` is a subtype of `Promise<User>`?

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

The covariance of a type is usually intuitive. If `Admin` is a subtype of `User`, then you can expect `Promise<Admin>` to be a subtype of `Promise<User>`.  

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

Having `Admin <: User`, which of the expressions below is true?

A) `Func<Admin> <: Func<User>`, or  
B) `Func<User> <: Func<Admin>`

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

For the `Func` type, having `Admin <: User`, doesn't mean that `Func<Admin> <: Func<User>`. But vice versa, `Func<User> <: Func<Admin>` holds true &mdash; the subtyping direction has flipped compared to the original types `Admin <: User`.  

Such behavior of `Func` type makes it *contravariant*.  

![Contravariance](./images/contravariance.svg)

> A type `T` is *contravariant* if having `S <: P`, then `T<P> <: T<S>`.  

Function types are contravariant in regards to their parameter types.  

### 3.1 The idea of contravariance

The dry theory above is a bit difficult to understand, so let's find the intuitive sense behind contravariance.  

Let's define 2 simple functions that log the information stored in an `Admin` and `User` instance:

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

Now let's define a variable of function type with an `Admin` parameter:

```ts twoslash
// @include: user
// @include: admin
// @include: param
// @include: log
// ---cut---

const admin = new Admin('admin1', true);

let logger: Func<Admin>;

logger = logUser;
logger(admin); // OK

logger = logAdmin;
logger(admin); // OK
```

You can assign to `logger` variable both `logUser` and `logAdmin` functions, and then invoke both of these functions using an `Admin` instance. TypeScript doesn't complain about doing so.  

Now let's try the other way around: define a variable of function type with a `User` parameter:  

```ts twoslash
// @errors: 2322
// @include: user
// @include: admin
// @include: param
// @include: log
// ---cut---

const user = new User('user1');

let logger: Func<User>;

logger = logUser;
logger(user); // OK

logger = logAdmin;
logger(user); // Ooops!
```

This time, however, TypeScript doesn't allow the assignment of `logAdmin` function to `logger`.  

Why...?

Look at the latest line in the snippet: `logger(user); // Ooops!`.

What would happen if you invoke `logger(user)` (`logger` variable holds `logAdmin` function)? It would be an error because `user` variable of type `User`
doesn't have the property `isSuperAdmin` which `logAdmin()` function is using.  

As an experiment, let's disable type checking on the line `logger = logAdmin` by using type assertion to `any`. Then let's see what would happen during runtime:

```ts twoslash{9}
// @include: user
// @include: admin
// @include: param
// @include: log
// ---cut---

const user = new User('user1');

let logger: Func<User>;

logger = logUser;
logger(user); // OK

logger = logAdmin as any;
logger(user); // Ooops!
// @error: "TypeError: Cannot read properties of undefined (reading 'toString')"
```

[Try the demo.](https://codesandbox.io/s/musing-mountain-kgsh6?file=/src/index.ts)

A runtime error is thrown because `logger(user)`, where `logger` is `logAdmin`, cannot log the instance data because `isSuperAdmin` property doesn't exist in the class `User`.  

Contravariance prevents such kind of errors on functions subtyping.  

## 4. Conclusion

The type `T` is covariant if having 2 types `S <: P`, then `T<S> <: T<P>` (the subtyping direction is maintained). An example of covariant type is the `Promise<T>`.  

But if `T<P> <: T<S>` (the subtyping is flipper), then `T` is contravariant. The function type is contravariant by the parameter types.  

*Challenge: What other covariant or contravariant types do you know?*