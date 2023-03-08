---
title: '3 Ways To Replace All String Occurrences in JavaScript'
description: 'You can replace all occurrences of a string using split and join approach, replace() with a regular expression and the new replaceAll() string method.'
published: '2019-12-24T11:15Z'
modified: '2023-01-27'
thumbnail: './images/replace-4.png'
slug: replace-all-string-occurrences-javascript
tags: ['javascript', 'string']
recommended: ['announcing-voca-the-ultimate-javascript-string-library', 'what-every-javascript-developer-should-know-about-unicode']
type: post
---

In this post, you'll learn how to replace all string occurrences in JavaScript by splitting and joining a string, `string.replace()` combined with a global regular expression, and `string.replaceAll()`.  

<Affiliate type="traversyJavaScript" />

<TableOfContents maxLevel={2} />

## 1. Splitting and joining an array

If you google how to "replace all string occurrences in JavaScript", the first approach you are likely to find is to use an intermediate array.  

Here's how it works:

1) Split the `string` into `pieces` by the `search` string: 

```javascript
const pieces = string.split(search);
```

2) Then join the pieces putting the `replace` string in between: 

```javascript
const resultingString = pieces.join(replace);
```

For example, let's replace all spaces `' '` with hyphens `'-'` in `'duck duck go'` string:

```javascript{3}
const search = ' ';
const replaceWith = '-';

const result = 'duck duck go'.split(search).join(replaceWith);

console.log(result); // => 'duck-duck-go'
```
[Try the demo.](https://jsfiddle.net/dmitri_pavlutin/0cbfjwhz/)

`'duck duck go'.split(' ')` splits the string into pieces: `['duck', 'duck', 'go']`.  

Then the pieces  `['duck', 'duck', 'go'].join('-')` are joined by inserting `'-'` in between them, which results in the string `'duck-duck-go'`.  

Here's a generalized helper function that uses splitting and joining approach:

```javascript
function replaceAll(string, search, replace) {
  return string.split(search).join(replace);
}

console.log(replaceAll('abba', 'a', 'i'));          // => 'ibbi'
console.log(replaceAll('go go go!', 'go', 'move')); // => 'move move move!'
console.log(replaceAll('oops', 'z', 'y'));          // => 'oops'
```

[Try the demo.](https://jsfiddle.net/dmitri_pavlutin/rf3bnz2y/)

This approach requires transforming the string into an array, and then back into a string. Let's continue looking for better alternatives.  

## 2. replace() with a global regular expression

The string method `string.replace(regExpSearch, replaceWith)` searches and replaces the occurrences of the regular expression `regExpSearch` with `replaceWith` string.  

To make the method `replace()` replace all occurrences of the pattern - you have to enable the global flag on the regular expression:

1) Append `g` to the end of regular expression literal: `/search/g`
2) Or when using a regular expression constructor, add `'g'` to the second argument: `new RegExp('search', 'g')`  

Let's replace all occurrences of `' '` with `'-'`:

```javascript
const searchRegExp = /\s/g;
const replaceWith = '-';

const result = 'duck duck go'.replace(searchRegExp, replaceWith);

console.log(result); // => 'duck-duck-go'
```

[Try the demo.](https://jsfiddle.net/dmitri_pavlutin/479oarmj/)

The regular expression literal `/\s/g` (note the `g` global flag) matches the space `' '`.  

`'duck duck go'.replace(/\s/g, '-')` replaces all matches of `/\s/g` with `'-'`, which results in `'duck-duck-go'`.  

You can easily make *case insensitive* replaces by adding `i` flag to the regular expression:

```javascript{0}
const searchRegExp = /duck/gi;
const replaceWith = 'goose';

const result = 'DUCK Duck go'.replace(searchRegExp, replaceWith);

result; // => 'goose goose go'
```

The regular expression `/duck/gi` performs a global case-insensitive search (note `i` and `g` flags). `/duck/gi` matches `'DUCK'`, as well as `'Duck'`.  

Invoking `'DUCK Duck go'.replace(/duck/gi, 'goose')` replaces all matches of `/duck/gi` substrings with `'goose'`.  

### 2.1 Regular expression from a string

When the regular expression is created from a string, you have to escape the characters `- [ ] / { } ( ) * + ? . \ ^ $ |` because they have special meaning within the regular expression.  

Because of that, the special characters are a problem when you'd like to make replace all operation. Here's an example:

```javascript{2}
const search = '+';

const searchRegExp = new RegExp(search, 'g'); // Throws SyntaxError
const replaceWith = '-';

const result = '5+2+1'.replace(searchRegExp, replaceWith);
```
[Try the demo.](https://jsfiddle.net/dmitri_pavlutin/32wrdafe/)

The above snippet tries to transform the search string `'+'` into a regular expression. But `'+'` is an invalid regular expression, thus `SyntaxError: Invalid regular expression: /+/` is thrown.  

Escaping the character `'\\+'` solves the problem. [Try the fixed demo](https://jsfiddle.net/dmitri_pavlutin/32wrdafe/2/).

### 2.2 replace() with a string

If the first argument `search` of `string.replace(search, replaceWith)` is a string, then the method replaces *only the first occurrence* of `search`:  

```javascript{0}
const search = ' ';
const replace = '-';

const result = 'duck duck go'.replace(search, replace);

console.log(result); // => 'duck-duck go'
```
[Try the demo.](https://jsfiddle.net/dmitri_pavlutin/L7qutvmg/)

`'duck duck go'.replace(' ', '-')` replaces only the first appearance of a space.  

## 3. replaceAll() method

Finally, the method `string.replaceAll(search, replaceWith)` replaces all appearances of `search` string with `replaceWith`.  

Let's replace all occurrences of `' '` with `'-'`:

```javascript
const search = ' ';
const replaceWith = '-';

const result = 'duck duck go'.replaceAll(search, replaceWith);

console.log(result); // => 'duck-duck-go'
```

[Try the demo.](https://jsfiddle.net/dmitri_pavlutin/m5e603so/)

`'duck duck go'.replaceAll(' ', '-')` replaces all occurrences of `' '` string with `'-'`.  

`string.replaceAll(search, replaceWith)` is the best way to replace all string occurrences in a string 

Note that browser [support](https://caniuse.com/#search=replaceAll) for this method is currently limited, and you might require a [polyfill](https://github.com/es-shims/String.prototype.replaceAll).  

### 3.1 The difference between replaceAll() and replace()

The string methods `replaceAll(search, replaceWith)` and `replace(search, replaceWith)` work the same way, except 2 things:

1) If `search` argument is a string, `replaceAll()` replaces *all occurrences* of `search` with `replaceWith`, while `replace()` replaces *only the first occurence*  
2) If `search` argument is a non-global regular expression, then `replaceAll()` throws a `TypeError` exception.  

## 4. Key takeaway

The first approach to replacing all occurrences is to split the string into chunks by the search string and then join back the string, placing the replace string between the chunks: `string.split(search).join(replaceWith)`. This approach works, but it's hacky.

Another approach is to use `string.replace(/SEARCH/g, replaceWith)` with a regular expression having the global flag enabled. 

Unfortunately, you cannot easily generate regular expressions from a string at runtime, because the special characters of regular expressions have to be escaped.   

Finally, the string method `string.replaceAll(search, replaceWith)` replaces all string occurrences. 

I recommend using string.replaceAll() to replace strings.  

*What other ways to replace all string occurrences do you know? Please share in a comment below!*
