---
title: 'The Complete Guide to JavaScript Classes'
description: 'Classes are blueplints to create objects. In JavaScript classes allow to define constructors, have methods, public and private fields.'
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

The prototypal inhertiance can emulate the classic class inhertance. ES2015 introduces the `class` syntax, which is a syntactic sugar over protypal inherithance.  

This post familiarizes you with ES2015 classes: how to define a class, initialize the instance, define fields and methods, understand the private and public fields, grasp the static fields and methods.  

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
const user = new User('Jon Snow');
user.name; // => 'Jon Snow'
```

A default constructor is created when you don't define a constructor for the class. The default constructor is an empty function, which doesn't modify the instance.  

At the same time, an ES2015 class can have up to one constructor.  

## 3. Fields

Fields are the variables that hold useful information. Fields can be defined at 2 levels:

1. Fields on the class instance
2. Fields on the class itself (aka static)

### 3.1 Public instance fields

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
const user = new User('Jon Snow');
user.name; // => 'Jon Snow'
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

const user = new User('Jon Snow');
user.name; // => 'Jon Snow'
```

Looking at the line 2 of the `User` body you'll see `name;` declaration of a public instance field `name`.  

The public fields declared such way give more readability to the class code: you just look at the declarations and you know what data the class manipulates.  

Moreover, the class fields declaration can be initialized right away at declaration.  

```javascript{2}
class User {
  name = 'Unkown';

  constructor() {
    // No initialization
  }
}

const user = new User();
user.name; // => 'Unkown'
```

`name = 'Unkown'` inside the class body declares a field `name` and initializes it with value `'Unkown'`.  

Even without initialization inside the constructor, `user.name` is `'Unkown Hero'`.  

There's no restriction on accessing and updating of the public fields.  

### 3.2 Private instance fields

Encapsulation is an important concept that let's you hide the internal details of a class. The user of your class should depend only on public interface that the class provides, and don't try to dig into the implementation details of your class.  

Classes organized with encapsulation in mind are easier to update when some implementation details change. A good way to hide internal data of an object are the private fields.  

Private fields in JavScript classes are introduced by [Class fields proposal](https://github.com/tc39/proposal-class-fields). 

To make a field private, you have to prefix it with a special symbol `#`. For example: `#myField`. The prefix `#` must be kept every time you work with the field: declare it, read it, or modify it.  

*The private fields are accessible only within the body of the class.*

Let's make sure that the field `#name` can be set once at the instance initialization:

```javascript{2}
class User {
  #name = 'Unknown';

  constructor(name) {
    this.#name = name;
  }

  getName() {
    return this.#name;
  }
}

const user = new User('Jon Snow');
user.getName(); // => 'Jon Snow'
user.#name;     // SyntaxError is thrown
```

`#name` is a private field. You can access and modify it within the body of the `User` class. The method `getName()` (more about methods in [next section](#4-methods)) can access the private field `#name`.  

However, if you try to access the private field `#name` outside of `User` class body, a syntax error is thrown: `SyntaxError: Private field '#name' must be declared in an enclosing class`.  

### 3.3 Public static fields

You can also defines fields on the class itself: these are the static fields. These are helpful to define constants that make sense within the class or store information specific to class.   

To create static fields in a JavaScript class, use the special keyword `static` followed by the field name.  

Let's add a new field named `type` that indicates the type of the user: admin or regular. The static fields `TYPE_ADMIN` and `TYPE_REGULAR` are handy constants to differentiate the user types:

```javascript{2-3}
class User {
  static TYPE_ADMIN = 'admin';
  static TYPE_REGULAR = 'regular';

  name = 'Unknown';
  type = User.TYPE_REGULAR;

  constructor(name, type) {
    this.name = name;
    this.type = type;
  }
}

const admin = new User('Site Admin', USER.TYPE_ADMIN);
admin.type === User.TYPE_ADMIN; // => true
```

`static TYPE_ADMIN` and `static TYPE_REGULAR` define the static variables inside `User` class. To access the static fields, you have to use the class followed by the field name: `User.TYPE_ADMIN` and `User.TYPE_REGULAR`.  

### 3.4 Private static fields

Sometimes even the static fields could be an implementation detail that you woudnl't like to share with the external world.  

In this regards make the static fields private too. To make the static field private, prefix the field name with `#` special symbol: `static #myStaticPrivateField`.  



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
