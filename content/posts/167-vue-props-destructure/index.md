---
title: "How to Destructure Props in Vue (Composition API)"
description: "How to correctly destructure props object in a Vue component and keep the reactivity"  
published: "2023-01-07"
modified: "2023-01-07"
thumbnail: "./images/cover-2.png"
slug: props-destructure-vue-composition
tags: ['vue', 'props']
recommended: ['vue-next-tick', 'vue-debounce-throttle']
type: post
---

Vue [composition API](https://vuejs.org/guide/extras/composition-api-faq.html) uses a more [imperative approach](https://en.wikipedia.org/wiki/Imperative_programming) to code the behavior of components. Compared to the [options API](https://vuejs.org/guide/typescript/options-api.html), I find the composition API being more brittle, while sacrificing a bit in expliciteness.  

The [reactivity API](https://vuejs.org/api/reactivity-core.html) adds many possibilities to the composition API, while, again, keeping the code brief and relatively simple. However, some of the behavior of the reactivity in Vue might be a bit unexpected when you first try to learn them.  

In this post, you will learn how to correctly destructure the props of a Vue component so that the values do not loose their reactivity.  

## 1. Destructuring props

If you want to access the properties supplied to a component inside the script setup, you need to use  a special compiler macro `defineProps()`.  

To my honest suprise, one of such unexpected behavior happens when you try to destructure the props in the setup script:

```vue
<script lang="ts" setup>
const { count } = defineProps<{ count: number }>()
// Won't work...
const even = computed(() => count ? 'even' : 'odd')
</script>
<template>The number is {{ even }}</template>
```

## 2. Solution 1: always use "props" object

The first obvious solution is to simply no destructure the props object:

```vue {1}
<script lang="ts" setup>
const props = defineProps<Props>()
// use props.prop1, props.prop2, etc
</script>
```

In the example above `props` object contains the component properties. Because no destructuring happens, `props` internally is a reactive object.

```vue {1}
<script lang="ts" setup>
const props = defineProps<{ count: number }>()
// Works!
const even = computed(() => props.count ? 'even' : 'odd')
</script>
<template>The number is {{ even }}</template>
```

Of course, the downside to this approach is that you always have to use `props` object to access the props. For example, in template `props.count` is used to reactively access the `count` prop.  

On the other side, I find this approach quite useful when I am accessing the property value just once. In the example above, I would keep `props.count` because it doesn't bring too much boilerplate code.  

## 3. Solution 2: use toRefs() helper

The second approach is to deliberately transform the `props` reactive object into an object whose properties are refs. To make the `props` destructuring keep the reactivity use a special helper `toRefs()` provided by the Vue Composition API.  

Here's how it could work:

```vue {1,5}
<script lang="ts" setup>
import { toRefs } from 'vue'

const props = defineProps<{ count: number }>()
const { number } = toRefs(props)
// Works!
const even = computed(() => count ? 'even' : 'odd')
</script>
<template>
  The number is {{ even }}
</template>
```

Note that on the line 3 `const { number } = toRefs(props)` transforms the reactive object `props` into an object having each property as refs. After that, the destructuring is safe because `number` is a reactive value.  

This approach requires an additional import of `toRefs` function, and as well calling `toRefs(props)` itself. Anyways, I find this approach more convinient when I have to access many times the value of a prop: which thanks to destructuring allows me to skip using `props.<prop>` every time.  

## 4. Conclusion

`const props = defineProps()` returns a reactive object having the component props. However, if you apply the destructuring `const { prop1, prop2, ... } = defineProps()` you loose the reactivity.  

There are mainly 2 approaches to solve the lost reactivity.  

The first one, useful in case if you don't access often the prop values, is to simply not use the destructuring, and access the properties directly using `props.prop1`, `props.props2`, etc. property accessor. In small components, I almost always use this approach.  

The second approach involves deliberately transforming the props object into an object containing refs: `const { prop1, prop2, ... } = toRefs(props)`. This approach keeps the reactivity on destructuring. Then you can access properties as standalone variable, e.g. `props1`, `prop2`, etc.  

I find the second approach more useful when I have to access the same prop value multiple times in the setup script.  
