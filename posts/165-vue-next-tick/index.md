---
title: "How to Use nextTick() in Vue"
description: "nextTick(callback) executes the callback when the DOM has been updated."  
published: "2022-02-12"
modified: "2023-01-30"
thumbnail: "./images/cover-3.png"
slug: vue-next-tick
tags: ['vue', 'dom']
type: post
---

A change to Vue component's data (props or state) isn't immediately reflected in the DOM. Rather, Vue updates DOM asynchronously.  

You can catch the moment when Vue updates DOM using `Vue.nextTick()` or `vm.$nextTick()` functions. Let's see in detail how these functions work.

<Affiliate type="vueschoolVue" />

## 1. nextTick()

As Vue component data changes, the DOM is updated asynchronously. Vue collects multiple updates to virtual DOM from all the components, and then creates a single batch to update the DOM.

Updating DOM in a single batch is more performant than doing multiple small updates.  

For example, let's consider a component that toggles the display of an element:

```vue
<script setup>
import { ref } from 'vue'

const show = ref(true)
const content = ref()

const handleClick = () => {
  show.value = !show.value
  console.log(show.value, content.value)
}
</script>

<template>
  <div>
    <button @click="handleClick">Insert/Remove</button>
    <div v-if="show" ref="content">I am an element</div>
  </div>
</template>
```

[Try the demo.](https://codesandbox.io/s/vue-data-dom-not-sync-soxfzo?file=/src/App.vue)

Clicking on "Insert/Remove" button changes `show` flag, which toggles the display of `<div id="content">` element using `v-if="show"` directive.  

Looking into `handleClick`, right after data mutation `show.value = !show.value`, the logged DOM data doesn't correspond to `show` value. If `show` is `true`, then `content` is `null`: which means that DOM is not in sync with the component's data.   

If you want to catch the moment when DOM has just been updated, then you need to use a special function `nextTick(callback)`. It executes `callback` immediately after the new data updates reach DOM.  

Let's find the moment when the `<div>` element is inserted or removed from the DOM:

```vue {8-10}
<script setup>
import { ref, nextTick } from 'vue'

const show = ref(true)
const content = ref()

const handleClick = () => {
  show.value = !show.value
  nextTick(() => {
    console.log(show.value, content.value)
  })
}
</script>

<template>
  <div>
    <button @click="handleClick">Insert/Remove</button>
    <div v-if="show" ref="content">I am an element</div>
  </div>
</template>
```

[Try the demo.](https://codesandbox.io/s/vue-nexttick-sync-c4ybe7?file=/src/App.vue)

Open the demo and click a few times the *Insert/Remove* button. You'd see that `content` (the reference that contains the `<div>` element) is `null` or contains an element in exact correspondence with `show` value.  

Also, `nextTick(callback)` executes the `callback` when all children components updates have been submitted to DOM.  

There's also `this.$nextTick(callback)` available on the component instance, which you might find useful in the case of options API.  

## 2. nextTick() with async/await

If `nextTick()` is called without arguments, it will return a promise that will be resolved when component data changes reach DOM.  

This helps to take advantage of the more readable `async/await` syntax.  

For example, let's make the previous component more readable by catching the DOM update with the `async/await` syntax:

```vue {8}
<script setup>
import { ref, nextTick } from 'vue'

const show = ref(true)
const content = ref()

const handleClick = async () => {
  show.value = !show.value
  await nextTick()
  console.log(show.value, content.value)
}
</script>

<template>
  <div>
    <button @click="handleClick">Insert/Remove</button>
    <div v-if="show" ref="content">I am an element</div>
  </div>
</template>
```

[Try the demo.](https://codesandbox.io/s/vue-nexttick-asyncawait-bgllq7?file=/src/App.vue)

`const handleClick = async () => {...}` has been marked as an asynchronous function. 

When the *Insert/Remove* button is clicked, the value of `show` changes.

`await nextTick()` awaits until the changes reach DOM. Finally, `console.log(content)` logs the actual content of the reference.  

My recommendation is to use the `nextTick()` with the `async/await` syntax, as it's more readable than the callback approach.  

## 3. Conclusion

When you change the component's data, Vue updates the DOM asynchronously. 

If you want to catch the moment when DOM has been updated after the component's data change, then you need to use `nextTick(callback)` or `this.$nextTick(callback)` (options API) functions.  

Their single `callback` argument is invoked right after DOM update: and you are guaranteed to get the latest DOM in sync with the component's data.    

Alternatively, if you don't pass the callback argument to `nextTick()`: the functions will return a promise that'll be resolved when DOM is updated. 

I recommend using `nextTick()` with `async/await` syntax for better readability.  
