---
title: "5 Must-Know Differences Between ref() and reactive() in Vue"
description: "What are the main differences between ref() and reactive()? And when would you use one or another?"  
published: "2023-01-25"
modified: "2023-01-26"
thumbnail: "./images/cover-2.png"
slug: ref-reactive-differences-vue
tags: ['vue', 'vue composition', 'reactivity']
recommended: ['vue-next-tick', 'props-destructure-vue-composition']
type: post
---

If you landed on this post, you probably have a basic understanding of Vue reactivity.  

However, like me, you might be asking yourself the eternal question: what are the main differences between `ref()` and `reactive()`? And when would you use one or another? 

Let's find the answer together.

```toc
```

## 1. Primitive values

`ref()` and `reactive()` handle differently primitive values: strings, numbers, booleans, `null`, and `undefined`.  

### 1.1 ref()

`refs()` stores both primitive values and objects:

``` typescript
import { ref } from 'vue'

const numberRef = ref(0);           // OK
const objectRef = ref({ count: 0 }) // OK
```

In the example above `ref(0)` creates a ref storing a primitive value. 

Same way, `ref({ count: 0 })` creates a ref storing a plain JavaScript object.  

### 1.2 reactive()

On the other side, `reactive()` doesn't store primitives, but stores only objects:

```typescript {2}
import { reactive } from 'vue'

const numberReactive = reactive(0);           // NOT OK!
const objectReactive = reactive({ count: 0}); // OK
```

Calling `reactive(0)` with a primitive value is incorrect. Don't do this. If you need to make reactive primitive values, `ref(0)` is the way to go.  

The reason why `reactive()` works only with objects is in Vue's reactivity implementation. [Vue uses Proxies](https://github.com/vuejs/core/blob/main/packages/reactivity/src/reactive.ts#L212) to intercept property changes on objects. And proxies do not work with primitives.  

Nevertheless, `reactive({ count: 0})` initialized with an object is perfectly valid and creates a reactive object. 

In conclusion:

> `ref()` *can* store primitive values, while `reactive()` *cannot*.

## 2. Accessing reactive data

The second difference is how you'd access the data stored inside `ref()` and `reactive()`.  

### 2.1 ref()

`ref()` data, either a primitive value or an object, is accessed through a special property `.value`:

```ts {3,6}
import { ref } from 'vue'

const numberRef = ref(0);
console.log(numberRef.value); // logs 0

const objectRef = ref({ count: 0 })
console.log(objectRef.value.count); // logs 0
```

`numberRef.value` is how you access the primitive value from the ref `numberRef`. 

`<ref>.value` is a special property available on all the refs to read or update the ref value.  

Also, `objectRef.value.count` is how you can access a property of an object in ref.

Note that inside templates you don't have to use `.value` to access a ref value: they're auto-unwrapped.  

```vue {6}
<script setup>
import { ref } from 'vue'

const numberRef = ref(0)
</script>
<template>
  <div>{{ numberRef }}</div> <!-- <div>0</div> -->
</template>
```

[Open the demo.](https://codesandbox.io/s/ref-unwrapping-template-hp5ixh?file=/src/App.vue)

In the interpolation `{{ numberRef }}` the ref is auto-unwrapped. 

### 2.2 reactive()

`reactive()` data, on the other hand, is accessed directly:

```typescript {3}
import { reactive } from 'vue'

const objectReactive = reactive({ count: 0})
console.log(objectReactive.count) // logs 0
```

Accessing reactive data created using `reactive({ count: 0} )` doesn't need additional syntax and is done directly: `objectReactive.count`.  

The reactive object returned by `reactive(originalObject)` is a proxy object of `originalObject`. Meaning that the reactive object has the same properties (aka has the same interface) as the `originalObject`.

In conclusion:

> `ref()` data is accessed using *`value` property* (exception: in templates the ref is auto-unwrapped), while `reactive()` data is accessed *directly*.  

## 3. Reassigning data

`ref()` is accessed and updated using `.value` property, while `reactive()` is a proxy of the original object. As result `ref()` can be reassigned to an new object, while `reactive()` cannot.  

### ref()

Reassigning the value of a `ref()` entirely to a new value is perfectly valid:

```vue {5}
<script setup>
import { ref, onMounted } from "vue"

const objectRef = ref({ count: 0 })

onMounted(() => objectRef.value = { count: 1 })
</script>
<template>{{ objectRef.count }}</template>
```

[Try the demo.](https://codesandbox.io/s/ref-reassign-oi4zjy?file=/src/App.vue)

Open the demo, and see that replacing entirely the ref value `objectRef.value = { count: 1 }` after mounting is reflected in the output. The reactivity is kept.  

### reactive()

Reassigning entirely a `reactive()` object, however, is not possible:

```vue {5}
<script setup>
import { reactive, onMounted } from 'vue'

let objectReactive = reactive({ count: 0})

onMounted(() => objectReactive = { count: 1 })
</script>
<template>{{ objectReactive.count }}</template>
```

[Try the demo.](https://codesandbox.io/s/reactive-reassign-dpf9yf?file=/src/App.vue)

Open the demo, and see that replacing entirely the reactive object value `objectReactive = { count: 1 }` after mounting is not reflected in the output. Doing so breaks the reactivity of `objectReactive`.  

In conclusion:

> `ref()` value can be reassigned entirely to a new object, while a `reactive()` cannot.  

## 4. Typing

### ref()

A direct consequence of ref data being accessed through `.value` property is how refs are typed.  

To annotate a ref you need to use a special type `Ref`, available for importing from `vue` library:

```ts
import { ref, Ref } from 'vue'

const numberRef: Ref<number> = ref(0);
```

`Ref<number>` is the type meaning a ref holding a number.  

If you want to assign a ref as an argument to a composable, for example, then make sure to use the `Ref<V>` type (where `V` is the value's type) to annotate a ref parameter:  

```ts{4}
import { ref, Ref } from 'vue'

const numberRef: Ref<number> = ref(0)

export const useIsEven = (numberRef: Ref<number>) => {
  return computed(() => numberRef.value % 2 === 0)
}
const isEven = useIsEven(numberRef) // type check passed
```

### reactive()

On the other hand, reactive data returned by `reactive()` is typed as the initial object:

```ts
import { reactive } from 'vue'

const objectReactive: { count: number } = reactive({ count: 0})
```

`reactive({ count: 0})` returns an object of type `{ count: number }`. The reactive object normally keeps the type of the original object.  

But there's one exception &mdash; if the reactive object contains refs, then these refs are unwrapped.

```ts
import { reactive, ref } from 'vue'

const objectReactive: { count: number } = reactive({ count: ref(0)})
```

Even though the reactive object is `{ count: ref(0) }`, the returned type is still `{ count: number }`. All because `reactive()` automatically unwraps the refs found in the reactive object.  

In conclusion:

> refs returned by `ref(value: T)` are of type `Ref<T>`, while reactive objects returned by `reactive(object: T)` are of type `T` (exception: refs in reactive are unwrapped).

## 5. Watching

`watch()` watches reactive data change. The default behavior of `watch()` differs for `ref()` and `reactive()`.  

### ref()

 `watch()` determines if `.value` property of the ref is changed:

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

[Open the demo.](https://codesandbox.io/s/watch-ref-value-y6ery8?file=/src/App.vue)

Every time you click the "Increase" button, you'll see in the console the message "changed!". `watch(count, callback)` calls `callback` every time `countNumberRef.value` changes.  

But does `watch()` watch deep changes of an object stored in `ref()`? Let's try!

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

[Open the demo.](https://codesandbox.io/s/watch-ref-value-deep-x8re97?file=/src/App.vue)

This time, however, if you click the "Increase" button there will be no message in the console! The conclusion is that `watch()` doesn't deeply watch refs by default.  

However, DOM still updates when `countObjectRef.value.count` changes: which means the object in the ref is still reactive in regards to the rendered output.  

Of course, if you ask `watch()` to watch the ref deeply, it's working as full deep watch:

```ts {4}
// ...

watch(count, () => { 
  console.log('changed!')
}, { deep: true })

// ...
```
[Open the demo.](https://codesandbox.io/s/watch-ref-value-deep-working-m7t9eq?file=/src/App.vue)

### reactive()

In the case of watching a reactive object, `watch()` always performs a deep watch (even if you don't indicate `{ deep: true }`) option.

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

[Open the demo.](https://codesandbox.io/s/reactive-deep-watch-3klsxl?file=/src/App.vue)

Every time you click the "Increase" button, you'll see in the console the message "changed!". `watch(countObjectReactive, callback)` calls `callback` every time any property (even a deep one) of `countObjectReactive` changes.  

In conclusion:

> `watch()` by default watches *only direct `.value` change* of `ref()`, while doing a *deep* watch of a `reactive()` object.

## 6. Usage

While there isn't a strict rule, still, there are situations when using a specific reactivity function is preferable:

1. If you need a reactive primitive value, then using `ref()` is the right choice.  
2. If you need a reactive [value object](https://en.wikipedia.org/wiki/Value_object) (an object whose properties usually don't change), then using `ref()` is a good option.
3. If you need a reactive mutable object, and you want to track even the deeply mutated properties of that object, then using `reactive()` is a good option.

## 7. Conclusion

This post presented the differences between `ref()` and `reactive()` in composition API:

1. `ref()` can store a primitive value, while `reactive()` cannot. 
2. You access the value stored in a `ref()` using `<ref>.value`, while `reactive()` object can be used directly as a regular object.  
3. `ref()` value can be reassigned to an entirely new object, while `reactive()` cannot.
4. `ref()` is typed as `Ref<V>`, while the reactive object returned by `reactive(originalObject)` usually maintains the type of the `originalObject`.  
5. `watch()` (when used without options) normally watches only direct changes of `<ref>.value`, while watching deeply `reactive()` objects.  

You'd use `ref()` to store primitives or value objects, but `reactive()` if you're interested to watch deep changes of a mutable object.  

*What other differences between `ref()` and `reactive()` do you know?*
