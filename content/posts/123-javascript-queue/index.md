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

If you enjoy travelling (like I do), most likely you passed the check-in process at the airport. If there are a lot of travellers wanting to process the check-in, naturally a queue of people is formed at the check-in desk.  

![Airport Check-In Queue](./images/airport-queue.jpg)

A traveller just entered the airport is going to *enqueue* into the queue, and the traveller that has just passed the check-in process at the desk is *dequeued* from the queue.  

This is the real-world example of a queue &mdash; and the queue data structure works the same way as the natural queue.  

The queue data structure is a type of First Input First Output (FIFO). The first item enqueued is the first item to dequeue.  

## 2. The operations on queues

No matter how the queue is implemented internally, its main purpose is to support 2 main operations:

1. `queue.enqueue(item)` &mdash; enqueue an item into the queue;
* `item = queue.dequeue()` &mdash; dequeue an item from the top of the queue;

Additionally, you can some more helper operations on the queue:

3. `queue.peek()` &mdash; just peek the item at the top of the queue (without removing the item from the queue);
4. `queue.length` &mdash; determine the number of items in the queue.

What's important regaring all of the queue operations &mdash; enqueue, dequeue, peek and length &mdash; all these operations must be performed in constant time `O(1)`. 

The constant time `O(1)` means that no matter the size of the queue (it can have 10 or 1 million items): the queue, dequeue, peek and length operations must be performed in the same time.  

## 3. Implementing a queue in JavaScript

Let's look at a possible implementation of a queue data structure, while maintining the requeument that all queue operations to be performed in constract time `O(1)`.  

```javascript
class Queue {
  constructor() {
    this.items = {};
    this.headIndex = 0;
    this.tailIndex = 0;
  }

  enqueue(item) {
    this.items[this.tailIndex] = item;
    this.tailIndex++;
  }

  dequeue() {
    const item = this.items[headIndex];
    delete this.item[headIndex];
    this.headIndex++;
    return item;
  }

  peek() {
    return this.items[this.headIndex];
  }

  get length() {
    return this.tailIndex - this.headIndex;
  }
}

const queue = new Queue();

queue.enqueue(1);
queue.enqueue(5);
queue.enqueue(3);

queue.dequeue(); // => 1

queue.peek();    // => 5

queue.length;    // => 2
```

[Try the demo.]()

Inside of the `Queue` class, the plain JavaScript object `this.items` keeps the items of the queue.  

The index of the head of the queue is tracked by `this.headIndex` and the tail is tracked by `this.tailIndex`.  

#### *Queue* methods complexity

`queue()`, `dequeue()`, `peek()` and `length()` methods of the `Queue` class use only:

* Property accessors (e.g. `this.items[this.headIndex]`),
* Or perform aritmetical operations (e.g. `this.headIndex++`)

Thus the time complexity of the methods of `Queue` is constant time `O(1)`.  

## 4. Summary

The queue data structure is a type of First Input First Output (FIFO). The first item enqueued is the first item to dequeue.  

The queue has 2 main operations: enqueue and dequeue. Additionally queues can have helper operations like peek and length.  

All queue operations have to be performed in constant time `O(1)`.  

*Challenge: improve `dequeue()` and `peek()` to throw an error if these operations are performed on an empty queue. Write your solution in a comment below!*