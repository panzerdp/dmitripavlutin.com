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


## Questions 2: Clashing params

What will log to console the following code snippet:

```javascript
(function immediate1(a) {
  return (function immediate2(b) {
    console.log(a); // What is logged?
  })(1);
})(0);
```

<details>
  <summary>Expand answer</summary>

`0` is logged to console.

`immediate2` is a closure that captures `a` variable from the outer `immediate1` scope, where `a` is a parameter. Since `immediate1` was invoked with argument `0`, `a` parameter has the value `0`.  

</details>

## Questions 3: Clashing variables

What will log to console the following code snippet:

```javascript
let count = 0;
(function immediate() {
  if (count === 0) {
    let count = 1;
    console.log(count); // What is logged?
  }
  console.log(count); // What is logged?
})();
```

<details>
  <summary>Expand answer</summary>

`1` and `0` is logged to console.  

The first statement `let count = 0` declares a variable `count` in the outermost scope. 

Because `immediate()` is a closure, it captures the `count` variable from the outermost scope.  

However, inside the conditional, another `let count = 1` declares a local variable `count`, which overwrites `count` from outer the scope. The first `console.log(count)` logs `1`.  

The second `console.log(count)` logs `0`, since this `count` variable is captured from the outermost scope.  

</details>

## Questions 4: Tricky closure

What will log to console the following code snippet:

```javascript
for (var i = 0; i < 3; i++) {
  setTimeout(function() {
    console.log(i); // What is logged?
  }, 1000);
}
```

<details>
  <summary>Expand answer</summary>

`3`, `3`, `3` is logged to console.  

The code snippet executes in 2 phases.  

**Phase 1**  

1. `for()` iterating 3 times. During each iteration a new function `log()` is created, which captures the variable `i`. `setTimout()` schedules `log()` for execution after 1000ms.  
3. When `for()` cycle completes, `i` variable has value `3`.  

**Phase 2**

The second phase happens after 1000ms:

1. `setTimeout()` executes the scheduled `log()` functions. `log()` reads the *current value* of variable `i`, which is `3`, and logs to console `3`.

That's why the output to the console is `3`, `3` and `3`.  

</details>

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

<details>
  <summary>Expand answer</summary>

`'Count is 0'` is logged to console.  

`increment()` function has been called 3 times, effectively incrementing `count` to value `3`.  

`message` variable exists within the scope of `createIncrement()` function. It's been initialized with value `'Count is 0'`. However, even if `count` variable has been increased a few times, `message` variable always holds `'Count is 0'`.  

`log()` function is a closure that captures `message` variable from the `createIncrement()` scope. `console.log(message)` logs `'Count is 0'` to console.  

</details>

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

The problem with the above stack implementation is that it exposes the `stack.items` property, and thus anyone could modify this array directly. This breaks the encapsulation of stack implementation.   

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