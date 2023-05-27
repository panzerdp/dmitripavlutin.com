---
title: "How to Debounce and Throttle Callbacks in Vue"
description: "How to debounce and throttle watchers and event handlers in Vue components."
published: "2021-11-12T07:30Z"
modified: "2023-05-07"
thumbnail: "./images/cover.png"
slug: vue-debounce-throttle
tags: ['vue', 'callback', 'event']
type: post
---

Listening for often occurring events like user typing into the input field, window resize, scroll, intersection observer events etc. requires precaution. 

These events could occur so often, e.g. a few times per second, that invoking an action like a fetch request on every event isn't a wise approach.  

What you could do is slow down the execution of the event handlers. Such amortizing techniques are [debouncing and throttling](https://css-tricks.com/debouncing-throttling-explained-examples/).  

In this post, you'll find how to debounce and throttle watchers and event handlers in Vue components (both in composition and options API). 

<Affiliate type="vueschoolCompositionApi" />

## 1. Debouncing a watcher

Let's start with a simple component, where your task is to log to console the value user introduces into a text input:

```vue
<script setup>
import { ref, watch } from 'vue'

const value = ref('')

watch(value, () => {
  console.log("Value changed: ", value.value);
})
</script>

<template>
  <input v-model="value" type="text" />
  <p>{{ value }}</p>
</template>
```

[Open the demo.](https://codesandbox.io/s/awesome-thunder-cyb9pd?file=/src/App.vue)

<details>
  <summary>Options API</summary>
```vue
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
    }
  }
};
</script>

<template>
  <input v-model="value" type="text" />
  <p>{{ value }}</p>
</template>
```
[Open the demo.](https://codesandbox.io/s/vue-input-szgn1?file=/src/App.vue)
</details>

Open the demo and type a few characters into the input. Each time you type, the value is logged to the console. Logging is implemented using a watcher on the `value`.  

Let's debounce the callback to reduce the rate of its execution. The idea is to create a debounced function, then invoke that function inside the watcher.  

I use a debounce implementation from `'lodash.debounce'`, but you can use whatever implementation you like.  

Let's update the component with debouncing:

```vue
<script setup>
import { ref, watch, onBeforeUnmount } from "vue";
import debounce from "lodash.debounce";

const value = ref("");

const debouncedWatch = debounce(() => {
  console.log('New value:', value.value);
}, 500);

watch(value, debouncedWatch);

onBeforeUnmount(() => {
  debouncedWatch.cancel();
})
</script>

<template>
  <input v-model="value" type="text" />
  <p>{{ value }}</p>
</template>
```

[Open the demo.](https://codesandbox.io/s/loving-dew-xlcb5p?file=/src/App.vue)

<details>
<summary>Options API</summary>

```vue
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
      this.debouncedWatch(...args);
    },
  },
  created() {
    this.debouncedWatch = debounce((newValue, oldValue) => {
      console.log('New value:', newValue);
    }, 500);
  },
  beforeUnmount() {
    this.debouncedWatch.cancel();
  },
};
</script>

<template>
  <input v-model="value" type="text" />
  <p>{{ value }}</p>
</template>
```

[Open the demo.](https://codesandbox.io/s/vue-input-debounced-4vwex?file=/src/App.vue)

</details>

If you open the demo you'd notice that from the user's perspective little changed: you can still introduce characters as you were in the previous example.  

But there's a change: the component logs to console the new value only if `500ms` has passed since the last typing. That's debouncing in action.  

Debouncing of a watcher is implemented in 3 simple steps:

1) Create the debounced callback and assign it to a variable : `const debouncedWatch = debounce(..., 500)`.  

2) Assign the debounced callback to watch API callback `watch(value, debouncedWatch)`

3) Finally, make `onBeforeUnmount()` cancel `debouncedWatch.cancel()` any pending executions of the debounced function right before unmounting the component.  

In the same way, you can debounce watch callbacks of any data property. Then you are safe to execute inside the debounced callback relatively heavy operations like data fetching, expensive DOM manipulations, and more.  

## 2. Debouncing an event handler

The section above has shown how to debounce watchers, but what about regular event handlers?  

Let's reuse again the example when the user enters data into the input field, but this time attach an event handler to the input.  

As usual, if you don't perform any amortization, the changed value is logged to console every time the user types:

```vue
<script setup>
const handler = (event) => {
  console.log('New value:', event.target.value);
}
</script>

<template>
  <input v-on:input="handler" type="text" />
</template>
```
[Open the demo.](https://codesandbox.io/s/dry-rgb-yryb95?file=/src/App.vue)

<details>
<summary>Options API</summary>

```vue
<script>
export default {
  methods: {
    handler(event) {
      console.log('New value:', event.target.value);
    }
  }
};
</script>

<template>
  <input v-on:input="handler" type="text" />
</template>
```

[Open the demo.](https://codesandbox.io/s/vue-event-handler-plls4?file=/src/App.vue)

</details>

Open the demo and type a few characters into the input. Look at the console: you'd notice that the console updates each time you type.  

Again, that's not always convenient if you want to perform some relatively heavy operations with the input value, e.g. doing a fetch request.  

Let's debounce the event handler:

```vue
<script setup>
import { onBeforeUnmount } from "vue";
import debounce from "lodash.debounce";

const debouncedHandler = debounce(event => {
  console.log('New value:', event.target.value);
}, 500);

onBeforeUnmount(() => {
  debouncedHandler.cancel();
});
</script>

<template>
  <input v-on:input="debouncedHandler" type="text" />
</template>
```

[Open the demo.](https://codesandbox.io/s/modest-ace-8ioq7j?file=/src/App.vue)

<details>
<summary>Options API</summary>

```vue
<template>
  <input v-on:input="debouncedHandler" type="text" />
</template>

<script>
import debounce from "lodash.debounce";

export default {
  created() {
    this.debouncedHandler = debounce(event => {
      console.log('New value:', event.target.value);
    }, 500);
  },
  beforeUnmount() {
    this.debouncedHandler.cancel();
  }
};
</script>
```

[Open the demo.](https://codesandbox.io/s/vue-event-handler-debounced-973vn?file=/src/App.vue)
</details>

Open the demo and type a few characters. The component logs to console the new value only if `500ms` has passed since the last typing. Again, debouncing works!

Debouncing the event handler is implemented in 3 easy steps:

1) Create the debounced callback `const debouncedHandler = debounce(event => {...}, 500)`.  

2) Assign `debouncedHandler` to `v-on:input`:

```html
<input v-on:input="debouncedHandler" type="text" />
```

3) Finally, before unmounting, call `debouncedHandler.cancel()` to cancel any pending executions.  

On a side note, the examples were using the debouncing technique. However, the same approach can be used to create throttled functions.  

## 3. A word of caution (options API only)

You might be wondering: why not make the debounced function as a method directly on the component options, and then use the method as an event handler inside the template?  

```javascript
// ...
  methods: {
    // Why not?
    debouncedHandler: debounce(function () { ... }}, 500)
  }
// ...
```

That would be an easier approach than creating debounced functions as properties on the instance.  

For example:

```vue mark=11:13
<template>
  <input v-on:input="debouncedHandler" type="text" />
</template>

<script>
import debounce from "lodash.debounce";

export default {
  methods: {
    // Don't do this!
    debouncedHandler: debounce(function(event) {
      console.log('New value:', event.target.value);
    }, 500)
  }
};
</script>
```

[Open the demo.](https://codesandbox.io/s/vue-event-handler-debounced-incorrectly-320ci?file=/src/App.vue)

Instead of creating a debounced callback inside the `created()` hook, this time you assigned the debounced callback to the `methods.debouncedHandler`. 

And if you open the demo, it works!

The problem is that the options object exported from the component using `export default { ... }`, including the methods, are going to be reused by all the instances of the component. 

In case if the web page has 2 or more instances of the component, then all the components will use the *same* debounced function `methods.debouncedHandler` &mdash; and the debouncing could glitch.  

## 4. Conclusion

In Vue, you can easily apply the debouncing and throttling techniques to callbacks of watchers and event handlers.  

The main approach is to create the debounced or throttled callback:

```javascript
// ...
const debouncedCallback = debounce((...args) => {
  // The debounced callback
}, 500);
// ...
```

A) Then call the debounced instance either inside the watcher:

```javascript
// ...
watch(myRef, debouncedCallback)
// ...
```

B) or set as an event handler inside the template:

```vue
<template>
  <input v-on:input="debouncedCallback" type="text" />
</template>
```

Then, each time the `debouncedCallback(...args)` is invoked, even at very fast rates, the callback that it wraps is going to be amortized. 

Also do not forget to cancel any pending debounced or throttled executions when the component unmounts:

```javascript
onBeforeUnmount(() => {
  debouncedCallback.cancel();
});
```

*Do you still have questions about debouncing and throttling in Vue? Ask a question!*