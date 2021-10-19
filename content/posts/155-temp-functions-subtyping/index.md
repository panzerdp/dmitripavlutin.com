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


Why is it important to know functions subtyping?

For example, having a list of `Admin` instances, which kind of callbacks
does the `admins.filter(...)` accept?

Obvisouly, it would accept a callback which has one parameter of type `Admin`:

```ts twoslash
@include: user-admin
```

