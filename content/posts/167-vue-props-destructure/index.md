---
title: "How to Destructure Props in Vue (Composition API)"
description: "How to correctly destructure props object in a Vue component and keep the reactivity"  
published: "2023-01-07"
modified: "2023-01-07"
thumbnail: "./images/cover.png"
slug: props-destructure-vue-composition
tags: ['vue', 'vue composition', 'props']
recommended: ['vue-next-tick', 'vue-debounce-throttle']
type: post
---

Vue [composition API](https://vuejs.org/guide/extras/composition-api-faq.html) uses an [imperative approach](https://en.wikipedia.org/wiki/Imperative_programming) to code the behavior of components. Compared to the [options API](https://vuejs.org/guide/typescript/options-api.html), I find the composition API being more brittle while sacrificing a bit in explicitness.  

The [reactivity API](https://vuejs.org/api/reactivity-core.html) adds many possibilities to the composition API, while, again, keeping the code brief. However, some of the behavior of the reactivity in Vue might be a bit unexpected. For example, sometimes you might unexpectedly lose the reactivity of data.  

In this post, you will learn how to correctly destructure the props of a Vue component so that props do not lose reactivity.  

## 1. Destructuring props

If you want to access the props supplied to a component inside the script setup, you need to use a special compiler macro [defineProps()](https://vuejs.org/api/sfc-script-setup.html#defineprops-defineemits):

```vue
<script lang="ts" setup>
const props = defineProps()
// ...
</script>
```

`props` in the above example would be a reactive object containing the props supplied to the component.  

What comes to my mind (and most likely yours too) when accessing the `props` object is the willingness to destructure it to access the individual props. But to my surprise (when I was learning Vue composition API) the destructured props lose their reactivity!

Let's take a look at an example. The following component `<EvenOdd :count="5">` accepts a `count` prop as a number, and displays a message whether `count` is even or odd.  

The `count` prop is accessed after destructuring of the props:

```vue{3}
<script lang="ts" setup>
import { computed } from 'vue';

const { count } = defineProps<{ count: number }>(); // Don't do this!
const even = computed(() => (count % 2 === 0 ? 'even' : 'odd'));
</script>

<template>The number is {{ even }}</template>
```

[Open the demo](https://stackblitz.com/edit/vue-props-lost-reactivity?file=src%2FApp.vue,src%2Fcomponents%2FEvenOdd.vue&terminal=dev)

Open the demo and click a few times the increase button. You'd notice that `"The number is even"` message always stays the same despite the count increasing.  

*When destructuring the `props` object `const { count } = defineProps()` the reactivity is lost.*  

The reactivity is lost because on destructuring `count` becomes a variable containing a primitive value (a number). But Vue's reactivity cannot work directly on primitive values: it works either using a ref or a reactive object.  

Be suspicious every time you assign a primitive value directly to a variable in Vue: that's a premise of lost reactivity.  

## 2. Solution 1: use "props" object

The first obvious solution is to simply *not* destructure the `props` object, maintaining `props` reactivity.

```vue {3}
<script lang="ts" setup>
import { computed } from 'vue';

const props = defineProps<{ count: number }>();
const even = computed(() => (props.count % 2 === 0 ? 'even' : 'odd'));
</script>

<template>The number is {{ even }}</template>
```
[Open the demo.](https://stackblitz.com/edit/vue-props-lost-reactivity-thnfvm?file=src%2FApp.vue,src%2Fcomponents%2FEvenOdd.vue&terminal=dev)

In the example above accessing `props.count` inside `computed()` maintains the reactivity when `props.count` changes. `props` object is reactive and any changes to it are tracked correctly.  

The downside of this approach is you *always* have to use `props` object to access the props inside of the setup script. Anyways, I find myself using this approach most of the time.  

## 3. Solution 2: use toRefs() helper

If you continue reading I bet you're big a fan of destructuring and cannot live without it. Using `props.count` is not for you.  

Ok, then you can keep the reactivity of the destructured props by deliberately transforming each property of the `props` object to a ref. Vue provides a special helper [toRefs(reativeObject)](https://vuejs.org/api/reactivity-utilities.html#torefs) that does this exactly.  

Here's how it could work:

```vue {4}
<script lang="ts" setup>
import { toRefs, computed } from 'vue';

const props = defineProps<{ count: number }>();
const { count } = toRefs(props);
const even = computed(() => (count.value % 2 === 0 ? 'even' : 'odd'));
</script>

<template>The number is {{ even }}</template>
```
[Open the demo.](https://stackblitz.com/edit/vue-props-lost-reactivity-z5fi4s?file=src%2FApp.vue,src%2Fcomponents%2FEvenOdd.vue&terminal=dev)

`const { count } = toRefs(props)` return an object having each property as a ref connected to the changes in `props`. The destructuring is safe because `count` is now a ref (reactive value).  

Inside `computed()`, the `count.value` is used to access the prop value.  

I find this approach convenient when I need props as refs. For example, when I'd like to pass the prop as a reactive value to other [composables](https://vuejs.org/guide/reusability/composables.html#mouse-tracker-example): e.g. `useMyComposable(propAsRef)`. 

Otherwise, I'd stick to the [previous approach](#2-solution-1-use-props-object) by using `props` object directly to access the props.   

## 4. Conclusion

Be aware that applying the destructuring `const { prop1, prop2 } = defineProps()` you lose the reactivity of props.  

There are mainly 2 approaches to solving the lost reactivity.  

The first one is to simply not destructure props, but rather access the props directly using a property accessor: `props.prop1`, `props.props2`.  

The second approach involves deliberately using the props as an object of refs: `const { prop1, prop2 } = toRefs(props)`. This keeps the reactivity on destructuring. Then you can access properties as standalone refs, e.g. `props1.value`, `prop2.value`, etc.  