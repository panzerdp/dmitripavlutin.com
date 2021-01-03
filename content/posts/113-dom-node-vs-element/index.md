---
title: "What's the Difference between DOM Node and Element?"
description: "What's the Difference between DOM Nodes and Elements?"
published: "2021-01-05T12:00Z"
modified: "2021-01-05T12:00Z"
thumbnail: "./images/cover-2.png"
slug: dom-node-vs-element
tags: ['dom', 'node', 'element']
recommended: ['javascript-event-delegation', 'simple-but-tricky-javascript-interview-questions']
type: post
---

The Document Object Model (DOM) is an interface that treats HTML or XML document as a tree structure where each node is an object of the document. DOM also provide a set of methods that can query the tree, change the structure, style.  

Also in HTML you might be familiar with the term element: which is also an structural unit of the document.  

So, what's the difference between DOM Node and Element? Let's find out.  

## 1. DOM Node

The key to understanding the difference between a node and an element is straigfoward: you need to undersand well what is a DOM node. 

In simple terms, a DOM document consists of a hierarchy of nodes. Each node can have a parent and children. As an example, look at the following HTML document:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>My Page</title>
  </head>
  <body>
    <!-- Page Body -->
    <h2>My Page</h2>
    <p id="content">Thank you for visiting my web page!</p>
  </body>
</html>
```

The above HTML document is repsesented by the following hierarchy of nodes:

![Hierarchy of DOM Nodes](./images/dom-nodes.png)

The `<html>` tag is a node in the document tree. `<html>` has 2 children: `<head>` and `<body>` nodes.  

`<body>` is also a node having 3 children: a comment `<!-- Page Body -->`, heading `<h2>`, and paragraph `<p>`.    

While it's obvious that the tags in the HTML document represent a node, what's even more interesting is that regular text is also a node!

The paragraph node `<p>` has 1 child: the text node `"Thank you for visiting my web page!"`.  

### 1.2 DOM Node Types

How can you distinguish these different types of nodes? The answer lays in the DOM [Node](https://developer.mozilla.org/en-US/docs/Web/API/Node) interface, particularly in the `Node.nodeType` property.  

`Node.nodeType` can have one of the following constant value that represents the type of the node:

* `Node.ELEMENT_NODE`
* `Node.ATTRIBUTE_NODE`
* `Node.TEXT_NODE`
* `Node.CDATA_SECTION_NODE`
* `Node.PROCESSING_INSTRUCTION_NODE`
* `Node.COMMENT_NODE`
* `Node.DOCUMENT_NODE`
* `Node.DOCUMENT_TYPE_NODE`
* `Node.DOCUMENT_FRAGMENT_NODE`
* `Node.NOTATION_NODE`

The constants meaningfully suggest the type of the node they indicate: for example `Node.ELEMENT_NODE` represents the type of an element node, ``Node.TEXT_NODE`` represents a text node, `Node.DOCUMENT_NODE` the document node, and so on.  

For example, if you use the DOM query functions `document.querySelector(selector)` and select the `<p>` node, then it would have the type `Node.ELEMENT_NODE`:

```javascript
const paragraph = document.querySelector('p');

paragraph.nodeType === Node.ELEMENT_NODE; // => true
```

Same way you can use `childNodes` property of the node object and check what kind of children the paragraph node contains:   

```javascript
const paragraph = document.querySelector('p');
const firstChild = paragraph.childNodes[0];

firstChild.nodeType === Node.TEXT_NODE; // => true
```

So, the paragraph node has one child of type text.  

There's a node type that represents the entire document tree of nodes &mdash; `Node.DOCUMENT_NODE`:

```javascript
document.nodeType === Node.DOCUMENT_NODE; // => true
```

## 2. DOM Element

After getting a good grasp of what a DOM node is, now is the time to differentiate the DOM node and element. 

I'd say that if you get well the term of node the answer is obvious: an element is just a subtype of node. Alongside with types like document, comment or text.  

The element is a subtype of node the same way a cat is a subtype of animal.  

In simple words, an element is a node that's written using tag in the HTML document. `<html>`, `<head>`, `<title>`, `<body>`, `<h2>`, `<p>` are all elements because they are represented by tags.  

`Node` and `HTMLElement` are constructors of a node and an element in JavaScript DOM implementation. Since an element is a subtype of node, a paragraph would be an instance of both `Node` and `HTMLElement`:

```javascript
const paragraph = document.querySelector('p');

paragraph instanceof Node;        // => true
paragraph instanceof HTMLElement; // => true
```

## 3. Node and element collections

## 4. Summary

Understanding the difference between a DOM node and element is easy if you understand what actuall a node is.  

The document is a hierarchical collection of nodes. Each node can have a parent and children.  

Nodes can be of different types, the element type being one of them. The element is a subtype of node that is represented by a tag in the HTML document.  

