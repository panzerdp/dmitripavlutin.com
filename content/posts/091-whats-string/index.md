---
title: "What Actually is a String in JavaScript?"
description: "What Actually is a String in JavaScript"
published: "2020-08-04T12:00Z"
modified: "2020-08-04T12:00Z"
thumbnail: "./images/cover-2.png"
slug: what-is-string-in-javascript
tags: ['javascript', 'string']
recommended: ['what-every-javascript-developer-should-know-about-unicode', 'string-interpolation-in-javascript']
type: post
commentsThreadId:  what-is-string-in-javascript
---

## 1. Modelling by visible characters

The simplest way, *yet not entirely accurate*, to mentally model the JavaScript strings is by a sequence of characters like letters, numbers and punctuation marks.  

The string in the following code sample:

```javascript
const message = 'Hello!';
```

consists of 5 letters and an exclamation mark.  

Thinking about strings as a sequence of visible characters also suggests that the number of characters in 
`'Hello!'` string equal to 5. That's correct:

```javascript
const message = 'Hello!';

message.length; // => 5
```

The approach to model the strings by visible characters (glyphs) works well if the charaters are from [Basic Latin](https://en.wikipedia.org/wiki/Basic_Latin_(Unicode_block)) block of characters, also known as [the 127 ASCII characters](https://theasciicode.com.ar/).  

But as soon as you deal with more complex characters, for example [the emoticons](https://en.wikipedia.org/wiki/Emoticons_(Unicode_block)) (😀, 😁, 😈), modelling the strings by visible characters becomes innacurate. Let me show you why.    

Consider the following string:

```javascript
const smile = '😀';
```

You can see that the string contains just one character: the grinning face.  

But if you use the `smile.length` property to determine the number of characters, you might be surprised that it actually contains 2 units:

```javascript
const smile = '😀';

smile.length; // => 2
```

How could that happen: you see one character, while `length` indicates 2 of them?  It happens because JavaScript thinks about strings as a sequence of code units, rather than a sequence of visible characters.  

Let's see in more detail what strings actually are in JavaScript.  

## 2. Modelling by code units

A good place to looking for truth about JavaScript is to look at the language specification.  

Let's see what the specification [says](https://tc39.es/ecma262/#sec-ecmascript-language-types-string-type) about what strings are in JavaScript:

> *The String type* is the set of all ordered sequences of zero or more 16-bit unsigned integer values (“elements”). The String type is generally used to represent textual data in a running ECMAScript program, in which case each element in the String is treated as a **UTF-16 code unit value**.  

Simply saying, the strings in JavaScript are a sequence of numbers, exactly UTF-16 code unit values.  

Ok, but what are exactly code units? Let's give them a definition too:

> *Code unit* is a bit sequence used to encode each character within a given encoding form.

Because JavaScript uses UTF-16 encoding, *each code unit is just a number from `0x0000` until `0xFFFF`*. The magic happens because there is a strict mapping between the code unit value and a specific character.  

For example, the code unit `0x0048` can be rendered to the actual character `H` inside a string using the unicode escape sequence: `\u0046`.  

```javascript
const letter = '\u0048';

letter === 'H' // => true
```

Now let's use directly code units to create the `'Hello!'` string:

```javascript
const message = '\u0048\u0065\u006C\u006C\u006F\u0021';

message === 'Hello!'; // => true
```

So, `\u0048\u0065\u006C\u006C\u006F\u0021` is how JavaScript sees the strings: as a sequence of code units. Note that the presented sequence has 6 code units, which corresponds to the number of visibile characters in the `'Hello!'` string.  



## 3. Summary