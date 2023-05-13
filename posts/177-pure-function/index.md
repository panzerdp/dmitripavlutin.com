---
title: "What is a Pure Function in JavaScript"
description: "A pure function always returns the same value given the same arguments and produces no side-effects."
published: "2023-05-13"
modified: "2023-05-13"
thumbnail: "./images/cover-4.jpg"
slug: javascript-pure-function
tags: ['javascript', 'function']
type: post
---

A function is a reusable block of code that accepts arguments and returns a computed value. 

A *pure function* always returns the same value given the same arguments and produces no side-effects.  

Let's see in more details what are pure functions and why they are useful.  

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

Let's see some more examples of pure functions.

```javascript
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

A side-effect is a change or access to some global state. Examples of side-effects are:

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

The main benefit of a pure function is its *predictability*: given the same arguments it always returns the same value.  

The pure function is also *easy to test*. All you have to do is supply the right arguments and verify the output:

```javascript
describe('sum()', () => {
  it('should return the sum of two numbers', () => {
    expect(sum(1, 2)).toBe(3)
  })
})
```

Because the pure function doesn't create side-effects, the test doesn't have to arreange and clean up the environment of the side-effect.  

The pure function that makes computationally expensive calculations can be easily *memoized*. That is possible because the single source of truth of a pure function is its arguments, thus arguments can be used as cache keys during memoization.

`factorial()` function is a pure function. Because the computation of the factorial is expensive, you can improve the performance by wrapping factorial into a `memoize()` wrapper:
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

For example, you can use reuse the pure sum function in the function that calculates the sum of an array:

```js mark=6[21:24]
function sum(a, b) {
  return a + b
}

function sumOfArray(array) {
  return array.reduce(sum)
}

console.log(sumOfArray([2, 3])) // logs 5
```

Pure functions are at the base of [functional programming in JavaScript](https://www.freecodecamp.org/news/functional-programming-in-javascript/). I encourage you to explore the popular functional programming library [Ramda](https://ramdajs.com/) that uses extensively the composition of pure functions.  

## 3. Impure functions

A function that can return different values given the same arguments or makes a side effect is named *impure function*.  

In other words, if a function is not pure, then it is impure.  

A good example of an impure function is the built-in JavaScript random generator [Math.random()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random):

```javascript
console.log(Math.random()) // logs 0.8891108266488603
console.log(Math.random()) // logs 0.9590062769956789
```

`Math.random()`, given the same arguments (in this case no arguments at all), returns different numbers smaller than 1. This makes the function impure.  

Here's another example of impure function:

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



## 4. Conclusion