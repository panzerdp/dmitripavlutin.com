---
title: "What is ref() in Vue?"
description: "ref() is a Vue composition API function that return refs: small reactive values."  
published: "2023-02-28"
modified: "2023-02-28"
thumbnail: "./images/cover-2.png"
slug: vue-ref-api
tags: ['vue', 'vue composition', 'reactivity']
recommended: ['vue-next-tick', 'ref-reactive-differences-vue']
type: post
---

Well designed reactivity is one of the selling points of Vue. A reactive value is updated (e.g. after a user action), and automagically all of the components that use the reactive value are updated.  

refs in Vue composition API are the primary tool of reactivity. Knowing refs well is the right path to get the most of Vue reactivity.  

In this post I'll help you understand the necessary details you need to know about Vue refs. Let's get started.  

## 1. ref()

A component renders a value to the screen. When the value changes (e.g. based on an event triggered by the user), Vue makes re-renders the component to reflect the new value on the screen. *That's the idea of reactivity in Vue.*  

`ref()` reactivity API let's you create simple reactive values. 

`ref()` works inside the `<script setup>`  or `setup()` method of options API.

`ref(initialValue)` is called as a regular function and accepts an optional argument as the initial value. `ref()` returns a special value called ref (which is the reactive value).

```vue
<script setup>
import { ref } from 'vue'

const count = ref(0) // 1) ref creation

console.log(count.value); // 2) ref read
</script>
<template>
  <div>{{ count }}</div> <!-- 3) ref read (unwraped) -->
</template>
```
[Open the demo.]()

`ref(0)` creates and returns a ref initialized with `0`. The ref is stored into the variable `count` for later use.  

A ref value can be accessed simply by reading the special property `count.value` available on all the refs. `count.value` is currently `0` because that's the initial value of the ref.  

## 2. Updating refs

The true power of refs opens when you update them, and see how Vue magically re-renders the content on the screen to reflect the changes.  

Updating a ref is done straigforward. All you have to do is just update the `myRef.value` property.  

Contrary to the ref creation, you can update a ref value anywhere you want, e.g. even outside `<script setup>`. More ofter, however, you will update refs inside event handlers.  

Let's implement a scenario having a button and a count state. When the user clicks the button, the count state increases by one. The actual value of the count (even if it changes) needs to be rendered on the screen.  

You can see in the scenario *the need for reactivity*: the screen must render always the actual value of the count. Using a ref fits well, since a ref is reactive.  

Here's an implementation of the scenario using `ref()`:

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
[Open the demo.]()

Open the demo. You'll see that initially count is `0` on the screen. 

Click *Increase* button and count increases. Importantly, the most actual value of the count is rendered on the screen. *That's reactivity in action.* 

`count` is a *reactive* value. When `count.value` changes, Vue updates the component and shows the new count value on the screen.  

## 3. *ref()* in *setup()*

The composition API can be used inside [\<script setup\>](https://vuejs.org/api/sfc-script-setup.html) (see the previous examples), or inside the [setup()](https://vuejs.org/api/composition-api-setup.html) method of options API.  

I like `<script setup>` because it's shorter and more expressive than `setup()`. But that's me.  

Either way, you can also use `ref()` inside the `setup()` method if that's your preference:

```vue
<script>
import { ref } from 'vue'

export default defineComponent({
  setup() {
    const count = ref(0)

    return { count } // ref must be returned
  },
  methods: {
    onClick() {
      this.count.value++ // ref accessed using this.count
    }
  }
})
</script>
<template>
  <button @click="onClick">Increase</button>
  <div>{{ count }}</div>
</template>
```
[Open the demo.]()

The behavior of `ref()` is almost the same in `<script setup>` as in `setup() {...}`. There are just 2 nuances to remember.  

First, don't forget to return the ref from the setup function `return { count }`. Otherwise it won't be accessible in the component methods and template.  

Second, you have to access the ref using `this` keyword. For example `this.count` inside the methods in `onClick` event handler above accesses the ref (not directly `count`).  

## 4. Values of refs

In the examples above I've been using the count ref, which normally operates on a an integer value. Thus refs can store primitive values like numbers, strings, booleans, `undefined` or `null`.  
 
But a ref can store and even more complex data structures: objects, arrays, maps, and even DOM elements (I'll describe how it does that in the next section).  

Let's store inside of a ref a plain JavaScript object:

``` vue
<script setup>
import { ref } from 'vue'

const hero = ref({ name: 'Batman' }) // ref contains an object

console.log(hero.value.name) // logs 'Batman'
</script>
```
[Open the demo.]()

`ref({ name: 'Batman' })` creates a ref that stores an object. Then you can easily access the object using `hero.value`. And also access any properties of that object using regular property accessors: `hero.value.name`.  

Moreover, the object stored in a ref automagically *becomes reactive*! And the reactivity is applied through any deeply nested object or array of the object stores in the ref.    

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
[Open the demo.]()

Since `hero` ref is reactive, the change `hero.value.name = 'Joker'` is reflected on the screen by changing from `'Batman'` to `'Joker'`.  

## 5. Template refs

Normally you don't have to access and manipulate DOM elements directly. Let Vue take care of everything regarding DOM. 

But there are situations when you need to access DOM elements. For example, when integrating a 3rd party code that isn't Vue-aware.  

There are only 3 steps necessary to access DOM elements using a ref in Vue:

1. Define create the ref that is supposed to hold the DOM element: `const element = ref()`
2. Inside the template, use the special attribute `ref` of the tag and assign the ref to it: `<div ref={element}>...</div>`
3. After mounting, you can access the DOM element by reading `element.value`

Let's continue with a simple example.  

A common case when you need to access a DOM element is to focus an input element as soon as it is rendered on the screen:

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
  <input :ref="input" type="text" />
</template>
```
[Open the demo.]()

`const input = ref()` inside of the script setup creates the ref which later will contain the input element as a value.  

When rendering the input element inside the template, please use `:ref` attribute and assign to it the ref: `<input :ref="input" type="text" />`.  

Finally, after component mounting, you can freely access the input element and call the input method on it: `input.value.focus()`.  

The moment when the component mounts is captured using the `onMounted()` hook. After mounting you are guaranteed that the ref links to the element.  

If you accidently access `input` before mounting, then `input.value` is simply `undefined`.  

## 6. Implicit refs

In the examples presented until now I've created refs explicitely: using `ref()` factory function provided by Vue.  

But some reactivity APIs can also create refs. A common API creating refs is [computed()](https://vuejs.org/api/reactivity-core.html#computed).  

`const computedRef = computed(calc)` accepts a callback function `calc` that uses reactive values to calculate a value. The calculated value is returned as a ref.  

Let's create a computed ref `evenOdd` that changes to `'even'` or `'odd'` depending on the `count` ref value:

```vue {4}
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
[Open the demo.]()

`computed(() => count.value % 2 === 0 ? 'even' : 'odd')` creates a ref which depending on `count.value ` number evaluates to `'even'` or `'odd'`.  

While in the example above `computed()` uses only one ref to compute a new value, please not that you can use multiple refs, even mixed with reactive objects, to create a computed ref.  

```vue
<script setup>
import { computed } from 'vue'

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

[Open the demo.]()

`sum` is a computed ref which is a sum of 2 refs and one reactive object property. 

When any reactive value used inside `computed()` callback changes, the value of `sum` ref recalculates reactively.  

## 7. Watching refs

[watch(myRef, callback)](https://vuejs.org/api/reactivity-core.html#watch) API provided by Vue watches ref value change.  

Set the ref as the first argument and the second argument the callback to be invoked when the ref changes:  

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

[Open the demo.]()

Clicking *Change ref* button changes `myRef` value to `10`. As result `watch()` invokes the callback and logs to console `'myRef changed'` message.  

More often than simple console logs you can invoke inside of the watcher different kinds of side effects &mdash; for example initiate fetch requests.  

## 8. Conclusion

`ref()` is a factory function that creates special reactive values in Vue: refs.  

`const myRef = ref(initialValue)` accepts as the first argument the initial value of the ref, then returns the newly created ref.  

To access the value stored inside a ref simply read `myRef.value` property. Same way if you want to update the value of a ref simply update `myRef.value = 'New value'` property.  

It is important to remember that refs in Vue are *reactive*. Which means that if you render inside the template a ref value, then changing that value programatically makes Vue re-render the ref value on the webpage.  

Vue can also create refs implicitely: for example when you use `computed()` API.  

Last but not least you can `watch()` API to detect when a ref value changes.   

