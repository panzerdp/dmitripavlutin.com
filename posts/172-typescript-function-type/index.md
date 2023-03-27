---
title: "TypeScript Function Types Explained: Everything You Need to Know"
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

Knowing this, you can easily write the type of such a function:

```typescript
(a: number, b: number) => number
```

`(a: number, b: number)` is the part that indicates the parameters and their types. After the fat arrow indicate the return type: `=> number`.  

Having the `sum` function type, you can pass around the function as an object. You can assign the function to a variable, use it as an argument or return from another function:

```typescript
type Sum = (a: number, b: number) => number

// Assign to variable
const sum: Sum = function(a, b) { return a + b }

// Add as argument to another function
function someFunc1(func: Sum): void {
  func(1, 2)
}
someFunc1(sum) // OK

// Return from a function
function someFunc2(): Sum {
  return sum
}
```

`type Sum = ...` is a type alias in TypeScript, and it allows to reuse the type in many places.  

Here are some more examples of function types that you might commonly encounter:

```typescript
// a function without parameters
type NoParamsFunc = () => string

// a function returning nothing (void as return type)
type ReturnNothingFunc = (param: number) => void

// an async function returning a string (wrapped in a promise)
type AsyncFunc = (param: number) => Promise<string>

// a function with a rest parameter
type RestParamsFunc = (...rest: number[]) => number

// a function that returns another function
type HOCFunc = (param: number) => (param: number) => number
```

The parameter names in the function type and the function instance can be different:

```typescript
type Sum = (a: number, b: number) => number

const sum1 = (num1: number, num2: number) => num1 + num2

sum1 satisfies Sum // OK
```

The function `sum1` has parameters named `num1` and `num2`, while inside the `Sum` type the parameters are named `a` and corresponingly `b`. That's OK and `sum1` is still of type `Sum`.  

Moreover, you can use 1 or zero parameters in functions, and they'd still satisfy `Sum` type:

```typescript 
type Sum = (a: number, b: number) => number

const sum2 = (num1: number) => num1 + num2
const sum3 = () => 0

sum2 satisfies Sum // OK
sum3 satisfies Sum // OK
```

### 2.1 Useful common function types

## 2. TypeScript method type

A [method](/javascript-method/) is a function that exists and is executed in the context of an object. 

You can also define methods on interfaces: 

```typescript
interface SumMethod {
  sum(a: number, b: number): number
}
```

Write the method name, followed by the list of parameter types in partenetheses `(param1: Type2, param2: Type2)`, followed by a colon `:` and the method return type.  

```typescript
interface SumMethod {
  sum(a: number, b: number): number
}

const object = {
  sum(a: number, b: number): number {
    return a + b
  }
}

object satisfies SumMethod // OK
```

### 3.1 Useful common method types

```typescript
interface ObjectCommonMethods {
  // methods returning nothing (void as return type)
  voidReturnMethod(param: number): void

  // an async method (Promise<T> as return type)
  asyncMethod(param: number): Promise<string>

  // a method with a rest parameter (...rest: T[] as param type)
  restParamsMethod(...rest: number[]): number

  // a method that returns another function
  hocMethod(param: number): (param: number) => number
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
const sum = (a: number, b: number) => a + b

sum satisfies SumInterface // OK
```

You can benefit from the function interface by adding additional properties to the function object (which is not possible using the standard function type describe above).  

Let's a property `description` to the sum function:

```typescript
interface SumInterface {
  (a: number, b: number): number
  description: string
}

const sum = (a: number, b: number) => a + b
sum.description = 'A function that sums two numbers'

sum satisfies SumInterface // OK
```

## 4. Conclusion

`(param1: Type1, param2: Type2) => ReturnType` is the syntax of a TypeScript function type.  

`interface Object { method(param1: Type1, param2: Type2): ReturnType }` is how you define a method.  

Follow the post [TypeScript Function Overloading](/typescript-function-overloading/) to understand how to define functions that can be invoked in multiple ways.  

*Do you prefer TypeScript function types or function interfaces?*