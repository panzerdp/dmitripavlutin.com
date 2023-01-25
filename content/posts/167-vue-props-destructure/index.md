---
title: "How to Destructure Props in Vue (Composition API)"
description: "How to correctly destructure props object in a Vue component while maintaining the reactivity."  
published: "2023-01-11"
modified: "2023-01-11"
thumbnail: "./images/cover-2.png"
slug: props-destructure-vue-composition
tags: ['vue', 'vue composition', 'props', 'reactivity']
recommended: ['vue-next-tick', 'ref-reactive-differences-vue']
type: post
---

The [reactivity API](https://vuejs.org/api/reactivity-core.html) adds many possibilities to the composition API while keeping the code brief. However, you should be aware of some of the pitfalls of reactivity, for example, losing reactivity.  

In this post, you will learn how to correctly destructure props of a Vue component so that props do not lose reactivity.  

## 1. Destructuring props

The compiler macro [defineProps()](https://vuejs.org/api/sfc-script-setup.html#defineprops-defineemits) helps to access the props supplied to a component inside the [setup script](https://vuejs.org/api/sfc-script-setup.html):

```vue
<script lang="ts" setup>
const props = defineProps()
// ...
</script>
```

`props` in the above example would be a reactive object containing the props supplied to the component. If the component props changes, `props` reactive object changes accordingly.  

The first thing you might want to do when accessing the `props` object is to destructure it to access the individual props. But to my surprise (when I was learning Vue composition API) the destructured props lose their reactivity!

Let's look at an example. The following component `<EvenOdd :count="5">` accepts a `count` prop as a number, and displays a message whether `count` is even or odd.  

The `count` prop is accessed after destructuring of the props object `const { count } = defineProps()`:

```vue{3}
<script lang="ts" setup>
import { computed } from 'vue';

const { count } = defineProps<{ count: number }>(); // Don't do this!
const even = computed(() => (count % 2 === 0 ? 'even' : 'odd'));
</script>

<template>The number is {{ even }}</template>
```

[Open the demo](https://stackblitz.com/edit/vue-props-lost-reactivity?file=src%2FApp.vue,src%2Fcomponents%2FEvenOdd.vue&terminal=dev)

Open the demo and click a few times the increase button. You'd notice that `"The number is even"` message always stays the same despite the `count` prop increasing.  

*When destructuring the `props` object `const { count } = defineProps()` the reactivity is lost.*  

The reactivity is lost because on destructuring `count` becomes a variable having a primitive value (a number). But Vue's reactivity cannot work directly on primitive values: it works either using a ref or a reactive *object*.  

> Be careful when assigning a primitive value directly to a variable in Vue: that's a premise of lost reactivity.  

## 2. Solution 1: use "props" object

The first obvious solution is to *not* destructure the `props` object, and access the props directly using a [property accessor](/access-object-properties-javascript/#1-dot-property-accessor): `props.count`.  

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

The downside of this approach is you *always* have to use a property accessor (e.g. `props.count`) to access a prop inside of the setup script. 

Anyways, I recommend using `props` object directly in most cases.  

## 3. Solution 2: use toRefs() helper

If you continue reading I bet you're big a fan of destructuring and cannot live without it.  

Ok, then you can keep the reactivity of the destructured props by deliberately transforming each property of the `props` object into a ref. Vue provides a special helper [toRefs(reactiveObject)](https://vuejs.org/api/reactivity-utilities.html#torefs) that does this exactly.  

Here's how it works:

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

`toRefs(props)` returns an object where each property is a ref to the corresponding prop.  

Now the destructuring `const { count } = toRefs(props)` is safe because `count` is a ref to the "count" prop. Now every time the "count" prop changes, the ref `count` reacts to the prop change.  

Having `count` as a ref, inside the `computed()` you have to access the prop value using `count.value` (because `count.value` is how you access the value of a ref).   

I find this approach convenient to pass the prop ref as an argument to a [composable](https://vuejs.org/guide/reusability/composables.html#mouse-tracker-example): e.g. `useMyComposable(count)` and not lose reactivity.  

Otherwise, I'd stick to the [previous approach](#2-solution-1-use-props-object) by using `props` object directly to access the props.   

## 4. Conclusion

Be aware that by applying the destructuring `const { propA, propB } = defineProps()` you lose the reactivity of props.  

There are mainly 2 approaches to solving the lost reactivity.  

The first one is to simply not destructure props, but rather access the props directly using a property accessor: `props.propA`, `props.propsB`.  

The second approach involves deliberately using the props as an object of refs: `const { propA, propB } = toRefs(props)`. This keeps the reactivity after destructuring. Then you can access properties as standalone refs, e.g. `propsA.value`, `propB.value`, etc.  

*What tricky cases of reactivity loss in Vue do you know?*