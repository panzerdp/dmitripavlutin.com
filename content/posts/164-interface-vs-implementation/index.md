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

Imagine that you've written some code, tested it, and shipped to production. Then you never have to modify that code again. Coding such way would be so easy.   

But putting the dreams aside... you have to modify, even multiple times, the code that has been written. 

And if you haven't taken the time, *in advance*, to think about the possible ways your code can be modified later, you are quickly going to end in a trouble with [rigid and fragile code](https://www.excella.com/insights/top-4-symptoms-of-bad-code).  

In this post, I'm going to discuss about the software design principle that advises to program to an interface rather that an implementation.  

