---
title: "Record Type in TypeScript"
description: "Record simplifies typing objects in TypeScript. Let's see how you can benefit from it."
published: "2023-04-28"
modified: "2023-04-28"
thumbnail: "./images/cover.jpg"
slug: typescript-record
tags: ['typescript', 'object']
type: post
---

The usualy way to define a type of an object in TypeScript is using an object type:

```ts
interface Salary1 {
  annual: number
  bonus: number
}

const salary: Salary1 = { annual: 56000, bonus: 1200 } // OK
```

or an [index signature](/typescript-index-signatures/):

```ts
type Salary2 = {
  [key: string]: number
}

const salary: Salary2 = { annual: 56000, bonus: 1200 } // OK
```

These are good ways to define object types. 

`Record<K, V>`, the third approach, has the benefit of being shorter and more readable.  Let's see how to use it in your code.  

## 1. Record

`Record<K, V>` is a [generic type](https://www.typescriptlang.org/docs/handbook/2/generics.html) that represents an object type which keys are `K` and values are `V`.  

For example, `Record<string, number>` is an object type with string keys and number values:

```ts
type Salary3 = Record<string, number>

const salary: Salary3 = { annual: 56000, bonus: 1200 } // OK
```

`Record<string, number>` is permissive regarding the object structure, as long as the keys are strings and values numbers:

```ts
type Salary3 = Record<string, number>

const salary1: Salary3 = { annual: 56000 } // OK
const salary2: Salary3 = { monthly: 8000 }  // OK
const salary3: Salary3 = { }                // OK
```

But `Record<string, number>` throws a type error if you use symbol as a key or a string as a value:

```ts
type Salary3 = Record<string, number>

const salary1: Salary3 = { [Symbol('Salary')]: 56000 } // Type error!
const salary2: Salary3 = { annual: '56K' }             // Type error!
```

In `Record<K, V>` the key type `K` is restricted to `number`, `string`, `symbol`, including the [literals](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#literal-types) of them. There are no restriction on the value type `V`.  

```ts
Record<string, string>           // OK
Record<number, number>           // OK
Record<string, () => void>       // OK
Record<number | 'key1', boolean> // OK
Record<'key1' | 'key2', boolean> // OK
```

Types like `boolean`, `object`, `Function`, etc. are not accepted as keys:

```ts
Record<boolean, string>          // Type error!
Record<object, number>           // Type error!
```

## 2. Record with union key

The record type accepts a [union type](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#union-types) as a key, which is useful to limit the keys an object might have.  

A [union of string literals](https://mariusschulz.com/blog/string-literal-types-in-typescript#string-literal-types-and-union-types) is a  common way to define the key type: `'key1' | 'key2' | 'keyN'`.   

For example, `Record<'annual' | 'bonus', number>` represents an object which can have only `annual` or `bonus` keys:

```ts
type Salary4 = Record<'annual' | 'bonus', number>

const salary1: Salary4 = { annual: 56000, bonus: 1200 } // OK
const salary2: Salary4 = { annual: 56000 }              // OK
const salary3: Salary4 = { bonus: 1200 }                // OK
const salary4: Salary4 = { }                            // OK
```

Using a key that is not present in the union generates a type error:

```ts
type Salary4 = Record<'annual' | 'bonus', number>

const salary5: Salary4 = { monthly: 8000 } // Type error!
```

## 3. Record and index signature

I prefer a record type instead of an index signature most of the times. The former is shorter and more readable than the latter.  

For example, I like more the parameter annotated with a record:

```ts
function logSalary1(salary: Record<string, number>) {
  console.log(salary)
}

function logSalary2(salary: { [key: string]: number }) {
  console.log(salary)
}
```

In addition the index signature doesn't accept literals or a union of literals as key type:

```ts
type Salary5 = {
  [key: 'annual' | 'bonus']: number // Type error!
}
```

## 4. Conclusion

`Record<K, V>` creates object types with key type `K` and value type `V`.  

Although there are no restrictions on the `V` value type, the `K` key type can be only number, string or symbol, including their literals.  

To restrict the keys to a limited set, you can use a union of string literals `Record<'key1' | 'key2', V>`.  

Now you are ready to use records in your TypeScript code.  

Check also my post about [index signatures](/typescript-index-signatures/).  

*How often do you use record type?*