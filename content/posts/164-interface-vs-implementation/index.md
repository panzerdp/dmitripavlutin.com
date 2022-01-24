---
title: "Programming to Interface Vs to Implementation"
description: "How programming to an interface can make your application easier to change in the future."  
published: "2022-01-24"
modified: "2022-01-24"
thumbnail: "./images/cover.png"
slug: interface-vs-implementation
tags: ['typescript', 'interface', 'software design']
recommended: ['frontend-architecture-stable-and-volatile-dependencies', 'the-art-of-writing-small-and-plain-functions']
type: post
---

You've written some code, tested, and shipped to production. Then you never have to modify that code again. Wouldn't that be great?

But putting the dreams aside... you have to modify, even multiple times, the code that has been written. And this in my opinion one of the greatest challenges in software development: updating the already written code.  

If you haven't taken the time, *in advance*, to think about the possible ways your code can change, you're quickly going to start to have problems with [rigid and fragile code](https://www.excella.com/insights/top-4-symptoms-of-bad-code).  

In this post, I'm going to discuss a software design principle that *advises to program to an interface rather than an implementation* to help you write code that's relatively easy to modify in the future.  

# 1. The list renderer

A good way to understand the benefits of software design principles is to follow an example and demonstrate visible benefits.  

First, I'm going to show you an implementation that's not adapted to change. Then by applying the *program to an interface* principle redesign the component and demonstrate the advantages of the new design. 

For example, you have the task of implementing a class `ListRenderer`. The class has just one method `listRender.render(names)`, which renders an array of names into an unordered HTML list. 

Here's how you could implement the `ListRenderer` class:

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

And now let's use the list renderer to render some names:

```ts twoslash
// @include: list-renderer
// ---cut---
const renderer = new ListRenderer();

renderer.render(['Joker', 'Catwoman', 'Batman']);
// =>
// <ul>
//  <li>Joker</li>
//  <li>Catwoman</li>
//  <li>Batman</li>
// </ul>
```

[Try the demo.](https://codesandbox.io/s/simple-renderer-qld0c?file=/src/index.ts)

The above implementation is a good solution if you want to simply render a list of names. But what if you need to change further this code, for example add sorting functionality?  

# 2. Programming to an implementation

As I mentioned in the post introduction, there's a good chance that the already written code will have to be modified when new requirements arise.  

Let's say there's a new requirement to also *sort alphabetically the rendered names*.  

You can implement this requirement by creating a new sorter class, for example, `SortAlphabetically`:

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

Then integrate `SortAlphabetically` into the `ListRender`, enabling the sorting of the names before rendering:

```twoslash include renderer-implementation
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
// @include: renderer-implementation
```

Now with the new sorting logic integrated, the list renders the names sorted alphabetically:

```ts twoslash
// @include: sort-alphabetically
// @include: renderer-implementation
// ---cut---
const renderer = new ListRenderer();

renderer.render(['Joker', 'Catwoman', 'Batman']);
// =>
// <ul>
//   <li>Bane</li>
//   <li>Catwoman</li>
//   <li>Joker</li>
// </ul>
```

[Try the demo.](https://codesandbox.io/s/sorted-renderer-efuj6?file=/src/index.ts)

Now let's look closer at the sorter instantiation line: 

```
  this.sorter = new SortAlphabetically();
``` 

This is programming to implementation, because `ListRenderer` uses a *concrete* implementation of the sorter, and exactly `SortAlphabetically` implementation.  

Is programming to an implementation a problem? The answer depends on *how your code would change in the future*. 

If you are sure that the list renderer will sort the names in alphabetically ascending order &mdash; and this requirement most likely won't change in the future &mdash; then the programming to the concrete sorting implementation is *good*. 

### 2.1 Changing implementations

But you might have difficulties with the *programming to implementation* if the sorting implementation might *change* in the future, or if you need different sorting depending on runtime values.  

For example, you might want to sort the names alphabetically in ascending or descending order depending on the user's choice.  

When using programming to implementation you will start bloating your main component with the implementation details. This quickly makes your code hard to reason about and hard to change:

```typescript{4-6}
class ListRenderer {
  sorter: SortAlphabetically | SortAlphabeticallyDescending;

  constructor(ascending: boolean) {
    this.sorter = ascending ? 
      new SortAlphabetically() : 
      new SortAlphabeticallyDescending();
  }
  
  render(names: string[]): string {
    // ...
  }
}
```

In the example above `ListRenderer` can sort the names ascending or descending. What kind of sorting is used depends on the `ascending` parameter.  

You can see how complex becomes `ListRenderer` &mdash; it becomes bloated with the sorting implementation details.  

What if later you'd like to add more sorting implementations? If proceeding the same way by adding the new sorting implementations directly into `ListRenderer`, the class will soon become hard to understand, modify and maintain.  

How to design the changeable dependency implementations? Welcome *programming to an interface*!

## 3. Programming to an interface

If you want to make `ListRenderer` more extensible and [decoupled](https://softwareengineering.stackexchange.com/a/244478) from a concrete sorting implementation, then you need to use the *programming to an interface* approach.  

Here's what you need to do.  

1) Define the interface (or an abstract class) `Sorter` that defines the structure of the implementation
2) Make the `ListRender` depend on the `Sorter` interface, rather than the concrete implementation (`SortAlphabetically` and `SortAlphabeticallyDescending`)
3) Make the concrete sorting implementations (`SortAlphabetically` and `SortAlphabeticallyDescending`) implement the `Sorter` interface
4) Compose a `ListRenderer` instance with the right sorting implementation: `new ListRenderer(new SortAlphabetically())` or `new ListRenderer(new SortAlphabeticallyDescending())`

### 3.1 Programming to an interface in practice

Ok, let's see how to put programming to an interface into the practice of list renderer class.  

1) Defining the interface `Sorter` should be relatively easy:

```twoslash include sorter
interface Sorter {
  sort(strings: string[]): string[]
}
```

```ts twoslash
// @include: sorter
```

`Sorter` interface contains just one method that sorts an array of strings. The interface isn't concerned about how the `sort()` method works: just that it accepts an array of strings and should return an array of sorted strings.  

2) Making the `ListRender` use the `Sorter` interface is quite easy too. Just remove the references to the concrete implementations and use the `Sorter` interface solely:

```twoslash include renderer-to-interface
class ListRenderer {
  sorter: Sorter;

  constructor(sorter: Sorter) {
    this.sorter = sorter;
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

```ts twoslash{2,4-5}
// @include: sorter
// ---cut---
// @include: renderer-to-interface
```

Now `ListRenderer` doesn't depend on a concrete implementation of the sorting. That makes the class easy to reason about and decoupled from sorting logic. It depends on a very stable thing: the `Sorter` interface.  

The presence of `sorter: Sorter` in the `ListRenderer` is what is called *programming to an interface*.  

3) Finally, making the concrete sorting class implement the `Sorter` interface is relatively easy too:

```twoslash include sort-alpha
class SortAlphabetically implements Sorter {
  sort(strings: string[]): string[] {
    return [...strings].sort((s1, s2) => s1.localeCompare(s2))
  }
}
```

```twoslash include sort-alpha-desc
class SortAlphabeticallyDescending implements Sorter {
  sort(strings: string[]): string[] {
    return [...strings].sort((s1, s2) => s2.localeCompare(s1))
  }
}
```

```ts twoslash
// @include: sorter
// ---cut---
// @include: sort-alpha
```

```ts twoslash
// @include: sorter
// ---cut---
// @include: sort-alpha-desc
```

## 4. Benefits vs increased complexity

You might say that using the coding to an interface requires more moving parts than coding to an implementation. You're right!

The biggest benefit, as you might see already, is the `ListRenderer` class using an abstract interface `Sorter`. 

As such `ListRenderer` is decoupled from any concrete implementations of sortings: `SortAlphabetically` or `SortAlphabeticallyDescending`.  

Now you can supply different implementations of sorting. In one case you can use sorting ascending alphabetically:

```ts twoslash
// @include: sorter
// @include: renderer-to-interface
// @include: sort-alpha
// ---cut---
const names = ['Joker', 'Catwoman', 'Batman'];

const rendererAscending = new ListRenderer(
  new SortAlphabetically()
);
rendererAscending.render(names); 
// =>
// <ul>
//   <li>Bane</li>
//   <li>Catwoman</li>
//   <li>Joker</li>
// </ul>
```
[Try the demo.](https://codesandbox.io/s/sorted-renderer-interface-alpha-0nv8v?file=/src/index.ts)

In another case you can easily compose the `ListRenderer` to sort the names descending, without modifying the source code of `ListRenderer`:

```ts twoslash
// @include: sorter
// @include: renderer-to-interface
// @include: sort-alpha-desc
// ---cut---
const names = ['Joker', 'Catwoman', 'Batman'];

const rendererDescending = new ListRenderer(
  new SortAlphabeticallyDescending()
);
rendererDescending.render(names);
// =>
// <ul>
//   <li>Joker</li>
//   <li>Catwoman</li>
//   <li>Bane</li>
// </ul>
```
[Try the demo.](https://codesandbox.io/s/sorted-renderer-interface-desc-eyuci?file=/src/index.ts)

But you can also choose the concrete sorting depending on a runtime value:

```ts 
const sortingMechanism = 
  someRuntimeBoolean ?
    new SortAlphabetically() :
    new SortAlphabeticallyDescending();

const renderer = new ListRenderer(
  sortingMechanism
);

// ...
```

## 5. Conclusion

*Programming to an interface* is a useful principle to design a dependency that can change in time or different dependency implementations can be selected by a runtime value.  

Programming to an interface usually requires the main class (e.g. `ListRenderer`) to depend on an interface (e.g. `Sorter`), and the concrete implementations (e.g. `SortAlphabetically` and `SortAlphabeticallyDescending`) to implement that interface.  

The client of the main class (e.g. `ListRenderer`) can supply any dependency implementation it needs at hand, without modifying the source code of the main class (e.g. `ListRenderer`).  

Note that programming to an interface comes with the price of increased complexity. Using it must be a wise and deliberate choice.  

However, if you're sure that a certain part of your code won't change, then the programming to an implementation is a wise, good and cheap choice! 

For example, if the `ListRenderer` will always sort the names alphabetically in ascending order: then stop at the design presented at the beginning of section [2](/#2-programming-to-an-implementation). Do not add unnecessary complexity.  