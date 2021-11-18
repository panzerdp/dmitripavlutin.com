---
title: "A Simple Explanation of Function Overloading in TypeScript"
description: "How you can define multiple signatures of the same function in TypeScript to increase its usability."
published: "2021-11-17T12:00Z"
modified: "2021-11-17T12:00Z"
thumbnail: "./images/cover-4.png"
slug: typescript-function-overloading
tags: ['typescript', 'function']
recommended: ['typescript-unknown-vs-any', 'typescript-covariance-contravariance']
type: post
---

Most of the functions accept a fixed set of arguments. However, there are functions that accept a variable number of arguments, as well arguments
of different types.  

To be able to comfortable type the functions that accept variable arguments, TypeScript offers the function overloading feature. 

Let's see how function overloading works.  

## 1. Updating the function signature

Let's consider a function that returns welcome message to a particular person:

```twoslash include greet
function greet(person: string): string {
  return `Hello, ${person}!`;
}
```

```ts twoslash
// @include: greet
```

The function above accepts 2 arguments of type `string`: the name of the person and the greeting message.  

The usage of the function is pretty straingforward:

```ts twoslash
// @include: greet
// ---cut---
greet('World'); // 'Hello, World!'
```

What if you'd like to make the `greet()` function more flexible. For example, improve it more to accept a list of persons and welcome messages, too.  

How to type such a function? There are 2 approaches.  

The first approach is straighforward and involves modifying the function signature directly by updating the parameter types.  

```twoslash include greet-signature
function greet(person: string | string[]): string | string[] {
  if (typeof person === 'string') {
    return `Hello, ${person}!`;
  } else if (Array.isArray(person)) {
    return person.map(name => `Hello, ${name}!`);
  }
  throw new Error('Unable to greet');
}
```

Here's how `greet()` looks after updating the parameter types:

```ts twoslash
// ---cut---
// @include: greet-signature
```

Now you can invoke `greet()` using arguments using the new types of arguments:

```ts twoslash
// @include: greet-signature
// ---cut---
greet('World');          // 'Hello, World!'
greet(['Jane', 'Joe']);  // ['Hello, Jane!', 'Hello, Joe!']
```

The approach to modify the function signature directly is the usual way. You should try to keep the possible types of parameters included in the function signature.  

However, there are situations when you might want to take an alternative approach and define separately all the ways your function can be invoked: use so called function overloading.  

## 2. The function overloading

The second approach is to use the *function overloading* feature. I recommend it when the function signature is relatively complex and has multiple types involed.  

Putting the function overloading in practice requires defining the so called *overload signatures* and an *implementation signature*.  

The overload signature defines the parameter types and the return type of the function, and has no body. Usually you have multiple overload signatures that describe the different ways your function can be used.  

The implementation signature, on the other side, also has the parameter types and return type, but also a body that implements the function. There can be only one implementation signature.  

Let's transform the function `greet()` to use the function overloading:

```twoslash include greet-overloading
// Overload signatures
function greet(person: string): string;
function greet(persons: string[]): string[];

// Implementation signature
function greet(person: unknown): unknown {
  if (typeof person === 'string') {
    return `Hello, ${person}!`;
  } else if (Array.isArray(person)) {
    return person.map(name => `Hello, ${name}!`);
  }
  throw new Error('Unable to greet');
}
```

```ts twoslash
// @include: greet-overloading
```

The `greet()` function has 2 overload signatures and one implementation signature.  

Each overload signature describes exactly what kind of arguments the function can support. In case of `greet()` function, you can call it with in 2 ways: with a string or with an array of strings as an argument.  

Now, as before, you can invoke `greet()` with the arguments of type string or array of strings:

```ts twoslash
// @include: greet-overloading
// ---cut---
greet('World');          // 'Hello, World!'
greet(['Jane', 'Joe']);  // ['Hello, Jane!', 'Hello, Joe!']
```

### 2.1 Only overload signatures are callable

Here's an important nuance about the function overleading. 

While the implementation signature implements the function behavior, however, it is not directly callable. Only the overload signatures are callable.  

For example, if you try to autocomplete all the possible ways to call `greet()`, you would see it is callable only in 2 ways (i.e. the 2 overload signatures), and the implementation signature is not available.  

```ts twoslash
// @include: greet-overloading
// ---cut---
greet
//^?
```

<!-- ## 3. Function overloading and subtyping -->

## 3. Method overloading

While in the previous examples the function overloading was applied to a regular function, still, you can use overloading to a method.  

The only difference is that both the overload signatures and implementation signature are now a part of the class.  

For example, let's implement a `Greeter` class, with an overloaded `greet()` method.  

```twoslash include greeter
class Greeter {
  message: string;

  constructor(message: string) {
    this.message = message;
  }

  // Overload signatures
  greet(person: string): string;
  greet(persons: string[]): string[];

  // Implementation signature
  greet(person: unknown): unknown {
    if (typeof person === 'string') {
      return `${this.message}, ${person}!`;
    } else if (Array.isArray(person)) {
      return person.map(name => `${this.message}, ${name}!`);
    }
    throw new Error('Unable to greet');
  }
}
```

```ts twoslash
// @include: greeter
```

The `Greeter` class contains  `greet()` overload method. The overloading of this method is done using 2 overload signatures (which describes the exact parameter and return types), and the implementation signature contains the proper implementation.  

Thanks to `greet()` method overloading you can call it in 2 ways: using a string or using an array of strings.  

```ts twoslash
// @include: greeter
// ---cut---
const hi = new Greeter('Hi');

hi.greet('Angela');       // 'Hi, Angela!'
hi.greet(['Pam', 'Jim']); // ['Hi, Pam!', 'Hi, Jim!']
```

## 4. When to use function overloading

Function overloading, when used the right way, can greatly increase the usability of functions that may be invoked in multiple ways.  

However, there are situations when I'd recommend not to use the function overloading, but rather stick to the function signature.  

For example, don't use the function overloading for optional parameters:

```ts
// Not recommended
function myFunc(): string;
function myFunc(param1: string): string;
function myFunc(param1: string, param2: string): string;

function myFunc(...args: string[]): string {
  // implementation...
}
```

Using the optional parameters in the function signature should be enough:

```ts
// OK
function myFunc(param1?: string, param2: string): string {
  // implementation...
}
```

For more details I recommend checking [Function overloading Do's and Don'ts](https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html#function-overloads).

## 5. Conclusion

Function overloading in TypeScript let's you define functions that can be called in multiple ways: using a different set of arguments.  

Using function overloading requires defining the overload signatures: a set of functions with parameter and return types, but without a body. These signatures indicate
how the function should be invoked.  

Additionally, you have to write the proper implementation of the function (implementation signature): the parameter and return types, as well the function body.  

Later, when you want to use an overload function, you are able to call the function only according to the overload signatures.  

Aside from regular function, overloading can also be applied methods in classes.  