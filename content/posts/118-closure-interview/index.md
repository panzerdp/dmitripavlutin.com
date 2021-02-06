---
title: "7 Interview Questions on JavaScript Closure. Can You Answer Them?"
description: "Can you answer these 7 interview questions regarding the closure concept in JavaScript?"
published: "2021-02-09T12:00Z"
modified: "2021-02-09T12:00Z"
thumbnail: "./images/cover-3.jpg"
slug: javascript-closure-interview-questions
tags: ['javascript', 'closure', 'interview']
recommended: ['simple-explanation-of-javascript-closures', 'simple-but-tricky-javascript-interview-questions']
type: post
---

## Questions 1

Consider the following functions `clickHandler`, `immediate`, and `delayedReload`:

```javascript
let countClicks = 0;
button.addEventListener('click', function clickHandler() {
  countClicks++;
});
```

```javascript
(function immediate(number) {
  const message = `number is: ${number}`;
})(100);
```

```javascript
setTimeout(function delayedReload() {
  location.reload();
}, 1000);
```

Which of 3 these functions are closures and why?

## Questions 2

What will log to console the following code snippet:

```javascript
let count = 0;
(function () {
  if (count === 0) {
    let count = 1;
    console.log(count); // ???
  }
  console.log(count); // ???
})();
```

## Questions 3

What will log to console the following code snippet:

```javascript
(function(a) {
  return (function(b) {
    console.log(a); // ???
  })(1);
})(0);
```

## Questions 4

What will log to console the following code snippet:

```javascript
for (var i = 0; i < 3; i++) {
  setTimeout(function() {
    console.log(i); // ???
  }, 1000);
}
```

## Questions 5

What will log to console the following code snippet:

```javascript
function createIncrement() {
  let count = 0;
  function increment() { 
    count++;
  }

  let message = `Count is ${count}`;
  function log() {
    console.log(message); // ???
  }
  
  return [increment, log];
}

const [increment, log] = createIncrement();
increment(); 
increment(); 
increment(); 
log(); 
```

## Questions 6

Write a function `multiply()`:

```javascript
function multiply(number) {
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

## Questions 7

