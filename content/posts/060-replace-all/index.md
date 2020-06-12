---
title: '3 Ways To Replace All String Occurrences in JavaScript'
description: 'You can replace all occurrences of a string using split and join approach, replace() with a regular expression and the new replaceAll() string method.'
published: '2019-12-24T11:15Z'
modified: '2020-05-15T16:30Z'
thumbnail: './images/replace-4.png'
slug: replace-all-string-occurrences-javascript
tags: ['javascript', 'string']
recommended: ['announcing-voca-the-ultimate-javascript-string-library', 'what-every-javascript-developer-should-know-about-unicode']
type: post
commentsThreadId: replace-all-string-occurrences-javascript
---

There's no easy way in JavaScript to replace all string occurrences. Java, which had served an inspiration for JavaScript in the first days, has `replaceAll()` method on strings since 1995!  

In this post, I will show you 2 ways on how to replace all string occurrences in JavaScript: splitting and joining a string, and `replace()` combined with a global regular expression.  

Finally, you'll read about the new proposal [String.prototype.replaceAll()](https://github.com/tc39/proposal-string-replaceall) (at stage 3) that brings the `replaceAll()` method to strings.   

```toc
toHeading: 2
```

## 1. Split and join an array

If you google how to replace all string occurrences in JavaScript, most likely the first approach you'll find is the use of an intermediate array. Here's how it works:

1) Split the string into pieces by the search string.
2) Then join the pieces with the replace string in between.  

For example, let's replace `+` with `*` in the string `'1+2+3'`:

* First, splitting `'1+2+3'` into pieces by `+` results in `['1', '2', '3']`  
* Then joining `['1', '2', '3']` with `*` in between results in `'1*2*3'`.  

Here's how you can use `split()` and `join()` methods to achieve the same in JavaScript:

```javascript{4}
const search = 'duck';
const replaceWith = 'goose';

const result = 'duck duck go'.split(search).join(replaceWith);

result; // => 'goose goose go'
```

`'duck duck go'.split('duck')` splits the string into pieces: `['', ' ', ' go']`.  

Then these pieces are joined `['', ' ', ' go'].join('goose')` by inserting `'goose'` in between them, which results in the string `'goose goose go'`.  

Here's a generalized helper function that uses splitting and joining:

```javascript
function replaceAll(string, search, replace) {
  return string.split(search).join(replace);
}

replaceAll('abba', 'a', 'i');          // => 'ibbi'
replaceAll('go go go!', 'go', 'move'); // => 'move move move!'
replaceAll('oops', 'z', 'y');          // => 'oops'
```

This approach requires transforming the string into an array, and then back into a string. It's a workaround rather than a good solution.  

## 2. *replace()* with a global regular expression

`String.prototype.replace(regExp, replaceWith)` searches occurrences by a regular expression `regExp`, then replaces all the matches with a `replaceWith` string.  

You have to enable the global flag on the regular expression to make the `replace()` method replace all occurrences of the pattern. Here's how you do it:

1) In the regular expression literals append `g` after at the flags section: `/search/g`
2) In case of the regular expression constructor, use the flags argument: `new RegExp('search', 'g')`  

Let's replace all occurrences of `'duck'` with `'goose'`:

```javascript
const searchRegExp = /duck/g;
const replaceWith = 'goose';

const result = 'duck duck go'.replace(searchRegExp, replaceWith);

result; // => 'goose goose go'
```

The regular expression literal `/duck/g` matches the `'duck'` string, and has the global mode enabled.  

`'duck duck go'.replace(/duck/g, 'goose')` replaces all matches of `/duck/g` with `'goose'`.  

You can easily make *case insensitive* replaces by adding `i` flag to the regular expression:

```javascript{1}
const searchRegExp = /duck/gi;
const replaceWith = 'goose';

const result = 'DUCK duck go'.replace(searchRegExp, replaceWith);

result; // => 'goose goose go'
```

The regular expression `/duck/gi` performs a global case insensitive search (note `i` and `g` flags). `/duck/gi` matches `'duck'`, as well as `'DUCK'`, `'Duck'`, and alike.  

`'DUCK duck go'.replace(/duck/gi, 'goose')` replaces all matches of `/duck/gi` substrings, in a case insensitive way, with `'goose'`.  

### 2.1 Regular expression from a string

When creating the regular expresson from a string, you have to escape the characters `- [ ] / { } ( ) * + ? . \ ^ $ |` because they have special meaning within the regular expression.  

Unfortunately, the special characters are a problem when you'd like to make replace all operation. Here's an example:

```javascript{3}
const search = '+';

const searchRegExp = new RegExp(search, 'g'); // Throws SyntaxError
const replaceWith = '-';

const result = '5+2+1'.replace(searchRegExp, replaceWith);
```

The above snippet tries to transform the search string `'+'` into a regular expression. But `'+'` is an invalid regular expression, thus `SyntaxError: Invalid regular expression: /+/` is thrown.  

Escaping the character `'\\+'` solves the problem. But does it worth escaping each time the search string using a function like [escapeRegExp()](https://vocajs.com/#escapeRegExp)? Most likely not.  

### 2.2 *replace()* with a string

If the first argument of `replace(search, replaceWith)` is a string, then the method replaces *only the first occurrence* of `search`:  

```javascript{1}
const search = 'duck';
const replaceWith = 'goose';

const result = 'duck duck go'.replace(search, replaceWith);

result; // => 'goose duck go'
```

`'duck duck go'.replace('duck', 'goose')` replaces only the first appearance of `'duck'` with `'goose'`.  

## 3. *replaceAll()* method

Finally, the new proposal [String.prototype.replaceAll()](https://github.com/tc39/proposal-string-replaceall) (at stage 3) brings the `replaceAll()` method to JavaScript's strings.  

`string.replaceAll(search, replaceWith)` method replaces all appearances of `search` string with `replaceWith`.  

Let's replace all occurrences of `'duck'` with `'goose'`:

```javascript
const search = 'duck'
const replaceWith = 'goose';

const result = 'duck duck go'.replaceAll(search, replaceWith);

result; // => 'goose goose go'
```

`'duck duck go'.replaceAll('duck', 'goose')` replaces all occurrences of `'duck'` string with `'goose'`.  

`string.replaceAll(search, replaceWith)` is the best way to replace all string occurrences in a string. Even if the method requires a [polyfill](https://github.com/es-shims/String.prototype.replaceAll).  

### 3.1 The difference between *replaceAll()* and *replace()*

The string methods `replaceAll(search, replaceWith)` and `replace(search, replaceWith)` behave the same way, expect 2 things:

1) If `search` argument is a string, `replaceAll()` replaces *all occurrences* of `search` with `replaceWith`, while `replace()` *only the first occurence*  
2) If `search` argument is a non-global regular expression, then `replaceAll()` throws a `TypeError` exception.  

## 4. Key takeaway

One approach to replace all occurrences is to split the string into chunks by the search string, the join back the string placing the replace string between chunks: `string.split(search).join(replaceWith)`. This approach works, but it's hacky.

Another approach is to use `String.prototype.replace()` with a regular expresson having the global flag enabled: `string.replace(/SEARCH/g, replaceWith)`.

Unfortunately, you cannot easily generate regular expressions from a string at runtime, because the special characters of regular expressions have to be escaped. And dealing with a regular expression for a simple replacement of strings is overwhelming.

Finally, the new string method `String.prototype.replaceAll()` can easily replace all string occurrences: `string.replaceAll(search, replaceWith)`. The method is a proposal at stage 3, but hopefully, it will land in a new JavaScript standard pretty soon.

My recommendation is to use `replaceAll()` to replace strings. You'll need a [polyfill](https://github.com/zloirock/core-js#stringreplaceall) to use the method.  

*What other ways to replace all string occurrences do you know? Please share in a comment below!*
