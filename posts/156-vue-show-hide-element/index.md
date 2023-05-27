---
title: "How to Show/Hide Elements in Vue"
description: "How to use v-if, v-show and :class to show/hide elements in Vue."
published: "2021-11-03T09:20Z"
modified: "2021-11-03T09:20Z"
thumbnail: "./images/cover-3.png"
slug: vue-show-hide-elements
tags: ['vue', 'dom', 'element']
type: post
---

Hiding and showing elements on a web page is an often occurring UI-related task. You might want to toggle the visibility of some detail sections, tooltips, and more.  

In this post, you'll learn how to hide elements on a web page using 3 approaches provided by Vue:

* When the element is completely removed from DOM using `v-if`;
* When the element is hidden using `display: none` applied by `v-show`;
* Applying the `visibility: hidden` using the `:class` binding.

<Affiliate />

<TableOfContents />

## 1. Hiding using v-if

`v-if` is a built-in Vue directive that accepts boolean values:

```html
<div v-if="value">I am an element</div>
```

`v-if` deals withing showing/hiding the element as follows:

A) If the value supplied to `v-if` is `true` (or generally a [truthy value](/javascript-and-or-logical-operators/#2-truthy-value)), then the element is inserted into the DOM;  

B) Otherwise, if the value supplied to `v-if` is `false` (or generally a [falsy value](/javascript-and-or-logical-operators/#1-falsy-value)), then the element *is not inserted into the DOM*.

Let's consider the following example:

```vue mark=2:3
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

[Open the demo.](https://codesandbox.io/s/v-if-byie6?file=/src/App.vue)

When the above component runs, here's what HTML content is inserted into the web page:

```html
<div>I'm rendered!</div>
```

The first element is rendered because `v-if="value1"` was supplied with a `true` value. The second element, however, isn't rendered into the
DOM because `v-if="value2"` was supplied with a `false`.  

In simple words, `v-if` directive allows you to show or hide the element just by inserting or not the element into the DOM. Brutally simple.  

### 1.1 When to use v-if

When `v-if` directive is assigned with `false`, Vue also doesn't initialize the event listeners on the element, even if you explicitly use the [event directives](https://v3.vuejs.org/guide/events.html#listening-to-events). 

`v-if` toggling is relatively expensive (since each time you change `v-if` value the element is inserted/removed from DOM, as well event listeners are initialized/uninitialized) compared to `v-show` (presented in the next section). But it has a low initialization cost if the element is initially hidden.  

You'd use `v-if` on the elements which visibility isn't toggled too often and is initially hidden. For example, to show/hide a section having detailed information about an entity.    

*Challenge: would `v-if` render the element if assigned with `0`? What about `'0'`?*

## 2. Hiding using v-show

Often it's useful to keep the element present in the DOM, but have it visually hidden using CSS styles.  

`v-show` is a built-in directive that shows or hides the element visually:

```html
<div v-show="value">I am an element</div>
```

`v-show` deals with showing the element as follows:

A) If the value supplied to `v-show` is `true` (or truthy), then the element is visible;  

B) Otherwise, if the value supplied to `v-show` is `false` (or falsy), then the element is *hidden, but still rendered in the DOM*.  

Let's look at the following example:

```vue mark=2:3
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

[Open the demo.](https://codesandbox.io/s/v-show-v5ghh?file=/src/App.vue)

When you run the above component *both elements* are rendered into the DOM:

```html
<div>I'm visible!</div>
<div style="display: none;">I'm hidden!</div>
```

The first element is visible on the screen. However, the second is hidden because Vue applies `display: none` inline style, thanks to `v-show="false"`. 

`display: none` applied to an element makes the element disappear completely.  

*Challenge: how can you implement in Vue a button that toggles the display of an element? Share your solution in a comment!*  

### 2.1 When to use v-show

`v-show`, when assigned with `false`, applies `display: none` inline style and hides the element visually and makes almost no modifications to the DOM. 

Thus toggling the element's visibility using `v-show` is relatively cheap (compared to `v-if` described above), so you might use this directive with an element which visibility is toggled often.  

## 3. Hiding but keeping the space

What if you need to hide the element's content while keeping the space it occupies? The CSS style that hides the element content but keeps its space is `visibility: hidden`.  

Unfortunately, you cannot use `v-show` directive because it applies only `display: none` style.  

But a viable solution is to use `:class` binding, which is pretty flexible in Vue. When the object literal `{ className: boolValue }` is assigned to the `:class`, Vue applies the `"className"` as a class to the element if `boolValue` is `true`.  

Let's create a CSS class `invisible` having the `visibility: hidden` style. Then, using the `:class` binding and an object literal you can apply the `invisible` class to an element:

```vue mark=2:3
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

[Open the demo.](https://codesandbox.io/s/invisible-class-sfvvi?file=/src/App.vue)

Open the demo you'd see the elements *I'm visible* and *Dummy text*, and a space in between the two &mdash; the hidden second element.  

The above example renders the HTML content:

```html
<div class="">I'm visible!</div>
<div class="invisible">Only my space is visible!</div>
<div>Dummy text</div></div>
```

`<div :class="{ invisible: !value2 }">Only my space is visible!</div>` applies the `invisible` class to the element because `value2` is `false` (I know the negation here is confusing!).  

Note that you can also hide the element by using `opacity: 0`, or even offset the element out of the viewport using `position: absolute; left: -9999px`. Just create the appropriate CSS class and then toggle it using `:class`.   

## 4. Conclusion

Vue gives you a bunch of good ways to hide the element on the screen.  

When using `v-if="false"` the element isn't rendered at all in the DOM.  

When using `v-show="false"` the element is rendered in the DOM, however, Vue applies the inline style `display: none` that hides the element completely.  

Also, do not forget about the powerful `:class` binding if you'd like more visibility customization.  

To hide the element but keep its space use `:class="{ invisible: !value }"` to assign `invisible` class (which has `visibility: hidden` style applied to it).  