---
title: How to Make Your Open Source Project Successful
description: A successful open source project solves a real problem, puts an accent on quality and has excellent documentation.  
published: "2019-08-06"
modified: "2019-08-06"
thumbnail: "./images/world.jpg"
slug: how-to-make-your-open-source-project-successful
tags: ["open source"]
recommended: ["announcing-voca-the-ultimate-javascript-string-library", "become-better-software-developer-digging-climbing"]
type: post
---

You have decided to start an open source project. You have worked a few months on an interesting problem. Finally, you wrote some notes in README.md and released version 1.0. 

After a few weeks, you might notice that the usage of your project is low. You've worked a lot for free, giving your best efforts, but in the end, only a few people are interested in your project.  

How could that happen? And more importantly, what to do to make your open source project successful?  

I've built an open source library [vocajs.com](/announcing-voca-the-ultimate-javascript-string-library/) that managed to rise into the top trending repositories on GitHub. Along the way, I learned some important principles of how to make a quality open source project. I want to share these ideas with you.  

## 1. No one cares about your project

First of all, as an author, you need to shift your thinking about open source. You might think that if you put a lot of effort into your project (library, tool, framework, etc) that's interesting to you, a lot of people are going to get interested as well.  

Unfortunately, that's far from the truth...

It might sound harsh, but developers out there are only interested in *solving their problems*. So when someone visits your repository, one is searching for a solution. 

## 2. Solve a real problem

Before even starting the open source project, before even writing the first line of code, you need to invest a lot of time in finding a real problem to solve.  

To summarize, a good open source project solves a problem that developers are actively searching for a solution.  

![Solve a problem](./images/problem-lightbulb-solution.jpg)

Regarding my experience, I decided to write a JavaScript string library. My main reasoning was that the existing at that time solutions were low quality and that JavaScript by itself doesn't have a standard string library. 

I wasn't particularly enthusiastic about strings. Creating such a library might even be boring... But what's more important I found a decent problem to solve.  

What could be the strategies the find good problems to solve:

* Think about problems that you're experiencing yourself. Can you create a solution to this problem?  
* Think about open source projects that are widely used, but are not that good. It's perfectly ok to implement your own better solution.

## 3. Excellent README.md and documentation

Ok, you followed my advice, found a decent problem and implemented a relatively good solution. Is it enough?  

Unfortunately, that's still not enough...

If your README.md file lacks quality documentation, few people are going to use or get interested in your project.  

You might think that developers are going to dive into your implementation and find by themselves how to use your tool. Usually, that's not going to happen because nobody likes reading code.  

Let me tell you one truth that worked for me quite well: 

> Spend around 50% of the time writing compelling README.md and straightforward documentation  

It is really important to write good documentation on how to use your open source project. State the following:

* One short sentence explaining your project does or what problem does it solve
* A few sentences explaining why your solution is better than alternatives. Sell your tool.
* A list of features what your project provides
* Easy steps on how to install and use the tool

For example, in case of my open source library vocajs, I use the following one-sentence explanation: 

> *VocaJS* is a JavaScript library for manipulating strings  

This sentence instantly tells you what my project does: a JavaScript library that manipulates strings.  

The documentation should explain shortly and to the point all the usage aspects. Describe the API in detail, enumerate the function's parameters, state what data types are accepted, give appropriate examples.  

Here's how I documented the [v.kebabCase()](https://vocajs.com/#kebabCase) function of my library:  

![kebabCase() function documentation](./images/kebab.png)

You can easily understand how to use `kebabCase()` function: what it does, what parameters it accepts, and the returned value. A few examples are presented as well. You can even find links to the source code and the unit test.  

## 4. Put the accent on quality

Even if your project solves a wide problem, has great documentation, still, you have to earn trust. 

The truth is that there is a lot of open source code that is not the best quality. Nobody wants to depend on code that is unstable and full of bugs.  

In this regards a good way to increase trust and demonstrate the quality of your open source project is testing it. You might need to have at least 80% of code coverage.  

You can even go further and put some badges on README.md to demonstrate that your project is fully tested:  

(badges)

Additionally, your project will only from implementing even more non-functional requirements:

* Support a wide range of environments (cross-platform, cross-browser, etc)
* Provide the possibility to cherry-pick functionality
* Have few but ideally no dependencies 
* Have small build size

## 5. Showcase with demos and screenshots 

Humans are visual creatures. That's why if your project provides some Graphical user interface, I strongly recommend to include demos and screenshots.  

A good demo is worth a thousand words.  

For example, I implemented a small open source Chrome extension [Cliboardy](https://chrome.google.com/webstore/detail/clipboardy/gkafpbdjggkmmngaamlghmigadfaalhc). It copies posted code to clipboard from stackoverflow.com, github.com & npmjs.com.  

Instead of having a long text with explanations, right at the beginning of the [README.md](https://github.com/panzerdp/clipboardy) I show a demo in a gif file:

![Clipboardy demo](./images/demo.png)

Looking at this demo, you don't even have to read the description. It's spot-on.  

## 6. Continuously communicate

A good part of managing the open source project is dealing with people using it. It consists of communicating with users of your project, implement new features, fix bugs.  

While it might seem secondary at first, communicating is a complex task. You should strive to respond to issues and review pull requests. 

Sometimes you will deal with frustrated users, and you have to find the will to communicate politely with everyone.  

Open source is a non-paid long-term commitment.  

## 7. Conclusion

A successful open source project requires a lot of time and commitment.  

First of all your project must solve a problem, and solve it good. Developers are searching for good solutions for their problems.  

You must invest about 50% of the time into creating quality README.md and detailed documentation. The usage of your tool should be effortless for the user.  

Having a decent code coverage builds trust in the quality of your code. Do not forget to invest in non-functional requirements also, like supporting many environments and have few dependencies.  

Try to communicate with the users of your project. They will often report issues and suggest improvements. Polite and constructive communication is what you should strive to.  

If you want to know more, I recommend looking at ["Producing Open Source Software"](https://producingoss.com/en/getting-started.html#starting-from-what-you-have) free book.  

*What other tactics do you know to make the open source project successful?*