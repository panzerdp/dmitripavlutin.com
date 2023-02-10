---
title: "Vue ref() and refs"
description: "ref() is a Vue composition API function that return refs: small reactive values."  
published: "2023-02-10"
modified: "2023-02-10"
thumbnail: "./images/cover-2.png"
slug: vue-ref-api
tags: ['vue', 'vue composition', 'reactivity']
recommended: ['vue-next-tick', 'ref-reactive-differences-vue']
type: post
---

Well designed reactivity is one of the selling points of Vue. As a result of an user action a reactive value is updated, and automagically all of the components that use the reactive value are updated.  

refs in Vue composition API are the primary blocks of reactivity. And knowing refs well is a good path to working efficiently with reactivity in Vue.  

In this post I'm going to help you understand all the details that you need to know about Vue refs to work them very efficiently. Let's get started.  

## 1. ref()

Let's say that a component renders a reactive value to the screen. When the reactive value changes (for example based on a user event), Vue makes sure to re-render the component to reflect the new value on the screen.  

That's the idea of reactivity in Vue.  

`ref()` reactivity API let's you create simple reactive values. It works inside the `<script setup>`  or `setup()` method of options API.

`ref(initialValue)` is called as a regular function and accepts an optional argument as the initial value. `ref()` returns a special value called ref (which is the reactive value).

```vue
<script setup>
import { ref } from 'vue'

const count = ref(0) // 1) ref creation

console.log(count.value); // 2) ref read
</script>
<template>
  <div>{{ count }}</div> <!-- 3) ref read (unwraped) -->
</template>
```

`ref(0)` creates and returns a ref initialized with `0`. The ref is stored into the variable `count` for later use.  

A ref value can be accessed simply by reading the special property `count.value` available on all the refs. `count.value` is now `0` because that's the initial value of the ref.  

## 2. Updating refs

Let's implement a scenario with a button and a count state. When the user clicks the button, the count state should increase by one. The actual value of the count (even if it changes) has to be rendered on the screen.  

Implementing the scenario using a ref fits well. You can see in the scenario the need for *reactivity*: the screen should render always the actual value of the count.  

Here's an implementation of the scenario using `ref()`:

```vue
<script setup>
import { ref } from 'vue'

const count = ref(0)

const onClick = () => count.value++ // ref update
</script>
<template>
  <button @click="onClick">Increase</button>
  <div>{{ count }}</div>
</template>
```
[Open the demo.]()

Open the demo. You'll see that initially count is `0` on the screen. 

Click *Increase* button and count increases. Importantly, the most actual value of the count is rendered on the screen. *That's reactivity in action.* 


This demonstrates that `count` is a *reactive* value. When `count.value` changes, Vue updates the component and shows the new value on the screen.  

## 3. *ref()* in *setup()*

The composition API can be used inside [\<script setup\>](https://vuejs.org/api/sfc-script-setup.html) (see the previous examples), or inside the [setup()](https://vuejs.org/api/composition-api-setup.html) method of options API.  

I like `<script setup>` because it's shorter and more expressive than `setup()`. But that's me.  

Either way, you can also use `ref()` inside the `setup()` method if that's your preference:

```vue
<script>
import { ref } from 'vue'

export default defineComponent({
  setup() {
    const count = ref(0)

    return { count } // ref must be returned
  },
  methods: {
    onClick() {
      this.count.value++ // ref accessed using this.count
    }
  }
})
</script>
<template>
  <button @click="onClick">Increase</button>
  <div>{{ count }}</div>
</template>
```

The behavior of `ref()` is almost the same in `<script setup>` as in `setup() {...}`.  

Just don't forget to return the ref from the setup function, otherwise it won't be accessible in the component methods and template.  

And also inside the methods (like in `onClick` method above) you have to access the ref using `this` keyword: `this.count`.    

## 3. Template refs



## 4. Implicit refs

## 5. Watching refs

## 6. Shallow refs

## 7. Conclusion

// 656