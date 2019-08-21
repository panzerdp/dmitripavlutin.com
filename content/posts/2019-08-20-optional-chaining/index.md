---
title: Why I like JavaScript Optional Chaining
description: Optional chaining accesses properties from deep of nested objects without boilerplate prop existence verification and intermediate variables.
published: "2019-08-20"
modified: "2019-08-20"
thumbnail: "./images/chain.jpg"
slug: javascript-optional-chaining
tags: ["javascript", "optional chaining", "nullish coalescing"]
recommended: ["5-interesting-uses-javascript-destructuring", "7-tips-to-handle-undefined-in-javascript"]
type: post
---

There are JavaScript features that vastly change the way you code. Starting ES2015 and beyond, the features that influenced my code are destructuring, arrow functions, classes, and modules system.  

As of August 2019, a new proposal [optional chaining](https://github.com/tc39/proposal-optional-chaining) reached stage 3 and is going to be a nice improvement. Optional chaining changes the way properties are accessed from deep objects structures. 

Let's see how optional chaining makes your code simpler by removes boilerplate conditionals and variables when deep accessing of potentially missing properties.  

## 1. The problem

Due to the dynamic nature of JavaScript, an object can have a very different nested structure of objects. 

Usually, you deal with such objects when:  

* Fetching remote JSON data
* Using configuration objects
* Having optional properties

While this gives flexibility for an object to hold different shapes of data, it comes with the price of increased complexity when accessing the properties of such objects.  

`bigObject` can have different set of properties on runtime:   

```javascript
// One version of bigObject
const bigObject = {
  // ...
  prop1: {
    //...
    prop2: {
      // ...
      value: 'Some value'
    }
  }
};

// Other version of bigObject
const bigObject = {
  // ...
  prop1: {
    // Nothing here   
  }
};
```

Thus you have to verify manually the properties existence:  

```javascript
// Later
if (bigObject && bigObject.prop1 != null && bigObject.prop1.prop2 != null) {
  let result = bigObject.prop1.prop2.value;
}
```

Let's see how optional chaining solves this problem, reducing boilerplate conditionals.    

## 2. Easy deep access of properties

Let's create an object that holds movie information. Only `title` property is required, while `director` and `actors` are optional.  

`movieSmall` object contains only the `title`, while `movieFull` contains the full set of properties:

```javascript
const movieSmall = {
  title: 'Heat'
};

const movieFull = {
  title: 'Blade Runner',
  director: { name: 'Ridley Scott' },
  actors: [{ name: 'Harrison Ford' }, { name: 'Rutger Hauer' }]
};
```

Let's write a function that gets the director's name. Remember that the `director` property might be missing:

```javascript{2}
function getDirector(movie) {
  if (movie.director != null) {
    return movie.director.name;
  }
}

getDirector(movieSmall); // => undefined
getDirector(movieFull);  // => 'Ridley Scott'
```

`if (movie.director) {...}` condition is used to verify whether the `director` property is defined. Without this precaution, in case of accessing `movieSmall` object's director, JavaScript would throw an error `TypeError: Cannot read property 'name' of undefined`.  

This is the right place to use the new optional chaining feature, and remove the `movie.director` existence verification. The new version of `getDirector()` looks much shorter:

```javascript{2}
function getDirector(movie) {
  return movie.director?.name;
}

getDirector(movieSmall); // => undefined
getDirector(movieFull);  // => 'Ridley Scott'
```

Inside the expression `movie.director?.name` you can find `?.`: the optional chaining operator.  

In the case of `movieSmall`, the property `director` is missing. As a result, `movie.director?.name` evaluates to `undefined`. The optional chaining operator prevents throwing `TypeError: Cannot read property 'name' of undefined`.  

Contrary, in the case of `movieFull`, the property `director` is available. `movie.director?.name` evaluates normally to `'Ridley Scott'`.

In simple words, the code snippet:  

```javascript
let name = movie.director?.name;
```

is equivalent to:

```javascript
let name;
if (movie.director != null) {
  name = movie.director.name;
}
```

`?.` simplifies `getDirector()` function by reducing 2 lines of code. That's why I like optional chaining.  

### 2.1 Array items

But the optional chaining feature can do more than that. You are free to use multiple optional chaining operators in the same expression. You can even use it to access array items safely!

The next task is to write a function that returns the leading actor name of a movie. 

Inside the movie object, the `actors` array can be empty or even missing, so you have to add additional conditionals:

```javascript{2}
function getLeadingActor(movie) {
  if (movie.actors && movie.actors.length > 0) {
    return movie.actors[0].name;
  }
}

getLeadingActor(movieSmall); // => undefined
getLeadingActor(movieFull);  // => 'Harrison Ford'
```

`if (movie.actors && movies.actors.length > 0) {...}` conditional is required to be sure that `movie` contains the `actors` property, and this property has at least one actor.  

With the use of optional chaining, this task is trivial to solve:

```javascript{2}
function getLeadingActor(movie) {
  return movie.actors?.[0]?.name;
}

getLeadingActor(movieSmall); // => undefined
getLeadingActor(movieFull);  // => 'Harrison Ford'
```

`actors?.` makes sure `actors` property exists. `[0]?.` makes sure that the first actor exists in the list.  

## 3. Default with nullish coalescing  

A new proposal named [nullish coalescing operator](https://github.com/tc39/proposal-nullish-coalescing) `??` handles `undefined` or `null`, defaulting them to a specific value.  

The expression `variable ?? defaultValue` results to `defaultValue` if the `variable` is `undefined` or `null`. Othewise the expression evaluates to `variable` value.  

```javascript
const noValue = undefined;
const value = 'Hello';

noValue ?? 'Nothing'; // => 'Nothing'
value   ?? 'Nothing'; // => 'Hello'
```

Nullish coalescing can improve the optional chaining to default to a specific value when the chain evaluates to `undefined`.   

For example, let's change `getLeading()` function to return `"Unknown actor"` when there are no actors in the movie object:  

```javascript{2}
function getLeadingActor(movie) {
  return movie.actors?.[0]?.name ?? 'Unknown actor';
}

getLeadingActor(movieSmall); // => 'Unknown actor'
getLeadingActor(movieFull);  // => 'Harrison Ford'
```

## 4. The 3 forms of optional chaining

You can use optional chaining in the following 3 forms.  

The first form `object?.property` is used to access a static property:

```javascript
const object = null;
object?.property; // => undefined
```

The second form `object?.[expression]` is used to access a dynamic property or an array item:

```javascript
const object = null;
const name = 'property';
object?.[name]; // => undefined
```

```javascript
const array = null;
array?.[0]; // => undefined
``` 

Finally, the third form `object?.([arg1, [arg2, ...]])` executes an object method:

```javascript
const object = null;
object?.method('Some value'); // => undefined
```

## 5. Short-circuiting: stopping on *null/undefined*  

What's interesting about the optional chaining operator is that as soon as a nullish value is encountered on its left-hand side `leftHandSide?.rightHandSide`, the evaluation of the right-hand side accessors stops. This is called short-circuiting.  

Let's look at an example:
```javascript
const nothing = null;
let index = 0;

nothing?.[index++]; // => undefined
index;              // => 0
```

`nothing` holds a nullish value, so the optional chaining evaluates to `undefined` right away, and skips the evaluation of the accessors on the right side. Because of that `index` number is not incremented.  

## 6. When to use optional chaining

Resist the urge to use optional chaining to access any property: that would lead to a misguided usage. 

### 6.1 Access properties of potentially nullish

`?.` must be used only near the properties that can potentially be `undefined` or `null`. In other cases, use the good-old property accessors: `.property` or `[expression]`.  

Recall the movie object. Looking at the expression `movie.director?.name`, because `director` can be `undefined`, it's correct to use the optional chaining operator near `director` property.  

Contrary, it doesn't make sense to use `?.` to access the movie title: `movie?.title`. The movie object is never going to be nullish.  

```javascript
// Good
function logMovie(movie) {
  console.log(movie.director?.name);
  console.log(movie.title);
}

// Bad
function logMovie(movie) {
  console.log(movie.director.name);// `director` requires optional chaining operator
  console.log(movie?.title);       // `movie` doesn't need optional chaining
}
```

### 6.2 Often there are better alternatives

The following function `hasPadding()` accepts a style object with an optional `padding` property. The `padding` have optional properties `left`, `top`, `right`, `bottom`.

Let's try to use the optional chaining for such a function:  

```javascript
function hasPadding({ padding }) {
  const top = padding?.top ?? 0;
  const right = padding?.right ?? 0;
  const bottom = padding?.bottom ?? 0;
  const left = padding?.left ?? 0;
  return left + top + right + bottom !== 0;
}

hasPadding({ color: 'black' });        // => false
hasPadding({ padding: { left: 0 } });  // => false
hasPadding({ padding: { right: 10 }}); // => true
```

While the function correctly determines if the element has padding, it's overwhelming to use the optional chaining for every property.  

A better approach is to use the object spread operator to default the padding object to zero values:  

```javascript
function hasPadding({ padding }) {
  const p = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...padding
  };
  return p.top + p.left + p.right + p.bottom !== 0;
}

hasPadding({ color: 'black' });        // => false
hasPadding({ padding: { left: 0 } });  // => false
hasPadding({ padding: { right: 10 }}); // => true
```

In my opinion, this version of `hasPadding()` is easier to read.  

## 7. Why do I like it?

I like the optional chaining operator because it allows accessing easily the properties from nested objects. It prevents writing boilerplate that verifies against nullish values on every property accessor from the accessor chain.  

You can have an even better result when optional chaining is combined with a nullish coalescing operator, to handle default values more easily.  

*What nice use cases of optional chaining do you know? Write a comment below!*  