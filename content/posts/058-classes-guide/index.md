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

Note that instance and static fields are a part of [Class fields proposal](https://github.com/tc39/proposal-class-fields).  

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

To create static fields in a JavaScript class, use the special keyword `static` followed by the field name: `static myStaticField`.  

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

In this regards make the static fields private too. To make the static field private, prefix the field name with `#` special symbol: `static #myPrivateStaticField`.  

Let's say you'd like to limit the number of instances of the `User` class. In order not to reveal the details of instance limits, you can create the private static fields:

```javascript{2-3}
class User {
  static #MAX_INSTANCES = 2;
  static #instances = 0;
  
  name = 'Unknown';

  constructor(name) {
    User.#instances++;
    if (User.#instances > User.#MAX_INSTANCES) {
      throw new Error('Unable to create User instance');
    }
    this.name = name;
  }
}

new User('Jon Snow');
new User('Arya Stark');
new User('Sansa Stark'); // throws Error
```

The static field `User.#MAX_INSTANCES` determines the maximum number of instances to be created, while `User.#instances` static field counts the actual number of instances.  

These private static fields are accessible only within `User` class.  

## 4. Methods

The fields hold the instance's data. But the ability to modify or access instance data is performed by special functions that are a part of the class: methods.   

The JavaScript classes support both instance and static methods.  

### 4.1 Instance methods

Instance methods can access and modify instance data.  

For example, let's define a method `getName()` that returns the name in the `User` class:

```javascript{8-10}
class User {
  name = 'Unknown';

  constructor(name) {
    this.name = name;
  }

  getName() {
    return this.name;
  }
}

const user = new User('Jon Snow');
user.getName(); // => 'Jon Snow'
```

`getName() { ... }` is an method inside the `User` class.  

In a class method, as well as in the constructor, `this` value equals to the class instance. Use `this` to access instance data.  

`user.getName()` is a method invocation: it executes the method and returns the computed value, if any.  

Methods can have parameters. As well, inside methods you can call other methods of the same instance:

```javascript{12-14}
class User {
  name = 'Unknown';

  constructor(name) {
    this.name = name;
  }

  getName() {
    return this.name;
  }

  nameContains(str) {
    return this.getName().includes(str);
  }
}

const user = new User('Jon Snow');
user.nameContains('Jon');   // => true
user.nameContains('Stark'); // => false
```

`nameContains(str) { ... }` is a method of `User` class that accepts one parameter `str`. More than that, it executes another method of the instance `this.getName()` to get the user's name.  

### 4.2 Static methods

The static methods are function attached directly to the class. To create a static method, use the special keyword `static` followed by a regular method syntax: `static myStaticMethod() { ... }`.

When working with static methods, there are 2 simple rules to remember:

1. A static method *can access* static fields
2. A static method *cannot access* instance fields.

For example, let's create a static method that detects whether a user with a specific name was already taken.  

```javascript{4-6}
class User {
  static #takenNames = [];

  static isNameTaken(name) {
    return User.#takenNames.includes(name);
  }

  name = 'Unknown';

  constructor(name) {
    this.name = name;
    User.#takenNames.push(name);
  }
}

const user = new User('Jon Snow');

User.isNameTaken('Jon Snow');   // => true
User.isNameTaken('Arya Stark'); // => false
```

`isNameTaken()` is a static method that uses the static private field `User.#takenNames` to check for taken names.  

## 5. Inheritance: *extends*

The classes in JavaScript support single inheritance using the `extends` keyword.  

In the expression `class Child extends Parent { }` the `Child` class inherits from `Parent` the constructor, fields and methods.  

For example, let's create a new child class `Blogger` that extends the parent class `User`.  

```javascript{13}
class User {
  name;

  constructor(name) {
    this.name = name;
  }

  getName() {
    return this.name;
  }
}

class ContentWriter extends User {
  posts = [];
}

const writer = new ContentWriter('John Smith');

writer.name;      // => 'John Smith'
writer.getName(); // => 'John Smith'
writer.posts;     // => []
```

`ContentWriter` inherits from the `User` the constructor, the method `getName()` and the field `name`. As well, the `ContentWriter` class declares a new field `posts`.  

### 5.1 Parent constructor: *super()* in *constructor()*

If you'd like to customize the constructor, and still be able to use the parent constructor, then you need to use `super()` special method available in the child constructor.  

For example, let's update `ContentWriter` constructor to initialize the posts array:

```javascript{17}
class User {
  name;

  constructor(name) {
    this.name = name;
  }

  getName() {
    return this.name;
  }
}

class ContentWriter extends User {
  posts = [];

  constructor(name, posts) {
    super(name);
    this.posts = posts;
  }
}

const writer = new ContentWriter('John Smith', ['Why I like JS']);
writer.name; // => 'John Smith'
writer.posts // => ['Why I like JS']
```

`super(name)` inside the child class `ContentWriter` executes the constructor of the parent class `User`.  

Note that inside the child constructor you must execute `super()` before using `this` keyword. Calling `super()` makes sure that the instance is initialized and ready.  

```javascript{4-5}
class Child extends Parent {
  constructor(value1, value2) {
    // Does not work!
    this.prop2 = value2;
    super(value1);
  }
}
```

### 5.2 Parent instance: *super* in methods

If you'd like to access the parent method inside of a child method, you can use the special shortcut `super`.  

```javascript{22}
class User {
  name;

  constructor(name) {
    this.name = name;
  }

  getName() {
    return this.name;
  }
}

class ContentWriter extends User {
  posts = [];

  constructor(name, posts) {
    super(name);
    this.posts = posts;
  }

  getName() {
    const name = super.getName();
    if (name === '') {
      return 'Unknwon';
    }
    return name;
  }
}

const writer = new ContentWriter('', ['Why I like JS']);
writer.getName(); // => 'Unknwon'
```

`getName()` of the child class `ContentWriter` accesses the method `super.getName()` directly from the parent class `User`.  

This feature is called [method overriding](https://en.wikipedia.org/wiki/Method_overriding).  

Note that you can use `super` with static methods too, to access the parent's static methods.  

## 6. Object type checking: *instanceof*

`object instanceof Class` is the operator that determines if `object` is an instance of `Class`.  

Let's see `instanceof` operator in action:

```javascript
class User {
  name;

  constructor(name) {
    this.name = name;
  }

  getName() {
    return this.name;
  }
}

const user = new User('Jon Snow');

user instanceof User; // => true
{}   instanceof User; // => false
```

`user` is an instance of `User` class, `user instanceof User`  evaluates to `true`.  

The empty object `{}` is not an instance of `User`, correspondigly  `{} instanceof User` is `false`.  

`instanceof` is polyphorphic, meaning that it will detect a child class instance as an instance of a parent class.  

```javascript
class User {
  name;

  constructor(name) {
    this.name = name;
  }

  getName() {
    return this.name;
  }
}

class ContentWriter extends User {
  posts = [];

  constructor(name, posts) {
    super(name);
    this.posts = posts;
  }
}

const writer = new ContentWriter('John Smith', ['Why I like JS']);

writer instanceof ContentWriter; // => true
writer instanceof User;          // => true
```

`writer` is an instance of the child class `ContentWriter`. The operator `writer instanceof ContentWriter` evaluates to `true`.  

At the same time `ContentWriter` is a child class of `User`. So `writer instanceof User` evaluates to `true` as well.  

What if you'd like to determine the exact class of the instance? You can use the `constructor` property and compare directly with the class:

```javascript
writer.constructor === ContentWriter; // => true
writer.constructor === User;          // => false
```

## 7. Classes and prototypes

I must say that the class syntax in JavaScript does a great job to abstract from the prototypal inheritance. To describe the main features of the classes I didn't even have to use the word prototype.  

But the classes are built on top of the prototypal inheritance. Every class is a function, and when invoked as a constructor, creates an instance.  

The following two code snippets are equivalent.  

The class version:

```javascript
class User {
  constructor(name) {
    this.name = name;
  }

  getName() {
    return this.name;
  }
}

const user = new User('John');

user.getName();       // => 'John Snow'
user instanceof User; // => true
```

The version that use prototype syntax directly:

```javascript
function User(name) {
  this.name = name;
}

User.prototype.getName = function() {
  return this.name;
}

const user = new User('John');

user.getName();       // => 'John Snow'
user instanceof User; // => true
```

The class syntax is way easier to work if you're familiar with classic inheritance mechanism of Java or Swift languages.  

Anyways, even if you use classes syntax in JavaScript, I recommend you to have a good grasp of protypal inheritance.  

## 8. Conclusion

JavaScript classes allow you do intialize instances with constructors, define fields and methods. 

The fields and methods can be defined on the class instance, or even on the class itself using `static` keyword.  

Inheritance is achieved using `extends` keyword: you can easily create a child class from a parent. `super` keyword used in the child let's you communicate with the parent class.  

If you want to take advantage of encapsulation, you can make private the fields and methods to hide the internal implementation details of your classes. In such case you must prefix you field or method name with a special character `#`.  

The following features are still a part of [Class field proposal](https://github.com/tc39/proposal-class-fields):

* The declaration of instance fields inside the class body
* The declaration of static fields inside the class body
* The private fields and methods

*What do you think about using `#` to prefix private properties?*
