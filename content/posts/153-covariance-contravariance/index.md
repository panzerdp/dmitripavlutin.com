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

And another class `AdminUser` that extends `User` class defined above:

```twoslash include admin-user
class AdminUser extends User {

}
```

```ts twoslash
// @include: user
// ---cut---
// @include: admin-user
```

Since `AdminUser` extends `User`, you could say that `AdminUser` is a subtype of `User`.  

Now let's introduce the symbol `<:`, which means *"is a subtype of"*. Because `AdminUser` is a subtype of `User`, now you could write shorter:

```
AdminUser <: User
```

