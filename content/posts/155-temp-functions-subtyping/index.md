---
title: "Functions Subtyping"
description: "Functions Subtyping in TypeScript"
published: "2021-10-19T12:00Z"
modified: "2021-10-19T12:00Z"
thumbnail: "./images/cover-2.png"
slug: typescript-functions-subtyping
tags: ['typescript', 'object']
recommended: ['typescript-unknown-vs-any', 'how-to-iterate-easily-over-object-properties-in-javascript']
type: post
---

```twoslash include user-admin
class User {
  username: string;

  constructor(username: string) {
    this.username = username;
  }
}

class Admin extends User {
  isSuperAdmin: boolean;

  constructor(username: string, isSuperAdmin: boolean) {
    super(username);
    this.isSuperAdmin = isSuperAdmin;
  }
}
```

### 3.2 Functions subtyping and callbacks

Why should you understand functions subtyping?

For example, having a list of `Admin` instances:

```twoslash include admins
const admins: Admin[] = [
  new Admin('john.smith', false),
  new Admin('jane.doe', true),
  new Admin('joker', false)
];
```

```ts twoslash
// @include: user-admin
// ---cut---
// @include: admins
```

 which kind of callbacks
does the `admins.filter(...)` accept?

Obviously, it would accept a callback which has one parameter of type `Admin`:

```ts twoslash
// @include: user-admin
// ---cut---
// @include: admins

const superAdmins = admins.filter((admin: Admin): boolean => {
  return admin.isSuperAdmin;
});

superAdmins; // [ Admin('jane.doe', true) ]
```

But would `admins.filter(...)` accept a callback which parameter type is `User` (the base type of `Admin`):

```ts twoslash
// @include: user-admin
// @include: admins
// ---cut---
const jokers = admins.filter((user: User): boolean => {
  return user.username.startsWith('joker');
});

jokers; // [ Admin('joker', false) ]
```

Yes, `admins.filter()` accepts `(admin: Admin) => boolean` base type, but also the
subtypes of this function, like `(user: User) => boolean`.  

### 3.3 Functions subtying and inheritance

