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

![Covariance](./images/covariance.svg)

The subtyping direction of a composed type in relation with its consituent types subtyping direction is named *variance*. 

Variance can be either:

* *covariant* (same direction)
* *contravariant* (opposite direction)
* *bivariant* (both same and opposite direction)
* or *invariant* (composed type has no relation with the direction of the substituent types).  

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

In other words, is `Func<Admin>` a subtype of `Func<User>`, or vice-versa: `Func<User>` is a subtype of `Func<Admin>`?  

Let's take a try:

```ts twoslash{5}
// @include: user
// @include: admin
// @include: is-subtype
// @include: param
// ---cut---
type T3 = IsSubtypeOf<Func<Admin>, Func<User>>
//   ^?
type T4 = IsSubtypeOf<Func<User>, Func<Admin>>
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
  console.log(`Name: ${admin.username}`);
  console.log(`Is super admin: ${admin.isSuperAdmin.toString()}`);
}

const logUser: Func<User> = (user: User): void => {
  console.log(`Name: ${user.username}`);
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