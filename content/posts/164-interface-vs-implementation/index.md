---
title: "Programming to an Interface VS to an Implementation"
description: "How programming to an interface can make your application easier to change in the future."  
published: "2022-01-12"
modified: "2022-01-12"
thumbnail: "./images/cover.png"
slug: interface-vs-implementation
tags: ['typescript', 'software design']
recommended: ['frontend-architecture-stable-and-volatile-dependencies', 'the-art-of-writing-small-and-plain-functions']
type: post
---

You've written some code, tested it, and shipped to production. Then you never have to modify that code again. Wouldn't that be great?

But putting the dreams aside... you have to modify, even multiple times, the code that has been written. And this in my opinion one of the greatest challenges in software development: update the already written code.  

If you haven't taken the time, *in advance*, to think about the possible ways your code can change, you are quickly going to start have problems with [rigid and fragile code](https://www.excella.com/insights/top-4-symptoms-of-bad-code).  

In this post, I'm going to discuss about a software design principle that *advises to program to an interface rather that an implementation*.  

# 1. Programming to an implementation

A good way to understand the benefits of the software design principles is to follow an example and demonstrate visible benefits (like the before and after commercials).  

First, I'm going to show you an implementation that's not adapted to change. Then by applying the *program to an interface* principle redesign the component and demonstrate the advantages of the new design. 

You have the task of creating a component that displays a list of employees, alongside with their salaries. Here's a sample of the data that the component should accept:

```ts twoshlash
const employees = [
  { name: 'John Smith', salary: 30_000 },
  { name: 'Jane Doe', salary: 35_000 },
  { name: 'Thomas A. Anderson', salary: 65_000 }
]
```

And you have to implement a `<SortedList>` component that would render the list of employees, but also provide the ability to sort the employees by first name or salary.  

Here's a typical, first thought, implementation of the `<SortedList>` component:

```tsx twoslash
interface Props {
  list: { name: string; salary: number }[];
  sortBy: 'name' | 'salary'
}

export function SortedListProps({ 
  list, 
  sortBy 
}: Props): JSX.Element {
  const list = [...list].sort((person1, person2) => {

  });
  return <div></div>;
}
```

## 2. Programming to an interface

## 3. Benefits vs increased complexity

## 4. Conclusion