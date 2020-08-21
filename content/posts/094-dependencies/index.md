---
title: "Front-end Architecture: Stable and Volatile Depenedncies"
description: "Stable and Volatile Depenencies."
published: "2020-08-25T12:00Z"
modified: "2020-08-25T12:00Z"
thumbnail: "./images/cover-4.png"
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

The good part about components using depenencies is the code reuse: you simply import the necessary library and invoke it.  

On the other side, components using dependencies become completely depedent on the library it imports. Any bugs or API changes of the dependency influence directly your dependent component.  

What's even worse, your component might need to use different dependency implementations for different envirouments.  



## 1. Stable and volatile Dependencies

## 2. Incorrect depenendencies design

### 2.1 Difficult to test

## 3. Correct dependencies design

### 3.1 Easy to test

## 4. Summary