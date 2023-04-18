---
title: "Array Grouping in JavaScript: array.groupBy()"
description: "array.groupBy() and array.groupByToMap() methods let you group an array by certain criteria."  
published: "2021-12-20"
modified: "2023-01-28"
thumbnail: "./images/cover.png"
slug: javascript-array-group
tags: ['javascript', 'array']
type: post
---

Many developers appreciate Ruby programming language because of the rich standard utility libraries. For example, the [array in Ruby](https://ruby-doc.org/core-3.0.2/Array.html) has a huge number of methods.  

JavaScript also enriches its standard library on strings and arrays step by step. For example, in a previous post, I described
the new [array.at()](/javascript-array-at/) method.  

Today's hero is the new [array group proposal](https://github.com/tc39/proposal-array-grouping) (currently at stage 3) that introduces new methods `array.groupBy()` and `array.groupByToMap()`. Their [polyfills](https://github.com/zloirock/core-js#array-grouping) are available in `core-js` library.  

Let's see how you may benefit from the grouping methods.  

<Affiliate type="traversyJavaScript" />

## 1. array.groupBy()

You have a list of products, where each product is an object having 2 properties: `name` and `category`.  

```javascript
const products = [
  { name: 'apples', category: 'fruits' },
  { name: 'oranges', category: 'fruits' },
  { name: 'potatoes', category: 'vegetables' }
];
```

In the example above `products` is an array of product objects.  

Now your task is to group the products by category. The result would look like this:  

```javascript
const groupByCategory = {
  'fruits': [
    { name: 'apples', category: 'fruits' }, 
    { name: 'oranges', category: 'fruits' },
  ],
  'vegetables': [
    { name: 'potatoes', category: 'vegetables' }
  ]
};
```

How would you get an array like `groupByCategory` from `products` array in JavaScript?  

The usual way is by invoking the `array.reduce()` method with a callback function implementing the grouping logic:

```javascript
const groupByCategory = products.reduce((group, product) => {
  const { category } = product;
  group[category] = group[category] ?? [];
  group[category].push(product);
  return group;
}, {});

console.log(groupByCategory);
// {
//   'fruits': [
//     { name: 'apples', category: 'fruits' }, 
//     { name: 'oranges', category: 'fruits' },
//   ],
//   'vegetables': [
//     { name: 'potatoes', category: 'vegetables' }
//   ]
// }
```
[Open the demo.](https://codesandbox.io/s/elastic-montalcini-tlgvt?file=/src/index.js)

`products.reduce((acc, product) => { ... })` reduces the `products` array to an object of products grouped by category.  

While I do consider `array.reduce()` method useful and powerful, sometimes its readability is not the best.  

Because grouping data is an often occurring task ([recall](https://www.programiz.com/sql/group-by) `GROUP BY` from SQL?) the [array group proposal](https://github.com/tc39/proposal-array-grouping) introduces two useful methods: `array.groupBy()` and `array.groupByToMap()`.  

Here's how to use `array.groupBy()` to create the same grouping by category:

```javascript
const groupByCategory = products.groupBy(product => {
  return product.category;
});

console.log(groupByCategory); 
// {
//   'fruits': [
//     { name: 'apples', category: 'fruits' }, 
//     { name: 'oranges', category: 'fruits' },
//   ],
//   'vegetables': [
//     { name: 'potatoes', category: 'vegetables' }
//   ]
// }
```

[Open the demo.](https://codesandbox.io/s/bold-goodall-r3c4c?file=/src/index.js)

`products.groupBy(product => {...})` returns an object where properties are category names and values are arrays of category products.

Grouping using `products.groupBy()` requires less code and is easier to understand than using `product.reduce()`.  

`array.groupBy(callback)` accepts a callback function that's invoked with 3 arguments: the current array item, the index, and the array itself. The `callback` should return a string: the group name where you'd like to add the item.  

```javascript
const groupedObject = array.groupBy((item, index, array) => {
  // ...
  return groupNameAsString;
});
```

## 2. array.groupByToMap()

[Sometimes](/maps-vs-plain-objects-javascript/) you may want to use a `Map` instead of a plain object. The benefit of `Map` is that it accepts any data type as a key, but the plain object is limited to strings and symbols only.  

So, if you'd like to group data into a `Map`, you can use the method `array.groupByToMap()`. 

`array.groupByToMap(callback)` works the same way as `array.groupBy(callback)`, only that it groups items into a `Map` instead of a plain JavaScript object.  

For example, grouping the products array into a map by category name is performed as follows:

```javascript
const groupByCategory = products.groupByToMap(product => {
  return product.category;
});

console.log(groupByCategory); 
// Map([
//   ['fruits', [
//     { name: 'apples', category: 'fruits' }, 
//     { name: 'oranges', category: 'fruits' },
//   ]],
//   ['vegetables', [
//     { name: 'potatoes', category: 'vegetables' }
//   ]
// ])
```

[Open the demo.](https://codesandbox.io/s/sparkling-waterfall-kdlpy?file=/src/index.js)

## 3. Conclusion

If you want to easily group the items of an array (similarly to `GROUP BY` in SQL), then welcome the new methods `array.groupBy()` and `array.groupByToMap()`.  

Both functions accept a callback that should return the key of the group where the current items must be inserted.  

`array.groupBy()` groups the items into a plain JavaScript object, while `array.groupByToMap()` groups them into a `Map` instance.  

If you'd like to use these functions right away, then use the [polyfill](https://github.com/zloirock/core-js#array-grouping) provided by core-js library.  
