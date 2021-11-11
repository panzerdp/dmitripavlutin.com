---
title: "How to Debounce and Throttle Callbacks in Vue"
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
    }
  }
};
</script>
```

[Open the demo.](https://codesandbox.io/s/vue-input-szgn1?file=/src/App.vue)

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
      this.debouncedWatch(...args);
    },
  },
  create() {
    this.debouncedWatch = debounce((newValue, oldValue) => {
      console.log('New value:', newValue);
    }, 500);
  },
  beforeUnmount() {
    this.debouncedWatch.cancel();
  },
};
</script>
```

[Try the demo](https://codesandbox.io/s/vue-input-debounced-4vwex?file=/src/App.vue)

Now if you open the demo you'd notice that from the user's perspective little changed: you can still introduce characters as you were in the previous example.  

But look at console and you'll notice that the new value logging is debounced. The component logs to console the new value only if `500ms` has passed since last typing.  

Inside the `created()` hook the callback invoked when the `value` changes is debounced and assigned to an instance property `this.debouncedWatch`.  

Then inside the proper watch callback `watch.value()` the `this.debouncedWatch()` is invoked with the right arguments. 

Also `beforeUnmount()` hook cancels any pending executions of the debounced function `this.debouncedWatch.cancel()` right before unmounting the component. This is done to avoid executing of the value watcher callback on an already unmounted component.  

Same way you can debounce watching any data property inside of your component. And perform inside the debounced callback relatively heavy operation like data fetching, expensive DOM manipulations, and more.  

## 2. Debouncing an event handler

The section above showed how to debounce watchers, but what about regular event handlers? Let's take a try.  

Let's reuse again the example when the user enters data into the input field, but this time without use `v-model` and directly watching for change events.  

As usual, if you don't perform any amortization, the changed value is logged to console exactly when user types:

```vue
<template>
  <input v-on:input="handler" type="text" />
</template>

<script>
export default {
  methods: {
    handler(event) {
      console.log('New value:', event.target.value);
    }
  }
};
</script>
```

[Try the demo.](https://codesandbox.io/s/vue-event-handler-plls4?file=/src/App.vue)

Open the demo and type a few characters into the input. If you have the console opened, you'd notice that the console gets update
each time you type.   

Again, that's not always convinient if you want to perform some relatively heavy operations with the input value, like performing a fetch request.  

Debouncing the event handler invocation can be implemented as follows:

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

[Try the demo.](https://codesandbox.io/s/vue-event-handler-debounced-973vn?file=/src/App.vue)

Open the demo and type a few characters. Looking at the console you'll see that the value logging is debounced. The component logs to console the new value only if `500ms` has passed since last typing.  

The `created()` hook, right after the instance creation, assigns to `this.debouncedHandler` the debounced callback `debounce(event => {...}, 500)`.  

Also, note that the input field inside the template uses `debouncedHandler` function assigned to `v-on:input`: `<input v-on:input="debouncedHandler" type="text" />`.  

Finally, at the time the component instance should unmount inside `beforeUnmount()` hook the `this.debouncedHandler.cancel()` is called to cancel any pending function calls.  

On a side note, the examples were using the debouncing technique. However, the same implementation is used to created throttled functions.  

## 3. A word a caution

You might be wondering why can't you just assign the debounced right away as method, and then use the method as an event handler inside the template?  

For example:

```vue{10-12}
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

[Try the demo.](https://codesandbox.io/s/vue-event-handler-debounced-incorrectly-320ci?file=/src/App.vue)

Instead of creating a debounced callback inside the `created()` hook, this time you assigned the debounced callback to the `method.debouncedHandler`. 

And if you try the demo, it works!

The problem is that the options object exported from the component using `export default { ... }`, including the methods, are going to be reused by all the instances of the component. 

In case if the web page has 2 or more instances of the component, all these functions would use the same debounced function `methods.debouncedHandler` &mdash; and the debouncing could glitch.  

## 4. Conclusion

In Vue you can easily apply the debouncing and bouncing techniques to callbacks of watchers and event handlers.  

The main approach is to create the debounced or throttled callback as a property of the instance in the `created()` hook:

```javascript
// ...
  created() {
    this.debouncedCallback = debounce((...args) => {
      // The debounced callback
    }, 500);
  },
// ...
```

A) Then call the debounced instance either inside the watcher:

```javascript
// ...
  watch: {
    value(...args) {
      this.debouncedCallback(...args);
    },
  },
// ...
```

B) or set an event handler inside the template:

```vue
<template>
  <input v-on:input="debouncedHandler" type="text" />
</template>
```