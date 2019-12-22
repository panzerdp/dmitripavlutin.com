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

JavaScript doesn't have a good way to replace all string occurrences. The irony is that Java, which had served a rough inspiration for JavaScript in the first days, has the `replaceAll()` method on strings from 1995!  

Fortunately, the new proposal [String.prototype.replaceAll()](https://github.com/tc39/proposal-string-replaceall) (at stage 3) brings the `replaceAll()` method to JavaScript's strings.  

In this post you'll find 2 workarounds to replace all string occurrences in JavaScript: using split and join array methods and `replace()` combined with a regular expression. 

And finally, you'll read about the correct way by using the new `replaceAll()` method.  

## 1. Split and join an array

The first approach to replace all string occurrences in a haystack string consist of 2 phases:

1) Split the string into pieces by the search string
2) Then join by the string to replace.  

Let's replace all occurrences of `'duck'` with `'goose'`:

```javascript{4}
const search = 'duck';
const replaceWith = 'goose';

const result = 'duck duck go'.split(search).join(replaceWith);

result; // => 'goose goose go'
```

`'duck duck go'.split('duck')` results in an array of chunks: `['', ' ', ' go']`.  

These chunks are then joined `['', ' ', ' go'].join('goose')`, which results in the final string `'goose goose go'`.  

Here's a generalized helper function that uses this approach:

```javascript
function replaceAll(string, search, replace) {
  return string.split(search).join(replace);
}

replaceAll('abba', 'a', 'i');          // => 'ibbi'
replaceAll('go go go!', 'go', 'move'); // => 'move move move!'
replaceAll('oops', 'z', 'y');         // => 'oops'
```

This approach suffers from being hacky and requires transforming the string into an array of string chunks.

## 2. *replace()* with a global regular expression

`String.prototype.replace(regExpOrString, replaceWith)` lets you search for a string using a regular expression and replace it with a particular string. 

To use this approach it's obligatory to enable the [global search](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#Advanced_searching_with_flags) on the regular expression. Having a global flag enabled, `replace()` will search for all matches of the regular expression inside the string.

1) In the regular expression literals append `g` after at the flags section: `/search/g`
2) In case of the regular expression constructor, use the flags argument: `new RegExp('search', 'g')`  

Let's replace all occurrences of `'duck'` with `'goose'`:

```javascript
const searchRegExp = /duck/g;
const replaceWith = 'goose';

const result = 'duck duck go'.replace(searchRegExp, replaceWith);

result; // => 'goose goose go'
```

`'duck duck go'.replace(/duck/g, 'goose')` replaces all findings of `/duck/g` substrings with `goose`.  

When searching by pattern you can easily make *case insensitive* searches with `i` flag:

```javascript{1}
const searchRegExp = /duck/gi;
const replaceWith = 'goose';

const result = 'DUCK duck go'.replace(searchRegExp, replaceWith);

result; // => 'goose goose go'
```

`'DUCK duck go'.replace(/duck/gi, 'goose')` replaces all findings of `/duck/gi` substrings, in a case insensitive way, with `goose`.

### 2.1 Regular expression from a string

Using regular expression is difficult when the search string is determined at runtime.  

You can create a regular expression from a string using a constructor invocation: 

```javascript
const search = 'goose';
const searchRegExp = new RegExp(search, 'g');
```

Because certain characters like `- [ ] / { } ( ) * + ? . \ ^ $ |` have special meaning in the regular expression, you have to [escape the string for these special characters](https://vocajs.com/#escapeRegExp).  

Here's an example of the problem:

```javascript{3}
const search = '+';

const searchRegExp = new RegExp(search, 'g'); // Throws SyntaxError
const replaceWith = '-';

const result = '5+2+1'.replace(searchRegExp, replaceWith);
```

The above snippet tries to transform the search string `+` into a regular expression. But `+` is an invalid regular expression, thus `SyntaxError: Invalid regular expression: /+/` is thrown.   

### 2.2 *replace()* when replacing strings directly

Note that if the first argument of `replace(search, replaceWith)` is a string, then the method replaces *only the first occurrence* of `search`.  

```javascript{1}
const search = 'duck';
const replaceWith = 'goose';

const result = 'duck duck go'.replace(search, replaceWith);

result; // => 'goose duck go'
```

`'duck duck go'.replace('duck', 'goose')` replaces only the first appearance of `'duck'` with `'goose'`.  

## 3. *replaceAll()* method

Finally, the new proposal [String.prototype.replaceAll()](https://github.com/tc39/proposal-string-replaceall) (at stage 3) brings the `replaceAll()` method to JavaScript's strings.  

`replaceAll()` method replaces all appearances of a string with just 1 method call, without workaround like splitting an array or creating regular expressions.

Let's replace all occurrences of `'duck'` with `'goose'`:

```javascript
const search = 'duck'
const replaceWith = 'goose';

const result = 'duck duck go'.replaceAll(search, replaceWith);

result; // => 'goose goose go'
```

`'duck duck go'.replaceAll('duck', 'goose')` replaces all occurrences of `'duck'` string with `'goose'`. It's simple and straightforward.

### 3.1 The difference between *replaceAll()* and *replace()*

The string methods `replaceAll(search, replaceWith)` and `replace(search, replaceWith)` behave the same way but with 2 differences:

1) If `search` argument is a string, `replaceAll()` replaces *all occurrences* of `search` with `replaceWith`, while `replace()` *only the first occurence*  
2) If `search` argument is a non-global regular expression, then `replaceAll()` throws a `TypeError` exception.  

## 4. Key takeaway

Replacing all string occurrences should be an easy thing to do. However, JavaScript didn't have a method for doing this for a long time.

To emulate the replace all behavior, one approach is to split the string into chunks by the search string, the join back the string by the replace string: `string.split(search).join(replaceWith)`. This approach works, but it's hacky.

Another approach would be to use `String.prototype.replace()` with a regular expresson with global search enabled: `string.replace(/SEARCH/g, replaceWith)`.

Unfortunately, you cannot easily generate regular expressions from a string at runtime, because the special characters of regular expressions have to be escaped. And dealing with a regular expression for a simple replace of strings is overwhelming.

Finally, the `String.prototype.replaceAll()` the method can easily replace all string occurrences directly: `string.replaceAll(search, replaceWith)`. It's a proposal at stage 3, but hopefully, it will land in a new JavaScript standard pretty soon.

So, I recommend you to use `replaceAll()` for all string occurrences replacement.

*What other ways to replace all string occurrences do you know? Please share in a comment below!*
