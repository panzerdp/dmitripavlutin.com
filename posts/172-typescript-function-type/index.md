---
title: "TypeScript Function Types Explained"
description: "Are you struggling to understand TypeScript function types? Look no further! This comprehensive guide covers everything you need to know."
published: "2023-03-26"
modified: "2023-03-26"
thumbnail: "./images/typescript-function-types.png"
slug: typescript-function-type
tags: ['typescript', 'function']
type: post
---

Functions are the small pieces of logic that tied toghether form applications. If you write applications in TypeScript, you must know how to type your functions. Let's learn how to do that. 

<TableOfContents maxLevel={1} />

## 1. TypeScript function type

Functions in JavaScript/TypeScript are [first-class objects](https://developer.mozilla.org/en-US/docs/Glossary/First-class_Function). You can assign functions to variables, use functions as arguments to other functions, and even return functions.  

Knowning how to type functions in TypeScript is a must if you want to pass around functions as objects.  

Let's start with a simple case: a function that sums 2 numbers and returns the sum.  

Here's the function in plain JavaScript:

```javascript
// JavaScript
function sum(a, b) {
  return a + b
}
```

`sum` is a function returning the sum of its 2 arguments.  

In plain JavaScript, you know that `a` and `b` arguments have to be numbers, and the returned value also has to be a number.  

```javascript
// JavaScript
function sum(a, b) {
  return a + b
}

console.log(sum(4, 3)); // logs 7
```

In the above examples the arguments `4` and `3`, as well the returned value `7` are all *numbers*.  

Now, let's write the TypeScript function type of the `sum()`:

```typescript
(a: number, b: number) => number
```

`(a: number, b: number)` is the part that indicates the parameters and their types. Enumerate as many parameters as you want. After the fat arrow indicate the return type: `=> number`. That's it.  

(The function type looks very similar to an [arrow function](/6-ways-to-declare-javascript-functions/#4-arrow-function). But they are different things.)

Working with function types, because of their length, is usually more convinient by storing them into a [type alias](https://www.digitalocean.com/community/tutorials/typescript-type-alias#step-2-using-type-alias). The type alias allows to reuse the type in many places without repetition:

```typescript
// Sum is a type alias
type Sum = (a: number, b: number) => number
```

Having the `Sum` alias, you can use it to annotate any place where you want to pass a function object.  

First, of course, you can assign the function to a variable:

```typescript
type Sum = (a: number, b: number) => number

// Assign to variable
const sum1: Sum = function(a: number, b: number): number { return a + b } // OK
const sum2: Sum = function(a, b) { return a + b } // OK
```

In the example above `sum1`, as well as `sum2` are of type `Sum`. 

`sum2` function doesn't have the parameter and return type indicated: all because TypeScript [infers](https://www.typescriptlang.org/docs/handbook/type-inference.html) these types from the `Sum`. In the following examples I'm going to use type inference to avoid repetition.  

In case of an [higher-order function](/javascript-higher-order-functions/), you can assign the function as an argument or even return it from another function:

```typescript
type Sum = (a: number, b: number) => number

// Sum as argument
function someFunc1(func: Sum): void {
  func(1, 2)
}
someFunc1((a, b) => a + b) // OK

// Sum returned
function someFunc2(): Sum {
  return (a, b) => a + b
}
someFunc()(1, 2) // OK
```

## 2. TypeScript function type guide

To help you understand better how to use the function types, let's see a couple of guiding ideas.  

*1) Use `?` near the parameter name to indicate an optional parameter:*

```typescript
type SumOpt = (a: number, b?: number) => number

const sumOpt: SumOpt = function sum(a, b) {
  if (b === undefined) {
    return a
  }
  return a + b
}

sumOpt(2) // OK
```

`b` in the `SumOpt` type is an optional parameter.  

*2) A rest parameter is typed using the three dots and an array type `(...rest: T[])`:*

```typescript
type SumRest = (...numbers: number[]) => number

const sumRest: SumRest = function sum(...numbers) {
  return numbers.reduce((sum, number) => sum + number)
}
sumRest([1, 2]) // OK
```

`...numbers: number[]` inside of the function type indicates a rest parameter.  

*3) The regular and the arrow functions have the same type:*

```typescript
type Sum = (a: number, b: number) => number

const regularFunc: Sum = function(a, b) { return a + b } // OK
const arrowFunc: Sum   = (a, b) => a + b                 // OK
```
[Open the demo.](https://www.typescriptlang.org/play?#code/C4TwDgpgBAygrgWygXigCgIYC4oDtEBGEATgDRQE74JHECUKAfHoSQFBsDGA9rgM7AoxCAHM4AGwzEAYnFycc8JKgBmczsACWvTOQIMA3kIjA4xXFAxQA1BSgBfKAHonUAPIBpLrwGXixbgB3WXlFRBR0DD0GZGYrWwIoJOSU1JSXdw8gA)


`regularFunc` is a regular function and `arrowFunc` is an arrow function. Both are `Sum` type.  

*4) The parameters name in the function and its type can be different:*

```typescript
type Sum = (a: number, b: number) => number

const sumDiffParam: Sum = function(n1, n2) { return n1 + n2 } // OK
```

It's acceptable that the function type has the parameter names as `a` and `b` but the function parameters `n1` and `n2`.  

*5) The function can have less parameters than the function type:*

```typescript 
type Sum = (a: number, b: number) => number

const sumShort: Sum = function (a) { return a } // OK
const sumShorter: Sum = function () { return 0 }  // OK
```

`sumShort` and `sumShorter` have fewer parameters than the `Sum` type, still, they are `Sum` type.  

*6) The return type of an async function must be a promise `Promise<T>`:*

```typescript
type SumAsync = (a: number, b: number) => Promise<number>

const sumAsync: SumAsync = async function (a, b) { 
  return await a + b
} // OK
```

`sumAsync` is an async function. The return type of an async function must always be a [promise](/what-is-javascript-promise/), type `Promise<T>` (which is a [generic type](https://www.typescriptlang.org/docs/handbook/2/generics.html)).  

## 3. TypeScript method type

A [method](/javascript-method/) is a function that exists and is executed in the context of an object. Method types in TypeScript have to exist inside of the object type.  

You can define methods on interfaces: 

```typescript
interface ObjectWithMethod {
  sum(a: number, b: number): number
}
```

or even use a type alias:

```typescript
type ObjectWithMethod = {
  sum(a: number, b: number): number
}
```

`ObjectWithMethod` is a type of an object having a method `sum`. The first and second parameter types `(a: number, b: number)` are numbers, the return type is also a number `: number`.  

Remember an important difference. The function type uses the fat arrow `=>` to separate parameters list from the return type, while the method type uses the colon `:` (as seen in `sum()` method type above).  

Let's look at an example:

```typescript
interface ObjectWithMethod {
  sum(a: number, b: number): number
}

const object: ObjectWithMethod = {  // OK
  sum(a, b) { return a + b }
}
```

You can add as many method types as you need to an object type:

```typescript
interface ObjectWithMethod {
  sum(a: number, b: number): number
  product(a: number, b: number): number
  abs(a: number): number
  // etc...
}
```

## 4. TypeScript function interface

Another interesting way to write the function type is using the TypeScript function interface, also named function call signature. 

TypeScript function interface looks similar to a method type. The function interface just doesn't have the method name:  

```typescript
interface SumInterface {
  (a: number, b: number): number
}
```

`(a: number, b: number) => number` there is no function name indicated.  

The `sum()` function used until now have `SumInterface` type:

```typescript
interface SumInterface {
  (a: number, b: number): number
}

const sum: SumInterface = function(a, b) {
  return a + b
}
```

You can benefit from the function interface by adding properties to the function object, which is not possible using the standard function type describe above.  

Let's add the property `description` to the sum function type:

```typescript
interface SumWithDescription {
  (a: number, b: number): number
  description: string
}

const sum = function(a, b) {
  return a + b
}
sum.description = 'A function that sums two numbers'

const sumWithDescription: SumWithDescription = sum // OK
```

Not sure how often you need additional properties on functions objects, but, you can type this if you need.  

## 5. Conclusion

Writing a TypeScript function type is pretty simple:

```typescript
type Sum = (a: number, b: number) => number
```

Indicate the parameter types in a pair of parentheses, put the fat arrow `=>` followed by the return type.  

In case of methods, you have to define the method on the type of the object:

```typescript
interface ObjectWithMethod {
  sum(a: number, b: number): number
}
```

Again, put the parameters into a pair of parenetheses, then put a colon `:` and finally indicate the method return type.  

Now you should be ready to type the functions in your TypeScript code.  

How can you type a function that can be invoked in multiple ways? Follow the post [TypeScript Function Overloading](/typescript-function-overloading/) to find more information.  

*Have any questions about function types? Write a comment and let's discuss!*