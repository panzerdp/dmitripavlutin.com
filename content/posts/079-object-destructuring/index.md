---
title: "How to Use Object Destructuring in JavaScript"
description: "Object destructuring in JavaScript let's you extract properties from objects in one statement."
published: "2020-05-09T12:00Z"
modified: "2020-05-09T12:00Z"
thumbnail: "./images/cover.png"
slug: javascript-object-destructuring
tags: ["react", "component", "memoization"]
recommended: ["5-interesting-uses-javascript-destructuring", "object-rest-spread-properties-javascript"]
type: post
commentsThreadId: javascript-object-destructuring
---

The object destructuring in JavaScript is a greate feature that let's you extract properties from objects.  

What's better, object destructuring extracts more than one property in one statement, extracts properties from deep objects, and sets a default
value if the property doesn't exist.  

In this post, I'll explain all you need to know about object destructuring in JavaScript.  

## 1. The need of object destructuring

Having an object, imagine you'd like to extract a few properties from this object into some variables.  

In a pre-ES2015 environment, most likely you would need to write the following code:

```javascript{9-10}
const hero = {
  name: 'Batman',
  realName: 'Bruce Wayne',
  address: {
    city: 'Gotham'
  }
};

const name     = hero.name;
const realName = hero.realName;

name;     // => 'Batman',
realName; // => 'Bruce Wayne'
```

The last 2 lines of code access the property `hero.name` into the variable `name`. The same happens with the `realName` variable.  

You can notice the inneficient syntax of such way to access the property and creation of the variable. Writing `var name = hero.name` forces you to indicate the `name` property 2 times.  

That's were the object destructuring syntax is useful. It allows you to create the variable and extract the property by writing the property name a single time.  

Let's refactor the above script and use the object destructuring to access the properties `name` and `realName`:

```javascript{9}
const hero = {
  name: 'Batman',
  realName: 'John Wayne',
  address: {
    city: 'Gotham'
  }
};

const { name, realName } = hero;

name;     // => 'Batman',
realName; // => 'Bruce Wayne'
```

`const { name, realName } = hero` is an object destructuring. This statement defines 2 variables `name` and `realName`, then initializes these variables with values from properties with the same name `name` and `realName` extracted from `hero` object.  

Comparing the 2 approaches to access the object properties:

```javascript
const name     = hero.name;
const realName = hero.realName;

// is equivalent to:

const { name, realName } = hero;
```

The object destructuring is concise because neither the property names, nor the object variable are duplicated.  

## 2. Extracting a property

The basic syntax of object destructuring is pretty simple:

```javascript
const { identifier } = expression;
```

Where `identifier` is the name of the property to access and `expression` should evaluate to an object. After the destructuring, the variable `identifier` contains the property value.  

Let's look at an example:

```javascript{9}
const hero = {
  name: 'Batman',
  realName: 'John Wayne',
  address: {
    city: 'Gotham'
  }
};

const { name } = hero;

name; // => 'Batman'
```

The statement `const { name } = hero` defines a variable `name` and initializes it with the value of `hero.name` property.  

Can you extract more than one property? Yes!

## 3. Extracting multiple properties

To extract more than one property, just enumerate all the properties separated with a comment `,`:

```javascript
const { identifier1, identifier2, ..., identifierN } = expression;
```

Where `identifier1`, ..., `identifierN` are names of properties to access and `expression` should evaluate to an object. After the destructuring, the variables `identifier1`, ..., `identifierN` contain corresponding properties values.  

Let's take a look again at the example from the first section, where 2 properties are extracted:

```javascript{9}
const hero = {
  name: 'Batman',
  realName: 'John Wayne',
  address: {
    city: 'Gotham'
  }
};

const { name, realName } = hero;

name;     // => 'Batman',
realName; // => 'Bruce Wayne'
```

Again, `const { name, realName } = hero` creates 2 variables `name` and `realName` having the values of corresponding properties `hero.name` and `hero.realName`. 

## 4. Default values

In case if the destructured object doesn't have the property specified in the destructuring assignment, then the variable is going to be assigned with `undefined` value.  

Here's an example:

```javascript{9}
const hero = {
  name: 'Batman',
  realName: 'John Wayne',
  address: {
    city: 'Gotham'
  }
};

const { enemies } = hero;

enemies;     // => undefined
```

Because the property `enemies` doesn't exist in the object `hero`, after the destructuring the variable `enemies` is `undefined`.  

Fortunately, you can set a default value inside a destructuring of an object. Here's the basic syntax:

```javascript
const { identifier = defaultValue } = expression;
```

Where `identifier` is the name of the property to access and `expression` should evaluate to an object. After the destructuring, the variable `identifier` contains the property value, or is assigned with `defaultValue` if `identifier` property doesn't exist.  

Let's change the previous code sample, and use the default value feature:

```javascript{9}
const hero = {
  name: 'Batman',
  realName: 'John Wayne',
  address: {
    city: 'Gotham'
  }
};

const { enemies = ['Joker'] } = hero;

enemies;     // => ['Joker']
```

Now, instead of being `undefined`, the variable `enemies` defaults to `['Joker']`.  

## 5. Aliases

If you'd like to create variables of different names that the property names, then you can use the aliasing feature of object destructuring.  



## 6. Extracting properties from nested objects

## 7. Extracting property with dynamic name

## 8. Common use cases

## 9. Summary