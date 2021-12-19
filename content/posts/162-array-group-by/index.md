---
title: "Grouping Array Items in JavaScript: Welcome array.groupBy()"
description: "array.groupBy() method let's you group items of an array by a certain criteria."  
published: "2021-12-19"
modified: "2021-12-19"
thumbnail: "./images/cover.png"
slug: javascript-array-groupby
tags: ['javascript', 'array']
recommended: ['javascript-array-at', 'operations-on-arrays-javascript']
type: post
---

I have little experience in Ruby programming language, but many developers like it because of the rich 
standard utility libraries. For example, the [array in Ruby](https://ruby-doc.org/core-3.0.2/Array.html) has a huge number of methods.  

JavaScript step by steps also enriches its standard library on strings and arrays. In one of the previous posts I described
the new [array.at()](/javascript-array-at/) method.  

The todays's hero is the new [array group proposal](https://github.com/tc39/proposal-array-grouping) (currently at stage 3) that introduces new methods `array.groupBy()` and `array.groupByToMap()`.

Let's see how you may benefit from these methods.  

## 1. *array.groupBy()*

Let's say that you have a list of products, where each product is an object having 2 properties: `name` and `category`.  

```javascript
const products = [
  { name: 'apples', category: 'fruits' },
  { name: 'oranges', category: 'fruits' },
  { name: 'potatoes', category: 'vegetables' }
];
```

In the example above `products` is an array of product objects.  

Now you have to perform a simple manipulation with the list of products &mdash; group the products by category.  

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

How would you get an array like `groupByCategory` from `products` array?  

The usual way to do this is invoking the `array.reduce()` method with the right callback function:

```javascript
const groupByCategory = products.reduce((group, product) => {
  const { category } = product;
  group[category] = group[category] ?? [];
  group[category].push(product);
  return group;
}, {});

console.log(groupByCategory); // { fruits: [...], vegetables: [...] }
```
[Try the demo.](https://codesandbox.io/s/elastic-montalcini-tlgvt?file=/src/index.js)

`products.reduce((acc, product) => { ... })` reduces the `products` array to an object of product names grouped by the category.  

While I do consider `array.reduce()` array method useful and powerful, sometimes its readability is not the best.  

Because grouping data is an often occuring task (recall `GROUP BY` from SQL?) the [array group proposal](https://github.com/tc39/proposal-array-grouping) introduces two useful methods: `array.groupBy()` and `array.groupByToMap()`.  

Here's how you would use `array.groupBy()` to create the same grouping by category:

```javascript
const groupByCategory = products.groupBy(product => {
  return product.category;
});

console.log(groupByCategory); // { fruits: [...], vegetables: [...] }
```

`products.groupBy(callback)` accepts a callback function. The callback function is being invoked with 3 arguments: the current array item, index, and the array itself. 

## 2. *array.groupByToMap()*

## 3. Conclusion

