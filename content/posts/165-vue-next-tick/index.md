---
title: "How to Use $nextTick() in Vue"
description: "$nextTick(callback) catches the moment when Vue updates DOM."  
published: "2022-01-27"
modified: "2022-01-27"
thumbnail: "./images/cover-2.png"
slug: vue-next-tick
tags: ['vue', 'dom']
recommended: ['vue-debounce-throttle', 'vue-show-hide-elements']
type: post
---

A change to Vue component data (props or state) isn't immediately reflected in the DOM. Rather, Vue updates DOM asynchronously.  

After updating the component's data, how can you catch the moment when DOM has been updated too? Welcome `vm.$nextTick(callback)` method.  

Let's see in detail how `vm.$nextTick(callback)` works in Vue.  

## 1. Vue.$nextTick()

When you change Vue's component data, you're actually updating the virtual DOM. Then Vue updates the real DOM elements (in the most efficient way since updating real DOM is expensive) according according to virtual DOM changes.  

```vue
<template>
  <span v-if="show" id="span-1">I am an element</span>
  <button @click="handleClick">Click me!</button>
</template>

<script>
  export default {
    data() {
      return {
        show: true
      }
    },
    methods: {
      handleClick() {
        this.show = !this.show
      }
    }
  }
</script>
```

In the example above clicking on the *"Click me!"* button changes the `this.show` data value. Changing `this.show` triggers the update of virtual DOM: specifically showing/hiding the `<span>` element.  

*Note: Vue compiles the templates into Virtual DOM render functions (see [docs](https://vuejs.org/v2/guide/syntax.html)).* 

But sometimes you need direct access to DOM elements. So you'd like to know the right moment when real DOM has been updated.  

For example, let's find the moment when the `<span>` element in the above code snippet is inserted or removed from the DOM:

```vue
<template>
  <span v-if="show" id="span-1">I am an element</span>
  <button @click="handleClick">Click me!</button>
</template>

<script>
  export default {
    // ...
  }
  Vue.$nextTick(() => {
    console.log(document.getElementById('span-1'));
  })
</script>
```

## 2. this.$nextTick()

## 3. async/await ticks

## 4. mounted() and updated()

## 5. Conclusion