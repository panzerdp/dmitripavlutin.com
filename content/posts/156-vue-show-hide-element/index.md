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

What I like about Vue is the many built-in mini-features that are helpful in everyday Frontend programming. 

Toggling the display of an element on the page is one of such features.  

In this post, I'm going to describe how Vue can show and hide elements on a web page. 3 approaches to hiding are presented: 

* When the element is completely removed from DOM using `v-if`;
* When it's just been hidden using CSS styles using `v-show`;
* Applying the `visibility: hidden` using the `:class` binding.

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

Often it's useful to keep the element rendered in the DOM, but have it visually hidden using CSS styles.  

`v-show` is a built-in directive that shows or hides visually the element:

```html
<div v-show="value">I am an element</div>
```

`v-show` deals with showing the element as follows:

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

The first element is visible on the screen. However, the second is hidden because Vue applies `display: none` inline style, thanks to `v-show="false"`. 

`v-show`, when assigned with `false`, applies `display: none` inline style and hides the element visually.  

*Challenge: how can you implement in Vue a button that toggles the display of an element? Share your solution in a comment!*  

`display: none` applied to an element hides it on the screen, and the space the element would normally occupy isn't preserved. The element disappears completely.  

## 3. Hiding but keeping the space

What if you need to hide the element's content while keeping the space it occupies? The CSS style that hides the element content but keeps its space is `visibility: hidden`.  

Unfortunately, you can no longer can `v-show` directive because it applies only `display: none` style.  

A viable solution is to use `:class` binding that is pretty flexible in Vue.  

When the object literal `{ className: boolValue }` is assigned to the `:class`, Vue would apply the `"className"` as a class to the element if `boolValue` is `true`.  

Assign a CSS class `invisible` having the `visibility: hidden` style to the element when you want it hidden.  

```vue{1-2}
<template>
  <div :class="{ invisible: !value1 }">I'm visible!</div>
  <div :class="{ invisible: !value2 }">Only my space is visible!</div>
  <div>Dummy text</div>
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

<style>
  .invisible {
    visibility: hidden;
  }
</style>
```

[Try the demo.](https://codesandbox.io/s/invisible-class-sfvvi?file=/src/App.vue)

Open the demo you'd see the elements *I'm visible* and *Dummy text*, and a space in between the two &mdash; the hidden second element.  

The above example renders the HTML content:

```html
<div class="">I'm visible!</div>
<div class="invisible">Only my space is visible!</div>
<div>Dummy text</div></div>
```

`<div :class="{ invisible: !value2 }">Only my space is visible!</div>` applies the `invisible` class to the element because `!value2` is `true` (I know the negation here is confusing!).  

That's how you can hide the element while keeping its space on the screen.  

## 4. Conclusion

Vue gives you a bunch of good ways to hide the element on the screen.  

When using `v-if="false"` the element isn't rendered at all in the DOM.  

When using `v-show="false"` the element is rendered in the DOM, however, Vue applies the inline style `display: none` that hides the element completely.  

Also, do not forget about the powerful `:class` binding. 

To apply `visibility: hidden` to hide the element but keep its space, then you can
use `:class="{ invisible: !value }"` to assign `invisible` class (which has `visibility: hidden` style applied to it).  