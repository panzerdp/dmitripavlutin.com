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

While `str1` and `str2` look the same, they have different characters that render the same. How's that possible?

Let's detail into how to correctly compare strings in JavaScript. Before starting, I'm going to describe
the concepts that describe a character from different points of view: as a unit of writing, and rendered character.  

## 1. What's a grapheme

By looking at the following string, what can you say about its content? 

```javascript
const str1 = 'café';
```

You can easily see that it has 4 letters: *lowercase c*, 	*lowercase a*, *lowercase f*, and *lowercase e with acute*.  

A stricter definition of the letter of a string is *grapheme*. The example string `café` contains 4 graphemes.  

Here's a formal definition of a grapheme:

> *Grapheme* is a minimally distinctive unit of writing in the context of a particular writing system.  

Ok, that's all interesting, but how does it relate to safe comparison of strings?  Using *different sets of characters* you can render *the same grapheme*.  

Particularly, there is a special set of characters named *combining marks* (aka *diacritics*) that are used to modify the previous character to create new graphemes. Let's slighly detail into combining marks.  

## 2. What's a combining mark

> *Combining mark* is a character that applies to the precedent base character to create a grapheme.  

Combining marks include accents, diacritics, Hebrew points, Arabic vowel signs, and Indic matras.

Combining marks normally are not used in isolation, i.e. without the base character. You should avoid displaying them isolated.  

For example, `é` is an atomic grapheme. The first way to render it, as you might know already, is just to use the *lowercase e with acute* character:

```javascript
const e1 = 'é';

e1; // renders as "é"
```

However, that's not the only way you could render this grapheme. You can take a *lowercase e* and combine it with a combining mark *combining acute accent* ◌́ to achieve the same result: e + ◌́  = é.  

```javascript
const e2 = 'e\u0301';

e2; // renders as "é"
```

where `\u0301` is the unicode escape sequence of the combining mark ◌́ .  

## 3. Safe comparison of strings

Having a better understanding of graphemes, here are a couple of rules for safer strings comparison in JavaScript.  

First, you are safe to compare strings that contain characters from Basic Multilangual Plane using regular comparison operators `===`, `==` or utility function `Object.is()`.  

Secondly, if there are chances that you deal with strings above the Basic Multilangual Plane with combining marks, then you aren't safe to compare strings using `===`, `==` and `Object.is()`. What you need to do additionally is to *normalize* the compared strings:

```javascript
const str1 = 'café';
const str2 = 'café';

str1 === str2;                         // => false
str1.normalize() === str2.normalize(); // => true
```

## 4. Summary

You're safe to compare strings directly when the characters of the string are from the Basic Multilangual Plane.  

However, if the string can contain combining characters, then it would be safe to normalize both compared string to the same form using `string.normalize()` function, then perform the comparison.  