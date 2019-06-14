---
title: An easy guide to object rest/spread properties in JavaScript
description: Object spread allows easily to clone, merge, extend objects. While object rest collects rest of properties after destructuring.
published: "2018-01-03"
modified: "2018-01-03"
thumbnail: "./future-car.jpg"
slug: object-rest-spread-properties-javascript
tags: ["javascript", "spread properties", "rest properties"]
recommended: ["7-tips-to-handle-undefined-in-javascript", "object-rest-spread-properties-javascript"]
draft: false
type: post
---

Merging multiple JavaScript objects is a frequent task. Unfortunately JavaScript is sloppy at providing a convenient syntax to do the merge. At least until now.  

In ES5 your solution is `_.extend(target, [sources])` from Lodash (or any alternative), and ES2015 introduces `Object.assign(target, [sources])`. 

Luckily [object spread syntax](https://github.com/tc39/proposal-object-rest-spread) (an ECMASript proposal at stage 3) is a step forward how to manipulate objects, providing a short and easy to follow syntax.  

<div class="try-it-container">
  <a target="_blank" href="https://repl.it/@panzerdp/FearlessLovableUintagroundsquirrel">Run demo</a>
  <div class="clear"></div>
</div>

```javascript
const cat = {
  legs: 4,
  sound: 'meow'
};
const dog = {
  ...cat,
  sound: 'woof'
};

console.log(dog); // => { legs: 4, sounds: 'woof' }
```

In the example above, `...cat` copies the properties of `cat` into a new object `dog`. `.sound` property receives the final value `'woof'`.  

This article guides through object spread and rest syntax. Including how object spread implements recipes like object *cloning*, *merging*, properties *overriding* and more.  

What follows is a short recap on enumerable properties, and how to distinguish own from inherited properties. These are necessary basics to understand how object spread and rest works.  

## 1. Enumberable and own properties

An object in JavaScript is an association between keys and values.  

The key type is usually a string, or a symbol. The value can be a primitive type (string, boolean, number, `undefined` or `null`), an object or a function.  

The following example uses the object literal (a.k.a. object initializer) to create an object:  

```javascript
const person = {
  name: 'Dave',
  surname: 'Bowman'
};
```

`person` object describes a person's name and surname.  

### 1.1 Enumerable properties

A property has several attributes to describe the value, also writable, enumerable and configurable states. See [Object properties in JavaScript](http://2ality.com/2012/10/javascript-properties.html) for more details.  

*Enumerable* attribute is a boolean that indicates whether the property is accessible when object's properties are enumerated. 

You can enumerate object properties using `Object.keys()` (to access own and enumerable properties), `for..in` statement (to access all enumerable properties), etc.    

Properties declared explicitly in an object literal `{ prop1: 'val1', prop2: 'val2' }` are enumerable. Let's see what enumerable properties `person` object contains:  

<div class="try-it-container">
  <a target="_blank" href="https://repl.it/@panzerdp/UnrulyYearlyAmericanlobster">Run demo</a>
  <div class="clear"></div>
</div>

```javascript
const keys = Object.keys(person);
console.log(keys); // => ['name', 'surname']
```
`.name` and `.surname` are enumerable properties of `person` object.  

Here comes the interesting part. *Object spread copies from the source **enumerable** properties:*  

<div class="try-it-container">
  <a target="_blank" href="https://repl.it/@panzerdp/DependentUnevenIberianmidwifetoad">Run demo</a>
  <div class="clear"></div>
</div>

```javascript
console.log({ ...person };// => { name: 'Dave', surname: 'Bowman' }
```

Now let's create a non-enumerable property `.age` on `person` object. Then see how spread behaves:   

<div class="try-it-container">
  <a target="_blank" href="https://repl.it/@panzerdp/SameFirmBlackrhino">Run demo</a>
  <div class="clear"></div>
</div>

```javascript{1-4}
Object.defineProperty(person, 'age', {
  enumerable: false, // Make the property non-enumerable
  value: 25
});
console.log(person['age']); // => 25

const clone = {
  ...person
};
console.log(clone); // => { name: 'Dave', surname: 'Bowman' }
```

`.name` and `.surname` enumerable properties are copied from source object `person` into `clone`.  But the non-enumerable `.age` is ignored.  

#### 1.2 Own properties

JavaScript embraces prototypal inheritance. Thus an object property can be either **own** or **inherited**.  

A property explicitly declared in the object literal is **own**. But a property that object receives from its prototype is **inherited**. 

Let's create an object `personB` and set its prototype to `person`:

<div class="try-it-container">
  <a target="_blank" href="https://repl.it/@panzerdp/MonumentalUnimportantAmericancrayfish">Run demo</a>
  <div class="clear"></div>
</div>

```javascript
const personB = Object.create(person, {  
  profession: {
    value: 'Astronaut',
    enumerable: true
  }
});

console.log(personB.hasOwnProperty('profession')); // => true
console.log(personB.hasOwnProperty('name'));       // => false
console.log(personB.hasOwnProperty('surname'));    // => false
```
`personB` object has an own property `.profession`, and inherits `.name` and `.surname` properties from its prototype `person`.  

*Object spread copies from source **own** properties*, ignoring the inherited ones:

<div class="try-it-container">
  <a target="_blank" href="https://repl.it/@panzerdp/OccasionalThirstyMinibeast">Run demo</a>
  <div class="clear"></div>
</div>

```javascript
const cloneB = {
  ...personB
};
console.log(cloneB); // => { profession: 'Astronaut' }
```

The object spread `...personB` copies from source object `personB`  only `.profession` own property. The inherited `.name` and `.surname` are ignored.  

> The object spread syntax copies from the source object **own and enumerable** properties. Same as returned by [Object.keys()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys) function.  

###2. Object spread properties

**Object spread** syntax within the object literal extracts from **source** objects own and enumerable properties, and copies them into the **target** object.   

```javascript
const targetObject = {
  ...sourceObject,
  property: 'Value'
};
```

As a side note, in many ways object spread syntax is equivalent to `Object.assign()`. The code above can be implement also this way:  

```javascript
const targetObject = Object.assign(
  { }, 
  sourceObject,
  { property: 'Value' }
);
```

An object literal can have multiple object spreads, in any combination with regular properties declaration:  

```javascript
const targetObject = {
  ...sourceObject1,
  property1: 'Value 1',
  ...sourceObject2,
  ...sourceObject3,
  property2: 'Value 2'
};
```
#### 2.1 Object spread rule: latter property wins  

When multiple objects are spread and some properties have same keys, how do the final the final set of values is calculated? The rule is simple: **latter spread property overwrites earlier properties that have the same key**.   

Let's continue with a few examples. The following object literal instantiates a cat:  

```javascript
const cat = {
  sound: 'meow',
  legs: 4
};
```

Let's play Dr. Frankenstein and transform this cat into a dog. Pay attention to the value of `.sound` property:  

<div class="try-it-container">
  <a target="_blank" href="https://repl.it/@panzerdp/LightgraySleepyRooster">Run demo</a>
  <div class="clear"></div>
</div>

```javascript
const dog = {
  ...cat,
  ...{
    sound: 'woof' // <----- Overwrites cat.sound
  }
};
console.log(dog); // => { sound: 'woof', legs: 4 }
```
The latter value `'woof'` overwrites earlier value `'meow'` (which comes from `cat` source object). This matches the rule that latter property overwrites the earliest properties with the same key.  

Same rule applies to regular properties of the object initializer:  

<div class="try-it-container">
  <a target="_blank" href="https://repl.it/@panzerdp/CloudyTotalAnophelesmosquito">Run demo</a>
  <div class="clear"></div>
</div>

```javascript
const anotherDog = {
  ...cat,
  sound: 'woof' // <---- Overwrites cat.sound
};
console.log(anotherDog); // => { sound: 'woof', legs: 4 }
```
The regular property `sound: 'woof'` wins because it is the latest.   

Now if you swap the spread objects relative position, the result is different:

<div class="try-it-container">
  <a target="_blank" href="https://repl.it/@panzerdp/CharmingAwfulChimneyswift">Run demo</a>
  <div class="clear"></div>
</div>

```javascript
const stillCat = {
  ...{
    sound: 'woof' // <---- Is overwritten by cat.sound
  },
  ...cat
};
console.log(stillCat); // => { sound: 'meow', legs: 4 }
```
The cat remains a cat. Although the first source object provides `.sound` property with value `'woof'`, it's overwritten by latter `'meow'` value from `cat` spread properties.  

The relative position of object spreads and regular properties is important. Such effect of spread syntax permits the implementation of recipes like object cloning, merging objects, filling with defaults.   

Let's details into these recipes.  

#### 2.2 Cloning an object  

Coning an object using spread syntax is short and expressive. The following example creates a clone of `bird` object:  

<div class="try-it-container">
  <a target="_blank" href="https://repl.it/@panzerdp/InsubstantialUnnaturalJabiru">Run demo</a>
  <div class="clear"></div>
</div>

```javascript
const bird = {
  type: 'pigeon',
  color: 'white'
};

const birdClone = {
  ...bird
};

console.log(birdClone); // => { type: 'pigeon', color: 'white' }
console.log(bird === birdClone); // => false
```
`...bird` inside the literal copies own and enumerable properties of `bird` into the target `birdClone`. As result, `birdClone` is a clone of `bird`.  

While cloning seems simple at first sight, there are a couple of nuances to be aware of.  

##### Shallow copy

Object spread does a *shallow copy* of the object. Only the object itself is cloned, while nested instances *are not cloned*.  

`laptop` has a nested object `laptop.screen`. Let's clone `laptop` and see how it affects the nested object:  

<div class="try-it-container">
  <a target="_blank" href="https://repl.it/@panzerdp/WellmadeEnlightenedTurtle">Run demo</a>
  <div class="clear"></div>
</div>

```javascript
const laptop = {
  name: 'MacBook Pro',
  screen: {
    size: 17,
    isRetina: true
  }
};
const laptopClone = {
  ...laptop
};

console.log(laptop === laptopClone);               // => false
console.log(laptop.screen === laptopClone.screen); // => true
```
The first comparison `laptop === laptopClone` is `false`. The main object is cloned correctly.  

However `laptop.screen === laptopClone.screen` evaluates to `true`. It means that `laptop.screen` and `laptopClone.screen` reference the same nested object that wasn't copied.  

The good news is that you can spread properties at any level. With little effort just clone the nested object too:  

<div class="try-it-container">
  <a target="_blank" href="https://repl.it/@panzerdp/CyanSoreColt">Run demo</a>
  <div class="clear"></div>
</div>

```javascript
const laptopDeepClone = {
  ...laptop,
  screen: {
     ...laptop.screen
  }
};

console.log(laptop === laptopDeepClone);               // => false
console.log(laptop.screen === laptopDeepClone.screen); // => false
```
An additional spread `...laptop.screen` ensures that the nested object is cloned too. Nice, now `laptopDeepClone` is a full clone of `laptop` object.  

##### The prototype is lost  

The code snippet below declares a class `Game`, and creates an instance of this class `doom`:

<div class="try-it-container">
  <a target="_blank" href="https://repl.it/@panzerdp/TediousProbableMuskox">Run demo</a>
  <div class="clear"></div>
</div>

```javascript
class Game {
  constructor(name) {
    this.name = name;
  }

  getMessage() {
    return `I like ${this.name}!`;
  }
}

const doom = new Game('Doom');
console.log(doom instanceof Game); // => true
console.log(doom.name);            // => "Doom"
console.log(doom.getMessage());    // => "I like Doom!"
```

Now let's clone `doom` instance that was created from a constructor invocation. This might lead to a surprise:  

<div class="try-it-container">
  <a target="_blank" href="https://repl.it/@panzerdp/HummingFatalEthiopianwolf">Run demo</a>
  <div class="clear"></div>
</div>

```javascript
const doomClone = {
  ...doom
};

console.log(doomClone instanceof Game); // => false
console.log(doomClone.name);            // => "Doom"
console.log(doomClone.getMessage());
// TypeError: doomClone.getMessage is not a function
```
`...doom` copies the own property `.name` into `doomClone`. And nothing more.  

`doomClone` is a plain JavaScript object which prototype is `Object.prototype`, but not `Game.prototype` as it might be expected. *Object spread doesn't preserve the prototype of source objects.*

Therefore calling `doomClone.getMessage()` throws a `TypeError`, since `doomClone` doesn't inherit `getMessage()` method.  

To fix the missing prototype indicate it manually using `__proto__`:  

<div class="try-it-container">
  <a target="_blank" href="https://repl.it/@panzerdp/PreciousGroundedJuliabutterfly">Run demo</a>
  <div class="clear"></div>
</div>

```javascript
const doomFullClone = {
  ...doom,
  __proto__: Game.prototype
};

console.log(doomFullClone instanceof Game); // => true
console.log(doomFullClone.name);            // => "Doom"
console.log(doomFullClone.getMessage());    // => "I like Doom!"
```
`__proto__` inside the object literal ensures that `doomFullClone` has the necessary prototype `Game.prototype`.  

*Don't try this at home*: `__proto__` is deprecated. I'm using it just for demonstration.  

Object spread lags on instances created from constructor invocation since it doesn't keep the prototype. The intention is to spread own and enumerable properties in a shallow manner, so the approach to ignore the prototype seems reasonable.  

As a side note, there's a more reasonable way to clone `doom` using `Object.assign()`:  

<div class="try-it-container">
  <a target="_blank" href="https://repl.it/@panzerdp/DecentUnsteadyGavial">Run demo</a>
  <div class="clear"></div>
</div>

```javascript
const doomFullClone = Object.assign(new Game(), doom);

console.log(doomFullClone instanceof Game); // => true
console.log(doomFullClone.name);            // => "Doom"
console.log(doomFullClone.getMessage());    // => "I like Doom!"
```

Ok, enough with prototypes. I promise.  

#### 2.3 Immutable object update

When the same object is shared across many places of an application, a direct modification of it might lead to unexpected side effects. Tracing such modifications is a tedious task.  

A better approach is to make operations immutable. Immutability keeps under better control object's modification and favors writing [pure functions](https://medium.com/@jamesjefferyuk/javascript-what-are-pure-functions-4d4d5392d49c). Even in complex scenarios it's easier to determine the source and reason of an object update, since data flows into a single direction.   

Object spread is convenient to modify objects in an immutable manner. Say you have an object that describes an edition of a book:

```javascript
const book = {
  name: 'JavaScript: The Definitive Guide',
  author: 'David Flanagan',
  edition: 5,
  year: 2008
};
```

Then a new 6th edition comes out. Object spread let's you program this scenario in an immutable manner:  

<div class="try-it-container">
  <a target="_blank" href="https://repl.it/@panzerdp/DistantWrongYak">Run demo</a>
  <div class="clear"></div>
</div>

```javascript
const newerBook = {
  ...book,
  edition: 6,  // <----- Overwrites book.edition
  year: 2011   // <----- Overwrites book.year
};

console.log(newerBook);
/*
{
  name: 'JavaScript: The Definitive Guide',
  author: 'David Flanagan',
  edition: 6,
  year: 2011
}
*/
```

`...book` inside the literal spreads properties of `book` object. The manually enumerated properties `edition: 6` and `year: 2011` set the updated property values.  

The significant property values are specified at the end, to match the spread rule that latter property value overwrites previous value with the same key.  

`newerBook` is a new object with updated properties. Meanwhile the original `book` remains intact. Immutability is satisfied.  

#### 2.4 Merging objects  

Merging is straightforward since you may spread properties of any number of objects. 

Let's merge 3 objects in order to create a composite:  

<div class="try-it-container">
  <a target="_blank" href="https://repl.it/@panzerdp/LightseagreenMatureItaliangreyhound">Run demo</a>
  <div class="clear"></div>
</div>

```javascript
const part1 = {
  color: 'white'
};
const part2 = {
  model: 'Honda'
};
const part3 = {
  year: 2005
};

const car = {
  ...part1,
  ...part2,
  ...part3
};
console.log(car); // { color: 'white', model: 'Honda', year: 2005 }
```
`car` object is created from merging three objects: `part1`, `part2` and `part3`.

Don't forget about the *latter property wins* rule. It gives the reasoning about merging multiple objects that have same keys.  

Let's change a bit the previous example. Now `part1` and `part3` have a new property `.configuration`:

<div class="try-it-container">
  <a target="_blank" href="https://repl.it/@panzerdp/RuralUnkemptDrake">Run demo</a>
  <div class="clear"></div>
</div>

```javascript
const part1 = {
  color: 'white',
  configuration: 'sedan'
};
const part2 = {
  model: 'Honda'
};
const part3 = {
  year: 2005,
  configuration: 'hatchback'
};

const car = {
  ...part1,
  ...part2,
  ...part3 // <--- part3.configuration overwrites part1.configuration
};
console.log(car); 
/*
{ 
  color: 'white', 
  model: 'Honda', 
  year: 2005,
  configuration: 'hatchback'  <--- part3.configuration
}
*/
```
The first object spread `...part1` sets the value of `.configuration` to `'sedan'`. Nevertheless the latter object spread `...part3` overwrites the previous `.configuration` value, making it finally `'hatchback'`.  

#### 2.5 Filling an object with defaults

An object can have different sets of properties on runtime. Some properties might be set, others might be missing.  

Such scenario can happen in case of a configuration object. User can specify only significant properties of the configuration, but unspecified properties are taken from defaults.  

Let's implement a `multiline(str, config)` function that breaks `str` into multiple lines at a given width.  

`config` object accepts the following optional parameters:

* `width`: number of characters at which to break. Defaults to `10`;
* `newLine`: string to add at the end of line. Defaults to `\n`;
* `indent`: string to intend the line. Defaults to empty string `''`.

A few examples of how `multiline()` works:  

<div class="try-it-container">
  <a target="_blank" href="https://repl.it/@panzerdp/FrankFirsthandBullfrog">Run demo</a>
  <div class="clear"></div>
</div>

```javascript
multiline('Hello World!');
// => 'Hello Worl\nd!'

multiline('Hello World!', { width: 6 });
// => 'Hello \nWorld!'

multiline('Hello World!', { width: 6, newLine: '*' });
// => 'Hello *World!'

multiline('Hello World!', { width: 6, newLine: '*', indent: '_' });
// => '_Hello *_World!'
```

`config` argument accepts different sets of properties: you can indicate 1, 2, or 3 properties, or even no properties at all.  

Using object spread is fairly simple to fill the configuration object with default values. Inside the object literal first spread the defaults object, then the config object:  

<div class="try-it-container">
  <a target="_blank" href="https://repl.it/@panzerdp/FrankFirsthandBullfrog">Run demo</a>
  <div class="clear"></div>
</div>

```javascript
function multiline(str, config = {}) {
  const defaultConfig = {
    width: 10,
    newLine: '\n',
    indent: ''
  };
  const safeConfig = {
    ...defaultConfig,
    ...config
  };
  let result = '';
  // Implementation of multiline() using
  // safeConfig.width, safeConfig.newLine, safeConfig.indent
  // ...
  return result;
}
```
Let's explore `safeConfig` object literal.  

Object spread `...defaultConfig` extracts properties from defaults. Then `...config` overwrites previous defaults with custom property values.  

As result `safeConfig` has the full set of properties that `multiline()` main code can use. No matter the input `config`, which can miss some properties, you are confident that `safeConfig` has the necessary values.  

Object spread's implementation of defaults is intuitive, which is great.    

#### 2.6 "We need to go deeper"  

The cool thing about object spread is the possibility to use on nested objects. That's a great readability win when updating a big object, and is recommended over `Object.assign()` alternative.  

The following `box` object defines a box of items:

```javascript
const box = {
  color: 'red',
  size: {
    width: 200, 
    height: 100 
  },
  items: ['pencil', 'notebook']
};
```
`box.size` describes the size of the box and `box.items` enumerates the items contained in the box.  

To make the box higher by increasing `box.size.height`, just spread properties on the nested object:  

<div class="try-it-container">
  <a target="_blank" href="https://repl.it/@panzerdp/DemandingShoddyInsect">Run demo</a>
  <div class="clear"></div>
</div>

```javascript
const biggerBox = {
  ...box,
  size: {
    ...box.size,
    height: 200
  }
};
console.log(biggerBox);
/*
{
  color: 'red',
  size: {
    width: 200, 
    height: 200 <----- Updated value
  },
  items: ['pencil', 'notebook']
}
*/
```

`...box` makes sure that `biggerBox` receives properties from `box` source.  

Updating height of nested object `box.size` requires an additional object literal `{ ...box.size, height: 200 }`. This literal spreads properties of `box.size` to a new object and updates height to `200`.  

I like the possibility to perform multiple updates through one statement.  

What about changing the color to `black`, increase the width to `400` and add a new item `ruler` (using [spread array](https://dmitripavlutin.com/how-three-dots-changed-javascript/#4improvedarraymanipulation))? That's easy:

<div class="try-it-container">
  <a target="_blank" href="https://repl.it/@panzerdp/ElectricLinearMayfly">Run demo</a>
  <div class="clear"></div>
</div>

```javascript
const blackBox = {
  ...box,
  color: 'black',
  size: {
    ...box.size,
    width: 400
  },
  items: [
    ...box.items,
    'ruler'
  ]
};
console.log(blackBox);
/*
{
  color: 'black', <----- Updated value
  size: {
    width: 400, <----- Updated value
    height: 100 
  },
  items: ['pencil', 'notebook', 'ruler'] <----- A new item ruler
}
*/
```  

#### 2.7 Spread `undefined`, `null` and primitives

When spreading properties an of `undefined`, `null` or a primitive value no properties are extracted, and no error is thrown. The result is a plain empty object:  

<div class="try-it-container">
  <a target="_blank" href="https://repl.it/@panzerdp/ForcefulFeminineKissingbug">Run demo</a>
  <div class="clear"></div>
</div>

```javascript
const nothing = undefined;
const missingObject = null;
const two = 2;

console.log({ ...nothing });       // => { }
console.log({ ...missingObject }); // => { }
console.log({ ...two });           // => { }
```

Object spread extracts no properties from `nothing`, `missingObject` and `two`.  

Of course, there is no reason to use object spread on primitive values.  

### 3. Object rest properties  

After extracting properties of an object to variables using a destructuring assignment, the remaining properties can be collected into a rest object.  

This is what object rest properties does nicely:  

<div class="try-it-container">
  <a target="_blank" href="https://repl.it/@panzerdp/PrimaryRawHagfish">Run demo</a>
  <div class="clear"></div>
</div>

```javascript
const style = {
  width: 300,
  marginLeft: 10,
  marginRight: 30
};

const { width, ...margin } = style;

console.log(width);  // => 300
console.log(margin); // => { marginLeft: 10, marginRight: 30 }
```

The destructuring assignment defines a new variable `width` and sets its value to `style.width`. Object rest `...margin` within destructuring assignment collects the rest of the properties `marginLeft` and `marginRight` into the object `margin`.  

Object rest collects only own and enumerable properties.  

Notice that object rest must be the last element in the destructuring assignment. 
Hence the code `const { ...margin , width  } = style` is invalid and would trigger a `SyntaxError: Rest element must be last element`.  

### 4. Conclusion  

Object spread has a few rules to remember: 

* It extracts own and enumerable properties from the source object  
* Latter spread property overwrites earlier ones with the same key

At the same time object spread is short and expressive, works nicely on nested objects, while keeping the immutability of updates. It enables easy implementation of objects cloning, merging and filling with default properties.  

Collecting the rest of properties after a destructuring assignment is achieved by  object rest syntax.  

Indeed object rest and spread properties are great additions to JavaScript.  

*What cool object rest/spread recipes do you know? Write a comment below!*  