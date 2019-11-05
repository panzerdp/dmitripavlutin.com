---
title: "Easing Data Fetching in React: Lifecycle Methods, Hooks, Suspense"
description: How data fetching in React becomes easier from lifecycle methods, hooks to suspense. 
published: '2019-11-05T13:00Z'
modified: '2019-11-05T13:00Z'
thumbnail: './images/oldman-sea.jpg'
slug: react-fetch-improvement-lifecycle-method-hooks-suspense
tags: ['react', 'lifecycle', 'hook', 'suspense']
recommended: ['7-architectural-attributes-of-a-reliable-react-component', 'use-react-memo-wisely']
type: post
commentsThreadId: react-data-fetching-improvement
---

When I write a React component, I want it to be pure and functional. Pure components are the easiest to work with: from composition to unit testing.  

But when you need to perform on [I/O operation](https://en.wikipedia.org/wiki/Input/output), like an HTTP data fetch, things become more difficult because of the async nature of I/O operations.  

You have to initiate the fetch operation, wait for the response, then handle the response, save the response to component's state, and finally render. 

Fortunately, React evolves in a direction to help you with better tools to handle data fetching.  

This post presents 3 ways to fetch data in React: the old class-based approach that uses lifecycle methods, hooks and suspense. You will see the benefits and drawbacks of each approach, so you could deside which works better for you next time you need to handle data fetching.  


## 1. Data fetching using lifecycle methods

An application *Employees.org* fetches the employees of a company.  

![Employees Application](./images/application.png)

On initial render, first 20 employees are fetched. You can type a query into the input field, and the list gets filtered.  

Let's recall 2 lifecycle methods of the class-based component:

1. `componentDidMount()`: triggers the initial fetching of employees
2. `componentDidUpdate(prevProps)`: trigger fetching of employees when the query changes

The class based component `<EmployeesPage>` implements the fetch logic. This components accepts a prop `query`, and has state `isFetching` and `employees`:

```jsx{10-12,14-18}
import EmployeesList from "./EmployeesList";
import { fetchEmployees } from "./fake-fetch";

class EmployeesPage extends Component {
  constructor(props) {
    super(props);
    this.state = { employees: [], isFetching: true };
  }

  componentDidMount() {
    this.fetch();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.query !== this.props.query) {
      this.fetch();
    }
  }

  async fetch() {
    this.setState({ isFetching: true });
    const employees = await fetchEmployees(this.props.query);
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

[Open the demo]() and explore how data is fetched.  

The class-based `<EmployeesPage>` has a method `fetch()` that handles fetching. As soon as the data is ready, the component state updates with fetched `employees`.  

To start fetching the employees when the component is initially rendered, the `fetch()` method is placed inside `componentDidMount()` lifecycle method.  

When the user enters a query into the input field, the `query` prop is updated. Every time it happens, `fetch()` is executed by `componentDidUpdate()`.   

#### Benefits

*Intuitive*  
Lifecycle method `componentDidMount()` initiates the fetch on first render and `componentDidUpdate()` refetches data when props change.

#### Drawbacks

*Boilerplate code*  
Class-based component requires "ceremony" code: extending the `Component`, calling `super(props)` inside `constructor()`.  

*`this`*  
Working with `this` keyword is burdersome.

*Code duplication*  
The code inside `componentDidMount()` and `componentDidUpdate()` is mostly duplicated.  

*Hard to reuse*  
It's complicated to reuse the employees fetch logic inside of other component.

## 2. Data fetching using hooks

With hooks, data fetching is slightly less intuitive, but with a big win of tighter code.  

Let's recall `useEffect(callback, dependencies)` hook. The callback gets called only when depdencies change.  

Let's apply `useEffect()` to fetch employees data:

```jsx{10-16}
import React, { useState } from 'react';

import EmployeesList from "./EmployeesList";
import { fetchEmployees } from "./fake-fetch";

function EmployeesPage({ query }) {
  const [isFetching, setFetching] = useState(false);
  const [employees, setEmployees] = useState([]);

  useEffect(function fetch {
    (async function() {
      setFetching(true);
      setEmployees(await fetchEmployees(query));
      setFetching(false);
    })();
  }, [query]);
  
  if (isFetching) {
    return <div>Fetching employees....</div>;
  }
  return <EmployeesList employees={employees} />;
}
```

[Open the demo](https://codesandbox.io/s/react-fetch-hook-vz2vl) and look how the hook fetches data.  

`useEffect(fetch, [query])` executed the `fetch` callback on right after initial render. Also, `fetch` callback gets called right after re-rendering but only if `query` prop changes.  

But there's still room for improvement. Hooks allows you to extract the employees fetching logic from `<EmployeesPage>` component. Let's do that:

```jsx{22}
import React, { useState } from 'react';

import EmployeesList from "./EmployeesList";
import { fetchEmployees } from "./fake-fetch";

function useEmployeesFetch(query) {
  const [isFetching, setFetching] = useState(false);
  const [employees, setEmployees] = useState([]);

  useEffect(function fetch {
    (async function() {
      setFetching(true);
      setEmployees(await fetchEmployees(query));
      setFetching(false);
    })();
  }, [query]);

  return [isFetching, employees];
}

function EmployeesPage({ query }) {
  const [employees, isFetching] = useEmployeesFetch(query);
  
  if (isFetching) {
    return <div>Fetching employees....</div>;
  }
  return <EmployeesList employees={employees} />;
}
```

The fetching jungle, bananas and monkeys were extracted to `useEmployeesFetch()`. The component `<EmployeesPage>` is not cluttered with fetching logic, but rather does its direct job: render UI elements.  

What's better, you can reuse `useEmployeesFetch()` in any other component that requires fetching employees.  

#### Benefits

*Simplicity*  
Hooks don't need lots of boilerplate code because they are plain functions.  

*Reusability*  
Fetching logic implemented in hooks is easy to reuse.  

#### Drawbacks

*Entry barrier*  
You have [to make sense of hooks](https://medium.com/@dan_abramov/making-sense-of-react-hooks-fdbde8803889) before using them. Hooks rely on closures, so you have to [know them well too](/simple-explanation-of-javascript-closures/).   

## 3. Data fetching using suspense

#### Benefits

#### Drawbacks

## 4. Key takeaways

*Which data fetching approach do you prefer?*