---
title: "Why I Like the Record Type in TypeScript"
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

const salary: Salary1 = { annual: 100000, bonus: 12000 } // OK
```

or an index signature:

```ts
type Salary2 = {
  [key: string]: number
}

const salary: Salary2 = { annual: 100000, bonus: 12000 } // OK
```

`Record<K, V>`, the third approach, has the benefit of being shorter and more readable.  Let's see how to use it in your code.  

## 1. Record

`Record<K, V>` is a generic type that represents an object type which keys are `K` type and values are `V` type.  

For example, `Record<string, number>` is a type of an object with strings as keys and numbers as values:

```ts
type Salary3 = Record<string, number>

const salary: Salary3 = { annual: 100000, bonus: 12000 }
```

If you compare the record type and the index signature type, it's visible that the record type is shorter and more readable. Usually I prefer the record type syntax because of that.  

`Record<string, number>` is permissive in terms of the object structure, as long as the keys are strings and values numbers:

```ts
type Salary3 = Record<string, number>

const salary1: Salary3 = { annual: 100000 } // OK
const salary2: Salary3 = { monthly: 8000 }  // OK
const salary3: Salary3 = { }                // OK
```

The record type has a restriction on what types can be used as a key type. You are allowed to use as key type only number, string, symbol, plus the literals of these type. Plus a union of all these types.  

But there are no restriction on the value type.  

```ts
Record<string, string>              // OK
Record<number, number>              // OK
Record<string | number, () => void> 
```

## 2. Record with union key

The record type accepts a [union type](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#union-types) as a key, which is useful to limit keys an object might have.  

For example, `Record<'annual' | 'bonus', number>` represents an object which can have only `annual` or `bonus` keys (or neither of them!):

```ts
type Salary4 = Record<'annual' | 'bonus', number>

const salary1: Salary4 = { annual: 100000, bonus: 12000 } // OK
const salary2: Salary4 = { annual: 100000 }               // OK
const salary3: Salary4 = { bonus: 12000 }                 // OK
const salary4: Salary4 = { }                              // OK
const salary5: Salary4 = { monthly: 8000 }                // Type error!
```

The record with union key is equivalent to an object type where the same properties are optional:

```typescript
Record<'annual' | 'bonus', number>
// is the same as
{ annual?: number, bonus?: number}
```

where `annual?` and `bonus?` are [optional properties](https://www.typescriptlang.org/docs/handbook/2/objects.html#optional-properties).  

## 3. Record and index signature

I prefer a record type instead of an index signature most of the times. The former is shorter and more readable than the latter.  

```ts
function logSalary1(salary: Record<string, number>) {
  console.log(salary)
}

function logSalary2(salary: { [key: string]: number }) {
  console.log(salary)
}
```

The parameter annotated with a record is easier to read than the one with the index signature.  



## 4. Conclusion