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

The todays's hero is the new [proposal array group](https://github.com/tc39/proposal-array-grouping) (currently at stage 3) that introduces new methods `array.groupBy()` and `array.groupByToMap()`.

Let's see how you may benefit from these methods.  

## 1. *array.groupBy()*

Let's say that you have a list of products, where each product is an object having 2 properties: `name` and `category`.  

```javascript
const products = [
  { name: 'apples', category: 'fruits' },
  { name: 'oranges', category: 'fruits' },
  { name: 'potatoes', category: 'vegetables' },
  {  }
];
```

## 2. *array.groupByToMap()*

## 3. Conclusion

