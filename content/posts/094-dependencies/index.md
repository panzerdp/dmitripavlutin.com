---
title: "Front-end Architecture: Stable and Volatile Dependencies"
description: "Designing correctly the dependencies is important for creating flexible Front-end applications. The first step is to identify and separate the stable and volatile dependencies."
published: "2020-08-25T12:00Z"
modified: "2020-08-25T12:00Z"
thumbnail: "./images/cover-7.png"
slug: frontend-architecture-stable-and-volatile-dependencies
tags: ['architecture', 'clean code', 'dependency']
recommended: ['7-architectural-attributes-of-a-reliable-react-component', 'the-art-of-writing-small-and-plain-functions']
type: post
commentsThreadId: frontend-architecture-stable-and-volatile-dependencies
---

Many components (of libraries like React, Vue, Angular) use functionality of utility libraries.  

Let's consider a React component that displays the number of words in the provided text:

```tsx{1,4}
import words from 'lodash.words';

function CountWords({ text }: { text: string }): JSX.Element {
  const count = words(text).length;
  return (
    <div className="words-count">{count}</div>
  );
}
```

The component `CountWords` uses the library `lodash.words` to count the number of words in the string `text`. 

`CountWords` component has a dependency on `lodash.words` library.  

The good part about components using depenencies is the code reuse: you simply import the necessary library and use it.  

However, your component might need diverse dependency implementations for various environments (client-side, server-side, testing environment). In such a case importing directly a concrete dependency is a bad practice.  

Designing correctly the dependencies is an important skill to architect Front-end applications. The first step to create a good design is to identify the *stable* and *volatile* dependencies, and treat them accordingly.  

## 1. Stable dependencies

Let's recall the example component `CountWords` from the introduction:  

```tsx{1}
import words from 'lodash.words';

function CountWords({ text }: { text: string }): JSX.Element {
  const count = words(text).length;
  return (
    <div className="words-count">{count}</div>
  );
}
```

Clearly `lodash.words` is a dependency of `CountWords` component.  

The component `CountWords` is going to use the same library `lodash.words` no matter the environment: be it on client-side, be it running on the server-side (if you implement Server-Side Rendering), or even when running unit tests of `Count words`.    

At the same time, `lodash.words` is a simple utility function: `const arrayOfWords = words(string)`. The signature of the function won't change much in the future.  

Because the dependent component always uses one dependency implementation, and the dependency won't change in the future &mdash; such dependency is considered *stable*.  

![Stable dependency](./images/diagram-stable-dependency-2.svg)

Examples of stable dependencies are the utility libraries like `lodash`, `ramda`.  

Moreover, the JavaScript language itself provides:

* Utility functions, like `Object.keys()`, `Array.from()`
* Methods on primitives and objects, like `string.slice()`, `array.includes()`, `object.toString()`

All the built-in functions that the language provides are also considered stable dependencies. You can use them safely and depend directly upon them.  

However, aside from stable dependencies, there are dependencies that may change under certain circumstances. Such *volatile* dependencies have to be separated from stable ones, and designed in a different manner to *avoid your components depend on volatile dependencies directly*.  

Let's see what volatile dependencies are in the next section.  

## 2. Volatile dependencies

Consider a Front-end application that supports also Server-Side Rendering. Your task is to implement user login functionality. 

When the user first loads the app a login form is displayed. If the user introduces the correct username and password (`"user"` and `"12345"`) in the login form and hits submit, then you create a cookie `loggedIn` with value `1`.  

As long as the user is logged in (the cookie `loggedIn` is set and has value `1`) display a message `'You are logged in'`. Otherwise, just display the login form.  

Having the app requirements setup, let's discuss potential ways of implementation.  

To determine whether `loggedIn` cookie is set-up, you have to consider the environment where the application runs. On client side you can the access the cookie from `document.cookie` property, while on server side you'd need to read the HTTP request header `cookie`.  

The cookie management is a *volatile dependency*, because the component choose the concrete dependency implementation by environment: client-side or server-side.  

### 2.1 Bad design of volatile dependency

The important thing about volatile dependencies is that your component should not directly depend upon them. Let's deliberately make this mistake:  

```tsx{1-2}
import cookieClient from 'libs/cookie-client';
import cookieServer from 'libs/cookie-server';

import LoginForm from 'Components/LoginForm';

export function Page(): JSX.Element {
  const cookieManagement = typeof window === 'undefined' 
    ? cookieServer : cookieClient;

  if (cookieManagement.get('loggedIn') === '1') {
    return <div>You are logged in</div>;
  } else {
    return <LoginForm />
  }
}
```

`Page` components depends directly on both `cookieClient` and `cookieServer` libraries. Then it selects the necessary implementation by checking whether the `window` global variable is setup to determine the client or server side.   

Let's distinguish why implementing the cookie management volatile dependency such way is a problem:

* *Too much dependencies.* The component `Page` depends directly on 2 libraries: `cookieClient` and `cookieServer`
* *Boilerplate code.* Every time you need the cookie management library, you have invoke the expression `typeof window === 'undefined'` to determine whether the app runs on client or server side, and choose the according cookie management implementation
* *Unnecessary code.* The client-side bundle is going to include the `cookieServer` library which isn't used on client side
* *Difficult testing.* The unit tests of `Page` component would require lots of mockups like setting `window` variable and mockup `document.cookie`

Making a better design to handle volatile dependencies requires a bit more work, but the outcome and improved design worth it.  

### 2.2 Better design of volatile dependency

First, let's define an interface `CookieManagement` that describes what methods a cookie library should implement:

```tsx
// CookieManagement.tsx

export interface CookieManagement {
  get(name: string): string | null;
  set(name: string, value: string);
}
```

Then, in order to supply the library into the `Page` component, let's create a Context:

```tsx
// cookieManagementContext.tsx

import { CookieManagement } from './CookieManagement';


```

## 3. Summary