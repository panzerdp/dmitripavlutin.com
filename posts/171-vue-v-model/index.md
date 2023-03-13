---
title: "How to Use Vue v-model with Form Inputs"
description: "How to access form inputs values using Vue's v-model."
published: "2023-03-11"
modified: "2023-03-11"
thumbnail: "./images/v-model-form-input-cover-2.png"
slug: vue-v-model-form-inputs
tags: ['vue', 'v-model', 'input', 'form', 'reactivity']
recommended: ['vue-next-tick', 'ref-in-vue']
type: post
---

The two-way data flow provided by `v-model` is useful for working with form inputs. You can set an initial value in the input field (first data flow) and access the value user types into the input (the second data flow).  

In this post, I'll help you understand how to use `v-model` to bind form inputs in Vue 3.  

<TableOfContents />

## 1. v-model for input fields

Let's implement a component that renders an input field with the initial value `'Unknown'`. Also, as soon as the user types into the input field, the typed value should be rendered on the screen as text.  

`v-model` fits nicely to implement such a component. Connecting `v-model` with the input field requires 2 simple steps.  

First, `v-model` requires a *bus*: a reactive value that holds the data. The simplest bus is a [ref()](/ref-in-vue/). Let's create a ref called `text`, initialized with the string `'Unknown'`.  

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

[v-bind](https://vuejs.org/api/built-in-directives.html#v-bind) is another data binding mechanism in Vue: `<input v-bind:value="text" />`. `v-bind:value` can be shortened to `:value` (`v-bind` part can be omitted, but don't forget to keep the colon `:value`).  

What is the difference between `v-model` and `:value`?

`<input :value="value" />` is a one-way data flow mechanism. To understand the difference let's look at an example.  

Let's change the previous example from `v-model="text"` to `:value="text"`:

```vue {6}
<script setup>
import { ref } from 'vue'

const text = ref('Unknown')
</script>
<template>
  <input :value="text" type="input" />
  <div>{{ text }}</div>
</template>
```
[Open the demo.](https://codesandbox.io/s/value-input-xnkptb?file=/src/App.vue)

Open the demo. The input field is initialized with `'Unknown'`.  

Type something into the input field. You'll see that the text rendered on the screen always stays as `'Unknown'`.  Which means that `text` ref *is not updated* when the value of the input field changes.

`:value="text"` data flows just in one direction: from the `text` ref into the input field. Typing into the input field, however, doesn't change the `text` ref.  

`v-model` enables a *two-way* data flow, while `:value` enables a *one-way* data flow.  

## 4. v-model and other bus types

In the previous examples the [ref()](/ref-in-vue/) API was used as a data bus for two-way binding. But thanks to the well-designed Vue's reactivity API, you have more options than just refs: `reactive()` and `computed()`.  

### 4.1 reactive

[reactive()](https://vuejs.org/api/reactivity-core.html#reactive) is a Vue reactivity API that makes an object reactive. 

The main difference between the use of `ref()` vs `reactive()` is that refs can accept primitive values (the `text` ref above holds a string), while `reactive()` accepts only objects.  

Anyways, binding objects to form inputs is helpful is you have multiple input fields in the same form, and each form field has to bound to a specific property of the object.  

Let's implement a form having the first and last name input fields. These input fields have to be bound with a reactive object: `{ firstName: 'John', lastName: 'Smith' }`.

```vue
<script setup>
import { ref } from 'vue'

const person = reactive({ firstName: 'John', lastName: 'Smith' })
</script>
<template>
  <input v-model="person.firstName" type="input" />
  <input v-model="person.lastName" type="input" />
  <div>Your full name is {{ person.firstName }} {{ person.lastName }}</div>
</template>
```
[Open the demo.]()

`const person = reactive({ firstName: '', lastName: '' })` creates a reactive object.   

Then you have 2 input fields that are to correspoondingly the `person.firstName` and `person.lastName`.  

Open the demo. You'll see that initially both input fields and the text render `'John Smith'` full name.  

Type into the first or last name input fields, and you'll see that the rendered text changes according to the name you type.  

As seen, properties of reactive objects can also serve as a bus to bind to input fields in Vue.  

If you have multiple fields of a form, and you'd like to bind that form, then I recommend you to bind all those input fields to properties of a reactive object.  

### 4.2 computed

[computed()](https://vuejs.org/api/reactivity-core.html#computed) is another wonderful reactivity API. As you might know already, it uses another reactive data to compute new reactive data.  

Most of the time `computer()` is used exactly what is supposed to do: compute some additional data based on existing data. For example, having `count` a ref, you might use `computed()` to determine whether the `count` number is even or odd:

```vue
<script setup>
import { ref, computed} from 'vue'

const count = ref(0)
const isEven = computed(() => count.value % 2 === 0)

</script>
<template>...</template>
```

## 5. v-model and other input types

### 5.1 Select

### 5.2 Textarea

### 5.3 Checkbox

### 5.4 Radio

## 6. v-model modifiers

## 7. Conclusion