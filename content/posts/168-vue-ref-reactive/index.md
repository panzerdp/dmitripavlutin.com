---
title: "5 Must-Know Differences Between ref() and reactive() in Vue"
description: "That are the 5 important differences between ref() and reactive() in Vue."  
published: "2023-01-21"
modified: "2023-01-21"
thumbnail: "./images/cover.png"
slug: ref-reactive-differences-vue
tags: ['vue', 'vue composition']
recommended: ['vue-next-tick', 'props-destructure-vue-composition']
type: post
---

If you landed on this post most likely you have a basic understanding of Vue reactivity in composition API. 

However, like me, you might be asking yourself the ethernal question: what are the main differences between `ref()` and `reactive()`, and, importantly, when would you use on and when another? 

Luckily, this post will help you understand 5 important differences between the reactive objects created by `ref()` and `reactive()`. 

## 1. Primitive values

The first difference, and also the one that you must remember, is how `ref()` and `reactive()` handle differently primitive values: strings, numbers, booleans, `null` and `undefined`.  

`refs()` can easily store both primitive values, as well as objects:

``` typescript
import { ref } from 'vue'

const refPrimitive = ref(0);           // OK
const refObject    = ref({ count: 0 }) // OK
```

In the example above `ref(0)` creates a reactive ref storing a primitive value. Same way, `ref({ count: 0 })` creates a reactive ref storing a plain JavaScript object.  

On the other side, `reactive()` cannnot store primitives, but can store only objects:

```typescript {2}
import { reactive } from 'vue'

const reactivePrimitive = reactive(0);            // NOT OK!
const reactiveObject    = reactive({ count: 0}); // OK
```

Whether you can `reactive(0)`, however `0` (a primitive value) is an invalid value for `reactive()`. Please do not do this. In case if you need to store primitive values, `ref(0)` is the way to go.  

Nevertheless, `reactive({ count: 0})` is perfectly valid and creates a reactive object.  

> `ref()` *can* store primitive values, while `reactive()` *cannot*.

## 2. Accessing reactive data

The second difference, and also the one you must remember, is accessing the reactive data.  

`ref()` data, either storing a primitive value or an object, is accessed through a special property `.value`:

```ts {3,6}
import { ref } from 'vue'

const refPrimitive = ref(0);
console.log(refPrimitive.value); // logs 0

const refObject = ref({ count: 0 })
console.log(refObject.value.count); // logs 0
```

`refPrimitive.value` is how you access the primitive value from the ref. Same way `refObject.value.count` is how you can access a property of an object which is stored in a ref.  

`reactive()` data, on the other hand, is accessed directly:

```typescript {2}
import { reactive } from 'vue'

const reactiveObject = reactive({ count: 0});
console.log(reactiveObject.count); // logs 0
```

Accessing reactive data created using `reactive({ count: 0} )` doesn't need any additional syntax and is performed directly: `reactiveObject.count`.  

> `ref()` data is accessed using *`value` property*, while `reactive()` data is accessed *directly*.  

## 3. Typing

A direct consequence of ref data being accessed through `value` property is how you would annotate in TypeScript the reactive values.  

In case of `ref()` data, you need to use a special type `Ref`, which is available for importing from `vue` library:

```ts
import { ref, type Ref } from 'vue'

const refPrimitive: Ref<number> = ref(0);
```

`Ref<number>` is the type meaning a ref holding a number. This is the type returned by `ref(0)`.  

If you want to assign a ref as an argument to a composable, for example, then please make sure to use the `Ref<V>` type (where `V` is value's type):

```ts{4}
import { ref, type Ref } from 'vue'

const refPrimitive: Ref<number> = ref(0)

export const useIsEven = (numberRef: Ref<number>) => {
  return computed(() => numberRef.value % 2 === 0)
}
const isEven = useIsEven(refPrimitive) // type check passed
```

On the other hand, reactive data returned by `reactive()` is typed like the initial object:

```ts
import { reactive } from 'vue'

const reactiveObject: { count: number } = reactive({ count: 0});
```

`reactive({ count: 0})` returns an object of type `{ count: number }`, which exactly represents the reactive object. The reactive object normally keeps the type of the original object.  



## 4. Watching

## 5.  

## 6. Conclusion