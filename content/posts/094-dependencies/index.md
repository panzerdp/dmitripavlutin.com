---
title: "Front-end Architecture: Stable and Volatile Dependencies"
description: "Designing correctly the dependencies is important for creating flexible Front-end applications. The first step is to identify and separate the stable and volatile dependencies."
published: "2020-08-25T12:00Z"
modified: "2020-08-25T12:00Z"
thumbnail: "./images/cover-5.png"
slug: frontend-architecture-stable-and-volatile-dependencies
tags: ['architecture', 'clean code', 'dependency']
recommended: ['7-architectural-attributes-of-a-reliable-react-component', 'the-art-of-writing-small-and-plain-functions']
type: post
commentsThreadId: frontend-architecture-stable-and-volatile-dependencies
---

Many components (of libraries like React, Vue, Angular) use functionality of utility libraries.  

Let's consider a React component that displays the number of words in the provided text, which is supplied as a prop:

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

However, your component might need diverse dependency implementations for various environments (client-side, server-side, testing environment). In such a case importing directly the dependency is a bad practice.  

Designing correctly the dependencies is an important skill to architect flexible Front-end applications. The first step to create a good design is to identify the *stable* and *volatile* dependencies.  

## 1. Stable dependencies

## 2. Volatile dependencies

## 3. Incorrect depenendencies design

### 3.1 Difficult to test

## 4. Good dependencies design

### 4.1 Easy to test

## 5. Summary