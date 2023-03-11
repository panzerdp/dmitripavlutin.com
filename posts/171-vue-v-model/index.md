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

You might prefer one-way data flow because of the predictability of such a model. You always know where the data comes from, and where it goes to.  

For example, Vue props flow in one-way: the parent component sets the props of the child component. The data flows from the parent to the child in one direction. That's easy to understand and follow.  

But some situations need the parent and child to have a two-way (aka bi-directional) communication. For example, to set a value for an input field, but at the same time you'd like to read the value of the input field when the user types into.  

`v-model` implements the two-way data binding in Vue. 

In this post, you will learn how to use `v-model` easily and efficiently.  

*Note: this post describes how `v-model` works in Vue 3.*

<TableOfContents maxLevel={1} />

## 1. v-model for input fields

The basic way you can use `v-model` is to implement a two-way data flow for an input field. In simple words, you can set the initial value of the input field (one way of data flow), and the input field value modification by the user changes a data value too (another way of data flow).  

Let's implement a component that renders an input with the initial value `'Unknown'`. Also, as soon as the user types a value into the input field, the typed value should be rendered as a textual value on the screen.  

That's a good scenario on using the `v-model`. 

`v-model` to work requires a *communicator*: a reactive value that holds the bound data. The simplest communicator is a [ref](/ref-in-vue/).  

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
[Open the demo.]()

## 2. v-model vs v-bind

## 3. v-model modifiers

## 4. v-model for components

## 5. Multiple v-model for components

## 6. Testing v-model

## 7. Conclusion