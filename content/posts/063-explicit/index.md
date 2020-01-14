---
title: 'The Explicit Coding Discipline'
description: 'Explicit coding discipline suggest writing code that leaves no room for confusion.'
published: '2020-01-15T12:00Z'
modified: '2020-01-15T12:00Z'
thumbnail: './images/crystal.jpg'
slug: explicit-coding-discipline
tags: ['craftsmanship', 'clean code']
recommended: ['become-better-software-developer-digging-climbing', 'the-path-of-software-development-craftsmanship']
type: post
commentsThreadId: explicit-coding-discipline
---

The more I evaluate my experience as a software developer, the more I understand the importance of good communication.  

The code is the source of truth for both running and developing the application. The discipline of writing quality, performant and understandable code is the key to the success of the project.  

In the real-world there's always room for mistakes. The platforms, the programming languages have flaws. The developers regularly make mistakes and write confusing code, jerk-knee solutions.  

A good way to diminish the flaws of unreadable code is to develop a discipline of explicit coding. 

The discipline of explicit coding favors good naming that leaves no doubt about the intent of the code. It suggests avoiding tricky and implicit expressions from programming languages (I will be using JavaScript as an example).  

## 1. Why explicit matters

Before dicussing about the coding discipline, I'd like to tell you a story of how communication misunderstanding and dual interpretation can lead to problems.  

In March, 2019 I travelled to [Canary Islands](https://en.wikipedia.org/wiki/Canary_Islands): a beatiful Spanish archipelago with never ending spring. I had arrived at the Tenerife Island by flying from Barcelona to Tenerife North Airport.  

![Tenerife North Airport](./images/tenerife-north-terminal.jpg)

While being there, I was reading that at the Tenerife North Airport in 1977 happened the [worst airline distaster ever](https://en.wikipedia.org/wiki/Tenerife_airport_disaster): two Boeing 747 passenger jets collided on the runway.  

Citing Wikipedia, the short conclusion of why the accident had happened:

"The subsequent investigation by Spanish authorities concluded that the primary cause of the accident was the KLM captain's decision to take off in the mistaken belief that a takeoff clearance from air traffic control (ATC) had been issued. Dutch investigators placed a greater emphasis on mutual misunderstanding in radio communications between the KLM crew and ATC."

The mutual misunderstanding and nondeterministic communication was one of the reasons of the accident.  

Being at a different scale, still efficient communication through deterministic naming and leaving no room for side interpretation is important in software development too.  

## 2. Explicit naming

The most time consuming in software development is not writing new code... but understanding what the *actual* code does.  

## 2.1 Variables naming

Variables should clearly indicate the meaning of the content it has.  

For example, if you're summing the number of an array:

```javascript{2}
// Bad
let s = 0;
const items = [1, 2, 3];
for (const item of items) {
  s += item;
}
s; // => 6
```

What does `s` variable stand for? Only after looking at the `s += item` expression you can understand that `s` holds the sum of items.  

An explicit variable name `sum` clearly increases the reability of the code snippet. Without knowing the details, you can understand  that `sum` indicates a variables that holds the sum of some numbers.  

```javascript{2}
// Good
let sum = 0;
const items = [1, 2, 3];
for (const item of items) {
  sum += item;
}
sum; // => 6
```

When naming the variable, if you get back to this code in 1 month, can you understand what the variable does for just by looking at the name?  

## 2.2 Functions naming

Functions should indicate what the cohesive chunk of code does.  

## 3. Avoid tricks in favor of explicit code

While having good variables and functions is more or less known, the tricks that provide the language you're working with is less of a control.  

![Shortest possible code meme](./images/meme.jpg)

## 4. Screaming architecture



## 5. Conclusion