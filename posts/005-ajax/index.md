---
title: "Catch the XMLHttpRequest in Plain JavaScript"
description: "Explanation and example on how to catch the XMLHttpRequest start and finish events in plain JavaScript. Useful for Chrome extensions development."
published: "2016-01-24"
modified: "2016-01-24"
thumbnail: "./images/cover.jpg"
slug: catch-the-xmlhttp-request-in-plain-javascript
tags: ["javascript"]
recommended: ["gentle-explanation-of-this-in-javascript", "how-three-dots-changed-javascript"]
type: post
---

When coding Chrome extensions, sometimes I need to catch the event when JavaScript application starts a XMLHttpRequest (XHR) and finishes. Because the injected script into web page context do not modify the original application, this is hard to do, because pure XHR does not trigger global events.  

Some libraries, for example jQuery, do trigger global events `ajaxStart` and `ajaxStop`, and even offers *global ajax events* [API](https://api.jquery.com/Ajax_Events/). 
Unfortunately these events are triggered only when using library methods to make AJAX calls. And for encapsulation reason, the application can suppress these events, setting `global` option to `false`: 

```javascript
 $.ajax({
   url: "test.html",
   global: false
 });
```

## Investigation

JavaScript offers the modification of any object's `prototype`, including the host objects like XMLHttpRequest. This is exactly what we need to insert custom behavior.
The `open()` and `send()` will be overwritten with new methods holding the custom logic and then calling the original ones.   

Let's make sure that `XMLHttpRequest.prototype.open` and `XMLHttpRequest.prototype.send` are writable:

```javascript
var openDescriptor = Object.getOwnPropertyDescriptor(XMLHttpRequest.prototype, 'open'),
  sendDescriptor = Object.getOwnPropertyDescriptor(XMLHttpRequest.prototype, 'send');

openDescriptor // prints {"writable": true, "configurable": true, ...}
sendDescriptor // prints {"writable": true, "configurable": true, ...}
```

The method [Object.getOwnPropertyDescriptor()](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptor) is used to determine the settings (descriptor) of an object property. To override these methods, we need the `writable` to be `true`: which means that we can modify the property.

## Catch the request

Use the following code snippet to determine when an XMLHttpRequest starts and finishes:

```javascript
var open = window.XMLHttpRequest.prototype.open,
  send = window.XMLHttpRequest.prototype.send;

function openReplacement(method, url, async, user, password) {
  this._url = url;
  return open.apply(this, arguments);
}

function sendReplacement(data) {
  if(this.onreadystatechange) {
    this._onreadystatechange = this.onreadystatechange;
  }
  /**
   * PLACE HERE YOUR CODE WHEN REQUEST IS SENT  
   */
  this.onreadystatechange = onReadyStateChangeReplacement;
  return send.apply(this, arguments);
}

function onReadyStateChangeReplacement() {
  /**
   * PLACE HERE YOUR CODE FOR READYSTATECHANGE
   */
  if(this._onreadystatechange) {
    return this._onreadystatechange.apply(this, arguments);
  }
}

window.XMLHttpRequest.prototype.open = openReplacement;
window.XMLHttpRequest.prototype.send = sendReplacement;
```

Initially references to original `open()` and `send()` are saved. Later new methods for `XMLHttpRequest` are defined: `openReplacement()` and `sendReplacement()`, which will execute the custom code and then call the original methods using [Function.apply()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply).
In the end, the new methods are assigned to `XMLHttpRequest.prototype`. Because the class prototype is modified, any new instances of the `XMLHttpRequest` will use the custom methods.  

Notice that the override snippet should be applied before starting any XHR requests.

## Example

Check [the code sample](http://jsbin.com/jupaqe/3/edit?js,console), which demonstrates how to catch the send and finish events.

**See also**  
[XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest)