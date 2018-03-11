---
title: "Make your Swift code expressive: addition operator use cases"
date: "2016-12-14"
thumbnail: "./images/cover.jpg"
slug: make-your-swift-code-expressive-addition-operator-use-cases
tags: ["swift"]
draft: false
---

I like reading short and expressive code. Because developer spends more time reading code than writing, expressiveness often is obligatory.  

Unless shortness does not obscure the intent, I favor concise expressions over longer ones. For example:

<div class="try-it-container">
  <a target="_blank" href="http://swiftlang.ng.bluemix.net/#/repl/582ee1d570e69c1e50985774">Try in Swift sandbox</a>
  <div class="clear"></div>
</div>

```swift
import Foundation

let greeting = "Hello, "  
let who = "World"

let message1 = greeting + who  
let message2 = greeting.appending(who)  
print(message1) // => "Hello, World"  
print(message2) // => "Hello, World"  
```

The sample shows 2 options to concatenate strings: using addition operator `+` or `appending(_)` string method.  
What option do you like more? I guess the concise one `greeting + who`.  

The operator overloading in Swift enables to write short expressions. Many types like `Int`, `String`, `Array` overload addition (`+`) and addition assignment (`+=`) operators. It makes the manipulation of the corresponding types more intuitive.  

Would you like to write expressive code? I'm sure you do! So let's continue with an interesting list of types that support operator overloading for `+` and `+=`.  
The alternative methods with the same behavior are also presented, for comparison purposes.  

##1. Sum numbers

Obviously the regular usage of addition operator is meant to perform arithmetic addition on numbers. For instance, `4 + 8` is evaluated to `12`.

Because Swift is type-safe, you can apply `+` and `+=` operators when both operands are exactly the same type (`Int + Int`, but not `UInt + Int` or `Float + Int`).  

All Swift number types `Int`, `Float`, `Double` and others support addition operators. Let's see a sample:  
<div class="try-it-container">
  <a target="_blank" href="http://swiftlang.ng.bluemix.net/#/repl/582c8666a1187913c8d30382">Try in Swift sandbox</a>
  <div class="clear"></div>
</div>

```swift
var x = 5
let y = 3
print(x + y) // => 8
x += y
print(x)     // => 8
```

`x + y` performs an arithmetic addition of two integers. Plain and simple.  
The expression `x += y` mutates `x` variable by appending `y` to it (same as `x = x + y`). During this operation `x` is mutated, so it must declared as a variable with `var`.  

The equivalent methods of addition operators are `adding(_:)` and the mutating `add(_:)`. These methods are available for `Float` and `Double`, but not for `Int`.  
Let's see them in action:  

<div class="try-it-container">
  <a target="_blank" href="http://swiftlang.ng.bluemix.net/#/repl/582c8675a1187913c8d30383">Try in Swift sandbox</a>
  <div class="clear"></div>
</div>

```swift
var p = 5.0
let r = 3.0
print(p.adding(r)) // => 8.0
p.add(r)
print(p)           // => 8.0
```

`p` and `r` are `Double` type.  
The invocation of `p.adding(r)` is the same as `p + r`. Respectively `p.add(r)` mutates `p` and is equivalent to `p += r`.

##2. Concatenate strings

The addition and addition assignment operators can perform strings concatenation. For instance, `"abc" + "def"` creates a string `"abcdef"`.  

Let's see an example:   

<div class="try-it-container">
  <a target="_blank" href="http://swiftlang.ng.bluemix.net/#/repl/582c868aa1187913c8d30384">Try in Swift sandbox</a>
  <div class="clear"></div>
</div>

```swift
var message = "Hello "
let name = "Batman"
print(message + name) // => "Hello Batman"
message += name
print(message)        // => "Hello Batman"
```

`message + name` concatenates two strings.  
The statement `message += name` also performs a concatenation. It modifies `message` in place by appending to its end `name` string.  

You can also use equivalent methods `appending(_:)` and mutating `append(_:)`, which are more verbose. Let's transform the above example:

<div class="try-it-container">
  <a target="_blank" href="http://swiftlang.ng.bluemix.net/#/repl/582c869ea1187913c8d30385">Try in Swift sandbox</a>
  <div class="clear"></div>
</div>
```language-swift
var message = "Hello "
let name = "Batman"
print(message.appending(name)) // => "Hello Batman"
message.append(name)
print(message)                 // => "Hello Batman"
```
The invocation `message.appending(name)` concatenates `message` and `name`, returning the result. `message` variable is not modified.  
The invocation `message.append(name)` is mutating the `message` variable and appends to its end `name` string.  

##3. Concatenate arrays

Addition operators are useful to concatenate arrays. `[val1, val2] + [val3]` creates `[val1, val2, val3]`.

The concatenated arrays must have elements of the same type. 

<div class="try-it-container">
  <a target="_blank" href="http://swiftlang.ng.bluemix.net/#/repl/582c86b5a1187913c8d30386">Try in Swift sandbox</a>
  <div class="clear"></div>
</div>

```swift
var colors = ["white"]
let darkColors = ["black", "gray"]
print(colors + darkColors) // => ["white", "black", "gray"]
colors += darkColors
print(colors)              // => ["white", "black", "gray"]
```

The expression `colors + darkColors` creates a new array that contains elements from `colors` followed by elements from `darkColors`.  
`colors += darkColors` mutates the `colors` array in place, by adding to its tail elements from `darkColors`.  

Alternatively you can use the mutating `append(contentsOf:_)`, which is an equivalent of addition assignment operator (`+=`). Transforming the above example:

<div class="try-it-container">
  <a target="_blank" href="http://swiftlang.ng.bluemix.net/#/repl/582c86c6a1187913c8d30387">Try in Swift sandbox</a>
  <div class="clear"></div>
</div>

```swift
var colors = ["white"]
let darkColors = ["black", "gray"]
colors.append(contentsOf: darkColors)
print(colors) // => ["white", "black", "gray"]
```

The invocation of `colors.append(contentsOf: darkColors)` modifies `colors` in place and appends the elements of `darkColors`.  

##4. Add time interval to a date

The addition operator enables expressively to add intervals to a `Date`. The expression `date + timeInterval` creates a new `Date` with a specified amount of time added to it. 
The addition assignment modifies the date in place `date += timeInterval`.  

Let's see how it can be done:

<div class="try-it-container">
  <a target="_blank" href="http://swiftlang.ng.bluemix.net/#/repl/582c86d9a1187913c8d30388">Try in Swift sandbox</a>
  <div class="clear"></div>
</div>

```swift
import Foundation

let interval: TimeInterval = 60 * 60 * 24
let dateFormatter = DateFormatter()
dateFormatter.dateFormat = "yyyy-MM-dd"

if let date = dateFormatter.date(from: "2017-02-15") {
   let dayAfter = date + interval   
   print(dateFormatter.string(from: dayAfter)) // => 2017-02-16
}
```

`oneDay` is an interval that contains the number of seconds in 24 hours. `dateFormatter` creates a date for `2017-02-15`.  
The expression `date + oneDay` evaluates to a new date `dayAfterDate` that is created from `date` with `oneDay` time interval added to it.  

If you want to modify `date` directly, make it a variable and use addition assignment operator `+=`:  

<div class="try-it-container">
  <a target="_blank" href="http://swiftlang.ng.bluemix.net/#/repl/582c8712a1187913c8d30389">Try in Swift sandbox</a>
  <div class="clear"></div>
</div>

```swift
/* ... */
if var date = dateFormatter.date(from: "2017-02-15") {
   date += interval   
   print(dateFormatter.string(from: date)) // => 2017-02-16
}
```

`date =+ oneDay` mutates `date` by adding `oneDay` seconds to it.  

The `Date` methods that provide the same behavior are `addingTimeInterval(_:)` and the mutating `addTimeInterval(_:)`.  

#### Tip about calendar

The provided way to modify a date adjusts absolute values. You may have unexpected results when adding longer time intervals like weeks or months.  

Most of the times `Calendar` usage is preferable. It provides accurate date modifications according to daylight saving time, months with different numbers of days, and so on. 

Let's update the above example and use a calendar instance `Calendar.current`:

<div class="try-it-container">
  <a target="_blank" href="http://swiftlang.ng.bluemix.net/#/repl/582c8725a1187913c8d3038a">Try in Swift sandbox</a>
  <div class="clear"></div>
</div>

```swift
import Foundation

let interval = 60 * 60 * 24
let dateFormatter = DateFormatter()
dateFormatter.dateFormat = "yyyy-MM-dd"

if let date = dateFormatter.date(from: "2017-02-15") {
   let calendar = Calendar.current
   let dayAfter = 
     calendar.date(byAdding: .second, value: interval, to: date)!
   print(dateFormatter.string(from: dayAfter)) // => 2017-02-16
}
```

##5. Sum measurements

A recent Foundation update introduced [measurements and units](https://developer.apple.com/reference/foundation/measurement). It allows to represent distances (for instance `10 miles`, `12 kilometers`), weights (`8 kg`) and more.  

The good part is that `Measurement` structure overloads `+` operator (and additionally `* - / < ==`).  This makes measurement manipulations easy and concise.

Let's sum two distances in kilometers:

<div class="try-it-container">
  <a target="_blank" href="http://swiftlang.ng.bluemix.net/#/repl/582c874ca1187913c8d3038b">Try in Swift sandbox</a>
  <div class="clear"></div>
</div>

```swift
import Foundation

let morningRun = Measurement(value: 3, unit: UnitLength.kilometers)
let eveningRun = Measurement(value: 5, unit: UnitLength.kilometers)
let dailyRun = morningRun + eveningRun
print(dailyRun) // => '8000.0 m'
```

`morningRun` and `eveningRun` describe the distance someone ran in the morning and evening.  
Plain and simple the addition operator is used to find the daily run distance: `morningRun + eveningRun`.  

The addition operation must sum measurements that describe the same type of physical units (length, mass, speed and [more](https://developer.apple.com/reference/foundation/dimension)).  

For instance, it doesn't make sense to sum speed and mass values. In such case Swift triggers an error:  

<div class="try-it-container">
  <a target="_blank" href="http://swiftlang.ng.bluemix.net/#/repl/582c8764a1187913c8d3038c">Try in Swift sandbox</a>
  <div class="clear"></div>
</div>

```swift
import Foundation

let turtleSpeed = Measurement(value: 3, unit: UnitLength.kilometers)
let turtleWeight = Measurement(value: 100, unit: UnitMass.grams)
print(turtleSpeed + turtleWeight) 
// Error: binary operator '+' cannot be applied to operands of 
// type 'Measurement<UnitLength>' and 'Measurement<UnitMass>'
```

`turtleSpeed` and `turtleWeight` are measurements that holds different type of units: `UnitLength.kilometers` and `UnitMass.grams`. These are not compatible, and as result Swift triggers an error.  

`Measurement` structure does not provide methods for manipulation. In this case you have to use operators only.  
In my opinion it's a nice decision, because operators fits good with measurements.  

##6. Conclusion

As seen, the addition and addition assignment operators provide short and concise syntax.  

Generally these are used to sum numbers and concatenate strings.  

You can also benefit from a concise syntax when concatenating arrays, manipulating dates and sum measurements.  

*Do you know other Swift types that implement addition operator overloading? Feel free to write a comment bellow!*

**You might be interested to read:**  
[Mastering Swift: essential details about strings](https://rainsoft.io/mastering-swift-essential-details-about-strings/)  
[Coding like Shakespeare: practical function naming conventions](https://rainsoft.io/coding-like-shakespeare-practical-function-naming-conventions/)  
[Useful details about underscore keyword in Swift](https://rainsoft.io/useful-details-about-underscore-keyword-in-swift/)