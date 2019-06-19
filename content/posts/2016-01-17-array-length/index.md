---
title: "The magic behind array length property"
description: "Everything you need about Array.prototype.length in JavaScript: how to correctly query, modify and avoid potential problems. Lots of code samples."
published: "2016-01-17"
modified: "2016-01-17"
thumbnail: "./images/cover.jpg"
slug: the-magic-behind-array-length-property
tags: ["javascript", "array"]
recommended: ["power-up-the-array-creation-in-javascript", "how-to-iterate-easily-over-object-properties-in-javascript"]
type: post
---

Developer deals with arrays every day. Being a collection, an important property to query is the number of items: `Array.prototype.length`.  
In JavaScript the `length` does not always indicate the number of existing elements (for sparse arrays) and modifying this property may remove elements.  
Let's demystify the magic behind this property.

> `length` of an array is an unsigned, 32-bit integer that is numerically greater than the highest index in the array.

This property behaves differently for specific array types. Let's enumerate them:
An array is **dense** when it's elements have contiguous indexes starting at `0`. For example `[1, 3, 4]` is dense, because the indexes are contiguous: `0`, `1` and `2`.
An array is **sparse** when it's elements don't have contiguous indexes starting at `0`. For example `[1, , 4, 6]` is sparse, because elements indexes are not contiguous: `0`, `2` and `3`.

## Length as the number of elements in array
The common usage of the `length` is to determine the number of elements. This is correct for *dense* collection type:

```javascript
var fruits = ['orange', 'apple', 'banana']; //fruits is a dense array
fruits.length // prints 3, the real count of elements

fruits.push('mango');
fruits.length // prints 4, one element was added

var empty = [];
empty.length // prints 0, empty array
```

[See the example in JS Bin](http://jsbin.com/rewopa/4/edit?js,console)

The dense array does not have empties and the number of items corresponds to `highestIndex + 1`. In `[3, 5, 7, 8]` the highest index is `3` of element `8`, thus the array size is `3 + 1 = 4`.

## Length as a number bigger than highest index
In a *sparse* array the `length` is greater than the highest index, but it does not indicate the real number of elements. When querying `length `, it's bigger than elements count. It happens because of the gaps in the array.

```javascript
var animals = ['cat', 'dog', , 'monkey']; // animals is sparse
animals.length // prints 4, but real number of elements is 3

var words = ['hello'];
words[6] = 'welcome'; //the highest index is 6. words is sparse
words.length //prints 7, based on highest index
```
When adding or removing elements, `length` is mutated based on the highest index only. Any array modifications that do not affect the highest index do not modify `length`, for example when using `delete`.

```javascript
var colors = ['blue', 'red', 'yellow', 'white', 'black'];
colors.length // prints 5

delete colors[0]; // remove the first element 'blue'. 
                  // The array becomes sparse

colors.length // still prints 5, because the highest index 4 
              // wasn't modified
```

[See the example in JS Bin](http://jsbin.com/fitamih/3/edit?js,console)

## Length modification
In the previous explanations, the `length` was read-only. But JavaScript allows to modify this property also.
Length modification affects the array, depending on the new value and existing highest index. It can remove elements or make the array sparse.  
When the new `length` number is less or equal than the highest index, any elements whose index is greater or equal than the new size are removed. An useful scenario to remove elements from the end of array.

```javascript
var numbers = [1, 3, 5, 7, 8];

numbers.length = 3; // modify the array length
numbers // prints [1, 3, 5], elements 7 and 8 are removed
```
If using a number greater than the highest index (or using a number bigger than current `length`), the array will become sparse. It's rarely useful.

```javascript
var osTypes = ['OS X', 'Linux', 'Windows'];

osTypes.length = 5; // creating a sparse array. Elements at indexes 3 and 4
                    // do not exist

osTypes // prints ['OS X', 'Linux', 'Windows', , , ]
```

[See the examples in JS Bin](http://jsbin.com/nazara/4/edit?js,console)

It's possible to assign a different type than number to `length`. JavaScript will convert the primitive to a number. If the conversion result is `NaN` or number less than `0`, an error is thrown `Uncaught RangeError: Invalid array length`.

```javascript
var numbers = [1, 4, 6, 7];
numbers.length = '2'; // '2' is converted to number 2
numbers.length = 'not-number'; // throws Uncaught RangeError: Invalid array length
numbers.length = -2; // throws Uncaught RangeError: Invalid array length
```

## Code safely
Modifying the array `length`, removing elements  with `delete`, adding elements with `[newIndex]` are sources of potential problems by creating sparse arrays. And as result an inconsistent `length` value. 
JavaScript offers safer alternatives.  

To add elements to the end of an array use [Array.prototype.push()](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/push) and to remove the latest [pop()](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/pop).
To insert an element to the beginning use [unshift()](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/unshift) and to remove the first one [shift()](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/shift).
For more complex insertions, deletions or replacements, [splice()](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/splice) is powerful enough too.

```javascript
var companies = ['Apple', 'Dell'];

companies.push('ASUS'); // Adds an element to the end
companies // prints ['Apple', 'Dell', 'ASUS']

companies.pop();  // prints "ASUS". Removes the last element
companies // prints ['Apple', 'Dell']

companies.shift(); // prints "Apple". Removes the first array element
companies // prints ["Dell"]

companies.splice(1, 0, "Microsoft", "HP"); // Add 2 companies
companies // prints ["Dell", "Microsoft", "HP"]

companies.length // prints 3. The array is dense 
```

[See the examples in JS Bin](http://jsbin.com/daxedey/2/edit?js,console)

There are rare situations when the array can be sparse. It's not safe to rely on the `length` to determine the number of elements. Just use a helper function which handles the missing elements:

```javascript
/**
 * Count the number of elements in a sparse array
 * @param {Array} collection
 * @return {number}
 */
function count(collection) {
  var totalCount = 0;
  for (var index = 0; index < collection.length; index++) {
    if (index in collection) {
      totalCount++;
    }
  }
  return totalCount;
}
```
`in` operator determines if the object has a property. It works perfectly to check if an element exists at specific index.

## Conclusion

As seen in the article, `length` is a property with complex behavior.  
Mostly it works without surprises, but it's better to take precautions when dealing with sparse arrays and modifying the `length`.  
An alternative is avoid at all modifying this property and use the `splice()` method.

**See also**  
[Array.prototype.length](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/length)  
[Sparse arrays vs dense arrays](http://www.2ality.com/2012/06/dense-arrays.html)