---
title: "Is it Safe to Compare JavaScript Strings?"
description: "Is it Safe to Compare JavaScript Strings?"
published: "2020-08-18T12:00Z"
modified: "2020-08-18T12:00Z"
thumbnail: "./images/cover.png"
slug: compare-javascript-strings
tags: ['javascript', 'equality', 'string']
recommended: ['how-to-compare-objects-in-javascript', 'what-is-string-in-javascript']
type: post
commentsThreadId: compare-javascript-strings
---

Let's compare 2 strings:

```javascript
const str1 = 'Hello!';
const str2 = 'Hello!';

str1 === str2; // => true
```

Because `str1` and `str2` have the same characters, you guessed right that these are equal strings.  

Is that always the case when 2 strings look the same, and are equal?  

Let's try another example:

```javascript
const str1 = 'café';
const str2 = 'café';

str1 === str2; // => false
```

While `str1` and `str2` look the same, they have different characters that render the same. 

Let's detail into how to correctly compare strings in JavaScript. Before starting, I'm going to describe
the concepts that describe a character from different points of view: as a unit of writing, and rendered character.  

## 1. What's a grapheme

Let's look at the following string:

```javascript
const str1 = 'café';
```

By looking at the string, what can you say about it? 

Since you know how these characters in advance (you've learnt in school the meaning of each character)  has 4 characters: *lowercase c*, 	*lowercase a*, *lowercase f*, *lowercase e with acute*.  

The way a user thinks about a character is named *grapheme*. The example string `café` contains 4 graphemes.  

Here's a formal definition of a grapheme:

> *The grapheme* is a minimally distinctive unit of writing in the context of a particular writing system.  

Ok, that's all interesting, but how does it relate to safe comparison of strings?  Using *different sets of characters* you can render *the same grapheme*.  

Particularly, there is a special set of characters named *combining marks* (aka *diacritics*) that are used to modify the previous character to create new graphemes. Let's slighly detail into combining marks.  

## 2. What's a combining mark

## 3. Safe comparison of strings

## 4. Summary