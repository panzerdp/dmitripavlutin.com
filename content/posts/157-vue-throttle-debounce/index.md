---
title: "How to Debounce and Throttle Event Handlers in Vue"
description: "How to apply debouncing and throttling techniques to amortize the execution of event handlers in Vue"
published: "2021-11-09T12:00Z"
modified: "2021-11-09T12:00Z"
thumbnail: "./images/cover-3.png"
slug: vue-debounce-throttle
tags: ['vue', 'callback', 'event']
recommended: ['react-throttle-debounce', 'vue-show-hide-elements']
type: post
---

If you've been dealing with often occurring events like user typing into the input field, window resize, scroll, intersection observer events, you might notice that invoking an action when such an event occurs is not the best choice.  

These events could occurs so often, e.g. a few times per second, that invoking an action a fetch request, on every event isn't a wise approach.  

In such cases you would be interested to amortize, or slow down, the execution of the event handlers. Such amortizing techniques are [debouncing and throttling](https://css-tricks.com/debouncing-throttling-explained-examples/).  

In this post, let's see how you can apply debouncing and throttling to Vue components.  

## 1. Debouncing input change watcher

Let's start with a simple component, where your task is to log to console the value that the user has introduced into a text input.  

```vue
<template>
  <input v-model="value" type="text" />
  <p>{{ value }}</p>
</template>

<script>
export default {
  data() {
    return {
      value: "",
    };
  },
  watch: {
    value(newValue, oldValue) {
      console.log("Value changed: ", newValue);
    },
  },
};
</script>
```

[Open the demo](https://codesandbox.io/s/vue-input-szgn1?file=/src/App.vue)

Open the demo and type a few characters into the input field. You would notice that inside the watcher of `value` data logs to console the new value each time you type into the input field.  

That's not exactly convinient. If you'd like to perform a fetch request using the `value` as a GET parameter, for example, most likely you wouldn't want to start fetch requests so often.  

Let's debounce the logging to console of the input value. To do so you need to created a debounced version of the function, then use it inside the watcher. 

I use a debounce implementation from `'lodash.debounce'`

```vue
<template>
  <input v-model="value" type="text" />
  <p>{{ value }}</p>
</template>

<script>
import debounce from 'lodash.debounce';

export default {
  value: '',
  methods: {
    handleChange(event) {
      this.value = event.target.value;
    }
  },
  watch: {
    value(newValue, oldValue) {
      console.log(newValue);
    }
  },
  created() {
    this.watch.value = debounce(
      this.watch.value.bind(this),
      400
    );
  }
};
</script>
```

## 2. Throttling of a window scroll handler

## 3. A word a caution

## 4. Conclusion