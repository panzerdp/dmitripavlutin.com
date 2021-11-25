---
title: "How to Trim Strings in JavaScript"
description: "How to trim (aka remove whitespaces and line terminators) from strings in JavaScript."  
published: "2021-11-23T12:00Z"
modified: "2021-11-23T12:00Z"
thumbnail: "./images/cover-4.png"
slug: javascript-string-trim
tags: ['javascript', 'string', 'whitespace']
recommended: ['replace-all-string-occurrences-javascript', 'compare-javascript-strings']
type: post
---

A good practice when using string values from the input and textarea fields is to remove the whitespaces from the start and end of the strings.  

For example the user might write his first name like `'Dmitri'` into an input field. But also might introduce accidently
the value `'Dmitri '` &mdash; and the extra space wouldn't be visible inside the form on the web page.  

In this post, I'm going to describe what is exactly a whitespace and a line terminator character in JavaScript. Plus, you'll read how to trim strings, aka remove whitespaces and line terminator characters.  

## 1. The whitespaces and line terminators

Before diving into the actual trim functions, let's understand first what special characters the trims function is getting rid of.  

First, the whitespaces is a special set of characters consisting of:

* *SPACE* (`U+0020` code point)
* *CHARACTER TABULATION* (`U+0009` code point)
* *LINE TABULATION* (`U+000BU` code point)
* *FORM FEED (FF)* (`U+000C` code point)
* *NO-BREAK SPACE* (`U+00A0` code point)
* *ZERO WIDTH NO-BREAK SPACE* (`U+FEFFU` code point)
* Any other character from [Space Separator](https://www.compart.com/en/unicode/category/Zs) category

In simple words, the whitespaces are characters that when rendered on the screen create an empty white space. 

Common whitespace characters are space `' '` and tab `'\t'`.  

Secondly, the line terminator is also a special set of characters consisting of:

* *LINE FEED* (`U+000A` code point)
* *CARRIAGE RETURN* (`U+000D` code point)
* *LINE SEPARATOR* (`U+2028` code point)
* *PARAGRAPH SEPARATOR* (`U+2029` code point)

In simple words, the line terminator represent characters that exists and the end of a text line, having a special meaning.  

A common line terminator character are the line feed `'\n'`, which means moving one line forward. 

## 2. Trim strings in JavaScript

There are situations when you want to clean strings entering from the application input. For example, you'd definetely want to trim strings from form fields representing an username, first names, last name, phone number, etc.  

JavaScript provides 3 simple functions on how to remove sequences of whitespaces and line terminators.  

### 2.1 *string.trim()*

`string.trim()` removes sequences of whitespaces and line terminators from both ends of the string: at the start and at the end of the string.  

Let's see a few examples:

```javascript
const name = '  Kate ';
name.trim(); // => 'Kate'

const phoneNumber = '\t  555-123\n ';
phoneNumber.trim(); // => '555-123'
```

`name.trim()` removes the spaces from the start and end of the string. `'  Kate '` becomes `'Kate'`.  

Also `phoneNumber.trim()` removes the sequences of whitespaces and line terminals from both start and end of the string. `'\t  555-123\n '` becomes `'555-123'`.  

### 2.2 *string.trimStart()*

`string.trimStart()` removes sequences of whitespaces and line terminators only from the start of the string.  

```javascript
const name = '  Jane ';
name.trimStart(); // => 'Kate '

const phoneNumber = '\t  555-123 \n';
phoneNumber.trimStart(); // => '555-123 \n'
```

`name.trimStart()` removes the spaces only from the start of the string, and doesn't touch the space at the end of the string. `'  Jane '` becomes `'Jane '`.  

`phoneNumber.trimStart()` removes the sequence of whitespaces and line terminals from the start only. `'\t  555-123\n '` becomes `'555-123\n '`.   

### 2.3 *string.trimEnd()*

`string.trimEnd()` removes sequences of whitespaces and line terminators only from the end of the string.  

```javascript
const name = '  Jim ';
name.trimEnd(); // => '  Jim'

const phoneNumber = '\t  555-123 \n';
phoneNumber.trimEnd(); // => '\t  555-123'
```

`name.trimEnd()` removes the one space from the end of the string, and doesn't touch the leading part. `'  Jim '` becomes `'  Jim'`.  

`phoneNumber.trimEnd()` trims the end of the string too. `'\t  555-123\n '` becomes `'\t  555-123'`.   

## 3. Conclusion

The whitespaces, like a space or tab, are special characters that create empty space when rendered. 

Also the line terminals, like the line feed, you may find at the end of lines in a multiline string.  

Often you may find useful to remove these special characters from a string. The JavaScript trim functions can help you.  

`string.trim()` removes sequences of white spaces and line terminators from both the start and end of the string, `string.trimStart()` removes them from start, and finally `string.trimEnd()` removes them from the end.  