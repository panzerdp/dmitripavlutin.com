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

But putting the dreams aside... you have to modify, even multiple times, the code that has been written. 

If you haven't taken the time, *in advance*, to think about the possible ways your code can change, you are quickly going to start have problems with [rigid and fragile code](https://www.excella.com/insights/top-4-symptoms-of-bad-code).  

In this post, I'm going to discuss about a software design principle that *advises to program to an interface rather that an implementation*.  

