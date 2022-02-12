---
title: "How to Use nextTick() in Vue"
description: "nextTick(callback) executes the callback when the DOM has been updated."  
published: "2022-01-27"
modified: "2022-01-27"
thumbnail: "./images/cover-2.png"
slug: vue-next-tick
tags: ['vue', 'dom']
recommended: ['vue-debounce-throttle', 'vue-show-hide-elements']
type: post
---

A change to Vue component's data (props or state) isn't immediately reflected in the DOM. Rather, Vue updates DOM asynchronously.  

You can catch the moment when Vue updates DOM using `Vue.nextTick()` or `vm.$nextTick()` methods. Let's see in detail how these methods work.

## 1. Vue.nextTick()

When changing Vue component data the DOM happen asynchronously. That's expected because Vue collects multiple updates from all the components, then tries to create a single batch to update the DOM.

For example, let's consider a component that toggles the display of an element:

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

Clicking on the *Insert/Remove* button changes the `this.show` data, which toggles the display of the `<div id="content">` element using `v-if="show"` directive.  

When `this.show` is updated, the change doesn't reach DOM right away. 

If you want to catch the moment when DOM has just been updated, then you need to use a special function `Vue.nextTick(callback)`. 

The function executes `callback` right after the currently scheduled data updates have reached DOM.  

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

Also, `Vue.nextTick(callback)` executes the `callback` when all child components updates have been submitted to DOM.  

## 2. this.$nextTick()

Vue allows to use `this.$nextTick(callback)` right on the component instance.  

In the following example `handleClick()` method changes `this.show` data, and right away `this.$nextTick()` is setup to catch the moment when this update reaches DOM:

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

`this.$nextTick()` is more convinient to use if you want to access the updates of the current component instance.  

## 3. async/await and nextTick()

In case if the `Vue.nextTick()` or `this.$nextTick()` is called without a callback argument, then the methods return a promise that gets resolved when component data changes reaches DOM.  

You can use this to get rid of the callback at all, and laverage the more readable `async/await` syntax.

For example, let's make the previous component more readably by catching the DOM update with the `async/await` syntax:

```vue{17-18}
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
    async handleClick() {
      this.show = !this.show;
      await this.$nextTick();
      console.log(this.$refs.content);
    },
  },
};
</script>
```

`async handleClick()` has been marked as an asynchronous function. 

When the *Insert/Remove* button is clicked, the value of `this.show` changes. Then `await this.$nextTick()` awaits until the changes have reached DOM. Finally `console.log(this.$refs.content)` logs the actual content of the reference.  

My recommendation is to use the `this.$nextTick()` with the `async/await` syntax since it's more readable than the callback approach.  

## 4. Conclusion

