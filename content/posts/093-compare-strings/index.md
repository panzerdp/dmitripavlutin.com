---
title: "Is it Safe to Compare JavaScript Strings?"
description: "2 similar-looking strings in JavaScript might not be equal... so how would you safely compare strings?"
published: "2020-08-18T10:15Z"
modified: "2020-08-18T10:15Z"
thumbnail: "./images/cover-4.png"
slug: compare-javascript-strings
tags: ['javascript', 'equality', 'string']
recommended: ['what-every-javascript-developer-should-know-about-unicode', 'what-is-string-in-javascript']
type: post
---

Let's compare 2 strings `str1` and `str2`:

```javascript
const str1 = 'Hello!';
const str2 = 'Hello!';

str1 === str2; // => true
```

Because `str1` and `str2` have the same characters, these strings are equal.  

Is it always the case that 2 strings looking the same are equal? Let's try another example:

```javascript
const str1 = 'café';
const str2 = 'café';

str1 === str2; // => false
```

While `str1` and `str2` look the same, the comparison `str1 === str2` evaluates to `false`. How's that possible?

Let's detail into how to correctly compare strings in JavaScript. Before starting, I'm going to familiarize you with the terms of grapheme (a unit of writing) and combining character (specialized character that modify the look of a base character).  

*Before I continue, allow me to make a recommendation.* 

*If you want to significantly improve your JavaScript knowledge, take the  amazingly useful ["Modern JavaScript From The Beginning 2.0"](https://www.traversymedia.com/a/2147528886/FqXWyazh) by Brad Traversy. Use the coupon code "DMITRI" and get up to 20% discount!*

## 1. What's a grapheme

Looking at the following string, what can you say about its content? 

```javascript
const str1 = 'café';
```

You can easily see that it has 4 letters: *lowercase c*,  *lowercase a*, *lowercase f*, and *lowercase e with acute*.  

The way a user thinks about a character as a unit of writing is named *grapheme*. The example string `café` contains 4 graphemes.  

Here's a formal definition of a grapheme:

> *Grapheme* is a minimally distinctive unit of writing in the context of a particular writing system.  

Ok, that's all interesting, but how does it relate to the safe comparison of strings? Some *graphemes* can be rendered using *different sequences of characters*.  

Particularly, there is a special set of characters named *combining characters* that modify the previous character to create new graphemes. Let's detail combining characters.  

## 2. What's a combining character

> *Combining character* is a character that applies to the precedent base character to create a grapheme.  

Combining character include accents, diacritics, Hebrew points, Arabic vowel signs, and Indic matras.

Combining character always require a *base character* to be applied to. You should avoid displaying them isolated.  

For example, `é` is an atomic grapheme. You can take a *lowercase e* (the base character) and combine it with *combining acute accent* ◌́  (the combining character) to render the grapheme: e + ◌́  = é.  

```javascript
const e1 = 'e\u0301';

e1; // renders as "é"
```

where `\u0301` is the [unicode escape sequence](/what-every-javascript-developer-should-know-about-unicode/#unicode-escape-sequence) of the combining character ◌́.  

Note, however, that the same `é` can be represented in a different way using the *lowercase e with acute* character:

```javascript
const e2 = 'é';

e2; // renders as "é"
```

Even though `e1` and `e2` render the same grapheme, nevertheless, they are different string values:

```javascript
const e1 = 'e\u0301';
const e2 = 'é';

e1 === e2; // => false
```

## 3. Safe comparison of strings

Having a better understanding of graphemes and combining characters, here are a couple of rules for safer strings comparison in JavaScript.  

Firstly, you are safe to compare strings that contain characters from [Basic Multilangual Plane](https://en.wikipedia.org/wiki/Plane_(Unicode)#Basic_Multilingual_Plane) (including the [ASCII characters](https://en.wikipedia.org/wiki/Basic_Latin_(Unicode_block))) using regular comparison operators `===`, `==` or utility function `Object.is()`.  

```javascript
const str1 = 'Hello!';
const str2 = 'Hello!';

str1 === str2; // => true
```

Both `str1` and `str2` contain ASCII characters, so you can safely compare them using comparison operators.  

Secondly, if you deal with characters above the Basic Multilingual Plane, including combining characters, then you aren't safe to compare strings using `===`, `==` and `Object.is()`. What you need to do additionally is to normalize the compared strings.  

```javascript
const str1 = 'café';
const str2 = 'cafe\u0301'; // same as 'café'

str1 === str2;                         // => false
str1.normalize() === str2.normalize(); // => true
```

In simple words, the string *normalization* makes canonical-equivalent strings (`'café'` and `'cafe\u0301'` are equivalent because they represent the same graphemes) to have a unique representation (both `'café'` and `'cafe\u0301'` are normalized to a unique `'café'`).  

## 4. Summary

You're safe to compare strings directly when their characters are from the Basic Multilingual Plane.  

However, if the strings can contain combining characters, then it would be safer to normalize the compared strings to the same form using `string.normalize()` function. Then perform the comparison on the normalized strings.  
