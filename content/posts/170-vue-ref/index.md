---
title: "Vue ref() and refs"
description: "ref() is a Vue composition API function that return refs: small reactive values."  
published: "2023-02-12"
modified: "2023-02-12"
thumbnail: "./images/cover-2.png"
slug: vue-ref-api
tags: ['vue', 'vue composition', 'reactivity']
recommended: ['vue-next-tick', 'ref-reactive-differences-vue']
type: post
---

Well designed reactivity is one of the selling points of Vue. A reactive value is updated (e.g. after a user action), and automagically all of the components that use the reactive value are updated.  

refs in Vue composition API are the primary tool of reactivity. Knowing refs well is the right path to get the most of Vue reactivity.  

In this post I'll help you understand the necessary details you need to know about Vue refs. Let's get started.  

## 1. ref()

A component renders a value to the screen. When the value changes (e.g. based on an event triggered by the user), Vue makes re-renders the component to reflect the new value on the screen. *That's the idea of reactivity in Vue.*  

`ref()` reactivity API let's you create simple reactive values. 

`ref()` works inside the `<script setup>`  or `setup()` method of options API.

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

A ref value can be accessed simply by reading the special property `count.value` available on all the refs. `count.value` is currently `0` because that's the initial value of the ref.  

## 2. Updating refs

The true power of refs opens when you update them, and see how Vue magically re-renders the content on the screen to reflect the changes.  

Updating a ref is done straigforward. All you have to do is just update the `myRef.value` property.  

Contrary to the ref creation, you can update a ref value anywhere you want, e.g. even outside `<script setup>`. More ofter, however, you will update refs inside event handlers.  

Let's implement a scenario having a button and a count state. When the user clicks the button, the count state increases by one. The actual value of the count (even if it changes) needs to be rendered on the screen.  

You can see in the scenario *the need for reactivity*: the screen must render always the actual value of the count. Using a ref fits well, since a ref is reactive.  

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

`count` is a *reactive* value. When `count.value` changes, Vue updates the component and shows the new count value on the screen.  

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

The behavior of `ref()` is almost the same in `<script setup>` as in `setup() {...}`. There are just 2 nuances to remember.  

First, don't forget to return the ref from the setup function `return { count }`. Otherwise it won't be accessible in the component methods and template.  

Second, you have to access the ref using `this` keyword. For example `this.count` inside the methods in `onClick` event handler above accesses the ref (not directly `count`).  

## 3. Values of refs

In the examples above I've been using the count ref, which normally operates on a an integer value. Thus refs can store primitive values like numbers, strings, booleans, `undefined` or `null`.  
 
But a ref can store and even more complex data structures: objects, arrays, maps, and even DOM elements (I'll describe how it does that in the next section).  

Let's store inside of a ref a plain JavaScript object:

``` vue
<script setup>
import { ref } from 'vue'

const hero = ref({ name: 'Batman' }) // ref contains an object

console.log(hero.value.name) // logs 'Batman'
</script>
```

`ref({ name: 'Batman' })` creates a ref that stores an object. Then you can easily access the object using `hero.value`. And also access any properties of that object using regular property accessors: `hero.value.name`.  

Moreover, the object stored in a ref automagically *becomes reactive*! And the reactivity is applied through any deeply nested object or array of the object stores in the ref.    

Let's update the hero name from `'Batman'` to `'Joker'` when a button is clicked:
``` vue
<script setup>
import { ref } from 'vue'

const hero = ref({ name: 'Batman' })

const onClick = () => hero.value.name = 'Joker' // reactive change
</script>
<template>
  {{ hero.name }} 
  <button @click="onClick">Change</button>
</template>
```

Since `hero` ref is reactive, the change `hero.value.name = 'Joker'` is reflected on the screen by changing from `'Batman'` to `'Joker'`.  

## 4. Template refs

Normally you don't have to access and manipulate DOM elements directly. Let Vue take care of everything regarding DOM. 

But there are situations you need to access DOM elements. For example when integrating a 3rd party code that isn't Vue-aware.  



## 5. Implicit refs

## 6. Watching refs

## 7. Conclusion