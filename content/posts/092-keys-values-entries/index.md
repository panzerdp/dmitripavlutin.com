---
title: "How to Access Object's Keys, Values, and Entries in JavaScript"
description: "Let's see what utility functions provide JavaScript to extract the keys, values and entries from an object."
published: "2020-08-11T12:00Z"
modified: "2020-08-11T12:00Z"
thumbnail: "./images/cover-2.png"
slug: access-object-keys-values-entries
tags: ['javascript', 'object']
recommended: ['how-to-compare-objects-in-javascript', 'check-if-object-has-property-javascript']
type: post
commentsThreadId: access-object-keys-values-entries
---

When working with plain JavaScript objects, you often need to look through all the properties and values of it.  

Here are the most lists that you might be the most interested to extract from an object:

* *The keys* of an object is the list property names 
* *The values* of an object is the list property values 
* *The entries* of an object is the list of pairs of property name and corresponding value  

As a reference, let's consider the following JavaScript object:

```javascript
const hero = {
  name: 'Batman',
  city: 'Gotham'  
};
```

The keys of `hero` are `['name', 'city']`. The values are `['Batman', 'Gotham']`. And the entries are `[['name', 'Batman'], ['city', 'Gotham']]`.  

Let's see what utility functions provide JavaScript to extract the keys, values and entries from an object.  

