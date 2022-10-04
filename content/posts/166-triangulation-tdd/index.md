---
title: "Triangulation in Test-Driven Development"
description: "How to use triangulation technique to guide the creation of generic code in test-driven development."  
published: "2022-09-26"
modified: "2022-09-26"
thumbnail: "./images/cover-2.png"
slug: triangulation-test-driven-development
tags: ['test-driven development', 'unit test']
recommended: ['frontend-architecture-stable-and-volatile-dependencies', '7-architectural-attributes-of-a-reliable-react-component']
type: post
---

Test-driven development (aka TDD) consists of 3 phases: the red, the green and the refactor.  

The transition from green to refactor phase involves generalization of the code under test. Especially if you've been using the [faking technique](https://www.qwan.eu/2021/07/20/tdd-faking-cheating.html) in the green phase.   

The idea of triangulation is to use 2 assertions to drive a safer creation of the generic code.  

Let's see in more detail how triangulation works.

*Note: if you're not familiar with test-driven development, I recommend checking [TDD in JavaScript video guide](https://www.youtube.com/watch?v=89Pl2Uok8xc) before continuing with the article.*

## 1. Example: develop a sum calculator

A good way to understand the benefits of the triangulation technique is to follow an example.  

Let's say that you'd like to create a simple function: calculate the sum of 2 numbers. And let's imagine that you're unsure whether the addition operator is the right way to implement the sum.  

### Step 1: red

When doing TDD, I always start with the simplest test possible. In this case, I'm going to import the sum function and check that it returns `undefined`.  

First, you need to write the unit test of the sum function:

```javascript
import { sum } from './sum'

describe('sum()', () => {
  it('should execute', () => {
    expect(sum()).toBeUndefined()
  })
})
```

Of course the test throws an error because the module `sum.js` doesn't exist.  

```
 FAIL  sum.spec.js
  ● Test suite failed to run

    Cannot find module './sum' from 'sum.test.js'
```

### Step 2: green

Let's then create the `sum.js` module exporting a simple function with an empty body:

```javascript
export function sum() {}
```

The unit test passes and I'm successfully in the green phase.  

```
 PASS  sum.spec.js
  sum()
    ✓ should execute (1 ms)
```


### Step 3: red

Now let's continue with the proper addition testing. Let's update the unit test to verify whether the function return correctly the sum of 2 numbers: `1` and `2`.

```javascript{4}
import { sum } from './sum'

describe('sum()', () => {
  it('should calculate sum', () => {
    expect(sum(1, 2)).toBe(3)
  })
})
```

Running the updated test triggers an assertion error because currently the `sum()` implementation does nothing.  

```
 FAIL  sum.spec.js
  sum()
    ✕ should calculate sum (3 ms)

  ● sum() › should calculate sum

    expect(received).toBe(expected) // Object.is equality

    Expected: 3
    Received: undefined

      3 | describe('sum()', () => {
      4 |   it('should calculate sum', () => {
    > 5 |     expect(sum(1, 2)).toBe(3)
        |                       ^
      6 |   })
      7 | })
      8 |
```

### Step 4: green

Because the green phase has to be passed as soon as possible (with any programming sins you can imagine), let's use a fake implementation and simply return `3`.

```javascript{1}
export function sum() {
  return 3
}
```

Now the fake function passes the unit test.  

```
 PASS  sum.spec.js
  sum()
    ✓ should calculate sum (2 ms)
```

### Step 5: red

In the previous 4 steps I followed the standard TDD. Nothing fancy.  

Now starts the interesting part. 

Instead of going to the refactor phase to write the sum implementation, and because I'm unsure that 1 assertion is enought to test my future generic code, let's get back to the red phase and write another assertion:

```javascript{5}
import { sum } from './sum'

describe('sum()', () => {
  it('should calculate sum', () => {
    expect(sum(1, 2)).toBe(3)
    expect(sum(3, 4)).toBe(7)
  })
})
```

This is the triangulation technique in practice: you use 2 assertions to drive the generalization of the code.  

Running the test fails because of the second assertion.  

```
 FAIL  sum.spec.js
  sum()
    ✕ should calculate sum (4 ms)

  ● sum() › should calculate sum

    expect(received).toBe(expected) // Object.is equality

    Expected: 7
    Received: 3

      4 |   it('should calculate sum', () => {
      5 |     expect(sum(1, 2)).toBe(3)
    > 6 |     expect(sum(3, 4)).toBe(7)
        |                       ^
      7 |   })
      8 | })
      9 |
```

### Step 6: green

Having the 2 assertions that check the future code, let's write the proper implemention of sum:

```javascript
export function sum(n1, n2) {
  return n1 + n2
}
```

The unit test succussfully pases. The addition code has been generated from the 2 assertions and now I have more confidence in the correctness of my generic solution.  

```
 PASS  sum.spec.js
  sum()
    ✓ should calculate sum (2 ms)
```

### Step 7: refactor

Now the generic code is created and the assertions prove it working. You can remove one of the assertions:

```javascript
import { sum } from './sum'

describe('sum()', () => {
  it('should calculate sum', () => {
    expect(sum(1, 2)).toBe(3)
  })
})
```

Of course, running the unit test still passes.

```
 PASS  sum.spec.js
  sum()
    ✓ should calculate sum (2 ms)
```

## 2. Triangulation

Having seen the triangulation in practice, let's formulate a simple definition of it.  

> *Triangulation* is a technique that involves writing 2 assertions to drive a safer creation of a more general implementation.  

In the previous example, the triangulation has been used in step 5 to force the creation of a more general solution in step 6.  

![Triangulation in Test-Driven Development](./images/triangulation-3.svg)

Now you might be asking yoursel: why exactly 2 assertions are necessary and why a single assertion is not enough?  

## 3. Example: things going wrong

Let's suppose an alternative path starting at the step 5 without using the triangulation technique. 

After faking in the step 4, you decide to go directly to refactor phase and throw a flawed generic solution. 

### Step 5: refactor (alternative)

Let's try the following generic solution:

```javascript{1}
export function sum(n) {
  return n + 2
}
```

What I've done is just throwing a simple but flawed generic solution. What's interesting, is that the unit test, the one defined in step 4 with 1 assertion: `expect(sum(1, 2)).toBe(3)`, still passes!

```
 PASS  sum.spec.js
  sum()
    ✓ should calculate sum (2 ms)
```

But having used the triangulation technique here, the flawed generic solution wouldn't have passed the unit test with 2 assertions:

```javascript
// ...
  expect(sum(1, 2)).toBe(3); 
  expect(sum(3, 4)).toBe(7)
// ...
```

The triangulation technique can be helpful when you're unsure about your generic solution. Having 2 assertions can give you more confidence
that the generic code you created is correct.  

## 4. Conclusion

I like the triangulation technique because it can ease the creation of the generic code, having less misses along the way.  

You will find the technique useful when you're not sure about the correctness of the generic code you want to write. Having 2 assertions can give you more confidence.  