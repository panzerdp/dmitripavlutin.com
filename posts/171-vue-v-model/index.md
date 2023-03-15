---
title: "How to Use v-model with Form Inputs in Vue"
description: "v-model binds form input fields for accessing and setting data to forms."
published: "2023-03-15"
modified: "2023-03-15"
thumbnail: "./images/v-model-form-input-cover-3.png"
slug: vue-v-model-form-inputs
tags: ['vue', 'v-model', 'input', 'form', 'reactivity']
recommended: ['vue-next-tick', 'ref-in-vue']
type: post
---

The two-way data flow provided by `v-model` is useful for working with form inputs. 

You can set an initial value in the input field (first data flow) and access the value user types into the input (the second data flow).  

Let's see how you can use `v-model` to bind form inputs in Vue 3.  

<TableOfContents maxLevel={1} />

## 1. Binding a form input

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

## 2. v-model vs v-bind

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

Despite the difference, there's a deep relationship between `:value` and `v-model`.  

The html template:

```html
<input v-model="text" />
```
can be expresss as:
 
```html
<input :value="text" @input="text = $event" />
```

In other words, `v-model` under the hood uses `:value`.

Take a look at the next example:

```vue {6}
<script setup>
import { ref } from 'vue'

const text = ref('Unknown')
</script>
<template>
  <input :value="text" @input="text = $event" type="input" />
  <div>{{ text }}</div>
</template>
```
[Try the demo.]()

Open the demo and type into the input field. You'll see that the two-way binding is working perfectly. 

## 3. Binding using reactive()

[reactive()](https://vuejs.org/api/reactivity-core.html#reactive) is a Vue reactivity API that makes an object reactive. 

The main difference between `ref()` and `reactive()` is that refs can store primitives and objects, while `reactive()` accepts only objects.  

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
  <div>Full name is {{ person.firstName }} {{ person.lastName }}</div>
</template>
```
[Open the demo.]()

`const person = reactive({ firstName: '', lastName: '' })` creates a reactive object.   

Then you have 2 input fields that are to correspoondingly the `person.firstName` and `person.lastName`.  

Open the demo. You'll see that initially both input fields and the text render `'John Smith'` full name.  

Type into the first or last name input fields, and you'll see that the rendered text changes according to the name you type.  

As seen, properties of reactive objects can also serve as a bus to bind to input fields in Vue.  

If you deal with a form having multiple fields, and you'd like to bind that form, then bind all the input fields to properties of a reactive object. It's way more concise than creating refs for each of the fields.  

## 4. Binding different input types

The the examples until now the regular input fext field was bound using `v-model`. 

Fortunately, all of the other input field types like select, textarea, etc. can be bound using `v-model`. Let's explore them.  

### 4.1 Textareas

Binding a textarea to a ref is straighforward. All you have to do is use `v-model` on the textarea tag: `<textarea v-model="longText" />`.  

```vue
<script setup>
import { ref } from 'vue'

const longText = ref("Well... here's my story. One morning...")
</script>
<template>
  <textarea v-model="longText" />
  <div>{{ longText }}</div>
</template>
```
[Open the demo.]()

### 4.2 Select fields

The select input field offers the user to select a value from a set of predefined options.  

Binding a select field is simple: `<select v-model="selected" />`. The ref `selected` must contain the value of the option that must be selected.  

Let's take a look at an example:

```vue
<script setup>
import { ref } from 'vue'

const employeeId = ref('2')
</script>
<template>
  <select v-model="employeedId">
    <option value="1">Jane Doe</option>
    <option value="2">John Doe</option>
    <option value="3">John Smith</option>
  </select>
  <div>Selected id: {{ employeeId }}</div>
</template>
```
[Open the demo.]()

`employeeId` is the ref bound to the select field. `employeeId` should bind to the `value` attribute of the option tags inside the select (but not to the text of the option).  

Because `employeeId` ref is initialized with `'2'`, `John Doe` option is initially selected.  

When you select another option, you can see that `employeeId` update with the newly selected option value.  

If the options of the select do not have an option attribute, then the binding will work with the text of the options. 

```vue
<script setup>
import { ref } from 'vue'

const employee = ref('Jane Doe')
</script>
<template>
  <select v-model="employeedId">
    <option>Jane Doe</option>
    <option>John Doe</option>
    <option>John Smith</option>
  </select>
  <div>Selected: {{ employee }}</div>
</template>
```
[Try the demo.]()

Now the binding works directly with the textual value of the options.  

### 4.3 Checkboxes

Not sure why but I've always found it a pain to read and set the check status of the checkboxes. 

Fortunately thanks to `v-model` binding to checkboxes now you can check and unckeck them much easier. If the bound ref is `true` &mdash; the checkbox is checked, `false` &mdash; unchecked.  

Let's create an exaple with 2 buttons and a checkbox. One button checks and another unchecks the checkbox:

```vue
<script setup>
import { ref } from 'vue'

const checked = ref(true)
</script>
<template>
  <input v-model="checked" type="checkbox" />
  <button @click="checked = true">Check</button>
  <button @click="checked = false">Uncheck</button>
</template>
```
[Open the demo.]()

Because `checked` ref is initialized with `true`, during the initial rendering the checkbox is checked.  

Clicking the *Uncheck* button changes `checked` ref value to `false`, which correspndingly unchecks the checkbox.  

Aside from simplifying the burden around check status, Vue makes an additional step and lets you customize the check and uncheck values. That could be useful if you'd like, for example, to use `'on'` or `'off'` values as a checkbox status.  

The customization of check/unckech value is performed by Vue specific attributes:  

```html
<input v-model="checked" true-value="on" false-value="off" />
```

Let's slighly modify the previous checkbox example to use the custom check value `'on'` and `'off'`:

```vue
<script setup>
import { ref } from 'vue'

const checked = ref('on')
</script>
<template>
  <input v-model="checked" type="checkbox" true-value="on" false-value="off" />
  <button @click="checked = 'on'">Check</button>
  <button @click="checked = 'off'">Uncheck</button>
</template>
```
[Open the demo.]()

Now `checked` ref is bound to the checkbox status, but has either `'on'` or `'off'` value.  

### 4.4 Radio buttons

If you'd like to bound a group of radio buttons, then you need to apply to the group the same `v-model` binding.  

```html
<input type="radio" v-model="option" value="a" />
<input type="radio" v-model="option" value="b" />
<input type="radio" v-model="option" value="c" />
```

For example, let's implement a radio button group that is used to select the color of a T-shirt:

``` vue
<script setup>
import { ref } from 'vue'

const color = ref('white')
</script>
<template>
  <label>White <input type="radio" v-model="color" value="white" /></label>
  <label>Red <input type="radio" v-model="color" value="red" /></label>
  <label>Blue <input type="radio" v-model="color" value="blue" /></label>
  <div>T-shirt color: {{ color }}</div>
</template>
```
[Open the demo.]()

Initially, the `white` radio option is selected because the `color` ref is initialized with `white`.  

Click on any other T-shirt color, and the `color` ref value changes according to the selected color.  

`value` attribute of the radio is bindable (aka you can use `:value`). That is helpful when the list of options comes from an array, for example:

``` vue{11}
<script setup>
import { ref } from 'vue'

const color = ref('white')
const COLORS = [
  ['White', 'white'],
  ['Black', 'black'],
  ['Blue', 'blue']
]
</script>
<template>
  <label v-for="[label, option] in COLORS" :key="option">
    {{ label }} <input type="radio" v-model="color" :value="option" />
  </label>
  <div>T-shirt color: {{ color }}</div>
</template>
```

[Open the demo.]()

## 5. v-model modifiers

On top of doing a wonderful work with binding form inputs, `v-model` has an additional feature called *modifier*.

A modifier is a piece of logic applied to `v-model` behavior to improve it in a certain way you need.  

### 5.1 trim

If you'd like to trim the content that user introduces into the input field, then `v-model.trim` is helpful:

```vue
<script setup>
import { ref } from 'vue'

const text = ref('')
</script>
<template>
  <input v-model.trim="text" type="text" />
  <pre>{{ text }}</pre>
</template>
```
[Open the demo.]()

Open the demo and type a value thats or ends with spaces, e.g. `'  Hi!  '`. You'll see that the rendered text doesn't have any spaces on both ends, meaning that it is trimmed.  

### 5.2 number

If you'd like to create an input that accepts only number, then `v-mode.number` is the way to go:

```vue
<script setup>
import { ref } from 'vue'

const number = ref('')
</script>
<template>
  <input v-model.number="number" type="text" />
  <div>{{ number }}</div>
</template>
```
[Open the demo.]()

Open the demo and type some numbers `'345'` &mdash; everything works.  

But if you try to type something other than numbers, like `'abc'`: you'll see that all non-numeric characters are stripped.  

### 5.3 lazy

By default `v-model` uses `input` event to determine when user types into the input field. But using the modifier `v-model.lazy` you can change the event to be `change`.

```vue {6}
<script setup>
import { ref } from 'vue'

const text = ref('Unknown')
</script>
<template>
  <input :value.lazy="text" type="input" />
  <div>{{ text }}</div>
</template>
```
[Open the demo.]()

When would you need to use `v-model.lazy`?

## 6. Conclusion

`v-model` allows binding form input to bus reactive values.  

