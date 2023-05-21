---
title: "defineModel(): Easy Component v-model in Vue"
description: "How to use defineModel() macro to program component v-model in Vue."
published: "2023-05-22"
modified: "2023-05-22"
thumbnail: "./images/cover-6.jpg"
slug: vue-define-model
tags: ['vue', 'v-model']
type: post
---

`<Component v-model="myRef" />` is the two-way data binding in Vue. `v-model` allows data to be changed by the parent component (first data flow), and as well by the child component (second data flow).  

The usual way to implement `v-model` in a component requires a bit of magic: 