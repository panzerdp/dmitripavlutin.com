---
title: "How to Use Object Destructuring in JavaScript"
description: "The object destructuring is a JavaScript feature to extract properties from objects and bind them to variables."
published: "2020-05-10T13:40Z"
modified: "2020-05-26T07:50Z"
thumbnail: "./images/cover.png"
slug: javascript-object-destructuring
tags: ["javascript", "destructuring"]
recommended: ["5-interesting-uses-javascript-destructuring", "object-rest-spread-properties-javascript"]
type: post
---

The object destructuring is a useful JavaScript feature to extract properties from objects and bind them to variables.    

What's better, object destructuring can extract multiple properties in one statement, can access properties from nested objects, and can set a default value if the property doesn't exist.  

In this post, I'll explain how to use object destructuring in JavaScript.  

```toc
# Table of contents
toHeading: 2
```

## 1. The need for object destructuring

Imagine you'd like to extract some properties of an object. In a pre-ES2015 environment, you would need to write the following code:

```javascript{6-7}
var hero = {
  name: 'Batman',
  realName: 'Bruce Wayne'
};

var name     = hero.name;
var realName = hero.realName;

name;     // => 'Batman',
realName; // => 'Bruce Wayne'
```

The property `hero.name` value is assigned to the variable `name`. Same way `hero.realName` value is assigned to `realName`.  

Such a way to access properties and assign them to variables requires boilerplate code. By writing `var name = hero.name`, you have to mention the `name` binding 2 times, and the same for `realName`.  

That's where the object destructuring syntax is useful: you can read a property and assign its value to a variable without duplicating the property name.  More than that, you can read multiple properties from the same object in just one statement!  

Let's refactor the above script and apply the object destructuring to access the properties `name` and `realName`:

```javascript{6}
const hero = {
  name: 'Batman',
  realName: 'Bruce Wayne'
};

const { name, realName } = hero;

name;     // => 'Batman',
realName; // => 'Bruce Wayne'
```

`const { name, realName } = hero` is an object destructuring assignment. This statement defines the variables `name` and `realName`, then assigns to them the values of properties `hero.name` and `hero.realName` correspondigly. 

Comparing the 2 approaches to access the object properties:

```javascript
const name     = hero.name;
const realName = hero.realName;

// is equivalent to:

const { name, realName } = hero;
```

it's visible that the object destructuring is handier because neither the property names nor the object variable is duplicated.  

![JavaScript Object Destructuring Inforgraphic](./images/javascript-object-destructuring-infographic-2.png)

## 2. Extracting a property

The basic syntax of object destructuring is pretty simple:

```javascript
const { identifier } = expression;
```

Where `identifier` is the name of the property to access and `expression` should evaluate to an object. After the destructuring, the variable `identifier` contains the property value.  

Here's the equivalent code using a [property accessor](/access-object-properties-javascript/#1-dot-property-accessor):

```javascript
const identifier = expression.identifier;
```

Let's try the object destructuring in practice:

```javascript{6}
const hero = {
  name: 'Batman',
  realName: 'Bruce Wayne'
};

const { name } = hero;

name; // => 'Batman'
```

The statement `const { name } = hero` defines the variable `name` and initializes it with the value of `hero.name` property.  

## 3. Extracting multiple properties

To destructure the object into multiple properties, enumerate as many properties as you like adding commas `,` in-between:

```javascript
const { identifier1, identifier2, ..., identifierN } = expression;
```

Where `identifier1`, ..., `identifierN` are names of properties to access, and `expression` should evaluate to an object. After the destructuring, the variables `identifier1`, ..., `identifierN` contain corresponding properties values.  

Here's the equivalent code:

```javascript
const identifier1 = expression.identifier1;
const identifier2 = expression.identifier2;
// ...
const identifierN = expression.identifierN;
```

Let's take a look again at the example from the first section, where 2 properties are extracted:

```javascript{6}
const hero = {
  name: 'Batman',
  realName: 'Bruce Wayne'
};

const { name, realName } = hero;

name;     // => 'Batman',
realName; // => 'Bruce Wayne'
```

`const { name, realName } = hero` creates 2 variables `name` and `realName` assigned with values of corresponding properties `hero.name` and `hero.realName`.   

## 4. Default values

If the destructured object doesn't have the property specified in the destructuring assignment, then the variable is assigned with `undefined`. Let's see how it happens:

```javascript{6}
const hero = {
  name: 'Batman',
  realName: 'Bruce Wayne'
};

const { enemies } = hero;

enemies;     // => undefined
```

After destructuring the variable `enemies` is `undefined` because the property `enemies` doesn't exist in the object `hero`.  

Fortunately, you can set a default value if the property doesn't exist in the destructured object. Here's the basic syntax:

```javascript
const { identifier = defaultValue } = expression;
```

Where `identifier` is the name of the property to access and `expression` should evaluate to an object. After the destructuring, the variable `identifier` contains the property value or is assigned with `defaultValue` if `identifier` property doesn't exist.  

Here's the equivalent code:

```javascript
const identifier = expression.identifier === undefined ? 
        defaultValue : expression.identifier;
```

Let's change the previous code sample, and use the default value feature:

```javascript{6}
const hero = {
  name: 'Batman',
  realName: 'Bruce Wayne'
};

const { enemies = ['Joker'] } = hero;

enemies;     // => ['Joker']
```

Now, instead of being `undefined`, the variable `enemies` defaults to `['Joker']`.  

## 5. Aliases

If you'd like to create variables of different names than the properties, then you can use the aliasing feature of object destructuring.  

```javascript
const { identifier: aliasIdentifier } = expression;
```

`identifier` is the name of the property to access, `aliasIdentifier` is the variable name, and `expression` should evaluate to an object. After the destructuring, the variable `aliasIdentifier` contains the property value.  

The equivalent code:

```javascript
const aliasIdentifier = expression.identifier;
```

Here's an example of object destructuring alias feature:

```javascript{6}
const hero = {
  name: 'Batman',
  realName: 'Bruce Wayne'
};

const { realName: secretName } = hero;

secretName; // => 'Bruce Wayne'
```

Looking at `const { realName: secretName } = hero`, the destucturing defines a new variable `secretName` (alias variable), and assigns to it the value `hero.realName`.  

## 6. Extracting properties from nested objects

In the previous examples, the objects were plain: the properties have primitive data types (e.g. strings).  

Often objects can be nested in other objects. In other words, some properties can contain objects.  

In such case, you still can use the object destructuring and access properties from deep. Here's the basic syntax:

```javascript
const { nestedObjectProp: { identifier } } = expression;
```

`nestedObjectProp` is the name of the property that holds a nested object. `identifier` is the property name to access from the nested object. `expression` should evaluate to the destructured object.  

After the destructuring, the variable `identifier` contains the property value of the nested object.  

The above syntax is equivalent to:

```javascript
const identifier = expression.nestedObjectProp.identifier;
```

The level of nesting you can extract properties from is unlimited. If you want to extract properties from deep, just add more nested curly braces:

```javascript
const { propA: { propB: { propC: { .... } } } } = object;
```

For example, the object `hero` contains a nested object `{ city: 'Gotham'}`. 

```javascript{10}
const hero = {
  name: 'Batman',
  realName: 'Bruce Wayne',
  address: {
    city: 'Gotham'
  }
};

// Object destructuring:
const { address: { city } } = hero;

city; // => 'Gotham'
```

The object destructuring `const { address: { city } } = hero` let's you access the property `city` from the nested object.  

## 7. Extracting a dynamic name property

You can extract to variables properties with a dynamic name (the property name is known at runtime):

```javascript
const { [propName]: identifier } = expression;
```

`propName` expression should evaluate to a property name (usually a string), and the `identifier` should indicate the variable name created after the destructuring. The second `expression` should evaluate to the object you'd like to destructure.  

An equivalent code without object destructuring:

```javascript
const identifier = expression[propName];
```

Let's look at an example where `prop` holds the property name:

```javascript{7}
const hero = {
  name: 'Batman',
  realName: 'Bruce Wayne'
};

const prop = 'name';
const { [prop]: name } = hero;

name; // => 'Batman'
```

`const { [prop]: name } = hero` is an object destructuring that assigns to variable `name` the value `hero[prop]`, where `prop` is a variable holding the property name.  

## 8. Rest object after destructuring

The rest syntax is useful to collect the remaining properties after the destructuring:

```javascript
const { identifier, ...rest } = expression;
```

Where `identifier` is the name of the property to access and `expression` should evaluate to an object.  

After the destructuring, the variable `identifier` contains the property value. `rest` variable is a plain object with the remaining properties.  

For example, let's extract the property `name`, but keep the rest of the properties:

```javascript{6}
const hero = {
  name: 'Batman',
  realName: 'Bruce Wayne'
};

const { name, ...realHero } = hero;

realHero; // => { realName: 'Bruce Wayne' }
```

The destructuring `const { name, ...realHero } = hero` extracts the property `name`. 

At the same time, the remaining properties (`realName` in this case) are collected into the variable `realHero`: `{ realName: 'Bruce Wayne' }`.  

## 9. Common use cases

### 9.1 Bind properties to variables

As seen in many examples before, the object destructuring binds property values to variables.  

The object destructuring can assign values to variables declared using `const`, `let` and `var`. Or even assign to an already existing variable.  

For example, here's how to destructure using `let` statement:

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

({ name } = hero);

name; // => 'Batman'
```

I find it satisfying to combine `for..of` cycle with object destructuring to extract the property right away:

```javascript{6}
const heroes = [
  { name: 'Batman' },
  { name: 'Joker' }
];

for (const { name } of heroes) {
  console.log(name); // logs 'Batman', 'Joker'
}
```

### 9.2 Function parameter destructuring

Generally, the object destructuring can be placed anywhere where an assignment happens. 

For instance, you could destruct an object right inside the parameters list of a function:

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

`function({ name })` destructures the function parameter, creating a variable `name` holding the value of `name` property.  

## 10. Summary

The object destructuring is a powerful feature that lets you extract properties from an object and bind these values to variables.   

I especially like about object destructuring is the concise syntax and ability to extract multiple variables in one statement.  

Hopefully, my post has helped you see how useful object destructuring is!

