---
title: 7 Tips to Handle undefined in JavaScript
description: A detailed article about 'undefined' keyword in JavaScript. 7 tips on how to handle correctly 'undefined' and increase code durability.
published: "2017-04-15"
modified: "2020-08-02T08:50Z"
thumbnail: "./images/blade-runner-rachel.png"
slug: 7-tips-to-handle-undefined-in-javascript
tags: ["javascript", "undefined"]
recommended: ["when-not-to-use-arrow-functions-in-javascript", "object-rest-spread-properties-javascript"]
type: post
---

Most of the modern languages like Ruby, Python, or Java have a single null value (`nil` or `null`), which seems a reasonable approach.  

But JavaScript is different.  

`null`, but also `undefined`, represent in JavaScript empty values. So what's the exact difference between them? 

The short answer is that JavaScript interpreter returns `undefined` when accessing a variable or object property that is not yet initialized. For example:

```javascript
let company;
company;    // => undefined
let person = { name: 'John Smith' };
person.age; // => undefined
```

On the other side, `null` represents a missing object reference. JavaScript doesn't initialize variables or object properties with `null`.  

*Before I continue, allow me to make a recommendation.* 

*If you want to significantly improve your JavaScript knowledge, I recommend the amazingly useful ["Modern JavaScript From The Beginning 2.0"](https://www.traversymedia.com/a/2147528886/FqXWyazh) by Brad Traversy. Use the coupon code "DMITRI" and get up to 20% discount!*

Some native methods like `String.prototype.match()` can return `null` to denote a missing object. Take a look at the sample:

```javascript
let array = null;  
array;                // => null
let movie = { name: 'Starship Troopers',  musicBy: null };
movie.musicBy;        // => null
'abc'.match(/[0-9]/); // => null
```

Because JavaScript is permissive, developers have the temptation to access uninitialized values. I'm guilty of such bad practice too.  

Often such risky actions generate `undefined` related errors:

* `TypeError: 'undefined' is not a function` 
* `TypeError: Cannot read property '<prop-name>' of undefined`
* and alike *type errors*.

JavaScript developer can understand the irony of this joke:  

```javascript
function undefined() {
  // problem solved
}
```

To reduce such errors, you have to understand the cases when `undefined` is generated. Let's explore `undefined` and its effect on code safety.  

```toc
```

## 1. What is undefined

JavaScript has 6 primitive types: 

* Boolean: `true` or `false`
* Number: `1`, `6.7`, `0xFF`
* String: `"Gorilla and banana"` 
* Symbol: `Symbol("name")` (starting ES2015)
* Null: `null`
* Undefined: `undefined`.

And a separated object type: `{name: "Dmitri"}`, `["apple", "orange"]`.

From 6 primitive types `undefined` is a special value with its own type Undefined. According to [ECMAScript specification](https://www.ecma-international.org/ecma-262/7.0/#sec-undefined-value):

> **Undefined value** primitive value is used when a variable has not been assigned a value. 

The standard clearly defines that you will receive `undefined` when accessing uninitialized variables, non-existing object properties, non-existing array elements, and alike. 

A few examples:

```javascript
let number;
number;     // => undefined

let movie = { name: 'Interstellar' };
movie.year; // => undefined

let movies = ['Interstellar', 'Alexander'];
movies[3];  // => undefined
```
The above example demonstrates that accessing:  

* an *uninitialized* variable `number`
* a *non-existing* object property `movie.year` 
* or a *non-existing* array element `movies[3]` 

are evaluated to `undefined`.  

The ECMAScript specification defines the type of `undefined` value:
> **Undefined type** is a type whose sole value is the `undefined` value.

In this sense, `typeof` operator returns `'undefined'` string for an `undefined` value:

```javascript
typeof undefined === 'undefined'; // => true
```
Of course `typeof` works nicely to verify whether a variable contains an `undefined` value:

```javascript
let nothing;
typeof nothing === 'undefined';   // => true
```

## 2. Scenarios that create undefined

### 2.1 Uninitialized variable

> A declared variable but not yet assigned with a value (*uninitialized*) is by default `undefined`.

Plain and simple:

```javascript
let myVariable;
myVariable; // => undefined
```

`myVariable` is declared and not yet assigned with a value. Accessing the variable evaluates to `undefined`.  

An efficient approach to solve the troubles of uninitialized variables is whenever possible *assign an initial value*. The less the variable exists in an uninitialized state,  the better.  

Ideally, you would assign a value right away after declaration `const myVariable = 'Initial value'`. But that's not always possible.  

**Tip 1: Favor `const`, otherwise use `let`, but say goodbye to `var`**

In my opinion, one of the best features of ECMAScript 2015 is the new way to declare variables using `const` and `let`. It is a big step forward. 

`const` and `let` are *block scoped* (contrary to older function scoped `var`) and exist in a [temporal dead zone](/variables-lifecycle-and-why-let-is-not-hoisted/#5-let-variables-lifecycle) until the declaration line.  

I recommend `const` variable when its value is not going to change. It creates an [immutable binding](https://mathiasbynens.be/notes/es6-const).  

One of the nice features of `const` is that *you must assign an initial value* to the variable `const myVariable = 'initial'`. The variable is not exposed to the uninitialized state and accessing `undefined` is impossible.  

Let's check the function that verifies whether a word is a palindrome:

```javascript{1-2}
function isPalindrome(word) {
  const length = word.length;
  const half = Math.floor(length / 2);
  for (let index = 0; index < half; index++) {
    if (word[index] !== word[length - index - 1]) {
      return false;
    }
  }
  return true;
}
isPalindrome('madam'); // => true
isPalindrome('hello'); // => false
```

`length` and `half` variables are assigned with a value once. It seems reasonable to declare them as `const` since these variables aren't going to change. 

Use `let` declaration for variables whose value can change. Whenever possible assign an initial value right away, e.g. `let index = 0`.

What about the old school `var`? My suggestion is [to stop using it](https://medium.com/javascript-scene/javascript-es6-var-let-or-const-ba58b8dcde75#.hvdxtd30t).  

![Do not write var, write const and let in JavaScript](./images/no-var.png)

`var` declaration problem is [the variable hoisting](/javascript-hoisting-in-details/#hoisting-and-var) within the function scope. You can declare a `var` variable somewhere at the end of the function scope, but still, you can access it before declaration: and you'll get an `undefined`.  

```javascript
function bigFunction() {
  // code...
  myVariable; // => undefined
  // code...
  var myVariable = 'Initial value';
  // code...
  myVariable; // => 'Initial value'
}
bigFunction();
```
`myVariable` is accessible and contains `undefined` even before the declaration line: `var myVariable = 'Initial value'`.

Contrary, a `const` or `let` variable cannot be accessed before the declaration line &mdash; the variable is in a [temporal dead zone](/variables-lifecycle-and-why-let-is-not-hoisted/#5-let-variables-lifecycle) before the declaration. And that's nice because you have less chance to access an `undefined`.

The above example updated with `let` (instead of `var`) throws a `ReferenceError` because the variable in the temporal dead zone is not accessible. 

```javascript
function bigFunction() {
  // code...
  myVariable; // => Throws 'ReferenceError: myVariable is not defined'
  // code...
  let myVariable = 'Initial value';
  // code...
  myVariable; // => 'Initial value'
}
bigFunction();
```

Encouraging the usage of `const` for immutable bindings or `let` otherwise ensures a practice that reduces the appearance of the uninitialized variable.  

**Tip 2: Increase cohesion**

[Cohesion](https://en.wikipedia.org/wiki/Cohesion_(computer_science)) characterizes the degree to which the elements of a module (namespace, class, method, block of code) belong together. The cohesion can be *high* or *low*.  

A high cohesion module is preferable because the elements of such a module focus solely on a single task. It makes the module:

* *Focused* and *understandable*: easier to understand what the module does
* *Maintainable* and *easier to refactor*: the change in the module affects fewer modules
* *Reusable*: being focused on a single task, it makes the module easier to reuse
* *Testable*: you would easier test a module that's focused on a single task

![Components coupling and cohesion](./images/coupling-vs-cohesion.png)

High cohesion accompanied by [loose coupling](https://en.wikipedia.org/wiki/Loose_coupling) is the characteristic of a well-designed system.   

A code block can be considered a small module. To profit from the benefits of high cohesion, keep the variables as close as possible to the code block that uses them.  

For instance, if a variable solely exists to form the logic of block scope, then declare and make the variable alive only within that block (using `const` or `let` declarations). Do not expose this variable to the outer block scope, since the outer block shouldn't care about this variable.

One classic example of the unnecessarily extended life of variables is the usage of `for` cycle inside a function:

```javascript{1}
function someFunc(array) {
  var index, item, length = array.length;
  // some code...
  // some code...
  for (index = 0; index < length; index++) {
    item = array[index];
    // some code...
  }
  return 'some result';
}
```
`index`, `item` and `length` variables are declared at the beginning of the function body. However, they are used only near the end. What's the problem with this approach?

Between the declaration at the top and the usage in `for` statement the variables `index`, `item` are uninitialized and exposed to `undefined`. They have an unreasonably long lifecycle in the entire function scope.  

A better approach is to move these variables as close as possible to their usage place:

```javascript{3-5}
function someFunc(array) {
  // some code...
  // some code...
  const length = array.length;
  for (let index = 0; index < length; index++) {
    const item = array[index];
    // some 
  }
  return 'some result';
}
```
`index` and `item` variables exist only in the block scope of `for` statement. They don't have any meaning outside of `for`.  
`length` variable is declared close to the source of its usage too.

Why is the modified version better than the initial one? Let's see:

* The variables are not exposed to uninitialized state, thus you have no risk of accessing `undefined`
* Moving the variables as close as possible to their usage place increases the code readability
* High cohesive chunks of code are easier to refactor and extract into separate functions, if necessary

### 2.2 Accessing a non-existing property

> When accessing a **non-existing object property**, JavaScript returns `undefined`. 

Let's demonstrate that in an example:

```javascript
let favoriteMovie = {
  title: 'Blade Runner'
};
favoriteMovie.actors; // => undefined
```

`favoriteMovie` is an object with a single property `title`. Accessing a non-existing property `actors` using a property accessor `favoriteMovie.actors` evaluates to `undefined`.

Accessing a non-existing property does not throw an error. The problem appears when trying to get data from the non-existing property, which is the most common `undefined`  trap, reflected in the well-known error message `TypeError: Cannot read property <prop> of undefined`.  

Let's slightly modify the previous code snippet to illustrate a `TypeError` throw:

```javascript 
let favoriteMovie = {
  title: 'Blade Runner'
};
favoriteMovie.actors[0];
// TypeError: Cannot read property '0' of undefined
```
`favoriteMovie` does not have the property `actors`, so `favoriteMovie.actors` evaluates to `undefined`.  

As a result, accessing the first item of an `undefined` value using the expression `favoriteMovie.actors[0]` throws a `TypeError`.  

The permissive nature of JavaScript that allows accessing non-existing properties is a source of nondeterminism: the property may be set or not. The good way to bypass this problem is to restrict the object to have always defined the properties that it holds.  

Unfortunately, often you don't have control over the objects. Such objects may have a different set of properties in diverse scenarios. So you have to handle all these scenarios manually.  

Let's implement a function `append(array, toAppend)` that adds at the beginning and/or at the end of an array of new elements. `toAppend` parameter accepts an object with properties:

* `first`: element inserted at the beginning of `array`
* `last`: element inserted at the end of `array`.

The function returns a new array instance, without altering the original array.  

The first version of `append()`, a bit naive, may look like this:

```javascript
function append(array, toAppend) {
  const arrayCopy = [...array];
  if (toAppend.first) {
    arrayCopy.unshift(toAppend.first);
  }
  if (toAppend.last) {
    arrayCopy.push(toAppend.last);
  }
  return arrayCopy;
}
append([2, 3, 4], { first: 1, last: 5 }); // => [1, 2, 3, 4, 5]
append(['Hello'], { last: 'World' });     // => ['Hello', 'World']
append([8, 16], { first: 4 });            // => [4, 8, 16]
```
Because `toAppend` object can omit `first` or `last` properties, it is obligatory to verify whether these properties exist in `toAppend`.

A property accessor evaluates to `undefined` if the property does not exist. The first temptation to check whether `first` or `last` properties are present is to verify them against `undefined`. This is performed in conditionals `if(toAppend.first){}` and `if(toAppend.last){}`...  

*Not so fast.* This approach has a drawback. `undefined`, as well as `false`, `null`, `0`, `NaN` and `''` are [falsy](https://developer.mozilla.org/en-US/docs/Glossary/Falsy) values. 

In the current implementation of `append()`, the function doesn't allow to insert falsy elements:  

```javascript
append([10], { first: 0, last: false }); // => [10]
```

`0` and `false` are falsy. Because `if(toAppend.first){}` and `if(toAppend.last){}` actually  compare against falsy, these elements are not inserted into the array. The function returns the initial array `[10]` without modifications, instead of the expected `[0, 10, false]`.  

The tips that follow explain how to correctly check the property's existence.

**Tip 3: Check the property existence**

Fortunately, JavaScript offers a bunch of [ways](/check-if-object-has-property-javascript) to determine if the object has a specific property:  

* `obj.prop !== undefined`: compare against `undefined` directly
* `typeof obj.prop !== 'undefined'`: verify the property value type
* `obj.hasOwnProperty('prop')`: verify whether the object has an own property
* `'prop' in obj`: verify whether the object has an own or inherited property

My recommendation is to use `in` operator. It has a short and sweet syntax. `in` operator presence suggests a clear intent of checking whether an object has a specific property, *without* accessing the actual property value.  

![Do not write var, write const and let in JavaScript](./images/favor-explicit.png)

`obj.hasOwnProperty('prop')` is a nice solution too. It's slightly longer than `in` operator and verifies only in the object's own properties.   

Let's improve `append(array, toAppend)` function using `in` operator:

```javascript
function append(array, toAppend) {
  const arrayCopy = array.slice();
  if ('first' in toAppend) {
    arrayCopy.unshift(toAppend.first);
  }
  if ('last' in toAppend) {
    arrayCopy.push(toAppend.last);
  }
  return arrayCopy;
}
append([2, 3, 4], { first: 1, last: 5 }); // => [1, 2, 3, 4, 5]
append([10], { first: 0, last: false });  // => [0, 10, false]
```
`'first' in toAppend` (and `'last' in toAppend`) is `true` whether the corresponding property exists, `false` otherwise.  

`in` operator fixes the problem with inserting falsy elements `0` and `false`. Now, adding these elements at the beginning and the end of `[10]` produces the expected result `[0, 10, false]`.  

**Tip 4: Destructuring to access object properties**

When accessing an object property, sometimes it's necessary to set a default value if the property does not exist.  

You might use `in` accompanied with ternary operator to accomplish that:

```javascript
const object = { };
const prop = 'prop' in object ? object.prop : 'default';
prop; // => 'default'
```

Ternary operator syntax becomes daunting when the number of properties to check increases. For each property, you have to create a new line of code to handle the defaults, increasing an ugly wall of similar-looking ternary operators.  

To use a more elegant approach, let's get familiar with a great ES2015 feature called *object destructuring*.  

[Object destructuring](/javascript-object-destructuring) allows inline extraction of object property values directly into variables and setting a default value if the property does not exist. A convenient syntax to avoid dealing directly with `undefined`.

Indeed, the property extraction is now precise:

```javascript
const object = {  };
const { prop = 'default' } = object;
prop; // => 'default'
```

To see things in action, let's define a useful function that wraps a string in quotes.  

`quote(subject, config)` accepts the first argument as the string to be wrapped. The second argument `config` is an object with the properties:

* `char`: the quote char, e.g. `'` (single quote) or `"` (double quote). Defaults to `"`.
* `skipIfQuoted`: the boolean value to skip quoting if the string is already quoted. Defaults to `true`.

Applying the benefits of the object destructuring, let's implement `quote()`:

```javascript
function quote(str, config) {
  const { char = '"', skipIfQuoted = true } = config;
  const length = str.length;
  if (skipIfQuoted
      && str[0] === char
      && str[length - 1] === char) {
    return str;
  }
  return char + str + char;
}
quote('Hello World', { char: '*' });        // => '*Hello World*'
quote('"Welcome"', { skipIfQuoted: true }); // => '"Welcome"'
```

`const { char = '"', skipIfQuoted = true } = config` destructuring assignment in one line extracts the properties `char` and `skipIfQuoted` from `config` object.  
If some properties are missing in the `config` object, the destructuring assignment sets the default values: `'"'` for `char` and `false` for `skipIfQuoted`.  

Fortunately, the function still has room for improvement.  

Let's move the destructuring assignment into the parameters section. And set a default value (an empty object `{ }`) for the `config` parameter, to skip the second argument when default settings are enough.  

```javascript
function quote(str, { char = '"', skipIfQuoted = true } = {}) {
  const length = str.length;
  if (skipIfQuoted
      && str[0] === char
      && str[length - 1] === char) {
    return str;
  }
  return char + str + char;
}
quote('Hello World', { char: '*' }); // => '*Hello World*'
quote('Sunny day');                  // => '"Sunny day"'
```

The destructuring assignment replaces the `config` parameter in the function's signature. I like that: `quote()` becomes one line shorter.  

`= {}` on the right side of the destructuring assignment ensures that an empty object is used if the second argument is not specified at all `quote('Sunny day')`.  

Object destructuring is a powerful feature that handles efficiently the extraction of properties from objects. I like the possibility to specify a default value to be returned when the accessed property doesn't exist. As a result, you avoid `undefined` and the hassle around it.  

**Tip 5: Fill the object with default properties**

If there is no need to create variables for every property, as the destructuring assignment does, the object that misses some properties can be filled with default values.  

The ES2015 `Object.assign(target, source1, source2, ...)` copies the values of all enumerable own properties from one or more source objects into the target object. The function returns the target object.  

For instance, you need to access the properties of `unsafeOptions` object that doesn't always contain its full set of properties.  

To avoid `undefined` when accessing a non-existing property from `unsafeOptions`, let's make some adjustments:  

*  Define an object `defaults` that holds the default property values
*  Call `Object.assign({ }, defaults, unsafeOptions)` to build a new object `options`. The new object receives all properties from `unsafeOptions`, but the missing ones are taken from `defaults`.  

```javascript
const unsafeOptions = {
  fontSize: 18
};
const defaults = {
  fontSize: 16,
  color: 'black'
};
const options = Object.assign({}, defaults, unsafeOptions);
options.fontSize; // => 18
options.color;    // => 'black'
```
`unsafeOptions` contains only `fontSize` property. `defaults` object defines the default values for properties `fontSize` and `color`.  

`Object.assign()` takes the first argument as a target object `{}`. The target object receives the value of `fontSize` property from `unsafeOptions` source object. And the value of `color` property from `defaults` source object, because `unsafeOptions` doesn't contain `color`.   

The order in which the source objects are enumerated does matter: later source object properties overwrite earlier ones.  

You are now safe to access any property of `options` object, including `options.color` that wasn't available in `unsafeOptions` initially.  

Fortunately, an easier alternative to fill the object with default properties exists. I recommend to use the [spread properties in object initializers](/object-rest-spread-properties-javascript/#2-object-spread-properties).  

Instead of `Object.assign()` invocation, use the object spread syntax to copy into target object all own and enumerable properties from source objects:

```javascript
const unsafeOptions = {
  fontSize: 18
};
const defaults = {
  fontSize: 16,
  color: 'black'
};
const options = {
  ...defaults,
  ...unsafeOptions
};
options.fontSize; // => 18
options.color;    // => 'black'
```
The object initializer spreads properties from `defaults` and `unsafeOptions` source objects. The order in which the source objects are specified is important: later source object properties overwrite earlier ones.  

Filling an incomplete object with default property values is an efficient strategy to make your code safe and durable. No matter the situation, the object always contains the full set of properties: and `undefined` cannot be generated.  

**Bonus tip: nullish coalescing**

The operator [nullish coalescing](/javascript-optional-chaining/#3-default-with-nullish-coalescing) evaluates to a default value when its operand is `undefined` or `null`:  

```javascript
const value = nullOrUndefinedValue ?? defaultValue;
```

Nullish coalescing operator is convenient to access an object property while having a default value when this property is `undefined` or `null`:  

```javascript
const styles = {
  fontSize: 18
};

styles.color ?? 'black'; // => 'black'
styles.fontSize ?? 16;   // => 18
```

`styles` object doesn't have the property `color`, thus `styles.color` property accessor is `undefined`. 
`styles.color ?? 'black'` evaluates to the default value `'black'`.  

`styles.fontSize` is `18`, so the nullish coalescing operator evaluates to the property value `18`.  

### 2.3 Function parameters

> The function parameters implicitly default to `undefined`.

Usually a function defined with a specific number of parameters should be invoked with the same number of arguments. That's when the parameters get the values you expect:

```javascript
function multiply(a, b) {
  a; // => 5
  b; // => 3
  return a * b;
}
multiply(5, 3); // => 15
```
When `multiply(5, 3)`, the parameters `a` and `b` receive `5` and respectively `3` values. The multiplication is calculated as expected: `5 * 3 = 15`.

What does happen when you omit an argument on invocation? The corresponding parameter inside the function becomes `undefined`.  

Let's slightly modify the previous example by calling the function with just one argument:

```javascript
function multiply(a, b) {
  a; // => 5
  b; // => undefined
  return a * b;
}
multiply(5); // => NaN
```

The invocation `multiply(5)` is performed with a single argument: as result `a` parameter is `5`, but the `b` parameter is `undefined`.  

**Tip 6: Use default parameter value**

Sometimes a function does not require the full set of arguments on invocation. You can set defaults for parameters that don't have a value.   

Recalling the previous example, let's make an improvement. If `b` parameter is `undefined`, let default it to `2`:

```javascript{1-3}
function multiply(a, b) {
  if (b === undefined) {
    b = 2;
  }
  a; // => 5
  b; // => 2
  return a * b;
}
multiply(5); // => 10
```
The function is invoked with a single argument `multiply(5)`. Initially, `a` parameter is `2` and `b` is `undefined`.  
The conditional statement verifies whether `b` is `undefined`. If it happens, `b = 2` assignment sets a default value.  

While the provided way to assign default values works, I don't recommend comparing directly against `undefined`. It's verbose and looks like a hack.  

A better approach is to use the ES2015 [default parameters](/javascript-function-parameters/#2-default-parameters) feature. It's short, expressive and no direct comparisons with `undefined`.  

Adding a default value to parameter `b = 2` looks better:

```javascript
function multiply(a, b = 2) {
  a; // => 5
  b; // => 2
  return a * b;
}
multiply(5);            // => 10
multiply(5, undefined); // => 10
```
`b = 2` in the function signature makes sure that if `b` is `undefined`, the parameter defaults to `2`.  

ES2015 default parameters feature is intuitive and expressive. Always use it to set default values for optional parameters.  

### 2.4 Function return value

> Implicitly, without `return` statement, a JavaScript function returns `undefined`.

A function that doesn't have `return` statement implicitly returns `undefined`:  

```javascript
function square(x) {
  const res = x * x;
}
square(2); // => undefined
```
`square()` function does not return any computation results. The function invocation result is `undefined`.  

The same situation happens when `return` statement is present, but without an expression nearby:  

```javascript{2}
function square(x) {
  const res = x * x;
  return;
}
square(2); // => undefined
```
`return;` statement is executed, but it doesn't return any expression.  The invocation result is also `undefined`.  

Of course, indicating near `return` the expression to be returned works as expected:

```javascript
function square(x) {
  const res = x * x;
  return res;
}
square(2); // => 4
```
Now the function invocation is evaluated to `4`, which is `2` squared.  

**Tip 7: Don't trust the automatic semicolon insertion**

The following list of statements in JavaScript must end with semicolons (`;`):   

* empty statement
* `let`, `const`, `var`, `import`, `export` declarations
* expression statement
* `debugger` statement
* `continue` statement, `break` statement
* `throw` statement
* `return` statement

If you use one of the above statements, be sure to indicate a semicolon at the end:

```javascript
function getNum() {
  // Notice the semicolons at the end
  let num = 1; 
  return num;
}
getNum(); // => 1
```

At the end of both `let` declaration and `return` statement an obligatory semicolon is written.

What happens when you don't want to indicate these semicolons? In such a situation ECMAScript provides an [Automatic Semicolon Insertion](http://www.ecma-international.org/ecma-262/6.0/index.html#sec-automatic-semicolon-insertion) (ASI) mechanism, which inserts for you the missing semicolons.

Helped by ASI, you can remove the semicolons from the previous example: 

```javascript
function getNum() {
  // Notice that semicolons are missing
  let num = 1
  return num
}
getNum() // => 1
```
The above text is a valid JavaScript code. The missing semicolons are automatically inserted for you.  

At first sight, it looks pretty promising. ASI mechanism lets you skip the unnecessary semicolons. You can make the JavaScript code smaller and easier to read.  

There is one small, but annoying trap created by ASI. When a newline stands between `return` and the returned expression `return \n expression`, ASI automatically inserts a semicolon before the newline `return; \n expression`.  

What it does mean inside a function to have `return;` statement? The function returns `undefined`. If you don't know in detail the mechanism of ASI, the unexpectedly returned `undefined` is misleading.  

For instance, let's study the returned value of `getPrimeNumbers()` invocation:

```javascript
function getPrimeNumbers() {
  return 
    [ 2, 3, 5, 7, 11, 13, 17 ]
}
getPrimeNumbers() // => undefined
```
Between `return` statement and the array literal expression exists a new line. JavaScript automatically inserts a semicolon after `return`, interpreting the code as follows:  

```javascript
function getPrimeNumbers() {
  return; 
  [ 2, 3, 5, 7, 11, 13, 17 ];
}
getPrimeNumbers(); // => undefined
```
The statement `return;` makes the function `getPrimeNumbers()` to return `undefined` instead of the expected array.  

The problem is solved by removing the newline between `return` and array literal:  

```javascript
function getPrimeNumbers() {
  return [ 
    2, 3, 5, 7, 11, 13, 17 
  ];
}
getPrimeNumbers(); // => [2, 3, 5, 7, 11, 13, 17]
```

My recommendation is to study [how exactly](http://www.bradoncode.com/blog/2015/08/26/javascript-semi-colon-insertion/) Automatic Semicolon Insertion works to avoid such situations.   

Of course, never put a newline between `return` and the returned expression.  

### 2.5 void operator

`void <expression>` evaluates the expression and returns `undefined` no matter the result of the evaluation.  

```javascript
void 1;                    // => undefined
void (false);              // => undefined
void {name: 'John Smith'}; // => undefined
void Math.min(1, 3);       // => undefined
```

[One use case](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/void#JavaScript_URIs) of `void` operator is to suppress expression evaluation to `undefined`, relying on some side-effect of the evaluation.  

## 3. undefined in arrays

You get `undefined` when accessing an array element with an out of bounds index.

```javascript
const colors = ['blue', 'white', 'red'];
colors[5];  // => undefined
colors[-1]; // => undefined
```
`colors` array has 3 elements, thus valid indexes are `0`, `1`, and `2`.  

Because there are no array elements at indexes `5` and `-1`, the accessors `colors[5]` and  `colors[-1]` are `undefined`.  

In JavaScript, you might encounter so-called sparse arrays. Theses are arrays that have gaps, i.e. at some indexes, no elements are defined. 

When a gap (aka empty slot) is accessed inside a sparse array, you also get an `undefined`.  

The following example generates sparse arrays and tries to access their empty slots:

```javascript
const sparse1 = new Array(3);
sparse1;       // => [<empty slot>, <empty slot>, <empty slot>]
sparse1[0];    // => undefined
sparse1[1];    // => undefined
const sparse2 = ['white',  ,'blue']
sparse2;       // => ['white', <empty slot>, 'blue']
sparse2[1];    // => undefined
```
`sparse1` is created by invoking an `Array` constructor with a numeric first argument. It has 3 empty slots.  

`sparse2` is created with an array literal with the missing second element.  

In any of these sparse arrays accessing an empty slot evaluates to `undefined`.  

When working with arrays, to avoid `undefined`, be sure to use valid array indexes and prevent the creation of sparse arrays.  

## 4. Difference between undefined and null

What is the main difference between `undefined` and `null`? Both special values imply an empty state.  

> `undefined` represents the value of a variable that *hasn't been yet initialized*, while `null` represents an intentional *absence of an object*.  

Let's explore the difference in some examples.

The variable `number` is defined, however, is not assigned with an initial value:

```javascript
let number;
number; // => undefined
```
`number` variable is `undefined`, which indicates an *uninitialized* variable.  

The same uninitialized concept happens when a *non-existing object property* is accessed:

```javascript
const obj = { firstName: 'Dmitri' };
obj.lastName; // => undefined
```
Because `lastName` property does not exist in `obj`, JavaScript evaluates `obj.lastName` to `undefined`.  

On the other side, you know that a variable expects an object. But for some reason, you can't instantiate the object. In such case `null` is a meaningful indicator of a *missing object*.

For example, `clone()` is a function that clones a plain JavaScript object. The function is expected to return an object:

```javascript
function clone(obj) {
  if (typeof obj === 'object' && obj !== null) {
    return Object.assign({}, obj);
  }
  return null;
}
clone({name: 'John'}); // => {name: 'John'}
clone(15);             // => null
clone(null);           // => null
``` 
However `clone()` might be invoked with a non-object argument: `15` or `null`. In such a case, the function cannot create a clone, so it returns `null` &mdash; the indicator of a missing object.  

`typeof` operator makes the distinction between `undefined` and `null`:

```javascript
typeof undefined; // => 'undefined'
typeof null;      // => 'object'
```

Also the [strict quality operator](/the-legend-of-javascript-equality-operator/#the-identity-operator) `===` correctly differentiates `undefined` from `null`:

```javascript
let nothing = undefined;
let missingObject = null;
nothing === missingObject; // => false
```

## 5. Conclusion

`undefined` existence is a consequence of JavaScript's permissive nature that allows the usage of:

- uninitialized variables
- non-existing object properties or methods
- out of bounds indexes to access array elements
- the invocation result of a function that returns nothing

Comparing directly against `undefined` is unsafe because you rely on a permitted but discouraged practice mentioned above.  

An efficient strategy is to reduce at minimum the appearance of `undefined` keyword in your code by applying good habits such as:

* reduce the usage of uninitialized variables 
* make the variables lifecycle short and close to the source of their usage
* whenever possible assign initial values to variables
* favor `const`, otherwise use `let`
* use default values for insignificant function parameters
* verify the properties existence or fill the unsafe objects with default properties
* avoid the usage of sparse arrays


*Is it good that JavaScript has both `undefined` and `null` to represent empty values?*