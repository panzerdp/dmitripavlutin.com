---
title: "How to Show/Hide Elements in Vue"
description: "v-if and v-show are the main directives that allow you to show/hide elements in Vue"
published: "2021-11-02T12:00Z"
modified: "2021-11-02T12:00Z"
thumbnail: "./images/cover-3.png"
slug: vue-show-hide-elements
tags: ['vue', 'dom', 'element']
recommended: ['simple-explanation-of-javascript-closures', 'gentle-explanation-of-this-in-javascript']
type: post
---

I like about Vue the many built-in mini-features that are helpful in everyday Frontend programming. 

Toggling the display of an element on the page is one of such features.  

In this post, I'm going to describe how Vue can show and hide elemente on a web page. 2 approaches to hiding are presented: 

* When the element is completely removed from DOM using `v-if`;
* When it's just been hidden using CSS styles using `v-show`.

As a bonus, you'll also find how to apply CSS animations when showing/hiding your element.  

## 1. Hiding using *v-if*

`v-if` is a built-in Vue directive that accepts boolean values:

```html
<div v-if="value">I am an element</div>
```

And here's how `v-if` deals withing showing/hiding the element:

A) If the value supplied to `v-if` is `true` (or generally a [truthy value](/javascript-and-or-logical-operators/#2-truthy-value)), then the element is rendered;  

B) Otherwise, if the value supplied to `v-if` is `false` (or generally a [falsey value](/javascript-and-or-logical-operators/#1-falsy-value)), then the element *is not rendered in the DOM*.

Let's consider the following example:

```vue{1-2}
<template>
  <div v-if="value1">I'm rendered!</div>
  <div v-if="value2">I'm not rendered!</div>
</template>

<script>
export default {
  data() {
    return {
      value1: true,
      value2: false
    }
  }
};
</script>
```

[Try the demo.](https://codesandbox.io/s/v-if-byie6?file=/src/App.vue)

When the above component runs, the following HTML content is inserted into the web page:

```html
<div>I'm rendered!</div>
```

The first element is rendered because `v-if="value1"` was supplied with a `true` value. The second element, however, isn't rendered into the
DOM because `v-if="value2"` was supplied with a `false`.  

*Challenge: would `v-if` render the element if assigned with `0`? What about `'0'`?*

## 2. Hiding using *v-show*

Often it's useful to keep the element rendered in the DOM, but having it visually hidden using CSS styles.  

`v-show` is a built-in directive that shows or hides visually the element:

```html
<div v-show="value">I am an element</div>
```

`v-show` deals as follows with showing the element:

A) If the value supplied to `v-show` is `true` (or truthy), then the element is visible;  

B) Otherwise, if the value supplied to `v-show` is `false` (or falsey), then the element is *hidden, but still rendered in the DOM*.  

Let's look at the following example:

```vue{1-2}
<template>
  <div v-show="value1">I'm visible!</div>
  <div v-show="value2">I'm hidden!</div>
</template>

<script>
export default {
  data() {
    return {
      value1: true,
      value2: false
    }
  }
};
</script>
```

[Try the demo.](https://codesandbox.io/s/v-show-v5ghh?file=/src/App.vue)

When you run the above component *both elements* are rendered into the DOM:

```html
<div>I'm visible!</div>
<div style="display: none;">I'm hidden!</div>
```

The first element is visible on the screen. While the second is hidden because Vue applies `display: none` inline style, thanks to `v-show="false"`. 

`v-show` directive applies `display: none` inline style and hides the element visually when assigned with a `false` value.  

*Challenge: how can you implement in Vue a button that toggles the display of an element? Share your solution in a comment!*  

When `display: none` is applied to an element, then it is completely hidden from the screen, and the space that the element would normally ocuppy isn't preserver. The element completely disappears.  

## 3. Hiding but keeping the space



## 4. Conclusion