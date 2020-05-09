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

```javascript{6-7}
const hero = {
  name: 'Batman',
  realName: 'Bruce Wayne'
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

```javascript{6}
const hero = {
  name: 'Batman',
  realName: 'John Wayne'
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

```javascript{6}
const hero = {
  name: 'Batman',
  realName: 'John Wayne'
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

```javascript{6}
const hero = {
  name: 'Batman',
  realName: 'John Wayne'
};

const { name, realName } = hero;

name;     // => 'Batman',
realName; // => 'Bruce Wayne'
```

Again, `const { name, realName } = hero` creates 2 variables `name` and `realName` having the values of corresponding properties `hero.name` and `hero.realName`. 

## 4. Default values

In case if the destructured object doesn't have the property specified in the destructuring assignment, then the variable is going to be assigned with `undefined` value.  

Here's an example:

```javascript{6}
const hero = {
  name: 'Batman',
  realName: 'John Wayne'
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

```javascript{6}
const hero = {
  name: 'Batman',
  realName: 'John Wayne'
};

const { enemies = ['Joker'] } = hero;

enemies;     // => ['Joker']
```

Now, instead of being `undefined`, the variable `enemies` defaults to `['Joker']`.  

## 5. Aliases

If you'd like to create variables of different names that the property names, then you can use the aliasing feature of object destructuring.  

```javascript
const { identifier: aliasIdentifier } = expression;
```

`identifier` is the name of the property to access, `aliasIdentifier` is the variable name, and `expression` should evaluate to an object. After the destructuring, the variable `aliasIdentifier` contains the property value.  

Here's an example:

```javascript{6}
const hero = {
  name: 'Batman',
  realName: 'John Wayne'
};

const { realName: secretName } = hero;

secretName; // => 'John Wayne'
```

`const { realName: secretName } = hero`: the destucturing defines a new variable `secretName` (alias variable), and assigns to `secretName` the value `hero.realName`.  

## 6. Extracting properties from nested objects

In all of the previous examples the object were plain: the properties contain primitive data types like strings.  

As it happens often in JavaScript, objects can be nested in other objects. In other words, some properties can contain objects.  

In such case, you still can use the object destructuring and access properties from deep. Here's the basic syntax:

```javascript
const { nestedObjectProp: { identifierNested } } = expression;
```

`nestedObjectProp` is the name of the property that holds a nested object. `identifierNested` is the property name to access from the nested object. `expression` should evaluate to the destructured object.  

After the destructuring, the variable `identifierNested` contains the property value of the nested object.  

Simpler, the above syntax is equivalent to:

```javascript
const identifierNested = expression.identifier.identifierNested;
```

For example, the object `hero` contains a nested object `{ city: 'Gotham'}`:

```javascript{10}
const hero = {
  name: 'Batman',
  realName: 'John Wayne',
  address: {
    city: 'Gotham'
  }
};

// Object destructuring:
const { address: { city } } = hero;

city; // => 'Gotham'
```

The object destructuring `const { address: { city } } = hero` let's you access the property `city` out of the nested object.  

## 7. Extracting property with dynamic name

You can extract to variables properties with the dynamic name (when you determine the property name at runtime):

```javascript
const { [propName]: identifier } = expression;
```

`propName` expression should evaluate to a property name, and the `identifier` should indicate the variable name created after the destructuring. The second `expression` should evaluate to the object you'd like to destructure.  

Here's an example:

```javascript{7}
const hero = {
  name: 'Batman',
  realName: 'John Wayne'
};

const property = 'name';
const { [property]: name } = hero;

name; // => 'Batman'
```

`const { [property]: name } = hero` is an object destructuring that dynamically, at runtime, determines what property to extract. 

## 8. Common use cases

### 8.1 Bind properties to variables

As seen in many examples before, the object destructuring binds property values to variables.  

Even if in the examples were used `const` statement, the object destructuring can assign values to variables declared using `let` and even `var`, or even no declaration statement at all.


For example here's how to destructure using `let` statement:

```javascript{6}
// let
const hero = {
  name: 'Batman',
};

let { name } = hero;

name; // => 'Batman'
```

How to destructure using `var` statement:
```javascript{6}
// var
const hero = {
  name: 'Batman',
};

var { name } = hero;

name; // => 'Batman'
```

And how to destructure to an already declared variable:
```javascript{8}
// existing variable
let name;

const hero = {
  name: 'Batman',
};

{ name } = hero;

name; // => 'Batman'
```

Stragely, I find it very satisfying when I combine `for..of` cycle with object destructuring to extract the property right away:

```javascript{6}
const heroes = [
  { name: 'Batman' },
  { name: 'Joker' }
];

for (const { name } of heroes) {
  console.log(name); // logs 'Batman', 'Joker'
}
```

### 8.2 Function parameter destructuring

Generally, the object destructuring can be placed anywhere where an assignment happens. That's why you could the object destructuring to destruct the function parameter right away:

```javascript{7}
const heroes = [
  { name: 'Batman' },
  { name: 'Joker' }
];

const names = heroes.map(
  function({ name }) {
    return name;
  }
);

names; // => ['Batman', 'Joker']
```

`function({ name })` destructures the function parameter inline and defines a variable `name` that holds the value of property `name`.  



## 9. Summary

The object destructuring is a powerful feature of JavaScript that let's you easily extract properties from object, and right away bind these values to variables.  

What I especially like about object destructuring is the concise syntax, and the ability to extract multiple variables in just one statement.  

