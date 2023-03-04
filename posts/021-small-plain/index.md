---
title: "The Art of Writing Small and Plain Functions"
description: "Messy code wastes your time & efforts. It poisons apps. Clean code is obligatory for a successful project: learn to write small and plain functions."
published: "2016-08-31"
modified: "2016-08-31"
thumbnail: "./images/cover.jpg"
slug: the-art-of-writing-small-and-plain-functions
tags: ["javascript", "function", "clean code"]
recommended: ["the-path-of-software-development-craftsmanship", "make-your-javascript-code-shide-knockout-old-es5-hack"]
type: post
---

The complexity of software applications is growing. The code quality is important in order to make the application stable and easily extensible.  

Unfortunately almost every developer, including myself, in his career faced with bad quality code. And it's a swamp.  
Such code has the following harmful characteristics: 

* Functions are too long and do too many things
* Often functions have side effects that are difficult to understand or even debug
* Unclear naming of functions and variables
* Fragile code: a small modification unexpectedly breaks other application components
* Poor or missing code coverage

It sounds very common: *"I don't understand how this code works"*, *"this code is a mess"*, *"it's hard to modify this code"* and the like.

Once I had a situation when my colleague quit his job because he dealt with a REST API on Ruby that was hard to maintain. He received this project from previous team of developers. 
Fixing current bugs creates new ones, adding new features creates a new series of bugs and so on (fragile code). The client didn't want to rebuild the application with a better design, and the developer made the correct decision to quit.  

![Sad computer about bad code quality](./images/mac-sick.jpg)

Ok, such situations happen often and are sad. But what do to?  

The first to keep in mind: simply making the application run and taking care of the code quality are different tasks. 
On one side you implement the app requirements. But on the other side you should take time to verify if any function doesn't have too much responsibility, write comprehensive variable and function names, avoid functions with side effects and so on.  

The functions (including object methods) are the little gears that make the application run. First you should concentrate on their structure and composition. The current article covers best practices how to write plain, understandable and easy to test functions.  

## 1. Functions should be small. Really small

Big functions that have a lot of responsibility should be avoided and split into small ones. Big black box functions are difficult to understand, modify and especially test.  

Suppose a scenario when a function should return the weight of an array, map or plain JavaScript object. The weight is calculated by summing the property values:

* `1` point for `null` or `undefined`
* `2` points for a primitive type
* `4` points for an object or function.  

For example the weight of an array `[null, 'Hello World', {}]` is calculated this way: `1` (for `null`) + `2` (for string primitive type) + `4` (for an object) = `7`.

### Step 0: The initial big function

Let's start with the worst practice. The logic is coded within a single big function `getCollectionWeight()`:  

```javascript
function getCollectionWeight(collection) {
  let collectionValues;
  if (collection instanceof Array) {
    collectionValues = collection;
  } else if (collection instanceof Map) {
    collectionValues = [...collection.values()];
  } else {
    collectionValues = Object.keys(collection).map(function (key) {
      return collection[key];
    });
  }
  return collectionValues.reduce(function(sum, item) {
    if (item == null) {
      return sum + 1;
    } 
    if (typeof item === 'object' || typeof item === 'function') {
      return sum + 4;
    }
    return sum + 2;
  }, 0);
}
let myArray = [null, { }, 15];
let myMap = new Map([ ['functionKey', function() {}] ]);
let myObject = { 'stringKey': 'Hello world' };
getCollectionWeight(myArray);  // => 7 (1 + 4 + 2)
getCollectionWeight(myMap);    // => 4
getCollectionWeight(myObject); // => 2
```
The problem is clearly visible. `getCollectionWeight()` function is too big and looks like a black box full of surprises.  
You probably find it difficult to understand what it does from the first sight. And imagine a bunch of such functions in an application.  

When you work with such code, you waste time and effort. On the other side the quality code doesn't make you feel uncomfortable. Quality code with small and self-explanatory functions is a pleasure to read and easy to follow.  

![Avoid big black box functions](./images/black-box.png)

### Step 1: Extract weight by type and drop magic numbers

Now the goal is to split the big function into smaller, independent and reusable ones. The first step is to extract the code that determines the weight of a value by its type. This new function will be named `getWeight()`.  

Also take a look at the magic weight numbers: `1`, `2` and `4`. Simply reading these numbers without knowing the whole story does not provide useful information. Fortunately ES2015 allows to declare `const` read-only references, so you can easily create constants with meaningful names to knockout the magic numbers. 

Let's create the small function `getWeightByType()` and improve `getCollectionWeight()` accordingly:  

```javascript
// Code extracted into getWeightByType()
function getWeightByType(value) {
  const WEIGHT_NULL_UNDEFINED  = 1;
  const WEIGHT_PRIMITIVE       = 2;
  const WEIGHT_OBJECT_FUNCTION = 4;
  if (value == null) {
    return WEIGHT_NULL_UNDEFINED;
  } 
  if (typeof value === 'object' || typeof value === 'function') {
    return WEIGHT_OBJECT_FUNCTION;
  }
  return WEIGHT_PRIMITIVE;
}
function getCollectionWeight(collection) {
  let collectionValues;
  if (collection instanceof Array) {
    collectionValues = collection;
  } else if (collection instanceof Map) {
    collectionValues = [...collection.values()];
  } else {
    collectionValues = Object.keys(collection).map(function (key) {
      return collection[key];
    });
  }
  return collectionValues.reduce(function(sum, item) {
    return sum + getWeightByType(item);
  }, 0);
}
let myArray = [null, { }, 15];
let myMap = new Map([ ['functionKey', function() {}] ]);
let myObject = { 'stringKey': 'Hello world' };
getCollectionWeight(myArray);  // => 7 (1 + 4 + 2)
getCollectionWeight(myMap);    // => 4
getCollectionWeight(myObject); // => 2
```
Looks better, right? 
`getWeightByType()` function is an independent component that simply determines the weight by type.  And reusable, as you can execute it in any other function.  

`getCollectionWeight()` becomes a bit lighter.  

`WEIGHT_NULL_UNDEFINED`, `WEIGHT_PRIMITIVE` and `WEIGHT_OBJECT_FUNCTION` are self-explanatory constants that describe the type weights. You don't have to guess what `1`, `2` and `4` numbers mean.  

### Step 2: Continue splitting and make it extensible

However the updated version still has drawbacks. 
Imagine that you have the plan to implement the weight evaluation of a Set or even  other custom collection. `getCollectionWeight()` will grow fast in size, because it contains the logic of collecting the values.  

Let's extract into separated functions the code that gathers values from maps `getMapValues()` and plain JavaScript objects `getPlainObjectValues()`. Take a look at the improved version:

```javascript
function getWeightByType(value) {
  const WEIGHT_NULL_UNDEFINED = 1;
  const WEIGHT_PRIMITIVE = 2;
  const WEIGHT_OBJECT_FUNCTION = 4;
  if (value == null) {
    return WEIGHT_NULL_UNDEFINED;
  } 
  if (typeof value === 'object' || typeof value === 'function') {
    return WEIGHT_OBJECT_FUNCTION;
  }
  return WEIGHT_PRIMITIVE;
}
// Code extracted into getMapValues()
function getMapValues(map) {
  return [...map.values()];
}
// Code extracted into getPlainObjectValues()
function getPlainObjectValues(object) {
  return Object.keys(object).map(function (key) {
    return object[key];
  });
}
function getCollectionWeight(collection) {
  let collectionValues;
  if (collection instanceof Array) {
    collectionValues = collection;
  } else if (collection instanceof Map) {
    collectionValues = getMapValues(collection);
  } else {
    collectionValues = getPlainObjectValues(collection);
  }
  return collectionValues.reduce(function(sum, item) {
    return sum + getWeightByType(item);
  }, 0);
}
let myArray = [null, { }, 15];
let myMap = new Map([ ['functionKey', function() {}] ]);
let myObject = { 'stringKey': 'Hello world' };
getCollectionWeight(myArray);  // => 7 (1 + 4 + 2)
getCollectionWeight(myMap);    // => 4
getCollectionWeight(myObject); // => 2
```
If you read `getCollectionWeight()` now, you find much easier figure out what it does. It looks like an interesting story.  

Every function is obvious and straightforward. You don't waste time digging to realize what the code does. That's how the clean code should be.  

### Step 3: Never stop improving

Even at this step you have a lot of space for improvement! 

You can create `getCollectionValues()` as a separated function, which contains the if/else statements to differentiate the collection types:

```javascript
function getCollectionValues(collection) {
  if (collection instanceof Array) {
    return collection;
  }
  if (collection instanceof Map) {
    return getMapValues(collection);
  }
  return getPlainObjectValues(collection);
}
```

Then `getCollectionWeight()` would become truly plain, because the only thing it needs to do is: get the collection values `getCollectionValues()` and apply the sum reducer on it.  

You can also create a separated reducer function:
```javascript
function reduceWeightSum(sum, item) {
  return sum + getWeightByType(item);
}
```
Because ideally `getCollectionWeight()` should not define functions.

In the end the initial big function is transformed into the following small functions:

```javascript
function getWeightByType(value) {
  const WEIGHT_NULL_UNDEFINED = 1;
  const WEIGHT_PRIMITIVE = 2;
  const WEIGHT_OBJECT_FUNCTION = 4;
  if (value == null) {
    return WEIGHT_NULL_UNDEFINED;
  } 
  if (typeof value === 'object' || typeof value === 'function') {
    return WEIGHT_OBJECT_FUNCTION;
  }
  return WEIGHT_PRIMITIVE;
}
function getMapValues(map) {
  return [...map.values()];
}
function getPlainObjectValues(object) {
  return Object.keys(object).map(function (key) {
    return object[key];
  });
}
function getCollectionValues(collection) {
  if (collection instanceof Array) {
    return collection;
  }
  if (collection instanceof Map) {
    return getMapValues(collection);
  }
  return getPlainObjectValues(collection);
}
function reduceWeightSum(sum, item) {
  return sum + getWeightByType(item);
}
function getCollectionWeight(collection) {  
  return getCollectionValues(collection).reduce(reduceWeightSum, 0);
}
let myArray = [null, { }, 15];
let myMap = new Map([ ['functionKey', function() {}] ]);
let myObject = { 'stringKey': 'Hello world' };
getCollectionWeight(myArray);  // => 7 (1 + 4 + 2)
getCollectionWeight(myMap);    // => 4
getCollectionWeight(myObject); // => 2
```
That's the art of writing small and plain functions!

After all these code quality optimizations, you get a bunch of nice benefits:

* The **readability** of `getCollectionWeight()` increased by self-explanatory code
* The **size** of `getCollectionWeight()` reduced considerable
* `getCollectionWeight()` function is now **protected from fast growth** if you plan to implement the weight calculation of other collection types
* The extracted functions are now **decoupled and reusable components**. Your colleague  may ask you to import these nice functions into another project: and you can easily do that
* If accidentally a function generates an error, the **call stack will be more precise** because it contains the function names. Almost instantly you could determine the function that makes problems
* The split functions are much **easier to test** and reach a high level of **code coverage**. Instead of testing one big function with all possible scenarios, you can structure your tests and verify each small function separately
* You can benefit from CommonJS or ES2015 modules format. Create from extracted functions **separated modules**. This makes your project files lightweight and structured.  

These advantages help you survive in the complexity of the applications.

![Favor transparent composite functions](./images/transparent.png)

As a general rule, your functions should not be longer than 20 lines of code. Smaller - better.

I think now you want to ask me a reasonable question: *"I don't want to create functions for each line of code. Is there a criteria when I should stop splitting?"* This is a subject of the next chapter.  

## 2. Functions should be plain

Let's relax a bit and think what is actually a software application?  

Every application is implementing a list of requirements. The role of developer is to divide these requirements into small executable components (namespaces, classes, functions, code blocks) that do a well determined task.  

A component consists of other smaller components. If you want to code a component, you need to create it from components at only one level down in abstraction. 

In other words, what you need is to decompose a function into smaller steps, but keep these steps at the same, one step down, level of abstraction. This is important because it makes the function plain and implies to *"do one thing and do it well"*.  

Why is this necessary? Because plain functions are obvious. Obvious means easy to read and modify. 

Let's follow an example. Suppose you want to implement a function that keeps only [prime numbers](https://en.wikipedia.org/wiki/Prime_number) (2, 3, 5, 7, 11, etc) in an array, removing non prime ones (1, 4, 6, 8, etc). The function is invoked this way:

```javascript
getOnlyPrime([2, 3, 4, 5, 6, 8, 11]); // => [2, 3, 5, 11]
```
What are the steps at one level down in abstraction to implement the function  `getOnlyPrime()`? Let's formulate this way:  

> To implement `getOnlyPrime()` function, filter the array of numbers using `isPrime()` function.  

Simply, just apply a filter function `isPrime()` over the array of numbers.  

Do you need to implement the details of `isPrime()` at this level? *No*, because `getOnlyPrime()` function would have steps from different level of abstractions. The function would take too much responsibility.  

Having the plain idea in mind, let's implement the body of `getOnlyPrime()` function:

```javascript
function getOnlyPrime(numbers) {
  return numbers.filter(isPrime);
}
getOnlyPrime([2, 3, 4, 5, 6, 8, 11]); // => [2, 3, 5, 11]
```
As you can see, `getOnlyPrime()` is plain and simple. It contains steps from a single level of abstraction: `.filter()` array method and `isPrime()`. 

Now is the time move one level down in abstraction. 

The array method `.filter()`  is provided by JavaScript engine and use it as is. Of course the standard [describes exactly](http://www.ecma-international.org/ecma-262/6.0/#sec-array.prototype.filter) what it does.  

Now you can detail into how `isPrime()` should be implemented:  

> To implement `isPrime()` function that checks if a number `n` is prime, verify if any number from `2` to `Math.sqrt(n)` evenly divides `n`.  

Having this algorithm (yet not efficient, but used for simplicity), let's code `isPrime()` function:  

```javascript
function isPrime(number) {
  if (number === 3 || number === 2) {
    return true;
  }
  if (number === 1) {
    return false;
  }
  for (let divisor = 2; divisor <= Math.sqrt(number); divisor++) {
    if (number % divisor === 0) {
      return false;
    }
  }
  return true;
}
function getOnlyPrime(numbers) {
  return numbers.filter(isPrime);
}
getOnlyPrime([2, 3, 4, 5, 6, 8, 11]); // => [2, 3, 5, 11]
```
`getOnlyPrime()` is small and plain. It has only strictly necessary steps from one level down in abstraction.  

The readability of complex functions can be much improved if you follow the rule of making them plain. Having each level of abstraction coded precisely prevents the creation of big chunks of unmaintainable code.  

## 3. Use concise function names

Function names should be concise: no more and no less. Ideally the name suggests clearly what the function does, without the necessity to dive into the implementation details.  

For function names use [camel case](https://en.wikipedia.org/wiki/CamelCase) format that starts with a lowercase letter: `addItem()`, `saveToStore()` or `getFirstName()`.  

Because functions are actions, the name should contain at least one verb. For example `deletePage()`, `verifyCredentials()`. To get or set a property, use the standard `set` and `get` prefixes: `getLastName()` or `setLastName()`.  

Avoid in the production code misleading names like `foo()`, `bar()`, `a()`, `fun()`, etc. Such names have no meaning.  

If functions are small and plain, names are concise: the code is read as a wonderful prose. 

## 4. Conclusion

Certainly the provided examples are quite simple. Real world applications are more complex. You may complain that writing plain functions, with only one level down in abstraction, is a tedious task. But it's not that complicated if your practice right from the start of the project.  

If an application already has functions with too much responsibility, you may find hard to reorganize the code. And in many cases impossible to do in a reasonable amount of time. At least start with small: extract something you can.  

Of course the correct solution is to implement the application correctly from the start. And dedicate time not only to implementation, but also to a correct structure of your functions: as suggested make them small and plain. 

> Measure seven times, cut once.

![Happy computer about good code quality](./images/happy-mac.jpg)

ES2015 implements a nice module system, that clearly suggest that small functions are a good practice.  

Just remember that clean and organized code **always deserves investing time**. You may find it hard to do. You may need a lot of practice. You may come back and modify a function multiple times.  

Nothing can be worse than messy code.

*What practice do you use to make the code organized? Feel free to write a comment below!*