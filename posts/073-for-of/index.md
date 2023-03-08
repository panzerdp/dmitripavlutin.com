---
title: 'Why for...of Loop in JavaScript is a Gem'
description: 'for...of cycle in JavaScript iterates arrays, maps, sets, array-like objects, iterables, plus supports in-place destructuring.'
published: '2020-03-25T13:40Z'
modified: '2020-03-25T13:40Z'
thumbnail: './images/cover-4.png'
slug: javascript-for-of
tags: ['javascript', 'for']
recommended: ['foreach-iterate-array-javascript', 'how-to-iterate-easily-over-object-properties-in-javascript']
type: post
---

What makes a programming language feature great? When the feature can combine multiple other language features.  

This is the case of `for...of` statement in JavaScript, which is available starting ES2015.   

`for...of` iterates arrays, array-like objects, and generally any iterable (maps, sets, DOM collections). You can destructure the iterated item in place. 
On top of that, `for...of` has a short syntax.  

In this post, I will demonstrate the useful possibilities of `for...of`.  

<Affiliate type="traversyJavaScript" />

## 1. Array iteration

The most common application of `for...of` is iteration over the items of an array. The cycle does it nicely and shortly, without the need of
additional variables to keep an index.   

For example:

```javascript{2}
const products = ['oranges', 'apples'];

for (const product of products) {
  console.log(product);
}
// 'oranges'
// 'apples'
```

`for...of` cycle iterates over every item of `products`. The iterated item is assigned to the variable `product`.  

The array method [entries()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/entries) can be used to access the index of the iterated item. The method returns at each iteration a pair of `[index, item]`.  

Let's access both the index and item at iteration each cycle:

```javascript{2}
const products = ['oranges', 'apples'];

for (const [index, product] of products.entries()) {
  console.log(index, product);
}
// 0, 'oranges'
// 1, 'apples'
```

At each iteration `products.entries()` returns a pair of index and value, which is destructured by `const [index, product]` expression.  

The in-place destructuring is another great feature of `for...of`, and let's check it in more detail in the next section.  

### 1.1 In-place destructuring

First, let's look at the syntax of `for...of` cycle:

```javascript
for (LeftHandSideExpression of Expression) {
  // statements
}
```

`LeftHandSideExpression` expression can be replaced with anything that stands on the left side of an assignment expression.  

In the previous examples, `LeftHandSideExpression` was a variable declaration `const products` and even a destructuring `const [index, product]`.  

So, the syntax of `for...of` enables the destructuring of the iterated item.  

Let's iterate over an array of objects, extracting the property `name` of each one:

```javascript{5}
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

The cycle `for (const { name } of persons)` iterates the objects of `persons` array, but also destructures the person object in place `{ name }`.  

## 2. Array-like iteration

`for...of`, in addition to iterables, also accepts [array-like objects](https://2ality.com/2013/05/quirk-array-like-objects.html).  

`arguments` special variable, inside a function body, contains all the arguments of the function. And this is a classic example of an array-like object.  

Let's write a function `sum(num1, num2, ..., numN)` that sums all its arguments:

```javascript{2}
function sum() {
  let sum = 0;
  for (const number of arguments) {
    sum += number;
  }
  return sum;
}

sum(1, 2, 3); // => 6
```

At each iteration, the `for...of` cycles over each number of array-like object `arguments`, calculating the sum.  

## 3. A quick overview of iterables

What is an iterable object in JavaScript? It's an object that supports the [iterable protocol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#iterable).  

To check whether a data type is iterable look at the method `Symbol.iterator`. For example, here's a demo showing that the array is iterable:

```javascript
const array = [1, 2, 3];
const iterator1 = array[Symbol.iterator]();
iterator1.next(); // => { value: 1, done: false }
```

If you'd like to know more, feel free to follow my [explanation of iterables](https://dmitripavlutin.com/how-three-dots-changed-javascript/#5-spread-operator-and-iteration-protocols).  

`for...of` accepts iterables. This is great because now you can iterate over types (strings) and data structures (arrays, typed arrays, sets, maps), while still enjoying the simplicity and conciseness of `for...of`.  

## 4. String characters iteration

The string primitive in JavaScript is iterable. Thus, you could easily iterate over the characters of a string.  

```javascript{2}
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

## 5. Maps and Sets iteration

[Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) is a special object that lets you associate a key to a value. The key can be of any primitive type (usually strings, but could be numbers, etc).  

Fortunately, `Map` is also an iterable (which iterates over the key/value pairs) and `for...of` can easily cycle over all key/value pairs.  

Let's try that:

```javascript{4}
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

Same way you can loop through the items of a [Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set):

```javascript
const colors = new Set(['white', 'blue', 'red', 'white']);

for (color of colors) {
  console.log(color);
}
// 'white'
// 'blue'
// 'red'
```

## 6. Iterate plain JavaScript objects

Trying to iterate the property/value pairs of plain JavaScript objects was always a pain.  

Usually, I had been extracting the object keys using [Object.keys()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys), then use `forEach()` to iterate the array of keys:

```javascript
const person = {
  name: 'John Smith',
  job: 'agent'
};

Object.keys(person).forEach(prop => {
  console.log(prop, person[prop]);
});
// 'name', 'John Smith'
// 'job', 'agent'
```

Fortunately, the new [Object.entries()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries) function in combination with `for...of` offers a good alternative:

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

`Object.entries(person)` returnes an array of key and value tuples: `[['name', 'John Smith'], ['job', 'agent']]`. Then `for...of` cycle iterates over the tuples, and destructures each tuple into `const [prop, value]`.  

## 7. Iterate DOM collections

You might know how [frustrating](https://stackoverflow.com/q/35969974/1894471) could be to work with [HTMLCollection](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCollection) in DOM. All because `HTMLCollection` is an array-like object (instead of a regular array), so you don't have access to regular array methods.  

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

If you'd like to iterate over different kinds of collections in DOM, `for...of` statement is a good option.  

## 8. Performance

When iterating large arrays, `for...of` might perform slower than classic `for`:

```javascript
const a = [/* big array */];
for (let i = 0; i < a.length; i++) {
  console.log(a[i]);
}
```

Calling the iterator at each iteration is more expensive than accessing the item by an increasing index. However, this nuance is important in applications operating with large arrays and where the performance is critical, which happens rarely.  

## 9. Conclusion

`for...of` is a gem because:

1. It's concise
2. It accepts iterables, including arrays, strings, maps, sets, DOM collections
3. It accepts array-like objects
4. The iterated item can be destructured in-place.

*What is your preferred way to iterate array items?* 😎