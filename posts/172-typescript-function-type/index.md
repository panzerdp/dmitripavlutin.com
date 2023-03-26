---
title: "TypeScript Function Type: Let's Annotate Functions"
description: "How to use function type in TypeScript to annotate functions."
published: "2023-03-26"
modified: "2023-03-26"
thumbnail: "./images/v-model-form-input-cover-3.png"
slug: typescript-function-type
tags: ['typescript', 'function']
type: post
---

This post describes what you need to know about TypeScript function and methods types. 

Also you'll find listed some common function types like async functions, using rest parameters, and more.  

<TableOfContents maxLevel={1} />

## 1. TypeScript function type

When writing a regular function in TypeScript, you don't have to specify its type. TypeScript infers the function type from the definition.  

```typescript
const sum = (a: number, b: number) => a + b

typeof sum
// ^?
```

If that's your case: defining a simple function, you don't need to do anything else.  

Functions in TypeScript/JavaScript are [first-class citizens](https://developer.mozilla.org/en-US/docs/Glossary/First-class_Function). Which means that you can assign functions to variables, use functions as arguments to other functions, or even return functions.  

Here's how you can write the TypeScript function type for the `sum()` function:

```typescript
type Sum = (a: number, b: number) => number
```

A TypeScript function type is defined by a pair of parentheses with the parameters types `(param1: Type1, param2: Type2)`, followed by the fat `=>` arrow and the return type.  

Now let's check if the `sum()` function is `Sum` type:

```typescript
type Sum = (a: number, b: number) => number

const sum = (a: number, b: number) => a + b

sum satisfies Sum // OK
```

`sum satisfies Sum` doesn't trigger type errors, meaning that `sum` is a type of `Sum` (here's the [satisfies documentation](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-9.html#the-satisfies-operator) if you're not familiar with the operator).

The parameter names in the function type and the function instance can be different:

```typescript
type Sum = (a: number, b: number) => number

const sum1 = (num1: number, num2: number) => num1 + num2

sum1 satisfies Sum // OK
```

The function `sum1` has parameters named `num1` and `num2`, while inside the `Sum` type the parameters are named `a` and corresponingly `b`. That's OK and `sum1` is still of type `Sum`.  

Moreover, you can use only 1 or even no parameters in the functions, and they'd still satisfy `Sum` type:

```typescript 
type Sum = (a: number, b: number) => number

const sum2 = (num1: number) => num1 + num2
const sum3 = () => 0

sum2 satisfies Sum // OK
sum3 satisfies Sum // OK
```

### 2.1 Useful common function types

```typescript
// a function returning nothing (void as return type)
type VoidReturnFunc = (param: number) => void

// a function without parameters
type NoParamsFunc = () => string

// an async function (Promise<T> as return type)
type AsyncFunc = (param: number) => Promise<string>

// a function with a rest parameter (...rest: T[] as param type)
type RestParamsFunc = (...rest: number[]) => number

// a function that returns another function
type HOCFunc = (param: number) => (param: number) => number
```

## 2. TypeScript method type

You can also define methods on interfaces: 

```typescript
interface SumMethod {
  sum(a: number, b: number): number
}
```

Write the method name, followed by the list of parameter types in partenetheses `(param1: Type2, param2: Type2)`, followed by a colon `:` and the method return type.  

```typescript
const object = {
  sum(a: number, b: number): number {
    return a + b
  }
}
interface SumMethod {
  sum(a: number, b: number): number
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

Another interesting way to write the function type is by using the function interface, aka function call signature. 

I don't use it often, but it can be very useful if you want to add some additional properties to the function type or define multiple 

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

To be able to invoke the function in several ways, the function interface let's you define multiple call signatures.  

Let's make the `SumInterface` accept also functions that calculate the sum of an array of numbers

```typescript {2}
interface SumInterface {
  (a: number, b: number): number
  (array: numbers[]): number
}
```

The added call signature `(array: numbers[]): number` allows `SumInterface` to be called with an array of numbers as argument.  

```typescript
interface SumInterface {
  (a: number, b: number): number
  (array: numbers[]): number
}

const sum = (a: number, b: number) => a + b
const arraySum = (array: numbers) => array.reduce(sum, number => sum + number)

sum      satisfies SumInterface // OK
arraySum satisfies SumInterface // OK
```



## 4. Generic TypeScript function type



## 5. Conclusion

Follow the post [TypeScript Function Overloading](/typescript-function-overloading/) to understand how to define functions that can be invoked in multiple ways.  

*Do you prefer TypeScript function types or function interfaces?*