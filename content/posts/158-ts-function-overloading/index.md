---
title: "A Simple Explanation of Function Overloading in TypeScript"
description: "Function overloading in TypeScript lets you define functions that can be called in multiple ways."
published: "2021-11-17T13:40Z"
modified: "2021-11-17T13:40Z"
thumbnail: "./images/cover-4.png"
slug: typescript-function-overloading
tags: ['typescript', 'function']
recommended: ['typescript-unknown-vs-any', 'typescript-covariance-contravariance']
type: post
---

Most of the functions accept a fixed set of arguments. 

However, some functions accept a variable number of arguments, as well as arguments of different types.  To annotate the functions that accept variable arguments, TypeScript offers the function overloading feature. 

Let's see how function overloading works.  

```toc
```

## 1. The function signature

Let's consider a function that returns a welcome message to a particular person:

```twoslash include greet
function greet(person: string): string {
  return `Hello, ${person}!`;
}
```

```ts twoslash
// @include: greet
```

The function above accepts 1 argument of type `string`: the name of the person.

Invoking the function is pretty simple:

```ts twoslash
// @include: greet
// ---cut---
greet('World'); // 'Hello, World!'
```

What if you'd like to make the `greet()` function more flexible? For example, improve it to accept a list of persons to greet.  

Such a function would accept a string or array of strings as an argument, as well as return a string or an array of strings.  

How to annotate such a function? There are 2 approaches.  

The first approach is straightforward and involves modifying the function signature directly by updating the parameter and return types.  

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

Now you can invoke `greet()` in 2 ways:

```ts twoslash
// @include: greet-signature
// ---cut---
greet('World');          // 'Hello, World!'
greet(['Jane', 'Joe']); // ['Hello, Jane!', 'Hello, Joe!']
```

Updating the function signature directly to support the multiple ways of invocation is the usual and good way to annotate. Try to keep the possible types of parameters included in the function signature.  

However, there are situations when you might want to take an alternative approach and define separately all the ways your function can be invoked.  This approach is called *function overloading*.  

## 2. The function overloading

The second approach is to use the *function overloading* feature. I recommend it when the function signature is relatively complex and has multiple types involved.  

Putting the function overloading in practice requires defining the so-called *overload signatures* and an *implementation signature*.  

The overload signature defines the parameter and return types of the function and doesn't have a body. The function signatures describe the different ways your function can be invoked.  

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

Each overload signature describes one way the function can be invoked. In the case of `greet()` function, you can call it 2 ways: with a string argument, or with an array of strings argument.  

Now, as before, you can invoke `greet()` with the arguments of type string or array of strings:

```ts twoslash
// @include: greet-overloading
// ---cut---
greet('World');          // 'Hello, World!'
greet(['Jane', 'Joe']);  // ['Hello, Jane!', 'Hello, Joe!']
```

### 2.1 Overload signatures are callable

While the implementation signature implements the function behavior, however, it is not directly callable. Only the overload signatures are callable.  

```ts twoslash
// @errors: 2769
// @include: greet-overloading
// ---cut---
greet('World');         // Overload signature callable
greet(['Jane', 'Joe']); // Overload signature callable

const someValue: unknown = 'Unknown';
greet(someValue);       // Implementation signature NOT callable
```

In the example above `greet(someValue)` you cannot call `greet()` function with an argument of type `unknown`, even if the implementation signature accepts `unknown` argument.  

### 2.2 Implementation signature must be general

Be aware that the implementation signature type should be generic enough to include the overload signatures.  

Otherwise, TypeScript won't accept the overload signature as being incompatible. 

For example, if you modify the implementation signature's return type from `unknown` to `string`:

```ts twoslash
// @errors: 2394 2322
// Overload signatures
function greet(person: string): string;
function greet(persons: string[]): string[];

// Implementation signature
function greet(person: unknown): string {
  // ...
  throw new Error('Unable to greet');
}
```

Then the overload signature `function greet(persons: string[]): string[]` is marked as being incompatible with `function greet(person: unknown): string`.  

`string` return type of the implementation signature isn't general enough to be compatible with `string[]` return type of the overload signature.  

In other words, the overload signatures must be kind of subtypes of implementation signatures.  

## 3. Method overloading

While in the previous examples the function overloading was applied to a regular function, still, you can overload a method too.  

During method overloading, both the overload signatures and implementation signature are now a part of the class.  

For example, let's implement a `Greeter` class, with an overloaded `greet()` method:

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

The `Greeter` class contains  `greet()` overload method: 2 overload signatures describing how the method can be called, and the implementation signature containing the proper implementation.  

Thanks to method overloading you can call `hi.greet()` in 2 ways: using a string or using an array of strings.  

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

For more details check [Function overloading Do's and Don'ts](https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html#function-overloads).

## 5. Conclusion

Function overloading in TypeScript lets you define functions that can be called in multiple ways.  

Using function overloading requires defining the overload signatures: a set of functions with parameter and return types, but without a body. These signatures indicate how the function should be invoked.  

Additionally, you have to write the proper implementation of the function (implementation signature): the parameter and return types, as well the function body.  

Later you can call the function only according to the overload signatures.  

Aside from regular functions, overloading can also be applied methods in classes.  