---
title: 'How to Implement a Queue in JavaScript'
description: 'The guide on how to implement a queue data structure in JavaScript.'
published: "2021-03-16T12:00Z"
modified: "2021-03-16T12:00Z"
thumbnail: "./images/cover-2.png"
slug: javascript-queue
tags: ['javascript', 'computer science', 'data structure' ,'queue']
recommended: ['gentle-explanation-of-this-in-javascript', 'javascript-this-interview-questions']
type: post
---

Being a good developer (including Frontend developer) requires knowledge from multiple disciplines.  

The first requirement is to know the programming language that you've chosen: and if you're reading this post,
most likely your language of choice is JavaScript.  

However, on top knowing the programming language, you also have to understand how to organize data to 
easily and effectively manipulate it depending on your task. That's were the data structures come into play.  

In this post, I'm going to describe the queue data structure, what operations you can perform on it, as well present you with a simple implement in JavaScript.  

## 1. The queue data structure

If you enjoy travelling (like I do), most likely you passed the check-in process at the airport. If there are a lot of travellers wanting to process the check-in, naturally a queue at the check-in desk is formed.  

![Airport Check-In Queue](./images/airport-queue.jpg)

A traveller that has just entered the airport is going to *enqeue* into the queue, and the traveller that has just passed the check-in process at the desk is *dequeued* from the queue.  

This is the real-world example of a queue &mdash; and the queue data structure works the same way as the natural queue.  

The queue data structure is a type of First Input First Output (FIFO).  

## 2. The operations on queues

No matter how the queue is implemented internally, its main purpose is to support 2 main operations:

1. `queue.enqueue(item)` &mdash; enqeue an item into the queue;
* `item = queue.dequeue()` &mdash; dequeue an item from the top of the queue

Additionally, sometimes it is useful to have a few more operations on the queue:

3. `queue.peek()` &mdash; simply peek the item at the top of the qeueq (without dequeueing it)
4. `queue.length` &mdash; determine the number of items in the qeue

What's important regaring all of the qeue operations &mdash; enqeue, dequeue, peek and length &mdash; all these operations must be performed in constant time `O(1)`.  

## 3. Implementing a queue in JavaScript

I found that the most c

## 4. Summary