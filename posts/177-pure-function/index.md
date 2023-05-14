---
title: "Pure Functions in JavaScript: A Beginner's Guide"
description: "A pure function always returns the same value for the same arguments and produces no side-effects."
published: "2023-05-13"
modified: "2023-05-13"
thumbnail: "./images/cover-5.jpg"
slug: javascript-pure-function
tags: ['javascript', 'function']
type: post
---

A function is a reusable block of code that accepts arguments and returns a computed value. 

A *pure function* always returns the same value given the same arguments and produces no side-effects.   

Let's see in more detail what are pure functions and why they are useful.  

## 1. Pure functions

A function that returns the sum of 2 numbers is pure:  

```js
function sum(a, b) {
  return a + b
}

console.log(sum(1, 2)) // logs 3
console.log(sum(1, 2)) // logs 3

console.log(sum(5, 2)) // logs 7
console.log(sum(5, 2)) // logs 7
```

`sum()` is a pure function because given the same numbers it always returns the same sum. 

For example, `sum(1, 2)` always returns `3`, no matter how many times or where the function is called.  

![Pure function JavaScript](./diagrams/pure-8.svg)

Let's see some more examples of pure functions:

```javascript
// max of arguments
Math.max(1, 2, 3)

// nearest lowest integer
Math.floor(1.23)

// The multiplication of two numbers
function multiply(a, b) {
  return a * b
}

// Summarizing the array items
function sumOfArray(array) {
  return array.reduce((sum, item) => sum + item)
}

// Returning a constant value
function answer() {
  return 42
}

// Function that returns nothing (noop)
function noop() {
  // nothing
}
```

Now let's look at the second requirement of a pure function: do not produce a side-effect.  

A side-effect is an access or change to some global state or environment outside of the [function scope](/javascript-scope/#3-function-scope). Examples of side-effects are:

* changing variables and objects defined outside the function scope
* logging to console
* changing document title
* DOM manipulations
* making HTTP requests

If the `sum()` function logs to console, then the function is not pure because it produces a side-effect:

```javascript mark=3
function sumSideEffect(a, b) {
  const s = a + b
  console.log(s) // Side-effect!
  return s
}

console.log(sumSideEffect(1, 2)) 
```

`sumSideEffect()` produces a side-effect. It is not a pure function.  

Functions that are not pure are called *impure*. Before looking at the impure functions, let's see what are the benefits of pure functions.  

## 2. Pure function benefits

The main benefit of a pure function is *predictability*: given the same arguments it always returns the same value.  

The pure function is also *easy to test*. The test just has to supply the right arguments and verify the output:

```javascript
describe('sum()', () => {
  it('should return the sum of two numbers', () => {
    expect(sum(1, 2)).toBe(3)
  })
})
```

Because the pure function doesn't create side-effects, the test doesn't have to arreange and clean up the side-effect.  

The pure function that makes computationally expensive calculations can be easily *memoized*. That is possible because the single source of truth of a pure function is its arguments, thus arguments can be used as cache keys during memoization.

`factorial()` function is a pure function. Because factorial computation is expensive, you can improve the performance of the function by wrapping factorial into a `memoize()` wrapper:

```javascript
import memoize from 'lodash.memoize'

function factorial(n) {
  if (n === 0) {
    return 1
  }
  return n * factorial(n - 1)
}
const memoizedFactorial = memoize(factorial)

console.log(memoizedFactorial(10)) // logs 120
console.log(memoizedFactorial(10)) // logs 120
```

When calling the memoized factorial with argument `10`, the factorial function itself is going to be invoked and the result is memoized. Calling again the memoized factorial with the same `10` arguments returns the memoized value right away.  

Pure functions are easy to *compose*. Simple pure functions can be composed to create more complex functions.  

For example, you can use reuse the pure `sum()` function to calculate the sum of an array:

```js mark=6[21:24]
function sum(a, b) {
  return a + b
}

function sumOfArray(array) {
  return array.reduce(sum)
}

console.log(sumOfArray([2, 3])) // logs 5
```

Pure functions are the base of [functional programming](https://www.freecodecamp.org/news/functional-programming-in-javascript/) in JavaScript. I encourage you to explore the popular functional programming library [Ramda](https://ramdajs.com/), which uses extensively the composition of pure functions.  

## 3. Impure functions

A function that can return different values given the same arguments or makes a side-effect is named *impure function*.  

In other words, a function that is not pure is impure.  

A good example of an impure function is the built-in JavaScript random generator [Math.random()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random):

```javascript
console.log(Math.random()) // logs 0.8891108266488603
console.log(Math.random()) // logs 0.9590062769956789
```

`Math.random()`, given the same arguments (in this case no arguments at all), returns different numbers smaller than 1. This makes the function impure.  

![Impure function in JavaScript](./diagrams/impure-2.svg)

Here's another example of an impure function:

```javascript
let value = 0

function add(increase) {
  value += increase // Side-effect
  return value
}

console.log(increase(2)) // logs 2
console.log(increase(2)) // logs 4
```

`add()` function is impure because it produces a side-effect: modifies `value` variable accessed from the outer scope. The function also returns different values given the same arguments.  

Other examples of impure functions:

```javascript
const object = { a: 0 }
Object.assign(object, { b: 1 })

async function fetchEmployees() {
  const response = await fetch('https://example.com/employees/')
  return response.json()
}

function screenSmallerThan(pixels) {
  const { matches } = window.matchMedia(`(max-width: ${pixels})px`)
  return matches
}

function deleteById(id) {
  document.getElementById(id).remove()
}
```

These functions are impure because they access some global variables outside of the function: the network, the screen information and DOM.  

## 4. Dealing with impure functions

Impure functions have a higher [complexity](https://en.wikipedia.org/wiki/Programming_complexity) compared to pure functions. Complexity is added by the side-effect or by the access or modification of the global state.  

Either way, there's nothing wrong about the impure functions. They are necessary evil for the application to communicate with the external world.  

If you are lucky, some impure functions can be transformed from into pure by refactoring mutable operations to immutable.  

// Example

Another approach I have found efficient is to separate the pure from impure functions. Then make the impure functions call the pure functions. 

// Example

This gives the benefit of extracting the logic that is understandable and predictable into pure functions. And also decrease the complexity of the impure function since it would have less responsibility.  

## 5. Conclusion

A function is pure when given the same arguments it always returns the same value and makes no side-effects.  

Pure functions are easy to understand, easy to test, can be composed and memoized.  

*What other benefits of pure functions do you know?*