---
title: "7 Interview Questions on JavaScript Closure. Can You Answer Them?"
description: "Can you answer these 7 interview questions regarding the closure concept in JavaScript?"
published: "2021-02-09T12:00Z"
modified: "2021-02-09T12:00Z"
thumbnail: "./images/cover.jpg"
slug: javascript-closure-interview-questions
tags: ['javascript', 'closure', 'interview']
recommended: ['simple-explanation-of-javascript-closures', 'simple-but-tricky-javascript-interview-questions']
type: post
---

## Questions 1: Is it a closure?

Consider the following functions `clickHandler`, `immediate`, and `delayedReload`:

```javascript
let countClicks = 0;
button.addEventListener('click', function clickHandler() {
  countClicks++;
});
```

```javascript
const result = (function immediate(number) {
  const message = `number is: ${number}`;
  return message;
})(100);
```

```javascript
setTimeout(function delayedReload() {
  location.reload();
}, 1000);
```

Which of these 3 functions is a closure and why?

<details>
  <summary>Expand answer</summary>


1) `clickHandler` *is a closure* because it accesses the variable `countClicks` from the outer scope.  
2) `immediate` *is not a closure* because it doesn't access any variables from the outer scope. 
3) `delayedReload` *is a closure* because it accesses the global variable `location`.  

A simple rule to identifying a closure is checking whether the function accesses variables from the outer scopes.  

</details>

## Questions 2: Clashing variables

What will log to console the following code snippet:

```javascript
let count = 0;
(function () {
  if (count === 0) {
    let count = 1;
    console.log(count); // What is logged?
  }
  console.log(count); // What is logged?
})();
```

## Questions 3: Clashing params

What will log to console the following code snippet:

```javascript
(function(a) {
  return (function(b) {
    console.log(a); // What is logged?
  })(1);
})(0);
```

## Questions 4: Tricky closure

What will log to console the following code snippet:

```javascript
for (var i = 0; i < 3; i++) {
  setTimeout(function() {
    console.log(i); // What is logged?
  }, 1000);
}
```

## Questions 5: Right or wrong message

What will log to console the following code snippet:

```javascript
function createIncrement() {
  let count = 0;
  function increment() { 
    count++;
  }

  let message = `Count is ${count}`;
  function log() {
    console.log(message);
  }
  
  return [increment, log];
}

const [increment, log] = createIncrement();
increment(); 
increment(); 
increment(); 
log(); // What is logged?
```

## Questions 6: Restoring encapsulation

The following function `createStack()` creates instances of stack data structure:

```javascript
function createStack() {
  return {
    items: [],
    push(item) {
      this.items.push(item);
    },
    pop() {
      return this.items.unshift();
    }
  };
}

const stack = createStack();
stack.push(10);
stack.push(5);
stack.pop(); // => 5

stack.items; // => [10]
```

The problem with this stack implementation is that it exposes the `stack.items` property, and thus anyone could modify this array directly. That breaks the encapsulation of stack implementation.   

Refactor the above stack implementation, using the concept of closure, such that there is no way to access `items` array outside of `createStack()` function scope:  

```javascript
function createStack() {
  // Write your code here...
}

const stack = createStack();
stack.push(10);
stack.push(5);
stack.pop(); // => 5

stack.items; // => undefined
```

## Questions 7: A touch of functional programming

Write a function `multiply()`:

```javascript
function multiply(number1, number2) {
  // Write your code here...
}
```

that works as follows:

```javascript
multiply(4, 5); // => 20
multiply(3, 3); // => 9

const double = multiply(2);
double(5);  // => 10
double(11); // => 22
```