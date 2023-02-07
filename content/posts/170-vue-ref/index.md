---
title: "Vue refs in Composition API"
description: "refs are reactive blocks of data in Vue composition API"  
published: "2023-01-25"
modified: "2023-01-26"
thumbnail: "./images/cover-2.png"
slug: vue-ref
tags: ['vue', 'vue composition', 'reactivity']
recommended: ['vue-next-tick', 'ref-reactive-differences-vue']
type: post
---

Well designed reactivity is one of the selling points of Vue. As a result of an user action a reactive value is updated, and automagically all of the components that use the reactive value are updated.  

refs in Vue composition API are the primary blocks of reactivity. And knowing refs well is a good path to working efficiently with reactivity in Vue.  

In this post I'm going to help you understand all the details that you need to know about Vue refs to work them very efficiently. Let's get started.  

## 1. ref()

Let's say that a component renders a reactive value to the screen. When the reactive value changes (for example based on a user event), Vue makes sure to re-render the component to reflect the new value on the screen.  That's the idea of reactivity in Vue.  

`ref()`, as a part of the composition API, is the API that let's you create a simple reactive value. 

`ref()` is called as a regular function and accepts an optional argument as the initial value, then returns a special value called ref (which is the reactive value).

```vue
<script setup>
import { ref } from 'vue'

const count = ref(0)

console.log(count.value); // 0
</script>
```

In the example above `ref(0)` creates a ref initialize with the number `0`. The ref is then stored into the variable `count` for later use.  

A ref value can be accessed simply by reading the special property `count.value` available on all the refs.  

`count.value` evaluates currently to `0`, because `0` is the initial value of the ref.  

`ref()` is a part of the Vue composition API, so you have to use it inside the `<script setup>` tag like it was done in the example above.  

Ok, simply creating refs isn't fun. The real magic happens when you change the value of a ref.  

What would happen if you change the value of the ref, i.e. update the `count.value`? Let's try to to it in the following example:

```vue
<script setup>
import { ref } from 'vue'

const count = ref(0)

const onClick = () => count.value++
</script>
<template>
  <button @click="onClick">Increase</button>
  <div>{{ count }}</div>
</template>
```
[Open the demo.]()

Open the demo. You'll see that initially count ref displays `0` on the screen.  

But after a few clicks on the Increase button, you'd notice that the count on the screen increased by the same amount of clicks. 

Cool! 

`count` ref is a reactive value: every time `count.value` changes (), Vue makes sure to update the component and reflect the new value on the screen.  

## 2. A non-reactive value

## 3. *ref()* in *setup()*

```vue
<script>
import { ref } from 'vue'

export default defineComponent({
  setup() {
    const count = ref(0)

    return { count }
  }
})
</script>
<template>
  <button>Increase</button>
  <div>{{ count }}</div>
</template>
```

The composition API coded inside `<script setup>` is usually shorter that using the options API with `setup` method.  In the following examples I will use `ref()` directly inside `<script setup>`. 

Of course, the behavior of `ref()` is exactly the same in `<script setup>` as in `defineComponent({ setup() {...} })`.  

## 2. ref's value

## 3. Watching ref changes

## 4. Implicit refs creation

## 5. Shallow refs

## 6. Conclusion

// 151