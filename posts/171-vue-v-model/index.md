---
title: "How to Bind Form Inputs using v-model in Vue"
description: "How to bind form input elements like text input, select, textarea using v-model in Vue."
published: "2023-03-11"
modified: "2023-03-11"
thumbnail: "./images/v-model-form-input-cover.png"
slug: vue-v-model-form-inputs
tags: ['vue', 'v-model', 'input', 'form', 'reactivity']
recommended: ['vue-next-tick', 'ref-in-vue']
type: post
---

I prefer one-way data flow because of its simplicity. For example, component props flow one-way. The parent component sets the props of the child: `parent -> child`.  

But some situations require the parent and child to communicate two-ways. The parent provides data for the child, but the child can also provide data for the parent: `parent <-> child`.  

The two-way data flow is useful when working with form inputs. You might want to set an initial value in the input field (one way data flow), but also access the value that user types into the input (the second data flow).  

In this post, I'll help you understand how to use `v-model` to bind form inputs in Vue 3 to take advantage of the two-ways data flow.  

<TableOfContents maxLevel={1} />

## 1. v-model for input fields

Let's implement a component that renders an input field with the initial value `'Unknown'`. Also, as soon as the user types into the input field, the typed value should be rendered on the screen as text.  

`v-model` fits nicely to implement such a component. Connecting `v-model` with the input field requires 2 simple steps.  

First, `v-model` requires a *bus*: a reactive value that holds the data. The simplest bus is a [ref](/ref-in-vue/). Let's create a ref called `text`, initialized with the string `'Unknown'`.  

Second, add `v-model` as a regular attribute the input field tag in the template and assign to it the `text` ref: `v-model="text"`:

```vue
<script setup>
import { ref } from 'vue'

const text = ref('Unknown') // Step 1: create data bus
</script>
<template>
  <!-- Step 2: assign data bus to v-model -->
  <input v-model="text" type="input" />
  <div>{{ text }}</div>
</template>
```
[Open the demo.](https://codesandbox.io/s/v-model-input-1l5ybw?file=/src/App.vue)

Open the demo. Initially the input field has the value `'Unknown'`. Type something into the input field: and both the input field value and the text on the screen are updated.  

`v-model="text"` is *two-way data binding* in Vue.  

The first direction of flow happens during the initilization. The input value is initialized with `'Unknown'` the `text` ref's initial value.  

The second direction of flow occurs when you type into the input field. The input field updates `text` ref according what user types.  

## 3. v-model vs v-bind

Now you can ask an interesting question. What is the difference between using `v-model` and `:value` in Vue?

The answer is simple: `<input :value="value" />` provide only one direction of data flow: from the `value` ref. When user types into the input field, in such an implementation the `value` ref does not get updated.  

Let's simply change the previous example from `v-model="value"` to `:value="value"`:

```vue {6}
<script setup>
import { ref } from 'vue'

const value = ref('Unknown')
</script>
<template>
  <input :value="value" type="input" />
  <div>{{ value }}</div>
</template>
```
[Open the demo.](https://codesandbox.io/s/value-input-xnkptb?file=/src/App.vue)

Open the demo. The input field is initialized with `'Unknown'`.  

Type some characters into the input field, however, you'll see that the text rendered on the screen still stays as `'Unknown'`.  

The conclusion is in case of `:value="value"` data flow just in one direction: the input field value is assigned at first with ``

## 4. v-model and other bus types

## 4.1 reactive

## 4.2 computed

## 5. v-model and other input types

### 5.1 Select

### 5.2 Textarea

### 5.3 Checkbox

### 5.4 Radio

## 6. v-model modifiers

## 7. Conclusion