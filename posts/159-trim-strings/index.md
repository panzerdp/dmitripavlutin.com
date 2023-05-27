---
title: "How to Trim Strings in JavaScript"
description: "How to trim (aka remove whitespaces and line terminators) from strings in JavaScript."  
published: "2021-11-25T09:00Z"
modified: "2021-11-25T09:00Z"
thumbnail: "./images/cover.png"
slug: javascript-string-trim
tags: ['javascript', 'string', 'whitespace']
type: post
---

A good practice when using string values from form fields is to remove the whitespaces from the start and end of the strings &mdash; i.e. trim the string.    

In this post, I'm going to describe what is a whitespace and a line terminator character in JavaScript. 

Plus, you'll read how to trim strings, aka remove whitespaces and line terminator characters from the start and/or end of the string.  

<Affiliate />

## 1. The whitespaces and line terminators

Before diving into the actual trim functions, let's first agree what special characters the trim functions are removing from strings.  

First, the whitespace is any character from the following list:

* *SPACE* (`U+0020` code point)
* *CHARACTER TABULATION* (`U+0009` code point)
* *LINE TABULATION* (`U+000BU` code point)
* *FORM FEED (FF)* (`U+000C` code point)
* *NO-BREAK SPACE* (`U+00A0` code point)
* *ZERO WIDTH NO-BREAK SPACE* (`U+FEFFU` code point)
* Any other character from [Space Separator](https://www.compart.com/en/unicode/category/Zs) category

In simple words, the whitespaces are characters that rendered on the screen create an empty white space. 

Common whitespace characters are space `' '` and tab `'\t'`.  

Secondly, the line terminator is also a special set of characters consisting of:

* *LINE FEED* (`U+000A` code point)
* *CARRIAGE RETURN* (`U+000D` code point)
* *LINE SEPARATOR* (`U+2028` code point)
* *PARAGRAPH SEPARATOR* (`U+2029` code point)

The line terminator represents a character that exists at the end of a text line and has some special purpose.  

A common line terminator character is the line feed `'\n'`, which means moving one line forward. 

## 2. Trim strings in JavaScript

There are situations when you want to clean strings entering from the application input. For example, you'd definitely want to trim strings from the form fields representing a username, first name, last name, phone number, etc.  

JavaScript provides 3 simple functions on how to trim strings. 

### 2.1 string.trim()

`string.trim()` removes sequences of whitespaces and line terminators from both the start and the end of the string.  

Let's see a few examples:

```javascript
const name = '  Kate ';
name.trim(); // => 'Kate'

const phoneNumber = '\t  555-123\n ';
phoneNumber.trim(); // => '555-123'
```

[Open the demo.](https://jsfiddle.net/dmitri_pavlutin/8x3n40rh/)

`name.trim()` removes the spaces from the start and end of the string. `'  Kate '` becomes `'Kate'`.  

`phoneNumber.trim()` also cleans boths ends: `'\t  555-123\n '` becomes `'555-123'`.  

The trim function removes from both ends of the string sequences of *consecutive* white spaces and line terminals. But if a whitespace is found in between two letters, then, of course, this whitespace is preserved:

```javascript
const fullName = '  Kate Smith  ';
fullName.trim(); // => 'Kate Smith'
```

[Open the demo.](https://jsfiddle.net/dmitri_pavlutin/k3jfdvtb/)

`fullName.trim()` removes the spaces from both the start and end of the string, however keeps the space between `Kate` and `Smith` words.  

### 2.2 string.trimStart()

`string.trimStart()` removes sequences of whitespaces and line terminators only from the start of the string.  

```javascript
const name = '  Jane ';
name.trimStart(); // => 'Jane '

const phoneNumber = '\t  555-123 \n';
phoneNumber.trimStart(); // => '555-123 \n'
```

[Open the demo.](https://jsfiddle.net/dmitri_pavlutin/4w2p3oxz/)

`name.trimStart()` removes the spaces only from the start of the string, and doesn't touch the space at the end. `'  Jane '` becomes `'Jane '`.  

`phoneNumber.trimStart()` removes the sequence of whitespaces and line terminals from the start only. `'\t  555-123 \n'` becomes `'555-123 \n'`.   

### 2.3 string.trimEnd()

`string.trimEnd()` removes sequences of whitespaces and line terminators only from the end of the string.  

```javascript
const name = '  Jim ';
name.trimEnd(); // => '  Jim'

const phoneNumber = '\t  555-123 \n';
phoneNumber.trimEnd(); // => '\t  555-123'
```

[Open the demo.](https://jsfiddle.net/dmitri_pavlutin/1u8ym5wx/)

`name.trimEnd()` removes the one space from the end, and doesn't touch the leading part. `'  Jim '` becomes `'  Jim'`.  

`phoneNumber.trimEnd()` trims the end of the string too. `'\t  555-123\n '` becomes `'\t  555-123'`.   

## 3. Conclusion

The whitespaces, like a space or tab, are special characters that create empty space when rendered. 

Also the line terminals, like the line feed, you may find at the end of lines in a multiline string.  

Often you may find it useful to remove these special characters from a string. The JavaScript trim functions can help you.  

`string.trim()` removes sequences of white spaces and line terminators from both the start and end of the string, `string.trimStart()` removes them from start, and finally `string.trimEnd()` removes them from the end.  