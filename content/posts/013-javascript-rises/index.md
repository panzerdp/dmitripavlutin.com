---
title: "Yes. JavaScript Rises."
description: "The history how JavaScript from a complementary language in 1995 became the most popular language these days."
published: "2016-07-04"
modified: "2016-07-04"
thumbnail: "./images/cover.jpg"
slug: javascript-rises
tags: ["javascript"]
recommended: ["the-path-of-software-development-craftsmanship", "coding-like-shakespeare-practical-function-naming-conventions"]
type: post
---

It is hard to find a developer who didn't write JavaScript code.  
These days ECMAScript 2015 makes JavaScript the supreme leader of the Web.

Let's see how JavaScript rises from a complementary language back in 1995 until these days, when it becomes very popular and conquerors the client and server side web development.  

*Before I go on, let me recommend something to you.* 

*If you want to significantly improve your JavaScript knowledge, take the  amazingly useful ["Modern JavaScript From The Beginning 2.0"](https://www.traversymedia.com/a/2147528886/FqXWyazh) by Brad Traversy. Use the coupon code "DMITRI" and get up to 20% discount!*

## The dark

![The dark](./images/image-1-3.jpg)

JavaScript was created in about 10 days by Brendan Eich in May 1995 at Netscape Communications, to accommodate the Netscape Navigator 2.0 Beta release schedule. It was necessary to sketch a simple programming language that can add interactivity to web pages.  

At that time, Netscape put accent on Java to create heavy components, which are embedded into the browser using [applets](https://en.wikipedia.org/wiki/Java_applet).  
Java applets are distributed to users in form of bytecode downloaded from server. The client machine should have installed the heavy Java Runtime Environment (JRE) and the browser should provide a compatible plug-in.  
Applets allow to develop a wide range of applications with support of 3D hardware acceleration and powerful APIs that Java platform provides.

Java is powerful, but complicated for non-professional coders who specialize in design, network administration, etc. The initial purpose of JavaScript was to support *amateur* programmers enabling web pages scripting, alongside with Java.  

These small scripts add basic interactivity to HTML elements: show a popup, respond to user input, change colors and other manipulations. People can share these scripts and anyone can customize them for his own needs. 
It seems reasonable that for such small manipulations Java is a too big caliber. A new lightweight language like JavaScript is a good accompaniment solution.  

To lower the entry barrier, JavaScript was designed as simple and easy to understand language. You don't need to learn a lot to dive in: 

* A few primitive types: number, string, boolean, `null` and `undefined`
* The variables declaration and usage: `var myNumber`
* A basic list of operators: `==`, `+`, `-`, etc
* Some control flow statements: `if (cond) {}`, `switch (value) {...}`
* Function declaration and invocation
* Event listeners

and you're ready to enhance the static HTML.  
You don't have to worry about Java, applets, threading, JRE, compilation, sandbox and security. These are too scary.  

*No one did expect* that such a simple approach is efficient and comfortable to work with. It is possible to criticize that poor decisions made from the start (optional variable declaration, no block scope, weird comparison operator `==`, etc) affected the language evolution in a negative way. Thus JavaScript achieved an amateur language reputation.  

However it was projected to be *complementary*. Brendan Eich at the time of designing JavaScript was already professionally practiced with building programming languages, so big mistakes were not made. The plan was to build in 10 days constraint a lightweight interpreted language, partially similar to Java.  
JavaScript acquired a syntax similar to [C](https://en.wikipedia.org/wiki/C_(programming_language)) language and used a [prototype](https://en.wikipedia.org/wiki/Prototype-based_programming) object model like [Self](https://en.wikipedia.org/wiki/Self_(programming_language)) language. 

>If I had done classes in JavaScript back in May 1995, I would have been told that it was too much like Java or that JavaScript was competing with Java. [...] [it] needed to be a silly little brother language.

*Brendan Eich, JavaScript creator*

## The glowing ember

![The glowing ember](./images/ember.jpg)

After the Netscape 2.0 beta release in September 1995,  LiveScript (the initial name of the JavaScript) received a lot of attention and was positively accepted by the community.  

Later on December 4, 1995 Netscape and Sun [announced](https://web.archive.org/web/20080213171613/http://wp.netscape.com/newsref/pr/newsrelease67.html) the new language JavaScript:

> [Netscape and Sun] today announced JavaScript, an open, cross-platform object scripting language for the creation and customization of applications on enterprise networks and the Internet.

The announcement indicates the target audience of the language, as mentioned above, are non professional developers:

> The JavaScript language complements Java, Sun's industry-leading object-oriented, cross-platform programming language. [...]  
JavaScript is analogous to Visual Basic in that it can be used by people with little or no programming experience to quickly construct complex applications.

Fortunately the web evolution has its own plans. In the long run the heavy Java environment and its applets were slowly discontinued. Having the Java environment executed in a browser is not the best option:   

* Applets are dependent from JRE environment and plugins to run Java in the browser. Dealing with additional dependencies costs effort and time  
* Slow applets download, especially before *.jar files
* Some security considerations, because Java can have a high level of access to user's operating system, depending on the permissions  
* Users need to make sure to use signed applets
* The applets content is not indexed by search engines and more.      

JavaScript does not have any dependencies. The language was born in the browser.  
No compilation step, easy to make HTML more interactive and the low dive in barrier: all these are useful advantages.  

Due to JavaScript popularity after the first release, Microsoft has implemented a special dialect called [JScript](https://en.wikipedia.org/wiki/JScript).  
To deal with such situations and create a better compliance across different browsers, it was a necessary to create a language standard. So [ECMA-262 1st edition](http://www.ecma-international.org/publications/files/ECMA-ST-ARCH/ECMA-262,%201st%20edition,%20June%201997.pdf) was published on June 1997. This way JavaScript started as the standard scripting language of the browsers.  

In 1999 Microsoft created the XmlHttp [ActiveX control](https://en.wikipedia.org/wiki/ActiveX), available in Internet Explorer 5. This control allows to send requests to server in background without web page reloading. A bit later other browsers implemented this mechanism known as the [XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest) JavaScript object.  

This technique, later called [AJAX](https://en.wikipedia.org/wiki/Ajax_(programming)), is a step forward to build interactive web pages that improves the user experience. It is now possible to design web pages containing desktop-like applications usability, without full page reload as was before.  

One of the first big web applications that used AJAX was Google Mail. In 2001 [Paul Buchheit](https://en.wikipedia.org/wiki/Paul_Buchheit) at Google started the development using highly interactive JavaScript with async requests. An efficient method that provides an user interface with almost instant response.  
The existing at that time Yahoo! Mail and Hotmail were quite slow, because of full page reload on every user action.   

JavaScript was in the front of this improvement.  

Because of the high JavaScript demand and the lack of initial features, the language went through another series of improvements.  
In December 1999 [ECMA-262 3rd edition](http://www.ecma-international.org/publications/files/ECMA-ST-ARCH/ECMA-262,%203rd%20edition,%20December%201999.pdf) added regular expressions, exceptions handling.  

The [4th language edition](http://www.ecmascript.org/es4/spec/overview.pdf) was supposed to add important improvements like interfaces, classes syntax, modules system and much more.  It was dropped because of political [differences](https://brendaneich.com/2007/10/open-letter-to-chris-wilson/) regarding language complexity. 

Later significant improvements were added by [ECMA-262 5th edition](https://people.mozilla.org/~jorendorff/es5.html). *Strict mode* is a language subset that provides detailed error checking and avoid error-prone code, JSON library support, getter and setter for objects and different fixes.  

## The fire rises

![The fire rises](./images/fire.jpg)

JavaScript engines until the middle of 2000s were quite slow and didn't provide the necessary performance for growing complexity of the web pages. Google's V8 engine first put a high standard in performance, that later followed other vendors.  
JavaScript started to gain a background that helped moving from web environment to server side and desktop applications.  

Let's be honest, prior to ECMAScript 2015 JavaScript lacked of features. Compared to Python or Ruby, it provides significantly lower number of language constructs. And has a big number of inconsistencies and traps.  

Not that language designers didn't see what needs to be changed or didn't have the plan to make it better. JavaScript went through a long history of different implementations and some of which, especially the first ones were not the best.   
[Browser wars](https://en.wikipedia.org/wiki/Browser_wars) slowed the language evolution because of non-standard implementations like JScript.  
The importance of keeping the backward compatibility (even keeping the *inconsistent things*) in order *not to break the Internet* has a negative impact until today.  

However the web progress, developers community, growing demand of complex applications and simple reasoning forces the language improvement.  

Fortunately [ECMAScript 2015](http://www.ecma-international.org/ecma-262/6.0/) is a major JavaScript renovation, which was awaited for a long time. Many vendors already [implemented](https://kangax.github.io/compat-table/es6/) the biggest part of the standard.  
Let's list only a few enhancements:

* Arrow functions
* Classes syntax
* Destructuring assignments
* Enhanced object literals
* Template strings
* Spread operator, rest parameter 
* `let` and `const` statements
* Iterators and generators
* Modules
* [And many more](https://github.com/lukehoban/es6features)

At this stage JavaScript becomes a fully featured language. However still there is a lot to be done and many improvements are to be added. 

AngularJS, ReactJS and other frameworks increased the popularity and usability of the JavaScript to build advanced web applications.  
In combination with platforms like [Electron](http://electron.atom.io/), desktop applications become a reality too.  

NodeJS runtime based on [V8 JavaScript Engine](https://developers.google.com/v8/)  allows to use JavaScript for server side development. Alongside with the largest ecosystem of open source libraries [npm](https://www.npmjs.com/), where you can find almost any library.  

I'm happy to see more and more developers who position themselves as **JavaScript Engineer**, a term popular these days.  

And it's only the beginning! It's hard to imagine JavaScript in 5 years, but I'm sure it will be something really great.  

*In your opinion, what made JavaScript so popular? Feel free to comment below.*  