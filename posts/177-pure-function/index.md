---
title: "Pure Functions in JavaScript: A Beginner's Guide"
description: "A pure function always returns the same value for the same arguments and produces no side-effects."
published: "2023-05-15"
modified: "2023-05-15"
thumbnail: "./images/cover-8.jpg"
slug: javascript-pure-function
tags: ['javascript', 'function']
type: post
---

A function is a reusable block of code that accepts arguments and returns a computed value. 

A *pure function* always returns the same value given the same arguments and produces no side effects.   

Let's see in more detail what are pure functions and why they are useful.  

<Affiliate type="traversyJavaScript" />

<TableOfContents />

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

`sum()` is a pure function because, given the same numbers, it always returns the same sum. 

For example, `sum(1, 2)` always returns `3`, no matter how many times or where the function is called.  

![Pure function JavaScript](./diagrams/pure-9.svg)

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

Now let's look at the second requirement of a pure function: do not produce a side effect.  

A side effect is change to external state or environment outside of the [function scope](/javascript-scope/#3-function-scope). Examples of side effects are:

* changing variables and objects defined outside the function scope
* logging to console
* changing document title
* DOM manipulations
* making HTTP requests

If the `sum()` function logs to the console, then the function is not pure because it produces a side effect:

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

Because the pure function doesn't create side effects, the test doesn't have to arrange and clean up the side effect.  

The pure function that makes computationally expensive calculations can be *memoized*. Because the single source of truth of a pure function is its arguments they can be used as cache keys during [memoization](https://www.freecodecamp.org/news/memoization-in-javascript-and-react/#what-is-memoization).

`factorial()` function is a pure function. Because factorial computation is expensive, you can improve the performance of the function by wrapping factorial into a `memoize()` wrapper (see the [npm package](https://www.npmjs.com/package/lodash.memoize)):

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

When calling `memoizedFactorial(10)` the memoized factorial with argument `10`, the factorial function itself is going to be invoked and the result is memoized. 

Calling again the memoized factorial with the same `10` arguments returns the memoized value right away.  

![Pure Function are Memoized](./diagrams/pure-memoize-6.svg)

Pure functions are easy to *compose*. Simple pure functions can be composed to create more complex functions.  

For example, you can use reuse the pure `sum()` function to calculate the sum of an array:

```js mark=6[23:25]
function sum(a, b) {
  return a + b
}

function sumOfArray(array) {
  return array.reduce(sum)
}

console.log(sumOfArray([2, 3])) // logs 5
```

Pure functions are the base of [functional programming](https://www.freecodecamp.org/news/functional-programming-in-javascript/). I encourage you to explore the popular functional programming library [Ramda](https://ramdajs.com/), which uses extensively the composition of pure functions.  

## 3. Impure functions

A function that can return different values given the same arguments or makes side effects is named *impure function*.  

In practice, a function becomes impure when it reads or modifies an external state.  

A good example of an impure function is the built-in JavaScript random generator [Math.random()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random):

```javascript
console.log(Math.random()) // logs 0.8891108266488603
console.log(Math.random()) // logs 0.9590062769956789
```

`Math.random()`, given the same arguments (in this case no arguments at all), returns different numbers smaller than 1. This makes the function impure.  

![Impure function in JavaScript](./diagrams/impure-3.svg)

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

`add()` function is impure because it produces a side-effect: modifies `value` variable accessed from the outer scope. The function also returns different values for the same arguments.  

Other examples of impure functions:

```javascript
function addProperty(object) {
  // Mutates the parameter object (side-effect)
  Object.assign(object, { b: 1 })
}

function deleteById(id) {
  // Modifies DOM (side-effect)
  document.getElementById(id).remove()
}

async function fetchEmployees() {
  // Accesses the networks (external state)
  const response = await fetch('https://example.com/employees/')
  return response.json()
}

function screenSmallerThan(pixels) {
  // Accesses the browser page (external state)
  const { matches } = window.matchMedia(`(max-width: ${pixels})px`)
  return matches
}
```

These functions are impure because they make side effects like mutating the parameter or DOM and accessing external states like the network and the screen information.  

![Impure Function with Side Effect](./diagrams/impure-side-effect-3.svg)

## 4. Dealing with impure functions

Impure functions have a higher [complexity](https://en.wikipedia.org/wiki/Programming_complexity) compared to pure functions. Complexity is added by accessing external states or by side effects. 

Because of their higher comlexity impure functions are harder to test. You have to mock the external state or the side-effect to understand if the function works correctly.  

Either way, there's nothing wrong with the impure functions. They are a necessary evil for the application to communicate with the external world.  

If you are lucky, some impure functions can be transformed into pure by refactoring mutable operations to [immutable](https://medium.com/@nitish15p/immutable-object-and-array-operations-in-javascript-86047609532).  

The following function adds default properties to an object. The function is impure because the parameter `original` is mutated:

```javascript
function addDefaultsImpure(original, defaults) {
  return Object.assign(original, defaults)
}

const original = { a: 1 }
const result   = addDefaultsImpure(original, { b: 2 })

console.log(object) // logs { a: 1, b: 2 }
console.log(result) // logs { a: 1, b: 2 }
```

`Object.assign(object, defaults)` mutates `original` parameter by merging the properties of `defaults` object into it.

The problem with `addDefaultsImpure()` is the cognitive load: you have to *remember* that the argument object is mutated.  

Let's make the function pure by using an immutable merge operation:

```javascript
function addDefaultsPure(original, defaults) {
  return Object.assign({}, original, defaults)
}

const original = { a: 1 }
const result   = addDefaultsPure(original, { b: 2 })

console.log(original) // logs { a: 1 }
console.log(result)   // logs { a: 1, b: 2 }
```

`Object.assign({}, object, defaults)` doesn't alter neither `object` nor `defaults` object. It just creates a new object.  

`addDefaultsPure()` is now pure and has no side effects. 

Another approach I have found efficient is the extraction of big chunks of pure code from an impure function. Then make the impure function call the pure code.  

This gives the benefit of extracting logic that is understandable and predictable into a pure function. The complexity of the impure function also decreases since it has less code.  

## 5. Conclusion

A function is pure when given the same arguments it always returns the same value and makes no side effects.  

Pure functions are easy to understand, easy to test, and can be composed and memoized. Whenever possible, strive to create pure functions.  

Impure functions, on the other side, are functions that access external state or produce side effects. Impure functions let your application communicate with the external world.  

*What other benefits of pure functions do you know?*