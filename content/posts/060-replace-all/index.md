---
title: '3 Ways To Replace All String Occurrences in JavaScript'
description: 'There are 3 ways to replace all string occurrences: split and join an array, replace() with a regular expression and the new replaceAll() string method.'
published: '2019-12-24T13:00Z'
modified: '2019-12-24T13:00Z'
thumbnail: './images/replace-4.png'
slug: replace-all-string-occurrences-javascript
tags: ['javascript', 'string']
recommended: ['announcing-voca-the-ultimate-javascript-string-library', 'what-every-javascript-developer-should-know-about-unicode']
type: post
commentsThreadId: replace-all-string-occurrences-javascript
---

JavaScript doesn't have a good way to replace all string occurrences. The irony is that Java, which had served a rough prototype for JavaScript in the first days, has the `replaceAll()` on strings from 1995!  

Fortunately, the new proposal [String.prototype.replaceAll()](https://github.com/tc39/proposal-string-replaceall) (at stage 3) brings the `replaceAll()` method to JavaScript's strings.  

In this post you'll find 2 tricky ways to replace all string occurrences in JavaScript: using split and join array methods and `replace()` combined with a regular expression. 

And finally, you'll read about the correct way to use `replaceAll()`. You'll need a polyfill to use it.  


## 1. Split and join an array

The first approach to replace all string occurrences in a haystack string is to use split the string into pieces by the search string, then join by the string to replace.  

Let's replace all occurrences of `'duck'` with `'goose'`:

```javascript
const search = 'duck';
const replaceWith = 'goose';

const result = 'duck duck go'.split(search).join(replaceWith);

result; // => 'goose goose go'
```



## 2. *replace()* with a global regular expression

## 3. *replaceAll()* method

## 4. Key takeway