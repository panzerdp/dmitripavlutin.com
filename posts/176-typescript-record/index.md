---
title: "Record Type in TypeScript"
description: "Record<K, V> is a utility type that simplifies typing object in TypeScript. Let's see how you can advantage from it."
published: "2023-04-27"
modified: "2023-04-27"
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

const salary: Salary1 = { annual: 100000, bonus: 1200 } // OK
```

or an [index signature](/typescript-index-signatures/):

```ts
type Salary2 = {
  [key: string]: number
}

const salary: Salary2 = { annual: 100000, bonus: 1200 } // OK
```

`Record<K, V>`, the third approach, has the benefit of being shorter and more readable.  Let's see how to use it in your code.  

## 1. Record

`Record<K, V>` is a generic type that represents an object type which keys are `K` and values are `V`.  

For example, `Record<string, number>` is an object with string keys and number values:

```ts
type Salary3 = Record<string, number>

const salary: Salary3 = { annual: 100000, bonus: 1200 }
```

`Record<string, number>` is permissive in terms of the object structure, as long as the keys are strings and values numbers:

```ts
type Salary3 = Record<string, number>

const salary1: Salary3 = { annual: 100000 } // OK
const salary2: Salary3 = { monthly: 8000 }  // OK
const salary3: Salary3 = { }                // OK

const salary4: Salary3 = { annual: '100K' } // Type error!
```

The key type is restricted to `number`, `string`, `symbol`, including the [literals](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#literal-types) of them. There are no restriction on the value type.  

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

The record type accepts a [union type](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#union-types) as a key, which is useful to limit keys an object might have.  

For example, `Record<'annual' | 'bonus', number>` represents an object which can have only `annual` or `bonus` keys:

```ts
type Salary4 = Record<'annual' | 'bonus', number>

const salary1: Salary4 = { annual: 100000, bonus: 1200 } // OK
const salary2: Salary4 = { annual: 100000 }              // OK
const salary3: Salary4 = { bonus: 1200 }                 // OK
const salary4: Salary4 = { }                             // OK
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

In addition the index signature doesn't accept literals or an union of literals as key type:

```ts
type Salary5 = {
  [key: 'annual' | 'bonus']: number // Type error!
}
```

## 4. Conclusion

`Record<K, V>` let's you create object types with `K` as the key type and `V` as the value type.  

Although there are no restrictions on the `V` value type, the `K` key type can be only number, string or symbol, including their literals.  

To restrict the keys to a set of names, you can use an union of string literals `Record<'key1' | 'key2', V>`.  

