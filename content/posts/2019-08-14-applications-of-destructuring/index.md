---
title: 5 Interesting Uses of JavaScript Destructuring
description: A list of interseting and helpful applications of destructing assignments in JavaScript. 
published: "2019-08-15T13:15Z"
modified: "2019-08-14T13:51Z"
thumbnail: "./images/logs.jpg"
slug: 5-interesting-uses-javascript-destructuring
tags: ["javascript", "destructuring", "rest", "es2015"]
recommended: ["how-three-dots-changed-javascript", "object-rest-spread-properties-javascript"]
type: post
---

Looking at my regular JavaScript code, I see that destructuring assignments are everywhere.  

Reading object properties and accessing array items are frequent operations. The destructuring assignments make these operations so much easier and concise. 

In this post, I will describe 5 interesting uses of destructuring in JavaScript, beyond the basic usage. 

## 1. Swap variables

The usual way to swap 2 variables requires an additional temporary variable. Let's see a simple scenario: 
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

The destructuring assignment makes the variables swapping simple, without any need of a temporary variable:

```javascript{4}
let a = 1;
let b = 2;

[a, b] = [b, a];

a; // => 2
b; // => 1
```

`[a, b] = [b, a]` is a destructuring assignment. On the right side, an array is created `[b, a]`, that is `[2, 1]`. The first item of this array `2` is assigned to `a`, and the second item `1` is assigned to `b`. 

Although you still create a temporary array, swapping variables using destructuring assignment is more concise.  

This is not the limit. You can swap more than 2 variables at the same time. Let's try that:

```javascript{5}
let zero = 2;
let one = 1;
let two = 0;

[zero, one, two] = [two, one, zero];

zero; // => 0
one;  // => 1
two;  // => 2
```

You can swap as many variables as you want! Although, swapping 2 variables is the most common scenario. 

## 2. Access array item

You have an array of items that potentially can be empty. You want to access the first, second, or nth item of the array, but if the item does not exist, get a default value.  

Normally you would use the length property of the array:

```javascript
const colors = [];

let firstColor = 'white';
if (colors.length > 0) {
 firstColor = colors[0];
}

firstColor; // => 'white'
```

Fortunately, array destructuring helps you achieve the same way shorter:

```javascript{3}
const colors = [];

const [firstColor = 'white'] = colors;

firstColor; // => 'white'
```

`const [firstColor = 'white'] = colors` destructuring assigns to `firstColor` variable the first element of the `colors` array. If the array doesn't have any element at the index `0`, the `'white'` default value is assigned. 

But there's a lot more flexibility. If you want to access the second element only, that's possible too:

```javascript{3}
const colors = [];

const [, secondColor = 'black'] = colors;

secondColor; // => 'black'
```

Notice the comma on the left side of the destructuring: it means that the first element is ignored. `secondColor` is assigned with the element at index `1` from the `colors` array. 

## 3. Immutable operations

When I started using React, and later Redux, I was forced to write code that respects immutability. While having some difficulties at the start, later I saw its benefits: it's easier to deal with unidirectional data flow.  

Immutability forbids mutating objects. Fortunately, destructuring helps you achieve some operations in an immutable manner easily. 

The destructuring in combination with `...` [rest operator](/how-three-dots-changed-javascript/#42-array-destructure) removes elements from the beginning of an array:

```javascript{3}
const numbers = [1, 2, 3];

const [, ...fooNumbers] = numbers;

fooNumbers; // => [2, 3]
numbers; // => [1, 2, 3]
```

The destructuring `[, ...fooNumbers] = numbers` creates a new array `fooNumbers` that contains the items from `numbers` but the first one. 

`numbers` array is not mutated, keeping the operation immutable. 

In the same immutable manner you can delete properties from objects. Let's try to delete `foo` property from the object `big`:

```javascript{6}
const big = {
 foo: 'value Foo',
 bar: 'value Bar'
};

const { foo, ...small } = big;

small; // => { bar: 'value Bar' }
big; // => { foo: 'value Foo', bar: 'value Bar' }
```

The destructuring assignment in combination with [object rest operator](/object-rest-spread-properties-javascript/#3-object-rest-properties) creates a new object `small` with all properties from `big`, only without `foo`. 

## 4. Destructuring iterables

In the previous sections, the destructuring was applied to arrays. But you can any object that implements the [iterable protocol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterable_protocol). 

Many native primitive types and objects are iterable: arrays, strings, typed arrays, sets, and maps. 

For example, you can use destructuring to access the characters of a string:

```javascript
const str = 'cheese';

const [firstChar = ''] = str;

firstChar; // => 'c'
```

You're not limited to native types. You can create custom destructuring logic by implementing the iterable protocol.  

`movies` holds a list of movie objects. When destructuring `movies`, it would be great to get the movie title as a string. Let's implement a custom iterator: 

```javascript
const movies = {
  list: [
    { title: 'Heat' }, 
    { title: 'Interstellar' }
  ],
  [Symbol.iterator]() {
    let index = 0;
    return {
      next: () => {
        if (index < this.list.length) {
          const value = this.list[index++].title;
          return { value, done: false };
        }
        return { done: true };
      }
    };
  }
};

const [firstMovieTitle] = movies;
console.log(firstMovieTitle); // => 'Heat'
```

`movies` object implements the iterable protocol by defining the `Symbol.iterator` method. The iterator iterates over the titles of movies. 

Conforming to an iterable protocol allows the destructuring of `movies` object into titles, specifically by reading the title of the first movie: `const [firstMovieTitle] = movies`. 

The sky is the limit when using destructuring with iterators. 

## 5. Destructuring dynamic properties

In my experience, the destructuring of an object by properties happens more often than arrays destructuring.   

The destructuring of an object looks pretty simple:

```javascript
const movie = { title: 'Heat' };

const { title } = movie;

title; // => 'Heat'
```

`const { title } = movie` creates a variable `title` and assigns to it the value of property `movie.title`.

When first reading about objects destructuring, I was a bit surprised that you don't have to know the property name statically. You can destructure an object with a dynamic property name!

To see how dynamic destructuring works, let's write a greeting function:

```javascript{2}
function greet(obj, nameProp) {
 const { [nameProp]: name = 'Unknown' } = obj;
 return `Hello, ${name}!`;
}

greet({ name: 'Batman' }, 'name'); // => 'Hello, Batman!'
greet({ }, 'name'); // => 'Hello, Unknown!'
```

`greet()` function is called with 2 arguments: the object and the property name. 

Inside `greet()`, the destructuring assignment `const { [nameProp]: name = 'Unknown' } = obj` reads the dynamic property name using square brakets `[nameProp]`. The `name` variable receives the dynamic property value. 

Even better you can specify a default value `'Unknown'` in case if the property does not exist. 

## 6. Conclusion

Destructuring works great if you want to access object properties and array items. 

On top of the basic usage, array destructuring is convinient to swap variables, access array items, perform some immutable operations.

JavaScript offers even greater destructuring possibilities because you can define your destructuring logic using iterators. 

*What interesting applications of destructuring do you know? Write a comment below!* 