---
title: "How to Bind Form Inputs using v-model in Vue"
description: "How to bind form input elements like text input, select, textarea using v-model in Vue."
published: "2023-03-11"
modified: "2023-03-11"
thumbnail: "./images/vue-v-model-cover-3.jpg"
slug: vue-v-model-form-inputs
tags: ['vue', 'v-model', 'input', 'form', 'reactivity']
recommended: ['vue-next-tick', 'ref-in-vue']
type: post
---

I prefer one-way data flow because of its simplicity. You can easily understand where the data comes from, and where it goes to.  

For example, component props flow one-way. The parent component sets the props of the child component: `parent -> child`.  

But some situations require the parent and the child to communicate two-ways. The parent provides data for the child, but the child can also provide data for the parent: `parent <-> child`.  

`v-model` implements the two-way data binding in Vue. 

In this post, I'll help you understand easily `v-model` in Vue 3.  

<TableOfContents maxLevel={1} />

## 1. v-model for input fields

Let's implement a component that renders an input field with the initial value `'Unknown'`. Also, as soon as the user types into the input field, the typed value should be rendered on the screen as text.  

`v-model` fits nicely to implement such a component. Connecting `v-model` with the input field requires 2 simple steps.  

First, `v-model` requires a *bus*: a reactive value that holds the data. The simplest bus is a [ref](/ref-in-vue/). Let's create a ref called `value`, initialized with the string `'Unknown'`.  

Second, add `v-model` as a regular attribute the input field tag in the template and assign to it the `value` ref: `v-model="value"`:

```vue
<script setup>
import { ref } from 'vue'

const value = ref('Unknown') // Step 1: create data bus
</script>
<template>
  <!-- Step 2: assign data bus to v-model -->
  <input v-model="value" type="input" />
  <div>{{ value }}</div>
</template>
```
[Open the demo.](https://codesandbox.io/s/v-model-input-1l5ybw?file=/src/App.vue)

Open the demo. Initially the input field has the value `'Unknown'`. Type something into the input field: and both the input field value and the text on the screen are updated.  

That's the *two-way data binding* in Vue.  

OK. But why exactly is it two-ways?  

The first way, or direction, of data flow happens during the initilization. The input value uses `'Unknown'` initial value from the `value` ref.  

The second way, or direction, of data flow happens when you type into the input field. The input field updates `value` ref according what user types.  

## 3. v-model vs v-bind

## 4. v-model and reactive

## 5. v-model and computed

## 6. v-model modifiers

## 7. Conclusion