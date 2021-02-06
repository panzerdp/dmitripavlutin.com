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

Write a function `createMultiplier()`:

```javascript
function createMultiplier(number) {
  // Write your code here...
}
```

that does the following:
```javascript

const double = createMultiplier(2);

double(5);  // => 10
double(11); // => 22
```

## Questions 2

What will log to console the following code snippet:

```javascript
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i) /* ??? */, 1000);
}
```

## Questions 3

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

## Questions 4

What will log to console the following code snippet:

```javascript
function createIncrement() {
  let count = 0;

  const increment = () => count++;

  let message = `Count is ${value}`;
  const log = () => console.log(message);
  
  return [increment, log];
}

const [increment, log] = createIncrement();
increment(); 
increment(); 
increment(); 
log();       // ???
```

## Questions 5
## Questions 6
## Questions 7

