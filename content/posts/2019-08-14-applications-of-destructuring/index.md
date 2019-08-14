---
title: 5 Interesting Uses of JavaScript Destructuring
description: A list of interseting and uncommon use cases of destructing assignments in JavaScript.  
published: "2019-08-14T13:00Z"
modified: "2019-08-14T13:00Z"
thumbnail: "./images/logs.jpg"
slug: 5-interesting-uses-javascript-destructuring
tags: ["javascript", "destructuring", "es2015"]
recommended: ["how-three-dots-changed-javascript", "object-rest-spread-properties-javascript"]
type: post
---

Looking at my regular JavaScript code, I see that one of the most used feature is destructuring. 

It happens because reading object properties and accessing array items are frequent operations. The destructuring assignments make these operation so much easier and concise.  

In this post I will describe 5 interesting uses of destructuring in JavaScript, beyond the basic usage.  

## 1. Swap variables

To swap to variables values the usual way requires an additional temporary holder variable. 

Let's see a simple scenario:  
```javascript
let a = 1;
let b = 2;
let temp;

temp = a;
a = b;
b = temp;

a; // => 2
b; // => 1
```

`temp` is a temporary variable that holds the value of `a`. Then `a` is assigned with the value of `b`, and consequently `b` is assigned with `temp`.  

The destructuring assignment makes the variables swapping really simple, without any need of temporary variable:

```javascript{4}
let a = 1;
let b = 2;

[a, b] = [b, a];

a; // => 2
b; // => 1
```

`[a, b] = [b, a]` is a destructuring assignment. On the right side an array is created `[b, a]`, that is `[2, 1]`. The first item of this array `2` is assigned to `a`, and the second item `1` is assigned to `b`.  

As seen in the example, swaping variables using destructuring assignment is short and expressive. 

What's more interesting that is swapping more than 2 variables at the same time. Let's try that:

```javascript{5}
let zero = 2;
let one = 1;
let two = 0;

[zero, one, two] = [two, one, zero];

zero; // => 0
one;  // => 1
two;  // => 2
```

You can swap as many variables as you want. However, the most used case is swapping 2 variables.  

## 2. Access nth array item

You have an array of items that potentially can be empty. You want to access the first, second, or nth item of the array, but if the item does not exist, simply default to a value.  

Normally you would use the length property of the array:

```javascript
const colors = [];

let firstColor = 'white';
if (colors.length > 0) {
  firstColor = colors[0];
}

firstColor; // => 'white'
```

Fortunately, array destructuring helps you achieve the same in a way shorter way:

```javascript{3}
const colors = [];

const [firstColor = 'white'] = colors;

firstColor; // => 'white'
```

`const [firstColor = 'white'] = colors` destructuring assigns to `firstColor` variable the first element of the `colors` array. If the array doesn't have any element at the index `0`, the `'white'` default value is assigned.  

But there's a lot more flexibility. If you want to access the second element only, while assigning the same a default value, that's possible too:

```javascript{3}
const colors = [];

const [, secondColor = 'black'] = colors;

secondColor; // => 'black'
```

Notice the comma on the left side of the destructuring: it means that the first element is ignored. `secondColor` is assigned with the element at index `1` from the `colors` array.  

## 3. Immutable pop

When I started using React, and later Redux, I was forced to write code that respects immutability. I immediately saw the benefits: it's easier to grasp the data flow inside the application.  

To favor immutability, you cannot mutate objects. Fortunately, destructuring helps you achieve immutable operations easily.  

A classic example is the pop operation on the array. The simplest way to achieve this is to use the `.pop()` array method:

```javascript{3}
const numbers = [1, 2, 3];

numbers.pop();

numbers; // => [2, 3]
```
The problem is that `.pop()` method mutates the array.  

It's possible to achieve the same, but in an immutable manner by using the destructuring in combintation with `...` rest operator:

```javascript{3}
const numbers = [1, 2, 3];

const [, ...fooNumbers] = numbers;

fooNumbers; // => [2, 3]
numbers;    // => [1, 2, 3]
```

The destructuring `[, ...fooNumbers] = numbers` creates a new array `fooNumbers` that have all the items from `numbers`, expect the first one.  

At the same time, `numbers` array is not mutated.  

## 4. Destructuring iterables

In the previous sections the destructuring was applied to arrays. That's only a particular case, because you can apply destructuring to any object that implements [the iterable protocol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterable_protocol).  

Many native primitive types and objects are iterable: arrays, strings, typed arrays, sets and maps.  

For example, you can use destructuring to access the characters of a string:

```javascript
const str = 'cheese';

const [firstChar] = str;

firstChar; // => 'c'
```

// Add example with iterable protocol implementation

## 5. Destructuring dynamic properties

In my experience, the destructuring of object by properties happens more often than destructuring of arrays.  

The destructuring of an object looks pretty simple:

```javascript
const movie = { title: 'Heat' };

const { title } = movie;

title; // => 'Heat'
```

`const { title } = movie` creates a variable `title` and assigns to it the value of property `movie.title`.

When first reading about destructuring of object, I was a bit surprised that you don't have to know the object property name statically. You can destructure an object with a dynamic property name!

Let's write a greeting function:

```javascript{2}
function greet(obj, nameProp) {
  const { [nameProp]: name = 'Unknown' } = obj;
  return `Hello, ${name}!`;
}

greet({ name: 'Batman' }, 'name'); // => 'Hello, Batman!'
greet({ }, 'name'));               // => 'Hello, Unknown!'
```

`greet()` function is called with 2 arguments: the object and the property name.  

Inside `greet()`, the destructuring assignment `const { [nameProp]: name = 'Unknown' } = obj` reads the dynamic property name using square brakets `[nameProp]`. The `name` variable receives the dynamic property value.  

Even better you can specify a default value `'Unknown'` in case if the property does not exist. 

## 6. Conclusion

Destructuring works really great if you want to access object properties and array items. 

On top of the basic usage, array destructuring offers way more flexibility to achieve goals like swapping variables, accessing array items, implement immutable operations like pop an array item.  

Destructuring offers even greater possibilites when using iterable protocols.  

When it comes to destructuring objects, you can even read dynamic properties.  

*What interesting applications of destructuring do you know? Write a comment below!*   