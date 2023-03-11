---
title: "v-model in Vue"
description: "v-model is the two-way data binding in Vue."
published: "2023-03-11"
modified: "2023-03-11"
thumbnail: "./images/vue-ref.png"
slug: vue-v-model
tags: ['vue']
recommended: ['vue-next-tick', 'ref-in-vue']
type: post
---

I prefer one-way data flow because of its simplicity. You can easily understand where the data comes from, and where it goes to.  

For example, component props data flows in one-way. The parent component sets the props of the child component: `parent -> child`.  

But some situations require the parent and child to have to communicate two-ways. The parent provides data for the child, but the child can also provide data for the parent through the same bus: `parent <-> child`.  

`v-model` implements the two-way data binding in Vue. 

I'll explain in an accessible so you can start using `v-model` easily and efficiently. 

*Note: this post describes how `v-model` works in Vue 3.*

<TableOfContents maxLevel={1} />

## 1. v-model for input fields

Let's implement a component that renders an input with the initial value `'Unknown'`. Also, as soon as the user types a value into the input field, the typed value should be rendered as a textual value on the screen.  

`v-model` fits nicely to implement such a component.  

First, note that `v-model` requires a *bus*: a reactive value that holds the bound data. The simplest bus is a [ref](/ref-in-vue/).  

Here's the code:

```vue
<script setup>
import { ref } from 'vue'

const value = ref('Unknown')
</script>
<template>
  <input v-model="value" type="input" />
  <div>{{ value }}</div>
</template>
```
[Open the demo.](https://codesandbox.io/s/v-model-input-1l5ybw?file=/src/App.vue)


That was a classic `v-model` usage example of a two-way data flow for an input field. `<input v-model="value" />` set the initial value of the input field (component to input), and the input field value modification by the user changes a data value too (input to component).  

## 2. v-model vs v-bind

## 3. v-model modifiers

## 4. v-model for components

## 5. Multiple v-model for components

## 6. Testing v-model

## 7. Conclusion