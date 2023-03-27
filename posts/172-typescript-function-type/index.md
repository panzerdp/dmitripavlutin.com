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

Functions in JavaScript/TypeScript are [first-class objects](https://developer.mozilla.org/en-US/docs/Glossary/First-class_Function). You can assign functions to variables, use functions as arguments to other functions, or even return functions.  

Knowning how to type functions in TypeScript is a must if you want to pass around functions as objects.  

Let's start with a simple case: a function that sums 2 numbers and returns the sum.  

Here's how the function in plain JavaScript:

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

Let's write the TypeScript function type of the `sum()`:

```typescript
(a: number, b: number) => number
```

`(a: number, b: number)` is the part that indicates the parameters and their types. Enumerate as many parameters as you want. After the fat arrow indicate the return type: `=> number`.  

`type Sum = ...` is a [type alias](https://www.digitalocean.com/community/tutorials/typescript-type-alias#step-2-using-type-alias) in TypeScript. The type alias allows to reuse the type in many places without repetiing its definition.    

### 1.1 Guiding ideas

To help you understand better how to use the function types, let's see a couple of guiding ideas.  

*1) The regular and the arrow functions have the same type:*

```typescript
type Sum = (a: number, b: number) => number

const regularFunc: Sum = function(a, b) { return a + b } // OK
const arrowFunc: Sum   = (a, b) => a + b                 // OK
```
[Open the demo.](https://www.typescriptlang.org/play?#code/C4TwDgpgBAygrgWygXigCgIYC4oDtEBGEATgDRQE74JHECUKAfHoSQFBsDGA9rgM7AoxCAHM4AGwzEAYnFycc8JKgBmczsACWvTOQIMA3kIjA4xXFAxQA1BSgBfKAHonUAPIBpLrwGXixbgB3WXlFRBR0DD0GZGYrWwIoJOSU1JSXdw8gA)


`regularFunc` is a regular function and `arrowFunc` is an arrow function. Both are `Sum` type.  

*2) The parameters name in the function and its type can be different:*

```typescript
type Sum = (a: number, b: number) => number

const sum: Sum = function(n1, n2) { return n1 + n2 } // OK
```

It's acceptable that the function type has the parameter name as `a` and `b` but the function parameters to be `n1` and `n2`.  

*3) The function can have less parameters than the function type:*

```typescript 
type Sum = (a: number, b: number) => number

const sum2: Sum = function (a) { return a } // OK
const sum3: Sum = function () { return 0 }  // OK
```

`sum2` and `sum3` have fewer parameters than the `Sum` type, still, this is acceptable.  

*4) The return type of an async function must be a promise `Promise<T>`:*

```typescript
type SumAsync = (a: number, b: number) => Promise<number>

const sumAsync: SumAsync = async function (a, b) { 
  return await a + b
} // OK
```

`sumAsync` is an async function. The function type of an async function must always return a [promise](/what-is-javascript-promise/), which is denoted by `Promise<T>` [generic type](https://www.typescriptlang.org/docs/handbook/2/generics.html).  

### 1.2 The function type in practice

Having the `Sum` function type, you can use it to annotate any place you'd like to use a function as a regular value.  

First, of course, you can assign the function to a variable:

```typescript
type Sum = (a: number, b: number) => number

// Assign to variable
const sum: Sum = function(a, b) { return a + b }
```

In case of an [higher-order function](/javascript-higher-order-functions/), you can assign the function as an argument or even return a function:

```typescript
type Sum = (a: number, b: number) => number

// Add as argument to another function
function someFunc1(func: Sum): void {
  func(1, 2)
}
someFunc1((a, b) => a + b) // OK

// Return from a function
function someFunc2(): Sum {
  return (a, b) => a + b
}
someFunc()(1, 2) // OK
```

## 2. TypeScript method type

A [method](/javascript-method/) is a function that exists and is executed in the context of an object. That's why method in TypeScript also have to be typed in the same place as the object type.  

You can also define methods on interfaces: 

```typescript
interface ObjectWithMethod {
  sum(a: number, b: number): number
}
```

`ObjectWithMethod` is an interface that denotes an object that has a method named `sum`. The first and second parameter types of the `sum` method are numbers, and the return type is also a number.  

Please remember an important difference. The function type uses the fat arrow `=>` to separate parameters list from the return type, while the method type uses the colon `:` (as seen in `sum()` method type above).  

Let's look at an example:

```typescript
interface ObjectWithMethod {
  sum(a: number, b: number): number
}

const object: ObjectWithMethod = {  // OK
  sum(a, b) { return a + b }
}
```

You can add as many method types as you need in an object type:

```typescript
interface ObjectWithMethod {
  sum(a: number, b: number): number
  product(a: number, b: number): number
  abs(a: number): number
  // etc...
}
```

## 3. TypeScript function interface

Another interesting way to write the function type is using the TypeScript function interface, also named function call signature. 

TypeScript function interface looks similar to a method type, with the difference that the function interface doesn't have a function name:  

```typescript
interface SumInterface {
  (a: number, b: number): number
}
```

Note that near `(a: number, b: number) => number` there is no function name indicated.  

As expected, the regular sum function have `SumInterface` type:

```typescript
interface SumInterface {
  (a: number, b: number): number
}

const sum: SumInterface = function(a, b) {
  return a + b
}
```

You can benefit from the function interface by adding additional properties to the function object (which is not possible using the standard function type describe above).  

Let's a property `description` to the sum function:

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

## 4. Conclusion

In conclusion, here's what you've learned.  

The following literal is used to define a TypeScript function type:

```typescript
(param1: Type1, param2: Type2, /*..*/ paramN: TypeN) => ReturnType
```

In case of methods, you have to define the function on an interface:

```typescript
interface Object { 
  (param1: Type1, param2: Type2, /*..*/ paramN: TypeN): ReturnType
}
```

Follow the post [TypeScript Function Overloading](/typescript-function-overloading/) to understand how to define functions that can be invoked in multiple ways.  

*Do you prefer TypeScript function types or function interfaces?*