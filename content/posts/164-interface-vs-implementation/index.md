---
title: "Programming to an Interface VS to an Implementation"
description: "How programming to an interface can make your application easier to change in the future."  
published: "2022-01-12"
modified: "2022-01-12"
thumbnail: "./images/cover-2.png"
slug: interface-vs-implementation
tags: ['typescript', 'software design']
recommended: ['frontend-architecture-stable-and-volatile-dependencies', 'the-art-of-writing-small-and-plain-functions']
type: post
---

You've written some code, tested it, and shipped to production. Then you never have to modify that code again. Wouldn't that be great?

But putting the dreams aside... you have to modify, even multiple times, the code that has been written. And this in my opinion one of the greatest challenges in software development: update the already written code.  

If you haven't taken the time, *in advance*, to think about the possible ways your code can change, you are quickly going to start have problems with [rigid and fragile code](https://www.excella.com/insights/top-4-symptoms-of-bad-code).  

In this post, I'm going to discuss about a software design principle that *advises to program to an interface rather that an implementation*.  

# 1. The list renderer

A good way to understand the benefits of the software design principles is to follow an example and demonstrate visible benefits.  

First, I'm going to show you an implementation that's not adapted to change. Then by applying the *program to an interface* principle redesign the component and demonstrate the advantages of the new design. 

For example, you have the task of implementing a class `ListRenderer`. The class has just one method `listRender.render(names)` that renders a list of names into an unordered HTML list.  

Here's an example of the implementation:

```twoslash include list-renderer
class ListRenderer {
  render(names: string[]): string {
    let html = '<ul>';
    for (const name of names) {
      html += `<li>${name}</li>`;
    }
    html += '</ul>';
    return html;
  }
}
```

```ts twoslash
// @include: list-renderer
```

Now here's how you can use the list renderer:

```ts twoslash
// @include: list-renderer
// ---cut---
const renderer = new ListRenderer();

console.log(renderer.render(['Joker', 'Bane', 'Batman']));
// <ul>
//  <li>Batman</li>
//  <li>Joker</li>
// </ul>
```

The above implementation is a good solution. At least without any further changes to the requirements of how `ListRenderer` works.  

# 2. Programming to an implementation

Like I mentioned in the post introduction, there's a good chance that the already written code will be modified for the new requirements that might arise. 

Let's say there's a new requirement to the list renderer to also *sort alphabetically the rendered names*.  

You can implement this requirement by creating a new sorter class, for example `SortAlphabetically`:

```twoslash include sort-alphabetically
class SortAlphabetically {
  sort(strings: string[]): string[] {
    return [...strings].sort((s1, s2) => s1.localeCompare(s2))
  }
}
```

```ts twoslash
// @include: sort-alphabetically
```

where `s1.localCompare(s2)` is a [string method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare) that compare whether `s1` comes alphabetically before or after `s2`.  

Then make use of the `SortAlphabetically` into the `ListRender` class:

```twoslash include list-renderer-to-implementation
class ListRenderer {
  sorter: SortAlphabetically;

  constructor() {
    this.sorter = new SortAlphabetically();
  }

  render(names: string[]): string {
    const sortedNames = this.sorter.sort(names)

    let html = '<ul>';
    for (const name of sortedNames) {
      html += `<li>${name}</li>`;
    }
    html += '</ul>';

    return html;
  }
}
```

```ts twoslash{2,5,9}
// @include: sort-alphabetically
// ---cut---
// @include: list-renderer-to-implementation
```

Now with the new sorting logic integrated, the list renders the names sorted alphabetically:

```ts twoslash
// @include: sort-alphabetically
// @include: list-renderer-to-implementation
// ---cut---
const renderer = new ListRenderer();

console.log(renderer.render(['Joker', 'Bane', 'Batman']));
// <ul>
//  <li>Batman</li>
//  <li>Joker</li>
// </ul>
```

## 3. Programming to an interface

## 4. Benefits vs increased complexity

## 5. Conclusion