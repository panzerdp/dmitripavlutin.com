---
title: "What is a Pure Function in JavaScript"
description: "A pure function has the property of given the same arguments always returns the same value."
published: "2023-05-13"
modified: "2023-05-13"
thumbnail: "./images/cover-4.jpg"
slug: javascript-pure-function
tags: ['javascript', 'function']
type: post
---

A function is a reusable block of code that accepts arguments and returns a computed value. 

A *pure function* has the property of always returning the same value given the same arguments and produces no side-effect.  

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

`sum()` is a pure function because given the same number it always returns the same sum number. 

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

A side-effect is a change to some global state produced by a function. Examples of side-effects are:

* changing variables and object defined outside the function scope
* logging to console
* changing document title
* DOM manipulations
* making POST/PATCH/DELETE HTTP requests

If the `sum()` function logs to console, then the function is not pure because it produces a side-effect:

```javascript mark=3
function sumSideEffect(a, b) {
  const s = a + b
  console.log(s) // Side-effect!
  return s
}

console.log(sumSideEffect(1, 2)) 
```

`sum()` in such case produces a side-effect. It is not a pure function.  

The functions that are not pure are called *impure*. But before looking at the impure functions, let's see what are the benefits of pure functions.  

## 2. Pure function benefits

The main benefit of a pure function is its predictability: given the same arguments it always returns the same value.  

The pure function is also easy to test. All you have to do is supply the right arguments and verify the output:

```javascript
describe('sum()', () => {
  it('should return the sum of two numbers', () => {
    expect(sum(1, 2)).toBe(3)
  })
})
```

Because the pure function doesn't create side-effects, the test doesn't have to arreange and clean up the environment of the side-effect.  

The pure function that makes computationally expensive calculations can be easily memoized. That is possible because the single source of truth of a pure function is its arguments, thus arguments can be used as cache keys during memoization.

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



## 3. Impure functions

## 3. Conclusion