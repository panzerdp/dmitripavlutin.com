---
title: "5 Must-Know Differences Between ref() and reactive() in Vue"
description: "That are the 5 important differences between ref() and reactive() in Vue."  
published: "2023-01-21"
modified: "2023-01-21"
thumbnail: "./images/cover.png"
slug: ref-reactive-differences-vue
tags: ['vue', 'vue composition']
recommended: ['vue-next-tick', 'props-destructure-vue-composition']
type: post
---

If you landed on this post most likely you have a basic understanding of Vue reactivity in composition API. 

However, like me, you might be asking yourself the ethernal question: what are the main differences between `ref()` and `reactive()`, and, importantly, when would you use on and when another? 

Luckily, this post will help you understand 5 important differences between the reactive objects created by `ref()` and `reactive()`. 

## 1. Primitive values

The first difference, and also the one that you must remember, is how `ref()` and `reactive()` handle differently primitive values: strings, numbers, booleans, `null` and `undefined`.  

`refs()` can easily store both primitive values, as well as objects:

``` typescript
import { ref } from 'vue'

const refPrimitive = ref(0);           // OK
const refObject    = ref({ count: 0 }) // OK
```

On the other side `reactive()` cannnot store primitives, but can store only objects:

```typescript {2}
import { reactive } from 'vue'

const reactivePrimitive = reactive(0);            // NOT OK!
const reactiveObject    = reactive({ count: 0} ); // OK
```

> `ref()` *can* store primitive values, while `reactive()` *cannot*.

## 2. Accessing reactive data

The second difference, and also the one you must remember, is how you access reactive data in case of `ref()` and `reactive()`.  

`ref()` data, either storing a primitive value or an object, is accessed through a special property `.value`:

```ts {3,6}
import { ref } from 'vue'

const myRefPrimitive = ref(0);
console.log(myRefPrimitive.value); // => 0

const myRefObject = ref({ count: 0 })
console.log(myRefObject.value.count); // => 0
```



## 3. Typing

## 4. Watching

## 5.  

## 6. Conclusion