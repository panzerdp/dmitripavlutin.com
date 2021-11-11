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

## 1. Debouncing a watcher

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

I use a debounce implementation from `'lodash.debounce'`, but you can use whatever implemenation you like.  

```vue
<template>
  <input v-model="value" type="text" />
  <p>{{ value }}</p>
</template>

<script>
import debounce from "lodash.debounce";

export default {
  data() {
    return {
      value: "",
    };
  },
  watch: {
    value(...args) {
      this.debValueWatch(...args);
    },
  },
  create() {
    this.debValueWatch = debounce((newValue, oldValue) => {
      console.log('New value:', newValue);
    }, 500);
  },
  beforeUnmount() {
    this.debValueWatch.cancel();
  },
};
</script>
```

[Try the demo](https://codesandbox.io/s/vue-input-debounced-4vwex?file=/src/App.vue)

Now if you open the demo you'd notice that from the user's perspective little changed: you can still introduce characters as you were in the previous example.  

But look at console and you'll notice that the new value logging is debounced. The component logs to console the new value only if `500ms` has passed since last typing.  

Inside the `created()` hook the callback invoked when the `value` changes is debounced and assigned to an instance property `this.debValueWatch`.  

Then inside the proper watch callback `watch.value()` the `this.debValueWatch()` is invoked with the right arguments. 

Also `beforeUnmount()` hook cancels any pending executions of the debounced function `this.debValueWatch.cancel()` right before unmounting the component. This is done to avoid executing of the value watcher callback on an already unmounted component.  

Same way you can debounce watching any data property inside of your component. And perform inside the debounced callback relatively heavy operation like data fetching, expensive DOM manipulations, and more.  

## 2. Debouncing an event handler

The section above showed how to debounce watchers, but what about regular event handlers? Let's take a try.  

Let's reuse again the example when the user enters data into the input field, but this time without use `v-model` and directly watching for change events.  

As usual, if you don't perform any amortization, the changed value is logged to console exactly when user types:

```vue
<template>
  <input v-on:change="changeHandler" type="text" />
</template>

<script>
export default {
  methods: {
    changeHandler(event) {
      console.log('New value:', event.target.value);
    }
  }
};
</script>
```

[Try the demo.](https://codesandbox.io/s/vue-event-handler-plls4?file=/src/App.vue)

Open the demo and type a few characters into the input. If you have the console opened, you'd notice that the console gets update
right when you type.  

Again, that's not always convinient if you want to perform some relatively heavy operations with the input value, like performing a fetch request.  

## 3. A word a caution

## 4. Conclusion