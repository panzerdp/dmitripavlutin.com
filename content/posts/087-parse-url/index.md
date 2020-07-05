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

A Uniform Resource Locator, abbreviated **URL**, is a reference to a web resource (web page, image, file). The URL specifies the resource location and a mechanism of retrieving the resource (http, ftp, mailto).  

In simple words, the URL is an address where a web page (or generally a resource) is located.  

For example, here's the URL of this blog post:

```
https://dmitripavlutin.com/parse-url-javascript
```

Accessing components of an URL like the *hostname* (e.g. `dmitripavlutin.com`), or *pathname* (e.g. `/parse-url-javascript`) requires a parser function. A convinient parser is the `URL()` constructor.  

In this post, I'm going to show you the structure of an URL. Then, you're going to use the `URL()` constructor to easily pick parts of an URL like hostname, pathname, query, or hash.  

```toc
```

## 1. URL structure

In the following image you can find the structure of an URL with its components:

![URL() constructor components in JavaScript](./images/url-constructor-components-10.png)

## 2. *URL()* constructor

The `URL()` is a constuctor function that enables the parsing of components of an URL:

```javascript
const url = new URL(absoluteOrRelative [, absoluteBase]);
```

`relativeOrAbsolute` argument can be either an absolute or relative URL. If the first argument is relative, then the second argument `absoluteBase` is obligatory and has to be an absolute URL being the base for the first argument.   

For example, let's initialize `URL()` with an absolute URL:

```javascript
const url = new URL('http://example.com/path/index.html');

url.href; // => 'http://example.com/path/index.html'
```

or combine a relative and absolute URLs:

```javascript
const url = new URL('/path/index.html', 'http://example.com');

url.href; // => 'http://example.com/path/index.html'
```

The `href` property of the `URL()` instance returns the entire URL string.  

After creating an `URL()` instance, you can access the URL components presented in the [previous picture](#1-url-structure):

```typescript
interface URL {
  href:     USVString;
  protocol: USVString;
  username: USVString;
  password: USVString;
  host:     USVString;
  hostname: USVString;
  port:     USVString;
  pathname: USVString;
  search:   USVString;
  hash:     USVString;

  readonly origin: USVString;
  readonly searchParams: URLSearchParams;

  toJSON(): USVString;
}
```

where `USVString` type maps to a string when returned in JavaScript.  

### 2.1 URL validation

When `new URL()` constructor creates an instance, as a side effect, it also validates
the URL for correctness. If the URL string is invalid, the `URL()` constructor throws a `TypeError`.  

In the following example the URL is not valid, thus a `TypeError` is thrown:

```javascript{7}
try {
  const url = new URL('http ://example.com');
} catch (error) {
  error; // => TypeError, "Failed to construct 'URL': Invalid URL"
}
```

`http ://example.com` is an invalid URL because of the space character after `http`.  

Now it's the time to explore how can you access the different components of the URL. I'll start with
the most used component: the query string.  

## 3. Query string

`url.search` property accesses the query string of the URL prefixed with `?`:

```javascript
const url = new URL(
  'http://example.com/path/index.html?message=hello&who=world'
);

url.search; // => '?message=hello&who=world'
```

If the query string is missing, `url.search` evaluates to an empty string `''`:

```javascript
const url1 = new URL('http://example.com/path/index.html');
const url2 = new URL('http://example.com/path/index.html?');

url1.search; // => ''
url2.search; // => ''
```

### 3.1 Parsing query string

More handy than accessing the raw query string is to access the query parameters.  

An easy way to pick query parameters gives `url.searchParams` property. This property holds an instance of [URLSearchParams](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams).  

`URLSearchParams` object provides lots of methods (like `get(param)`, `has(param)`) to access the query string parameters.  

Let's look at an example:

```javascript
const url = new URL(
  'http://example.com/path/index.html?message=hello&who=world'
);

url.searchParams.get('message'); // => 'hello'
url.searchParams.get('missing'); // => null
```

`url.searchParams.get('message')` returns the value of `message` query parameter &mdash; `'hello'`.  

The query string doesn't contain a parameter `missing`. That's why accessing a non-existing parameter `url.searchParams.get('missing')` evaluates to 
`null`.  

## 4. *hostname*

`url.hostname` property holds the hostname of the URL:

```javascript
const url = new URL('http://example.com/path/index.html');

url.hostname; // => 'example.com'
```

## 5. *pathname*

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

## 6. *hash*

Finally, the hash can be accessed using `url.hash` property:

```javascript
const url = new URL('http://example.com/path/index.html#bottom');

url.hash; // => '#bottom'
```

When the hash in the URL is missing, `url.hash` evaluates to an empty string:

```javascript
const url = new URL('http://example.com/path/index.html');

url.hash; // => ''
```

## 7. Summary

The `URL()` constructor is handy to parse (and validate) URLs in JavaScript.  

`new URL(relativeOrAbsolute [, absoluteBase])` accepts as first argument an absolute or relative URL. When the first argument is relative, you have to indicate the second argument as an abolsute URL that serves the base for the first argument.    

After creating the `URL()` instance, you can easily access the most common URL components like:

* `url.search` for raw query string
* `url.searchParams` for an instance of `URLSearchParams` to pick query string parameters
* `url.hostname` to access the hostname
* `url.pathname` to read the pathname
* `url.hash` to determine the hash value

Aside from accessing URL components, the properties like `search`, `hostname`, `pathname`, `hash` are writeable &mdash; thus you can manipulate the URL.  

*What is your favorite tool to parse URLs in JavaScript?*