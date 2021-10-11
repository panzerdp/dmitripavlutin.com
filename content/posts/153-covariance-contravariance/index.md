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

## 1. Setting up an example

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

```twoslash include admin-user
class Admin extends User {

}
```

```ts twoslash
// @include: user
// ---cut---
// @include: admin-user
```

Since `Admin` extends `User`, you could say that `Admin` is a subtype of `User`.  

Now let's introduce the symbol `A <: B`, which means *"A is a subtype of B"*. Because `Admin` is a subtype of `User`, now you could write shorter:

```
Admin <: User
```

Thanks to the fact that `Admin <: User`, you could assign to a variable of type `User` both a `User` instance and an `UserAdmin` instance.  

```ts twoslash
// @include: user
// @include: admin-user
// ---cut---
const user1: User = new User('user1');   // OK
const user2: User = new Admin('admin1'); // OK
```

Let's then use the symbol `A =: B` to denote *"A is assignable to B"*. Following the previous example, you could write:

```
User  =: User
Admin =: User
```

## 2. Covariance

Now let me ask you a question: 

## 3. Contravariance

## 4. Conclusion