---
title: "v-model in Vue"
description: "v-model enables two way data binding in Vue."  
published: "2023-03-11"
modified: "2023-03-11"
thumbnail: "./images/vue-ref.png"
slug: vue-v-model
tags: ['vue']
recommended: ['vue-next-tick', 'ref-in-vue']
type: post
---

You might prefer one-way data flow because of the predictability of such a model. You always know where the data comes from, and where it goes to.  

For example, props in Vue work in one-way: the parent component sets the props of the child component. The data flows from the parent to the child in one direction. That's easy to understand and follow.  

```vue
<script setup>
import { ref } from 'vue'
import Child from './Child.vue'

const count = ref(0)
</script>
<template>
  <!-- count flows one way to the child -->
  <Child count={count} />
</template>
```

