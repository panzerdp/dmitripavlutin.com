---
title: 7 tips to handle undefined in JavaScript
date: "2017-04-15"
---

When I started to learn JavaScript about eight years ago, a bizarre situation for me was the existence of both `undefined` and `null` that represent empty values. What is the clear difference between them? They both seem to define empty values, and moreover the comparison `null == undefined` evaluates to `true`.  

Most of the modern languages like Ruby, Python or Java have a single null value (`nil` or `null`), which seems a reasonable approach.  

In case of JavaScript, the interpreter returns `undefined` when accessing a variable or object property that is not yet initialized. For example:

<div class="try-it-container">
  <a target="_blank" href="https://repl.it/HK1B/0">Try in repl.it</a>
  <div class="clear"></div>
</div>

```javascript language-javascript
let company;
company;    // => undefined
let person = { name: 'John Smith' };
person.age; // => undefined
```

On the other side `null` represents a missing object reference. JavaScript by itself does not set variables or object properties to `null`.  
Some native methods like `String.prototype.match()` can return `null` to denote a missing object. Take a look at the sample:

<div class="try-it-container">
  <a target="_blank" href="https://repl.it/HK1F/0">Try in repl.it</a>
  <div class="clear"></div>
</div>

```javascript language-javascript
let array = null;  
array;                // => null
let movie = { name: 'Starship Troopers',  musicBy: null };
movie.musicBy;        // => null
'abc'.match(/[0-9]/); // => null
```

Because JavaScript's permissive nature, developers have the temptation to access uninitialized values. I'm guilty of such bad practice too.  

Often such risky actions generate `undefined` related errors, ending the script lightning fast. Related common error messages are:

* `TypeError: 'undefined' is not a function` 
* `TypeError: Cannot read property '<prop-name>' of undefined`
* and alike *type errors*.

JavaScript developer can understand the irony of this joke:  

```javascript language-javascript
function undefined() {
  // problem solved
}
```

To reduce the risk of such errors, you have to understand the cases when `undefined` is generated. And more important suppress its appearance and spread  within your application, increasing code durability.  

Let's detail the exploration of `undefined` and its effect on code safety.  

##1. What is `undefined`

JavaScript has 6 primitive types: 

* *Boolean*: `true` or `false`
* *Number*: `1`, `6.7`, `0xFF`
* *String*: `"Gorilla and banana"` 
* *Symbol*: `Symbol("name")` (starting ES2015)
* *Null*: `null`
* *Undefined*: `undefined`.

And a separated *object type*: `{name: "Dmitri"}`, `["apple", "orange"]`.

From 6 primitive types `undefined` is a special value with its own type Undefined. According to [ECMAScript specification](https://www.ecma-international.org/ecma-262/7.0/#sec-undefined-value):

> **Undefined value** primitive value is used when a variable has not been assigned a value. 

The standard clearly defines that you will receive an undefined value when accessing uninitialized variables, non existing object properties, non existing array elements and alike. For instance:

<div class="try-it-container">
  <a target="_blank" href="https://repl.it/HK1J/0">Try in repl.it</a>
  <div class="clear"></div>
</div>

```javascript language-javascript
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

The ECMAScript specification defines the type of `undefined`   value:
> **Undefined type** is a type whose sole value is the `undefined` value.

In this sense, `typeof` operator returns `'undefined'` string for an `undefined` value:

<div class="try-it-container">
  <a target="_blank" href="https://repl.it/HK1L/0">Try in repl.it</a>
  <div class="clear"></div>
</div>

```javascript language-javascript
typeof undefined === 'undefined'; // => true
```
Of course `typeof` works nicely to verify whether a variable contains an `undefined` value:

<div class="try-it-container">
  <a target="_blank" href="https://repl.it/HK1M/0">Try in repl.it</a>
  <div class="clear"></div>
</div>

```javascript language-javascript
let nothing;
typeof nothing === 'undefined';   // => true
```

##2. Common scenarios that create `undefined`

###2.1 Uninitialized variable

> A declared variable that is not yet assigned with a value (**uninitialized**) is by default `undefined`.

Plain and simple:

<div class="try-it-container">
  <a target="_blank" href="https://repl.it/HK1N/0">Try in repl.it</a>
  <div class="clear"></div>
</div>

```javascript language-javascript
let myVariable;
myVariable; // => undefined
```

`myVariable` is declared and not yet assigned with a value. Accessing the variable evaluates to `undefined`.  

An efficient approach to solve the troubles of uninitialized variables is whenever possible *assign an initial value*. The less the variable exists in an uninitialized state,  the better.  Ideally you would assign a value right away after declaration `const myVariable = 'Initial value'`, but this is not always possible.  

<i class="fa fa-thumbs-up" aria-hidden="true"></i> **Tip 1: Favor `const`, otherwise use `let`, but say goodbye to `var`**

In my opinion, one of the best features of ECMAScript 2015 is the new way to declare variables using `const` and `let`. It is a big step forward that these declarations are block scoped (contrary to older function scoped `var`) and exist in a [temporal dead zone](https://rainsoft.io/variables-lifecycle-and-why-let-is-not-hoisted/#5letvariableslifecycle) until the declaration line.    

When the variable receives a value once and forever, I recommend to use a `const` declaration. It creates an [immutable binding](https://mathiasbynens.be/notes/es6-const).  

One of the nice features of `const` is that *you have to assign an initial value* to the variable `const myVariable = 'initial'`. The variable is not exposed to the uninitialized state and to access `undefined` is simply not possible.  

Let's check the function that verifies whether a word is a palindrome:

<div class="try-it-container">
  <a target="_blank" href="https://repl.it/HK1O/0">Try in repl.it</a>
  <div class="clear"></div>
</div>

```javascript language-javascript
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

`length` and `half` variables are assigned with a value once. Seems reasonable to declare them as `const`, since these variables are not going to change. 

If you need to rebind the variable (i.e. assign multiple times), apply a `let` declaration. Whenever possible assign an initial value to it right away, e.g. `let index = 0`.

What about the old school `var`? In terms of ES2015, my suggestion is [stop using it at all](https://medium.com/javascript-scene/javascript-es6-var-let-or-const-ba58b8dcde75#.hvdxtd30t).  

<div class="image-container">
![Do not write var, write const and let in JavaScript](/content/images/2017/03/Do-not-write-var--2--2.png)
</div>

`var` declaration problem is the [variable hoisting](https://rainsoft.io/javascript-hoisting-in-details/#hoistingandvar) in the entire function scope. You can declare a `var` variable somewhere at the end of the function scope, but still it can accessed before declaration: and you'll get an `undefined`.  

<div class="try-it-container">
  <a target="_blank" href="https://repl.it/HK1P/0">Try in repl.it</a>
  <div class="clear"></div>
</div>

```javascript language-javascript
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

Contrary, a `let` (including `const`) variable cannot be accessed before the declaration line. It happens because the variable is in a [temporal dead zone](https://rainsoft.io/variables-lifecycle-and-why-let-is-not-hoisted/#5letvariableslifecycle) before the declaration. And that's nice, because you have less chances to access an `undefined`.

The above example updated with `let` (instead of `var`) throws a `ReferenceError`, because the variable in the temporal dead zone is not accessible. 

<div class="try-it-container">
  <a target="_blank" href="https://repl.it/HK1T/0">Try in repl.it</a>
  <div class="clear"></div>
</div>

```javascript language-javascript
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

Encouraging the usage of `const` for immutable bindings or `let` otherwise ensures a practice that reduces the uninitialized variables appearance.  

<i class="fa fa-thumbs-up" aria-hidden="true"></i>  **Tip 2: Increase cohesion**

[Cohesion](https://en.wikipedia.org/wiki/Cohesion_(computer_science)) characterizes the degree to which the elements of a module (namespace, class, method, block of code) belong together. The measurement of the cohesion is usually described as *high cohesion*  or *low cohesion*.  

High cohesion is preferable because it suggests to design the elements of the module to focus solely on a single task. It makes the module:

* *Focused* and *understandable*: easier to understand what the module does
* *Maintainable* and *easier to refactor*: the change in the module affects fewer modules
* *Reusable*: being focusing on a single task, it makes the module easier to reuse
* *Testable*: you would easier test a module that's focused on a single task

<div class="image-container small-container">
![Components coupling and cohesion](/content/images/2017/03/CouplingVsCohesion.svg)
</div>

High cohesion accompanied with [loose coupling](https://en.wikipedia.org/wiki/Loose_coupling) is the characteristic of a well designed system.   

A code block by itself might be considered a small module. To profit from the benefits of high cohesion, you need to keep the variables as close as possible to the code block that uses them.  

For instance, if a variable solely exists to form the logic of a block scope, then declare and allow the variable to live only within that block (using `const` or `let` declarations). Do not expose this variable to the outer block scope, since the outer block shouldn't care about this variable.

One classic example of unnecessary extended life of variables is the usage of `for` cycle inside a function:

```javascript language-javascript
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
`index`, `item` and `length` variables are declared at the beginning of function body. However they are used only near the end. So what is the problem with such approach?

All the way between the declaration at the top and the usage in `for` statement the variables `index`, `item` are uninitialized and exposed to `undefined`. They have an unreasonably long lifecycle in the entire function scope.

A better approach is to move these variables as close as possible to their usage place:

```javascript language-javascript
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
* High cohesive chunks of code are easier to refactor and extract into separated functions when necessary

###2.2 Accessing non-existing property

> When accessing a **non-existing object property**, JavaScript returns `undefined`. 

Let's demonstrate that in an example:

<div class="try-it-container">
  <a target="_blank" href="https://repl.it/HK1W/1">Try in repl.it</a>
  <div class="clear"></div>
</div>

```javascript language-javascript
let favoriteMovie = {
  title: 'Blade Runner'
};
favoriteMovie.actors; // => undefined
```

`favoriteMovie` is an object with a single property `title`. Accessing a non-existing property `actors` using a property accessor `favoriteMovie.actors` is evaluated to `undefined`.

By itself accessing a non-existing property does not throw an error. The real problem appears when trying to get data from a non-existing property value. This is the most common `undefined` related trap, reflected in the well known error message `TypeError: Cannot read property <prop> of undefined`.  

Let's slightly modify the previous code snippet to illustrate a `TypeError` throw:

<div class="try-it-container">
  <a target="_blank" href="https://repl.it/HK1Z/0">Try in repl.it</a>
  <div class="clear"></div>
</div>

```javascript language-javascript 
let favoriteMovie = {
  title: 'Blade Runner'
};
favoriteMovie.actors[0];
// TypeError: Cannot read property '0' of undefined
```
`favoriteMovie` does not have the property `actors`, so `favoriteMovie.actors` evaluates to `undefined`.  
As result, accessing the first item of an `undefined` value using the expression `favoriteMovie.actors[0]` throws a `TypeError`.  

The permissive nature of JavaScript that allows to access non-existing properties is a source of confusion: the property may be set, or may be not. The ideal way to bypass this problem is to restrict the object to have always defined the properties that it holds.  

Unfortunately you often don't have control over the objects that you work with. Such objects may have different set of properties in diverse scenarios. So you have  to handle all these scenarios manually.  

Let's implement a function `append(array, toAppend)` that adds at the beginning and/or at the end of an array new elements. `toAppend` parameter accepts an object with properties:

* `first`: element inserted at the beginning of `array`
* `last`: element inserted at the end of `array`.

The function returns a new array instance, without altering the original array (i.e. it's a [pure function](https://medium.com/javascript-scene/master-the-javascript-interview-what-is-a-pure-function-d1c076bec976#.tyinnrzbi)).  

The first version of `append()`, a bit naive, may look like this:

<div class="try-it-container">
  <a target="_blank" href="https://repl.it/HK11/2">Try in repl.it</a>
  <div class="clear"></div>
</div>

```javascript language-javascript
function append(array, toAppend) {
  const arrayCopy = array.slice();
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

A property accessor evaluates to `undefined` if the property does not exist. The first temptation to check weather `first` or `last` properties are present is to verify them against `undefined`. Let's do the verification in conditionals `if(toAppend.first){}` and `if(toAppend.last){}`...  

*Not so fast.* There is a serious drawback in this approach. `undefined`, as well as `false`, `null`, `0`, `NaN` and `''` are [falsy](https://developer.mozilla.org/en-US/docs/Glossary/Falsy) values. 

In the current implementation of `append()`, the function doesn't allow to insert falsy elements:  

<div class="try-it-container">
  <a target="_blank" href="https://repl.it/HK11/3">Try in repl.it</a>
  <div class="clear"></div>
</div>

```javascript language-javascript
append([10], { first: 0, last: false }); // => [10]
```

`0` and `false` are falsy. Because `if(toAppend.first){}` and `if(toAppend.last){}` actually  compare against falsy, these elements are not inserted into the array. The function returns the initial array `[10]` without modifications.  

The tips that follow explain how to correctly check the property existence.

<i class="fa fa-thumbs-up" aria-hidden="true"></i> **Tip 3: Check the property existence**

Fortunately, JavaScript offers a bunch of ways to determine if the object has a specific property:  

* `obj.prop !== undefined`: compare against `undefined` directly
* `typeof obj.prop !== 'undefined'`: verify the property value type
* `obj.hasOwnProperty('prop')`: verify whether the object has an own property
* `'prop' in obj`: verify whether the object has an own or inherited property

My recommendation is to use `in` operator. It has a short and sweet syntax. `in` operator presence suggests a clear intent of checking whether an object has a specific property, *without* accessing the actual property value.  

<div class="image-container">
![Do not write var, write const and let in JavaScript](/content/images/2017/03/Do-not-write-var--2--1.png)
</div>

`obj.hasOwnProperty('prop')` is a nice solution too. It's slightly longer than `in` operator and verifies only in object's own properties.   

The 2 ways that involve comparing with `undefined` might work... But it seems to me that `obj.prop !== undefined` and `typeof obj.prop !== 'undefined'` look verbose and weird, and expose to a suspicions path of dealing directly with `undefined`.  

Let's improve `append(array, toAppend)` function using `in` operator:

<div class="try-it-container">
  <a target="_blank" href="https://repl.it/HK13/1">Try in repl.it</a>
  <div class="clear"></div>
</div>

```javascript language-javascript
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

The usage of `in` operator fixes the problem with inserting falsy elements `0` and `false`. Now, adding these elements at the beginning and at the end of `[10]` produces the expected result `[0, 10, false]`.  

<i class="fa fa-thumbs-up" aria-hidden="true"></i> **Tip 4: Destructuring to access object properties**

When accessing an object property, sometimes it's necessary to indicate a default value if the property does not exist.  

You might use `in` accompanied with ternary operator to accomplish that:

<div class="try-it-container">
  <a target="_blank" href="https://repl.it/HK14/0">Try in repl.it</a>
  <div class="clear"></div>
</div>

```javascript language-javascript
const object = { };
const prop = 'prop' in object ? object.prop : 'default';
prop; // => 'default'
```

The usage of ternary operator syntax becomes daunting when the number of properties to check increases. For each property you have to create a new line of code to handle the defaults, increasing an ugly wall of similar looking ternary operators.  

In order to use a more elegant approach, let's get familiar with a great ES2015 feature called *object destructuring*.  

[Object destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#Object_destructuring) allows inline extraction of object property values directly into variables, and setting a default value if the property does not exist. A convenient syntax to avoid dealing directly with `undefined`.

Indeed, the property extraction now looks short and meaningful:

<div class="try-it-container">
  <a target="_blank" href="https://repl.it/HK16/0">Try in repl.it</a>
  <div class="clear"></div>
</div>  

```javascript language-javascript
const object = {  };
const { prop = 'default' } = object;
prop; // => 'default'
```

To see things in action, let's define an useful function that wraps a string in quotes.  
`quote(subject, config)` accepts the first argument as the string to be wrapped. The second argument `config` is an object with the properties:

* `char`: the quote char, e.g. `'` (single quote) or `"` (double quote). Defaults to `"`.
* `skipIfQuoted`: the boolean value to skip quoting if the string is already quoted. Defaults to `true`.

Applying the benefits of the object destructuring, let's implement `quote()`:

<div class="try-it-container">
  <a target="_blank" href="https://repl.it/HK17/0">Try in repl.it</a>
  <div class="clear"></div>
</div>

```javascript language-javascript
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

`const { char = '"', skipIfQuoted = true } = config` destructuring assignment  in  one line extracts the properties `char` and `skipIfQuoted` from `config` object.  
If some properties are not available in `config` object, the destructuring assignment sets the default values: `'"'` for `char` and `false` for `skipIfQuoted`.  

Fortunately, the function still has room for improvements.  

Let's move the destructuring assignment right into the parameters section. And set a default value (an empty object `{ }`) for `config` parameter, to skip the second argument when default settings are enough.  

<div class="try-it-container">
  <a target="_blank" href="https://repl.it/HK1b/0">Try in repl.it</a>
  <div class="clear"></div>
</div>

```javascript language-javascript
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
Notice that a destructuring assignment replaces the `config` parameter in function's signature. I like that: `quote()` becomes one line shorter.  
`= {}` on the right side of destructuring assignment ensures that an empty object is used if the second argument is not specified at all `quote('Sunny day')`.  

Object destructuring is a powerful feature that handles efficiently the extraction of properties from objects. I like the possibility to specify a default value to be returned when the accessed property doesn't exist. As result, you avoid `undefined` and the problem related to handling it.  

<i class="fa fa-thumbs-up" aria-hidden="true"></i> **Tip 5: Fill the object with default properties**

If there is no need to create variables for every property like the destructuring assignment does, the object that misses some properties can be filled with default values.  

The ES2015 `Object.assign(target, source1, source2, ...)` copies the values of all enumerable own properties from one or more source objects into the target object. The function returns the target object.  

For instance, you need to access the properties of `unsafeOptions` object, which not always contains its full set of properties.  

To avoid `undefined` when accessing a non-existing property from `unsafeOptions`, let's make some adjustments:  

*  Define an object `defaults` that holds the default property values
*  Call `Object.assign({ }, defaults, unsafeOptions)` to build a new object `options`. The new object receives all properties from `unsafeOptions`, but the missing ones are taken from `defaults`.  

<div class="try-it-container">
  <a target="_blank" href="https://repl.it/HK1c/0">Try in repl.it</a>
  <div class="clear"></div>
</div>

```javascript language-javascript
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

Fortunately exists an easier and lighter way to fill the object with default properties. I recommend to use a new JavaScript feature (now at [stage 3](https://tc39.github.io/process-document/)) that allows to [spread properties in object initializers](https://github.com/tc39/proposal-object-rest-spread).  

Instead of `Object.assign()` invocation, use the object spread syntax to copy into target object all own and enumberable properties from source objects:

<div class="try-it-container">
  <a target="_blank" href="https://repl.it/HK1e/0">Try in repl.it</a>
  <div class="clear"></div>
</div>

```javascript language-javascript
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

###2.3 Function parameters

> The function parameters implicitly default to `undefined`.

Normally a function that is defined with a specific number of parameters should be invoked with the same number of arguments. In such case the parameters get the values you expect:

<div class="try-it-container">
  <a target="_blank" href="https://repl.it/HK1f/0">Try in repl.it</a>
  <div class="clear"></div>
</div>

```javascript language-javascript
function multiply(a, b) {
  a; // => 5
  b; // => 3
  return a * b;
}
multiply(5, 3); // => 15
```
The invocation `multiply(5, 3)` makes the parameters `a` and `b` receive the corresponding `5` and `3` values. The multiplication is calculated as expected: `5 * 3 = 15`.

What does happen when you omit an argument on invocation? The parameter inside the function becomes `undefined`.  

Let's slightly modify the previous example by calling the function with just one argument:

<div class="try-it-container">
  <a target="_blank" href="https://repl.it/HK1j/0">Try in repl.it</a>
  <div class="clear"></div>
</div>

```javascript language-javascript
function multiply(a, b) {
  a; // => 5
  b; // => undefined
  return a * b;
}
multiply(5); // => NaN
```

`function multiply(a, b) { }` is defined with two parameters `a` and `b`.   
The invocation `multiply(5)` is performed with a single argument: as result `a` parameter is `5`, but `b` parameter is `undefined`.  

<i class="fa fa-thumbs-up" aria-hidden="true"></i> **Tip 6: Use default parameter value**

Sometimes a function does not require the full set of arguments on invocation. You can simply set defaults for parameters that don't have a value.   

Recalling the previous example, let's make an improvement. If `b` parameter is `undefined`, it gets assigned with a default value of `2`:

<div class="try-it-container">
  <a target="_blank" href="https://repl.it/HK1l/0">Try in repl.it</a>
  <div class="clear"></div>
</div>

```javascript language-javascript
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
The function is invoked with a single argument `multiply(5)`. Initially `a` parameter is `2` and `b` is `undefined`.  
The conditional statement verifies whether `b` is `undefined`. If it happens, `b = 2` assignment sets a default value.  

While the provided way to assign default values works, I don't recommend comparing directly against `undefined`. It's verbose and looks like a hack.  

A better approach is to use the ES2015 [default parameters](https://www.sitepoint.com/es6-default-parameters/) feature. It's short, expressive and no direct comparisons with `undefined`.  

Modifying the previous example with a default parameter for `b` indeed looks great:

<div class="try-it-container">
  <a target="_blank" href="https://repl.it/HK1m/0">Try in repl.it</a>
  <div class="clear"></div>
</div>

```javascript language-javascript
function multiply(a, b = 2) {
  a; // => 5
  b; // => 2
  return a * b;
}
multiply(5);            // => 10
multiply(5, undefined); // => 10
```
`b = 2` in the function signature makes sure that if `b` is `undefined`, the parameter is defaulted to `2`.  

ES2015 default parameters feature is intuitive and expressive. Always use it to set default values for optional parameters.  

###2.4 Function return value

> Implicitly, without `return` statement, a JavaScript function returns `undefined`.

In JavaScript a function that doesn't have any `return` statements implicitly returns an `undefined`:  

<div class="try-it-container">
  <a target="_blank" href="https://repl.it/HK1n/0">Try in repl.it</a>
  <div class="clear"></div>
</div>

```javascript language-javascript
function square(x) {
  const res = x * x;
}
square(2); // => undefined
```
`square()` function does not return any computation results. The function invocation result is `undefined`.  

The same situation happens when `return` statement is present, but without an expression nearby:  

<div class="try-it-container">
  <a target="_blank" href="https://repl.it/HK1o/0">Try in repl.it</a>
  <div class="clear"></div>
</div>

```javascript language-javascript
function square(x) {
  const res = x * x;
  return;
}
square(2); // => undefined
```
`return;` statement is executed, but it doesn't return any expression.  The invocation result is also `undefined`.  

Of course, indicating near `return` the expression to be returned works as expected:

<div class="try-it-container">
  <a target="_blank" href="https://repl.it/HK1q/0">Try in repl.it</a>
  <div class="clear"></div>
</div>

```javascript language-javascript
function square(x) {
  const res = x * x;
  return res;
}
square(2); // => 4
```
Now the function invocation is evaluated to `4`, which is `2` squared.  

<i class="fa fa-thumbs-up" aria-hidden="true"></i> **Tip 7: Don't trust the automatic semicolon insertion**

The following list of statements in JavaScript must end with semicolons (`;`):   

* empty statement
* `let`, `const`, `var`, `import`, `export` declarations
* expression statement
* `debugger` statement
* `continue` statement, `break` statement
* `throw` statement
* `return` statement

If you use one of the above statements, be sure to indicate a semicolon at the end:

<div class="try-it-container">
  <a target="_blank" href="https://repl.it/HK1r/0">Try in repl.it</a>
  <div class="clear"></div>
</div>

```javascript language-javascript
function getNum() {
  // Notice the semicolons at the end
  let num = 1; 
  return num;
}
getNum(); // => 1
```

At the end of both `let` declaration and `return` statement an obligatory semicolon is written.

What happens when you don't want to indicate these semicolons? For instance to reduce the size of the source file.  

In such situation ECMAScript provides an [Automatic Semicolon Insertion](http://www.ecma-international.org/ecma-262/6.0/index.html#sec-automatic-semicolon-insertion) (ASI) mechanism, which inserts for you the missing semicolons.

Being helped by ASI, you can remove the semicolons from the previous example: 

<div class="try-it-container">
  <a target="_blank" href="https://repl.it/HK1t/0">Try in repl.it</a>
  <div class="clear"></div>
</div>

```javascript language-javascript
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

What does mean inside a function to have `return;` statement? The function returns `undefined`. If you don't know in details the mechanism of ASI, the unexpectedly returned `undefined` is misleading.  

For instance, let's study the returned value of `getPrimeNumbers()` invocation:

<div class="try-it-container">
  <a target="_blank" href="https://repl.it/HK1x/1">Try in repl.it</a>
  <div class="clear"></div>
</div>

```javascript language-javascript
function getPrimeNumbers() {
  return 
    [ 2, 3, 5, 7, 11, 13, 17 ]
}
getPrimeNumbers() // => undefined
```
Between `return` statement and the array literal expression exists a new line. JavaScript automatically inserts a semicolon after `return`, interpreting the code as follows:  

<div class="try-it-container">
  <a target="_blank" href="https://repl.it/HK2C/0">Try in repl.it</a>
  <div class="clear"></div>
</div>

```javascript language-javascript
function getPrimeNumbers() {
  return; 
  [ 2, 3, 5, 7, 11, 13, 17 ];
}
getPrimeNumbers(); // => undefined
```
The statement `return;` makes the function `getPrimeNumbers()` to return `undefined` instead of the expected array.  

The problem is solved by removing the newline between `return` and array literal:  

<div class="try-it-container">
  <a target="_blank" href="https://repl.it/HK2D/0">Try in repl.it</a>
  <div class="clear"></div>
</div>

```javascript language-javascript
function getPrimeNumbers() {
  return [ 
    2, 3, 5, 7, 11, 13, 17 
  ];
}
getPrimeNumbers(); // => [2, 3, 5, 7, 11, 13, 17]
```

My recommendation is to study [how exactly](http://www.bradoncode.com/blog/2015/08/26/javascript-semi-colon-insertion/) Automatic Semicolon Insertion works to avoid such situations.   

Of course, never put a newline between `return` and the returned expression.  

###2.5 `void` operator

<code>void <em style="color: #900">expression</em></code> evaluates the expression and returns `undefined` no matter the result of evaluation.  

<div class="try-it-container">
  <a target="_blank" href="https://repl.it/HK2E/0">Try in repl.it</a>
  <div class="clear"></div>
</div>

```javascript language-javascript
void 1;                    // => undefined
void (false);              // => undefined
void {name: 'John Smith'}; // => undefined
void Math.min(1, 3);       // => undefined
```

[One use case](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/void#JavaScript_URIs) of `void` operator is to suppress expression evaluation to `undefined`, relying on some side-effect of the evaluation.  

##3. `undefined` in arrays

You get `undefined` when accessing an array element with an out of bounds index.

<div class="try-it-container">
  <a target="_blank" href="https://repl.it/HK2H/0">Try in repl.it</a>
  <div class="clear"></div>
</div>

```javascript language-javascript
const colors = ['blue', 'white', 'red'];
colors[5];  // => undefined
colors[-1]; // => undefined
```
`colors` array has 3 elements, thus valid indexes are `0`, `1` and `2`.  
Because there are no array elements at indexes `5` and `-1`, the accessors `colors[5]` and  `colors[-1]` are `undefined`.  

In JavaScript you might encounter so called sparse arrays. Theses are arrays that have gaps, i.e. at some indexes no elements are defined. 

When a gap (aka empty slot) is accessed inside a sparse array, you also get an `undefined`.  

The following example generates sparse arrays and tries to access their empty slots:

<div class="try-it-container">
  <a target="_blank" href="https://repl.it/HK2I/1">Try in repl.it</a>
  <div class="clear"></div>
</div>

```javascript language-javascript
const sparse1 = new Array(3);
sparse1;       // => [<empty slot>, <empty slot>, <empty slot>]
sparse1[0];    // => undefined
sparse1[1];    // => undefined
const sparse2 = ['white',  ,'blue']
sparse2;       // => ['white', <empty slot>, 'blue']
sparse2[1];    // => undefined
```
`sparse1` is created corresponding by invoking an `Array` constructor with a numeric first argument. It has 3 empty slots.  
`sparse2` is created with an array literal with the missing second element.  
In any of these sparse arrays accessing an empty slot evaluates to `undefined`.  

When working with arrays, to escape catching `undefined`, be sure to use valid array indexes and avoid at all creating sparse arrays.  

##4. Difference between `undefined` and `null`

A reasonable question appears: what is the main difference between `undefined` and `null`? Both special values imply an empty state.  

The main difference is that `undefined` represents a value of a variable that wasn't yet initialized, while `null` represents an intentional absence of an object.  

Let's explore the difference in some examples.

The variable `number` is defined, however is not assigned with an initial value:

<div class="try-it-container">
  <a target="_blank" href="https://repl.it/HK2J/0">Try in repl.it</a>
  <div class="clear"></div>
</div>

```javascript language-javascript
let number;
number; // => undefined
```
`number` variable is `undefined`, which clearly indicates an *uninitialized* variable.  

The same uninitialized concept happens when a *non-existing object property* is accessed:

<div class="try-it-container">
  <a target="_blank" href="https://repl.it/HK2L/0">Try in repl.it</a>
  <div class="clear"></div>
</div>

```javascript language-javascript
const obj = { firstName: 'Dmitri' };
obj.lastName; // => undefined
```
Because `lastName` property does not exist in `obj`, JavaScript correctly evaluates `obj.lastName` to `undefined`.  

In other cases you know that a variable expects to hold an object or a function to return an object. But for some reason you can't instantiate the object. In such case `null` is a meaningful indicator of a *missing object*.

For example, `clone()` is a function that clones a plain JavaScript object. The function is expected to return an object:

<div class="try-it-container">
  <a target="_blank" href="https://repl.it/HK2M/2">Try in repl.it</a>
  <div class="clear"></div>
</div>

```javascript language-javascript
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
However `clone()` might be invoked with a non-object argument: `15` or `null` (or generally a primitive value, `null` or `undefined`). In such case the function cannot create a clone, so it returns `null` - the indicator of a missing object.  


`typeof` operator makes the distinction between the two values:

<div class="try-it-container">
  <a target="_blank" href="https://repl.it/HK2M/1">Try in repl.it</a>
  <div class="clear"></div>
</div>

```javascript language-javascript
typeof undefined; // => 'undefined'
typeof null;      // => 'object'
```

The [strict quality operator](https://rainsoft.io/the-legend-of-javascript-equality-operator/#theidentityoperator) `===` correctly differentiates `undefined` from `null`:

<div class="try-it-container">
  <a target="_blank" href="https://repl.it/HLI0/0">Try in repl.it</a>
  <div class="clear"></div>
</div>

```javascript language-javascript
let nothing = undefined;
let missingObject = null;
nothing === missingObject; // => false
```

##5. Conclusion

The existence of `undefined` is a consequence of JavaScript's permissive nature that allows the usage of:

- uninitialized variables
- non-existing object properties or methods
- out of bounds indexes to access array elements
- the invocation result of a function that returns nothing

Mostly comparing directly against `undefined` is a bad practice, because you probably rely on a permitted but discouraged practice mentioned above.  

An efficient strategy is to reduce at minimum the appearance of `undefined` keyword in your code. In the meantime, *always* remember about its potential appearance in a surprising way, and prevent that by applying beneficial habits such as:

* reduce the usage of uninitialized variables 
* make the variables lifecycle short and close to the source of their usage
* whenever possible assign an initial value to variables
* favor `const`, otherwise use `let`
* use default values for insignificant function parameters
* verify the properties existence or fill the unsafe objects with default properties
* avoid the usage of sparse arrays


*What's your opinion about `undefined` in JavaScript? Feel free to write a comment bellow!*