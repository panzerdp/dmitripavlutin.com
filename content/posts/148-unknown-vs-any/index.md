---
title: "unknown vs any in TypeScript"
description: "What is the difference between unknown and any types in TypeScript."
published: "2021-09-08T13:00Z"
modified: "2021-09-08T13:00Z"
thumbnail: "./images/cover-4.png"
slug: typescript-unknown-vs-any
tags: ['typescript', 'unknown', 'any']
recommended: ['javascript-null', '7-tips-to-handle-undefined-in-javascript']
type: post
---

A variable of type `any` can be assigned with anything:

```ts twoslash
let myVar: any = 0;
myVar = '1';
myVar = false;
```

Many TypeScript guides discourage the use of `any` because using it throws away the type restrictions &mdash; the first reason why you use TypeScript!

TypeScript (version 3.0 and above) also provides a special type `unknown` that is similar to `any`. You can assign any value to an `unknown` type variable as well:

```ts twoslash
let myVar: unknown = 0;
myVar = '1';
myVar = false;
```

Now... the big question is: what is the difference between using `any` and `unknown`?

Let's find out in this post.  

## 1. *unknown* vs *any*

To better understand the difference between `unknown` and `any`, let's start with writing a function that wants to invoke its only argument.  

Let's make the only parameter of `invokeAnything()` as `any` type:

```ts twoslash
function invokeAnything(callback: any) {
  callback();
}

invokeAnything(1);
```

Because `callback` param is of `any` type, the statement `callback()` *won't trigger type errors*. You can do anything with a variable of type `any`.  

But running the script *throws a runtime error*: `TypeError: callback is not a function`. `1` is a number and cannot be invoked as a function &mdash; and TypeScript hasn't protected you from this error!

How to allow `invokeAnything()` function to accept any kind of argument, but force a type check on that argument, for example, if invoking it as a function? 

Welcome `unknown`!

An `unknown` type variable, same as `any`, accepts any value. But when trying to use the `unknown` variable, TypeScript enforces a type check. Exactly what you need!

Let's change the type of `callback` param from `any` to `unknown`, and see what happens:

```ts twoslash
// @errors: 2571
function invokeAnything(callback: unknown) {
  callback();
}

invokeAnything(1);
```

Because the `callback` argument is of type `unknown`, the statement `callback()` has a type error `Object is of type 'unknown'`. Now, contrary to `any`, TypeScript protects you from invoking something that might not be a function! 

You need to perform type checking before using a variable of type `unknown`. In the example, you would simply need to check if `callback` is a function type:

```ts twoslash
function invokeAnything(callback: unknown) {
  if (typeof callback === 'function') {
    callback();
  }
}

invokeAnything(1);
```

Having added `typeof callback === 'function'` check, you can safely invoke `callback()`. No type errors and no runtime errors! Great!

## 2. The mental model of *unknown* vs *any*

To be honest, I had difficulties understanding `unknown` when I had been learning it. How does it differ from `any`, since both types accept any value?  

Here's the rule that had helped me understand the difference:

* You can assign anything to `unknown` type *but you cannot operate on `unknown` before doing a type check or type assertion*
* You can assign anything to `any` type *and you can perform any operation on `any`*

The example above has demonstrated exactly the similarity and difference between `unknown` and `any`.  

The case of `unknown`:

```ts twoslash
function invokeAnything(callback: unknown) {
  // you cannot operate on `unknown` type 
  // before doing a type check or type assertion
  if (typeof callback === 'function') {
    callback();
  }
}

invokeAnything(1); // You can assign anything to `unknown` type
```

The type check here is `typeof callback === 'function'` &mdash; checking whether the `callback` is a function. The type of `callback` narrows to function type.  

The case of `any`:

```ts twoslash
function invokeAnything(callback: any) {
  // you can perform any operation on `any` type
  callback();
}

invokeAnything(1); // You can assign anything to `any` type
```

`callback` being `any`, TypeScript doesn't enforce any type checking for the statement `callback()`.  

## 3. Conclusion

`unknown` and `any` are 2 special types that can hold any value.  

`unknown` is recommended over `any` because it provides safer typing &mdash; you have to use type assertion or narrow to a specific type if you want to perform operations on `unknown`.  

*Challenge: can you write a utility type `IsUnknown<T>` which evaluates to `true` if `T` is `unknown` and `false` otherwise?*
