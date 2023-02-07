---
title: "Vue refs in Composition API"
description: "refs are reactive blocks of data in Vue composition API"  
published: "2023-01-25"
modified: "2023-01-26"
thumbnail: "./images/cover-2.png"
slug: vue-ref
tags: ['vue', 'vue composition', 'reactivity']
recommended: ['vue-next-tick', 'ref-reactive-differences-vue']
type: post
---

Well designed reactivity is one of the selling points of Vue. As a result of an user action a reactive value is updated, and automagically all of the components that use the reactive value are updated.  

refs in Vue composition API are the primary blocks of reactivity. And knowing refs well is a good path to working efficiently with reactivity in Vue.  

In this post I'm going to help you understand all the details that you need to know about Vue refs to work them very efficiently. Let's get started.  

## 1. ref()

Let's say that a component renders a reactive value to the screen. When the reactive value changes (for example based on a user event), Vue makes sure to re-render the component to reflect the new value on the screen.  That's the idea of reactivity in Vue.  

`ref()`, as a part of the composition API, is the API that let's you create a simple reactive value. 

`ref()` is called as a regular function and accept an optional argument as the initial value, and returns a special value called ref (which is in essence a reactive value).  

```vue
<script setup>
import { ref } from 'vue'

const count = ref(0)
</script>
```

In the example above `ref(0)` creates a ref value (which is also a reactive value) initialize with the number `0`. The ref is then stored into the variable `count` for later use.  

`ref()` is a part of the Vue composition API, so you have to use it inside the `<script setup>` tag like was done in the example above.  



### 1.1 Non-reactive values

### 1.2 A note about *setup()*

```vue
<script>
import { ref } from 'vue'

export default defineComponent({
  setup() {
    const count = ref()

    return { count }
  }
})
</script>
```

The composition API coded insidehe `<script setup>` is usually shorter that using the options API with `setup` method. Thus in the following examples I will use `ref()` directly inside `<script setup>`. Of course, the behavior of `ref()` is exactly the same in `<script setup>` as in `defineComponent({ setup() {...} })`.  

## 2. ref's value

## 3. Watching ref changes

## 4. Implicit refs creation

## 5. Shallow refs

## 6. Conclusion

// 151