---
title: "How to Use nextTick() in Vue"
description: "nextTick(callback) executes the callback when the DOM has been updated."  
published: "2022-02-12"
modified: "2022-02-12"
thumbnail: "./images/cover-3.png"
slug: vue-next-tick
tags: ['vue', 'dom']
recommended: ['vue-debounce-throttle', 'vue-show-hide-elements']
type: post
---

A change to Vue component's data (props or state) isn't immediately reflected in the DOM. Rather, Vue updates DOM asynchronously.  

You can catch the moment when Vue updates DOM using `Vue.nextTick()` or `vm.$nextTick()` functions. Let's see in detail how these functions work.

## 1. Vue.nextTick()

When changing Vue component data the DOM is updated asynchronously. Vue collects multiple updates to virtual DOM from all the components, then tries to create a single batch to update the DOM.

For example, let's consider a component that toggles the display of an element:

```vue
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
      console.log(this.show, this.$refs.content);
    },
  },
};
</script>
```

[Try the demo.](https://codesandbox.io/s/without-next-tick-v70zc?file=/src/ToggleButton.vue)

Clicking on the *Insert/Remove* button changes the `this.show` data, which toggles the display of the `<div id="content">` element using `v-if="show"` directive.  

Inside `handleClick` handler, `this.show` value logged to console doesn't correspond to the the reference logged to console. For instance if `this.show` is `true`, then `this.$refs.content` is `undefined`: which means that DOM is not in sync with the component's data.   

If you want to catch the moment when DOM has just been updated, then you need to use a special function `Vue.nextTick(callback)`. It executes `callback` right after the new data updates have reached DOM.  

Let's find the moment when the `<div>` element is inserted or removed from the DOM:

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
        console.log(this.show, this.$refs.content);
      });
    },
  },
};
</script>
```

[Try the demo.](https://codesandbox.io/s/vue-next-tick-031dj?file=/src/ToggleButton.vue)

Open the demo and click a few times the *Insert/Remove* button. You'd see that `this.$refs.content` (the reference that contains the `<div>` element) is `undefined` or contains an element &mdash; in exact correspondence with `this.show` value.  

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
        console.log(this.show, this.$refs.content);
      });
    },
  },
};
</script>
```
[Try the demo.](https://codesandbox.io/s/this-next-tick-3mtol?file=/src/ToggleButton.vue)

`this.$nextTick()` is more convenient if you want to access the updates of the current component instance.  

## 3. nextTick() with async/await

If `Vue.nextTick()` or `this.$nextTick()` is called without arguments, then the functions return a promise that gets resolved when component data changes reach DOM.  

That helps leverage the more readable `async/await` syntax.  

For example, let's make the previous component more readable by catching the DOM update with the `async/await` syntax:

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
      console.log(this.show, this.$refs.content);
    },
  },
};
</script>
```

[Try the demo.](https://codesandbox.io/s/await-this-next-tick-o8qvf?file=/src/ToggleButton.vue)

`async handleClick()` has been marked as an asynchronous function. 

When the *Insert/Remove* button is clicked, the value of `this.show` changes.

 `await this.$nextTick()` awaits until the changes reach DOM. Finally, `console.log(this.$refs.content)` logs the actual content of the reference.  

My recommendation is to use the `this.$nextTick()` with the `async/await` syntax since it's more readable than the callback approach.  

## 4. Conclusion

When you change the component's data, Vue updates the DOM asynchronously. 

If you want to catch the moment when DOM has been updated after the component's data change, then you need to use `Vue.nextTick(callback)` or `this.$nextTick(callback)` functions.  

Their single `callback` argument is going to be invoked right after DOM updates: and you are guaranteed to get the latest DOM in sync with the component's data.    

Alternatively, if you don't supply the callback argument to `Vue.nextTick()` or `this.$nextTick()`: then the functions would return a promise that's being resolved when DOM is updated. 

Using this with an `async/await` syntax makes the code more readable than the callbacks approach.  