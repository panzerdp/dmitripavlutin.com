---
title: "How to Parse URL in JavaScript: hostname, pathname, query, hash"
description: "How access the hostname, pathname, query, or hash of an URL in JavaScript."
published: "2020-07-07T12:00Z"
modified: "2020-07-07T12:00Z"
thumbnail: "./images/cover-8.png"
slug: parse-url-javascript
tags: ["url", "hostname", "pathname", "query", "hash"]
recommended: ['replace-all-string-occurrences-javascript', 'what-every-javascript-developer-should-know-about-unicode']
type: post
commentsThreadId: parse-url-javascript
---

A Uniform Resource Locator, abbreviated **URL**, is a reference to a web resource (web page, image, file). The URL specifies the resource location and a mechanism of retrieveing the resource (http, ftp, mailto).  

In simple words, the URL is an address where a specific web page (or an image) can be found.  

For example, here's the URL of this blog post:

```
https://dmitripavlutin.com/parse-url-javascript/
```

Accessing parts of an URL like the *hostname* (e.g. `dmitripavlutin.com`), or *pathname* (e.g. `/parse-url-javascript/`) requires a parser function. A convinient and supported by modern browsers parser is the `URL()` constructor.  

In this post, I'm going to show you the structure of an URL. Then, you're going to use the `URL()` constructor to easily pick parts of an URL like hostname, pathname, query, or hash.  

```toc
toHeading: 2
```

## 1. URL structure

In the following image you can find the structure of an URL and the important components:

!!!Insert Image HERE

## 2. *URL()* constructor

The `URL()` is a constuctor function that enables the parsing of components of an URL:

```javascript
const url = new URL(absoluteOrRelative [, absoluteBase]);
```

`relativeOrAbsolute` argument can be either an absolute or relative URL. If the first argument is relative, then the second argument `absoluteBase` is obligatory and have to be an absolute URL being the base for the first argument.   


For example, let's initialize `URL()` with one absolute URL argument:

```javascript
const url = new URL('http://example.com/path/index.html');

url.href; // => 'http://example.com/path/index.html'
```

or combine a relative and absolute URLs:

```javascript
const url = new URL('/path/index.html', 'http://example.com');

url.href; // => 'http://example.com/path/index.html'
```

Note that you can use `href` property of the `URL()` instance to access the entire URL.  

### 1.1 URL validation

When creating an instance of an `URL()`, as a side effect, the constructor validates
the URL value. If the URL string is not valid, the `URL()` constructor throws a `TypeError`.  

In the following example the URL is not valid, thus a `TypeError` is thrown:

```javascript{7}
let isValidURL;
try {
  const url = new URL('http ://example.com');
  isValidURL = true;
} catch (error) {
  isValidURL = false;
  error; // TypeError: "Failed to construct 'URL': Invalid URL"
}

isValidURL; // => false
```

`http ://example.com` is an invalid URL because of the space character after `http`.  

## 2. Query string

`url.search` property accesses the query string of the URL prefixed with `?`:

```javascript
const url = new URL(
  'http://example.com/path/index.html?param1=value1&param2=value2'
);

url.search; // => '?param1=value1&param2=value2'
```

If there are no query string parameters, `url.search` evaluates to an empty string `''`:

```javascript
const url1 = new URL('http://example.com/path/index.html');
const url2 = new URL('http://example.com/path/index.html?');

url1.search; // => ''
url2.search; // => ''
```

### 2.1 Parsing query string

More handy than accessing the raw query string 

## 3. *hostname*

Now it's the time to explore how can you access the different components of the URL.  

`url.hostname` property holds the hostname of the URL:

```javascript
const url = new URL('http://example.com/path/index.html');

url.hostname; // => 'example.com'
```

## 4. *pathname*

`url.pathname` property accesses the pathname of the URL:

```javascript
const url = new URL('http://example.com/path/index.html?param=value');

url.pathname; // => '/path/index.html'
```

If the URL doesn't have a path, the `url.pathname` property returns a slash character `/`:

```javascript
const url = new URL('http://example.com/');

url.pathname; // => '/'
```

## 5. *hash*

## 6. Summary