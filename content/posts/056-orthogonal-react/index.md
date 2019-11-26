---
title: "Strive to orthogonal React components"
description: "How to design components that are easy to change, maintain, and test? Strive to orthogonal React components."
published: '2019-11-26T13:00Z'
modified: '2019-11-26T13:00Z'
thumbnail: './images/lego.png'
slug: orthogonal-react-components
tags: ['react', 'component', 'architecture']
recommended: ['7-architectural-attributes-of-a-reliable-react-component', 'the-art-of-writing-small-and-plain-functions']
type: post
commentsThreadId: orthogonal-react-components
---

About 5 years ago, I was developing a cross-platform mobile application for a European startup. The first series of features were easy to implement. I was progressing well and was happy about that.    

6 months passed by. More features were added on top of previous ones. Step by step, making new changes to existing modules became increasingly harder.  

At some point, I had started rejecting a part of new features or changes because they would require too much time to be implemented. The story had ended with a whole rewrite of the mobile apps to the native platform, mainly because further maintenance would require too many costs.  

I blamed the bugs in the cross-platform framework, blamed that client had been changing requirements, and so on. But these weren't the main problem.  

*I overlooked the importance of making my components easy to change.* I didn't follow the principles of good component's design that would allow me to easily make changes, implement new requirements: have a codebase that's reasonable to maintain.  

My story concludes that every developer must know good design principles. One particularly influential is orthogonal design.  

## 1. Orthogonal components

Orthogonal design means that your components have to change in isolation. If you make a particular change, like a UI update, it doesn't have to be echoed into other layers of the application, like data fetching logic.  

When the components are not orthogonal, or tightly coupled, any change to a component might be echoed in another part of the application. Catching these side effects might be easy at first, but as you add more and more features what you would be doing is fighting these side effects, rather than implement new features.  

## 2. Scenario 1: Isolate fetch logic

Let's say you need to fetch a list of employees. One version of `<EmployeesPage>` could be as follows:

```jsx{16-17}
import EmployeesList from "./EmployeesList";
import axios from "axios";

class EmployeesPage extends Component {
  constructor(props) {
    super(props);
    this.state = { employees: [], isFetching: true };
  }

  componentDidMount() {
    this.fetch();
  }

  async fetch() {
    this.setState({ isFetching: true });
    const apiUrl = 'http://my-app.com/api/employees/';
    const employees = await axios.get(apiUrl);
    this.setState({ employees, isFetching: false });
  }

  render() {
    const { isFetching, employees } = this.state;
    if (isFetching) {
      return <div>Fetching employees....</div>;
    }
    return <EmployeesList employees={employees} />;
  }
}
```

The problem with the current implementation is that `<EmployeesPage>` depends on how data is fetched, particularly it knows that `axios` library is used. What is at some point you'd like to switch to another fetching library, or what if axios library changes by itself?  

Let's isolate the fetch logic details from how fetched data is rendered.  

A good way to do this is to use the new Suspense feature of React:

```jsx
import React, { Suspense } from "react";
import EmployeesList from "./EmployeesList";

function EmployeesPage({ resource }) {
  return (
    <Suspense fallback={<h1>Fetching employees....</h1>}>
      <EmployeesFetch resource={resource} />
    </Suspense>
  );
}

function EmployeesFetch({ resource }) {
  const employees = resource.employees.read();
  return <EmployeesList employees={employees} />;
}
```

`<EmployeesPage>` now suspends when until `<EmployeesFetch>` reads the resource async.  

What's important is `<EmployeesPage>` is orthogonal to the fetching logic: it doesn't know that `axios` under the hood handles the fetch.  

## 3. Scenario 2: Isolate scroll watch

Let's say you want to implement a scroll to the top component that shows when the user reached the bottom of the page. It has a button that when clicked, scrolls the user to the top of the page.  

(!Insert GIF with scroll)

The first naive implementation of `<ScrollToTop>` can be:

```jsx
import React, { useState, useEffect } from 'react';

const PRECISION = 50;

function ScrollTop() {
  const [isBottom, setIsBottom] = useState(false);

  function onScroll() {
    const currentY = window.scrollY + document.body.offsetHeight;
    const bottomY = document.body.scrollHeight - PRECISION;
    setIsBottom(currentY >= bottomY);
  }

  useEffect(function() {
    onScroll();
    window.addEventListener('scroll', onScroll);
    return function() {
      window.removeEventListener('scroll', onScroll);
    };
  }, [isBottom]);

  function onClick() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  if (!isBottom) {
    return null;
  }

  return <button onClick={onClick}>Jump to top</button>;
}
```

`<ScrollToTop>` implements the scroll watch and renders a button that scrolls the page to top. The issue is that these concepts can change at different rates.  

A better orthogonal design should isolate the scroll watch from the UI. 

Let's extract the scroll watch logic into a custom hook `useScrollAtBottom()`:

```javascript
import { useState, useEffect } from 'react';

export default function useScrollAtBottom(precision) {
  const [isBottom, setIsBottom] = useState(false);

  function onScroll() {
    const currentY = window.scrollY + document.body.offsetHeight;
    const bottomY = document.body.scrollHeight - PRECISION;
    setIsBottom(currentY >= bottomY);
  }

  useEffect(function() {
    onScroll();
    window.addEventListener('scroll', onScroll);
    return function() {
      window.removeEventListener('scroll', onScroll);
    };
  }, [isBottom]);

  return isBottom;
}
```

Then let's use `useScrollAtBottom()` inside a component `<IfAtBottom>`:

```jsx
import React from 'react';
import useScrollAtBottom from './useScrollAtBottom';

const PRECISION = 50;

export default function IfAtBottom({ children }) {
  const isBottom = useScrollAtBottom(PRECISION);
  return isBottom ? <>{children}</> : null;
}
```

`<IfAtBottom>` displays its children only if the user has scrolled until the bottom of the page.  

Finally, there's the button that scrolls to top when clicked:

```jsx
import React from 'react';

function onClick() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

export default function JumpToTop() {
  return <button onClick={onClick}>Jump to top</button>;
}
```

Now if you want to make everything work, just put `<JumpToTop>` as a child of `<IfAtBottom>`:

```jsx
import React from 'react';
import IfAtBottom from './ifAtBottom';
import JumpToTop from './jumpToTop';

function MyComponent() {
  // ...
  return (
    <IfAtBottom>
      <JumpToTop />
    </IfAtBottom>
  );
}
```

What's important is that `<IfAtBottom>` changes in isolation if the scroll watch logic changes. As well as with `<JumpToTop>` UI elements can change in isolation.  

Another benefit is that you can use `<IfAtBottom>` to display any UI elements because the scroll watch is orthogonal to the UI elements. 

For example, you could show a subscribe to newsletter form when user reaches the bottom of the page:

```jsx
import React from 'react';
import IfAtBottom from './ifAtBottom';
import SubscribeToNewsletterForm from './subscribe';

function OtherComponent() {
  // ...
  return (
    <IfAtBottom>
      <SubscribeToNewsletterForm />
    </IfAtBottom>
  );
}
```

## 4. The "Main" component

While isolating changes into separate components is what orthogonality is all about, there could be components that can change for different reasons. These are so-called "Main" (aka "App") components. 

You can find "Main" component inside the `index.jsx` file: the one that starts the application. It knows all the "dirty" details about the application: initializes the global state provider (like Redux), configures the fetching libraries (like GraphQL Apollo), associates routes with components, and so on.  

You might have several "Main" components: for the client side (to run inside a browser) and for server side (that implements Server-Side Rendering).  

## 5. The benefits of orthogonal design

The orthogonal design provides lots of benefits.

### Easy to change

When your components are orthogonally designed, any change you make to a component is isolated within the component.  

### Readability

Because the orthogonal component has one responsibility, it's much easier to understand what the component does. It is not cluttered with details that do not belong here.  

### Testability

Orthogonal components concentrate solely on implementing a single task. What you have to do is just test whether the component does the task correctly.  

Often it happens that a non-orthogonal component requires lots of mocks and manual setup just to test it. And if something is hard to test, eventually tests are going to be skipped. You just refactor such components.  

## 6. Think in principles

I'm sure you're engaged by the great new React features like hooks, suspense, etc. I like them too!

Always have a wider look whether the new feature helps you favor the good design: 

* *Why do I find React hooks useful?* Because it isolates the state logic and side effects from render logic.  
* *Why do I find Suspense useful?* Because you can isolate the fetch details from how the fetched data is consumed.  

## 7. The balance

Let's recall [a scene](https://www.youtube.com/watch?v=D4UiQX-Rf3U) from "Star Wars Revenge of the Sith" movie. After Anakin Skywalker is defeated by his former mentor Obi-Wan Kenobi, the latter says:

> Bring balance to the Force, not leave it in darkness!

Anakin Skywalker was chosen to become a Jedi and bring a *balance* between Dark and Light sides.  

The orthogonal design has to be balanced too by ["You aren't gonna need it"](https://deviq.com/yagni/) (YAGNI) principle.  

YAGNI emerges as a principle of Extreme Programming:

> Always implement things when you actually need them, never when you just foresee that you may need them.

It's important to avoid the extremes of the over-use of both orthogonal principle and YAGNI.  

Recall my story from the intro of the post: I ended up with an application that was difficult and costly to change. My mistake was that I unintentionally created components that were inflexible to change. That's an extreme of YAGNI.  

On the other side, if you make every piece of logic orthogonal, you will end up creating abstractions that are not going to be needed. That's an extreme of orthogonal design.  

The practical approach is to foresee the changes of your components. Study in detail the domain problem that your application solves, ask the client for a list of *potential* features that might need to be implemented. If you think that a certain place is going to change, then apply the orthogonal principle. 

## 8. Key takeaway

Writing software is not only about implementing the application's requirements. It's equally important to put effort into designing well the components.  

A key principle of a good design is the isolation of the logic that most likely will change: making it orthogonal. This makes your whole system flexible and adaptable to change or new features requirements.  

If the orthogonal principle is overlooked, you risk creating components that are tightly coupled and dependent. A slight change in one place might unexpectedly echo in another place, increasing the cost of change, maintenance and creating new features.
