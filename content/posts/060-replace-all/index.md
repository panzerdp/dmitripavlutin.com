---
title: '3 Ways To Replace All String Occurrences in JavaScript'
description: 'You can replace all occurrences of a string using split and join approach, replace() with a regular expression and the new replaceAll() string method.'
published: '2019-12-24T11:15Z'
modified: '2019-12-24T11:15Z'
thumbnail: './images/replace-4.png'
slug: replace-all-string-occurrences-javascript
tags: ['javascript', 'string']
recommended: ['announcing-voca-the-ultimate-javascript-string-library', 'what-every-javascript-developer-should-know-about-unicode']
type: post
commentsThreadId: replace-all-string-occurrences-javascript
---

JavaScript doesn't provide an easy way to replace all string occurrences. The irony is that Java, which had served an inspiration for JavaScript in the first days, has been having the `replaceAll()` method on strings since 1995!  

This post describes 2 workarounds to replace all string occurrences in JavaScript: splitting and joining of a string, and `replace()` combined with a regular expression. 

Finally, you'll read about the new proposal [String.prototype.replaceAll()](https://github.com/tc39/proposal-string-replaceall) (at stage 3) that brings the `replaceAll()` method to strings.   

## 1. Split and join an array

The first approach to replace all string occurrences of a string consist of 2 phases:

1) Split the string into pieces by the search string.
2) Then join the pieces back having the replace string between the pieces.  

For example, let's replace `+` with `-` in the string `'1+2+3'`. First, `'1+2+3'` is split by `+`, which results in `['1', '2', '3']` pieces. Then these pieces are joined with `-` in between, which results in `'1-2-3'`.  

Here's how you can use `split()` and `join()` methods to achieve this in JavaScript:

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

`'duck duck go'.replace(/duck/g, 'goose')` replaces all findings of `/duck/g` substrings with `'goose'`.  

You can easily make *case insensitive* replaces by adding `i` flag to the regular expression:

```javascript{1}
const searchRegExp = /duck/gi;
const replaceWith = 'goose';

const result = 'DUCK duck go'.replace(searchRegExp, replaceWith);

result; // => 'goose goose go'
```

Looking again at the regular expression: `/duck/gi`. The regular expression has enabled the case insensitive search: `i`, alongside global flag `g`. `/duck/gi` matches `'duck'`, as well as `'DUCK'`, `'Duck'`, and so on.  

`'DUCK duck go'.replace(/duck/gi, 'goose')` replaces all findings of `/duck/gi` substrings, in a case insensitive way, with `'goose'`.  

While regular expressions replace all occurrences of a string, in my opinion, this approach is too heavy.  

### 2.1 Regular expression from a string

Using regular expression approach is inconvinient when the search string is determined at runtime. When creating a regular expresson from a string, you have to escape the characters `- [ ] / { } ( ) * + ? . \ ^ $ |`.  

Here's an example of the problem:

```javascript{3}
const search = '+';

const searchRegExp = new RegExp(search, 'g'); // Throws SyntaxError
const replaceWith = '-';

const result = '5+2+1'.replace(searchRegExp, replaceWith);
```

The above snippet tries to transform the search string `'+'` into a regular expression. But `'+'` is an invalid regular expression, thus `SyntaxError: Invalid regular expression: /+/` is thrown.  

Escaping the character `'\\+'` solves the problem. For a simple replace all occurrences task dealing with regular expressions and escaping the search string is too complex.  

### 2.2 *replace()* with a string

If the first argument of `replace(search, replaceWith)` is a string, then the method replaces *only the first occurrence* of `search`.  

```javascript{1}
const search = 'duck';
const replaceWith = 'goose';

const result = 'duck duck go'.replace(search, replaceWith);

result; // => 'goose duck go'
```

`'duck duck go'.replace('duck', 'goose')` replaces only the first appearance of `'duck'` with `'goose'`.  

## 3. *replaceAll()* method

Finally, the new proposal [String.prototype.replaceAll()](https://github.com/tc39/proposal-string-replaceall) (at stage 3) brings the `replaceAll()` method to JavaScript's strings.  

`replaceAll(search, replaceWith)` string method replaces all appearances of `search` string with `replaceWith`, without any workarounds.  

Let's replace all occurrences of `'duck'` with `'goose'`:

```javascript
const search = 'duck'
const replaceWith = 'goose';

const result = 'duck duck go'.replaceAll(search, replaceWith);

result; // => 'goose goose go'
```

`'duck duck go'.replaceAll('duck', 'goose')` replaces all occurrences of `'duck'` string with `'goose'`. It's straightforward solution.  

### 3.1 The difference between *replaceAll()* and *replace()*

The string methods `replaceAll(search, replaceWith)` and `replace(search, replaceWith)` behave the same way, expect 2 things:

1) If `search` argument is a string, `replaceAll()` replaces *all occurrences* of `search` with `replaceWith`, while `replace()` *only the first occurence*  
2) If `search` argument is a non-global regular expression, then `replaceAll()` throws a `TypeError` exception.  

## 4. Key takeaway

Replacing all string occurrences should be an easy thing to do. However, JavaScript hasn't had a method for doing this for a long time.

One approach is to split the string into chunks by the search string, the join back the string placing replace string between chunks: `string.split(search).join(replaceWith)`. This approach works, but it's hacky.

Another approach would be to use `String.prototype.replace()` with a regular expresson with global search enabled: `string.replace(/SEARCH/g, replaceWith)`.

Unfortunately, you cannot easily generate regular expressions from a string at runtime, because the special characters of regular expressions have to be escaped. And dealing with a regular expression for a simple replace of strings is overwhelming.

Finally, the `String.prototype.replaceAll()` the method can easily replace all string occurrences directly: `string.replaceAll(search, replaceWith)`. It's a proposal at stage 3, but hopefully, it will land in a new JavaScript standard pretty soon.

My recommendation is to use `replaceAll()` to replace strings. You'll need a [polyfill](https://github.com/zloirock/core-js#stringreplaceall) to use the method.  

*What other ways to replace all string occurrences do you know? Please share in a comment below!*
