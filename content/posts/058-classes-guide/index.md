---
title: 'The Complete Guide to JavaScript Classes'
description: 'Classes define types of objects. Classes can be instantated to create objects of that class.'
published: '2019-12-10T13:00Z'
modified: '2019-12-10T13:00Z'
thumbnail: './images/classes-guide.png'
slug: javascript-classes-complete-guide
tags: ['javascript', 'class', 'instanceof']
recommended: ['gentle-explanation-of-this-in-javascript', 'the-legend-of-javascript-equality-operator']
type: post
commentsThreadId: javascript-classes-complete-guide
---

JavaScript uses prototypal inheritance: every object inherits properties and methods from its prototype object.  

```javascript
const obj = {};
const proto = Object.getPrototypeOf(obj);

obj.toString();                  // => '[object Object]'
obj.toString === proto.toString; // => true
```

`obj` inherits the properties and methods from its prototype `objProto`. The method `toString()` is inherited.  

The traditional class as *the blueprint to create objects*, used in languages like Java or Swift, does not exist in JavaScript. The prototypal inheritance deals only with objects.  

The prototypal inhertiance can emulate the classic inhertance based on classes. This is handy if you're more familiar with classic way of using classes to create objects. Starting ES2015 the `class` syntax, which is a syntactic sugar over protypal inherithance, is available.  

This post helps you get familiar with ES2015 classes: how to define a class, initialize the instance, manage properties and defined methods. More than that, you will read about upcoming class features like private properties.  

```toc

```

## 1. Definition: *class* keyword

The special keyword `class` defines a class in JavaScript:

```javascript
class User {
  // The body of class
}
```

The example above defines a class `User`. The curly braces `{ }` delimit the class body. Note that this syntax is named *class declaration*.  

You're not obligated to indicate the class name. You can use a *class expression* and assign the class to a variable:

```javascript
const UserClass = class {
  // The body of class
};
```

Often it makes sense to export a class as part of an ES2015 module. You can have a class as a *default export*:

```javascript
export default class User {
 // The body of class
}
```

Or class as a *named export*:

```javascript
export class User {
  // The body of class
}
```

Finally, you can instantiate the `User` class using the `new` operator:  

```javascript
const myUser = new User();
```

`new User()` creates an instance of the `User` class.  

## 2. Initialization: *constructor()*

`constructor(param1, param2, ...)` is a special method used in the body of a class to initialize the class instance.  

Let's initialize a property `name` using a constructor:

```javascript{2-4}
class User {
  constructor(name) {
    this.name = name;
  }
}
```

The `User` constructor has one parameter `name`. It uses this parameter to create a property `this.name` on the class instance (more about class fields in [the next section](#3-fields)).  

Inside the constructor `this` value equals to newly created instance.  

`User` class instantiation looks slighly different when it has a constructor. The arguments used to instantiate the class become the parameters of the constructor: 

```javascript
const admin = new User('Jon Snow');
admin.name; // => 'Jon Snow'
```

A default constructor is created when you don't define a constructor for the class. The default constructor is an empty function, which doesn't modify the instance.  

At the same time, an ES2015 class can have up to one constructor.  

## 3. Fields

Fields are the variables that hold useful information. Fields can be defined at 2 levels:

1. Fields on the class instance
2. Fields on the class itself (aka static)

### 3.1 Instance fields

#### 3.1.1 Public fields

The instance fields are initialized inside the constructor. Let's look again at the previous code snippet:

```javascript{3}
class User {
  constructor(name) {
    this.name = name;
  }
}
```

On instance initialization, the constructor creates a field `name` on the instance `this.name = name`.  

Later you can access `name` field using a property accessor:

```javascript{2}
const admin = new User('Jon Snow');
admin.name; // => 'Jon Snow'
```

`admin.name` is a property accessor that let's you access the value of the `name` field. 

`name` is a *public field* because you can access it outside of the `User` class body.  

A better approach to define instance fields provide [Class fields proposal](https://github.com/tc39/proposal-class-fields).  

Let's modify the `User` class and declare a public field `name`:

```javascript{2}
class User {
  name;
  
  constructor(name) {
    this.name;
  }
}

const admin = new User('Jon Snow');
admin.name; // => 'Jon Snow'
```

Looking at the line 2 of the `User` body you'll see `name;` declaration of a public instance field `name`.  

The public fields declared such way give more readability to the class code: you just look at the declarations and you know what data the class manipulates.  

Moreover, the class fields declaration can be initialized right away at declaration.  

```javascript{2}
class User {
  name = 'Unkown Hero';

  constructor() {
    // No initialization
  }
}

const user = new User();
user.name; // => 'Unkown Hero'
```

`name = 'user'` inside the class body declares a field `name` and initializes it with value `'Unkown Hero'`.  

Even without initialization inside the constructor, `user.name` is `'Unkown Hero'`.  

There's no restriction on accessing and updating of the public fields.  

#### 3.1.2 Private fields

Encapsulation is an important concept that let's you hide the internal details of a class. The user of your class should depend only on public interface that the class provides, and don't try to dig into the implementation details of your class.  

Classes organized with encapsulation in mind are easier to update when some implementation details change.  

A good way to hide internal data of an object are the private fields.  

### 3.2 Static fields

## 4. Methods

### 4.1 Instance methods

### 4.2 Static methods

## 5. Inheritance: *extends*

### 5.1 Parent constructor: *super()* in *constructor()*

### 5.2 Parent instance: *super* in methods

## 6. Object type checking: *instanceof*

## 7. Classes and prototypes

## 8. Conclusion

*What do you think about using `#` to prefix private properties?*
