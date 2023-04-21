---
title: "Mastering Vue refs: From Zero to Hero"
description: "ref() is a Vue composition API function that creates refs: small reactive values."  
published: "2023-02-28"
modified: "2023-03-07"
thumbnail: "./images/vue-ref-4.png"
slug: ref-in-vue 
tags: ['vue', 'vue composition', 'ref', 'reactivity']
type: post
---

Well-designed reactivity is one of the selling points of Vue. When a reactive value is updated then automagically the components using the reactive value are updated.  

refs, created by `ref()` composition API, are the primary tool of Vue reactivity. Knowing refs is a requirement if you want to understand reactivity.  

Let's see how refs and `ref()` API work in Vue.  

<Affiliate type="vueschoolCompositionApi" />

## 1. ref()

A component renders a value on the screen. When the value changes (for examle in an event handler), Vue re-renders the component to reflect the new value on the screen. *That's the idea of reactivity in Vue.*  

[ref()](https://vuejs.org/api/reactivity-core.html#ref) reactivity API lets you create simple reactive values. 

`ref()` works inside the [`<script setup>`](https://vuejs.org/api/sfc-script-setup.html), [setup()](https://vuejs.org/api/composition-api-setup.html#basic-usage) method, or inside of a [composable](https://vuejs.org/guide/reusability/composables.html) function.  

`ref(initialValue)` is called as a regular function and accepts an optional argument as the initial value. `ref()` returns a special object called *ref* (which is the reactive value).

```vue
<script setup>
import { ref } from 'vue'

const count = ref(0) // 1) ref creation

console.log(count.value); // 2) reading ref
</script>
<template>
  <div>{{ count }}</div> <!-- 3) reading ref (unwraped) -->
</template>
```
[Open the demo.](https://codesandbox.io/s/basic-ref-uvyxhv?file=/src/App.vue)

`ref(0)` creates and returns a ref initialized with `0`. The ref is stored in the variable `count` for later use.  

The value of the ref is accessed by reading the special property `count.value` that is available on all the refs. `count.value` is currently `0` because that's the initial value of the ref.  

You can omit `.value` property inside the template `<div>{{ count }}</div>` because in the template the ref value is automatically unwrapped.  

## 2. Updating refs

The true benefit of refs shows when you update them and see how Vue magically re-renders the component to reflect the changes.  

Updating a ref is easy: just change the value of `myRef.value = 'New Value'` property.  

You can update a ref value anywhere you want. But usually, you'll update refs inside event handlers.  

Let's implement a scenario having a button and a count state. When the user clicks the button, the count state increases by one. The actual value of the count (even if it changes) needs to be rendered on the screen.  

You can see in the scenario *the need for reactivity*: the screen needs to show the actual value of the count. Using a ref fits well:

```vue
<script setup>
import { ref } from 'vue'

const count = ref(0)

const onClick = () => count.value++ // ref update
</script>
<template>
  <button @click="onClick">Increase</button>
  <div>{{ count }}</div>
</template>
```
[Open the demo.](https://codesandbox.io/s/ref-update-gw7vhc?file=/src/App.vue)

Open the demo. You'll see that count is `0`.

Click *Increase* button and count increases. Importantly, the most actual value of the count is rendered on the screen. *That's reactivity in action.*

`count` is a ref and also a *reactive* value. When `count.value` changes, Vue updates the component and shows the new count value on the screen. Pure magic! 

## 3. ref() in setup()

The composition API can be used inside [\<script setup\>](https://vuejs.org/api/sfc-script-setup.html) (see the previous examples), but also inside the [setup()](https://vuejs.org/api/composition-api-setup.html) method of options API.  

I like `<script setup>` because it's shorter and more expressive than `setup()`. But that's me.  

Either way, you can also use `ref()` inside the `setup()` method if that's your preference:

```vue
<script>
import { ref, defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const count = ref(0) // create the ref

    return { count } // ref must be returned
  },
  methods: {
    onClick() {
      this.count++ // ref accessed using this.count
    }
  }
})
</script>
<template>
  <button @click="onClick">Increase</button>
  <div>{{ count }}</div>
</template>
```
[Open the demo.](https://codesandbox.io/s/ref-update-setup-method-d9mp48?file=/src/App.vue)

The behavior of `ref()` is almost the same in `<script setup>` as in `setup() {...}`. There are just 3 differences to remember.  

First, don't forget to return the ref from the `setup()` method: `return { count }`. Otherwise, it won't be accessible in the component methods and template.  

Second, you have to access the ref using `this` keyword. For example, `this.count` accesses the ref (not directly `count`) inside the `onClick` method.  

Third, the refs are automatically unwrapped when accessed inside the options API methods. Access and update the value of a ref using `this.count` (not using `this.count.value`).  

## 4. Values of refs

In the examples above I've created the count ref that operated on numbers. In general, refs can store any primitive value: numbers, strings, booleans, `undefined`, or `null`.  
 
refs can also store complex data structures like objects, arrays, maps, and even DOM elements. 

Let's store in a ref a plain JavaScript object `{ name: 'Batman' }`:

``` vue
<script setup>
import { ref } from 'vue'

const hero = ref({ name: 'Batman' }) // ref contains an object

console.log(hero.value.name) // logs 'Batman'
</script>
```
[Open the demo.](https://codesandbox.io/s/ref-having-object-du3x1d?file=/src/App.vue)

`ref({ name: 'Batman' })` creates a ref that stores an object. You can access the object from the ref using `hero.value`. And also access any properties of that object using regular property accessors: `hero.value.name`.  

Moreover, the object stored in a ref automagically *becomes reactive*! Plus the reactivity is applied deeply on nested objects or arrays.    

Let's update the hero name from `'Batman'` to `'Joker'` when a button is clicked:

``` vue
<script setup>
import { ref } from 'vue'

const hero = ref({ name: 'Batman' })

const onClick = () => hero.value.name = 'Joker' // reactive change
</script>
<template>
  {{ hero.name }} 
  <button @click="onClick">Change</button>
</template>
```
[Open the demo.](https://codesandbox.io/s/ref-object-update-njr2s7?file=/src/App.vue)

Since `hero` ref is reactive, the change `hero.value.name = 'Joker'` is also reflected on the screen by changing from `'Batman'` to `'Joker'`. 

Changes to an object in ref are deeply reactive. 

*Side note: if you don't want deeply reactive refs, consider using [shallowRef()](https://vuejs.org/api/reactivity-advanced.html#shallowref) API.*

## 5. Template refs

Usually, you don't have to access and manipulate DOM elements directly. Just let Vue take care of everything regarding DOM. 

But there are situations when you need to access DOM elements. For example, when integrating a 3rd party code that isn't Vue-aware.  

Vue uses refs to give you access to DOM elements. 

There are only 3 steps to make a ref access a DOM element:

1. Define the ref supposed to hold the element: `const element = ref()`
2. Inside the template, use the special attribute `ref` and assign the ref to it: `<div ref={element}>...</div>`
3. After mounting, you can access the element by reading `element.value`

Let's continue with a simple example.  

A common case when you need to access an element is to focus an input field as soon as it is rendered:

```vue
<script setup>
import { ref, onMounted } from 'vue'

const input = ref() // 1. create the ref

onMounted(() => {
  input.value.focus() // 3. Access the element after mounting
})
</script>
<template>
   <!-- 2. Connect the ref to the element -->
  <input ref="input" type="text" />
</template>
```
[Open the demo.](https://codesandbox.io/s/ref-template-j96qkq?file=/src/App.vue)

`const input = ref()` creates the placeholder ref, which later will contain the input element.  

When rendering the input element inside the template, please use `ref` attribute and assign to it the ref: `<input ref="input" type="text" />`.  

Finally, after component mounting, you can freely access the input element and call the input method on it: `input.value.focus()`.  

The moment when the component mounts is captured using the [onMounted()](https://vuejs.org/api/composition-api-lifecycle.html#onmounted) hook. Only after mounting you are guaranteed that the `input` ref links to the element.  

If you accidentally access `input` before mounting, then `input.value` is `undefined`.  

## 6. Implicit refs

In the examples presented until now, I've created refs explicitly: using `ref()` factory function provided by Vue.  

But other reactivity APIs can create refs implicitly. A common API creating refs is [computed()](https://vuejs.org/api/reactivity-core.html#computed).  

`const computedRef = computed(calc)` accepts a callback function `calc` that uses reactive values to calculate a value. The calculated value is returned as a ref.  

Let's create a computed ref `evenOdd` that changes to `'even'` or `'odd'` depending on the `count` ref value:

```vue mark=5
<script setup>
import { ref, computed } from 'vue'

const count = ref(0)
const evenOdd = computed(() => count.value % 2 === 0 ? 'even' : 'odd')

const onClick = () => count.value++ // ref update
</script>
<template>
  <button @click="onClick">Increase</button>
  <div>{{ count }}</div>
  <div>{{ evenOdd }}</div>
</template>
```
[Open the demo.](https://codesandbox.io/s/ref-computed-jqzini?file=/src/App.vue)

`evenOdd = computed(() => count.value % 2 === 0 ? 'even' : 'odd')` creates a ref which depending on `count.value ` number changes to `'even'` or `'odd'`.  

You can use multiple refs, even mixed with reactive objects, to create computed refs:  

```vue
<script setup>
import { ref, reactive, computed } from 'vue'

const ref1 = ref(0)
const ref2 = ref(0)
const object = reactive({
  myNumber: 0
})

const sum = computed(() => {
  // computed can use multiple refs and reactive object values
  return ref1.value + ref2.value + object.myNumber
})
</script>
<template>
  <div>{{ sum }}</div>
  <button @click="ref1 = 100">ref1 to 100</button>
  <button @click="ref2 = 200">ref2 to 200</button>
  <button @click="object.myNumber = 300">object.myNumber to 300</button>
</template>
```

[Open the demo.](https://codesandbox.io/s/ref-multiple-computed-97ttip?file=/src/App.vue)

`sum` is a computed ref which is a sum of 2 refs and one reactive object property (created using [reactive()](https://vuejs.org/api/reactivity-core.html#reactive) API: an alternative to refs). 

When any reactive value used inside `computed()` callback changes, the value of `sum` ref recalculates reactively.  

## 7. Watching refs

[watch()](https://vuejs.org/api/reactivity-core.html#watch) API provided by Vue watches ref value change.  

`watch(myRef, callback)`: set the ref as the first argument `myRef` and the second argument as the callback `callback` to be invoked when the ref changes.

Let's log to console a message `'myRef changed'` when `myRef` value changes:

``` vue {5-8}
<script setup>
import { ref, watch } from 'vue'

const myRef = ref(0)

watch(myRef, () => {
  // this callback is invoked when myRef changes
  console.log('myRef changed')
})
const change = () => myRef.value = 10 // change ref value
</script>
<template>
  <button @click="change">Change ref</button>
</template>
```

[Open the demo.](https://codesandbox.io/s/ref-watched-vdodt3?file=/src/App.vue)

Clicking *Change ref* button changes `myRef` value to `10`. As result `watch()` invokes the callback and logs to console `'myRef changed'` message.  

You can invoke inside of the watcher different kinds of side effects &mdash; for example, initiate fetch requests.  

By default `watch(myRef, callback)` watches only the changes of `myRef.value`. 

If you want to watch deep changes of a ref (e.g. when a ref contains object or arrays), then set the third argument as `{deep: true}`: 

```vue
watch(myRef, () => {
  //...
}, { deep: true }) // deep watch of ref
```

## 8. Conclusion

`ref()` is a factory function that creates special reactive values in Vue: refs.  

`const myRef = ref(initialValue)` accepts as the first argument the initial value of the ref, then returns the newly created ref.  

To access the value stored inside a ref just read `myRef.value` property. To change the ref value update `myRef.value = 'New value'` property.  

Refs in Vue are *reactive* values. Meaning that if you render in the template a ref value, then changing the ref programmatically makes Vue re-render the output to reflect the ref change.  

A ref gives direct access to a DOM element rendered in the template. To make ref access a DOM element, assign `ref` attribute with a ref: `<div ref="myRef">`. After component mounting, `myRef.value` will contain the DOM element.  

Vue can also create refs implicitly: for example `computed()` API returns a ref.   

Last but not least `watch()` API lets you detect when a ref value changes: `watch(myRef, callback)`.  

*When would you use `ref()` and when `reactive()`? Share your opinion in a comment!*