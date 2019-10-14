---
title: 7 Simple but Tricky JavaScript Interview Questions
description: A compiled list of simple but quite tricky question you might be asked during an interview.
published: '2019-10-15T13:00Z'
modified: '2019-10-15T13:00Z'
thumbnail: './images/people-at-interview.jpg'
slug: simple-but-tricky-javascript-interview-questions
tags: ['javascript']
recommended: ['the-path-of-software-development-craftsmanship', 'become-better-software-developer-digging-climbing']
type: post
commentsThreadId: simple-but-tricky-javascript-interview-questions
---

My personal top stressing things in software development are:

1. The coding interview
2. A toxic manager or teammate

If you're qualifying as Senior Developer that involves JavaScript, there's a good chance that you will be asked for tricky questions during the coding interview.

I know it's unfair. Some unkown people are throwing you to the edge of your knowledge to see what you're made of.  

![Job interview](./images/job-interview.png)

What can you do? *Prepare*. 

In this post, you will find 7 at first sight simple, but in essense tricky JavaScript interview questions.  

## 1. Accidental global variable

#### Question

What value is returned by `foo()` function:
```javascript
function foo() {
  let count1 = count2 = 0;
  count2++;
  return count2;
}

foo(); // => ???
```

#### Answer

## 2. Array length property

#### Question

What is the value of `items[0]`:

```javascript
const items = ['hat', 'socks', 't-shirt'];
items.length = 0;

items[0]; // => ???
```

## 3. Eagle eye test

#### Question

What is the content of `numbers` array:

```javascript
const length = 4;
const numbers = [];
for (let i = 0; i < length; i++);{
  numbers.push(i + 1);
}

numbers; // => ???
```

#### Answer

## 4. Automatic semicolon insertion

#### Question

What value is returned by `arrayFromValue()`?

```javascript
function arrayFromValue(item) {
  return
    [items];
}

arrayFromValue(10); // => ???
```

#### Answer

Follow [this section](/7-tips-to-handle-undefined-in-javascript/#24-function-return-value) to read more automatic semicolon insertion.

## 5. The classic JavaScript question

#### Question

What will output to the console the following script:
```javascript
for (var i = 0; i < 5; i++) {
  setTimeout(function() {
    console.log(i); // ???
  }, 0);
}
```

#### Answer

## 6. Floats sum

#### Question

What's the result of the equality check?

```javascript
0.1 + 0.2 === 0.3 // => ???
```

#### Answer

## 7. Hoisting

#### Question

What's the result of using `typeof`?

```javascript
typeof myVar;   // => ???
typeof myConst; // => ???

var myVar = 'value';
const myConst = 3.14;
```

#### Answer

## 8. Key takeaways


*What is your favorite tricky JavaScript question?*
