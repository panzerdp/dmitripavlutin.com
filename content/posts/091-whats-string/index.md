---
title: "What Actually is a String in JavaScript?"
description: "Strictly saying, a string in JavaScript is a sequence of UTF-16 code units."
published: "2020-08-04T07:00Z"
modified: "2020-08-04T07:00Z"
thumbnail: "./images/cover-2.png"
slug: what-is-string-in-javascript
tags: ['javascript', 'string']
recommended: ['what-every-javascript-developer-should-know-about-unicode', 'string-interpolation-in-javascript']
type: post
---

## 1. Modeling by visible characters

The simplest way, *yet not entirely accurate*, to mentally model the JavaScript strings is by a sequence of characters like letters, numbers, and punctuation marks.  

The string in the following code sample consists of 5 letters and an exclamation mark:

```javascript
const message = 'Hello!';
```

Thinking about strings as a sequence of visible characters also suggests that the number of characters in 
`'Hello!'` string equal to 6:

```javascript
const message = 'Hello!';

message.length; // => 6
```

The approach to model the strings by visible characters (glyphs) works well if the characters are from [Basic Latin](https://en.wikipedia.org/wiki/Basic_Latin_(Unicode_block)) block of characters, also known as [the 127 ASCII characters](https://theasciicode.com.ar/).  

*Before I continue, allow me to make a recommendation.* 

*If you want to significantly improve your JavaScript knowledge, take the  amazingly useful ["Modern JavaScript From The Beginning 2.0"](https://www.traversymedia.com/a/2147528886/FqXWyazh) by Brad Traversy. Use the coupon code "DMITRI" and get up to 20% discount!*

But as soon as you deal with more complex characters, for example [the emoticons](https://en.wikipedia.org/wiki/Emoticons_(Unicode_block)) (😀, 😁, 😈), modeling the strings by visible characters becomes inaccurate.    

Consider the following string:

```javascript
const smile = '😀';
```

You can see that the string contains just one character: the grinning face.  

But if you use the `smile.length` property to determine the number of characters, you might be surprised that it contains 2 units:

```javascript
const smile = '😀';

smile.length; // => 2
```

How could that happen: you see one character, while `length` indicates 2 of them?  

It's because JavaScript considers strings as a sequence of code units, rather than a sequence of visible characters.  

Let's see in more detail what strings are in JavaScript.  

## 2. Modeling by code units

The specification [says](https://tc39.es/ecma262/#sec-ecmascript-language-types-string-type) what strings are in JavaScript:

> *The String type* is the set of all ordered sequences of zero or more 16-bit unsigned integer values (“elements”). The String type is generally used to represent textual data in a running ECMAScript program, in which case each element in the String is treated as a **UTF-16 code unit value**.  

Simply saying, the strings in JavaScript are a sequence of numbers, exactly UTF-16 code unit values.  

*A code unit* is just a number from `0x0000` until `0xFFFF`. The magic happens because there is a mapping between the code unit value and a specific character.  

For example, the code unit `0x0048` is rendered to the actual character `H` using the *unicode escape sequence* `\u0048`:  

```javascript
const letter = '\u0048';

letter === 'H' // => true
```

Now let's use UTF-16 code units directly to create the `'Hello!'` string:

```javascript
const message = '\u0048\u0065\u006C\u006C\u006F\u0021';

message === 'Hello!'; // => true
message.length;       // => 6
```

`\u0048\u0065\u006C\u006C\u006F\u0021` is how JavaScript sees the strings: as a sequence of code units. Note that the presented sequence has 6 code units, which corresponds to the number of visible characters in the `'Hello!'` string.  

A Unicode character from [Basic Multilangual Plane](https://www.compart.com/en/unicode/plane/U+0000) is encoded with one code unit in UTF-16.  

However, characters from non-Basic Multilangual Plane:

* [Supplementary Multilingual Plane](https://en.wikipedia.org/wiki/Plane_(Unicode)#Supplementary_Multilingual_Plane)
* [Supplementary Ideographic Plane](https://en.wikipedia.org/wiki/Plane_(Unicode)#Supplementary_Ideographic_Plane)
* [Tertiary Ideographic Plane](https://en.wikipedia.org/wiki/Plane_(Unicode)#Tertiary_Ideographic_Plane)

require an unseparable pair of code units (named surrogate pair) to be encoded in UTF-16.  

For example, the grinning face character `'😀'`, which would have the code unit of `0x1F600` (the number `0x1F600` is bigger than `0xFFFF` thus doesn't fit into 16 bits), is encoded with a sequence of 2 code units `0xD83D0xDE00`:

```javascript
const smile = '\uD83D\uDE00';

smile === '😀'; // => true
smile.length;  // => 2
```

The sequence `\uD83D\uDE00` is a special pair named *surrogate pair*.  

`smile.length` evaluates to `2`, which denotes that the `length` property of the string primitive determines the number of *code units*.  

The string iterator is aware of the surrogate pairs. When you invoke the string iterator, for example using the spread operator `...`, it counts a surrogate pair as one length unit:

```javascript
const message = 'Hello!';
const smile = '😀';

[...message].length; // => 6
[...smile].length;   // => 1
```

## 3. Summary

The simplest way to think about JavaScript string is a sequence of visible characters. This approach works well for English letters, numbers, [ASCII characters](https://theasciicode.com.ar/).  

However, saying it strictly, a string in JavaScript is a sequence of UTF-16 code units. `string.length` property determines the number of code units, rather than the number of visible characters.  

Understanding that a string is a sequence of code units is necessary if you work with characters above the Basic Multilingual Plane.  

To solidify your knowledge on Unicode, code units, etc, I recommend reading my post [What every JavaScript developer should know about Unicode](https://dmitripavlutin.com/what-every-javascript-developer-should-know-about-unicode/).  