---
title: "unknown vs any in TypeScript"
description: "What is the difference between unknown and any types in TypeScript."
published: "2021-09-07T12:00Z"
modified: "2021-08-07T12:00Z"
thumbnail: "./images/cover-3.png"
slug: typescript-unknown-vs-any
tags: ['typescript', 'unknown', 'any']
recommended: ['javascript-null', '7-tips-to-handle-undefined-in-javascript']
type: post
---

`any` is a special keyword that represents any value. A variable of type `any` can receive any kind of value:

```typescript
let myVar: any = 0;
myVar = '1';
myVar = false;
```

Many TypeScript guides discourage the use of `any` because using it throws away the type restrictions (the first reason why you use TypeScript!).  

TypeScript also provides a special type `unknown`, which is similar to `any`. You can assign any value to an `unknown` type variable, exactly like in the case of `any`:

```typescript
let myVar: unknown = 0;
myVar = '1';
myVar = false;
```

Now... the big question is: what is the difference between using `any` and `unknown`? Let's find out in this post.  

## 1. *unknown* vs *any*

To better understand the difference between `unknown` and `any`, 

For example, let's say that you a variable can contain a function, but that variable is defined as `any`:

```typescript
function invokeAnything(callback: any) {
  callback();
}

invokeAnything(1); // throws "TypeError: callback is not a function"
```

[Try the demo.](https://www.typescriptlang.org/play?#code/GYVwdgxgLglg9mABDMA3OBrApgQTATygAsUBzACggEMAbGgIyogwC5EqCBKRAbwChEianUbNynANx8Avnz4p02PIRJgKARkmIA9NsTEATnADuAZ0QAiACr4ADlgCiBowbbCGTDMnNg4UdoigkLAIFkA)

Because `callback` param is of `any` type, the statement `callback()` *won't trigger type errors*. You can do anything with a variable of type `any`.  

But running the script *throws a runtime error*: `TypeError: callback is not a function` is thrown. `1` is a number and cannot be invoked as a function &mdash; and TypeScript hasn't protected you from this error!

How to allow `invokeAnything()` function to accept any kind of argument, but force a type check on that argument, for example if invoking it as a function? 

Welcome `unknown`!

`unknown`, same as `any`, accepts any kind of value. However, if you try to use the variable of `unknown` type, then TypeScript enforces you a type check. Exactly what you need!

Let's change the type of `callback` param from `any` to `unknown`, and see what happens:

```typescript{3}
function invokeAnything(callback: unknown) {
  callback();
  // Object is of type 'unknown'
}

invokeAnything(1);
```

[Try the demo.](https://www.typescriptlang.org/play?#code/GYVwdgxgLglg9mABDMA3OBrApgQTATygAsUBzACggEMAbGgIyogwC5FwMw4B3MASkQBvAFCJE1Oo2bk+AbmEBfYcJTpseQiTAUAjHKA)

Because `callback` argument is of type `unknown`, the statement `callback()` has a type error `Object is of type 'unknown'`.  

You need to perform type checking before using a variable of type `unknown`. In the example, you would simply need to check if `callback` is a function type:

```typescript
function invokeAnything(callback: unknown) {
  if (typeof callback === 'function') {
    callback();
  }
}

invokeAnything(1);
```

[Try the demo.](https://www.typescriptlang.org/play?#code/GYVwdgxgLglg9mABDMA3OBrApgQTATygAsUBzACggEMAbGgIyogwC5FwMw4B3MASkQBvAFCJkwROSj4ADljgTqdRs0QBeDYgDkoSLARaBIsWKUMmGcnwDcoxAF9hj4SnTY8hEmAoBGG0A)

Having added `typeof callback === 'function'` check, you can safely invoke `callback()`. No type errors and no runtime errors! Great!

Now you can easily understand the definition of `unknown` as [provided](https://github.com/Microsoft/TypeScript/pull/24439) by Anders Hejlsberg:

> `unknown` is the type-safe counterpart of `any`.

## 2. *don't know* vs *don't care*

If you still have troubles in understanding the `unknown` concept, you might find useful the following mental model.  

`unknown` represents the idea of *I don't know*, while `any` &mdash; *I don't care*.  

## 3. Conclusion

`unknown` and `any` are 2 special types that can hold any value.  

`unknown` is recommended over `any` because it provides safer typing. No operations are permitted on an `unknown` without first asserting or type checking to a more specific type.  