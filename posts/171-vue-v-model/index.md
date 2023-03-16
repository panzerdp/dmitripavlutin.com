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

The idea of `v-model` in Vue is simple.  

Define a reactive `text` (usually a ref), and then bind this value to an input using `v-model="text"`. This creates a two-way data flow:

* User types into the input: `text` ref changes (first flow)
* `text` ref changes programmaticaly: the value of the input changes (second flow)

Let's see how to use `v-model` to bind form inputs in Vue 3.  

<TableOfContents maxLevel={1} />

## 1. Binding a form input

Let's implement a component that renders an input field with the initial value `'Unknown'`. The value that user introduces into the input field renders on the screen.  

`v-model` fits nicely to implement such a component. Connecting `v-model` with the input field requires 2 simple steps:

1) `const text = ref()`: reactive value to serve as a *data bus* for `v-model`
2) `v-model="text"`: add `v-model` to the input field tag assigned with `text`.

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

Open the demo. The input field contains initially `'Unknown'`. Type something into the input field: and both the input value and the text on the screen update.  

`v-model="text"` is *two-way data binding* in Vue.  

The first direction of flow happens during the initialization. The input value is initialized with `'Unknown'` the `text` ref's initial value.  

The second direction of flow occurs when you type into the input field. `v-model` takes the value of the input and updates `text` ref with it.  

## 2. v-model vs v-bind

[v-bind](https://vuejs.org/api/built-in-directives.html#v-bind) is another data binding mechanism in Vue: 

```html
<input v-bind:value="text" type="text" />
```

which can be shortened to:

```html
<input :value="text" type="text" />
```

What is the difference between `v-model` and `:value`? `<input :value="value" />` is a *one-way* data flow mechanism. 

To understand the difference let's change the previous example's input tag from `v-model="text"` to `:value="text"`:

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

Type some characters into the input field... and the text rendered on the screen always stays the same &mdash; `'Unknown'`. `text` ref *is not updated* when the input field changes.  

`:value="text"` makes data flow in one direction only: from the `text` ref to the input field. Changing the input field value, however, doesn't change `text` ref.  

In conclusion, `v-model` enables a *two-way* data flow, while `:value` enables a *one-way* data flow.  

### 2.2 Emulating v-model

Despite the difference, `v-model` can be emulated using `:value` and `@input`:

```html
<input v-model="text" type="text" />
```

can be expressed as:
 
```html
<input :value="text" @input="text = $event.target.value" type="text" />
```

The following code doesn't use `v-model`, but still has two-way data flow working:

```vue {7-8}
<script setup>
import { ref } from 'vue'

const text = ref('Unknown')
</script>
<template>
  <input 
    :value="text" 
    @input="text = $event.target.value" 
    type="input" 
  />
  <div>{{ text }}</div>
</template>
```
[Open the demo.](https://codesandbox.io/s/v-model-using-v-bind-ble7s9?file=/src/App.vue)

Open the demo and type some characters into the input. The two-way binding is working correctly.  

The regular binding `:value="text"` enables the first flow.  

`@input="text = $event.target.value"` updates `text` when user types into the input field gets triggered. That's the second flow.  

## 3. Binding using reactive()

[reactive()](https://vuejs.org/api/reactivity-core.html#reactive) is a Vue reactivity API that makes an object reactive.  

The main [difference](/ref-reactive-differences-vue/) between `ref()` and `reactive()` is that refs can store primitives and objects, while `reactive()` accepts only objects. And `reactive()` object can be access directly (without `.value` property as in the case of refs).

Binding a reactive object to form inputs is handy when you have a lot of inputs. You can bind each input field with a specific property of the reactive object.  

Let's implement a form having first and last name inputs, and bound these to a reactive object's properties:

```vue
<script setup>
import { reactive } from 'vue'

const person = reactive({ firstName: 'John', lastName: 'Smith' })
</script>
<template>
  <input v-model="person.firstName" type="input" />
  <input v-model="person.lastName" type="input" />
  <div>Full name is {{ person.firstName }} {{ person.lastName }}</div>
</template>
```
[Open the demo.](https://codesandbox.io/s/v-model-reactive-2p5oce?file=/src/App.vue)

`const person = reactive({ firstName: '', lastName: '' })` creates a reactive object.   

`v-model="person.firstName"` binds with the first name property, as well as `v-model="person.lastName"` binds to the last name property.  

Open the demo. Type into the first or last name inputs, and you'll see that the rendered text changes according to the name you type.  

Pretty nice! Properties of a reactive object can serve as data buses for `v-model`. Use this approach to bind many input fields.  

## 4. Binding different input types

Many other input types like select, textarea, checkboxes, radio buttons can bind using `v-model`. Let's explore them.  

### 4.1 Textareas

Binding a textarea to a ref is straightforward. Just use `v-model` on the textarea tag `<textarea v-model="longText" />`:

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
[Open the demo.](https://codesandbox.io/s/v-model-textarea-i1hfxf?file=/src/App.vue)

### 4.2 Select fields

The select (aka dropdown) field offers user a pre-defined set of options to choose from.  

Binding a select is simple: `<select v-model="selected" />`:

```vue
<script setup>
import { ref } from 'vue'

const employeeId = ref('2')
</script>
<template>
  <select v-model="employeeId">
    <option value="1">Jane Doe</option>
    <option value="2">John Doe</option>
    <option value="3">John Smith</option>
  </select>
  <div>Selected id: {{ employeeId }}</div>
</template>
```
[Open the demo.](https://codesandbox.io/s/v-model-select-6bmc9t?file=/src/App.vue)

`employeeId` is the ref bound to the select and will get the value of the option being selected.  

Because `employeeId` ref is initialized with `'2'`, `John Doe` option is initially selected.  

When you select another option, you can see that `employeeId` updates with the newly selected option value.  

If the select options do not have `value` attributes, then the binding works with the *text* of the options:  

```vue
<script setup>
import { ref } from 'vue'

const employee = ref('Jane Doe')
</script>
<template>
  <select v-model="employee">
    <option>Jane Doe</option>
    <option>John Doe</option>
    <option>John Smith</option>
  </select>
  <div>Selected: {{ employee }}</div>
</template>
```
[Open the demo.](https://codesandbox.io/s/v-model-select-without-option-value-xgqj0p?file=/src/App.vue)

Now the binding works directly with the textual value of the options. If you'd select the second option, then `employee` ref is assigned with `'John Doe'`.  

### 4.3 Checkboxes

Thanks to `v-model` binding checkboxes is easy:

```html
<input ref="checked" type="checkbox" />
```

`checked` ref is assigned with a boolean value indicating whether the checkbox is checked or not.  

Let's create a checkbox that bounds to a `checked` ref:
```vue
<script setup>
import { ref } from 'vue'

const checked = ref(true)
</script>
<template>
  <label><input v-model="checked" type="checkbox" />Want a pizza?</label>
  <div>{{ checked }}</div>
</template>
```
[Open the demo.](https://codesandbox.io/s/v-model-checkbox-oyqej0?file=/src/App.vue)

`checked` ref is initialized with `true` and thus initially the checkbox is checked. Checking or unchecking the checkbox updates `checked` ref correspondingly with `true` or `false`. No rocket science here.  

To customize the checked/unchecked binding to other values that a boolean, then Vue offers 2 Vue-specific attributes on the checkbox:  

```html {2-3}
<input 
  v-model="checked" 
  true-value="Yes!" 
  false-value="No" 
/>
```

Now `checked` would be assigned to `'Yes!'` (as true value) or `'No'` (as false value) string depending on the checkbox status.  

Let's modify the previous example to use the custom values `'Yes!'` and `'No'`:

```vue
<script setup>
import { ref } from 'vue'

const answer = ref('Yes!')
</script>
<template>
  <label>
    <input v-model="answer" type="checkbox" true-value="Yes!" false-value="No"  />
    Want a pizza?
  </label>
  <div>{{ answer }}</div>
</template>
```
[Open the demo.](https://codesandbox.io/s/v-model-checkbox-custom-check-values-go1f9u?file=/src/App.vue)

`answer` now can have either `'Yes!'` or `'No'` depending on the checkbox's check status.  

### 4.4 Radio buttons

To bind a group of radio buttons apply to the group the same the same bus binding `v-model="option"`:

```html
<input type="radio" v-model="option" value="a" />
<input type="radio" v-model="option" value="b" />
<input type="radio" v-model="option" value="c" />
```

For example, let's implement a radio buttons group to select the color of a T-shirt:

``` vue
<script setup>
import { ref } from "vue"

const color = ref("white")
</script>
<template>
  <label><input type="radio" v-model="color" value="white" />White</label>
  <label><input type="radio" v-model="color" value="red" />Red</label>
  <label><input type="radio" v-model="color" value="blue" />Blue</label>
  <div>T-shirt color: {{ color }}</div>
</template>
```
[Open the demo.](https://codesandbox.io/s/v-model-checkbox-custom-check-values-forked-jwei9o?file=/src/App.vue)

Initially, the `White` radio is selected because the `color` ref is initialized with `'white'`.  

Click on any other T-shirt color, and the `color` ref changes according to the selected color.

`value` attribute of the radio is bindable: you can use `:value`. That is helpful when the list of options comes from an array, for example:

```vue {12}
<script setup>
import { ref } from "vue"

const color = ref("white")
const COLORS = [
  { option: "white", label: "White" },
  { option: "black", label: "Black" },
  { option: "blue", label: "Blue" },
]
</script>
<template>
  <label v-for="{ option, label } in COLORS" :key="option">
    <input type="radio" v-model="color" :value="option" /> {{ label }}
  </label>
  <div>T-shirt color: {{ color }}</div>
</template>
```

[Open the demo.](https://codesandbox.io/s/v-model-radio-bind-value-m16nlk?file=/src/App.vue)

## 5. v-model modifiers

On top of doing a wonderful job with binding form inputs, `v-model` has an additional feature called modifier.

> *A modifier* is a piece of logic applied to `v-model` to customize its behavior. A modifier is applied to `v-model` by using a dot syntax `v-model.<modifier>`, for example `v-mode.trim`.  

By default Vue offers 3 modifies: trim, number, and lazy.  

### 5.1 trim

Trimming a string means removing whitespaces from the beginning and the end of the string. For example, trim applied to `' Wow!  '` results in `'Wow!'`.   

`v-model.trim` modifier trims the input field value before assinging the value to the bound ref.  

```vue
<script setup>
import { ref } from 'vue'

const text = ref('')
</script>
<template>
  <input v-model.trim="text" type="text" />
  <pre>"{{ text }}"</pre>
</template>
```
[Open the demo.](https://codesandbox.io/s/v-model-trim-34d97r?file=/src/App.vue)

Open the demo. Type a value that starts or ends with spaces, e.g. `'  Hi!  '`. You'll see that the rendered text `'Hi!'` doesn't have spaces on both ends.  

### 5.2 number

`v-mode.number` modifier applies a number parser on the input field value.  

`v-model.number="number"` assigns to `number` a real number if the user introduced a value that can be parsed to a number. In other cases, if the introduced value is not numeric, `number` ref is just assigned to the original string.  

```vue
<script setup>
import { ref } from "vue";

const number = ref("");
</script>
<template>
  <input v-model.number="number" type="text" />
  <div>{{ typeof number }}</div>
</template>
```
[Open the demo.](https://codesandbox.io/s/v-model-number-vbeifz?file=/src/App.vue)

When you introduce `'345'` into the input, then `number` ref becomes `345` (a number). Value parsing happens automatically.  

But if you introduce a non-numeric value into the input, like `'abc'`, then `number` ref is assigned with the same value `'abc'`.   

### 5.3 lazy

By default, `v-model` uses ["input"](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/input_event) event to determine when to update the bound ref. But using the modifier `v-model.lazy` you can alter the event to be ["change"](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/change_event) event.  

What's the main difference between `input` and `change` events? 

`input` is triggered every time you keypress in the input field. 

`change`, however, is triggered *only* when you take the focus from the input field. Typing into the input field does not trigger `change`.  

The following example uses lazy binding:

```vue {6}
<script setup>
import { ref } from 'vue'

const text = ref('Unknown')
</script>
<template>
  <input v-model.lazy="text" type="input" />
  <div>{{ text }}</div>
</template>
```
[Open the demo.](https://codesandbox.io/s/v-model-lazy-ldi2x9?file=/src/App.vue)

Open the demo and type a few characters into the input. The rendered text stays the same: `Unknown`.  

Now click somewhere outside of the input field to make it lose focus. The rendered text updates to the value that you introduced earlier.  

If you have a form with many input fields and heavy state, you can apply the lazy modifier to disable realtime reactivity as the user types. That could prevent page *freezes* during typing.  

## 6. Conclusion

From all the details you've read, remember just one.  

`v-model` binds form inputs to refs or reactive objects.  

Binding is performed in 2 easy steps:

* First, create the ref `const text = ref('')`. 
* Second, assign the ref to the `v-model` attribute: `<input v-model="text" type="text" />`

`text` ref is kept in sync (bound) with the input field value.  

*Do you have any questions about `v-model`? Write a comment!*