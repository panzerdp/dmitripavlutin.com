
## Tip 1

How to fetch JSON from a remote API into the local state of a React component.  

#reactjs #fetch

Sign up to my newsletter to get more useful React.js tips: https://dmitripavlutin.com/newsletter/.

```jsx
import { useState, useEffect } from 'react'

function BasicFetch() {
  const [names, setName] = useState([])

  const fetchNames = async () => {
    const response = await fetch('/api/names/')
    setNames(await response.json())
  }
  useEffect(() => {
    fetchNames()
  }, [])

  return (
    <div>
      {names.map((name, i) => <div key={i}>{name}</div>)}
    </div>
  )
}
```

## Tip 2

How React.js useEffect() hook behaves depending on the deps argument.

#reactjs

Sign up to my newsletter to get more useful React.js tips: https://dmitripavlutin.com/newsletter/.

```javascript
useEffect(() => {
  // called after mounting
}, [])

useEffect(() => {
  // called after mounting
  // and after prop or state change
}, [prop, state])

useEffect(() => {
  // called after mounting
  // and after every re-rendering
})
```

## Tip 3

The arrow function doesn't define its own "this" value but resolves "this" value from the outer function.

#javascript

Sign up to my newsletter to get more useful JS tips: https://dmitripavlutin.com/newsletter/.

```javascript
const object = {
  method() {
    const func = () => {
      console.log(this === object) // logs true
    }
    func()
  }
}
object.method()
```

## Tip 4

Be careful when updating the state in an effect that depends on the same state: that can create an infinite loop.

#reactjs

Sign up to my newsletter to get more useful React.js tips: https://dmitripavlutin.com/newsletter/.

```jsx
import { useState, useEffect } from 'react'

function MyComponent() {
  const [count, setCount] = useState(0)
  
  useEffect(() => {
    // Ininite loop!
    setCount(c => c + 1)
  }, [count])
  
  // ...
}
```

## Tip 5

Many developers, including myself, tend to jump right away into coding. Understanding the problem well is usually secondary.

But I have found that understanding the problem first, before coding, makes me a more productive developer.  

Only a good understanding of the problem makes a good solution.

Test-Driven Development encourages you to think about the problem first.  That's why TDD makes you productive.  