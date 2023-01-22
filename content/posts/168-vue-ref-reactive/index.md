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

If you landed on this post most likely you have a basic understanding of Vue reactivity in the composition API. 

However, like me, you might be asking yourself the ethernal question: which are the main differences between `ref()` and `reactive()`, and, importantly, when would you use on and when another? 

Luckily, this post describes 5 important differences between the reactive objects created by `ref()` and `reactive()`. 

## 1. Primitive values

The first difference, and also the one that you must remember, is how `ref()` and `reactive()` handle differently primitive values: strings, numbers, booleans, `null` and `undefined`.  

### 1.1 ref()

`refs()` can easily store both primitive values, as well as objects:

``` typescript
import { ref } from 'vue'

const numberRef = ref(0);           // OK
const objectRef = ref({ count: 0 }) // OK
```

In the example above `ref(0)` creates a ref storing a primitive value. Same way, `ref({ count: 0 })` creates a reactive ref storing a plain JavaScript object.  

### 1.2 reactive()

On the other side, `reactive()` cannnot store primitives, but can store only objects:

```typescript {2}
import { reactive } from 'vue'

const numberReactive = reactive(0);           // NOT OK!
const objectReactive = reactive({ count: 0}); // OK
```

Whether you can `reactive(0)`, however `0` (a primitive value) is an invalid value for `reactive()`. Don't do this. (If you need to store primitive values, `ref(0)` is the way to go)

Nevertheless, `reactive({ count: 0})` is perfectly valid and creates a reactive object. 

In conclusion:

> `ref()` *can* store primitive values, while `reactive()` *cannot*.

## 2. Accessing reactive data

The second difference, and also the one you must remember, is accessing the reactive data.  

### 2.1 ref()

`ref()` data, either storing a primitive value or an object, is accessed through a special property `.value`:

```ts {3,6}
import { ref } from 'vue'

const numberRef = ref(0);
console.log(numberRef.value); // logs 0

const objectRef = ref({ count: 0 })
console.log(objectRef.value.count); // logs 0
```

`primitiveRef.value` is how you access the primitive value from the ref. 

Same way `objectRef.value.count` is how you can access a property of an object which is stored in a ref.  

Please note that in the template you don't have to use `value` to access a ref value:

```vue {6}
<script setup>
import { ref } from 'vue'

const numberRef = ref(0);
</script>
<template>
  <div>{{ numberRef }}</div> <!-- <div>0</div> -->
</template>
```

`{{ numberRef }}` reads the ref value directly.  

### 2.2 reactive()

`reactive()` data, on the other hand, is accessed directly:

```typescript {2}
import { reactive } from 'vue'

const objectReactive = reactive({ count: 0});
console.log(objectReactive.count); // logs 0
```

Accessing reactive data created using `reactive({ count: 0} )` doesn't need additional syntax and is done directly: `objectReactive.count`.  

In conclusion:

> In the setup script, `ref()` data is accessed using *`value` property*, while `reactive()` data is accessed *directly*.  

## 3. Typing

### 3.1 ref()

A direct consequence of ref data being accessed through `value` property is how you would annotate in refs TypeScript.  

In case of `ref()` data, you need to use a special type `Ref`, which is available for importing from `vue` library:

```ts
import { ref, type Ref } from 'vue'

const numberRef: Ref<number> = ref(0);
```

`Ref<number>` is the type meaning a ref holding a number. This is the type returned by `ref(0)`.  

If you want to assign a ref as an argument to a composable, for example, then please make sure to use the `Ref<V>` type (where `V` is value's type) to annotate a ref parameter:  

```ts{4}
import { ref, type Ref } from 'vue'

const numberRef: Ref<number> = ref(0)

export const useIsEven = (numberRef: Ref<number>) => {
  return computed(() => numberRef.value % 2 === 0)
}
const isEven = useIsEven(numberRef) // type check passed
```

### 3.2 reactive()

On the other hand, reactive data returned by `reactive()` is typed like the initial object:

```ts
import { reactive } from 'vue'

const objectReactive: { count: number } = reactive({ count: 0});
```

`reactive({ count: 0})` returns an object of type `{ count: number }`, which exactly represents the reactive object. The reactive object normally keeps the type of the original object.  

Still, there's one exception to typing `reactive()` data typing: if the reactive object contains refs, then these refs are unwrapped:

```ts
import { reactive, ref } from 'vue'

const objectReactive: { count: number } = reactive({ count: ref(0)});
```

Despite the fact that the reactive object is `{ count: ref(0) }`, the returned type is still `{ count: number }`. All because `reactive()` automatically unwraps the refs found in the reactive object.  

In conclusion:

> refs returned by `ref(value: T)` are of type `Ref<T>`, while reactive objects returned by `reactive(object: T)` are of type `T`.


## 4. Watching

`watch()` is used to watch reactive data change. The default behavior of `watch()` differs when watching changes inside of an object wrapped into `ref()` and `reactive()`.  

### ref()

If you take the most basic example of a `ref()` being watched, `watch()` without problems determines if `value` ref was changed:

```ts {4-6}
<script setup>
import { ref, watch } from 'vue'

const countNumberRef = ref(0)
watch(countNumberRef, () => { 
  console.log('changed!')
})

const increase = () => countNumberRef.value++
</script>
<template>
  {{ countNumberRef }}
  <button @click="increase">Increase</button>
</template>
```

Every time you click the "Increase" button, you'll see in console the message "changed!". It means that `watch(count, callback)` calls `callback` every time `countNumberRef.value` changes.  

But does `watch()` watches deep changes of an object stored in `ref()`? Let's try!

```ts {4-6}
<script setup>
import { ref, watch } from 'vue'

const countObjectRef = ref({ count: 0 })
watch(countObjectRef, () => { 
  console.log('changed!')
})

const increase = () => countObjectRef.value.count++
</script>
<template>
  {{ countObjectRef.count }}
  <button @click="increase">Increase</button>
</template>
```

This time, however, if you click the "Increase" button there will be no message in the console! The conclusion is that `watch()` doesn't perform a deep watch by default on refs.

Of course, if you ask `watch()` to watch the ref deeply, it's going to work as expected:


```ts {4}
// ...

watch(count, () => { 
  console.log('changed!')
}, { deep: true })

// ...
```

### reactive()

In case of watching a reactive object, `watch()` always performs a deep watch (even if you don't indicate `{ deep: true }`) option.

```ts {3}
<script setup>
import { reactive, watch } from 'vue'

const countObjectReactive = reactive({ counter: { val: 0 } })
watch(countObjectReactive, () => { 
  console.log('changed!')
})

const increase = () => countObjectReactive.counter.val++
</script>
<template>
  {{ countObjectReactive.counter.val }}
  <button @click="increase">Increase</button>
</template>
```

Every time you click the "Increase" button, you'll see in console the message "changed!". Which means that `watch(countObjectReactive, callback)` calls `callback` every time any property (even a deep one) of `countObjectReactive` changes.  

In conclusion:

> `watch()` by default *watches only `myRef.value` change* of `ref()`, while doing a *deep watch* of a `reactive()` object.

## 5. Usage

Finally, and probably one of the most important difference to know, is when you'd use `ref()` and when `reactive()`?  

Unfortunately there isn't an exact right answer. 

But fortunetaly there are some situations when using a specific reactivity function is preferable. These preferences can be easily derivated from the above presented behaviour differences. 

1. If you need a reactive primitive value, then using `ref()` is the right choice.  
2. If you need a reactive but immutable [value object](https://en.wikipedia.org/wiki/Value_object) (an object whose properties never change), then using `ref()` is a good option.
3. If you need a reactive mutable object, and you want to track even the deeply mutated properties of that object, then using `reactive()` is a good option.


## 6. Conclusion

In this post you familriazed with the differences in behavior of `ref()` and `reactive()` APIs in composition API.

First, the most notable difference between the two is that `ref()` can store a primitive value, while `reactive()` cannot. 

Secondly, you access the value stored in a `ref()` using a special property `myRef.value`, while `reactive()` object can be used directly as a regular object.  

*What other differences between `ref()` and `reactive()` do you know?*