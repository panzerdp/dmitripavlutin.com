---
title: "How to Use nextTick() in Vue"
description: "nextTick(callback) catches the moment when Vue updates DOM."  
published: "2022-01-27"
modified: "2022-01-27"
thumbnail: "./images/cover.png"
slug: vue-next-tick
tags: ['vue', 'dom']
recommended: ['vue-debounce-throttle', 'vue-show-hide-elements']
type: post
---

A change to Vue component data (props or state) isn't immediately reflected in the DOM. Rather, Vue updates DOM asynchronously.  

After updating the component's data, how can you catch the moment when DOM has been updated too? Welcome `vm.$nextTick(callback)` method.  

Let's see in detail how `nextTick(callback)` works in Vue.  

## 1. Vue.nextTick()

An important idea to understand when changing Vue component data is that the update of the DOM happens asynchronously.  

For example, let's consider the following component that toggles the display of an element:

```vue
<template>
  <div>
    <button @click="handleClick">Insert/Remove</button>
    <div v-if="show" id="content">I am an element</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: true,
    };
  },
  methods: {
    handleClick() {
      this.show = !this.show;
    },
  },
};
</script>
```

Clicking on the *Insert/Remove* button changes the `this.show` data, which toggles the display of the `<div id="content">` element.  

After changing `this.show` the changes don't reach the DOM right away. Rather, Vue accumulates the updates from all the components, combines them in an efficient way, then patches the DOM.  

If you want to access the update-to-date DOM elements after some changes to the component data, you need to use a special function `Vue.nextTick(callback)`. The function executes `callback` right after the currently scheduled data updates have reached DOM.  

For example, let's find the moment when the `<div>` element is inserted or removed from the DOM:

```vue{19-21}
<template>
  <div>
    <button @click="handleClick">Insert/Remove</button>
    <div v-if="show" ref="content">I am an element</div>
  </div>
</template>

<script>
import Vue from "vue";

export default {
  data() {
    return {
      show: true,
    };
  },
  methods: {
    handleClick() {
      this.show = !this.show;
      Vue.nextTick(() => {
        console.log(this.$refs.content);
      });
    },
  },
};
</script>
```

[Try the demo.](https://codesandbox.io/s/vue-next-tick-031dj?file=/src/ToggleButton.vue)

Open the demo and click a few times the *Insert/Remove* button. You'd see that `this.$refs.content` (the reference that contains the `<div>` element) is `undefined` or contains an element &mdash; depending on the `this.show` value.  

Note that `Vue.nextTick(callback)` executes the `callback` when also all of the child components updates have been submitted to DOM.  

## 2. this.$nextTick()

Vue also provides the ability to use the function right on the component instance: e.g. `this.$nextTick(callback)`.  

Let's reuse the previous component and catch the moment when the `<div>` element exists or not in the DOM (and the reference):

```vue{17-19}
<template>
  <div>
    <button @click="handleClick">Insert/Remove</button>
    <div v-if="show" ref="content">I am an element</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: true,
    };
  },
  methods: {
    handleClick() {
      this.show = !this.show;
      this.$nextTick(() => {
        console.log(this.$refs.content);
      });
    },
  },
};
</script>
```

## 3. async/await ticks

## 4. mounted() and updated()

## 5. Conclusion