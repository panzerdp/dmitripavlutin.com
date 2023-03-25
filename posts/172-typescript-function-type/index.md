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

## 1. TypeScript function type

When you write a regular function in TypeScript, you don't have to specify its type. TypeScript infers the function type from the definition.  

```typescript
const sum = (a: number, b: number) => a + b

typeof sum
// ^?
```

If that's your case: defining a simple function, you don't need to do anything else.  

When working with functions as first-class citizens (like regular objects), or you're dealing with higher-order functions (functions that accepts as argument or return other functions) you need to explicitely define the types of functions.  

Here's how you can write the TypeScript function type for the `sum()` function:

```typescript
type Sum = (a: number, b: number) => number
```

Start with a pair of parentheses where you indicate the parameters types, folowed by the fat `=>` arrow and the return type.  

Now let's check if the actual sum function satisfies the `Sum` type:

```typescript 
const sum = (a: number, b: number) => a + b

sum satisfies Sum // OK
```



The parameter names inside of the function type and the actual function do not have to be the same:  

```typescript 
const sum1 = (num1: number, num2: number) => num1 + num2

sum1 satisfies Sum // OK
```

In the example above the function has parameters named `num1` and `num2`, while inside the `Sum` type the parameters are named `a` and corresponingly `b`. That OK and `sum1` stil satisfies the type `Sum`.  

Moreover, you can use only 1 or even no parameters in the functions, and they'd still satisfy `Sum` type:

```typescript 
const sum2 = (num1: number) => num1 + num2
const sum3 = () => 0

sum2 satisfies Sum // OK
sum3 satisfies Sum // OK
```

### 2.1 Useful common function types

```typescript
// a function returning nothing (void as return type)
type VoidReturn = (param: number) => void

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
interface ObjectWithMethod {
  sum(a: number, b: number): number
}
```

Write the method name, followed by the list of parameter types in partenetheses `(param1: Type2, param2: Type2)`, and an optional colon `:` folowed by the method return type.  

If you omit the colon and return type `method(): ReturnType`, then TypeScript assumes a `void` type is returned.  

```typescript
interface Logger {
  log(message: string)
  // same as
  // log(message: string): void
}
```

### 3.1 Useful common method types

```typescript
interface ObjectCommonMethods {
  // methods returning nothing (void as return type)
  voidReturnMethod1(param: number): void
  voidReturnMethod2(param: number)

  // an async method (Promise<T> as return type)
  asyncMethod(param: number): Promise<string>

  // a method with a rest parameter (...rest: T[] as param type)
  restParamsMethod(...rest: number[]): number

  // a method that returns another function
  hocMethod(param: number): (param: number) => number
}
```

## 3. TypeScript function interface

Another interesting way to write the function type is by using the function interface. I don't use often, but it can be very useful if you want to add some additional properties to the function type.  

The TypeScript function interface looks almost the same like a method type, only that you do not indicate any name before the parentheses:  

```typescript
interface Sum {
  (n1: number, n2: number) => number
}

((a: number, b: number) => n1 + n2) satisfies Sum // OK
```

The name of the function is missing near the paranthesis. This is important otherwise you're defining a method.  


## 4. Conclusion

To know more about function type subtyping, I recommend checking my post 