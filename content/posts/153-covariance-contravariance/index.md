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

Let's say you have a simple class `User`:

```twoslash include user
class User {
  userName: string;

  constructor(userName: string) { 
    this.userName = userName;
  }
}
// - 1
class AdminUser extends User {

}
// - 2
```

```ts twoslash
// @include: user-1
```

and also there's another class `AdminUser`, which is a subtype of `User`:

```ts twoslash
// @include: user-1
// ---cut---
// @include: user-2
```