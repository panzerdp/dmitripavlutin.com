---
title: "Must Know Details about ES2016 Features"
description: "ES2016 is a small but important release. Examine the must know details about the new array method includes() and the exponentiation operator."
published: "2016-07-12"
modified: "2016-07-12"
thumbnail: "./images/cover.jpg"
slug: must-know-details-about-es2016-features
tags: ["javascript", "es2016"]
recommended: ["make-your-javascript-code-shide-knockout-old-es5-hack", "object-rest-spread-properties-javascript"]
type: post
---

Good news, in June 2016 [ECMAScript 2016](http://ecma-international.org/ecma-262/7.0/) was approved. It contains the features that passed the stage 4, which means finished, of the [TC39 process](https://tc39.github.io/process-document/):

* The array method [`includes()`](http://ecma-international.org/ecma-262/7.0/#sec-array.prototype.includes)
* The [exponentiation operator](http://ecma-international.org/ecma-262/7.0/#sec-applying-the-exp-operator) `base ** exponent`

This edition is smaller than [ECMAScript 2015](http://www.ecma-international.org/ecma-262/6.0/), but it doesn't mean less important. Still it has  details that you should know before using the new features.    

The new method `array.includes(item, [fromIndex])` allows to determine if an array contains a specific element.  The precedent approach, less comfortable, to verify an element existence is to use `array.indexOf(item) !== -1`.  
The difference between the two of course is the shorter usage of `include()`. However these methods use different equality algorithms and threat variously the empty slots in array. 

The exponentiation operator `**` has edge cases when it comes to `NaN`.

The current article covers the details about ES2016 features with informative examples. Also it makes a comparison with older approaches in terms of compatibility, so you could migrate JavaScript code without surprises.  

*Before I continue, allow me to make a recommendation.* 

*If you want to significantly improve your JavaScript knowledge, I recommend the amazingly useful ["Modern JavaScript From The Beginning 2.0"](https://www.traversymedia.com/a/2147528886/FqXWyazh) by Brad Traversy. Use the coupon code "DMITRI" and get up to 20% discount!*

## 1. The array method includes()

The array method `includes(element, [fromIndex])` determines whether an array contains a specific `element` and returns the corresponding *boolean* (`true` if `element` is found, `false` otherwise). An optional argument `fromIndex` allows to search from a specific index.  

Let's see some basic examples:

```javascript
let months = ['June', 'July', 'August'];
months.includes('June');    // => true
months.includes('January'); // => false
```
`'June'` element exists in `months` array, so `includes()` method returns `true`. For a non available `'January'` element, the method returns `false`.

Notice that `includes()` requires the searched element to match by type, because it uses for comparison the [same value zero algorithm](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero) (a slight modified version of strict equality):

```javascript
let items = ['1', 5, 8];
items.includes(1); // => false
items.includes(8); // => true
``` 
`items` contains a string `'1'`. However when searching for a number `items.includes(1)` there is no match (`false` is returned), because `'1'` and `1` are different types (string and number correspondingly).

When searching for objects, the method will match only references to the same object:  

```javascript
class Season {
  constructor(name) {
    this.name = name;    
  }
}
let winter = new Season('Winter');
let summer = new Season('Summer');
let seasons = [winter, new Season('Summer')];
seasons.includes(winter); // => true
seasons.includes(summer); // => false
```
`seasons.includes(winter)` returns `true`, because `winter` variable is an object reference contained in `seasons`.  
On the other hand `seasons.includes(summer)` returns `false`, since the collection does not have an item that references `summer` object. `new Season('Summer')` (indicated in the array literal) is a reference to a different instance, thus not equal to `summer`.  

The `includes()` method is available in [typed arrays](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays) too:

```javascript
let int8Array = Int8Array.from([17, 25]);
int8Array.includes(17); // => true
```

### 1.1 Searching from an index

The method `array.includes(element, [fromIndex])` accepts a second optional parameter `fromIndex`, which enables searching from a specific index:

* For a number greater or equal to zero and less than array length, it indicates the index to start the search.
* For a number greater or equal to the array length, `includes()` always returns `false`.
* For a negative number, the search starts from a computed index:  `array.length + fromIndex`.
* If not specified, it defaults to `0`.  

Let's follow an example:

```javascript
let countries = ['UK', 'USA', 'Ireland', 'France'];
countries.includes('UK', 1);      // => false
countries.includes('Ireland', 1); // => true
countries.includes('USA', 6);     // => false
```

`'UK'` element has index `0` in `countries`. However the search starts from `1` and the index `0` is skipped, so the element is not found.  
`'Ireland'` has index `2`, thus the search `countries.includes('Ireland', 1)` from index `1` is able to find it.   
The `'USA'` element is checked from index `6`, which is bigger than the array length `4`. `includes()` method for such situations returns `false`.  

For a negative from index parameter, the search starts from `array.length + fromIndex` up to the end of array:

```javascript
let numbers = [56, 11, 58, 89, 100];
numbers.includes(11, -2); // => false
numbers.includes(89, -2); // => true
```
The index to begin searching parameter is a negative number `-2` and the search starts from index `5 - 2 = 3`. The searched `11` is compared only with `89` and `100` elements, so there is no match.  
When searching for `89` element with the same `-2` offset, it is a match.

### 1.2 Searching for NaN

`includes()` method uses [same value zero comparison](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero) algorithm (see [here](https://github.com/tc39/Array.prototype.includes/#why-samevaluezero) why), which is a modified version of the [strict equality comparison](http://ecma-international.org/ecma-262/7.0/#sec-strict-equality-comparison). 
The main difference between the two is `NaN` with `NaN` equality consideration: 

* Same value zero considers that `NaN` is **equal** with `NaN`
* Strict equality considers that `NaN` is **not equal** with `NaN`

Because `includes()` uses the *same value zero comparison*, it is possible to identify `NaN` elements:

```javascript
let weirdNumbers = [-1, 100, NaN];
weirdNumbers.includes(NaN); // => true
```
`weirdNumbers` contains a `NaN`, so `includes()` method is able to find it.

[`indexOf()`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/indexOf) array method has a different behavior in this situation, because it [uses](http://ecma-international.org/ecma-262/7.0/#sec-array.prototype.indexof) the *strict equality comparison*. Even if the array contains `NaN`, `indexOf()` returns `-1` (meaning element not found):  

```javascript
let weirdNumbers = [-1, 100, NaN];
weirdNumbers.indexOf(NaN); // => -1
NaN === NaN;               // => false
```
`weirdNumbers` contains `NaN`, however `indexOf()` returns `-1`.  
Strict equality operator `===` uses the same comparison algorithm, so `NaN === NaN` is `false` too.

Even if `includes()` can find `NaN`, it is best to code your application not to generate `NaN` (which indicates that a wrong operation on numbers was applied).  

### 1.3 Searching in a sparse array

An array in JavaScript is *sparse* when it contains empty slots (a.k.a. holes), i.e. the elements do not have contiguous indexes starting from `0`.  Sparse arrays can be created using:

* An array literal with missing element between commas `[4, ,5]`
* An array constructor `new Array(n)`, where `n` is a number 
* After applying `delete array[index]` operator  

Let's see how an array literal creates a sparse array:

```javascript
let sparseArray = [1, , 3];
sparseArray[1]; // => undefined
sparseArray[2]; // => 3
```
`sparseArray` contains an empty slot at index `1`. Accessing an empty slot `sparseArray[1]` evaluates to `undefined`.  

`includes()` method **does not skip** the holes in array during the search iteration. Because accessing a hole evaluates to `undefined`, calling `includes(undefined)` returns a match when a hole is encountered:  

```javascript
let sparseArray = [1, , 3];
sparseArray.includes(undefined); // => true
```
Since `sparseArray` has an empty slot at index `1`, executing `sparseArray.includes(undefined)` returns `true`.

Many other array methods **do skip** the empty slots, as their array iteration algorithm verifies if the element exists.  
This rule applies to `indexOf()` method too:  

```javascript
let sparseArray = [1, , 3];
sparseArray.indexOf(undefined); // => -1
```
`indexOf()` method returns `-1` when searching for `undefined` in an array with holes.  

Of course, the general rule is to avoid at all dealing with sparse arrays.

### 2. The exponentiation operator

The exponentiation operator `base ** exponent` raises the `base` to the power `exponent`. 

Let's consider some examples:

```javascript
2 ** 3;   // => 8
5 ** 2;   // => 25
0.5 ** 1; // => 0.5
```

The appropriate equivalent of this operator is `Math.pow(base, exponent)` function.  

It is possible to combine the exponentiation with an assignment `**=` for a shorter form:

```javascript
let num = 2;
num **=4;
num; // => 16
```

When combining the unary minus operator `-number` with the exponentiation: `-x ** y`, JavaScript first evaluates `x` to power `y`, then applies the minus sign to the result. Exponentiation has a higher priority over the unary minus operator.  
The execution of `-x ** y` is equivalent to `-(x ** y)`. For instance `-5 ** 2` equals to `-25`.  

### 2.1 Exponent special cases

Any number, including `NaN`, powered to `0` exponent evaluates to `1`:

<div class="try-it-container">
  <a target="_blank" href="http://jsbin.com/gofaho/2/edit?js,console">Try in JS Bin</a>
  <div class="clear"></div>
</div>
```javascript
25 ** 0;       // => 1
NaN ** 0;      // => 1
Infinity ** 0; // => 1
```

If the exponent is `NaN`, the exponentiation result is always `NaN`, for any base value:

```javascript
25 ** NaN;  // => NaN
-5 ** NaN;  // => NaN
NaN ** NaN; // => NaN
```

### 3. Finale

ECMAScript 2016 does not introduce big changes in the language. But it's the beginning of the JavaScript certain progress in smaller steps.  

Without doubt `includes()` is a long-awaited method to check the existence of an element. The workaround used before that `indexOf(item) !== -1` is not a comfortable alternative.  

`includes()` method handles differently `NaN` and empty slots in arrays. In my opinion it evaluates these situations better and more predictable. 
In the end it's ok to return `true` when searching `NaN` value in an array that contains a `NaN`, instead of `-1` (missing) like `indexOf()` does.  

You probably won't deal a lot with the exponentiation operator, however a short form to raise to power it's nice to have in the pocket.

We, developers, are creating the future of JavaScript. If you have an interesting idea about a new language feature, do not hesitate to [contribute to ECMAScript](https://github.com/tc39/ecma262/blob/master/CONTRIBUTING.md).  

*In your opinion, what important feature JavaScript still misses? Feel free to write a comment below.*