---
title: "Why for...of Loop in JavaScript is a Gem"
description: 'for...of cycle in JavaScript iterates over the items of an iterable.'
published: '2020-03-31T12:00Z'
modified: '2020-03-31T12:00Z'
thumbnail: './images/cover-2.png'
slug: javascript-for-of
tags: ['javascript', 'for']
recommended: ['foreach-iterate-array-javascript', 'how-to-iterate-easily-over-object-properties-in-javascript']
type: post
commentsThreadId: javascript-for-of
---

The `for...of` statement (starting ES2015) creates a loop that iterates over array items and generally any iterable objects.  

The best thing I like about `for...of` is the consize syntax:

```javascript{3}
const colors = ['blue', 'red'];

for (const color of colors) {
  console.log(color);
}
// 'blue'
// 'red'
```

The usability of `for...of` statement is not limited to short syntax to iterate array. 

Even better, `for...of` accepts any iterable. This property brings the possibilities to iterate over many object types, including the primitive string.  

## 1. Array iteration

As seen in the introduction, you can easily iterate over the items of an array using `for...of` statement:

```javascript{3}
const essentials = ['toilet paper', 'sanitizer'];

for (const essential of essentials) {
  console.log(essential);
}
// 'toilet paper'
// 'sanitizer'
```

`for...of` cycle iterates over every item of the `essentials`. At each cycle, the iterated item is assigned to the variable `essential`.  

### 1.1 In place item destructuring

The syntax of `for...of` cycle is:

```javascript
for (LeftHandSideExpression of Expression) {
  // statements
}
```

`LeftHandSideExpression` expression can be replaced with anything that stands on the left side of an assignment expression. In the previous example, 
it was `const essential`, but more can be done.

What I enjoy is the ability of `for...of` to destructure the iterated item in place.

For example, let's iterate over an array of objects, and destructure the iterated object in place:

```javascript{6}
const persons = [
  { name: 'John Smith' },
  { name: 'Jane Doe' }
];

for (const { name } of persons) {
  console.log(name);
}
// 'John Smith'
// 'Jane Doe'
```

The cycle `for (const { name } of persons)` iterates the items of `persons` array, but also destructures the iterated item in place `{ name }`.  

## 2. Array-like iteration

`for...of`, in addition to iterables, also accepts [array-like objects](https://2ality.com/2013/05/quirk-array-like-objects.html).  

`arguments` special variable, inside a function body, contains all the arguments of the function. And this is a classic example of an array-like object.  

Let's iterate over the items of `arguments` using `for...of` cycle:

```javascript{3}
function sum() {
  let sum = 0;
  for (const number of arguments) {
    sum += number;
  }
  return sum;
}

sum(1, 2, 3); // => 6
```

At each iteration, the `for...of` cycle iterates over each item of `arguments`, and calculates the sum.  

## 3. String characters iteration

The string primitive in JavaScript is iterable. Thus, you could easily iterate over the characters of a string.  

```javascript{3}
const message = 'hello';

for (const character of message) {
  console.log(character);
}
// 'h'
// 'e'
// 'l'
// 'l'
// 'o'
```

`message` contains a string value. Because `message` is also an iterable, the `for...of` cycle iterates over the characters of `message`.  

## 4. Map key/value pairs iteration

`Map` is a special object that lets you associate key to value pairs, where the key can be of any primitive type (usually strings, but could be numbers, etc).  

Because `Map` object is also an iterable (which iterates over the key/value pairs), it can be used with `for...of`.  

Let's try that:

```javascript{5}
const names = new Map();
names.set(1, 'one');
names.set(2, 'two');

for (const [number, name] of names) {
  console.log(number, name);
}
// logs 1, 'one'
// logs 2, 'two'
```

`for (const [number, name] of names)` iterates over the key/value pairs of `names` map.  

On each cycle the iterable returns an array `[key, value]`, and this pair is destructured right away using `const [number, name]`.

## 5. Iterate plain JavaScript objects

I always felt some pain when trying to iterate the property/value pairs of plain JavaScript objects.  

Usually, there are 2 possibilities: using `for...in` cycle, or something functional like `Object.keys()`.

```javascript
const person = {
  name: 'John Smith',
  job: 'agent'
};

Object.keys(person, prop => {
  console.log(prop, person[prop]);
});
// 'name', 'John Smith'
// 'job', 'agent'
```

Fortunately, using the new `Object.entries()` function in combination with `for...of` offers a good alternative:

```javascript
const person = {
  name: 'John Smith',
  job: 'agent'
};

for (const [prop, value] of Object.entries(person)) {
  console.log(prop, value);
}
// 'name', 'John Smith'
// 'job', 'agent'
```

`Object.entries(person)` returnes an array where of tuples consisting of key and value of each property: `[['name', 'John Smith'], ['job', 'agent']]`.  

Then the `for...of` cycle iterates over the tuples, and destructures each tuple into `const [prop, value]`.  

## 6. Iterate DOM collections

When working directly with the [DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction), you might know how [frustrating](https://stackoverflow.com/q/35969974/1894471) it is to work with [HTMLCollection](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCollection). All because `HTMLCollection` is an array-like object (instead of a regular array), so you don't have access to regular array methods.  

For example, the `children` property of every DOM element is an `HTMLCollection`. So, since `for...of` can iterate also over array-like objects, you can can iterate the children with ease:

```javascript
const children = document.body.children;

for (const child of children) {
  console.log(child); // logs each child of <body>
}
```

Moreover, `for...of` can iterate over `NodeList` collections (which are iterables). For example, the function `document.querySelectorAll(query)` returns a `NodeList`:

```javascript
const allImages = document.querySelectorAll('img');

for (const image of allImages) {
  console.log(image); // log each image in the document
}
```

In other words, if you'd like to iterate over different kinds of collections in DOM, `for...of` statement is a good option.  

## 7. Performance

When iterating large arrays, `for...of` might perform slower than classic `for`:

```javascript
const a = [/* big array */];
for (let i = 0; i < a.length; i++) { 
  console.log(a[i]);
}
```

Calling the iterator at each iteration is more expensive than by accessing the item by an increasing index. 

This detail is important in applications operating with large arrays and where the performance is critical.

## 7. Conclusion

`for...of` is a gem because it can has the following properties:

1. It's concise
2. It iterates iterables
3. It iterates array-like objects
4. You can apply destructuring on the iterated item

`for...of` iterates arrays, maps, sets, plain objects (with the addition of `Object.entries()`), and DOM collections.  

*Would you iterate an array using `array.forEach()` or `for..of` statement?*